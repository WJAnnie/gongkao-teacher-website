import { SubjectGateway } from './subject-gateway';

export default function Home() {
  return (
    <main className="portal-home">
      <section className="portal-stage" id="top">
        <div className="portal-grid" aria-hidden="true" />
        <div className="portal-orbit portal-orbit-one" aria-hidden="true" />
        <div className="portal-orbit portal-orbit-two" aria-hidden="true" />

        <div className="portal-stage-inner">
          <header className="portal-topbar">
            <a className="portal-brand" href="./" aria-label="答卷之外首页">
              <span className="portal-brand-mark">答</span>
              <strong>答卷之外</strong>
            </a>
            <nav className="portal-nav" aria-label="首页导航">
              <a href="#learn">学习入口</a>
              <a href="#about">关于我</a>
            </nav>
            <p className="portal-topnote">SHENLUN × INTERVIEW</p>
          </header>

          <div className="portal-stage-content">
            <div className="portal-hero-copy">
              <p className="portal-eyebrow"><span>01</span>专注申论与结构化面试的长期学习站</p>
              <h1 className="portal-title">
                <span className="portal-title-solid">公考不是背</span>
                <span className="portal-title-outline">标准答案</span>
              </h1>
              <p className="portal-lead">
                这里不做资料堆积。把<b>方法、真题、积累和课堂</b>整理成可以反复进入的学习路径，
                先选方向，再往深处学。
              </p>
              <p className="portal-hero-meta">方法学习 · 真题训练 · 表达积累 · 课堂现场</p>
            </div>

            <SubjectGateway />
          </div>
        </div>
      </section>

      <section className="portal-about" id="about">
        <p className="portal-about-word" aria-hidden="true">关于</p>
        <div className="portal-about-inner">
          <p className="portal-about-kicker">02 / ABOUT · 关于我</p>
          <div className="portal-about-grid">
            <h2 className="portal-about-title">
              教的是申论与面试，<br />
              <span>留下的是思考方法。</span>
            </h2>

            <div className="portal-about-copy">
              <p>
                这里是一位申论与结构化面试老师的个人学习站。我会把课堂里反复出现的问题、
                真题拆解、表达方法和日常观察，慢慢整理成可以长期使用的内容。
              </p>
              <p>
                比起让你记住更多“标准话术”，我更希望你能看清题目到底在问什么，
                从材料里找到依据，再用自己的语言把答案说清楚、写清楚。
              </p>
              <div className="portal-about-tags" aria-label="站点关键词">
                <span>申论方法</span>
                <span>结构化面试</span>
                <span>真题训练</span>
                <span>真实表达</span>
              </div>
            </div>

            <aside className="portal-qr-card" aria-label="二维码预留区域">
              <span>PRIVATE / 资料与联系入口</span>
              <div className="portal-qr-placeholder" aria-hidden="true" />
              <p>这里预留你的真实二维码。后续替换图片后，可作为资料领取、课程与日常分享的入口。</p>
            </aside>
          </div>
        </div>
      </section>

      <footer className="portal-footer">
        <span>答卷之外 · 申论 × 结构化面试</span>
        <span>METHOD · PRACTICE · WRITING · CLASSROOM</span>
        <a href="#top">返回顶部 ↑</a>
      </footer>
    </main>
  );
}
