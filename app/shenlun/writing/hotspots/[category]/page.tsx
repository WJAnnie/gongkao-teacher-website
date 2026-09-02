import type { Metadata } from 'next';
import { hotspotIndex } from '../../writing-library-index';
import { WritingLegacyEntry } from '../../writing-legacy-entry';

export function generateStaticParams() {
  return hotspotIndex.map((item) => ({ category: item.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const item = hotspotIndex.find((entry) => entry.key === category);
  return {
    title: `${item?.label ?? '热点时评'}｜写作积累｜答卷之外`,
    description: item?.desc ?? '申论热点时评分类文章。',
  };
}

export default async function HotspotWritingCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const item = hotspotIndex.find((entry) => entry.key === category);
  return <WritingLegacyEntry target={`hotspots/${item?.key ?? 'development'}`} title={item?.label ?? '热点时评'} />;
}
