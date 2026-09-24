// 仅在服务端（构建时）调用：把热点时评和规范用词压成首页需要的轻量索引，
// 正文、导语、标签等字段不进入首页的客户端包。
import { loadHotspotCategory } from '../shenlun/writing/writing-hotspot-loader.ts';
import { hotspotTaxonomy } from '../shenlun/writing/writing-hotspot-taxonomy.ts';
import { termLibrary } from '../shenlun/writing/writing-term-data.ts';

export type FrontHotspot = Readonly<{ slug: string; title: string; categoryKey: string; categoryLabel: string }>;
export type FrontTerm = Readonly<{ before: string; after: string; categoryKey: string }>;

export async function loadFrontHotspots(): Promise<FrontHotspot[]> {
  // 与文章页走同一个加载器，标题与原文一致。
  const categories = await Promise.all(hotspotTaxonomy.map((item) => loadHotspotCategory(item.key)));
  return categories.flatMap((category) =>
    category.articles.map((article) => ({
      slug: article.slug,
      title: article.title,
      categoryKey: category.key,
      categoryLabel: category.label,
    })),
  );
}

export function buildFrontTerms(): FrontTerm[] {
  return termLibrary.flatMap((category) =>
    category.entries.map((entry) => ({ before: entry.before, after: entry.after, categoryKey: category.key })),
  );
}
