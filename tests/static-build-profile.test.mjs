import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('launches only npm command scripts through the Windows command interpreter', async () => {
  const source = await readFile(new URL('../scripts/build-static-profile.mjs', import.meta.url), 'utf8');
  assert.match(source, /process\.env\.ComSpec/);
  assert.match(source, /['"]npm\.cmd['"]/);
  assert.doesNotMatch(source, /shell:/);
});
