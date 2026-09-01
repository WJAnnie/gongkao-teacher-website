import type { Metadata } from 'next';
import { questions } from '../../question-bank-data';
import { ShenlunShell } from '../../shenlun-shell';

export const metadata: Metadata = {
  title: '真题精练｜申论学习｜答卷之外',
  description: '国考申论历年真题索引、训练重点和题内参考作答方向。',
};

const archiveCards = [
  ['01', '按年份看', '2020—2025', '连续看同一套试卷，更容易体会材料主题、题型组合和整卷节奏。', 'questions-years'],
  ['02', '按题型练', '五大题型', '归纳概括、综合分析、提出对策、贯彻执行、文章写作可以交叉训练。', 'questions-types'],
  ['03', '按主题复盘', '治理 · 民生 · 发展', '把不同年份里相近的主题放在一起，看材料表达和命题角度怎么变化。', 'questions-themes'],
] as const;

function suggestedTime(type: string) {
  if (type.includes('文章写作')) return '60 MIN';
  if (type.includes('贯彻执行')) return '30 MIN';
  return '20 MIN';
}

function reviewNote(type: string) {
  if (type.includes('归纳概括')) return '先找全，再合并';
  if (type.includes('综合分析')) return '先解释题眼';
  if (type.includes('提出对策')) return '问题要对应';
  if (type.includes('贯彻执行')) return '看身份，也看对象';
  if (type.includes('文章写作')) return '先把中心论点定稳';
  return '题干先圈清楚';
}

export default function ShenlunQuestionsPage() {
  const shenlunQuestions = questions.filter((item) => item.subject === '申论');
  return (
    <ShenlunShell tone="questions" eyebrow="PAST PAPERS / 真题精练" title="真题精练" desc="先从 2020—2025 国考地市级开始。按年份做整卷，按题型做专项，再用复盘把方法留下来。">
      <section className="shenlun-content">
        <div className="shenlun-section-head">
          <span>EXAM ARCHIVE / 真题档案</span>
          <h2>六年国考，<br />三种练法。</h2>
          <p>站内首批整理 30 道国考申论任务。题意摘要、训练重点和参考作答方向放在同一条记录里，做题和回看都更顺手。</p>
        </div>

        <div className="shenlun-map-grid">
          {archiveCards.map(([no, title, meta, desc, chapterId]) => (
            <article className="shenlun-map-card" id={chapterId} key={no}>
              <span>{no}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <ul><li>{meta}</li><li>题意摘要 + 训练重点 + 作答方向</li></ul>
            </article>
          ))}
        </div>

        <div className="shenlun-section-head" style={{ marginTop: '90px' }}>
          <span>NATIONAL EXAM / 国考申论</span>
          <h2>2020—2025<br />真题索引</h2>
          <p>每道题先看任务和训练重点，再进入作答。做完以后把自己的答案和参考方向放在一起对照。</p>
        </div>

        <div className="shenlun-question-toolbar">
          <span>归纳概括</span><span>综合分析</span><span>提出对策</span><span>贯彻执行</span><span>文章写作</span>
        </div>

        <div className="shenlun-question-list" id="questions-index">
          {shenlunQuestions.map((item, index) => (
            <article className="shenlun-question-row" key={item.id}>
              <div className="meta">
                <span className="question-paper-index">Q{String(index + 1).padStart(2, '0')}</span>
                {item.year}<br />{item.exam}<br />{item.type} · {item.topic}
                <span className="question-paper-time">训练建议 {suggestedTime(item.type)}</span>
              </div>
              <div>
                <h3>{item.summary}</h3>
                <p>训练重点：{item.focus}<br />来源性质：{item.source}</p>
              </div>
              <div className="answer"><strong>参考作答方向</strong><br />{item.focus}</div>
              <span className="teacher-margin-note" aria-hidden="true">{reviewNote(item.type)}</span>
            </article>
          ))}
        </div>
      </section>
    </ShenlunShell>
  );
}
