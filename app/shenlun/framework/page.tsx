import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';
import { questionTypeKnowledge } from './question-type-knowledge';
import { QuestionTypeSwitcher } from './question-type-switcher';

export const metadata: Metadata = {
  title: '方法框架｜申论学习｜答卷之外',
  description: '申论五大题型、核心能力、表达规则与实用技巧。',
};

const blocks = [
  { no: '01', title: '题型框架', desc: '先认清题目要完成的任务，再进对应题型。五类题分别看审题、材料处理、答案结构和常见失分点。', items: ['归纳概括：找全、分准、压缩', '综合分析：解释、分析、判断', '提出对策：问题对应、措施落地', '贯彻执行：任务、对象、情境适配', '文章写作：立意、分论、论证成文'] },
  { no: '02', title: '核心能力', desc: '申论的几项基本功会反复出现在不同题型里。读懂材料、提炼信息、理清关系、解决问题、准确表达，都要单独练。', items: ['阅读理解：识别主体、问题与关系', '归纳概括：压缩信息、提炼共性', '综合分析：搭建因果与价值判断', '解决问题：提出匹配、可执行的办法', '文字表达：准确、简洁、有层次'] },
  { no: '03', title: '表达规则', desc: '答案要让阅卷人快速看见信息。要点明确、层次清楚、用词准确，材料里的规范表达尽量用起来。', items: ['先回应题目，再展开说明', '同类要点尽量并列', '一个要点承担一个核心意思', '优先使用材料中的规范用词', '删掉空话和重复解释'] },
  { no: '04', title: '实用技巧', desc: '这些动作主要解决读题慢、找点乱、分类难和写完没法复盘的问题。做题时按需调用，练熟以后会越来越顺手。', items: ['题干定位：对象、任务、身份、范围先圈清', '主体识别：谁有问题、谁行动、谁受影响', '逻辑抓取：转折、因果、并列、递进提示要点关系', '案例转译：把故事还原成问题、原因、做法或成效', '材料分层：段落贴标签，同类信息再合并', '限时复盘：检查漏点、错分、表达和时间'] },
] as const;

const questionTypes = ['summary', 'analysis', 'solution', 'implementation', 'essay'].map((slug) => questionTypeKnowledge[slug]);

export default function FrameworkPage() {
  return (
    <ShenlunShell tone="framework" eyebrow="METHOD / 方法框架" title="方法框架" desc="五大题型、核心能力、表达规则和实用技巧放在一张学习地图里。做题时先判断任务，再找对应方法。">
      <section className="shenlun-content">
        <div className="shenlun-section-head">
          <span>KNOWLEDGE MAP / 知识地图</span>
          <h2>四层框架，<br />把基础搭稳。</h2>
          <p>先认识四层框架，再进入具体题型。刷题时也可以随时回来查阅读、表达和复盘方法。</p>
        </div>
        <div className="shenlun-map-grid">
          {blocks.map((block) => (
            <article className="shenlun-map-card" key={block.no}>
              <span>{block.no}</span><h3>{block.title}</h3><p>{block.desc}</p>
              <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>

        <div className="shenlun-section-head question-type-entry-head">
          <span>FIVE TYPES / 五大题型</span>
          <h2>五类题型，<br />留在这一页学透。</h2>
          <p>点击上方本页导览或下面题型标签，只切换这一块内容，方法框架页本身保持不动。</p>
        </div>
        <QuestionTypeSwitcher items={questionTypes} />
      </section>
    </ShenlunShell>
  );
}
