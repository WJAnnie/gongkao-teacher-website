import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../app/learning-chapter-navigation.tsx', import.meta.url), 'utf8').catch(() => '');

test('chapter activation is correct without animation support', () => {
  assert.match(source, /startViewTransition\?/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /scrollIntoView/);
  assert.match(source, /behavior: reducedMotion \|\| origin === 'hero' \? 'auto' : 'smooth'/);
});

test('temporary transition state has a single cleanup path', () => {
  assert.match(source, /learning-chapter-shared/);
  assert.match(source, /activationTokenRef/);
  assert.match(source, /let cleaned = false/);
  assert.match(source, /cleanupTransition/);
  assert.match(source, /\.finally\(cleanupTransition\)/);
  assert.match(source, /setArrivingId\(null\)/);
  assert.match(source, /source\.style\.removeProperty\('view-transition-name'\)/);
  assert.match(source, /sharedDestination\?\.style\.removeProperty\('view-transition-name'\)/);
});

test('mobile directory and passive observation share the same active id', () => {
  assert.match(source, /drawerOpen/);
  assert.match(source, /drawerTriggerRef/);
  assert.match(source, /event\.key === 'Escape'/);
  assert.match(source, /setActiveId/);
  assert.match(source, /programmaticUntilRef/);
  assert.doesNotMatch(source, /CustomEvent/);
});

test('passive observer rebinds when active body targets change', () => {
  assert.match(source, /observer\.disconnect\(\);\n  }, \[activeId, chapters\]\);/);
});

test('shared transition destination style is only applied after a committed target', () => {
  assert.match(source, /if \(!commitDestination\(\)\) return;\n        sharedDestination = directoryTarget\(id\);/);
});
