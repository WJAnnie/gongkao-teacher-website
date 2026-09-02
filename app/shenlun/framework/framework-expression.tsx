'use client';

import { useState } from 'react';

const auditSteps = [
  { key: 'range', no: '01', title: '范围', short: '去哪里找', text: '先看题目限定了哪一则、哪几则材料。看到“给定资料2”先别急着只看资料2，要把整句话读完：有些题会继续要求“结合全部给定资料”。' },
  { key: 'object', no: '02', title: '对象', short: '到底在说谁', text: '对象是这道题真正围绕的人、事、政策或现象。后面每一句材料都要回到这个对象上判断：对它来说，这句话到底在说什么？' },
  { key: 'element', no: '03', title: '问法（要素）', short: '究竟找什么', text: '题目问问题，就找问题；问成效，就找效果；问做法，就找措施。材料没有变，问法一变，你需要的要素就会跟着变。' },
  { key: 'requirement', no: '04', title: '要求', short: '答案怎么写', text: '全面、准确、有条理属于常规要求；观点明确、针对性可行性可操作性、格式正确等属于特殊要求。特殊要求会真正改变答案写法。' },
  { key: 'words', no: '05', title: '字数', short: '最后能写多少', text: '字数决定答案的“度”。200字和400字不是同一道写法。先估行数，再决定写几大点、每一点能保留多少材料细节。' },
] as const;

const materialViews = {
  action: {
    label: '如果题目问“主要做法”',
    answer: '上线线上服务平台，整合多个办理事项，实现一次提交、统一办理。',
    note: '盯住“做了什么”。办理时间变短属于效果，不要抢成做法的主角。',
  },
  effect: {
    label: '如果题目问“主要成效”',
    answer: '缩短办理时间，降低群众办事成本，减少投诉。',
    note: '盯住“取得了什么结果”。材料中的做法可以作为原因或过程，答案核心仍然是效果。',
  },
  problem: {
    label: '如果题目问“改革前的问题”',
    answer: '窗口分散、材料重复提交、办理耗时较长。',
    note: '题目把时间点拉回改革前，后面的改革措施和成效就不能直接当答案。',
  },
} as const;

type MaterialView = keyof typeof materialViews;

type LogicMode = 'parallel' | 'progressive' | 'parallelProgressive' | 'progressiveParallel';

const logicModes: Record<LogicMode, { label: string; kicker: string; title: string; desc: string }> = {
  parallel: {
    label: '简单并列',
    kicker: 'A · B · C 同一层',
    title: '几个点是平着放的',
    desc: '每个要点都回答同一种要素，层级也差不多。写问题，就都写问题；写做法，就都写做法。',
  },
  progressive: {
    label: '简单递进',
    kicker: 'A → B → C 有先后',
    title: '前一步推动后一步',
    desc: '做法带来直接效果，直接效果再带来更深层结果；或者先解释“是什么”，再分析“为什么”，最后落到“怎么办”。',
  },
  parallelProgressive: {
    label: '并列中带递进',
    kicker: '三条主线并列 · 每条内部递进',
    title: '大点平行，小点往前走',
    desc: '宣传、服务、监管三个大点互相并列；每个大点内部又可以按照“做法→直接效果→进一步效果”展开。',
  },
  progressiveParallel: {
    label: '递进中带并列',
    kicker: '大结构递进 · 每层内部并列',
    title: '先后关系里，再分几个方面',
    desc: '整篇答案按照“是什么→为什么→怎么办”递进；其中“为什么”内部可能同时有意义、问题、原因，“怎么办”内部又可以有制度、服务、监管。',
  },
};

function ExamGrid({ rows = 4 }: { rows?: number }) {
  return (
    <div className="expression-answer-grid" aria-hidden="true">
      {Array.from({ length: rows * 25 }).map((_, index) => <i key={index} />)}
    </div>
  );
}

function TeacherNote({ children }: { children: React.ReactNode }) {
  return <aside className="expression-teacher-note"><span>云帆老师批注</span><p>{children}</p></aside>;
}

export function FrameworkExpression() {
  const [audit, setAudit] = useState<(typeof auditSteps)[number]['key']>('range');
  const [materialView, setMaterialView] = useState<MaterialView>('action');
  const [logicMode, setLogicMode] = useState<LogicMode>('parallelProgressive');
  const activeAudit = auditSteps.find((item) => item.key === audit) ?? auditSteps[0];
  const activeMaterial = materialViews[materialView];
  const activeLogic = logicModes[logicMode];

  return (
    <div className="expression-course">
      <nav className="expression-course-index" aria-label="表达规则学习顺序">
        {[
          ['01', '认识申论', '#expression-know'],
          ['02', '认识答题卡', '#expression-sheet'],
          ['03', '学会审题', '#expression-audit'],
          ['04', '学会读材料', '#expression-read'],
          ['05', '从材料到答案', '#expression-transform'],
          ['06', '组织答案', '#expression-logic'],
          ['07', '完成一道题', '#expression-finish'],
        ].map(([no, label, href]) => <a href={href} key={href}><span>{no}</span><b>{label}</b><em>↘</em></a>)}
      </nav>

      <section className="expression-chapter expression-opening" id="expression-know">
        <div className="expression-chapter-head">
          <span>01</span>
          <h4>先别急着学技巧，<br />把申论这件事弄明白。</h4>
          <p>第一次接触申论，你可以先把它理解成一场材料处理考试：给你一组材料，再给你几个任务，你要在规定时间、规定字数和规定答题区域里，把材料整理成符合要求的答案。</p>
        </div>
        <div className="expression-rule-equation" aria-label="申论基础关系">
          <article><span>先看任务</span><b>题目</b><p>告诉你找什么</p></article>
          <i>→</i>
          <article><span>再找依据</span><b>材料</b><p>决定你有什么</p></article>
          <i>→</i>
          <article><span>最后组织</span><b>答案</b><p>看你怎么整理</p></article>
        </div>
        <TeacherNote>申论是主观题，但小题绝大多数时候没有你想象中那么“主观”。先看题目要什么，再看材料给什么。别一上来就想着“我有什么观点”。</TeacherNote>

        <div className="expression-subhead"><span>试卷结构</span><h5>一张申论卷，先看懂三个部分</h5></div>
        <div className="expression-three-cards">
          <article><span>01</span><h6>注意事项</h6><p>考试时间、填写方式、作答位置和需要特别注意的规则。真正上考场时，先花一点时间把它看完。</p></article>
          <article><span>02</span><h6>给定资料</h6><p>这是答案的原料。经济、政治、文化、社会、生态等内容都有可能出现，形式可能是政策、评论、案例或数据。</p></article>
          <article><span>03</span><h6>作答要求</h6><p>这是任务书。范围、对象、问法、要求、字数都藏在这里。做题的第一步，永远先看它。</p></article>
        </div>

        <div className="expression-exam-compare">
          <div className="expression-compare-intro">
            <span>2026</span>
            <h5>国考和江苏省考，先知道区别在哪</h5>
            <p>下面只写官方大纲能确认的内容。题量、材料数量会变化，备考时不要把“近年常见”当成永久规则。</p>
          </div>
          <div className="expression-compare-table" role="table" aria-label="国考与江苏省考申论对比">
            <div className="head"><b>项目</b><b>2026 国考</b><b>2026 江苏省考</b></div>
            <div><span>考试时间</span><strong>180 分钟</strong><strong>150 分钟</strong></div>
            <div><span>满分</span><strong>100 分</strong><strong>100 分</strong></div>
            <div><span>分类</span><strong>省级综合管理 / 市地综合管理 / 行政执法</strong><strong>A / B / C</strong></div>
            <div><span>能力侧重</span><strong>按职位类别分别考查阅读、分析、解决问题、执行与表达等能力</strong><strong>A偏综合管理，B突出依法办事与公共服务，C突出基层执行、群众工作与应用写作</strong></div>
          </div>
          <p className="expression-source-note">数据口径：2026年度国家公务员局公共科目笔试考试大纲、江苏省公务员局公共科目笔试考试大纲。具体安排始终以当年最新公告为准。</p>
        </div>
      </section>

      <section className="expression-chapter" id="expression-sheet">
        <div className="expression-chapter-head compact">
          <span>02</span>
          <h4>你最后面对的，<br />是一张有格子的答题卡。</h4>
          <p>很多同学学申论，只研究答案对不对，却很少想答案写不写得下。真正考试的时候，格子会逼着你做取舍。</p>
        </div>
        <div className="expression-sheet-stage">
          <div className="expression-sheet-paper">
            <div className="sheet-paper-head"><b>申 论 答 题 卡</b><span>示意图 · 以当年实际答题卡为准</span></div>
            <div className="sheet-paper-meta"><span>姓名 ________</span><span>准考证号 □□□□□□□□□□□□</span></div>
            <div className="sheet-question-label">第（一）题</div>
            <ExamGrid rows={5} />
            <div className="sheet-question-label">第（二）题</div>
            <ExamGrid rows={4} />
          </div>
          <div className="expression-sheet-rules">
            <article><span>一格一字</span><p>国考大纲明确要求一格一字，不得超出每道题目的字数限制。</p></article>
            <article><span>标点占格</span><p>训练时就把标点当成答案的一部分，别到了考场才发现字数和行数对不上。</p></article>
            <article><span>指定区域</span><p>江苏省考明确要求在答题卡指定位置作答，非指定位置作答无效。</p></article>
            <article><span>黑色字迹</span><p>申论作答使用黑色字迹的钢笔或签字笔；准考证号等填涂按当年注意事项执行。</p></article>
          </div>
        </div>

        <div className="expression-grid-math">
          <div><span>200字</span><b>≈ 8 行</b><small>按一行25格训练估算</small></div>
          <div><span>300字</span><b>≈ 12 行</b><small>先估行数，再分配要点</small></div>
          <div><span>400字</span><b>≈ 16 行</b><small>具体格数以当年答题卡为准</small></div>
          <article><b>200字准备写5个点？</b><p>平均一个点大约40字，只有1.6行左右。现在再看看你材料里勾出来的十几句话——是不是该开始删、缩、并了？</p></article>
        </div>
        <TeacherNote>字数不是最后才看的限制条件。它从你开始勾材料的那一刻，就在决定“哪些内容值得留下”。</TeacherNote>
      </section>

      <section className="expression-chapter" id="expression-audit">
        <div className="expression-chapter-head compact">
          <span>03</span>
          <h4>真正做题的第一步：<br />审题五看。</h4>
          <p>我建议固定成五个动作：范围、对象、问法（要素）、要求、字数。每一道题先过这五关，再进去读材料。</p>
        </div>
        <div className="expression-question-demo">
          <span>训练示例</span>
          <p>根据“给定资料2”，概括A市在推进基层治理过程中取得的主要成效。</p>
          <small>要求：全面、准确、有条理，不超过200字。</small>
        </div>
        <div className="expression-audit-tool">
          <div className="expression-audit-tabs">
            {auditSteps.map((item) => <button className={audit === item.key ? 'active' : ''} key={item.key} onClick={() => setAudit(item.key)}><span>{item.no}</span><b>{item.title}</b><small>{item.short}</small></button>)}
          </div>
          <div className="expression-audit-answer">
            <span>{activeAudit.no}</span>
            <h5>{activeAudit.title}</h5>
            <p>{activeAudit.text}</p>
          </div>
        </div>
        <div className="expression-elements">
          {['现状', '问题', '原因', '意义', '做法', '目的', '背景'].map((item) => <span key={item}>{item}</span>)}
          <p>入门阶段先认这七类就够。别急着背定义，真正要练的是：<b>结合对象，判断这句话在当前题目里算什么。</b></p>
        </div>
        <TeacherNote>题目问“成效”，你最后写了一页“做法”，这种失分最可惜。材料可能看懂了，题没看懂。</TeacherNote>
      </section>

      <section className="expression-chapter" id="expression-read">
        <div className="expression-chapter-head compact">
          <span>04</span>
          <h4>材料别一句一句抄，<br />先看它在干什么。</h4>
          <p>读材料时先看一段、几段之间的关系，再看每一句。核心问题一直只有一个：对题目所问的对象来说，这一段到底在说什么？</p>
        </div>

        <div className="expression-material-lab">
          <div className="expression-material-source">
            <span>同一段材料</span>
            <p>某社区过去居民办事要往返多个窗口，同一份材料经常重复提交。后来社区上线线上服务平台，将多个事项统一办理，群众提交一次材料即可完成申请。平台上线后，平均办理时间由3天缩短至半天，群众投诉量明显下降。</p>
          </div>
          <div className="expression-material-switch">
            <div>
              {(Object.keys(materialViews) as MaterialView[]).map((key) => <button key={key} className={materialView === key ? 'active' : ''} onClick={() => setMaterialView(key)}>{materialViews[key].label}</button>)}
            </div>
            <article>
              <span>现在该找什么</span>
              <h5>{activeMaterial.answer}</h5>
              <p>{activeMaterial.note}</p>
            </article>
          </div>
        </div>
        <TeacherNote>材料没有换。题目一换，答案就换。以后读每一句材料，都把它放回“对象 + 要素”里判断。</TeacherNote>

        <div className="expression-subhead"><span>材料类型</span><h5>四类材料，处理方式不完全一样</h5></div>
        <div className="expression-material-types">
          <article><span>01</span><h6>理论型</h6><p>政策、讲话、宏观观点。经常负责点主题、定方向，作文和理解主题时尤其重要。</p><small>先理解方向，不要整段照搬。</small></article>
          <article><span>02</span><h6>评论型</h6><p>专家、群众、媒体直接评价。问题、意义、原因、对策往往说得比较直白。</p><small>这类材料通常更“好抄”。</small></article>
          <article><span>03</span><h6>案例型</h6><p>讲一个人、一个地方、一家公司怎么做。答案常常藏在故事背后的工作方式和道理里。</p><small>删掉故事，留下本质。</small></article>
          <article><span>04</span><h6>数据型</h6><p>用数字展示变化。重点不是把数字搬上去，而是看它反映了高低、快慢、多少、升降还是差距。</p><small>先问：这个数字证明什么？</small></article>
        </div>

        <details className="expression-more-example">
          <summary>再看一个案例型材料怎么转译 <span>＋</span></summary>
          <div>
            <p><b>材料：</b>老李每天骑车巡查河道，发现排污后立即拍照上传平台，环保、城管等部门收到信息后共同赶到现场处理。</p>
            <p><b>写得太小：</b>老李每天骑车巡河，发现后拍照上传。</p>
            <p><b>更合适：</b><strong>完善巡查和部门联动机制。</strong>加强日常巡查，及时上传问题线索，推动多部门协同处置。</p>
            <em>故事里的“老李”可以走，背后的工作方式要留下。</em>
          </div>
        </details>
      </section>

      <section className="expression-chapter" id="expression-transform">
        <div className="expression-chapter-head compact">
          <span>05</span>
          <h4>找到内容以后，<br />还没到往答题卡上写的时候。</h4>
          <p>材料变成答案，中间至少要经过五个动作。你会发现，很多“答案不漂亮”的问题，其实是在这一步就已经出现了。</p>
        </div>
        <div className="expression-transform-flow">
          {[
            ['01', '筛选', '是不是题目要的？'],
            ['02', '概括', '长内容能不能变短？'],
            ['03', '归纳', '相近内容能不能再合？'],
            ['04', '控层级', '写大了还是写细了？'],
            ['05', '排顺序', '谁先谁后，什么关系？'],
          ].map(([no, title, text], index) => <article key={title}><span>{no}</span><h6>{title}</h6><p>{text}</p>{index < 4 && <i>→</i>}</article>)}
        </div>

        <div className="expression-level-demo">
          <div className="expression-level-intro"><span>答案的“度”</span><h5>真正要练的，是中观表达</h5><p>写得太大，什么都说了，等于没有区分度；写得太细，材料搬了一大串，格子很快就不够。</p></div>
          <div className="expression-levels">
            <article><span>宏观</span><b>加强基层治理。</b><p>太大。可以当方向，但很难直接体现材料里的具体得分信息。</p></article>
            <article className="recommended"><span>中观 ✓</span><b>完善社区走访和群众沟通机制。</b><p>既能概括材料，又保留了足够的信息量。这个程度通常最值得练。</p></article>
            <article><span>微观</span><b>安排工作人员每天逐户走访居民，并建立微信群……</b><p>可能没错，但细节太多。字数一紧，很容易写不下。</p></article>
          </div>
        </div>

        <div className="expression-merge-demo">
          <span>同义合并</span>
          <div className="before"><p>设立服务热线</p><p>建立群众反馈邮箱</p><p>开发网上留言平台</p></div>
          <i>→</i>
          <div className="after"><b>畅通群众反馈渠道。</b><p>通过热线、邮箱和网络平台收集意见。</p></div>
        </div>
        <TeacherNote>归纳词写完以后，问自己三遍：它直接回答题目了吗？是不是大到把别的点也包进来了？它能不能完整罩住后面的具体内容？</TeacherNote>
      </section>

      <section className="expression-chapter" id="expression-logic">
        <div className="expression-chapter-head compact">
          <span>06</span>
          <h4>找到要点只是第一步，<br />还要把关系写出来。</h4>
          <p>“有条理”不等于前面加上1、2、3。真正的条理，是同一层级放在一起，有先后关系的按先后组织。</p>
        </div>
        <div className="expression-logic-tabs">
          {(Object.keys(logicModes) as LogicMode[]).map((key) => <button key={key} className={logicMode === key ? 'active' : ''} onClick={() => setLogicMode(key)}><span>{logicModes[key].kicker}</span><b>{logicModes[key].label}</b></button>)}
        </div>
        <div className="expression-logic-stage">
          <div className="expression-logic-copy"><span>{activeLogic.label}</span><h5>{activeLogic.title}</h5><p>{activeLogic.desc}</p></div>

          {logicMode === 'parallel' && <div className="logic-visual parallel"><article><b>设施不足</b><p>设备老旧、空间不足</p></article><article><b>管理薄弱</b><p>人员不足、巡查不及时</p></article><article><b>参与不足</b><p>反馈渠道少、自治弱</p></article></div>}
          {logicMode === 'progressive' && <div className="logic-visual progressive"><article><b>建立线上平台</b></article><i>↓</i><article><b>简化办理流程</b></article><i>↓</i><article><b>缩短办事时间</b></article><i>↓</i><article><b>提高群众满意度</b></article></div>}
          {logicMode === 'parallelProgressive' && <div className="logic-visual pp">
            <article><b>宣传</b><p>多样宣传</p><i>→</i><p>提高知晓</p><i>→</i><p>主动参与</p></article>
            <article><b>服务</b><p>简化流程</p><i>→</i><p>提高效率</p><i>→</i><p>群众满意</p></article>
            <article><b>监管</b><p>建立巡查</p><i>→</i><p>及时发现</p><i>→</i><p>减少违规</p></article>
          </div>}
          {logicMode === 'progressiveParallel' && <div className="logic-visual progressive-tree">
            <article><b>是什么</b><p>解释概念 · 提出观点</p></article><i>↓</i>
            <article><b>为什么</b><div><span>意义</span><span>问题</span><span>原因</span></div></article><i>↓</i>
            <article><b>怎么办</b><div><span>制度</span><span>服务</span><span>监管</span></div></article>
          </div>}
        </div>
        <TeacherNote>并列和递进不用背成两个“高级词”。你只要能看出材料里谁和谁是一层、谁先谁后，就已经会用了。</TeacherNote>
      </section>

      <section className="expression-chapter expression-finish" id="expression-finish">
        <div className="expression-chapter-head compact">
          <span>07</span>
          <h4>最后，把前面的东西<br />真的用在一道题上。</h4>
          <p>我上课更希望你形成一套稳定动作。看见一道题，不靠感觉冲进去读，而是知道自己现在处在哪一步。</p>
        </div>

        <div className="expression-three-readings">
          <article><span>第一遍 / 扫读</span><h6>先看材料怎么分部分</h6><p>哪几个自然段在讲一件事？大概是问题、做法还是成效？先用“/”把骨架切出来。</p><small>这一遍不用抠每一个词。</small></article>
          <article><span>第二遍 / 精读</span><h6>根据对象和要素找答案</h6><p>仔细判断每句话对题目所问对象来说在讲什么。案例、口语表达、特别细的内容，顺手在旁边做总结。</p><small>该画的画，该标的标。</small></article>
          <article><span>第三遍 / 整理</span><h6>决定答案最终长什么样</h6><p>哪些能合并？哪些太细？是并列还是递进？每个点几行？肉眼补行以后，再开始正式落笔。</p><small>别边读材料边往答题卡搬。</small></article>
        </div>

        <div className="expression-final-case">
          <div className="case-question">
            <span>完整训练示例</span>
            <h5>根据以下材料，概括某社区提升群众办事体验的主要做法和成效。不超过200字。</h5>
            <p>社区过去设置多个业务窗口，群众办理不同事项需要反复排队、重复提交材料。为解决这一问题，社区整合高频事项，建设线上综合服务平台，安排专人提供咨询和帮办服务，并根据群众反馈持续优化流程。改革后，平均办理时间明显缩短，群众重复提交材料的情况大幅减少，投诉量下降。</p>
          </div>
          <div className="case-process">
            <span>审题</span><p><b>范围：</b>本段材料　<b>对象：</b>社区提升群众办事体验　<b>问法：</b>做法＋成效　<b>要求：</b>概括　<b>字数：</b>200字</p>
            <span>整理</span><p><b>做法：</b>整合事项 / 建平台 / 咨询帮办 / 根据反馈优化流程　　<b>成效：</b>缩时 / 减少重复提交 / 降低投诉</p>
            <span>答案</span><p className="case-answer">一、优化办事流程。整合高频事项，建设线上综合服务平台，提供咨询和帮办服务，并根据群众反馈持续优化流程。二、提升服务成效。缩短平均办理时间，减少材料重复提交，降低群众投诉，改善办事体验。</p>
          </div>
          <div className="case-marks"><span>要素完整 ✓</span><span>层级适中 ✓</span><span>做法与成效分开 ✓</span><span>字数有余量 ✓</span></div>
        </div>

        <div className="expression-ending-quote">
          <span>云帆老师 / 申论第一课</span>
          <p>理论的掌握能够提高学习的下限，理解能力的掌握决定申论的上限。</p>
          <b>先把材料看明白，再考虑怎么把答案写漂亮。</b>
        </div>
      </section>

      <div className="expression-references">
        <span>资料说明</span>
        <p>课程框架主要依据云帆老师授课体系与课堂笔记整理；考试时间、试卷组成、分类及作答规则参考2026年度国家公务员局、江苏省公务员局公开考试大纲。页面中的短材料均为教学示例，用于解释方法，不对应具体真题。</p>
        <div><a href="https://www.forestry.gov.cn/c/www/gsgg/645383.jhtml" target="_blank" rel="noreferrer">2026国考公共科目笔试考试大纲 ↗</a><a href="https://www.jszzb.gov.cn/tzgg/art/2025/art_4b4f6c1ef283b21741ec26bc3c0ecc30.html" target="_blank" rel="noreferrer">2026江苏省考公共科目笔试考试大纲 ↗</a></div>
      </div>
    </div>
  );
}
