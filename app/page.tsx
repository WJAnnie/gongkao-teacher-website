import { MotionLayer } from './motion-layer';
import { SubjectGateway } from './subject-gateway';

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
          <a href="#study">学习入口</a>
          <a href="#about">关于我</a>
        </div>
        <a className="nav-cta" href="#contact">资料与联系 <span>↗</span></a>
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
            <p className="hero-lead">
              这里既有<span>真题</span>、<span>方法</span>和<span>积累</span>，<br className="desktop-break" />
              也保留课堂与日常里的真实思考。
            </p>
            <a className="round-link" href="#study" aria-label="进入学习入口">
              <span>开始学习</span>
              <b>↓</b>
            </a>
          </div>

          <div className="hero-note">
            <span className="note-line" />
            <p>申论学习 · 面试学习 · 方法框架 · 真题训练 · 写作积累 · 课程现场</p>
          </div>
        </section>
      </div>

      <section className="learning-entry-section" id="study">
        <div className="learning-entry-head">
          <div>
            <p className="section-index">02 — LEARNING MAP</p>
            <h2>先选方向，<br /><span>再往深处学。</span></h2>
          </div>
          <p>一级目录保持克制。<br />鼠标移入申论或面试，二级目录会自动展开。</p>
        </div>
        <SubjectGateway />
      </section>

      <section className="about" id="about">
        <div className="about-stamp" aria-hidden="true">
          <span>申论</span><b>×</b><span>面试</span>
        </div>
        <div className="about-copy">
          <p className="section-index">03 — 关于老师</p>
          <h2>比起“教你怎么答”，<br />我更在意你是否真的<span>想清楚</span>。</h2>
          <div className="about-columns">
            <p>这里是一位申论与结构化面试老师的个人学习站。课堂里反复出现的问题、真题拆解、表达方法和日常观察，会慢慢整理成可以长期使用的内容。</p>
            <p>比起记住更多标准话术，我更希望你先看清题目到底在问什么，从材料里找到依据，再用自己的语言把答案写清楚、说清楚。</p>
          </div>
          <div className="about-tags">
            <span>申论方法</span><span>结构化面试</span><span>真题训练</span><span>真实表达</span>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-grid" aria-hidden="true" />
        <p className="section-index">04 — KEEP IN TOUCH</p>
        <h2>资料与联系，<br />放在<span>这里</span>。</h2>
        <p className="contact-lead">这里作为你的二维码、资料领取和课程入口。<br />等你提供真实二维码后，直接替换即可。</p>
        <div className="contact-box">
          <div className="qr-placeholder" aria-label="二维码预留区域">
            <div className="qr-pattern" aria-hidden="true" />
            <span>替换为你的<br />真实二维码</span>
          </div>
          <div className="contact-info">
            <span>PRIVATE / 资料与联系入口</span>
            <strong>答卷之外</strong>
            <p>可用于资料领取、课程咨询、课堂与日常内容分享。二维码和具体联系方式暂不虚构，后续按你的真实信息替换。</p>
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
