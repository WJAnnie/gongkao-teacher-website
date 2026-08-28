import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';
import { WritingLibraryManual } from './writing-library-manual';
import { WritingHeroBridge } from './writing-hero-bridge';

export const metadata: Metadata = {
  title: '写作积累｜申论学习｜答卷之外',
  description: '按热点时评、案例素材、规范用词、比喻表达与作文框架整理申论写作积累。',
};

export default function ShenlunWritingPage() {
  return (
    <ShenlunShell
      tone="writing"
      eyebrow="WRITING LIBRARY / 写作积累"
      title="写作积累"
      desc="先读懂一个主题，再学会它怎样立意、怎样展开、怎样表达。当前内容库 v2026.08.28：热点时评 84 篇｜案例素材 120 个｜比喻用词 242 条。"
    >
      <WritingHeroBridge />
      <section className="shenlun-content framework-content writing-content">
        <WritingLibraryManual />
      </section>
    </ShenlunShell>
  );
}
