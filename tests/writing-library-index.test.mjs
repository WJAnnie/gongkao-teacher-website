import test from 'node:test';
import assert from 'node:assert/strict';
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
