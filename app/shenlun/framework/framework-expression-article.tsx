import type { ReactNode } from 'react';

function TeacherNote({ children }: { children: ReactNode }) {
  return <aside className="expression-v2-note"><span>阅 / 高老师批注</span><p>{children}</p></aside>;
}

function NumberStep({ n }: { n: number }) {
  return <span className="expression-number-step" aria-hidden="true">{String(n).padStart(2, '0')}</span>;
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
      <figcaption>先把整张答题卡看一遍。题号、边界、小题区和文章区都不是装饰，它们会反过来影响你怎么分配字数、怎么组织答案。</figcaption>
    </figure>
  );
}

const auditSteps = [
  ['范围', '去哪里找', '先看题目限定哪一则、哪几则材料。看到“给定资料2”，也要把整句话读完。有些题前面点到资料2，后面却要求“结合全部给定资料”，范围一旦看错，后面再认真也容易白忙。'],
  ['对象', '到底在说谁、说什么事', '对象不是简单找一个人名或地名。题目真正围绕的往往是一件事，比如“A市推进基层治理”。后面每一句材料都要回到这个对象上判断：这句话对它来说，到底说明了什么？'],
  ['问法（要素）', '究竟找什么', '问问题就找问题，问成效就找效果，问做法就找措施。材料没有变，问法一换，你需要保留的内容就会跟着换。这个地方是很多同学“材料看懂了，答案却答偏了”的根源。'],
  ['要求', '答案怎么写', '全面、准确、有条理属于常规要求；观点明确、针对性、可行性、可操作性、格式正确等属于特殊要求。特殊要求不是题目最后的客套话，它会直接改变你的答案形态。'],
  ['字数', '最后能写多少', '字数决定答案的“度”。200字和400字不可能写成同一个细度。先估行数，再决定写几大点、每一点保留多少细节，最后才谈语言润色。'],
] as const;

const logicCards = [
  ['简单并列', 'A · B · C 同一层', '几个点都在回答同一种要素，层级差不多。比如“设施不足、管理薄弱、参与不足”，三个点都是问题，也都在同一层面上。'],
  ['简单递进', 'A → B → C 有先后', '前一步推动后一步。比如“建立平台 → 简化流程 → 缩短时间 → 提升满意度”，后面的结果依赖前面的变化。'],
  ['并列中带递进', '大点并列，小点递进', '宣传、服务、监管三个大点彼此并列；每个大点内部又可以按照“做法 → 直接效果 → 进一步效果”展开。'],
  ['递进中带并列', '大结构递进，内部再并列', '整篇答案按“是什么 → 为什么 → 怎么办”递进；其中“为什么”内部可以再分意义、问题、原因，“怎么办”内部再分制度、服务、监管。'],
] as const;

function Prose({ children }: { children: ReactNode }) {
  return <div className="expression-v2-prose">{children}</div>;
}

export function FrameworkExpressionArticle() {
  return (
    <div className="expression-v2-course">
      <section className="expression-chapter expression-v2-section" id="expression-know">
        <header className="expression-v2-head">
          <span>01 / KNOW THE EXAM</span>
          <h3>先把申论这件事看明白。</h3>
          <p>第一次接触申论，我建议你先别急着学技巧。先知道这场考试到底在让你做什么，再去学题型和方法，后面会省很多力气。</p>
        </header>

        <Prose>
          <p>很多同学刚开始学申论，会把它想得很复杂。有人觉得它靠“机关思维”，有人觉得它就是抄材料，还有人一上来就开始背题型、背模板、背所谓的规范词。</p>
          <p><strong>我更建议先把它理解成一场材料处理考试。</strong></p>
          <p>给你一组材料，再给你几个任务。你要在规定时间、规定字数和规定答题区域里，把材料中真正有用的信息找出来、整理好，再写成一份能够直接回应题目的答案。</p>
          <p>所以，申论表面上在考阅读和表达，实际上整个过程一直围绕三个问题：<strong>题目要什么，材料给了什么，我最后怎么写。</strong></p>
        </Prose>

        <div className="expression-v2-equation">
          <article><span>QUESTION</span><b>题目</b><p>告诉你找什么</p></article><i>→</i>
          <article><span>MATERIAL</span><b>材料</b><p>决定你有什么</p></article><i>→</i>
          <article><span>ANSWER</span><b>答案</b><p>看你怎么整理</p></article>
        </div>
        <TeacherNote>小题大多数时候没有你想象中那么“主观”。先看题目要什么，再看材料给什么。别一上来就想着自己有什么观点。</TeacherNote>

        <div className="expression-v2-subtitle"><span>试卷组成</span><h4>先认识三个东西：注意事项、给定资料、作答要求</h4></div>
        <Prose>
          <p>一张申论卷看起来很厚，但结构并不复杂。你真正需要认识的，就是下面三个部分。</p>
        </Prose>
        <div className="expression-v2-three">
          <article><NumberStep n={1} /><div><h5>注意事项</h5><p>考试时间、填写方式、作答位置、书写工具和考场规则。平时不用天天背，但第一次上考场前一定要看懂。尤其是答题区域、书写工具这些规则，别等考试时再临时确认。</p></div></article>
          <article><NumberStep n={2} /><div><h5>给定资料</h5><p>这是答案的原料。政策、评论、案例、数据都可能出现。材料可以讲一个村庄、一个企业、一项政策，也可以是一段采访。你要做的不是记住故事，而是看清这些材料到底在说明什么。</p></div></article>
          <article><NumberStep n={3} /><div><h5>作答要求</h5><p>这是任务书。范围、对象、问法、要求、字数都藏在里面。题目没看清，材料读得再认真也可能找错方向，所以做题的第一步永远先看任务。</p></div></article>
        </div>

        <div className="expression-v2-subtitle strong"><span>国考 / 江苏省考</span><h4>先知道差别，但别把它们想成两门完全不同的申论</h4></div>
        <Prose>
          <p>不同考试会有不同的时间安排、分类方式和能力侧重。你备考时当然要知道自己面对的是哪一类卷子，但也不用因此把基础方法全部推倒重来。</p>
          <p>审题、理解材料、概括信息、分析关系、组织答案，这些底层动作是相通的。真正需要变化的是：<strong>你把什么能力练得更深，以及面对具体题目时怎么调整。</strong></p>
        </Prose>
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
        <Prose>
          <p>答题卡不是做完题以后才考虑的东西。恰恰相反，<strong>它从你开始整理答案的时候，就已经参与做题了。</strong></p>
          <p>一道200字的小题，和一道400字的题，哪怕材料完全一样，你保留信息的细度也不会一样。前者要更会压缩，后者可以保留更多解释和细节。</p>
          <p>所以我一直强调：做申论要有“格子意识”。不是让你天天数格子，而是让你知道自己的答案最终要装进多大的空间。</p>
        </Prose>
        <AnswerSheetFigure />
        <div className="expression-v2-rules">
          <article><b>一格一字</b><p>平时就按一格一字训练。写得清楚、稳定，比追求花哨的字形重要得多。</p></article>
          <article><b>标点占格</b><p>标点同样参与字数和行数判断。不要为了省几个格子，把一整段答案写得没有停顿。</p></article>
          <article><b>指定区域</b><p>第几题就写在对应区域。真正上考场前要熟悉答题卡结构，避免出现位置写错、越界等低级失误。</p></article>
          <article><b>黑色字迹</b><p>申论作答按当年要求使用规定书写工具。清楚、稳定、容易识别，是卷面最基本的目标。</p></article>
        </div>
        <div className="expression-v2-lines">
          <div><span>200字</span><b>8 行</b><small>按一行25格训练</small></div>
          <div><span>300字</span><b>12 行</b><small>先估行数，再分配要点</small></div>
          <div><span>400字</span><b>16 行</b><small>先有空间意识，再谈细节</small></div>
        </div>
        <Prose>
          <p>比如200字准备写5个点，平均一个点大概40字。你在材料里一个点勾了七八十字，就要意识到：这个内容不可能原封不动搬上去。</p>
          <p>这时候不是“硬挤”，而是开始做三件事：<strong>删掉无关信息，压缩重复表达，合并同类内容。</strong></p>
        </Prose>
        <TeacherNote>字数不是最后才看的限制条件。它从你开始勾材料的那一刻，就在决定哪些内容值得留下。</TeacherNote>
      </section>

      <section className="expression-chapter expression-v2-section" id="expression-audit">
        <header className="expression-v2-head compact"><span>03 / READ THE QUESTION</span><h3>做题第一步：先把题看清楚。</h3><p>我建议固定成五看：范围、对象、问法（要素）、要求、字数。每一道题先过这五关，再进去读材料。</p></header>
        <Prose>
          <p>很多同学做申论有一个很典型的习惯：题干扫一眼，就立刻钻进材料。然后画了很多线，记了很多词，最后回到题目一看，发现自己找的东西和题目问的不是一回事。</p>
          <p><strong>所以审题不是形式，它是在给后面的阅读划边界。</strong></p>
          <p>你先知道自己去哪找、围绕谁找、究竟找什么、答案要写成什么样、最后能写多少，再进材料，效率会高很多。</p>
        </Prose>
        <div className="expression-v2-demo-question"><span>训练示例</span><p>根据“给定资料2”，概括A市在推进基层治理过程中取得的主要成效。要求：全面、准确、有条理，不超过200字。</p></div>
        <div className="expression-v2-five">
          {auditSteps.map(([title, short, text], index) => <article key={title}><NumberStep n={index + 1} /><div><span>{short}</span><h4>{title}</h4><p>{text}</p></div></article>)}
        </div>
        <Prose>
          <p>把上面的题拆开以后，你会发现它其实已经很清楚：范围是“给定资料2”，对象是“A市推进基层治理”，问法是“成效”，要求是“全面、准确、有条理”，字数是“不超过200字”。</p>
          <p>现在再进材料，你不是漫无目的地看，而是在找：<strong>这件事最后带来了什么变化。</strong></p>
          <p>这就是审题的价值。它不负责直接给你答案，但它会告诉你答案应该往哪个方向长。</p>
        </Prose>
        <TeacherNote>题目问“成效”，你最后写了一大堆“做法”，通常不是材料没看懂，而是题没看清。</TeacherNote>
      </section>

      <section className="expression-chapter expression-v2-section" id="expression-read">
        <header className="expression-v2-head compact"><span>04 / READ THE MATERIAL</span><h3>材料不是一句一句抄出来的。</h3><p>真正的阅读，不是把每句话都画上线，而是判断每一段在整份材料里承担什么作用，它和题目到底有什么关系。</p></header>
        <Prose>
          <p>申论材料表面上考查阅读和表达，实际上它也在调用一个人过去形成的思考方式。</p>
          <p>所以有些同学做着做着，会突然感觉自己“懂申论了”。这种变化通常不是因为他背到了一个万能公式，而是开始意识到：<strong>材料不是若干句子的简单排列，每一段材料都有自己的作用。</strong></p>
          <p>问题、原因、影响、做法、结果，经常彼此联系。案例也不是为了讲故事，而是在承担某种信息功能。你从“材料写了什么”，进一步看到“材料为什么这样写”，阅读理解才真正往前走了一步。</p>
        </Prose>
        <div className="expression-v2-material-example">
          <div className="material-copy"><span>同一段材料</span><p>某社区过去居民办事要往返多个窗口、重复提交材料。后来上线线上服务平台，将多个事项统一办理，群众提交一次材料即可完成申请。平台上线后，平均办理时间由3天缩短至半天，群众投诉明显减少。</p></div>
          <div className="material-answers"><span>题目一换，答案就换</span>
            <article><b>问“主要做法”</b><p>上线线上服务平台，整合办理事项，实现一次提交、统一办理。</p></article>
            <article><b>问“主要成效”</b><p>缩短办理时间，减少群众投诉，提高办事效率。</p></article>
            <article><b>问“改革前的问题”</b><p>办事窗口分散、材料重复提交、办理耗时较长。</p></article>
          </div>
        </div>
        <Prose>
          <p>你会发现，材料一个字都没变，但题目变了，答案就完全不同。</p>
          <p>这也说明一个很重要的问题：<strong>所谓“材料为王”，不是让你见什么抄什么，而是让你根据题目，有针对性地理解材料。</strong></p>
        </Prose>
        <div className="expression-v2-subtitle"><span>材料类型</span><h4>先知道不同材料通常在干什么</h4></div>
        <div className="expression-v2-material-types">
          <article><b>理论型</b><p>政策、讲话、宏观观点较多。重点看主题、方向、价值判断，以及它对整篇材料的统领作用。</p></article>
          <article><b>评论型</b><p>专家、群众、媒体直接评价一件事。问题、原因、意义、对策往往说得比较直白。</p></article>
          <article><b>案例型</b><p>最容易“看懂故事、找不到答案”。要从人物行为和事件变化里提炼背后的工作方式、问题或效果。</p></article>
          <article><b>数据型</b><p>别急着抄数字。先看数字在证明什么：增减、快慢、差距、趋势，真正有用的是数字背后的结论。</p></article>
        </div>
        <TeacherNote>读材料时，少问一句“这句话要不要抄”，多问一句“这一段对题目所问对象来说，到底在说什么”。</TeacherNote>
      </section>

      <section className="expression-chapter expression-v2-section" id="expression-transform">
        <header className="expression-v2-head compact"><span>05 / FROM MATERIAL TO ANSWER</span><h3>找到答案，还不等于会写答案。</h3><p>从材料到答题卡，中间至少还要经过筛选、概括、归纳、控制层级和安排顺序。很多分差，就出现在这一步。</p></header>
        <Prose>
          <p>很多同学做题时会有一种错觉：材料里我都画到了，答案应该没问题。</p>
          <p>但真正评分时，阅卷人看到的不是你画了多少线，而是你最后写出来的内容有没有<strong>准确、完整、清楚地回应题目。</strong></p>
          <p>因此，找到信息只是第一步。你还要把这些散着的、长着的、口语化的内容，整理成能够放进答题卡的答案。</p>
        </Prose>
        <div className="expression-v2-flow">
          {[
            ['01','筛选：先问是不是题目要的。不是，就先放下。'],
            ['02','概括：把长内容变短，把故事变成信息。'],
            ['03','归纳：相近内容放到一起，找到共同的上位表达。'],
            ['04','控层级：避免太大太空，也避免太细太碎。'],
            ['05','排顺序：看材料关系，决定并列、递进还是总分。'],
          ].map(([no, text]) => <article key={no}><span>{no}</span><p>{text}</p></article>)}
        </div>

        <div className="expression-v2-subtitle"><span>答案的“度”</span><h4>最难的往往不是找不到，而是不知道该写多细</h4></div>
        <div className="expression-v2-levels">
          <article><span>宏观</span><b>加强基层治理</b><p>概念太大，虽然方向没错，但信息量太少，很难成为稳定得分点。</p></article>
          <article className="recommended"><span>中观 · 推荐</span><b>完善社区走访和群众沟通机制</b><p>既概括了材料，又保留了具体工作内容，通常更接近小题答案需要的层级。</p></article>
          <article><span>微观</span><b>工作人员每天入户、建群、登记意见……</b><p>细节太多，容易挤占字数，也容易把一个要点拆得过碎。</p></article>
        </div>
        <Prose>
          <p>我一直强调“中观”，不是因为中观这个词本身多重要，而是它提醒你：<strong>答案要有信息密度，也要有概括能力。</strong></p>
          <p>写得太大，看起来很规范，实际上没有真正回应材料；写得太细，看起来很具体，但最后会变成大量原话堆积。</p>
          <p>判断一个归纳词是否合适，可以问自己三句话：它能不能直接回答题目？它会不会大到把其他要点也包进去？它能不能覆盖后面这些具体内容？</p>
        </Prose>
        <div className="expression-v2-subtitle"><span>同义合并</span><h4>不同地方出现的内容，也可能其实在说一件事</h4></div>
        <div className="expression-v2-merge"><p>服务热线 + 意见邮箱 + 网上留言平台</p><i>→</i><b>畅通群众意见反馈渠道</b></div>
        <TeacherNote>写答案不是把材料搬过去，而是在尽量不丢失信息的前提下，把材料压缩成更适合阅卷的表达。</TeacherNote>
      </section>

      <section className="expression-chapter expression-v2-section" id="expression-logic">
        <header className="expression-v2-head compact"><span>06 / ORGANIZE THE ANSWER</span><h3>条理，不是写上“一二三”就有了。</h3><p>答案真正的条理，来自内容之间本来就存在的关系。你要先看懂谁和谁是一层、谁在前谁在后，再决定怎么写。</p></header>
        <Prose>
          <p>很多同学为了让答案“有条理”，会很快写出“一、二、三”。形式当然没问题，但如果三个点层级完全不同，或者前后关系混在一起，再整齐的序号也只是表面整齐。</p>
          <p><strong>逻辑不是为了让答案显得高级，而是让阅卷人一眼知道你在说什么。</strong></p>
          <p>最常见的关系，可以先从下面四种理解。</p>
        </Prose>
        <div className="expression-v2-logic-grid">
          {logicCards.map(([title, kicker, desc]) => <article key={title}><span>{kicker}</span><h4>{title}</h4><p>{desc}</p></article>)}
        </div>
        <div className="expression-v2-logic-diagram">
          <div><b>并列中带递进</b><p>宣传 → 知晓 → 参与</p><p>服务 → 提速 → 满意</p><p>监管 → 发现 → 规范</p><i>三个大点并列，每条内部继续往前推进。</i></div>
          <div><b>递进中带并列</b><p>是什么</p><p>↓ 为什么：意义 / 问题 / 原因</p><p>↓ 怎么办：制度 / 服务 / 监管</p><i>大结构有先后，每一层内部再分方面。</i></div>
        </div>
        <Prose>
          <p>这两个名称不用死背。真正重要的是你能不能看出材料的关系。</p>
          <p>如果几个内容彼此平行，就并列写；如果前一个内容推动后一个内容，就顺着递进关系写；如果大结构和小结构同时存在，就把两层关系都保留下来。</p>
          <p>当你开始这样整理答案时，你会发现所谓“有条理”，其实就是<strong>把材料原本存在的关系重新写清楚。</strong></p>
        </Prose>
        <TeacherNote>一大俱大，一小俱小。第一点写“基层治理水平不足”，第二点突然写“缺两个垃圾桶”，这就不是同一层。</TeacherNote>
      </section>

      <section className="expression-chapter expression-v2-section" id="expression-finish">
        <header className="expression-v2-head compact"><span>07 / FINISH ONE QUESTION</span><h3>最后，把前面的东西放进一道题里。</h3><p>理论只有进入具体材料，才真正有意义。完整做一道题时，我更建议你把过程拆成三遍阅读，而不是边看边往答题卡上搬。</p></header>
        <Prose>
          <p>学习方法，最终不是为了永远套用方法。</p>
          <p>刚开始时，我们需要一个框架帮助自己知道申论应该怎么看、怎么想、怎么写；练习多了以后，这些动作会逐渐变成习惯，你不再机械回忆步骤，却依然能够稳定完成判断。</p>
          <p>所以，框架帮助起步，理解决定成熟。下面这三遍阅读，就是把前面所有知识放回一道题里的最简单方式。</p>
        </Prose>
        <div className="expression-v2-three-reads">
          <article><NumberStep n={1} /><div><span>第一遍</span><h4>扫读：先看材料怎么分块</h4><p>不要一上来逐字逐句抠。先看哪几段在讲一件事，大概哪里是问题、哪里是做法、哪里是成效，把材料骨架先看出来。</p></div></article>
          <article><NumberStep n={2} /><div><span>第二遍</span><h4>精读：围绕对象判断要素</h4><p>再逐段判断：这一段对题目所问对象来说，在说什么？问题、原因、做法、成效分别在哪里？案例背后到底说明了什么？</p></div></article>
          <article><NumberStep n={3} /><div><span>第三遍</span><h4>整理：决定最后写成什么样</h4><p>哪些内容可以合并？哪些太细？准备写几大点？每一点大约几行？整体是并列还是递进？这些处理完，再正式落笔。</p></div></article>
        </div>
        <Prose>
          <p>很多申论答案不是“不会”，而是写之前根本没有整理。边看材料边往答题卡上搬，最后最容易出现三个问题：前面写太多、后面没格子；相近内容重复；答案顺序完全跟着材料走，没有重新组织。</p>
          <p>真正成熟的做题状态，是你知道什么时候需要框架，也知道什么时候应该放下框架，直接根据材料关系完成判断。</p>
        </Prose>
        <div className="expression-v2-final-map"><span>一张图记住</span><p>看题 → 读材料 → 找要素 → 概括归纳 → 控制层级 → 组织逻辑 → 按字数落笔</p></div>
        <TeacherNote>框架是对经验的总结，不是对材料的替代。你最后真正要练出来的，是面对不同材料时依然能做出有针对性的判断。</TeacherNote>
      </section>
    </div>
  );
}
