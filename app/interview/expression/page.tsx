import type { Metadata } from 'next';
import { InterviewShell } from '../interview-shell';

export const metadata: Metadata = {
  title: '表达训练｜面试学习｜答卷之外',
  description: '结构化面试观点、结构、例证与自然表达训练。',
};

const cards = [
  ['01', '观点建立', '第一句话先承担判断任务，避免“辩证看待”等无效开头。'],
  ['02', '结构组织', '用清楚的并列、递进和因果关系，让听者能跟得上你的思路。'],
  ['03', '例证使用', '例子不是故事会，要明确它在证明哪个观点、说明什么机制。'],
  ['04', '自然表达', '把书面词汇转成适合口头说出的句子，减少模板腔和背稿感。'],
  ['05', '情景沟通', '根据对象、身份、情绪和目的调整语气，让答案像真实交流。'],
  ['06', '口头复盘', '录音后回听卡顿、重复、空话和逻辑断点，再做第二遍改答。'],
] as const;

export default function InterviewExpressionPage() {
  return (
    <InterviewShell tone="expression" eyebrow="SPEAK / 想清楚，再说清楚" title="表达训练" desc="面试表达不是把句子说得更漂亮，而是让判断、结构和语言真正连起来。这里专门练从“脑子里有”到“嘴上说得清”。">
      <section className="interview-content">
        <div className="interview-content-head"><span>EXPRESSION / 表达训练</span><h2>不背稿，<br />练自己的话。</h2></div>
        <div className="interview-card-grid">
          {cards.map(([no, title, desc]) => <article className="interview-card" key={title}><span>{no}</span><h3>{title}</h3><p>{desc}</p></article>)}
        </div>
        <p className="interview-note">后续会加入 30 秒观点训练、2 分钟结构训练、情景模拟和录音复盘等可直接使用的训练工具。</p>
      </section>
    </InterviewShell>
  );
}
