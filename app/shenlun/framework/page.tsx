import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';
import { questionTypeKnowledge } from './question-type-knowledge';
import { QuestionTypeSwitcher } from './question-type-switcher';
import { FrameworkExpressionStepper } from './framework-expression-stepper';

export const metadata: Metadata = {
  title: '方法框架｜申论学习｜答卷之外',
  description: '申论表达规则、五大题型框架、核心能力与实用技巧。',
};

const questionTypes = ['summary', 'analysis', 'solution', 'implementation', 'essay'].map((slug) => questionTypeKnowledge[slug]);

const typeItems = [
  '归纳概括：找全、分准、压缩',
  '综合分析：解释、分析、判断',
  '提出对策：问题对应、措施落地',
  '贯彻执行：任务、对象、情境适配',
  '文章写作：立意、分论、论证成文',
] as const;

const abilityItems = [
  '阅读理解：识别主体、问题与关系',
  '归纳概括：压缩信息、提炼共性',
  '综合分析：搭建因果与价值判断',
  '解决问题：提出匹配、可执行的办法',
  '文字表达：准确、简洁、有层次',
] as const;

const tipItems = [
  '题干定位：对象、任务、身份、范围先圈清',
  '主体识别：谁有问题、谁行动、谁受影响',
  '逻辑抓取：转折、因果、并列、递进提示要点关系',
  '案例转译：把故事还原成问题、原因、做法或成效',
  '材料分层：段落贴标签，同类信息再合并',
  '限时复盘：检查漏点、错分、表达和时间',
] as const;

function LayerSummary({ no, title, desc, items }: { no: string; title: string; desc: string; items: readonly string[] }) {
  return (
    <div className="framework-layer-summary">
      <span>{no} / METHOD LAYER</span>
      <h3>{title}</h3>
      <p>{desc}</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}

export default function FrameworkPage() {
  return (
    <ShenlunShell tone="framework" eyebrow="METHOD / 方法框架" title="方法框架" desc="表达规则、题型框架、核心能力和实用技巧放在一张学习地图里。做题时先判断任务，再找对应方法。">
      <section className="shenlun-content framework-content">
        <div className="shenlun-section-head">
          <span>KNOWLEDGE MAP / 知识地图</span>
          <h2>四层框架，<br />按顺序往下学。</h2>
          <p>先把表达规则建立起来，再认识五大题型；之后补齐核心能力和实用技巧。需要回看时，可以直接用上方本页导览跳到对应位置。</p>
        </div>

        <div className="framework-layer-stack">
          <section className="framework-layer-section framework-expression-layer" id="framework-expression">
            <LayerSummary
              no="01"
              title="表达规则"
              desc="这一部分先把申论从头讲明白：考试是什么、答题卡长什么样、题怎么审、材料怎么看、答案怎样提炼和组织。小白先建立完整认识，做过题的同学再回来补底层逻辑。"
              items={[
                '先认识考试和答题卡，再进入方法',
                '审题固定看：范围、对象、问法、要求、字数',
                '读材料始终围绕对象和要素判断',
                '从材料到答案，要处理层级和逻辑关系',
              ]}
            />
            <FrameworkExpressionStepper />
          </section>

          <section className="framework-layer-section framework-layer-types" id="framework-types">
            <LayerSummary
              no="02"
              title="题型框架"
              desc="先认清题目要完成的任务，再进对应题型。五类题分别看审题、材料处理、答案结构和常见失分点。"
              items={typeItems}
            />
            <div className="framework-type-detail-head">
              <span>FIVE TYPES / 五大题型</span>
              <p>点选题型，只切换下面这一块方法内容，始终留在当前页面。</p>
            </div>
            <QuestionTypeSwitcher items={questionTypes} />
          </section>

          <section className="framework-layer-section" id="framework-abilities">
            <LayerSummary
              no="03"
              title="核心能力"
              desc="申论的几项基本功会反复出现在不同题型里。读懂材料、提炼信息、理清关系、解决问题、准确表达，都要单独练。"
              items={abilityItems}
            />
          </section>

          <section className="framework-layer-section" id="framework-tips">
            <LayerSummary
              no="04"
              title="实用技巧"
              desc="这些动作主要解决读题慢、找点乱、分类难和写完没法复盘的问题。做题时按需调用，练熟以后会越来越顺手。"
              items={tipItems}
            />
          </section>
        </div>
      </section>
    </ShenlunShell>
  );
}
