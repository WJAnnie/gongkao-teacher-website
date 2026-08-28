import type { Metadata } from 'next';
import { ShenlunShell } from '../../../shenlun-shell';
import { HotspotStaticIndex } from '../writing-static-pages';

export const metadata: Metadata = {
  title: '热点时评｜写作积累｜答卷之外',
  description: '按八大知识领域选择申论热点时评文章。',
};

export default function HotspotWritingIndexPage() {
  return <ShenlunShell tone="writing" eyebrow="HOT TOPICS / 热点时评" title="热点时评" desc="先选领域，再读文章。每个领域独立成页，不需要一次加载全部84篇正文。">
    <section className="shenlun-content framework-content writing-content"><HotspotStaticIndex /></section>
  </ShenlunShell>;
}
