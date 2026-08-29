import test from 'node:test';
import assert from 'node:assert/strict';
import { caseCategoryKeys, hotspotCategoryKeys, staticRoutes } from '../app/site-routes.mjs';

test('exports 36 unique canonical routes', () => {
  assert.equal(staticRoutes.length, 36);
  assert.equal(new Set(staticRoutes).size, 36);
  assert.ok(staticRoutes.every((route) => route.startsWith('/') && route.endsWith('/')));
});

test('contains every writing category', () => {
  for (const key of hotspotCategoryKeys) assert.ok(staticRoutes.includes(`/shenlun/writing/hotspots/${key}/`));
  for (const key of caseCategoryKeys) assert.ok(staticRoutes.includes(`/shenlun/writing/cases/${key}/`));
});
