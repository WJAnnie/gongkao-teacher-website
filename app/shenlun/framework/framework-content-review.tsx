'use client';

import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { FrameworkAbilities as FrameworkAbilitiesBase } from './framework-abilities-voice';
import { AbilityDeep, ExpressionDeep } from './framework-deep-enrichment';

type ReplacementMap = Record<string, () => ReactNode>;

function rewriteByTitle(node: ReactNode, replacements: ReplacementMap): ReactNode {
  return Children.map(node, (child) => {
    if (!isValidElement(child)) return child;
    const props = child.props as { title?: unknown; children?: ReactNode };
    if (typeof props.title === 'string' && replacements[props.title]) {
      return replacements[props.title]();
    }
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
      <div>
        <span className="framework-voice-example-label">{label}</span>
        <h5>{title}</h5>
        {children}
      </div>
      <aside><b>阅 / 看这里</b>{note}</aside>
    </article>
  );
}

function ReviewBlock({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return <section className="framework-deep-block"><header><span>{label}</span><h4>{title}</h4></header>{children}</section>;
}

function ReviewTalk({ children }: { children: ReactNode }) {
  return <div className="framework-deep-talk">{children}</div>;
}

function ReviewCase({ label, title, children, note }: { label: string; title: string; children: ReactNode; note: ReactNode }) {
  return (
    <article className="framework-deep-case">
      <div className="framework-deep-case-copy"><span>{label}</span><h5>{title}</h5>{children}</div>
      <aside><b>阅 / 这道题看什么</b>{note}</aside>
    </article>
  );
}

function ReviewCompare({ rows }: { rows: Array<[string, string, string]> }) {
  return <table className="framework-deep-table"><tbody>{rows.map(([a, b, c]) => <tr key={`${a}-${b}`}><th>{a}</th><td>{b}</td><td>{c}</td></tr>)}</tbody></table>;
}

function ExpressionSheetReviewed() {
  return (
    <div className="framework-deep-wrap">
      <ReviewBlock label="答题卡意识" title="先看题型，再用字数决定答案展开到什么程度">
        <ReviewTalk>
          <p>字数当然重要，但它不能脱离题型单独判断。<strong>先确定题目让你完成什么任务，再看有限格子里哪些信息必须保留。</strong>同样是300字，归纳概括、综合分析和公文写作的答案结构完全不同，不能用“平均每点多少字”一把尺子套到底。</p>
          <p>归纳概括题里，300字通常已经相对宽裕；400字的纯归纳概括题很少见。反过来，公文题给400字并不算长，因为开头的目的和情境、主体内容、必要的收束都要占空间。字数多少，必须和任务复杂度一起看。</p>
          <p>归纳词也不要机械凑长度。它通常只是给一个大点“起名字”，以短语级表达为主，<strong>常见四到八字左右，能更短说清就不要硬写到十几个字。</strong>真正承载采分信息的，是归纳词后面的具体概括，而不是把归纳词写得越来越长。</p>
          <p>所以训练时不要先算“六个点，每点五十字”。更稳的顺序是：先判断题型和答案结构 → 找全独立采分信息 → 决定哪些点需要归纳 → 最后依据字数压缩案例、修饰和重复信息。</p>
        </ReviewTalk>
        <ReviewCompare rows={[
          ['归纳概括 · 200字左右', '通常较紧', '优先保独立采分点；归纳宜短，案例过程和重复修饰先压'],
          ['归纳概括 · 300字左右', '通常已较宽裕', '可以把具体信息写完整些，但不要因为格子多就人为制造长归纳和多余层级'],
          ['综合分析 · 300字左右', '看任务复杂度', '解释、分析关系、必要结论都要占字，不能按概括题的“点密度”估算'],
          ['公文题 · 400字左右', '属于正常范围', '除主体信息外，还要给写作目的、对象、语气和必要结构留空间'],
          ['文章写作', '按题目规定判断', '文章与小题不是同一套字数逻辑，先保证论点与论证完整'],
        ]} />
        <ReviewCase
          label="同样300字，两种任务"
          title="为什么不能看到“300字”就先算每个点写多少字？"
          note={<p>字数只是容器，题型决定容器里要装什么。概括题追求采分信息密度；理解分析题还要说明概念和关系。先按任务搭结构，再做字数取舍。</p>}
        >
          <p><b>任务A：概括社区托育服务取得的成效，300字以内。</b>重点是把不同受益主体和具体变化找全，归纳词可以很短，后面尽量保留有区分度的效果信息。</p>
          <p><b>任务B：谈谈对“服务既要有温度，也要有尺度”的理解，300字以内。</b>需要先解释“温度”和“尺度”的含义与关系，再结合材料写表现或必要性，不能按六七个并列采分点去平均分字。</p>
        </ReviewCase>
      </ReviewBlock>
    </div>
  );
}

const expressionDeepReplacements: ReplacementMap = {
  '“根据资料，概括A市利用数字技术提升执法效能的表现。”': () => (
    <ReviewCase
      label="一题多看"
      title="“根据资料，概括老旧小区加装电梯过程中化解居民分歧的做法。”"
      note={<p>五看最后要合成一个任务：只在指定资料里，围绕“化解居民分歧”，寻找已经采取的具体动作，而不是把居民意见、困难背景和最终效果全部混进答案。</p>}
    >
      <p><b>范围：</b>指定资料；<b>对象：</b>加装电梯中的居民分歧；<b>问法：</b>做法；<b>要求：</b>全面、准确、有条理；<b>字数：</b>决定协商方式、利益协调细节保留到什么程度。</p>
    </ReviewCase>
  ),
  '事实写得很具体，题目问“特点”时为什么还要再走一步？': () => (
    <ReviewCase
      label="文旅服务案例"
      title="项目名称写得很热闹，题目问“特点”时为什么还要继续判断？"
      note={<p>“夜游讲解、分时预约、亲子路线、无障碍导览”是事实；题目问特点，就要进一步判断这些事实共同体现了什么属性，如服务分众化、时段灵活、体验友好、需求响应更细。</p>}
    >
      <p>如果答案只是把四个项目重新抄一遍，材料信息虽然没错，但还没有完成“从事实到属性”的转换。特点题真正要写的是这些做法呈现出的鲜明性质。</p>
    </ReviewCase>
  ),
  '为什么两种结构都可能写对？': () => (
    <ReviewCase
      label="关系型理解题"
      title="“留住老街记忆”和“改善居民生活”为什么可以有不同组织方式？"
      note={<p>如果材料强调二者相互支撑，可以先整体解释“保护不是冻结，更新也不是推倒重来”，再分写文化延续与生活改善；如果材料分别展开两条线，也可以按A、B各自说明后再总结关系。</p>}
    >
      <p>结构不是题型名称预设出来的。先判断材料究竟是把两者写成并列目标、先后条件，还是相互促进，再决定答案是整体解释后分层，还是分别展开后归结关系。</p>
    </ReviewCase>
  ),
};

const abilityBaseReplacements: ReplacementMap = {
  '为什么先分“背景—问题”，再读细节，答案会清楚很多？': () => (
    <ReviewExample
      label="景区停车"
      title="“游客增加”和“停车混乱”为什么不能直接当成同层问题？"
      note={<p>游客数量增长是压力背景；车位标识不清、入口拥堵、接驳不足才是管理和服务层面的具体问题。先把句子身份判对，后面归纳才不会把原因、背景和问题混排。</p>}
    >
      <p>材料如果连续写“周末客流增长、入口排队、停车指引缺失、远端停车场没有接驳”，不能见到负面信息就全部并列。先分“背景—问题”，再逐句判断。</p>
    </ReviewExample>
  ),
  '老同志带青年干部进村入户，手把手教调解矛盾，这个故事能变成什么？': () => (
    <ReviewExample
      label="社区志愿服务"
      title="同一场“周末议事会”，换一个题干对象，答案身份会怎么变？"
      note={<p>问社区治理做法，可以写“搭建议事平台、吸纳居民参与”；问居民参与特点，可以写“参与渠道常态化、协商主体多元”；问矛盾化解成效，则要落到诉求响应和邻里关系变化。</p>}
    >
      <p>案例不是自带固定标签。先看题干问谁、问什么，再决定同一事实究竟作为做法、特点还是成效进入答案。</p>
    </ReviewExample>
  ),
  '同一道理解题，为什么既能写“递进中带并列”，也能写“并列中带递进”？': () => (
    <ReviewExample
      label="生态与生产"
      title="“护好一条河”和“富一方百姓”为什么不能先套固定结构？"
      note={<p>如果材料强调生态改善为产业发展创造条件，可以按“保护—转化—增收”递进；如果分别写生态治理和产业经营两条线，也可以先并列展开，再总结二者形成良性循环。</p>}
    >
      <p>综合能力不是背顺序，而是把材料中的关系重新组织成阅卷人容易识别的答案结构。</p>
    </ReviewExample>
  ),
  '为什么最后会从六七个碎片，变成三类问题？': () => (
    <ReviewExample
      label="校园周边交通"
      title="“乱停、抢行、接送扎堆、标线模糊”怎样重新组成有层级的答案？"
      note={<p>可以综合为秩序问题、组织问题和设施标识问题，再把原始碎片放回对应大点。综合的价值是同类集中，不是删掉具体采分信息。</p>}
    >
      <p>材料为了叙事会把车辆、家长、学校、道路设施穿插在一起；答案要按同类关系重新排列，避免问题—原因—问题来回跳。</p>
    </ReviewExample>
  ),
  '“增设消防器材、抽水机、重铺排水管、改造通风口”到底要不要简？': () => (
    <ReviewExample
      label="政务服务"
      title="“重复填表、反复提交证明、多窗口跑动”到底要概括到哪一层？"
      note={<p>如果题目问具体办事堵点，三个细节可能都值得保留；如果字数很紧且还有更多问题，可以概括成“办事材料重复、流程衔接不畅”，但不宜直接压成过大的“服务不到位”。</p>}
    >
      <p>概括的目标不是词越大越高级，而是在不吞掉独立信息的前提下，把口语和重复过程压缩到合适层级。</p>
    </ReviewExample>
  ),
  '引才、育才、留才、用才为什么能放在一起？': () => (
    <ReviewExample
      label="公共文化服务"
      title="阵地、内容、队伍、机制为什么可以成为一组平行归纳？"
      note={<p>它们都直接回答“公共文化服务如何提升”，层级基本一致：有地方承载、有内容供给、有人组织、有机制保障。下面再分别放空间改造、活动设计、志愿队伍、反馈评价等具体信息。</p>}
    >
      <p>如果第一点写成“提升公共文化服务”，后面再列“建设阵地、丰富活动、培养队伍”，第一个词就会把后面全部包含，结构失衡。</p>
    </ReviewExample>
  ),
};

const abilityDeepReplacements: ReplacementMap = {
  '多个传统文化案例为什么最后会落到不同现实领域？': () => (
    <ReviewCase
      label="县域文旅"
      title="几个文旅项目为什么不能都归成“发展旅游”？"
      note={<p>古村修缮解决文化保护，研学路线侧重教育体验，夜间市集激活消费，村民合作社体现利益联结。分析要继续追问“每个项目具体解决什么”，不能被共同主题遮住差异。</p>}
    >
      <p>同样属于文旅材料，案例承担的现实功能可能完全不同。先把作用分清，后面的归纳才会更准确。</p>
    </ReviewCase>
  ),
  '六个碎片怎样变成三个有层级的大点？': () => (
    <ReviewCase
      label="居家养老服务"
      title="送餐、巡访、助医、平台转介这些碎片，怎样综合成清楚的答案？"
      note={<p>可以按生活照料、健康支持、风险巡访和资源转介归类。每个大点内部再放具体动作，既保留采分信息，也避免材料顺序把答案带乱。</p>}
    >
      <p>综合不是把四个动作压成“完善养老服务”，而是把同类事项集中起来，让每个大点都拥有独立、可识别的信息。</p>
    </ReviewCase>
  ),
  '为什么有时“完善设施”反而写得太大？': () => (
    <ReviewCase
      label="热线办理"
      title="“转接次数多、答复口径不同、回访缺失”为什么不能只写“机制不完善”？"
      note={<p>如果三种现象分别对应流程衔接、标准统一和闭环反馈，直接压成“机制不完善”会吞掉可独立采分的信息。概括要控制在能够罩住细节、又不把别的点吃掉的层级。</p>}
    >
      <p>可以根据字数写成“转办衔接不畅、答复标准不一、反馈闭环不足”；只有任务更宏观、字数更紧时，才考虑继续上提。</p>
    </ReviewCase>
  ),
  '引才、育才、留才、用才为什么是四个好归纳？': () => (
    <ReviewCase
      label="食品安全治理"
      title="巡查、追溯、培训、共治为什么应该分成不同大点？"
      note={<p>日常巡查强调监管执行，追溯系统强调技术和责任链，商户培训强调能力规范，社会监督强调共治参与。四类做法本质不同，不能都塞进“加强监管”。</p>}
    >
      <p>好归纳要直接回答题干、彼此层级接近，并能准确罩住下面的具体动作。名字不是越宏观越好。</p>
    </ReviewCase>
  ),
  '为什么只介绍两种执法方式还不够？': () => (
    <ReviewCase
      label="无障碍服务"
      title="材料只写“低位窗口、手语服务、无障碍通道”，题目问特点时还差哪一步？"
      note={<p>这些是N——客观做法；如果题目问“服务体现了什么特点”，还要形成ADJ——需求响应细致、服务更包容、办事更便利。评价必须由事实支撑。</p>}
    >
      <p>N→ADJ不是把每个名词改成“XX化”，而是判断事实究竟体现了什么属性，并用材料证明这个判断。</p>
    </ReviewCase>
  ),
};

export function FrameworkAbilitiesReviewed() {
  // 原组件是纯展示组件，无 Hook；这里在渲染前替换少量重复案例，保留其余课程内容与结构。
  return <>{rewriteByTitle(FrameworkAbilitiesBase(), abilityBaseReplacements)}</>;
}

export function ExpressionDeepReviewed({ id }: { id: string }) {
  if (id === 'expression-sheet') return <ExpressionSheetReviewed />;
  return <>{rewriteByTitle(ExpressionDeep({ id }), expressionDeepReplacements)}</>;
}

export function AbilityDeepReviewed({ id }: { id: string }) {
  return <>{rewriteByTitle(AbilityDeep({ id }), abilityDeepReplacements)}</>;
}
