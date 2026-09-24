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

const [today, masthead, modules, daily, song] = await Promise.all([
  read('../app/home-front/use-front-today.ts'),
  read('../app/home-front/front-masthead.tsx'),
  read('../app/home-front/front-modules.tsx'),
  read('../app/home-front/front-daily.tsx'),
  read('../app/home-front/front-song.tsx'),
]);

test('today hook defers the swap to after hydration and only when the date differs', () => {
  assert.match(today, /^'use client';/);
  assert.match(today, /useState\(initial\)/);
  assert.match(today, /useEffect\(/);
  assert.match(today, /getBeijingDate\(new Date\(\)\)/);
  assert.match(today, /current\.key !== initial\.key/);
});

test('masthead shows the rotating Beijing date and in-page anchors', () => {
  assert.match(masthead, /^'use client';/);
  assert.match(masthead, /useFrontToday\(initialDate\)/);
  assert.match(masthead, /formatMonthIssue\(today\)/);
  assert.match(masthead, /formatChineseDay\(today\)/);
  assert.match(masthead, /<h1>答卷之外<\/h1>/);
  assert.match(masthead, /云帆<br \/>之印/);
  for (const anchor of ['#study', '#about', '#contact']) assert.ok(masthead.includes(`href="${anchor}"`), `报头缺少 ${anchor}`);
});

test('module columns link every route with its note and no disclosure', () => {
  assert.match(modules, /href=\{route\.href\}/);
  assert.match(modules, /learningRouteNotes\[route\.key\]/);
  assert.doesNotMatch(modules, /'use client'|learning-disclosure-trigger|展开/);
});

test('daily columns build links through the base-path helpers', () => {
  assert.match(daily, /^'use client';/);
  assert.match(daily, /hotspotHref\(FRONT_BASE_PATH, item\.categoryKey, item\.slug\)/);
  assert.match(daily, /hotspotIndexHref\(FRONT_BASE_PATH\)/);
  assert.match(daily, /termsHref\(FRONT_BASE_PATH, picks\[0\]\?\.categoryKey\)/);
  assert.doesNotMatch(daily, /href=["'`]\/shenlun/);
  assert.match(daily, /hashSeed\(`hotspots:\$\{today\.key\}`\)/);
  assert.match(daily, /hashSeed\(`terms:\$\{today\.key\}`\)/);
  assert.match(daily, /className="front-empty"/);
});

test('daily columns import only types from the server data module', () => {
  assert.match(daily, /import type \{[^}]*FrontHotspot[^}]*\} from '\.\/front-data';/);
  assert.doesNotMatch(daily, /import \{[^}]*\} from '\.\/front-data'/);
  assert.doesNotMatch(daily, /writing-hotspot|writing-term-data/);
});

test('song column wraps the inline player', () => {
  assert.match(song, /<HomeSongPlayer \/>/);
  assert.match(song, /副刊 · 向岸/);
});
