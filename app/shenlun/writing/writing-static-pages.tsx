import type { ReactNode } from 'react';
import { hotspotCategories } from './writing-hotspot-all';
import type { HotspotHighlight } from './writing-hotspot-schema';
import { writingCaseCategories, type CaseHighlight } from './writing-case-all';
import { hotspotIndex, caseIndex } from './writing-library-index';
import { metaphorEntries, metaphorSourceLinks } from './writing-metaphor-data';
import { WritingStaticEnhancer } from './writing-static-enhancer';

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

type LearningHighlight = HotspotHighlight | CaseHighlight;

function annotate(text: string, highlights: LearningHighlight[]): ReactNode[] {
  const matches = highlights
    .map((item) => ({ ...item, index: text.indexOf(item.text) }))
    .filter((item) => item.index >= 0)
    .sort((a, b) => a.index - b.index);
  if (!matches.length) return [text];
  const nodes: ReactNode[] = [];
  let cursor = 0;
  matches.forEach((item, index) => {
    if (item.index < cursor) return;
    if (item.index > cursor) nodes.push(text.slice(cursor, item.index));
    nodes.push(<span className={`writing-learning-mark mark-${item.label}`} key={`${item.text}-${index}`}>{item.text}<small>{item.label}</small></span>);
    cursor = item.index + item.text.length;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function ChoiceCard({ no, label, desc, href, meta }: { no: string; label: string; desc: string; href: string; meta: string }) {
  return <a className="writing-static-choice" href={href}><span>{no}</span><b>{label}</b><p>{desc}</p><em>{meta}　→</em></a>;
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
    <a className="writing-library-back" href="/shenlun/writing/">← 返回写作积累</a>
    <span className="writing-library-kicker">01 / HOT TOPICS</span>
    <h2>热点时评怎么积累</h2>
    <p className="writing-library-teacher-note">先判断题目落在哪个知识领域，再进入对应分类。每个分类是一张独立静态页面，只装这一类10—13篇文章，不会把84篇正文一次性加载进浏览器。</p>
    <div className="writing-library-choice-grid">
      {hotspotIndex.map((item) => <ChoiceCard key={item.key} no={item.no} label={item.label} desc={item.desc} href={`/shenlun/writing/hotspots/${item.key}/`} meta={`${item.count} 篇文章`} />)}
    </div>
  </section>;
}

export function HotspotStaticCategory({ categoryKey }: { categoryKey: string }) {
  const category = hotspotCategories.find((item) => item.key === categoryKey);
  if (!category) return <section className="writing-placeholder-article"><h2>没有找到这个热点分类</h2><a className="writing-library-back" href="/shenlun/writing/hotspots/">返回热点时评分类</a></section>;
  return <section className="writing-collection-view writing-static-collection">
    <WritingStaticEnhancer />
    <a className="writing-library-back" href="/shenlun/writing/hotspots/">← 返回热点时评分类</a>
    <header className="framework-article-intro writing-collection-intro"><span>{category.no} / {category.en}</span><h2>{category.label}</h2><p>{category.desc}</p></header>
    <div className="tips-accordion writing-learning-accordion">
      {category.articles.map((entry) => <details className="tips-article writing-learning-item writing-static-details" id={`hotspot-${entry.slug}`} data-writing-autoscroll key={entry.slug}>
        <summary className="tips-article-trigger"><span className="tips-article-no">{entry.no}</span><span className="tips-article-heading"><b>{entry.title}</b><em>{entry.tags.slice(0, 4).join(' · ')} · {entry.length}</em></span><span className="tips-article-action">展开文章<i aria-hidden="true">＋</i></span></summary>
        <div className="tips-article-body writing-accordion-body"><div className="writing-paper-body"><p className="writing-paper-intro">{annotate(entry.intro, entry.highlights)}<strong className="writing-paper-inline-thesis">{annotate(entry.thesis, entry.highlights)}</strong></p>{entry.sections.map((section) => <p className="writing-paper-section-paragraph" key={section.title}><strong>{annotate(section.title, entry.highlights)}</strong>{annotate(section.body, entry.highlights)}</p>)}<p>{annotate(entry.conclusion, entry.highlights)}</p></div><footer className="writing-paper-footer"><div className="writing-paper-tags">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><details className="writing-paper-sources"><summary>参考阅读</summary>{entry.references.map((ref) => <a href={ref.href} target="_blank" rel="noreferrer" key={ref.href}>{ref.label}<i>↗</i></a>)}</details></footer></div>
      </details>)}
    </div>
  </section>;
}

export function CaseStaticIndex() {
  return <section className="writing-library-landing writing-static-landing">
    <a className="writing-library-back" href="/shenlun/writing/">← 返回写作积累</a>
    <span className="writing-library-kicker">02 / CASE LIBRARY</span>
    <h2>案例素材怎么积累</h2>
    <p className="writing-library-teacher-note">先用150—300字把案例看懂，再学习如何把事实压短，把道理、意义和做法启示写出来。每种案例类型独立成页，一次只加载10个案例。</p>
    <div className="writing-library-choice-grid writing-case-choice-grid">
      {caseIndex.map((item) => <ChoiceCard key={item.key} no={item.no} label={item.label} desc={item.desc} href={`/shenlun/writing/cases/${item.key}/`} meta={`${item.count} 个案例`} />)}
    </div>
  </section>;
}

export function CaseStaticCategory({ categoryKey }: { categoryKey: string }) {
  const category = writingCaseCategories.find((item) => item.key === categoryKey);
  if (!category) return <section className="writing-placeholder-article"><h2>没有找到这个案例分类</h2><a className="writing-library-back" href="/shenlun/writing/cases/">返回案例素材分类</a></section>;
  return <section className="writing-collection-view writing-static-collection">
    <WritingStaticEnhancer />
    <a className="writing-library-back" href="/shenlun/writing/cases/">← 返回案例素材分类</a>
    <header className="framework-article-intro writing-collection-intro"><span>{category.no} / CASE LIBRARY</span><h2>{category.label}</h2><p>{category.desc}</p></header>
    <div className="tips-accordion writing-learning-accordion writing-case-accordion">
      {category.cases.map((entry) => <details className="tips-article writing-learning-item writing-static-details" id={`case-${entry.slug}`} data-writing-autoscroll key={entry.slug}>
        <summary className="tips-article-trigger"><span className="tips-article-no">{entry.no}</span><span className="tips-article-heading"><b>{entry.title}</b><em>{entry.tags.slice(0, 4).join(' · ')}</em></span><span className="tips-article-action">展开案例<i aria-hidden="true">＋</i></span></summary>
        <div className="tips-article-body writing-accordion-body writing-case-accordion-body"><section className="writing-case-source"><div className="writing-case-section-label"><span>01</span><b>案例</b><em>150—300字，把事情讲清楚</em></div><p>{entry.summary}</p></section><section className="writing-case-uses"><div className="writing-case-section-label"><span>02</span><b>写进文章</b><em>案例简短，道理讲透</em></div>{entry.usages.map((usage) => <div className="writing-case-usage" key={usage.title}><h3>{usage.title}</h3><p>{annotate(usage.text, usage.highlights)}</p></div>)}</section><footer className="writing-paper-footer"><div className="writing-paper-tags">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></footer></div>
      </details>)}
    </div>
  </section>;
}

export function MetaphorStaticPage() {
  return <section className="writing-library-landing writing-static-metaphors">
    <WritingStaticEnhancer />
    <a className="writing-library-back" href="/shenlun/writing/">← 返回写作积累</a>
    <span className="writing-library-kicker">04 / METAPHOR LIBRARY</span>
    <h2>比喻用词怎么积累</h2>
    <p className="writing-library-teacher-note">这一部分不按主题硬分类。先理解比喻背后的逻辑关系，再记常见搭配；一段用准一个，通常比连续堆三四个更有力量。</p>
    <div className="writing-static-search"><label htmlFor="writing-static-metaphor-search">搜索比喻词</label><input id="writing-static-metaphor-search" data-writing-metaphor-search placeholder="可搜：改革、治理、人才、风险、稳定……" /><span data-writing-metaphor-count>找到 {metaphorEntries.length} 条</span></div>
    <div className="tips-accordion writing-learning-accordion writing-static-metaphor-list">
      {metaphorEntries.map((entry, index) => <details className="tips-article writing-learning-item writing-static-details" data-writing-autoscroll data-writing-metaphor-item data-search={`${entry.term}${entry.meaning}${entry.use}`} key={`${entry.term}-${index}`}>
        <summary className="tips-article-trigger"><span className="tips-article-no">{String(index + 1).padStart(3, '0')}</span><span className="tips-article-heading"><b>{entry.term}</b><em>{entry.meaning}</em></span><span className="tips-article-action">查看<i aria-hidden="true">＋</i></span></summary>
        <div className="tips-article-body writing-accordion-body"><div className="writing-static-metaphor-body"><div><span>含义</span><p>{entry.meaning}</p></div><div><span>常见写法</span><p>{entry.use}</p></div><p>使用提醒：先看上下文关系是否匹配，再决定是否使用。比喻的作用是把逻辑说清楚，不是为了把文章写得“花”。</p></div></div>
      </details>)}
    </div>
    <footer className="writing-static-sources"><h3>语料说明</h3><p>本词库优先参考总书记重要讲话、中央与政府文件、新华社、人民日报等权威语料中的代表性表达。页面中的“含义”和“常见写法”为申论教学整理。</p><div>{metaphorSourceLinks.map((source) => <a href={source.href} target="_blank" rel="noreferrer" key={source.href}>{source.label}<i>↗</i></a>)}</div></footer>
  </section>;
}
