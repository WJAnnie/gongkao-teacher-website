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
          </div>

          <div className="hero-directory-slot" id="study">
            <SubjectGateway />
          </div>

          <div className="hero-note">
            <span className="note-line" />
            <p>申论 · 面试 · 方法 · 真题 · 积累 · 课堂</p>
          </div>
        </section>
      </div>

      <section className="about" id="about">
        <div className="about-stamp" aria-hidden="true">
          <span>申论</span><b>×</b><span>面试</span>
        </div>
        <div className="about-copy">
          <p className="section-index">02 — 关于老师</p>
          <h2>比起“教你怎么答”，<br />我更在意你是否真的<span>想清楚</span>。</h2>
          <div className="about-columns">
            <p>这里是一位申论与结构化面试老师的个人学习站。课堂里反复出现的问题、真题拆解、表达方法和日常观察，会慢慢沉淀成可以长期使用的内容。</p>
            <p>比起记住更多标准话术，我更希望你先看清题目到底在问什么，从材料里找到依据，再用自己的语言把答案写清楚、说清楚。</p>
          </div>
          <div className="about-tags">
            <span>申论方法</span><span>结构化面试</span><span>真题训练</span><span>真实表达</span>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-grid" aria-hidden="true" />
        <p className="section-index">03 — KEEP IN TOUCH</p>
        <h2>资料、课程，<br />还有<span>日常分享</span>。</h2>
        <p className="contact-lead">把学习资料、课程信息和日常内容放在同一个入口里。</p>
        <div className="contact-box">
          <div className="qr-placeholder" aria-label="二维码区域">
            <div className="qr-pattern" aria-hidden="true" />
            <span>QR</span>
          </div>
          <div className="contact-info">
            <span>PRIVATE / 资料与联系</span>
            <h3>答卷之外</h3>
            <p>申论方法 · 结构化面试 · 真题训练 · 课程现场</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>答卷之外 · 申论 × 结构化面试</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
