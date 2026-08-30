/* eslint-disable @next/next/no-html-link-for-pages -- Static export rewrites these anchors for the Pages base path; Vinext Link prefetch fails without an RSC server. */

import { caseIndex } from './writing-library-index';
import { loadCaseCategory } from './writing-case-loader';
import { annotateWritingHighlight } from './writing-static-highlight';
import { WritingStaticEnhancer } from './writing-static-enhancer';

export async function CaseStaticCategory({ categoryKey }: { categoryKey: string }) {
  const item = caseIndex.find((entry) => entry.key === categoryKey);
  if (!item) return <section className="writing-placeholder-article"><h2>没有找到这个案例分类</h2><a className="writing-library-back" href="/shenlun/writing/cases/">返回案例素材分类</a></section>;

  const category = await loadCaseCategory(item.key);
  return <section className="writing-collection-view writing-static-collection">
    <WritingStaticEnhancer />
    <a className="writing-library-back" href="/shenlun/writing/cases/">← 返回案例素材分类</a>
    <header className="framework-article-intro writing-collection-intro"><span>{category.no} / CASE LIBRARY</span><h2>{category.label}</h2><p>{category.desc}</p></header>
    <div className="tips-accordion writing-learning-accordion writing-case-accordion">
      {category.cases.map((entry) => <details className="tips-article writing-learning-item writing-static-details" id={`case-${entry.slug}`} data-writing-autoscroll key={entry.slug}>
        <summary className="tips-article-trigger"><span className="tips-article-no">{entry.no}</span><span className="tips-article-heading"><b>{entry.title}</b><em>{entry.tags.slice(0, 4).join(' · ')}</em></span><span className="tips-article-action">展开案例<i aria-hidden="true">＋</i></span></summary>
        <div className="tips-article-body writing-accordion-body writing-case-accordion-body"><section className="writing-case-source"><div className="writing-case-section-label"><span>01</span><b>案例</b><em>150—300字，把事情讲清楚</em></div><p>{entry.summary}</p></section><section className="writing-case-uses"><div className="writing-case-section-label"><span>02</span><b>写进文章</b><em>案例简短，道理讲透</em></div>{entry.usages.map((usage) => <div className="writing-case-usage" key={usage.title}><h3>{usage.title}</h3><p>{annotateWritingHighlight(usage.text, usage.highlights)}</p></div>)}</section><footer className="writing-paper-footer"><div className="writing-paper-tags">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></footer></div>
      </details>)}
    </div>
  </section>;
}
