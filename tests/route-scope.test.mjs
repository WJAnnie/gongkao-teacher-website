import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

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

async function readSourceTree(relativeDirectory) {
  const directoryUrl = new URL(relativeDirectory, import.meta.url);
  const entries = await readdir(directoryUrl, { withFileTypes: true });
  const sources = await Promise.all(entries.map(async (entry) => {
    const child = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directoryUrl);
    if (entry.isDirectory()) return readSourceTree(child);
    if (!/\.(?:ts|tsx|js|jsx|md|json|css)$/.test(entry.name)) return '';
    return readFile(child, 'utf8');
  }));
  return sources.flat(Infinity).join('\n');
}

const rootLayout = await read('../app/layout.tsx');
const frameworkPage = await read('../app/shenlun/framework/page.tsx');
const writingLayout = await read('../app/shenlun/writing/layout.tsx');
const interviewShell = await read('../app/interview/interview-shell.tsx');
const hotspotCategoryPage = await read('../app/shenlun/writing/hotspots/[category]/page.tsx');
const caseCategoryPage = await read('../app/shenlun/writing/cases/[category]/page.tsx');
const hotspotIndexPage = await read('../app/shenlun/writing/hotspots/page.tsx');
const caseIndexPage = await read('../app/shenlun/writing/cases/page.tsx');
const metaphorIndexPage = await read('../app/shenlun/writing/metaphors/page.tsx');
const writingLegacyEntry = await read('../app/shenlun/writing/writing-legacy-entry.tsx');
const writingLibraryManual = await read('../app/shenlun/writing/writing-library-manual.tsx');
const frameworkDeepEnrichment = await read('../app/shenlun/framework/framework-deep-enrichment.tsx');
const appSource = await readSourceTree('../app/');

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
  ]);
});

test('writing subtree owns shared writing styles for every static category route', () => {
  assertImportsInOrder(writingLayout, [
    '../framework/framework-manual.css',
    './writing-hotspot.css',
    './writing-hotspot-hierarchy.css',
    './writing-case.css',
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
  ]);
  assert.doesNotMatch(interviewShell, /menu-hierarchy-refinement\.css/);
});

test('retired framework scene and Hero standard styles are not imported', () => {
  assert.doesNotMatch(rootLayout, /framework-scene-transition\.css/);
  assert.doesNotMatch(rootLayout, /learning-hero-standard\.css/);
  assert.doesNotMatch(frameworkPage, /framework-scene-transition\.css/);
});

test('writing manual keeps large corpora behind dynamic loading boundaries', () => {
  assert.doesNotMatch(writingLibraryManual, /from ['"]\.\/writing-hotspot-all/);
  assert.doesNotMatch(writingLibraryManual, /from ['"]\.\/writing-case-all/);
  assert.doesNotMatch(writingLibraryManual, /from ['"]\.\/writing-metaphor-data/);
  assert.match(writingLibraryManual, /import\(['"]\.\/writing-metaphor-data['"]\)/);
  assert.match(writingLibraryManual, /import\(['"]\.\/writing-hotspot-loader['"]\)/);
  assert.match(writingLibraryManual, /import\(['"]\.\/writing-case-loader['"]\)/);
});

test('legacy writing routes forward into canonical in-page directory state', () => {
  for (const source of [hotspotIndexPage, hotspotCategoryPage, caseIndexPage, caseCategoryPage, metaphorIndexPage]) {
    assert.match(source, /WritingLegacyEntry/);
    assert.doesNotMatch(source, /ShenlunShell|StaticCategory|StaticIndex|DirectList/);
  }
  assert.match(writingLegacyEntry, /window\.location\.replace/);
  assert.match(writingLegacyEntry, /\/shenlun\/writing\//);
  assert.match(writingLegacyEntry, /window\.location\.hash/);
});

test('writing compatibility navigation avoids Vinext RSC prefetch links', () => {
  for (const source of [writingLegacyEntry, hotspotIndexPage, hotspotCategoryPage, caseIndexPage, caseCategoryPage, metaphorIndexPage]) {
    assert.doesNotMatch(source, /from 'next\/link'/);
  }
});

test('framework table rows use content-derived unique keys', () => {
  assert.match(frameworkDeepEnrichment, /key=\{`\$\{a\}-\$\{b\}`\}/);
  assert.doesNotMatch(frameworkDeepEnrichment, /<tr key=\{a\}>/);
});

test('student-facing copy uses the current teacher name', () => {
  assert.doesNotMatch(appSource, /高老师|GAO\s*\//);
  assert.match(appSource, /云帆老师/);
});

test('student-facing copy excludes project-owner notes and decorative English labels', () => {
  assert.doesNotMatch(appSource, /站内已有|后续每个条目都可以继续扩展成独立文章或专题页/);
  assert.doesNotMatch(appSource, /BACK TO TOP|LEARNING DESK|LEARNING INDEX|CASE FILE|REVIEW|SHENLUN|INTERVIEW|YUNFAN\s*\/|[A-Z]{3,}\s*\/\s*[\u4e00-\u9fff]/);
});
