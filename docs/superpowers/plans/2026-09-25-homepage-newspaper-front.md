# 首页「报刊头版」重设计 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把首页 `/` 改成一张《答卷之外》报纸头版：第一屏直接列出申论、面试八个学习模块，并按北京时间每天轮换三篇热点时评和三则规范用词。

**Architecture:** 新建 `app/home-front/`：纯函数（日期、挑选、链接）+ 服务端数据索引 + 几个小组件。`app/page.tsx` 改为异步服务端组件，负责组合这些组件。热点和规范用词在构建时抽成轻量索引，以 props 传给客户端组件；客户端在 `useEffect` 里按访客当天日期重新挑选，结果不同才替换。旧首页专用的组件、样式和图片最后统一清理，并用测试锁住。

**Tech Stack:** Next.js App Router（vinext / Vite）、React 19、TypeScript、纯 CSS。测试命令 `node --experimental-strip-types --test`，静态导出后部署到 GitHub Pages 子路径 `/gongkao-teacher-website`。

**Spec:** `docs/superpowers/specs/2026-09-25-homepage-newspaper-front-design.md`

## Global Constraints

- 只改首页 `/`，不改任何学习页、写作积累页或其他路由的视觉与行为。
- 不新增第三方依赖。
- 保留：品牌名「答卷之外」、标语「把公考题做懂，把话说清」、「云帆老师」称呼、宋体标题、纸张底色、歌曲「向岸」及其同步歌词。
- 学生可见文案使用「云帆老师」，不出现装饰性英文标签（`tests/route-scope.test.mjs` 已有约束）。
- 颜色：`--paper: #f4f0e7`、`--ink: #25251f`，唯一强调色朱红 `#a84b3f`；首页不出现四个模块主题色。
- 字体：标题、栏目名、模块名用 `"Songti SC", "SimSun", Georgia, serif`；任何文字不小于 12px。
- 去掉渐变、光斑、背景网格、环形轨道、描边标题、滚动进度条、吸顶滚动叙事；只保留链接悬停和聚焦状态。
- 手机断点沿用站内现有值：`@media (max-width: 760px)`。
- 日期一律按北京时间（UTC+8，无夏令时）。
- 提交信息用约定式格式（`feat:` / `refactor:` / `test:` / `chore:`），末尾带 `Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>`。

## 与规格的三处偏差（均为落实规格意图）

1. **链接前缀**：规格写「与 `LearningEntryLink` 写法一致」。核实发现正式站的子路径前缀是构建后由 `scripts/static-site-utils.mjs` 的 `rewriteHtml` 改写 HTML 时补上的，浏览器里按日期重新生成的链接拿不到前缀。因此热点与规范用词链接显式带上 `process.env.SITE_BASE_PATH`（Vite 已在 `vite.config.ts` 用 `define` 注入，`home-song-data.ts` 同样这么做）；`rewriteHtml` 遇到已带前缀的路径会跳过，不会重复加。八个模块入口仍是服务端渲染的普通根路径链接，与 `LearningEntryLink` 相同。
2. **文件划分**：在规格列出的文件之外，另加 `front-links.ts`（链接与前缀）、`use-front-today.ts`（客户端日期修正）、`front-modules.tsx`（模块栏）；模块说明文案放在 `app/learning-route-notes.ts`。测试按单元拆成多个 `tests/home-front-*.test.mjs`，不塞进一个文件。
3. **保留的共享代码**：`SubjectGateway`（`app/study-hub.tsx` 在 `/questions/`、`/materials/` 仍在用）、`subject-gateway.css`、`hero-content-index.css`（学习页 `shenlun-hero*` 规则）、`mobile-home-learning-nav.css` 中 `.learning-topnav-mobile` 规则都保留，只删其中的旧首页选择器。

## Review Focus

1. **正式站子路径下，浏览器轮换出的链接漏前缀或加两次前缀。** 期望：链接永远是 `/gongkao-teacher-website/shenlun/writing/#hotspots/<分类>/<slug>`。→ Task 3 测试 `client-built links carry the base path and are not prefixed twice after build`；Task 9 在 `site/index.html` 里检查。
2. **北京时间零点与 UTC 零点之间（北京 00:00–08:00）的访客。** 期望：看到北京「今天」那一期，不是前一天。→ Task 1 测试 `beijing date turns over at 16:00 UTC, not at UTC midnight`，以及跨月、跨年用例。
3. **静态 HTML 是构建当天的内容，访客在别的日子打开。** 期望：水合时不报不一致；加载后换成当天内容。→ Task 6 测试 `today hook defers the swap to after hydration and only when the date differs`。
4. **某类数据不足三条，或列表为空。** 期望：不报错，能挑几条挑几条；热点为空时显示「热点时评整理中。」。→ Task 2 测试 `falls back to repeated categories…`、`short or empty lists…`；Task 6 测试断言 `front-empty`。
5. **服务端热点正文被打进首页客户端包。** 期望：客户端只拿到 `{ slug, title, categoryKey, categoryLabel }`。→ Task 3 测试 `hotspot index covers every registered article with only light fields`；Task 6 断言 `front-daily.tsx` 对 `./front-data` 只有 `import type`。

---

## 文件结构

| 文件 | 动作 | 职责 |
|------|------|------|
| `app/home-front/front-date.ts` | 新建 | 北京时间日期、中文月日、日期种子 |
| `app/home-front/front-picks.ts` | 新建 | 按种子挑 N 个不重复条目，优先不同分类 |
| `app/home-front/front-links.ts` | 新建 | 子路径前缀与三种站内链接 |
| `app/home-front/front-data.ts` | 新建 | 服务端：热点与规范用词轻量索引 |
| `app/learning-route-notes.ts` | 新建 | 八个模块的说明小字（首页与 `SubjectGateway` 共用） |
| `app/home-front/use-front-today.ts` | 新建 | 客户端：水合后换成访客当天日期 |
| `app/home-front/front-masthead.tsx` | 新建 | 报头与日期行 |
| `app/home-front/front-modules.tsx` | 新建 | 申论版 / 面试版模块栏 |
| `app/home-front/front-daily.tsx` | 新建 | 今日热点栏、规范用词栏 |
| `app/home-front/front-song.tsx` | 新建 | 副刊栏，包裹内嵌播放器 |
| `app/home-front/home-front.css` | 新建 | 首页全部版面样式 |
| `app/page.tsx` | 重写 | 组合首页 |
| `app/home-song-player.tsx` | 修改 | 改为内嵌模式 |
| `app/home-song-player.css` | 重写 | 内嵌播放器样式 |
| `app/subject-gateway.tsx` | 修改 | 说明文案改读 `learningRouteNotes` |
| `app/layout.tsx` | 修改 | 增删样式引用 |
| `app/learning-page-guide-polish.css` | 修改 | 接收 `question-type-switcher` 规则 |
| `app/globals.css`、`app/mobile-refinement.css`、`app/interaction-semantics.css`、`app/mobile-home-learning-nav.css`、`app/subject-gateway.css` | 修改 | 删除旧首页选择器 |
| `app/home-about.css`、`app/hero-review-orbit.css`、`app/home-learning-repeat.css`、`app/home-song-placement.css`、`app/home-refresh.css`、`app/motion-layer.tsx`、`app/home-learning-repeat.tsx`、`public/about-study-art.svg` | 删除 | 旧首页专用 |
| `tests/home-front-date.test.mjs`、`tests/home-front-picks.test.mjs`、`tests/home-front-data.test.mjs`、`tests/learning-route-notes.test.mjs`、`tests/home-front-components.test.mjs`、`tests/home-front-page.test.mjs`、`tests/home-front-legacy.test.mjs` | 新建 | 见各任务 |
| `tests/home-song.test.mjs` | 修改 | 增加内嵌模式断言 |

---

### Task 1: 北京时间日期与种子

**Files:**
- Create: `app/home-front/front-date.ts`
- Test: `tests/home-front-date.test.mjs`

**Interfaces:**
- Consumes: 无
- Produces:
  - `type FrontDate = Readonly<{ key: string; month: number; day: number }>`（`key` 形如 `'2026-09-25'`）
  - `getBeijingDate(now: Date): FrontDate`
  - `toChineseNumber(value: number): string`（1–31，越界抛 `RangeError`）
  - `formatMonthIssue(date: FrontDate): string` → `'九月号'`
  - `formatChineseDay(date: FrontDate): string` → `'九月二十五日'`
  - `hashSeed(text: string): number`（无符号 32 位整数）

- [ ] **Step 1: 写失败测试**

`tests/home-front-date.test.mjs`：

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatChineseDay,
  formatMonthIssue,
  getBeijingDate,
  hashSeed,
  toChineseNumber,
} from '../app/home-front/front-date.ts';

test('beijing date turns over at 16:00 UTC, not at UTC midnight', () => {
  assert.equal(getBeijingDate(new Date('2026-09-24T15:59:59Z')).key, '2026-09-24');
  assert.equal(getBeijingDate(new Date('2026-09-24T16:00:00Z')).key, '2026-09-25');
  assert.equal(getBeijingDate(new Date('2026-09-25T02:00:00Z')).key, '2026-09-25');
});

test('beijing date crosses month and year boundaries', () => {
  assert.deepEqual(getBeijingDate(new Date('2026-12-31T16:30:00Z')), { key: '2027-01-01', month: 1, day: 1 });
  assert.deepEqual(getBeijingDate(new Date('2026-09-30T16:00:00Z')), { key: '2026-10-01', month: 10, day: 1 });
});

test('month and day render as chinese numerals', () => {
  assert.deepEqual(
    [1, 9, 10, 11, 12, 20, 25, 30, 31].map((value) => toChineseNumber(value)),
    ['一', '九', '十', '十一', '十二', '二十', '二十五', '三十', '三十一'],
  );
  assert.throws(() => toChineseNumber(0), RangeError);
  assert.throws(() => toChineseNumber(32), RangeError);
  const date = { key: '2026-09-25', month: 9, day: 25 };
  assert.equal(formatMonthIssue(date), '九月号');
  assert.equal(formatChineseDay(date), '九月二十五日');
  assert.equal(formatMonthIssue({ key: '2026-12-01', month: 12, day: 1 }), '十二月号');
});

test('seed is a stable unsigned 32-bit integer per date key', () => {
  const seed = hashSeed('2026-09-25');
  assert.equal(seed, hashSeed('2026-09-25'));
  assert.notEqual(seed, hashSeed('2026-09-26'));
  assert.ok(Number.isInteger(seed) && seed >= 0 && seed <= 0xffffffff);
});
```

- [ ] **Step 2: 运行测试，确认失败**

Run: `node --experimental-strip-types --test tests/home-front-date.test.mjs`
Expected: FAIL，报 `Cannot find module …/app/home-front/front-date.ts`

- [ ] **Step 3: 写实现**

`app/home-front/front-date.ts`：

```ts
// 首页日期一律按北京时间（UTC+8，无夏令时）计算，保证所有访客同一天看到同一期。
const BEIJING_OFFSET_MS = 8 * 60 * 60 * 1000;
const CHINESE_DIGITS = '〇一二三四五六七八九';

export type FrontDate = Readonly<{ key: string; month: number; day: number }>;

export function getBeijingDate(now: Date): FrontDate {
  const shifted = new Date(now.getTime() + BEIJING_OFFSET_MS);
  const year = shifted.getUTCFullYear();
  const month = shifted.getUTCMonth() + 1;
  const day = shifted.getUTCDate();
  const key = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return { key, month, day };
}

export function toChineseNumber(value: number): string {
  if (!Number.isInteger(value) || value < 1 || value > 31) {
    throw new RangeError(`不支持的月日数字：${value}`);
  }
  if (value < 10) return CHINESE_DIGITS.charAt(value);
  const tens = Math.floor(value / 10);
  const ones = value % 10;
  const head = tens === 1 ? '十' : `${CHINESE_DIGITS.charAt(tens)}十`;
  return ones === 0 ? head : `${head}${CHINESE_DIGITS.charAt(ones)}`;
}

export function formatMonthIssue(date: FrontDate): string {
  return `${toChineseNumber(date.month)}月号`;
}

export function formatChineseDay(date: FrontDate): string {
  return `${toChineseNumber(date.month)}月${toChineseNumber(date.day)}日`;
}

// FNV-1a 32 位哈希：把日期字符串变成稳定的整数种子。
export function hashSeed(text: string): number {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}
```

- [ ] **Step 4: 运行测试，确认通过**

Run: `node --experimental-strip-types --test tests/home-front-date.test.mjs`
Expected: PASS（4 项）

- [ ] **Step 5: 提交**

```bash
git add app/home-front/front-date.ts tests/home-front-date.test.mjs
git commit -m "feat: 首页按北京时间生成日期与种子"
```

---

### Task 2: 每日挑选

**Files:**
- Create: `app/home-front/front-picks.ts`
- Test: `tests/home-front-picks.test.mjs`

**Interfaces:**
- Consumes: 测试里用 Task 1 的 `hashSeed`
- Produces:
  - `type Categorized = Readonly<{ categoryKey: string }>`
  - `createRandom(seed: number): () => number`（mulberry32，返回 `[0, 1)`）
  - `pickDaily<T extends Categorized>(items: readonly T[], seed: number, count: number): T[]`

- [ ] **Step 1: 写失败测试**

`tests/home-front-picks.test.mjs`：

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { pickDaily } from '../app/home-front/front-picks.ts';
import { hashSeed } from '../app/home-front/front-date.ts';

const CATEGORY_KEYS = ['economy', 'innovation', 'livelihood', 'ecology', 'culture', 'civility', 'cadre', 'service', 'grassroots', 'enforcement', 'rural'];
const items = CATEGORY_KEYS.flatMap((categoryKey) => [1, 2, 3].map((n) => ({ id: `${categoryKey}-${n}`, categoryKey })));
const ids = (list) => list.map((item) => item.id);

test('same seed returns the same three items', () => {
  const first = pickDaily(items, 42, 3);
  assert.equal(first.length, 3);
  assert.deepEqual(ids(first), ids(pickDaily(items, 42, 3)));
});

test('consecutive days rotate the picks', () => {
  const combos = new Set();
  for (let day = 1; day <= 10; day += 1) {
    const seed = hashSeed(`2026-10-${String(day).padStart(2, '0')}`);
    combos.add(ids(pickDaily(items, seed, 3)).join('|'));
  }
  assert.ok(combos.size >= 8, `10 天只出现了 ${combos.size} 种组合`);
});

test('picks are distinct and come from distinct categories when possible', () => {
  for (let seed = 0; seed < 200; seed += 1) {
    const picked = pickDaily(items, seed, 3);
    assert.equal(new Set(ids(picked)).size, 3);
    assert.equal(new Set(picked.map((item) => item.categoryKey)).size, 3);
  }
});

test('falls back to repeated categories when fewer than three exist', () => {
  const twoCategories = items.filter((item) => item.categoryKey === 'economy' || item.categoryKey === 'rural');
  for (let seed = 0; seed < 50; seed += 1) {
    const picked = pickDaily(twoCategories, seed, 3);
    assert.equal(picked.length, 3);
    assert.equal(new Set(ids(picked)).size, 3);
    assert.equal(new Set(picked.map((item) => item.categoryKey)).size, 2);
  }
});

test('short or empty lists return what exists without throwing', () => {
  assert.deepEqual(pickDaily([], 7, 3), []);
  assert.deepEqual(ids(pickDaily(items.slice(0, 2), 7, 3)).sort(), ids(items.slice(0, 2)).sort());
});

test('does not mutate the input list', () => {
  const snapshot = items.map((item) => ({ ...item }));
  pickDaily(items, 99, 3);
  assert.deepEqual(items, snapshot);
});
```

- [ ] **Step 2: 运行测试，确认失败**

Run: `node --experimental-strip-types --test tests/home-front-picks.test.mjs`
Expected: FAIL，报 `Cannot find module …/front-picks.ts`

- [ ] **Step 3: 写实现**

`app/home-front/front-picks.ts`：

```ts
// 每日挑选：同一种子、同一份列表，结果永远相同；优先让挑出的条目来自不同分类。
export type Categorized = Readonly<{ categoryKey: string }>;

// mulberry32：足够均匀、可复现的小型伪随机数生成器。
export function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffledIndexes(length: number, random: () => number): number[] {
  const order = Array.from({ length }, (_, index) => index);
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [order[index], order[swap]] = [order[swap], order[index]];
  }
  return order;
}

export function pickDaily<T extends Categorized>(items: readonly T[], seed: number, count: number): T[] {
  const order = shuffledIndexes(items.length, createRandom(seed));
  const picked: number[] = [];
  const categories = new Set<string>();

  for (const index of order) {
    if (picked.length === count) break;
    const { categoryKey } = items[index];
    if (categories.has(categoryKey)) continue;
    categories.add(categoryKey);
    picked.push(index);
  }
  // 分类不够时，再按同一顺序补足，允许分类重复。
  for (const index of order) {
    if (picked.length === count) break;
    if (!picked.includes(index)) picked.push(index);
  }
  return picked.map((index) => items[index]);
}
```

- [ ] **Step 4: 运行测试，确认通过**

Run: `node --experimental-strip-types --test tests/home-front-picks.test.mjs`
Expected: PASS（6 项）

- [ ] **Step 5: 提交**

```bash
git add app/home-front/front-picks.ts tests/home-front-picks.test.mjs
git commit -m "feat: 首页每日挑选热点与用词的确定性算法"
```

---

### Task 3: 链接前缀与服务端数据索引

**Files:**
- Create: `app/home-front/front-links.ts`
- Create: `app/home-front/front-data.ts`
- Test: `tests/home-front-data.test.mjs`

**Interfaces:**
- Consumes:
  - `loadHotspotCategory(key: HotspotCategoryKey): Promise<HotspotCategory>`（`app/shenlun/writing/writing-hotspot-loader.ts`；它会做 refine / audit，并在某类少于 20 或多于 30 篇时抛错）
  - `hotspotTaxonomy`（`writing-hotspot-taxonomy.ts`，11 类，`{ key, label, … }`）
  - `termLibrary: TermCategory[]`（`writing-term-data.ts`，`{ key, label, desc, entries: { before, after }[] }`）
- Produces:
  - `normalizeBasePath(value: string): string`
  - `FRONT_BASE_PATH: string`
  - `hotspotHref(basePath: string, categoryKey: string, slug: string): string`
  - `hotspotIndexHref(basePath: string): string`
  - `termsHref(basePath: string, categoryKey?: string): string`
  - `type FrontHotspot = Readonly<{ slug: string; title: string; categoryKey: string; categoryLabel: string }>`
  - `type FrontTerm = Readonly<{ before: string; after: string; categoryKey: string }>`
  - `loadFrontHotspots(): Promise<FrontHotspot[]>`
  - `buildFrontTerms(): FrontTerm[]`

核实过的数据：目前热点 220 篇、规范用词 550 条；写作积累页的 hash 路由支持 `#hotspots/<分类>/<slug>`、`#terms/<分类>` 和 `#terms`（`writing-library-manual.tsx` 第 253–263 行）。

- [ ] **Step 1: 写失败测试**

`tests/home-front-data.test.mjs`：

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { loadAllHotspotArticles } from '../app/shenlun/writing/writing-hotspot-registry.ts';
import { hotspotTaxonomy } from '../app/shenlun/writing/writing-hotspot-taxonomy.ts';
import { hotspotIndex } from '../app/shenlun/writing/writing-library-index.ts';
import { termLibrary } from '../app/shenlun/writing/writing-term-data.ts';
import { buildFrontTerms, loadFrontHotspots } from '../app/home-front/front-data.ts';
import {
  FRONT_BASE_PATH,
  hotspotHref,
  hotspotIndexHref,
  normalizeBasePath,
  termsHref,
} from '../app/home-front/front-links.ts';
import { rewriteHtml } from '../scripts/static-site-utils.mjs';

const [hotspots, allArticles] = await Promise.all([loadFrontHotspots(), loadAllHotspotArticles()]);

test('hotspot index covers every registered article with only light fields', () => {
  assert.equal(hotspots.length, allArticles.length);
  assert.equal(new Set(hotspots.map((item) => item.slug)).size, hotspots.length);
  const labels = new Map(hotspotTaxonomy.map((item) => [item.key, item.label]));
  for (const item of hotspots) {
    assert.deepEqual(Object.keys(item).sort(), ['categoryKey', 'categoryLabel', 'slug', 'title']);
    assert.ok(item.slug && item.title, `条目缺少 slug 或标题：${JSON.stringify(item)}`);
    assert.equal(item.categoryLabel, labels.get(item.categoryKey));
  }
});

test('hotspot category keys match the writing page hash routes', () => {
  const routeKeys = new Set(hotspotIndex.map((item) => item.key));
  for (const item of hotspots) assert.ok(routeKeys.has(item.categoryKey), `写作页不认识分类 ${item.categoryKey}`);
});

test('term index flattens every entry with its category', () => {
  const total = termLibrary.reduce((sum, category) => sum + category.entries.length, 0);
  const terms = buildFrontTerms();
  assert.equal(terms.length, total);
  for (const term of terms) {
    assert.deepEqual(Object.keys(term).sort(), ['after', 'before', 'categoryKey']);
    assert.ok(term.before && term.after);
  }
  assert.deepEqual([...new Set(terms.map((term) => term.categoryKey))], termLibrary.map((category) => category.key));
});

test('base path normalizes like the audio source', () => {
  assert.equal(normalizeBasePath(''), '');
  assert.equal(normalizeBasePath('/'), '');
  assert.equal(normalizeBasePath('/gongkao-teacher-website/'), '/gongkao-teacher-website');
  assert.equal(normalizeBasePath('gongkao-teacher-website'), '/gongkao-teacher-website');
  assert.equal(FRONT_BASE_PATH, normalizeBasePath(process.env.SITE_BASE_PATH ?? ''));
});

test('client-built links carry the base path and are not prefixed twice after build', () => {
  const base = '/gongkao-teacher-website';
  const hot = hotspotHref(base, 'cadre', 'cadre-sink');
  assert.equal(hot, '/gongkao-teacher-website/shenlun/writing/#hotspots/cadre/cadre-sink');
  assert.equal(hotspotIndexHref(base), '/gongkao-teacher-website/shenlun/writing/hotspots/');
  assert.equal(termsHref(base, 'economy'), '/gongkao-teacher-website/shenlun/writing/#terms/economy');
  assert.equal(termsHref(base), '/gongkao-teacher-website/shenlun/writing/#terms');
  assert.equal(hotspotHref('', 'cadre', 'x'), '/shenlun/writing/#hotspots/cadre/x');
  const html = `<a href="${hot}">标题</a>`;
  assert.equal(rewriteHtml(html, base), html);
});
```

- [ ] **Step 2: 运行测试，确认失败**

Run: `node --experimental-strip-types --test tests/home-front-data.test.mjs`
Expected: FAIL，报 `Cannot find module …/front-data.ts`

- [ ] **Step 3: 写 `front-links.ts`**

```ts
// 首页热点与规范用词的链接在浏览器里按日期重新生成，拿不到构建后补的子路径前缀，
// 因此这里显式带上 SITE_BASE_PATH（Vite 在 vite.config.ts 里用 define 注入）。
// 构建后的 rewriteHtml 会跳过已带前缀的路径，不会重复加。
export function normalizeBasePath(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, '');
  if (!trimmed) return '';
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

export const FRONT_BASE_PATH = normalizeBasePath(process.env.SITE_BASE_PATH ?? '');

export function hotspotHref(basePath: string, categoryKey: string, slug: string): string {
  return `${basePath}/shenlun/writing/#hotspots/${categoryKey}/${slug}`;
}

export function hotspotIndexHref(basePath: string): string {
  return `${basePath}/shenlun/writing/hotspots/`;
}

export function termsHref(basePath: string, categoryKey?: string): string {
  return categoryKey
    ? `${basePath}/shenlun/writing/#terms/${categoryKey}`
    : `${basePath}/shenlun/writing/#terms`;
}
```

- [ ] **Step 4: 写 `front-data.ts`**

```ts
// 仅在服务端（构建时）调用：把热点时评和规范用词压成首页需要的轻量索引，
// 正文、导语、标签等字段不进入首页的客户端包。
import { loadHotspotCategory } from '../shenlun/writing/writing-hotspot-loader.ts';
import { hotspotTaxonomy } from '../shenlun/writing/writing-hotspot-taxonomy.ts';
import { termLibrary } from '../shenlun/writing/writing-term-data.ts';

export type FrontHotspot = Readonly<{ slug: string; title: string; categoryKey: string; categoryLabel: string }>;
export type FrontTerm = Readonly<{ before: string; after: string; categoryKey: string }>;

export async function loadFrontHotspots(): Promise<FrontHotspot[]> {
  // 与文章页走同一个加载器，标题与原文一致。
  const categories = await Promise.all(hotspotTaxonomy.map((item) => loadHotspotCategory(item.key)));
  return categories.flatMap((category) =>
    category.articles.map((article) => ({
      slug: article.slug,
      title: article.title,
      categoryKey: category.key,
      categoryLabel: category.label,
    })),
  );
}

export function buildFrontTerms(): FrontTerm[] {
  return termLibrary.flatMap((category) =>
    category.entries.map((entry) => ({ before: entry.before, after: entry.after, categoryKey: category.key })),
  );
}
```

- [ ] **Step 5: 运行测试，确认通过**

Run: `node --experimental-strip-types --test tests/home-front-data.test.mjs`
Expected: PASS（5 项）

- [ ] **Step 6: 类型检查**

Run: `npm run typecheck`
Expected: 无错误退出

- [ ] **Step 7: 提交**

```bash
git add app/home-front/front-links.ts app/home-front/front-data.ts tests/home-front-data.test.mjs
git commit -m "feat: 首页热点与用词轻量索引及带子路径的链接"
```

---

### Task 4: 模块说明文案集中到一处

**Files:**
- Create: `app/learning-route-notes.ts`
- Modify: `app/subject-gateway.tsx:9-28`
- Test: `tests/learning-route-notes.test.mjs`

**Interfaces:**
- Consumes: `LearningRouteKey`、`shenlunRoutes`、`interviewRoutes`（`app/learning-routes.ts`）
- Produces: `learningRouteNotes: Readonly<Record<LearningRouteKey, string>>`

- [ ] **Step 1: 写失败测试**

`tests/learning-route-notes.test.mjs`：

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { learningRouteNotes } from '../app/learning-route-notes.ts';
import { interviewRoutes, shenlunRoutes } from '../app/learning-routes.ts';

const gateway = await readFile(new URL('../app/subject-gateway.tsx', import.meta.url), 'utf8');

test('every learning route has exactly one note', () => {
  const keys = [...shenlunRoutes, ...interviewRoutes].map((route) => route.key).sort();
  assert.deepEqual(Object.keys(learningRouteNotes).sort(), keys);
  for (const key of keys) assert.match(learningRouteNotes[key], /^\S+( · \S+)+$/);
  assert.equal(learningRouteNotes['shenlun-writing'], '热点 · 案例 · 用词 · 作文');
  assert.equal(learningRouteNotes['interview-questions'], '国考 · 省考 · 回忆真题');
});

test('subject gateway reads notes instead of keeping its own copy', () => {
  assert.match(gateway, /import \{ learningRouteNotes \} from '\.\/learning-route-notes';/);
  assert.match(gateway, /desc: learningRouteNotes\[route\.key\]/);
  assert.doesNotMatch(gateway, /desc: '/);
});
```

- [ ] **Step 2: 运行测试，确认失败**

Run: `node --experimental-strip-types --test tests/learning-route-notes.test.mjs`
Expected: FAIL，报 `Cannot find module …/learning-route-notes.ts`

- [ ] **Step 3: 新建 `app/learning-route-notes.ts`**

```ts
// 八个学习模块的一句话说明：首页头版与 SubjectGateway 共用，只在这里维护。
import type { LearningRouteKey } from './learning-routes';

export const learningRouteNotes = {
  'shenlun-framework': '题型 · 能力 · 规则 · 技巧',
  'shenlun-questions': '国考 · 联考 · 地方真题',
  'shenlun-writing': '热点 · 案例 · 用词 · 作文',
  'shenlun-videos': '精讲 · 实录 · 日常 · 分享',
  'interview-methods': '分析 · 组织 · 应急 · 模拟',
  'interview-questions': '国考 · 省考 · 回忆真题',
  'interview-expression': '观点 · 结构 · 例证 · 表达',
  'interview-videos': '精讲 · 实录 · 日常 · 分享',
} as const satisfies Record<LearningRouteKey, string>;
```

- [ ] **Step 4: 修改 `app/subject-gateway.tsx`**

在 import 区加一行：

```ts
import { learningRouteNotes } from './learning-route-notes';
```

把第 9–28 行（`type ModulePresentation` 到 `interviewModules`）替换为：

```ts
type ModulePresentation = {
  no: string;
  en: string;
  classTone: 'framework' | 'questions' | 'writing' | 'videos';
};

const modulePresentation = {
  'shenlun-framework': { no: '01', en: '方法框架', classTone: 'framework' },
  'shenlun-questions': { no: '02', en: '真题精练', classTone: 'questions' },
  'shenlun-writing': { no: '03', en: '写作积累', classTone: 'writing' },
  'shenlun-videos': { no: '04', en: '课程现场', classTone: 'videos' },
  'interview-methods': { no: '01', en: '题型方法', classTone: 'framework' },
  'interview-questions': { no: '02', en: '真题实战', classTone: 'questions' },
  'interview-expression': { no: '03', en: '表达训练', classTone: 'writing' },
  'interview-videos': { no: '04', en: '课程现场', classTone: 'videos' },
} as const satisfies Record<LearningRouteKey, ModulePresentation>;

const shenlunModules = shenlunRoutes.map((route) => ({ route, ...modulePresentation[route.key], desc: learningRouteNotes[route.key] }));
const interviewModules = interviewRoutes.map((route) => ({ route, ...modulePresentation[route.key], desc: learningRouteNotes[route.key] }));
```

第 85 行 `<p>{item.desc}</p>` 不用改。

- [ ] **Step 5: 运行测试与类型检查**

Run: `node --experimental-strip-types --test tests/learning-route-notes.test.mjs tests/interaction-semantics.test.mjs && npm run typecheck`
Expected: 全部 PASS，类型检查无错误

- [ ] **Step 6: 提交**

```bash
git add app/learning-route-notes.ts app/subject-gateway.tsx tests/learning-route-notes.test.mjs
git commit -m "refactor: 模块说明文案集中到 learning-route-notes"
```

---

### Task 5: 「向岸」播放器改为内嵌模式

**Files:**
- Modify: `app/home-song-player.tsx`（整文件替换）
- Rewrite: `app/home-song-player.css`
- Delete: `app/home-song-placement.css`
- Modify: `app/layout.tsx`（删掉 `import './home-song-placement.css';`）
- Test: `tests/home-song.test.mjs`

**Interfaces:**
- Consumes: `HOME_SONG`、`getAudioPreload`、`getLyricIndex`（`app/home-song-data.ts`，不改）
- Produces: `HomeSongPlayer()`，无 props，渲染 `<div className="home-song-player…" role="group" aria-label="向岸音乐播放器">`，可以放在任意容器里。

必须继续满足的现有断言（`tests/home-song.test.mjs`）：`import { HOME_SONG, getAudioPreload, getLyricIndex }`、`navigator…connection?.saveData`、`ref={sourceLinkRef}`、`href={HOME_SONG.src}`、`audio.src = source`、`preload={getAudioPreload(saveData)}`、全文件只有一个 `.play()`、`onClick={togglePlay}`、`if (audioRef.current?.error) setAudioError(true)`、`className="home-song-error" role="status"`、`const reloadAudio = () =>`、`ensureAudioSource(audio);\s*audio.load()`、`onClick={reloadAudio}`。

- [ ] **Step 1: 在 `tests/home-song.test.mjs` 里加失败测试**

把第 7 行的 `Promise.all([` 解构改为多读一个 CSS 文件：

```js
const [player, playerCss, vendorScript, audioAsset, localLauncher, pagesWorkflow, edgeWorkflow, previewWorkflow, lyricsWorkflow] = await Promise.all([
  readFile(new URL('../app/home-song-player.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../app/home-song-player.css', import.meta.url), 'utf8'),
```

（其余 `readFile` 行保持原样。）在文件末尾追加：

```js
test('player sits inline in the page instead of floating over content', () => {
  assert.match(player, /role="group" aria-label="向岸音乐播放器"/);
  assert.doesNotMatch(player, /sessionStorage|playerVisible|getElementById\('about'\)|closePlayer|reopenPlayer/);
  assert.doesNotMatch(player, /home-song-(close|reopen)/);
  assert.doesNotMatch(playerCss, /position:\s*fixed/);
  assert.doesNotMatch(playerCss, /home-song-(close|reopen)|gradient/);
});

test('idle player previews the chorus instead of a placeholder', () => {
  assert.match(player, /PREVIEW_INDEX = Math\.max\(0, HOME_SONG\.lyrics\.findIndex/);
  assert.doesNotMatch(player, /前奏 · 向岸/);
});
```

- [ ] **Step 2: 运行测试，确认失败**

Run: `node --experimental-strip-types --test tests/home-song.test.mjs`
Expected: 新增两项 FAIL（找到 `sessionStorage`、`position: fixed`，缺 `role="group"`），原有各项 PASS

- [ ] **Step 3: 替换 `app/home-song-player.tsx` 全文**

```tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { HOME_SONG, getAudioPreload, getLyricIndex } from './home-song-data';

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return '0:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

type NavigatorWithSaveData = Navigator & {
  connection?: { saveData?: boolean };
};

// 未播放时展示副歌两行，作为「副刊」栏的歌词节选。
const PREVIEW_INDEX = Math.max(0, HOME_SONG.lyrics.findIndex((line) => line.text === '一道题，一页纸，一段时光'));

export function HomeSongPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const sourceLinkRef = useRef<HTMLAnchorElement>(null);
  const lyricsPanelRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number>(HOME_SONG.fallbackDuration);
  const [lyricsOpen, setLyricsOpen] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [saveData, setSaveData] = useState(true);

  const syncFromAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(Number.isFinite(audio.currentTime) ? audio.currentTime : 0);
    if (Number.isFinite(audio.duration) && audio.duration > 0) setDuration(audio.duration);
  };

  const ensureAudioSource = (audio: HTMLAudioElement) => {
    if (audio.getAttribute('src')) return;
    const source = sourceLinkRef.current?.href;
    if (!source) throw new Error('Home audio source is unavailable.');
    audio.src = source;
    audio.load();
  };

  // 保守地从 metadata 开始；客户端确认未开启 Save-Data 后才允许预载完整音频。
  useEffect(() => {
    let active = true;
    const connectionSaveData = Boolean((navigator as NavigatorWithSaveData).connection?.saveData);
    queueMicrotask(() => {
      if (!active) return;
      setSaveData(connectionSaveData);
      if (audioRef.current?.error) setAudioError(true);
    });

    return () => { active = false; };
  }, []);

  // 播放时用 rAF 提供更顺滑的进度显示；歌词时间仍直接读取 audio.currentTime。
  useEffect(() => {
    if (!playing || audioError) return;
    let frame = 0;
    const tick = () => {
      syncFromAudio();
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [audioError, playing]);

  // 浏览器后台标签页会节流 rAF；回到页面时立即重新取真实音频时间。
  useEffect(() => {
    const syncOnVisibility = () => {
      if (!document.hidden) syncFromAudio();
    };
    document.addEventListener('visibilitychange', syncOnVisibility);
    return () => document.removeEventListener('visibilitychange', syncOnVisibility);
  }, []);

  const activeIndex = useMemo(() => getLyricIndex(currentTime), [currentTime]);

  useEffect(() => {
    if (!lyricsOpen || activeIndex < 0) return;
    const panel = lyricsPanelRef.current;
    const row = panel?.querySelector<HTMLElement>(`[data-lyric-index="${activeIndex}"]`);
    if (!panel || !row) return;
    const target = row.offsetTop - panel.clientHeight / 2 + row.clientHeight / 2;
    panel.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
  }, [activeIndex, lyricsOpen]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        ensureAudioSource(audio);
        await audio.play();
        setPlaying(true);
        setAudioError(false);
        syncFromAudio();
      } catch {
        setPlaying(false);
        setAudioError(true);
      }
    } else {
      audio.pause();
      setPlaying(false);
      syncFromAudio();
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    syncFromAudio();
  };

  const reloadAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setAudioError(false);
    try {
      ensureAudioSource(audio);
      audio.load();
    } catch {
      setAudioError(true);
    }
  };

  const lyricIndex = activeIndex >= 0 ? activeIndex : PREVIEW_INDEX;
  const currentLyric = HOME_SONG.lyrics[lyricIndex].text;
  const nextLyric = lyricIndex + 1 < HOME_SONG.lyrics.length ? HOME_SONG.lyrics[lyricIndex + 1].text : '';
  const safeDuration = duration || HOME_SONG.fallbackDuration;

  return (
    <div
      className={`home-song-player${playing ? ' is-playing' : ''}${lyricsOpen ? ' lyrics-open' : ''}`}
      role="group"
      aria-label="向岸音乐播放器"
    >
      <a ref={sourceLinkRef} href={HOME_SONG.src} hidden aria-hidden="true" tabIndex={-1}>向岸音频</a>
      <audio
        ref={audioRef}
        preload={getAudioPreload(saveData)}
        onLoadedMetadata={(event) => {
          const audio = event.currentTarget;
          setDuration(audio.duration || HOME_SONG.fallbackDuration);
          setCurrentTime(audio.currentTime || 0);
        }}
        onDurationChange={syncFromAudio}
        onTimeUpdate={syncFromAudio}
        onSeeking={syncFromAudio}
        onSeeked={syncFromAudio}
        onPlay={() => {
          setPlaying(true);
          setAudioError(false);
          syncFromAudio();
        }}
        onPause={() => {
          setPlaying(false);
          syncFromAudio();
        }}
        onEnded={() => {
          setPlaying(false);
          syncFromAudio();
        }}
        onError={() => {
          setPlaying(false);
          setAudioError(true);
          syncFromAudio();
        }}
      />

      <div className="home-song-live" aria-live="polite">
        {audioError ? (
          <div className="home-song-error" role="status">
            <span>音频暂时无法加载。</span>
            <button type="button" onClick={reloadAudio}>重新加载</button>
          </div>
        ) : (
          <>
            <p>{currentLyric}</p>
            {nextLyric && <span>{nextLyric}</span>}
          </>
        )}
      </div>

      <div className="home-song-controls">
        <button className="home-song-play" type="button" onClick={togglePlay} aria-label={playing ? '暂停' : '播放'}>
          {playing ? 'Ⅱ' : '▶'}
        </button>
        <label className="home-song-progress">
          <span className="sr-only">歌曲进度</span>
          <input
            type="range"
            min="0"
            max={safeDuration}
            step="0.05"
            value={Math.min(currentTime, safeDuration)}
            onChange={(event) => seek(Number(event.target.value))}
          />
        </label>
        <span className="home-song-time">{formatTime(currentTime)} / {formatTime(safeDuration)}</span>
        <button
          className="home-song-lyrics-toggle"
          type="button"
          aria-expanded={lyricsOpen}
          onClick={() => setLyricsOpen((value) => !value)}
        >
          {lyricsOpen ? '收起歌词' : '歌词'}
        </button>
      </div>

      {lyricsOpen && (
        <div className="home-song-lyrics-list" ref={lyricsPanelRef} aria-label="向岸完整歌词">
          {HOME_SONG.lyrics.map((line, index) => (
            <p
              key={`${line.at}-${line.text}`}
              data-lyric-index={index}
              className={`${index === activeIndex ? 'active' : ''}${index % 4 === 0 ? ' group-start' : ''}`}
              onClick={() => seek(line.at)}
            >
              <span>{formatTime(line.at)}</span>{line.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: 替换 `app/home-song-player.css` 全文**

```css
/* 向岸播放器：首页「副刊」栏内嵌，不固定、不悬浮，只用墨色与朱红。 */
.home-song-player {
  --song-ink: #25251f;
  --song-muted: #6b675c;
  --song-seal: #a84b3f;
  --song-dot: #bdb6a5;
  display: grid;
  gap: 10px;
  color: var(--song-ink);
}

.home-song-live { min-height: 60px; }
.home-song-live p,
.home-song-live span {
  display: block;
  margin: 0;
  font: 15px/2 "Songti SC", "SimSun", Georgia, serif;
}
.home-song-live span { color: var(--song-muted); }
.home-song-player.is-playing .home-song-live p { color: var(--song-seal); }

.home-song-error {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--song-muted);
}

.home-song-controls {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 10px;
}

.home-song-play {
  width: 34px;
  height: 34px;
  border: 1px solid var(--song-ink);
  border-radius: 50%;
  background: transparent;
  color: var(--song-ink);
  font-size: 12px;
  cursor: pointer;
}

.home-song-error button,
.home-song-lyrics-toggle {
  min-height: 30px;
  padding: 0 10px;
  border: 1px solid rgba(37, 37, 31, .35);
  border-radius: 999px;
  background: transparent;
  color: var(--song-ink);
  font-size: 12px;
  cursor: pointer;
}

.home-song-play:hover,
.home-song-lyrics-toggle:hover,
.home-song-error button:hover {
  border-color: var(--song-seal);
  color: var(--song-seal);
}

.home-song-play:focus-visible,
.home-song-lyrics-toggle:focus-visible,
.home-song-error button:focus-visible,
.home-song-progress input:focus-visible {
  outline: 2px solid var(--song-seal);
  outline-offset: 2px;
}

.home-song-progress { display: block; min-width: 0; }
.home-song-progress input {
  width: 100%;
  height: 18px;
  margin: 0;
  accent-color: var(--song-seal);
  background: transparent;
  cursor: pointer;
}

.home-song-time {
  font-size: 12px;
  color: var(--song-muted);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.home-song-lyrics-list {
  max-height: 220px;
  overflow-y: auto;
  padding: 8px 0;
  border-top: 1px dotted var(--song-dot);
  scrollbar-width: thin;
}
.home-song-lyrics-list p {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 8px;
  margin: 0;
  padding: 3px 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--song-muted);
  cursor: pointer;
}
.home-song-lyrics-list p.group-start { padding-top: 12px; }
.home-song-lyrics-list p span { font-size: 12px; font-variant-numeric: tabular-nums; }
.home-song-lyrics-list p.active { color: var(--song-ink); font-weight: 600; }
.home-song-lyrics-list p.active span { color: var(--song-seal); }

.home-song-player .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (max-width: 760px) {
  .home-song-controls { grid-template-columns: 34px minmax(0, 1fr) auto; }
  .home-song-lyrics-toggle { grid-column: 1 / -1; justify-self: start; }
}
```

- [ ] **Step 5: 删除旧定位样式**

```bash
git rm app/home-song-placement.css
```

并在 `app/layout.tsx` 中删除这一行：

```ts
import './home-song-placement.css';
```

- [ ] **Step 6: 运行测试、lint 与类型检查**

Run: `node --experimental-strip-types --test tests/home-song.test.mjs && npm run lint && npm run typecheck`
Expected: 全部 PASS，无 lint / 类型错误

- [ ] **Step 7: 提交**

```bash
git add app/home-song-player.tsx app/home-song-player.css app/layout.tsx tests/home-song.test.mjs
git commit -m "refactor: 向岸播放器改为内嵌模式并去掉浮层与关闭逻辑"
```

---

### Task 6: 报头、模块栏、今日栏、副刊栏组件

**Files:**
- Create: `app/home-front/use-front-today.ts`
- Create: `app/home-front/front-masthead.tsx`
- Create: `app/home-front/front-modules.tsx`
- Create: `app/home-front/front-daily.tsx`
- Create: `app/home-front/front-song.tsx`
- Test: `tests/home-front-components.test.mjs`

**Interfaces:**
- Consumes: Task 1 的 `FrontDate`、`getBeijingDate`、`formatMonthIssue`、`formatChineseDay`、`hashSeed`；Task 2 的 `pickDaily`；Task 3 的 `FRONT_BASE_PATH`、`hotspotHref`、`hotspotIndexHref`、`termsHref`、`FrontHotspot`、`FrontTerm`（仅类型）；Task 4 的 `learningRouteNotes`；Task 5 的 `HomeSongPlayer`；`LearningRoute`、`LearningRouteKey`（`app/learning-routes.ts`）
- Produces:
  - `useFrontToday(initial: FrontDate): FrontDate`
  - `FrontMasthead({ initialDate }: { initialDate: FrontDate })`
  - `FrontModuleColumn({ title, note, routes }: { title: string; note: string; routes: readonly ModuleRoute[] })`，其中 `ModuleRoute = LearningRoute & { key: LearningRouteKey }`
  - `FrontHotspots({ initialDate, hotspots }: { initialDate: FrontDate; hotspots: readonly FrontHotspot[] })`
  - `FrontTerms({ initialDate, terms }: { initialDate: FrontDate; terms: readonly FrontTerm[] })`
  - `FrontSong()`
  - 版面类名（Task 7 的 CSS 依赖）：`front-masthead`、`front-mast-top`、`front-mast-title`、`front-seal`、`front-rule-double`、`front-dateline`、`front-dateline-motto`、`front-col`、`front-kicker`、`front-module-list`、`front-module`、`front-module-name`、`front-module-arrow`、`front-hot-list`、`front-hot-link`、`front-more`、`front-empty`、`front-term-list`、`front-term-before`、`front-term-arrow`、`front-term-after`、`front-song`

- [ ] **Step 1: 写失败测试**

`tests/home-front-components.test.mjs`：

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function read(relativePath) {
  try {
    return await readFile(new URL(relativePath, import.meta.url), 'utf8');
  } catch (error) {
    if (error?.code === 'ENOENT') return '';
    throw error;
  }
}

const [today, masthead, modules, daily, song] = await Promise.all([
  read('../app/home-front/use-front-today.ts'),
  read('../app/home-front/front-masthead.tsx'),
  read('../app/home-front/front-modules.tsx'),
  read('../app/home-front/front-daily.tsx'),
  read('../app/home-front/front-song.tsx'),
]);

test('today hook defers the swap to after hydration and only when the date differs', () => {
  assert.match(today, /^'use client';/);
  assert.match(today, /useState\(initial\)/);
  assert.match(today, /useEffect\(/);
  assert.match(today, /getBeijingDate\(new Date\(\)\)/);
  assert.match(today, /current\.key !== initial\.key/);
});

test('masthead shows the rotating Beijing date and in-page anchors', () => {
  assert.match(masthead, /^'use client';/);
  assert.match(masthead, /useFrontToday\(initialDate\)/);
  assert.match(masthead, /formatMonthIssue\(today\)/);
  assert.match(masthead, /formatChineseDay\(today\)/);
  assert.match(masthead, /<h1>答卷之外<\/h1>/);
  assert.match(masthead, /云帆<br \/>之印/);
  for (const anchor of ['#study', '#about', '#contact']) assert.ok(masthead.includes(`href="${anchor}"`), `报头缺少 ${anchor}`);
});

test('module columns link every route with its note and no disclosure', () => {
  assert.match(modules, /href=\{route\.href\}/);
  assert.match(modules, /learningRouteNotes\[route\.key\]/);
  assert.doesNotMatch(modules, /'use client'|learning-disclosure-trigger|展开/);
});

test('daily columns build links through the base-path helpers', () => {
  assert.match(daily, /^'use client';/);
  assert.match(daily, /hotspotHref\(FRONT_BASE_PATH, item\.categoryKey, item\.slug\)/);
  assert.match(daily, /hotspotIndexHref\(FRONT_BASE_PATH\)/);
  assert.match(daily, /termsHref\(FRONT_BASE_PATH, picks\[0\]\?\.categoryKey\)/);
  assert.doesNotMatch(daily, /href=["'`]\/shenlun/);
  assert.match(daily, /hashSeed\(`hotspots:\$\{today\.key\}`\)/);
  assert.match(daily, /hashSeed\(`terms:\$\{today\.key\}`\)/);
  assert.match(daily, /className="front-empty"/);
});

test('daily columns import only types from the server data module', () => {
  assert.match(daily, /import type \{[^}]*FrontHotspot[^}]*\} from '\.\/front-data';/);
  assert.doesNotMatch(daily, /import \{[^}]*\} from '\.\/front-data'/);
  assert.doesNotMatch(daily, /writing-hotspot|writing-term-data/);
});

test('song column wraps the inline player', () => {
  assert.match(song, /<HomeSongPlayer \/>/);
  assert.match(song, /副刊 · 向岸/);
});
```

- [ ] **Step 2: 运行测试，确认失败**

Run: `node --experimental-strip-types --test tests/home-front-components.test.mjs`
Expected: 6 项全部 FAIL（文件不存在，读到空字符串）

- [ ] **Step 3: 写 `use-front-today.ts`**

```ts
'use client';

import { useEffect, useState } from 'react';
import { getBeijingDate, type FrontDate } from './front-date';

// 静态页按构建当天渲染；浏览器加载后改用访客当天日期，只在日期不同时替换，避免水合不一致。
export function useFrontToday(initial: FrontDate): FrontDate {
  const [today, setToday] = useState(initial);

  useEffect(() => {
    let active = true;
    const current = getBeijingDate(new Date());
    queueMicrotask(() => {
      if (active && current.key !== initial.key) setToday(current);
    });
    return () => { active = false; };
  }, [initial.key]);

  return today;
}
```

- [ ] **Step 4: 写 `front-masthead.tsx`**

```tsx
'use client';

import { formatChineseDay, formatMonthIssue, type FrontDate } from './front-date';
import { useFrontToday } from './use-front-today';

export function FrontMasthead({ initialDate }: { initialDate: FrontDate }) {
  const today = useFrontToday(initialDate);

  return (
    <header className="front-masthead">
      <div className="front-mast-top">
        <span>申论 × 结构化面试 · 长期学习站</span>
        <span>云帆老师 主编</span>
      </div>
      <div className="front-mast-title">
        <h1>答卷之外</h1>
        <span className="front-seal" aria-hidden="true">云帆<br />之印</span>
      </div>
      <div className="front-rule-double" aria-hidden="true" />
      <div className="front-dateline">
        <p>
          <b>{formatMonthIssue(today)}</b> · 今日 <time dateTime={today.key}>{formatChineseDay(today)}</time>
        </p>
        <p className="front-dateline-motto">方法 · 真题 · 积累 · 课堂</p>
        <nav aria-label="首页栏目">
          <a href="#study">学习入口</a>
          <span aria-hidden="true">｜</span>
          <a href="#about">编者按</a>
          <span aria-hidden="true">｜</span>
          <a href="#contact">获取资料</a>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 5: 写 `front-modules.tsx`**

```tsx
import { learningRouteNotes } from '../learning-route-notes';
import type { LearningRoute, LearningRouteKey } from '../learning-routes';

type ModuleRoute = LearningRoute & { key: LearningRouteKey };

export function FrontModuleColumn({ title, note, routes }: { title: string; note: string; routes: readonly ModuleRoute[] }) {
  return (
    <section className="front-col front-modules" aria-label={title}>
      <div className="front-kicker">
        <h2>{title}</h2>
        <span>{note}</span>
      </div>
      <ol className="front-module-list">
        {routes.map((route, index) => (
          <li key={route.key}>
            <a className="front-module" href={route.href}>
              <i>{String(index + 1).padStart(2, '0')}</i>
              <span className="front-module-name">
                <b>{route.label}</b>
                <small>{learningRouteNotes[route.key]}</small>
              </span>
              <span className="front-module-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 6: 写 `front-daily.tsx`**

```tsx
'use client';

import { useMemo } from 'react';
import { hashSeed, type FrontDate } from './front-date';
import type { FrontHotspot, FrontTerm } from './front-data';
import { FRONT_BASE_PATH, hotspotHref, hotspotIndexHref, termsHref } from './front-links';
import { pickDaily } from './front-picks';
import { useFrontToday } from './use-front-today';

const DAILY_COUNT = 3;

export function FrontHotspots({ initialDate, hotspots }: { initialDate: FrontDate; hotspots: readonly FrontHotspot[] }) {
  const today = useFrontToday(initialDate);
  const picks = useMemo(
    () => pickDaily(hotspots, hashSeed(`hotspots:${today.key}`), DAILY_COUNT),
    [hotspots, today.key],
  );

  return (
    <section className="front-col front-hot" aria-label="今日热点">
      <div className="front-kicker">
        <h2>今日热点</h2>
        <span>每天换三篇</span>
      </div>
      {picks.length === 0 ? (
        <p className="front-empty">热点时评整理中。</p>
      ) : (
        <ol className="front-hot-list">
          {picks.map((item) => (
            <li key={item.slug}>
              <a className="front-hot-link" href={hotspotHref(FRONT_BASE_PATH, item.categoryKey, item.slug)}>
                <span>{item.categoryLabel}</span>
                <b>{item.title}</b>
              </a>
            </li>
          ))}
        </ol>
      )}
      <a className="front-more" href={hotspotIndexHref(FRONT_BASE_PATH)}>全部热点时评 ↗</a>
    </section>
  );
}

export function FrontTerms({ initialDate, terms }: { initialDate: FrontDate; terms: readonly FrontTerm[] }) {
  const today = useFrontToday(initialDate);
  const picks = useMemo(
    () => pickDaily(terms, hashSeed(`terms:${today.key}`), DAILY_COUNT),
    [terms, today.key],
  );

  return (
    <section className="front-col front-terms" aria-label="规范用词">
      <div className="front-kicker">
        <h2><a href={termsHref(FRONT_BASE_PATH, picks[0]?.categoryKey)}>规范用词</a></h2>
        <span>今日三则 · 材料口语 → 规范表达</span>
      </div>
      {picks.length === 0 ? (
        <p className="front-empty">规范用词整理中。</p>
      ) : (
        <ul className="front-term-list">
          {picks.map((term) => (
            <li key={`${term.categoryKey}-${term.before}`}>
              <span className="front-term-before">{term.before}</span>
              <i className="front-term-arrow" aria-hidden="true">→</i>
              <b className="front-term-after">{term.after}</b>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
```

- [ ] **Step 7: 写 `front-song.tsx`**

```tsx
import { HomeSongPlayer } from '../home-song-player';

export function FrontSong() {
  return (
    <section className="front-col front-song" aria-label="副刊 · 向岸">
      <div className="front-kicker">
        <h2>副刊 · 向岸</h2>
        <span>写给备考的你</span>
      </div>
      <HomeSongPlayer />
    </section>
  );
}
```

- [ ] **Step 8: 运行测试、lint 与类型检查**

Run: `node --experimental-strip-types --test tests/home-front-components.test.mjs && npm run lint && npm run typecheck`
Expected: 6 项 PASS，无 lint / 类型错误

- [ ] **Step 9: 提交**

```bash
git add app/home-front/use-front-today.ts app/home-front/front-masthead.tsx app/home-front/front-modules.tsx app/home-front/front-daily.tsx app/home-front/front-song.tsx tests/home-front-components.test.mjs
git commit -m "feat: 首页报头、模块栏、今日热点与规范用词栏组件"
```

---

### Task 7: 组合首页并写版面样式

**Files:**
- Rewrite: `app/page.tsx`
- Create: `app/home-front/home-front.css`
- Modify: `app/layout.tsx`（在最后一个样式 import `import './learning-scene-transition.css';` 之后加 `import './home-front/home-front.css';`）
- Test: `tests/home-front-page.test.mjs`

**Interfaces:**
- Consumes: Task 1 `getBeijingDate`；Task 3 `loadFrontHotspots`、`buildFrontTerms`；Task 6 全部组件；`shenlunRoutes`、`interviewRoutes`
- Produces: 首页 DOM：`main.front-page#top` > `header.front-masthead`、`section.front-lead`、`div.front-cols#study`、`div.front-bottom`（内含 `section#contact`）、`section.front-editorial#about`、`footer.front-foot`

注意：`app/globals.css` 给 `main` 设了背景网格和光斑渐变，给 `footer` 设了三列网格和 11px 字号。首页必须在 `.front-page` 和 `.front-foot` 上显式覆盖。

- [ ] **Step 1: 写失败测试**

`tests/home-front-page.test.mjs`：

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function read(relativePath) {
  try {
    return await readFile(new URL(relativePath, import.meta.url), 'utf8');
  } catch (error) {
    if (error?.code === 'ENOENT') return '';
    throw error;
  }
}

const [page, css, layout] = await Promise.all([
  read('../app/page.tsx'),
  read('../app/home-front/home-front.css'),
  read('../app/layout.tsx'),
]);

test('homepage composes the newspaper front without the old gateway', () => {
  for (const name of ['FrontMasthead', 'FrontModuleColumn', 'FrontHotspots', 'FrontTerms', 'FrontSong']) {
    assert.match(page, new RegExp(`<${name}\\b`), `首页缺少 ${name}`);
  }
  for (const legacy of ['SubjectGateway', 'HomeLearningRepeat', 'MotionLayer', 'LearningTopNav', 'about-study-art', 'nav-shell', '展开']) {
    assert.ok(!page.includes(legacy), `首页仍包含 ${legacy}`);
  }
  for (const id of ['top', 'study', 'about', 'contact']) assert.match(page, new RegExp(`id="${id}"`));
  assert.match(page, /routes=\{shenlunRoutes\}/);
  assert.match(page, /routes=\{interviewRoutes\}/);
  assert.match(page, /把公考题做懂，<br \/>把话<em>说清<\/em>。/);
  assert.match(page, /—— 云帆老师/);
  for (const title of ['我在教什么。', '为什么做这个站。', '这里有什么。', '怎么使用。']) assert.ok(page.includes(title), `编者按缺少 ${title}`);
});

test('homepage data is computed at build time on the server', () => {
  assert.doesNotMatch(page, /'use client'/);
  assert.match(page, /export default async function Home\(\)/);
  assert.match(page, /getBeijingDate\(new Date\(\)\)/);
  assert.match(page, /await loadFrontHotspots\(\)/);
  assert.match(page, /buildFrontTerms\(\)/);
});

test('homepage styles stay quiet: no motion, gradients or text under 12px', () => {
  assert.match(layout, /import '\.\/home-front\/home-front\.css';/);
  assert.doesNotMatch(css, /@keyframes|animation\s*:|position\s*:\s*fixed|radial-gradient|(?<!repeating-)linear-gradient/);
  assert.match(css, /text-wrap:\s*balance/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /\.front-module small \{ display: none; \}/);
  const sizes = [...css.matchAll(/font(?:-size)?\s*:[^;{}]*?(\d+(?:\.\d+)?)px/g)].map((match) => Number(match[1]));
  assert.ok(sizes.length > 10, '没有读到字号声明');
  for (const size of sizes) assert.ok(size >= 12, `发现 ${size}px 的文字`);
});
```

- [ ] **Step 2: 运行测试，确认失败**

Run: `node --experimental-strip-types --test tests/home-front-page.test.mjs`
Expected: 3 项 FAIL（旧首页含 `SubjectGateway`，CSS 不存在）

- [ ] **Step 3: 重写 `app/page.tsx`**

```tsx
import { interviewRoutes, shenlunRoutes } from './learning-routes';
import { buildFrontTerms, loadFrontHotspots } from './home-front/front-data';
import { FrontHotspots, FrontTerms } from './home-front/front-daily';
import { getBeijingDate } from './home-front/front-date';
import { FrontMasthead } from './home-front/front-masthead';
import { FrontModuleColumn } from './home-front/front-modules';
import { FrontSong } from './home-front/front-song';

const editorNotes = [
  { title: '我在教什么。', text: '申论与结构化面试。从审题、找依据、搭结构，到写下来、说出来，重点放在作答过程和做完后的复盘。' },
  { title: '为什么做这个站。', text: '一节课结束以后，有价值的方法应该还能被重新找到、重新练习。这里是我的长期整理本。' },
  { title: '这里有什么。', text: '申论五大题型、国考真题索引、写作素材、面试题型方法与表达训练，以及陆续整理的课程片段。' },
  { title: '怎么使用。', text: '先理解方法框架，再用真题检验；做完回看审题、要点、结构和表达，把一次练习变成下次能用的经验。' },
] as const;

export default async function Home() {
  // 构建当天的北京日期；访客打开时由客户端组件换成当天。
  const buildDate = getBeijingDate(new Date());
  const hotspots = await loadFrontHotspots();
  const terms = buildFrontTerms();

  return (
    <main className="front-page" id="top">
      <FrontMasthead initialDate={buildDate} />

      <section className="front-lead" aria-label="写在前面">
        <h2 className="front-slogan">把公考题做懂，<br />把话<em>说清</em>。</h2>
        <div className="front-note">
          <h3>写在前面</h3>
          <p>课堂之外，我一直想有一个地方，把申论、结构化面试里真正需要反复练的东西整理下来。这里留下方法框架、真题拆解、写作积累和课堂观察。</p>
          <p className="front-sign">—— 云帆老师</p>
        </div>
      </section>

      <div className="front-cols" id="study">
        <FrontModuleColumn title="申论版" note="材料 · 题型 · 写作" routes={shenlunRoutes} />
        <FrontModuleColumn title="面试版" note="审题 · 观点 · 表达" routes={interviewRoutes} />
        <FrontHotspots initialDate={buildDate} hotspots={hotspots} />
      </div>

      <div className="front-bottom">
        <FrontTerms initialDate={buildDate} terms={terms} />
        <FrontSong />
        <section className="front-col front-contact" id="contact" aria-label="获取资料">
          <div className="front-kicker">
            <h2>获取资料</h2>
            <span>扫码</span>
          </div>
          <div className="front-qr-row">
            <div className="front-qr" role="img" aria-label="二维码（占位）" />
            <p>申论方法 · 结构化面试<br />真题训练 · 课堂内容</p>
          </div>
        </section>
      </div>

      <section className="front-editorial" id="about" aria-label="编者按">
        <div className="front-editorial-head">
          <h2>编者按</h2>
          <span>云帆老师与答卷之外</span>
        </div>
        <div className="front-editorial-grid">
          {editorNotes.map((note) => (
            <p key={note.title}><b>{note.title}</b>{note.text}</p>
          ))}
        </div>
      </section>

      <footer className="front-foot">
        <span>答卷之外 · 云帆老师 · 申论 × 结构化面试</span>
        <a href="#top">返回顶部 ↑</a>
      </footer>
    </main>
  );
}
```

- [ ] **Step 4: 新建 `app/home-front/home-front.css`**

```css
/* 首页「报刊头版」：纸色底、墨色字、朱红唯一强调色；只保留悬停与聚焦状态。 */
.front-page {
  --front-paper: #f4f0e7;
  --front-ink: #25251f;
  --front-muted: #6b675c;
  --front-seal: #a84b3f;
  --front-dot: #bdb6a5;
  --front-soft-rule: #cfc8b6;
  --front-serif: "Songti SC", "SimSun", Georgia, serif;
  width: 100%;
  padding: 28px max(32px, calc((100% - 1200px) / 2)) 24px;
  background: var(--front-paper);
  color: var(--front-ink);
}

.front-page h1,
.front-page h2,
.front-page h3,
.front-page p { margin: 0; }
.front-page a { color: inherit; text-decoration: none; }
.front-page a:focus-visible { outline: 2px solid var(--front-seal); outline-offset: 3px; }

/* 报头 */
.front-mast-top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-size: 12px;
  letter-spacing: .08em;
  color: var(--front-muted);
}
.front-mast-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin: 8px 0 10px;
}
.front-mast-title h1 { font: 700 64px/1 var(--front-serif); letter-spacing: .18em; }
.front-seal {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 2px solid var(--front-seal);
  border-radius: 4px;
  color: var(--front-seal);
  font: 700 15px/1.05 var(--front-serif);
  text-align: center;
  transform: rotate(-6deg);
}
.front-rule-double {
  height: 4px;
  border-top: 3px solid var(--front-ink);
  border-bottom: 1px solid var(--front-ink);
}
.front-dateline {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px 16px;
  padding: 6px 0;
  border-bottom: 1px solid var(--front-ink);
  font-size: 12px;
  color: var(--front-muted);
}
.front-dateline b { color: var(--front-seal); font-weight: 600; }
.front-dateline nav { display: flex; gap: 6px; }
.front-dateline nav a:hover { color: var(--front-seal); }

/* 头条 */
.front-lead {
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  align-items: end;
  gap: 36px;
  padding: 24px 0 22px;
  border-bottom: 1px solid var(--front-ink);
}
.front-slogan { font: 700 56px/1.15 var(--front-serif); letter-spacing: .02em; text-wrap: balance; }
.front-slogan em { font-style: normal; color: var(--front-seal); }
.front-note {
  padding-left: 20px;
  border-left: 1px solid var(--front-ink);
  font-size: 14px;
  line-height: 1.9;
}
.front-note h3 { margin-bottom: 4px; font: 700 15px/1.4 var(--front-serif); }
.front-sign { margin-top: 4px; font-size: 12px; color: var(--front-muted); }

/* 栏目网格 */
.front-cols { display: grid; grid-template-columns: 1fr 1fr 1.15fr; }
.front-bottom {
  display: grid;
  grid-template-columns: 1.25fr 1fr .8fr;
  border-top: 3px double var(--front-ink);
}
.front-col { min-width: 0; padding: 14px 22px 18px; }
.front-col + .front-col { border-left: 1px solid var(--front-ink); }
.front-col:first-child { padding-left: 0; }
.front-col:last-child { padding-right: 0; }
.front-kicker {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 6px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--front-ink);
}
.front-kicker h2 { font: 700 20px/1.3 var(--front-serif); text-wrap: balance; }
.front-kicker h2 a:hover { color: var(--front-seal); }
.front-kicker span { font-size: 12px; color: var(--front-muted); text-align: right; }

.front-module-list,
.front-hot-list,
.front-term-list { margin: 0; padding: 0; list-style: none; }

/* 模块 */
.front-module {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) auto;
  align-items: baseline;
  gap: 8px;
  padding: 9px 0;
  border-bottom: 1px dotted var(--front-dot);
}
.front-module i { font: italic 14px/1 Georgia, serif; color: var(--front-seal); }
.front-module b { font: 600 17px/1.4 var(--front-serif); }
.front-module small { display: block; margin-top: 2px; font-size: 12px; color: var(--front-muted); }
.front-module-arrow { color: var(--front-muted); }
.front-module:hover b,
.front-module:hover .front-module-arrow { color: var(--front-seal); }

/* 今日热点 */
.front-hot-link { display: block; padding: 9px 0; border-bottom: 1px dotted var(--front-dot); }
.front-hot-link span { font-size: 12px; color: var(--front-seal); }
.front-hot-link b { display: block; margin-top: 2px; font: 600 16px/1.5 var(--front-serif); text-wrap: balance; }
.front-hot-link:hover b { color: var(--front-seal); }
.front-more { display: inline-block; padding-top: 8px; font-size: 12px; color: var(--front-muted); }
.front-more:hover { color: var(--front-seal); }
.front-empty { padding: 9px 0; font-size: 13px; color: var(--front-muted); }

/* 规范用词 */
.front-term-list li {
  display: grid;
  grid-template-columns: 1fr 18px 1.2fr;
  align-items: baseline;
  gap: 6px;
  padding: 5px 0;
  font-size: 13px;
}
.front-term-before { color: var(--front-muted); }
.front-term-arrow { color: var(--front-seal); font-style: normal; }
.front-term-after { font: 600 14px/1.5 var(--front-serif); }

/* 获取资料 */
.front-qr-row { display: flex; align-items: center; gap: 12px; font-size: 13px; line-height: 1.8; }
.front-qr {
  flex: none;
  width: 74px;
  height: 74px;
  border: 1px solid var(--front-ink);
  background: repeating-linear-gradient(45deg, var(--front-ink) 0 3px, transparent 3px 7px);
  opacity: .75;
}

/* 编者按 */
.front-editorial { padding-top: 12px; border-top: 3px double var(--front-ink); }
.front-editorial-head { display: flex; align-items: baseline; gap: 14px; margin-bottom: 8px; }
.front-editorial-head h2 { font: 700 20px/1.3 var(--front-serif); }
.front-editorial-head span { font-size: 12px; color: var(--front-muted); }
.front-editorial-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
.front-editorial-grid p { padding: 0 16px; font-size: 13px; line-height: 1.85; }
.front-editorial-grid p:first-child { padding-left: 0; }
.front-editorial-grid p:last-child { padding-right: 0; }
.front-editorial-grid p + p { border-left: 1px solid var(--front-soft-rule); }
.front-editorial-grid b { margin-right: 4px; font: 700 14px/1.6 var(--front-serif); }

/* 页脚：覆盖 globals.css 中 footer 的三列网格与 11px 字号 */
.front-foot {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin: 14px 0 0;
  padding: 8px 0 0;
  border-top: 1px solid var(--front-ink);
  background: none;
  font-size: 12px;
  color: var(--front-muted);
}
.front-foot a:hover { color: var(--front-seal); }

@media (max-width: 760px) {
  .front-page { padding: 16px 16px 20px; }
  .front-mast-title h1 { font-size: 38px; letter-spacing: .12em; }
  .front-seal { width: 34px; height: 34px; font-size: 12px; }
  .front-dateline-motto { display: none; }
  .front-lead { grid-template-columns: 1fr; gap: 12px; padding: 14px 0; }
  .front-slogan { font-size: 34px; }
  .front-note { padding: 10px 0 0; border-left: 0; border-top: 1px solid var(--front-ink); font-size: 13px; }
  .front-cols,
  .front-bottom,
  .front-editorial-grid { grid-template-columns: 1fr; }
  .front-col { padding: 12px 0; }
  .front-col + .front-col { border-left: 0; border-top: 1px solid var(--front-ink); }
  .front-module { padding: 12px 0; }
  .front-module small { display: none; }
  .front-editorial-grid p { padding: 6px 0; }
  .front-editorial-grid p + p { border-left: 0; border-top: 1px dotted var(--front-dot); }
}
```

- [ ] **Step 5: 在 `app/layout.tsx` 引入样式**

在 `import './learning-scene-transition.css';` 下一行加：

```ts
import './home-front/home-front.css';
```

- [ ] **Step 6: 运行测试、完整校验与构建**

Run: `node --experimental-strip-types --test tests/home-front-page.test.mjs && npm run verify && npm run build`
Expected: 3 项 PASS；`verify`（lint + typecheck + 全部测试）通过；构建成功，无报错

- [ ] **Step 7: 提交**

```bash
git add app/page.tsx app/home-front/home-front.css app/layout.tsx tests/home-front-page.test.mjs
git commit -m "feat: 首页改为报刊头版版面"
```

---

### Task 8: 清理旧首页组件与样式

**Files:**
- Delete: `app/home-about.css`、`app/hero-review-orbit.css`、`app/home-learning-repeat.css`、`app/home-refresh.css`、`app/motion-layer.tsx`、`app/home-learning-repeat.tsx`、`public/about-study-art.svg`
- Modify: `app/layout.tsx`（删掉 `./hero-review-orbit.css`、`./home-about.css`、`./home-learning-repeat.css`、`./home-refresh.css` 四个 import）
- Modify: `app/learning-page-guide-polish.css`（文件开头接收 `question-type-switcher` 规则）
- Modify: `app/globals.css`、`app/mobile-refinement.css`、`app/interaction-semantics.css`、`app/mobile-home-learning-nav.css`、`app/subject-gateway.css`（删旧首页选择器）
- Test: `tests/home-front-legacy.test.mjs`

**Interfaces:**
- Consumes: Task 7 完成后首页不再引用任何旧类名
- Produces: 无新接口；测试锁住「旧类名不再出现在任何样式文件」

先确认引用：`grep -rnE "motion-layer|home-learning-repeat|about-study-art" app public` 应只命中待删文件本身（Task 7 之后 `page.tsx` 已不再引用它们）。

- [ ] **Step 1: 写失败测试**

`tests/home-front-legacy.test.mjs`：

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const appDir = new URL('../app/', import.meta.url);
const LEGACY_CLASSES = [
  'about-contact-body', 'about-contact-card', 'about-contact-head', 'about-copy', 'about-detail-grid',
  'about-identity-line', 'about-intro-lead', 'about-merged', 'about-merged-grid', 'about-profile',
  'about-profile-expanded', 'about-tags', 'about-visual-art', 'bottom-materials', 'contact-info',
  'desktop-break', 'hero-bottom', 'hero-directory-slot', 'hero-grid', 'hero-lead', 'hero-note',
  'hero-orbit', 'hero-orbit-review', 'hero-pointer-glow', 'hero-scroll', 'home-mobile-learning-nav',
  'note-line', 'pointer-glow', 'qr-pattern', 'qr-placeholder', 'repeat-learning', 'repeat-learning-directory',
  'repeat-learning-head', 'repeat-learning-link', 'repeat-learning-links', 'repeat-learning-row',
  'repeat-learning-subject', 'scroll-progress', 'title-outline', 'home-song-reopen', 'home-song-close',
  'hero', 'about',
];
// 类名后面紧跟字母、数字、下划线或连字符时不算命中，所以 .learning-page-hero、.subject-track-button 不受影响。
const LEGACY_SELECTOR = new RegExp(`\\.(?:${LEGACY_CLASSES.join('|')})(?![\\w-])`);

const [layout, guidePolish, mobileNavCss] = await Promise.all([
  readFile(new URL('layout.tsx', appDir), 'utf8'),
  readFile(new URL('learning-page-guide-polish.css', appDir), 'utf8'),
  readFile(new URL('mobile-home-learning-nav.css', appDir), 'utf8'),
]);

test('old homepage selectors are gone from every stylesheet', async () => {
  const files = (await readdir(appDir, { recursive: true })).filter((file) => file.endsWith('.css'));
  const hits = [];
  for (const file of files) {
    const lines = (await readFile(new URL(file.replaceAll('\\', '/'), appDir), 'utf8')).split('\n');
    lines.forEach((line, index) => {
      if (LEGACY_SELECTOR.test(line)) hits.push(`app/${file}:${index + 1}  ${line.trim()}`);
    });
  }
  assert.deepEqual(hits, []);
});

test('retired homepage files and imports are removed', async () => {
  for (const path of [
    '../app/home-about.css',
    '../app/hero-review-orbit.css',
    '../app/home-learning-repeat.css',
    '../app/home-song-placement.css',
    '../app/home-refresh.css',
    '../app/motion-layer.tsx',
    '../app/home-learning-repeat.tsx',
    '../public/about-study-art.svg',
  ]) {
    await assert.rejects(access(new URL(path, import.meta.url)), { code: 'ENOENT' }, `${path} 仍然存在`);
  }
  for (const name of ['home-about', 'hero-review-orbit', 'home-learning-repeat', 'home-song-placement', 'home-refresh']) {
    assert.ok(!layout.includes(`./${name}.css`), `layout.tsx 仍引用 ${name}.css`);
  }
});

test('question type switcher keeps its styles after home-refresh.css is removed', () => {
  assert.match(guidePolish, /\.question-type-switcher \{ margin-top: 42px; scroll-margin-top: 120px; \}/);
  assert.match(guidePolish, /\.question-type-switcher-tabs button\.active/);
  assert.match(guidePolish, /\.question-type-switcher-tabs \{ grid-template-columns: repeat\(2,minmax\(0,1fr\)\); \}/);
});

test('shared learning navigation rules survive the homepage cleanup', () => {
  assert.match(mobileNavCss, /\.learning-topnav-mobile \.learning-mobile-group/);
  assert.match(mobileNavCss, /min-height:\s*44px/);
});
```

- [ ] **Step 2: 运行测试，确认失败**

Run: `node --experimental-strip-types --test tests/home-front-legacy.test.mjs`
Expected: 前三项 FAIL，第四项 PASS。第一项会列出命中行：保留文件里约 130 行，分布在 `globals.css`、`mobile-refinement.css`、`interaction-semantics.css`、`mobile-home-learning-nav.css`、`subject-gateway.css`（以及还没删的五个旧文件）。这份清单就是下面几步的修改单。

- [ ] **Step 3: 迁移 `question-type-switcher` 规则**

把下面这段原样插到 `app/learning-page-guide-polish.css` 第一行之前（内容取自 `home-refresh.css` 第 80–107 行和第 141–142 行，未改动）：

```css
/* 方法框架：五大题型在同一二级页内切换（原在 home-refresh.css） */
.question-type-switcher { margin-top: 42px; scroll-margin-top: 120px; }
.question-type-switcher-tabs {
  display: grid;
  grid-template-columns: repeat(5,minmax(0,1fr));
  border-top: 1px solid rgba(37,37,31,.18);
  border-left: 1px solid rgba(37,37,31,.18);
}
.question-type-switcher-tabs button {
  min-height: 82px;
  padding: 14px;
  border: 0;
  border-right: 1px solid rgba(37,37,31,.18);
  border-bottom: 1px solid rgba(37,37,31,.18);
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: background .2s ease, transform .2s ease;
}
.question-type-switcher-tabs button span {
  display: block;
  margin-bottom: 8px;
  color: var(--shenlun-accent);
  font: italic 9px Georgia,serif;
}
.question-type-switcher-tabs button b { font: 500 18px/1.2 "Songti SC","SimSun",Georgia,serif; }
.question-type-switcher-tabs button.active { background: color-mix(in srgb, var(--shenlun-soft) 74%, var(--paper)); }
.question-type-switcher-tabs button:hover { transform: translateY(-2px); background: color-mix(in srgb, var(--shenlun-soft) 42%, transparent); }
@media (max-width: 760px) {
  .question-type-switcher-tabs { grid-template-columns: repeat(2,minmax(0,1fr)); }
  .question-type-switcher-tabs button { min-height: 64px; }
}

```

- [ ] **Step 4: 删除旧文件与 import**

```bash
git rm app/home-about.css app/hero-review-orbit.css app/home-learning-repeat.css app/home-refresh.css app/motion-layer.tsx app/home-learning-repeat.tsx public/about-study-art.svg
```

在 `app/layout.tsx` 中删除这四行：

```ts
import './hero-review-orbit.css';
import './home-about.css';
import './home-learning-repeat.css';
import './home-refresh.css';
```

- [ ] **Step 5: 删除保留文件里的旧选择器**

逐条处理 Step 2 列出的命中行，规则只有两条：

- 选择器组里**全部**是旧类名，就删掉整条规则（从选择器到对应的 `}`）；删完后若 `@media` 块变空，连 `@media` 一起删。
- 选择器组里**混有**仍在使用的选择器（例如 `interaction-semantics.css` 里与 `.learning-entry-link` 写在一起的 `.repeat-learning-link,`），只删旧选择器那一行，并修好前后的逗号，保留规则体。

已核实的具体位置：

- `app/mobile-home-learning-nav.css`：删第 3–5 行（`.home-mobile-learning-nav { display: none; }`）、第 8–23 行（注释与三条 `.home-mobile-learning-nav…` 规则）、第 86–95 行（注释与 `.home-mobile-learning-nav .learning-topnav-home`、`.home-mobile-learning-nav ~ .hero-scroll .hero`）。`@media (max-width: 760px)` 里的 `.learning-topnav-mobile …` 规则全部保留。
- `app/subject-gateway.css`：删第 1–7 行 `.hero-directory-slot { … }`，删 1080px 与 760px 两个媒体查询里的 `.hero-directory-slot { … }`，其余 `.subject-*` 规则保留（`SubjectGateway` 仍被 `app/study-hub.tsx` 使用）。
- `app/globals.css`：删 `.scroll-progress`、`.hero*`、`.pointer-glow`、`.title-outline`、`.about`、`.about-*`、`.qr-*`、`.contact-info` 相关规则。`:root` 里的 `--*-progress` 变量不在本次范围内，不动。
- `app/mobile-refinement.css`、`app/interaction-semantics.css`：按上面两条规则处理。

每处理完一个文件，重跑一次：

Run: `node --experimental-strip-types --test tests/home-front-legacy.test.mjs`
Expected: 命中清单逐步变短；最终 4 项全部 PASS

- [ ] **Step 6: 全量校验与构建**

Run: `npm run verify && npm run build`
Expected: 全部通过；构建无报错

- [ ] **Step 7: 提交**

```bash
git add -A app public tests/home-front-legacy.test.mjs
git commit -m "chore: 清理旧首页组件、样式与插画"
```

---

### Task 9: 静态产物与版面验收

**Files:**
- 不改产品代码；截图脚本放在系统临时目录（`$TEMP/home-shots/front-shoot.cjs`），不入库

**Interfaces:**
- Consumes: 前八个任务的全部产物

- [ ] **Step 1: 正式站子路径构建并校验**

Run: `npm run build:static:pages`
Expected: 最后一行为 `Validated N routes for base path "/gongkao-teacher-website"`

- [ ] **Step 2: 检查首页静态 HTML 里的热点链接**

```bash
grep -o 'href="[^"]*#hotspots/[^"]*"' site/index.html | head -3
grep -c 'href="/shenlun/writing/#' site/index.html
```

Expected: 第一条输出三行，都以 `href="/gongkao-teacher-website/shenlun/writing/#hotspots/` 开头；第二条输出 `0`

- [ ] **Step 3: 启动开发服务器**

Run（后台）：`npm run dev`
从输出里读出本地地址（通常是 `http://localhost:3000/`），下一步记为 `BASE_URL`。

- [ ] **Step 4: 写截图与自动检查脚本**

`$TEMP/home-shots/front-shoot.cjs`：

```js
const { chromium } = require(process.env.PW_PATH);
const path = require('path');

const baseUrl = process.env.BASE_URL;
const outDir = process.env.OUT_DIR;

async function shoot(name, viewport, isMobile) {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport, deviceScaleFactor: 1, isMobile, hasTouch: isMobile })).newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  const report = await page.evaluate(() => {
    const small = [];
    for (const element of document.querySelectorAll('.front-page *')) {
      const hasText = [...element.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim());
      const box = element.getBoundingClientRect();
      if (!hasText || box.width <= 1 || box.height <= 1) continue;
      const size = parseFloat(getComputedStyle(element).fontSize);
      if (size < 12) small.push(`${element.tagName.toLowerCase()}.${element.className} ${size}px`);
    }
    return {
      overflowX: document.documentElement.scrollWidth - window.innerWidth,
      small,
      date: document.querySelector('.front-dateline time')?.textContent,
      hotspots: [...document.querySelectorAll('.front-hot-link')].map((link) => link.getAttribute('href')),
      terms: document.querySelectorAll('.front-term-list li').length,
      modules: document.querySelectorAll('.front-module').length,
      fixed: [...document.querySelectorAll('.front-page *')].filter((element) => getComputedStyle(element).position === 'fixed').length,
    };
  });
  console.log(name, JSON.stringify(report));
  await page.screenshot({ path: path.join(outDir, `${name}.jpg`), fullPage: true, type: 'jpeg', quality: 60 });
  await browser.close();
}

(async () => {
  await shoot('front-1440', { width: 1440, height: 900 }, false);
  await shoot('front-390', { width: 390, height: 844 }, true);
})();
```

- [ ] **Step 5: 运行脚本**

```bash
mkdir -p "$TEMP/home-shots"
PW_PATH="$LOCALAPPDATA/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright" \
BASE_URL="http://localhost:3000/" OUT_DIR="$TEMP/home-shots" \
node "$TEMP/home-shots/front-shoot.cjs"
```

Expected（两个宽度各一行）：`overflowX` 为 `0`；`small` 为空数组；`date` 为北京时间今天的中文月日；`hotspots` 为 3 条 `/shenlun/writing/#hotspots/<分类>/<slug>`，且分类互不相同；`terms` 为 `3`；`modules` 为 `8`；`fixed` 为 `0`。

- [ ] **Step 6: 看截图，逐项核对**

一次只打开一张（大图会拖垮连接）：先 `front-1440.jpg`，再 `front-390.jpg`。对照规格「版面结构」核对：

- 桌面顺序：报头 → 头条 → 三栏（申论版 / 面试版 / 今日热点）→ 下栏（规范用词 / 副刊 / 获取资料）→ 编者按 → 页脚
- 手机端单栏，模块只显示序号与名称，播放器在副刊栏内
- 没有元素遮挡；标题、栏目名、热点标题没有单字孤行
- 只有朱红一种强调色

发现问题就回到对应任务修改样式，并重跑 Step 5–6。

- [ ] **Step 7: 停止开发服务器与头脑风暴服务**

停止 Step 3 启动的 `npm run dev`；停止头脑风暴可视化服务（`bash "C:/Users/Administrator/.claude/plugins/cache/claude-plugins-official/superpowers/6.4.1/skills/brainstorming/scripts/stop-server.sh"`，或在 `/tasks` 里停止）。

- [ ] **Step 8: 汇报**

向用户汇报：两张截图的核对结论、Step 5 的检查输出、`npm run verify` 与 `npm run build:static:pages` 的结果。二维码仍是占位，拿到真图后替换 `.front-qr` 即可。
