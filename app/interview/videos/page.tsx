import type { Metadata } from 'next';
import { InterviewShell } from '../interview-shell';

export const metadata: Metadata = {
  title: '课程现场｜面试学习｜答卷之外',
  description: '结构化面试课程精讲、课堂实录与教学日常。',
};

const cards = [
  ['01', '课程精讲', '把一个方法讲透：为什么这样想、怎么组织、哪里最容易出错。'],
  ['02', '课堂实录', '保留学生现场作答、追问、修改和重新表达的过程。'],
  ['03', '真题讲评', '围绕真实面试题展示审题、搭框架、举例和语言调整。'],
  ['04', '工作日常', '记录备课、批改、课堂准备和教学观察中的真实片段。'],
  ['05', '碎片分享', '短视频形式记录一个表达提醒、一个题型误区或一个临场技巧。'],
  ['06', '课程索引', '后续可按题型、主题和课程系列筛选，快速找到对应视频。'],
] as const;

export default function InterviewVideosPage() {
  return (
    <InterviewShell tone="videos" eyebrow="CLASSROOM / 把课堂搬到网站里" title="课程现场" desc="这里专门放你的课程、上课过程和日常工作视频。网站不替视频造内容，只负责把真实课堂整理成清晰、可检索的学习档案。">
      <section className="interview-content">
        <div className="interview-content-head"><span>VIDEO ARCHIVE / 影像档案</span><h2>课程、课堂、<br />还有日常。</h2></div>
        <div className="interview-card-grid">
          {cards.map(([no, title, desc]) => <article className="interview-card" key={title}><span>{no}</span><h3>{title}</h3><p>{desc}</p></article>)}
        </div>
        <p className="interview-note">等你提供自己的视频文件或公开链接后，可以直接替换为真实视频卡片，并按课程、课堂、工作日常和碎片分享分类。</p>
      </section>
    </InterviewShell>
  );
}
