import assert from 'node:assert/strict';
import test from 'node:test';

import { quoteLibrary } from '../app/shenlun/writing/writing-quote-library.ts';

const weakSourcePattern = /多次重要讲话|高频表述|评论员文章$|官方政策表述|通行目标|讲话常用|中央文件表述/;
const urlPattern = /^https:\/\/[^\s]+$/;

test('each category keeps distinct quotes without conceptual attribution', () => {
  for (const category of quoteLibrary) {
    assert.equal(new Set(category.entries.map((entry) => entry.text)).size, category.entries.length, `${category.key} contains repeated quotes`);
    for (const entry of category.entries) assert.doesNotMatch(entry.sourceNote, /支撑|素材化|具体文章页|。。/, `${entry.text} has an indirect or malformed source`);
  }
});
const forbiddenSourceNotes = /待继续|再检索|检索入口|公开库|全文入口|按篇名复核|按卷次复核|按篇章复核|按条目篇名复核|核验状态|申论素材化|评论表述/;
const forbiddenHomepages = new Set([
  'https://www.people.com.cn/',
  'https://www.qstheory.cn/',
  'https://www.gov.cn/',
  'https://ctext.org/sanguozhi/zh',
  'https://ctext.org/hou-han-shu/zh',
  'https://ctext.org/han-shu/zh',
  'https://ctext.org/shiji/zh',
  'https://ctext.org/zizhi-tongjian/zh',
  'https://ctext.org/yan-tie-lun/zh',
  'https://ctext.org/wenxin-diaolong/zh',
]);

test('quote source metadata is complete and category volume is preserved', () => {
  assert.equal(quoteLibrary.length, 12);

  for (const category of quoteLibrary) {
    assert.ok(category.entries.length >= 20, `${category.key} should keep at least 20 entries`);

    for (const entry of category.entries) {
      assert.ok(entry.text && entry.author && entry.source && entry.context && entry.boundary, entry.text);
      assert.match(entry.sourceUrl, urlPattern, `${entry.text} missing valid sourceUrl`);
      assert.ok(entry.sourceNote.length >= 16, `${entry.text} missing sourceNote detail`);
      assert.doesNotMatch(entry.sourceNote, /编造|占位|TODO/i, `${entry.text} has placeholder sourceNote`);
      assert.doesNotMatch(entry.sourceNote, forbiddenSourceNotes, `${entry.text} uses non-verification wording`);
      assert.ok(!forbiddenHomepages.has(entry.sourceUrl), `${entry.text} uses a homepage or broad corpus URL`);
    }
  }
});

test('weak original source labels carry explicit audit notes', () => {
  const weakEntries = quoteLibrary.flatMap((category) =>
    category.entries.filter((entry) => weakSourcePattern.test(entry.source)),
  );

  assert.ok(weakEntries.length > 0, 'test should cover weak legacy labels');
  for (const entry of weakEntries) {
    assert.match(entry.sourceNote, /核验依据|核验状态|未标为逐字领袖原话|不冒充/, entry.text);
  }
});

test('same quote text does not point to conflicting source metadata', () => {
  const byText = new Map();
  for (const category of quoteLibrary) {
    for (const entry of category.entries) {
      const signature = `${entry.sourceUrl}\n${entry.sourceNote}`;
      const existing = byText.get(entry.text);
      if (existing) assert.equal(signature, existing, entry.text);
      byText.set(entry.text, signature);
    }
  }
});

test('quote links stay within official or public-domain verification sources', () => {
  const allowedHosts = [
    'www.gov.cn',
    'www.people.com.cn',
    'cpc.people.com.cn',
    'wwj.hunan.gov.cn',
    'scjg.hebei.gov.cn',
    'politics.people.com.cn',
    'www.qstheory.cn',
    'www.cac.gov.cn',
    'www.12371.cn',
    'www.moe.gov.cn',
    'www.ndrc.gov.cn',
    'www.nea.gov.cn',
    'dl.mof.gov.cn',
    'www.spp.gov.cn',
    'www.ccdi.gov.cn',
    'www.moj.gov.cn',
    'ctext.org',
    'zh.wikisource.org',
    'www.marxists.org',
  ];

  for (const category of quoteLibrary) {
    for (const entry of category.entries) {
      const { hostname } = new URL(entry.sourceUrl);
      assert.ok(allowedHosts.includes(hostname), `${entry.text} uses unapproved host ${hostname}`);
    }
  }
});
