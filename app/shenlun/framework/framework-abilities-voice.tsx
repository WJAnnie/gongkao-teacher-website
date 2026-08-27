import type { ReactNode } from 'react';

export const coreAbilityChapters = [
  { id: 'ability-01', no: '01', title: '分析能力', en: 'ANALYZE' },
  { id: 'ability-02', no: '02', title: '综合能力', en: 'SYNTHESIZE' },
  { id: 'ability-03', no: '03', title: '概括能力', en: 'CONDENSE' },
  { id: 'ability-04', no: '04', title: '归纳能力', en: 'GENERALIZE' },
  { id: 'ability-05', no: '05', title: '表达能力', en: 'EXPRESS' },
] as const;

function Prose({ children }: { children: ReactNode }) { return <div className="framework-voice-prose">{children}</div>; }
function Topic({ label,title,desc }:{label:string;title:string;desc?:string}){return <div className="framework-voice-topic"><span>{label}</span><h4>{title}</h4>{desc&&<p>{desc}</p>}</div>}
function Note({children}:{children:ReactNode}){return <aside className="framework-voice-note"><span>阅 / 高老师提醒</span><p>{children}</p></aside>}
function Example({label,title,children,note}:{label:string;title:string;children:ReactNode;note:ReactNode}){return <article className="framework-voice-example"><div><span className="framework-voice-example-label">{label}</span><h5>{title}</h5>{children}</div><aside><b>阅 / 看这里</b>{note}</aside></article>}

export function FrameworkAbilities(){return <div className="framework-voice-course">
  <section className="framework-voice-section" aria-label="核心能力总览">
    <header className="framework-voice-head"><span>ABILITY MAP / 能力关系</span><h3>材料不会自己变成答案，中间要经过一连串判断。</h3><p>我更愿意把五项能力放进真实做题流程里理解：先分析，再综合；接着概括、归纳，最后把已经想清楚的内容表达出来。</p></header>
    <Prose>
      <p>这五项能力当然会交叉。你在读材料时已经开始概括，在写答案时也还会重新分析。但把它们拆开讲有一个好处：做错题时你能知道自己到底卡在哪里。</p>
      <p>有的同学漏点，是分析时没看懂这句话对题干主体意味着什么；有的同学点都找到了，答案却乱，是综合没有处理好先后和同类项；还有的同学理解没问题，一落笔就超字数，是概括和表达出了问题。</p>
    </Prose>
    <div className="framework-voice-flow">{coreAbilityChapters.map((item)=><article key={item.id}><span>{item.no}</span><b>{item.title}</b><p>{item.en}</p></article>)}</div>
  </section>

  <section className="framework-voice-section" id="ability-01">
    <header className="framework-voice-head"><span>01 / ANALYZE</span><h3>分析能力：先把材料拆开，看清每一部分、每一句到底在说什么。</h3><p>很多同学读材料时会产生一种模糊感：字都认识，句子也能读懂，合起来却不知道该写什么。这个时候缺的往往不是词汇，而是分析。</p></header>
    <Prose>
      <p>分析的第一层，是先看材料的大结构。哪几个自然段在讲同一件事？这一块是背景、问题、原因、做法、成效，还是一个案例？主体变化、时间变化、观点转折、案例切换，都可能意味着材料进入了新的部分。</p>
      <p>第二层才是逐句判断。题干问谁，你就一直围绕谁读。<strong>同一句话脱离题干主体没有固定身份。</strong>它对一个题目可能是问题，对另一个题目可能只是背景或原因。</p>
    </Prose>
    <Example label="主体意识" title="“部分老人不会使用智能手机”一定是社区治理的问题吗？" note={<p>如果题目问“社区治理过程中的主要问题”，这句话更可能是服务对象的特征或治理背景。只有材料进一步写“社区完全取消线下渠道，导致老人办事受阻”，才直接指向治理方式的问题。</p>}><p>所以看到负面内容不要马上抄。先问：这句话究竟对应谁来说？它有没有直接回答题干？</p></Example>
    <Topic label="案例怎么分析" title="案例不是休息区，故事里的行为经常就是要素" />
    <Prose><p>材料可能写“老同志带年轻干部进村入户，手把手教他们调解矛盾”。如果题目问人才培养，真正需要留下的是“老带新、实践教学、导师帮带”；如果题目问基层治理经验，这个案例又可能体现“深入群众、现场解决问题”。</p><p>分析案例时，我一般会让学生先把故事拆成三个问题：谁做了什么？为什么这么做？最后带来了什么变化？这样故事就会慢慢变成做法、原因和成效。</p></Prose>
    <Topic label="关系分析" title="有时候题目不只问一个要素，而是让你看两个概念之间有什么关系" />
    <Prose><p>看到A和B两个概念，先别急着写“相辅相成”。有的关系是路径和结果，有的是相互促进，有的是对比，有的是包含。关系判断错了，后面的结构会整体跑偏。</p></Prose>
    <div className="framework-voice-list"><article><span>A→B</span><b>路径 / 因果</b><p>通过A的具体做法推动B实现。</p></article><article><span>A↔B</span><b>相互促进</b><p>分别解释各自价值，再说明为什么不能偏废、如何协同。</p></article><article><span>A≠B</span><b>对比 / 区别</b><p>用同一维度比较目的、做法、效果或性质。</p></article><article><span>A⊂B</span><b>包含 / 层级</b><p>先判断谁大谁小，避免上下位概念并列。</p></article></div>
    <Note>读完一则材料后，你至少要能说清楚：材料分几块、每块在干什么、每句话对应什么要素、案例藏了什么、这些部分之间是什么关系。</Note>
  </section>

  <section className="framework-voice-section" id="ability-02">
    <header className="framework-voice-head"><span>02 / SYNTHESIZE</span><h3>综合能力：把已经拆开的信息重新组合，让答案从“碎片”变成“整体”。</h3><p>分析帮你把材料看清楚，综合决定你最后怎么写。点找得全不代表答案就清楚，顺序、归类和结构都会影响阅读。</p></header>
    <Prose>
      <p>单一要素题通常比较简单。多个点如果属于同一类，就用“归纳词+具体概括”的总分结构；复合任务则要先想答案长相，比如理解题常见内涵、表现、意义问题和必要结论，公文又要考虑开头、主体、结尾。</p>
      <p>我常提醒学生一句：<strong>材料可以碎，答案不能碎。</strong>材料为了叙事会把同一件事拆在不同段落里，答案却要把同类信息重新放到一起。问题类集中写，做法类集中写；同一主体、同一做法本质的内容也要考虑合并。</p>
    </Prose>
    <Example label="综合示例" title="农贸市场材料为什么不能按原文顺序抄？" note={<p>材料可能先写居民增多，再写过道窄，又跳到消防、异味、排水。答案如果按原文顺序搬，会碎成很多小句。重新综合后，可以形成“设计不合理、设施配备不足、市场环境较差”等几个层次。</p>}><p>原材料顺序服务叙事，答案顺序服务题目。两者不必完全一致。</p></Example>
    <Topic label="并列与递进" title="答案里经常同时存在两个层次的逻辑" />
    <Prose><p>问题、原因、对策之间有认识上的递进；但问题内部几个点往往是并列。于是很多答案会出现“递进中带并列”。反过来，几个大点可能并列，而每个大点内部按照“做法→直接效果→进一步效果”展开，这就是“并列中带递进”。</p></Prose>
    <Note>综合能力很大一部分体现在“先后顺序”。你能不能让阅卷人顺着答案自然地看懂，和你有没有找全要点同样重要。</Note>
  </section>

  <section className="framework-voice-section" id="ability-03">
    <header className="framework-voice-head"><span>03 / CONDENSE</span><h3>概括能力：把材料写短，但别把真正有用的信息一起删掉。</h3><p>概括最难的地方不只是“怎么简写”，还包括“到底要不要简写”。答案的层级和长度，要同时看题目问法、材料信息量和字数。</p></header>
    <Prose>
      <p>我不赞成为了“规范”把所有材料都改成四个字。材料本来就很精准，直接保留往往最好；材料很口语、很啰嗦、案例很多，才需要明显转换。概括真正要做的是<strong>删除不影响答题的信息，保留能够形成采分价值的内容。</strong></p>
      <p>判断简写程度时，先看题目问得大不大。题目问一个很具体的问题，微观细节可能就是答案；题目问启示、经验、总体特点，就要适当提高层级。再看字数：平均一个点只有一行不到，你不可能把所有案例过程都写进去。</p>
    </Prose>
    <Topic label="最常见的四类压缩" title="顿号列举、口语化、案例、过细内容，最容易占掉格子" />
    <div className="framework-voice-pairs">
      <div className="framework-voice-pair"><div><span>材料</span><p>通过热线、意见箱、微信群、网络留言等方式听取意见。</p></div><i>→</i><div><span>概括</span><p>通过多渠道收集群众意见。</p></div></div>
      <div className="framework-voice-pair"><div><span>材料</span><p>大家有意见也不知道该找谁说。</p></div><i>→</i><div><span>概括</span><p>群众意见反馈渠道不畅。</p></div></div>
      <div className="framework-voice-pair"><div><span>材料</span><p>老同志带年轻干部挨家挨户走访，现场教他们化解矛盾。</p></div><i>→</i><div><span>概括</span><p>实施导师帮带，加强实践锻炼。</p></div></div>
      <div className="framework-voice-pair"><div><span>材料</span><p>增设消防器材、抽水机，重铺排水管，改造通风口。</p></div><i>→</i><div><span>概括</span><p>字数紧时：完善消防、排水和通风等配套设施。</p></div></div>
    </div>
    <Prose>
      <p>但最后一个例子要特别注意。如果题目本身就问“具体做了哪些改造”，消防、排水、通风可能分别有独立价值，不能一句“完善设施”全部带过。<strong>层级不是越高越好，要看题目需要你站在哪一层。</strong></p>
    </Prose>
    <Topic label="什么时候不用硬简" title="材料原词准确、字数允许、细节能独立采分时，就让它留下" />
    <Prose><p>概括不是删字比赛。材料已经出现“建立市镇村三级管理网络”“与追溯系统联网”“设置群众议事平台”这类准确动作，如果字数够，就可以直接保留或稍作整理。为了追求四字词，把它们全部改成“完善机制、强化管理”，反而丢掉了信息。</p></Prose>
    <Note>你可以把概括理解成“控制信息密度”。留下多少，取决于题目问法大小、字数紧不紧、这条信息有没有独立价值。</Note>
  </section>

  <section className="framework-voice-section" id="ability-04">
    <header className="framework-voice-head"><span>04 / GENERALIZE</span><h3>归纳能力：在概括之后，再给一组内容一个能够直接回答题干的名字。</h3><p>归纳词通常写在具体概括前面，但它不是装饰。好的归纳会让答案一眼有层次，差的归纳反而会把信息带偏。</p></header>
    <Prose>
      <p>归纳和分类思路要区分。你在草稿上想“这几条都属于硬件”，这只是帮助自己分类；如果题目问“市场存在哪些问题”，写“硬件方面”并没有直接回答问题。更合适的归纳应该是“设施配备不足”或者“市场设计不合理”。</p>
      <p>所以判断一个归纳词，我一般看三件事：<strong>能不能直接回答题干；有没有大到吞掉其他要点；能不能真正覆盖后面的具体内容。</strong></p>
    </Prose>
    <Example label="归纳示例" title="“硬件方面”为什么不如“设施配备不足”？" note={<p>“硬件方面”只是告诉阅卷人你把它们分在一起了；“设施配备不足”已经明确回答“存在什么问题”。归纳词要从分类工具走到答案语言。</p>}><p>材料：消防器材不全、缺少抽水设备、通风设施老化。</p><p>分类思路：硬件。</p><p>答案归纳：<strong>设施配备不足。</strong></p></Example>
    <Topic label="归纳怎么想" title="多个小要点先找共同点，再想共同目的或做法本质" />
    <Prose><p>做法类最常见。发传单、开讲座、进社区宣讲，表面动作不同，本质都可能是宣传引导；建基地、开培训班、实行导师帮带，可能共同指向人才培养；设置热线、意见箱、网络留言，共同目的可能是畅通反馈。</p><p>有时材料已经给你归纳原词，直接用即可；没有原词，就需要你根据这些动作自己总结或仿写。</p></Prose>
    <Topic label="一大俱大" title="同一组归纳要尽量保持相近层级，一个点抬高了，其他点也要重新检查" />
    <Prose><p>比如一组答案原本是“培训人才、引进人才、留住人才”。如果材料某一块已经明确上升到“优化人才发展环境”，那你不能让这一点和另外两个非常具体的小动作硬并列。要么把它降回合适层级，要么把其他点也提升到相近层级，比如“引才、育才、留才、用才”形成一致的归纳。</p></Prose>
    <Note>归纳词的价值在于让答案清楚，但概括内容通常承载更多信息。字数极紧时，先保要点，再决定归纳写到多完整。</Note>
  </section>

  <section className="framework-voice-section" id="ability-05">
    <header className="framework-voice-head"><span>05 / EXPRESS</span><h3>表达能力：小题先求准确、正式、清楚，作文再进一步追求文气和思想。</h3><p>申论表达不等于把所有句子写得“高端”。真正规范的表达，是让阅卷人快速看懂你写了什么、层级在哪里、动作是否明确。</p></header>
    <Prose>
      <p>小题最常用的其实是一些稳定结构。做法类喜欢动宾短语：完善制度、健全机制、优化流程、拓宽渠道、整合资源、压实责任；特点和效果常用偏正式或“N-ADJ”结构：方式多样、主体多元、服务高效、渠道畅通、职责清晰、机制健全。</p>
      <p>这些词不是让你背一张“万能词库”。你要先理解材料是什么，再选择最准确的表达。材料只写“大家一起参与”，可以根据语境概括为“主体多元”；材料写不同部门信息各自封闭，就可以写“信息共享不足”或“部门协同不畅”。</p>
    </Prose>
    <Topic label="常用表达" title="先熟悉申论里常见的动作和状态，再让它们服务具体材料" />
    <table className="framework-voice-mini-table"><tbody>
      <tr><th>制度机制</th><td>建立、完善、健全、规范、细化、落实、压实、明确、统筹、协调</td></tr>
      <tr><th>宣传引导</th><td>宣传、普及、解读、引导、倡导、营造、扩大覆盖、提升知晓</td></tr>
      <tr><th>监督管理</th><td>监管、巡查、检查、整治、处罚、公开、反馈、问责、长效管理</td></tr>
      <tr><th>人才队伍</th><td>引进、培养、选拔、培训、帮带、激励、留用、优化配置</td></tr>
      <tr><th>服务流程</th><td>优化、简化、整合、下沉、前移、协同、畅通、提升效率</td></tr>
    </tbody></table>
    <Prose>
      <p>这张表只是帮助你建立语感。真正落到答案里，对策最好尽量形成“动作+对象+内容/方式+必要保障或目的”的结构。比如“加强培训”可以进一步写成“面向基层工作人员开展高频事项和系统操作培训，通过实操演练提升业务熟练度”。材料支持到哪里，就写到哪里。</p>
    </Prose>
    <Example label="正式表达" title="把生活话转成申论话，但不要失去具体内容" note={<p>“规范”不是追求生僻词。最好的答案往往很朴素：对象明确、动作明确、结果明确，读起来没有歧义。</p>}><p>“几个部门各管一块，互相接不上” → <strong>部门协同机制不健全。</strong></p><p>“办事的人来回跑好几趟” → <strong>办事流程繁琐、服务效率较低。</strong></p><p>“大家一起商量社区里的事” → <strong>引导多元主体参与协商治理。</strong></p></Example>
    <Topic label="作文表达" title="作文可以更有文气，但先有观点和逻辑，再谈名言、案例和句式" />
    <Prose><p>作文里的表达要求会高一些。可以积累名言、案例、意义表达和好句式，也可以适当使用比喻、排比、对仗。但我更看重的是你能不能把观点解释清楚：为什么重要，具体好在哪里，现实中怎么做。语言是把思想说清楚的工具，不应该盖住内容。</p></Prose>
    <Note>最后记一句：小题表达求“准”，作文表达在“准”的基础上再求“好”。先把材料理解对，再让语言帮助你拿分。</Note>
  </section>
</div>}
