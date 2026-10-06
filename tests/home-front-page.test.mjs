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

const [page, css, layout] = await Promise.all([
  read('../app/page.tsx'),
  read('../app/home-front/home-front.css'),
  read('../app/layout.tsx'),
]);

test('homepage composes the newspaper front without the old gateway', () => {
  for (const name of ['FrontMasthead', 'FrontModuleColumn', 'FrontHotspots', 'FrontTerms', 'FrontSong']) {
    assert.match(page, new RegExp(`<${name}\\b`), `首页缺少 ${name}`);
  }
  for (const legacy of ['SubjectGateway', 'HomeLearningRepeat', 'MotionLayer', 'LearningTopNav', 'about-study-art', 'nav-shell', '展开']) {
    assert.ok(!page.includes(legacy), `首页仍包含 ${legacy}`);
  }
  for (const id of ['top', 'study', 'about', 'contact']) assert.match(page, new RegExp(`id="${id}"`));
  assert.match(page, /routes=\{shenlunRoutes\}/);
  assert.match(page, /routes=\{interviewRoutes\}/);
  assert.match(page, /把公考题做懂，<br \/>把话<em>说清<\/em>。/);
  assert.match(page, /—— 云帆老师/);
  for (const title of ['我在教什么。', '为什么做这个站。', '这里有什么。', '怎么使用。']) assert.ok(page.includes(title), `编者按缺少 ${title}`);
});

test('homepage data is computed at build time on the server', () => {
  assert.doesNotMatch(page, /'use client'/);
  assert.match(page, /export default async function Home\(\)/);
  assert.match(page, /getBeijingDate\(new Date\(\)\)/);
  assert.match(page, /await loadFrontHotspots\(\)/);
  assert.match(page, /buildFrontTerms\(\)/);
});

test('homepage restores restrained motion with a reduced-motion fallback', () => {
  assert.match(layout, /import '\.\/home-front\/home-front\.css';/);
  assert.match(css, /@keyframes front-arrive/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /animation: none/);
  assert.doesNotMatch(css, /radial-gradient|(?<!repeating-)linear-gradient/);
  assert.match(css, /text-wrap:\s*balance/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /\.front-module small \{ display: none; \}/);
  const sizes = [...css.matchAll(/font(?:-size)?\s*:[^;{}]*?(\d+(?:\.\d+)?)px/g)].map((match) => Number(match[1]));
  assert.ok(sizes.length > 10, '没有读到字号声明');
  for (const size of sizes) assert.ok(size >= 12, `发现 ${size}px 的文字`);
});

test('daily reading sits below the two primary subject columns', () => {
  const study = page.match(/<div className="front-cols" id="study">([\s\S]*?)<\/div>/)?.[1];
  assert.ok(study);
  assert.equal((study.match(/<FrontModuleColumn/g) ?? []).length, 2);
  assert.doesNotMatch(study, /FrontHotspots|FrontTerms|FrontSong/);
  const daily = page.match(/<div className="front-daily-reading"[^>]*>([\s\S]*?)<\/div>/)?.[1];
  assert.match(daily ?? '', /<FrontHotspots/);
  assert.match(daily ?? '', /<FrontTerms/);
  assert.doesNotMatch(daily ?? '', /FrontSong/);
});
