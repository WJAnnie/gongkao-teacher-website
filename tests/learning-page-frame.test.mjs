import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  interviewRoutes,
  learningPageChapters,
  shenlunRoutes,
} from '../app/learning-routes.ts';
import { questions } from '../app/question-bank-data.ts';

const coreRoutes = [...shenlunRoutes, ...interviewRoutes];

test('every core learning route declares stable chapters and writing exposes all eight modules', () => {
  assert.equal(coreRoutes.length, 8);
  for (const route of coreRoutes) {
    const chapters = learningPageChapters[route.key];
    const expectedCount = route.key === 'shenlun-writing' ? 8 : 4;
    assert.equal(chapters.length, expectedCount, route.key);
    assert.equal(new Set(chapters.map((item) => item.id)).size, expectedCount, route.key);
    assert.equal(new Set(chapters.map((item) => item.targetId)).size, expectedCount, route.key);
    chapters.forEach((item, index) => {
      assert.equal(item.no, String(index + 1).padStart(2, '0'));
      assert.match(item.id, /^[a-z0-9-]+$/);
      assert.match(item.targetId, /^[a-z0-9-]+$/);
      assert.ok(item.label.length > 1);
    });
  }
});

test('chapter configuration remains metadata-only', async () => {
  const source = await readFile(new URL('../app/learning-routes.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /framework-manual|writing-static-pages|question-bank-data|interview-card/);
});

const frameSource = await readFile(new URL('../app/learning-page-frame.tsx', import.meta.url), 'utf8').catch(() => '');
const navigationSource = await readFile(new URL('../app/learning-chapter-navigation.tsx', import.meta.url), 'utf8').catch(() => '');
const topNavigationSource = await readFile(new URL('../app/learning-nav.tsx', import.meta.url), 'utf8').catch(() => '');

test('shared frame composes slots without importing specialist content', () => {
  assert.match(frameSource, /LearningChapterProvider/);
  assert.match(frameSource, /LearningHeroChapterStrip/);
  assert.match(frameSource, /LearningTopNav/);
  assert.doesNotMatch(frameSource, /framework-manual|writing-static-pages|question-bank-data|interview\/methods/);
});

test('one client chapter source owns Hero and directory state', () => {
  assert.match(navigationSource, /createContext/);
  assert.match(navigationSource, /LearningHeroChapterStrip/);
  assert.match(navigationSource, /LearningMacroDirectory/);
  assert.match(navigationSource, /IntersectionObserver/);
});

test('compact top navigation starts closed so it cannot cover page content', () => {
  assert.match(topNavigationSource, /useState<string \| null>\(null\)/);
  assert.doesNotMatch(topNavigationSource, /useState<string \| null>\(activeGroup\)/);
});

test('shared content frame supports a left-to-right directory and one whole-directory collapse', () => {
  assert.match(navigationSource, /learning-directory-primary/);
  assert.match(navigationSource, /learning-directory-secondary/);
  assert.match(navigationSource, /directoryCollapsed/);
  assert.match(navigationSource, /收起目录/);
  assert.match(navigationSource, /展开目录/);
  assert.doesNotMatch(navigationSource, /collapseSecondary|secondaryCollapsed/);
});

test('shared reading geometry is left aligned and lets the reading column grow', () => {
  assert.match(frameCss, /justify-content:\s*start/);
  assert.match(frameCss, /learning-content-frame\.directory-collapsed/);
  assert.match(frameCss, /learning-directory-cascade/);
});

const rootLayoutSource = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8');
const frameCss = await readFile(new URL('../app/learning-page-frame.css', import.meta.url), 'utf8').catch(() => '');
const transitionCss = await readFile(new URL('../app/learning-scene-transition.css', import.meta.url), 'utf8').catch(() => '');

test('root imports only generic learning frame and transition styles', () => {
  assert.match(rootLayoutSource, /learning-page-frame\.css/);
  assert.match(rootLayoutSource, /learning-scene-transition\.css/);
  for (const source of [frameCss, transitionCss]) {
    assert.doesNotMatch(source, /\.framework-|\.writing-|\.interview-card|\.shenlun-question/);
  }
});

function selectorsFrom(css) {
  return [...css.matchAll(/([^{}@][^{}]*)\{/g)]
    .flatMap((match) => match[1].split(','))
    .map((selector) => selector.trim())
    .filter(Boolean);
}

test('root-imported frame css cannot target legacy LearningShell classes', () => {
  const collidingSelector = /\.(?:learning-page-hero|learning-content-frame|learning-directory-[\w-]+|learning-page-footer|learning-chapter-strip)(?:\b|[.#:[ >])/;
  const allowedFrameRoots = new Set([
    '.learning-page-frame',
    '.learning-page-frame[data-learning-subject="interview"]',
  ]);

  for (const selector of selectorsFrom(frameCss)) {
    if (!collidingSelector.test(selector) || allowedFrameRoots.has(selector)) continue;
    assert.match(
      selector,
      /^\.learning-page-frame(?:\s|>|\[)/,
      `unscoped selector can affect legacy LearningShell: ${selector}`,
    );
  }
});

const shenlunShellSource = await readFile(new URL('../app/shenlun-shell.tsx', import.meta.url), 'utf8');
const frameworkPageSource = await readFile(new URL('../app/shenlun/framework/page.tsx', import.meta.url), 'utf8');
const frameworkManualSource = await readFile(new URL('../app/shenlun/framework/framework-manual.tsx', import.meta.url), 'utf8');
const questionsPageSource = await readFile(new URL('../app/shenlun/questions/page.tsx', import.meta.url), 'utf8');
const videosPageSource = await readFile(new URL('../app/shenlun/videos/page.tsx', import.meta.url), 'utf8');
const shenlunQuestionsSource = await readFile(new URL('../app/shenlun/questions/page.tsx', import.meta.url), 'utf8');
const writingPageSource = await readFile(new URL('../app/shenlun/writing/page.tsx', import.meta.url), 'utf8');
const writingManualSource = await readFile(new URL('../app/shenlun/writing/writing-library-manual.tsx', import.meta.url), 'utf8');
const writingFoundationSource = await readFile(new URL('../app/shenlun/writing/writing-foundation-data.ts', import.meta.url), 'utf8').catch(() => '');
const interviewShellSource = await readFile(new URL('../app/interview/interview-shell.tsx', import.meta.url), 'utf8');
const interviewContentSource = await readFile(new URL('../app/interview/interview-learning-content.tsx', import.meta.url), 'utf8').catch(() => '');
const interviewPagePaths = ['methods', 'questions', 'expression', 'videos'];
const effectsSource = await readFile(new URL('../app/learning-page-effects.tsx', import.meta.url), 'utf8');
const layoutSource = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8');
const writingLayoutSource = await readFile(new URL('../app/shenlun/writing/layout.tsx', import.meta.url), 'utf8');
const questionTypeSwitcherSource = await readFile(new URL('../app/shenlun/framework/question-type-switcher.tsx', import.meta.url), 'utf8');

test('core Shenlun pages use the shared frame while the Shenlun landing keeps its legacy branch', () => {
  assert.match(shenlunShellSource, /tone === 'home'/);
  assert.match(shenlunShellSource, /<LearningPageFrame/);
  assert.doesNotMatch(shenlunShellSource, /FrameworkHeroMenu|WritingHeroMenu|PageGuide/);
});

test('core pages enter real content without a repeated post-Hero introduction screen', () => {
  assert.doesNotMatch(frameworkPageSource, /shenlun-section-head/);
  assert.equal((questionsPageSource.match(/shenlun-section-head/g) ?? []).length, 1, 'questions keeps only its real index heading');
  assert.doesNotMatch(videosPageSource, /shenlun-section-head/);
  assert.doesNotMatch(interviewContentSource, /interview-content-head/);
  assert.doesNotMatch(writingPageSource, /shenlun-section-head|WritingStaticLanding/);
});

test('framework manual consumes the shared chapter context without custom events', () => {
  assert.match(frameworkManualSource, /useLearningChapterNavigation/);
  assert.match(frameworkManualSource, /data-learning-directory-id/);
  assert.doesNotMatch(frameworkManualSource, /framework-hero-select|startViewTransition/);
});

test('Shenlun chapter metadata has a body target on every core route', () => {
  for (const targetId of ['questions-years', 'questions-types', 'questions-themes', 'questions-index']) {
    assert.match(questionsPageSource, new RegExp(targetId), targetId);
  }
  assert.match(questionsPageSource, /<section className="shenlun-map-card" id=\{chapterId\}/);
  for (const targetId of ['shenlun-video-course', 'shenlun-video-classroom', 'shenlun-video-worklog', 'shenlun-video-notes']) {
    assert.match(videosPageSource, new RegExp(targetId), targetId);
  }
  for (const targetId of ['writing-hotspots', 'writing-cases', 'writing-terms', 'writing-metaphors', 'writing-parallel', 'writing-sentences', 'writing-quotes', 'writing-essay']) {
    assert.match(writingManualSource, new RegExp(targetId), targetId);
  }
});

test('Shenlun videos keeps four archive cards and its learning flow in the shared frame', () => {
  const videoSectionBlock = videosPageSource.match(/const videoSections = \[(.*?)\] as const;/s)?.[1] ?? '';
  const flowBlock = videosPageSource.match(/const flow = \[(.*?)\] as const;/s)?.[1] ?? '';
  assert.equal((videoSectionBlock.match(/^\s+\[/gm) ?? []).length, 4);
  assert.equal((flowBlock.match(/^\s+\[/gm) ?? []).length, 4);
  for (const [block, titles] of [[videoSectionBlock, ['课程精讲', '课堂实录', '工作日常', '碎片分享']], [flowBlock, ['先自己做', '记一个点', '关掉重做', '放回真题']]]) {
    let offset = -1;
    for (const title of titles) {
      const next = block.indexOf(`'${title}'`, offset + 1);
      assert.ok(next > offset, title);
      offset = next;
    }
  }
  for (const id of ['shenlun-video-course', 'shenlun-video-classroom', 'shenlun-video-worklog', 'shenlun-video-notes']) {
    assert.match(videosPageSource, new RegExp(id));
  }
  assert.match(videosPageSource, /<LearningContentFrame/);
  assert.match(videosPageSource, /videoSections\.map/);
  assert.match(videosPageSource, /interview-learning-flow/);
  assert.match(videosPageSource, /interview-flow-step/);
});

test('Shenlun questions keeps archive, toolbar, and question rows inside four targets', () => {
  for (const id of ['questions-years', 'questions-types', 'questions-themes', 'questions-index']) {
    assert.match(shenlunQuestionsSource, new RegExp(id));
  }
  assert.match(shenlunQuestionsSource, /shenlun-question-toolbar/);
  assert.match(shenlunQuestionsSource, /shenlun-question-list/);
  assert.match(shenlunQuestionsSource, /<LearningContentFrame/);
  assert.match(shenlunQuestionsSource, /item\.year !== '专项'/);
  assert.equal(questions.filter((item) => item.subject === '申论' && item.year !== '专项').length, 30);
  for (const label of ['归纳概括', '综合分析', '提出对策', '贯彻执行', '文章写作']) {
    assert.match(shenlunQuestionsSource, new RegExp(label));
  }
});

test('writing is one eight-module manual with real hierarchy and state restoration', () => {
  assert.match(writingPageSource, /<WritingLibraryManual/);
  assert.doesNotMatch(writingPageSource, /WritingStaticLanding/);
  assert.match(writingManualSource, /<LearningContentFrame/);
  assert.match(writingManualSource, /useLearningChapterNavigation/);
  assert.match(writingManualSource, /sessionStorage/);
  assert.match(writingManualSource, /window\.location\.hash/);
  assert.match(writingManualSource, /writing-library-search/);
  assert.match(writingManualSource, /writing-breadcrumb/);
  assert.doesNotMatch(writingManualSource, /下一轮|继续建设|静态页面|一次性下载|脚本异常/);
  assert.doesNotMatch(writingManualSource, /writing-hotspot-all|writing-case-all/);
});

const writingDisclosureSource = await readFile(
  new URL('../app/shenlun/writing/writing-inline-disclosure.tsx', import.meta.url),
  'utf8',
).catch(() => '');

test('writing keeps third-level choices in the reading surface', () => {
  assert.match(writingManualSource, /WritingInlineDisclosure/);
  assert.match(writingDisclosureSource, /aria-expanded/);
  assert.match(writingDisclosureSource, /writing-inline-disclosure-body/);
  assert.doesNotMatch(writingManualSource, /TreeLeaves|writing-tree-leaves/);
  assert.doesNotMatch(writingManualSource, /details\[chapter\.id\]/);
});

test('metaphor and parallel libraries remain two-level modules', () => {
  assert.match(writingManualSource, /activeLayer === 'metaphors'/);
  assert.match(writingManualSource, /activeLayer === 'parallel'/);
  assert.doesNotMatch(writingManualSource, /WritingInlineDisclosure[^;]+metaphors/s);
  assert.doesNotMatch(writingManualSource, /WritingInlineDisclosure[^;]+parallel/s);
});

test('hotspots and cases use the restrained article surface', () => {
  assert.match(writingManualSource, /writing-editorial-paper/);
  assert.match(writingManualSource, /writing-case-article/);
  assert.doesNotMatch(writingManualSource, /writing-dossier-facts|writing-dossier-uses/);
});

test('writing foundation modules meet the minimum useful first-edition volume', async () => {
  const data = await import('../app/shenlun/writing/writing-foundation-data.ts');
  assert.equal(data.termCategories.length, 5);
  assert.ok(data.termCategories.every((category) => category.entries.length >= 15));
  assert.equal(data.parallelCategories.length, 5);
  assert.ok(data.parallelCategories.every((category) => category.entries.length >= 10));
  assert.equal(data.sentenceCategories.length, 5);
  assert.ok(data.sentenceCategories.every((category) => category.entries.length >= 10));
  assert.equal(data.quoteCategories.length, 5);
  assert.ok(data.quoteCategories.every((category) => category.entries.length >= 8));
  assert.equal(data.essayStages.length, 6);
  assert.ok(data.essayStages.every((stage) => stage.method && stage.counterexample && stage.example));
  for (const collection of [data.termCategories, data.parallelCategories, data.sentenceCategories, data.quoteCategories, data.essayStages]) {
    collection.forEach((item) => assert.match(writingManualSource, new RegExp(`['"]${item.key}['"]`), `missing directory key: ${item.key}`));
  }
  assert.doesNotMatch(writingFoundationSource, /下一轮|继续建设|静态页面|一次加载|扩容|脚本异常/);
});

test('interview shell is a thin shared-frame adapter', () => {
  assert.match(interviewShellSource, /<LearningPageFrame/);
  assert.doesNotMatch(interviewShellSource, /PageGuide|exam-meta-strip|interview-route-strip/);
});

for (const route of interviewPagePaths) {
  test(`interview ${route} preserves six cards, four steps, and two boards`, async () => {
    const source = await readFile(new URL(`../app/interview/${route}/page.tsx`, import.meta.url), 'utf8');
    assert.match(source, /<InterviewLearningContent/);
    assert.match(source, /cards=\{cards\}/);
    assert.match(source, /flow=\{flow\}/);
    assert.match(source, /boards=\{boards\}/);
  });
}

test('interview content adapter renders every route-owned item', () => {
  assert.match(interviewContentSource, /cards\.map/);
  assert.match(interviewContentSource, /flow\.map/);
  assert.match(interviewContentSource, /boards\.map/);
  assert.match(interviewContentSource, /<LearningContentFrame/);
});

test('superseded Hero menus and independent PageGuide are gone', () => {
  assert.doesNotMatch(effectsSource, /export function PageGuide|IntersectionObserver/);
  assert.doesNotMatch(layoutSource, /learning-hero-standard\.css/);
  assert.doesNotMatch(writingLayoutSource, /writing-hero-menu\.css/);
  assert.doesNotMatch(questionTypeSwitcherSource, /page-guide-select/);
});
