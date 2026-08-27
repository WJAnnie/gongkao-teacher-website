import type { ReactNode } from 'react';

function Prose({ children }: { children: ReactNode }) {
  return <div className="framework-voice-prose">{children}</div>;
}

function Topic({ label, title, desc }: { label: string; title: string; desc?: string }) {
  return <div className="framework-voice-topic"><span>{label}</span><h4>{title}</h4>{desc && <p>{desc}</p>}</div>;
}

function Note({ children }: { children: ReactNode }) {
  return <aside className="framework-voice-note"><span>阅 / 高老师提醒</span><p>{children}</p></aside>;
}

function Example({ label, title, children, note }: { label: string; title: string; children: ReactNode; note: ReactNode }) {
  return <article className="framework-voice-example"><div><span className="framework-voice-example-label">{label}</span><h5>{title}</h5>{children}</div><aside><b>阅 / 看这里</b>{note}</aside></article>;
}

function AnswerSheetFigure() {
  return (
    <figure className="framework-voice-answer-sheet">
      <svg viewBox="0 0 920 610" role="img" aria-label="申论答题卡结构示意">
        <defs>
          <pattern id="voiceGrid" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#fffdf8"/><path d="M20 0H0V20" fill="none" stroke="#e89292" strokeWidth="1"/></pattern>
        </defs>
        <rect x="12" y="12" width="896" height="586" fill="#fffdf8" stroke="#dc7474" strokeWidth="1.5"/>
        <line x1="456" y1="22" x2="456" y2="588" stroke="#888" strokeWidth="1"/>
        <text x="224" y="48" textAnchor="middle" fontSize="18" letterSpacing="6" fill="#262626">申 论 答 题 卡</text>
        <text x="32" y="32" fontSize="9" fill="#c95e5e">答题卡示意 · 具体以当年实际试卷为准</text>
        <rect x="32" y="64" width="180" height="78" fill="#fff" stroke="#e89292"/><text x="46" y="84" fontSize="9" fill="#444">考生信息 / 注意事项</text><text x="46" y="102" fontSize="8" fill="#777">姓名、准考证号、规定书写工具</text><text x="46" y="118" fontSize="8" fill="#777">超出答题区域的内容通常无效</text>
        <rect x="230" y="64" width="190" height="78" fill="#fff" stroke="#e89292"/>{Array.from({length:12}).map((_,i)=><rect key={i} x={238+i*14} y="84" width="11" height="45" fill="none" stroke="#efb2b2" strokeWidth=".7"/>)}
        <text x="32" y="168" fontSize="10" fill="#222">第（一）大题 · 第1小题</text><rect x="32" y="180" width="388" height="168" fill="url(#voiceGrid)" stroke="#e89292"/><line x1="32" y1="264" x2="420" y2="264" stroke="#555" strokeWidth="1"/>
        <text x="32" y="374" fontSize="10" fill="#222">第（一）大题 · 第2小题</text><rect x="32" y="386" width="388" height="142" fill="url(#voiceGrid)" stroke="#e89292"/>
        <text x="482" y="48" fontSize="10" fill="#222">第（二）大题</text><rect x="482" y="60" width="394" height="196" fill="url(#voiceGrid)" stroke="#e89292"/><line x1="482" y1="158" x2="876" y2="158" stroke="#555" strokeWidth="1"/>
        <text x="482" y="284" fontSize="10" fill="#222">第（三）大题</text><rect x="482" y="296" width="394" height="118" fill="url(#voiceGrid)" stroke="#e89292"/>
        <text x="482" y="442" fontSize="10" fill="#222">文章写作区 / 后续答题区</text><rect x="482" y="454" width="394" height="92" fill="url(#voiceGrid)" stroke="#e89292"/>
        <text x="455" y="578" textAnchor="middle" fontSize="9" fill="#c95e5e">格子、题号和区域边界会直接影响你如何控制字数与层级</text>
      </svg>
      <figcaption>这张图只帮助你建立“答题卡意识”。具体题号、区域、页数和格数，以你参加考试当年的实际答题卡为准。</figcaption>
    </figure>
  );
}

export function FrameworkExpressionArticle() {
  return (
    <div className="framework-voice-course">
      <section className="expression-chapter framework-voice-section" id="expression-know">
        <header className="framework-voice-head"><span>01 / KNOW THE EXAM</span><h3>先别急着学技巧，先把申论这件事看明白。</h3><p>我上课时更愿意先花一点时间，把这门考试到底在做什么讲清楚。因为你只要把这件事想明白，后面很多所谓的“方法”就不会显得神秘。</p></header>
        <Prose>
          <p>很多同学刚开始学申论，会有两种完全相反的感觉。第一种觉得它很玄，好像需要一种自己暂时没有的“机关思维”；第二种又觉得它很简单，反正答案都在材料里，抄一抄就行。真正做几套题以后，你会发现这两种理解都不够。</p>
          <p>你可以先把申论理解成一场<strong>有任务、有材料、有字数、有答题区域的材料处理考试</strong>。题目先告诉你要完成什么任务，材料提供信息，你再把信息经过理解、筛选、归类、压缩和组织，写成能够直接回答题干的答案。</p>
          <p className="voice-key">所以，做申论时我希望你脑子里一直有三句话：题目究竟要什么？材料真正给了什么？最后这份答案应该长什么样？</p>
          <p>这三个问题贯穿整张试卷。归纳概括是在回答“材料给了什么”；综合分析更强调“这些信息之间是什么关系”；提出对策要判断“问题对应什么解决路径”；公文和作文则进一步要求你在明确任务以后，重新组织材料。</p>
        </Prose>
        <div className="framework-voice-flow"><article><span>QUESTION</span><b>题目</b><p>确定范围、对象、问法、要求和字数。</p></article><article><span>MATERIAL</span><b>材料</b><p>提供问题、原因、做法、成效、观点、案例等信息。</p></article><article><span>ANSWER</span><b>答案</b><p>把信息按题目要求重新排列、概括、归纳和表达。</p></article></div>
        <Note>你可以记住一句很朴素的话：先把题看清，再去读材料。题干没看准，后面越认真，越可能认真地跑偏。</Note>

        <Topic label="试卷到底由什么组成" title="你真正反复打交道的，其实就是注意事项、给定资料和作答要求" />
        <Prose>
          <p>注意事项解决的是考试规则，给定资料是答案的原料，作答要求则是任务书。第一次接触时可以分别认识，真正做题以后，它们会不断发生联系。</p>
          <p>比如材料里讲了一个很长的人物故事。故事本身当然是给定资料的一部分，可题目如果问“某地人才培养的做法”，你就不能把人物经历从头写到尾，而要判断这个故事里真正能回应任务的动作是什么。也许是“导师帮带”，也许是“实践锻炼”，也许是“分类培养”。</p>
        </Prose>

        <Topic label="国考、省考与分类命题" title="先知道你在考什么卷，但基础动作不要跟着考试名称反复换" />
        <Prose>
          <p>不同地区、不同类别的申论，时长、材料风格、题目数量和能力侧重会变化。国考会分类分级命题，江苏省考也会按职位类别设置不同卷型。你备考时要知道自己最终参加哪一类考试，但基础动作仍然是审题、读材料、理解要素、组织答案。</p>
          <p>我更希望你把差异理解成<strong>同一套底层能力在不同场景里的侧重点不同</strong>。有的卷更强调综合管理，有的更贴近行政执法，有的更贴近基层执行和群众工作。方法可以调整，阅读材料和回答任务的基本逻辑不会凭空改变。</p>
        </Prose>
        <Note>具体考试时间、分类和规则每年可能更新，最终以当年官方公告和实际试卷为准。学习方法可以长期使用，考试参数不要背成永久不变的数字。</Note>
      </section>

      <section className="expression-chapter framework-voice-section" id="expression-sheet">
        <header className="framework-voice-head"><span>02 / ANSWER SHEET</span><h3>答案最后要写进格子里，所以版面意识要提前进入做题过程。</h3><p>很多同学练题时只考虑“这个点对不对”，到了答题卡前才发现写不下。其实字数从来不是最后一步才考虑的问题。</p></header>
        <Prose>
          <p>申论答案要落在规定区域里，一般是一格一字。你平时如果完全不看答题卡，只在电脑上或者白纸上随意写，容易形成一种错觉：觉得所有内容都值得保留。真正到了考场，格子会逼着你判断什么必须写、什么可以缩、什么可以合并。</p>
          <p>所以我常说，<strong>字数本身也是题目的一部分。</strong>同样问一个问题，200字和400字给你的表达空间完全不同。字数越紧，你越需要抓中观概念、压缩案例和口语化表达；字数较宽松，则可以保留更多能够形成独立采分价值的细节。</p>
        </Prose>
        <AnswerSheetFigure />
        <Topic label="25格训练" title="先学会用“行数”估算答案，不要写到最后一行才发现超格" />
        <Prose>
          <p>按一行25个格子训练时，200字就是8行，300字就是12行，400字就是16行。这个换算很简单，但真正有用的是：你在第三遍整理答案时，就能大概知道自己还能写多少。</p>
          <p>比如一道300字的归纳概括题，你初步找出了6个大点。12行平均下来，一个大点只有2行左右。那你在组织答案时就要提前判断：归纳词写多长？案例细节保留到什么程度？同义内容有没有必要合并？</p>
        </Prose>
        <div className="framework-voice-list"><article><span>200</span><b>8行</b><p>空间较紧，归纳词要克制，案例和顿号列举通常需要明显压缩。</p></article><article><span>300</span><b>12行</b><p>常见小题空间，可以兼顾归纳与具体信息，但仍要控制层级。</p></article><article><span>400</span><b>16行</b><p>可以展开更多细节，但“字数多”不等于可以重复表达。</p></article></div>
        <Note>不要为了写满而凑字数，也不要为了显得“高级”把本来清楚的具体信息删成空泛大词。答题卡逼你做的是取舍，不是表演压缩。</Note>
      </section>

      <section className="expression-chapter framework-voice-section" id="expression-audit">
        <header className="framework-voice-head"><span>03 / READ THE QUESTION</span><h3>做题第一步，不是找答案，是先把任务边界框出来。</h3><p>我一般会让同学审题时固定看五件事：范围、对象、问法（要素）、要求、字数。顺序可以有习惯差异，但这五个不能漏。</p></header>
        <Prose>
          <p>审题看起来很基础，真正失分却经常发生在这里。题目限定了“给定资料2”，你却把全部材料都翻一遍；题目问的是“A市基层治理的问题”，你看到材料里所有负面内容都抄；题目要求“谈理解”，你只写了原因和对策。后面很多所谓的材料理解问题，往前追，其实是任务没有看准。</p>
        </Prose>
        <div className="framework-voice-list">
          <article><span>01</span><b>范围</b><p>去哪些材料找。既看“根据给定资料几”，也把后面的“结合全部资料”等限定读完整。</p></article>
          <article><span>02</span><b>对象</b><p>答案围绕谁、围绕什么事。对象决定同一句材料到底是问题、背景、原因还是条件。</p></article>
          <article><span>03</span><b>问法（要素）</b><p>题目究竟要求你找问题、原因、做法、成效，还是先解释理解、判断关系。</p></article>
          <article><span>04</span><b>要求</b><p>全面、准确、有条理是常规要求；观点明确、针对性、可行性、格式等会改变答案形态。</p></article>
          <article><span>05</span><b>字数</b><p>决定答案能写多细。先估行数，再决定大点数量和每个点的展开程度。</p></article>
        </div>
        <Example label="审题示例" title="题目问“社区治理过程中存在的主要问题”，材料里的负面内容都能写吗？" note={<p>不能。题干主体是“社区治理过程”，所以要判断负面内容是否直接反映治理方式、机制、渠道、协同等问题。比如“部分老人不会用智能手机”可能只是服务对象特征；“群众意见没有反馈渠道”才直接对应治理问题。</p>}>
          <p>你真正要做的不是看到“不会用手机、经营压力大、停车困难”就全部摘下来，而是让每句话重新回到题干主体上。</p>
          <p><strong>审题给阅读安装了一副镜片。</strong>同样的材料，镜片换了，看到的答案要素也会换。</p>
        </Example>
      </section>

      <section className="expression-chapter framework-voice-section" id="expression-read">
        <header className="framework-voice-head"><span>04 / READ THE MATERIAL</span><h3>材料不是从第一句读到最后一句就算“读完”，要读出结构，也要读出每句话的功能。</h3><p>我更习惯把材料阅读分成三遍。三遍不是机械规定次数，而是把“看大结构、看具体要素、最后组织答案”三个动作分开。</p></header>
        <Prose>
          <p>很多同学第一次读材料会很用力：每句话都划线，每个词都怕漏。结果一页材料画得很满，真正写答案时反而不知道从哪里下手。原因很简单——你一开始就在处理细节，却还不知道材料大体怎么走。</p>
          <p>所以第一遍我希望你先粗一点，第二遍再细，第三遍才考虑落笔。</p>
        </Prose>
        <Topic label="第一遍 / 扫读" title="先看材料大致分成哪几块，每一块围绕题干对象在讲什么" />
        <Prose><p>看到主体变化、时间变化、地点变化、观点转折、案例切换，可以先用“/”划分。这个阶段不用急着把每一句都翻译成答案，只要能说出“这一段大概是背景，这两段在讲问题，后面几个案例在讲做法”就已经很有价值。</p></Prose>
        <Topic label="第二遍 / 精读" title="再逐句判断具体要素，案例、口语化和啰嗦表达尤其要停下来想一想" />
        <Prose><p>第二遍才是你真正“找点”的阶段。每句话都问一句：对题干主体来说，这句话到底是什么？如果是案例，就把人物和故事拆成动作；如果是口语化表达，就想它能不能转换成正式答案；如果是重复说明，就判断是否和前文同义。</p></Prose>
        <Topic label="第三遍 / 总结" title="先想答案的长相，再决定写多少、怎么排、哪里需要再压缩" />
        <Prose><p>到了第三遍，你应该已经知道自己大概有几个点、哪些内容能合并、每部分先后怎么排。这个时候再肉眼估算行数。如果超格，优先处理案例、顿号列举、重复信息和过细层级；如果字数还很宽松，就检查有没有被你压掉但本来有独立价值的细节。</p></Prose>
        <div className="framework-voice-flow"><article><span>01</span><b>先看块</b><p>大体材料逻辑和各部分功能。</p></article><article><span>02</span><b>再看句</b><p>结合主体判断每句话的具体要素。</p></article><article><span>03</span><b>最后看答案</b><p>归类、排序、估字数、再落笔。</p></article></div>
        <Note>三遍阅读不是要求你真的把每个字看三次。它更像三个层次：先建立地图，再看街道，最后决定怎么走。</Note>
      </section>

      <section className="expression-chapter framework-voice-section" id="expression-transform">
        <header className="framework-voice-head"><span>05 / MATERIAL TO ANSWER</span><h3>从材料到答案，中间不是一个“抄”字能解释完的。</h3><p>真正做题时，你会反复经历理解、判断、概括、归纳和表达。材料有多碎，答案就越需要你重新整理。</p></header>
        <Prose>
          <p>材料写的是生活语言，答案要写成任务语言。材料可以写“大家有意见也不知道找谁说”，答案更适合写“群众意见反馈渠道不畅”；材料可以写一个老师带着年轻干部进村处理纠纷的故事，答案可能只需要留下“实施导师帮带、强化实践锻炼”。</p>
          <p>这里有一个尺度很重要：<strong>转换不是把材料变得越抽象越好，而是把它变成更适合当前题目的表达。</strong>题目问得小，具体内容可以多留；题目问得大，尤其启示、经验类题目，就要适当提高层级。</p>
        </Prose>
        <div className="framework-voice-pairs">
          <div className="framework-voice-pair"><div><span>材料表达</span><p>大家有意见也不知道找谁说。</p></div><i>→</i><div><span>答案表达</span><p>群众意见反馈渠道不畅。</p></div></div>
          <div className="framework-voice-pair"><div><span>材料表达</span><p>老同志带着年轻干部进村入户，手把手教他们处理矛盾。</p></div><i>→</i><div><span>答案表达</span><p>实施导师帮带，加强实践锻炼。</p></div></div>
          <div className="framework-voice-pair"><div><span>材料表达</span><p>增设消防器材、抽水机，重新铺设排水管，改造通风口。</p></div><i>→</i><div><span>答案表达</span><p>字数紧时可概括为：完善消防、排水和通风等配套设施。</p></div></div>
        </div>
        <Note>如果某个具体动作本身可能独立采分，就不要为了追求一句“漂亮的归纳”把它吞掉。概括内容通常比归纳标签更重要。</Note>
      </section>

      <section className="expression-chapter framework-voice-section" id="expression-logic">
        <header className="framework-voice-head"><span>06 / ORGANIZE THE ANSWER</span><h3>找到要点以后，还要决定它们谁和谁放在一起、谁先写、谁后写。</h3><p>很多答案单看每一句都没错，放在一起却显得乱。问题往往出在综合和组织，而不是漏了知识点。</p></header>
        <Prose>
          <p>单一要素题常见的是总分结构：归纳词放前面，具体概括放后面。复合要素题则要根据正常认识过程来组织，常见“是什么—为什么—怎么办”，但这只是一个帮助你理解的骨架，材料没有某一部分，就没有必要为了完整硬补。</p>
          <p>另外还要看内容之间是并列还是递进。问题、原因、对策三个部分之间通常有认识上的递进；而在“问题”内部，设计不合理、设施不足、管理不力往往是并列。于是整份答案经常会出现<strong>递进中带并列</strong>，或者<strong>并列中带递进</strong>。</p>
        </Prose>
        <div className="framework-voice-flow"><article><span>并列</span><b>A · B · C</b><p>同一类要素、相近层级，彼此并列。</p></article><article><span>递进</span><b>A → B → C</b><p>从内涵到影响、从问题到原因再到对策，存在先后。</p></article><article><span>组合</span><b>大结构 + 小结构</b><p>大层次递进，小层次并列；或大点并列，小点内部递进。</p></article></div>
        <Example label="结构示例" title="“撤销眼中的柜台”和“撤销心中的柜台”为什么可以分两大部分写？" note={<p>因为两个概念本身就是题目要理解的两个对象。先分别解释，再在每一部分下面组织意义、问题或做法，比把所有意义写在一起、所有问题再写一遍更容易保持逻辑。</p>}>
          <p>“眼中的柜台”可以先解释为前台设置和服务形式的变化，再写它带来的便利以及现实适应问题；“心中的柜台”则进一步落到服务理念、部门协同和便民意识。</p>
          <p>这个结构就是<strong>并列中带递进</strong>：两个概念并列，每个概念内部又有解释、表现和进一步判断。</p>
        </Example>
      </section>

      <section className="expression-chapter framework-voice-section" id="expression-finish">
        <header className="framework-voice-head"><span>07 / FINISH ONE QUESTION</span><h3>最后把前面的动作串起来：一题到底怎么完整走一遍。</h3><p>做题时不用在脑子里念流程，但训练阶段一定要知道自己在哪一步出了问题。这样复盘才有意义。</p></header>
        <Prose>
          <p>先审题，框出范围、对象、问法、要求和字数；第一遍扫材料，划分大块；第二遍精读，判断每句话对应什么要素；第三遍总结，确定答案长相、归纳层级和大致行数；最后再落笔。</p>
          <p>写完以后别只对“参考答案里有没有这个词”。真正值得复盘的是：我有没有漏掉材料中的独立信息？有没有把背景当问题？两个同义点为什么没有合并？这个归纳词是不是太大？答案为什么会超字数？参考答案为什么把这两段放在一起？</p>
          <p className="voice-key">做一道题的价值，不只在于得到一个分数，更在于你能不能借这道题把材料理解和答案组织的经验留下来。</p>
        </Prose>
        <div className="framework-voice-list"><article><span>01</span><b>审题</b><p>范围、对象、问法、要求、字数。</p></article><article><span>02</span><b>扫读</b><p>先分材料大块，知道每一部分大概在做什么。</p></article><article><span>03</span><b>精读</b><p>逐句判断要素，圈关键词，识别案例和口语表达。</p></article><article><span>04</span><b>总结</b><p>确定答案结构、归纳层级、行数和需要压缩的内容。</p></article><article><span>05</span><b>落笔</b><p>表达准确、条理清楚、字迹工整，按规定区域作答。</p></article><article><span>06</span><b>复盘</b><p>从答案反推材料，找到自己真正卡住的能力环节。</p></article></div>
        <Note>申论没有一个“学完方法就结束”的节点。框架帮助你起步，理解能力要靠大量真题和复盘慢慢长出来。</Note>
      </section>
    </div>
  );
}
