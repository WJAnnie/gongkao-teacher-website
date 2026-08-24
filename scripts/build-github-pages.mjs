import { spawn } from 'node:child_process';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const outputDir = join(root, 'site');
const repository = process.env.GITHUB_REPOSITORY ?? '';
const repositoryName = repository.split('/')[1] || 'gongkao-teacher-website';
const basePath = `/${repositoryName}`;
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
  await waitForHttp(`http://127.0.0.1:${port}/`, 30000);
  const response = await fetch(`http://127.0.0.1:${port}/`);
  if (!response.ok) throw new Error(`Production page returned HTTP ${response.status}.`);
  let html = await response.text();
  html = html
    .replaceAll('href="/_next/', `href="${basePath}/_next/`)
    .replaceAll('src="/_next/', `src="${basePath}/_next/`)
    .replaceAll('href="/og.png"', `href="${basePath}/og.png"`)
    .replaceAll('content="http://localhost:3000/og.png"', `content="${basePath}/og.png"`);

  await cp(join(root, 'dist', 'client', '_next'), join(outputDir, '_next'), { recursive: true });
  await cp(join(root, 'public'), outputDir, { recursive: true, force: true });
  await writeFile(join(outputDir, 'index.html'), html, 'utf8');
  await writeFile(join(outputDir, '404.html'), html, 'utf8');
  console.log(`GitHub Pages artifact generated in ${outputDir}`);
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

