import { MotionLayer } from './motion-layer';
import { SubjectGateway } from './subject-gateway';
import { HomeLearningRepeat } from './home-learning-repeat';
import { HomeSongPlayer } from './home-song-player';
import { HomeSongAutoplay } from './home-song-autoplay';

export default function Home() {
  return (
    <main>
      <MotionLayer />
      <HomeSongAutoplay />

      <nav className="nav-shell" aria-label="主导航">
        <a className="brand" href="#top" aria-label="答卷之外首页"><span className="brand-mark">答</span><span>答卷之外</span></a>
        <div className="nav-links"><a href="#study">学习入口</a><a href="#about">关于我</a></div>
        <a className="nav-cta" href="#contact">获取资料 <span>↗</span></a>
      </nav>

      <div className="hero-scroll">
        <section className="hero" id="top">
          <div className="pointer-glow hero-pointer-glow" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orbit" aria-hidden="true"><span /><div className="hero-orbit-review"><b>阅</b><small>REVIEW<br />审题 · 找点 · 表达 · 复盘</small></div></div>
          <p className="eyebrow"><span>01</span> 专注申论与结构化面试的长期学习站</p>
          <h1>把公考题做懂<br /><span className="title-outline">把话说清</span></h1>
          <div className="hero-bottom"><p className="hero-lead"><span>真题</span>、<span>方法</span>、<span>积累</span>，<br className="desktop-break" />还有课堂里反复讲过的那些细节。</p></div>
          <div className="hero-directory-slot" id="study"><SubjectGateway /></div>
          <div className="hero-note"><span className="note-line" /><p>申论 · 面试 · 方法 · 真题 · 积累 · 课堂</p></div>
        </section>
      </div>

      <section className="about about-merged" id="about">
        <img className="about-visual-art" src="/about-study-art.svg" alt="" aria-hidden="true" />
        <HomeSongPlayer />
        <div className="about-copy">
          <p className="section-index">02 — ABOUT / 高老师与答卷之外</p>
          <div className="about-merged-grid">
            <div className="about-profile about-profile-expanded">
              <div className="about-identity-line"><span>GAO / 高老师</span><b>公考教师 · 申论 · 结构化面试</b></div>
              <h2>把题目看明白，<br />把自己的答案<span>说清楚</span>。</h2>
              <div className="about-intro-lead">
                <p>我是高老师，目前从事公考教学。课堂之外，我一直想有一个地方，把申论、结构化面试里真正需要反复练的东西整理下来。</p>
                <p>所以有了「答卷之外」。这里会留下我的方法框架、真题拆解、写作积累、表达训练和课堂观察，也会记录一些在课上来不及展开、但值得反复琢磨的细节。</p>
              </div>
              <div className="about-detail-grid">
                <article><span>01 / 我在教什么</span><h3>申论与结构化面试</h3><p>从审题、找依据、搭结构，到写下来、说出来。重点放在具体的作答过程，以及做完以后怎么复盘。</p></article>
                <article><span>02 / 为什么做这个站</span><h3>把课堂内容留下来</h3><p>一节课结束以后，真正有价值的方法应该还能被重新找到、重新练习、重新验证。这个网站就是我的长期整理本。</p></article>
                <article><span>03 / 这里有什么</span><h3>方法 · 真题 · 积累 · 课堂</h3><p>申论五大题型、国考真题索引、写作素材、面试题型方法、表达训练，以及之后陆续整理的课程片段和学习工具。</p></article>
                <article><span>04 / 怎么使用</span><h3>学方法，做题，再复盘</h3><p>先理解方法框架，再用真题检验；做完回看审题、要点、结构和表达，把一次练习变成下一次能继续使用的经验。</p></article>
              </div>
              <div className="about-tags"><span>申论方法</span><span>结构化面试</span><span>真题训练</span><span>写作积累</span><span>表达训练</span><span>课堂复盘</span></div>
            </div>
          </div>
        </div>
      </section>

      <HomeLearningRepeat />

      <section className="bottom-materials" id="contact" aria-label="获取资料">
        <aside className="about-contact-card">
          <div className="about-contact-head"><span>MATERIALS / 资料入口</span><b>资料 · 内容 · 日常</b></div>
          <div className="about-contact-body">
            <div className="qr-placeholder" aria-label="二维码区域"><div className="qr-pattern" aria-hidden="true" /><span>QR</span></div>
            <div className="contact-info"><span>答卷之外 · 高老师</span><h3>获取资料</h3><p>申论方法 · 结构化面试 · 真题训练 · 课堂内容</p></div>
          </div>
        </aside>
      </section>

      <footer className="footer"><span>答卷之外 · 高老师 · 申论 × 结构化面试</span><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
