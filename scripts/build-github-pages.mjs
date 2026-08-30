import { spawn } from 'node:child_process';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { join, resolve } from 'node:path';
import { staticRoutes } from '../app/site-routes.mjs';
import { normalizeBasePath, rewriteHtml } from './static-site-utils.mjs';

const root = resolve(import.meta.dirname, '..');
const outputDir = join(root, 'site');
const repository = process.env.GITHUB_REPOSITORY ?? '';
const repositoryName = repository.split('/')[1] || '';
const basePath = normalizeBasePath(process.env.SITE_BASE_PATH ?? (repositoryName ? `/${repositoryName}` : ''));
const clientAssets = basePath
  ? join(root, 'dist', 'client', basePath.slice(1), '_next')
  : join(root, 'dist', 'client', '_next');
const port = await findFreePort();

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
  await waitForHttp(`http://127.0.0.1:${port}${basePath}/`, 30000);
  await cp(clientAssets, join(outputDir, '_next'), { recursive: true });
  await cp(join(root, 'public'), outputDir, { recursive: true, force: true });

  for (const route of staticRoutes) {
    const response = await fetch(`http://127.0.0.1:${port}${basePath}${route}`);
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
  console.log(`Static site artifact generated in ${outputDir} (${staticRoutes.length} routes)`);
} finally {
  server.kill();
  if (logs.includes('Error')) process.stderr.write(logs);
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
