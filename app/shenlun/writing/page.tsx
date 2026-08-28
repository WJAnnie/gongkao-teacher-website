import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';
import { WritingHotspotManual } from './writing-hotspot-manual';

export const metadata: Metadata = {
  title: '写作积累｜申论学习｜答卷之外',
  description: '按热点时评、案例素材、规范用词、句式表达与作文框架整理申论写作积累；热点时评按八大知识领域分类。',
};

export default function ShenlunWritingPage() {
  return (
    <ShenlunShell
      tone="writing"
      eyebrow="WRITING LIBRARY / 写作积累"
      title="写作积累"
      desc="先读懂一个主题，再学会它怎样立意、怎样展开、怎样表达。热点时评按八大知识领域整理，文章中的总论点、分论点和可积累表达会直接标出来。"
    >
      <section className="shenlun-content framework-content writing-content">
        <WritingHotspotManual />
      </section>
    </ShenlunShell>
  );
}
