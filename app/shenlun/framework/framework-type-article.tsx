import type { ReactNode } from 'react';

function TeacherNote({ children }: { children: ReactNode }) {
  return <aside className="expression-v2-note type-v2-note"><span>阅 / 高老师批注</span><p>{children}</p></aside>;
}

function NumberStep({ n }: { n: number }) {
  return <span className="expression-number-step" aria-hidden="true">{String(n).padStart(2, '0')}</span>;
}

function Prose({ children }: { children: ReactNode }) {
  return <div className="expression-v2-prose">{children}</div>;
}

function TypeMap() {
  const items = [
    ['01', '归纳概括', '找全 · 压缩 · 归纳'],
    ['02', '综合分析', '解释 · 判断 · 组织关系'],
    ['03', '提出对策', '找问题 · 对症下药 · 写具体'],
    ['04', '公文写作', '看任务 · 看对象 · 完成沟通'],
    ['05', '文章写作', '立意 · 论点 · 论证 · 收束'],
  ];
  return <div className="type-v2-map">{items.map(([no, title, desc]) => <article key={no}><span>{no}</span><b>{title}</b><p>{desc}</p></article>)}</div>;
}

export function FrameworkTypeArticle() {
  return (
    <div className="expression-v2-course type-v2-course">
      <section className="expression-chapter expression-v2-section type-chapter" id="type-summary">
        <header className="expression-v2-head compact">
          <span>01 / SUMMARY</span>
          <h3>归纳概括，先把材料说清楚。</h3>
          <p>这是五大题型里最基础的一类。很多后面的题，看起来换了名字，真正落到材料处理时，依然离不开概括和归纳。</p>
        </header>

        <Prose>
          <p>我一直觉得，归纳概括不要学得太玄。题目问什么，你就围绕什么去找；材料说了什么，你就先把它说清楚。</p>
          <p><strong>先有概括，再有归纳。</strong></p>
          <p>概括，是把材料里啰嗦、口语化、故事化的内容压缩成答案；归纳，是在已经概括清楚的基础上，再往上找共同点、目的或者做法本质。</p>
          <p>所以，归纳概括真正难的地方，往往不是“有没有看见关键词”，而是三个问题：<strong>找全没有？层级合不合适？相同内容要不要合并？</strong></p>
        </Prose>

        <TypeMap />
        <TeacherNote>归纳词不是分数的全部。答案最重要的还是具体要点。不要为了写一个漂亮的大词，把真正能采分的材料细节删掉。</TeacherNote>

        <div className="expression-v2-subtitle"><span>题型本质</span><h4>先判断题目问的到底是哪一种“要素”</h4></div>
        <Prose>
          <p>归纳概括常见的问法很多：问题、原因、做法、成效、特点、变化、阶段、表现、经验……名称会变，但你先别被名称吓到。</p>
          <p>真正做题时，先回到审题五看：范围、对象、问法、要求、字数。尤其是<strong>对象和问法</strong>，它们决定你进入材料之后到底保留什么。</p>
          <p>比如同一段材料写：“某社区上线线上平台，把多个事项统一办理，群众办事时间从三天缩短到半天。”</p>
        </Prose>
        <div className="expression-v2-material-example">
          <div className="material-copy"><span>同一段材料</span><p>某社区上线线上平台，把多个事项统一办理，群众办事时间从三天缩短到半天。</p></div>
          <div className="material-answers">
            <article><span>如果问做法</span><b>上线线上平台，整合办理事项。</b></article>
            <article><span>如果问成效</span><b>缩短办事时间，提高办事效率。</b></article>
            <article><span>如果问变化</span><b>由多窗口分散办理转向线上集中办理，由耗时较长转向高效便捷。</b></article>
          </div>
        </div>

        <div className="expression-v2-subtitle strong"><span>单一型 / 复合型</span><h4>先想清楚答案最后应该长什么样</h4></div>
        <Prose>
          <p>单一要素题比较直接。题目只问问题、原因、做法或者成效，你的答案大多数时候就是同一种要素的若干并列点。</p>
          <p>复合型会把两个甚至多个任务放在一起，比如“概括问题并提出建议”“概括变化并分析原因”。这种题要先分清每一部分的字数，再决定答案是两块写，还是在同一大点里对应展开。</p>
          <p>我上课会让大家先“想象答案的长相”。不是为了套模板，而是为了在读材料之前就知道：我到底准备找几类东西，哪些内容需要分开。</p>
        </Prose>
        <div className="type-v2-answer-shape">
          <article><span>SINGLE</span><h5>单一要素</h5><p>（总括句可选）<br />1. 归纳词。具体概括内容；<br />2. 归纳词。具体概括内容；<br />3. ……</p></article>
          <article><span>COMPOSITE</span><h5>复合要素</h5><p>一、问题：……<br />二、对策：……<br /><small>先分任务，再分配字数。</small></p></article>
        </div>

        <div className="expression-v2-subtitle"><span>概括与归纳</span><h4>材料先压短，再决定要不要往上提一层</h4></div>
        <Prose>
          <p>例如材料写：开通热线、设立意见箱、开发网上留言平台。如果只是逐项抄下来，当然可能有分，但表达会比较散。</p>
          <p>你可以先概括成“通过热线、意见箱和网络平台收集群众意见”，再进一步归纳成<strong>“畅通群众反馈渠道”</strong>。</p>
          <p>但归纳不是越大越好。“加强社会治理”当然也能把这几个动作包进去，可这个词太大，和其他要点很容易重叠。</p>
          <p>判断归纳词合不合适，我建议问自己三遍：<strong>它直接回答题干了吗？它会不会大到把别的要点也吃进去？它能不能罩住下面所有具体内容？</strong></p>
        </Prose>
        <div className="expression-v2-merge"><p>热线 · 意见箱 · 网上留言</p><i>→</i><b>畅通群众反馈渠道</b></div>

        <div className="expression-v2-subtitle"><span>层级</span><h4>题目问得大，答案不能只停在很小的动作上</h4></div>
        <Prose>
          <p>你文件里有一个很重要的提醒：<strong>问得很小，也许可以写得稍大；问得很大的题，不能一直写得很小。</strong></p>
          <p>比如启示题问“文化建设有哪些经验”，如果答案一直停留在“开书屋、请专家、换宣传栏”这些动作上，就容易显得碎。你要继续往上看：这些动作的共同本质是什么？可能是“完善文化设施建设管理”“创新文化宣传方式”。</p>
          <p>但也不能只剩下一个空的大词。最稳妥的写法通常还是：<strong>中观归纳词 + 必要的具体内容。</strong></p>
        </Prose>
        <div className="expression-v2-levels">
          <article><span>宏观</span><b>加强基层治理</b><p>范围太大，常常只能做总括或分析词。</p></article>
          <article className="recommended"><span>中观 ✓</span><b>完善市场设施配置</b><p>既能回答题目，又能罩住“消防、排水、通风”等具体内容。</p></article>
          <article><span>微观</span><b>增加消防器材、增设抽水机……</b><p>可以得分，但如果每个点都这么写，很容易超字数。</p></article>
        </div>

        <div className="expression-v2-subtitle strong"><span>几个特殊问法</span><h4>效果、阶段、变化、特点，不要只盯着表面词</h4></div>
        <div className="type-v2-rule-grid">
          <article><span>效果类</span><h5>谁？做了什么？好在哪里？</h5><p>别人受益，往往比较容易判断为效果；对主体自身的变化，要看材料有没有给出真实、具体的好处，不要过度推断。</p></article>
          <article><span>阶段类</span><h5>先分时期，再提每一阶段特征</h5><p>材料如果按时间推进，就先找明显节点，再看每个阶段“发生了什么、最突出的变化是什么”。</p></article>
          <article><span>特点类</span><h5>找“和别人不一样”的地方</h5><p>不是把所有做法都抄一遍，而是提炼能够说明对象属性、优势或鲜明特征的内容。</p></article>
          <article><span>启示类</span><h5>特殊性 → 普适性</h5><p>别人的经验不能原封不动搬过来。要把案例中的具体人物、地方和动作，转成能够迁移的普遍方法。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>常见失分</span><h4>归纳概括最容易错在“找到了，但没整理好”</h4></div>
        <div className="expression-v2-five">
          <article><NumberStep n={1} /><div><h4>题目问问题，答案混进做法</h4><p>要素没分清，材料看得再认真也会答偏。</p></div></article>
          <article><NumberStep n={2} /><div><h4>同义内容重复占格</h4><p>多个案例反复说同一件事，要考虑合并，不要把相同本质拆成三个采分点。</p></div></article>
          <article><NumberStep n={3} /><div><h4>归纳词太大</h4><p>“加强管理、促进发展、提高水平”看起来规范，但如果什么都能装进去，就没有区分度。</p></div></article>
          <article><NumberStep n={4} /><div><h4>只写归纳词，没有具体内容</h4><p>归纳词负责条理，具体概括内容才承担大量信息。两者不要颠倒。</p></div></article>
          <article><NumberStep n={5} /><div><h4>勾得太多，最后写不下</h4><p>第三遍总结时要结合字数“肉眼补行”，决定哪些内容需要再压缩、哪些细节可以舍掉。</p></div></article>
        </div>
        <TeacherNote>如果平均一个点连一行都不到，可以不强求每一点都写归纳词。先把真正有分的信息装进去。</TeacherNote>
      </section>

      <section className="expression-chapter expression-v2-section type-chapter" id="type-analysis">
        <header className="expression-v2-head compact">
          <span>02 / ANALYSIS</span>
          <h3>综合分析，关键是把关系看出来。</h3>
          <p>综合分析不是“把材料多概括一点”。它要求你先理解题目中的对象，再把材料里的原因、影响、表现、矛盾和结论重新组织。</p>
        </header>
        <Prose>
          <p>我上课经常说：<strong>分析是拆开看，综合是合起来看。</strong></p>
          <p>你先把材料里的不同部分看明白，再判断这些内容之间是什么关系，最后按照题目需要重新组合。这个过程，才是“综合分析”。</p>
          <p>所以综合分析最怕两件事：第一，只把材料分条抄下来，没有解释关系；第二，为了套“是什么—为什么—怎么办”，硬把不需要的东西塞进去。</p>
        </Prose>

        <div className="expression-v2-subtitle strong"><span>四类常见题</span><h4>现象分析、理解分析、原因分析、对比分析</h4></div>
        <div className="type-v2-analysis-grid">
          <article><span>01</span><h5>现象分析</h5><b>是什么 → 为什么 → 怎么办</b><p>核心是对一个现象、观点或变化作出判断。先把现象说清，再分析合理性、问题、影响或原因，最后根据材料决定是否提出对策。</p></article>
          <article><span>02</span><h5>理解分析</h5><b>内涵 → 外延 → 总结</b><p>先解释一句话或一个概念到底是什么意思，再看它在材料里体现在哪些行为、做法或作用上，最后必要时收束观点。</p></article>
          <article><span>03</span><h5>原因分析</h5><b>先判断“什么的原因”</b><p>简单题很像归纳概括；难题会把原因藏在争议、责任、机制、环境、认知等不同层面，需要你先理解再归纳。</p></article>
          <article><span>04</span><h5>对比分析</h5><b>相同点 + 不同点</b><p>本质上是把两个案例、两种做法或两类现象放在一起，比较目的、做法、效果、本质等维度。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>现象分析</span><h4>先表态，但观点一定要从材料里长出来</h4></div>
        <Prose>
          <p>题目如果要求“谈谈看法、评价、评析”，通常意味着你不能只做信息摘抄。你得先说：这个现象到底怎么看。</p>
          <p>观点可以是“值得肯定”“存在问题”“有合理之处但也有不足”“应当辩证看待”。但不要为了显得辩证，强行凑一正一反。</p>
          <p>材料如果全部在讲好处，你就没有必要自己编一个坏处；材料如果已经暴露明显问题，也不要为了保持“中立”把态度写得含糊。</p>
        </Prose>
        <div className="type-v2-case">
          <span>例：一种新技术进入基层治理</span>
          <p><b>第一步：</b>先判断它总体上产生了什么作用。</p>
          <p><b>第二步：</b>把材料里的便利、公平、效率等积极影响，与可能出现的差距、依赖等问题分开。</p>
          <p><b>第三步：</b>材料如果给出解决条件，再补“线上线下结合、完善管理”等内容。</p>
        </div>

        <div className="expression-v2-subtitle"><span>理解分析</span><h4>抽象句先翻译成具体话，再找它在材料里的“表现形式”</h4></div>
        <Prose>
          <p>理解分析最常见的难点，是题目给一句比较抽象的话，甚至有双引号、比喻或者两个明显部分。</p>
          <p>第一步一定是解释。比如“撤销眼中的柜台”和“撤销心中的柜台”，前者说的是前台设置形式，后者说的是服务理念。两个概念虽然放在一句话里，层级和含义并不一样。</p>
          <p>解释清楚以后，再回材料找：它们分别体现在哪些具体行为、意义、问题和做法上。你的文件里把这种内容叫<strong>“表现形式”</strong>，这个词很好用——抽象概念最终要落到外在行为上，才能真正说清楚。</p>
        </Prose>
        <div className="expression-v2-logic-diagram">
          <div><b>眼中的柜台</b><p>形式变化</p><i>→ 无柜台、肩并肩、方便沟通</i></div>
          <div><b>心中的柜台</b><p>理念变化</p><i>→ 服务意识、体制协同、便民改革</i></div>
        </div>
        <TeacherNote>所有明显的异化词、比喻词，都要先判断材料是不是默认你已经理解。如果不解释，后面分析再多，也可能失去起点。</TeacherNote>

        <div className="expression-v2-subtitle"><span>原因分析</span><h4>别看见“因为”才叫原因，先弄清楚题目问的是什么东西的原因</h4></div>
        <Prose>
          <p>简单的原因分析，可能材料直接把原因一条条告诉你；难一点的，原因会分散在不同主体、不同环节里。</p>
          <p>比如一个执法争议为什么引发热议，材料里可能同时涉及：认定是否合理、主管部门有没有尽责、处罚金额是否适当、所有权认知是否一致、问题处理是否及时。</p>
          <p>这些内容表面上不是统一句式，但它们都在回答同一个问题：<strong>为什么群众会觉得这件事有争议。</strong></p>
          <p>所以原因分析不要机械找因果词，要先确定“什么的原因”，再按主体、环节或性质归并。</p>
        </Prose>

        <div className="expression-v2-subtitle"><span>对比分析</span><h4>先定比较维度，再写相同与不同</h4></div>
        <Prose>
          <p>对比分析最怕“这个案例写一段，那个案例再写一段”，最后读者还得自己比较。</p>
          <p>你可以先找共同本质，再按照同一维度比较差异。比如两种“绣花功夫”，共同点都属于基层治理方式；不同点可以比较目的、做法和效果。</p>
        </Prose>
        <div className="type-v2-matrix">
          <div className="head">比较维度</div><div className="head">A：精细创新</div><div className="head">B：应付检查</div>
          <div>目的</div><div>解决基层工作细、碎、难</div><div>展示政绩、应付检查</div>
          <div>做法</div><div>信息化、透明化、服务化</div><div>形式主义、弄虚作假</div>
          <div>效果</div><div>提效、节约、改善治理</div><div>耗费资源、群众失望</div>
        </div>

        <div className="expression-v2-subtitle strong"><span>答案逻辑</span><h4>“是什么—为什么—怎么办”是工具，不是万能模板</h4></div>
        <Prose>
          <p>现象分析经常适合“是什么—为什么—怎么办”；理解分析更像“内涵—外延—总结”；对比分析可能就是“相同—不同—结论”。</p>
          <p>真正决定结构的，是题目任务和材料逻辑。</p>
          <p>有些答案会出现<strong>递进中带并列</strong>：整体按“解释—分析—对策”往下走，每一部分内部再分几个并列点；也会出现<strong>并列中带递进</strong>：先分两个并列概念，每个概念内部再继续解释和展开。</p>
        </Prose>
        <TeacherNote>先把材料分部分，再决定结构。不要拿着一个结构去逼材料配合你。</TeacherNote>
      </section>

      <section className="expression-chapter expression-v2-section type-chapter" id="type-solution">
        <header className="expression-v2-head compact">
          <span>03 / SOLUTION</span>
          <h3>提出对策，先把问题和办法对上。</h3>
          <p>对策题不是“多写几个动词”。真正有分的对策，要有对象、有针对性、能落地，而且最好能从材料里找到依据。</p>
        </header>
        <Prose>
          <p>做对策题，我建议先别急着写“加强、完善、提高”。先把材料里的问题列清楚。</p>
          <p><strong>有多少类问题，通常就要思考对应多少类解决方向。</strong></p>
          <p>如果题目是两问——先概括问题，再提出对策——还要提前分配字数。你的课堂笔记里给出的经验是大致按 <strong>3:7 到 4:6</strong> 分配，具体看材料里问题和对策的信息量。</p>
        </Prose>

        <div className="expression-v2-subtitle"><span>三条标准</span><h4>针对性、可行性、可操作性，分别解决三个不同问题</h4></div>
        <div className="expression-v2-three">
          <article><NumberStep n={1} /><div><h5>针对性</h5><p>这条措施到底在解决题目中的哪个问题？如果问题是“反馈渠道不畅”，你写“加强人才建设”，方向就已经偏了。</p></div></article>
          <article><NumberStep n={2} /><div><h5>可行性</h5><p>谁有权做？要不要考虑成本、法律、身份和现实条件？个人不能随便写行政处罚，基层单位也不能写超出权限的大政策。</p></div></article>
          <article><NumberStep n={3} /><div><h5>可操作性</h5><p>不能只停在“加强宣传”。要继续说明谁来宣传、向谁宣传、通过什么渠道、宣传什么内容，必要时再补反馈和监督。</p></div></article>
        </div>

        <div className="expression-v2-subtitle strong"><span>对策从哪来</span><h4>能从材料里找到的，先用材料；材料没有，再做有依据的反推</h4></div>
        <div className="type-v2-source-flow">
          <article><span>01</span><b>材料直接给做法</b><p>成功经验、已有措施、政策要求，优先直接转化。</p></article>
          <article><span>02</span><b>从问题反推</b><p>“渠道少”→拓宽渠道；“设施不足”→补齐设施；“管理混乱”→完善管理。</p></article>
          <article><span>03</span><b>从原因反推</b><p>如果根源在制度、人才、技术或协调机制，对策就要对应这个根源。</p></article>
          <article><span>04</span><b>必要时补全动作</b><p>材料只有方向没有细节时，可以在不脱离常识和身份的前提下，把动作补完整。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>两种写法</span><h4>一问和两问，答案形态不一样</h4></div>
        <div className="type-v2-answer-shape">
          <article><span>ONE TASK</span><h5>只问对策</h5><p>1. 完善……。通过……；<br />2. 加强……。针对……；<br />3. 建立……。明确……。</p></article>
          <article><span>TWO TASKS</span><h5>问题 + 对策</h5><p>一、问题：……<br />二、对策：……<br /><small>问题可以简写，对策通常更需要展开。</small></p></article>
        </div>
        <Prose>
          <p>你的笔记里有个很实用的判断：<strong>问题可以不归纳，对策尽量归纳。</strong>因为对策往往字数更多，如果一条条动作没有上位概念，答案很容易显得散。</p>
          <p>但也要看格子。如果平均一个对策只有很少空间，优先保留真正能解决问题的动作，不要为了写归纳词浪费字数。</p>
        </Prose>

        <div className="expression-v2-subtitle"><span>写具体</span><h4>“加强宣传”只是方向，后面那半句才决定它能不能落地</h4></div>
        <div className="expression-v2-merge"><p>加强宣传</p><i>→</i><b>面向经营户开展规范经营宣传，通过社区公告、线上平台和入户讲解说明规则与违规后果。</b></div>
        <TeacherNote>材料内容能用尽量用。对策题最不划算的失分，就是材料明明给了现成办法，自己却另写一套空泛方案。</TeacherNote>

        <div className="expression-v2-subtitle strong"><span>启示题</span><h4>把别人的特殊做法，转成自己也能用的普适经验</h4></div>
        <Prose>
          <p>启示题常常披着“概括经验”的外衣，实质上既需要概括，也需要对策思维。</p>
          <p>案例可能写“某村利用老祠堂开办村民大讲堂”，你不能原封不动写“利用老祠堂”。换一个地方可能根本没有祠堂。</p>
          <p>你要继续问：它的本质是什么？可能是<strong>盘活闲置资源，建设公共文化空间</strong>。这就从特殊性走到了普适性。</p>
        </Prose>
        <div className="type-v2-mini-flow"><span>老祠堂开讲堂</span><i>→</i><span>盘活闲置资源</span><i>→</i><b>完善公共文化空间建设</b></div>

        <div className="expression-v2-subtitle"><span>常见失分</span><h4>对策题最怕“看起来都对，但没有一条真正解决问题”</h4></div>
        <div className="type-v2-rule-grid">
          <article><span>问题和对策对不上</span><p>先做问题清单，再逐条检查每个问题有没有对应解决。</p></article>
          <article><span>主体乱写</span><p>政府、企业、社区、群众各自能做什么，要和身份、权限匹配。</p></article>
          <article><span>只写目标</span><p>“提高意识、提升水平、改善环境”很多时候是结果，不是具体动作。</p></article>
          <article><span>自编太多</span><p>脱离材料写常识，容易大而空。能从材料转化的内容永远优先。</p></article>
        </div>
      </section>

      <section className="expression-chapter expression-v2-section type-chapter" id="type-implementation">
        <header className="expression-v2-head compact">
          <span>04 / IMPLEMENTATION</span>
          <h3>公文写作，先把“我要完成什么事”想清楚。</h3>
          <p>格式当然要会，但公文真正拉开差距的，还是任务、对象、身份和内容组织。格式写得再漂亮，任务没完成，照样得不了高分。</p>
        </header>
        <Prose>
          <p>我更愿意把这类题理解成<strong>情境中的沟通任务</strong>。</p>
          <p>你是谁？写给谁？为什么写？希望对方知道什么、理解什么、做什么？这些问题先想清楚，再决定标题、称谓、开头、中间和结尾。</p>
          <p>你文件里把公文分成四类：<strong>常规类、提纲类、文章类、方案类。</strong>这四类不是为了增加记忆负担，而是提醒你：不同任务的“中间部分”到底应该写什么。</p>
        </Prose>

        <div className="expression-v2-subtitle strong"><span>四类任务</span><h4>先判断本质，再考虑格式</h4></div>
        <div className="type-v2-analysis-grid">
          <article><span>01</span><h5>常规类</h5><b>讲话、倡议、感谢、通知等</b><p>开头交代背景、身份和目的；中间完成具体沟通任务；结尾总结、号召、感谢或提出期待。</p></article>
          <article><span>02</span><h5>提纲类</h5><b>内容优先，格式从简</b><p>核心是把汇报、介绍、发言的内容整理清楚。标题、称谓等形式通常按题目要求灵活处理。</p></article>
          <article><span>03</span><h5>文章类</h5><b>观点前置，重完整表达</b><p>常见于短评、宣传稿、材料性文章。重点可能是发展历程、利弊、多个方面的内容，通常需要比较完整的观点和表达。</p></article>
          <article><span>04</span><h5>方案类</h5><b>把流程和参与方式说清楚</b><p>谁来做、对谁做、什么时候做、怎么参与、有什么要求、后续怎么安排，都要交代得能执行。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>开头</span><h4>开头不是万能套话，而是回答“我为什么要写这篇东西”</h4></div>
        <Prose>
          <p>开头常用的信息包括：背景、对象解释、意义、问题、目的。到底用哪几个，看任务。</p>
          <p>比如做经验交流，开头可以交代为什么开展这项工作、原来面临什么困难；写感谢信，就要直接说明感谢对象和原因；做倡议，开头要让读者知道为什么现在需要行动。</p>
          <p>问题类内容放在开头时，不要过度微观。你只有几行开头，就没有必要把所有细节塞进去。</p>
        </Prose>

        <div className="expression-v2-subtitle"><span>中间</span><h4>大多数公文的主体，仍然是在做归纳概括</h4></div>
        <Prose>
          <p>你材料里总结得很直接：中间部分常见的任务无非是<strong>我们有什么、做了什么；未来准备怎么处理；希望你们去做什么。</strong></p>
          <p>所以公文写作并没有脱离前面的基础能力。很多时候只是把归纳概括放进了一个身份和场景里。</p>
          <p>区别在于：你不仅要“找全”，还要考虑读者是谁、语气是否合适、信息先后顺序是否符合真实沟通。</p>
        </Prose>
        <div className="type-v2-public-flow">
          <article><span>身份</span><b>我是谁</b></article><i>→</i>
          <article><span>对象</span><b>写给谁</b></article><i>→</i>
          <article><span>目的</span><b>为什么写</b></article><i>→</i>
          <article><span>任务</span><b>希望对方知道 / 做什么</b></article>
        </div>

        <div className="expression-v2-subtitle"><span>结尾</span><h4>1—3 行解决，别把结尾写成第二篇文章</h4></div>
        <Prose>
          <p>结尾常见的功能是：总结、呼吁、提出后续安排、表达感谢或期待。</p>
          <p>有些文种甚至不需要很重的结尾。判断标准还是同一个：<strong>这个任务在现实中怎么自然结束。</strong></p>
        </Prose>
        <div className="type-v2-answer-shape">
          <article><span>OPENING</span><h5>开头</h5><p>背景 / 问题 / 意义 / 目的</p></article>
          <article><span>BODY</span><h5>主体</h5><p>做法 / 情况 / 经验 / 流程 / 要求</p></article>
          <article><span>ENDING</span><h5>结尾</h5><p>总结 / 呼吁 / 安排 / 感谢</p></article>
        </div>

        <div className="expression-v2-subtitle strong"><span>看两个例子</span><h4>同样是材料，任务一换，写法就会跟着换</h4></div>
        <div className="type-v2-case-stack">
          <article><span>经验交流讲话稿</span><p>开头交代产业原有问题和为什么要引入信息化；主体按“信息管理、人员配置、污染治理、安全追溯”等经验展开；结尾再表达交流合作的期待。</p></article>
          <article><span>感谢信</span><p>开头直接说明身份和感谢原因；主体写医生具体帮助、专业回应、无私奉献等事实；结尾表达感谢和祝愿。材料没变成“公文素材库”，而是围绕沟通目的重新取舍。</p></article>
        </div>
        <TeacherNote>公文不是格式考试。先完成任务，再让格式服务任务。尤其别为了“像公文”加太多空话，把真正有分的材料内容挤没了。</TeacherNote>
      </section>

      <section className="expression-chapter expression-v2-section type-chapter" id="type-essay">
        <header className="expression-v2-head compact">
          <span>05 / ESSAY</span>
          <h3>文章写作，先把观点想清楚，再谈文采。</h3>
          <p>作文当然需要表达，但真正决定文章能不能站住的，还是立意、论点、逻辑和论证。语言是放大器，不是地基。</p>
        </header>
        <Prose>
          <p>你的课堂体系里把作文拆得很清楚：先找到<strong>主题、总论点、分论点</strong>，再判断表达逻辑，最后才是写作手法和积累。</p>
          <p>我也更建议这么学。刚开始不要追求每一句都“高级”。先让整篇文章知道自己在说什么。</p>
          <p><strong>立意不是一个漂亮标题，而是你围绕题目最终要证明的核心判断。</strong></p>
        </Prose>

        <div className="expression-v2-subtitle strong"><span>龙头 · 猪肚 · 豹尾</span><h4>开头要点题，中间要丰满，结尾要收得住</h4></div>
        <div className="type-v2-essay-body">
          <article><span>龙头</span><h5>引论</h5><p>适当高端，但最重要是把主题概念说清楚，完成引题、解释和总论点。漂亮不是目的，画龙点睛才是。</p></article>
          <article><span>猪肚</span><h5>正论</h5><p>分论点要有条理、内容丰富、论证完整。每一段都要真正支撑总论点，而不是换三个近义词重复一件事。</p></article>
          <article><span>豹尾</span><h5>结论</h5><p>短促有力，回扣主题，适度拔高。别在最后突然重新开一个新观点，也不要啰嗦重复前文。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>先找观点</span><h4>主题 → 总论点 → 分论点，一层一层往下拆</h4></div>
        <Prose>
          <p>找分论点时，你的笔记给了三个很实用的来源：<strong>题干或来源材料直接给出的并列概念；材料不同部分对主题的不同说明；小题和未用材料里能够支撑主题的做法、意义或关系。</strong></p>
          <p>题目如果已经给了两个明显并列概念，不要急着另起炉灶，先深究它们的内涵和关系。</p>
          <p>如果材料分成几个明显部分，就像做归纳概括一样问：每个部分对主题来说，究竟说的是哪个方面？这些方面有没有可能成为分论点？</p>
        </Prose>
        <div className="type-v2-mini-flow"><span>题干 / 来源材料</span><i>→</i><span>材料分部</span><i>→</i><span>小题 / 未用材料</span><i>→</i><b>分论点</b></div>

        <div className="expression-v2-subtitle"><span>四种常见文章思路</span><h4>不是死记类型，而是帮助你判断“正文主要证明什么”</h4></div>
        <div className="type-v2-analysis-grid essay-grid">
          <article><span>01</span><h5>策论文</h5><b>重点回答“怎么做到”</b><p>引论解释主题并提出观点；正论围绕实现主题的做法展开，同时说明为什么这些做法重要、具体怎么做。</p></article>
          <article><span>02</span><h5>政论文</h5><b>重点回答“为什么重要”</b><p>正论主要解释主题在不同方面的意义、价值和作用，把抽象概念具体化、讲透。</p></article>
          <article><span>03</span><h5>综合文</h5><b>意义与做法共同展开</b><p>当材料既强调价值又强调路径，或者多个分论点本身就是不同性质的内容，可以形成更综合的论证。</p></article>
          <article><span>04</span><h5>思辨文</h5><b>处理 A 与 B 的关系</b><p>比如“既要A也要B”“A促进B”“A与B相互作用”。不能各写一半就结束，要把二者的关系讲出来。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>思辨关系</span><h4>A 和 B 不只是并列摆放，关系本身就是文章要论证的内容</h4></div>
        <Prose>
          <p>如果题目讨论两个概念，先判断它们是什么关系：并列互补、因果、条件，还是一方促进另一方。</p>
          <p>比如 A 是做法、B 是结果，你的分论点就可以围绕“通过做到 A 的哪些方面，促进实现 B 的哪些变化”来展开。</p>
          <p>如果 A 和 B 彼此促进，就要分别说明各自为什么重要、如何作用于对方，最后回到共同发展的整体判断。</p>
        </Prose>
        <div className="expression-v2-logic-diagram">
          <div><b>A → B</b><p>因果 / 路径关系</p><i>通过 A 的具体做法，推动 B 的结果实现</i></div>
          <div><b>A ↔ B</b><p>互补 / 相互促进</p><i>分别讲清二者价值，再论证为什么需要协同</i></div>
        </div>

        <div className="expression-v2-subtitle strong"><span>一段怎么论证</span><h4>观点—解释—论据—分析—回扣，重点永远在“分析”</h4></div>
        <Prose>
          <p>案例不是放进去就自动产生说服力。你写完一个人物、一个政策、一个地方经验以后，还要回答：<strong>这个例子为什么能证明我的分论点？它好在哪里？背后的机制是什么？</strong></p>
          <p>这也是你材料里反复强调的“多问几个为什么”。真正的思考见解，往往就来自这些追问。</p>
        </Prose>
        <div className="expression-v2-flow">
          <article><span>01</span><p><strong>观点：</strong>这一段到底要证明什么。</p></article>
          <article><span>02</span><p><strong>解释：</strong>把抽象概念说具体。</p></article>
          <article><span>03</span><p><strong>论据：</strong>材料、案例、名言或现实事实。</p></article>
          <article><span>04</span><p><strong>分析：</strong>解释论据为什么能支撑观点。</p></article>
          <article><span>05</span><p><strong>回扣：</strong>收回到分论点和全文主题。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>表达与积累</span><h4>积累是为了让你说得更准确，不是为了把文章装饰得更满</h4></div>
        <Prose>
          <p>名言、案例、比喻词、对仗句、规范用词都可以积累，但它们必须服务观点。</p>
          <p>你的材料里把写作手法总结成“正式的申论表述 + 适当积累”，这个尺度很好。文章可以有文采，但不要让文采盖住判断。</p>
          <p>真正成熟的作文，是读起来有思想、有逻辑，也能看出你对材料和现实问题的理解，而不是一眼就能看出背了哪套模板。</p>
        </Prose>
        <TeacherNote>作文最后还是要回到四件事：观点找到了没有？逻辑顺不顺？论证够不够？表达能不能把前面三件事说清楚。</TeacherNote>
      </section>
    </div>
  );
}
