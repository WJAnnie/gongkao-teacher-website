import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [layout, favicon] = await Promise.all([
  readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8').catch(() => ''),
]);

test('root metadata declares a local favicon that exists', () => {
  assert.match(layout, /icons:\s*\{\s*icon:\s*'\/favicon\.svg'\s*\}/);
  assert.match(favicon, /<svg[\s\S]+viewBox="0 0 64 64"/);
  assert.match(favicon, /<title>答卷之外<\/title>/);
});
