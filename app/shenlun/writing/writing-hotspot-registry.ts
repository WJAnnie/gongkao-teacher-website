// 热点文章的总登记表：把分散在各数据文件中的文章汇总成一个按 slug 索引的表。
// 分类归属由 writing-hotspot-taxonomy.ts 决定，与文章存放在哪个文件无关。

import type { HotspotArticle } from './writing-hotspot-schema.ts';

export async function loadAllHotspotArticles(): Promise<HotspotArticle[]> {
  const [development, culture, people, government, grassroots, law, values, era, extras, expansion, additions, ecologyAdditions, ecologyMore] = await Promise.all([
    import('./writing-hotspot-development.ts'),
    import('./writing-hotspot-culture.ts'),
    import('./writing-hotspot-people.ts'),
    import('./writing-hotspot-government.ts'),
    import('./writing-hotspot-grassroots.ts'),
    import('./writing-hotspot-law.ts'),
    import('./writing-hotspot-values.ts'),
    import('./writing-hotspot-era.ts'),
    import('./writing-hotspot-extras.ts'),
    import('./writing-hotspot-library-expansion.ts'),
    import('./writing-hotspot-additions.ts'),
    import('./writing-hotspot-ecology-additions.ts'),
    import('./writing-hotspot-ecology-more.ts'),
  ]);

  const collected: HotspotArticle[] = [
    ...development.developmentCategory.articles,
    ...culture.cultureCategory.articles,
    ...people.peopleCategory.articles,
    ...government.governmentCategory.articles,
    ...grassroots.grassrootsCategory.articles,
    ...law.lawCategory.articles,
    ...values.valuesCategory.articles,
    ...era.eraCategory.articles,
    ...extras.cultureExtraArticles,
    ...extras.governmentExtraArticles,
    ...Object.values(expansion.hotspotArticleTopups).flat(),
    ...additions.hotspotAdditionArticles,
    ...ecologyAdditions.ecologyAdditionArticles,
    ...ecologyAdditions.ecologyBatchTwo,
    ...ecologyMore.ecologyMoreArticles,
  ];

  const bySlug = new Map<string, HotspotArticle>();
  for (const article of collected) {
    if (bySlug.has(article.slug)) throw new Error('热点文章 slug 重复：' + article.slug);
    bySlug.set(article.slug, article);
  }
  return [...bySlug.values()];
}
