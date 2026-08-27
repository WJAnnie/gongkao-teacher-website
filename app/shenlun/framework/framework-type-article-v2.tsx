import type { ReactNode } from 'react';

function TeacherNote({ children }: { children: ReactNode }) {
  return <aside className="expression-v2-note type-v2-note"><span>阅 / 高老师批注</span><p>{children}</p></aside>;
}

function Prose({ children }: { children: ReactNode }) {
  return <div className="expression-v2-prose">{children}</div>;
}

function NumberStep({ n }: { n: number }) {
  return <span className="expression-number-step" aria-hidden="true">{String(n).padStart(2, '0')}</span>;
}

function TypeMap() {
  const items = [
    ['01', '归纳概括', '明确要素 · 找全 · 压缩 · 归纳'],
    ['02', '综合分析', '理解任务 · 判断要素 · 组织关系'],
    ['03', '提出对策', '找准问题 · 对症下药 · 写具体'],
    ['04', '公文写作', '识别情境 · 判断内容 · 完成沟通'],
    ['05', '文章写作', '明确主题 · 搭建论点 · 完成论证'],
  ];
  return <div className="type-v2-map">{items.map(([no, title, desc]) => <article key={no}><span>{no}</span><b>{title}</b><p>{desc}</p></article>)}</div>;
}

function FormatSheet({ title, salutation, body, signature, date }: { title: string; salutation?: string; body: ReactNode; signature?: string; date?: string }) {
  return (
    <div className="type-v3-format-sheet">
      <span className="format-tag">格式示意</span>
      <h5>{title}</h5>
      {salutation && <p className="format-salutation">{salutation}</p>}
      <div className="format-body">{body}</div>
      {(signature || date) && <div className="format-footer">{signature && <p>{signature}</p>}{date && <p>{date}</p>}</div>}
    </div>
  );
}

function CritiqueExample({ label, title, children, notes }: { label: string; title: string; children: ReactNode; notes: string[] }) {
  return (
    <article className="type-v3-critique">
      <div className="critique-copy"><span>{label}</span><h5>{title}</h5><div>{children}</div></div>
      <aside><b>阅 / 为什么这样写</b>{notes.map((note) => <p key={note}>{note}</p>)}</aside>
    </article>
  );
}

export function FrameworkTypeArticleV2() {
  return (
    <div className="expression-v2-course type-v2-course type-v3-course">
      <section className="expression-chapter expression-v2-section type-chapter" id="type-summary">
        <header className="expression-v2-head compact">
          <span>01 / SUMMARY</span>
          <h3>归纳概括，先学会回答题目真正问的东西。</h3>
          <p>五大题型的名字可以帮助我们快速定位，但真正开始做题时，第一步始终是：题目到底让我找什么、材料到底给了什么。</p>
        </header>

        <Prose>
          <p>很多同学刚开始学申论，会本能地先问：“这是什么题？该套哪个结构？”我更希望你先建立另一个习惯：<strong>先看任务，再看题型。</strong></p>
          <p>题型只是外壳。决定你怎么读材料、怎么取舍信息、怎么安排答案顺序的，是题目要求你处理哪一种信息。</p>
          <p>有些题很直接。题目让你“概括问题”“分析原因”“总结成效”，你一眼就知道要去材料里找什么。</p>
          <p>也有些题不会把答案要素写出来。比如“谈谈对一句话的理解”“谈谈你的看法”，或者让你写讲话稿、短评、经验介绍。这类题要先把任务理解清楚，再判断答案里应该出现哪些要素。</p>
        </Prose>

        <div className="expression-v2-subtitle strong"><span>先分清一个概念</span><h4>单一要素与复合要素，区别在“题目有没有明确告诉你找什么”</h4></div>
        <div className="type-v2-answer-shape">
          <article><span>SINGLE ELEMENT</span><h5>单一要素</h5><p>题干已经明确告诉你要找什么。<br /><br />问题、原因、做法、成效、特点、变化、经验等，都是常见的明确要素。</p></article>
          <article><span>COMPOSITE ELEMENT</span><h5>复合要素</h5><p>题干没有直接告诉你答案由哪几类要素组成。<br /><br />需要先理解任务，再判断要写内涵、表现、原因、影响、问题、做法、总结等哪些内容。</p></article>
        </div>
        <Prose>
          <p><strong>“一次问两个东西”并不等于复合要素。</strong>比如“概括问题并提出建议”，虽然题目有两个任务，但“问题”和“建议”都已经说得很清楚，只是两问或多任务。</p>
          <p>真正典型的复合要素，是“谈理解”“谈看法”以及很多公文任务。题目只给你一个任务外壳，你要根据材料和情境判断答案究竟需要哪些部分。</p>
        </Prose>
        <TeacherNote>先判断“题目有没有把要素说清楚”，再决定结构。不要一看到综合分析就条件反射地写“是什么—为什么—怎么办”。</TeacherNote>

        <TypeMap />

        <div className="expression-v2-subtitle"><span>题型本质</span><h4>题目问什么要素，就把这个要素找全、说清楚</h4></div>
        <Prose>
          <p>归纳概括是最基础的一类题，也是后面所有题型都绕不开的能力。</p>
          <p><strong>概括</strong>解决“这段材料到底说了什么”，把啰嗦、口语化、故事化的内容压缩成可以进入答案的信息；<strong>归纳</strong>解决“这些内容为什么可以放在一起”，在概括基础上继续找共同点、共同目的、做法本质或更合适的上位表达。</p>
          <p>比如材料写：开通热线、设置意见箱、开发网上留言平台。先概括，可以写“通过热线、意见箱和网络平台收集群众意见”；再归纳，可以提成<strong>“畅通群众反馈渠道”</strong>。</p>
          <p>归纳词不是越大越好。“加强社会治理”当然也能把这些动作包进去，但这个词大到几乎什么都能装，反而失去区分度。</p>
        </Prose>
        <div className="expression-v2-merge"><p>热线 · 意见箱 · 网上留言</p><i>→</i><b>畅通群众反馈渠道</b></div>

        <div className="expression-v2-subtitle strong"><span>常见小分类</span><h4>名字很多，先弄清楚每一种问法到底找什么</h4></div>
        <div className="type-v2-rule-grid">
          <article><span>问题 / 不足</span><h5>哪里不对、哪里不够</h5><p>可以是制度缺失、设施不足、管理混乱，也可以是思想、行为、结果上的负面状态。注意和“导致问题的原因”区分。</p></article>
          <article><span>原因</span><h5>为什么会这样</h5><p>原因可能来自主体、制度、环境、资源、认知、机制等不同层面。不要只等材料出现“因为、由于”。</p></article>
          <article><span>做法 / 措施</span><h5>做了什么</h5><p>保留动作、对象和方式。多个动作可以继续归纳为宣传、监管、服务、人才、技术、设施、制度等中观做法。</p></article>
          <article><span>成效 / 作用</span><h5>好在哪里、改变了什么</h5><p>问清谁受益、哪一方面发生变化。对主体自身的效果要有材料依据，不要看到做法就自行推断成效。</p></article>
          <article><span>特点 / 特征</span><h5>这个对象鲜明在哪里</h5><p>特点不是把全部做法重抄一遍，而是提炼对象的突出属性、方式、优势或与其他对象不同的地方。</p></article>
          <article><span>变化 / 阶段</span><h5>前后有什么不同</h5><p>变化题重在对照；阶段题先找时间节点或发展节点，再概括每个阶段最突出的状态和特点。</p></article>
          <article><span>经验 / 启示</span><h5>把特殊做法转成普遍方法</h5><p>案例中的人物、地点和特殊动作可以压缩，留下能被别的主体借鉴的方法。题目问得大，答案不能一直停留在小动作。</p></article>
          <article><span>表现形式</span><h5>抽象概念具体体现在哪里</h5><p>精神、理念、思想、观念、作用等抽象词，常通过具体做法、行为或现象体现。需要把“抽象词”落回材料中的外在表现。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>同一材料，不同问法</span><h4>材料没变，题目一变，保留的信息就会变</h4></div>
        <div className="expression-v2-material-example">
          <div className="material-copy"><span>同一段材料</span><p>某社区上线线上平台，把多个事项统一办理，群众办事时间从三天缩短到半天。</p></div>
          <div className="material-answers">
            <article><span>问做法</span><b>上线线上平台，整合办理事项。</b></article>
            <article><span>问成效</span><b>缩短办事时间，提高办事效率。</b></article>
            <article><span>问变化</span><b>由分散办理转向集中办理，由耗时较长转向高效便捷。</b></article>
          </div>
        </div>

        <div className="expression-v2-subtitle"><span>答案的度</span><h4>最稳的是“中观归纳词 + 必要的具体内容”</h4></div>
        <Prose>
          <p>题目问得很小，答案有时可以适度往上概括；题目问得很大，答案却不能一直写得很小。</p>
          <p>比如问“文化建设有哪些经验”，如果始终停留在“开书屋、请专家、换宣传栏”，答案会显得碎；可以继续提炼为“完善文化设施建设管理”“创新文化宣传方式”。</p>
          <p>但如果只剩“加强文化建设”，又太空。真正能稳定得分的表达，通常处在中间层级：能罩住具体动作，同时又直接回答题目。</p>
        </Prose>
        <div className="expression-v2-levels">
          <article><span>宏观</span><b>加强基层治理</b><p>太大，容易和其他要点重叠。</p></article>
          <article className="recommended"><span>中观 ✓</span><b>完善市场设施配置</b><p>既能回答题目，也能罩住消防、排水、通风等具体内容。</p></article>
          <article><span>微观</span><b>增加消防器材、增设抽水机……</b><p>信息具体，但全部停在这一层容易超字数、缺乏条理。</p></article>
        </div>
        <TeacherNote>归纳词负责条理，具体内容负责信息。别为了“看起来高级”把真正能采分的材料细节删掉。</TeacherNote>
      </section>

      <section className="expression-chapter expression-v2-section type-chapter" id="type-analysis">
        <header className="expression-v2-head compact">
          <span>02 / ANALYSIS</span>
          <h3>综合分析，先理解，再把关系重新组织。</h3>
          <p>这类题的难点常常不在“材料有没有答案”，而在于题目没有把答案结构直接告诉你。你需要把材料拆开看，再重新合起来。</p>
        </header>
        <Prose>
          <p>可以把“分析”和“综合”分开理解：<strong>分析，是把复杂对象拆开，弄清每一部分在说什么；综合，是把拆开的内容重新组织，形成一个直接回应题目的整体答案。</strong></p>
          <p>所以综合分析不能只摘句子，也不能只背结构。材料有什么、材料各部分是什么关系，决定最后答案怎么长。</p>
        </Prose>

        <div className="expression-v2-subtitle strong"><span>四类常见题</span><h4>现象分析、理解分析、原因分析、对比分析，要先分清任务</h4></div>
        <div className="type-v2-analysis-grid">
          <article><span>01</span><h5>现象分析</h5><b>评价 / 评析 / 谈看法</b><p>需要对某个现象、观点或变化作出判断，再结合材料分析合理性、问题、原因、影响，材料需要时再提出做法。</p></article>
          <article><span>02</span><h5>理解分析</h5><b>解释一句话 / 一个概念</b><p>先解释内涵，再找它在材料中的表现形式、作用、问题或关系，最后根据材料决定是否需要总结。</p></article>
          <article><span>03</span><h5>原因分析</h5><b>明确要素：为什么</b><p>题目如果直接问“原因”，要素其实已经明确。难点在于原因可能隐藏在不同主体、环节和性质中，需要理解后归并。</p></article>
          <article><span>04</span><h5>对比分析</h5><b>同一维度比较</b><p>先确定比较对象和比较维度，再写相同点、不同点和必要结论。不要把两个案例各抄一遍，把比较工作留给阅卷人。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>现象分析</span><h4>观点从材料里长出来，不要为了“辩证”硬凑正反</h4></div>
        <Prose>
          <p>题目要求“谈看法、评价、评析”时，通常需要先判断这个现象总体上怎么看。</p>
          <p>观点可以是“值得肯定”“存在明显问题”“有合理之处但也有不足”“应当辩证看待”。关键是材料支持什么，你就判断到什么程度。</p>
          <p>材料全在讲好处，就没必要凭空编坏处；材料明确存在矛盾，也不要用一句“有利有弊”把真正的判断糊过去。</p>
          <p>之后再看材料提供了哪些理由：积极作用是什么、问题在哪里、为什么出现、需不需要解决。结构可以是“观点—分析—对策”，也可以只有“观点—分析”。</p>
        </Prose>

        <div className="expression-v2-subtitle"><span>理解分析</span><h4>抽象句先翻译成具体话，再找它在材料里的表现</h4></div>
        <Prose>
          <p>理解分析常把一个抽象概念、一句话、一个比喻放在题目里。第一步不是立刻抄材料，而是先问：<strong>这句话究竟是什么意思？它包含几个概念？这些概念是什么关系？</strong></p>
          <p>解释清楚以后，再回材料找“表现形式”。一个理念如何体现在实际行为中，一个精神如何通过具体做法体现，一个抽象判断为什么成立，都需要材料来支撑。</p>
          <p>如果一句话里有两个并列概念，可以形成“并列中带递进”；如果整体逻辑是“解释—分析—解决”，则更像“递进中带并列”。结构要跟材料走。</p>
        </Prose>

        <div className="expression-v2-subtitle"><span>原因分析</span><h4>别只找“因为”，先确定“什么事情的原因”</h4></div>
        <Prose>
          <p>简单的原因题，材料可能直接给出一串原因；难一点的题，原因散落在不同主体和环节。</p>
          <p>比如一件执法争议为什么引发热议，材料可能同时涉及认定标准、主管责任、处罚幅度、所有权认知、问题处理效率。表面上句式不同，本质上都在回答“为什么大家会觉得这件事有争议”。</p>
          <p>所以原因分析首先要把所问对象定准，再按主体、环节、性质、内外部等方式归并。归并不是为了凑层级，而是为了让原因之间的关系更清楚。</p>
        </Prose>

        <div className="expression-v2-subtitle"><span>对比分析</span><h4>先定维度，再比较，不要写成两个案例介绍</h4></div>
        <Prose>
          <p>比较的核心是“同一把尺子”。你不能A写目的，B写效果，然后说二者不同。</p>
          <p>常见维度包括：目的、主体、做法、对象、效果、本质、条件。先找共同本质，再看同一维度下的差异，答案会清楚很多。</p>
        </Prose>
        <div className="type-v2-matrix">
          <div className="head">比较维度</div><div className="head">A：精细创新</div><div className="head">B：应付检查</div>
          <div>目的</div><div>解决基层工作细、碎、难</div><div>展示政绩、应付检查</div>
          <div>做法</div><div>信息化、透明化、服务化</div><div>形式主义、弄虚作假</div>
          <div>效果</div><div>提效、节约、改善治理</div><div>耗费资源、群众失望</div>
        </div>

        <div className="expression-v2-subtitle strong"><span>最后再记注意事项</span><h4>“是什么—为什么—怎么办”是工具，不是题型身份证</h4></div>
        <div className="expression-v2-five">
          <article><NumberStep n={1} /><div><h4>先解释题目中的特殊词</h4><p>比喻、异化词、抽象概念如果不解释，后面的分析容易失去起点。</p></div></article>
          <article><NumberStep n={2} /><div><h4>先分材料部分</h4><p>知道材料大概分几块，再细看每一句属于什么要素，效率会高很多。</p></div></article>
          <article><NumberStep n={3} /><div><h4>观点不能脱离材料</h4><p>评价题的态度要有材料依据，不要凭生活经验自由发挥。</p></div></article>
          <article><NumberStep n={4} /><div><h4>结构不要反客为主</h4><p>先把材料的关系想清楚，再选结构；不要拿着结构逼材料配合。</p></div></article>
          <article><NumberStep n={5} /><div><h4>结论看材料需要</h4><p>材料已经自然收束时可以总结；没有必要的结论，不要为了完整硬补一句空话。</p></div></article>
        </div>
      </section>

      <section className="expression-chapter expression-v2-section type-chapter" id="type-solution">
        <header className="expression-v2-head compact">
          <span>03 / SOLUTION</span>
          <h3>提出对策，先把问题看准，再把办法写实。</h3>
          <p>对策不是几个“加强、完善、提高”的排列组合。真正有分的措施，需要对准问题、符合身份、具有现实可行性，还要写到能执行的程度。</p>
        </header>
        <Prose>
          <p>很多同学对策写得快，是因为还没把问题看清就开始凭经验输出。</p>
          <p>更稳的顺序是：<strong>先明确问题—再找材料中的直接做法—再从问题和原因反推—最后检查是否具体、可行。</strong></p>
          <p>如果题目是“概括问题并提出建议”，它虽然有两问，但两个要素都很明确。读材料时可以分别标记问题和对策，最后再分配字数。</p>
        </Prose>

        <div className="expression-v2-subtitle strong"><span>对策从哪里来</span><h4>材料直接给的优先，反推的要有依据</h4></div>
        <div className="type-v2-source-flow">
          <article><span>01</span><b>材料直接给做法</b><p>已有措施、成功经验、专家建议、政策要求，优先转化为答案。</p></article>
          <article><span>02</span><b>从问题反推</b><p>渠道少→拓宽渠道；设施不足→补齐设施；职责不清→明确责任。</p></article>
          <article><span>03</span><b>从原因反推</b><p>根源在人才、制度、技术、资金、协调机制，对策就要对应这个根源。</p></article>
          <article><span>04</span><b>必要时补全动作</b><p>材料只有方向时，可以根据身份和常识把动作补完整，但不要脱离材料另起炉灶。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>三条标准</span><h4>针对性、可行性、可操作性，各自解决一个问题</h4></div>
        <div className="expression-v2-three">
          <article><NumberStep n={1} /><div><h5>针对性</h5><p>这条措施在解决哪一个问题？如果“反馈渠道不畅”，却写“加强人才建设”，方向就偏了。</p></div></article>
          <article><NumberStep n={2} /><div><h5>可行性</h5><p>谁有权做？成本、法律、身份和现实条件允许吗？基层单位不能写超出权限的大政策。</p></div></article>
          <article><NumberStep n={3} /><div><h5>可操作性</h5><p>“加强宣传”只是方向。最好继续说明向谁宣传、通过什么渠道、宣传什么内容，必要时补反馈和监督。</p></div></article>
        </div>

        <div className="expression-v2-subtitle"><span>一问与两问</span><h4>先看题目到底要你交几份“作业”</h4></div>
        <div className="type-v2-answer-shape">
          <article><span>ONE TASK</span><h5>只问对策</h5><p>1. 完善……。通过……；<br />2. 加强……。针对……；<br />3. 建立……。明确……。</p></article>
          <article><span>TWO TASKS</span><h5>问题 + 对策</h5><p>一、问题：……<br />二、对策：……<br /><small>问题可以更简洁，对策通常需要更多空间展开。</small></p></article>
        </div>
        <Prose>
          <p>两问题可以先根据材料信息量预估字数，常见训练中问题与对策大致可以按3:7到4:6考虑，但这不是固定比例。材料问题很多、题目对问题要求更细时，就要相应调整。</p>
          <p>对策往往比问题更需要归纳。因为动作多，如果没有“完善制度、强化监管、优化服务”这样的中观概念，答案很容易散。但格子太紧时，仍然优先保留真正能解决问题的动作。</p>
        </Prose>
        <TeacherNote>问题和对策要能一一对上。写完后反过来检查：每个主要问题有没有对应措施？每条措施又在解决什么？</TeacherNote>
      </section>

      <section className="expression-chapter expression-v2-section type-chapter" id="type-implementation">
        <header className="expression-v2-head compact">
          <span>04 / IMPLEMENTATION</span>
          <h3>公文写作，先把情境弄明白，再把格式放到正确的位置。</h3>
          <p>公文看起来文种很多，真正稳定的处理方式，是先识别“谁在什么场景下，为了什么目的，向谁完成什么沟通任务”。格式重要，但任务永远在格式前面。</p>
        </header>

        <Prose>
          <p>刚开始学公文，最容易出现两个极端。</p>
          <p>一种只背格式：看到“倡议书”就先想称谓和落款，却没有想清楚到底要倡议什么；另一种完全不管格式，把所有公文都写成普通归纳概括。</p>
          <p>更稳的做法，是先问五个问题：</p>
        </Prose>
        <div className="expression-v2-five type-v3-five-questions">
          <article><NumberStep n={1} /><div><h4>我是谁？</h4><p>决定立场、权限和口吻。政府部门、社区工作人员、志愿者、个人身份，说话方式不一样。</p></div></article>
          <article><NumberStep n={2} /><div><h4>写给谁？</h4><p>决定称谓、语言和信息取舍。面向群众要清楚易懂，向上级汇报更重事实和条理。</p></div></article>
          <article><NumberStep n={3} /><div><h4>为什么写？</h4><p>是介绍经验、宣传动员、表达感谢、汇报工作，还是设计一项活动？写作目的决定内容中心。</p></div></article>
          <article><NumberStep n={4} /><div><h4>题目要我完成什么任务？</h4><p>有的题只要列提纲，有的要求完整成文，有的重点是说明方案。任务要求优先于你背过的任何格式。</p></div></article>
          <article><NumberStep n={5} /><div><h4>最后写成什么“样子”？</h4><p>确定标题、称谓、正文层次、落款和日期是否需要，再根据字数安排每一部分。</p></div></article>
        </div>

        <div className="expression-v2-subtitle strong"><span>先把格式说清楚</span><h4>标题、称谓、正文、落款、日期，各自有自己的位置</h4></div>
        <Prose>
          <p>考试中的公文格式，不建议学成一套僵硬模板。<strong>题干要求优先，文种习惯其次。</strong>题目明确“只列提纲”“不考虑格式”，就按要求简化；题目要求完整成文，再把必要格式补齐。</p>
          <p>常见格式可以先这样理解：</p>
        </Prose>
        <div className="type-v3-format-rules">
          <article><span>标题</span><b>居中，准确点明文种或主题</b><p>可以是“关于××的倡议书”，也可以根据情境拟一个更有传播力的主题标题。标题首先要准确。</p></article>
          <article><span>称谓</span><b>顶格，明确写作对象</b><p>“各位养殖村管理人员：”“广大新业态从业者：”。如果是文章类、提纲类，未必需要称谓。</p></article>
          <article><span>正文</span><b>通常由开头—主体—结尾构成</b><p>开头交代背景、目的或对象；主体完成任务；结尾根据文种做总结、号召、感谢、安排或自然收束。</p></article>
          <article><span>落款</span><b>发文主体 / 写信人</b><p>倡议书、公开信、感谢信等完整文种常见落款；讲话稿、发言稿、提纲、短评等通常不需要单独落款。</p></article>
          <article><span>日期</span><b>位于落款下方</b><p>需要完整落款的文种一般同时写日期；考试中若题目没有具体日期，可使用“XXXX年XX月XX日”等规范占位表达。</p></article>
        </div>
        <TeacherNote>格式是“外壳”，内容是“任务”。真正的失分大头通常不是少了一个称谓，而是身份、对象和任务都没写对。</TeacherNote>

        <div className="expression-v2-subtitle strong"><span>第一类：常规类</span><h4>讲话、倡议、感谢、宣传等，都有明确的现实沟通对象</h4></div>
        <Prose>
          <p>常规类最像现实生活中的公文或应用文。常见任务包括讲话稿、发言稿、倡议书、宣传单、公开信、感谢信、通知性文字等。</p>
          <p>这类题的共同点是：<strong>对象明确、沟通目的明确、语气必须符合情境。</strong></p>
          <p>但具体文种不能混在一起。讲话稿重“说给现场的人听”，倡议书重“为什么要行动、希望大家怎么行动”，感谢信重“感谢谁、为什么感谢、具体值得感谢在哪里”。</p>
        </Prose>
        <div className="type-v3-public-subtypes">
          <article><span>讲话 / 发言稿</span><h5>听众意识最强</h5><p><b>开头：</b>称呼、问候、身份或交流目的。<br /><b>主体：</b>围绕讲话任务分层展开，例如介绍经验、部署工作、说明情况。<br /><b>结尾：</b>感谢、期待、号召或自然结束。</p></article>
          <article><span>倡议书 / 宣传单</span><h5>让对方愿意行动</h5><p><b>开头：</b>为什么需要倡议。<br /><b>主体：</b>倡议事项或可获得的服务、参与方式。<br /><b>结尾：</b>明确号召，告诉读者下一步怎么做。</p></article>
          <article><span>感谢信 / 公开信</span><h5>情感要真，事实要实</h5><p><b>开头：</b>身份、来信目的。<br /><b>主体：</b>用具体事实说明感谢或沟通理由。<br /><b>结尾：</b>再次表达感谢、祝愿或期待。</p></article>
          <article><span>通知 / 告知类</span><h5>信息必须完整</h5><p><b>核心：</b>对象、事项、时间、地点、要求、注意事项。<br />语言简洁，避免为了“有文采”把关键信息写得含糊。</p></article>
        </div>

        <CritiqueExample label="示例 01 / 讲话稿" title="经验交流，开头先把“为什么要讲这件事”交代出来" notes={[
          '开头不是寒暄堆砌，而是很快交代传统产业、原有问题和本次交流的核心做法。',
          '主体可以顺着“信息管理—人员配置—污染治理—安全追溯”展开，每一点既有归纳词，也有具体内容。',
          '结尾只需一两句交流期待，不要重新复述四条经验。',
        ]}>
          <p>各位养殖村管理人员：</p>
          <p>大家好！生猪养殖是我们村的传统产业，也是许多农户的重要收入来源。过去，养殖信息分散、污染处理不规范、安全追溯困难，既影响管理效率，也制约产业发展。为此，我们把信息技术引入养殖全过程，逐步形成精细化管理体系。下面，我从信息管理、人员配置、污染治理和安全追溯四个方面，和大家交流一些做法。</p>
        </CritiqueExample>

        <CritiqueExample label="示例 02 / 感谢信" title="感谢信最怕“只有感谢，没有事实”" notes={[
          '第一句把身份和来信目的说清，读者立刻知道谁在感谢谁。',
          '主体不要只写“医术高超、医德高尚”，要用长期随访、及时答疑、建立病友群等事实支撑评价。',
          '结尾再表达感谢和祝愿即可，情感可以有，但不要写成抒情散文。',
        ]}>
          <p>W市第一人民医院：</p>
          <p>我是患者李女士的家属。母亲长期受疾病困扰，在治疗和康复过程中，刘医生不仅耐心制定方案，还长期通过线上方式答疑、提醒和安慰。即使在非工作时间遇到突发情况，他也会及时给予专业建议；同时建立病友交流群，为更多患者提供帮助。正是这些具体、持续的付出，让我们感受到专业之外的责任与温度。在此，谨向刘医生和全体医护人员表示诚挚感谢。</p>
        </CritiqueExample>

        <div className="expression-v2-subtitle strong"><span>第二类：提纲类</span><h4>内容优先，格式从简，重点是把“准备说什么”列清楚</h4></div>
        <Prose>
          <p>提纲类常见“发言提纲、汇报提纲、经验介绍提纲、宣传提纲”等。它的本质是：<strong>把完整文章压缩成清晰的内容骨架。</strong></p>
          <p>题目如果明确“列提纲”，通常不需要把所有完整格式都写出来。你可以保留标题，正文按“一、二、三”分层，必要时在开头用一两句交代背景和目的。</p>
          <p>提纲也不能只剩几个大词。每个标题下面仍然要有足够的材料信息，否则“提纲”就变成了目录。</p>
        </Prose>
        <FormatSheet title="关于文明实践品牌活动的经验介绍提纲" body={<>
          <p><b>一、坚持听民意。</b>搭建群众议事平台，形成问题收集、销号、汇总闭环。</p>
          <p><b>二、创新传播方式。</b>通过流动宣讲、电影下乡等形式，把理论宣传与群众文化需求结合。</p>
          <p><b>三、推动群众共治。</b>共同制定村规民约，以积分、约定等方式引导文明实践。</p>
          <p><b>四、盘活阵地资源。</b>利用闲置场所开办讲堂，丰富主题和参与方式。</p>
        </>} />
        <TeacherNote>提纲类的“简”是省掉不必要的外在格式，不是省掉内容。阅卷人仍然要从提纲里看出你找全了哪些要点。</TeacherNote>

        <div className="expression-v2-subtitle strong"><span>第三类：文章类</span><h4>短评、宣传稿、材料性文章，要像一篇完整文章，但仍然受任务约束</h4></div>
        <Prose>
          <p>文章类公文和大作文长得有点像，但目的不同。它通常字数更短、材料依赖更强，任务也更具体。</p>
          <p>比如写短评，要有鲜明观点，再用材料解释为什么；写宣传稿，要让读者快速知道对象有什么特点、价值或值得参与的地方；写材料性文章，则要围绕题目要求把几个方面组织成完整表达。</p>
          <p>这类一般不需要称谓、落款和日期，重点放在标题、开头观点、主体层次和结尾收束。具体仍以题目要求为准。</p>
        </Prose>
        <div className="type-v3-article-structure">
          <article><span>标题</span><b>准确 + 有一点传播感</b><p>不要为了漂亮而偏题。</p></article>
          <article><span>开头</span><b>快速点明对象和核心判断</b><p>告诉读者这篇文章为什么值得看。</p></article>
          <article><span>主体</span><b>按材料逻辑分层</b><p>意义、做法、变化、特点等都可能成为主体。</p></article>
          <article><span>结尾</span><b>回扣主题</b><p>短而自然，避免重新开新观点。</p></article>
        </div>

        <div className="expression-v2-subtitle strong"><span>第四类：方案类</span><h4>真正难的不是“写得像方案”，而是让方案能够执行</h4></div>
        <Prose>
          <p>方案类常见活动方案、工作方案、调查方案、整治方案等。材料里不一定把所有格式项目逐项给出，你需要根据任务补齐必要的执行信息。</p>
          <p>方案的主体通常要回答：<strong>为什么做、谁来做、对谁做、什么时候做、在哪里做、具体怎么做、如何保障和反馈。</strong></p>
          <p>但这七个问题也不是每道题都必须机械写满。比如题目重点要求“设计活动流程”，就把篇幅放在活动环节；如果题目要求“提出工作方案”，责任主体、阶段安排、保障机制就更重要。</p>
        </Prose>
        <div className="type-v3-plan-flow">
          <article><span>01</span><b>目的</b><p>为什么开展</p></article><i>→</i>
          <article><span>02</span><b>对象</b><p>服务 / 调研谁</p></article><i>→</i>
          <article><span>03</span><b>流程</b><p>先做什么、再做什么</p></article><i>→</i>
          <article><span>04</span><b>保障</b><p>人员、宣传、物资、反馈</p></article>
        </div>
        <FormatSheet title="“社区安全宣传周”活动方案" body={<>
          <p><b>一、活动目的。</b>提高居民安全意识和应急能力。</p>
          <p><b>二、参与对象。</b>社区居民、物业人员、志愿者及相关专业人员。</p>
          <p><b>三、活动安排。</b>前期线上征集安全问题；中期开展讲座、实操演练和隐患排查；后期公布整改清单并回访。</p>
          <p><b>四、保障措施。</b>明确人员分工，准备应急物资，做好现场秩序维护和意见反馈。</p>
        </>} />

        <div className="expression-v2-subtitle"><span>公文最后检查</span><h4>先看任务有没有完成，再看格式有没有漏</h4></div>
        <div className="expression-v2-five">
          <article><NumberStep n={1} /><div><h4>身份对不对</h4><p>有没有写出自己没有权限做的事？语言是否符合身份？</p></div></article>
          <article><NumberStep n={2} /><div><h4>对象对不对</h4><p>写给群众、领导、同事、网友，表达方式和信息重点应该不同。</p></div></article>
          <article><NumberStep n={3} /><div><h4>任务全不全</h4><p>题目要求介绍经验、宣传服务、提出倡议，主体内容必须真正完成这些任务。</p></div></article>
          <article><NumberStep n={4} /><div><h4>格式够不够</h4><p>完整文种再补标题、称谓、落款、日期；提纲类和文章类不要机械加全套。</p></div></article>
          <article><NumberStep n={5} /><div><h4>语气自然不自然</h4><p>公文最终是给人看的。过度官话、空话、套话会挤掉真正有分的信息。</p></div></article>
        </div>
      </section>

      <section className="expression-chapter expression-v2-section type-chapter" id="type-essay">
        <header className="expression-v2-head compact">
          <span>05 / ESSAY</span>
          <h3>文章写作，先把“我要证明什么”想清楚，再谈文采。</h3>
          <p>一篇申论文章真正站得住，需要主题明确、总论点稳定、分论点有层次、论证能推进。好词好句可以加分，但它们必须长在清楚的思路上。</p>
        </header>

        <Prose>
          <p>作文容易让人焦虑，因为它不像小题那样能迅速核对“有没有这个点”。很多同学于是把安全感寄托在背开头、背案例、背模板。</p>
          <p>这些积累有用，但它们解决的是表达问题，不会自动替你完成思考。</p>
          <p>我更建议把作文拆成四个问题：<strong>主题是什么？我要证明什么？准备用哪几个分论点证明？每个分论点怎么真正论证？</strong></p>
          <p>这四个问题想清楚以后，开头、案例、名言、结尾才有真正的落点。</p>
        </Prose>

        <div className="expression-v2-subtitle strong"><span>第一步：找到观点</span><h4>主题 → 总论点 → 分论点，一层一层往下拆</h4></div>
        <Prose>
          <p><strong>主题</strong>是文章讨论的核心对象；<strong>总论点</strong>是你围绕主题要作出的核心判断；<strong>分论点</strong>是用来证明总论点的几个相对独立、彼此协调的支撑点。</p>
          <p>寻找分论点，可以按三个来源检查：</p>
          <p>第一，看题干或来源材料有没有直接给出并列概念。如果两个概念很明确，先把它们的内涵和关系吃透，不要急着另起炉灶。</p>
          <p>第二，把材料分部。不同案例、评论、政策话术到底分别从哪个方面解释主题？这些“方面”很可能就是分论点来源。</p>
          <p>第三，再看小题材料和未充分利用的材料，是否还提供了意义、做法、关系或价值层面的支撑。</p>
        </Prose>
        <div className="type-v2-mini-flow"><span>题干 / 来源材料</span><i>→</i><span>材料分部</span><i>→</i><span>小题 / 其他材料</span><i>→</i><b>形成分论点</b></div>
        <TeacherNote>分论点不是“三个看起来像标题的句子”。它们要共同回答总论点，又各自有自己的内容边界。</TeacherNote>

        <div className="expression-v2-subtitle strong"><span>第二步：判断文章思路</span><h4>策论、政论、综合、思辨，区别在“正文主要证明什么”</h4></div>
        <div className="type-v2-analysis-grid essay-grid">
          <article><span>01</span><h5>策论文</h5><b>重点回答“怎么做到”</b><p>正文以做法为主，但每个做法都要说明为什么重要、具体如何做，不能写成对策题的简单扩写。</p></article>
          <article><span>02</span><h5>政论文</h5><b>重点回答“为什么重要”</b><p>正文主要论证价值、意义、作用、必要性，把抽象主题拆成不同方面讲透。</p></article>
          <article><span>03</span><h5>综合文</h5><b>意义与路径共同展开</b><p>材料同时强调价值和做法，或几个分论点本身性质不同，可以形成更综合的结构。</p></article>
          <article><span>04</span><h5>思辨文</h5><b>重点处理 A 与 B 的关系</b><p>既要A也要B、A促进B、A与B相互作用，都不能把两个概念各写一半就结束，关系本身就是论证重点。</p></article>
        </div>
        <Prose>
          <p>这些类型是帮助你理解文章重心，不是给每道作文贴标签。真正写的时候，题干和材料决定你最适合怎么论证。</p>
          <p>比如“流动与新生”，如果材料体现基础设施、市场机制、制度创新、包容文化都在促进要素流动，并由此带来新的经济和社会活力，就可以围绕“通过不同条件促进流动，进而催生新生”建立一组因果型分论点。</p>
        </Prose>

        <div className="expression-v2-subtitle strong"><span>第三步：龙头 · 猪肚 · 豹尾</span><h4>开头要点题，中间要丰满，结尾要收得住</h4></div>
        <div className="type-v2-essay-body">
          <article><span>龙头</span><h5>引论</h5><p>可以有高度，但最重要是解释主题、建立语境、亮出总论点。所谓“画龙点睛”，重点在“点题”，不是堆漂亮句子。</p></article>
          <article><span>猪肚</span><h5>正论</h5><p>分论点有条理、论据够丰富、分析能推进。每一段都必须真正支撑总论点，不能三个段落换近义词重复。</p></article>
          <article><span>豹尾</span><h5>结论</h5><p>短促有力，回扣主题，适度拔高。不要最后突然增加一个新的分论点，也不要把开头再抄一遍。</p></article>
        </div>

        <div className="expression-v2-subtitle strong"><span>开头怎么写</span><h4>没有唯一模板，但要完成“进入主题—解释主题—亮出观点”</h4></div>
        <Prose>
          <p>一个好开头不一定华丽，但读完以后应该知道：这篇文章在讨论什么，你准备怎么看。</p>
          <p>下面给三种常见写法。它们不是拿来整段背的，而是让你看清开头为什么成立。</p>
        </Prose>

        <CritiqueExample label="开头例 01 / 现实切入" title="主题：基层治理的精细化" notes={[
          '第一句从现实场景切入，没有直接喊口号。',
          '第二句把“精细化”解释成群众可感知的治理能力，完成概念落地。',
          '最后一句亮出总论点，并自然预告后文可以从需求、机制、技术三个方面展开。',
        ]}>
          <p>城市治理最见功力的地方，往往不在宏大的口号，而在一条背街小巷是否干净、一次群众诉求能否及时回应、一个老问题能否找到更细致的解决办法。所谓精细化，就是把治理的尺度落到具体的人、具体的事和具体的场景中。提升基层治理效能，需要从群众需求出发，以机制协同夯实基础，以技术赋能提高效率，让治理既有精度，也有温度。</p>
        </CritiqueExample>

        <CritiqueExample label="开头例 02 / 材料关系切入" title="主题：传统文化的创造性转化" notes={[
          '不是把“传统文化很重要”重复三遍，而是先指出传承面临的新环境。',
          '“守住内核”和“更新表达”形成一组清晰关系，为思辨或综合文留下空间。',
          '最后一句形成总论点，后文可以分别写内涵转化、载体创新、现实应用。',
        ]}>
          <p>传统文化从来不是停在博物馆里的静态标本。时代在变，生活方式在变，传播媒介也在变，如果只守着旧形式，文化可能离当代生活越来越远；如果只追逐新鲜，又容易在热闹中丢掉真正的内核。让传统文化焕发新生，需要在理解其精神价值的基础上更新表达方式、拓展现实应用，在守正与创新之间找到新的连接。</p>
        </CritiqueExample>

        <CritiqueExample label="开头例 03 / 判断切入" title="主题：青年成长与选择" notes={[
          '用“选择很多”与“真正困难”形成转折，迅速制造问题意识。',
          '没有急着列案例，而是先提出判断：成长来自理解自己、理解时代、承担选择。',
          '适合后文写认知、能力、责任等意义型或综合型分论点。',
        ]}>
          <p>今天的青年拥有比过去更多的选择，也面对更复杂的判断。真正困难的，从来不是“有没有路可走”，而是在机会、兴趣、现实与责任之间，找到适合自己的方向并为之负责。成长因此不只是能力的增加，更是认知的成熟：看清自己，也看见时代；尊重个人选择，也懂得承担选择背后的责任。</p>
        </CritiqueExample>

        <div className="expression-v2-subtitle strong"><span>分论点怎么搭</span><h4>同一主题可以有不同拆法，关键是“彼此独立，又共同支撑总论点”</h4></div>
        <div className="type-v3-thesis-groups">
          <article><span>主题 A / 基层治理</span><h5>总论点：基层治理要把精细化落到群众可感知的每一个环节。</h5><p><b>分论点一：</b>以需求为起点，让治理精准回应群众急难愁盼。<br /><b>分论点二：</b>以协同为支撑，让多元主体在共建共治中形成合力。<br /><b>分论点三：</b>以技术为工具，让治理信息更畅通、服务更高效。</p></article>
          <article><span>主题 B / 传统文化</span><h5>总论点：传统文化要在理解内核的基础上完成创造性转化。</h5><p><b>分论点一：</b>读懂文化内涵，为当代价值寻找精神根基。<br /><b>分论点二：</b>创新传播载体，让传统表达进入现代生活。<br /><b>分论点三：</b>拓展现实应用，让文化智慧参与社会发展。</p></article>
          <article><span>主题 C / 青年成长</span><h5>总论点：真正的成长，是在认识世界的过程中形成稳定而有担当的自我。</h5><p><b>分论点一：</b>以独立思考校准方向，在复杂信息中形成判断。<br /><b>分论点二：</b>以持续学习积累能力，在实践磨炼中增长本领。<br /><b>分论点三：</b>以责任意识拓宽格局，把个人选择放进时代坐标。</p></article>
        </div>
        <TeacherNote>好的分论点有“边界”。如果三个分论点互相都能替换，或者每段都能塞进同一个案例，往往说明拆分还不够清楚。</TeacherNote>

        <div className="expression-v2-subtitle strong"><span>一段怎么真正论证</span><h4>观点—解释—论据—分析—回扣，重点永远在“分析”</h4></div>
        <Prose>
          <p>很多作文的问题不是没有例子，而是<strong>例子写完了，论证也结束了。</strong></p>
          <p>一个案例只有经过分析，才能变成论据。你要告诉阅卷人：这个案例为什么能证明分论点？其中哪个行为、机制或结果和你的观点有关？它能说明什么更普遍的道理？</p>
        </Prose>
        <CritiqueExample label="论证段例 / 技术赋能治理" title="分论点：以技术为工具，让治理信息更畅通、服务更高效" notes={[
          '第一句直接亮出分论点，不让读者猜这一段在说什么。',
          '案例只保留能证明观点的动作，没有把故事完整复述。',
          '案例之后继续分析“为什么有效”，把技术和治理机制联系起来，这一步才是真正论证。',
          '结尾回扣“工具”定位，避免写成技术万能论。',
        ]}>
          <p>治理精细化离不开信息的及时流动，技术可以为此提供更高效的工具。过去，一些基层事项分散在不同窗口，群众重复提交材料、工作人员来回核对，信息壁垒放大了办事成本。通过统一平台整合事项、共享数据、公开进度，群众少跑腿，部门也能更快发现堵点。技术真正改变的，不只是办理速度，更是信息流转和协同方式。当然，工具只有嵌入清晰的责任机制和服务流程，才能把“数字便利”转化为真正的治理效能。</p>
        </CritiqueExample>

        <div className="expression-v2-subtitle"><span>论据怎么用</span><h4>名言、案例、政策话术都只是材料，别让积累抢走文章本身</h4></div>
        <div className="type-v3-evidence-grid">
          <article><span>案例</span><h5>抓“最能证明观点”的一两个动作</h5><p>不要讲完整故事。人物、时间、地点能省则省，把篇幅留给行为、机制和结果。</p></article>
          <article><span>名言</span><h5>用来点题，不用来代替论证</h5><p>一句合适的引用足够。引用之后还要解释它为什么和本段观点有关。</p></article>
          <article><span>材料原话</span><h5>可以转化，不要大段照抄</h5><p>把材料里的政策表达、评价话术变成自己的论证语言，保持正式但不要失去自然。</p></article>
          <article><span>常识推理</span><h5>能推一步，不要推十步</h5><p>从材料和基本公共治理逻辑出发解释影响，避免脱离题目自由发挥。</p></article>
        </div>

        <div className="expression-v2-subtitle strong"><span>结尾怎么收</span><h4>短一点、稳一点，把主题和总论点重新合起来</h4></div>
        <Prose>
          <p>结尾不负责拯救前文。前面没有论证清楚，最后再喊一句“让我们共同努力”也不会变好。</p>
          <p>好的结尾通常完成两件事：回扣主题，给全文一个自然的方向感。可以适度拔高，但不要突然引入一个全文没讲过的新概念。</p>
        </Prose>

        <CritiqueExample label="结尾例 01 / 回扣式" title="基层治理" notes={[
          '把“需求、协同、技术”重新收束回“精细化”，和前文形成闭环。',
          '最后一句有一点提升，但没有跳出基层治理主题。',
        ]}>
          <p>基层治理没有一劳永逸的标准答案。群众需求会变，治理场景会变，技术条件也会变。真正的精细化，是始终愿意把问题看得更具体，把责任落得更清楚，把服务做得更贴近。把每一件小事做实，最终汇聚的，正是治理现代化最可靠的底色。</p>
        </CritiqueExample>

        <CritiqueExample label="结尾例 02 / 思辨式" title="传统文化的守正与创新" notes={[
          '同时回扣“守正”和“创新”，没有只赞美其中一方。',
          '用“内核—表达—生活”三个词把全文关系重新压缩一遍。',
        ]}>
          <p>守正让文化知道自己从哪里来，创新让文化知道如何走向今天。真正有生命力的传承，既不会把传统封存在旧形式中，也不会为了迎合潮流失去精神内核。让价值被理解、让表达被更新、让文化重新进入生活，传统才能在新的时代继续生长。</p>
        </CritiqueExample>

        <CritiqueExample label="结尾例 03 / 行动式" title="青年成长" notes={[
          '没有空泛号召“青年要奋斗”，而是回到判断、学习、担当三个成长关键词。',
          '最后一句把个人成长和时代联系起来，完成适度拔高。',
        ]}>
          <p>成长不会在一次选择中突然完成。它藏在每一次认真判断、每一次重新学习、每一次愿意为决定负责的过程里。青年真正需要的，不是找到一条永远不会走错的路，而是在不断认识世界的过程中形成自己的方向，并用行动把个人的坐标写进时代的进程。</p>
        </CritiqueExample>

        <div className="expression-v2-subtitle strong"><span>思辨文再说清楚一点</span><h4>A 和 B 不是各写一半，关系本身就是文章内容</h4></div>
        <Prose>
          <p>如果题目同时出现两个概念，先判断它们是什么关系：并列互补、因果、条件、一方促进另一方，还是彼此相互作用。</p>
          <p>如果 A 是做法、B 是结果，可以写“通过做到 A 的哪些方面，推动 B 的哪些变化”；如果 A、B 相互促进，就要分别讲清二者价值，再解释为什么必须协同。</p>
          <p>最常见的低水平写法，是第一段写A很重要，第二段写B很重要，最后一句“A和B都很重要”。这种文章看似平衡，实际没有讨论二者之间的关系。</p>
        </Prose>
        <div className="expression-v2-logic-diagram">
          <div><b>A → B</b><p>因果 / 路径</p><i>通过 A 的具体做法，推动 B 的结果实现</i></div>
          <div><b>A ↔ B</b><p>互补 / 相互促进</p><i>分别讲清价值，再论证为什么需要协同</i></div>
        </div>

        <div className="expression-v2-subtitle"><span>作文最后检查</span><h4>写完先别只看有没有错别字，先检查文章有没有真正“立住”</h4></div>
        <div className="expression-v2-five">
          <article><NumberStep n={1} /><div><h4>主题有没有跑偏</h4><p>全文讨论的对象是否始终和题干、来源材料保持一致。</p></div></article>
          <article><NumberStep n={2} /><div><h4>总论点是否清楚</h4><p>看完开头，能不能用一句话说出这篇文章到底主张什么。</p></div></article>
          <article><NumberStep n={3} /><div><h4>分论点是否有边界</h4><p>几个分论点有没有重复、交叉，能否共同支撑总论点。</p></div></article>
          <article><NumberStep n={4} /><div><h4>案例后有没有分析</h4><p>每个论据之后是否解释了“为什么它能证明观点”。</p></div></article>
          <article><NumberStep n={5} /><div><h4>表达有没有喧宾夺主</h4><p>名言、排比、比喻可以有，但不能为了漂亮牺牲准确和逻辑。</p></div></article>
        </div>
        <TeacherNote>作文的表达能力很重要，但表达不是把简单意思写复杂。真正好的申论语言，是把复杂问题想明白以后，写得准确、稳、清楚，还有一点自己的判断。</TeacherNote>
      </section>
    </div>
  );
}
