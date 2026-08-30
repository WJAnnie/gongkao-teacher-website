import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('launches only npm command scripts through the Windows command interpreter', async () => {
  const source = await readFile(new URL('../scripts/build-static-profile.mjs', import.meta.url), 'utf8');
  assert.match(source, /process\.env\.ComSpec/);
  assert.match(source, /['"]npm\.cmd['"]/);
  assert.doesNotMatch(source, /shell:/);
});

test('embeds the selected base path in the Vinext build and export server', async () => {
  const [profile, exporter, nextConfig] = await Promise.all([
    readFile(new URL('../scripts/build-static-profile.mjs', import.meta.url), 'utf8'),
    readFile(new URL('../scripts/build-github-pages.mjs', import.meta.url), 'utf8'),
    readFile(new URL('../next.config.ts', import.meta.url), 'utf8'),
  ]);
  assert.match(nextConfig, /basePath:\s*process\.env\.SITE_BASE_PATH\s*\?\?\s*''/);
  assert.match(profile, /\[\.\.\.npmCommand\[1\], 'run', 'build'\], \{ SITE_BASE_PATH: basePath \}/);
  assert.match(exporter, /fetch\(`http:\/\/127\.0\.0\.1:\$\{port\}\$\{basePath\}\$\{route\}`\)/);
  assert.match(exporter, /basePath\s*\?\s*join\(root, 'dist', 'client', basePath\.slice\(1\), '_next'\)/);
});
