import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../app/learning-nav.css', import.meta.url), 'utf8');

test('the current component marks editorial navigation for legacy stylesheet isolation', async () => {
  const source = await readFile(new URL('../app/learning-nav.tsx', import.meta.url), 'utf8');
  assert.match(source, /data-nav-style="editorial"/);
  assert.match(css, /\[data-nav-style="editorial"\] \.learning-nav-items a\[aria-current="page"\]/);
});

test('learning navigation removes rounded pills and switches to sharp editorial corners', () => {
  // Cluster container and navigation items have sharp corners
  assert.match(css, /\.learning-nav-cluster\s*\{[^}]*border-radius:\s*0;/s);
  assert.match(css, /\.learning-nav-items a\s*\{[^}]*border-radius:\s*0;/s);

  // Brand badge and home container also switch to sharp corners
  assert.match(css, /\.learning-topnav-brand > span\s*\{[^}]*border-radius:\s*0;/s);
  assert.match(css, /\.learning-topnav-home\s*\{[^}]*border-radius:\s*0;/s);

  // Mobile drawer trigger and items have sharp corners
  assert.match(css, /\.learning-mobile-group-trigger\s*\{[^}]*border-radius:\s*0;/s);
  assert.match(css, /\.learning-mobile-group-items\s*\{[^}]*border-radius:\s*0;/s);
  assert.match(css, /\.learning-mobile-group-items a\s*\{[^}]*border-radius:\s*0;/s);

  // No obsolete capsule border radii remain on nav clusters or items
  assert.doesNotMatch(css, /\.learning-nav-cluster\s*\{[^}]*border-radius:\s*(?:12|8|10|50%)/s);
  assert.doesNotMatch(css, /\.learning-nav-items a\s*\{[^}]*border-radius:\s*(?:12|8|10|50%)/s);
});

test('active item removes capsule background and inset shadow in favor of clear underline and font weight', () => {
  // Current group removes grey wash
  assert.match(css, /\.learning-nav-cluster\.current-group\s*\{[^}]*background:\s*transparent;/s);

  // Active state has theme-color underline, font-weight, transparent background, and no inset shadow
  assert.match(css, /\.learning-nav-items a\.active[^\{]*\{[^}]*border-bottom:\s*2px solid var\(--nav-accent\);/s);
  assert.match(css, /\.learning-nav-items a\.active[^\{]*\{[^}]*font-weight:\s*700;/s);
  assert.match(css, /\.learning-nav-items a\.active[^\{]*\{[^}]*background:\s*transparent;/s);
  assert.match(css, /\.learning-nav-items a\.active[^\{]*\{[^}]*box-shadow:\s*none;/s);

  // Hover state provides subtle shift and underline feedback
  assert.match(css, /\.learning-nav-items a:hover\s*\{[^}]*border-bottom-color:/s);
  assert.match(css, /\.learning-nav-items a:hover\s*\{[^}]*transform:\s*translateY\(-1px\);/s);
});

test('mobile navigation adopts straight-line separation while preserving touch target dimensions', () => {
  assert.match(css, /\.learning-mobile-group-items a\s*\{[^}]*border-bottom:\s*1px solid/s);
  assert.match(css, /\.learning-mobile-group-trigger\s*\{[^}]*min-height:\s*44px;/s);
  assert.match(css, /\.learning-mobile-group-items a\s*\{[^}]*min-height:\s*44px;/s);
  assert.match(css, /\.learning-mobile-group-items a\.active[^\{]*\{[^}]*box-shadow:\s*none;/s);
});

test('focus-visible and reduced-motion rules are explicitly declared', () => {
  // Clear focus visible rings
  assert.match(css, /\.learning-nav-items a:focus-visible/);
  assert.match(css, /\.learning-mobile-group-trigger:focus-visible/);
  assert.match(css, /\.learning-topnav-home:focus-visible/);

  // Reduced motion guard
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)\s*\{[^}]*transition:\s*none !important;[^}]*transform:\s*none !important;/s);
});
