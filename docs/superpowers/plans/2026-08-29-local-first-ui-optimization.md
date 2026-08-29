# Local-first UI Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有 Vinext 静态站改造成 Windows 本地优先、局域网可访问且继续兼容 GitHub Pages/EdgeOne 的站点，同时统一全站交互语义、移动端导航、音乐歌词行为和体积门禁。

**Architecture:** 保留 React 19、Next.js 16、Vinext/Vite 与静态内容体系，不增加项目依赖。以 Node 内置测试器锁定路由、数据、音频和静态产物契约；用共享清单和存储适配器建立未来数据库/后台替换边界；用一份末端 CSS 契约统一页面链接、展开按钮、筛选控件和普通内容。

**Tech Stack:** TypeScript 5.9、React 19、Next.js 16、Vinext/Vite、Node.js 22.13+ `node:test`、PowerShell、GitHub Actions、GitHub Pages、Tencent EdgeOne、Playwright CLI（仅用于验收）

---

## Execution map

执行顺序固定为：质量门禁 → 本地/LAN 启动 → 静态发布 → 数据边界 → UI 语义 → 移动端 → 音乐歌词 → 体积优化 → 全站验收。每个任务产生一个可独立验证的提交；后续任务只在前一任务测试通过后开始。

### Task 1: Establish the dependency-free quality gate

**Files:**
- Modify: `.nvmrc`
- Modify: `package.json`
- Create: `scripts/runtime-contract.mjs`
- Create: `tests/runtime-contract.test.mjs`

- [ ] **Step 1: Write the failing runtime test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { assertSupportedNode, parseNodeVersion } from '../scripts/runtime-contract.mjs';

test('accepts Node 22.13 and newer', () => {
  assert.deepEqual(parseNodeVersion('v22.13.0'), { major: 22, minor: 13, patch: 0 });
  assert.doesNotThrow(() => assertSupportedNode('v25.9.0'));
});

test('rejects an older runtime', () => {
  assert.throws(() => assertSupportedNode('v22.12.9'), /需要 Node\.js 22\.13\.0 或更高版本/);
});
```

- [ ] **Step 2: Run `node --test tests/runtime-contract.test.mjs`**

Expected: FAIL with `ERR_MODULE_NOT_FOUND`.

- [ ] **Step 3: Implement the runtime contract**

```js
export const MINIMUM_NODE = Object.freeze({ major: 22, minor: 13, patch: 0 });

export function parseNodeVersion(value) {
  const match = /^v?(\d+)\.(\d+)\.(\d+)$/.exec(value.trim());
  if (!match) throw new Error(`无法识别 Node.js 版本：${value}`);
  return { major: Number(match[1]), minor: Number(match[2]), patch: Number(match[3]) };
}

export function assertSupportedNode(value = process.version) {
  const current = parseNodeVersion(value);
  const score = ({ major, minor, patch }) => major * 1_000_000 + minor * 1_000 + patch;
  if (score(current) < score(MINIMUM_NODE)) {
    throw new Error(`需要 Node.js 22.13.0 或更高版本，当前为 ${value}。请先升级 Node.js。`);
  }
  return current;
}
```

Set `.nvmrc` to `22.13.0`. Add these scripts to `package.json` while preserving all dependency versions:

```json
"typecheck": "tsc --noEmit",
"test": "node --experimental-strip-types --test",
"verify": "npm run lint && npm run typecheck && npm test",
"dev:lan": "vinext dev --hostname 0.0.0.0 --port 3000"
```

- [ ] **Step 4: Run `npm.cmd test -- tests/runtime-contract.test.mjs` and `npm.cmd run typecheck`**

Expected: 2 tests PASS; typecheck exits 0.

- [ ] **Step 5: Commit**

```powershell
git add .nvmrc package.json scripts/runtime-contract.mjs tests/runtime-contract.test.mjs
git commit -m "Make local prerequisites fail clearly" -m "Constraint: Keep the existing dependency graph unchanged" -m "Confidence: high" -m "Scope-risk: narrow" -m "Tested: Runtime tests and typecheck"
```

### Task 2: Make the 36-route manifest authoritative

**Files:**
- Create: `app/site-routes.mjs`
- Create: `tests/site-routes.test.mjs`
- Modify: `scripts/build-github-pages.mjs:1-36`

- [ ] **Step 1: Write the route test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { caseCategoryKeys, hotspotCategoryKeys, staticRoutes } from '../app/site-routes.mjs';

test('exports 36 unique canonical routes', () => {
  assert.equal(staticRoutes.length, 36);
  assert.equal(new Set(staticRoutes).size, 36);
  assert.ok(staticRoutes.every((route) => route.startsWith('/') && route.endsWith('/')));
});

test('contains every writing category', () => {
  for (const key of hotspotCategoryKeys) assert.ok(staticRoutes.includes(`/shenlun/writing/hotspots/${key}/`));
  for (const key of caseCategoryKeys) assert.ok(staticRoutes.includes(`/shenlun/writing/cases/${key}/`));
});
```

- [ ] **Step 2: Run `npm.cmd test -- tests/site-routes.test.mjs`**

Expected: FAIL because `app/site-routes.mjs` is absent.

- [ ] **Step 3: Create the manifest**

```js
export const hotspotCategoryKeys = Object.freeze([
  'development', 'culture', 'people', 'government', 'grassroots', 'law', 'values', 'era',
]);
export const caseCategoryKeys = Object.freeze([
  'people', 'practice', 'city', 'reform', 'technology', 'livelihood',
  'law', 'negative', 'culture', 'rural', 'ecology', 'enterprise',
]);
export const staticRoutes = Object.freeze([
  '/', '/questions/', '/materials/', '/tools/', '/shenlun/', '/shenlun/framework/',
  '/shenlun/questions/', '/shenlun/writing/', '/shenlun/writing/hotspots/',
  ...hotspotCategoryKeys.map((key) => `/shenlun/writing/hotspots/${key}/`),
  '/shenlun/writing/cases/',
  ...caseCategoryKeys.map((key) => `/shenlun/writing/cases/${key}/`),
  '/shenlun/writing/metaphors/', '/shenlun/videos/', '/interview/methods/',
  '/interview/questions/', '/interview/expression/', '/interview/videos/',
]);
```

Import `staticRoutes` in `scripts/build-github-pages.mjs`, delete its three duplicate arrays, and iterate `staticRoutes` for export and route count reporting.

- [ ] **Step 4: Run `npm.cmd test`**

Expected: all runtime and route tests PASS.

- [ ] **Step 5: Commit**

```powershell
git add app/site-routes.mjs scripts/build-github-pages.mjs tests/site-routes.test.mjs
git commit -m "Prevent static routes from drifting" -m "Confidence: high" -m "Scope-risk: narrow" -m "Tested: Route manifest tests"
```

### Task 3: Add Windows one-click and LAN startup

**Files:**
- Create: `scripts/start-local.ps1`
- Create: `start-local.cmd`
- Create: `tests/local-launcher.test.mjs`
- Modify: `.gitignore`
- Modify: `scripts/runtime-contract.mjs`

- [ ] **Step 1: Write the launcher contract**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('binds to LAN without changing firewall rules', async () => {
  const source = await readFile(new URL('../scripts/start-local.ps1', import.meta.url), 'utf8');
  assert.match(source, /--hostname[',\s]+0\.0\.0\.0/);
  assert.match(source, /Get-NetIPAddress/);
  assert.doesNotMatch(source, /New-NetFirewallRule|netsh\s+advfirewall/i);
});
```

- [ ] **Step 2: Run `npm.cmd test -- tests/local-launcher.test.mjs`**

Expected: FAIL with `ENOENT`.

- [ ] **Step 3: Create the PowerShell launcher**

```powershell
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot
& node scripts/runtime-contract.mjs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
$npmCommand = (Get-Command npm.cmd -ErrorAction Stop).Source
if (-not (Test-Path 'node_modules\vinext\dist\cli.js')) {
  & $npmCommand ci
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
$port = 3000
while (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) { $port += 1 }
$lanAddress = Get-NetIPAddress -AddressFamily IPv4 -AddressState Preferred |
  Where-Object { $_.IPAddress -notmatch '^(127\.|169\.254\.)' } |
  Select-Object -First 1 -ExpandProperty IPAddress
Write-Host "本机访问：http://localhost:$port/"
if ($lanAddress) { Write-Host "同一局域网手机访问：http://${lanAddress}:$port/" }
Write-Host '脚本不会修改防火墙；无法访问时请检查网络设备互访设置。'
& $npmCommand run dev -- --hostname 0.0.0.0 --port $port --strictPort
```

Make `scripts/runtime-contract.mjs` call `assertSupportedNode()` when executed directly. Create `start-local.cmd`:

```bat
@echo off
setlocal
cd /d "%~dp0"
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\start-local.ps1"
if errorlevel 1 pause
```

Ignore `public/audio/xiang-an.mp3` and `output/playwright/`.

- [ ] **Step 4: Run the test and launch smoke**

Run `npm.cmd test -- tests/local-launcher.test.mjs`; expected PASS. Run `powershell.exe -NoProfile -File scripts/start-local.ps1`; expected printed localhost/LAN URLs and a running Vinext server. Load the home page, then stop with `Ctrl+C`.

- [ ] **Step 5: Commit**

```powershell
git add .gitignore start-local.cmd scripts/start-local.ps1 scripts/runtime-contract.mjs tests/local-launcher.test.mjs
git commit -m "Make local development a one-click workflow" -m "Constraint: Do not modify firewall rules" -m "Confidence: high" -m "Scope-risk: narrow" -m "Tested: Launcher contract and manual startup smoke"
```

### Task 4: Separate root and GitHub Pages build profiles

**Files:**
- Create: `scripts/static-site-utils.mjs`
- Create: `scripts/build-static-profile.mjs`
- Create: `scripts/validate-static-artifact.mjs`
- Create: `tests/static-site-utils.test.mjs`
- Modify: `scripts/build-github-pages.mjs`
- Modify: `package.json`
- Modify: `.github/workflows/deploy-pages.yml`
- Modify: `.github/workflows/deploy-edgeone.yml`
- Modify: `.github/workflows/deploy-preview-edgeone.yml`

- [ ] **Step 1: Write base-path tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeBasePath, rewriteHtml } from '../scripts/static-site-utils.mjs';

test('normalizes paths and rejects URLs', () => {
  assert.equal(normalizeBasePath(''), '');
  assert.equal(normalizeBasePath('/gongkao-teacher-website/'), '/gongkao-teacher-website');
  assert.throws(() => normalizeBasePath('https://example.com/x'), /必须是路径/);
});

test('prefixes root-relative links for Pages only', () => {
  const html = '<a href="/shenlun/"><img src="/og.jpg"></a>';
  assert.equal(rewriteHtml(html, ''), html);
  assert.equal(rewriteHtml(html, '/repo'), '<a href="/repo/shenlun/"><img src="/repo/og.jpg"></a>');
});
```

- [ ] **Step 2: Run the focused test**

Run `npm.cmd test -- tests/static-site-utils.test.mjs`; expected module-not-found FAIL.

- [ ] **Step 3: Implement pure path rewriting**

```js
export function normalizeBasePath(value) {
  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') return '';
  if (!trimmed.startsWith('/') || trimmed.includes('://')) throw new Error(`站点前缀必须是路径：${value}`);
  return trimmed.replace(/\/+$/, '');
}

export function rewriteHtml(html, basePathValue) {
  const basePath = normalizeBasePath(basePathValue);
  if (!basePath) return html;
  return html.replace(/\b(href|src)=(['"])\/(?!\/)([^'"]*)\2/g,
    (_match, attr, quote, path) => `${attr}=${quote}${basePath}/${path}${quote}`);
}
```

Extract the existing exporter rewrite logic into this module. `build-static-profile.mjs` must accept only `--profile root|pages`, run `npm run build`, run the exporter with `SITE_BASE_PATH=''` or `/${repositoryName}`, and then run the validator. Use `npm.cmd` on Windows and `npm` elsewhere.

`validate-static-artifact.mjs` must import `staticRoutes`, require every route `index.html`, root `404.html`, and `site/_next`; scan Pages HTML for unprefixed root-relative assets; print `Validated 36 routes for base path "/gongkao-teacher-website"` for Pages and `Validated 36 routes for base path ""` for root hosting, or exit 1 with exact file names.

Create `build-static-profile.mjs` with this complete orchestration:

```js
import { spawnSync } from 'node:child_process';
import { assertSupportedNode } from './runtime-contract.mjs';

assertSupportedNode();
const args = process.argv.slice(2);
const profileIndex = args.indexOf('--profile');
const profile = profileIndex >= 0 ? args[profileIndex + 1] : '';
if (profile !== 'root' && profile !== 'pages') throw new Error('必须指定 --profile root 或 --profile pages');
const repository = process.env.GITHUB_REPOSITORY ?? 'WJAnnie/gongkao-teacher-website';
const repositoryName = repository.split('/')[1];
const basePath = profile === 'pages' ? process.env.SITE_BASE_PATH ?? `/${repositoryName}` : '';
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const commands = [
  [npm, ['run', 'build'], {}],
  [process.execPath, ['scripts/build-github-pages.mjs'], { SITE_BASE_PATH: basePath }],
  [process.execPath, ['scripts/validate-static-artifact.mjs', '--base-path', basePath], {}],
];
for (const [command, commandArgs, extraEnvironment] of commands) {
  const result = spawnSync(command, commandArgs, { stdio: 'inherit', env: { ...process.env, ...extraEnvironment } });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
```

Set package scripts exactly:

```json
"build:static": "node scripts/build-static-profile.mjs --profile root",
"build:static:pages": "node scripts/build-static-profile.mjs --profile pages"
```

- [ ] **Step 4: Align all three workflows**

Use Node `22.13.0`, then `npm ci`, `npm run verify`, and the appropriate static profile. Set `SITE_BASE_PATH: /${{ github.event.repository.name }}` for Pages. Keep provider upload/deploy steps unchanged. Preview EdgeOne must use the same source verification as production.

- [ ] **Step 5: Run both build profiles**

Run `npm.cmd test -- tests/static-site-utils.test.mjs`, `npm.cmd run build:static`, and `npm.cmd run build:static:pages`. Expected: 2 tests PASS; both builds report 36 validated routes; root links remain root-relative; Pages links include `/gongkao-teacher-website/`.

- [ ] **Step 6: Commit**

```powershell
git add package.json scripts app/site-routes.mjs tests/static-site-utils.test.mjs .github/workflows
git commit -m "Keep local and hosted static builds equivalent" -m "Constraint: Pages and EdgeOne use different base paths" -m "Rejected: Provider-specific exporters | duplicated route logic" -m "Confidence: high" -m "Scope-risk: moderate" -m "Tested: Rewrite tests and both build profiles"
```

### Task 5: Introduce future-ready data boundaries

**Files:**
- Create: `app/data/practice-record-store.ts`
- Create: `app/data/content-catalog.ts`
- Create: `tests/data-boundaries.test.mjs`
- Modify: `app/study-hub.tsx:1-166`
- Modify: `app/material-reader.tsx`

- [ ] **Step 1: Test corrupt-record recovery and duplicate IDs**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { createPracticeRecordStore } from '../app/data/practice-record-store.ts';
import { assertUniqueContentIds } from '../app/data/content-catalog.ts';

test('backs up corrupt local records and returns an empty state', () => {
  const data = new Map([['gongkao-practice-records', '{bad']]);
  const storage = { getItem: (k) => data.get(k) ?? null, setItem: (k, v) => data.set(k, v), removeItem: (k) => data.delete(k) };
  assert.deepEqual(createPracticeRecordStore(storage, () => 1234).load(), []);
  assert.equal(data.get('gongkao-practice-records-corrupt-1234'), '{bad');
});

test('rejects duplicate content IDs', () => {
  assert.throws(() => assertUniqueContentIds([{ id: 'x' }, { id: 'x' }], '题库'), /重复 ID：x/);
});
```

- [ ] **Step 2: Run the test**

Run `npm.cmd test -- tests/data-boundaries.test.mjs`; expected missing-module FAIL.

- [ ] **Step 3: Implement the record adapter**

```ts
import type { Subject } from '../question-bank-data';

export interface PracticeRecord {
  id: number;
  date: string;
  subject: Subject;
  title: string;
  seconds: number;
  words: number;
  rating: string;
}
export interface StorageLike { getItem(key: string): string | null; setItem(key: string, value: string): void; removeItem(key: string): void; }
const KEY = 'gongkao-practice-records';

export function createPracticeRecordStore(storage: StorageLike, now: () => number = Date.now) {
  return {
    load(): PracticeRecord[] {
      const raw = storage.getItem(KEY);
      if (!raw) return [];
      try { const parsed: unknown = JSON.parse(raw); return Array.isArray(parsed) ? parsed as PracticeRecord[] : []; }
      catch { storage.setItem(`${KEY}-corrupt-${now()}`, raw); return []; }
    },
    save(records: readonly PracticeRecord[]) { storage.setItem(KEY, JSON.stringify(records)); },
  };
}
```

Create the content catalog with the existing export names:

```ts
import { materialNotes } from '../material-library-data';
import { questions } from '../question-bank-data';

export function assertUniqueContentIds<T extends { id: string }>(items: readonly T[], label: string): void {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) throw new Error(`${label}存在重复 ID：${item.id}`);
    seen.add(item.id);
  }
}

assertUniqueContentIds(questions, '题库');
assertUniqueContentIds(materialNotes, '资料库');
export const contentCatalog = Object.freeze({
  listQuestions: () => questions,
  listMaterials: () => materialNotes,
});
```

Refactor `StudyHub` to create the browser store in `useMemo`, load it in `useEffect`, replace direct `localStorage` reads/writes, and consume `contentCatalog.listQuestions()`. Refactor `MaterialReader` to consume `contentCatalog.listMaterials()`. Preserve key `gongkao-practice-records` and all existing record fields.

- [ ] **Step 4: Run `npm.cmd test -- tests/data-boundaries.test.mjs` and `npm.cmd run typecheck`**

Expected: 2 tests PASS; typecheck exits 0.

- [ ] **Step 5: Commit**

```powershell
git add app/data app/study-hub.tsx app/material-reader.tsx tests/data-boundaries.test.mjs
git commit -m "Create replaceable boundaries around study data" -m "Constraint: This phase adds no database or admin service" -m "Confidence: high" -m "Scope-risk: moderate" -m "Tested: Recovery, ID uniqueness, and typecheck"
```

### Task 6: Centralize learning routes and real-link markup

**Files:**
- Create: `app/learning-routes.ts`
- Create: `app/learning-entry-link.tsx`
- Create: `tests/learning-routes.test.mjs`
- Modify: `app/learning-nav.tsx`
- Modify: `app/subject-gateway.tsx`
- Modify: `app/home-learning-repeat.tsx`
- Modify: `app/shenlun-shell.tsx`
- Modify: `app/interview/interview-shell.tsx`
- Modify: `app/shenlun/writing/writing-hero-menu.tsx`

- [ ] **Step 1: Test the shared registry**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { interviewRoutes, shenlunRoutes } from '../app/learning-routes.ts';
import { staticRoutes } from '../app/site-routes.mjs';

test('learning links are unique and statically exported', () => {
  const routes = [...shenlunRoutes, ...interviewRoutes];
  assert.equal(new Set(routes.map((item) => item.key)).size, routes.length);
  for (const route of routes) assert.ok(staticRoutes.includes(route.href), route.href);
});
```

- [ ] **Step 2: Run the test**

Run `npm.cmd test -- tests/learning-routes.test.mjs`; expected missing-module FAIL.

- [ ] **Step 3: Create the registry and semantic link**

```ts
export type LearningTone = 'blue' | 'orange' | 'acid' | 'red';
export type LearningRoute = Readonly<{ key: string; group: 'shenlun' | 'interview'; label: string; href: string; tone: LearningTone }>;
export const shenlunRoutes = [
  { key: 'shenlun-framework', group: 'shenlun', label: '方法框架', href: '/shenlun/framework/', tone: 'blue' },
  { key: 'shenlun-questions', group: 'shenlun', label: '真题精练', href: '/shenlun/questions/', tone: 'orange' },
  { key: 'shenlun-writing', group: 'shenlun', label: '写作积累', href: '/shenlun/writing/', tone: 'acid' },
  { key: 'shenlun-videos', group: 'shenlun', label: '课程现场', href: '/shenlun/videos/', tone: 'red' },
] as const satisfies readonly LearningRoute[];
export const interviewRoutes = [
  { key: 'interview-methods', group: 'interview', label: '题型方法', href: '/interview/methods/', tone: 'blue' },
  { key: 'interview-questions', group: 'interview', label: '真题实战', href: '/interview/questions/', tone: 'orange' },
  { key: 'interview-expression', group: 'interview', label: '表达训练', href: '/interview/expression/', tone: 'acid' },
  { key: 'interview-videos', group: 'interview', label: '课程现场', href: '/interview/videos/', tone: 'red' },
] as const satisfies readonly LearningRoute[];
export type LearningRouteKey = typeof shenlunRoutes[number]['key'] | typeof interviewRoutes[number]['key'];
```

```tsx
import type { ReactNode } from 'react';
import type { LearningTone } from './learning-routes';

export function LearningEntryLink({ href, tone, className = '', children, current = false }: {
  href: string;
  tone: LearningTone;
  className?: string;
  children: ReactNode;
  current?: boolean;
}) {
  return <a className={`learning-entry-link tone-${tone} ${className}`.trim()} href={href} aria-current={current ? 'page' : undefined}>
    <span className="learning-entry-link__content">{children}</span>
    <span className="learning-entry-link__arrow" aria-hidden="true">↗</span>
  </a>;
}
```

Replace duplicated route arrays in the five navigation/shell components. Replace visible `进入` and `查看内容 →` pills with `LearningEntryLink`. Keep disclosure controls as `<button type="button" aria-expanded>` without `↗`; preserve current `aria-current` attributes.

- [ ] **Step 4: Run tests, lint, and typecheck**

Run `npm.cmd test -- tests/learning-routes.test.mjs`, `npm.cmd run lint`, and `npm.cmd run typecheck`. Expected: all exit 0.

- [ ] **Step 5: Commit**

```powershell
git add app/learning-routes.ts app/learning-entry-link.tsx app/learning-nav.tsx app/subject-gateway.tsx app/home-learning-repeat.tsx app/shenlun-shell.tsx app/interview/interview-shell.tsx app/shenlun/writing/writing-hero-menu.tsx tests/learning-routes.test.mjs
git commit -m "Make navigation meaning consistent across the site" -m "Constraint: Preserve the editorial visual identity" -m "Confidence: high" -m "Scope-risk: moderate" -m "Tested: Route registry, lint, and typecheck"
```

### Task 7: Consolidate the four interaction semantics

**Files:**
- Modify: `app/interaction-semantics.css`
- Modify: `app/layout.tsx:49-53`
- Modify: `app/study-hub.css`
- Modify: `app/mobile-refinement.css`
- Delete: `app/clickable-menu-affordance.css`
- Delete: `app/entry-badge-unification.css`
- Create: `tests/interaction-semantics.test.mjs`

- [ ] **Step 1: Test the style contract**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const semantics = await readFile(new URL('../app/interaction-semantics.css', import.meta.url), 'utf8');
const study = await readFile(new URL('../app/study-hub.css', import.meta.url), 'utf8');
const layout = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8');

test('real links own rail, arrow, focus, and active states', () => {
  for (const selector of ['.learning-entry-link::before', '.learning-entry-link__arrow', '.learning-entry-link:focus-visible', '.learning-entry-link:active']) assert.match(semantics, new RegExp(selector.replace('.', '\\.')));
});
test('content cards do not lift and obsolete overrides are gone', () => {
  assert.doesNotMatch(study, /\.(question-item|material-card):hover\s*\{[^}]*transform\s*:/s);
  assert.doesNotMatch(layout, /clickable-menu-affordance|entry-badge-unification/);
});
```

- [ ] **Step 2: Run the test**

Run `npm.cmd test -- tests/interaction-semantics.test.mjs`; expected FAIL on legacy imports and card hover.

- [ ] **Step 3: Add the final CSS contract**

```css
.learning-entry-link { --entry-accent: var(--blue); position: relative; display: flex; align-items: center; justify-content: space-between; min-height: 44px; gap: 14px; padding: 12px 14px 12px 17px; border: 1px solid rgba(37,37,31,.13); background: rgba(255,255,255,.22); color: var(--ink); text-decoration: none; }
.learning-entry-link::before { content: ""; position: absolute; inset: 8px auto 8px 0; width: 3px; background: var(--entry-accent); }
.learning-entry-link.tone-orange { --entry-accent: var(--orange); }
.learning-entry-link.tone-acid { --entry-accent: #929f57; }
.learning-entry-link.tone-red { --entry-accent: #a84b3f; }
.learning-entry-link__arrow { flex: 0 0 auto; color: var(--entry-accent); }
.learning-entry-link:hover, .learning-entry-link:focus-visible { background: color-mix(in srgb, var(--entry-accent) 9%, var(--paper)); border-color: color-mix(in srgb, var(--entry-accent) 32%, transparent); }
.learning-entry-link:focus-visible { outline: 2px solid color-mix(in srgb, var(--entry-accent) 55%, transparent); outline-offset: 2px; }
.learning-entry-link:active { background: color-mix(in srgb, var(--entry-accent) 15%, var(--paper)); }
.learning-disclosure-trigger[aria-expanded="true"] { background: rgba(37,37,31,.06); }
.filter-control[aria-pressed="true"], .filter-control.is-selected { box-shadow: inset 3px 0 0 currentColor; font-weight: 700; }
.content-card, .question-item, .material-card { cursor: default; }
.content-card:hover, .question-item:hover, .material-card:hover { transform: none; box-shadow: none; }
@media (prefers-reduced-motion: reduce) { .learning-entry-link, .learning-entry-link__arrow { transition: none; } }
```

Remove the two global imports and delete their files after moving any unique selector into `interaction-semantics.css`. Remove `.question-item`/`.material-card` lift effects. Remove stale `details/summary` mobile selectors; the live nav uses `div + button`. Apply `.filter-control` only to actual tabs/filters and `.content-card` only to noninteractive articles.

- [ ] **Step 4: Run tests, lint, and typecheck**

Expected: interaction tests PASS; lint/typecheck exit 0.

- [ ] **Step 5: Commit**

```powershell
git add app/interaction-semantics.css app/layout.tsx app/study-hub.css app/mobile-refinement.css tests/interaction-semantics.test.mjs
git add -u app/clickable-menu-affordance.css app/entry-badge-unification.css
git commit -m "Let visual treatment match interaction meaning" -m "Rejected: Add a design-system dependency | a local contract is sufficient" -m "Confidence: high" -m "Scope-risk: moderate" -m "Tested: Interaction contract, lint, and typecheck"
```

### Task 8: Make mobile navigation deterministic

**Files:**
- Modify: `app/learning-nav.tsx`
- Modify: `app/learning-nav.css`
- Modify: `app/mobile-home-learning-nav.css`
- Create: `tests/mobile-nav-contract.test.mjs`

- [ ] **Step 1: Test accessibility and sizing**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const component = await readFile(new URL('../app/learning-nav.tsx', import.meta.url), 'utf8');
const css = await readFile(new URL('../app/mobile-home-learning-nav.css', import.meta.url), 'utf8');
test('menu relationships and Escape close are explicit', () => {
  assert.match(component, /aria-controls=/); assert.match(component, /event\.key === 'Escape'/); assert.match(component, /setMobileOpen\(null\)/);
});
test('touch targets and dropdown viewport bounds are explicit', () => {
  assert.match(css, /min-height:\s*44px/); assert.match(css, /max-width:\s*calc\(100vw\s*-\s*24px\)/);
});
```

- [ ] **Step 2: Run the test**

Run `npm.cmd test -- tests/mobile-nav-contract.test.mjs`; expected FAIL.

- [ ] **Step 3: Implement deterministic behavior**

Give each menu and trigger this exact relationship, close on link click, and handle Escape:

```tsx
<button aria-controls={`learning-menu-${group.key}`} aria-expanded={open} />
<div id={`learning-menu-${group.key}`} />
```

```tsx
onKeyDown={(event) => {
  if (event.key === 'Escape') {
    setMobileOpen(null);
    (event.currentTarget.querySelector('[aria-expanded="true"]') as HTMLButtonElement | null)?.focus();
  }
}}
```

Set trigger/link `min-height: 44px`. Set dropdown `width: 220px; max-width: calc(100vw - 24px); max-height: min(70vh, 420px); overflow-y: auto;`. At 390 px align the first menu left and second right. Home initializes closed; learning pages may initialize the active group.

- [ ] **Step 4: Run tests and browser smoke**

Run the focused test, then use Playwright CLI at 360/390/430/768 px. Open both groups, press Escape, verify all links are reachable and `document.documentElement.scrollWidth <= innerWidth`. Expected: no blank menu, clipping, or horizontal overflow.

- [ ] **Step 5: Commit**

```powershell
git add app/learning-nav.tsx app/learning-nav.css app/mobile-home-learning-nav.css tests/mobile-nav-contract.test.mjs
git commit -m "Keep mobile learning navigation usable" -m "Confidence: high" -m "Scope-risk: narrow" -m "Tested: Nav contract and four-width browser smoke"
```

### Task 9: Make home audio same-origin and recoverable

**Files:**
- Create: `app/home-song-data.ts`
- Create: `scripts/vendor-home-audio.mjs`
- Create: `tests/home-song.test.mjs`
- Modify: `app/home-song-player.tsx`
- Modify: `scripts/start-local.ps1`
- Modify: `.github/workflows/deploy-pages.yml`
- Modify: `.github/workflows/deploy-edgeone.yml`
- Modify: `.github/workflows/deploy-preview-edgeone.yml`
- Delete: `app/home-song-autoplay.tsx`

- [ ] **Step 1: Test lyrics and preload policy**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { HOME_SONG, getAudioPreload, getLyricIndex } from '../app/home-song-data.ts';
test('lyrics are strictly ordered inside duration', () => {
  for (let i = 1; i < HOME_SONG.lyrics.length; i += 1) assert.ok(HOME_SONG.lyrics[i].at > HOME_SONG.lyrics[i - 1].at);
  assert.ok(HOME_SONG.lyrics.at(-1).at < HOME_SONG.fallbackDuration);
});
test('preload respects save-data', () => { assert.equal(getAudioPreload(false), 'auto'); assert.equal(getAudioPreload(true), 'metadata'); });
test('lyric index derives from audio time', () => { assert.equal(getLyricIndex(0), -1); assert.equal(getLyricIndex(HOME_SONG.lyrics[1].at), 1); });
```

- [ ] **Step 2: Run the test**

Expected: missing-module FAIL.

- [ ] **Step 3: Extract immutable song data**

Move the existing complete timestamp/text array unchanged into `home-song-data.ts`; set `src: '/audio/xiang-an.mp3'` and `fallbackDuration: 234.072`. Export:

```ts
export function getAudioPreload(saveData: boolean): 'auto' | 'metadata' { return saveData ? 'metadata' : 'auto'; }
export function getLyricIndex(currentTime: number): number {
  let active = -1;
  for (let index = 0; index < HOME_SONG.lyrics.length; index += 1) { if (HOME_SONG.lyrics[index].at > currentTime) break; active = index; }
  return active;
}
```

- [ ] **Step 4: Remove autoplay and add retry**

Delete mount/global pointer/global keyboard `.play()` calls. Only the visible play button may call `audio.play()`. Read `navigator.connection?.saveData`, set `preload={getAudioPreload(saveData)}`, and use real `audio.currentTime` for timeupdate/seeked/visibilitychange/ended. On error, stop lyric advancement and render:

```tsx
<div className="home-song-error" role="status">
  <span>音频暂时无法加载。</span>
  <button type="button" onClick={() => { setAudioError(false); audioRef.current?.load(); }}>重新加载</button>
</div>
```

Delete unused `home-song-autoplay.tsx` only after `rg "home-song-autoplay" app` returns no imports.

- [ ] **Step 5: Vendor the asset consistently**

Create the complete vendor script below. Call it before Vinext in the local launcher and before build in all three workflows.

```js
import { mkdir, rename, stat, unlink, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const source = 'https://cdn1.suno.ai/9699b383-feba-4acb-80af-38c15fe7dfd8.mp3';
const target = resolve('public/audio/xiang-an.mp3');
const temporary = `${target}.download`;
let currentSize = 0;
try { currentSize = (await stat(target)).size; } catch {}
if (currentSize < 1_000_000) {
  const response = await fetch(source);
  if (!response.ok) throw new Error(`音频下载失败：HTTP ${response.status}`);
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.startsWith('audio/')) throw new Error(`音频类型无效：${contentType}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength < 1_000_000) throw new Error(`音频文件异常：${bytes.byteLength} bytes`);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(temporary, bytes);
  try { await unlink(target); } catch {}
  await rename(temporary, target);
  currentSize = bytes.byteLength;
}
console.log(`Audio ready: public/audio/xiang-an.mp3 (${currentSize} bytes)`);
```

- [ ] **Step 6: Run tests and browser lifecycle smoke**

Expected: 3 tests PASS; lint/typecheck pass. Verify no playback on load; play/pause/seek/background/end track real time; failure shows retry; Save-Data yields `metadata`.

- [ ] **Step 7: Commit**

```powershell
git add app/home-song-data.ts app/home-song-player.tsx scripts/vendor-home-audio.mjs scripts/start-local.ps1 tests/home-song.test.mjs .github/workflows
git add -u app/home-song-autoplay.tsx
git commit -m "Make the home song predictable on every host" -m "Constraint: Preload is allowed but autoplay is not" -m "Confidence: high" -m "Scope-risk: moderate" -m "Tested: Song tests and browser playback lifecycle"
```

### Task 10: Enforce image and artifact budgets

**Files:**
- Create: `scripts/optimize-og-image.ps1`
- Create: `scripts/report-static-size.mjs`
- Create: `tests/static-size.test.mjs`
- Create: `public/og.jpg`
- Delete: `public/og.png`
- Modify: `app/layout.tsx:55-72`
- Modify: `scripts/build-static-profile.mjs`

- [ ] **Step 1: Test size aggregation**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { summarizeEntries } from '../scripts/report-static-size.mjs';
test('aggregates raw and gzip bytes', () => {
  const result = summarizeEntries([{ path: 'a.js', bytes: 200, gzipBytes: 90 }, { path: 'og.jpg', bytes: 300, gzipBytes: 280 }]);
  assert.equal(result.totalBytes, 500); assert.equal(result.gzipBytes, 370); assert.equal(result.byExtension['.js'].bytes, 200);
});
```

- [ ] **Step 2: Run the test**

Expected: missing-module FAIL.

- [ ] **Step 3: Implement the report**

Implement `summarizeEntries` exactly as follows, then add a CLI wrapper in the same file that recursively enumerates `site/`, calculates raw and `gzipSync` bytes, lists the 20 largest files, writes `site/size-report.json`, and exits 1 above 8,500,000 gzip-estimated bytes. For every exported route, parse its HTML `src`/`href` references and add a `routes[route]` entry containing referenced JS, CSS, image, and audio bytes; mark assets referenced by multiple routes with `shared: true`. Guard the wrapper with a direct-execution check so imports only expose the pure function. Invoke the report last in both build profiles.

```js
import { extname } from 'node:path';

export function summarizeEntries(entries) {
  const byExtension = {};
  let totalBytes = 0;
  let gzipBytes = 0;
  for (const entry of entries) {
    const extension = extname(entry.path) || '[none]';
    const bucket = byExtension[extension] ?? { files: 0, bytes: 0, gzipBytes: 0 };
    bucket.files += 1;
    bucket.bytes += entry.bytes;
    bucket.gzipBytes += entry.gzipBytes;
    byExtension[extension] = bucket;
    totalBytes += entry.bytes;
    gzipBytes += entry.gzipBytes;
  }
  return { totalBytes, gzipBytes, byExtension };
}
```

- [ ] **Step 4: Optimize the share image without dependencies**

```powershell
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$source = Join-Path $root 'public\og.png'; $target = Join-Path $root 'public\og.jpg'
$image = [System.Drawing.Image]::FromFile($source)
try {
  if ($image.Width -ne 1200 -or $image.Height -ne 630) { throw '分享图必须保持 1200×630。' }
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
  $parameters = New-Object System.Drawing.Imaging.EncoderParameters 1
  $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]88)
  $image.Save($target, $codec, $parameters)
} finally { $image.Dispose() }
if ((Get-Item $target).Length -gt 500000) { throw '优化后的分享图超过 500 KB。' }
```

Run the script, visually compare at 100%, update metadata to `/og.jpg`, and delete PNG.

- [ ] **Step 5: Run tests and both static profiles**

Expected: size test PASS; both builds pass; `og.jpg` remains 1200×630 and below 500 KB; gzip estimate stays at or below 8.5 MB.

- [ ] **Step 6: Commit**

```powershell
git add scripts/optimize-og-image.ps1 scripts/report-static-size.mjs scripts/build-static-profile.mjs tests/static-size.test.mjs app/layout.tsx public/og.jpg
git add -u public/og.png
git commit -m "Keep the static site within an explicit budget" -m "Constraint: Add no compression dependency" -m "Confidence: high" -m "Scope-risk: narrow" -m "Tested: Size test, image dimensions, and both build profiles"
```

### Task 11: Route-scope specialist styles and data

**Files:**
- Modify: `app/layout.tsx:2-48`
- Modify: `app/shenlun/framework/page.tsx`
- Modify: `app/shenlun/writing/page.tsx`
- Modify: `app/shenlun/writing/hotspots/page.tsx`
- Modify: `app/shenlun/writing/cases/page.tsx`
- Modify: `app/shenlun/writing/metaphors/page.tsx`
- Modify: `app/interview/interview-shell.tsx`
- Create: `tests/route-scope.test.mjs`

- [ ] **Step 1: Write the route-scope test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const layout = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8');
test('root layout excludes framework and writing-only CSS', () => {
  assert.doesNotMatch(layout, /shenlun\/framework\/framework-/); assert.doesNotMatch(layout, /shenlun\/writing\/writing-/);
});
test('root layout keeps shared contracts', () => { assert.match(layout, /interaction-semantics\.css/); assert.match(layout, /learning-nav\.css/); });
```

- [ ] **Step 2: Run the test**

Expected: FAIL because root imports all specialist CSS.

- [ ] **Step 3: Move imports to route boundaries**

Keep only reset, variables, home, shared learning navigation, shared review, and interaction semantics in root. Move framework CSS to its page, writing landing/category CSS to their route entry files, and interview-only CSS to `interview-shell.tsx`. Before moving, run these exact consumer searches and confirm all results are inside the intended boundary; preserve relative import order:

```powershell
rg -n "framework-(expression|manual|types|abilities|voice|deep|tips|layout)" app
rg -n "writing-(hotspot|case|metaphor|hero|tips|section|static)" app
rg -n "interview-(site|card|route|hero|footer|tone)" app
```

- [ ] **Step 4: Build and inspect isolation**

Run route-scope test and root static build. Expected: PASS. Inspect `size-report.json`; home chunks contain no hotspot article, case, or metaphor corpus. Verify the metaphor library stays flat and searchable.

- [ ] **Step 5: Commit**

```powershell
git add app/layout.tsx app/shenlun app/interview/interview-shell.tsx tests/route-scope.test.mjs
git commit -m "Load specialist styles only where they are used" -m "Directive: Preserve stylesheet order within moved groups" -m "Confidence: medium" -m "Scope-risk: moderate" -m "Tested: Route-scope test and static build"
```

### Task 12: Complete full-site acceptance and documentation

**Files:**
- Modify: `README.md`
- Create: `docs/verification/2026-08-29-local-first-ui-acceptance.md`
- Modify: only files tied to observed acceptance failures

- [ ] **Step 1: Correct operating documentation**

Replace the stale 14-route claim with the 36-route grouped manifest. Document `start-local.cmd`, `npm.cmd run verify`, `npm.cmd run build:static`, and `npm.cmd run build:static:pages`. State that this phase keeps browser-local records while `app/data/*` is the future database/admin seam. Explain that local audio is generated and ignored.

- [ ] **Step 2: Run the full automated gate**

```powershell
npm.cmd run verify
npm.cmd run build:static
npm.cmd run build:static:pages
```

Expected: lint/typecheck exit 0; every Node test passes; both profiles validate 36 routes; both reports are within budget.

- [ ] **Step 3: Run the five-width browser matrix**

Use Playwright CLI at 360, 390, 430, 768, and 1440 px for `/`, `/questions/`, `/materials/`, `/tools/`, all four 申论 page types, one hotspot, one case, metaphors, and all four interview routes. Record overflow, nav reachability, keyboard focus, touch targets, current-page state, missing resources, and app-owned console errors. On home also record audio load/play/pause/seek/background/end/failure/retry. On writing verify eight entries, category back paths, and flat metaphor search.

- [ ] **Step 4: Fix only observed matrix failures**

For each failure record route, width, symptom, file, before/after evidence, and rerun result in the acceptance document. Re-run the failed cell and then the full automated gate. Preserve the approved paper/editorial identity.

- [ ] **Step 5: Verify Pages-prefixed assets locally**

Serve `site/` and open the Pages-prefixed home, one hotspot, one case, and one interview route. Expected: scripts, CSS, `og.jpg`, and `audio/xiang-an.mp3` return 200; navigation remains under `/gongkao-teacher-website/`; zero app-owned console errors.

- [ ] **Step 6: Commit acceptance evidence**

```powershell
git add README.md docs/verification/2026-08-29-local-first-ui-acceptance.md app
git commit -m "Document and prove the local-first release path" -m "Confidence: high" -m "Scope-risk: moderate" -m "Tested: Full gate, two build profiles, five-width matrix" -m "Not-tested: Production credentials and external provider rollout"
```

## Final completion gate

- [ ] `npm.cmd run verify` exits 0.
- [ ] Both static profiles validate all 36 routes.
- [ ] `site/size-report.json` is at or below 8,500,000 gzip-estimated bytes.
- [ ] `public/og.jpg` is 1200×630 and below 500,000 bytes.
- [ ] The launcher prints desktop and same-LAN phone URLs without modifying firewall rules.
- [ ] 360/390/430/768/1440 evidence has no unresolved overflow, blank menu, misleading affordance, or app-owned console error.
- [ ] Audio is user-triggered, lyrics follow `currentTime`, and retry works.
- [ ] GitHub Pages and EdgeOne changes are committed but not pushed or deployed without separate authorization.
