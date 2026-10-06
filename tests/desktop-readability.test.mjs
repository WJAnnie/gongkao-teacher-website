import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../app/desktop-readability.css', import.meta.url), 'utf8').catch(() => '');
const luminance = hex => {
  const channels = hex.match(/[a-f\d]{2}/gi).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
};
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);

test('record and mock controls use opaque, accessible text colors', () => {
  assert.match(css, /\.tool-card\.record-tool\s*\{[^}]*background: #d99a82;[^}]*color: #25251f;/s);
  assert.match(css, /\.build-mock\s*\{[^}]*background: #98452f;[^}]*color: #fff9ef;/s);
  // Contrast calculations for record card (2.29 -> >= 4.5) and mock button (2.73 -> >= 4.5)
  assert.ok(contrast('25251f', 'd99a82') >= 4.5);
  assert.ok(contrast('fff9ef', '98452f') >= 4.5);
  // Rating buttons (1.98 -> >= 4.5) and score dimensions note (3.49 -> >= 4.5 on acid #d6dfa0)
  assert.ok(contrast('25251f', 'd6dfa0') >= 4.5);
  assert.match(css, /\.record-tool > p[^}]*opacity: 1;/s);
  assert.match(css, /\.record-tool \.record-rating button[^}]*color: #25251f;/s);
  assert.match(css, /\.score-tool \.advanced-note/s);
  assert.match(css, /\.score-tool \.score-dimensions small/s);
});

test('desktop geometry is bounded without changing mobile layout', () => {
  assert.match(css, /@media \(min-width: 1024px\)/);
  // Hero tightening from 740px to 620px (containing 602px content without clipping bottom routes)
  assert.match(css, /\.learning-page-frame \.learning-page-hero\s*\{\s*height: 620px;/);
  // Prose line length bounded to ~35-42 characters (42em / 756px)
  assert.match(css, /max-width: 756px/);
  assert.match(css, /max-width: 42em/);
  // Desktop >=1024 annotations >= 11px
  assert.match(css, /\.exam-review-stamp::after/);
  assert.match(css, /\.shenlun-route-strip::before/);
  assert.match(css, /\.question-paper-time/);
  assert.match(css, /\.shenlun-question-row h3::after/);
  assert.match(css, /\.question-meta span/);
  assert.match(css, /\.note-summary-main > p/);
  assert.match(css, /\.shenlun-footer > div > span/);
  assert.match(css, /font-size: 11px/);
  // Clickable items >= 12px
  assert.match(css, /\.shenlun-footer a/);
  assert.match(css, /\.interview-footer a/);
  assert.match(css, /font-size: 12px/);
  // Answer sheet SVG scale & font-size preservation
  assert.match(css, /\.framework-voice-answer-sheet svg\s*\{\s*min-width: 910px;/);
  assert.match(css, /\.framework-voice-answer-sheet text\s*\{\s*font-size: 12px;/);
});

test('readability rules load after existing shared overrides', async () => {
  const layout = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8');
  assert.ok(layout.indexOf("import './desktop-readability.css'") > layout.indexOf("import './learning-page-frame.css'"));
});
