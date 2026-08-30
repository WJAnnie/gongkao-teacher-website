/* eslint-disable @next/next/no-html-link-for-pages -- Static export rewrites these anchors for the Pages base path; Vinext Link prefetch fails without an RSC server. */

import { hotspotIndex } from './writing-library-index';
import { loadHotspotCategory } from './writing-hotspot-loader';
import { annotateWritingHighlight } from './writing-static-highlight';
import { WritingStaticEnhancer } from './writing-static-enhancer';

export async function HotspotStaticCategory({ categoryKey }: { categoryKey: string }) {
  const item = hotspotIndex.find((entry) => entry.key === categoryKey);
  if (!item) return <section className="writing-placeholder-article"><h2>没有找到这个热点分类</h2><a className="writing-library-back" href="/shenlun/writing/hotspots/">返回热点时评分类</a></section>;

  const category = await loadHotspotCategory(item.key);
  return <section className="writing-collection-view writing-static-collection">
    <WritingStaticEnhancer />
    <a className="writing-library-back" href="/shenlun/writing/hotspots/">← 返回热点时评分类</a>
    <header className="framework-article-intro writing-collection-intro"><span>{category.no} / {category.en}</span><h2>{category.label}</h2><p>{category.desc}</p></header>
    <div className="tips-accordion writing-learning-accordion">
      {category.articles.map((entry) => <details className="tips-article writing-learning-item writing-static-details" id={`hotspot-${entry.slug}`} data-writing-autoscroll key={entry.slug}>
        <summary className="tips-article-trigger"><span className="tips-article-no">{entry.no}</span><span className="tips-article-heading"><b>{entry.title}</b><em>{entry.tags.slice(0, 4).join(' · ')} · {entry.length}</em></span><span className="tips-article-action">展开文章<i aria-hidden="true">＋</i></span></summary>
        <div className="tips-article-body writing-accordion-body"><div className="writing-paper-body"><p className="writing-paper-intro">{annotateWritingHighlight(entry.intro, entry.highlights)}<strong className="writing-paper-inline-thesis">{annotateWritingHighlight(entry.thesis, entry.highlights)}</strong></p>{entry.sections.map((section) => <p className="writing-paper-section-paragraph" key={section.title}><strong>{annotateWritingHighlight(section.title, entry.highlights)}</strong>{annotateWritingHighlight(section.body, entry.highlights)}</p>)}<p>{annotateWritingHighlight(entry.conclusion, entry.highlights)}</p></div><footer className="writing-paper-footer"><div className="writing-paper-tags">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><details className="writing-paper-sources"><summary>参考阅读</summary>{entry.references.map((ref) => <a href={ref.href} target="_blank" rel="noreferrer" key={ref.href}>{ref.label}<i>↗</i></a>)}</details></footer></div>
      </details>)}
    </div>
  </section>;
}
