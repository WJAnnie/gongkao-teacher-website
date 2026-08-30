import test from 'node:test';
import assert from 'node:assert/strict';
import { findUnprefixedReferences, normalizeBasePath, rewriteHtml } from '../scripts/static-site-utils.mjs';

test('normalizes paths and rejects URLs', () => {
  assert.equal(normalizeBasePath(''), '');
  assert.equal(normalizeBasePath('/gongkao-teacher-website/'), '/gongkao-teacher-website');
  assert.throws(() => normalizeBasePath('https://example.com/x'), /必须是路径/);
  for (const invalid of ['/repo/../escape', '/repo//nested', '/repo?x=1', '/repo#frag', '/repo\\nested']) {
    assert.throws(() => normalizeBasePath(invalid), /必须是规范路径/);
  }
});

test('prefixes root-relative links for Pages only', () => {
  const html = '<a href="/shenlun/"><img src="/og.jpg"></a>';
  assert.equal(rewriteHtml(html, ''), html);
  assert.equal(rewriteHtml(html, '/repo'), '<a href="/repo/shenlun/"><img src="/repo/og.jpg"></a>');
});

test('prefixes responsive images and serialized link props', () => {
  const html = '<img srcSet="/a.png 1x, /b.png 2x"><script>{\\"href\\":\\"/shenlun/\\"}</script>';
  assert.equal(
    rewriteHtml(html, '/repo'),
    '<img srcSet="/repo/a.png 1x, /repo/b.png 2x"><script>{\\"href\\":\\"/repo/shenlun/\\"}</script>',
  );
  assert.deepEqual(findUnprefixedReferences(rewriteHtml(html, '/repo'), '/repo'), []);
});

test('prefixes and validates Vinext framework assets inside RSC payloads', () => {
  const html = String.raw`<link data-rsc-css-href="/_next/static/css/app.css"><script>push(":HL[\"/_next/static/css/app.css\",\"style\"]")</script>`;
  const expected = String.raw`<link data-rsc-css-href="/repo/_next/static/css/app.css"><script>push(":HL[\"/repo/_next/static/css/app.css\",\"style\"]")</script>`;
  assert.equal(rewriteHtml(html, '/repo'), expected);
  assert.deepEqual(findUnprefixedReferences(html, '/repo'), ['/_next/static/css/app.css']);
  assert.deepEqual(findUnprefixedReferences(expected, '/repo'), []);
});

test('replaces build-server metadata URLs for both profiles', () => {
  const html = '<meta property="og:image" content="http://localhost:3000/og.png">';
  assert.equal(rewriteHtml(html, ''), '<meta property="og:image" content="/og.png">');
  assert.equal(rewriteHtml(html, '/repo'), '<meta property="og:image" content="/repo/og.png">');
});

test('finds unprefixed literal, responsive, and serialized references', () => {
  const html = '<a href="/raw/"></a><img srcSet="/repo/a.png 1x, /raw.png 2x"><script>{\\"src\\":\\"/raw.svg\\"}</script>';
  assert.deepEqual(findUnprefixedReferences(html, '/repo'), ['/raw/', '/raw.png', '/raw.svg']);
});

test('finds duplicate prefixes and traversal inside generated references', () => {
  const html = '<a href="/repo/repo/x"></a><img src="/repo/../escape.png">';
  assert.deepEqual(findUnprefixedReferences(html, '/repo'), ['/repo/repo/x', '/repo/../escape.png']);
});
