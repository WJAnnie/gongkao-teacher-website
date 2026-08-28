import { spawn } from 'node:child_process';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const outputDir = join(root, 'site');
const repository = process.env.GITHUB_REPOSITORY ?? '';
const repositoryName = repository.split('/')[1] || '';
const basePath = process.env.SITE_BASE_PATH ?? (repositoryName ? `/${repositoryName}` : '');
const port = await findFreePort();

const writingHotspotKeys = ['development', 'culture', 'people', 'government', 'grassroots', 'law', 'values', 'era'];
const writingCaseKeys = ['people', 'practice', 'city', 'reform', 'technology', 'livelihood', 'law', 'negative', 'culture', 'rural', 'ecology', 'enterprise'];

const routes = [
  '/',
  '/questions/',
  '/materials/',
  '/tools/',
  '/shenlun/',
  '/shenlun/framework/',
  '/shenlun/questions/',
  '/shenlun/writing/',
  '/shenlun/writing/hotspots/',
  ...writingHotspotKeys.map((key) => `/shenlun/writing/hotspots/${key}/`),
  '/shenlun/writing/cases/',
  ...writingCaseKeys.map((key) => `/shenlun/writing/cases/${key}/`),
  '/shenlun/writing/metaphors/',
  '/shenlun/videos/',
  '/interview/methods/',
  '/interview/questions/',
  '/interview/expression/',
  '/interview/videos/',
];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const vinextCli = join(root, 'node_modules', 'vinext', 'dist', 'cli.js');
const server = spawn(process.execPath, [vinextCli, 'start', '--port', String(port)], {
  cwd: root,
  stdio: ['ignore', 'pipe', 'pipe'],
  windowsHide: true,
});

let logs = '';
server.stdout.on('data', (chunk) => { logs += chunk.toString(); });
server.stderr.on('data', (chunk) => { logs += chunk.toString(); });

try {
  await waitForHttp(`http://127.0.0.1:${port}/`, 30000);
  await cp(join(root, 'dist', 'client', '_next'), join(outputDir, '_next'), { recursive: true });
  await cp(join(root, 'public'), outputDir, { recursive: true, force: true });

  for (const route of routes) {
    const response = await fetch(`http://127.0.0.1:${port}${route}`);
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Production page ${route} returned HTTP ${response.status}.\n${body.slice(0, 4000)}\n\nServer logs:\n${logs}`);
    }
    let html = await response.text();
    html = rewriteHtml(html, basePath);
    if (route === '/') {
      await writeFile(join(outputDir, 'index.html'), html, 'utf8');
      await writeFile(join(outputDir, '404.html'), html, 'utf8');
    } else {
      const routeDir = join(outputDir, route.replace(/^\/+|\/+$/g, ''));
      await mkdir(routeDir, { recursive: true });
      await writeFile(join(routeDir, 'index.html'), html, 'utf8');
    }
  }
  console.log(`Static site artifact generated in ${outputDir} (${routes.length} routes)`);
} finally {
  server.kill();
  if (logs.includes('Error')) process.stderr.write(logs);
}

function rewriteHtml(html, pathPrefix) {
  const prefix = pathPrefix || '';
  return html
    .replaceAll('href="/_next/', `href="${prefix}/_next/`)
    .replaceAll('src="/_next/', `src="${prefix}/_next/`)
    .replaceAll('src="/about-study-art.svg"', `src="${prefix}/about-study-art.svg"`)
    .replaceAll('href="/og.png"', `href="${prefix}/og.png"`)
    .replaceAll('content="http://localhost:3000/og.png"', `content="${prefix}/og.png"`)
    .replaceAll('href="/shenlun/writing/', `href="${prefix}/shenlun/writing/`)
    .replaceAll('href="/shenlun/framework/"', `href="${prefix}/shenlun/framework/"`)
    .replaceAll('href="/shenlun/questions/"', `href="${prefix}/shenlun/questions/"`)
    .replaceAll('href="/shenlun/videos/"', `href="${prefix}/shenlun/videos/"`)
    .replaceAll('href="/shenlun/"', `href="${prefix}/shenlun/"`)
    .replaceAll('href="/interview/methods/"', `href="${prefix}/interview/methods/"`)
    .replaceAll('href="/interview/questions/"', `href="${prefix}/interview/questions/"`)
    .replaceAll('href="/interview/expression/"', `href="${prefix}/interview/expression/"`)
    .replaceAll('href="/interview/videos/"', `href="${prefix}/interview/videos/"`)
    .replaceAll('href="/questions/"', `href="${prefix}/questions/"`)
    .replaceAll('href="/materials/"', `href="${prefix}/materials/"`)
    .replaceAll('href="/tools/"', `href="${prefix}/tools/"`)
    .replaceAll('href="/#about"', `href="${prefix}/#about"`)
    .replaceAll('href="/"', `href="${prefix}/"`);
}

async function findFreePort() {
  return new Promise((resolvePort, reject) => {
    const probe = createServer();
    probe.listen(0, '127.0.0.1', () => {
      const address = probe.address();
      probe.close(() => resolvePort(typeof address === 'object' && address ? address.port : 0));
    });
    probe.on('error', reject);
  });
}

async function waitForHttp(url, timeoutMs) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 300));
  }
  throw new Error(`Timed out waiting for ${url}.\n${logs}`);
}
