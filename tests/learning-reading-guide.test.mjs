import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getLearningReadingGuide, learningReadingGuides } from '../app/learning-reading-guide-data.ts';
import {
  interviewRoutes,
  learningPageChapters,
  shenlunRoutes,
} from '../app/learning-routes.ts';

const coreRoutes = [...shenlunRoutes, ...interviewRoutes];
const componentSource = await readFile(new URL('../app/learning-reading-guide.tsx', import.meta.url), 'utf8');
const navigationSource = await readFile(new URL('../app/learning-chapter-navigation.tsx', import.meta.url), 'utf8');
const cssSource = await readFile(new URL('../app/learning-reading-guide.css', import.meta.url), 'utf8');

test('reading guide data covers every macro chapter id exactly once', () => {
  const expected = coreRoutes.flatMap((route) => learningPageChapters[route.key].map((chapter) => ({
    route: route.key,
    id: chapter.id,
    no: chapter.no,
    label: chapter.label,
  })));

  assert.equal(learningReadingGuides.length, expected.length);
  assert.deepEqual(
    learningReadingGuides.map((entry) => entry.chapterId).sort(),
    expected.map((entry) => entry.id).sort(),
  );

  for (const chapter of expected) {
    const guide = getLearningReadingGuide(chapter.id);
    assert.ok(guide, chapter.id);
    assert.equal(guide.route, chapter.route);
    assert.equal(guide.chapterNo, chapter.no);
    assert.equal(guide.chapterLabel, chapter.label);
  }
});

test('every guide has three concise non-repeating points and one concrete exercise', () => {
  const globalPointSet = new Set();
  for (const guide of learningReadingGuides) {
    assert.equal(guide.points.length, 3, guide.chapterId);
    assert.equal(new Set(guide.points).size, 3, guide.chapterId);
    for (const point of guide.points) {
      assert.ok(point.length >= 4 && point.length <= 18, `${guide.chapterId}: ${point}`);
      assert.doesNotMatch(point, /左侧目录|界面|页面|跟着你|点击进入/);
      assert.ok(!globalPointSet.has(`${guide.chapterId}:${point}`));
      globalPointSet.add(`${guide.chapterId}:${point}`);
    }
    assert.match(guide.exercise, /选|拿|找|写|列|圈|标|录|看|完成|回听|检索|改写|摘出|整理|抽|连续|每天|用/);
    assert.doesNotMatch(guide.exercise, /可以了解|适合学习|建议看看|左侧目录|界面|页面/);
    assert.ok(guide.exercise.length >= 10 && guide.exercise.length <= 36, `${guide.chapterId}: ${guide.exercise}`);
  }
});

test('unknown chapter ids render no placeholder data', () => {
  assert.equal(getLearningReadingGuide('missing-chapter'), null);
  assert.match(componentSource, /if \(!guide\) return null;/);
  assert.doesNotMatch(componentSource, /暂无|未找到|空白提示/);
});

test('content frame loads the guide from active chapter state with semantic headings', () => {
  assert.match(navigationSource, /import \{ LearningReadingGuide \} from '\.\/learning-reading-guide';/);
  assert.match(navigationSource, /<LearningReadingGuide activeId=\{activeId\} \/>/);
  assert.match(componentSource, /<h2 id="learning-reading-guide-title">本节重点<\/h2>/);
  assert.match(componentSource, /<h3 id="learning-reading-guide-exercise">本节练习<\/h3>/);
  assert.doesNotMatch(componentSource, /左侧目录跟着你|重复首屏|介绍/);
});

test('guide style follows paper editorial rules', () => {
  assert.match(cssSource, /border-block:/);
  assert.match(cssSource, /border-left:/);
  assert.match(cssSource, /counter\(guide-point, decimal-leading-zero\)/);
  assert.match(cssSource, /--learning-accent/);
  assert.doesNotMatch(cssSource, /var\(--shenlun-accent/);
  assert.doesNotMatch(cssSource, /border-radius|linear-gradient|radial-gradient/);
  assert.doesNotMatch(cssSource, /100vh|height:\s*100%/);
});
