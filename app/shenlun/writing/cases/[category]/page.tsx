import type { Metadata } from 'next';
import { ShenlunShell } from '../../../../shenlun-shell';
import { CaseStaticCategory } from '../../writing-static-pages';
import { caseIndex } from '../../writing-library-index';

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
  return <ShenlunShell tone="writing" eyebrow="CASE LIBRARY / 案例素材" title={item?.label ?? '案例素材'} desc="当前页面只包含这一类型的10个案例。案例使用浏览器原生折叠，增强脚本只负责自动置顶。">
    <section className="shenlun-content framework-content writing-content"><CaseStaticCategory categoryKey={category} /></section>
  </ShenlunShell>;
}
