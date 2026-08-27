import type { ReactNode } from 'react';

function TeacherNote({ children }: { children: ReactNode }) {
  return <aside className="expression-v2-note type-v2-note"><span>阅 / 高老师批注</span><p>{children}</p></aside>;
}
function Prose({ children }: { children: ReactNode }) { return <div className="expression-v2-prose">{children}</div>; }
function NumberStep({ n }: { n: number }) { return <span className="expression-number-step" aria-hidden="true">{String(n).padStart(2, '0')}</span>; }
function TypeMap() {
  const items = [
    ['01','归纳概括','明确要素 · 概括 · 归纳 · 控层级'],['02','综合分析','解释判断 · 分析关系 · 综合表达'],['03','提出对策','问题对应 · 材料优先 · 具体可行'],['04','公文写作','身份对象 · 开头主体结尾 · 格式'],['05','文章写作','立意 · 论点 · 论证 · 表达'],
  ];
  return <div className="type-v2-map">{items.map(([no,title,desc])=><article key={no}><span>{no}</span><b>{title}</b><p>{desc}</p></article>)}</div>;
}
function FormatSheet({ title, salutation, body, signature, date }: { title:string; salutation?:string; body:ReactNode; signature?:string; date?:string }) {
  return <div className="type-v3-format-sheet"><span className="format-tag">格式示意</span><h5>{title}</h5>{salutation&&<p className="format-salutation">{salutation}</p>}<div className="format-body">{body}</div>{(signature||date)&&<div className="format-footer">{signature&&<p>{signature}</p>}{date&&<p>{date}</p>}</div>}</div>;
}
function CritiqueExample({ label,title,children,notes }:{label:string;title:string;children:ReactNode;notes:string[]}){
  return <article className="type-v3-critique"><div className="critique-copy"><span>{label}</span><h5>{title}</h5><div>{children}</div></div><aside><b>阅 / 为什么这样写</b>{notes.map(n=><p key={n}>{n}</p>)}</aside></article>;
}

export function FrameworkTypeArticleV3(){
return <div className="expression-v2-course type-v2-course type-v3-course">
<section className="expression-chapter expression-v2-section type-chapter" id="type-summary">
<header className="expression-v2-head compact"><span>01 / SUMMARY</span><h3>归纳概括，先把“题目问什么”变成“材料里找什么”。</h3><p>这是五大题型的地基。后面的分析、对策、公文甚至作文，都离不开概括、归纳和层级判断。</p></header>
<Prose><p>很多人以为归纳概括最简单，因为题目通常写得很直白。真正做起来，难点却很集中：<strong>对象有没有看准、要素有没有找对、材料有没有压缩、层级有没有控制、同义内容有没有合并。</strong></p><p>先建立一个最朴素的判断：题目问什么要素，就围绕这个要素穷尽材料。问题就是问题，原因就是原因，做法就是做法，成效就是成效。材料里其他内容再重要，如果没有服务当前任务，也不能全塞进答案。</p></Prose>
<div className="expression-v2-subtitle strong"><span>底层区分</span><h4>单一要素与复合要素，区别在“题目有没有明确告诉你找什么”</h4></div>
<div className="type-v2-answer-shape"><article><span>SINGLE</span><h5>单一要素</h5><p>题干直接告诉你寻找的问题、原因、做法、成效、特点、变化、经验等。</p></article><article><span>COMPOSITE</span><h5>复合要素</h5><p>题干没有把答案组成说死，需要理解任务后判断要写哪些要素。典型如谈理解、谈看法和大量公文任务。</p></article></div>
<TeacherNote>“概括问题并提出建议”虽然问两个内容，但两个要素都已经明确，所以是两问，不等于复合要素。</TeacherNote>
<TypeMap />
<div className="expression-v2-subtitle"><span>概括与归纳</span><h4>先把话说短，再把同类内容放到一起</h4></div>
<Prose><p><strong>概括</strong>是把长、散、口语化、故事化的材料变成答案语言：删掉无关定语状语、压缩案例、总结顿号列举、保留关键词，多用规范的动宾短语和偏正短语。</p><p><strong>归纳</strong>是在概括之后继续往上走：找共同做法、共同目的、共同本质，形成更合适的上位表达。宣传、监督、管理、技术、人才、设施、制度、资金等，都是常见的中观做法类型。</p><p>材料写“热线、意见箱、网络留言”，概括可以写“通过多渠道收集意见”，归纳可以进一步提成<strong>“畅通群众反馈渠道”</strong>。</p></Prose>
<div className="expression-v2-merge"><p>热线 · 意见箱 · 网络留言</p><i>→</i><b>畅通群众反馈渠道</b></div>
<div className="expression-v2-subtitle strong"><span>常见问法</span><h4>每一种小分类，都要先弄清楚“到底找什么”</h4></div>
<div className="type-v2-rule-grid">
<article><span>问题 / 不足 / 缺失</span><h5>哪里不对、哪里不够</h5><p>问题可以来自制度、设施、管理、观念、行为、结果。遇到“某方面有哪些缺失”，归纳词本身要能够体现“缺失”的性质，如安全感缺失、归属感缺失。</p></article>
<article><span>原因</span><h5>为什么形成这种状态</h5><p>不要只等“因为”。要结合对象判断一句话是否在解释事情为什么发生。主体、环境、机制、资源、观念等都可能构成原因。</p></article>
<article><span>做法 / 措施</span><h5>做了什么</h5><p>动作、对象、方式是核心。多个具体动作可以上提为宣传、监督、管理、技术、人才、设施、制度等做法类型。</p></article>
<article><span>成效 / 收益 / 作用</span><h5>谁受益、好在哪里</h5><p>效果题要先锁定受益主体。对别人带来的积极变化通常较明确；对主体自身的效果必须有材料支撑，不能看到做法就自行推断。</p></article>
<article><span>特点 / 巧在哪里</span><h5>独特属性是什么</h5><p>既可以直接用题干问法形成归纳词，也可以换成能够反映该问法的表达。重点是突出与一般情况不同的鲜明属性。</p></article>
<article><span>变化 / 阶段</span><h5>前后和发展过程</h5><p>变化题找对照；阶段题先按时间或发展节点分段，再概括每一阶段的核心状态与特点。</p></article>
<article><span>经验 / 启示</span><h5>把特殊性转成普适性</h5><p>题目问得大，答案不能一直停在具体案例名称和微小动作，要透过现象提炼可迁移的方法。</p></article>
<article><span>表现形式 / 精神品质</span><h5>抽象概念体现在哪里</h5><p>精神、理念、思想、观念、作用等往往不是材料直接下定义，而是通过行为和做法体现。精神类归纳可用1—2个品质词作归纳，再写具体体现。</p></article>
</div>
<div className="expression-v2-subtitle"><span>总括句</span><h4>实写有信息，虚写只负责引领；不要为了形式浪费格子</h4></div>
<Prose><p>总括句可以分成实写和虚写。实写总括句本身有材料含义，常出现在开头或结尾，能够直接带出后文；虚写总括句只是“主要有以下几点”，通常没有独立要点分。</p><p>字数很紧时，先保证要点。字数充裕、材料确实存在一个能够统领全文的实写判断，再用它做总括。</p></Prose>
<div className="expression-v2-subtitle"><span>答案的度</span><h4>宏观可以统领，中观最适合采分，微观负责补细节</h4></div>
<div className="expression-v2-levels"><article><span>宏观</span><b>加强基层治理</b><p>范围太大，可做总括，但难承担具体采分。</p></article><article className="recommended"><span>中观 ✓</span><b>完善市场设施配置</b><p>既能回答题目，又能罩住消防、排水、通风等内容。</p></article><article><span>微观</span><b>增设消防器材、抽水机……</b><p>真实具体，但全部停在这一层会碎、会超字数。</p></article></div>
<div className="expression-v2-subtitle"><span>最后检查</span><h4>归纳概括最常见的失分点</h4></div>
<div className="expression-v2-five"><article><NumberStep n={1}/><div><h4>对象跑偏</h4><p>所有要素都必须回到题干主体或对象判断。</p></div></article><article><NumberStep n={2}/><div><h4>要素混写</h4><p>问题、原因、做法、效果常挨在一起，先判断再抄。</p></div></article><article><NumberStep n={3}/><div><h4>同义不合并</h4><p>重复案例和相似动作要归纳，否则浪费字数。</p></div></article><article><NumberStep n={4}/><div><h4>只剩大词</h4><p>归纳词负责条理，具体概括才承载信息。</p></div></article><article><NumberStep n={5}/><div><h4>不估字数</h4><p>第三遍总结时就要估行数、定层级、做删减。</p></div></article></div>
</section>

<section className="expression-chapter expression-v2-section type-chapter" id="type-analysis">
<header className="expression-v2-head compact"><span>02 / ANALYSIS</span><h3>综合分析，先把复杂对象拆开，再把关系重新合起来。</h3><p>分析是理解各部分，综合是把部分按题目要求重新组织。真正难的是关系，不是字数。</p></header>
<Prose><p>综合分析常见标志有看法、评析、理解、认识、分析、比较、对比、分析原因等。题目名字相似，任务却可能完全不同。</p><p><strong>分析</strong>可以按材料分部、主题维度或要素拆分；<strong>综合</strong>要求答案具有观点和先后逻辑，常见“并列中带递进”或“递进中带并列”。</p></Prose>
<div className="type-v2-analysis-grid"><article><span>01</span><h5>现象分析</h5><b>看法 / 评价 / 评析</b><p>核心是观点。再根据材料写合理性、问题、影响、原因和必要对策。</p></article><article><span>02</span><h5>理解分析</h5><b>解释词句 / 概念 / 关系</b><p>核心是解释内涵，再看表现形式、意义问题、关系和总结。</p></article><article><span>03</span><h5>原因分析</h5><b>明确问“为什么”</b><p>要素明确，难点在理解、同义合并、归纳层级，有时需要用自己的规范表达形容本质。</p></article><article><span>04</span><h5>对比分析</h5><b>同一把尺子比较</b><p>先找共同本质，再比较目的、做法、效果、性质等维度。</p></article></div>
<div className="expression-v2-subtitle"><span>现象分析</span><h4>先定观点，再决定“为什么”写哪些利弊和问题</h4></div>
<Prose><p>观点可能正向、反向或折中。材料总体肯定，就不要为了“辩证”硬凑反面；材料总体批评，即便存在少量好处，也要体现主要偏向。</p><p>“辩证看待”更适合材料本身客观呈现利弊、没有明显价值偏向的情况。若偏向好，可以写“总体值得肯定，但仍存在……需要完善”；偏向不好，可以写“虽有一定积极作用，但主要问题更突出，应当优化”。</p><p>为什么部分通常写利弊、合理性、问题、危害等；怎么办要解决前面出现的问题，材料有对策先用材料，没有必要时不强行补万能措施。</p></Prose>
<TeacherNote>观点明确不是态度激烈，而是让阅卷人一开始就知道你究竟如何判断这个现象。</TeacherNote>
<div className="expression-v2-subtitle"><span>理解分析</span><h4>第一步解释“异化词”，第二步把抽象概念落到材料表现</h4></div>
<Prose><p>题目出现引号、比喻、材料特有词句时，先解释。所谓“异化词”，就是日常生活里不好直接理解、必须依靠材料语境还原的表达。</p><p>如果是主题词或抽象理念，要继续回答它重要在哪里、问题在哪里、具体体现在哪些行为和做法上。表现形式尤其重要：精神、理念、思想、观念常常通过一组外在做法来体现。</p><p>理解一句话还有一种常见写法：一句话可以明确拆成 A、B 两部分，就分别解释 A、B，再分别写它们的表现，最后总结关系。此时结构更像<strong>并列中带递进</strong>。</p></Prose>
<div className="expression-v2-logic-diagram"><div><b>A：眼中的柜台</b><p>外在形式</p><i>→ 前台设置、办理方式、沟通距离</i></div><div><b>B：心中的柜台</b><p>内在理念</p><i>→ 服务意识、协同机制、便民导向</i></div></div>
<div className="expression-v2-subtitle"><span>原因分析</span><h4>题干明确问原因时，先找全，再考虑归纳和表达</h4></div>
<Prose><p>简单原因分析很像归纳概括：围绕对象找原因、同义合并、用归纳词统领。困难原因分析往往没有现成规范词，需要从认定、责任、观念、机制、程序等材料事实中概括出更准确的原因。</p><p>不要只找“因为”“由于”。只要一句话在解释题干对象为什么形成、为什么引发争议、为什么产生价值，它就是原因线索。</p></Prose>
<div className="expression-v2-subtitle"><span>对比分析</span><h4>相同点要有对比意义，不同点必须在相同维度中展开</h4></div>
<Prose><p>题干如果没有清晰介绍两个案例，可以先简要概括两者；题干已经说清，就别重复浪费格子。</p><p>相同点一般1—2个，且必须是把二者放在一起比较的共同基础。不同点常按目的、做法、效果、评价等维度写：一、目的不同，A……B……；二、做法不同，A……B……。</p><p>最后可以根据材料价值取向总结：好的学习借鉴，不好的纠正改进，再回到主题的宏观要求。</p></Prose>
<div className="type-v2-matrix"><div className="head">比较维度</div><div className="head">A：精细创新</div><div className="head">B：应付检查</div><div>目的</div><div>解决基层工作细、碎、难</div><div>应付检查、展现政绩</div><div>做法</div><div>信息化、透明化、服务化</div><div>形式主义、弄虚作假</div><div>效果</div><div>提效、节约、改善治理</div><div>浪费资源、群众失望</div></div>
<div className="expression-v2-subtitle"><span>结构</span><h4>“是什么—为什么—怎么办”是工具，不是万能模板</h4></div>
<Prose><p>现象分析常见：观点/解释 → 利弊问题 → 对策。理解分析常见：解释内涵 → 表现形式/意义问题 → 总结。对比分析常见：概括对象 → 相同点 → 不同点 → 总结。</p><p>结构必须服从材料。整体可以递进，内部又有并列；也可以先并列 A、B，再在每一部分内部递进展开。</p></Prose>
</section>

<section className="expression-chapter expression-v2-section type-chapter" id="type-solution">
<header className="expression-v2-head compact"><span>03 / SOLUTION</span><h3>提出对策，重点在“提出”：材料给方向，你要把措施写得能执行。</h3><p>对策的价值不在于词多高级，而在于能否解决题目里的真实问题。</p></header>
<Prose><p>常见任务包括单纯提出对策、归纳问题并提出对策、启示题。先判断是一问还是两问，再判断材料里的对策够不够、哪些问题还需要反推。</p></Prose>
<div className="expression-v2-subtitle strong"><span>三类来源</span><h4>直接对策、间接对策、自编对策</h4></div>
<div className="type-v2-source-flow"><article><span>01</span><b>直接对策</b><p>材料已有措施、政策要求、成功经验，先归纳概括，必要时补一点执行细节。</p></article><article><span>02</span><b>间接对策</b><p>从问题、危害、原因、意义、目的反推；案例型材料则总结其解决问题的本质。</p></article><article><span>03</span><b>自编细化</b><p>在材料方向上补主体、对象、方式、内容、保障，让措施从方向变成可操作动作。</p></article><article><span>04</span><b>额外补充</b><p>材料没有覆盖所有主要问题时，在身份权限和常识范围内补齐。</p></article></div>
<div className="expression-v2-subtitle"><span>三条标准</span><h4>针对性、可行性、可操作性分别解决三个问题</h4></div>
<div className="expression-v2-three"><article><NumberStep n={1}/><div><h5>针对性</h5><p>每个主要问题都要有对应措施。</p></div></article><article><NumberStep n={2}/><div><h5>可行性</h5><p>考虑身份权限、法律、处罚、成本、现实条件。</p></div></article><article><NumberStep n={3}/><div><h5>可操作性</h5><p>说明谁做、对谁做、做什么、怎么做，必要时补反馈和保障。</p></div></article></div>
<div className="expression-v2-subtitle"><span>一问与两问</span><h4>两问题，问题可以简，对策一定要留足空间</h4></div>
<Prose><p>“请根据材料中存在的问题提出建议”是一问，题干只是以问题为背景；“归纳问题并提出建议”是两问。两问时问题与对策大致可按<strong>3:7—4:6</strong>控制，具体看信息量。</p><p>可以“问题1+对策1”一一对应，也可以“问题：1、2、3；对策：1、2、3”。若要求明确“一一对应”，必须对应写。问题平均一个点不足一行时，可以不再额外归纳；对策通常要归纳。</p></Prose>
<div className="expression-v2-subtitle"><span>对策怎么写具体</span><h4>从“加强宣传”逐层走到真正能执行的措施</h4></div>
<div className="type-v2-case"><span>层级示意</span><p><b>第一层：</b>加强宣传，扩大宣传范围、完善宣传手段。</p><p><b>第二层：</b>利用公众号、短视频等线上方式扩大宣传范围，邀请志愿者参与。</p><p><b>第三层：</b>由环保部门公众号发布权威信息，邀请专家制作垃圾分类短视频，组织高校志愿者和退休人员开展社区宣传，并设置咨询反馈渠道。</p></div>
<TeacherNote>越具体不等于越好。具体到材料和身份能够支撑即可，不要为了“可操作”凭空编出大量不必要细节。</TeacherNote>
<div className="expression-v2-subtitle"><span>启示题</span><h4>特殊性 → 普适性，是启示题最核心的一步</h4></div>
<Prose><p>案例里的平台名称、人物称呼、地方做法往往具有特殊性。启示要透过这些特殊现象，提炼通用方法：比如“苏E行”不是答案核心，“建设一体化交通服务平台、整合信息服务”才更具迁移性。</p><p>题目问得越大，越要提高层级；字数越紧，越要压缩特殊细节。归纳概括有时会写得像启示题，但启示题不能只照抄案例。</p></Prose>
</section>

<section className="expression-chapter expression-v2-section type-chapter" id="type-implementation">
<header className="expression-v2-head compact"><span>04 / IMPLEMENTATION</span><h3>公文写作，所有类别都先有开头，再进入主体任务。</h3><p>格式要会，内容更要完整。公文不是省格子的技巧题，而是带着身份把一件事说清楚、说完整。</p></header>
<Prose><p>做公文先回答四件事：<strong>我是谁、写给谁、为什么写、希望对方知道或做什么。</strong>然后再判断文种、格式和材料取舍。</p><p>你的答案可以简洁，但不能为了省格子把必要开头删掉。开头承担背景、目的、意义、问题或沟通话术，它决定读者为什么要继续读下去。</p></Prose>
<div className="expression-v2-subtitle strong"><span>文种地图</span><h4>常规类、提纲类、文章类、方案类</h4></div>
<div className="type-v2-analysis-grid"><article><span>01</span><h5>常规类</h5><b>建议书、倡议书、公开信、发言稿、宣传单、致辞等</b><p>最接近现实正式沟通，格式通常最完整。</p></article><article><span>02</span><h5>提纲类</h5><b>发言提纲、汇报提纲、经验介绍提纲</b><p>属于半成品或内部材料，形式可以从简，但开头和主体内容仍要完整。</p></article><article><span>03</span><h5>文章类</h5><b>短评、时评、短文、介绍性文章</b><p>更像小文章，重观点、发展历程、利弊、特点和多个方面。</p></article><article><span>04</span><h5>方案类</h5><b>工作方案、活动方案、征集启事、招募启事</b><p>强调现实执行，流程、对象、时间、要求、参与方式、后续保障必须清楚。</p></article></div>
<div className="expression-v2-subtitle strong"><span>格式</span><h4>标题、主送、正文、落款、日期分别怎么判断</h4></div>
<div className="type-v2-rule-grid"><article><span>标题</span><h5>居中写</h5><p>可用固定标题；格式标题“（机关单位+）关于+事由+的+文种”；信函可写“致XXX的XX信”；面向群众、带宣传号召意味的文种可自拟标题。</p></article><article><span>主送 / 称谓</span><h5>写给谁，就顶格写谁</h5><p>对象明确时写主送。慎用“亲爱的、敬爱的、尊敬的”等感情色彩称呼，是否需要看沟通场景。</p></article><article><span>正文</span><h5>开头 + 主体 + 结尾</h5><p>公文正文都要先有开头。主体根据任务展开；结尾完成总结、号召、感谢、安排或常规收束。</p></article><article><span>落款日期</span><h5>右下角对应排列</h5><p>落款多数写单位，个人身份类信函可写个人；日期可用材料日期、考试当天或“XXXX年XX月XX日”。讲话类常可省落款日期。</p></article></div>
<div className="expression-v2-subtitle"><span>常规类</span><h4>开头 3—5 行左右，主体最丰富，结尾一般 1—2 行</h4></div>
<Prose><p><strong>开头必须有。</strong>常见内容包括背景、身份或引入话术、写作目的，以及为什么要写：意义、现实问题、危害、目的。最后加一句自然过渡，如“现将有关情况介绍如下”“特向大家发出如下倡议”。</p><p><strong>主体</strong>常见三种任务：介绍我们已经做了什么；承诺未来会怎么处理；希望对方接下来做什么。经验交流、倡议书、公开信、建议书的主体差别就在这里。</p><p><strong>结尾</strong>可写宏观对策、呼吁号召、感谢理解、征求意见、祝福或常规文种结语。不要堆套话，1—2行完成即可。</p></Prose>
<FormatSheet title="关于生猪养殖经验交流的讲话稿" salutation="各位养殖村管理人员：" body={<><p>大家好！很荣幸在此向大家介绍我村生猪养殖经验。养殖是我村传统产业，以前环境污染、信息统计困难等问题突出，为此我们引入信息技术，对养殖进行精细化管理。主要做法如下：</p><p>一、建立信息化管理系统……</p><p>二、完善人员配置……</p><p>三、治理养殖污染……</p><p>四、强化安全追溯……</p><p>以上经验供大家参考，希望今后相互交流、共同促进养殖业规范发展。</p></>}/>
<TeacherNote>讲话稿的开头不能删。它负责把“为什么要交流这套经验”讲清楚，主体才有落点。</TeacherNote>
<div className="expression-v2-subtitle"><span>提纲类</span><h4>只有格式可以简，开头不能消失，内容也不能缩水</h4></div>
<Prose><p>提纲类一般只保留标题，不必机械写称谓、落款和日期，但<strong>开头仍然要有</strong>。它通常用2—4行交代背景、解释、意义、目的或当前问题，再自然进入主体。</p><p>主体大多类似归纳概括做法，也可能涉及分析；如果是建议类提纲，材料没有直接对策且要求强调针对性、可行性、可操作性，就要体现“提出”的能力。</p><p>结尾仍然建议写。字数极严时可以非常短，但通常用1—2行总结意义、提出期待或形成呼吁，比完全突然结束更完整。</p></Prose>
<FormatSheet title="关于文明实践品牌活动的经验介绍提纲" body={<><p>我县新时代文明实践中心以解决群众急难愁盼问题为导向，打造多样品牌活动，形成了一套贴近群众、回应需求的实践经验，主要有：</p><p>一、搭建民意反馈平台，形成问题闭环……</p><p>二、创新理论宣讲形式，丰富活动内容……</p><p>三、盘活文化资源，增进邻里互动……</p><p>四、完善村规民约，推动群众自治……</p><p>五、开办村民讲堂，丰富基层文化供给……</p><p>通过听民意、传民声、聚民心，不断提升群众参与度和文明实践实效。</p></>}/>
<div className="expression-v2-subtitle"><span>文章类</span><h4>像一篇短文章：开头先立住主题，中间把信息组织成文章</h4></div>
<Prose><p>文章类理论上并非严格法定公文，但在申论中常作为应用写作出现。标题多为自拟，可以用材料中高端、贴合主题的表达。</p><p><strong>开头必须有，通常2—4行。</strong>可以解释对象、交代意义、现实问题、发展背景或写出观点。要求出现“观点明确”时，开头尤其要把态度亮出来。</p><p>主体可能写发展历程、利弊、多个方面、特点或做法。材料信息很多时，难点反而回到最基础的概括能力：判断主次、控制层级、把总结句放在段首。</p><p>结尾根据前文内容收束：前文有问题就落到改进方向，主要讲优势价值则可升华意义、提出期待。</p></Prose>
<CritiqueExample label="文章类示意" title="“小巷总理”在基层" notes={["开头先解释称谓和制度内涵，让读者知道文章写什么。","主体可按传统做法→数字治理→治理成效的顺序推进，而不是平铺材料。","结尾回到基层治理现代化，完成主题收束。"]}><p>“小巷总理”是对居民委员会主任的尊称，也代表一种扎根群众的基层治理模式。它从人民中来、为人民服务，在时代变化中不断丰富治理方式。</p><p>传统“小巷总理”善用走家串户、集思广益解决民生实事；新一代基层工作者进一步运用议事平台、网格管理和数字工具增强互动……</p></CritiqueExample>
<div className="expression-v2-subtitle"><span>方案类</span><h4>开头必须有，先说为什么办，再把“怎么参加、怎么执行”写清楚</h4></div>
<Prose><p>方案类最强调可操作性。内部方案解决“工作怎么开展”，外部启事解决“别人怎么参与”。</p><p><strong>开头必须有，通常2—3行。</strong>背景、意义、目的材料没有完全给出时，可以围绕任务合理补一句，核心是说明为什么要开展这项工作，再用“现将有关事项说明如下”进入主体。</p><p>主体优先检查：谁来做、对谁做、活动主题、参与对象、具体流程、报名方式、时间地点、要求、后续服务、奖励保障。并非每题都全部出现，但题目真正执行所必需的信息不能漏。</p><p>如果正文已经明确举办单位和活动时间，落款日期通常没有必要重复；若没有，按文种需要补齐。结尾仍可以保留一句简洁号召或期待，尤其面向公众的启事和招募。</p></Prose>
<FormatSheet title="“青年服务基层”志愿活动招募启事" body={<><p>为进一步充实基层志愿服务力量，引导青年在实践中了解基层、服务群众，现面向全市高校学生招募志愿者，有关事项如下：</p><p>一、主办单位：……</p><p>二、招募对象：……</p><p>三、服务内容与流程：1.岗前培训；2.社区服务；3.总结反馈。</p><p>四、报名方式及截止时间：……</p><p>五、服务保障：提供必要培训、保险及志愿服务证明。</p><p>期待更多青年加入，在服务群众中增长本领、贡献力量。</p></>} signature="XX市志愿服务中心" date="XXXX年XX月XX日"/>
<div className="expression-v2-subtitle"><span>公文最后检查</span><h4>格式、内容、语言三条线一起看</h4></div>
<div className="expression-v2-five"><article><NumberStep n={1}/><div><h4>开头完整</h4><p>四类公文都有开头，只是长短和功能不同。</p></div></article><article><NumberStep n={2}/><div><h4>身份对象准确</h4><p>给领导、同事、群众、活动参与者的语气与内容不同。</p></div></article><article><NumberStep n={3}/><div><h4>主体服务任务</h4><p>不是材料摘要，所有信息都要服务写作目的。</p></div></article><article><NumberStep n={4}/><div><h4>格式按文种判断</h4><p>标题、称谓、落款日期不要凭习惯机械添加或删除。</p></div></article><article><NumberStep n={5}/><div><h4>表达正式但不堆套话</h4><p>内容越丰富越好，但每一句都要承担信息或沟通功能。</p></div></article></div>
</section>

<section className="expression-chapter expression-v2-section type-chapter" id="type-essay">
<header className="expression-v2-head compact"><span>05 / ESSAY</span><h3>文章写作，先把立意搭稳，再谈文采和“好看”。</h3><p>申论作文是发表观点并论证观点的过程。标题、引论、正论、结论都服务于同一个中心。</p></header>
<Prose><p>作文最怕“写得很多，却不知道在证明什么”。先找主题，再确定角度，把“主题+角度”完整说成一句话，就是总论点。分论点必须支撑总论点，彼此保持相近层级。</p><p>主题可能直接给出，也可能需要从案例中理解。理解任何抽象概念，都要回到主体或对象：这个概念对谁而言是什么、为什么重要、如何实现。</p></Prose>
<div className="expression-v2-subtitle strong"><span>四种角度</span><h4>政论文、策论文、综合文、思辨文</h4></div>
<div className="type-v2-analysis-grid essay-grid"><article><span>01</span><h5>政论文</h5><b>为什么重要</b><p>把抽象主题拆成几个具体价值、作用或必要性。</p></article><article><span>02</span><h5>策论文</h5><b>怎样做到</b><p>默认主题方向正确，正文重点论证实现路径。</p></article><article><span>03</span><h5>综合文</h5><b>意义与做法共同展开</b><p>材料既强调价值又强调路径，或者能看到两类并列分论点时使用。</p></article><article><span>04</span><h5>思辨文</h5><b>论证 A 与 B 的关系</b><p>如果两个概念是辩证、相互促进、条件或因果关系，核心要写清“关系”。</p></article></div>
<div className="expression-v2-subtitle"><span>标题</span><h4>直接表达主题，不追求玄，追求准和有辨识度</h4></div>
<div className="type-v2-rule-grid"><article><span>点睛式</span><h5>短而直接</h5><p>如“创新公共服务永不止步”“让科技创新大放异彩”。</p></article><article><span>对仗 / 做法+目的</span><h5>关系清楚</h5><p>如“提高科研实力 建设创新中国”“以严格执法的‘红灯’促规范经营的‘通道’”。</p></article><article><span>比喻式</span><h5>有形象，但必须对应主题</h5><p>如“以科技创新之水 浇灌改革攻坚之花”。比喻不能只漂亮、不知所云。</p></article><article><span>主副标题</span><h5>主标题有味道，副标题落主题</h5><p>如“不日新者必日退——以科技创新促进改革”。</p></article></div>
<div className="expression-v2-subtitle strong"><span>龙头</span><h4>引论一般 150—225 字：引子 → 主题 → 意义/问题 → 总论点</h4></div>
<Prose><p>引子可以是名言、案例、概念解释、时代背景，少则一行，多则三四行。引子不能一直绕，要尽快转到真正主题。</p><p>主题意义几乎一定要出现，问题是否出现看材料。如果材料明确暴露主题面临的问题，可以在意义之后简洁写出危害，最后一句落总论点。</p><p>总论点是全文最终要证明的观点。如果分论点已经比较清楚，总论点可以适度把几个方向包含进去。</p></Prose>
<CritiqueExample label="开头示例 01" title="基层治理：从“有回应”走向“真解决”" notes={["第一句直接进入现实场景，没有空泛喊口号。","第二层解释治理为什么难，把主题具体化。","最后一句形成总论点，后文可以自然拆成需求、协同、技术三个分论点。"]}><p>群众诉求越来越多元，基层工作也越来越细。真正有效的治理，不能只满足于“有人接、有人答”，更要让问题被看见、被协同、被解决。唯有从群众需求出发，以多元协同汇聚力量，以数字工具提高效率，才能把治理的触角延伸到民生最细处。</p></CritiqueExample>
<CritiqueExample label="开头示例 02" title="传统文化：守住根，也要长出新枝" notes={["用“根”和“新枝”概括保护与创新的关系。","不是直接喊文化自信，而是先讲现实矛盾。","总论点本身具有思辨关系，后文可以分保护、转化、传播。"]}><p>一项传统能够延续，既需要对根脉的珍视，也需要回应时代生活。只保护而不进入当代，文化可能成为静态陈列；只追求新奇而失去内核，也会失去传承的意义。让传统文化真正活起来，需要守住文化本真，在创造性转化中连接现实生活，在创新传播中抵达更多人。</p></CritiqueExample>
<div className="expression-v2-subtitle strong"><span>猪肚</span><h4>正论常规 3 个分论点，每段 200 字以上，关键是“论证”</h4></div>
<Prose><p>分论点必须完整体现原本概念。如果概念较抽象，第一两句先解释。接着写为什么重要，可以用道理、案例、名言、正反、古今对照等；最后根据材料适度写做法或总结。</p><p>材料案例可以用，但要少写案例本身，多分析案例为什么能证明观点。不要把作文写成“案例展览”。</p></Prose>
<div className="type-v3-thesis-set"><article><span>主题：基层治理</span><p>以需求为起点，让治理精准回应群众急难愁盼。</p><p>以协同为支撑，让多元主体在共建共治中形成合力。</p><p>以技术为工具，让信息流转更畅通、公共服务更高效。</p></article><article><span>主题：传统文化</span><p>守住文化本真，在保护传承中留住精神根脉。</p><p>连接现实生活，在创造性转化中释放时代价值。</p><p>创新传播方式，在交流互鉴中扩大文化影响。</p></article><article><span>主题：青年成长</span><p>以清醒认识校准方向，不被短期得失牵着走。</p><p>以持续行动积累本领，在实践磨砺中增长才干。</p><p>以责任担当拓宽价值，把个人选择放进时代坐标。</p></article></div>
<CritiqueExample label="论证段示例" title="技术不是为了炫技，而是为了让治理更顺畅" notes={["首句就是分论点，不让阅卷人猜。","案例只保留能证明观点的关键动作。","案例之后继续分析‘为什么有效’，这一步才是真正论证。","最后回扣主题，不让段落停在故事上。"]}><p><strong>以技术为工具，让治理信息更畅通、公共服务更高效。</strong>基层事务往往跨部门、跨环节，群众反复跑、信息重复报，本质上是信息流转成本过高。某地整合事项、搭建统一平台后，群众办理时间明显缩短。技术改变的不只是速度，更重要的是重新连接部门、流程和需求。因此，数字化建设应当围绕真实问题展开，让数据多跑路、群众少跑腿，让技术真正成为提高治理效能的工具。</p></CritiqueExample>
<div className="expression-v2-subtitle"><span>论据积累</span><h4>积累要分散，别背整篇范文</h4></div>
<div className="type-v2-rule-grid"><article><span>意义表达</span><h5>为什么重要</h5><p>围绕个人、社会、政府、国家等主体分类积累。</p></article><article><span>案例</span><h5>证明什么</h5><p>记“案例→可证明的观点”，不必背所有细节。</p></article><article><span>名言</span><h5>少而精</h5><p>如创新、法治、民生、治理等主题各准备3—5句，确保理解内涵后再用。</p></article><article><span>句式与词语</span><h5>为表达服务</h5><p>积累动宾短语、规范用词和好句式，再根据当前主题改写。</p></article></div>
<div className="expression-v2-subtitle strong"><span>豹尾</span><h4>结论一般 100 字以上：回扣总论点、复述方向、适度拔高</h4></div>
<Prose><p>结尾可以从一句名言或高端表达进入，但必须马上回到主题；接着重申总论点或压缩复述三个分论点，最后适度拔高、形成号召。</p><p>结尾不能突然发明新观点，也不能只喊“让我们共同努力”。前文已经论证什么，最后就把什么收回来。</p></Prose>
<CritiqueExample label="结尾示例 01" title="基层治理" notes={["先回扣治理不是一时之功。","把需求、协同、技术三条主线压缩重现。","最后提升到治理现代化，但不另起新观点。"]}><p>基层治理没有一劳永逸的答案，只有不断回应变化的能力。把群众需求放在起点，把多元协同贯穿过程，把技术工具用在实处，才能让一件件具体小事成为治理能力提升的真实刻度，让现代化治理最终落在群众可感可及的生活里。</p></CritiqueExample>
<CritiqueExample label="结尾示例 02" title="青年成长" notes={["不堆口号，回到选择、行动和责任。","尾句有力量，但仍然服务正文观点。"]}><p>成长从来不是一次选择决定一生，而是在一次次判断和行动中慢慢形成。看清方向、练好本领、承担责任，青年才能把个人努力放进更大的时代坐标。走过的每一步未必立刻有答案，却会在日后的某个时刻，成为面对复杂世界时最可靠的底气。</p></CritiqueExample>
<div className="expression-v2-subtitle"><span>找分论点</span><h4>题干、来源材料、材料分部、小题和未用材料都是线索</h4></div>
<Prose><p>题干给出完整一句话时，可能可以拆出多个分论点；来源材料如果有明显并列结构，每个部分可能对应一个方向；小题及小题材料可以反推主题对应的意义和做法；未被小题充分使用的材料也可能服务大作文。</p><p>但“分类思想”本身不足以成为分论点。比如只写“技术、人才、制度”太像标签，要补成完整观点：技术如何服务主题、人才为什么重要、制度要实现什么。</p></Prose>
<div className="expression-v2-subtitle"><span>思辨文</span><h4>如果只有两个概念，先判断它们是并列还是辩证关系</h4></div>
<div className="expression-v2-logic-diagram"><div><b>A → B</b><p>路径 / 因果</p><i>通过A的具体做法，推动B实现</i></div><div><b>A ↔ B</b><p>相互促进 / 辩证统一</p><i>分别讲价值，再讲为何不能偏废、如何协同</i></div></div>
<div className="expression-v2-subtitle"><span>评分意识</span><h4>先看写没写对，再看写得好不好</h4></div>
<Prose><p>可以把作文大体理解成先分档、再在档内看表达。观点、总分论点和文章完整性首先决定你在哪个区间；逻辑、内容丰富度、表达、卷面再决定上中下。</p><p>因此训练顺序也应如此：先保证立意正确、论点完整、字数达标，再逐步追求语言、案例和思想深度。</p></Prose>
<div className="expression-v2-subtitle"><span>应用文写作</span><h4>类公文与类作文，也属于作文体系的一部分</h4></div>
<Prose><p>国考偶尔出现类公文应用文，分值通常低于常规大作文、字数也较少，思路更接近公文写作，但表达需要更完整，材料没直接给对策时可能要合理提出。</p><p>江苏省考C类常见类作文应用文。它同样要找总分论点，但表达可以适当生活化，允许结合真实场景扩充；总论点更接近“写这篇东西的目的”，分论点要围绕生活实际展开。格式仍参考公文写作。</p></Prose>
<TeacherNote>作文先写“对”，再写“好”。材料理解、立意准确、分论点稳定，是底线；语言、名言、案例和句式，都是在这个底线上继续加分。</TeacherNote>
</section>
</div>;
}
