import type { Metadata } from 'next';
import { hotspotIndex } from '../../writing-library-index';
import { WritingLegacyEntry } from '../../writing-legacy-entry';
import { getHotspotCategoryStaticParams, resolveHotspotCategory } from '../../writing-legacy-target';

export function generateStaticParams() {
  return getHotspotCategoryStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const resolvedCategory = resolveHotspotCategory(category);
  const item = hotspotIndex.find((entry) => entry.key === resolvedCategory);
  return {
    title: `${item?.label ?? '热点时评'}｜写作积累｜答卷之外`,
    description: item?.desc ?? '申论热点时评分类文章。',
  };
}

export default async function HotspotWritingCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const resolvedCategory = resolveHotspotCategory(category);
  const item = hotspotIndex.find((entry) => entry.key === resolvedCategory);
  return <WritingLegacyEntry target={`hotspots/${resolvedCategory}`} title={item?.label ?? '热点时评'} />;
}
