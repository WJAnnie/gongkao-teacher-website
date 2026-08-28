import type { HotspotArticle, HotspotCategory } from './writing-hotspot-schema';
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

const oddEnglish = '交通、生态环境等领域 increasingly use video, sensing and online data for non-on-site supervision。';
const cleanChinese = '交通、生态环境等领域已逐步通过视频监控、在线监测和数据比对开展非现场监管。';

function normalizeArticle(article: HotspotArticle): HotspotArticle {
  const clean = (text: string) => text.replaceAll(oddEnglish, cleanChinese);
  return {
    ...article,
    intro: clean(article.intro),
    thesis: clean(article.thesis),
    conclusion: clean(article.conclusion),
    sections: article.sections.map((section) => ({ ...section, title: clean(section.title), body: clean(section.body) })),
    highlights: article.highlights.map((item) => ({ ...item, text: clean(item.text) })),
  };
}

export const hotspotCategories: HotspotCategory[] = rawCategories.map(refineCategory).map((category) => ({
  ...category,
  articles: category.articles.map(normalizeArticle),
}));
