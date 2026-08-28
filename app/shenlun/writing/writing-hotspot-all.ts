import type { HotspotCategory } from './writing-hotspot-schema';
import { developmentCategory } from './writing-hotspot-development';
import { cultureCategory } from './writing-hotspot-culture';
import { peopleCategory } from './writing-hotspot-people';
import { governmentCategory } from './writing-hotspot-government';
import { grassrootsCategory } from './writing-hotspot-grassroots';
import { lawCategory } from './writing-hotspot-law';
import { valuesCategory } from './writing-hotspot-values';
import { eraCategory } from './writing-hotspot-era';
import { cultureExtraArticles, governmentExtraArticles } from './writing-hotspot-extras';
import { hotspotArticleTopups } from './writing-hotspot-library-expansion';
import { refineCategory } from './writing-hotspot-refinement';
import { auditCategory } from './writing-hotspot-audit';

const sourceCategories: HotspotCategory[] = [
  developmentCategory,
  { ...cultureCategory, articles: [...cultureCategory.articles, ...cultureExtraArticles] },
  peopleCategory,
  { ...governmentCategory, articles: [...governmentCategory.articles, ...governmentExtraArticles] },
  grassrootsCategory,
  lawCategory,
  valuesCategory,
  eraCategory,
];

const rawCategories: HotspotCategory[] = sourceCategories.map((category) => ({
  ...category,
  articles: [...category.articles, ...(hotspotArticleTopups[category.key] ?? [])].map((article, index) => ({
    ...article,
    no: String(index + 1).padStart(2, '0'),
  })),
}));

export const hotspotCategories: HotspotCategory[] = rawCategories
  .map(refineCategory)
  .map(auditCategory);

hotspotCategories.forEach((category) => {
  if (category.articles.length < 10 || category.articles.length > 15) {
    throw new Error(`Hotspot category size out of range: ${category.key} = ${category.articles.length}`);
  }
});
