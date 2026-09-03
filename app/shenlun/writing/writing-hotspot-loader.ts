import type { HotspotCategory } from './writing-hotspot-schema.ts';
import { hotspotArticleCategory, hotspotTaxonomy, type HotspotCategoryKey } from './writing-hotspot-taxonomy.ts';
import { loadAllHotspotArticles } from './writing-hotspot-registry.ts';

export async function loadHotspotCategory(key: HotspotCategoryKey): Promise<HotspotCategory> {
  const meta = hotspotTaxonomy.find((item) => item.key === key);
  if (!meta) throw new Error('未知的热点分类：' + key);

  const [all, refinement, audit] = await Promise.all([
    loadAllHotspotArticles(),
    import('./writing-hotspot-refinement.ts'),
    import('./writing-hotspot-audit.ts'),
  ]);

  for (const article of all) {
    if (!hotspotArticleCategory[article.slug]) {
      throw new Error('热点文章缺少分类登记：' + article.slug);
    }
  }

  const articles = all
    .filter((article) => hotspotArticleCategory[article.slug] === key)
    .map((article, index) => ({ ...article, no: String(index + 1).padStart(2, '0') }));

  const category = audit.auditCategory(refinement.refineCategory({ ...meta, articles }));
  if (category.articles.length < 10 || category.articles.length > 15) {
    throw new Error(`Hotspot category size out of range: ${category.key} = ${category.articles.length}`);
  }
  return category;
}
