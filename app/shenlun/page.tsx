import type { Metadata } from 'next';
import { ShenlunShell } from '../shenlun-shell';

export const metadata: Metadata = {
  title: '申论学习｜答卷之外',
  description: '申论方法框架、历年真题、写作积累与课程现场。',
};

const links = [
  ['01 / METHOD', '方法框架', '五大题型、核心能力、表达规则与材料精读，先把申论的知识骨架搭起来。', '/shenlun/framework/'],
  ['02 / PRACTICE', '真题精练', '从国考到各地申论真题，按年份、地区和题型进入真实材料，题目与答案放在同一条记录里。', '/shenlun/questions/'],
  ['03 / WRITING', '写作积累', '热点、案例、句式、比喻、作文框架、佳句、名言与规范用词，建立自己的写作素材系统。', '/shenlun/writing/'],
  ['04 / VIDEO', '课程现场', '自己的课程精讲、课堂实录、工作日常与碎片分享，保留真实教学过程。', '/shenlun/videos/'],
] as const;

export default function ShenlunPage() {
  return (
    <ShenlunShell tone="home" eyebrow="SHENLUN LEARNING MAP / 申论学习地图" title="把申论，学成一套能反复使用的方法。" desc="不是把知识点越堆越多，而是把方法、真题、积累和课堂串成一条可以长期复习的学习路径。">
      <section className="shenlun-content">
        <div className="shenlun-section-head">
          <span>START / 从这里进入</span>
          <h2>四个入口，<br />解决四类问题。</h2>
          <p>不知道怎么答，就回方法框架；方法懂了不会用，就去真题精练；作文没内容，就做写作积累；想看老师怎么讲、怎么改、怎么工作，就进课程现场。</p>
        </div>
        <div className="shenlun-home-grid">
          {links.map(([no, title, desc, href]) => (
            <a className="shenlun-home-link" href={href} key={title}>
              <span>{no}</span><h2>{title}</h2><p>{desc}</p><b>↗</b>
            </a>
          ))}
        </div>
      </section>
    </ShenlunShell>
  );
}
