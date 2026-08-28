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
import { refineCategory } from './writing-hotspot-refinement';
import { auditCategory } from './writing-hotspot-audit';

const rawCategories: HotspotCategory[] = [
  developmentCategory,
  { ...cultureCategory, articles: [...cultureCategory.articles, ...cultureExtraArticles] },
  peopleCategory,
  { ...governmentCategory, articles: [...governmentCategory.articles, ...governmentExtraArticles] },
  grassrootsCategory,
  lawCategory,
  valuesCategory,
  eraCategory,
];

export const hotspotCategories: HotspotCategory[] = rawCategories
  .map(refineCategory)
  .map(auditCategory);
