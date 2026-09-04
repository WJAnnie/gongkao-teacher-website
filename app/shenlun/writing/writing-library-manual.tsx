'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { LearningContentFrame, LearningSecondaryDirectory, useLearningChapterNavigation } from '../../learning-chapter-navigation';
import type { CaseHighlight, WritingCaseCategory } from './writing-case-data';
import type { HotspotCategory, HotspotHighlight } from './writing-hotspot-schema';
import { hotspotLeafIndex, caseLeafIndex } from './writing-library-leaf-index';
import { caseIndex, hotspotIndex, type CaseIndexItem, type HotspotIndexItem } from './writing-library-index';
import { WritingInlineDisclosure } from './writing-inline-disclosure';
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
  sentences: [['development', '发展'], ['livelihood', '民生'], ['ecology', '生态'], ['culture', '文化'], ['governance', '治理']],
  quotes: [['people-centered', '人民立场'], ['action-responsibility', '实干与担当'], ['learning-growth', '学习与成长'], ['innovation-reform', '创新与改革'], ['culture-inheritance', '文化与传承']],
  essay: [['title', '标题'], ['opening', '开头'], ['thesis', '总论点'], ['subpoints', '分论点'], ['evidence', '论据'], ['conclusion', '结尾']],
} as const;

const defaultSelections: Record<FoundationModuleKey, GenericSelection> = {
  terms: { category: 'problems', leaf: '' },
  parallel: { category: 'coordinate', leaf: '' },
  sentences: { category: 'development', leaf: '' },
  quotes: { category: 'people-centered', leaf: '' },
  essay: { category: 'title', leaf: '' },
};

function normalizeIndexedSelection(selection: GenericSelection, categories: readonly { key: string; entries: readonly unknown[] }[]) {
  const category = categories.find((item) => item.key === selection.category) ?? categories[0];
  const leafIndex = Number(selection.leaf);
  const leaf = Number.isInteger(leafIndex) && leafIndex >= 0 && leafIndex < category.entries.length ? String(leafIndex) : '';
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

function SecondaryDirectory({ active, items, label, onSelect }: {
  active: string;
  items: readonly (readonly [string, string])[];
  label: string;
  onSelect: (key: string) => void;
}) {
  return <LearningSecondaryDirectory
    active={active}
    items={items.map(([key, itemLabel]) => ({ key, label: itemLabel }))}
    label={label}
    onSelect={onSelect}
  />;
}

export function WritingLibraryManual() {
  const { activeId, activateChapter } = useLearningChapterNavigation();
  const activeLayer = (activeId.replace('writing-', '') || 'hotspots') as WritingLayerKey;
  const [hotspotKey, setHotspotKey] = useState<HotspotIndexItem['key']>('economy');
  const [hotspotCategory, setHotspotCategory] = useState<HotspotCategory | null>(null);
  const [hotspotState, setHotspotState] = useState<LoadState>('idle');
  const [hotspotReload, setHotspotReload] = useState(0);
  const [activeArticle, setActiveArticle] = useState('');
  const [caseKey, setCaseKey] = useState<CaseIndexItem['key']>('people');
  const [caseCategory, setCaseCategory] = useState<WritingCaseCategory | null>(null);
  const [caseState, setCaseState] = useState<LoadState>('idle');
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
    setHotspotKey(key);
    setActiveArticle(slug);
  }, []);

  const openCase = useCallback((key: CaseIndexItem['key'], slug = '') => {
    setCaseKey(key);
    setActiveCase(slug);
  }, []);

  useEffect(() => {
    if (activeLayer !== 'hotspots') return;
    if (!activeArticle) return;
    const request = ++hotspotRequest.current;
    void Promise.resolve().then(() => {
      if (request !== hotspotRequest.current) return;
      setHotspotState('loading');
      loadHotspotCached(hotspotKey).then((category) => {
        if (request !== hotspotRequest.current) return;
        setHotspotCategory(category);
        setHotspotState('ready');
      }).catch(() => { if (request === hotspotRequest.current) setHotspotState('error'); });
    });
  }, [activeLayer, activeArticle, hotspotKey, hotspotReload]);

  useEffect(() => {
    if (activeLayer !== 'cases') return;
    if (!activeCase) return;
    const request = ++caseRequest.current;
    void Promise.resolve().then(() => {
      if (request !== caseRequest.current) return;
      setCaseState('loading');
      loadCaseCached(caseKey).then((category) => {
        if (request !== caseRequest.current) return;
        setCaseCategory(category);
        setCaseState('ready');
      }).catch(() => { if (request === caseRequest.current) setCaseState('error'); });
    });
  }, [activeLayer, activeCase, caseKey, caseReload]);

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
        const essayLeaf = ['method', 'counterexample', 'example'].includes(current.essay.leaf) ? current.essay.leaf : '';
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
      activateChapter(`writing-${requestedLayer}`, null, 'restore');
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
    if (activeLayer === 'hotspots') return ['hotspots', hotspotKey, ...(activeArticle ? [activeArticle] : [])];
    if (activeLayer === 'cases') return ['cases', caseKey, ...(activeCase ? [activeCase] : [])];
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

  const toggleHotspotArticle = (slug: string) => {
    setActiveArticle((current) => current === slug ? '' : slug);
  };

  const toggleCaseItem = (slug: string) => {
    setActiveCase((current) => current === slug ? '' : slug);
  };

  const toggleGenericLeaf = (module: FoundationModuleKey, leaf: string) => {
    setSelections((current) => ({
      ...current,
      [module]: {
        ...current[module],
        leaf: current[module].leaf === leaf ? '' : leaf,
      },
    }));
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

  const details: Record<string, ReactNode> = {
    'writing-hotspots': <SecondaryDirectory active={hotspotKey} items={hotspotIndex.map((item) => [item.key, item.label] as const)} label="热点时评细目" onSelect={(key) => openHotspot(key as HotspotIndexItem['key'])} />,
    'writing-cases': <SecondaryDirectory active={caseKey} items={caseIndex.map((item) => [item.key, item.label] as const)} label="案例素材细目" onSelect={(key) => openCase(key as CaseIndexItem['key'])} />,
    'writing-terms': <SecondaryDirectory active={selections.terms.category} items={foundationIndex.terms} label="规范用词细目" onSelect={(key) => selectGeneric('terms', key)} />,
    'writing-metaphors': <SecondaryDirectory active="library" items={[['library', '检索词库']]} label="比喻词库细目" onSelect={() => undefined} />,
    'writing-parallel': <SecondaryDirectory active={selections.parallel.category} items={foundationIndex.parallel} label="对仗句库细目" onSelect={(key) => selectGeneric('parallel', key)} />,
    'writing-sentences': <SecondaryDirectory active={selections.sentences.category} items={foundationIndex.sentences} label="主题佳句细目" onSelect={(key) => selectGeneric('sentences', key)} />,
    'writing-quotes': <SecondaryDirectory active={selections.quotes.category} items={foundationIndex.quotes} label="名人箴言细目" onSelect={(key) => selectGeneric('quotes', key)} />,
    'writing-essay': <SecondaryDirectory active={selections.essay.category} items={foundationIndex.essay} label="作文框架细目" onSelect={(key) => selectGeneric('essay', key)} />,
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
  const hotspotMeta = hotspotIndex.find((item) => item.key === hotspotKey) ?? hotspotIndex[0];
  const caseMeta = caseIndex.find((item) => item.key === caseKey) ?? caseIndex[0];
  const hotspotItems = hotspotLeafIndex[hotspotKey].map((item) => ({ id: item.slug, no: item.no, title: item.title }));
  const caseItems = caseLeafIndex[caseKey].map((item) => ({ id: item.slug, no: item.no, title: item.title }));

  function renderReading() {
    if (activeLayer === 'hotspots') {
      return <section className="writing-module-view writing-hotspot-view" data-writing-module="hotspots">
        <Breadcrumb items={['写作积累', '热点时评', hotspotMeta.label]} />
        <WritingInlineDisclosure
          activeId={activeArticle}
          items={hotspotItems}
          label={`${hotspotMeta.label}专题文章`}
          onToggle={toggleHotspotArticle}
        >
          {hotspotState === 'loading' ? <LoadingBlock label="热点文章" /> : null}
          {hotspotState === 'error' ? <ErrorBlock label="热点文章" retry={() => { hotspotCache.delete(hotspotKey); setHotspotReload((value) => value + 1); }} /> : null}
          {hotspotState === 'ready' && article ? <article className="writing-editorial-paper">
            <header><h2>{article.title}</h2></header>
            <p className="writing-paper-intro">{annotate(article.intro, article.highlights)}<strong className="writing-paper-inline-thesis">{annotate(article.thesis, article.highlights)}</strong></p>
            {article.sections.map((section) => <p key={section.title} className="writing-paper-point"><strong className="writing-paper-inline-point">{annotate(section.title, article.highlights)}</strong>{annotate(section.body, article.highlights)}</p>)}
            <p>{annotate(article.conclusion, article.highlights)}</p>
          </article> : null}
        </WritingInlineDisclosure>
      </section>;
    }
    if (activeLayer === 'cases') {
      return <section className="writing-module-view writing-case-view" data-writing-module="cases">
        <Breadcrumb items={['写作积累', '案例素材', caseMeta.label]} />
        <WritingInlineDisclosure
          activeId={activeCase}
          items={caseItems}
          label={`${caseMeta.label}案例素材`}
          onToggle={toggleCaseItem}
        >
          {caseState === 'loading' ? <LoadingBlock label="案例素材" /> : null}
          {caseState === 'error' ? <ErrorBlock label="案例素材" retry={() => { caseCache.delete(caseKey); setCaseReload((value) => value + 1); }} /> : null}
          {caseState === 'ready' && caseItem ? <article className="writing-editorial-paper writing-case-article">
            <header><span>{currentLayer.icon}</span><div><p>{caseMeta.label}</p><h2>{caseItem.title}</h2><em>{caseItem.tags.join(' · ')}</em></div></header>
            <section><h3>案例原貌</h3><p>{caseItem.summary}</p></section>
            {caseItem.usages.map((usage) => <section key={usage.title}><h3>{usage.title}</h3><p>{annotate(usage.text, usage.highlights)}</p></section>)}
          </article> : null}
        </WritingInlineDisclosure>
      </section>;
    }
    if (activeLayer === 'metaphors') return <section className="writing-module-view" data-writing-module="metaphors"><Breadcrumb items={['写作积累', '比喻词库', metaphorQuery || '检索词库']} /><WritingMetaphorLibrary initialQuery={metaphorQuery === 'library' ? '' : metaphorQuery} key={metaphorQuery} /></section>;
    if (foundationState === 'loading' || !foundation) return <LoadingBlock label={currentLayer.label} />;
    if (foundationState === 'error') return <ErrorBlock label={currentLayer.label} retry={() => { foundationPromise = null; setFoundationState('idle'); void loadFoundation().then((library) => { setFoundation(library); setFoundationState('ready'); }); }} />;

    if (activeLayer === 'terms') {
      const category = foundationCategory(foundation.termCategories, 'terms');
      return <section className="writing-module-view writing-term-workbench" data-writing-module="terms"><Breadcrumb items={['写作积累', '规范用词', category.label]} /><header><span>{currentLayer.icon}</span><div><p>{category.label}</p><h2>把意思说准，再把句子写短</h2><em>{category.desc}</em></div></header>
        <WritingInlineDisclosure activeId={selections.terms.leaf} items={category.entries.map((entry, index) => ({ id: String(index), no: String(index + 1).padStart(2, '0'), title: entry.after, meta: entry.before }))} label={`${category.label}规范用词`} onToggle={(leaf) => toggleGenericLeaf('terms', leaf)}>
          {(() => { const entry = category.entries[Number(selections.terms.leaf)]; return entry ? <><div className="writing-term-compare"><article><span>材料里常见</span><p>{entry.before}</p></article><i aria-hidden="true">→</i><article><span>规范表达</span><p>{entry.after}</p></article></div><aside><b>怎么用</b><p>{entry.note}</p></aside></> : null; })()}
        </WritingInlineDisclosure>
      </section>;
    }
    if (activeLayer === 'parallel') {
      const category = foundationCategory(foundation.parallelCategories, 'parallel');
      return <section className="writing-module-view writing-parallel-board" data-writing-module="parallel"><Breadcrumb items={['写作积累', '对仗句库', category.label]} /><header><span>{currentLayer.icon}</span><div><p>句间关系</p><h2>{category.label}</h2><em>{category.desc}</em></div></header><div className="writing-parallel-list">{category.entries.map((entry, index) => <article key={`${entry.first}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><div><p>{entry.first}</p><i aria-hidden="true" /><p>{entry.second}</p><em>{entry.note}</em></div></article>)}</div></section>;
    }
    if (activeLayer === 'sentences') {
      const category = foundationCategory(foundation.sentenceCategories, 'sentences');
      return <section className="writing-module-view writing-sentence-notebook" data-writing-module="sentences"><Breadcrumb items={['写作积累', '主题佳句', category.label]} /><header><span>{currentLayer.icon}</span><div><p>{category.label}</p><h2>按用途积累表达</h2><em>{category.desc}</em></div></header>
        <WritingInlineDisclosure activeId={selections.sentences.leaf} items={category.entries.map((entry, index) => ({ id: String(index), no: String(index + 1).padStart(2, '0'), title: entry.purpose, meta: entry.text }))} label={`${category.label}主题佳句`} onToggle={(leaf) => toggleGenericLeaf('sentences', leaf)}>
          {(() => { const entry = category.entries[Number(selections.sentences.leaf)]; return entry ? <><blockquote>{entry.text}</blockquote><p className="writing-copy-practice">先判断这句话承担什么作用，再替换其中的主题词。不要脱离段落逻辑单独套用。</p></> : null; })()}
        </WritingInlineDisclosure>
      </section>;
    }
    if (activeLayer === 'quotes') {
      const category = foundationCategory(foundation.quoteCategories, 'quotes');
      return <section className="writing-module-view writing-quote-card" data-writing-module="quotes"><Breadcrumb items={['写作积累', '名人箴言', category.label]} /><header><span>{currentLayer.icon}</span><div><p>{category.label}</p><h2>连同出处和边界一起记</h2><em>{category.desc}</em></div></header>
        <WritingInlineDisclosure activeId={selections.quotes.leaf} items={category.entries.map((entry, index) => ({ id: String(index), no: String(index + 1).padStart(2, '0'), title: `${entry.author}｜${entry.text}` }))} label={`${category.label}名人箴言`} onToggle={(leaf) => toggleGenericLeaf('quotes', leaf)}>
          {(() => { const entry = category.entries[Number(selections.quotes.leaf)]; return entry ? <><blockquote>{entry.text}</blockquote><div><article><b>适用语境</b><p>{entry.context}</p></article><article><b>使用边界</b><p>{entry.boundary}</p></article></div></> : null; })()}
        </WritingInlineDisclosure>
      </section>;
    }
    const stage = foundation.essayStages.find((item) => item.key === selections.essay.category) ?? foundation.essayStages[0];
    const facet = selections.essay.leaf;
    const facetLabel = facet === 'counterexample' ? '常见问题' : facet === 'example' ? '迁移示例' : '写法';
    const facetText = facet === 'counterexample' ? stage.counterexample : facet === 'example' ? stage.example : stage.method;
    return <section className="writing-module-view writing-essay-blueprint" data-writing-module="essay"><Breadcrumb items={['写作积累', '作文框架', stage.label]} /><header><span>{currentLayer.icon}</span><div><p>文章骨架 · {stage.no}</p><h2>{stage.label}</h2><em>一篇文章要沿着结构向前推进，而不是把好句子堆在一起。</em></div></header><div className="writing-blueprint-track">{foundation.essayStages.map((item) => <span className={item.key === stage.key ? 'active' : ''} key={item.key}>{item.no}<b>{item.label}</b></span>)}</div>
      <WritingInlineDisclosure activeId={facet} items={[{ id: 'method', no: '01', title: '写法' }, { id: 'counterexample', no: '02', title: '常见问题' }, { id: 'example', no: '03', title: '迁移示例' }]} label={`${stage.label}写作要点`} onToggle={(leaf) => toggleGenericLeaf('essay', leaf)}>
        <article className="writing-editorial-paper"><span>{facetLabel}</span><p>{facetText}</p></article>
      </WritingInlineDisclosure>
    </section>;
  }

  return <LearningContentFrame details={details} directoryTools={searchTools} label="写作积累学习目录">
    <div className={`writing-manual-surface writing-module-${activeLayer}`} id={`writing-${activeLayer}`}>{renderReading()}</div>
  </LearningContentFrame>;
}
