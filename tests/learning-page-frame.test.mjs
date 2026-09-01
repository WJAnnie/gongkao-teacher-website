import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  interviewRoutes,
  learningPageChapters,
  shenlunRoutes,
} from '../app/learning-routes.ts';

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
  for (const id of ['shenlun-video-course', 'shenlun-video-classroom', 'shenlun-video-worklog', 'shenlun-video-notes']) {
    assert.match(videosPageSource, new RegExp(id));
  }
  assert.match(videosPageSource, /<LearningContentFrame/);
  assert.match(videosPageSource, /videoSections\.map/);
  assert.match(videosPageSource, /interview-learning-flow/);
  assert.match(videosPageSource, /interview-flow-step/);
});
