# Cascading Directory and Reading Surface Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every core secondary learning page a consistent, left-aligned reading frame while rebuilding writing accumulation as a two-column directory whose third-level material expands and loads inside the article surface.

**Architecture:** Keep `LearningChapterProvider` as the sole owner of macro chapter state, and extend `LearningContentFrame` with a presentational two-column directory plus one desktop-only whole-directory collapse state. Keep writing-specific categories and disclosures in the writing subtree: a generated lightweight leaf index supplies titles, category loaders fetch large bodies on first disclosure, and a focused disclosure component enforces one open item at a time.

**Tech Stack:** React 19, TypeScript, Vinext/Next-compatible dynamic imports, scoped CSS, Node test runner, Playwright with installed system Chrome for visual verification.

---

## File responsibility map

- `app/learning-chapter-navigation.tsx` — shared macro navigation, desktop directory collapse state, mobile drawer state, and two-column directory markup.
- `app/learning-page-frame.css` — shared geometry and responsive behavior for all eight core secondary pages.
- `app/shenlun/writing/writing-inline-disclosure.tsx` — accessible third-level title list that renders one expanded child in place.
- `app/shenlun/writing/writing-library-leaf-index.ts` — generated, body-free hotspot/case title metadata used before long content loads.
- `scripts/generate-writing-library-leaf-index.mjs` — deterministic generator for the body-free index.
- `app/shenlun/writing/writing-library-manual.tsx` — writing module/category/leaf state, deferred loading, hash restoration, search handoff, and reading composition.
- `app/shenlun/writing/writing-library-manual.css` — writing colors, two-level directory presentation, restrained article typography, and inline disclosures.
- `tests/learning-page-frame.test.mjs` — source-level architecture and route-scope regressions.
- `tests/writing-library-index.test.mjs` — generated-index parity with the validated hotspot and case loaders.
- `.omx/state/unified-core-learning-pages/ralph-progress.json` — final visual verdict evidence; intentionally not committed.

---

### Task 1: Lock the approved hierarchy and shared-frame contracts

**Files:**
- Modify: `tests/learning-page-frame.test.mjs:35-68,180-209`

- [ ] **Step 1: Add failing shared-directory assertions**

Add these assertions after the existing shared frame tests:

```js
test('shared content frame supports a left-to-right directory and one whole-directory collapse', () => {
  assert.match(navigationSource, /learning-directory-primary/);
  assert.match(navigationSource, /learning-directory-secondary/);
  assert.match(navigationSource, /directoryCollapsed/);
  assert.match(navigationSource, /收起目录/);
  assert.match(navigationSource, /展开目录/);
  assert.doesNotMatch(navigationSource, /collapseSecondary|secondaryCollapsed/);
});

test('shared reading geometry is left aligned and lets the reading column grow', () => {
  assert.match(frameCss, /justify-content:\s*start/);
  assert.match(frameCss, /learning-content-frame\.directory-collapsed/);
  assert.match(frameCss, /learning-directory-cascade/);
});
```

- [ ] **Step 2: Add failing writing hierarchy assertions**

Extend the existing writing test with:

```js
const writingDisclosureSource = await readFile(
  new URL('../app/shenlun/writing/writing-inline-disclosure.tsx', import.meta.url),
  'utf8',
).catch(() => '');

test('writing keeps third-level choices in the reading surface', () => {
  assert.match(writingManualSource, /WritingInlineDisclosure/);
  assert.match(writingDisclosureSource, /aria-expanded/);
  assert.match(writingDisclosureSource, /writing-inline-disclosure-body/);
  assert.doesNotMatch(writingManualSource, /TreeLeaves|writing-tree-leaves/);
  assert.doesNotMatch(writingManualSource, /details\[chapter\.id\]/);
});

test('metaphor and parallel libraries remain two-level modules', () => {
  assert.match(writingManualSource, /activeLayer === 'metaphors'/);
  assert.match(writingManualSource, /activeLayer === 'parallel'/);
  assert.doesNotMatch(writingManualSource, /WritingInlineDisclosure[^;]+metaphors/s);
  assert.doesNotMatch(writingManualSource, /WritingInlineDisclosure[^;]+parallel/s);
});

test('hotspots and cases use the restrained article surface', () => {
  assert.match(writingManualSource, /writing-editorial-paper/);
  assert.match(writingManualSource, /writing-case-article/);
  assert.doesNotMatch(writingManualSource, /writing-dossier-facts|writing-dossier-uses/);
});
```

- [ ] **Step 3: Run the focused test and confirm RED**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs
```

Expected: FAIL because the cascade classes, collapse state, disclosure component, and case article class do not exist yet.

- [ ] **Step 4: Commit the regression contract**

```powershell
git add tests/learning-page-frame.test.mjs
git commit -m "Protect the approved student navigation model" -m "Tests now describe the two-level directory, whole-directory collapse, inline third-level disclosures, and article-first writing surfaces before implementation begins.`n`nConstraint: Third-level items must never return to the directory`nConfidence: high`nScope-risk: narrow`nTested: Focused test run fails on the missing approved behavior`nNot-tested: Implementation is intentionally absent in this red commit"
```

---

### Task 2: Build the shared two-column and collapsible directory shell

**Files:**
- Modify: `app/learning-chapter-navigation.tsx:254-300`
- Modify: `app/learning-page-frame.css:149-166,181-219`
- Test: `tests/learning-page-frame.test.mjs`

- [ ] **Step 1: Separate primary and secondary directory markup**

Replace `LearningMacroDirectory` with a component that renders details beside, not below, the active macro item:

```tsx
export function LearningMacroDirectory({ details = {} }: { details?: Readonly<Record<string, ReactNode>> }) {
  const { activeId, activateChapter, arrivingId, chapters } = useLearningChapterNavigation();
  const activeDetails = details[activeId];

  return <div className={`learning-directory-cascade${activeDetails ? ' has-secondary' : ''}`}>
    <nav className="learning-directory-primary learning-macro-directory" aria-label="一级目录">
      <span className="learning-directory-kicker">一级目录</span>
      {chapters.map((chapter) => <div className={`learning-directory-group${activeId === chapter.id ? ' active' : ''}${arrivingId === chapter.id ? ' arriving' : ''}`} key={chapter.id}>
        <button
          aria-current={activeId === chapter.id ? 'location' : undefined}
          data-learning-directory-id={chapter.id}
          onClick={(event) => activateChapter(chapter.id, event.currentTarget, 'directory')}
          type="button"
        ><span>{chapter.no}</span><b>{chapter.label}</b><i aria-hidden="true">→</i></button>
      </div>)}
    </nav>
    {activeDetails ? <nav className="learning-directory-secondary" aria-label="二级目录">
      <span className="learning-directory-kicker">二级目录</span>
      {activeDetails}
    </nav> : null}
  </div>;
}
```

- [ ] **Step 2: Add desktop-only whole-directory collapse state**

In `LearningContentFrame`, add local collapse state and classes. Keep the existing drawer as the only mobile mechanism:

```tsx
const [directoryCollapsed, setDirectoryCollapsed] = useState(false);
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
```

- [ ] **Step 3: Implement shared left-aligned geometry**

Replace the desktop frame rules with these layout responsibilities, adjusting final pixel values only during visual verification:

```css
.learning-page-frame .learning-content-frame {
  --learning-directory-width: 224px;
  position: relative;
  display: grid;
  grid-template-columns: var(--learning-directory-width) minmax(0, 960px);
  justify-content: start;
  gap: clamp(28px, 3vw, 48px);
  width: min(1380px, calc(100% - 48px));
  margin: 0 auto;
  padding: clamp(64px, 8vw, 118px) 0;
}

.learning-page-frame .learning-content-frame.has-secondary-directory {
  --learning-directory-width: 340px;
}

.learning-page-frame .learning-content-frame.directory-collapsed {
  --learning-directory-width: 46px;
  gap: 24px;
}

.learning-page-frame .learning-directory-column {
  position: sticky;
  top: 84px;
  align-self: start;
  max-height: calc(100vh - 112px);
}

.learning-page-frame .learning-directory-cascade {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  border: 1px solid var(--learning-border);
  background: var(--learning-paper-raised);
}

.learning-page-frame .learning-directory-cascade.has-secondary {
  grid-template-columns: minmax(0, .92fr) minmax(0, 1.08fr);
}

.learning-page-frame .learning-directory-secondary {
  min-width: 0;
  border-left: 1px solid var(--learning-border);
}

.learning-page-frame .learning-directory-collapse {
  display: block;
  margin: 0 0 10px auto;
}

.learning-page-frame .directory-collapsed .learning-directory-content {
  visibility: hidden;
  pointer-events: none;
}
```

Inside `@media (max-width: 820px)`, reset to one drawer and hide the desktop collapse control:

```css
.learning-page-frame .learning-directory-collapse { display: none; }
.learning-page-frame .learning-directory-content { visibility: visible; pointer-events: auto; }
.learning-page-frame .learning-directory-cascade.has-secondary { grid-template-columns: 1fr; }
.learning-page-frame .learning-directory-secondary { border-left: 0; border-top: 1px solid var(--learning-border); }
```

- [ ] **Step 4: Run focused tests and type checking**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs
npm.cmd run typecheck
```

Expected: shared-directory tests PASS; writing disclosure/article tests remain RED until later tasks; typecheck PASS.

- [ ] **Step 5: Commit the shared shell**

```powershell
git add app/learning-chapter-navigation.tsx app/learning-page-frame.css tests/learning-page-frame.test.mjs
git commit -m "Give long-form study pages room without losing location" -m "The shared frame now renders secondary choices beside the macro directory and allows the whole desktop directory to collapse while preserving the mobile drawer.`n`nConstraint: Secondary columns remain visible whenever the directory is open`nRejected: Toggle the second column independently | it weakens location awareness`nConfidence: high`nScope-risk: moderate`nDirective: Keep mobile navigation drawer-based and keyboard accessible`nTested: Focused frame tests and TypeScript typecheck"
```

---

### Task 3: Generate a body-free writing leaf index

**Files:**
- Create: `scripts/generate-writing-library-leaf-index.mjs`
- Create: `app/shenlun/writing/writing-library-leaf-index.ts`
- Create: `tests/writing-library-index.test.mjs`
- Modify: `tests/route-scope.test.mjs:116-123`

- [ ] **Step 1: Write the failing index parity test**

Create `tests/writing-library-index.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { hotspotIndex, caseIndex } from '../app/shenlun/writing/writing-library-index.ts';
import { hotspotLeafIndex, caseLeafIndex } from '../app/shenlun/writing/writing-library-leaf-index.ts';
import { loadHotspotCategory } from '../app/shenlun/writing/writing-hotspot-loader.ts';
import { loadCaseCategory } from '../app/shenlun/writing/writing-case-loader.ts';

test('lightweight hotspot titles match validated article bodies', async () => {
  for (const item of hotspotIndex) {
    const category = await loadHotspotCategory(item.key);
    assert.deepEqual(hotspotLeafIndex[item.key], category.articles.map(({ slug, no, title }) => ({ slug, no, title })));
  }
});

test('lightweight case titles match validated case bodies', async () => {
  for (const item of caseIndex) {
    const category = await loadCaseCategory(item.key);
    assert.deepEqual(caseLeafIndex[item.key], category.cases.map(({ slug, no, title }) => ({ slug, no, title })));
  }
});
```

- [ ] **Step 2: Run the parity test and confirm RED**

Run:

```powershell
node --experimental-strip-types --test tests/writing-library-index.test.mjs
```

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `writing-library-leaf-index.ts`.

- [ ] **Step 3: Create the deterministic generator**

Create `scripts/generate-writing-library-leaf-index.mjs`:

```js
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { hotspotIndex, caseIndex } from '../app/shenlun/writing/writing-library-index.ts';
import { loadHotspotCategory } from '../app/shenlun/writing/writing-hotspot-loader.ts';
import { loadCaseCategory } from '../app/shenlun/writing/writing-case-loader.ts';

const hotspotEntries = await Promise.all(hotspotIndex.map(async ({ key }) => {
  const category = await loadHotspotCategory(key);
  return [key, category.articles.map(({ slug, no, title }) => ({ slug, no, title }))];
}));

const caseEntries = await Promise.all(caseIndex.map(async ({ key }) => {
  const category = await loadCaseCategory(key);
  return [key, category.cases.map(({ slug, no, title }) => ({ slug, no, title }))];
}));

const source = `// Generated by scripts/generate-writing-library-leaf-index.mjs. Do not edit by hand.\n\nexport type WritingLeafIndexItem = { slug: string; no: string; title: string };\n\nexport const hotspotLeafIndex = ${JSON.stringify(Object.fromEntries(hotspotEntries), null, 2)} as const satisfies Record<string, readonly WritingLeafIndexItem[]>;\n\nexport const caseLeafIndex = ${JSON.stringify(Object.fromEntries(caseEntries), null, 2)} as const satisfies Record<string, readonly WritingLeafIndexItem[]>;\n`;

await writeFile(
  fileURLToPath(new URL('../app/shenlun/writing/writing-library-leaf-index.ts', import.meta.url)),
  source,
  'utf8',
);
```

- [ ] **Step 4: Generate and validate the lightweight index**

Run:

```powershell
node --experimental-strip-types scripts/generate-writing-library-leaf-index.mjs
node --experimental-strip-types --test tests/writing-library-index.test.mjs
```

Expected: generated file contains only `slug`, `no`, and `title`; both parity tests PASS.

- [ ] **Step 5: Lock the runtime import boundary**

Extend `tests/route-scope.test.mjs`:

```js
test('writing leaf index contains labels but no long bodies', () => {
  assert.match(writingLibraryManual, /from ['"]\.\/writing-library-leaf-index['"]/);
  assert.doesNotMatch(writingLibraryManual, /from ['"]\.\/writing-hotspot-(?:all|data|development)/);
  assert.doesNotMatch(writingLibraryManual, /from ['"]\.\/writing-case-(?:all|data)/);
});
```

- [ ] **Step 6: Commit the index boundary**

```powershell
git add scripts/generate-writing-library-leaf-index.mjs app/shenlun/writing/writing-library-leaf-index.ts tests/writing-library-index.test.mjs tests/route-scope.test.mjs
git commit -m "Delay long writing bodies until students ask for them" -m "A generated title-only index lets the reading page show third-level choices without importing hotspot and case bodies; parity tests prevent the index from becoming stale.`n`nConstraint: No new runtime dependency or content service`nRejected: Split every article into its own source file | excessive churn for the current corpus`nConfidence: high`nScope-risk: moderate`nDirective: Regenerate the leaf index whenever hotspot or case titles change`nTested: Index parity tests and route import-boundary tests"
```

---

### Task 4: Move every true third level into an accessible inline disclosure

**Files:**
- Create: `app/shenlun/writing/writing-inline-disclosure.tsx`
- Modify: `app/shenlun/writing/writing-library-manual.tsx:1-412`
- Modify: `tests/learning-page-frame.test.mjs:180-209`

- [ ] **Step 1: Create the focused disclosure component**

Create `writing-inline-disclosure.tsx`:

```tsx
import type { ReactNode } from 'react';

export type WritingDisclosureItem = {
  id: string;
  no: string;
  title: string;
  meta?: string;
};

export function WritingInlineDisclosure({
  activeId,
  children,
  items,
  label,
  onToggle,
}: {
  activeId: string;
  children: ReactNode;
  items: readonly WritingDisclosureItem[];
  label: string;
  onToggle: (id: string) => void;
}) {
  return <section className="writing-inline-disclosure" aria-label={label}>
    <header><h2>{label}</h2><span>共 {items.length} 项 · 点击标题展开</span></header>
    {items.map((item) => {
      const open = item.id === activeId;
      const bodyId = `writing-leaf-${item.id.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
      return <section className={`writing-inline-disclosure-item${open ? ' open' : ''}`} key={item.id}>
        <button aria-controls={bodyId} aria-expanded={open} onClick={() => onToggle(item.id)} type="button">
          <strong>{item.no}</strong><span><b>{item.title}</b>{item.meta ? <small>{item.meta}</small> : null}</span><i aria-hidden="true">{open ? '收起 ↑' : '展开 ↓'}</i>
        </button>
        {open ? <div className="writing-inline-disclosure-body" id={bodyId}>{children}</div> : null}
      </section>;
    })}
  </section>;
}
```

- [ ] **Step 2: Replace nested tree details with second-level-only buttons**

In `writing-library-manual.tsx`:

- Import `WritingInlineDisclosure` and `hotspotLeafIndex`/`caseLeafIndex`.
- Delete `TreeBranch` and `TreeLeaves`.
- Replace them with this directory helper:

```tsx
function SecondaryDirectory({ active, items, label, onSelect }: {
  active: string;
  items: readonly (readonly [string, string])[];
  label: string;
  onSelect: (key: string) => void;
}) {
  return <div className="writing-secondary-directory" aria-label={label}>
    {items.map(([key, itemLabel]) => <button
      aria-current={active === key ? 'location' : undefined}
      className={active === key ? 'active' : ''}
      key={key}
      onClick={() => onSelect(key)}
      type="button"
    >{itemLabel}</button>)}
  </div>;
}
```

Build `details` exclusively from category arrays. For example:

```tsx
const details: Record<string, ReactNode> = {
  'writing-hotspots': <SecondaryDirectory active={hotspotKey} items={hotspotIndex.map((item) => [item.key, item.label] as const)} label="热点时评二级目录" onSelect={(key) => selectHotspotCategory(key as HotspotIndexItem['key'])} />,
  'writing-cases': <SecondaryDirectory active={caseKey} items={caseIndex.map((item) => [item.key, item.label] as const)} label="案例素材二级目录" onSelect={(key) => selectCaseCategory(key as CaseIndexItem['key'])} />,
  'writing-terms': <SecondaryDirectory active={selections.terms.category} items={foundationIndex.terms} label="规范用词二级目录" onSelect={(key) => selectGeneric('terms', key)} />,
  'writing-metaphors': <SecondaryDirectory active="library" items={[["library", "检索词库"]]} label="比喻词库二级目录" onSelect={() => undefined} />,
  'writing-parallel': <SecondaryDirectory active={selections.parallel.category} items={foundationIndex.parallel} label="对仗句库二级目录" onSelect={(key) => selectGeneric('parallel', key)} />,
  'writing-sentences': <SecondaryDirectory active={selections.sentences.category} items={foundationIndex.sentences} label="主题佳句二级目录" onSelect={(key) => selectGeneric('sentences', key)} />,
  'writing-quotes': <SecondaryDirectory active={selections.quotes.category} items={foundationIndex.quotes} label="名人箴言二级目录" onSelect={(key) => selectGeneric('quotes', key)} />,
  'writing-essay': <SecondaryDirectory active={selections.essay.category} items={foundationIndex.essay} label="作文框架二级目录" onSelect={(key) => selectGeneric('essay', key)} />,
};
```

- [ ] **Step 3: Make category selection cheap and leaf expansion the loading trigger**

Use separate category selectors that close the old leaf and do not load a body:

```tsx
const selectHotspotCategory = (key: HotspotIndexItem['key']) => {
  setHotspotKey(key);
  setActiveArticle('');
  setHotspotState('idle');
};

const selectCaseCategory = (key: CaseIndexItem['key']) => {
  setCaseKey(key);
  setActiveCase('');
  setCaseState('idle');
};

const toggleHotspotArticle = (slug: string) => {
  setActiveArticle((current) => current === slug ? '' : slug);
};

const toggleCaseItem = (slug: string) => {
  setActiveCase((current) => current === slug ? '' : slug);
};
```

Change the hotspot and case effects to return while no leaf is open, and load the selected category only after a leaf click:

```tsx
useEffect(() => {
  if (activeLayer !== 'hotspots' || !activeArticle) return;
  const request = ++hotspotRequest.current;
  setHotspotState('loading');
  void loadHotspotCached(hotspotKey).then((category) => {
    if (request !== hotspotRequest.current) return;
    setHotspotCategory(category);
    setHotspotState('ready');
  }).catch(() => request === hotspotRequest.current && setHotspotState('error'));
}, [activeArticle, activeLayer, hotspotKey, hotspotReload]);
```

Apply the same guarded effect to cases. Preserve request tokens and existing maps so fast clicks cannot show stale content and previously opened categories remain cached.

- [ ] **Step 4: Preserve hash, session, and search behavior with a closed leaf**

Build paths even when no third-level item is expanded:

```tsx
if (activeLayer === 'hotspots') return ['hotspots', hotspotKey, ...(activeArticle ? [activeArticle] : [])];
if (activeLayer === 'cases') return ['cases', caseKey, ...(activeCase ? [activeCase] : [])];
```

Set default generic leaves to `''`. Search results still activate the module/category and pass the requested leaf so the matching disclosure opens. Restore a leaf only if a third hash segment exists.

- [ ] **Step 5: Render hotspot and case title indexes before their bodies**

For hotspots, render the lightweight titles and put loading/error/article content inside the active row:

```tsx
const hotspotMeta = hotspotIndex.find((item) => item.key === hotspotKey) ?? hotspotIndex[0];
const hotspotItems = hotspotLeafIndex[hotspotKey].map((item) => ({ id: item.slug, no: item.no, title: item.title }));

<WritingInlineDisclosure
  activeId={activeArticle}
  items={hotspotItems}
  label={`${hotspotMeta.label}专题文章`}
  onToggle={toggleHotspotArticle}
>
  {hotspotState === 'loading' ? <LoadingBlock label="热点文章" /> : null}
  {hotspotState === 'error' ? <ErrorBlock label="热点文章" retry={() => { hotspotCache.delete(hotspotKey); setHotspotReload((value) => value + 1); }} /> : null}
  {hotspotState === 'ready' && article ? <article className="writing-editorial-paper">
    <p className="writing-paper-intro">{annotate(article.intro, article.highlights)}<strong>{annotate(article.thesis, article.highlights)}</strong></p>
    {article.sections.map((section) => <section key={section.title}><h3>{annotate(section.title, article.highlights)}</h3><p>{annotate(section.body, article.highlights)}</p></section>)}
    <p>{annotate(article.conclusion, article.highlights)}</p>
  </article> : null}
</WritingInlineDisclosure>
```

Render cases with `caseLeafIndex[caseKey]` and `writing-case-article`. Do not show a body until the student opens a title.

- [ ] **Step 6: Apply the same one-open-item behavior to true foundation leaves**

- Terms: map category entries to disclosure titles using `entry.after`.
- Sentences: map to `entry.purpose` or a concise beginning of `entry.text`.
- Quotes: map to `${entry.author}｜${entry.text}`.
- Essay: map exactly three disclosures: `写法`, `常见问题`, `迁移示例`.
- Parallel and metaphors: render their existing content directly and never wrap them in `WritingInlineDisclosure`.

The toggle for a generic leaf must be:

```tsx
const toggleGenericLeaf = (module: FoundationModuleKey, leaf: string) => {
  setSelections((current) => ({
    ...current,
    [module]: {
      ...current[module],
      leaf: current[module].leaf === leaf ? '' : leaf,
    },
  }));
};
```

- [ ] **Step 7: Run focused tests and typecheck**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs tests/writing-library-index.test.mjs tests/route-scope.test.mjs
npm.cmd run typecheck
```

Expected: all focused tests and typecheck PASS.

- [ ] **Step 8: Commit inline learning disclosures**

```powershell
git add app/shenlun/writing/writing-inline-disclosure.tsx app/shenlun/writing/writing-library-manual.tsx tests/learning-page-frame.test.mjs
git commit -m "Keep deep writing choices where students read them" -m "Writing categories now stop at level two in the directory; true third-level articles and entries expand one at a time inside the reading surface and trigger deferred body loading.`n`nConstraint: Metaphor and parallel libraries have no third level`nConfidence: high`nScope-risk: moderate`nDirective: New writing leaves belong in inline disclosures, never in the sidebar`nTested: Focused hierarchy, route, index, and TypeScript checks"
```

---

### Task 5: Turn long writing material into restrained articles and unify geometry

**Files:**
- Modify: `app/shenlun/writing/writing-library-manual.tsx:357-407`
- Modify: `app/shenlun/writing/writing-library-manual.css:54-250`
- Modify: `app/learning-page-frame.css:149-219`
- Test: `tests/learning-page-frame.test.mjs`

- [ ] **Step 1: Replace case dashboard markup with an article**

Use one reading paper instead of dossier cards:

```tsx
<article className="writing-editorial-paper writing-case-article">
  <section>
    <h3>案例原貌</h3>
    <p>{caseItem.summary}</p>
  </section>
  {caseItem.usages.map((usage) => <section key={usage.title}>
    <h3>{usage.title}</h3>
    <p>{annotate(usage.text, usage.highlights)}</p>
  </section>)}
</article>
```

Delete `writing-dossier-facts` and `writing-dossier-uses` markup.

- [ ] **Step 2: Add the shared disclosure and paper styles**

Replace old tree-leaf and dossier rules with restrained styles based on the approved mockup:

```css
.writing-secondary-directory { display: grid; }
.writing-secondary-directory > button { min-height: 44px; padding: 10px 14px; border: 0; border-left: 3px solid transparent; background: transparent; color: var(--learning-muted); text-align: left; }
.writing-secondary-directory > button.active { border-left-color: var(--module-color, var(--learning-accent)); background: color-mix(in srgb, var(--module-color, var(--learning-accent)) 9%, transparent); color: var(--learning-ink); font-weight: 650; }

.writing-inline-disclosure { background: #fffef9; border-top: 4px solid var(--module-accent); box-shadow: 0 14px 38px rgba(66, 51, 34, .07); }
.writing-inline-disclosure > header { display: flex; align-items: end; justify-content: space-between; gap: 18px; padding: 28px 38px 18px; }
.writing-inline-disclosure > header h2 { margin: 0; font: 600 22px/1.35 "Songti SC", serif; }
.writing-inline-disclosure > header span { color: var(--learning-muted); font-size: 11px; }
.writing-inline-disclosure-item { margin: 0 38px; border-top: 1px solid var(--learning-border); }
.writing-inline-disclosure-item > button { display: grid; grid-template-columns: 32px minmax(0, 1fr) auto; gap: 12px; width: 100%; padding: 16px 2px; border: 0; background: transparent; color: var(--learning-ink); text-align: left; }
.writing-inline-disclosure-item > button strong, .writing-inline-disclosure-item > button i { color: var(--module-accent); }
.writing-inline-disclosure-body { margin: 0 0 10px; padding: 4px 20px 26px; border-left: 2px solid color-mix(in srgb, var(--module-accent) 65%, transparent); }

.writing-editorial-paper { padding: clamp(24px, 4vw, 44px); border: 0; background: transparent; box-shadow: none; }
.writing-editorial-paper p { max-width: 74ch; margin: 0 0 1.45em; font: 16px/2 "Songti SC", serif; }
.writing-editorial-paper h3 { margin: 2em 0 .65em; color: var(--module-accent); font: 600 19px/1.5 "Songti SC", serif; }
```

- [ ] **Step 3: Remove writing-only frame offsets that fight the shared frame**

Delete the current writing override that uses `300px + 900px`, a `70px` gap, and a narrower centered width. Keep only writing-specific top padding if visual review proves it necessary. The final desktop content start must be governed by `learning-page-frame.css` so framework and writing share the same baseline.

- [ ] **Step 4: Keep specialized modules useful but visually subordinate**

- Keep term before/after comparison because comparison is the learning task.
- Keep parallel paired lines because line relationship is the learning task.
- Keep sentence and quote attribution/context, but align borders, paper background, heading sizes, and spacing with the article surface.
- Remove decorative English labels or dashboard ornaments that do not explain content.
- Do not add a third level to metaphors or parallel phrases.

- [ ] **Step 5: Run source tests, lint, and typecheck**

Run:

```powershell
node --experimental-strip-types --test tests/learning-page-frame.test.mjs tests/route-scope.test.mjs
npm.cmd run lint
npm.cmd run typecheck
```

Expected: all commands PASS with no dossier selectors or nested third-level directory selectors remaining.

- [ ] **Step 6: Commit the visual simplification**

```powershell
git add app/shenlun/writing/writing-library-manual.tsx app/shenlun/writing/writing-library-manual.css app/learning-page-frame.css tests/learning-page-frame.test.mjs
git commit -m "Make long writing material feel readable instead of decorative" -m "Hotspots and cases now read as continuous articles, specialized modules keep only task-relevant structure, and writing follows the shared left-aligned frame geometry.`n`nConstraint: Module color may vary, but directory and reading hierarchy may not`nRejected: Flatten every module into identical prose | comparison and paired-language tasks need distinct teaching structures`nConfidence: high`nScope-risk: moderate`nDirective: Add decoration only when it explains a learning relationship`nTested: Focused tests, lint, and TypeScript typecheck"
```

---

### Task 6: Verify behavior, performance boundaries, accessibility, and visuals

**Files:**
- Modify if required: `app/learning-chapter-navigation.tsx`
- Modify if required: `app/learning-page-frame.css`
- Modify if required: `app/shenlun/writing/writing-library-manual.tsx`
- Modify if required: `app/shenlun/writing/writing-library-manual.css`
- Modify: `.omx/state/unified-core-learning-pages/ralph-progress.json` (ignored evidence)

- [ ] **Step 1: Run the full automated gate**

Run sequentially:

```powershell
npm.cmd run verify
npm.cmd run build:static
npm.cmd run build:static:pages
```

Expected:

- lint PASS
- typecheck PASS
- all Node tests PASS
- both static profiles export 36 routes

- [ ] **Step 2: Verify desktop behavior at 1440×900**

Open `/shenlun/writing#hotspots/development` and verify:

- first and second directory columns are visible together;
- no article titles appear in the directory;
- content begins farther left than the old 300px/70px layout;
- no article body is open initially;
- clicking an article shows a loading region, then expands only that article;
- clicking a second article closes the first;
- clicking the open article closes it;
- collapsing the whole directory widens and shifts the reading surface left;
- expanding the directory restores module, category, and open article.

Also compare `/shenlun/framework` at the same viewport and confirm the directory, reading start, whitespace rhythm, and typography hierarchy feel like one system.

- [ ] **Step 3: Verify responsive behavior at 900×900 and 390×844**

At each viewport verify:

- directory trigger is visible and does not collide with the top navigation;
- mobile drawer opens, Escape and backdrop close it, and focus returns to the trigger;
- first-level choice reveals the second-level choices without showing third-level titles;
- selecting a second-level item returns focus to readable content;
- inline disclosures fit without horizontal overflow;
- article line length and padding remain comfortable.

- [ ] **Step 4: Verify lazy loading and cache behavior**

With browser network logging:

1. Load the writing page and confirm long hotspot/case chunks are absent before search or article expansion.
2. Change a hotspot category and confirm only the lightweight title index is used.
3. Expand one article and confirm its category loader chunk appears.
4. Collapse and reopen the same article and confirm no duplicate content request.
5. Type a two-character search and confirm the existing full search index still loads on demand.

- [ ] **Step 5: Exercise restoration and race handling**

- Refresh with one hotspot article open and confirm the hash restores it.
- Open an old hotspot/category route and confirm it forwards to canonical hash state.
- Click different categories/articles rapidly and confirm stale responses never replace the latest choice.
- Trigger a loader failure in devtools, confirm the error stays inside the expanded row, retry, and confirm directory state remains intact.

- [ ] **Step 6: Record a visual verdict after every edit cycle**

Save screenshots for writing hotspot, writing case, framework comparison, collapsed desktop directory, and mobile drawer. After each visual adjustment, update:

```json
{
  "scope": "unified-core-learning-pages",
  "status": "pass",
  "score": 0,
  "viewports": ["1440x900", "900x900", "390x844"],
  "checks": {
    "directoryHierarchy": "pass",
    "readingAlignment": "pass",
    "articleClarity": "pass",
    "mobileDrawer": "pass",
    "thirdLevelDisclosure": "pass"
  },
  "remainingRisks": []
}
```

Replace `score: 0` with the evidence-based final score; do not mark pass while a listed check fails.

- [ ] **Step 7: Inspect the final diff and commit only verified fixes**

Run:

```powershell
git diff --check
git status --short
git log -6 --oneline
```

If visual verification required fixes, commit them:

```powershell
git add app/learning-chapter-navigation.tsx app/learning-page-frame.css app/shenlun/writing/writing-library-manual.tsx app/shenlun/writing/writing-library-manual.css tests
git commit -m "Remove the remaining friction from the unified study flow" -m "Final viewport and interaction checks tightened alignment, disclosure behavior, and drawer accessibility without changing route scope.`n`nConstraint: Verification covers desktop, tablet, and phone viewports`nConfidence: high`nScope-risk: narrow`nDirective: Preserve the tested directory and disclosure interaction contracts`nTested: Full verify, both static builds, browser interaction checks, lazy-loading inspection, and visual verdict"
```

The final working tree must be clean except for intentionally ignored `.omx` and `.superpowers` evidence. Do not push or deploy.
