import { MotionLayer } from './motion-layer';
import { StudyHub } from './study-hub';

const starterItems = [
  {
    no: '01',
    title: '刚开始备考',
    desc: '先弄清申论试卷结构和面试考查方式，再建立训练节奏，不急着把所有资料囤满。',
    meta: '考试地图 · 备考节奏',
  },
  {
    no: '02',
    title: '申论总在原地打转',
    desc: '从材料阅读、要点提取、结构组织到文字表达，逐层找出真正卡住你的那一步。',
    meta: '阅读 · 归纳 · 作文',
  },
  {
    no: '03',
    title: '面试一开口就模板化',
    desc: '先训练判断和结构，再练表达。不是背更多句子，而是让答案真正属于你自己。',
    meta: '审题 · 观点 · 表达',
  },
  {
    no: '04',
    title: '想直接开始刷题',
    desc: '进入学习中心，按年份、考试、题型和主题筛选申论与面试题，也可以随机抽题限时练习。',
    meta: '真题索引 · 专项练习 · 计时',
  },
];

const libraryItems = [
  {
    no: 'A/01',
    type: '申论素材',
    title: '“城市更新”不只是在旧墙上刷一层新漆',
    desc: '从菜市场改造、老旧小区加装电梯，看公共治理如何回应真实生活。',
    tags: ['基层治理', '民生温度'],
    tone: 'lime',
  },
  {
    no: 'A/02',
    type: '真题拆解',
    title: '材料读了三遍，为什么还是找不到采分点？',
    desc: '不是圈词越多越好。试试用“主体—动作—结果”重建材料骨架。',
    tags: ['阅读方法', '归纳概括'],
    tone: 'paper',
  },
  {
    no: 'A/03',
    type: '面试表达',
    title: '答题像背稿，往往不是表达问题',
    desc: '先有判断，再有结构，最后才是语言。把“我认为”变成有依据的观点。',
    tags: ['结构化面试', '表达训练'],
    tone: 'orange',
  },
  {
    no: 'A/04',
    type: '申论方法',
    title: '概括题不是“抄材料”，而是重新给信息分组',
    desc: '同一段材料里可能同时有问题、原因和效果。学会按题目任务重新组织，而不是照原文顺序搬运。',
    tags: ['要点提取', '分类归纳'],
    tone: 'paper',
  },
  {
    no: 'A/05',
    type: '面试方法',
    title: '综合分析题，第一句话到底该说什么？',
    desc: '不抢着套“辩证看待”。先明确对象、矛盾和价值判断，让开头直接承担答题任务。',
    tags: ['综合分析', '观点建立'],
    tone: 'lime',
  },
  {
    no: 'A/06',
    type: '备考复盘',
    title: '刷了很多题却没进步，可能只是少了一张复盘表',
    desc: '记录错在哪里、为什么错、下次怎么识别，让每一道题都给下一道题留下方法。',
    tags: ['错题复盘', '备考计划'],
    tone: 'orange',
  },
];

const clips = [
  { time: '03:18', label: '课堂切片 01', quote: '“先别急着写对策，材料里的问题到底是谁的问题？”', topic: '申论｜对策题的主体意识' },
  { time: '05:42', label: '课堂切片 02', quote: '“你的例子没有错，只是它还没有为观点服务。”', topic: '面试｜例证如何不变成故事会' },
  { time: '04:06', label: '课堂切片 03', quote: '“自然一点，不是随便一点；是让逻辑长在自己的话里。”', topic: '面试｜摆脱模板化表达' },
];

const methodSteps = [
  { no: '01', title: '看见问题', key: 'SEE', desc: '先识别材料中的主体、关系与矛盾，不被漂亮词句牵着走。' },
  { no: '02', title: '形成判断', key: 'THINK', desc: '把零散信息组织成自己的观点，知道为什么这样答。' },
  { no: '03', title: '清楚表达', key: 'SPEAK', desc: '让结构服务于内容，用自然、具体、有分寸的话说出来。' },
  { no: '04', title: '复盘迁移', key: 'GROW', desc: '不只改这一道题，更找到下一道题也能使用的方法。' },
];

const topicMap = [
  ['政策理论', '政策理解、理论表述、规范词汇'],
  ['基层治理', '社区治理、乡村振兴、公共服务'],
  ['经济发展', '营商环境、新质生产力、就业创业'],
  ['文化建设', '文化传承、公共文化、文旅融合'],
  ['社会民生', '教育、医疗、养老、青年发展'],
  ['生态文明', '绿色发展、环境治理、低碳转型'],
];

const tickerItems = ['申论真题', '面试真题', '专项练习', '方法资料', '热点素材', '答题计时', '复盘记录'];

export default function Home() {
  return (
    <main>
      <MotionLayer />
      <nav className="nav-shell" aria-label="主导航">
        <a className="brand" href="#top" aria-label="答卷之外首页">
          <span className="brand-mark">答</span>
          <span>答卷之外</span>
        </a>
        <div className="nav-links">
          <a href="#start">从哪开始</a>
          <a href="#study">学习中心</a>
          <a href="#library">内容档案</a>
          <a href="#about">关于我</a>
        </div>
        <a className="nav-cta" href="#contact">预约聊聊 <span>↗</span></a>
      </nav>

      <div className="hero-scroll">
        <section className="hero" id="top">
          <div className="pointer-glow hero-pointer-glow" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orbit" aria-hidden="true"><span /></div>
          <p className="eyebrow"><span>01</span> 专注申论与结构化面试的长期学习站</p>
          <h1>
            公考不是背<br />
            <span className="title-outline">标准答案</span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-lead">这里既有<span>真题</span>、<span>方法</span>和<span>素材</span>，<br className="desktop-break" />也有能让你真正练起来的训练工具。</p>
            <a className="round-link" href="#study" aria-label="进入学习中心">
              <span>开始学习</span>
              <b>↓</b>
            </a>
          </div>
          <div className="hero-note">
            <span className="note-line" />
            <p>真题题库 · 专项练习 · 学习资料 · 热点素材 · 训练工具</p>
          </div>
        </section>
      </div>

      <section className="manifesto" id="manifesto">
        <div className="pointer-glow manifesto-pointer-glow" aria-hidden="true" />
        <div className="manifesto-orbit" aria-hidden="true"><i /><span /></div>
        <div className="section-index">02 — 站点宣言</div>
        <p>不是资料堆积场，<br />是一套能反复使用的<span>学习系统</span>。</p>
        <div className="manifesto-meta">
          <span>申论 × 结构化面试</span>
          <span>学方法 → 做真题 → 限时练 → 复盘</span>
          <span>2026 — 持续更新</span>
        </div>
      </section>

      <section className="start-here" id="start">
        <header className="section-heading dark-text">
          <div>
            <p className="section-index">03 — START HERE</p>
            <h2>你现在卡在哪？</h2>
          </div>
          <p>不必从第一页按顺序读。<br />先从你眼下最真实的问题开始。</p>
        </header>
        <div className="starter-grid">
          {starterItems.map((item) => (
            <article className="starter-item" key={item.no} data-reveal>
              <span>{item.no}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <small>{item.meta}</small>
            </article>
          ))}
        </div>
        <div className="starter-note">
          <strong>推荐使用顺序</strong>
          <p>先用资料库建立方法框架 → 到题库按题型专项练 → 用计时器还原考场压力 → 写完或答完立即自检 → 把结果存进练习记录。网站会围绕这条闭环持续补内容。</p>
        </div>
      </section>

      <div className="ticker" aria-label="内容方向">
        <div className="ticker-track" aria-hidden="true">
          {[0, 1].map((group) => (
            <div className="ticker-group" key={group}>
              {[0, 1, 2].map((repeat) => tickerItems.map((item) => (
                <span className="ticker-pair" key={`${repeat}-${item}`}>
                  <span>{item}</span><i>✦</i>
                </span>
              )))}
            </div>
          ))}
        </div>
      </div>

      <StudyHub />

      <section className="library-scroll" id="library">
        <div className="library-sticky">
          <header className="section-heading library-heading">
            <div>
              <p className="section-index">05 — 深度内容</p>
              <h2>内容档案</h2>
            </div>
            <p>学习中心解决“练什么”，这里继续回答“为什么”。<br />把课堂里反复出现的问题写成长期文章。</p>
          </header>

          <div className="library-track">
            {libraryItems.map((item) => (
              <article className={`library-card ${item.tone}`} key={item.no}>
                <div className="card-top">
                  <span>{item.no}</span>
                  <span>{item.type}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="card-bottom">
                  <div>{item.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
                  <span className="arrow" aria-hidden="true">↗</span>
                </div>
              </article>
            ))}
          </div>
          <div className="library-scrollbar" aria-hidden="true"><span /></div>
        </div>
      </section>

      <section className="clips" id="clips">
        <div className="clips-orbit" aria-hidden="true"><i /></div>
        <header className="section-heading dark-text">
          <div>
            <p className="section-index">06 — 课堂现场</p>
            <h2>上课，不只<br />给一个答案</h2>
          </div>
          <p>保留那些“突然想明白了”的瞬间。<br />以后可以持续替换成真实课堂片段与讲题录音。</p>
        </header>

        <div className="clip-grid">
          {clips.map((clip, index) => (
            <article className="clip-card" key={clip.label} data-reveal>
              <div className="clip-visual">
                <span className="clip-number">0{index + 1}</span>
                <span className="clip-play" aria-label="视频位置预留">▶</span>
                <span className="clip-time">{clip.time}</span>
                <div className="clip-wave" aria-hidden="true">
                  {Array.from({ length: 18 }).map((_, i) => <i key={i} />)}
                </div>
              </div>
              <div className="clip-copy">
                <p>{clip.label}</p>
                <blockquote>{clip.quote}</blockquote>
                <span>{clip.topic}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="method-story" data-active="0">
        <div className="method-sticky">
          <div className="method-heading">
            <p className="section-index">07 — 同一条思考路径</p>
            <h2>从材料到表达，<br />让思考在滚动中<span>逐步成形</span>。</h2>
            <p className="method-hint">继续向下，右侧内容会在同一位置切换。</p>
          </div>
          <div className="story-console">
            <div className="story-visual" aria-hidden="true">
              <i /><i /><i />
              <span className="story-core" />
            </div>
            <div className="story-copy-list">
              {methodSteps.map((step) => (
                <article className="story-copy" key={step.no}>
                  <span>{step.no} / {step.key}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </article>
              ))}
            </div>
            <div className="story-rail" aria-label="训练路径进度">
              {methodSteps.map((step) => <span key={step.no}>{step.no}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="topic-map">
        <header className="section-heading dark-text">
          <div>
            <p className="section-index">08 — 素材地图</p>
            <h2>素材，不按金句收藏</h2>
          </div>
          <p>按公共议题建立自己的知识坐标。<br />同一份素材，能服务申论，也能进入面试表达。</p>
        </header>
        <div className="topic-list">
          {topicMap.map(([title, desc], index) => (
            <article key={title} data-reveal>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
        <p className="topic-footnote">素材更新原则：优先记录能解释现实问题的事实、政策与案例，而不是只收藏一句“看起来很高级”的话。后续会增加每日晨读、热点专题和申面共用案例卡。</p>
      </section>

      <section className="about" id="about">
        <div className="about-stamp" aria-hidden="true">
          <span>申论</span><b>×</b><span>面试</span>
        </div>
        <div className="about-copy">
          <p className="section-index">09 — 关于老师</p>
          <h2>比起“教你怎么答”，<br />我更在意你是否真的<span>想清楚</span>。</h2>
          <div className="about-columns">
            <p>这里是一位申论与面试老师的个人学习站。我会把日常观察、课堂追问、历年真题、题型方法、热点素材和备考复盘持续整理进来，让网站不只是介绍我，而是真的能陪你练习。</p>
            <p>网站只专注申论与结构化面试，不扩张成全科公考站。真题区以题意摘要和训练索引为主，完整材料会优先采用公开、合法或自行整理的来源；原创专项题则用于补足真题覆盖不到的训练场景。</p>
          </div>
          <div className="about-tags"><span>真题驱动</span><span>不押万能模板</span><span>重视真实表达</span><span>工具服务训练</span></div>
        </div>
      </section>

      <section className="lead-magnet">
        <div className="lead-card">
          <p className="section-index">免费领取 · FREE DOWNLOAD</p>
          <h2>申面训练<br />自检清单</h2>
          <ul>
            <li>我真正回答了题目任务吗？</li>
            <li>每一层内容都有清楚的逻辑吗？</li>
            <li>材料、例子和政策都在为观点服务吗？</li>
            <li>有没有可以删掉的正确废话？</li>
            <li>这次错误，下次怎么更早识别？</li>
          </ul>
          <a href="#study">先在线练一题 <span>→</span></a>
        </div>
        <div className="lead-side">
          <span>2</span>
          <p>门主科持续深挖<br />申论 × 结构化面试</p>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-grid" aria-hidden="true" />
        <p className="section-index light">10 — KEEP IN TOUCH</p>
        <h2>想把一道题<br />真正<span>想明白</span>？</h2>
        <p className="contact-lead">添加微信，备注「网站 + 备考阶段」<br />领取资料，也可以说说你现在最卡的一类题。</p>
        <div className="contact-box">
          <div className="qr-placeholder" aria-label="微信二维码占位区域">
            <div className="qr-pattern" aria-hidden="true" />
            <span>替换为你的<br />微信二维码</span>
          </div>
          <div className="contact-info">
            <span>WECHAT / 私域入口</span>
            <strong>你的微信号</strong>
            <p>建议上线前替换为真实微信号、二维码，并明确资料领取方式。学习站本身保持开放阅读，联系方式只承担答疑和资料入口。</p>
          </div>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark">答</span><span>答卷之外</span></a>
        <p>愿你不只上岸，也拥有看清问题的能力。</p>
        <a href="#top">返回顶部 ↑</a>
      </footer>
    </main>
  );
}
