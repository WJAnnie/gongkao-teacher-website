import { interviewRoutes, shenlunRoutes } from './learning-routes';
import { buildFrontTerms, loadFrontHotspots } from './home-front/front-data';
import { FrontHotspots, FrontTerms } from './home-front/front-daily';
import { getBeijingDate } from './home-front/front-date';
import { FrontMasthead } from './home-front/front-masthead';
import { FrontModuleColumn } from './home-front/front-modules';
import { FrontMotion } from './home-front/front-motion';

const editorNotes = [
  { title: '我在教什么。', text: '申论与结构化面试。从审题、找依据、搭结构，到写下来、说出来，重点放在作答过程和做完后的复盘。' },
  { title: '为什么做这个站。', text: '一节课结束以后，有价值的方法应该还能被重新找到、重新练习。这里是我的长期整理本。' },
  { title: '这里有什么。', text: '申论五大题型、国考真题索引、写作素材、面试题型方法与表达训练，以及陆续整理的课程片段。' },
  { title: '怎么使用。', text: '先理解方法框架，再用真题检验；做完回看审题、要点、结构和表达，把一次练习变成下次能用的经验。' },
] as const;

export default async function Home() {
  // 构建当天的北京日期；访客打开时由客户端组件换成当天。
  const buildDate = getBeijingDate(new Date());
  const hotspots = await loadFrontHotspots();
  const terms = buildFrontTerms();

  return (
    <main className="front-page" id="top">
      <FrontMasthead initialDate={buildDate} />

      <section className="front-lead" aria-label="写在前面">
        <h2 className="front-slogan">把公考题做懂，<br />把话<em>说清</em>。</h2>
        <div className="front-note">
          <h3>写在前面</h3>
          <p>课堂之外，我一直想有一个地方，把申论、结构化面试里真正需要反复练的东西整理下来。这里留下方法框架、真题拆解、写作积累和课堂观察。</p>
          <p className="front-sign">—— 云帆老师</p>
        </div>
      </section>

      <div className="front-cols" id="study">
        <FrontModuleColumn title="申论版" note="材料 · 题型 · 写作" routes={shenlunRoutes} />
        <FrontModuleColumn title="面试版" note="审题 · 观点 · 表达" routes={interviewRoutes} />
      </div>

      <div className="front-daily-reading" aria-label="每日积累">
        <FrontHotspots initialDate={buildDate} hotspots={hotspots} />
        <FrontTerms initialDate={buildDate} terms={terms} />
      </div>

      <div className="front-bottom">
        <section className="front-col front-contact" id="contact" aria-label="获取资料">
          <div className="front-kicker">
            <h2>获取资料</h2>
            <span>扫码</span>
          </div>
          <div className="front-qr-row">
            <div className="front-qr" role="img" aria-label="二维码（占位）" />
            <p>申论方法 · 结构化面试<br />真题训练 · 课堂内容</p>
          </div>
        </section>
      </div>

      <section className="front-editorial" id="about" aria-label="编者按">
        <div className="front-editorial-head">
          <h2>编者按</h2>
          <span>云帆老师与答卷之外</span>
        </div>
        <div className="front-editorial-grid">
          {editorNotes.map((note) => (
            <p key={note.title}><b>{note.title}</b>{note.text}</p>
          ))}
        </div>
      </section>

      <footer className="front-foot">
        <span>答卷之外 · 云帆老师 · 申论 × 结构化面试</span>
        <a href="#top">返回顶部 ↑</a>
      </footer>
      <FrontMotion />
    </main>
  );
}
