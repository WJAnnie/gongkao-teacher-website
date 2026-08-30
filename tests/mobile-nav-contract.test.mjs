import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const component = await readFile(new URL('../app/learning-nav.tsx', import.meta.url), 'utf8');
const css = await readFile(new URL('../app/mobile-home-learning-nav.css', import.meta.url), 'utf8');
const baseCss = await readFile(new URL('../app/learning-nav.css', import.meta.url), 'utf8');

test('menu relationships and Escape close are explicit', () => {
  assert.match(component, /aria-controls=/);
  assert.match(component, /id=\{`learning-menu-\$\{group\.key\}`\}/);
  assert.match(component, /event\.key === 'Escape'/);
  assert.match(component, /setMobileOpen\(null\)/);
  assert.match(component, /onClick=\{\(\) => setMobileOpen\(null\)\}/);
});

test('touch targets and dropdown viewport bounds are explicit', () => {
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /max-width:\s*calc\(100vw\s*-\s*24px\)/);
  assert.match(css, /max-height:\s*min\(70vh,\s*420px\)/);
  assert.match(css, /overflow-y:\s*auto/);
});

test('learning navigation stays above the page hero stacking context', () => {
  assert.match(baseCss, /main\.shenlun-page\s*>\s*header\.learning-topnav/);
  assert.match(baseCss, /z-index:\s*80/);
});
