import test from 'node:test';
import assert from 'node:assert/strict';
import { loadAllHotspotArticles } from '../app/shenlun/writing/writing-hotspot-registry.ts';
import { hotspotTaxonomy } from '../app/shenlun/writing/writing-hotspot-taxonomy.ts';
import { hotspotIndex } from '../app/shenlun/writing/writing-library-index.ts';
import { termLibrary } from '../app/shenlun/writing/writing-term-data.ts';
import { buildFrontTerms, loadFrontHotspots } from '../app/home-front/front-data.ts';
import {
  FRONT_BASE_PATH,
  hotspotHref,
  hotspotIndexHref,
  normalizeBasePath,
  termsHref,
} from '../app/home-front/front-links.ts';
import { rewriteHtml } from '../scripts/static-site-utils.mjs';

const [hotspots, allArticles] = await Promise.all([loadFrontHotspots(), loadAllHotspotArticles()]);

test('hotspot index covers every registered article with only light fields', () => {
  assert.equal(hotspots.length, allArticles.length);
  assert.equal(new Set(hotspots.map((item) => item.slug)).size, hotspots.length);
  const labels = new Map(hotspotTaxonomy.map((item) => [item.key, item.label]));
  for (const item of hotspots) {
    assert.deepEqual(Object.keys(item).sort(), ['categoryKey', 'categoryLabel', 'slug', 'title']);
    assert.ok(item.slug && item.title, `条目缺少 slug 或标题：${JSON.stringify(item)}`);
    assert.equal(item.categoryLabel, labels.get(item.categoryKey));
  }
});

test('hotspot category keys match the writing page hash routes', () => {
  const routeKeys = new Set(hotspotIndex.map((item) => item.key));
  for (const item of hotspots) assert.ok(routeKeys.has(item.categoryKey), `写作页不认识分类 ${item.categoryKey}`);
});

test('term index flattens every entry with its category', () => {
  const total = termLibrary.reduce((sum, category) => sum + category.entries.length, 0);
  const terms = buildFrontTerms();
  assert.equal(terms.length, total);
  for (const term of terms) {
    assert.deepEqual(Object.keys(term).sort(), ['after', 'before', 'categoryKey']);
    assert.ok(term.before && term.after);
  }
  assert.deepEqual([...new Set(terms.map((term) => term.categoryKey))], termLibrary.map((category) => category.key));
});

test('base path normalizes like the audio source', () => {
  assert.equal(normalizeBasePath(''), '');
  assert.equal(normalizeBasePath('/'), '');
  assert.equal(normalizeBasePath('/gongkao-teacher-website/'), '/gongkao-teacher-website');
  assert.equal(normalizeBasePath('gongkao-teacher-website'), '/gongkao-teacher-website');
  assert.equal(FRONT_BASE_PATH, normalizeBasePath(process.env.SITE_BASE_PATH ?? ''));
});

test('client-built links carry the base path and are not prefixed twice after build', () => {
  const base = '/gongkao-teacher-website';
  const hot = hotspotHref(base, 'cadre', 'cadre-sink');
  assert.equal(hot, '/gongkao-teacher-website/shenlun/writing/#hotspots/cadre/cadre-sink');
  assert.equal(hotspotIndexHref(base), '/gongkao-teacher-website/shenlun/writing/hotspots/');
  assert.equal(termsHref(base, 'economy'), '/gongkao-teacher-website/shenlun/writing/#terms/economy');
  assert.equal(termsHref(base), '/gongkao-teacher-website/shenlun/writing/#terms');
  assert.equal(hotspotHref('', 'cadre', 'x'), '/shenlun/writing/#hotspots/cadre/x');
  const html = `<a href="${hot}">标题</a>`;
  assert.equal(rewriteHtml(html, base), html);
});
