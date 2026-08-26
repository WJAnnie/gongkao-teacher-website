import type { Metadata } from 'next';
import { questions } from '../../question-bank-data';
import { ShenlunShell } from '../../shenlun-shell';

export const metadata: Metadata = {
  title: '真题精练｜申论学习｜答卷之外',
  description: '国考与各地申论历年真题索引、训练重点和题内参考作答方向。',
};

const regions = [
  ['国考申论', '2020—2025 地市级已建立首批索引', '已上线'],
  ['省考联考', '按年份整理联考申论真题与本站答案', '持续补充'],
  ['广东 / 深圳', '乡镇、县级及行政执法卷分类整理', '待整理'],
  ['江苏 / 浙江', '按地区特色与题型建立专题索引', '待整理'],
  ['山东 / 四川', '真题、作答思路与易错点逐套补齐', '待整理'],
  ['其他地区', '后续按使用需求继续增加省份入口', '持续扩容'],
] as const;

export default function ShenlunQuestionsPage() {
  const shenlunQuestions = questions.filter((item) => item.subject === '申论');
  return (
    <ShenlunShell tone="questions" eyebrow="PAST PAPERS / 把方法放回真实试卷" title="真题精练" desc="真题不是拿来收藏的。按年份、地区和题型进入真实任务，每道真题内部直接放训练重点、参考作答方向和后续完整答案，不再另设一个答案栏目。">
      <section className="shenlun-content">
        <div className="shenlun-section-head">
          <span>EXAM ARCHIVE / 考试档案</span>
          <h2>先国考，<br />再扩到各地。</h2>
          <p>当前首批已经整理 2020—2025 国考地市级主要作答任务；省考联考和地方卷将在这个结构里继续补齐。题目和答案始终放在同一条真题记录中，减少来回跳转。</p>
        </div>
        <div className="shenlun-map-grid">
          {regions.map(([title, desc, status], index) => (
            <article className="shenlun-map-card" key={title}>
              <span>0{index + 1}</span><h3>{title}</h3><p>{desc}</p><ul><li>{status}</li><li>真题 + 答案一体整理</li></ul>
            </article>
          ))}
        </div>

        <div className="shenlun-section-head" style={{ marginTop: '90px' }}>
          <span>NATIONAL EXAM / 国考申论</span>
          <h2>2020—2025<br />首批真题索引</h2>
          <p>下面展示题意摘要而非复制整套试卷。每道题的右侧直接保留参考作答方向；后续增加你的完整答案、采分点和视频讲解时，也继续放在这道真题内部。</p>
        </div>
        <div className="shenlun-question-toolbar">
          <span>归纳概括</span><span>综合分析</span><span>提出对策</span><span>贯彻执行</span><span>文章写作</span>
        </div>
        <div className="shenlun-question-list">
          {shenlunQuestions.map((item) => (
            <article className="shenlun-question-row" key={item.id}>
              <div className="meta">{item.year}<br />{item.exam}<br />{item.type} · {item.topic}</div>
              <div><h3>{item.summary}</h3><p>训练重点：{item.focus}<br />来源性质：{item.source}</p></div>
              <div className="answer"><strong>参考作答方向</strong><br />{item.focus}<br /><br />完整答案 / 课堂解析：持续整理</div>
            </article>
          ))}
        </div>
      </section>
    </ShenlunShell>
  );
}
