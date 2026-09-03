import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { hotspotIndex } from '../app/shenlun/writing/writing-library-index.ts';
import { loadHotspotCategory } from '../app/shenlun/writing/writing-hotspot-loader.ts';

const transitionPattern = /^(因此|所以|为此|由此可见|由此|基于此|正因如此|归根到底|说到底|面向未来|基于这样的认识|基于这样的现实|基于这样的变化)[，,]/;
const sentenceEnd = /[。！？]$/;
const requiredLabels = new Set(['名言', '排比', '对仗', '案例']);

function articleText(article) {
  return [
    article.intro,
    article.thesis,
    ...article.sections.flatMap((section) => [section.title, section.body]),
    article.conclusion,
  ].join('');
}

function highlightRanges(article) {
  const body = articleText(article);
  return article.highlights.map((highlight) => {
    const start = body.indexOf(highlight.text);
    assert.notEqual(start, -1, `${article.slug}: 标注文本不存在：${highlight.text}`);
    return { ...highlight, start, end: start + highlight.text.length };
  }).sort((left, right) => left.start - right.start || right.end - left.end);
}

test('every hotspot article satisfies the content quality contract', async () => {
  const categories = await Promise.all(hotspotIndex.map(({ key }) => loadHotspotCategory(key)));
  const seenLabels = new Set();
  let articleCount = 0;

  for (const category of categories) {
    for (const article of category.articles) {
      articleCount += 1;
      for (const field of ['title', 'intro', 'thesis', 'conclusion']) {
        assert.equal(typeof article[field], 'string');
        assert.ok(article[field].trim(), `${article.slug}: ${field} 不能为空`);
      }
      assert.ok(article.sections.length, `${article.slug}: sections 不能为空`);
      assert.match(article.thesis, transitionPattern, `${article.slug}: thesis 缺少自然连接`);
      for (const section of article.sections) {
        assert.ok(section.title.trim(), `${article.slug}: section title 不能为空`);
        assert.ok(section.body.trim(), `${article.slug}: section body 不能为空`);
        assert.match(section.title, sentenceEnd, `${article.slug}: section title 必须是完整分论点首句`);
        assert.doesNotMatch(section.title.slice(0, -1), /[。！？]/, `${article.slug}: section title 不能包含第二句`);
        assert.doesNotMatch(section.title.slice(0, -1), /[，,、：:；;]$/, `${article.slug}: section title 不能以未完标点收尾`);
      }

      const ranges = highlightRanges(article);
      for (let index = 1; index < ranges.length; index += 1) {
        assert.ok(ranges[index].start >= ranges[index - 1].end, `${article.slug}: 标注文本重叠`);
      }
      for (const highlight of article.highlights) seenLabels.add(highlight.label);
    }
  }

  const expectedCount = hotspotIndex.reduce((sum, item) => sum + item.count, 0);
  assert.equal(articleCount, expectedCount, '热点文章全库数量应与导航索引一致');
  for (const label of requiredLabels) assert.ok(seenLabels.has(label), `全库缺少${label}标注`);
});

test('thesis is rendered last in the opening paragraph with its intro', async () => {
  const source = await readFile(new URL('../app/shenlun/writing/writing-library-manual.tsx', import.meta.url), 'utf8');
  const opening = source.match(/<p className="writing-paper-intro">([\s\S]*?)<\/p>/)?.[1] ?? '';
  assert.ok(opening, '热点文章缺少渲染开头段');
  assert.ok(opening.indexOf('article.intro') >= 0, '开头段应先渲染 intro');
  assert.ok(opening.indexOf('article.thesis') > opening.indexOf('article.intro'), 'thesis 应渲染在开头段最后');
  assert.match(opening, /writing-paper-inline-thesis/, 'thesis 应使用开头段内的观点标记');
});
