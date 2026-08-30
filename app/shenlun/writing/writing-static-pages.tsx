import Link from 'next/link';
import { hotspotIndex, caseIndex } from './writing-library-index';

const librarySections = [
  { no: '01', label: '热点时评', en: 'HOT TOPICS', href: '/shenlun/writing/hotspots/', desc: '按知识领域进入，不从第一篇顺序刷。重点积累观点、结构、案例和表达。' },
  { no: '02', label: '案例素材', en: 'CASES', href: '/shenlun/writing/cases/', desc: '先看懂案例，再学会压缩事实，把道理、意义和做法启示写进文章。' },
  { no: '03', label: '规范用词', en: 'TERMS', href: '/shenlun/writing/#terms', desc: '把材料语言压缩成更准确、更像申论答案的规范表达。' },
  { no: '04', label: '比喻词库', en: 'METAPHORS', href: '/shenlun/writing/metaphors/', desc: '直接积累高频、可迁移的权威比喻表达，并理解它在句子中承担的关系。' },
  { no: '05', label: '对仗句库', en: 'PARALLEL', href: '/shenlun/writing/#parallel', desc: '积累句式关系和节奏，不背僵硬模板。' },
  { no: '06', label: '主题佳句', en: 'SENTENCES', href: '/shenlun/writing/#sentences', desc: '沉淀可迁移的判断句、过渡句和收束句。' },
  { no: '07', label: '名人箴言', en: 'QUOTES', href: '/shenlun/writing/#quotes', desc: '记录出处、含义和适用边界，避免万能引用。' },
  { no: '08', label: '作文框架', en: 'ESSAY', href: '/shenlun/writing/#essay', desc: '把观点、论据和表达真正组织成完整文章。' },
] as const;

function ChoiceCard({ no, label, desc, href, meta }: { no: string; label: string; desc: string; href: string; meta: string }) {
  return <Link className="writing-static-choice" href={href}><span>{no}</span><b>{label}</b><p>{desc}</p><em>{meta}　→</em></Link>;
}

export function WritingStaticLanding() {
  return <div className="writing-static-shell">
    <section className="writing-library-landing writing-static-landing">
      <span className="writing-library-kicker">WRITING LIBRARY</span>
      <h2>选择你现在要积累的内容</h2>
      <p className="writing-library-teacher-note">写作积累不需要按照固定顺序学习。你正在写什么、缺什么，就进入对应模块。热点时评和案例素材已经改成独立静态页面；即使浏览器脚本异常，也不会影响页面进入和正文阅读。</p>
      <div className="writing-library-choice-grid writing-static-main-grid">
        {librarySections.map((item) => <ChoiceCard key={item.no} no={item.no} label={item.label} desc={item.desc} href={item.href} meta={item.no === '01' ? '84 篇文章' : item.no === '02' ? '120 个案例' : item.no === '04' ? '242 条' : '继续建设'} />)}
      </div>
    </section>
    <section className="writing-static-coming" id="terms"><span>03</span><b>规范用词</b><p>将在下一轮按同样的静态优先方式补充。</p></section>
    <section className="writing-static-coming" id="parallel"><span>05</span><b>对仗句库</b><p>将在下一轮按同样的静态优先方式补充。</p></section>
    <section className="writing-static-coming" id="sentences"><span>06</span><b>主题佳句</b><p>将在下一轮按同样的静态优先方式补充。</p></section>
    <section className="writing-static-coming" id="quotes"><span>07</span><b>名人箴言</b><p>将在下一轮按同样的静态优先方式补充。</p></section>
    <section className="writing-static-coming" id="essay"><span>08</span><b>作文框架</b><p>将在下一轮按同样的静态优先方式补充。</p></section>
  </div>;
}

export function HotspotStaticIndex() {
  return <section className="writing-library-landing writing-static-landing">
    <Link className="writing-library-back" href="/shenlun/writing/">← 返回写作积累</Link>
    <span className="writing-library-kicker">01 / HOT TOPICS</span>
    <h2>热点时评怎么积累</h2>
    <p className="writing-library-teacher-note">先判断题目落在哪个知识领域，再进入对应分类。每个分类是一张独立静态页面，只装这一类10—13篇文章，不会把84篇正文一次性加载进浏览器。</p>
    <div className="writing-library-choice-grid">
      {hotspotIndex.map((item) => <ChoiceCard key={item.key} no={item.no} label={item.label} desc={item.desc} href={`/shenlun/writing/hotspots/${item.key}/`} meta={`${item.count} 篇文章`} />)}
    </div>
  </section>;
}

export function CaseStaticIndex() {
  return <section className="writing-library-landing writing-static-landing">
    <Link className="writing-library-back" href="/shenlun/writing/">← 返回写作积累</Link>
    <span className="writing-library-kicker">02 / CASE LIBRARY</span>
    <h2>案例素材怎么积累</h2>
    <p className="writing-library-teacher-note">先用150—300字把案例看懂，再学习如何把事实压短，把道理、意义和做法启示写出来。每种案例类型独立成页，一次只加载10个案例。</p>
    <div className="writing-library-choice-grid writing-case-choice-grid">
      {caseIndex.map((item) => <ChoiceCard key={item.key} no={item.no} label={item.label} desc={item.desc} href={`/shenlun/writing/cases/${item.key}/`} meta={`${item.count} 个案例`} />)}
    </div>
  </section>;
}
