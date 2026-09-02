'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { LearningContentFrame, useLearningChapterNavigation } from '../../learning-chapter-navigation';
import type { CaseHighlight, WritingCaseCategory } from './writing-case-data';
import type { HotspotCategory, HotspotHighlight } from './writing-hotspot-schema';
import { caseIndex, hotspotIndex, type CaseIndexItem, type HotspotIndexItem } from './writing-library-index';
import { WritingMetaphorLibrary } from './writing-metaphor-library';

type FoundationLibrary = typeof import('./writing-foundation-data');
type LearningHighlight = HotspotHighlight | CaseHighlight;
type WritingLayerKey = 'hotspots' | 'cases' | 'terms' | 'metaphors' | 'parallel' | 'sentences' | 'quotes' | 'essay';
type LoadState = 'idle' | 'loading' | 'ready' | 'error';
type GenericSelection = { category: string; leaf: string };
type FoundationModuleKey = 'terms' | 'parallel' | 'sentences' | 'quotes' | 'essay';
type SearchResult = { module: WritingLayerKey; category: string; leaf: string; label: string; meta: string; searchText: string };

const writingLayers = [
  { key: 'hotspots', no: '01', label: '热点时评', icon: '观', desc: '按知识领域读文章，练习立观点、选论据和拆结构。' },
  { key: 'cases', no: '02', label: '案例素材', icon: '例', desc: '先看懂事实，再把案例压缩成能服务观点的论据。' },
  { key: 'terms', no: '03', label: '规范用词', icon: '词', desc: '把口语化、零散的材料表达改得准确而简洁。' },
  { key: 'metaphors', no: '04', label: '比喻词库', icon: '喻', desc: '通过检索理解比喻关系，不按主题硬背。' },
  { key: 'parallel', no: '05', label: '对仗句库', icon: '对', desc: '从句间关系入手，积累有逻辑的成组表达。' },
  { key: 'sentences', no: '06', label: '主题佳句', icon: '句', desc: '按用途积累判断句、过渡句和收束句。' },
  { key: 'quotes', no: '07', label: '名人箴言', icon: '言', desc: '连同出处、语境和适用边界一起记。' },
  { key: 'essay', no: '08', label: '作文框架', icon: '文', desc: '沿着六个写作环节搭起一篇文章的骨架。' },
] as const;

const foundationIndex = {
  terms: [['problems', '问题表现'], ['causes', '原因分析'], ['measures', '措施表达'], ['outcomes', '成效概括'], ['government-verbs', '工作动词']],
  parallel: [['coordinate', '并列协同'], ['progressive', '递进深化'], ['contrastive-turn', '转折破题'], ['comparison', '正反对照'], ['three-part-subpoints', '三段分论点']],
  sentences: [['development', '发展'], ['governance', '治理'], ['livelihood', '民生'], ['culture', '文化'], ['ecology', '生态']],
  quotes: [['action-responsibility', '实干与担当'], ['learning-growth', '学习与成长'], ['people-centered', '人民立场'], ['innovation-reform', '创新与改革'], ['culture-inheritance', '文化与传承']],
  essay: [['title', '标题'], ['opening', '开头'], ['thesis', '总论点'], ['subpoints', '分论点'], ['evidence', '论据'], ['conclusion', '结尾']],
} as const;

const defaultSelections: Record<FoundationModuleKey, GenericSelection> = {
  terms: { category: 'problems', leaf: '0' },
  parallel: { category: 'coordinate', leaf: '' },
  sentences: { category: 'development', leaf: '0' },
  quotes: { category: 'action-responsibility', leaf: '0' },
  essay: { category: 'title', leaf: 'method' },
};

function normalizeIndexedSelection(selection: GenericSelection, categories: readonly { key: string; entries: readonly unknown[] }[]) {
  const category = categories.find((item) => item.key === selection.category) ?? categories[0];
  const leafIndex = Number(selection.leaf);
  const leaf = Number.isInteger(leafIndex) && leafIndex >= 0 && leafIndex < category.entries.length ? String(leafIndex) : '0';
  return { category: category.key, leaf };
}

const hotspotCache = new Map<string, HotspotCategory>();
const caseCache = new Map<string, WritingCaseCategory>();
let foundationPromise: Promise<FoundationLibrary> | null = null;
let searchIndexPromise: Promise<SearchResult[]> | null = null;

function loadFoundation() {
  foundationPromise ??= import('./writing-foundation-data');
  return foundationPromise;
}

async function loadHotspotCached(key: HotspotIndexItem['key']) {
  const cached = hotspotCache.get(key);
  if (cached) return cached;
  const { loadHotspotCategory } = await import('./writing-hotspot-loader');
  const category = await loadHotspotCategory(key);
  hotspotCache.set(key, category);
  return category;
}

async function loadCaseCached(key: CaseIndexItem['key']) {
  const cached = caseCache.get(key);
  if (cached) return cached;
  const { loadCaseCategory } = await import('./writing-case-loader');
  const category = await loadCaseCategory(key);
  caseCache.set(key, category);
  return category;
}

function decodeHash() {
  return window.location.hash.replace(/^#/, '').split('/').filter(Boolean).map((part) => decodeURIComponent(part));
}

function setHash(parts: string[]) {
  const hash = parts.map((part) => encodeURIComponent(part)).join('/');
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${hash}`);
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

async function buildSearchIndex() {
  if (searchIndexPromise) return searchIndexPromise;
  searchIndexPromise = (async () => {
    const [foundation, metaphorModule, hotspots, cases] = await Promise.all([
      loadFoundation(),
      import('./writing-metaphor-data'),
      Promise.all(hotspotIndex.map((item) => loadHotspotCached(item.key))),
      Promise.all(caseIndex.map((item) => loadCaseCached(item.key))),
    ]);
    const results: SearchResult[] = [];
    hotspots.forEach((category) => category.articles.forEach((entry) => results.push({ module: 'hotspots', category: category.key, leaf: entry.slug, label: entry.title, meta: `热点时评 · ${category.label}`, searchText: `${entry.title}${entry.intro}${entry.thesis}${entry.tags.join('')}` })));
    cases.forEach((category) => category.cases.forEach((entry) => results.push({ module: 'cases', category: category.key, leaf: entry.slug, label: entry.title, meta: `案例素材 · ${category.label}`, searchText: `${entry.title}${entry.summary}${entry.tags.join('')}` })));
    foundation.termCategories.forEach((category) => category.entries.forEach((entry, index) => results.push({ module: 'terms', category: category.key, leaf: String(index), label: entry.after, meta: `规范用词 · ${category.label}`, searchText: `${entry.before}${entry.after}${entry.note}` })));
    foundation.parallelCategories.forEach((category) => results.push({ module: 'parallel', category: category.key, leaf: '', label: category.label, meta: '对仗句库', searchText: category.entries.map((entry) => `${entry.first}${entry.second}${entry.note}`).join('') }));
    foundation.sentenceCategories.forEach((category) => category.entries.forEach((entry, index) => results.push({ module: 'sentences', category: category.key, leaf: String(index), label: entry.text, meta: `主题佳句 · ${category.label}`, searchText: `${entry.purpose}${entry.text}` })));
    foundation.quoteCategories.forEach((category) => category.entries.forEach((entry, index) => results.push({ module: 'quotes', category: category.key, leaf: String(index), label: entry.text, meta: `名人箴言 · ${category.label}`, searchText: `${entry.text}${entry.author}${entry.source}${entry.context}${entry.boundary}` })));
    const facetLabels = { method: '写法', counterexample: '常见问题', example: '迁移示例' } as const;
    foundation.essayStages.forEach((stage) => Object.entries(facetLabels).forEach(([leaf, label]) => results.push({ module: 'essay', category: stage.key, leaf, label: `${stage.label} · ${label}`, meta: '作文框架', searchText: `${stage.label}${stage.method}${stage.counterexample}${stage.example}` })));
    metaphorModule.metaphorEntries.forEach((entry) => results.push({ module: 'metaphors', category: 'library', leaf: entry.term, label: entry.term, meta: '比喻词库', searchText: `${entry.term}${entry.meaning}${entry.use}` }));
    return results;
  })();
  return searchIndexPromise;
}

function LoadingBlock({ label }: { label: string }) {
  return <section className="writing-placeholder-article"><span>请稍候</span><h2>正在打开{label}</h2><p>内容较多，第一次打开可能需要一点时间。</p></section>;
}

function ErrorBlock({ label, retry }: { label: string; retry: () => void }) {
  return <section className="writing-placeholder-article"><span>暂时未打开</span><h2>{label}加载失败</h2><p>你可以重试这一部分，已经浏览过的内容不会受到影响。</p><button className="writing-library-back" type="button" onClick={retry}>重新加载</button></section>;
}

function Breadcrumb({ items }: { items: string[] }) {
  return <nav className="writing-breadcrumb" aria-label="当前位置">{items.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}</nav>;
}

function TreeBranch({ active, children, label, onClick }: { active: boolean; children?: ReactNode; label: string; onClick: () => void }) {
  return <div className={`writing-tree-branch${active ? ' open' : ''}`}><button aria-expanded={children ? active : undefined} className={active ? 'active' : ''} onClick={onClick} type="button"><b>{label}</b>{children ? <i aria-hidden="true">⌄</i> : null}</button>{active ? children : null}</div>;
}

function TreeLeaves({ children, label }: { children: ReactNode; label: string }) {
  return <nav className="writing-tree-leaves" aria-label={label}>{children}</nav>;
}

export function WritingLibraryManual() {
  const { activeId, activateChapter } = useLearningChapterNavigation();
  const activeLayer = (activeId.replace('writing-', '') || 'hotspots') as WritingLayerKey;
  const [hotspotKey, setHotspotKey] = useState<HotspotIndexItem['key']>('development');
  const [hotspotCategory, setHotspotCategory] = useState<HotspotCategory | null>(null);
  const [hotspotState, setHotspotState] = useState<LoadState>('loading');
  const [hotspotReload, setHotspotReload] = useState(0);
  const [activeArticle, setActiveArticle] = useState('');
  const [caseKey, setCaseKey] = useState<CaseIndexItem['key']>('people');
  const [caseCategory, setCaseCategory] = useState<WritingCaseCategory | null>(null);
  const [caseState, setCaseState] = useState<LoadState>('loading');
  const [caseReload, setCaseReload] = useState(0);
  const [activeCase, setActiveCase] = useState('');
  const [foundation, setFoundation] = useState<FoundationLibrary | null>(null);
  const [foundationState, setFoundationState] = useState<LoadState>('loading');
  const [selections, setSelections] = useState(defaultSelections);
  const [metaphorQuery, setMetaphorQuery] = useState('');
  const [query, setQuery] = useState('');
  const [searchState, setSearchState] = useState<LoadState>('idle');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [restored, setRestored] = useState(false);
  const hotspotRequest = useRef(0);
  const caseRequest = useRef(0);
  const restoredOnce = useRef(false);
  const currentLayer = writingLayers.find((item) => item.key === activeLayer) ?? writingLayers[0];

  const openHotspot = useCallback((key: HotspotIndexItem['key'], slug = '') => {
    if (key !== hotspotKey) setHotspotState('loading');
    setHotspotKey(key);
    if (slug) setActiveArticle(slug);
  }, [hotspotKey]);

  const openCase = useCallback((key: CaseIndexItem['key'], slug = '') => {
    if (key !== caseKey) setCaseState('loading');
    setCaseKey(key);
    if (slug) setActiveCase(slug);
  }, [caseKey]);

  useEffect(() => {
    if (activeLayer !== 'hotspots') return;
    const request = ++hotspotRequest.current;
    void loadHotspotCached(hotspotKey).then((category) => {
      if (request !== hotspotRequest.current) return;
      setHotspotCategory(category);
      setActiveArticle((current) => category.articles.some((item) => item.slug === current) ? current : category.articles[0]?.slug ?? '');
      setHotspotState('ready');
    }).catch(() => request === hotspotRequest.current && setHotspotState('error'));
  }, [activeLayer, hotspotKey, hotspotReload]);

  useEffect(() => {
    if (activeLayer !== 'cases') return;
    const request = ++caseRequest.current;
    void loadCaseCached(caseKey).then((category) => {
      if (request !== caseRequest.current) return;
      setCaseCategory(category);
      setActiveCase((current) => category.cases.some((item) => item.slug === current) ? current : category.cases[0]?.slug ?? '');
      setCaseState('ready');
    }).catch(() => request === caseRequest.current && setCaseState('error'));
  }, [activeLayer, caseKey, caseReload]);

  useEffect(() => {
    if (!['terms', 'parallel', 'sentences', 'quotes', 'essay'].includes(activeLayer) || foundation) return;
    let cancelled = false;
    void loadFoundation().then((library) => {
      if (cancelled) return;
      setFoundation(library);
      setSelections((current) => {
        const parallel = library.parallelCategories.some((item) => item.key === current.parallel.category)
          ? current.parallel
          : { category: library.parallelCategories[0].key, leaf: '' };
        const essayStage = library.essayStages.some((item) => item.key === current.essay.category)
          ? current.essay.category
          : library.essayStages[0].key;
        const essayLeaf = ['method', 'counterexample', 'example'].includes(current.essay.leaf) ? current.essay.leaf : 'method';
        return {
          terms: normalizeIndexedSelection(current.terms, library.termCategories),
          parallel,
          sentences: normalizeIndexedSelection(current.sentences, library.sentenceCategories),
          quotes: normalizeIndexedSelection(current.quotes, library.quoteCategories),
          essay: { category: essayStage, leaf: essayLeaf },
        };
      });
      setFoundationState('ready');
    }).catch(() => !cancelled && setFoundationState('error'));
    return () => { cancelled = true; };
  }, [activeLayer, foundation]);

  useEffect(() => {
    if (restoredOnce.current) return;
    restoredOnce.current = true;
    const hashParts = decodeHash();
    const requested = hashParts[0] as WritingLayerKey | undefined;
    const requestedLayer = writingLayers.some((item) => item.key === requested) ? requested! : 'hotspots';
    const stored = window.sessionStorage.getItem(`writing-library-last-${requestedLayer}`)?.split('/') ?? [];
    const parts = hashParts.length ? hashParts : stored;
    const timer = window.setTimeout(() => {
      activateChapter(`writing-${requestedLayer}`, null, 'directory');
      if (requestedLayer === 'hotspots' && hotspotIndex.some((item) => item.key === parts[1])) openHotspot(parts[1] as HotspotIndexItem['key'], parts[2]);
      if (requestedLayer === 'cases' && caseIndex.some((item) => item.key === parts[1])) openCase(parts[1] as CaseIndexItem['key'], parts[2]);
      if (['terms', 'parallel', 'sentences', 'quotes', 'essay'].includes(requestedLayer) && parts[1]) {
        setSelections((current) => ({ ...current, [requestedLayer]: { category: parts[1], leaf: parts[2] ?? '' } }));
      }
      if (requestedLayer === 'metaphors' && parts[1]) setMetaphorQuery(parts[1]);
      setRestored(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [activateChapter, openCase, openHotspot]);

  const currentPath = useMemo(() => {
    if (!restored) return [];
    if (activeLayer === 'hotspots') return activeArticle ? ['hotspots', hotspotKey, activeArticle] : [];
    if (activeLayer === 'cases') return activeCase ? ['cases', caseKey, activeCase] : [];
    if (activeLayer === 'metaphors') return ['metaphors', metaphorQuery || 'library'];
    const selection = selections[activeLayer];
    return [activeLayer, selection.category, ...(selection.leaf ? [selection.leaf] : [])];
  }, [activeArticle, activeCase, activeLayer, caseKey, hotspotKey, metaphorQuery, restored, selections]);

  useEffect(() => {
    if (!currentPath.length) return;
    setHash(currentPath);
    window.sessionStorage.setItem(`writing-library-last-${activeLayer}`, currentPath.join('/'));
  }, [activeLayer, currentPath]);

  useEffect(() => {
    const keyword = query.trim().toLowerCase();
    if (keyword.length < 2) return;
    let cancelled = false;
    const timer = window.setTimeout(() => {
      setSearchState('loading');
      void buildSearchIndex().then((index) => {
        if (cancelled) return;
        setSearchResults(index.filter((item) => `${item.label}${item.meta}${item.searchText}`.toLowerCase().includes(keyword)).slice(0, 40));
        setSearchState('ready');
      }).catch(() => !cancelled && setSearchState('error'));
    }, 180);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [query]);

  const selectGeneric = (module: FoundationModuleKey, category: string, leaf = '') => {
    setSelections((current) => ({ ...current, [module]: { category, leaf } }));
  };

  const selectSearchResult = (result: SearchResult) => {
    activateChapter(`writing-${result.module}`, null, 'directory');
    if (result.module === 'hotspots') openHotspot(result.category as HotspotIndexItem['key'], result.leaf);
    else if (result.module === 'cases') openCase(result.category as CaseIndexItem['key'], result.leaf);
    else if (result.module === 'metaphors') setMetaphorQuery(result.leaf);
    else selectGeneric(result.module, result.category, result.leaf);
    setQuery('');
  };

  function foundationCategory<T extends { key: string }>(items: readonly T[], module: 'terms' | 'parallel' | 'sentences' | 'quotes') {
    return items.find((item) => item.key === selections[module].category) ?? items[0];
  }

  const genericDetails = (module: FoundationModuleKey) => {
    const index = foundationIndex[module];
    const selection = selections[module];
    return <div className="writing-tree-level-two">{index.map(([key, label]) => {
      const active = selection.category === key;
      if (module === 'parallel') return <TreeBranch active={active} key={key} label={label} onClick={() => selectGeneric(module, key)} />;
      let entries: readonly (readonly [string, string])[] = [];
      if (module === 'essay') entries = [['method', '写法'], ['counterexample', '常见问题'], ['example', '迁移示例']];
      else if (foundation && module === 'terms') entries = foundation.termCategories.find((item) => item.key === key)?.entries.map((entry, entryIndex) => [String(entryIndex), entry.after] as const) ?? [];
      else if (foundation && module === 'sentences') entries = foundation.sentenceCategories.find((item) => item.key === key)?.entries.map((entry, entryIndex) => [String(entryIndex), entry.text] as const) ?? [];
      else if (foundation && module === 'quotes') entries = foundation.quoteCategories.find((item) => item.key === key)?.entries.map((entry, entryIndex) => [String(entryIndex), entry.text] as const) ?? [];
      return <TreeBranch active={active} key={key} label={label} onClick={() => selectGeneric(module, key, active ? selection.leaf : module === 'essay' ? 'method' : '0')}>
        <TreeLeaves label={`${label}目录`}>{entries.map(([leaf, leafLabel]) => <button className={active && selection.leaf === leaf ? 'active' : ''} key={leaf} onClick={() => selectGeneric(module, key, leaf)} type="button">{leafLabel}</button>)}</TreeLeaves>
      </TreeBranch>;
    })}</div>;
  };

  const details: Record<string, ReactNode> = {
    'writing-hotspots': <div className="writing-tree-level-two">{hotspotIndex.map((category) => {
      const active = hotspotKey === category.key;
      const ready = active && hotspotCategory?.key === category.key && hotspotState === 'ready';
      return <TreeBranch active={active} key={category.key} label={category.label} onClick={() => openHotspot(category.key)}>
        {ready ? <TreeLeaves label={`${category.label}文章`}>{hotspotCategory.articles.map((entry) => <button className={activeArticle === entry.slug ? 'active' : ''} key={entry.slug} onClick={() => setActiveArticle(entry.slug)} type="button">{entry.title}</button>)}</TreeLeaves> : <span className="writing-tree-status">正在打开文章目录…</span>}
      </TreeBranch>;
    })}</div>,
    'writing-cases': <div className="writing-tree-level-two">{caseIndex.map((category) => {
      const active = caseKey === category.key;
      const ready = active && caseCategory?.key === category.key && caseState === 'ready';
      return <TreeBranch active={active} key={category.key} label={category.label} onClick={() => openCase(category.key)}>
        {ready ? <TreeLeaves label={`${category.label}案例`}>{caseCategory.cases.map((entry) => <button className={activeCase === entry.slug ? 'active' : ''} key={entry.slug} onClick={() => setActiveCase(entry.slug)} type="button">{entry.title}</button>)}</TreeLeaves> : <span className="writing-tree-status">正在打开案例目录…</span>}
      </TreeBranch>;
    })}</div>,
    'writing-terms': genericDetails('terms'),
    'writing-metaphors': <div className="writing-tree-level-two"><TreeBranch active label="检索词库" onClick={() => undefined} /></div>,
    'writing-parallel': genericDetails('parallel'),
    'writing-sentences': genericDetails('sentences'),
    'writing-quotes': genericDetails('quotes'),
    'writing-essay': genericDetails('essay'),
  };

  const searchTools = <div className="writing-library-search">
    <label htmlFor="writing-library-search-input">搜索全部写作积累</label>
    <div><input id="writing-library-search-input" onChange={(event) => { setQuery(event.target.value); if (event.target.value.trim().length < 2) { setSearchResults([]); setSearchState('idle'); } }} placeholder="输入主题、案例、词句或作者" value={query} />{query ? <button onClick={() => { setQuery(''); setSearchResults([]); setSearchState('idle'); }} type="button">清空</button> : null}</div>
    {query.trim().length >= 2 ? <div className="writing-search-results" aria-live="polite">
      {searchState === 'loading' ? <span>正在查找相关内容…</span> : null}
      {searchState === 'error' ? <span>暂时无法搜索，请稍后再试。</span> : null}
      {searchState === 'ready' && !searchResults.length ? <span>没有找到相关内容，试试更短的关键词。</span> : null}
      {searchResults.map((result) => <button key={`${result.module}-${result.category}-${result.leaf}`} onClick={() => selectSearchResult(result)} type="button"><b>{result.label}</b><span>{result.meta}</span></button>)}
    </div> : null}
  </div>;

  const article = hotspotCategory?.articles.find((item) => item.slug === activeArticle) ?? null;
  const caseItem = caseCategory?.cases.find((item) => item.slug === activeCase) ?? null;

  function renderReading() {
    if (activeLayer === 'hotspots') {
      if (hotspotState === 'loading') return <LoadingBlock label="热点文章" />;
      if (hotspotState === 'error') return <ErrorBlock label="热点文章" retry={() => { hotspotCache.delete(hotspotKey); setHotspotReload((value) => value + 1); }} />;
      if (!article || !hotspotCategory) return <LoadingBlock label="热点文章" />;
      return <section className="writing-module-view writing-hotspot-view" data-writing-module="hotspots">
        <Breadcrumb items={['写作积累', '热点时评', hotspotCategory.label, article.title]} />
        <header><span>{currentLayer.icon}</span><div><p>{hotspotCategory.label}</p><h2>{article.title}</h2><em>{article.tags.join(' · ')}</em></div></header>
        <article className="writing-editorial-paper"><p className="writing-paper-intro">{annotate(article.intro, article.highlights)}<strong>{annotate(article.thesis, article.highlights)}</strong></p>{article.sections.map((section) => <section key={section.title}><h3>{annotate(section.title, article.highlights)}</h3><p>{annotate(section.body, article.highlights)}</p></section>)}<p>{annotate(article.conclusion, article.highlights)}</p></article>
      </section>;
    }
    if (activeLayer === 'cases') {
      if (caseState === 'loading') return <LoadingBlock label="案例素材" />;
      if (caseState === 'error') return <ErrorBlock label="案例素材" retry={() => { caseCache.delete(caseKey); setCaseReload((value) => value + 1); }} />;
      if (!caseItem || !caseCategory) return <LoadingBlock label="案例素材" />;
      return <section className="writing-module-view writing-case-dossier" data-writing-module="cases">
        <Breadcrumb items={['写作积累', '案例素材', caseCategory.label, caseItem.title]} />
        <header><span>{currentLayer.icon}</span><div><p>{caseCategory.label}</p><h2>{caseItem.title}</h2><em>{caseItem.tags.join(' · ')}</em></div></header>
        <section className="writing-dossier-facts"><b>案例原貌</b><p>{caseItem.summary}</p></section>
        <div className="writing-dossier-uses">{caseItem.usages.map((usage) => <article key={usage.title}><span>写进文章</span><h3>{usage.title}</h3><p>{annotate(usage.text, usage.highlights)}</p></article>)}</div>
      </section>;
    }
    if (activeLayer === 'metaphors') return <section className="writing-module-view" data-writing-module="metaphors"><Breadcrumb items={['写作积累', '比喻词库', metaphorQuery || '检索词库']} /><WritingMetaphorLibrary initialQuery={metaphorQuery === 'library' ? '' : metaphorQuery} key={metaphorQuery} /></section>;
    if (foundationState === 'loading' || !foundation) return <LoadingBlock label={currentLayer.label} />;
    if (foundationState === 'error') return <ErrorBlock label={currentLayer.label} retry={() => { foundationPromise = null; setFoundationState('idle'); void loadFoundation().then((library) => { setFoundation(library); setFoundationState('ready'); }); }} />;

    if (activeLayer === 'terms') {
      const category = foundationCategory(foundation.termCategories, 'terms');
      const entry = category.entries[Number(selections.terms.leaf)] ?? category.entries[0];
      return <section className="writing-module-view writing-term-workbench" data-writing-module="terms"><Breadcrumb items={['写作积累', '规范用词', category.label, entry.after]} /><header><span>{currentLayer.icon}</span><div><p>{category.label}</p><h2>把意思说准，再把句子写短</h2><em>{category.desc}</em></div></header><div className="writing-term-compare"><article><span>材料里常见</span><p>{entry.before}</p></article><i aria-hidden="true">→</i><article><span>规范表达</span><p>{entry.after}</p></article></div><aside><b>怎么用</b><p>{entry.note}</p></aside></section>;
    }
    if (activeLayer === 'parallel') {
      const category = foundationCategory(foundation.parallelCategories, 'parallel');
      return <section className="writing-module-view writing-parallel-board" data-writing-module="parallel"><Breadcrumb items={['写作积累', '对仗句库', category.label]} /><header><span>{currentLayer.icon}</span><div><p>句间关系</p><h2>{category.label}</h2><em>{category.desc}</em></div></header><div className="writing-parallel-list">{category.entries.map((entry, index) => <article key={`${entry.first}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><div><p>{entry.first}</p><i aria-hidden="true" /><p>{entry.second}</p><em>{entry.note}</em></div></article>)}</div></section>;
    }
    if (activeLayer === 'sentences') {
      const category = foundationCategory(foundation.sentenceCategories, 'sentences');
      const entry = category.entries[Number(selections.sentences.leaf)] ?? category.entries[0];
      return <section className="writing-module-view writing-sentence-notebook" data-writing-module="sentences"><Breadcrumb items={['写作积累', '主题佳句', category.label, entry.purpose]} /><header><span>{currentLayer.icon}</span><div><p>{category.label}</p><h2>{entry.purpose}</h2><em>{category.desc}</em></div></header><blockquote>{entry.text}</blockquote><p className="writing-copy-practice">先判断这句话承担什么作用，再替换其中的主题词。不要脱离段落逻辑单独套用。</p></section>;
    }
    if (activeLayer === 'quotes') {
      const category = foundationCategory(foundation.quoteCategories, 'quotes');
      const entry = category.entries[Number(selections.quotes.leaf)] ?? category.entries[0];
      return <section className="writing-module-view writing-quote-card" data-writing-module="quotes"><Breadcrumb items={['写作积累', '名人箴言', category.label, entry.author]} /><header><span>{currentLayer.icon}</span><div><p>{category.label}</p><h2>{entry.author}</h2><em>{entry.source}</em></div></header><blockquote>{entry.text}</blockquote><div><article><b>适用语境</b><p>{entry.context}</p></article><article><b>使用边界</b><p>{entry.boundary}</p></article></div></section>;
    }
    const stage = foundation.essayStages.find((item) => item.key === selections.essay.category) ?? foundation.essayStages[0];
    const facet = selections.essay.leaf || 'method';
    const facetLabel = facet === 'counterexample' ? '常见问题' : facet === 'example' ? '迁移示例' : '写法';
    const facetText = facet === 'counterexample' ? stage.counterexample : facet === 'example' ? stage.example : stage.method;
    return <section className="writing-module-view writing-essay-blueprint" data-writing-module="essay"><Breadcrumb items={['写作积累', '作文框架', stage.label, facetLabel]} /><header><span>{currentLayer.icon}</span><div><p>文章骨架 · {stage.no}</p><h2>{stage.label}</h2><em>一篇文章要沿着结构向前推进，而不是把好句子堆在一起。</em></div></header><div className="writing-blueprint-track">{foundation.essayStages.map((item) => <span className={item.key === stage.key ? 'active' : ''} key={item.key}>{item.no}<b>{item.label}</b></span>)}</div><article><span>{facetLabel}</span><p>{facetText}</p></article></section>;
  }

  return <LearningContentFrame details={details} directoryTools={searchTools} label="写作积累学习目录">
    <div className={`writing-manual-surface writing-module-${activeLayer}`} id={`writing-${activeLayer}`}>{renderReading()}</div>
  </LearningContentFrame>;
}
