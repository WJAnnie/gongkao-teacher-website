import type { Metadata } from 'next';
import { InterviewShell } from '../interview-shell';

export const metadata: Metadata = {
  title: '课程现场｜面试学习｜答卷之外',
  description: '结构化面试课程精讲、课堂实录与教学日常。',
};

const cards = [
  ['01', '课程精讲', '题型方法、答题结构、表达训练，按主题整理成可以反复回看的课程片段。'],
  ['02', '课堂实录', '保留现场作答、追问、修改和重答，能看见答案是怎么一点点变清楚的。'],
  ['03', '真题讲评', '从审题到开口完整走一遍，重点看题目里的任务和取舍。'],
  ['04', '工作日常', '备课、批改、选题、课堂准备和课后复盘里的真实片段。'],
  ['05', '碎片分享', '一个提醒、一个误区、一个表达细节，适合随手看一段。'],
  ['06', '系列索引', '按题型、主题和课程系列归档，方便从一节课继续找到相关内容。'],
] as const;

const flow = [
  ['01', '先看题', '先自己想 1 分钟，再打开讲解。'],
  ['02', '记关键词', '只记判断、结构和最有用的一句话。'],
  ['03', '关掉视频', '按自己的语言重答一次。'],
  ['04', '留一条笔记', '记录今天最想带走的一个提醒。'],
] as const;

export default function InterviewVideosPage() {
  return (
    <InterviewShell tone="videos" eyebrow="CLASSROOM / 课程现场" title="课程现场" desc="课程、课堂、真题讲评和教学日常都放在这里。看完一段，最好自己再开口答一次。">
      <section className="interview-content">
        <div className="interview-content-head">
          <span>VIDEO ARCHIVE / 影像档案</span>
          <h2>课程、课堂，<br />还有日常。</h2>
        </div>
        <div className="interview-card-grid">
          {cards.map(([no, title, desc]) => <article className="interview-card" key={title}><span>{no}</span><h3>{title}</h3><p>{desc}</p></article>)}
        </div>

        <div className="interview-learning-flow">
          {flow.map(([no, title, desc]) => <article className="interview-flow-step" key={no}><span>{no}</span><h3>{title}</h3><p>{desc}</p></article>)}
        </div>

        <div className="interview-practice-board">
          <article>
            <span>CLASS / 看课堂</span>
            <h3>重点看修改过程。</h3>
            <p>一遍作答很难说明问题。课堂里真正有用的部分，往往是追问之后怎么调整观点和表达。</p>
            <ul><li>原回答卡在哪里</li><li>老师追问了什么</li><li>第二遍改了哪一句</li></ul>
          </article>
          <article>
            <span>NOTE / 课后笔记</span>
            <h3>每段视频留一条。</h3>
            <p>笔记不用长，能在下一道题里用出来就够了。</p>
            <ul><li>一个审题提醒</li><li>一个结构动作</li><li>一句更自然的表达</li><li>一道想重答的题</li></ul>
          </article>
        </div>
      </section>
    </InterviewShell>
  );
}
