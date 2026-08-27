import type { ReactNode } from 'react';

export const coreAbilityChapters = [
  { id: 'ability-01', no: '01', title: '分析能力', en: 'ANALYZE' },
  { id: 'ability-02', no: '02', title: '综合能力', en: 'SYNTHESIZE' },
  { id: 'ability-03', no: '03', title: '概括能力', en: 'CONDENSE' },
  { id: 'ability-04', no: '04', title: '归纳能力', en: 'GENERALIZE' },
  { id: 'ability-05', no: '05', title: '表达能力', en: 'EXPRESS' },
] as const;

function Prose({ children }: { children: ReactNode }) {
  return <div className="core-ability-prose">{children}</div>;
}

function AbilityHead({ no, en, title, lead }: { no: string; en: string; title: string; lead: string }) {
  return (
    <header className="core-ability-head">
      <div className="core-ability-mark"><span>{no}</span><b>{en}</b></div>
      <div>
        <h3>{title}</h3>
        <p>{lead}</p>
      </div>
    </header>
  );
}

function Topic({ label, title, children, strong = false }: { label: string; title: string; children?: ReactNode; strong?: boolean }) {
  return (
    <div className={`core-topic${strong ? ' strong' : ''}`}>
      <span>{label}</span>
      <h4>{title}</h4>
      {children}
    </div>
  );
}

function Note({ children }: { children: ReactNode }) {
  return <aside className="core-teacher-note"><span>阅 / 高老师提醒</span><p>{children}</p></aside>;
}

function Pair({ from, to, note }: { from: string; to: string; note?: string }) {
  return (
    <article className="core-rewrite-pair">
      <div><span>材料表达</span><p>{from}</p></div>
      <i>→</i>
      <div><span>答案表达</span><p>{to}</p>{note && <small>{note}</small>}</div>
    </article>
  );
}

function MiniCase({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return <article className="core-mini-case"><span>{label}</span><h5>{title}</h5>{children}</article>;
}

export function FrameworkAbilities() {
  return (
    <div className="core-abilities-course">
      <section className="core-ability-overview" aria-label="核心能力关系">
        <div className="core-overview-copy">
          <span>ABILITY MAP / 能力关系</span>
          <h3>材料不会自动变成答案。<br />中间至少要经过五个动作。</h3>
          <p>先看懂材料在说什么，再决定答案怎么组织；接着控制字数和层级，给内容一个准确的归纳，最后用规范的申论语言写出来。</p>
        </div>
        <div className="core-ability-chain">
          {coreAbilityChapters.map((item, index) => (
            <div className="core-chain-item" key={item.id}>
              <span>{item.no}</span><b>{item.title}</b><small>{item.en}</small>
              {index < coreAbilityChapters.length - 1 && <i>→</i>}
            </div>
          ))}
        </div>
        <p className="core-overview-foot">做题时这五项能力并不是截然分开的。分析和综合发生在阅读阶段，概括、归纳、表达更多发生在落笔阶段；一道难题往往是在几个环节同时设置障碍。</p>
      </section>

      <section className="core-ability-chapter" id="ability-01">
        <AbilityHead no="01" en="ANALYZE" title="分析能力" lead="围绕题干所问的主体或对象，把材料拆开，判断每一部分、每一句话究竟承担什么作用。" />
        <Prose>
          <p>很多同学读材料时会有一种“每个字都认识，但读完以后脑子还是乱”的感觉。问题通常不在识字，而在于没有给材料建立结构。申论里的分析，先要回答两个问题：<strong>这一部分在说什么？这句话对题干主体来说是什么要素？</strong></p>
          <p>分析的对象不是孤立的一句话。题干问谁，就始终围绕谁理解材料。相同一句材料，放到不同主体、不同任务里，可能是问题，也可能只是背景、原因、条件、做法或影响。</p>
        </Prose>

        <Topic label="第一步 / 分部分" title="先划分材料的宏观层次，知道这一则材料大致由哪几块组成" strong />
        <div className="core-analysis-flow">
          <article><span>01</span><b>看段落功能</b><p>背景、案例、解释、问题、原因、做法、效果、总结，通常会形成不同的材料区块。</p></article>
          <article><span>02</span><b>看主题变化</b><p>主体变化、时间变化、地点变化、做法变化、观点转折，都可能意味着进入新的部分。</p></article>
          <article><span>03</span><b>看关系</b><p>并列、递进、转折、因果、对比。先知道材料怎么走，后面才知道答案怎么排。</p></article>
        </div>
        <MiniCase label="课堂小例子" title="一则材料为什么不能从第一句抄到最后一句？">
          <p>材料依次写“社区人口快速增加 → 原有空间不足 → 居民停车困难 → 社区重新划分停车区域 → 引入居民议事协商 → 投诉明显减少”。</p>
          <p><b>先分部分：</b>背景 / 问题 / 做法 / 成效。题目如果问“社区停车治理的经验”，前两部分主要帮助理解，真正的答案重点落在“重新规划 + 居民协商”及其做法细节。</p>
        </MiniCase>

        <Topic label="第二步 / 判要素" title="再逐句判断：它对题干主体来说，究竟是问题、原因、意义、做法还是其他要素" strong />
        <div className="core-question-lens">
          <div className="lens-question"><span>题干主体</span><b>社区治理过程中的主要问题</b></div>
          <div className="lens-arrow">↓</div>
          <div className="lens-grid">
            <article><span>材料 A</span><p>部分老年人不会使用智能手机。</p><b>先问：这是“社区治理本身的问题”，还是治理工作的背景和服务对象特征？</b></article>
            <article><span>材料 B</span><p>居民意见长期缺少反馈渠道，矛盾只能反复向不同部门反映。</p><b>直接对应社区治理：反馈渠道不畅、协同机制不足。</b></article>
          </div>
        </div>
        <Note>看到“问题”两个字就抄材料里的所有负面内容，是最常见的误区。要先把负面表述放回题干主体中判断：它究竟是谁的问题。</Note>

        <Topic label="主体意识" title="同一句材料，放在不同主体下面，可能承担完全不同的作用" />
        <div className="core-subject-switch">
          <p className="source">“工作人员不熟悉新系统，群众等待时间变长。”</p>
          <div><span>问政务服务存在的问题</span><b>工作人员业务适应不足、办事效率下降。</b></div>
          <div><span>问新系统推广受阻的原因</span><b>人员培训不足、使用熟练度不高。</b></div>
          <div><span>问群众办事体验的变化</span><b>等待时间延长，服务体验下降。</b></div>
        </div>

        <Topic label="案例材料" title="案例不是故事休息区，人物行为本身也在表达要素" />
        <Prose>
          <p>案例型材料很少直接替你写“这是人才培养”“这是群众自治”。它往往只写一个人做了什么、为什么这样做、结果如何。分析能力要把故事还原成要素。</p>
        </Prose>
        <div className="core-case-decode">
          <article><span>故事</span><p>老同志带着年轻干部进村入户，手把手教他们处理群众纠纷。</p></article>
          <i>→</i>
          <article><span>行为</span><p>老带新、实地教学、实践锻炼。</p></article>
          <i>→</i>
          <article className="result"><span>对题干的含义</span><p><b>加强人才培养 / 实施导师帮带。</b></p></article>
        </div>

        <Topic label="关系分析" title="有时题目考的不是一个要素，而是两个概念之间是什么关系" />
        <div className="core-relation-grid">
          <article><span>A → B</span><b>路径 / 因果</b><p>通过 A 的具体做法，推动 B 实现。</p></article>
          <article><span>A ↔ B</span><b>相互促进 / 辩证统一</b><p>分别说明各自价值，再解释为什么不能偏废、如何协同。</p></article>
          <article><span>A ≠ B</span><b>区别 / 对比</b><p>使用同一把尺子，从目的、做法、效果、性质等维度比较。</p></article>
          <article><span>A ⊂ B</span><b>包含 / 层级</b><p>判断哪个概念更大，避免把下位内容和上位概念并列。</p></article>
        </div>

        <Topic label="分析能力自检" title="读完一则材料，至少能回答下面五个问题" />
        <div className="core-checklist five">
          <p><span>1</span>题目真正问的主体 / 对象是谁？</p>
          <p><span>2</span>材料可以划成几个部分？为什么这样划？</p>
          <p><span>3</span>每一部分分别在表达什么要素？</p>
          <p><span>4</span>案例里隐藏着什么做法、意义、问题或原因？</p>
          <p><span>5</span>不同部分之间是并列、递进、因果、对比还是其他关系？</p>
        </div>
      </section>

      <section className="core-ability-chapter" id="ability-02">
        <AbilityHead no="02" en="SYNTHESIZE" title="综合能力" lead="把已经拆开的信息重新归类、排序和组织，让材料从碎片变成一个完整答案。" />
        <Prose>
          <p>分析解决“这一块是什么”，综合解决“这些块最后怎么放”。材料可以碎片化，答案不能碎片化。综合能力首先体现在<strong>答案的先后顺序</strong>，其次体现在<strong>同类信息集中表达</strong>，最后体现在<strong>整体结构符合正常认识过程</strong>。</p>
        </Prose>

        <Topic label="先确定答案长相" title="不同任务，对答案整体结构的要求不一样" strong />
        <div className="core-shape-grid">
          <article><span>单一要素题</span><h5>总分结构</h5><p>归纳词在前，概括内容在后：<b>完善设施。增设消防器材，优化排水和通风。</b></p></article>
          <article><span>复合要素题</span><h5>是什么 → 为什么 → 怎么办</h5><p>先解释或表态，再写意义、问题、原因、表现，最后根据材料决定是否提出对策。</p></article>
          <article><span>对比分析</span><h5>同一维度比较</h5><p>先写共同本质，再用目的、做法、效果、性质等同一把尺子比较。</p></article>
          <article><span>关系理解</span><h5>分别解释 → 判断关系 → 协同</h5><p>先看 A、B 各自是什么，再说明二者为什么相互促进或各有侧重。</p></article>
        </div>

        <Topic label="答案顺序" title="通常遵循正常的认识逻辑，但不能把它背成死模板" />
        <div className="core-order-line">
          <span>背景</span><i>→</i><span>内涵 / 观点</span><i>→</i><span>意义</span><i>→</i><span>问题 / 原因</span><i>→</i><span>对策 / 总结</span>
        </div>
        <p className="core-caption">材料没有哪一部分，就不要为了凑结构硬补；题目只问一个要素，也不要强行写成“是什么—为什么—怎么办”。</p>

        <Topic label="同类归位" title="一类事情一次说完整，不要写完问题又跳到意义，再回头补问题" />
        <div className="core-fragment-example">
          <div className="bad"><span>碎片化</span><p>问题 A → 意义 A → 问题 B → 对策 A → 意义 B → 对策 B</p></div>
          <div className="good"><span>重组后</span><p><b>意义：</b>A、B； <b>问题：</b>A、B； <b>对策：</b>A、B。</p></div>
        </div>

        <MiniCase label="例子 / “眼中的柜台”与“心中的柜台”" title="两个概念既可以并列写，也可以写出递进关系">
          <p><b>第一层：</b>“眼中的柜台”是服务空间和前台设置形式，撤掉它解决的是物理距离和沟通方式。</p>
          <p><b>第二层：</b>“心中的柜台”是服务理念和心理隔阂，进一步要求工作人员转变观念、完善协同和服务方式。</p>
          <p>如果材料强调从空间变化走向理念变化，答案就可以体现<strong>由形式到理念的递进</strong>；如果材料分别展开两类内容，也可以在两大部分内部各自组织意义、问题和做法。</p>
        </MiniCase>

        <Topic label="综合能力与字数" title="答案结构还要服从格子：信息再多，也必须在有限空间里完成重组" />
        <Prose><p>综合不是只管逻辑。做完分析以后，要估算一共几个点、每个点大概几行。字数很紧，先保留独立要点和关键关系；字数宽松，再补充必要的对象、方式、结果和解释。</p></Prose>
        <Note>第三遍总结时就要开始做这件事：定答案逻辑、估每部分行数，再决定哪些案例、顿号列举和过细内容需要压缩。</Note>
      </section>

      <section className="core-ability-chapter" id="ability-03">
        <AbilityHead no="03" en="CONDENSE" title="概括能力" lead="把材料真正写成答案：保留什么、删掉什么、写到哪一层，以及到底要不要简写。" />
        <Prose>
          <p>概括能力可以理解成最直接的“写答案能力”。材料语言往往长、散、口语化，答案却有明确字数。真正的难点不是把句子改短，而是<strong>理解这个要素后，决定应该保留到什么层级</strong>。</p>
          <p>概括时最重要的目标通常不是最大的词，也不是最细的动作，而是<strong>具体的中观概念</strong>：既能直接回答题目，又能保留材料的有效信息。</p>
        </Prose>

        <Topic label="先判断 / 要不要简写" title="简写不是默认动作，先看题目问多大、字数有多紧、细节有没有独立价值" strong />
        <div className="core-condense-rules">
          <article><span>题目问法</span><b>问得越大，层级通常越要上提</b><p>启示、经验、整体做法等大问题，如果一直写人物名、平台名和单个动作，答案会过碎。</p></article>
          <article><span>字数要求</span><b>先算平均每个点有多少空间</b><p>点多字少时必须压；点少字宽时可以保留更多动作、对象和效果。</p></article>
          <article><span>独立采分</span><b>细节本身是新信息，就不能随便吞掉</b><p>两个动作解决不同问题、形成不同效果，不能只因为它们都属于“管理”就合并成一句空话。</p></article>
          <article><span>材料特色</span><b>特殊词能准确概括本质时，应尽量保留</b><p>制度名称、关键机制、核心做法如果本身承担识别度，不要为了“简洁”全部抹平。</p></article>
        </div>

        <Topic label="层级判断" title="宏观能统领，中观最适合采分，微观负责补证据" />
        <div className="core-level-scale">
          <article><span>宏观</span><b>加强基层治理</b><p>范围很大，适合总括；单独拿来采分往往信息不足。</p></article>
          <article className="recommended"><span>中观 ✓</span><b>完善市场设施配置</b><p>能回答题目，也能罩住消防、排水、通风等具体内容。</p></article>
          <article><span>微观</span><b>增设消防器材、抽水机、排水管道……</b><p>真实具体，但如果所有点都停在这里，容易碎、容易超字数。</p></article>
        </div>
        <Note>一个很好用的判断：<b>题目问得很小，答案有时可以适当写大；题目问得很大，答案不能一直写小。</b>大题目要求你看到可迁移的本质。</Note>

        <Topic label="四类高频简写" title="顿号、口语、案例、过细内容，是最常见的压缩对象" strong />
        <div className="core-rewrite-stack">
          <Pair from="热线、意见箱、网络留言、微信群都能反映问题。" to="畅通群众意见反馈渠道。" note="顿号列举：找共同功能。" />
          <Pair from="这里人手太少，事情又多，大家经常忙不过来。" to="管理力量不足。" note="口语化：留下正式、准确的核心含义。" />
          <Pair from="老书记把小叶带在身边，进村入户教他怎么协调矛盾、处理群众诉求。" to="实施导师帮带，加强年轻干部实践培养。" note="案例：删人物故事，留下做法本质。" />
          <Pair from="增设消防器材、抽水机，重新铺设排水管，改造通风口。" to="完善消防、排水和通风等配套设施。" note="过细内容：字数紧时上提一层；字数够时可保留关键细项。" />
        </div>

        <Topic label="什么时候不能再缩" title="缩写以后如果丢了对象、动作、区别或效果，就已经缩过头了" />
        <div className="core-too-far-grid">
          <article><span>原材料</span><p>建立市、镇、村三级信息网络，配备专职人员收集、更新养殖数据。</p></article>
          <article className="ok"><span>合适</span><p><b>健全信息管理网络，配备专人动态更新养殖信息。</b></p></article>
          <article className="bad"><span>过度简写</span><p><b>加强管理。</b></p><small>主体、方式、内容全部消失，几乎无法采分。</small></article>
        </div>

        <Topic label="顿号怎么缩" title="先看这些词为什么被放在一起，再决定是保留、合并还是上提" />
        <div className="core-comma-grid">
          <article><span>同一目的</span><p>公众号、短视频、宣传栏</p><b>丰富宣传方式 / 拓宽宣传渠道</b></article>
          <article><span>同一设施类型</span><p>消防器材、抽水机、排水管</p><b>完善消防排水设施</b></article>
          <article><span>不同独立功能</span><p>培训人员、建设系统、完善制度</p><b>不要硬合成“加强管理”</b><small>三项可能分别采分。</small></article>
        </div>

        <Topic label="案例怎么缩" title="人物、地点、过程先退到后面，优先保留“谁做了什么、解决了什么”" />
        <div className="core-case-formula"><span>人物故事</span><i>→</i><span>关键动作</span><i>→</i><span>做法本质</span><i>→</i><span>必要效果</span></div>
        <MiniCase label="自拟小例子" title="“村里请返乡大学生做直播”到底写多细？">
          <p>如果题目问“该村发展特色产业的具体做法”，可以写：<b>引进返乡人才开展直播销售，拓宽农产品线上销售渠道。</b></p>
          <p>如果题目问“乡村产业发展的启示”，层级还要再上提：<b>引育人才，创新营销方式，拓展市场渠道。</b></p>
          <p>同一段材料，因为题目大小不同，答案的“度”也会变化。</p>
        </MiniCase>

        <Topic label="概括能力自检" title="落笔前问自己四句话" />
        <div className="core-checklist four">
          <p><span>1</span>这句话直接对应题目要找的要素吗？</p>
          <p><span>2</span>现在这个层级，与题目问法大小匹配吗？</p>
          <p><span>3</span>平均每个点的字数允许我写这么细吗？</p>
          <p><span>4</span>再缩一步，会不会丢掉独立得分信息？</p>
        </div>
      </section>

      <section className="core-ability-chapter" id="ability-04">
        <AbilityHead no="04" en="GENERALIZE" title="归纳能力" lead="在概括内容之上再总结一层，给一组内容一个准确、直接、同层级的名字。" />
        <Prose>
          <p>归纳发生在概括之后。先知道材料具体说了什么，再给这些内容找一个能够统领它们的上位表达。实际写答案时，归纳词通常放在概括内容前面，形成<strong>“归纳词。具体概括……”</strong>的总分结构。</p>
          <p>要特别区分<strong>归纳词</strong>和<strong>分析时使用的分类思想</strong>。分析时你可以暂时标“硬件方面”“人员方面”“其他方面”，帮助自己整理材料；真正写进答案的归纳词必须尽量<strong>直接回答题干问题</strong>。</p>
        </Prose>

        <Topic label="三个标准" title="一个归纳词合不合适，至少检查三件事" strong />
        <div className="core-three-standards">
          <article><span>01</span><b>直接回答题干</b><p>题目问“问题”，归纳词就要体现问题性质，如“设施配备不足”，而不是只写“硬件方面”。</p></article>
          <article><span>02</span><b>不能大到吞掉其他点</b><p>“治理不到位”可以包含宣传、人员、制度、设施，太大以后各点失去区分度。</p></article>
          <article><span>03</span><b>能罩住下位内容</b><p>归纳词必须覆盖后面的具体概括；后文出现无法归入的内容，说明归纳还不准确。</p></article>
        </div>

        <Topic label="归纳怎么想" title="常见有三条路：找共同点、找目的、找做法本质" />
        <div className="core-generalize-paths">
          <article><span>共同点</span><p>多个小要点有什么相同属性？</p><b>消防器材不足 + 排水设施缺失 → 配套设施不足</b></article>
          <article><span>共同目的</span><p>不同动作最终都在解决什么？</p><b>热线 + 意见箱 + 网络留言 → 畅通反馈渠道</b></article>
          <article><span>做法本质</span><p>这些动作属于哪一类治理方式？</p><b>培训 + 导师帮带 + 实践锻炼 → 人才培养</b></article>
        </div>

        <Topic label="做法本质库" title="宣传、监督、管理、人才、技术、设施、制度、组织、资金等，是常见思考方向，不是固定模板" />
        <div className="core-essence-cloud">
          {['宣传引导','监督监管','组织管理','人才培养','技术赋能','设施建设','制度机制','资金保障','资源整合','协同联动','服务优化','执法规范'].map((item) => <span key={item}>{item}</span>)}
        </div>
        <p className="core-caption">先看材料做了什么，再判断它的本质；不能先背“宣传、管理、制度”几个词，再把材料强行往里面塞。</p>

        <Topic label="一大俱大" title="同一组归纳词必须保持在相近层级；一个点上提，其他点也要跟着调整" strong />
        <div className="core-level-consistency">
          <div className="bad"><span>层级打架</span><p>① <b>治理机制不健全</b>；② 消防器材不足；③ 宣传栏数量少。</p><small>第一个很大，后两个很小，不像同一层级的三个并列点。</small></div>
          <div className="good"><span>统一层级</span><p>① <b>机制建设不足</b>；② <b>设施配备不足</b>；③ <b>宣传引导不足</b>。</p><small>如果第一项由于材料原词或题目要求必须写大，其余归纳也要随之上提。</small></div>
        </div>

        <MiniCase label="例子 / 人才工作" title="五个人物故事，为什么最后可以归成“引、育、留、用”？">
          <p>材料分别写：让年轻人拜师学习、安排到数字服务中心工作、提供政策扶持吸引返乡、给予资金技术帮助留住人才、邀请外出人才返乡发展。</p>
          <div className="core-talent-grid">
            <span><b>引才</b>拓宽来源，吸引人才进入乡村</span>
            <span><b>育才</b>导师帮带、实践培养，提升本土能力</span>
            <span><b>留才</b>完善政策、资金和服务保障</span>
            <span><b>用才</b>人岗相适，把人才放到合适岗位</span>
          </div>
          <p>这些归纳词直接回答“人才工作做得怎么样 / 有哪些做法”，同时又能罩住各自的具体人物行为。</p>
        </MiniCase>

        <MiniCase label="例子 / 农贸市场问题" title="先概括，再归纳，答案会从碎片变得有层级">
          <div className="core-market-grid">
            <article><span>材料细节</span><p>过道窄、难并排通行、排水不畅</p><b>→ 设计不合理</b></article>
            <article><span>材料细节</span><p>消防设施不全、存在安全隐患</p><b>→ 设施配备不足</b></article>
            <article><span>材料细节</span><p>水沟异味、空气流通不畅</p><b>→ 市场环境较差</b></article>
          </div>
          <p>写答案时可以形成：<b>一、设计不合理。</b>过道狭窄，排水不畅；<b>二、设施配备不足。</b>消防设施不全；<b>三、市场环境较差。</b>水沟异味，通风不畅。</p>
        </MiniCase>

        <Topic label="什么时候可以不写归纳" title="归纳词有价值，但不能为了形式挤掉真正的要点分" />
        <Prose>
          <p>如果题目字数非常紧，平均一个要点连一行都不到，而材料本身已经非常精炼，可以直接写概括内容，不必硬塞归纳词。归纳的价值是帮助阅卷者快速看到结构，但<strong>概括内容承载的信息通常更多</strong>。</p>
          <p>反过来，题目问得很大、材料案例很多、答案容易碎时，归纳就很重要。尤其是启示、经验、做法、特点这类任务，需要通过归纳把特殊性转成可迁移的表达。</p>
        </Prose>
      </section>

      <section className="core-ability-chapter" id="ability-05">
        <AbilityHead no="05" en="EXPRESS" title="表达能力" lead="把已经理解清楚的内容写得准确、正式、简洁、有区分度；小题先求规范，作文再追求语势和思想。" />
        <Prose>
          <p>申论表达的第一标准不是“高级”，而是<strong>准确、正式、清楚</strong>。小题里，大多数内容都能用稳定的规范结构表达；作文、类作文和部分公文，再在准确基础上增加句式、观点、案例和语言质感。</p>
          <p>学生最容易走两个极端：一种完全照抄口语化材料，另一种为了显得高级，把“强化顶层设计、构建长效机制、形成工作合力”到处乱套。真正合适的表达必须能落回材料。</p>
        </Prose>

        <Topic label="小题高频结构" title="先掌握最常用的动宾表达和 N-ADJ 式概括" strong />
        <div className="core-expression-patterns">
          <article><span>动宾短语 / V + O</span><div className="word-list">{['完善制度','健全机制','优化流程','拓宽渠道','畅通反馈','强化监管','整合资源','盘活资源','压实责任','规范管理','加强培训','开展宣传','搭建平台','建立台账','提升能力','改善环境'].map(x=><b key={x}>{x}</b>)}</div></article>
          <article><span>课堂常用 N-ADJ 表达</span><div className="word-list">{['方式多样','主体多元','服务高效','渠道畅通','职责清晰','机制健全','流程规范','资源充足','覆盖广泛','衔接顺畅','管理精细','保障有力'].map(x=><b key={x}>{x}</b>)}</div></article>
        </div>

        <Topic label="把口语变成申论" title="不是换几个书面词，而是把口语背后的准确含义说出来" />
        <div className="core-rewrite-stack compact">
          <Pair from="人太少，事情又多，经常忙不过来。" to="基层管理力量不足。" />
          <Pair from="大家有意见也不知道应该找谁说。" to="群众意见反馈渠道不畅。" />
          <Pair from="几个部门各管一块，互相衔接不上。" to="部门协同机制不健全。" />
          <Pair from="办一件事要来回跑好几趟。" to="办事流程繁琐，跨部门衔接效率较低。" />
          <Pair from="有活动的时候大家才来，平时基本没人管。" to="活动开展缺乏常态化管理。" />
        </div>

        <Topic label="问题类表达" title="常见的正式问题语言，要能准确对应材料" />
        <div className="core-negative-grid">
          {['制度不健全','机制不完善','职责不清晰','协同不顺畅','渠道不畅','供给不足','设施不全','资源分散','管理粗放','监管缺位','落实不到位','服务滞后','人才短缺','能力不足','保障不足','宣传效果有限'].map(x=><span key={x}>{x}</span>)}
        </div>

        <Topic label="效果类表达" title="效果最好写清“谁发生了什么积极变化”" />
        <div className="core-effect-grid">
          <article><span>效率</span><p>提高办事效率、降低沟通成本、节约人力资源</p></article>
          <article><span>群众</span><p>提升获得感和满意度、方便群众参与、保障群众权益</p></article>
          <article><span>治理</span><p>提升治理精细化水平、增强协同能力、促进规范管理</p></article>
          <article><span>发展</span><p>拓展市场空间、激发发展活力、推动产业升级</p></article>
        </div>
        <Note>效果不能只看做法就自行推断。材料只写“建立微信群”，不能自动写成“提升群众幸福感”。先找材料有没有真正出现受益主体和变化。</Note>

        <Topic label="提出对策怎么写" title="最稳定的结构：动作 + 对象 + 内容 / 方式 + 必要保障或目的" strong />
        <div className="core-countermeasure-formula">
          <span>动作</span><i>+</i><span>对象</span><i>+</i><span>怎么做</span><i>+</i><span>必要的保障 / 反馈</span>
        </div>
        <div className="core-action-library">
          <article><span>宣传引导</span><p><b>加强、开展、创新、拓宽、丰富、普及、引导</b></p><small>如：创新宣传方式，针对不同群体分类普及政策内容。</small></article>
          <article><span>监督监管</span><p><b>强化、规范、巡查、整治、公开、监督、畅通举报</b></p><small>如：强化日常巡查，建立问题台账并及时整改。</small></article>
          <article><span>制度机制</span><p><b>建立、健全、完善、细化、明确、压实、形成</b></p><small>如：完善协同机制，明确部门职责和信息流转流程。</small></article>
          <article><span>人才队伍</span><p><b>引进、选拔、培养、培训、激励、保障、用好、留住</b></p><small>如：实施导师帮带和岗位实践，提升年轻干部业务能力。</small></article>
          <article><span>技术平台</span><p><b>建设、搭建、开发、推广、接入、整合、共享、更新</b></p><small>如：整合部门数据，搭建统一服务平台，实现信息共享。</small></article>
          <article><span>设施资源</span><p><b>建设、改造、增设、完善、维修、盘活、配置、统筹</b></p><small>如：盘活闲置场地，完善消防、排水和通风设施。</small></article>
          <article><span>服务流程</span><p><b>优化、简化、下沉、延伸、分类、预约、联办、反馈</b></p><small>如：优化办事流程，推动高频事项一次告知、协同办理。</small></article>
          <article><span>资金保障</span><p><b>加大投入、统筹资金、拓宽来源、设立专项、加强保障</b></p><small>资金写法必须符合材料和身份权限，不能随意编财政安排。</small></article>
        </div>

        <Topic label="从空到实" title="“加强管理”可以作为方向，但真正落笔要看材料能支持到哪一步" />
        <div className="core-action-depth">
          <article><span>太空</span><b>加强市场管理。</b><p>只有方向，没有对象和动作。</p></article>
          <article><span>可用</span><b>完善市场管理制度，规范摊位经营秩序。</b><p>已经有明确对象和动作。</p></article>
          <article><span>材料足够时</span><b>划定经营区域，明确准入条件，增派管理人员并畅通商户反馈渠道。</b><p>这些具体动作只有材料给出或能由题目身份、常识稳妥推出时再写。</p></article>
        </div>

        <Topic label="小题与作文" title="小题重准确，作文在准确基础上再追求观点和语言层次" />
        <div className="core-small-vs-essay">
          <article><span>小题</span><h5>少绕，直接采分</h5><p>“优化服务流程，推动部门协同办理，提高群众办事效率。”</p><small>对象、动作、效果清楚即可。</small></article>
          <article><span>作文 / 类作文</span><h5>可以适当提升表达</h5><p>“把制度优势转化为治理效能，让服务从‘能办’进一步走向‘好办’。”</p><small>可以使用对偶、递进、比喻、名言和案例，但观点仍要落回材料与主题。</small></article>
        </div>

        <Topic label="正式表达的边界" title="规范不等于官话，高端不等于大词" />
        <div className="core-boundary-list">
          <p><span>✓</span><b>准确：</b>“反馈渠道不畅”比“群众声音无法被时代听见”更适合小题。</p>
          <p><span>✓</span><b>具体：</b>“建立导师帮带制度”比“强化人才赋能”更容易对应材料。</p>
          <p><span>✓</span><b>有区分：</b>制度、设施、人才、服务、监管等点之间要能看出不同。</p>
          <p><span>×</span><b>慎用空词：</b>顶层设计、长效机制、形成合力、全面赋能等，如果材料没有支撑，不要为了显得高级而硬加。</p>
        </div>

        <Topic label="最后的训练方法" title="把五种能力放到同一道题里复盘，比单独背词更有效" strong />
        <div className="core-final-practice">
          <article><span>分析</span><p>材料每个部分、每句话对题干主体是什么要素？</p></article>
          <article><span>综合</span><p>这些要素最后按什么顺序写？哪些内容要放在一起？</p></article>
          <article><span>概括</span><p>哪些需要简写？简到哪个层级？哪些细节不能删？</p></article>
          <article><span>归纳</span><p>每组内容叫什么？是否直接回答题干？归纳层级是否一致？</p></article>
          <article><span>表达</span><p>有没有口语、空话、重复？动作、对象、效果是否清楚？</p></article>
        </div>
      </section>
    </div>
  );
}
