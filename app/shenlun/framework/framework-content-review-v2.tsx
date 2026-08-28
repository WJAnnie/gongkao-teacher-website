'use client';

import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { FrameworkTypeArticleV4 } from './framework-type-article-v4';
import { TypeDeep } from './framework-deep-enrichment';
import {
  AbilityDeepReviewed,
  ExpressionDeepReviewed,
  FrameworkAbilitiesReviewed,
} from './framework-content-review';

type ReplacementMap = Record<string, () => ReactNode>;

function rewriteByTitle(node: ReactNode, replacements: ReplacementMap): ReactNode {
  return Children.map(node, (child) => {
    if (!isValidElement(child)) return child;
    const props = child.props as { title?: unknown; children?: ReactNode };
    if (typeof props.title === 'string' && replacements[props.title]) return replacements[props.title]();
    if (props.children === undefined) return child;
    return cloneElement(
      child as ReactElement<{ children?: ReactNode }>,
      undefined,
      rewriteByTitle(props.children, replacements),
    );
  });
}

function ReviewExample({ label, title, children, note }: { label: string; title: string; children: ReactNode; note: ReactNode }) {
  return (
    <article className="framework-voice-example">
      <div><span className="framework-voice-example-label">{label}</span><h5>{title}</h5>{children}</div>
      <aside><b>阅 / 看这里</b>{note}</aside>
    </article>
  );
}

function ReviewCase({ label, title, children, note }: { label: string; title: string; children: ReactNode; note: ReactNode }) {
  return (
    <article className="framework-deep-case">
      <div className="framework-deep-case-copy"><span>{label}</span><h5>{title}</h5>{children}</div>
      <aside><b>阅 / 这道题看什么</b>{note}</aside>
    </article>
  );
}

const expressionExtraReplacements: ReplacementMap = {
  '为什么一则争议材料读完以后，不应该只剩“双方有分歧”？': () => (
    <ReviewCase
      label="社区宠物管理争议"
      title="一则争议材料为什么不能只按“居民说—物业说—社区说”来读？"
      note={<p>真正需要拆的是争议来源：公共空间使用边界、养宠规则是否明确、投诉处理是否及时、不同群体需求如何协调、责任主体有没有形成闭环。人物只是叙事顺序，关系才是答案结构。</p>}
    >
      <p>案例型争议材料常把不同人的说法交叉在一起。先按“规则—执行—沟通—利益—反馈”重新分部，再逐句判断，材料会比按人物顺序读清楚得多。</p>
    </ReviewCase>
  ),
};

const abilityExtraReplacements: ReplacementMap = {
  '材料只是介绍两种执法方式，题目要求评价，就必须从N走到ADJ': () => (
    <ReviewExample
      label="政务公开"
      title="材料只写“直播讲政策、公开办事流程、在线答疑”，题目问特点时还要走哪一步？"
      note={<p>三个动作是客观事实；如果题目问“政务公开有什么特点”，还要判断为公开方式更直观、互动性更强、政策解释更及时。评价必须有事实支撑，不是为了高级而硬加“XX化”。</p>}
    >
      <p>N→ADJ真正训练的是从事实到属性判断。先把材料看懂，再给它一个能够直接回应题干的准确形容。</p>
    </ReviewExample>
  ),
};

const typeBaseReplacements: ReplacementMap = {
  '多个案例、一段话作答时，最重要的是锁定“谁得到了什么好处”': () => (
    <ReviewExample
      label="成效判断"
      title="同一项城市书房服务，群众、运营方和城市分别发生了什么变化？"
      note={<p>成效题先锁定受益主体。延长开放时间让群众使用更便利；共建共享降低运营压力；阅读活动增加公共文化参与。题干问谁，就优先写谁的变化。</p>}
    >
      <p>材料可能同时写“夜间开放、社区共建、志愿者值守、活动增多”。这些是做法和现象；真正的效果要写清楚具体对象发生了什么积极变化。</p>
    </ReviewExample>
  ),
  '农贸市场的问题，为什么“居民大量增加”不能和“消防设施不全”简单并列？': () => (
    <ReviewExample
      label="乡村寄递"
      title="“网购需求增长”和“末端取件不便”为什么不是同层问题？"
      note={<p>需求增长是业务变化和压力背景；站点少、配送距离远、取件时间不稳定才直接回答寄递服务问题。先判要素，再决定归纳层级。</p>}
    >
      <p>如果把背景和问题全部并列，答案看似点多，实际上层级混乱。可以进一步归纳为“末端网点不足、配送成本较高、服务稳定性不强”等。</p>
    </ReviewExample>
  ),
  '一句话能够拆成A、B两个部分时，可以分别解释并展开': () => (
    <ReviewExample
      label="理解题 · 小切口与大民生"
      title="一句话里有两个概念，先分别解释还是先讲整体关系？"
      note={<p>如果材料反复强调“小切口解决大问题”，可以先整体解释二者关系，再写小切口如何回应具体需求；如果材料分别展开“小切口怎么找”和“大民生体现在哪里”，也可以A/B分开写。结构服从材料。</p>}
    >
      <p>理解题不是看到两个词就固定分两段。先判断二者是并列、递进、条件还是相互促进，再决定答案组织方式。</p>
    </ReviewExample>
  ),
};

const typeDeepReplacements: ReplacementMap = {
  '为什么成效题必须先找“受益主体”？': () => (
    <ReviewCase
      label="公共图书馆延时服务"
      title="同一项延时开放，为什么不能把所有“好处”混在一个点里？"
      note={<p>对读者，是时间更灵活、借阅更便利；对上班族和学生，是夜间学习空间增加；对场馆管理，则可能带来服务覆盖面扩大。题干限定受益对象时，只保留对应效果。</p>}
    >
      <p>成效不是“材料里所有正面词”。先找谁发生变化，再看变化具体落在哪一方面。</p>
    </ReviewCase>
  ),
  '材料先给两种执法事实，答案为什么必须先有评价？': () => (
    <ReviewCase
      label="共享单车治理"
      title="“先提醒再处置”和“重点区域即时清运”应该怎么评价？"
      note={<p>评价题不能只复述两种方式。要结合乱停程度、区域风险、治理成本和群众便利判断：分类处置更有针对性，同时要防止标准不清或执行随意。</p>}
    >
      <p>先形成总体判断，再分别写依据和边界。观点来自材料，不是为了“辩证”硬凑一正一反。</p>
    </ReviewCase>
  ),
  '异化词先解释，再用材料里的做法证明': () => (
    <ReviewCase
      label="理解分析 · 扎根服务"
      title="“把服务送上门”与“让服务扎下根”区别在哪里？"
      note={<p>前者偏一次性供给和触达，后者强调建立常态机制、培养本地队伍、让群众能够持续参与。理解题先解释概念差别，再把材料中的做法分别放回两层含义。</p>}
    >
      <p>抽象说法不能只翻译一句。还要继续回答它通过哪些行为体现，以及材料为什么要强调这种变化。</p>
    </ReviewCase>
  ),
  '同一个比喻为什么最后可能是一正一反？': () => (
    <ReviewCase
      label="对比分析 · 两种社区改造"
      title="两个项目都叫“微更新”，为什么评价可能完全不同？"
      note={<p>比较时用同一把尺子：一个从居民需求出发、逐步改造公共空间，另一个重外观展示、忽视使用需求。目的、做法和效果一对照，价值判断自然出现。</p>}
    >
      <p>同一个概念名称不代表性质相同。真正的比较必须把A、B放在相同维度下逐项看。</p>
    </ReviewCase>
  ),
  '问题和对策为什么最好建立对应关系？': () => (
    <ReviewCase
      label="骑手休息驿站"
      title="开放时间不合拍、点位难找、设施单一，建议怎么做到真正针对？"
      note={<p>时间不合拍对应调整开放时段；点位难找对应优化标识和地图指引；设施单一对应补充充电、饮水、应急药品等。针对性来自“每条措施解决哪一个具体矛盾”。</p>}
    >
      <p>如果只写“高度重视、完善服务、加强保障”，词都没错，但看不出每句话到底解决什么问题。</p>
    </ReviewCase>
  ),
  '启示题为什么要把“小院”名字拿掉一层再写？': () => (
    <ReviewCase
      label="校地共建实践基地"
      title="一个地方项目要怎样提炼成别人也能借鉴的经验？"
      note={<p>项目名称和学校名称属于特殊性，可迁移的是“整合校地资源、建立长期合作机制、围绕实际需求设计项目、让学生实践与地方服务形成双向反馈”。</p>}
    >
      <p>启示题要问：把地名、人名、品牌名拿掉以后，这件事真正成功的机制是什么。</p>
    </ReviewCase>
  ),
};

export function ExpressionDeepReviewedV2({ id }: { id: string }) {
  return <>{rewriteByTitle(ExpressionDeepReviewed({ id }), expressionExtraReplacements)}</>;
}

export function FrameworkAbilitiesReviewedV2() {
  return <>{rewriteByTitle(FrameworkAbilitiesReviewed(), abilityExtraReplacements)}</>;
}

export function AbilityDeepReviewedV2({ id }: { id: string }) {
  return <AbilityDeepReviewed id={id} />;
}

export function FrameworkTypeArticleReviewed() {
  return <>{rewriteByTitle(FrameworkTypeArticleV4(), typeBaseReplacements)}</>;
}

export function TypeDeepReviewed({ id }: { id: string }) {
  return <>{rewriteByTitle(TypeDeep({ id }), typeDeepReplacements)}</>;
}
