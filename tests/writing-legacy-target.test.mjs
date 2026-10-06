import test from 'node:test';
import assert from 'node:assert/strict';
import {
  legacyHotspotCategoryMap,
  resolveHotspotCategory,
  resolveLegacyWritingTarget,
  getHotspotCategoryStaticParams,
} from '../app/shenlun/writing/writing-legacy-target.ts';
import { hotspotCategoryKeys } from '../app/site-routes.mjs';
import { hotspotIndex } from '../app/shenlun/writing/writing-library-index.ts';

test('compatibility mapping maps legacy categories to current hotspot categories', () => {
  assert.deepEqual(legacyHotspotCategoryMap, {
    development: 'economy',
    people: 'livelihood',
    government: 'service',
    law: 'enforcement',
    values: 'civility',
    era: 'innovation',
  });
  assert.equal(resolveHotspotCategory('development'), 'economy');
  assert.equal(resolveHotspotCategory('people'), 'livelihood');
  assert.equal(resolveHotspotCategory('government'), 'service');
  assert.equal(resolveHotspotCategory('law'), 'enforcement');
  assert.equal(resolveHotspotCategory('values'), 'civility');
  assert.equal(resolveHotspotCategory('era'), 'innovation');
});

test('compatibility mapping preserves valid current categories', () => {
  const currentKeys = hotspotIndex.map((item) => item.key);
  for (const key of currentKeys) {
    assert.equal(resolveHotspotCategory(key), key);
  }
  // Culture and grassroots exist in both legacy and current lists
  assert.equal(resolveHotspotCategory('culture'), 'culture');
  assert.equal(resolveHotspotCategory('grassroots'), 'grassroots');
});

test('resolveHotspotCategory falls back to economy for unknown category', () => {
  assert.equal(resolveHotspotCategory('non-existent-category'), 'economy');
  assert.equal(resolveHotspotCategory(''), 'economy');
  assert.equal(resolveHotspotCategory('constructor'), 'economy');
  assert.equal(resolveHotspotCategory('__proto__'), 'economy');
});

test('resolveLegacyWritingTarget maps category targets without hash', () => {
  assert.equal(resolveLegacyWritingTarget('hotspots/development'), 'hotspots/economy');
  assert.equal(resolveLegacyWritingTarget('hotspots/people'), 'hotspots/livelihood');
  assert.equal(resolveLegacyWritingTarget('hotspots/government'), 'hotspots/service');
  assert.equal(resolveLegacyWritingTarget('hotspots/law'), 'hotspots/enforcement');
  assert.equal(resolveLegacyWritingTarget('hotspots/values'), 'hotspots/civility');
  assert.equal(resolveLegacyWritingTarget('hotspots/era'), 'hotspots/innovation');
  assert.equal(resolveLegacyWritingTarget('hotspots/culture'), 'hotspots/culture');
  assert.equal(resolveLegacyWritingTarget('hotspots/economy'), 'hotspots/economy');
});

test('resolveLegacyWritingTarget preserves article fragment and resolves actual category for known articles', () => {
  // employment belongs to livelihood
  assert.equal(
    resolveLegacyWritingTarget('hotspots/development', '#employment'),
    'hotspots/livelihood/employment'
  );
  // high-quality-development belongs to economy
  assert.equal(
    resolveLegacyWritingTarget('hotspots/people', '#high-quality-development'),
    'hotspots/economy/high-quality-development'
  );
  // artificial-intelligence belongs to innovation
  assert.equal(
    resolveLegacyWritingTarget('hotspots/era', '#artificial-intelligence'),
    'hotspots/innovation/artificial-intelligence'
  );
  // streamline-government-services belongs to service
  assert.equal(
    resolveLegacyWritingTarget('hotspots/law', '#streamline-government-services'),
    'hotspots/service/streamline-government-services'
  );
  // rule-of-law belongs to enforcement
  assert.equal(
    resolveLegacyWritingTarget('hotspots/values', '#rule-of-law'),
    'hotspots/enforcement/rule-of-law'
  );
});

test('resolveLegacyWritingTarget handles hash with leading slashes or full paths', () => {
  assert.equal(
    resolveLegacyWritingTarget('hotspots/people', '#/employment'),
    'hotspots/livelihood/employment'
  );
  assert.equal(
    resolveLegacyWritingTarget('hotspots/people', '#hotspots/people/employment'),
    'hotspots/livelihood/employment'
  );
});

test('resolveLegacyWritingTarget preserves unknown article fragments with resolved category', () => {
  assert.equal(
    resolveLegacyWritingTarget('hotspots/people', '#custom-bookmark'),
    'hotspots/livelihood/custom-bookmark'
  );
  assert.equal(
    resolveLegacyWritingTarget('hotspots/economy', '#my-anchor'),
    'hotspots/economy/my-anchor'
  );
  assert.equal(
    resolveLegacyWritingTarget('hotspots/people', '#constructor'),
    'hotspots/livelihood/constructor'
  );
});

test('an article already present in the target is retained when its hash repeats', () => {
  assert.equal(
    resolveLegacyWritingTarget('hotspots/economy/high-quality-development', '#high-quality-development'),
    'hotspots/economy/high-quality-development'
  );
});

test('resolveLegacyWritingTarget leaves cases and metaphors unchanged', () => {
  assert.equal(resolveLegacyWritingTarget('cases/people'), 'cases/people');
  assert.equal(resolveLegacyWritingTarget('cases/people', '#zhang-guimei'), 'cases/people/zhang-guimei');
  assert.equal(resolveLegacyWritingTarget('cases/people/zhang-guimei', '#zhang-guimei'), 'cases/people/zhang-guimei');
  assert.equal(resolveLegacyWritingTarget('metaphors/library'), 'metaphors/library');
  assert.equal(resolveLegacyWritingTarget('metaphors/library', '#压舱石'), 'metaphors/library/压舱石');
});

test('getHotspotCategoryStaticParams covers all current and legacy public routes', () => {
  const params = getHotspotCategoryStaticParams();
  const paramKeys = params.map((p) => p.category);
  for (const item of hotspotIndex) {
    assert.ok(paramKeys.includes(item.key), `missing current category: ${item.key}`);
  }
  for (const key of hotspotCategoryKeys) {
    assert.ok(paramKeys.includes(key), `missing legacy category: ${key}`);
  }
});
