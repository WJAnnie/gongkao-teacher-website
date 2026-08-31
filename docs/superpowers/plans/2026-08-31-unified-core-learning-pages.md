# Unified Core Learning Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unify the eight core Shenlun and interview learning routes around the `/shenlun/framework/` paper-manual skeleton and Hero-to-directory transition while preserving every route's content, links, filters, payload boundaries, and subject accent.

**Architecture:** A server-friendly `LearningPageFrame` owns the shared structural markup and wraps its route-owned children in one client `LearningChapterProvider`. Four stable macro-chapter descriptors drive both the Hero strip and directory; the provider owns active state, scrolling, View Transitions, mobile drawer state, and reduced-motion fallback. Shenlun and interview shells remain thin subject adapters, while route-specific manuals, question rows, writing links, cards, and data stay outside the shared layer.

**Tech Stack:** Vinext/Next-compatible React, TypeScript, CSS, Node's built-in test runner, static source-contract tests, Codex in-app Browser/Playwright for interaction checks, and `visual-verdict` for scored visual QA.

---

## File map

### Create

- `app/learning-page-frame.tsx` — shared Hero, subject frame, footer, and structural slots.
- `app/learning-chapter-navigation.tsx` — client chapter provider, Hero strip, macro directory, content frame, observer, View Transition, drawer, and fallback logic.
- `app/learning-page-frame.css` — scoped paper/manual layout and subject tokens for only `.learning-page-frame` descendants.
- `app/learning-scene-transition.css` — generic shared-element/canvas/settle animations with reduced-motion overrides.
- `app/interview/interview-learning-content.tsx` — family-owned adapter for the four interview pages' shared six-card/four-step/two-board content shape.
- `tests/learning-page-frame.test.mjs` — four-chapter, import-boundary, shared-markup, and content-preservation contracts.
- `tests/learning-chapter-transition.test.mjs` — source-level transition/fallback/cleanup contracts; browser checks cover live behavior.

### Modify

- `app/learning-routes.ts` — add four macro chapters for every core route.
- `app/layout.tsx` — import only the two new generic, tightly scoped stylesheets.
- `app/shenlun-shell.tsx` — keep the out-of-scope Shenlun landing path unchanged and route the four core tones through `LearningPageFrame`.
- `app/interview/interview-shell.tsx` — become a thin interview adapter around `LearningPageFrame`.
- `app/shenlun/framework/framework-manual.tsx` — consume shared chapter state and expose generic directory/content data contracts while retaining specialist content.
- `app/shenlun/framework/question-type-switcher.tsx` — remove the orphaned PageGuide custom-event listener after the shared directory replaces it.
- `app/shenlun/framework/page.tsx` — stop importing the framework-only scene-transition file after generic extraction.
- `app/shenlun/questions/page.tsx` — expose four content targets and use the shared content frame.
- `app/shenlun/writing/page.tsx` — place the writing landing inside the shared content frame.
- `app/shenlun/writing/writing-static-pages.tsx` — group all eight existing writing entries under four macro targets without changing hrefs or lazy corpus boundaries.
- `app/shenlun/writing/layout.tsx` — stop importing the retired writing-only Hero transition stylesheet after migration.
- `app/shenlun/videos/page.tsx` — expose four archive targets and use the shared content frame.
- `app/interview/methods/page.tsx`, `app/interview/questions/page.tsx`, `app/interview/expression/page.tsx`, `app/interview/videos/page.tsx` — map cards, flow, and the two practice articles to four macro targets.
- `app/learning-page-effects.tsx` — retain `LearningPageEffects`; remove the superseded independent `PageGuide` state after all consumers migrate.
- `app/interaction-semantics.css` — remove only selector blocks made unreachable by shared markup after all eight routes pass visual QA.
- `tests/route-scope.test.mjs` — explicitly allow generic frame/transition CSS while preserving every specialist boundary.

### Delete after all consumers migrate

- `app/shenlun/framework/framework-hero-menu.tsx`
- `app/shenlun/writing/writing-hero-menu.tsx`
- `app/shenlun/writing/writing-hero-bridge.tsx`
- `app/shenlun/writing/writing-hero-menu.css`
- `app/framework-scene-transition.css`
- `app/learning-hero-standard.css`

Do not delete `app/menu-hierarchy-refinement.css`; framework and writing specialist hierarchy rules still own it.

---

### Task 1: Lock the eight-route and four-chapter model

**Files:**
- Modify: `app/learning-routes.ts:1-38`
- Create: `tests/learning-page-frame.test.mjs`

- [ ] **Step 1: Write the failing chapter-model test**

Create `tests/learning-page-frame.test.mjs` with:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  interviewRoutes,
  learningPageChapters,
  shenlunRoutes,
} from '../app/learning-routes.ts';

const coreRoutes = [...shenlunRoutes, ...interviewRoutes];

test('every core learning route declares four stable macro chapters', () => {
  assert.equal(coreRoutes.length, 8);
  for (const route of coreRoutes) {
    const chapters = learningPageChapters[route.key];
    assert.equal(chapters.length, 4, route.key);
    assert.equal(new Set(chapters.map((item) => item.id)).size, 4, route.key);
    assert.equal(new Set(chapters.map((item) => item.targetId)).size, 4, route.key);
    chapters.forEach((item, index) => {
      assert.equal(item.no, String(index + 1).padStart(2, '0'));
      assert.match(item.id, /^[a-z0-9-]+$/);
      assert.match(item.targetId, /^[a-z0-9-]+$/);
      assert.ok(item.label.length > 1);
    });
  }
});

test('chapter configuration remains metadata-only', async () => {
  const source = await readFile(new URL('../app/learning-routes.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /framework-manual|writing-static-pages|question-bank-data|interview-card/);
});
```

- [ ] **Step 2: Run the test and confirm the missing export**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs
```

Expected: FAIL because `learningPageChapters` is not exported.

- [ ] **Step 3: Add the complete macro-chapter model**

Append to `app/learning-routes.ts`:

```ts
export type LearningMacroChapter = Readonly<{
  id: string;
  no: string;
  label: string;
  targetId: string;
  ariaLabel?: string;
}>;

type FourLearningChapters = readonly [
  LearningMacroChapter,
  LearningMacroChapter,
  LearningMacroChapter,
  LearningMacroChapter,
];

export const learningPageChapters = {
  'shenlun-framework': [
    { id: 'framework-expression', no: '01', label: '表达规则', targetId: 'framework-expression' },
    { id: 'framework-types', no: '02', label: '题型框架', targetId: 'framework-types' },
    { id: 'framework-abilities', no: '03', label: '核心能力', targetId: 'framework-abilities' },
    { id: 'framework-tips', no: '04', label: '实用技巧', targetId: 'framework-tips' },
  ],
  'shenlun-questions': [
    { id: 'questions-years', no: '01', label: '按年份看', targetId: 'questions-years' },
    { id: 'questions-types', no: '02', label: '按题型练', targetId: 'questions-types' },
    { id: 'questions-themes', no: '03', label: '按主题复盘', targetId: 'questions-themes' },
    { id: 'questions-index', no: '04', label: '真题索引', targetId: 'questions-index' },
  ],
  'shenlun-writing': [
    { id: 'writing-viewpoints', no: '01', label: '观点与热点', targetId: 'writing-viewpoints' },
    { id: 'writing-evidence', no: '02', label: '案例与论据', targetId: 'writing-evidence' },
    { id: 'writing-language', no: '03', label: '词语与修辞', targetId: 'writing-language' },
    { id: 'writing-essay', no: '04', label: '作文与结构', targetId: 'writing-essay' },
  ],
  'shenlun-videos': [
    { id: 'shenlun-video-course', no: '01', label: '课程精讲', targetId: 'shenlun-video-course' },
    { id: 'shenlun-video-classroom', no: '02', label: '课堂实录', targetId: 'shenlun-video-classroom' },
    { id: 'shenlun-video-worklog', no: '03', label: '工作日常', targetId: 'shenlun-video-worklog' },
    { id: 'shenlun-video-notes', no: '04', label: '碎片分享', targetId: 'shenlun-video-notes' },
  ],
  'interview-methods': [
    { id: 'interview-methods-map', no: '01', label: '题型地图', targetId: 'interview-methods-map' },
    { id: 'interview-methods-flow', no: '02', label: '训练流程', targetId: 'interview-methods-flow' },
    { id: 'interview-methods-practice', no: '03', label: '一题三遍', targetId: 'interview-methods-practice' },
    { id: 'interview-methods-check', no: '04', label: '答后检查', targetId: 'interview-methods-check' },
  ],
  'interview-questions': [
    { id: 'interview-questions-map', no: '01', label: '真题地图', targetId: 'interview-questions-map' },
    { id: 'interview-questions-flow', no: '02', label: '训练流程', targetId: 'interview-questions-flow' },
    { id: 'interview-questions-index', no: '03', label: '当前索引', targetId: 'interview-questions-index' },
    { id: 'interview-questions-review', no: '04', label: '复盘清单', targetId: 'interview-questions-review' },
  ],
  'interview-expression': [
    { id: 'interview-expression-map', no: '01', label: '表达地图', targetId: 'interview-expression-map' },
    { id: 'interview-expression-flow', no: '02', label: '四段训练', targetId: 'interview-expression-flow' },
    { id: 'interview-expression-daily', no: '03', label: '每日小练', targetId: 'interview-expression-daily' },
    { id: 'interview-expression-review', no: '04', label: '回听重点', targetId: 'interview-expression-review' },
  ],
  'interview-videos': [
    { id: 'interview-videos-map', no: '01', label: '影像档案', targetId: 'interview-videos-map' },
    { id: 'interview-videos-flow', no: '02', label: '观看流程', targetId: 'interview-videos-flow' },
    { id: 'interview-videos-class', no: '03', label: '看课堂', targetId: 'interview-videos-class' },
    { id: 'interview-videos-notes', no: '04', label: '课后笔记', targetId: 'interview-videos-notes' },
  ],
} as const satisfies Record<LearningRouteKey, FourLearningChapters>;
```

- [ ] **Step 4: Run focused and full model tests**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs tests/learning-routes.test.mjs
```

Expected: PASS, with the existing eight static routes unchanged.

- [ ] **Step 5: Commit the model contract**

```powershell
git add app/learning-routes.ts tests/learning-page-frame.test.mjs
git commit -m "Make page chapters explicit before visual convergence" -m "Define four stable macro chapters for each approved core learning route so Hero, directory, and body targets share one metadata contract." -m "Constraint: Existing route URLs and specialist content remain unchanged" -m "Confidence: high" -m "Scope-risk: narrow" -m "Tested: node --experimental-strip-types --test tests/learning-page-frame.test.mjs tests/learning-routes.test.mjs"
```

---

### Task 2: Add the shared chapter controller and frame as unused primitives

**Files:**
- Create: `app/learning-chapter-navigation.tsx`
- Create: `app/learning-page-frame.tsx`
- Create: `tests/learning-chapter-transition.test.mjs`
- Modify: `tests/learning-page-frame.test.mjs`

- [ ] **Step 1: Add failing shared-boundary tests**

Append to `tests/learning-page-frame.test.mjs`:

```js
const frameSource = await readFile(new URL('../app/learning-page-frame.tsx', import.meta.url), 'utf8').catch(() => '');
const navigationSource = await readFile(new URL('../app/learning-chapter-navigation.tsx', import.meta.url), 'utf8').catch(() => '');

test('shared frame composes slots without importing specialist content', () => {
  assert.match(frameSource, /LearningChapterProvider/);
  assert.match(frameSource, /LearningHeroChapterStrip/);
  assert.match(frameSource, /LearningTopNav/);
  assert.doesNotMatch(frameSource, /framework-manual|writing-static-pages|question-bank-data|interview\/methods/);
});

test('one client chapter source owns Hero and directory state', () => {
  assert.match(navigationSource, /createContext/);
  assert.match(navigationSource, /LearningHeroChapterStrip/);
  assert.match(navigationSource, /LearningMacroDirectory/);
  assert.match(navigationSource, /IntersectionObserver/);
});
```

Create `tests/learning-chapter-transition.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../app/learning-chapter-navigation.tsx', import.meta.url), 'utf8').catch(() => '');

test('chapter activation is correct without animation support', () => {
  assert.match(source, /startViewTransition\?/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /scrollIntoView/);
  assert.match(source, /behavior: reducedMotion \|\| origin === 'hero' \? 'auto' : 'smooth'/);
});

test('temporary transition state has a single cleanup path', () => {
  assert.match(source, /learning-chapter-shared/);
  assert.match(source, /activationTokenRef/);
  assert.match(source, /let cleaned = false/);
  assert.match(source, /cleanupTransition/);
  assert.match(source, /\.finally\(cleanupTransition\)/);
  assert.match(source, /setArrivingId\(null\)/);
  assert.match(source, /source\.style\.removeProperty\('view-transition-name'\)/);
  assert.match(source, /sharedDestination\?\.style\.removeProperty\('view-transition-name'\)/);
});

test('mobile directory and passive observation share the same active id', () => {
  assert.match(source, /drawerOpen/);
  assert.match(source, /drawerTriggerRef/);
  assert.match(source, /event\.key === 'Escape'/);
  assert.match(source, /setActiveId/);
  assert.match(source, /programmaticUntilRef/);
  assert.doesNotMatch(source, /CustomEvent/);
});
```

- [ ] **Step 2: Run tests and confirm missing primitives fail**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs tests/learning-chapter-transition.test.mjs
```

Expected: FAIL because the two shared component files do not exist.

- [ ] **Step 3: Create the complete client navigation contract**

Create `app/learning-chapter-navigation.tsx`:

```tsx
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

export function LearningChapterProvider({
  chapters,
  children,
}: {
  chapters: readonly LearningMacroChapter[];
  children: ReactNode;
}) {
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? '');
  const [arrivingId, setArrivingId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [launchingId, setLaunchingId] = useState<string | null>(null);
  const programmaticUntilRef = useRef(0);
  const cleanupRef = useRef<() => void>(() => undefined);
  const activationTokenRef = useRef(0);
  const drawerTriggerRef = useRef<HTMLElement | null>(null);

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
    if (chapters.some((chapter) => chapter.id === activeId)) return;
    setActiveId(chapters[0]?.id ?? '');
  }, [activeId, chapters]);

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
      if (mobile && origin === 'directory') restoreDrawerFocus();
      return true;
    };

    const transitionDocument = document as ViewTransitionDocument;
    const animated = Boolean(origin === 'hero' && !mobile && !reducedMotion && source && transitionDocument.startViewTransition);
    setLaunchingId(id);

    if (!animated || !source) {
      commitDestination();
      window.setTimeout(cleanupTransition, reducedMotion ? 0 : 420);
      return;
    }

    source.style.setProperty('view-transition-name', 'learning-chapter-shared');
    root.classList.add('learning-shared-transition-active');
    try {
      const transition = transitionDocument.startViewTransition?.(() => {
        source.style.removeProperty('view-transition-name');
        commitDestination();
        sharedDestination = directoryTarget(id);
        sharedDestination?.style.setProperty('view-transition-name', 'learning-chapter-shared');
      });
      if (!transition) {
        cleanupTransition();
        commitDestination();
        return;
      }
      void transition.finished.catch(() => undefined).finally(cleanupTransition);
    } catch {
      cleanupTransition();
      commitDestination();
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
      <button className="learning-directory-close" onClick={closeDrawer} type="button">关闭目录</button>
      <LearningMacroDirectory details={details} />
    </aside>
    <article className="learning-reading-surface">{children}</article>
    {drawerOpen ? <button aria-label="关闭目录" className="learning-directory-backdrop" onClick={closeDrawer} type="button" /> : null}
  </div>;
}
```

- [ ] **Step 4: Create the shared server-friendly frame**

Create `app/learning-page-frame.tsx`:

```tsx
import type { ReactNode } from 'react';
import { LearningPageEffects } from './learning-page-effects';
import { LearningTopNav } from './learning-nav';
import {
  LearningChapterProvider,
  LearningHeroChapterStrip,
} from './learning-chapter-navigation';
import {
  interviewRoutes,
  shenlunRoutes,
  type LearningMacroChapter,
  type LearningRouteKey,
} from './learning-routes';

export type LearningSubject = 'shenlun' | 'interview';

export function LearningPageFrame({
  active,
  chapters,
  children,
  desc,
  eyebrow,
  legacyClassName,
  subject,
  title,
}: {
  active: LearningRouteKey;
  chapters: readonly LearningMacroChapter[];
  children: ReactNode;
  desc: string;
  eyebrow: string;
  legacyClassName: string;
  subject: LearningSubject;
  title: string;
}) {
  const primary = subject === 'shenlun' ? shenlunRoutes : interviewRoutes;
  const secondary = subject === 'shenlun' ? interviewRoutes : shenlunRoutes;
  const subjectLabel = subject === 'shenlun' ? '申 / SHENLUN' : '面 / INTERVIEW';
  const subjectName = subject === 'shenlun' ? '申论学习' : '结构化面试';
  const secondaryName = subject === 'shenlun' ? '面试学习' : '申论学习';

  return <LearningChapterProvider chapters={chapters}>
    <main className={`${legacyClassName} learning-page-frame`} data-learning-subject={subject}>
      <LearningPageEffects />
      <LearningTopNav active={active} />
      <header className="learning-page-hero">
        <div className="learning-hero-topline"><span>{subjectLabel}</span><span>答卷之外 · {subjectName}</span></div>
        <span className="exam-review-stamp" aria-hidden="true">阅</span>
        <p className="learning-hero-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="learning-hero-bottom">
          <p>{desc}</p>
          <LearningHeroChapterStrip />
        </div>
      </header>
      <div className="learning-page-color-line" aria-hidden="true" />
      {children}
      <footer className="learning-page-footer">
        <div><span>{subjectName}</span>{primary.map((item) => <a href={item.href} key={item.key}>{item.label}</a>)}</div>
        <div><span>{secondaryName}</span>{secondary.map((item) => <a href={item.href} key={item.key}>{item.label}</a>)}</div>
        <p>答卷之外 · 申论 × 结构化面试</p>
      </footer>
    </main>
  </LearningChapterProvider>;
}
```

- [ ] **Step 5: Run focused tests and typecheck**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs tests/learning-chapter-transition.test.mjs
npm.cmd run typecheck
```

Expected: PASS. No route uses the new frame yet, so rendered pages remain unchanged.

- [ ] **Step 6: Commit the unused shared primitives**

```powershell
git add app/learning-chapter-navigation.tsx app/learning-page-frame.tsx tests/learning-page-frame.test.mjs tests/learning-chapter-transition.test.mjs
git commit -m "Create one chapter state boundary before route migration" -m "Add metadata-driven Hero, directory, drawer, observer, fallback, and frame primitives without switching any live route yet." -m "Constraint: Shared modules must not import specialist content or data" -m "Confidence: medium" -m "Scope-risk: moderate" -m "Tested: focused Node contracts and TypeScript typecheck"
```

---

### Task 3: Add scoped shared styles without changing route ownership

**Files:**
- Create: `app/learning-page-frame.css`
- Create: `app/learning-scene-transition.css`
- Modify: `app/layout.tsx:8-25`
- Modify: `tests/route-scope.test.mjs:20-62`
- Modify: `tests/learning-page-frame.test.mjs`

- [ ] **Step 1: Add failing stylesheet-scope tests**

Append to `tests/learning-page-frame.test.mjs`:

```js
const rootLayoutSource = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8');
const frameCss = await readFile(new URL('../app/learning-page-frame.css', import.meta.url), 'utf8').catch(() => '');
const transitionCss = await readFile(new URL('../app/learning-scene-transition.css', import.meta.url), 'utf8').catch(() => '');

test('root imports only generic learning frame and transition styles', () => {
  assert.match(rootLayoutSource, /learning-page-frame\.css/);
  assert.match(rootLayoutSource, /learning-scene-transition\.css/);
  for (const source of [frameCss, transitionCss]) {
    assert.doesNotMatch(source, /\.framework-|\.writing-|\.interview-card|\.shenlun-question/);
  }
});
```

- [ ] **Step 2: Run the test and confirm missing CSS imports fail**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs tests/route-scope.test.mjs
```

Expected: FAIL because the two shared stylesheets are absent from `app/layout.tsx`.

- [ ] **Step 3: Create the scoped frame stylesheet**

Create `app/learning-page-frame.css` with these complete shared contracts:

```css
.learning-page-frame {
  --learning-accent: #315f8e;
  --learning-paper: #f4f0e6;
  --learning-paper-raised: #fbfaf5;
  --learning-ink: #25251f;
  --learning-muted: rgba(37, 37, 31, .64);
  --learning-border: rgba(37, 37, 31, .18);
  --learning-x: clamp(38px, 6vw, 104px);
  min-height: 100vh;
  overflow-x: clip;
  color: var(--learning-ink);
  background: var(--learning-paper);
}

.learning-page-frame[data-learning-subject="interview"] { --learning-accent: #985b36; }

.learning-page-hero {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 740px;
  overflow: hidden;
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--learning-accent) 5%, transparent), transparent 34%),
    var(--learning-paper);
}

.learning-hero-topline {
  position: absolute;
  top: 34px;
  left: var(--learning-x);
  right: var(--learning-x);
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--learning-border);
  color: var(--learning-muted);
  font-size: 11px;
  letter-spacing: .14em;
}

.learning-hero-eyebrow {
  position: absolute;
  top: 112px;
  left: var(--learning-x);
  margin: 0;
  color: var(--learning-accent);
  font: italic 11px Georgia, serif;
  letter-spacing: .16em;
}

.learning-page-hero > h1 {
  position: absolute;
  top: 148px;
  left: var(--learning-x);
  width: min(900px, 64vw);
  margin: 0;
  font-family: "Songti SC", "SimSun", Georgia, serif;
  font-size: clamp(58px, 8vw, 120px);
  font-weight: 500;
  line-height: .9;
  letter-spacing: -.055em;
}

.learning-page-hero > .exam-review-stamp {
  position: absolute;
  top: 118px;
  right: clamp(72px, 8vw, 132px);
}

.learning-hero-bottom {
  position: absolute;
  top: 400px;
  left: var(--learning-x);
  right: var(--learning-x);
  height: 132px;
}

.learning-hero-bottom > p {
  position: absolute;
  left: 0;
  bottom: 0;
  width: min(760px, 48vw);
  margin: 0;
  color: var(--learning-muted);
  font-size: 13px;
  line-height: 1.9;
}

.learning-chapter-strip {
  position: absolute;
  top: 0;
  right: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: min(640px, 42vw);
  height: 104px;
  border-top: 1px solid var(--learning-border);
  border-left: 1px solid var(--learning-border);
}

.learning-chapter-strip > button,
.learning-macro-directory .learning-directory-group > button {
  position: relative;
  display: grid;
  grid-template-columns: 34px 1fr auto;
  align-items: center;
  gap: 8px;
  min-height: 52px;
  padding: 0 12px;
  border: 0;
  border-right: 1px solid var(--learning-border);
  border-bottom: 1px solid var(--learning-border);
  background: transparent;
  color: var(--learning-muted);
  text-align: left;
  cursor: pointer;
  overflow: hidden;
}

.learning-chapter-strip > button:hover,
.learning-chapter-strip > button:focus-visible,
.learning-chapter-strip > button.active,
.learning-macro-directory .learning-directory-group > button:hover,
.learning-macro-directory .learning-directory-group > button:focus-visible,
.learning-directory-group.active > button {
  color: var(--learning-ink);
  background: color-mix(in srgb, var(--learning-accent) 8%, var(--learning-paper-raised));
}

.learning-chapter-strip > button:focus-visible,
.learning-macro-directory button:focus-visible,
.learning-directory-trigger:focus-visible,
.learning-directory-close:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--learning-accent) 62%, transparent);
  outline-offset: -3px;
}

.learning-chapter-strip > button > span,
.learning-macro-directory button > span { color: var(--learning-accent); font: italic 10px Georgia, serif; }
.learning-chapter-strip > button > b,
.learning-macro-directory button > b { font-size: 12px; font-weight: 650; }
.learning-chapter-strip > button > i,
.learning-macro-directory button > i { color: var(--learning-accent); font-style: normal; font-size: 10px; }

.learning-page-color-line { height: 6px; background: var(--learning-accent); }

.learning-content-frame {
  position: relative;
  display: grid;
  grid-template-columns: minmax(190px, 250px) minmax(0, 880px);
  justify-content: center;
  gap: clamp(32px, 5vw, 76px);
  width: min(1380px, calc(100% - 48px));
  margin: 0 auto;
  padding: clamp(64px, 8vw, 118px) 0;
}

.learning-directory-column { position: sticky; top: 84px; align-self: start; max-height: calc(100vh - 112px); overflow: auto; }
.learning-directory-kicker { display: block; padding: 0 0 14px; border-bottom: 2px solid var(--learning-accent); color: var(--learning-muted); font-size: 10px; letter-spacing: .14em; }
.learning-directory-group { border-bottom: 1px solid var(--learning-border); }
.learning-directory-group > button { width: 100%; min-height: 58px; }
.learning-reading-surface { min-width: 0; color: var(--learning-ink); }
.learning-reading-surface > [id] { scroll-margin-top: 96px; }
.learning-directory-trigger, .learning-directory-close, .learning-directory-backdrop { display: none; }

.learning-page-footer {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
  padding: 54px var(--learning-x) 34px;
  border-top: 1px solid var(--learning-border);
  background: var(--learning-paper-raised);
}
.learning-page-footer > div { display: flex; flex-wrap: wrap; gap: 10px 16px; }
.learning-page-footer > div > span { width: 100%; color: var(--learning-accent); font-size: 10px; letter-spacing: .12em; }
.learning-page-footer a { color: var(--learning-ink); font-size: 12px; }
.learning-page-footer > p { grid-column: 1 / -1; margin: 18px 0 0; color: var(--learning-muted); font-size: 11px; }

@media (min-width: 821px) and (max-width: 1040px) {
  .learning-page-frame { --learning-x: clamp(28px, 5vw, 52px); }
  .learning-page-hero { height: 720px; }
  .learning-page-hero > h1 { font-size: clamp(58px, 10vw, 96px); }
  .learning-hero-bottom { top: 370px; }
  .learning-content-frame { grid-template-columns: 180px minmax(0, 1fr); gap: 28px; }
}

@media (max-width: 820px) {
  .learning-page-frame { --learning-x: 20px; }
  .learning-page-hero { height: auto; min-height: 610px; padding: 72px 20px 28px; }
  .learning-hero-topline, .learning-hero-eyebrow, .learning-page-hero > h1,
  .learning-page-hero > .exam-review-stamp, .learning-hero-bottom { position: static; }
  .learning-hero-topline { margin-bottom: 52px; }
  .learning-hero-eyebrow { margin-bottom: 12px; }
  .learning-page-hero > h1 { width: auto; font-size: clamp(52px, 18vw, 78px); }
  .learning-page-hero > .exam-review-stamp { position: absolute; top: 104px; right: 22px; }
  .learning-hero-bottom { height: auto; margin-top: 52px; }
  .learning-hero-bottom > p, .learning-chapter-strip { position: static; width: 100%; }
  .learning-chapter-strip { margin-top: 28px; }
  .learning-content-frame { display: block; width: min(100% - 32px, 720px); padding: 56px 0; }
  .learning-directory-trigger { display: grid; grid-template-columns: auto 1fr auto; width: 100%; margin-bottom: 18px; padding: 12px; border: 1px solid var(--learning-border); background: var(--learning-paper-raised); color: var(--learning-ink); text-align: left; }
  .learning-directory-column { position: fixed; z-index: 160; top: 0; left: 0; bottom: 0; width: min(86vw, 360px); max-height: none; padding: 20px; transform: translateX(-105%); transition: transform .24s ease; background: var(--learning-paper-raised); }
  .learning-directory-column.open { transform: translateX(0); }
  .learning-directory-close { display: block; margin: 0 0 18px auto; border: 0; background: transparent; color: var(--learning-ink); }
  .learning-directory-backdrop { display: block; position: fixed; z-index: 150; inset: 0; border: 0; background: rgba(20, 22, 24, .32); }
  .learning-page-footer { grid-template-columns: 1fr; padding-inline: 20px; }
  .learning-page-footer > p { grid-column: auto; }
}
```

- [ ] **Step 4: Create generic transition CSS**

Create `app/learning-scene-transition.css`:

```css
html.learning-shared-transition-active { scroll-behavior: auto !important; }
html.learning-shared-transition-active::view-transition-old(root) { animation: learning-canvas-out .52s cubic-bezier(.2,.72,.2,1) both; }
html.learning-shared-transition-active::view-transition-new(root) { animation: learning-canvas-in .52s cubic-bezier(.2,.72,.2,1) both; }
html.learning-shared-transition-active::view-transition-group(learning-chapter-shared) { z-index: 180; animation-duration: .72s; animation-timing-function: cubic-bezier(.18,.8,.18,1); }
html.learning-shared-transition-active::view-transition-old(learning-chapter-shared),
html.learning-shared-transition-active::view-transition-new(learning-chapter-shared) { width: 100%; height: 100%; overflow: clip; mix-blend-mode: normal; animation: none; }
.learning-chapter-strip > button.launching::before { content: ""; position: absolute; inset: auto 0 0; height: 3px; transform-origin: left; background: var(--learning-accent); animation: learning-entry-progress .72s cubic-bezier(.2,.78,.2,1) both; }
.learning-shared-transition-active .learning-directory-group.arriving > button { animation: learning-directory-arrival .56s cubic-bezier(.2,.72,.2,1) both; }
.learning-shared-transition-active .learning-reading-surface { animation: learning-reading-settle .56s cubic-bezier(.2,.72,.2,1) both; }
@keyframes learning-canvas-out { 0%,34% { opacity: 1; filter: blur(0); } 100% { opacity: .18; filter: blur(1px); } }
@keyframes learning-canvas-in { from { opacity: .22; filter: blur(1px); } to { opacity: 1; filter: blur(0); } }
@keyframes learning-entry-progress { from { transform: scaleX(0); opacity: .35; } to { transform: scaleX(1); opacity: 1; } }
@keyframes learning-directory-arrival { from { box-shadow: inset 0 0 var(--learning-accent); } to { box-shadow: inset 4px 0 var(--learning-accent); } }
@keyframes learning-reading-settle { from { opacity: .48; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) {
  html.learning-shared-transition-active::view-transition-old(root),
  html.learning-shared-transition-active::view-transition-new(root),
  html.learning-shared-transition-active::view-transition-group(learning-chapter-shared),
  .learning-chapter-strip > button.launching::before,
  .learning-shared-transition-active .learning-directory-group.arriving > button,
  .learning-shared-transition-active .learning-reading-surface { animation-duration: .01ms !important; animation-delay: 0s !important; }
  .learning-directory-column { transition-duration: .01ms !important; }
}
```

- [ ] **Step 5: Import generic CSS and preserve specialist assertions**

In `app/layout.tsx`, insert after the existing `import './interaction-semantics.css';` so the scoped shared geometry wins over legacy root-level learning overrides without using `!important`:

```ts
import './learning-page-frame.css';
import './learning-scene-transition.css';
```

In `tests/route-scope.test.mjs`, extend `root layout keeps shared contracts`:

```js
assert.match(rootLayout, /learning-page-frame\.css/);
assert.match(rootLayout, /learning-scene-transition\.css/);
```

Keep every existing `doesNotMatch` assertion for framework, writing, interview, `menu-hierarchy-refinement.css`, and `framework-scene-transition.css`.

- [ ] **Step 6: Run focused tests, lint, and typecheck**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs tests/learning-chapter-transition.test.mjs tests/route-scope.test.mjs
npm.cmd run lint
npm.cmd run typecheck
```

Expected: PASS. Existing pages stay unchanged because no live route renders `.learning-page-frame` yet.

- [ ] **Step 7: Commit the scoped visual primitives**

```powershell
git add app/layout.tsx app/learning-page-frame.css app/learning-scene-transition.css tests/learning-page-frame.test.mjs tests/route-scope.test.mjs
git commit -m "Scope the shared manual surface before enabling it" -m "Add neutral subject tokens, frame geometry, responsive drawer rules, and generic scene animation under explicit learning-page selectors." -m "Constraint: Framework, writing, and interview specialist styles remain route-owned" -m "Confidence: medium" -m "Scope-risk: moderate" -m "Tested: focused route-scope tests, lint, and typecheck"
```

---

### Task 4: Convert the reference framework to the shared state contract

**Files:**
- Modify: `app/shenlun-shell.tsx:1-86`
- Modify: `app/shenlun/framework/framework-manual.tsx:1-330`
- Modify: `app/shenlun/framework/page.tsx:18-19`
- Modify: `tests/learning-page-frame.test.mjs`
- Modify: `tests/learning-chapter-transition.test.mjs`

- [ ] **Step 1: Add failing framework characterization assertions**

Append to `tests/learning-page-frame.test.mjs`:

```js
const shenlunShellSource = await readFile(new URL('../app/shenlun-shell.tsx', import.meta.url), 'utf8');
const frameworkManualSource = await readFile(new URL('../app/shenlun/framework/framework-manual.tsx', import.meta.url), 'utf8');

test('core Shenlun pages use the shared frame while the Shenlun landing keeps its legacy branch', () => {
  assert.match(shenlunShellSource, /tone === 'home'/);
  assert.match(shenlunShellSource, /<LearningPageFrame/);
  assert.doesNotMatch(shenlunShellSource, /FrameworkHeroMenu|WritingHeroMenu|PageGuide/);
});

test('framework manual consumes the shared chapter context without custom events', () => {
  assert.match(frameworkManualSource, /useLearningChapterNavigation/);
  assert.match(frameworkManualSource, /data-learning-directory-id/);
  assert.doesNotMatch(frameworkManualSource, /framework-hero-select|startViewTransition/);
});
```

- [ ] **Step 2: Run the characterization test and confirm legacy wiring fails**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs
```

Expected: FAIL because `ShenlunShell` still special-cases old Hero menus and `FrameworkManual` owns the event/transition.

- [ ] **Step 3: Route the four core Shenlun tones through `LearningPageFrame`**

In `app/shenlun-shell.tsx`:

1. Remove imports for `PageGuide`, `GuideItem`, `FrameworkHeroMenu`, and `WritingHeroMenu`.
2. Import `LearningPageFrame` and `learningPageChapters`.
3. Preserve the existing `tone === 'home'` JSX byte-for-byte in a private `ShenlunHomeShell` helper.
4. Replace the non-home return with:

```tsx
const active = toneToActive[tone];
return <LearningPageFrame
  active={active}
  chapters={learningPageChapters[active]}
  desc={desc}
  eyebrow={eyebrow}
  legacyClassName={`shenlun-page ${tone} shenlun-tone-${tone}`}
  subject="shenlun"
  title={title}
>{children}</LearningPageFrame>;
```

The helper's preserved legacy return must keep `LearningPageEffects`, `LearningTopNav`, the original home Hero classes, footer links, and `tone="home"` behavior so `/shenlun/` remains out of scope.

- [ ] **Step 4: Replace framework event state with shared context**

In `FrameworkManual`:

1. Import `useLearningChapterNavigation` from `../../learning-chapter-navigation`.
2. Change the React import to `import { useState } from 'react';`, remove the `flushSync` import, `activeLayer` state, `heroArrival` state, the full `framework-hero-select` effect, and local `drawerOpen` state.
3. At the start of the component use:

```tsx
const {
  activeId,
  activateChapter,
  arrivingId,
  closeDrawer,
  drawerOpen,
  openDrawer,
} = useLearningChapterNavigation();
const activeLayer = layers.some((item) => item.key === activeId.replace('framework-', ''))
  ? activeId.replace('framework-', '') as LayerKey
  : 'expression';
```

4. Replace `chooseLayer` with:

```tsx
const chooseLayer = (key: LayerKey, source: HTMLElement | null = null) => {
  activateChapter(`framework-${key}`, source, 'directory');
};
```

5. Replace the four nested chooser branches that referenced the removed `setActiveLayer` with the shared parent activation, while preserving their existing nested state and scroll helpers:

```tsx
const chooseExpression = (index: number) => {
  if (activeLayer !== 'expression') activateChapter('framework-expression', null, 'directory');
  setActiveExpression(index);
  closeDrawer();
  goTo(expressionChapters[index].id);
};

const chooseType = (slug: string) => {
  if (activeLayer !== 'types') activateChapter('framework-types', null, 'directory');
  setActiveType(slug);
  closeDrawer();
  const chapter = typeChapters.find((item) => item.slug === slug);
  if (chapter) goTo(chapter.id);
};

const chooseAbility = (id: CoreAbilityId) => {
  if (activeLayer !== 'abilities') activateChapter('framework-abilities', null, 'directory');
  setActiveAbility(id);
  closeDrawer();
  goTo(id);
};

const chooseTip = (id: string) => {
  if (activeLayer !== 'tips') activateChapter('framework-tips', null, 'directory');
  closeDrawer();
  changeTip(id);
};
```

6. Give the root, aside, and reading surface shared classes, remove every legacy `heroArrival` branch, and derive the generic arrival class inside `layers.map` with `const arriving = arrivingId === \`framework-${item.key}\``:

```tsx
<div className="framework-manual learning-content-frame" id="framework-manual-top" data-learning-content-frame>
```

```tsx
<aside className={`framework-manual-sidebar learning-directory-column${drawerOpen ? ' open' : ''}`} aria-label="方法框架学习目录">
```

```tsx
<main className="framework-manual-reading learning-reading-surface">
```

```tsx
<div className={`framework-layer-group learning-directory-group${open ? ' open active' : ''}${arriving ? ' arriving' : ''}`} key={item.key}>
```

7. On each top-level layer button set:

```tsx
data-learning-directory-id={`framework-${item.key}`}
onClick={(event) => chooseLayer(item.key, event.currentTarget)}
```

8. Change the existing mobile trigger to `onClick={(event) => openDrawer(event.currentTarget)}` and every existing close/backdrop action to `onClick={closeDrawer}`. Escape handling and focus restoration are provider-owned, so they now work for both the generic content frame and this specialist framework manual.

- [ ] **Step 5: Stop importing the old framework scene transition**

Remove only this line from `app/shenlun/framework/page.tsx`:

```ts
import '../../framework-scene-transition.css';
```

Do not change the order of the other 15 specialist stylesheet imports.

- [ ] **Step 6: Update route-scope ownership expectation**

In `tests/route-scope.test.mjs`, remove `'../../framework-scene-transition.css'` from the framework import-order array while keeping `assert.doesNotMatch(rootLayout, /framework-scene-transition\.css/)`.

- [ ] **Step 7: Run framework-focused tests and static builds**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs tests/learning-chapter-transition.test.mjs tests/route-scope.test.mjs
npm.cmd run verify
npm.cmd run build:static
npm.cmd run build:static:pages
```

Expected: 51 existing tests plus the new tests pass; both builds export 36 routes.

- [ ] **Step 8: Characterize live reference interaction**

Using the in-app Browser at `http://localhost:3000/shenlun/framework/`:

1. Set viewport to `1440×900`.
2. Click each of the four Hero chapter buttons.
3. After each click, verify the matching `[data-learning-directory-id]` is active, the corresponding article target exists, and the root does not retain `learning-shared-transition-active` after 1 second.
4. Click chapters 02 and 04 less than 100 ms apart; after 1 second chapter 04 must be active, no element may retain `view-transition-name: learning-chapter-shared`, and `launching`/`arriving`/root transition classes must be absent.
5. Temporarily disable `document.startViewTransition`, then make it throw, then make its `finished` promise reject; every path must still reach the selected logical chapter and clear temporary state.
6. Temporarily intercept `document.getElementById` for one selected body target while leaving its directory button present. Activation must roll back to the previous chapter and drawer state, with no transition name or root class left behind; restore the native method immediately after the assertion.
7. Emulate `prefers-reduced-motion: reduce` through the documented browser/CDP path and verify the same four destinations without smooth scrolling, View Transition, or settle duration.
8. Set viewport to `390×844`; verify clicking a Hero chapter opens the directory drawer and closing it by button, backdrop, or Escape returns focus to the original Hero trigger.

Save screenshots under `.omx/visual/unified-core-learning-pages/framework/{desktop,mobile}/` and run `visual-verdict` against the pre-change framework screenshot. Persist the verdict JSON to `.omx/state/unified-core-learning-pages/ralph-progress.json`; require score 90+ before continuing.

- [ ] **Step 9: Commit the reference migration**

```powershell
git add app/shenlun-shell.tsx app/shenlun/framework/framework-manual.tsx app/shenlun/framework/page.tsx tests/learning-page-frame.test.mjs tests/learning-chapter-transition.test.mjs tests/route-scope.test.mjs .omx/state/unified-core-learning-pages/ralph-progress.json
git commit -m "Preserve the reference transition through one shared controller" -m "Move framework Hero, active chapter, directory, drawer, and fallback behavior onto the generic contract while retaining every specialist manual component and style." -m "Constraint: The Shenlun landing and framework article payload remain unchanged" -m "Confidence: high" -m "Scope-risk: moderate" -m "Directive: Keep transition correctness independent from animation support" -m "Tested: verify, both static builds, desktop/mobile interaction, reduced motion, visual verdict 90+"
```

---

### Task 5: Prove the shared frame with the simple Shenlun video route

**Files:**
- Modify: `app/shenlun/videos/page.tsx:1-62`
- Modify: `tests/learning-page-frame.test.mjs`

- [ ] **Step 1: Add the failing video preservation test**

Append:

```js
const shenlunVideosSource = await readFile(new URL('../app/shenlun/videos/page.tsx', import.meta.url), 'utf8');

test('Shenlun videos keeps four archive cards and its learning flow', () => {
  for (const id of ['shenlun-video-course', 'shenlun-video-classroom', 'shenlun-video-worklog', 'shenlun-video-notes']) {
    assert.match(shenlunVideosSource, new RegExp(id));
  }
  assert.match(shenlunVideosSource, /videoSections\.map/);
  assert.match(shenlunVideosSource, /interview-learning-flow/);
  assert.match(shenlunVideosSource, /<LearningContentFrame/);
});
```

- [ ] **Step 2: Run the test and confirm the frame assertion fails**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs
```

Expected: FAIL because the video page still renders its legacy full-width content.

- [ ] **Step 3: Adapt the four video cards without changing their text or flow**

Import `LearningContentFrame` from `../../learning-chapter-navigation`. Replace the existing `<section className="shenlun-content">` body with:

```tsx
<LearningContentFrame label="申论课程现场目录">
  <div className="shenlun-section-head"><span>VIDEO ARCHIVE / 影像档案</span><h2>课程、课堂，<br />还有日常。</h2><p>四类内容按场景归档，找课程、找讲题、找课堂片段都会更快。</p></div>
  <div className="video-grid">
    {videoSections.map(([no, cardTitle, cardDesc, note], index) => {
      const targetIds = ['shenlun-video-course', 'shenlun-video-classroom', 'shenlun-video-worklog', 'shenlun-video-notes'] as const;
      return <article className="video-card" id={targetIds[index]} key={cardTitle}>
        <span>{no}</span><h3>{cardTitle}</h3><p>{cardDesc}</p><small>{note}</small>
      </article>;
    })}
  </div>
  <div className="interview-learning-flow" style={shenlunFlowStyle}>
    {flow.map(([no, flowTitle, flowDesc]) => <article className="interview-flow-step" key={no}><span>{no}</span><h3>{flowTitle}</h3><p>{flowDesc}</p></article>)}
  </div>
</LearningContentFrame>
```

- [ ] **Step 4: Verify the first non-manual route and commit it independently**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs tests/learning-routes.test.mjs
npm.cmd run verify
npm.cmd run build:static
npm.cmd run build:static:pages
```

At `1440×900` and `390×844`, verify four `.video-card` and four `.interview-flow-step` nodes, all four Hero-to-target mappings, drawer focus restoration, and zero horizontal overflow. Run `visual-verdict` for both sizes, persist the JSON, and require 90+.

```powershell
git add app/shenlun/videos/page.tsx tests/learning-page-frame.test.mjs .omx/state/unified-core-learning-pages/ralph-progress.json
git commit -m "Prove the shared frame with non-manual video content" -m "Expose four course archive targets without changing any video card or learning-flow content." -m "Constraint: Route data and user-facing content counts remain intact" -m "Confidence: high" -m "Scope-risk: narrow" -m "Tested: verify, both static builds, desktop/mobile interaction, visual verdict 90+"
```

---

### Task 6: Adapt Shenlun questions without changing archive data

**Files:**
- Modify: `app/shenlun/questions/page.tsx:1-105`
- Modify: `tests/learning-page-frame.test.mjs`

- [ ] **Step 1: Add the failing question preservation test**

Append:

```js
const shenlunQuestionsSource = await readFile(new URL('../app/shenlun/questions/page.tsx', import.meta.url), 'utf8');

test('Shenlun questions keeps archive, toolbar, and question rows inside four targets', () => {
  for (const id of ['questions-years', 'questions-types', 'questions-themes', 'questions-index']) {
    assert.match(shenlunQuestionsSource, new RegExp(`id=["'{]+${id}`));
  }
  assert.match(shenlunQuestionsSource, /shenlun-question-toolbar/);
  assert.match(shenlunQuestionsSource, /shenlun-question-list/);
  assert.match(shenlunQuestionsSource, /<LearningContentFrame/);
});
```

- [ ] **Step 2: Run the test and confirm target/frame assertions fail**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs
```

Expected: FAIL because the question page lacks the four body targets and shared content frame.

- [ ] **Step 3: Adapt the question archive without changing data or helper functions**

Import `LearningContentFrame` from `../../learning-chapter-navigation`. Inside the existing `<section className="shenlun-content">`, replace the body with:

```tsx
<LearningContentFrame label="真题精练学习目录">
  <div className="shenlun-section-head">
    <span>EXAM ARCHIVE / 真题档案</span>
    <h2>六年国考，<br />三种练法。</h2>
    <p>站内首批整理 30 道国考申论任务。题意摘要、训练重点和参考作答方向放在同一条记录里，做题和回看都更顺手。</p>
  </div>
  <div className="shenlun-map-grid">
    {archiveCards.map(([no, title, meta, cardDesc], index) => {
      const targetIds = ['questions-years', 'questions-types', 'questions-themes'] as const;
      return <article className="shenlun-map-card" id={targetIds[index]} key={no}>
        <span>{no}</span><h3>{title}</h3><p>{cardDesc}</p>
        <ul><li>{meta}</li><li>题意摘要 + 训练重点 + 作答方向</li></ul>
      </article>;
    })}
  </div>
  <section id="questions-index">
    <div className="shenlun-section-head" style={{ marginTop: '90px' }}>
      <span>NATIONAL EXAM / 国考申论</span><h2>2020—2025<br />真题索引</h2>
      <p>每道题先看任务和训练重点，再进入作答。做完以后把自己的答案和参考方向放在一起对照。</p>
    </div>
    <div className="shenlun-question-toolbar">
      <span>归纳概括</span><span>综合分析</span><span>提出对策</span><span>贯彻执行</span><span>文章写作</span>
    </div>
    <div className="shenlun-question-list">
      {shenlunQuestions.map((item, index) => <article className="shenlun-question-row" key={item.id}>
        <div className="meta"><span className="question-paper-index">Q{String(index + 1).padStart(2, '0')}</span>{item.year}<br />{item.exam}<br />{item.type} · {item.topic}<span className="question-paper-time">训练建议 {suggestedTime(item.type)}</span></div>
        <div><h3>{item.summary}</h3><p>训练重点：{item.focus}<br />来源性质：{item.source}</p></div>
        <div className="answer"><strong>参考作答方向</strong><br />{item.focus}</div>
        <span className="teacher-margin-note" aria-hidden="true">{reviewNote(item.type)}</span>
      </article>)}
    </div>
  </section>
</LearningContentFrame>
```

Keep the imported `questions`, `suggestedTime`, and `reviewNote` implementations unchanged.

- [ ] **Step 4: Verify all question contracts and commit**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs tests/learning-routes.test.mjs
npm.cmd run verify
```

At both target viewports, verify 30 `.shenlun-question-row` elements, five toolbar labels, all four Hero mappings, keyboard activation, and zero horizontal overflow. Run `visual-verdict`, persist its JSON, and require 90+.

```powershell
git add app/shenlun/questions/page.tsx tests/learning-page-frame.test.mjs .omx/state/unified-core-learning-pages/ralph-progress.json
git commit -m "Fit the question archive into the shared reading system" -m "Expose the three archive lenses and full question index as four stable targets without changing question data or helper behavior." -m "Constraint: All 30 rows, five labels, and reference directions remain intact" -m "Confidence: high" -m "Scope-risk: moderate" -m "Tested: verify, desktop/mobile interaction, content counts, visual verdict 90+"
```

---

### Task 7: Group writing entries under four chapters without changing links or loading boundaries

**Files:**
- Modify: `app/shenlun/writing/page.tsx:1-25`
- Modify: `app/shenlun/writing/writing-static-pages.tsx:1-76`
- Modify: `tests/learning-page-frame.test.mjs`
- Modify: `tests/route-scope.test.mjs`

- [ ] **Step 1: Add failing writing preservation tests**

Append:

```js
const writingPageSource = await readFile(new URL('../app/shenlun/writing/page.tsx', import.meta.url), 'utf8');
const writingStaticSource = await readFile(new URL('../app/shenlun/writing/writing-static-pages.tsx', import.meta.url), 'utf8');

test('writing keeps eight static entries under four macro groups', () => {
  assert.match(writingPageSource, /<LearningContentFrame/);
  for (const id of ['writing-viewpoints', 'writing-evidence', 'writing-language', 'writing-essay']) {
    assert.match(writingStaticSource, new RegExp(id));
  }
  assert.equal((writingStaticSource.match(/href: '/g) ?? []).length, 8);
  for (const href of ['/shenlun/writing/hotspots/', '/shenlun/writing/cases/', '/shenlun/writing/metaphors/']) {
    assert.match(writingStaticSource, new RegExp(href.replaceAll('/', '\\/')));
  }
  assert.doesNotMatch(writingStaticSource, /writing-hotspot-all|writing-case-all|writing-metaphor-data/);
});
```

- [ ] **Step 2: Run the test and confirm group ids/frame are missing**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs tests/route-scope.test.mjs
```

Expected: FAIL on missing macro ids and shared frame wrapper.

- [ ] **Step 3: Define four explicit writing groups**

In `writing-static-pages.tsx`, keep `librarySections` unchanged and add:

```ts
const writingMacroGroups = [
  { id: 'writing-viewpoints', title: '观点与热点', entries: ['01', '06', '07'] },
  { id: 'writing-evidence', title: '案例与论据', entries: ['02'] },
  { id: 'writing-language', title: '词语与修辞', entries: ['03', '04', '05'] },
  { id: 'writing-essay', title: '作文与结构', entries: ['08'] },
] as const;
```

Replace only `WritingStaticLanding` with:

```tsx
export function WritingStaticLanding() {
  return <div className="writing-static-shell">
    <section className="writing-library-landing writing-static-landing">
      <span className="writing-library-kicker">WRITING LIBRARY</span>
      <h2>选择你现在要积累的内容</h2>
      <p className="writing-library-teacher-note">写作积累不需要按照固定顺序学习。你正在写什么、缺什么，就进入对应模块。热点时评和案例素材已经改成独立静态页面；即使浏览器脚本异常，也不会影响页面进入和正文阅读。</p>
      {writingMacroGroups.map((group) => <section className="writing-macro-group" id={group.id} key={group.id}>
        <div className="writing-macro-head"><span>{group.id === 'writing-viewpoints' ? '01' : group.id === 'writing-evidence' ? '02' : group.id === 'writing-language' ? '03' : '04'}</span><h3>{group.title}</h3></div>
        <div className="writing-library-choice-grid writing-static-main-grid">
          {librarySections.filter((item) => group.entries.some((no) => no === item.no)).map((item) => <ChoiceCard
            key={item.no}
            no={item.no}
            label={item.label}
            desc={item.desc}
            href={item.href}
            meta={item.no === '01' ? '84 篇文章' : item.no === '02' ? '120 个案例' : item.no === '04' ? '242 条' : '继续建设'}
          />)}
        </div>
      </section>)}
    </section>
    <section className="writing-static-coming" id="terms"><span>03</span><b>规范用词</b><p>将在下一轮按同样的静态优先方式补充。</p></section>
    <section className="writing-static-coming" id="parallel"><span>05</span><b>对仗句库</b><p>将在下一轮按同样的静态优先方式补充。</p></section>
    <section className="writing-static-coming" id="sentences"><span>06</span><b>主题佳句</b><p>将在下一轮按同样的静态优先方式补充。</p></section>
    <section className="writing-static-coming" id="quotes"><span>07</span><b>名人箴言</b><p>将在下一轮按同样的静态优先方式补充。</p></section>
    <section className="writing-static-coming" id="essay"><span>08</span><b>作文框架</b><p>将在下一轮按同样的静态优先方式补充。</p></section>
  </div>;
}
```

Use the existing `librarySections` objects and exact hrefs; do not import any corpus.

- [ ] **Step 4: Wrap the writing landing in the shared content frame**

In `app/shenlun/writing/page.tsx`, import `LearningContentFrame` and replace the section child with:

```tsx
<section className="shenlun-content framework-content writing-content">
  <LearningContentFrame label="写作积累学习目录">
    <WritingStaticLanding />
  </LearningContentFrame>
</section>
```

- [ ] **Step 5: Verify all eight hrefs and both static build profiles**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs tests/route-scope.test.mjs tests/learning-routes.test.mjs
npm.cmd run verify
npm.cmd run build:static
npm.cmd run build:static:pages
```

Expected: PASS; both builds export 36 routes. Browser-check all eight writing cards and confirm their href values are unchanged. Run desktop/mobile `visual-verdict` at 90+.

- [ ] **Step 6: Commit the writing grouping**

```powershell
git add app/shenlun/writing/page.tsx app/shenlun/writing/writing-static-pages.tsx tests/learning-page-frame.test.mjs tests/route-scope.test.mjs .omx/state/unified-core-learning-pages/ralph-progress.json
git commit -m "Give writing one four-chapter surface without flattening its library" -m "Group all eight static entry links under four macro chapters while retaining every href, count label, deep route, and corpus boundary." -m "Constraint: Static-first writing navigation and selected-corpus loading must remain intact" -m "Confidence: high" -m "Scope-risk: moderate" -m "Tested: verify, both static builds, eight href checks, visual verdict 90+"
```

---

### Task 8: Migrate all four interview pages through one thin subject adapter

**Files:**
- Modify: `app/interview/interview-shell.tsx:1-105`
- Create: `app/interview/interview-learning-content.tsx`
- Modify: `app/interview/methods/page.tsx:20-62`
- Modify: `app/interview/questions/page.tsx:20-62`
- Modify: `app/interview/expression/page.tsx:20-62`
- Modify: `app/interview/videos/page.tsx:20-62`
- Modify: `tests/learning-page-frame.test.mjs`
- Modify: `tests/route-scope.test.mjs`

- [ ] **Step 1: Add failing interview structure tests**

Append:

```js
const interviewShellSource = await readFile(new URL('../app/interview/interview-shell.tsx', import.meta.url), 'utf8');
const interviewContentSource = await readFile(new URL('../app/interview/interview-learning-content.tsx', import.meta.url), 'utf8').catch(() => '');
const interviewPagePaths = ['methods', 'questions', 'expression', 'videos'];

test('interview shell is a thin shared-frame adapter', () => {
  assert.match(interviewShellSource, /<LearningPageFrame/);
  assert.doesNotMatch(interviewShellSource, /PageGuide|exam-meta-strip|interview-route-strip/);
});

for (const route of interviewPagePaths) {
  test(`interview ${route} preserves six cards, four steps, and two boards`, async () => {
    const source = await readFile(new URL(`../app/interview/${route}/page.tsx`, import.meta.url), 'utf8');
    assert.match(source, /<InterviewLearningContent/);
    assert.match(source, /cards=\{cards\}/);
    assert.match(source, /flow=\{flow\}/);
    assert.match(source, /boards=\{boards\}/);
  });
}

test('interview content adapter renders every route-owned item', () => {
  assert.match(interviewContentSource, /cards\.map/);
  assert.match(interviewContentSource, /flow\.map/);
  assert.match(interviewContentSource, /boards\.map/);
  assert.match(interviewContentSource, /<LearningContentFrame/);
});
```

- [ ] **Step 2: Run the test and confirm the legacy shell/pages fail**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs
```

Expected: FAIL because the interview shell still owns duplicate Hero markup and pages lack the content frame.

- [ ] **Step 3: Rewrite `InterviewShell` as the subject adapter**

Keep `toneToActive`. Remove `PageGuide`, `GuideItem`, `toneToTraining`, guides, duplicate Hero/footer markup, and `menu-hierarchy-refinement.css` import. Return:

```tsx
const active = toneToActive[tone];
return <LearningPageFrame
  active={active}
  chapters={learningPageChapters[active]}
  desc={desc}
  eyebrow={eyebrow}
  legacyClassName={`interview-site interview-tone-${tone}`}
  subject="interview"
  title={title}
>{children}</LearningPageFrame>;
```

Imports become:

```tsx
import type { ReactNode } from 'react';
import { LearningPageFrame } from '../learning-page-frame';
import { learningPageChapters } from '../learning-routes';
import './interview-learning.css';
```

In `tests/route-scope.test.mjs`, change the interview-owned import-order contract to:

```js
assertImportsInOrder(interviewShell, [
  './interview-learning.css',
]);
assert.doesNotMatch(interviewShell, /menu-hierarchy-refinement\.css/);
```

- [ ] **Step 4: Create the exact interview-family content adapter**

Create `app/interview/interview-learning-content.tsx`:

```tsx
import type { ReactNode } from 'react';
import { LearningContentFrame } from '../learning-chapter-navigation';

type InterviewItem = readonly [no: string, title: string, desc: string];
export type InterviewBoard = Readonly<{
  id: string;
  eyebrow: string;
  title: string;
  desc: string;
  items: readonly string[];
}>;

export function InterviewLearningContent({
  boards,
  cards,
  flow,
  flowId,
  heading,
  kicker,
  label,
  mapId,
}: {
  boards: readonly [InterviewBoard, InterviewBoard];
  cards: readonly InterviewItem[];
  flow: readonly InterviewItem[];
  flowId: string;
  heading: ReactNode;
  kicker: string;
  label: string;
  mapId: string;
}) {
  return <LearningContentFrame label={label}>
    <section id={mapId}>
      <div className="interview-content-head"><span>{kicker}</span><h2>{heading}</h2></div>
      <div className="interview-card-grid">
        {cards.map(([no, title, desc]) => <article className="interview-card" key={title}><span>{no}</span><h3>{title}</h3><p>{desc}</p></article>)}
      </div>
    </section>
    <section className="interview-learning-flow" id={flowId}>
      {flow.map(([no, title, desc]) => <article className="interview-flow-step" key={no}><span>{no}</span><h3>{title}</h3><p>{desc}</p></article>)}
    </section>
    <div className="interview-practice-board">
      {boards.map((board) => <article id={board.id} key={board.id}>
        <span>{board.eyebrow}</span><h3>{board.title}</h3><p>{board.desc}</p>
        <ul>{board.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </article>)}
    </div>
  </LearningContentFrame>;
}
```

- [ ] **Step 5: Convert each route with concrete ids and unchanged text**

In each page import `InterviewLearningContent` and `type InterviewBoard`, keep the existing `cards` and `flow` arrays, replace the inline board JSX with the exact `boards` tuple below, and replace `<section className="interview-content">...</section>` with the shown component call.

For `app/interview/methods/page.tsx`:

```tsx
const boards = [
  { id: 'interview-methods-practice', eyebrow: 'PRACTICE / 一题三遍', title: '同一道题，练三次。', desc: '第一遍只列提纲，第二遍完整作答，第三遍根据录音重答。三遍之间只改最明显的问题。', items: ['提纲控制在 30—60 秒', '完整作答记录时间', '重答时删掉空话和重复'] },
  { id: 'interview-methods-check', eyebrow: 'CHECK / 答后检查', title: '四个问题就够了。', desc: '答完先别急着找参考答案，回听自己的内容。', items: ['题目交代的任务完成了吗', '前后顺序听得懂吗', '例子真的在证明观点吗', '有没有明显的模板词和重复句'] },
] as const satisfies readonly [InterviewBoard, InterviewBoard];
```

```tsx
<section className="interview-content"><InterviewLearningContent boards={boards} cards={cards} flow={flow} flowId="interview-methods-flow" heading={<>先认任务，<br />再组织答案。</>} kicker="QUESTION TYPES / 题型地图" label="题型方法学习目录" mapId="interview-methods-map" /></section>
```

For `app/interview/questions/page.tsx`:

```tsx
const boards = [
  { id: 'interview-questions-index', eyebrow: 'ARCHIVE / 当前索引', title: '先从国考税务练起。', desc: '站内已有 2024—2026 税务系统公开考生回忆题，可用来练综合分析、组织协调、应急和情景模拟。', items: ['同一天题目连做，感受整套节奏', '同一题型跨年份做，观察命题变化', '保留第一次提纲，方便对比'] },
  { id: 'interview-questions-review', eyebrow: 'REVIEW / 复盘清单', title: '每次只记五项。', desc: '记录越简单，越容易坚持。', items: ['题目任务有没有答全', '最有效的一个观点是什么', '最空的一段在哪里', '有没有明显卡顿或重复', '下一次只改哪一件事'] },
] as const satisfies readonly [InterviewBoard, InterviewBoard];
```

```tsx
<section className="interview-content"><InterviewLearningContent boards={boards} cards={cards} flow={flow} flowId="interview-questions-flow" heading={<>按系统整理，<br />按题型练透。</>} kicker="REAL QUESTIONS / 真题训练" label="真题实战学习目录" mapId="interview-questions-map" /></section>
```

For `app/interview/expression/page.tsx`:

```tsx
const boards = [
  { id: 'interview-expression-daily', eyebrow: 'DAILY / 每日小练', title: '十分钟就能做完。', desc: '找一道题，只练开头、结构和一个例子。短练习更适合每天保持口感。', items: ['30 秒说观点', '1 分钟说结构', '补一个具体例子', '回听一次'] },
  { id: 'interview-expression-review', eyebrow: 'VOICE / 回听重点', title: '听自己，比看稿有用。', desc: '录音里最容易听出重复、句子太长和观点不清。', items: ['第一句话有没有观点', '一句话是不是太长', '有没有连续重复同一个词', '结尾有没有突然收住'] },
] as const satisfies readonly [InterviewBoard, InterviewBoard];
```

```tsx
<section className="interview-content"><InterviewLearningContent boards={boards} cards={cards} flow={flow} flowId="interview-expression-flow" heading={<>想明白，<br />再说顺。</>} kicker="EXPRESSION / 表达训练" label="表达训练学习目录" mapId="interview-expression-map" /></section>
```

For `app/interview/videos/page.tsx`:

```tsx
const boards = [
  { id: 'interview-videos-class', eyebrow: 'CLASS / 看课堂', title: '重点看修改过程。', desc: '一遍作答很难说明问题。课堂里真正有用的部分，往往是追问之后怎么调整观点和表达。', items: ['原回答卡在哪里', '老师追问了什么', '第二遍改了哪一句'] },
  { id: 'interview-videos-notes', eyebrow: 'NOTE / 课后笔记', title: '每段视频留一条。', desc: '笔记不用长，能在下一道题里用出来就够了。', items: ['一个审题提醒', '一个结构动作', '一句更自然的表达', '一道想重答的题'] },
] as const satisfies readonly [InterviewBoard, InterviewBoard];
```

```tsx
<section className="interview-content"><InterviewLearningContent boards={boards} cards={cards} flow={flow} flowId="interview-videos-flow" heading={<>课程、课堂，<br />还有日常。</>} kicker="VIDEO ARCHIVE / 影像档案" label="面试课程现场目录" mapId="interview-videos-map" /></section>
```

- [ ] **Step 6: Verify the interview family**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs tests/learning-chapter-transition.test.mjs tests/route-scope.test.mjs
npm.cmd run verify
npm.cmd run build:static
npm.cmd run build:static:pages
```

Browser-check each route at `1440×900` and `390×844`:

- exactly four Hero buttons;
- exactly six `.interview-card` nodes;
- exactly four `.interview-flow-step` nodes;
- exactly two `.interview-practice-board > article` nodes;
- every Hero target and matching directory entry works;
- mobile drawer closes via button, backdrop, and Escape without trapping focus;
- no horizontal overflow.

Run `visual-verdict` for all four pages at both sizes; require 90+.

- [ ] **Step 7: Commit the interview family migration**

```powershell
git add app/interview/interview-shell.tsx app/interview/interview-learning-content.tsx app/interview/methods/page.tsx app/interview/questions/page.tsx app/interview/expression/page.tsx app/interview/videos/page.tsx tests/learning-page-frame.test.mjs tests/route-scope.test.mjs .omx/state/unified-core-learning-pages/ralph-progress.json
git commit -m "Unify interview pages without compressing their training content" -m "Move the four interview routes to one subject adapter and four macro chapters while retaining every six-card map, four-step flow, and paired practice board." -m "Constraint: Interview content counts and brown subject accent remain stable" -m "Confidence: high" -m "Scope-risk: broad" -m "Tested: verify, both static builds, eight viewport visual checks, visual verdict 90+"
```

---

### Task 9: Remove superseded Hero/PageGuide code and old positional CSS

**Files:**
- Delete: `app/shenlun/framework/framework-hero-menu.tsx`
- Delete: `app/shenlun/writing/writing-hero-menu.tsx`
- Delete: `app/shenlun/writing/writing-hero-bridge.tsx`
- Delete: `app/shenlun/writing/writing-hero-menu.css`
- Delete: `app/framework-scene-transition.css`
- Delete: `app/learning-hero-standard.css`
- Modify: `app/learning-page-effects.tsx:1-80`
- Modify: `app/layout.tsx:20-25`
- Modify: `app/shenlun/writing/layout.tsx:1-12`
- Modify: `app/shenlun/framework/question-type-switcher.tsx:1-20`
- Modify: `app/interaction-semantics.css`
- Modify: `tests/route-scope.test.mjs`
- Modify: `tests/learning-page-frame.test.mjs`

- [ ] **Step 1: Add failing dead-code assertions**

Append:

```js
test('superseded Hero menus and independent PageGuide are gone', async () => {
  const effects = await readFile(new URL('../app/learning-page-effects.tsx', import.meta.url), 'utf8');
  const layout = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8');
  const writingLayout = await readFile(new URL('../app/shenlun/writing/layout.tsx', import.meta.url), 'utf8');
  const questionTypeSwitcher = await readFile(new URL('../app/shenlun/framework/question-type-switcher.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(effects, /export function PageGuide|IntersectionObserver/);
  assert.doesNotMatch(layout, /learning-hero-standard\.css/);
  assert.doesNotMatch(writingLayout, /writing-hero-menu\.css/);
  assert.doesNotMatch(questionTypeSwitcher, /page-guide-select/);
});
```

- [ ] **Step 2: Run tests and confirm legacy code is still detected**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs tests/route-scope.test.mjs
```

Expected: FAIL on `PageGuide` and `learning-hero-standard.css`.

- [ ] **Step 3: Prove there are no remaining consumers before deleting**

Run:

```powershell
rg -n "FrameworkHeroMenu|WritingHeroMenu|WritingHeroBridge|framework-hero-select|writing-hero-select|page-guide-select|PageGuide|learning-hero-standard|writing-hero-menu.css" app tests
```

Expected: only the files and imports listed in this task remain. If another consumer appears, stop this cleanup step and update the plan rather than deleting a live contract.

- [ ] **Step 4: Delete dead components and reduce `learning-page-effects.tsx`**

Delete the six superseded files listed above. In `learning-page-effects.tsx`, keep only:

```tsx
'use client';

import { useEffect, useRef } from 'react';

export function LearningPageEffects() {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${event.clientX - 210}px, ${event.clientY - 210}px, 0)`;
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div ref={glowRef} className="learning-theme-glow" aria-hidden="true" />;
}
```

- [ ] **Step 5: Remove obsolete CSS imports and selector blocks**

1. Remove `import './learning-hero-standard.css';` from `app/layout.tsx` and delete `app/learning-hero-standard.css`.
2. Remove `import './writing-hero-menu.css';` from `app/shenlun/writing/layout.tsx` and delete that stylesheet; every selector in it targets the retired eight-item Hero or its old transition name.
3. In `app/shenlun/framework/question-type-switcher.tsx`, change the React import to `import { useState } from 'react';` and delete the complete `useEffect` that subscribes to `page-guide-select`; keep the tab buttons and `activeSlug` behavior unchanged.
4. In `interaction-semantics.css`, remove blocks whose selectors contain only `.framework-hero-entry-strip`, `.hero-page-guide`, `.page-guide-float`, or `.page-guide-inline`. Keep any selector block that also targets a still-live control until it is split safely.
5. Keep `menu-hierarchy-refinement.css` and its route-owned imports.

In the writing import-order array in `tests/route-scope.test.mjs`, remove only `'./writing-hero-menu.css'`; retain every other specialist import in its existing order.

- [ ] **Step 6: Tighten route-scope and import-boundary tests**

In `tests/route-scope.test.mjs`, keep the specialist exclusions and add:

```js
test('retired framework scene and Hero standard styles are not imported', () => {
  assert.doesNotMatch(rootLayout, /framework-scene-transition\.css/);
  assert.doesNotMatch(rootLayout, /learning-hero-standard\.css/);
  assert.doesNotMatch(frameworkPage, /framework-scene-transition\.css/);
});
```

- [ ] **Step 7: Verify cleanup and commit**

Run:

```powershell
rg -n "FrameworkHeroMenu|WritingHeroMenu|WritingHeroBridge|framework-hero-select|writing-hero-select|page-guide-select|PageGuide|learning-hero-standard|writing-hero-menu.css|framework-scene-transition" app tests
npm.cmd run verify
```

Expected: `rg` returns only intentional test descriptions or no matches; verify passes. Re-run `visual-verdict` for all eight core routes at desktop and mobile sizes because this step removes root-level CSS, and require every score to remain 90+ before committing.

```powershell
git add -A app tests .omx/state/unified-core-learning-pages/ralph-progress.json
git commit -m "Remove navigation layers replaced by the shared chapter system" -m "Delete dead Hero menus, event bridges, independent guide state, old scene CSS, and positional Hero overrides after all eight routes use the new contract." -m "Constraint: Keep live specialist hierarchy and content styles" -m "Confidence: high" -m "Scope-risk: moderate" -m "Tested: dead-code search, npm run verify, sixteen viewport visual verdicts 90+"
```

---

### Task 10: Full visual, accessibility, route-scope, and static-release verification

**Files:**
- Modify if verification exposes defects: only files introduced or migrated in Tasks 1–9
- Update: `.omx/state/unified-core-learning-pages/ralph-progress.json`

- [ ] **Step 1: Run all automated verification**

Run sequentially:

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd test
npm.cmd run build:static
npm.cmd run build:static:pages
```

Expected: lint/typecheck pass; all tests pass; each build exports 36 unique routes with no missing assets or unprefixed Pages paths.

- [ ] **Step 2: Verify all eight routes at both target sizes**

Use Browser/Playwright for this matrix:

```text
/shenlun/framework/
/shenlun/questions/
/shenlun/writing/
/shenlun/videos/
/interview/methods/
/interview/questions/
/interview/expression/
/interview/videos/
```

At `1440×900` and `390×844`, record for each route:

- four Hero chapter buttons;
- matching four top-level directory items;
- correct title, topline, review stamp, description, paper surface, and subject accent;
- correct content target after every Hero click;
- sticky desktop directory or mobile drawer behavior;
- zero horizontal overflow (`document.documentElement.scrollWidth === document.documentElement.clientWidth`);
- no console errors;
- keyboard activation and visible focus;
- manual body scrolling updates only the active directory highlight and does not launch a Hero transition;
- reduced-motion and unsupported-View-Transition paths reach the same target without transition timing;
- mobile Tab traversal can leave the drawer, and button/backdrop/Escape closure restores focus to the element that opened it.

Also check `/shenlun/framework/`, `/shenlun/questions/`, `/shenlun/writing/`, and `/interview/methods/` at `900×900`: the directory and reading surface remain two columns, the directory width/gap contract shrinks, content cards reduce columns where needed, and the reading measure remains usable.

- [ ] **Step 3: Prove out-of-scope routes did not change**

Compare before/after screenshots and DOM wrappers for:

```text
/
/shenlun/
/interview/
/questions/
/materials/
/tools/
```

Expected: no `.learning-page-frame` on these routes and no visual difference attributable to the new scoped CSS.

- [ ] **Step 4: Run the final visual-verdict loop**

For each core route, compare desktop and mobile screenshots against `/shenlun/framework/` as the structural reference while allowing blue/brown subject accent and route-owned body content differences. Score these criteria:

- Hero alignment and height
- title/eyebrow/stamp coordinates
- four-cell strip geometry
- directory width and reading measure
- paper, ink, border, and spacing consistency
- card rhythm and footer relationship
- mobile order, drawer, and overflow
- transition start/end polish

Persist the aggregate verdict at `.omx/state/unified-core-learning-pages/ralph-progress.json`. Iterate on scoped files until every representative verdict is 90+.

- [ ] **Step 5: Review the final diff for unintended scope**

Run:

```powershell
git diff --check cb25471...HEAD
git diff --stat cb25471...HEAD
git status --short
```

Expected: no whitespace errors, no generated build output staged, and only planned app/test/docs/state files changed.

- [ ] **Step 6: Commit final verification fixes and evidence if the verification loop changed files**

```powershell
git status --short
# Run the following add/commit only when Task 10 produced a fix or changed the persisted verdict evidence:
git add app tests .omx/state/unified-core-learning-pages/ralph-progress.json
git commit -m "Prove the unified learning system across every supported route" -m "Record final interaction, accessibility, visual, route-scope, and dual static-build evidence after correcting any verification-only defects." -m "Constraint: No push or deployment is authorized" -m "Confidence: high" -m "Scope-risk: broad" -m "Directive: Future learning pages must declare four macro chapters and retain route-owned content boundaries" -m "Tested: lint, typecheck, full tests, root build, Pages build, sixteen viewport checks, reduced motion, visual verdict 90+"
```

---

## Plan completion criteria

The plan is complete only when:

1. all ten tasks and their checkboxes are complete;
2. every core route uses the same shared frame and four-chapter state source;
3. all original route content/link/count/payload contracts pass;
4. framework-style transition works with desktop, mobile, unsupported, and reduced-motion paths;
5. homepage and every representative non-core route remain unchanged;
6. lint, typecheck, full tests, root static build, and Pages static build pass;
7. final visual verdicts are 90+ and the JSON evidence is persisted;
8. no push, deployment, new dependency, or unrelated refactor occurs.
