import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

function cssFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return cssFiles(path);
    return path.endsWith('.css') ? [path] : [];
  });
}

const sheets = cssFiles(join(root, 'app')).map((path) => ({
  name: relative(root, path).split(sep).join('/'),
  css: readFileSync(path, 'utf8'),
}));

// 允许的渐变只有两种硬边用法：荧光笔式文字底线（同一位置硬切）和 1px 竖向页边线。
const HARD_EDGE_GRADIENTS = [
  /^linear-gradient\(180deg, transparent (\d+)%, [^;]+\) \1%\)$/,
  /^linear-gradient\(90deg, transparent calc\(6vw - \.5px\), rgba\(37,37,31,\.\d+\) 6vw, transparent calc\(6vw \+ \.5px\)\)$/,
];

// 按括号配对取出完整的渐变值；color-mix 里常有多层 var() 嵌套，正则写不全。
function gradientValues(css) {
  const values = [];
  for (const match of css.matchAll(/(?:repeating-)?(?:linear|radial|conic)-gradient\(/g)) {
    let depth = 0;
    let end = match.index;
    for (; end < css.length; end += 1) {
      if (css[end] === '(') depth += 1;
      if (css[end] === ')' && --depth === 0) break;
    }
    values.push(css.slice(match.index, end + 1).replace(/\s+/g, ' '));
  }
  return values;
}

test('pages only use hard-edged gradients, never soft washes that leave a visible box edge', () => {
  const offenders = [];
  for (const { name, css } of sheets) {
    for (const value of gradientValues(css)) {
      if (value.startsWith('repeating-linear-gradient(45deg') && name === 'app/home-front/home-front.css') continue;
      if (!HARD_EDGE_GRADIENTS.some((pattern) => pattern.test(value))) offenders.push(`${name}: ${value.slice(0, 90)}`);
    }
  }
  assert.deepEqual(offenders, []);
});

test('the pointer-following glow is gone from learning pages', () => {
  assert.equal(existsSync(join(root, 'app/learning-page-effects.tsx')), false);
  for (const file of ['app/learning-page-frame.tsx', 'app/shenlun-shell.tsx']) {
    assert.doesNotMatch(readFileSync(join(root, file), 'utf8'), /LearningPageEffects|learning-page-effects/, file);
  }
  for (const { name, css } of sheets) assert.doesNotMatch(css, /\.learning-theme-glow\s*[{,]/, name);
});

test('the legacy study hub hero rules stay inside the question, material and tool shell', () => {
  const studyHub = sheets.find(({ name }) => name === 'app/study-hub.css').css;
  const heroSelectors = [...studyHub.matchAll(/([^{}]*\.learning-page-hero[^{}]*)\{/g)].map((match) => match[1].trim());
  assert.ok(heroSelectors.length >= 6, '没有读到 study-hub 的页头规则');
  for (const selector of heroSelectors) {
    for (const part of selector.split(',')) {
      if (part.includes('.learning-page-hero')) assert.match(part.trim(), /^\.learning-page-shell \.learning-page-hero/, part);
    }
  }
});
