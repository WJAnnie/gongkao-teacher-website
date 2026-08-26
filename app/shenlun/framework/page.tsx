import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';

export const metadata: Metadata = {
  title: '方法框架｜申论学习｜答卷之外',
  description: '申论五大题型、核心能力、表达规范与重点技巧。',
};

const blocks = [
  {
    no: '01',
    title: '题型框架',
    desc: '先认清题目在要求你完成什么任务，再决定如何读材料、如何组织答案。',
    items: ['归纳概括：找准对象，分类合并', '综合分析：解释关系，建立逻辑', '提出对策：问题对应，措施落地', '贯彻执行：对象明确，文种得体', '文章写作：立意清楚，论证完整'],
  },
  {
    no: '02',
    title: '核心能力',
    desc: '申论真正考的不是“记住多少”，而是能不能把材料转化成有效表达。',
    items: ['阅读理解：识别主体、问题与关系', '归纳概括：压缩信息、提炼共性', '综合分析：搭建因果与价值判断', '解决问题：提出匹配、可执行的办法', '文字表达：准确、简洁、有层次'],
  },
  {
    no: '03',
    title: '表达规范',
    desc: '答案不是越像公文越好，而是要做到信息准确、结构清楚、语言有分寸。',
    items: ['先答题目，再补背景', '同类要点尽量并列', '一个要点只承担一个核心意思', '优先使用材料中的规范表达', '避免空泛口号和重复解释'],
  },
  {
    no: '04',
    title: '提分技巧',
    desc: '技巧只在基本功之上才有用。这里保留真正能迁移到下一道题的方法。',
    items: ['主体—动作—结果：快速重建材料骨架', '问题—原因—影响—对策：辅助分类', '题干动词决定答案任务', '先列结构，再控制字数', '做完复盘：漏点、错分、表达、时间'],
  },
] as const;

export default function FrameworkPage() {
  return (
    <ShenlunShell tone="framework" eyebrow="METHOD / 先搭骨架，再谈提分" title="方法框架" desc="把五大题型、申论能力、表达规则和重点技巧放在同一张知识地图上。遇到新题时，不靠猜套路，而是知道自己正在完成哪一步。">
      <section className="shenlun-content">
        <div className="shenlun-section-head">
          <span>KNOWLEDGE MAP / 知识地图</span>
          <h2>四层框架，<br />先把申论学明白。</h2>
          <p>建议第一次系统学习时从 01 顺着看到 04；后续刷题遇到问题，再按症状返回对应模块。</p>
        </div>
        <div className="shenlun-map-grid">
          {blocks.map((block) => (
            <article className="shenlun-map-card" key={block.no}>
              <span>{block.no}</span>
              <h3>{block.title}</h3>
              <p>{block.desc}</p>
              <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
    </ShenlunShell>
  );
}
