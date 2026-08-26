import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';

export const metadata: Metadata = {
  title: '课程现场｜申论学习｜答卷之外',
  description: '申论课程精讲、课堂实录、工作日常与教学碎片视频。',
};

const videoSections = [
  ['01 / COURSE', '课程精讲', '题型方法、材料阅读、规范表达和文章写作，按知识点整理成可以反复回看的课程片段。', '题型方法 · 材料阅读 · 文章写作'],
  ['02 / CLASSROOM', '课堂实录', '讲题、追问、学员卡点和现场修改都保留下来，方便看到思路是怎么一步步调整的。', '讲题 · 修改 · 重做 · 复盘'],
  ['03 / WORKLOG', '工作日常', '备课、批改、选题、整理资料、复盘课堂，这些工作细节也会放进课程档案里。', '备课 · 批改 · 选题 · 复盘'],
  ['04 / NOTES', '碎片分享', '一个表达、一条热点、一处常见误区，适合短时间看完，也方便以后回查。', '表达 · 热点 · 误区 · 随手记'],
] as const;

const flow = [
  ['01', '先自己做', '看讲解前先列一遍提纲，哪怕只写几个关键词。'],
  ['02', '记一个点', '一段视频只留一个真正有用的提醒。'],
  ['03', '关掉重做', '看完以后重新写一遍或说一遍。'],
  ['04', '放回真题', '把学到的方法放到下一道真题里检验。'],
] as const;

export default function ShenlunVideosPage() {
  return (
    <ShenlunShell tone="videos" eyebrow="VIDEO ARCHIVE / 课程现场" title="课程现场" desc="课程、课堂和工作日常放在同一个地方。看一段，记一个点，再回到真题里练一遍。">
      <section className="shenlun-content">
        <div className="shenlun-section-head">
          <span>VIDEO ARCHIVE / 影像档案</span>
          <h2>课程、课堂，<br />还有日常。</h2>
          <p>四类内容按场景归档，找课程、找讲题、找课堂片段都会更快。</p>
        </div>
        <div className="video-grid">
          {videoSections.map(([no, title, desc, note]) => (
            <article className="video-card" key={title}>
              <span>{no}</span><h3>{title}</h3><p>{desc}</p><small>{note}</small>
            </article>
          ))}
        </div>

        <div className="interview-learning-flow">
          {flow.map(([no, title, desc]) => <article className="interview-flow-step" key={no}><span>{no}</span><h3>{title}</h3><p>{desc}</p></article>)}
        </div>
      </section>
    </ShenlunShell>
  );
}
