import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';
import { questionTypeLinks } from './question-type-knowledge';

export const metadata: Metadata = {
  title: '方法框架｜申论学习｜答卷之外',
  description: '申论五大题型、核心能力、表达规则与实用技巧。',
};

const blocks = [
  {
    no: '01',
    title: '题型框架',
    desc: '五大题型分别建立独立知识页。先判断题目要求完成什么任务，再进入对应方法学习。提分提醒直接放在每种题型内部。',
    items: ['归纳概括：找全、分准、压缩', '综合分析：解释、分析、判断', '提出对策：问题对应、措施落地', '贯彻执行：任务、对象、情境适配', '文章写作：立意、分论、论证成文'],
  },
  {
    no: '02',
    title: '核心能力',
    desc: '申论真正考的不是“记住多少”，而是能不能把材料转化成有效表达。',
    items: ['阅读理解：识别主体、问题与关系', '归纳概括：压缩信息、提炼共性', '综合分析：搭建因果与价值判断', '解决问题：提出匹配、可执行的办法', '文字表达：准确、简洁、有层次'],
  },
  {
    no: '03',
    title: '表达规则',
    desc: '答案不是越像公文越好，而是要做到信息准确、结构清楚、语言有分寸。',
    items: ['先答题目，再补背景', '同类要点尽量并列', '一个要点只承担一个核心意思', '优先使用材料中的规范用词', '避免空泛口号和重复解释'],
  },
  {
    no: '04',
    title: '实用技巧',
    desc: '把真正能提高读题、找点、分类、压缩和复盘效率的方法集中起来，技巧必须服务基本功。',
    items: ['题干定位：对象、任务、身份、范围先圈清', '主体识别：谁有问题、谁行动、谁受影响', '逻辑抓取：转折、因果、并列、递进提示要点关系', '案例转译：把故事还原成问题、原因、做法或成效', '材料分层：段落贴标签，同类信息再合并', '限时复盘：检查漏点、错分、表达和时间'],
  },
] as const;

export default function FrameworkPage() {
  return (
    <ShenlunShell tone="framework" eyebrow="METHOD / 先搭骨架，再谈提分" title="方法框架" desc="把五大题型、申论能力、表达规则和实用技巧放在同一张知识地图上。遇到新题时，不靠猜套路，而是知道自己正在完成哪一步。">
      <section className="shenlun-content">
        <div className="shenlun-section-head">
          <span>KNOWLEDGE MAP / 知识地图</span>
          <h2>四层框架，<br />先把申论学明白。</h2>
          <p>第一次系统学习时先认识四层框架；真正刷题时，再从下面五大题型进入独立知识页。技巧不悬空，所有提醒都回到具体题型和具体动作。</p>
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

        <div className="shenlun-section-head question-type-entry-head">
          <span>FIVE TYPES / 五大题型</span>
          <h2>每一类题，<br />单独学透。</h2>
          <p>点击进入独立知识页。每页统一按照“任务 → 审题 → 材料处理 → 答案结构 → 高频提醒 → 常见误区 → 练习方向”展开。</p>
        </div>
        <div className="question-type-entry-grid">
          {questionTypeLinks.map((item) => (
            <a className="question-type-entry-card" href={`/shenlun/framework/${item.slug}/`} key={item.slug}>
              <span>{item.no} / {item.en}</span>
              <h3>{item.title}</h3>
              <p>{item.tagline}</p>
              <b>进入知识页 ↗</b>
            </a>
          ))}
        </div>
      </section>
    </ShenlunShell>
  );
}
