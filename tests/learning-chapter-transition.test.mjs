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

test('active id is derived from stored state without effect normalization', () => {
  assert.match(source, /const \[storedActiveId, setActiveId\] = useState/);
  assert.match(source, /const activeId = chapters\.some\(\(chapter\) => chapter\.id === storedActiveId\)\n    \? storedActiveId\n    : chapters\[0\]\?\.id \?\? '';/);
  assert.doesNotMatch(source, /useEffect\(\(\) => \{\n    if \(chapters\.some\(\(chapter\) => chapter\.id === activeId\)\) return;\n    setActiveId/);
});

test('defensive transition fallbacks commit once and still schedule cleanup', () => {
  assert.match(source, /const fallbackToCommittedDestination = \(\) => \{\n      root\.classList\.remove\('learning-shared-transition-active'\);\n      source\?\.style\.removeProperty\('view-transition-name'\);\n      if \(commitDestination\(\)\) scheduleTransitionCleanup\(\);\n    \};/);
  assert.match(source, /window\.setTimeout\(cleanupTransition, reducedMotion \? 0 : 1000\)/);
  assert.match(source, /fallbackToCommittedDestination\(\);\n        return;/);
  assert.match(source, /\} catch \{\n      fallbackToCommittedDestination\(\);\n    \}/);
});

test('animated transitions also schedule cleanup independent of browser completion timing', () => {
  assert.match(source, /void transition\.finished\.catch\(\(\) => undefined\)\.finally\(cleanupTransition\);\n      scheduleTransitionCleanup\(\);/);
});

test('drawer open moves focus to a generic initial-focus target', () => {
  assert.match(source, /directoryInitialFocus/);
  assert.match(source, /querySelector<HTMLElement>\('\[data-learning-directory-initial-focus\]'\)/);
  assert.match(source, /data-learning-directory-initial-focus/);
});

test('mobile hero activation moves focus into the opened drawer', () => {
  assert.match(source, /if \(mobile && origin === 'hero'\) window\.setTimeout\(\(\) => directoryInitialFocus\(\)\?\.focus\(\), 0\);/);
});

test('chapter activation can use a body target before a directory is mounted', () => {
  assert.match(source, /data-learning-directory-id.*document\.getElementById|document\.getElementById\(id\)/s);
});

test('transition watchdog outlasts the shared-element animation', () => {
  assert.match(source, /setTimeout\(cleanupTransition, reducedMotion \? 0 : 1000\)/);
});
