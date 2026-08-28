import type { Metadata } from 'next';
import { ShenlunShell } from '../../../../shenlun-shell';
import { HotspotStaticCategory } from '../../writing-static-pages';
import { hotspotIndex } from '../../writing-library-index';

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
  return <ShenlunShell tone="writing" eyebrow="HOT TOPICS / 热点时评" title={item?.label ?? '热点时评'} desc="当前页面只包含这一知识领域的文章。点击具体文章即可原生展开阅读，即使增强脚本失效也不影响正文。">
    <section className="shenlun-content framework-content writing-content"><HotspotStaticCategory categoryKey={category} /></section>
  </ShenlunShell>;
}
