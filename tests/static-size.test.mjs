import test from 'node:test';
import assert from 'node:assert/strict';
import { summarizeEntries } from '../scripts/report-static-size.mjs';

test('aggregates raw and gzip bytes', () => {
  const result = summarizeEntries([
    { path: 'a.js', bytes: 200, gzipBytes: 90 },
    { path: 'og.jpg', bytes: 300, gzipBytes: 280 },
  ]);
  assert.equal(result.totalBytes, 500);
  assert.equal(result.gzipBytes, 370);
  assert.equal(result.byExtension['.js'].bytes, 200);
});
