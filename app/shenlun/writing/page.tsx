import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';
import { WritingLibraryManual } from './writing-library-manual';

export const metadata: Metadata = {
  title: '写作积累｜申论学习｜答卷之外',
  description: '按热点时评、案例素材、规范用词、比喻表达与作文框架整理申论写作积累。',
};

export default function ShenlunWritingPage() {
  return (
    <ShenlunShell
      tone="writing"
      eyebrow="申论写作积累"
      title="写作积累"
      desc="从热点、案例、规范用词和作文框架里选材料，练习把积累写进分论点和论证段。"
    >
      <section className="shenlun-content framework-content writing-content">
        <WritingLibraryManual />
      </section>
    </ShenlunShell>
  );
}
