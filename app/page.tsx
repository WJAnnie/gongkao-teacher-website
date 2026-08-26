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
          <div className="hero-orbit" aria-hidden="true">
            <span />
            <div className="hero-orbit-review">
              <b>阅</b>
              <small>REVIEW<br />审题 · 找点 · 表达 · 复盘</small>
            </div>
          </div>

          <p className="eyebrow"><span>01</span> 专注申论与结构化面试的长期学习站</p>
          <h1>
            公考不是背<br />
            <span className="title-outline">标准答案</span>
          </h1>

          <div className="hero-bottom">
            <p className="hero-lead">
              <span>真题</span>、<span>方法</span>、<span>积累</span>，<br className="desktop-break" />
              还有课堂里反复讲过的那些细节。
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

      <section className="about about-merged" id="about">
        <div className="about-stamp" aria-hidden="true">
          <span>申论</span><b>×</b><span>面试</span>
        </div>

        <div className="about-copy">
          <p className="section-index">02 — ABOUT / 关于我</p>
          <div className="about-merged-grid">
            <div className="about-profile">
              <h2>把题目看明白，<br />把自己的答案<span>说清楚</span>。</h2>
              <div className="about-columns">
                <p>课堂里反复出现的问题、真题拆解、表达方法和日常观察，我会一点点整理到这里。</p>
                <p>读题、找依据、搭结构、写下来、说出来。每一步都尽量讲得具体，也方便你回头复习。</p>
              </div>
              <div className="about-tags">
                <span>申论方法</span><span>结构化面试</span><span>真题训练</span><span>真实表达</span>
              </div>
            </div>

            <aside className="about-contact-card" id="contact">
              <div className="about-contact-head">
                <span>CONTACT / 联系</span>
                <b>资料 · 课程 · 日常</b>
              </div>
              <div className="about-contact-body">
                <div className="qr-placeholder" aria-label="二维码区域">
                  <div className="qr-pattern" aria-hidden="true" />
                  <span>QR</span>
                </div>
                <div className="contact-info">
                  <span>答卷之外</span>
                  <h3>资料与联系</h3>
                  <p>申论方法 · 结构化面试 · 真题训练 · 课程现场</p>
                </div>
              </div>
            </aside>
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
