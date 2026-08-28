import type { HotspotCategory } from './writing-hotspot-schema';
import type { HotspotIndexItem } from './writing-library-index';

async function loadBaseCategory(key: HotspotIndexItem['key']): Promise<HotspotCategory> {
  switch (key) {
    case 'development': return (await import('./writing-hotspot-development')).developmentCategory;
    case 'culture': return (await import('./writing-hotspot-culture')).cultureCategory;
    case 'people': return (await import('./writing-hotspot-people')).peopleCategory;
    case 'government': return (await import('./writing-hotspot-government')).governmentCategory;
    case 'grassroots': return (await import('./writing-hotspot-grassroots')).grassrootsCategory;
    case 'law': return (await import('./writing-hotspot-law')).lawCategory;
    case 'values': return (await import('./writing-hotspot-values')).valuesCategory;
    case 'era': return (await import('./writing-hotspot-era')).eraCategory;
  }
}

async function loadExtraArticles(key: HotspotIndexItem['key']) {
  if (key === 'culture') return (await import('./writing-hotspot-extras')).cultureExtraArticles;
  if (key === 'government') return (await import('./writing-hotspot-extras')).governmentExtraArticles;
  return [];
}

export async function loadHotspotCategory(key: HotspotIndexItem['key']): Promise<HotspotCategory> {
  const [base, extras, expansion, refinement, audit] = await Promise.all([
    loadBaseCategory(key),
    loadExtraArticles(key),
    import('./writing-hotspot-library-expansion'),
    import('./writing-hotspot-refinement'),
    import('./writing-hotspot-audit'),
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
