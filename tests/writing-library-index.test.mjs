import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { hotspotIndex, caseIndex } from '../app/shenlun/writing/writing-library-index.ts';
import { hotspotLeafIndex, caseLeafIndex } from '../app/shenlun/writing/writing-library-leaf-index.ts';
import { loadHotspotCategory } from '../app/shenlun/writing/writing-hotspot-loader.ts';
import { loadCaseCategory } from '../app/shenlun/writing/writing-case-loader.ts';

test('lightweight hotspot titles match validated article bodies', async () => {
  for (const item of hotspotIndex) {
    const category = await loadHotspotCategory(item.key);
    assert.deepEqual(hotspotLeafIndex[item.key], category.articles.map(({ slug, no, title }) => ({ slug, no, title })));
  }
});

test('lightweight case titles match validated case bodies', async () => {
  for (const item of caseIndex) {
    const category = await loadCaseCategory(item.key);
    assert.deepEqual(caseLeafIndex[item.key], category.cases.map(({ slug, no, title }) => ({ slug, no, title })));
  }
});

test('generated leaf index contains only navigation metadata', async () => {
  const source = await readFile(new URL('../app/shenlun/writing/writing-library-leaf-index.ts', import.meta.url), 'utf8');
  assert.match(source, /export type WritingLeafIndexItem = \{ slug: string; no: string; title: string \}/);
  assert.doesNotMatch(source, /writing-hotspot-(?:development|culture|people|government|grassroots|law|values|era)|writing-case-(?:data|expansion|library-topups)/);
  assert.doesNotMatch(source, /\b(?:exam|tags|length|intro|thesis|sections|conclusion|highlights|references|summary|usages)\b/);
});
