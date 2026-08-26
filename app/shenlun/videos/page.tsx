import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';

export const metadata: Metadata = {
  title: '课程现场｜申论学习｜答卷之外',
  description: '申论课程精讲、课堂实录、工作日常与教学碎片视频。',
};

const videoSections = [
  ['01 / COURSE', '课程精讲', '把完整课程拆成可以反复观看的知识片段：题型方法、材料阅读、作文写作和专项训练。', '待接入你的课程视频链接 / 封面'],
  ['02 / CLASSROOM', '课堂实录', '保留真实上课过程中的讲题、追问、学员卡点和现场修改，让“怎么教”也成为内容。', '待接入课堂录像 / 录屏片段'],
  ['03 / WORKLOG', '工作日常', '备课、批改、选题、整理资料、复盘课堂——把一位申论老师真实工作的过程记录下来。', '适合日常短视频 / Vlog'],
  ['04 / NOTES', '碎片分享', '一分钟讲清一个表达、一个热点、一个常见误区。轻量，但仍然服务申论学习。', '适合竖屏短视频 / 随手记录'],
] as const;

export default function ShenlunVideosPage() {
  return (
    <ShenlunShell tone="videos" eyebrow="VIDEO ARCHIVE / 课程与教学现场" title="课程现场" desc="这里不做“网课货架”，而是保存你的课程、课堂和工作过程。用户既能学知识，也能看见一位老师如何备课、讲课、批改与复盘。">
      <section className="shenlun-content">
        <div className="shenlun-section-head">
          <span>YOUR VIDEO LIBRARY / 你的影像档案</span>
          <h2>课程之外，<br />也记录老师本人。</h2>
          <p>目前先把四类视频容器设计好。等你给我真实视频、B站/小红书/视频号链接或本地素材后，可以直接替换这些位置，不需要重新改页面结构。</p>
        </div>
        <div className="video-grid">
          {videoSections.map(([no, title, desc, note]) => (
            <article className="video-card" key={title}>
              <span>{no}</span><h3>{title}</h3><p>{desc}</p><small>{note}</small>
            </article>
          ))}
        </div>
      </section>
    </ShenlunShell>
  );
}
