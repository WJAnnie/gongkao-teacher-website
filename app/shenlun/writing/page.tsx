import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';
import { WritingStaticLanding } from './writing-static-pages';

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
      desc="先选你现在真正需要的积累内容，再进入对应静态页面。当前内容库：热点时评 84 篇｜案例素材 120 个｜比喻用词 242 条。"
    >
      <section className="shenlun-content framework-content writing-content">
        <WritingStaticLanding />
      </section>
    </ShenlunShell>
  );
}
