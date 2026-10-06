import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('a quote category shows every group without per-group disclosure', async () => {
  const source = await readFile(new URL('../app/shenlun/writing/writing-library-manual.tsx', import.meta.url), 'utf8');
  const quotes = source.slice(source.indexOf("if (activeLayer === 'quotes') {"), source.indexOf('const stage = foundation.essayStages'));
  assert.doesNotMatch(quotes, /WritingInlineDisclosure|openQuotes/);
  assert.match(quotes, /groups\.map/);
  assert.match(quotes, /category\.entries\.filter/);
  assert.match(quotes, /id=\{`quote-group-\$\{index\}`\}/);
  assert.match(quotes, /entry\.sourceUrl/);
  assert.match(source, /group\.scrollIntoView/);
  assert.match(source, /group\.focus\(\{ preventScroll: true \}\)/);
  assert.match(source, /addEventListener\('hashchange', restoreLocation\)/);
  assert.match(source, /removeEventListener\('hashchange', restoreLocation\)/);
});
