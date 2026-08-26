import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';

export const metadata: Metadata = {
  title: '方法框架｜申论学习｜答卷之外',
  description: '申论五大题型、核心能力、表达规则与材料精读。',
};

const blocks = [
  {
    no: '01',
    title: '题型框架',
    desc: '先认清题目在要求你完成什么任务，再决定如何读材料、如何组织答案。每类题都把最关键的提分提醒放在框架里。',
    items: [
      '归纳概括：找准对象，分类合并｜提醒：同义归并，不漏主体',
      '综合分析：解释关系，建立逻辑｜提醒：先解释，再判断',
      '提出对策：问题对应，措施落地｜提醒：谁来做、做什么、怎么做',
      '贯彻执行：对象明确，文种得体｜提醒：任务决定内容，身份决定语气',
      '文章写作：立意清楚，论证完整｜提醒：分论点必须共同支撑总论点',
    ],
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
    title: '材料精读',
    desc: '申论阅读不是从头到尾“看懂故事”，而是带着任务拆材料、找关系、提信息。',
    items: ['先读题干：用作答对象和任务限定阅读范围', '抓主体：谁遇到问题、谁采取行动、谁受到影响', '看逻辑词：转折、因果、并列、递进往往提示要点关系', '做案例转译：把人物故事还原成做法、问题、原因或成效', '分材料层次：给段落贴标签，再判断哪些信息可以合并'],
  },
] as const;

export default function FrameworkPage() {
  return (
    <ShenlunShell tone="framework" eyebrow="METHOD / 先搭骨架，再谈提分" title="方法框架" desc="把五大题型、申论能力、表达规则和材料精读放在同一张知识地图上。遇到新题时，不靠猜套路，而是知道自己正在完成哪一步。">
      <section className="shenlun-content">
        <div className="shenlun-section-head">
          <span>KNOWLEDGE MAP / 知识地图</span>
          <h2>四层框架，<br />先把申论学明白。</h2>
          <p>建议第一次系统学习时从 01 顺着看到 04；后续刷题遇到问题，再按症状返回对应模块。提分技巧不单独悬空，而是直接放回各题型的关键提醒中。</p>
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
