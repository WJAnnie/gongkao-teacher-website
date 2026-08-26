import { SubjectGateway } from './subject-gateway';

export default function Home() {
  return (
    <main className="portal-home">
      <div className="portal-grid" aria-hidden="true" />
      <div className="portal-orbit portal-orbit-one" aria-hidden="true" />
      <div className="portal-orbit portal-orbit-two" aria-hidden="true" />

      <header className="portal-topbar">
        <a className="portal-brand" href="/" aria-label="答卷之外首页">
          <span className="portal-brand-mark">答</span>
          <span>
            <strong>答卷之外</strong>
            <small>申论 × 结构化面试</small>
          </span>
        </a>
        <p>LEARNING PORTAL / 学习入口</p>
      </header>

      <section className="portal-intro" aria-labelledby="portal-title">
        <p className="section-index">START HERE / 从这里开始</p>
        <div className="portal-intro-grid">
          <h1 id="portal-title">
            先选一门，<br />
            <span>再往深处学。</span>
          </h1>
          <p>
            首页只负责导航。点击「申论学习」或「面试学习」展开二级目录，
            再进入对应的独立学习网站。
          </p>
        </div>
      </section>

      <SubjectGateway />

      <div className="portal-footnote">
        <span>METHOD</span><i>·</i><span>PRACTICE</span><i>·</i><span>WRITING</span><i>·</i><span>CLASSROOM</span>
      </div>
    </main>
  );
}
