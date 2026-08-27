import type { ReactNode } from 'react';

function TeacherNote({ children }: { children: ReactNode }) {
  return <aside className="expression-v2-note"><span>阅 / 高老师批注</span><p>{children}</p></aside>;
}

function HandStep({ n }: { n: 1 | 2 | 3 | 4 | 5 }) {
  const fingers = [28, 39, 50, 61].slice(0, Math.min(n, 4));
  return (
    <span className="expression-hand-step" aria-hidden="true">
      <svg viewBox="0 0 88 88" role="img">
        <rect x="27" y="40" width="38" height="31" rx="15" />
        {fingers.map((x, index) => <rect key={x} x={x} y={16 - index * 2} width="8" height={34 + index * 2} rx="4" />)}
        {n === 5 && <path d="M28 48 C20 42,14 41,12 46 C10 51,17 57,29 62 Z" />}
        {n < 5 && <path d="M27 53 C21 49,16 49,14 53 C13 57,18 62,28 65 Z" />}
      </svg>
      <b>{n}</b>
    </span>
  );
}

function AnswerSheetFigure() {
  return (
    <figure className="expression-answer-sheet-v2">
      <svg viewBox="0 0 840 593" role="img" aria-label="申论答题卡完整结构示意">
        <defs>
          <pattern id="answerGridV2" width="18" height="18" patternUnits="userSpaceOnUse">
            <rect width="18" height="18" fill="#fff" />
            <path d="M18 0H0V18" fill="none" stroke="#ef9a9a" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="14" y="14" width="812" height="565" fill="#fff" stroke="#ef7777" strokeWidth="1.4" />
        <line x1="420" y1="15" x2="420" y2="578" stroke="#9f9f9f" strokeWidth="1" />
        <text x="205" y="42" textAnchor="middle" fontSize="16" letterSpacing="5" fill="#222">申 论 答 题 卡</text>
        <text x="31" y="29" fontSize="8" fill="#e45e5e">申论答题卡 · 第1页，共2页</text>
        <text x="31" y="58" fontSize="10" fill="#333">姓名：__________</text>
        <rect x="202" y="47" width="188" height="75" fill="#fff" stroke="#ef9a9a" />
        {Array.from({ length: 12 }).map((_, i) => <rect key={`meta-${i}`} x={208 + i * 14} y="72" width="12" height="42" fill="none" stroke="#efb1b1" strokeWidth=".7" />)}
        <rect x="30" y="72" width="155" height="72" fill="#fff" stroke="#ef9a9a" />
        <text x="42" y="89" fontSize="8" fill="#444">注意事项</text>
        <text x="42" y="105" fontSize="7" fill="#777">在指定区域作答 · 使用规定书写工具</text>
        <text x="42" y="118" fontSize="7" fill="#777">超出答题区域的内容无效</text>
        <text x="30" y="176" fontSize="9" fill="#222">第（一）大题：第1小题</text>
        <rect x="30" y="187" width="362" height="166" fill="url(#answerGridV2)" stroke="#ef8b8b" />
        <line x1="30" y1="270" x2="392" y2="270" stroke="#555" strokeWidth="1" />
        <text x="30" y="377" fontSize="9" fill="#222">第（一）大题：第2小题</text>
        <rect x="30" y="388" width="362" height="126" fill="url(#answerGridV2)" stroke="#ef8b8b" />
        <text x="437" y="148" fontSize="9" fill="#222">第（二）大题</text>
        <rect x="437" y="40" width="372" height="100" fill="url(#answerGridV2)" stroke="#ef8b8b" />
        <rect x="437" y="163" width="372" height="238" fill="url(#answerGridV2)" stroke="#ef8b8b" />
        <line x1="437" y1="282" x2="809" y2="282" stroke="#555" strokeWidth="1" />
        <text x="437" y="428" fontSize="9" fill="#222">第（三）大题</text>
        <rect x="437" y="439" width="372" height="78" fill="url(#answerGridV2)" stroke="#ef8b8b" />
        <text x="420" y="560" textAnchor="middle" fontSize="8" fill="#e45e5e">示意结构依据你提供的答题卡样式重绘 · 具体以当年实际答题卡为准</text>
      </svg>
      <figcaption>先把整张答题卡看一遍。小题区、作文区、题号和边界都不是装饰，它们会反过来影响你怎么分配字数、怎么组织答案。</figcaption>
    </figure>
  );
}

const auditSteps = [
  ['范围', '去哪里找', '先看题目限定哪一则、哪几则材料。看到“给定资料2”，也要把整句话看完，有的题会继续要求“结合全部给定资料”。'],
  ['对象', '到底在说谁', '对象是这道题真正围绕的人、事、政策或现象。后面每一句材料都要回到这个对象上判断。'],
  ['问法（要素）', '究竟找什么', '问问题就找问题，问成效就找效果，问做法就找措施。材料没变，问法一换，你找的内容就会换。'],
  ['要求', '答案怎么写', '全面、准确、有条理属于常规要求；观点明确、针对性可行性可操作性、格式正确等，会直接改变作答方式。'],
  ['字数', '最后能写多少', '字数决定答案的“度”。200字和400字的答案不可能写成一个细度。先估行数，再决定写几大点。'],
] as const;

const logicCards = [
  ['简单并列', 'A · B · C 同一层', '几个点都在回答同一种要素，层级差不多。比如问题、做法、成效分别各列几项。'],
  ['简单递进', 'A → B → C 有先后', '前一步推动后一步，比如“建立平台 → 简化流程 → 缩短时间 → 提升满意度”。'],
  ['并列中带递进', '大点并列，小点递进', '宣传、服务、监管三个大点互相并列；每个大点内部又可以按照“做法 → 直接效果 → 进一步效果”展开。'],
  ['递进中带并列', '大结构递进，内部再并列', '整篇答案按“是什么 → 为什么 → 怎么办”递进；其中“为什么”和“怎么办”内部又各自分几个并列方面。'],
] as const;

export function FrameworkExpressionArticle() {
  return (
    <div className="expression-v2-course">
      <section className="expression-chapter expression-v2-section" id="expression-know">
        <header className="expression-v2-head">
          <span>01 / KNOW THE EXAM</span>
          <h3>先把申论这件事看明白。</h3>
          <p>第一次接触申论，我建议你先别急着学技巧。把它理解成一场材料处理考试就行：给你一组材料，再给你几个任务，你要在规定时间、规定字数和规定答题区域里，把材料整理成符合要求的答案。</p>
        </header>

        <div className="expression-v2-equation">
          <article><span>QUESTION</span><b>题目</b><p>告诉你找什么</p></article><i>→</i>
          <article><span>MATERIAL</span><b>材料</b><p>决定你有什么</p></article><i>→</i>
          <article><span>ANSWER</span><b>答案</b><p>看你怎么整理</p></article>
        </div>
        <TeacherNote>小题大多数时候没有你想象中那么“主观”。先看题目要什么，再看材料给什么。别一上来就想着自己有什么观点。</TeacherNote>

        <div className="expression-v2-subtitle"><span>试卷组成</span><h4>先认识三个东西：注意事项、给定资料、作答要求</h4></div>
        <div className="expression-v2-three">
          <article><HandStep n={1} /><div><h5>注意事项</h5><p>考试时间、填写方式、作答位置、书写工具和考场规则。平时不用天天背，但第一次上考场前一定要看懂。</p></div></article>
          <article><HandStep n={2} /><div><h5>给定资料</h5><p>这是答案的原料。政策、评论、案例、数据都可能出现。你要做的不是记故事，而是看这些材料到底在说明什么。</p></div></article>
          <article><HandStep n={3} /><div><h5>作答要求</h5><p>这是任务书。范围、对象、问法、要求、字数都在里面。做题的第一步，永远先把任务看清楚。</p></div></article>
        </div>

        <div className="expression-v2-subtitle strong"><span>国考 / 江苏省考</span><h4>先知道差别，但别把它们想成两门完全不同的申论</h4></div>
        <div className="expression-v2-compare">
          <article><span>2026 国考</span><b>180 分钟 · 100 分</b><p>按职位类别分类分级命题。省级综合管理、市地综合管理、行政执法的能力侧重点不同。</p></article>
          <article><span>2026 江苏省考</span><b>150 分钟 · 100 分</b><p>A、B、C分类分级命题。A偏综合管理，B突出依法办事和公共服务，C更贴近基层执行、群众工作和应用写作。</p></article>
        </div>
        <p className="expression-v2-small">考试时长、分类和规则会随年度公告更新。这里用2026年度口径帮助你建立基本认识，具体考试始终以当年最新公告为准。</p>
      </section>

      <section className="expression-chapter expression-v2-section" id="expression-sheet">
        <header className="expression-v2-head compact">
          <span>02 / ANSWER SHEET</span>
          <h3>答案最后要写进格子里。</h3>
          <p>很多同学只研究“答案对不对”，却很少研究“答案写不写得下”。真正到了考场，答题卡会逼着你取舍，所以平时训练就要有版面意识。</p>
        </header>
        <AnswerSheetFigure />
        <div className="expression-v2-rules">
          <article><b>一格一字</b><p>平时就按一格一字训练，别到了考场再临时适应。</p></article>
          <article><b>标点占格</b><p>标点同样参与字数和行数判断，写答案时别把它当成空气。</p></article>
          <article><b>指定区域</b><p>第几题就写在对应区域，越过边界的内容可能无效。</p></article>
          <article><b>黑色字迹</b><p>申论作答按当年要求使用规定书写工具，保证清楚、稳定、容易识别。</p></article>
        </div>
        <div className="expression-v2-lines">
          <div><span>200字</span><b>8 行</b><small>按一行25格训练</small></div>
          <div><span>300字</span><b>12 行</b><small>先估行数，再分配要点</small></div>
          <div><span>400字</span><b>16 行</b><small>先有空间意识，再谈细节</small></div>
        </div>
        <TeacherNote>比如200字准备写5个点，平均一个点大概40字。你在材料里一个点勾了七八十字，就该开始删、缩、并了。</TeacherNote>
      </section>

      <section className="expression-chapter expression-v2-section" id="expression-audit">
        <header className="expression-v2-head compact"><span>03 / READ THE QUESTION</span><h3>做题第一步：先把题看清楚。</h3><p>我建议固定成五看：范围、对象、问法（要素）、要求、字数。每一道题先过这五关，再进去读材料。</p></header>
        <div className="expression-v2-demo-question"><span>训练示例</span><p>根据“给定资料2”，概括A市在推进基层治理过程中取得的主要成效。要求：全面、准确、有条理，不超过200字。</p></div>
        <div className="expression-v2-five">
          {auditSteps.map(([title, short, text], index) => <article key={title}><HandStep n={(index + 1) as 1 | 2 | 3 | 4 | 5} /><div><span>{short}</span><h4>{title}</h4><p>{text}</p></div></article>)}
        </div>
        <TeacherNote>题目问“成效”，你写了一堆“做法”，往往不是材料没看懂，而是题没看清。审题的作用，就是先把任务边界框出来。</TeacherNote>
      </section>

      <section className="expression-chapter expression-v2-section" id="expression-read">
        <header className="expression-v2-head compact"><span>04 / READ THE MATERIAL</span><h3>材料不是一句一句抄。</h3><p>先看这一段在干什么，再看这一句话能不能进答案。读材料时，我更关心“它对题目所问的对象来说，到底在说什么”。</p></header>
        <div className="expression-v2-material-example">
          <div className="material-copy"><span>同一段材料</span><p>某社区过去居民办事要往返多个窗口。后来上线线上服务平台，将多个事项统一办理，群众提交一次材料即可完成申请。平台上线后，平均办理时间由3天缩短至半天，群众投诉量明显下降。</p></div>
          <div className="material-answers">
            <article><span>如果问“主要做法”</span><b>上线线上服务平台，整合办理事项，实现一次提交、统一办理。</b></article>
            <article><span>如果问“主要成效”</span><b>缩短办理时间，减少群众投诉，降低办事成本。</b></article>
            <article><span>如果问“改革前问题”</span><b>窗口分散、材料重复提交、办理耗时较长。</b></article>
          </div>
        </div>
        <div className="expression-v2-subtitle"><span>材料类型</span><h4>理论、评论、案例、数据，长得不一样，处理方式也不一样</h4></div>
        <div className="expression-v2-material-types">
          <article><b>理论型</b><p>多看方向、主题和价值判断，不要见到政策表述就整段搬。</p></article>
          <article><b>评论型</b><p>专家、群众、媒体的评价，常常直接藏着问题、意义、原因或对策。</p></article>
          <article><b>案例型</b><p>先删掉故事，再留下案例背后的做法、问题、经验或效果。</p></article>
          <article><b>数据型</b><p>不要只抄数字，先问数字到底说明了多、少、快、慢、升、降还是差距。</p></article>
        </div>
        <TeacherNote>材料没变，题目一换，答案就会换。你真正要练的，是结合题目判断材料里的每句话“现在算什么”。</TeacherNote>
      </section>

      <section className="expression-chapter expression-v2-section" id="expression-transform">
        <header className="expression-v2-head compact"><span>05 / FROM MATERIAL TO ANSWER</span><h3>找到内容以后，还要把它整理成答案。</h3><p>材料原句只是原料。真正落到答题卡之前，还要经过筛选、概括、归纳、控制层级和安排顺序。</p></header>
        <div className="expression-v2-flow">
          {['筛选：是不是题目要的？','概括：把长内容变短','归纳：相近内容找到共同点','控层级：别写得太大，也别写得太碎','排顺序：谁先谁后，哪些并列'].map((item, index) => <article key={item}><span>0{index + 1}</span><p>{item}</p></article>)}
        </div>
        <div className="expression-v2-levels">
          <article><span>宏观</span><b>加强基层治理</b><p>太大，什么都能装进去，区分度不够。</p></article>
          <article className="recommended"><span>中观 ✓</span><b>完善社区走访和群众沟通机制</b><p>既概括了材料，又保留了足够信息量。很多小题真正要练的是这个层级。</p></article>
          <article><span>微观</span><b>工作人员每天进入社区逐户走访并建立微信群……</b><p>细节太多，字数很快被吃掉。</p></article>
        </div>
        <div className="expression-v2-subtitle strong"><span>同义合并</span><h4>三个渠道，不一定要写成三个点</h4></div>
        <div className="expression-v2-merge"><p>服务热线 + 群众反馈邮箱 + 网上留言平台</p><i>↓</i><b>畅通群众意见反馈渠道。</b></div>
        <TeacherNote>归纳词不是越“大”越好。它要能直接回答题目，能罩住下面的内容，又不能把别的要点一起吞进去。</TeacherNote>
      </section>

      <section className="expression-chapter expression-v2-section" id="expression-logic">
        <header className="expression-v2-head compact"><span>06 / ORGANIZE THE ANSWER</span><h3>答案找对了，还要把关系写清楚。</h3><p>逻辑不是为了显得高级。真正有用的逻辑，是让阅卷人一眼看明白：哪些内容是一层，哪些内容有先后，哪些内容互相解释。</p></header>
        <div className="expression-v2-logic-grid">
          {logicCards.map(([title, kicker, desc]) => <article key={title}><span>{kicker}</span><h4>{title}</h4><p>{desc}</p></article>)}
        </div>
        <div className="expression-v2-logic-diagram">
          <div><b>并列中带递进</b><p>宣传 → 知晓 → 参与</p><p>服务 → 提速 → 满意</p><p>监管 → 发现 → 规范</p></div>
          <div><b>递进中带并列</b><p>是什么</p><i>↓</i><p>为什么：意义 / 问题 / 原因</p><i>↓</i><p>怎么办：制度 / 服务 / 监管</p></div>
        </div>
        <TeacherNote>不用背“并列中带递进”这几个字。你只要看懂材料里谁和谁是一层、谁在前谁在后，写出来就是逻辑。</TeacherNote>
      </section>

      <section className="expression-chapter expression-v2-section" id="expression-finish">
        <header className="expression-v2-head compact"><span>07 / FINISH ONE QUESTION</span><h3>最后，把前面的东西走一遍。</h3><p>真正做一道题，不是边看材料边往答题卡上搬。我的习惯是先看题，再读材料，再整理，最后落笔。</p></header>
        <div className="expression-v2-three-reads">
          <article><HandStep n={1} /><div><span>第一遍 / 扫读</span><h4>先看材料整体逻辑</h4><p>哪几段在讲一件事？材料大概分几部分？先把骨架看出来，这一遍不用抠每一个词。</p></div></article>
          <article><HandStep n={2} /><div><span>第二遍 / 精读</span><h4>再判断对象和要素</h4><p>这个自然段对题目所问对象来说在说什么？该画的画，该标的标，案例顺手做一句自己的总结。</p></div></article>
          <article><HandStep n={3} /><div><span>第三遍 / 整理</span><h4>最后决定答案长什么样</h4><p>哪些能合并？哪些太细？一共写几大点？每一点大概占几行？整理完再正式落笔。</p></div></article>
        </div>
        <div className="expression-v2-final-map"><span>一道题的完整路径</span><p>审题 → 读材料 → 找要素 → 概括归纳 → 控制层级 → 组织逻辑 → 规划字数 → 正式落笔</p></div>
        <TeacherNote>很多答案不是“不会”，而是写之前根本没有整理。边看边抄，最后很容易乱。先把材料看明白，再考虑怎么把答案写漂亮。</TeacherNote>
      </section>
    </div>
  );
}
