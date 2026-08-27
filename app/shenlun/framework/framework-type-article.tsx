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
    ['01', '归纳概括', '明确要素 · 找全 · 压缩 · 归纳'],
    ['02', '综合分析', '理解任务 · 判断要素 · 组织关系'],
    ['03', '提出对策', '找准问题 · 对症下药 · 写具体'],
    ['04', '公文写作', '识别情境 · 判断内容 · 完成沟通'],
    ['05', '文章写作', '明确主题 · 搭建论点 · 完成论证'],
  ];
  return <div className="type-v2-map">{items.map(([no, title, desc]) => <article key={no}><span>{no}</span><b>{title}</b><p>{desc}</p></article>)}</div>;
}

export function FrameworkTypeArticle() {
  return (
    <div className="expression-v2-course type-v2-course">
      <section className="expression-chapter expression-v2-section type-chapter" id="type-summary">
        <header className="expression-v2-head compact">
          <span>01 / SUMMARY</span>
          <h3>归纳概括，先学会回答题目真正问的东西。</h3>
          <p>五大题型看起来各有名字，真正开始做题时，第一步却很朴素：题目有没有把“我要找什么”说清楚？</p>
        </header>

        <Prose>
          <p>很多同学刚开始学题型，会急着记“这是什么题、套什么结构”。我更希望你先养成另一个习惯：<strong>先看任务，再看题型。</strong></p>
          <p>因为题型只是帮助我们认识题目的外壳，真正决定你怎么读材料、怎么组织答案的，是题目要求你寻找和处理什么信息。</p>
          <p>有些题说得非常直接：概括问题、分析原因、总结成效、提出对策。你一看就知道该去材料里找哪一种要素。</p>
          <p>也有些题不会直接告诉你：“请找原因、影响、做法”。它可能只问“谈谈你的看法”“谈谈对这句话的理解”，或者让你写一篇讲话稿、经验介绍、短评。这个时候，真正的难点不是找某一个已经写在题干里的要素，而是<strong>先判断这项任务到底需要哪些要素，应该按什么关系组织起来。</strong></p>
        </Prose>

        <div className="expression-v2-subtitle strong"><span>先分清一个概念</span><h4>单一要素与复合要素，区别不在“问了几个问题”</h4></div>
        <div className="type-v2-answer-shape">
          <article><span>SINGLE ELEMENT</span><h5>单一要素</h5><p>题干已经明确告诉你要找什么。<br /><br />问题、原因、做法、成效、特点、变化、经验等，都属于常见的明确要素。</p></article>
          <article><span>COMPOSITE ELEMENT</span><h5>复合要素</h5><p>题干没有直接告诉你要找哪几类要素。<br /><br />需要先理解任务，再判断要写内涵、表现、原因、影响、问题、对策等哪些内容。</p></article>
        </div>
        <Prose>
          <p>这里有一个很容易混淆的地方：<strong>“一次问两个东西”不等于复合要素。</strong></p>
          <p>比如“概括存在的问题并提出解决建议”，虽然有两个任务，但“问题”和“建议”都已经写得明明白白。它更像一个两问或多任务题，每一部分要找的要素仍然是明确的。</p>
          <p>真正的复合要素，往往是题目只给了一个任务外壳。比如“谈谈你对某句话的理解”，题干没有告诉你答案里一定要写哪几类内容，你要结合这句话本身和材料逻辑，判断需要解释什么、分析什么、是否需要总结或提出做法。</p>
          <p>公文写作也是类似道理。题目让你写“经验交流讲话稿”，并不会逐项告诉你“先找问题、再找做法、再找成效”。你要根据身份、对象和写作目的判断：哪些内容必须出现，哪些材料可以舍掉。</p>
        </Prose>
        <TeacherNote>先别急着背“是什么—为什么—怎么办”。先判断题目有没有把要素说清楚。结构是后一步，理解任务才是第一步。</TeacherNote>

        <TypeMap />

        <div className="expression-v2-subtitle"><span>题型一</span><h4>归纳概括：题目问什么要素，就把这个要素找全、说清楚</h4></div>
        <Prose>
          <p>归纳概括是最适合建立这种意识的题型。</p>
          <p>它的核心并不神秘：<strong>题目问什么，就围绕什么找；材料说了什么，就先把它准确压缩出来。</strong></p>
          <p>所以归纳概括首先是一道“明确要素题”。题目问问题，你就找问题；问原因，就找原因；问成效，就找成效。不要因为材料里某句话很重要，就什么都往答案里塞。</p>
          <p>当然，找出来只是第一步。真正拉开差距的，是你能不能把材料从“原话”变成“答案”。</p>
        </Prose>

        <div className="expression-v2-subtitle"><span>概括与归纳</span><h4>先有概括，再有归纳；先把话压短，再把关系提出来</h4></div>
        <Prose>
          <p>我更愿意把这两个词分开理解。</p>
          <p><strong>概括</strong>，是把材料中啰嗦、口语化、故事化的内容，压缩成能够直接进入答案的信息。它解决的是“这段话到底在说什么”。</p>
          <p><strong>归纳</strong>，是在概括清楚之后，再往上找共同点、共同目的、共同做法类型或者更合适的上位表达。它解决的是“这些内容为什么可以放在一起”。</p>
          <p>比如材料写：开通热线、设置意见箱、开发网上留言平台。先概括，可以写成“通过热线、意见箱和网络平台收集群众意见”；再归纳，可以提成<strong>“畅通群众反馈渠道”</strong>。</p>
          <p>但千万别误会：归纳词不是越大越好。写成“加强社会治理”当然也能把这些内容装进去，可它太大了，大到几乎什么都能装，反而失去了区分度。</p>
        </Prose>
        <div className="expression-v2-merge"><p>热线 · 意见箱 · 网上留言</p><i>→</i><b>畅通群众反馈渠道</b></div>
        <TeacherNote>判断一个归纳词合不合适，可以问三遍：它直接回答题干了吗？它会不会大到把别的要点也吞进去？它能不能罩住下面所有具体内容？</TeacherNote>

        <div className="expression-v2-subtitle strong"><span>归纳概括常见小分类</span><h4>名字很多，关键还是弄清每种问法究竟要你找什么</h4></div>
        <div className="type-v2-rule-grid">
          <article><span>问题 / 不足</span><h5>找“哪里不对、哪里不够”</h5><p>可以是制度缺失、设施不足、管理混乱，也可以是思想、行为、结果上的负面状态。不要把“导致问题的原因”混进来，除非材料本身把二者写在同一句里且难以拆开。</p></article>
          <article><span>原因</span><h5>找“为什么会这样”</h5><p>原因可能来自主体、制度、环境、资源、认知、机制等不同层面。不要只找“因为、由于”，要看这句话是否在解释现象为什么出现。</p></article>
          <article><span>做法 / 措施</span><h5>找“做了什么”</h5><p>重点保留动作、对象和方式。多个具体动作可以进一步归纳成宣传、监管、服务、人才、技术、设施、制度等中观做法。</p></article>
          <article><span>成效 / 作用</span><h5>找“好在哪里、改变了什么”</h5><p>判断时要问：谁受益？哪方面发生变化？对别人带来的积极变化往往更容易确认；对主体自身的效果不要过度推断。</p></article>
          <article><span>特点 / 特征</span><h5>找“这个对象有什么鲜明属性”</h5><p>特点不等于把所有做法重抄一遍。要从材料中提炼对象的突出属性、方式、优势或与其他对象不同的地方。</p></article>
          <article><span>变化 / 阶段</span><h5>找“前后有什么不同”</h5><p>变化题注意前后对照；阶段题先按时间、发展节点或材料分部划阶段，再概括每一阶段最突出的状态和特征。</p></article>
          <article><span>经验 / 启示</span><h5>把具体案例转成可迁移的方法</h5><p>启示题问得通常比较大，不能一直停留在很小的动作上。要把人物、地点和特殊做法适度抽象，提炼成别人也能借鉴的普遍方法。</p></article>
          <article><span>表现形式</span><h5>找抽象概念“具体体现在哪里”</h5><p>题目问一种精神、理念、思想、观念或作用时，材料有时不会直接下定义，而是通过一组行为、做法和现象来体现。此时要把这些外在表现组织出来。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>同一材料，不同问法</span><h4>材料没有变，题目一变，答案就会变</h4></div>
        <div className="expression-v2-material-example">
          <div className="material-copy"><span>同一段材料</span><p>某社区上线线上平台，把多个事项统一办理，群众办事时间从三天缩短到半天。</p></div>
          <div className="material-answers">
            <article><span>问做法</span><b>上线线上平台，整合办理事项。</b></article>
            <article><span>问成效</span><b>缩短办事时间，提高办事效率。</b></article>
            <article><span>问变化</span><b>由分散办理转向集中办理，由耗时较长转向高效便捷。</b></article>
          </div>
        </div>

        <div className="expression-v2-subtitle"><span>答案的“度”</span><h4>问得大，不能只写得很小；写得太大，也会失去采分信息</h4></div>
        <Prose>
          <p>归纳概括真正难的地方，常常不是“有没有看到”，而是“写到什么层级”。</p>
          <p>比如题目问“文化建设有哪些经验”，如果答案一直停在“开书屋、请专家、换宣传栏”这些微观动作上，就会显得碎。你还要继续问：这些动作共同在做什么？可能可以提成“完善文化设施建设管理”“创新文化宣传方式”。</p>
          <p>但如果一上来就写“加强文化建设”，又太大了，几乎没有提供有效信息。</p>
          <p>所以更稳妥的答案，往往落在一个<strong>具体的中观概念</strong>上，再保留必要细节。</p>
        </Prose>
        <div className="expression-v2-levels">
          <article><span>宏观</span><b>加强基层治理</b><p>范围太大，适合做总括，不适合承担具体采分。</p></article>
          <article className="recommended"><span>中观 ✓</span><b>完善市场设施配置</b><p>能覆盖消防、排水、通风等具体内容，又不会把别的要点一起吞掉。</p></article>
          <article><span>微观</span><b>增设消防器材、抽水机……</b><p>信息具体，但全部停在这里容易碎、容易超字数。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>最后再看注意事项</span><h4>归纳概括最常见的失分，不在“不会”，而在“没整理好”</h4></div>
        <div className="expression-v2-five">
          <article><NumberStep n={1} /><div><h4>对象跑偏</h4><p>题目问某项工作的“问题”，不要把其他主体的问题、背景和对策一起塞进答案。</p></div></article>
          <article><NumberStep n={2} /><div><h4>要素混写</h4><p>问题、原因、做法、效果在材料里常常挨得很近，必须先判断这句话对题目对象来说究竟是什么。</p></div></article>
          <article><NumberStep n={3} /><div><h4>同义内容重复</h4><p>多个案例反复说同一件事，要考虑同义合并，否则字数浪费，答案层级也会乱。</p></div></article>
          <article><NumberStep n={4} /><div><h4>只写大词</h4><p>归纳词负责条理，真正承载大量信息的是下面的具体概括内容。不要让“规范表达”挤掉采分点。</p></div></article>
          <article><NumberStep n={5} /><div><h4>没有字数意识</h4><p>第三遍总结时要大致估行数，提前决定哪些内容需要压缩、哪些细节必须保留。</p></div></article>
        </div>
      </section>

      <section className="expression-chapter expression-v2-section type-chapter" id="type-analysis">
        <header className="expression-v2-head compact">
          <span>02 / ANALYSIS</span>
          <h3>综合分析，不是多写一点，而是先把题目真正要你分析什么弄明白。</h3>
          <p>综合分析之所以容易让人乱，是因为它经常不是“给你一个明确要素，然后去找”。很多时候，你要先理解任务，再决定答案里需要哪些部分。</p>
        </header>

        <Prose>
          <p>有人一看到综合分析，就先背“是什么—为什么—怎么办”。这条路径有时候能用，但如果把它当成固定模板，很快就会出问题。</p>
          <p>原因很简单：不同综合分析题，真正要求你处理的关系并不一样。</p>
          <p>有的题让你评价一个现象；有的让你理解一句话；有的明确问原因；有的让你比较两个对象。它们都叫“分析”，但答案的任务完全不同。</p>
          <p>所以我更建议把综合分析理解成两个动作：<strong>分析，是把材料拆开看清各部分含义；综合，是把这些内容按题目要求重新组织成一个有关系的答案。</strong></p>
        </Prose>

        <div className="expression-v2-subtitle strong"><span>先分四类常见任务</span><h4>现象分析、理解分析、原因分析、对比分析</h4></div>
        <div className="type-v2-analysis-grid">
          <article><span>01</span><h5>现象分析</h5><b>先判断，再分析</b><p>常见问法是“谈谈看法、评价、评析”。题干没有直接告诉你找哪一种要素，需要结合材料判断观点、利弊、原因、问题、对策等哪些内容应该进入答案。</p></article>
          <article><span>02</span><h5>理解分析</h5><b>先解释，再展开</b><p>常见问法是“谈谈对一句话、一个概念的理解”。先把抽象表达翻译清楚，再判断材料通过哪些表现、意义、问题、做法等内容来说明它。</p></article>
          <article><span>03</span><h5>原因分析</h5><b>明确问原因时，要素其实很清楚</b><p>虽然常被放在综合分析里讲，但如果题干直接问“为什么”，要找的就是原因。难点主要在理解和归纳，不在于判断要素。</p></article>
          <article><span>04</span><h5>对比分析</h5><b>先找共同维度，再比较</b><p>两个案例、两种做法、两个概念放在一起，先判断共同本质，再比较目的、做法、效果、性质等相同与不同。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>现象分析</span><h4>“谈看法”不是让你自由发挥，而是让你根据材料形成判断</h4></div>
        <Prose>
          <p>现象分析最像一道真正的复合要素题。</p>
          <p>题目只问“怎么看”，没有明说答案一定要写哪些东西。这个时候，你要先看材料对这个现象提供了什么信息。</p>
          <p>材料如果既讲合理性又讲问题，观点就可以是“有合理之处，但也存在不足，应当辩证看待”；材料如果总体肯定，就没有必要硬凑一个反面；材料如果明显暴露问题，也不要为了所谓“客观”把态度写得模棱两可。</p>
          <p>接下来再判断：材料主要是在解释原因、列举影响，还是已经给出解决办法。答案写什么，应当从材料长出来。</p>
        </Prose>
        <div className="type-v2-case">
          <span>一个简单例子</span>
          <p><b>现象：</b>电脑进入学生日常学习。</p>
          <p><b>材料若同时出现：</b>查资料更方便、提高学习效率；沉迷游戏、刷剧影响学习。</p>
          <p><b>答案逻辑：</b>总体判断 → 积极影响 → 存在问题 → 材料若有则补使用规范或管理建议。</p>
        </div>
        <TeacherNote>“观点明确”不是把态度写得很重，而是让阅卷人一开始就知道：你对这个现象到底怎么判断。</TeacherNote>

        <div className="expression-v2-subtitle"><span>理解分析</span><h4>先解释“这句话到底在说什么”，再回答“它在材料里怎么体现”</h4></div>
        <Prose>
          <p>理解分析的第一关，是把抽象话说成人能听懂的话。</p>
          <p>题目里如果出现比喻、引号、两个对照概念或者比较抽象的表达，不要直接跳过解释。先把每个关键词还原成材料里的真实含义。</p>
          <p>比如“撤销眼中的柜台”和“撤销心中的柜台”，前者可能指服务形式的改变，后者可能指服务理念的改变。你只有先把两个概念分开，后面才能判断各自有哪些意义、问题和做法。</p>
          <p>这里经常会用到一个很重要的判断：<strong>表现形式。</strong>有些题问的是精神、理念、思想、观念或作用，材料并不直接给定义，而是用一组行为和做法告诉你“这个抽象概念具体体现在哪里”。</p>
        </Prose>
        <div className="expression-v2-logic-diagram">
          <div><b>眼中的柜台</b><p>外在形式</p><i>→ 前台设置、办理方式、沟通距离</i></div>
          <div><b>心中的柜台</b><p>内在理念</p><i>→ 服务意识、协同机制、便民导向</i></div>
        </div>

        <div className="expression-v2-subtitle"><span>理解分析常见结构</span><h4>内涵、表现、关系、总结，具体写哪些要看材料</h4></div>
        <Prose>
          <p>理解分析没有一条必须照抄的固定结构，但大体可以这样思考：</p>
          <p><strong>第一，解释内涵。</strong>把题目中的话、概念或关系说清楚。</p>
          <p><strong>第二，寻找外延。</strong>看材料用哪些做法、行为、意义、问题、变化来说明这个概念。</p>
          <p><strong>第三，处理关系。</strong>如果题目本身包含两个概念，要判断它们是并列、递进、因果还是相互促进。</p>
          <p><strong>第四，必要时收束。</strong>材料如果有明确方向、结论或做法，再用一两句完成总结。</p>
        </Prose>

        <div className="expression-v2-subtitle"><span>原因分析</span><h4>别机械找“因为”，先确定“什么的原因”</h4></div>
        <Prose>
          <p>原因分析虽然经常被放在综合分析里，但它其实是一个很典型的“明确要素题”。题目问了原因，你就知道要找原因。</p>
          <p>真正难的是：原因不一定长成“因为……所以……”的样子。</p>
          <p>比如一个执法争议为什么引发热议，材料可能分别写认定争议、主管部门回应不到位、处罚金额争议、所有权认知差异、问题处理不及时。句式并不统一，但它们都在回答同一个问题：<strong>为什么这件事会引起争议。</strong></p>
          <p>所以做原因分析时，可以先按主体、环节、性质或者材料分部理解，再考虑同义合并和层级归纳。</p>
        </Prose>

        <div className="expression-v2-subtitle"><span>对比分析</span><h4>不要“A写一段、B写一段”，要让比较真正发生</h4></div>
        <Prose>
          <p>对比分析的关键不是“分别介绍两个对象”，而是找到同一把尺子。</p>
          <p>比如两种基层“绣花功夫”，可以先确定共同点：都是基层治理的工作方式；再按同样的维度比较目的、做法和效果。</p>
          <p>只有维度一致，比较才清楚。否则你写A的做法、B的效果，内容都没错，却很难形成真正的分析。</p>
        </Prose>
        <div className="type-v2-matrix">
          <div className="head">比较维度</div><div className="head">A：精细创新</div><div className="head">B：应付检查</div>
          <div>目的</div><div>解决基层工作细、碎、难</div><div>展示政绩、应付检查</div>
          <div>做法</div><div>信息化、透明化、服务化</div><div>形式主义、弄虚作假</div>
          <div>效果</div><div>提高效率、改善治理</div><div>耗费资源、群众失望</div>
        </div>

        <div className="expression-v2-subtitle strong"><span>答案逻辑</span><h4>“是什么—为什么—怎么办”可以用，但一定要先服从题目和材料</h4></div>
        <Prose>
          <p>现象分析有时适合“判断/解释—分析—对策”；理解分析有时更像“内涵—表现—关系—总结”；对比分析则可能是“共同点—不同点—结论”。</p>
          <p>有些题的答案会出现<strong>递进中带并列</strong>：整体从解释到分析再到做法，内部每一层又有几个并列点。</p>
          <p>也会出现<strong>并列中带递进</strong>：先分两个并列概念，再在每个概念里分别解释、分析和展开。</p>
          <p>这些都不是为了多记一个术语，而是为了让答案真正符合材料本身的关系。</p>
        </Prose>

        <div className="expression-v2-subtitle"><span>最后再看注意事项</span><h4>综合分析最容易掉进“模板正确，回答错误”</h4></div>
        <div className="expression-v2-five">
          <article><NumberStep n={1} /><div><h4>一看到分析就套三段式</h4><p>先看题目究竟让你评价、理解、找原因还是比较，结构永远是任务之后的事。</p></div></article>
          <article><NumberStep n={2} /><div><h4>只表态，没有依据</h4><p>综合分析的观点必须由材料支撑，不能变成脱离材料的议论文。</p></div></article>
          <article><NumberStep n={3} /><div><h4>只抄材料，没有关系</h4><p>材料内容都找到了，却没有解释先后、因果、利弊或概念关系，仍然只是罗列。</p></div></article>
          <article><NumberStep n={4} /><div><h4>为了辩证硬凑两面</h4><p>材料只有正面就写正面，只有问题就把问题讲清。不要给材料强行加戏。</p></div></article>
          <article><NumberStep n={5} /><div><h4>结尾突然堆万能对策</h4><p>材料没有对策、题目也不需要，就不必为了“完整”写一堆空话。</p></div></article>
        </div>
      </section>

      <section className="expression-chapter expression-v2-section type-chapter" id="type-solution">
        <header className="expression-v2-head compact">
          <span>03 / SOLUTION</span>
          <h3>提出对策，真正难的不是“会不会写措施”，而是“措施能不能解决这个问题”。</h3>
          <p>对策写得再规范，如果和材料里的问题对不上，仍然只是漂亮的空话。</p>
        </header>

        <Prose>
          <p>很多同学做对策题，看到材料里有问题，就开始写“加强宣传、完善制度、强化监管”。</p>
          <p>这些词当然都可能用，但它们只是方向。</p>
          <p>真正开始做题之前，先问两个问题：<strong>材料到底有几类问题？每一类问题是谁造成的、谁有能力解决？</strong></p>
          <p>只有问题、原因、主体和现实条件想清楚，对策才会从“看起来像答案”变成“真的能对上答案”。</p>
        </Prose>

        <div className="expression-v2-subtitle strong"><span>先分两种常见任务</span><h4>只问对策，与“问题 + 对策”的两问，写法不一样</h4></div>
        <div className="type-v2-answer-shape">
          <article><span>ONE TASK</span><h5>只问对策</h5><p>核心字数全部用于解决问题。<br /><br />先归纳措施方向，再尽量写清动作、对象和方式。</p></article>
          <article><span>TWO TASKS</span><h5>问题 + 对策</h5><p>先用较少字数概括问题，再把更多空间留给对策。<br /><br /><small>这是两个明确任务，不等于复合要素。</small></p></article>
        </div>
        <Prose>
          <p>两问题如果总字数比较紧，问题部分可以写得更精炼，对策部分通常要更展开。</p>
          <p>一个实用的经验是，大致可以按 <strong>3:7 到 4:6</strong> 的比例考虑问题和对策，具体还要看材料本身的信息量。</p>
          <p>如果材料的问题很多，对策也很多，就先归类，别让答案变成十几条散乱的小句。</p>
        </Prose>

        <div className="expression-v2-subtitle"><span>三条标准</span><h4>针对性、可行性、可操作性，解决的是三个不同问题</h4></div>
        <div className="expression-v2-three">
          <article><NumberStep n={1} /><div><h5>针对性</h5><p>这条措施到底在解决哪个问题？如果材料说“反馈渠道不畅”，答案却写“加强人才建设”，方向就已经偏了。</p></div></article>
          <article><NumberStep n={2} /><div><h5>可行性</h5><p>谁有权做？有没有成本、法律、身份和现实条件限制？个人、社区、基层单位和政府部门能够采取的措施并不一样。</p></div></article>
          <article><NumberStep n={3} /><div><h5>可操作性</h5><p>不能只停在“加强宣传”。要继续说明谁宣传、向谁宣传、宣传什么、通过什么渠道，必要时再补监督、反馈和长效机制。</p></div></article>
        </div>

        <div className="expression-v2-subtitle strong"><span>对策从哪里来</span><h4>先用材料，再反推；能具体，就别停在空泛动词上</h4></div>
        <div className="type-v2-source-flow">
          <article><span>01</span><b>材料直接给出</b><p>成功经验、已有措施、政策要求，优先转化为答案。</p></article>
          <article><span>02</span><b>从问题反推</b><p>渠道少 → 拓宽渠道；设施不足 → 补齐设施；管理混乱 → 完善管理。</p></article>
          <article><span>03</span><b>从原因反推</b><p>如果根源在制度、人才、技术、资金或协调机制，就要从根源对应解决。</p></article>
          <article><span>04</span><b>合理补充细节</b><p>材料只给方向时，可以在身份权限和常识范围内，把动作补得更完整。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>一个完整动作怎么写</span><h4>主体 + 动作 + 对象 / 方式 + 必要的目的或机制</h4></div>
        <Prose>
          <p>比如“加强宣传”，只写到这里，阅卷人知道方向，却不知道你到底准备怎么做。</p>
          <p>可以继续补成：“社区联合学校和物业，围绕垃圾分类标准，通过入户讲解、楼道海报和线上群通知开展分类宣传，并设置现场咨询和反馈渠道。”</p>
          <p>你会发现，真正让措施变得可操作的，不是换一个更高级的词，而是<strong>把谁来做、对谁做、怎么做说清楚。</strong></p>
        </Prose>

        <div className="expression-v2-subtitle"><span>启示与经验</span><h4>有些题表面在问“学什么”，实质仍然是把特殊经验转成普遍方法</h4></div>
        <Prose>
          <p>启示类题目常常来自一个具体地区、企业或人物案例。</p>
          <p>如果直接照抄“某村建立某平台、某县开展某活动”，答案迁移性很差。</p>
          <p>更好的处理，是先看这些做法的共同目的和本质：是在完善制度、创新服务、强化技术、培养人才，还是在调动群众参与？</p>
          <p>把特殊性提炼成普适性，再保留必要的操作细节，答案才真正具备“启示”的味道。</p>
        </Prose>

        <div className="expression-v2-subtitle"><span>最后再看注意事项</span><h4>对策题最容易写成“看起来都对，实际上谁也解决不了”</h4></div>
        <div className="expression-v2-five">
          <article><NumberStep n={1} /><div><h4>问题和对策对不上</h4><p>写完后最好做一次“问题—措施”对应检查，看看每个主要问题有没有真正被处理。</p></div></article>
          <article><NumberStep n={2} /><div><h4>主体越权</h4><p>身份限制非常重要。谁能处罚、谁能制定制度、谁能组织协调，必须符合现实权限。</p></div></article>
          <article><NumberStep n={3} /><div><h4>目标当措施</h4><p>“提高意识、改善环境、促进发展”往往是目标或效果，前面还需要真正的动作。</p></div></article>
          <article><NumberStep n={4} /><div><h4>脱离材料自由发挥</h4><p>材料能用尽量用，材料不足再做合理补充，别把常识写成一套万能治理方案。</p></div></article>
          <article><NumberStep n={5} /><div><h4>归纳后丢掉细节</h4><p>“完善机制”只是归纳词，后面还要留下能体现具体做法的信息。</p></div></article>
        </div>
      </section>

      <section className="expression-chapter expression-v2-section type-chapter" id="type-implementation">
        <header className="expression-v2-head compact">
          <span>04 / IMPLEMENTATION</span>
          <h3>公文写作，先把这场“沟通”想清楚，再谈格式。</h3>
          <p>公文题最容易被学成格式题。可真正决定内容的，始终是身份、对象、目的和任务。</p>
        </header>

        <Prose>
          <p>我更愿意把公文写作理解成<strong>带着身份完成一次现实沟通。</strong></p>
          <p>你是谁？写给谁？为什么写？希望对方知道什么、理解什么、做什么？</p>
          <p>这些问题想明白以后，材料里哪些内容要保留、哪些内容可以舍掉，才会逐渐清楚。</p>
          <p>所以公文是很典型的复合要素任务。题目可能只告诉你“写一篇经验交流讲话稿”，却不会把“要找的问题、做法、成效、意义”逐项列出来。你必须根据真实任务自己判断。</p>
        </Prose>

        <div className="type-v2-public-flow">
          <article><span>身份</span><b>我是谁</b></article><i>→</i>
          <article><span>对象</span><b>写给谁</b></article><i>→</i>
          <article><span>目的</span><b>为什么写</b></article><i>→</i>
          <article><span>任务</span><b>希望对方知道 / 做什么</b></article>
        </div>

        <div className="expression-v2-subtitle strong"><span>四类常见公文任务</span><h4>分类不是为了背模板，而是帮助你判断“主体部分应该装什么”</h4></div>
        <div className="type-v2-analysis-grid">
          <article><span>01</span><h5>常规类</h5><b>讲话、倡议、感谢、通知等</b><p>有比较明确的现实沟通场景。开头交代背景和目的，主体完成具体任务，结尾根据文种总结、号召、感谢或提出期待。</p></article>
          <article><span>02</span><h5>提纲类</h5><b>内容优先，形式从简</b><p>重点是把汇报、介绍、发言需要讲的内容分层整理出来。题目常强调“提纲”，因此不必把完整格式写得过重。</p></article>
          <article><span>03</span><h5>文章类</h5><b>观点前置，重完整表达</b><p>常见于短评、宣传稿、材料性文章。可能要讲发展历程、利弊、特点、多个方面的内容，读起来要更像一篇完整文章。</p></article>
          <article><span>04</span><h5>方案类</h5><b>把流程和参与方式说清楚</b><p>谁来做、对谁做、什么时候做、怎么参与、有什么要求、后续怎么安排，必须让人看完以后知道怎么执行。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>开头</span><h4>开头回答的是“为什么现在要写这篇东西”</h4></div>
        <Prose>
          <p>公文开头不需要背一套万能句。</p>
          <p>常见的材料内容有背景、问题、意义、对象解释、写作目的。到底写哪几个，要看任务。</p>
          <p>经验交流，可以交代原来遇到什么问题、为什么开展这项工作；感谢信，直接说明身份、感谢对象和感谢原因；倡议书，要让读者知道为什么现在需要行动。</p>
          <p>开头通常只有几行，所以要控制“度”。不要把主体内容提前全部塞进去。</p>
        </Prose>

        <div className="expression-v2-subtitle"><span>主体</span><h4>大多数公文中间，依然在做“理解材料 + 归纳概括”</h4></div>
        <Prose>
          <p>公文没有脱离前面的基本功。</p>
          <p>主体常见的内容，无非是：我们有什么、做了什么、取得什么效果；未来准备怎么处理；希望对方做什么；一个活动具体怎么开展。</p>
          <p>区别在于，你不仅要找全，还要考虑真实沟通顺序。</p>
          <p>给领导汇报，表达更简洁准确；面对群众倡议，要让内容易懂、行动清楚；经验交流，要把“为什么做—怎么做—做得怎么样”讲得有逻辑。</p>
        </Prose>

        <div className="expression-v2-subtitle"><span>结尾</span><h4>通常 1—3 行解决，完成这场沟通就够了</h4></div>
        <Prose>
          <p>结尾的功能很简单：总结、呼吁、提出后续安排、表达感谢或期待。</p>
          <p>有些文种甚至不需要很重的结尾。</p>
          <p>判断标准仍然是现实沟通：<strong>如果这篇东西真的发出去，最后一句应该怎么自然结束？</strong></p>
        </Prose>
        <div className="type-v2-answer-shape">
          <article><span>OPENING</span><h5>开头</h5><p>背景 / 问题 / 意义 / 目的</p></article>
          <article><span>BODY</span><h5>主体</h5><p>做法 / 情况 / 经验 / 流程 / 要求</p></article>
          <article><span>ENDING</span><h5>结尾</h5><p>总结 / 呼吁 / 安排 / 感谢</p></article>
        </div>

        <div className="expression-v2-subtitle strong"><span>两个例子</span><h4>同样是材料，一换任务，内容取舍就会跟着变</h4></div>
        <div className="type-v2-case-stack">
          <article><span>经验交流讲话稿</span><p>开头交代原有问题和开展工作的背景；主体按信息管理、人员配置、污染治理、安全追溯等经验展开；结尾再表达交流合作的期待。重点是让别人真正听懂“我们怎么做”。</p></article>
          <article><span>感谢信</span><p>开头说明身份和感谢原因；主体写具体帮助、专业回应、责任心与无私奉献；结尾表达感谢和祝愿。此时同样是案例材料，但选择标准已经变成“什么最能完成感谢这个目的”。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>最后再看注意事项</span><h4>公文题最容易把“像公文”写在前面，把“完成任务”丢在后面</h4></div>
        <div className="expression-v2-five">
          <article><NumberStep n={1} /><div><h4>先背格式，再看任务</h4><p>格式只是表面，真正决定分数的是内容是否完成题目要求。</p></div></article>
          <article><NumberStep n={2} /><div><h4>忽略身份和对象</h4><p>给领导、群众、同事、活动参与者的表达方式和信息选择不可能完全一样。</p></div></article>
          <article><NumberStep n={3} /><div><h4>材料全塞进去</h4><p>公文是有目的的沟通，不是材料摘要。只留能服务当前任务的内容。</p></div></article>
          <article><NumberStep n={4} /><div><h4>空话太多</h4><p>为了“像机关文风”堆很多套话，最容易把真正有分的材料内容挤没。</p></div></article>
          <article><NumberStep n={5} /><div><h4>结构有形式，没有推进</h4><p>开头、主体、结尾都写了，但三部分没有完成清楚的沟通逻辑，仍然会显得散。</p></div></article>
        </div>
      </section>

      <section className="expression-chapter expression-v2-section type-chapter" id="type-essay">
        <header className="expression-v2-head compact">
          <span>05 / ESSAY</span>
          <h3>文章写作，先让整篇文章知道自己在证明什么。</h3>
          <p>作文当然需要表达，但真正让文章站得住的，是主题、立意、分论点和论证关系。文采是放大器，逻辑才是地基。</p>
        </header>

        <Prose>
          <p>很多同学一学作文，先背标题、开头、名言和案例。</p>
          <p>这些东西当然可以积累，但如果中心观点没有想清楚，积累得越多，越容易把文章写散。</p>
          <p>我更建议先按三个层次想：<strong>题目在讨论什么主题？我最终要证明什么总论点？我准备用哪几个分论点把它证明出来？</strong></p>
          <p>这三个问题解决以后，再谈语言、案例、句式和段落设计，顺序会自然很多。</p>
        </Prose>

        <div className="expression-v2-subtitle strong"><span>龙头 · 猪肚 · 豹尾</span><h4>开头负责点题，中间负责证明，结尾负责收束</h4></div>
        <div className="type-v2-essay-body">
          <article><span>龙头</span><h5>引论</h5><p>可以有设计感，但首先要把题目里的核心概念说清楚，完成引题、解释和总论点。漂亮不是目的，点题才是。</p></article>
          <article><span>猪肚</span><h5>正论</h5><p>分论点要相互区分，又共同支撑总论点。每一段都要有解释、有论据、有分析，不能只换三个近义词重复一件事。</p></article>
          <article><span>豹尾</span><h5>结论</h5><p>短促有力，回扣主题，适度提升。不要到最后突然再提出一个正文没有论证过的新观点。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>观点从哪里来</span><h4>题干、来源材料、材料分部、小题与未用材料，都可能给你线索</h4></div>
        <Prose>
          <p>如果题干已经给出两个明显的并列概念，先别急着自己发明新的分论点。先把这两个概念的内涵和关系想透。</p>
          <p>如果材料本身分成几个明显部分，就像做归纳概括一样问：每一部分对主题来说，究竟在说哪个方面？这些方面能不能共同支撑一个总论点？</p>
          <p>小题和没有被前面小题充分使用的材料，也经常能提示主题中的做法、意义、关系和价值。</p>
          <p>作文不是凭空“想观点”，而是把整套试卷的材料关系重新组织成一篇完整论证。</p>
        </Prose>
        <div className="type-v2-mini-flow"><span>题干 / 来源材料</span><i>→</i><span>材料分部</span><i>→</i><span>小题 / 未用材料</span><i>→</i><b>分论点</b></div>

        <div className="expression-v2-subtitle strong"><span>四种常见文章思路</span><h4>不要把它们当模板，先看“正文主要要证明什么”</h4></div>
        <div className="type-v2-analysis-grid essay-grid">
          <article><span>01</span><h5>策论文</h5><b>重点回答“怎么做到”</b><p>正文主要围绕实现主题的路径展开。每个分论点既要说清做法，也要解释为什么这条做法能解决问题、促进目标实现。</p></article>
          <article><span>02</span><h5>政论文</h5><b>重点回答“为什么重要”</b><p>正文主要从不同方面解释主题的意义、价值、作用和必要性，把一个抽象概念讲具体、讲充分。</p></article>
          <article><span>03</span><h5>综合文</h5><b>意义、问题、路径可以共同出现</b><p>当材料既强调价值又强调实现方式，或者多个分论点本身属于不同性质，可以形成更综合的论证结构。</p></article>
          <article><span>04</span><h5>思辨文</h5><b>重点处理 A 与 B 的关系</b><p>题目出现两个概念时，不能各写一半就结束。要判断二者是互补、因果、条件还是相互促进，并把“关系”本身论证出来。</p></article>
        </div>

        <div className="expression-v2-subtitle"><span>思辨关系</span><h4>A 和 B 的关系，往往比 A 和 B 本身更重要</h4></div>
        <Prose>
          <p>如果 A 是做法、B 是结果，可以围绕“通过做到 A 的哪些方面，促进 B 的哪些变化”来拆分论点。</p>
          <p>如果 A 和 B 彼此促进，就要分别说明二者为什么重要、各自怎样作用于对方，最后回到共同发展的整体判断。</p>
          <p>如果题目本身强调“既要A也要B”，也不能简单写成“A重要、B也重要”。真正要回答的是：<strong>为什么两者不能偏废，怎样在现实中把二者统一起来。</strong></p>
        </Prose>
        <div className="expression-v2-logic-diagram">
          <div><b>A → B</b><p>因果 / 路径关系</p><i>通过 A 的具体做法，推动 B 的结果实现</i></div>
          <div><b>A ↔ B</b><p>互补 / 相互促进</p><i>分别讲清二者价值，再论证为什么需要协同</i></div>
        </div>

        <div className="expression-v2-subtitle"><span>一段怎么写实</span><h4>观点—解释—论据—分析—回扣，真正拉开差距的是“分析”</h4></div>
        <Prose>
          <p>案例不是放进去就自动产生说服力。</p>
          <p>一段比较完整的论证，可以先提出分论点，再解释这个观点究竟是什么意思；接着放入案例、事实或道理论据；然后说明这个论据为什么能够证明你的观点，最后再回扣主题。</p>
          <p>很多文章看起来素材很多，却没有真正论证，就是因为“案例之后没有分析”。</p>
          <p>所以写完一个例子，别急着进入下一个。多问一句：<strong>这个例子究竟证明了什么？它和我的分论点之间是什么关系？</strong></p>
        </Prose>

        <div className="expression-v2-subtitle"><span>最后再看注意事项</span><h4>作文最怕“看起来很满，实际上没有中心”</h4></div>
        <div className="expression-v2-five">
          <article><NumberStep n={1} /><div><h4>立意只抓一则材料</h4><p>大作文通常需要回到题目和整体材料，不要被某一个故事带偏。</p></div></article>
          <article><NumberStep n={2} /><div><h4>分论点互相包含</h4><p>三个分论点最好保持相近层级，各自承担不同任务，又共同服务总论点。</p></div></article>
          <article><NumberStep n={3} /><div><h4>例子很多，分析很少</h4><p>素材只是证据，必须解释它为什么能证明当前观点。</p></div></article>
          <article><NumberStep n={4} /><div><h4>追求文采，牺牲准确</h4><p>申论写作首先是公共表达。表达可以有力量，但观点、逻辑和事实关系必须稳定。</p></div></article>
          <article><NumberStep n={5} /><div><h4>结尾突然拔出新观点</h4><p>结尾的任务是回扣和收束，不是临时再开一个新的论证战场。</p></div></article>
        </div>
        <TeacherNote>先把文章写“明白”，再把它写“好看”。观点清楚、逻辑稳定、论证扎实，本身就是很好的表达。</TeacherNote>
      </section>
    </div>
  );
}
