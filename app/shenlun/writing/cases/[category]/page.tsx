import type { Metadata } from 'next';
import { caseIndex } from '../../writing-library-index';
import { WritingLegacyEntry } from '../../writing-legacy-entry';

export function generateStaticParams() {
  return caseIndex.map((item) => ({ category: item.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const item = caseIndex.find((entry) => entry.key === category);
  return {
    title: `${item?.label ?? '案例素材'}｜写作积累｜答卷之外`,
    description: item?.desc ?? '申论案例素材分类。',
  };
}

export default async function CaseWritingCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const item = caseIndex.find((entry) => entry.key === category);
  return <WritingLegacyEntry target={`cases/${item?.key ?? 'people'}`} title={item?.label ?? '案例素材'} />;
}
