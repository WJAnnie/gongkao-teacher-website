import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';
import { WritingHotspotManual } from './writing-hotspot-manual';

export const metadata: Metadata = {
  title: '写作积累｜申论学习｜答卷之外',
  description: '按发展、文化、民生、政务、基层、法治、价值观念与时代议题整理申论热点时评，训练观点、分论点与文章表达。',
};

export default function ShenlunWritingPage() {
  return (
    <ShenlunShell
      tone="writing"
      eyebrow="WRITING LIBRARY / 写作积累"
      title="写作积累"
      desc="不做零散金句仓库。先按主题建立认识，再学习一篇文章如何从开头立意、分论点展开到结尾收束，最后把观点变成自己能调用的写作积累。"
    >
      <section className="shenlun-content framework-content writing-content">
        <div className="shenlun-section-head">
          <span>HOT TOPIC MANUAL / 热点时评手册</span>
          <h2>先建立主题认知，<br />再把观点写成文章。</h2>
          <p>左侧按八大知识领域展开母题，右侧只阅读当前文章。每篇控制在约1000—1200字：开头完成破题与立意，主体用三个相对工整的分论点推进，最后用100字以上完成收束。</p>
        </div>
        <WritingHotspotManual />
      </section>
    </ShenlunShell>
  );
}
