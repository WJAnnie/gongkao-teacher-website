import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';
import { WritingHotspotManual } from './writing-hotspot-manual';

export const metadata: Metadata = {
  title: '写作积累｜申论学习｜答卷之外',
  description: '按热点时评、案例素材、规范用词、句式表达与作文框架整理申论写作积累；热点时评再按八大知识领域分类。',
};

export default function ShenlunWritingPage() {
  return (
    <ShenlunShell
      tone="writing"
      eyebrow="WRITING LIBRARY / 写作积累"
      title="写作积累"
      desc="不做零散金句仓库。先通过热点时评建立主题认识，再把案例、词语、句式和文章结构分别整理，最后变成自己能调用的写作积累。"
    >
      <section className="shenlun-content framework-content writing-content">
        <div className="shenlun-section-head">
          <span>WRITING MANUAL / 写作积累手册</span>
          <h2>先选积累方式，<br />再进入具体主题。</h2>
          <p>左侧一级目录保留热点时评、案例素材、规范用词等写作模块；热点时评内部再按八大知识领域展开。当前文章仍按约1000—1200字控制：开头完成破题与立意，主体用三个相对工整的分论点推进，最后用100字以上完成收束。</p>
        </div>
        <WritingHotspotManual />
      </section>
    </ShenlunShell>
  );
}
