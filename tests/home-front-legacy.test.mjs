import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const appDir = new URL('../app/', import.meta.url);
const LEGACY_CLASSES = [
  'about-contact-body', 'about-contact-card', 'about-contact-head', 'about-copy', 'about-detail-grid',
  'about-identity-line', 'about-intro-lead', 'about-merged', 'about-merged-grid', 'about-profile',
  'about-profile-expanded', 'about-tags', 'about-visual-art', 'bottom-materials', 'contact-info',
  'desktop-break', 'hero-bottom', 'hero-directory-slot', 'hero-grid', 'hero-lead', 'hero-note',
  'hero-orbit', 'hero-orbit-review', 'hero-pointer-glow', 'hero-scroll', 'home-mobile-learning-nav',
  'note-line', 'pointer-glow', 'qr-pattern', 'qr-placeholder', 'repeat-learning', 'repeat-learning-directory',
  'repeat-learning-head', 'repeat-learning-link', 'repeat-learning-links', 'repeat-learning-row',
  'repeat-learning-subject', 'scroll-progress', 'title-outline', 'home-song-reopen', 'home-song-close',
  'hero', 'about',
];
// 类名后面紧跟字母、数字、下划线或连字符时不算命中，所以 .learning-page-hero、.subject-track-button 不受影响。
const LEGACY_SELECTOR = new RegExp(`\\.(?:${LEGACY_CLASSES.join('|')})(?![\\w-])`);

const [layout, guidePolish, mobileNavCss] = await Promise.all([
  readFile(new URL('layout.tsx', appDir), 'utf8'),
  readFile(new URL('learning-page-guide-polish.css', appDir), 'utf8'),
  readFile(new URL('mobile-home-learning-nav.css', appDir), 'utf8'),
]);

test('old homepage selectors are gone from every stylesheet', async () => {
  const files = (await readdir(appDir, { recursive: true })).filter((file) => file.endsWith('.css'));
  const hits = [];
  for (const file of files) {
    const lines = (await readFile(new URL(file.replaceAll('\\', '/'), appDir), 'utf8')).split('\n');
    lines.forEach((line, index) => {
      if (LEGACY_SELECTOR.test(line)) hits.push(`app/${file}:${index + 1}  ${line.trim()}`);
    });
  }
  assert.deepEqual(hits, []);
});

test('retired homepage files and imports are removed', async () => {
  for (const path of [
    '../app/home-about.css',
    '../app/hero-review-orbit.css',
    '../app/home-learning-repeat.css',
    '../app/home-song-placement.css',
    '../app/home-refresh.css',
    '../app/motion-layer.tsx',
    '../app/home-learning-repeat.tsx',
    '../public/about-study-art.svg',
  ]) {
    await assert.rejects(access(new URL(path, import.meta.url)), { code: 'ENOENT' }, `${path} 仍然存在`);
  }
  for (const name of ['home-about', 'hero-review-orbit', 'home-learning-repeat', 'home-song-placement', 'home-refresh']) {
    assert.ok(!layout.includes(`./${name}.css`), `layout.tsx 仍引用 ${name}.css`);
  }
});

test('question type switcher keeps its styles after home-refresh.css is removed', () => {
  assert.match(guidePolish, /\.question-type-switcher \{ margin-top: 42px; scroll-margin-top: 120px; \}/);
  assert.match(guidePolish, /\.question-type-switcher-tabs button\.active/);
  assert.match(guidePolish, /\.question-type-switcher-tabs \{ grid-template-columns: repeat\(2,minmax\(0,1fr\)\); \}/);
});

test('shared learning navigation rules survive the homepage cleanup', () => {
  assert.match(mobileNavCss, /\.learning-topnav-mobile \.learning-mobile-group/);
  assert.match(mobileNavCss, /min-height:\s*44px/);
});
