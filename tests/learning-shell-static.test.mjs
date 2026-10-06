import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { rewriteHtml, findUnprefixedReferences } from '../scripts/static-site-utils.mjs';

const shellSource = await readFile(new URL('../app/learning-shell.tsx', import.meta.url), 'utf8');

test('LearningShell avoids Next Link and RSC prefetch in static builds', () => {
  assert.doesNotMatch(shellSource, /from ['"]next\/link['"]/);
  assert.doesNotMatch(shellSource, /<Link\b/);
  assert.match(shellSource, /<a\b/);
});

test('LearningShell preserves native navigation markup and accessible labels', () => {
  assert.match(shellSource, /<nav className="nav-shell" aria-label="学习站导航">/);
  assert.match(shellSource, /<a className="brand" href="\/" aria-label="答卷之外首页">/);
  assert.match(shellSource, /<a href="\/questions\/">真题题库<\/a>/);
  assert.match(shellSource, /<a href="\/materials\/">学习资料<\/a>/);
  assert.match(shellSource, /<a href="\/tools\/">训练工具<\/a>/);
  assert.match(shellSource, /<a href="\/#about">关于我<\/a>/);
  assert.match(shellSource, /<a className="nav-cta" href="\/">返回首页 <span>↗<\/span><\/a>/);
});

test('LearningShell preserves hero and footer anchor markup and classes', () => {
  assert.match(shellSource, /<header className="learning-page-hero">/);
  assert.match(shellSource, /<div className="learning-page-links">/);
  assert.match(shellSource, /<a className="brand footer-brand" href="\/"><span className="brand-mark">答<\/span><span>答卷之外<\/span><\/a>/);
  assert.match(shellSource, /<a href="\/">返回首页 ↑<\/a>/);
});

test('LearningShell links are root-relative and cleanly prefixed by rewriteHtml without double-prefix', () => {
  const basePath = '/gongkao-teacher-website';
  const hrefMatches = [...shellSource.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map((m) => m[1]);
  assert.ok(hrefMatches.length >= 8, `Expected at least 8 anchors, found ${hrefMatches.length}`);

  for (const href of hrefMatches) {
    assert.ok(href.startsWith('/'), `Anchor href should be root-relative: ${href}`);
    assert.ok(!href.startsWith(basePath), `Anchor href must not hardcode basePath: ${href}`);
    const sample = `<a href="${href}">链接</a>`;
    const rewritten = rewriteHtml(sample, basePath);
    assert.equal(findUnprefixedReferences(rewritten, basePath).length, 0);
    assert.doesNotMatch(rewritten, new RegExp(`${basePath}${basePath}`));
  }
});
