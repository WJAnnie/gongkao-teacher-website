'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { hotspotCategories } from './writing-hotspot-all';
import type { HotspotHighlight } from './writing-hotspot-schema';
import { writingCaseCategories, type CaseHighlight } from './writing-case-all';

const writingLayers = [
  { key: 'hotspots', no: '01', label: '热点时评', en: 'HOT TOPICS', desc: '按八大知识领域阅读时评文章，点击文章后再展开正文，像翻“实用技巧”一样一篇一篇学。', items: [] },
  { key: 'cases', no: '02', label: '案例素材', en: 'CASES', desc: '按案例类型阅读：先把案例讲清楚，再学习如何把短案例与道理、意义或做法启示写进文章。', items: [] },
  { key: 'terms', no: '03', label: '规范用词', en: 'TERMS', desc: '把材料语言压缩成更准确的申论表达。', items: ['问题类用词', '原因类用词', '措施类用词', '成效类用词', '政府工作高频动词'] },
  { key: 'metaphors', no: '04', label: '比喻词库', en: 'METAPHORS', desc: '按写作功能理解比喻词，先判断语境再使用。', items: ['方向与原则', '基础与稳定', '动力与促进', '沟通与联系', '风险与底线'] },
  { key: 'parallel', no: '05', label: '对仗句库', en: 'PARALLEL', desc: '积累句式关系与节奏，不背僵硬模板。', items: ['并列式', '递进式', '转折式', '对照式', '三段式分论点'] },
  { key: 'sentences', no: '06', label: '主题佳句', en: 'SENTENCES', desc: '按主题沉淀可迁移的判断句与过渡句。', items: ['发展类', '治理类', '民生类', '文化类', '生态类'] },
  { key: 'quotes', no: '07', label: '名人箴言', en: 'QUOTES', desc: '记录出处、含义与适用主题，避免万能引用。', items: ['实干与担当', '学习与成长', '人民立场', '创新与改革', '文化与传承'] },
  { key: 'essay', no: '08', label: '作文框架', en: 'ESSAY', desc: '把积累真正组织成完整文章。', items: ['标题怎么定', '总论点怎么立', '分论点怎么拆', '论据怎么服务观点', '结尾怎么闭环'] },
] as const;

type WritingLayerKey = (typeof writingLayers)[number]['key'];
type LearningHighlight = HotspotHighlight | CaseHighlight;

function scrollReadingTop() {
  window.setTimeout(() => document.getElementById('writing-article-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
}

function scrollItemTop(id: string) {
  window.requestAnimationFrame(() => {
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
  });
}

function annotate(text: string, highlights: LearningHighlight[]): ReactNode[] {
  const matches = highlights.map((item) => ({ ...item, index: text.indexOf(item.text) })).filter((item) => item.index >= 0).sort((a, b) => a.index - b.index);
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

export function WritingHotspotManual() {
  const [activeLayer, setActiveLayer] = useState<WritingLayerKey>('hotspots');
  const [openLayer, setOpenLayer] = useState<WritingLayerKey | null>(null);
  const [activeCategory, setActiveCategory] = useState('development');
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [activeCaseCategory, setActiveCaseCategory] = useState('people');
  const [openCaseCategory, setOpenCaseCategory] = useState<string | null>(null);
  const [activeCase, setActiveCase] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const layer = writingLayers.find((item) => item.key === activeLayer) ?? writingLayers[0];
  const category = useMemo(() => hotspotCategories.find((item) => item.key === activeCategory) ?? hotspotCategories[0], [activeCategory]);
  const caseCategory = useMemo(() => writingCaseCategories.find((item) => item.key === activeCaseCategory) ?? writingCaseCategories[0], [activeCaseCategory]);
  const article = useMemo(() => activeArticle ? category.articles.find((item) => item.slug === activeArticle) ?? null : null, [activeArticle, category]);
  const caseItem = useMemo(() => activeCase ? caseCategory.cases.find((item) => item.slug === activeCase) ?? null : null, [activeCase, caseCategory]);

  const chooseLayer = (key: WritingLayerKey) => {
    const closing = openLayer === key;
    setActiveLayer(key);
    setOpenLayer(closing ? null : key);
    if (!closing && key === 'hotspots') setActiveArticle(null);
    if (!closing && key === 'cases') setActiveCase(null);
    setDrawerOpen(false);
    scrollReadingTop();
  };

  const chooseCategory = (key: string) => {
    const next = hotspotCategories.find((item) => item.key === key);
    if (!next) return;
    if (openCategory === key) {
      setOpenCategory(null);
      return;
    }
    setActiveLayer('hotspots');
    setOpenLayer('hotspots');
    setActiveCategory(key);
    setOpenCategory(key);
    setActiveArticle(null);
    setDrawerOpen(false);
    scrollReadingTop();
  };

  const chooseArticle = (slug: string) => {
    const closing = activeArticle === slug;
    setActiveLayer('hotspots');
    setOpenLayer('hotspots');
    setActiveArticle(closing ? null : slug);
    setDrawerOpen(false);
    if (!closing) scrollItemTop(`hotspot-${slug}`);
  };

  const chooseCaseCategory = (key: string) => {
    const next = writingCaseCategories.find((item) => item.key === key);
    if (!next) return;
    if (openCaseCategory === key) {
      setOpenCaseCategory(null);
      return;
    }
    setActiveLayer('cases');
    setOpenLayer('cases');
    setActiveCaseCategory(key);
    setOpenCaseCategory(key);
    setActiveCase(null);
    setDrawerOpen(false);
    scrollReadingTop();
  };

  const chooseCase = (slug: string) => {
    const closing = activeCase === slug;
    setActiveLayer('cases');
    setOpenLayer('cases');
    setActiveCase(closing ? null : slug);
    setDrawerOpen(false);
    if (!closing) scrollItemTop(`case-${slug}`);
  };

  const mobileLabel = activeLayer === 'hotspots' && article ? `热点时评 · ${article.title}` : activeLayer === 'cases' && caseItem ? `案例素材 · ${caseItem.title}` : layer.label;

  return (
    <div className="framework-manual writing-hotspot-manual" id="writing-hotspot-manual">
      <button className="framework-mobile-index writing-mobile-index" type="button" onClick={() => setDrawerOpen(true)}><span>写作目录</span><b>{mobileLabel}</b><em>☰</em></button>

      <aside className={`framework-manual-sidebar writing-hotspot-sidebar${drawerOpen ? ' open' : ''}`} aria-label="写作积累学习目录">
        <button className="framework-drawer-close" type="button" onClick={() => setDrawerOpen(false)}>×</button>
        <div className="framework-sidebar-kicker">写作积累 / WRITING</div>
        <nav className="framework-layer-nav writing-layer-nav" aria-label="写作积累八类内容">
          {writingLayers.map((item) => {
            const expanded = item.key === openLayer;
            const current = item.key === activeLayer;
            return <div className={`framework-layer-group writing-layer-group${expanded ? ' open' : ''}`} key={item.key}>
              <button className={`framework-layer-trigger writing-category-trigger${current ? ' active' : ''}`} data-writing-layer={item.key} type="button" aria-expanded={expanded} onClick={() => chooseLayer(item.key)}><span>{item.no}</span><b>{item.label}</b><i aria-hidden="true">⌄</i></button>

              {expanded && item.key === 'hotspots' && <div className="framework-layer-children writing-hotspot-domains"><nav className="writing-domain-nav" aria-label="热点时评知识领域">
                {hotspotCategories.map((domain) => {
                  const domainOpen = domain.key === openCategory;
                  const domainCurrent = domain.key === activeCategory;
                  return <div className={`writing-domain-group${domainOpen ? ' open' : ''}`} key={domain.key}>
                    <button type="button" className={`writing-domain-trigger${domainCurrent ? ' active' : ''}`} aria-expanded={domainOpen} onClick={() => chooseCategory(domain.key)}><span>{domain.no}</span><b>{domain.label}</b><i aria-hidden="true">⌄</i></button>
                    {domainOpen && <nav className="framework-sub-nav writing-article-nav" aria-label={`${domain.label}文章目录`}>{domain.articles.map((entry) => <button key={entry.slug} type="button" className={activeArticle === entry.slug ? 'active' : ''} onClick={() => chooseArticle(entry.slug)}><span>{entry.no}</span><b>{entry.title}</b></button>)}</nav>}
                  </div>;
                })}
              </nav></div>}

              {expanded && item.key === 'cases' && <div className="framework-layer-children writing-case-domains"><nav className="writing-domain-nav" aria-label="案例素材类型">
                {writingCaseCategories.map((domain) => {
                  const domainOpen = domain.key === openCaseCategory;
                  const domainCurrent = domain.key === activeCaseCategory;
                  return <div className={`writing-domain-group${domainOpen ? ' open' : ''}`} key={domain.key}>
                    <button type="button" className={`writing-domain-trigger${domainCurrent ? ' active' : ''}`} aria-expanded={domainOpen} onClick={() => chooseCaseCategory(domain.key)}><span>{domain.no}</span><b>{domain.label}</b><i aria-hidden="true">⌄</i></button>
                    {domainOpen && <nav className="framework-sub-nav writing-article-nav writing-case-nav" aria-label={`${domain.label}案例目录`}>{domain.cases.map((entry) => <button key={entry.slug} type="button" className={activeCase === entry.slug ? 'active' : ''} onClick={() => chooseCase(entry.slug)}><span>{entry.no}</span><b>{entry.title}</b></button>)}</nav>}
                  </div>;
                })}
              </nav></div>}

              {expanded && item.key !== 'hotspots' && item.key !== 'cases' && <div className="writing-topic-preview writing-layer-preview" aria-label={`${item.label}内容索引`}>{item.items.map((topic) => <span key={topic}>{topic}</span>)}</div>}
            </div>;
          })}
        </nav>
      </aside>
      {drawerOpen && <button className="framework-drawer-backdrop" aria-label="关闭写作目录" type="button" onClick={() => setDrawerOpen(false)} />}

      <article className="framework-manual-reading writing-hotspot-reading" id="writing-article-top">
        {activeLayer === 'hotspots' ? <section className="writing-collection-view">
          <header className="framework-article-intro writing-collection-intro"><span>{category.no} / {category.en}</span><h2>{category.label}</h2><p>{category.desc}</p></header>
          <div className="tips-accordion writing-learning-accordion">
            {category.articles.map((entry) => {
              const open = activeArticle === entry.slug;
              return <section className={`tips-article writing-learning-item${open ? ' open' : ''}`} id={`hotspot-${entry.slug}`} key={entry.slug}>
                <button className="tips-article-trigger" type="button" aria-expanded={open} onClick={() => chooseArticle(entry.slug)}>
                  <span className="tips-article-no">{entry.no}</span>
                  <span className="tips-article-heading"><b>{entry.title}</b><em>{entry.tags.slice(0, 4).join(' · ')} · {entry.length}</em></span>
                  <span className="tips-article-action">{open ? '收起文章' : '展开文章'}<i aria-hidden="true">{open ? '−' : '+'}</i></span>
                </button>
                {open && <div className="tips-article-body writing-accordion-body">
                  <div className="writing-paper-body">
                    <p className="writing-paper-intro">{annotate(entry.intro, entry.highlights)}<strong className="writing-paper-inline-thesis">{annotate(entry.thesis, entry.highlights)}</strong></p>
                    {entry.sections.map((section) => <p className="writing-paper-section-paragraph" key={section.title}><strong>{annotate(section.title, entry.highlights)}</strong>{annotate(section.body, entry.highlights)}</p>)}
                    <p>{annotate(entry.conclusion, entry.highlights)}</p>
                  </div>
                  <footer className="writing-paper-footer"><div className="writing-paper-tags">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><details className="writing-paper-sources"><summary>参考阅读</summary>{entry.references.map((ref) => <a href={ref.href} target="_blank" rel="noreferrer" key={ref.href}>{ref.label}<i>↗</i></a>)}</details></footer>
                </div>}
              </section>;
            })}
          </div>
        </section> : activeLayer === 'cases' ? <section className="writing-collection-view">
          <header className="framework-article-intro writing-collection-intro"><span>{caseCategory.no} / CASE LIBRARY</span><h2>{caseCategory.label}</h2><p>{caseCategory.desc}</p></header>
          <div className="tips-accordion writing-learning-accordion writing-case-accordion">
            {caseCategory.cases.map((entry) => {
              const open = activeCase === entry.slug;
              return <section className={`tips-article writing-learning-item${open ? ' open' : ''}`} id={`case-${entry.slug}`} key={entry.slug}>
                <button className="tips-article-trigger" type="button" aria-expanded={open} onClick={() => chooseCase(entry.slug)}>
                  <span className="tips-article-no">{entry.no}</span>
                  <span className="tips-article-heading"><b>{entry.title}</b><em>{entry.tags.slice(0, 4).join(' · ')}</em></span>
                  <span className="tips-article-action">{open ? '收起案例' : '展开案例'}<i aria-hidden="true">{open ? '−' : '+'}</i></span>
                </button>
                {open && <div className="tips-article-body writing-accordion-body writing-case-accordion-body">
                  <section className="writing-case-source"><div className="writing-case-section-label"><span>01</span><b>案例</b><em>150—300字，把事情讲清楚</em></div><p>{entry.summary}</p></section>
                  <section className="writing-case-uses"><div className="writing-case-section-label"><span>02</span><b>写进文章</b><em>案例简短，道理讲透</em></div>{entry.usages.map((usage) => <div className="writing-case-usage" key={usage.title}><h3>{usage.title}</h3><p>{annotate(usage.text, usage.highlights)}</p></div>)}</section>
                  <footer className="writing-paper-footer"><div className="writing-paper-tags">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></footer>
                </div>}
              </section>;
            })}
          </div>
        </section> : <section className="writing-placeholder-article"><span>{layer.no} / {layer.en}</span><h2>{layer.label}</h2><p>{layer.desc}</p><div className="writing-topic-preview">{layer.items.map((topic) => <span key={topic}>{topic}</span>)}</div><p className="writing-build-note">这一栏目将在后续按同样的学习手册逻辑继续补充：先理解用途，再看示例，最后练习迁移，不做单纯堆词。</p></section>}
      </article>
    </div>
  );
}