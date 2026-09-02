import type { HotspotCategory } from './writing-hotspot-schema';
import type { HotspotIndexItem } from './writing-library-index';

async function loadBaseCategory(key: HotspotIndexItem['key']): Promise<HotspotCategory> {
  switch (key) {
    case 'development': return (await import('./writing-hotspot-development.ts')).developmentCategory;
    case 'culture': return (await import('./writing-hotspot-culture.ts')).cultureCategory;
    case 'people': return (await import('./writing-hotspot-people.ts')).peopleCategory;
    case 'government': return (await import('./writing-hotspot-government.ts')).governmentCategory;
    case 'grassroots': return (await import('./writing-hotspot-grassroots.ts')).grassrootsCategory;
    case 'law': return (await import('./writing-hotspot-law.ts')).lawCategory;
    case 'values': return (await import('./writing-hotspot-values.ts')).valuesCategory;
    case 'era': return (await import('./writing-hotspot-era.ts')).eraCategory;
  }
}

async function loadExtraArticles(key: HotspotIndexItem['key']) {
  if (key === 'culture') return (await import('./writing-hotspot-extras.ts')).cultureExtraArticles;
  if (key === 'government') return (await import('./writing-hotspot-extras.ts')).governmentExtraArticles;
  return [];
}

export async function loadHotspotCategory(key: HotspotIndexItem['key']): Promise<HotspotCategory> {
  const [base, extras, expansion, refinement, audit] = await Promise.all([
    loadBaseCategory(key),
    loadExtraArticles(key),
    import('./writing-hotspot-library-expansion.ts'),
    import('./writing-hotspot-refinement.ts'),
    import('./writing-hotspot-audit.ts'),
  ]);

  const articles = [
    ...base.articles,
    ...extras,
    ...(expansion.hotspotArticleTopups[key] ?? []),
  ].map((article, index) => ({
    ...article,
    no: String(index + 1).padStart(2, '0'),
  }));

  const category = audit.auditCategory(refinement.refineCategory({ ...base, articles }));
  if (category.articles.length < 10 || category.articles.length > 15) {
    throw new Error(`Hotspot category size out of range: ${category.key} = ${category.articles.length}`);
  }
  return category;
}
