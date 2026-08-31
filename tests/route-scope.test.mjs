import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function read(relativePath) {
  try {
    return await readFile(new URL(relativePath, import.meta.url), 'utf8');
  } catch (error) {
    if (error?.code === 'ENOENT') return '';
    throw error;
  }
}

function importPositions(source, imports) {
  return imports.map((specifier) => source.indexOf(`import '${specifier}';`));
}

function assertImportsInOrder(source, imports) {
  const positions = importPositions(source, imports);
  positions.forEach((position, index) => {
    assert.notEqual(position, -1, `missing stylesheet import: ${imports[index]}`);
  });
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b), 'stylesheet order changed');
}

const rootLayout = await read('../app/layout.tsx');
const frameworkPage = await read('../app/shenlun/framework/page.tsx');
const writingLayout = await read('../app/shenlun/writing/layout.tsx');
const interviewShell = await read('../app/interview/interview-shell.tsx');
const writingStaticPages = await read('../app/shenlun/writing/writing-static-pages.tsx');
const hotspotCategoryPage = await read('../app/shenlun/writing/hotspots/[category]/page.tsx');
const caseCategoryPage = await read('../app/shenlun/writing/cases/[category]/page.tsx');
const hotspotCategoryView = await read('../app/shenlun/writing/writing-hotspot-static-category.tsx');
const caseCategoryView = await read('../app/shenlun/writing/writing-case-static-category.tsx');
const frameworkDeepEnrichment = await read('../app/shenlun/framework/framework-deep-enrichment.tsx');

test('root layout excludes every specialist-only stylesheet', () => {
  assert.doesNotMatch(rootLayout, /shenlun\/framework\/framework-/);
  assert.doesNotMatch(rootLayout, /shenlun\/writing\/writing-/);
  assert.doesNotMatch(rootLayout, /interview\/interview-learning\.css/);
  assert.doesNotMatch(rootLayout, /menu-hierarchy-refinement\.css/);
  assert.doesNotMatch(rootLayout, /framework-scene-transition\.css/);
});

test('root layout keeps shared contracts', () => {
  assert.match(rootLayout, /interaction-semantics\.css/);
  assert.match(rootLayout, /learning-nav\.css/);
  assert.match(rootLayout, /learning-page-frame\.css/);
  assert.match(rootLayout, /learning-scene-transition\.css/);
});

test('framework route owns its styles in their original order', () => {
  assertImportsInOrder(frameworkPage, [
    './framework-expression.css',
    './framework-expression-stepper.css',
    './framework-manual.css',
    './framework-expression-article.css',
    './framework-types-article.css',
    './framework-types-depth.css',
    './framework-types-v4.css',
    './framework-abilities.css',
    './framework-expression-polish.css',
    './framework-expression-reading-refine.css',
    './framework-layout-centering.css',
    './framework-voice-reading.css',
    './framework-deep-enrichment.css',
    './framework-tips-articles.css',
    '../../menu-hierarchy-refinement.css',
    '../../framework-scene-transition.css',
  ]);
});

test('writing subtree owns shared writing styles for every static category route', () => {
  assertImportsInOrder(writingLayout, [
    '../framework/framework-manual.css',
    './writing-hotspot.css',
    './writing-hotspot-hierarchy.css',
    './writing-case.css',
    './writing-hero-menu.css',
    './writing-tips-style.css',
    './writing-section-landing.css',
    './writing-static.css',
    '../framework/framework-expression-polish.css',
    '../framework/framework-tips-articles.css',
    '../../menu-hierarchy-refinement.css',
  ]);
  assert.match(writingLayout, /children: React\.ReactNode/);
});

test('interview shell owns interview-only styles', () => {
  assertImportsInOrder(interviewShell, [
    './interview-learning.css',
    '../menu-hierarchy-refinement.css',
  ]);
});

test('writing landing and indexes do not import article, case, or metaphor corpora', () => {
  assert.doesNotMatch(writingStaticPages, /writing-hotspot-all/);
  assert.doesNotMatch(writingStaticPages, /writing-case-all/);
  assert.doesNotMatch(writingStaticPages, /writing-metaphor-data/);
});

test('dynamic category routes load only their selected corpus boundary', () => {
  assert.match(hotspotCategoryPage, /writing-hotspot-static-category/);
  assert.match(caseCategoryPage, /writing-case-static-category/);
  assert.match(hotspotCategoryView, /loadHotspotCategory/);
  assert.doesNotMatch(hotspotCategoryView, /writing-hotspot-all/);
  assert.match(caseCategoryView, /loadCaseCategory/);
  assert.doesNotMatch(caseCategoryView, /writing-case-all/);
});

test('static writing navigation avoids Vinext RSC prefetch links', () => {
  for (const source of [writingStaticPages, hotspotCategoryView, caseCategoryView]) {
    assert.doesNotMatch(source, /from 'next\/link'/);
  }
});

test('framework table rows use content-derived unique keys', () => {
  assert.match(frameworkDeepEnrichment, /key=\{`\$\{a\}-\$\{b\}`\}/);
  assert.doesNotMatch(frameworkDeepEnrichment, /<tr key=\{a\}>/);
});
