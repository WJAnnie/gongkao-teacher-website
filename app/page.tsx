'use client';

import { useState } from 'react';
import { MotionLayer } from './motion-layer';

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
];

const clips = [
  { time: '03:18', label: '课堂切片 01', quote: '“先别急着写对策，材料里的问题到底是谁的问题？”', topic: '申论｜对策题的主体意识' },
  { time: '05:42', label: '课堂切片 02', quote: '“你的例子没有错，只是它还没有为观点服务。”', topic: '面试｜例证如何不变成故事会' },
  { time: '04:06', label: '课堂切片 03', quote: '“自然一点，不是随便一点；是让逻辑长在自己的话里。”', topic: '面试｜摆脱模板化表达' },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('全部');
  const filters = ['全部', '申论素材', '真题拆解', '面试表达'];
  const visibleItems = activeFilter === '全部' ? libraryItems : libraryItems.filter((item) => item.type === activeFilter);

  return (
    <main>
      <MotionLayer />
      <nav className="nav-shell" aria-label="主导航">
        <a className="brand" href="#top" aria-label="答卷之外首页">
          <span className="brand-mark">答</span>
          <span>答卷之外</span>
        </a>
        <div className="nav-links">
          <a href="#library">内容档案</a>
          <a href="#clips">课堂切片</a>
          <a href="#about">关于我</a>
        </div>
        <a className="nav-cta" href="#contact">预约聊聊 <span>↗</span></a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit" aria-hidden="true"><span /></div>
        <p className="eyebrow"><span>01</span> 一位申论与面试老师的长期内容站</p>
        <h1>
          公考不是背<br />
          <span className="title-outline">标准答案</span>
        </h1>
        <div className="hero-bottom">
          <p className="hero-lead">它是练习如何<span>看见</span>、如何<span>拆解</span>，<br className="desktop-break" />以及如何把自己的判断说清楚。</p>
          <a className="round-link" href="#library" aria-label="向下浏览内容">
            <span>向下浏览</span>
            <b>↓</b>
          </a>
        </div>
        <div className="hero-note">
          <span className="note-line" />
          <p>素材积累 · 真题拆解 · 课堂实录 · 表达训练</p>
        </div>
      </section>

      <section className="manifesto">
        <div className="section-index">02 — 站点宣言</div>
        <p>不是答案仓库，<br />是一间持续生长的<span>思考练习室</span>。</p>
        <div className="manifesto-meta">
          <span>每周持续更新</span>
          <span>开放阅读</span>
          <span>2026 —</span>
        </div>
      </section>

      <div className="ticker" aria-label="内容方向">
        <div className="ticker-track">
          <span>素材积累</span><i>✦</i><span>真题拆解</span><i>✦</i><span>表达训练</span><i>✦</i><span>课堂实录</span><i>✦</i>
          <span>素材积累</span><i>✦</i><span>真题拆解</span><i>✦</i><span>表达训练</span><i>✦</i><span>课堂实录</span><i>✦</i>
        </div>
      </div>

      <section className="library" id="library">
        <header className="section-heading">
          <div>
            <p className="section-index light">03 — 最近更新</p>
            <h2>内容档案</h2>
          </div>
          <p>我把课堂上反复出现的问题，<br />整理成可以慢慢读、反复用的内容。</p>
        </header>

        <div className="filter-row" aria-label="筛选内容档案">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={activeFilter === filter ? 'active' : ''}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="library-list">
          {visibleItems.map((item) => (
            <article className={`library-card ${item.tone}`} key={item.no} data-reveal>
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
        <div className="library-foot">
          <p>更多笔记正在整理中</p>
          <span>把“知道”变成“会用”</span>
        </div>
      </section>

      <section className="clips" id="clips">
        <header className="section-heading dark-text">
          <div>
            <p className="section-index">04 — 课堂现场</p>
            <h2>上课，不只<br />给一个答案</h2>
          </div>
          <p>保留那些“突然想明白了”的瞬间。<br />真实课堂视频可在这里持续替换更新。</p>
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

      <section className="method">
        <div className="method-heading">
          <p className="section-index light">05 — 训练方法</p>
          <h2>从材料到表达，<br />把思考练成一条<span>稳定路径</span>。</h2>
        </div>
        <ol className="method-steps">
          <li data-reveal><b>01</b><div><h3>看见问题</h3><p>先识别材料中的主体、关系与矛盾，不被漂亮词句牵着走。</p></div></li>
          <li data-reveal><b>02</b><div><h3>形成判断</h3><p>把零散信息组织成自己的观点，知道为什么这样答。</p></div></li>
          <li data-reveal><b>03</b><div><h3>清楚表达</h3><p>让结构服务于内容，用自然、具体、有分寸的话说出来。</p></div></li>
          <li data-reveal><b>04</b><div><h3>复盘迁移</h3><p>不只改这一道题，更找到下一道题也能使用的方法。</p></div></li>
        </ol>
      </section>

      <section className="about" id="about">
        <div className="about-stamp" aria-hidden="true">
          <span>申论</span><b>×</b><span>面试</span>
        </div>
        <div className="about-copy">
          <p className="section-index">06 — 关于老师</p>
          <h2>比起“教你怎么答”，<br />我更在意你是否真的<span>想清楚</span>。</h2>
          <div className="about-columns">
            <p>这里是一位申论与面试老师的个人内容站。我会记录日常观察、课堂追问和真题拆解，也会分享那些不一定立刻提分，却能让表达更有底气的东西。</p>
            <p>真实姓名、教学经历、授课成果和个人照片，可以在你准备好素材后替换进来。网站不会用虚构履历替你建立信任。</p>
          </div>
          <div className="about-tags"><span>不押万能模板</span><span>重视真实表达</span><span>方法可以迁移</span></div>
        </div>
      </section>

      <section className="lead-magnet">
        <div className="lead-card">
          <p className="section-index">免费领取 · FREE DOWNLOAD</p>
          <h2>面试表达<br />自检清单</h2>
          <ul>
            <li>我的观点到底是什么？</li>
            <li>例子真的在为观点服务吗？</li>
            <li>这句话像我平时会说的话吗？</li>
          </ul>
          <a href="#contact">领取这份清单 <span>→</span></a>
        </div>
        <div className="lead-side">
          <span>12</span>
          <p>个高频表达问题<br />一张表完成自查</p>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-grid" aria-hidden="true" />
        <p className="section-index light">07 — KEEP IN TOUCH</p>
        <h2>想把一道题<br />真正<span>想明白</span>？</h2>
        <p className="contact-lead">添加微信，备注「网站 + 备考阶段」<br />领取资料，也可以聊聊你现在卡在哪里。</p>
        <div className="contact-box">
          <div className="qr-placeholder" aria-label="微信二维码占位区域">
            <div className="qr-pattern" aria-hidden="true" />
            <span>替换为你的<br />微信二维码</span>
          </div>
          <div className="contact-info">
            <span>WECHAT / 私域入口</span>
            <strong>你的微信号</strong>
            <p>建议网站上线前替换为真实微信号与二维码，完成引流闭环。</p>
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
