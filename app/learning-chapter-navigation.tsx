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
    .find((node) => node.dataset.learningDirectoryId === id) ?? null;
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

    const cleanupTransition = () => {
      if (cleaned) return;
      cleaned = true;
      source?.style.removeProperty('view-transition-name');
      sharedDestination?.style.removeProperty('view-transition-name');
      if (activationTokenRef.current === token) {
        root.classList.remove('learning-shared-transition-active');
        setArrivingId(null);
        setLaunchingId(null);
      }
    };
    cleanupRef.current = cleanupTransition;

    const scheduleTransitionCleanup = () => {
      window.setTimeout(cleanupTransition, reducedMotion ? 0 : 420);
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
      source?.style.removeProperty('view-transition-name');
      if (commitDestination()) scheduleTransitionCleanup();
    };

    const transitionDocument = document as ViewTransitionDocument;
    const animated = Boolean(origin === 'hero' && !mobile && !reducedMotion && source && transitionDocument.startViewTransition);
    setLaunchingId(id);

    if (!animated || !source) {
      fallbackToCommittedDestination();
      return;
    }

    source.style.setProperty('view-transition-name', 'learning-chapter-shared');
    root.classList.add('learning-shared-transition-active');
    try {
      const transition = transitionDocument.startViewTransition?.(() => {
        source.style.removeProperty('view-transition-name');
        if (!commitDestination()) return;
        sharedDestination = directoryTarget(id);
        sharedDestination?.style.setProperty('view-transition-name', 'learning-chapter-shared');
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

export function LearningMacroDirectory({ details = {} }: { details?: Readonly<Record<string, ReactNode>> }) {
  const { activeId, activateChapter, arrivingId, chapters } = useLearningChapterNavigation();
  return <nav className="learning-macro-directory" aria-label="本页目录">
    <span className="learning-directory-kicker">CONTENT / 本页目录</span>
    {chapters.map((chapter) => <div className={`learning-directory-group${activeId === chapter.id ? ' active' : ''}${arrivingId === chapter.id ? ' arriving' : ''}`} key={chapter.id}>
      <button
        aria-current={activeId === chapter.id ? 'location' : undefined}
        data-learning-directory-id={chapter.id}
        onClick={(event) => activateChapter(chapter.id, event.currentTarget, 'directory')}
        type="button"
      ><span>{chapter.no}</span><b>{chapter.label}</b><i aria-hidden="true">↘</i></button>
      {activeId === chapter.id ? details[chapter.id] : null}
    </div>)}
  </nav>;
}

export function LearningContentFrame({
  children,
  details,
  label,
}: {
  children: ReactNode;
  details?: Readonly<Record<string, ReactNode>>;
  label: string;
}) {
  const { activeId, chapters, closeDrawer, drawerOpen, openDrawer } = useLearningChapterNavigation();
  const activeLabel = chapters.find((chapter) => chapter.id === activeId)?.label ?? '';

  return <div className="learning-content-frame" data-learning-content-frame>
    <button
      aria-controls="learning-page-directory"
      aria-expanded={drawerOpen}
      className="learning-directory-trigger"
      onClick={(event) => openDrawer(event.currentTarget)}
      type="button"
    ><span>本页目录</span><b>{activeLabel}</b><em aria-hidden="true">☰</em></button>
    <aside className={`learning-directory-column${drawerOpen ? ' open' : ''}`} id="learning-page-directory" aria-label={label}>
      <button className="learning-directory-close" data-learning-directory-initial-focus onClick={closeDrawer} type="button">关闭目录</button>
      <LearningMacroDirectory details={details} />
    </aside>
    <article className="learning-reading-surface">{children}</article>
    {drawerOpen ? <button aria-label="关闭目录" className="learning-directory-backdrop" onClick={closeDrawer} type="button" /> : null}
  </div>;
}
