import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [manifest, lockfile] = await Promise.all([
  readFile(new URL('../package.json', import.meta.url), 'utf8').then(JSON.parse),
  readFile(new URL('../package-lock.json', import.meta.url), 'utf8').then(JSON.parse),
]);

const patchedVersions = {
  next: '16.3.3',
  react: '19.2.8',
  'react-dom': '19.2.8',
  'eslint-config-next': '16.3.3',
  'react-server-dom-webpack': '19.2.8',
  vinext: '1.0.0-beta.8',
  vite: '8.2.2',
  '@vitejs/plugin-rsc': '0.5.34',
  '@vitejs/plugin-react': '6.1.1',
  '@cloudflare/vite-plugin': '1.54.2',
  '@cloudflare/workers-types': '5.20260831.1',
  wrangler: '4.127.1',
};

test('security-sensitive framework packages stay on the audited patch baseline', () => {
  const declared = { ...manifest.dependencies, ...manifest.devDependencies };
  const locked = {
    ...lockfile.packages[''].dependencies,
    ...lockfile.packages[''].devDependencies,
  };

  for (const [name, version] of Object.entries(patchedVersions)) {
    assert.equal(declared[name], version, `${name} must stay pinned to ${version}`);
    assert.equal(locked[name], version, `${name} lockfile entry must stay pinned to ${version}`);
    assert.equal(
      lockfile.packages[`node_modules/${name}`]?.version,
      version,
      `${name} resolved package must stay on ${version}`,
    );
    assert.match(
      lockfile.packages[`node_modules/${name}`]?.integrity ?? '',
      /^sha512-/,
      `${name} resolved package must retain registry integrity metadata`,
    );
  }
});
