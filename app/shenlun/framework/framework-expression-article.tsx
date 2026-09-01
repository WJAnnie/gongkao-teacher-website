import type { ReactNode } from 'react';

function Prose({ children }: { children: ReactNode }) {
  return <div className="framework-voice-prose">{children}</div>;
}

function Topic({ label, title, desc }: { label: string; title: string; desc?: string }) {
  return <div className="framework-voice-topic"><span>{label}</span><h4>{title}</h4>{desc && <p>{desc}</p>}</div>;
}

function Note({ children }: { children: ReactNode }) {
  return <aside className="framework-voice-note"><span>阅 / 云帆老师提醒</span><p>{children}</p></aside>;
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
        <header className="framework-voice-head"><span>01 / KNOW THE EXAM</span><h3>先别急着学技巧，先把申论这件事看明白。</h3><p>我上课时更愿意先把考试本身讲清楚。申论一旦被理解成“材料—任务—答案”的过程，后面的题型、方法和表达都会顺很多。</p></header>
        <Prose>
          <p>很多同学第一次碰申论，会有两个极端。有人觉得它很玄，仿佛需要一种自己暂时没有的“机关思维”；有人又觉得它很简单，觉得答案都在材料里，抄一抄就行。真正做几套题以后你会发现，两种理解都只碰到了表面。</p>
          <p>你可以先把申论理解成一场<strong>有任务、有材料、有时间、有字数、有答题区域的材料处理考试</strong>。题目先告诉你要做什么，材料提供信息，你要做的是理解、筛选、概括、归纳、分析、综合，最后用比较正式、规范、清楚的语言写成答案。</p>
          <p>但再往前走一步，申论又不只是“把材料压短”。很多题目要求你站在公共事务和政府工作的语境里理解问题。尤其是综合分析、公文和作文，材料会不断要求你理解社会运行、群众需求、政策目的、治理逻辑和价值取向。</p>
          <p className="voice-key">所以我希望你做题时一直带着三个问题：题目究竟要什么？材料真正给了什么？最后这份答案应该长什么样？</p>
          <p>理论框架能够降低学习门槛，让你看到题目不至于完全没有方向；真正决定上限的，还是对具体材料的理解。框架是经验总结，材料才是眼前这道题本身。</p>
        </Prose>

        <Topic label="申论由什么组成" title="一张卷子看起来很厚，真正反复打交道的就是三件事" />
        <div className="framework-voice-flow"><article><span>NOTICE</span><b>注意事项</b><p>告诉你考试时间、作答位置、书写工具、信息填写等基本规则。</p></article><article><span>MATERIAL</span><b>给定资料</b><p>答案原料。政策、评论、案例、数据会以不同方式传递信息。</p></article><article><span>TASK</span><b>作答要求</b><p>真正的任务书。范围、对象、问法、特殊要求和字数都在这里。</p></article></div>
        <Prose>
          <p>注意事项平时不用每天背，但考前必须按照当年试卷认真看。比如使用什么书写工具、能不能在规定区域外作答、个人信息如何填写，都以当年官方要求为准。训练时养成“不在答案里透露个人真实信息、不额外写无关标记、字迹清楚”的习惯就够了。</p>
          <p>给定资料通常不是一篇完整文章，而是若干则不同来源的材料拼在一起。你读它时不能只问“这段是什么意思”，还要问“它为什么会被放进这套卷子里，它对当前题目有什么用”。</p>
        </Prose>

        <Topic label="四种常见材料" title="理论、评论、案例、数据，读法不能完全一样" />
        <table className="framework-voice-mini-table"><tbody>
          <tr><th>理论型材料</th><td>常见于重要讲话、政策论述、时代判断。它往往点主题、定方向、给高层次表达。小题未必整段照搬，但理解主题和作文立意时非常重要。</td></tr>
          <tr><th>评论型材料</th><td>直接评价问题、意义、原因、对策，信息密度通常较高。看到“有人认为”“专家指出”“这说明”等表达，要特别留意它是不是在直接告诉你答案要素。</td></tr>
          <tr><th>案例型材料</th><td>通过人、事、过程来讲道理。材料不一定替你写“人才培养”“群众自治”，需要从行为、目的、结果里把本质翻出来。</td></tr>
          <tr><th>数据型材料</th><td>数字本身通常不是答案终点。要看它反映的是高低、快慢、增减、差距、趋势，最后把数据转成能够回应题目的判断。</td></tr>
        </tbody></table>
        <Example label="案例怎么读" title="材料写了六个执法案例，答案为什么不能变成六个故事？" note={<p>案例的名称可以保留必要部分，但真正要写的是它对题干产生的效果：理解支持、干部成长、减少冲突、指导整改、促进守法、弥补监管盲区。案例负责证明，要素负责得分。</p>}>
          <p>江苏省考的一组材料中，“综合执法开放日”让群众走近、了解执法工作；“导师帮带制”帮助年轻人在实践中成长；“驻队律师”减少执法冲突；“无人机使用”填补监控盲区、节省警力。</p>
          <p>如果题目问这些创新做法带来的效果，你要把故事翻译成效果，而不是重新介绍活动流程。</p>
        </Example>
        <Note>材料为王，指的是答案一定要有材料依据。可以直接按点抄，也可以在理解后按义表达；“来源于材料”不等于“只能复制材料原句”。</Note>

        <Topic label="国考、省考与分类命题" title="先知道自己考哪类卷，但别把底层方法跟着考试名称来回换" />
        <Prose>
          <p>国考、省考、事业单位考试在时长、题量、材料风格和岗位侧重上会变化。国考会分类分级，江苏省考也会按照不同职位类别命题。具体参数每年可能调整，所以网站只帮助你建立基本认识，最终一定看当年公告和试卷。</p>
          <p>真正长期稳定的，是审题、理解主体对象、判断要素、读材料逻辑、同义合并、控制层级、规范表达这些动作。行政执法卷会更频繁出现执法理念、裁量、群众关系；基层卷会更贴近执行、群众工作和生活场景，但你不能因此重新发明一套阅读方法。</p>
        </Prose>
      </section>

      <section className="expression-chapter framework-voice-section" id="expression-sheet">
        <header className="framework-voice-head"><span>02 / ANSWER SHEET</span><h3>答案最后要写进格子里，所以版面意识必须提前进入做题。</h3><p>很多同学平时只考虑“这个点是不是答案”，到了答题卡前才发现写不下。其实字数、格子和版面从来不是最后一步的问题。</p></header>
        <Prose>
          <p>申论小题的答案要落在规定区域里，训练时可以按一格一字来估。你如果一直在电脑上无限往下写，会形成一种错觉：所有细节都值得保留。真正到了考场，格子会逼着你判断——哪些信息是核心，哪些可以压缩，哪些应该合并。</p>
          <p>所以我常说，<strong>字数本身也是题目的一部分。</strong>同样问一件事，200字和400字不可能写成同一个细度。字数越紧，越要重视中观概念、案例压缩和同义合并；字数较宽松，才有空间保留更多能独立采分的细节。</p>
        </Prose>
        <AnswerSheetFigure />

        <Topic label="先换成行数" title="25格一行，200字就是8行，300字就是12行，400字就是16行" />
        <Prose>
          <p>这不是数学题，但这个习惯非常实用。比如300字、12行，你预判有5个大点，那么平均一个大点大约两行多一点。归纳词写多长、具体内容留多少，你在动笔前就有了尺度。</p>
          <p>如果一道题平均一个点连一行都不到，很多时候就不适合每点都硬塞一个很长的归纳词。先保证具体要点，再看有没有空间增加归纳。反过来，如果字数充裕，材料又确实存在清楚的层级，就要把答案写得更完整。</p>
        </Prose>
        <div className="framework-voice-list"><article><span>200</span><b>8行</b><p>空间较紧，先守住要点；案例、顿号列举、重复修饰通常需要明显压缩。</p></article><article><span>300</span><b>12行</b><p>常见小题空间，可以兼顾归纳与具体信息，但不要把每个点都扩成小作文。</p></article><article><span>400</span><b>16行</b><p>可以写得更完善，但多出的格子应该用来补有效信息，不是重复同一层意思。</p></article></div>

        <Topic label="书写和标点" title="卷面不要求书法，但要让阅卷人看得轻松" />
        <Prose>
          <p>字迹尽量工整、清楚，可以稍微写大一点，但不要顶格子四边。错别字和大面积涂改都会影响阅读。标点一般也占格，序号、顿号、分号都要提前留位置。具体格式仍然以当年答题卡规则为准。</p>
          <p>小题是否分段，我不主张一刀切。除了公文等确实需要结构和格式的题，其他小题首先看内容逻辑和格子利用。如果分段会白白浪费几行，而分号已经能把层次表达清楚，就没必要为了“形式好看”强行分段。</p>
        </Prose>
        <Note>答题卡逼你做的是取舍，不是删字表演。不要为了“简洁”把具体采分信息删成空泛大词，也不要为了“丰富”把同一个意思换三种说法。</Note>
      </section>

      <section className="expression-chapter framework-voice-section" id="expression-audit">
        <header className="framework-voice-head"><span>03 / READ THE QUESTION</span><h3>做题第一步，不是找答案，是先把任务边界框出来。</h3><p>我一般会让同学审题固定看五件事：范围、对象、问法（要素）、要求、字数。顺序可以形成自己的习惯，但五个都不能漏。</p></header>
        <Prose>
          <p>审题失误特别可惜，因为它会让后面所有努力都建立在错误方向上。题目限定“给定资料2”，你却到处找；题目问“A市服务群众获得的收益”，你写了一堆A市采取的措施；题目要求“谈理解”，你只概括表面意思。材料读得越细，反而错得越完整。</p>
        </Prose>
        <table className="framework-voice-mini-table"><tbody>
          <tr><th>范围</th><td>去哪里找。看清“根据资料X”“给定资料X中反映了……请结合全部资料”等完整限定，不要只盯住题干前半句。</td></tr>
          <tr><th>对象</th><td>到底围绕谁、什么事。要素必须依附对象理解，同一句话换一个对象可能立刻改变身份。</td></tr>
          <tr><th>问法 / 要素</th><td>究竟找什么。问题、原因、做法、成效等属于题目明确告诉你的要素；看法、理解、公文等常需要先判断答案由哪些要素组成。</td></tr>
          <tr><th>要求</th><td>常规要求如全面、准确、有条理；特殊要求如观点明确、针对性、可行性、可操作性、格式正确，会直接改变答案。</td></tr>
          <tr><th>字数</th><td>决定答案的“度”。先换成大致行数，再决定几个点、每点写多细、归纳词是否值得占格。</td></tr>
        </tbody></table>

        <Topic label="最容易混的地方" title="单一要素和复合要素，关键不是“问了几个”，而是题目有没有把要找的东西说清楚" />
        <Prose>
          <p>比如“概括存在的问题并提出建议”，虽然有两个任务，但问题和建议都说得很清楚，是两个明确要素。相反，“谈谈你对这句话的理解”，表面只问一个任务，答案却可能包含解释、表现、意义、问题、关系和总结，需要先理解材料再决定写哪些东西。</p>
          <p>公文也是一样。题目也许只说“写一封公开信”，但你不能只找一种要素。你要先判断写信对象是谁、为什么写、希望对方知道什么、希望对方做什么，最后才知道材料里哪些内容应该进入开头、主体和结尾。</p>
        </Prose>

        <Topic label="常见要素" title="要素不是贴标签，必须结合题干主体和材料语境理解" />
        <Prose>
          <p><strong>问题类</strong>可以是主体自身的问题、正在面临的问题，也可以是某种做法造成的问题；<strong>影响类</strong>有积极影响和消极影响；<strong>做法类</strong>可能是已经采取的措施、可以借鉴的经验、需要吸取的教训；<strong>现状类</strong>是当前客观状态；<strong>原因类</strong>解释为什么形成；<strong>目的类</strong>更像做法希望达到的结果。</p>
          <p>尤其是目的，最容易和意义混在一起。比如“加大科技发展力度，实现国家硬实力提高”，前半句是做法，后半句是目的，也可以理解成预期意义。判断时不要只看动词，要看它在整个材料里承担什么功能。</p>
          <p>同样是“负面内容”，不一定都是题干对象的问题。材料说“老年人不会用智能手机”，如果题目问社区服务对象的特点，这是客观特征；如果进一步说“社区全部取消线下服务，导致老人办事受阻”，才直接变成服务方式的问题。</p>
        </Prose>
        <Example label="效果题" title="A市做了什么，不等于A市获得了什么收益" note={<p>效果题先锁定“谁受益”。对别人产生的积极变化通常容易判断；对主体自身的效果不能看到做法就脑补。材料写到“帮助执法人员学习政策法规、提高记录准确性”，这才是AI工具对执法工作的实际效果。</p>}>
          <p>江苏省考材料中，“行政行为码”实现及时预警、精准监督、风险可控、留痕可溯；“智慧交通管理系统”加强源头监管，节约群众时间；“AI小秘书”提高执法效率和记录规范性。</p>
          <p>如果题目问“取得了哪些成效”，答案应该围绕这些具体变化写，而不是重新列出工具名称后就结束。</p>
        </Example>
        <Note>审题结束后，最好能用自己的话复述一遍任务：我去哪些材料里，围绕哪个对象，找哪些要素，最后写成什么形式，大约能写多少行。</Note>
      </section>

      <section className="expression-chapter framework-voice-section" id="expression-read">
        <header className="framework-voice-head"><span>04 / READ THE MATERIAL</span><h3>材料建议读三遍，每一遍做的事情不一样。</h3><p>很多同学觉得三遍太慢，其实真正拖时间的，是第一遍就陷进细节、第二遍还在重新找结构、第三遍写着写着才发现超字数。</p></header>
        <Topic label="第一遍 / 扫读" title="先看大结构：哪几段是一个部分，为什么是一部分" />
        <Prose>
          <p>第一遍不要急着追求每一句都完全理解。先建立材料地图：这一则大概讲几个部分？主体什么时候换了？时间有没有推进？前面在讲问题，后面是不是开始讲做法？案例前后有没有评论句？</p>
          <p>看到明显重点可以粗略勾画，用“/”之类的简单标记划分部分。这个阶段的目标，是读完以后你能说出材料的大致逻辑，而不是已经写出答案。</p>
        </Prose>
        <Topic label="第二遍 / 精读" title="再逐句判断：这句话对题干对象来说是什么要素" />
        <Prose>
          <p>第二遍才真正进入细节。符合题干“对象+要素”的部分就精读；明显只是倒叙、气氛铺垫、例子引入，而且和答案关系很弱的，可以快一点。</p>
          <p>复合要素题建议养成标注习惯。好的意义、合理性可以用一种线；问题、危害用另一种线；明确对策可以打勾。难理解、需要自己概括的地方，在旁边写一个短词。标记不是越复杂越好，目的是让第三遍整理时一眼找得回来。</p>
        </Prose>
        <Topic label="第三遍 / 总结" title="最后才决定答案的逻辑、行数和删减" />
        <Prose>
          <p>第三遍不是从头再读一次，而是把勾画出来的东西变成答案草图。先同义合并，再看每个部分大概占几行；如果肉眼补行已经明显超格，就从案例、顿号列举、口语化、过细内容和重复信息开始压缩。</p>
          <p>这个阶段要大体知道答案的“长相”。归纳概括有几个大点？综合分析的“是什么、为什么、怎么办”哪些部分真的需要？提出对策有多少问题、多少措施？公文的开头、主体、结尾分别占多少？这些都应该在正式下笔前基本想好。</p>
        </Prose>

        <Topic label="读材料的几个抓手" title="关键句、关联词、关键词和标点，只是帮助你理解，不是机械口诀" />
        <div className="framework-voice-list">
          <article><span>01</span><b>关键句</b><p>首尾句以及“关键是、根本上、核心是、值得一提的是”等表达，经常承担总结、转折或升华作用。</p></article>
          <article><span>02</span><b>关联词</b><p>“但是、然而”提示转折；“此外、同时、不仅、还”提示并列或递进；“因此、所以”提示因果与结论。真正要看的是它连接了哪两层意思。</p></article>
          <article><span>03</span><b>关键词</b><p>高频词、正式规范词、动宾短语、评价词，往往能够直接帮助你形成归纳或答案表达。</p></article>
          <article><span>04</span><b>标点</b><p>冒号、分号、顿号常提示展开层次；引号可能是异化词或特殊做法名称；书名号常提示制度政策。标点是线索，不能见到就抄。</p></article>
        </div>
        <Prose>
          <p>顿号尤其要判断。材料写“消防器材、抽水机、排水管、通风口”，有时只是同一类设施的具体列举，可以总结；但经验介绍类公文里，如果题目正要求介绍这些做法，顿号后的内容可能就是主要信息，不能一概删掉。</p>
          <p>引号也一样。如果只是修辞，比喻本身未必采分；如果材料反复把某项机制称作“导师帮带制”“综合执法开放日”，这个名称可能直接是做法名词，值得保留。</p>
        </Prose>
        <Example label="材料分部" title="农贸市场为什么先分部分，再逐句读，会更清楚？" note={<p>“居民增加”可能是市场问题形成的背景和原因；“过道窄、排水不畅、消防不全、异味严重”才是具体问题。先把背景和问题分开，后面归纳成“设计不合理、设施不足、环境较差”就自然了。</p>}>
          <p>材料连续写：居民不断增加；过道狭窄难以并排通行；排水不畅；消防设施不全；水沟存在异味；空气流通不好。</p>
          <p>如果第一遍没有分清“背景”和“问题”，很容易把“人口增加”也和消防、排水并列成一个同层问题。</p>
        </Example>
      </section>

      <section className="expression-chapter framework-voice-section" id="expression-transform">
        <header className="framework-voice-head"><span>05 / FROM MATERIAL TO ANSWER</span><h3>从材料到答案，中间不是一个“抄”字，而是一连串取舍。</h3><p>申论答案当然来源于材料，但材料写法是为了叙事和说明，答案写法是为了回应题目、方便阅卷。</p></header>
        <Prose>
          <p>最理想的情况，是材料本身已经出现准确、简洁、适合答案的表达，那就直接用。比如材料明确写“建立市、镇、村三级管理网络”，没必要非得换成另一句话证明自己会改写。</p>
          <p>需要转换的通常有四类：<strong>案例太长、语言太口语、顿号细节太多、层级过细。</strong>这时你要做的是保留“按义得分”的信息，把叙事外壳去掉。</p>
        </Prose>
        <div className="framework-voice-pairs">
          <div className="framework-voice-pair"><div><span>材料</span><p>热线、意见箱、微信群、网络留言等都能收到居民意见。</p></div><i>→</i><div><span>答案</span><p>畅通群众意见反馈渠道，多渠道收集诉求。</p></div></div>
          <div className="framework-voice-pair"><div><span>材料</span><p>老同志带年轻干部进村入户，手把手教他们调解矛盾。</p></div><i>→</i><div><span>答案</span><p>实施导师帮带，加强实践锻炼。</p></div></div>
          <div className="framework-voice-pair"><div><span>材料</span><p>大家有意见也不知道该找谁说，反映几次都没人回复。</p></div><i>→</i><div><span>答案</span><p>群众诉求反馈渠道不畅，回应机制不健全。</p></div></div>
          <div className="framework-voice-pair"><div><span>材料</span><p>增设消防器材、抽水机，重新铺设排水管，改造通风口。</p></div><i>→</i><div><span>答案</span><p>字数紧时可概括为：完善消防、排水和通风等配套设施。</p></div></div>
        </div>
        <Prose>
          <p>但最后一个例子不能学成死规则。如果题目问得非常具体，或者消防、排水、通风分别承担独立分值，那就不能一句“完善设施”全部吃掉。层级要不要提高，始终看题目问法大小、材料信息量和字数要求。</p>
        </Prose>

        <Topic label="同义合并" title="材料会把同一个意思拆在不同地方，答案要把它们重新聚在一起" />
        <Prose>
          <p>合并之前先看主体对象是不是一致。主体不同，哪怕都叫“加强宣传”，也不一定能合。主体一致以后，再考虑内容是不是同一做法类型、同一问题本质、同一效果。</p>
          <p>比如材料分别写“老带新”“实地教学”“让年轻干部到村数字服务中心工作”。如果题目问人才工作，可以进一步区分育才、用才；如果全都粗暴归成“加强人才建设”，反而把不同采分点吞掉。</p>
        </Prose>
        <Example label="人才题" title="五个人物故事，最后为什么会形成“引才、育才、留才、用才”？" note={<p>归纳的依据不是词看起来漂亮，而是行为本质和目的不同。让人来到乡村是“引”，培养成长是“育”，提供保障让人留下是“留”，人岗相适发挥能力是“用”。</p>}>
          <p>让小叶拜万书记为师，是育才；让小于到数字服务中心工作，是用才；给返乡人员政策扶持、邀请人才回村发展，可以归到引才；给已经在村发展的人员资金和技术保障，则更接近留才。</p>
        </Example>
        <Note>材料所有内容都值得理解，但并不是所有内容都值得写进当前答案。阅读要尽量理解完整，落笔要严格服从题目。</Note>
      </section>

      <section className="expression-chapter framework-voice-section" id="expression-logic">
        <header className="framework-voice-head"><span>06 / ORGANIZE THE ANSWER</span><h3>要点找齐以后，还要让答案有顺序、有层级、有完整句意。</h3><p>申论大多按点给分，但“按点”从来不等于把所有短语胡乱堆在一起。结构越复杂的题，越要考虑答案读起来是不是自然。</p></header>
        <Topic label="单一要素" title="多数时候写成“归纳词 + 具体概括”的总分结构" />
        <Prose>
          <p>比如市场问题可以写：“一、设计不合理。过道狭窄，难以并排通行，排水不畅；二、设施配备不足。消防设施不全，存在安全隐患；三、市场环境较差。水沟存在异味，空气流通不畅。”</p>
          <p>前面的归纳词让阅卷人迅速看懂这点在回答什么，后面的概括内容承担具体信息。归纳词不能太大，也不能只是“硬件方面、管理方面”这种分类思想而没有直接回答题干。</p>
        </Prose>
        <Topic label="复合任务" title="是什么—为什么—怎么办只是常见认识顺序，不是每道题都要凑齐三段" />
        <Prose>
          <p>现象分析一般先有观点，再根据材料分析利弊、问题、原因，材料确实有对策或问题需要解决时再写怎么办。理解分析可能先解释词句，再写表现形式或关系，最后做总结。公文则要按照身份、对象和文种安排开头、主体、结尾。</p>
          <p>真正的原则是：<strong>同一种要素尽量一次说完，答案整体符合正常认识过程。</strong>不要写两句意义，突然插一个问题，又回头补意义。</p>
        </Prose>
        <Topic label="并列和递进" title="很多好答案都不是一种逻辑，而是两层逻辑嵌套" />
        <div className="framework-voice-list">
          <article><span>并列</span><b>A · B · C</b><p>几个点同层回答同一种要素，如问题内部的三个方面。</p></article>
          <article><span>递进</span><b>A → B → C</b><p>认识逐步推进，如解释概念后分析意义问题，再落到对策。</p></article>
          <article><span>并列中带递进</span><b>大点并列</b><p>几个大方面并列，但每个方面内部按“做法—直接效果—进一步效果”展开。</p></article>
          <article><span>递进中带并列</span><b>大结构递进</b><p>整体按“是什么—为什么—怎么办”推进，每一层内部再列多个并列要点。</p></article>
        </div>
        <Example label="国考理解题" title="“眼中的柜台”和“心中的柜台”为什么可以有两种组织方式？" note={<p>如果先把整句话作为一个整体解释，再集中写意义、问题、对策，是递进中带并列；如果把“眼中的柜台”和“心中的柜台”分别解释并展开各自表现，再作总结，则更接近并列中带递进。材料逻辑清楚时，两种都可能成立。</p>}>
          <p>“眼中的柜台”偏向前台形式和办理距离；“心中的柜台”偏向服务理念和部门壁垒。答案既可以先整体解释“转变前台形式，更要转变服务理念”，也可以分别写两部分。</p>
        </Example>
        <Note>不要把“有条理”理解成序号越多越好。条理真正来自分类合理、层级一致、顺序自然，而不是“一二三四”本身。</Note>
      </section>

      <section className="expression-chapter framework-voice-section" id="expression-finish">
        <header className="framework-voice-head"><span>07 / FINISH ONE QUESTION</span><h3>最后把前面的动作连起来，完整做完一道题。</h3><p>真正的稳定，不是知道很多零散技巧，而是每一道题都能重复一套清楚的工作流程。</p></header>
        <Topic label="做题前" title="先看整套题，再进入第一道小题" />
        <Prose>
          <p>我建议开卷后先快速看所有题目，尤其看作文主题和各小题对应材料。目的不是提前做题，而是知道整套卷大概在围绕什么、哪些材料会重复使用。这样读材料时不容易完全割裂。</p>
        </Prose>
        <div className="framework-voice-list">
          <article><span>01</span><b>审题</b><p>圈出范围、对象、问法、特殊要求和字数，用自己的话复述任务。</p></article>
          <article><span>02</span><b>第一遍扫读</b><p>划分材料部分，粗略勾画重点，建立材料逻辑。</p></article>
          <article><span>03</span><b>第二遍精读</b><p>逐句判断要素，理解案例，标注同义内容和难以直接照抄的表达。</p></article>
          <article><span>04</span><b>第三遍总结</b><p>确定答案长相、顺序、点数和每部分行数，先做同义合并再删减。</p></article>
          <article><span>05</span><b>正式书写</b><p>字迹清楚，逻辑完整，格式符合要求，尽量减少无意义涂改。</p></article>
          <article><span>06</span><b>快速检查</b><p>看对象有没有跑、要素有没有混、问题有没有漏、格式和字数有没有明显错误。</p></article>
        </div>

        <Topic label="做完以后" title="复盘要回到材料，而不是只看自己和参考答案差几个词" />
        <Prose>
          <p>很多同学复盘只做一件事：把参考答案抄一遍。这样进步很慢。真正值得复盘的是：参考答案为什么从这几个自然段提炼出这个点？材料哪句话对应什么要素？这个归纳词为什么放在这里？如果换一个题干对象，答案会不会变？</p>
          <p>我更建议把每道做过的题重新走一遍“材料部分—句子要素—答案表达”的关系。你会慢慢发现，题型只是表面，真正重复出现的是分析、综合、概括、归纳和表达能力。</p>
          <p>理论热点、规范用词、名言、案例都可以积累，但积累的目的不是让答案变得华丽。小题最重要的是准确、全面、有条理；作文才需要在准确基础上进一步追求思想和表达。</p>
          <p className="voice-key">框架让你不至于失去方向，材料理解决定你能走多远。最后还是要回到一题一题地读、一句一句地想。</p>
        </Prose>
      </section>
    </div>
  );
}
