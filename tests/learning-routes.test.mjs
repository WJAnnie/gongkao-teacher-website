import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { interviewRoutes, shenlunRoutes } from '../app/learning-routes.ts';
import { staticRoutes } from '../app/site-routes.mjs';

const learningNavSource = await readFile(new URL('../app/learning-nav.tsx', import.meta.url), 'utf8');
const learningEntryLinkSource = await readFile(new URL('../app/learning-entry-link.tsx', import.meta.url), 'utf8');

test('learning links are unique and statically exported', () => {
  const routes = [...shenlunRoutes, ...interviewRoutes];
  assert.equal(new Set(routes.map((item) => item.key)).size, routes.length);
  for (const route of routes) assert.ok(staticRoutes.includes(route.href), route.href);
});

test('static learning navigation avoids RSC link prefetch', () => {
  assert.doesNotMatch(learningNavSource, /from ['"]next\/link['"]/);
  assert.match(learningNavSource, /<a\b/);
});

test('entry links use a flow-content wrapper for card headings and paragraphs', () => {
  assert.match(learningEntryLinkSource, /<div className="learning-entry-link__content">\{children\}<\/div>/);
  assert.doesNotMatch(learningEntryLinkSource, /<span className="learning-entry-link__content">\{children\}<\/span>/);
});
