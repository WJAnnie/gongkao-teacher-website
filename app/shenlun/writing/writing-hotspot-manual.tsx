'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { hotspotCategories } from './writing-hotspot-all';
import type { HotspotHighlight } from './writing-hotspot-schema';
import { writingCaseCategories, type CaseHighlight } from './writing-case-data';

const writingLayers = [
  {
    key: 'hotspots', no: '01', label: '热点时评', en: 'HOT TOPICS',
    desc: '把时代议题整理成可迁移的观点和文章结构。热点内部再按发展、文化、民生、政务、基层、法治、价值观念与时代议题八大领域分类。',
    items: [],
  },
  {
    key: 'cases', no: '02', label: '案例素材', en: 'CASES',
    desc: '先用150—300字把案例讲清楚，再演示如何把短案例与道理、意义或做法启示组合进文章。',
    items: [],
  },
  {
    key: 'terms', no: '03', label: '规范用词', en: 'TERMS',
    desc: '把材料语言压缩成更准确的申论表达，重点积累问题、原因、措施、成效和政府工作高频动词。',
    items: ['问题类用词', '原因类用词', '措施类用词', '成效类用词', '政府工作高频动词'],
  },
  {
    key: 'metaphors', no: '04', label: '比喻词库', en: 'METAPHORS',
    desc: '按写作功能理解比喻词，先知道它适合什么关系和语境，再决定是否使用。',
    items: ['方向与原则', '基础与稳定', '动力与促进', '沟通与联系', '风险与底线'],
  },
  {
    key: 'parallel', no: '05', label: '对仗句库', en: 'PARALLEL',
    desc: '积累的是句式结构、节奏和关系，不是固定金句。重点训练并列、递进、转折、对照等表达。',
    items: ['并列式', '递进式', '转折式', '对照式', '三段式分论点'],
  },
  {
    key: 'sentences', no: '06', label: '主题佳句', en: 'SENTENCES',
    desc: '围绕治理、民生、文化、生态、发展等主题沉淀能够自然迁移的判断句和过渡句。',
    items: ['发展类', '治理类', '民生类', '文化类', '生态类'],
  },
  {
    key: 'quotes', no: '07', label: '名人箴言', en: 'QUOTES',
    desc: '名言只作为观点的支撑，记录出处、含义和适用主题，避免“万能引用”。',
    items: ['实干与担当', '学习与成长', '人民立场', '创新与改革', '文化与传承'],
  },
  {
    key: 'essay', no: '08', label: '作文框架', en: 'ESSAY',
    desc: '把积累真正组织成文章，依次训练标题、总论点、分论点、论证段和结尾闭环。',
    items: ['标题怎么定', '总论点怎么立', '分论点怎么拆', '论据怎么服务观点', '结尾怎么闭环'],
  },
] as const;

type WritingLayerKey = (typeof writingLayers)[number]['key'];

type LearningHighlight = HotspotHighlight | CaseHighlight;

function scrollReadingTop() {
  window.setTimeout(() => {
    document.getElementById('writing-article-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 30);
}

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
    nodes.push(
      <span className={`writing-learning-mark mark-${item.label}`} key={`${item.text}-${index}`}>
        {item.text}<small>{item.label}</small>
      </span>,
    );
    cursor = item.index + item.text.length;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

export function WritingHotspotManual() {
  const [activeLayer, setActiveLayer] = useState<WritingLayerKey>('hotspots');
  const [activeCategory, setActiveCategory] = useState('development');
  const [activeArticle, setActiveArticle] = useState('high-quality-development');
  const [activeCaseCategory, setActiveCaseCategory] = useState('people');
  const [activeCase, setActiveCase] = useState('huang-wenxiu');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const layer = writingLayers.find((item) => item.key === activeLayer) ?? writingLayers[0];
  const category = useMemo(
    () => hotspotCategories.find((item) => item.key === activeCategory) ?? hotspotCategories[0],
    [activeCategory],
  );
  const article = useMemo(
    () => category.articles.find((item) => item.slug === activeArticle) ?? category.articles[0],
    [activeArticle, category],
  );
  const caseCategory = useMemo(
    () => writingCaseCategories.find((item) => item.key === activeCaseCategory) ?? writingCaseCategories[0],
    [activeCaseCategory],
  );
  const caseItem = useMemo(
    () => caseCategory.cases.find((item) => item.slug === activeCase) ?? caseCategory.cases[0],
    [activeCase, caseCategory],
  );

  const chooseLayer = (key: WritingLayerKey) => {
    setActiveLayer(key);
    setDrawerOpen(false);
    scrollReadingTop();
  };

  const chooseCategory = (key: string) => {
    const next = hotspotCategories.find((item) => item.key === key);
    if (!next) return;
    setActiveLayer('hotspots');
    setActiveCategory(key);
    setActiveArticle(next.articles[0]?.slug ?? '');
    setDrawerOpen(false);
    scrollReadingTop();
  };

  const chooseArticle = (slug: string) => {
    setActiveLayer('hotspots');
    setActiveArticle(slug);
    setDrawerOpen(false);
    scrollReadingTop();
  };

  const chooseCaseCategory = (key: string) => {
    const next = writingCaseCategories.find((item) => item.key === key);
    if (!next) return;
    setActiveLayer('cases');
    setActiveCaseCategory(key);
    setActiveCase(next.cases[0]?.slug ?? '');
    setDrawerOpen(false);
    scrollReadingTop();
  };

  const chooseCase = (slug: string) => {
    setActiveLayer('cases');
    setActiveCase(slug);
    setDrawerOpen(false);
    scrollReadingTop();
  };

  const mobileLabel = activeLayer === 'hotspots' && article
    ? `热点时评 · ${article.title}`
    : activeLayer === 'cases' && caseItem
      ? `案例素材 · ${caseItem.title}`
      : layer.label;

  return (
    <div className="framework-manual writing-hotspot-manual" id="writing-hotspot-manual">
      <button className="framework-mobile-index writing-mobile-index" type="button" onClick={() => setDrawerOpen(true)}>
        <span>写作目录</span><b>{mobileLabel}</b><em>☰</em>
      </button>

      <aside className={`framework-manual-sidebar writing-hotspot-sidebar${drawerOpen ? ' open' : ''}`} aria-label="写作积累学习目录">
        <button className="framework-drawer-close" type="button" onClick={() => setDrawerOpen(false)}>×</button>
        <div className="framework-sidebar-kicker">写作积累 / WRITING</div>
        <nav className="framework-layer-nav writing-layer-nav" aria-label="写作积累八类内容">
          {writingLayers.map((item) => {
            const open = item.key === activeLayer;
            return (
              <div className={`framework-layer-group writing-layer-group${open ? ' open' : ''}`} key={item.key}>
                <button
                  className={`framework-layer-trigger writing-category-trigger${open ? ' active' : ''}`}
                  type="button"
                  aria-expanded={open}
                  onClick={() => chooseLayer(item.key)}
                >
                  <span>{item.no}</span><b>{item.label}</b><i aria-hidden="true">⌄</i>
                </button>

                {open && item.key === 'hotspots' && (
                  <div className="framework-layer-children writing-hotspot-domains">
                    <nav className="writing-domain-nav" aria-label="热点时评知识领域">
                      {hotspotCategories.map((domain) => {
                        const domainOpen = domain.key === activeCategory;
                        return (
                          <div className={`writing-domain-group${domainOpen ? ' open' : ''}`} key={domain.key}>
                            <button
                              type="button"
                              className={`writing-domain-trigger${domainOpen ? ' active' : ''}`}
                              aria-expanded={domainOpen}
                              onClick={() => chooseCategory(domain.key)}
                            >
                              <span>{domain.no}</span><b>{domain.label}</b><i aria-hidden="true">⌄</i>
                            </button>
                            {domainOpen && (
                              <nav className="framework-sub-nav writing-article-nav" aria-label={`${domain.label}文章目录`}>
                                {domain.articles.map((entry) => (
                                  <button
                                    key={entry.slug}
                                    type="button"
                                    className={article?.slug === entry.slug ? 'active' : ''}
                                    onClick={() => chooseArticle(entry.slug)}
                                  >
                                    <span>{entry.no}</span><b>{entry.title}</b>
                                  </button>
                                ))}
                              </nav>
                            )}
                          </div>
                        );
                      })}
                    </nav>
                  </div>
                )}

                {open && item.key === 'cases' && (
                  <div className="framework-layer-children writing-case-domains">
                    <nav className="writing-domain-nav" aria-label="案例素材类型">
                      {writingCaseCategories.map((domain) => {
                        const domainOpen = domain.key === activeCaseCategory;
                        return (
                          <div className={`writing-domain-group${domainOpen ? ' open' : ''}`} key={domain.key}>
                            <button
                              type="button"
                              className={`writing-domain-trigger${domainOpen ? ' active' : ''}`}
                              aria-expanded={domainOpen}
                              onClick={() => chooseCaseCategory(domain.key)}
                            >
                              <span>{domain.no}</span><b>{domain.label}</b><i aria-hidden="true">⌄</i>
                            </button>
                            {domainOpen && (
                              <nav className="framework-sub-nav writing-article-nav writing-case-nav" aria-label={`${domain.label}案例目录`}>
                                {domain.cases.map((entry) => (
                                  <button
                                    key={entry.slug}
                                    type="button"
                                    className={caseItem?.slug === entry.slug ? 'active' : ''}
                                    onClick={() => chooseCase(entry.slug)}
                                  >
                                    <span>{entry.no}</span><b>{entry.title}</b>
                                  </button>
                                ))}
                              </nav>
                            )}
                          </div>
                        );
                      })}
                    </nav>
                  </div>
                )}

                {open && item.key !== 'hotspots' && item.key !== 'cases' && (
                  <div className="writing-topic-preview writing-layer-preview" aria-label={`${item.label}内容索引`}>
                    {item.items.map((topic) => <span key={topic}>{topic}</span>)}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {drawerOpen && <button className="framework-drawer-backdrop" aria-label="关闭写作目录" type="button" onClick={() => setDrawerOpen(false)} />}

      <article className="framework-manual-reading writing-hotspot-reading" id="writing-article-top">
        {activeLayer === 'hotspots' && article ? (
          <article className="writing-paper-article">
            <header className="writing-paper-head">
              <h2>{article.title}</h2>
              <div className="writing-paper-meta">
                <span>{category.label}</span><span>{article.exam}</span><span>{article.length}</span>
              </div>
            </header>

            <div className="writing-paper-body">
              <p className="writing-paper-intro">
                {annotate(article.intro, article.highlights)}
                <strong className="writing-paper-inline-thesis">{annotate(article.thesis, article.highlights)}</strong>
              </p>
              {article.sections.map((section) => (
                <p className="writing-paper-section-paragraph" key={section.title}>
                  <strong>{annotate(section.title, article.highlights)}</strong>
                  {annotate(section.body, article.highlights)}
                </p>
              ))}
              <p>{annotate(article.conclusion, article.highlights)}</p>
            </div>

            <footer className="writing-paper-footer">
              <div className="writing-paper-tags">{article.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <details className="writing-paper-sources">
                <summary>参考阅读</summary>
                {article.references.map((ref) => (
                  <a href={ref.href} target="_blank" rel="noreferrer" key={ref.href}>{ref.label}<i>↗</i></a>
                ))}
              </details>
            </footer>
          </article>
        ) : activeLayer === 'cases' && caseItem ? (
          <article className="writing-paper-article writing-case-article">
            <header className="writing-paper-head writing-case-head">
              <h2>{caseItem.title}</h2>
              <div className="writing-paper-meta">
                <span>{caseCategory.label}</span><span>{caseItem.type}</span>
              </div>
            </header>

            <div className="writing-case-body">
              <section className="writing-case-source">
                <div className="writing-case-section-label"><span>01</span><b>案例</b><em>150—300字，把事情讲清楚</em></div>
                <p>{caseItem.summary}</p>
              </section>

              <section className="writing-case-uses">
                <div className="writing-case-section-label"><span>02</span><b>写进文章</b><em>案例简短，道理讲透</em></div>
                {caseItem.usages.map((usage) => (
                  <div className="writing-case-usage" key={usage.title}>
                    <h3>{usage.title}</h3>
                    <p>{annotate(usage.text, usage.highlights)}</p>
                  </div>
                ))}
              </section>
            </div>

            <footer className="writing-paper-footer writing-case-footer">
              <div className="writing-paper-tags">{caseItem.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </footer>
          </article>
        ) : (
          <div className="writing-topic-overview writing-layer-overview">
            <span>{layer.no} / {layer.en}</span>
            <h2>{layer.label}</h2>
            <p>{layer.desc}</p>
            <div className="writing-topic-overview-grid">
              {layer.items.map((topic, index) => (
                <article key={topic}><span>{String(index + 1).padStart(2, '0')}</span><b>{topic}</b><p>后续按统一标准整理成可检索、可迁移的写作积累。</p></article>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
