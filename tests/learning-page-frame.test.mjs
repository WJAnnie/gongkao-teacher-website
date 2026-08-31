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
