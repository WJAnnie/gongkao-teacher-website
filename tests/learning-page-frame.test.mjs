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

test('every core learning route declares four stable macro chapters', () => {
  assert.equal(coreRoutes.length, 8);
  for (const route of coreRoutes) {
    const chapters = learningPageChapters[route.key];
    assert.equal(chapters.length, 4, route.key);
    assert.equal(new Set(chapters.map((item) => item.id)).size, 4, route.key);
    assert.equal(new Set(chapters.map((item) => item.targetId)).size, 4, route.key);
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
const frameworkManualSource = await readFile(new URL('../app/shenlun/framework/framework-manual.tsx', import.meta.url), 'utf8');
const questionsPageSource = await readFile(new URL('../app/shenlun/questions/page.tsx', import.meta.url), 'utf8');
const videosPageSource = await readFile(new URL('../app/shenlun/videos/page.tsx', import.meta.url), 'utf8');
const writingStaticPagesSource = await readFile(new URL('../app/shenlun/writing/writing-static-pages.tsx', import.meta.url), 'utf8');
const shenlunQuestionsSource = await readFile(new URL('../app/shenlun/questions/page.tsx', import.meta.url), 'utf8');
const writingPageSource = await readFile(new URL('../app/shenlun/writing/page.tsx', import.meta.url), 'utf8');
const writingStaticSource = await readFile(new URL('../app/shenlun/writing/writing-static-pages.tsx', import.meta.url), 'utf8');
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
  for (const targetId of ['writing-viewpoints', 'writing-evidence', 'writing-language', 'writing-essay']) {
    assert.match(writingStaticPagesSource, new RegExp(targetId), targetId);
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

test('writing keeps eight static entries under four macro groups', () => {
  assert.match(writingPageSource, /<LearningContentFrame/);
  for (const id of ['writing-viewpoints', 'writing-evidence', 'writing-language', 'writing-essay']) {
    assert.match(writingStaticSource, new RegExp(id));
  }
  assert.equal((writingStaticSource.match(/href: '/g) ?? []).length, 8);
  for (const href of ['/shenlun/writing/hotspots/', '/shenlun/writing/cases/', '/shenlun/writing/metaphors/']) {
    assert.match(writingStaticSource, new RegExp(href.replaceAll('/', '\\/')));
  }
  assert.doesNotMatch(writingStaticSource, /writing-hotspot-all|writing-case-all|writing-metaphor-data/);
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
