'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { flushSync } from 'react-dom';
import type { LearningMacroChapter } from './learning-routes';

type ActivationOrigin = 'hero' | 'directory';
type ViewTransitionHandle = { finished: Promise<void> };
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => ViewTransitionHandle;
};

type LearningChapterContextValue = {
  activeId: string;
  arrivingId: string | null;
  chapters: readonly LearningMacroChapter[];
  drawerOpen: boolean;
  launchingId: string | null;
  activateChapter: (id: string, source: HTMLElement | null, origin: ActivationOrigin) => void;
  closeDrawer: () => void;
  openDrawer: (trigger: HTMLElement | null) => void;
};

const LearningChapterContext = createContext<LearningChapterContextValue | null>(null);

export function useLearningChapterNavigation() {
  const value = useContext(LearningChapterContext);
  if (!value) throw new Error('Learning chapter controls must be inside LearningChapterProvider');
  return value;
}

function directoryTarget(id: string) {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-learning-directory-id]'))
    .find((node) => node.dataset.learningDirectoryId === id)
    ?? document.getElementById(id);
}

function directoryInitialFocus() {
  return document.querySelector<HTMLElement>('[data-learning-directory-initial-focus]');
}

export function LearningChapterProvider({
  chapters,
  children,
}: {
  chapters: readonly LearningMacroChapter[];
  children: ReactNode;
}) {
  const [storedActiveId, setActiveId] = useState(chapters[0]?.id ?? '');
  const [arrivingId, setArrivingId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [launchingId, setLaunchingId] = useState<string | null>(null);
  const programmaticUntilRef = useRef(0);
  const cleanupRef = useRef<() => void>(() => undefined);
  const activationTokenRef = useRef(0);
  const transitionOwnersRef = useRef(new WeakMap<HTMLElement, number>());
  const drawerTriggerRef = useRef<HTMLElement | null>(null);
  const activeId = chapters.some((chapter) => chapter.id === storedActiveId)
    ? storedActiveId
    : chapters[0]?.id ?? '';

  const restoreDrawerFocus = useCallback(() => {
    const trigger = drawerTriggerRef.current;
    drawerTriggerRef.current = null;
    window.setTimeout(() => trigger?.focus(), 0);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    restoreDrawerFocus();
  }, [restoreDrawerFocus]);

  const openDrawer = useCallback((trigger: HTMLElement | null) => {
    drawerTriggerRef.current = trigger;
    setDrawerOpen(true);
    window.setTimeout(() => directoryInitialFocus()?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeDrawer, drawerOpen]);

  useEffect(() => {
    const targets = chapters
      .map((chapter) => ({ chapter, node: document.getElementById(chapter.targetId) }))
      .filter((entry): entry is { chapter: LearningMacroChapter; node: HTMLElement } => Boolean(entry.node));
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      if (Date.now() < programmaticUntilRef.current) return;
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const match = visible && targets.find((entry) => entry.node === visible.target);
      if (match) setActiveId(match.chapter.id);
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.12, 0.35, 0.6] });

    targets.forEach((entry) => observer.observe(entry.node));
    return () => observer.disconnect();
  }, [activeId, chapters]);

  const activateChapter = useCallback((id: string, source: HTMLElement | null, origin: ActivationOrigin) => {
    const chapter = chapters.find((item) => item.id === id);
    const destination = directoryTarget(id);
    if (!chapter || !destination) return;

    cleanupRef.current();
    const token = ++activationTokenRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.innerWidth <= 820;
    const root = document.documentElement;
    let sharedDestination: HTMLElement | null = null;
    let cleaned = false;

    const claimTransitionName = (node: HTMLElement | null) => {
      if (!node) return;
      transitionOwnersRef.current.set(node, token);
      node.style.setProperty('view-transition-name', 'learning-chapter-shared');
    };
    const releaseTransitionName = (node: HTMLElement | null) => {
      if (!node || transitionOwnersRef.current.get(node) !== token) return;
      transitionOwnersRef.current.delete(node);
      node.style.removeProperty('view-transition-name');
    };

    const cleanupTransition = () => {
      if (cleaned) return;
      cleaned = true;
      releaseTransitionName(source);
      releaseTransitionName(sharedDestination);
      if (activationTokenRef.current === token) {
        root.classList.remove('learning-shared-transition-active');
        setArrivingId(null);
        setLaunchingId(null);
      }
    };
    cleanupRef.current = cleanupTransition;

    const scheduleTransitionCleanup = () => {
      window.setTimeout(cleanupTransition, reducedMotion ? 0 : 1000);
    };

    const previousId = activeId;
    const previousDrawerOpen = drawerOpen;
    const commitDestination = () => {
      programmaticUntilRef.current = Date.now() + 900;
      if (mobile && origin === 'hero') drawerTriggerRef.current = source;
      flushSync(() => {
        setActiveId(id);
        setDrawerOpen(mobile && origin === 'hero');
      });
      const target = document.getElementById(chapter.targetId);
      if (!target) {
        flushSync(() => {
          setActiveId(previousId);
          setDrawerOpen(previousDrawerOpen);
        });
        if (!previousDrawerOpen) drawerTriggerRef.current = null;
        cleanupTransition();
        return false;
      }
      flushSync(() => setArrivingId(id));
      target.scrollIntoView({
        behavior: reducedMotion || origin === 'hero' ? 'auto' : 'smooth',
        block: 'start',
      });
      if (mobile && origin === 'hero') window.setTimeout(() => directoryInitialFocus()?.focus(), 0);
      if (mobile && origin === 'directory') restoreDrawerFocus();
      return true;
    };

    const fallbackToCommittedDestination = () => {
      root.classList.remove('learning-shared-transition-active');
      releaseTransitionName(source);
      if (commitDestination()) scheduleTransitionCleanup();
    };

    const transitionDocument = document as ViewTransitionDocument;
    const animated = Boolean(origin === 'hero' && !mobile && !reducedMotion && source && transitionDocument.startViewTransition);
    setLaunchingId(id);

    if (!animated || !source) {
      fallbackToCommittedDestination();
      return;
    }

    claimTransitionName(source);
    root.classList.add('learning-shared-transition-active');
    try {
      const transition = transitionDocument.startViewTransition?.(() => {
        releaseTransitionName(source);
        if (activationTokenRef.current !== token) return;
        if (!commitDestination()) return;
        sharedDestination = directoryTarget(id);
        claimTransitionName(sharedDestination);
      });
      if (!transition) {
        fallbackToCommittedDestination();
        return;
      }
      void transition.finished.catch(() => undefined).finally(cleanupTransition);
      scheduleTransitionCleanup();
    } catch {
      fallbackToCommittedDestination();
    }
  }, [activeId, chapters, drawerOpen, restoreDrawerFocus]);

  useEffect(() => () => cleanupRef.current(), []);

  const value = useMemo<LearningChapterContextValue>(() => ({
    activeId,
    arrivingId,
    chapters,
    drawerOpen,
    launchingId,
    activateChapter,
    closeDrawer,
    openDrawer,
  }), [activeId, activateChapter, arrivingId, chapters, closeDrawer, drawerOpen, launchingId, openDrawer]);

  return <LearningChapterContext.Provider value={value}>{children}</LearningChapterContext.Provider>;
}

export function LearningHeroChapterStrip() {
  const { activeId, activateChapter, chapters, launchingId } = useLearningChapterNavigation();
  return <nav className="learning-chapter-strip" aria-label="本页章节入口">
    {chapters.map((chapter) => <button
      aria-current={activeId === chapter.id ? 'true' : undefined}
      className={launchingId === chapter.id ? 'launching' : activeId === chapter.id ? 'active' : ''}
      data-learning-hero-id={chapter.id}
      key={chapter.id}
      onClick={(event) => activateChapter(chapter.id, event.currentTarget, 'hero')}
      type="button"
    >
      <span>{chapter.no}</span><b>{chapter.label}</b><i aria-hidden="true">{launchingId === chapter.id ? '进入中' : '进入'}</i>
    </button>)}
  </nav>;
}

export function LearningSecondaryDirectory({ active, items, label, onSelect }: {
  active: string;
  items: readonly { readonly key: string; readonly no?: string; readonly label: string }[];
  label: string;
  onSelect: (key: string) => void;
}) {
  return <div className="learning-directory-list" aria-label={label}>
    {items.map((item, index) => <button
      aria-current={active === item.key ? 'location' : undefined}
      className={active === item.key ? 'active' : ''}
      key={item.key}
      onClick={() => onSelect(item.key)}
      type="button"
    ><span>{item.no ?? String(index + 1).padStart(2, '0')}</span><b>{item.label}</b></button>)}
  </div>;
}

export function LearningMacroDirectory({ details = {} }: { details?: Readonly<Record<string, ReactNode>> }) {
  const { activeId, activateChapter, arrivingId, chapters } = useLearningChapterNavigation();
  const activeDetails = details[activeId];

  return <div className={`learning-directory-cascade${activeDetails ? ' has-secondary' : ''}`}>
    <nav className="learning-directory-primary learning-macro-directory" aria-label="本页章节">
      {chapters.map((chapter) => <div className={`learning-directory-group${activeId === chapter.id ? ' active' : ''}${arrivingId === chapter.id ? ' arriving' : ''}`} key={chapter.id}>
        <button
          aria-current={activeId === chapter.id ? 'location' : undefined}
          data-learning-directory-id={chapter.id}
          onClick={(event) => activateChapter(chapter.id, event.currentTarget, 'directory')}
          type="button"
        ><span>{chapter.no}</span><b>{chapter.label}</b><i aria-hidden="true">→</i></button>
      </div>)}
    </nav>
    {activeDetails ? <nav className="learning-directory-secondary" aria-label="本章细目">
      {activeDetails}
    </nav> : null}
  </div>;
}

export function LearningContentFrame({
  children,
  directoryTools,
  details,
  label,
}: {
  children: ReactNode;
  directoryTools?: ReactNode;
  details?: Readonly<Record<string, ReactNode>>;
  label: string;
}) {
  const { activeId, chapters, closeDrawer, drawerOpen, openDrawer } = useLearningChapterNavigation();
  const [directoryCollapsed, setDirectoryCollapsed] = useState(false);
  const activeLabel = chapters.find((chapter) => chapter.id === activeId)?.label ?? '';
  const hasSecondary = Boolean(details?.[activeId]);

  return <div className={`learning-content-frame${hasSecondary ? ' has-secondary-directory' : ''}${directoryCollapsed ? ' directory-collapsed' : ''}`} data-learning-content-frame>
    <button
      aria-controls="learning-page-directory"
      aria-expanded={drawerOpen}
      className="learning-directory-trigger"
      onClick={(event) => openDrawer(event.currentTarget)}
      type="button"
    ><span>本页目录</span><b>{activeLabel}</b><em aria-hidden="true">☰</em></button>
    <aside className={`learning-directory-column${drawerOpen ? ' open' : ''}`} id="learning-page-directory" aria-label={label}>
      <button className="learning-directory-close" data-learning-directory-initial-focus onClick={closeDrawer} type="button">关闭目录</button>
      <button
        aria-expanded={!directoryCollapsed}
        className="learning-directory-collapse"
        onClick={() => setDirectoryCollapsed((current) => !current)}
        type="button"
      >{directoryCollapsed ? '展开目录' : '收起目录'}</button>
      <div className="learning-directory-content">
      {directoryTools}
      <LearningMacroDirectory details={details} />
      </div>
    </aside>
    <article className="learning-reading-surface">{children}</article>
    {drawerOpen ? <button aria-label="关闭目录" className="learning-directory-backdrop" onClick={closeDrawer} type="button" /> : null}
  </div>;
}
