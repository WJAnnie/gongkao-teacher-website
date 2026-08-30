import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const semantics = await readFile(new URL('../app/interaction-semantics.css', import.meta.url), 'utf8');
const study = await readFile(new URL('../app/study-hub.css', import.meta.url), 'utf8');
const layout = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8');
const mobile = await readFile(new URL('../app/mobile-refinement.css', import.meta.url), 'utf8');
const studyHub = await readFile(new URL('../app/study-hub.tsx', import.meta.url), 'utf8');
const advancedToolsCss = await readFile(new URL('../app/advanced-tools.css', import.meta.url), 'utf8');
const learningNav = await readFile(new URL('../app/learning-nav.tsx', import.meta.url), 'utf8');
const learningNavCss = await readFile(new URL('../app/learning-nav.css', import.meta.url), 'utf8');
const frameworkManualCss = await readFile(new URL('../app/shenlun/framework/framework-manual.css', import.meta.url), 'utf8');
const subjectGateway = await readFile(new URL('../app/subject-gateway.tsx', import.meta.url), 'utf8');

test('real links own rail, arrow, focus, and active states', () => {
  for (const selector of ['.learning-entry-link::before', '.learning-entry-link__arrow', '.learning-entry-link:focus-visible', '.learning-entry-link:active']) {
    assert.match(semantics, new RegExp(selector.replace('.', '\\.')));
  }
});

test('content cards do not lift and obsolete overrides are gone', () => {
  assert.doesNotMatch(study, /\.(question-item|material-card):hover\s*\{[^}]*transform\s*:/s);
  assert.doesNotMatch(layout, /clickable-menu-affordance|entry-badge-unification/);
});

test('semantic classes are attached only to their matching controls and content', () => {
  assert.match(studyHub, /filter-control/);
  assert.match(studyHub, /question-item content-card/);
  assert.match(studyHub, /material-card content-card/);
  assert.doesNotMatch(studyHub, /data-reveal/);
  assert.match(learningNav, /learning-disclosure-trigger/);
  assert.match(subjectGateway, /learning-disclosure-trigger/);
});

test('mobile overrides no longer target the retired details navigation', () => {
  assert.doesNotMatch(mobile, /\.learning-topnav-mobile\s+(?:details|summary)/);
  assert.doesNotMatch(mobile, /\.learning-topnav-mobile\s+details[^\{]*\{/);
});

test('matrix-observed touch controls keep a 40px minimum target', () => {
  assert.match(learningNavCss, /\.learning-topnav-brand > span \{ width: 40px; height: 40px; \}/);
  assert.match(learningNavCss, /\.learning-topnav-home \{ width: 40px; height: 40px; \}/);
  assert.match(mobile, /\.learning-topnav-brand > span \{ width: 40px; height: 40px; \}/);
  assert.match(study, /\.timer-presets button, \.timer-actions button, \.record-rating button \{[^}]*min-height: 40px;/s);
  assert.match(advancedToolsCss, /\.mock-switch button \{[^}]*min-height: 40px;/s);
  assert.match(frameworkManualCss, /\.framework-drawer-close \{[^}]*width: 40px;[^}]*height: 40px;/s);
});
