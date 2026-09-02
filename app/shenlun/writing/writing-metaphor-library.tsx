'use client';

import { useEffect, useMemo, useState } from 'react';
import type { MetaphorEntry } from './writing-metaphor-data';
import styles from './writing-metaphor.module.css';

type SourceLink = { label: string; href: string };
type LoadState = 'loading' | 'ready' | 'error';

function scrollTermTop(index: number) {
  window.requestAnimationFrame(() => {
    window.setTimeout(() => document.getElementById(`metaphor-term-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
  });
}

export function WritingMetaphorLibrary({ initialQuery = '' }: { initialQuery?: string }) {
  const [entries, setEntries] = useState<MetaphorEntry[]>([]);
  const [sourceLinks, setSourceLinks] = useState<SourceLink[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [query, setQuery] = useState(initialQuery);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    import('./writing-metaphor-data')
      .then(({ metaphorEntries, metaphorSourceLinks }) => {
        if (cancelled) return;
        setEntries(metaphorEntries);
        setSourceLinks(metaphorSourceLinks.map((source) => ({ ...source })));
        setLoadState('ready');
      })
      .catch(() => {
        if (!cancelled) setLoadState('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const keyword = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!keyword) return entries.map((entry, index) => ({ entry, index }));
    return entries
      .map((entry, index) => ({ entry, index }))
      .filter(({ entry }) => `${entry.term}${entry.meaning}${entry.use}`.toLowerCase().includes(keyword));
  }, [entries, keyword]);

  const toggle = (index: number) => {
    const closing = active === index;
    setActive(closing ? null : index);
    if (!closing) scrollTermTop(index);
  };

  return (
    <section className={styles.library}>
      <header className={styles.intro}>
        <span>04</span>
        <h2>比喻用词怎么积累</h2>
        <p>这一部分不按主题硬分类。比喻词真正好用的地方，在于把抽象关系说得更具体：方向可以有“指南针”，基础可以有“压舱石”，改革难题可以是“硬骨头”，基层治理可以深入“神经末梢”。学习时先弄懂比喻背后的关系，再记常见搭配；写作时一段用准一个，通常比连续堆三四个更有力量。</p>
        <div className={styles.notice}><b>{loadState === 'ready' ? `${entries.length} 条` : '词库加载中'}</b><span>权威语料筛选 + 教学释义整理</span><em>不要求按顺序背，直接搜索需要的表达</em></div>
      </header>

      {loadState === 'loading' && <div className={styles.empty}>正在加载比喻词库，请稍候……</div>}

      {loadState === 'error' && <div className={styles.empty}>
        <p>比喻词库资源没有加载成功，但页面其他内容仍可正常使用。</p>
        <button type="button" onClick={() => window.location.reload()}>刷新后重试</button>
      </div>}

      {loadState === 'ready' && <>
        <div className={styles.searchWrap}>
          <label htmlFor="metaphor-search">搜索比喻词</label>
          <div className={styles.searchBox}>
            <input id="metaphor-search" value={query} onChange={(event) => { setQuery(event.target.value); setActive(null); }} placeholder="可搜：改革、治理、人才、风险、稳定……" />
            {query && <button type="button" onClick={() => { setQuery(''); setActive(null); }}>清空</button>}
          </div>
          <span>找到 {filtered.length} 条</span>
        </div>

        <div className={styles.list}>
          {filtered.map(({ entry, index }) => {
            const open = active === index;
            return <section className={`${styles.item}${open ? ` ${styles.open}` : ''}`} id={`metaphor-term-${index}`} key={`${entry.term}-${index}`}>
              <button className={styles.trigger} type="button" aria-expanded={open} onClick={() => toggle(index)}>
                <span className={styles.no}>{String(index + 1).padStart(3, '0')}</span>
                <span className={styles.heading}><b>{entry.term}</b><em>{entry.meaning}</em></span>
                <span className={styles.action}>{open ? '收起' : '查看'}<i aria-hidden="true">{open ? '−' : '+'}</i></span>
              </button>
              {open && <div className={styles.body}>
                <div><span>含义</span><p>{entry.meaning}</p></div>
                <div><span>常见写法</span><p>{entry.use}</p></div>
                <p className={styles.tip}>使用提醒：先看上下文关系是否匹配，再决定是否使用。比喻的作用是把逻辑说清楚，不是为了把文章写得“花”。</p>
              </div>}
            </section>;
          })}
          {!filtered.length && <div className={styles.empty}>没有搜到对应词条，可以换一个更短的关键词试试。</div>}
        </div>

        <footer className={styles.sources}>
          <h3>语料说明</h3>
          <p>本词库优先参考总书记重要讲话、中央与政府文件、新华社、人民日报等权威语料中的代表性表达。页面中的“含义”和“常见写法”为申论教学整理，不把每个词条都冒充为某篇讲话的逐字原句，也不建议脱离语境机械套用。</p>
          <div>{sourceLinks.map((source) => <a href={source.href} target="_blank" rel="noreferrer" key={source.href}>{source.label}<i>↗</i></a>)}</div>
        </footer>
      </>}
    </section>
  );
}
