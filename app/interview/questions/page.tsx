import type { Metadata } from 'next';
import { InterviewShell } from '../interview-shell';

export const metadata: Metadata = {
  title: '真题实战｜面试学习｜答卷之外',
  description: '按系统、地区和年份整理结构化面试公开回忆真题。',
};

const cards = [
  ['01', '国考系统', '按税务、海关、铁路公安等系统整理公开回忆题，保留题目背景、任务和训练重点。'],
  ['02', '省考地区', '按地区和年份建立面试真题索引，方便观察不同地区的命题偏好。'],
  ['03', '题型筛选', '从综合分析、计划组织、应急应变、情景模拟等角度做专项训练。'],
  ['04', '限时作答', '用真实考场时间组织观点、提纲和口头表达，训练节奏而不是只看答案。'],
  ['05', '答后复盘', '检查是否完成任务、结构是否清楚、例子是否有效、语言是否自然。'],
  ['06', '课堂讲评', '后续把个人讲题、课堂片段和真题点评直接挂到对应题目下。'],
] as const;

export default function InterviewQuestionsPage() {
  return (
    <InterviewShell tone="questions" eyebrow="PRACTICE / 真题回到真实考场" title="真题实战" desc="真题不单独做成答案仓库，而是把题目、训练重点、参考思路、个人讲解和复盘放在同一条记录里。">
      <section className="interview-content">
        <div className="interview-content-head"><span>REAL QUESTIONS / 真题训练</span><h2>按系统整理，<br />按题型练透。</h2></div>
        <div className="interview-card-grid">
          {cards.map(([no, title, desc]) => <article className="interview-card" key={title}><span>{no}</span><h3>{title}</h3><p>{desc}</p></article>)}
        </div>
        <p className="interview-note">目前网站已有一批 2024—2026 税务系统公开考生回忆题索引，后续继续扩展国考系统与各地省考面试真题。</p>
      </section>
    </InterviewShell>
  );
}
