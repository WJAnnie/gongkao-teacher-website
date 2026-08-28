'use client';

import { useMemo, useState } from 'react';
import { hotspotCategories } from './writing-hotspot-data';

function scrollReadingTop() {
  window.setTimeout(() => {
    document.getElementById('writing-article-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 30);
}

export function WritingHotspotManual() {
  const [activeCategory, setActiveCategory] = useState('development');
  const [activeArticle, setActiveArticle] = useState('high-quality-development');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const category = useMemo(
    () => hotspotCategories.find((item) => item.key === activeCategory) ?? hotspotCategories[0],
    [activeCategory],
  );

  const article = useMemo(
    () => category.articles?.find((item) => item.slug === activeArticle) ?? category.articles?.[0] ?? null,
    [activeArticle, category],
  );

  const chooseCategory = (key: string) => {
    const next = hotspotCategories.find((item) => item.key === key);
    if (!next) return;
    setActiveCategory(key);
    setActiveArticle(next.articles?.[0]?.slug ?? '');
    setDrawerOpen(false);
    scrollReadingTop();
  };

  const chooseArticle = (slug: string) => {
    setActiveArticle(slug);
    setDrawerOpen(false);
    scrollReadingTop();
  };

  const mobileLabel = article ? `${category.no} · ${article.title}` : `${category.no} · ${category.label}`;

  return (
    <div className="framework-manual writing-hotspot-manual" id="writing-hotspot-manual">
      <button className="framework-mobile-index writing-mobile-index" type="button" onClick={() => setDrawerOpen(true)}>
        <span>热点目录</span><b>{mobileLabel}</b><em>☰</em>
      </button>

      <aside className={`framework-manual-sidebar writing-hotspot-sidebar${drawerOpen ? ' open' : ''}`} aria-label="写作积累热点时评目录">
        <button className="framework-drawer-close" type="button" onClick={() => setDrawerOpen(false)}>×</button>
        <div className="framework-sidebar-kicker">写作积累 / HOT TOPICS</div>
        <nav className="framework-layer-nav writing-category-nav" aria-label="热点时评八大领域">
          {hotspotCategories.map((item) => {
            const open = item.key === activeCategory;
            return (
              <div className={`framework-layer-group writing-category-group${open ? ' open' : ''}`} key={item.key} data-writing-category={item.key}>
                <button
                  className={`framework-layer-trigger writing-category-trigger${open ? ' active' : ''}`}
                  type="button"
                  aria-expanded={open}
                  onClick={() => chooseCategory(item.key)}
                >
                  <span>{item.no}</span><b>{item.label}</b><i aria-hidden="true">⌄</i>
                </button>
                {open && (
                  <div className="framework-layer-children writing-category-children">
                    {item.articles ? (
                      <nav className="framework-sub-nav writing-article-nav" aria-label={`${item.label}文章目录`}>
                        {item.articles.map((entry) => (
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
                    ) : (
                      <div className="writing-topic-preview" aria-label={`${item.label}主题索引`}>
                        {item.topics.map((topic) => <span key={topic}>{topic}</span>)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="writing-sidebar-note">
          <span>分类原则</span>
          <p>一级按知识领域，二级按母题；考试类型只做适用标签，避免同一热点重复建设。</p>
        </div>
      </aside>

      {drawerOpen && <button className="framework-drawer-backdrop" aria-label="关闭热点目录" type="button" onClick={() => setDrawerOpen(false)} />}

      <article className="framework-manual-reading writing-hotspot-reading" id="writing-article-top">
        {article ? (
          <div className="writing-commentary-article">
            <header className="writing-commentary-head">
              <div className="writing-commentary-kicker"><span>{category.no} / {category.en}</span><em>{article.exam}</em></div>
              <h2>{article.title}</h2>
              <p className="writing-commentary-deck">{article.deck}</p>
              <div className="writing-commentary-meta">
                <span>{article.length}</span>
                {article.tags.map((tag) => <i key={tag}>{tag}</i>)}
              </div>
            </header>

            <section className="writing-commentary-lead" aria-label="文章开头">
              <span>OPENING / 开头</span>
              <p>{article.intro}</p>
            </section>

            <div className="writing-commentary-body">
              {article.sections.map((section, index) => (
                <section className="writing-commentary-section" key={section.title}>
                  <div className="writing-commentary-section-no">0{index + 1}</div>
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                </section>
              ))}
            </div>

            <section className="writing-commentary-conclusion" aria-label="文章结尾">
              <span>ENDING / 结尾</span>
              <p>{article.conclusion}</p>
            </section>

            <aside className="writing-commentary-review">
              <span>写作复盘</span>
              <p>这篇文章采用“约200字开头 + 三个并列分论点 + 100字以上收束”的结构。积累时重点记观点关系和分论点逻辑，不要整篇背诵。</p>
            </aside>

            <footer className="writing-commentary-sources">
              <span>延伸阅读 / 只作学习参考</span>
              {article.references.map((ref) => (
                <a href={ref.href} target="_blank" rel="noreferrer" key={ref.href}>{ref.label}<i>↗</i></a>
              ))}
            </footer>
          </div>
        ) : (
          <div className="writing-topic-overview">
            <span>{category.no} / {category.en}</span>
            <h2>{category.label}</h2>
            <p>{category.desc}</p>
            <div className="writing-topic-overview-grid">
              {category.topics.map((topic, index) => (
                <article key={topic}><span>{String(index + 1).padStart(2, '0')}</span><b>{topic}</b><p>作为本类母题继续展开观点、案例与时评文章。</p></article>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
