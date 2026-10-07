import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('scroll arrival is progressive and cleans up when motion preference changes', async () => {
  const source = await readFile(new URL('../app/home-front/front-motion.tsx', import.meta.url), 'utf8');
  assert.match(source, /motion\.matches/);
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /observer\?\.disconnect/);
  assert.match(source, /removeEventListener\('scroll'/);
  assert.match(source, /motion\.removeEventListener/);
  assert.match(source, /passive: true/);
  assert.match(source, /aria-hidden="true"/);
});

test('keyboard focus makes a waiting section immediately visible', async () => {
  const css = await readFile(new URL('../app/home-front/home-front.css', import.meta.url), 'utf8');
  const focusRule = css.match(/\.front-awaiting:focus-within\s*\{([^}]+)\}/)?.[1];
  assert.ok(focusRule, 'keyboard focus must reveal waiting content');
  assert.match(focusRule, /opacity:\s*1/);
  assert.match(focusRule, /animation:\s*none/);
});
