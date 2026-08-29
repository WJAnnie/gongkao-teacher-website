import test from 'node:test';
import assert from 'node:assert/strict';
import { assertSupportedNode, parseNodeVersion } from '../scripts/runtime-contract.mjs';

test('accepts Node 22.13 and newer', () => {
  assert.deepEqual(parseNodeVersion('v22.13.0'), { major: 22, minor: 13, patch: 0 });
  assert.doesNotThrow(() => assertSupportedNode('v25.9.0'));
});

test('rejects an older runtime', () => {
  assert.throws(() => assertSupportedNode('v22.12.9'), /需要 Node\.js 22\.13\.0 或更高版本/);
});
