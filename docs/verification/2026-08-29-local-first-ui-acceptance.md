# 本地优先与 UI 优化验收记录

验收范围：`codex/local-first-ui-optimization` 的 Task 12。验收在本地完成，没有推送、没有部署，也没有写入生产凭据。

## 结论

- 自动化门禁、36 路由的根路径构建、36 路由的 GitHub Pages 前缀构建均通过。
- 五档宽度、15 个代表路由组成的 75 个浏览器单元全部通过；没有遗留横向溢出、空菜单、焦点、触控尺寸、资源或应用控制台错误。
- 音乐播放器的用户触发、播放、暂停、拖动、歌词同步、后台时间推进、结束、失败和重试状态机均通过浏览器验收。
- 写作积累的入口、分类返回、代表内容数量和比喻检索均通过。
- Pages 前缀下的四个代表路由、CSS、JavaScript、favicon、OG 图片和站内导航均通过。
- 2026-08-29 验收时，**唯一外部阻塞是 `public/audio/xiang-an.mp3` 尚未取得。** 当时真实下载返回 HTTP 403；更早的重试还出现过 `ECONNRESET` 和 curl TLS 握手失败。没有创建伪 MP3，也没有把浏览器测试用的合成 WAV 写入项目。

因此，2026-08-29 的代码和本地静态发布路径已经达到可提交状态；当时真实 Pages 音频 200 与生产部署仍未完成。该音频阻塞已在 2026-08-31 的风险修复中关闭，见下节。

### 2026-08-31 风险修复更新

- 从本项目已公开的 GitHub Pages 产物恢复真实《向岸》录音，并将 `public/audio/xiang-an.mp3` 纳入版本控制；文件为 5,018,262 bytes，ID3 MP3，SHA-256 为 `2e1a4f4935214bbcd9ec5a945131be20784ad4f5b8d3752b46b75d7a7cf753f2`。
- `scripts/vendor-home-audio.mjs` 改为纯离线完整性校验，不再请求 Suno 或任何在线镜像。启动器、部署工作流和歌词对齐工作流均使用同一仓库资产。
- Next.js、React、Vinext、Vite、Cloudflare Vite 插件与 Wrangler 等安全敏感依赖升级到兼容的修复版本，并由 `tests/dependency-security.test.mjs` 锁定基线。
- Pages 构建会把 `SITE_BASE_PATH` 注入客户端音频地址，静态产物校验器同时拒绝缺少仓库前缀的客户端音频引用，避免客户端重新挂载后回退到站点根路径。
- 本次仍只做本地提交与构建验证，不推送、不部署；生产域名验收仍属于部署后的独立步骤。

| 2026-08-31 验证项目 | 结果 |
| --- | --- |
| `npm.cmd audit --json` | 全量依赖 0 漏洞 |
| `npm.cmd audit --json --omit=dev` | 生产依赖 0 漏洞 |
| `npm.cmd run verify` | ESLint、TypeScript 与 51 个 Node 测试通过 |
| `npm.cmd run build:static` | 36 路由；10.04 MB raw；6.21 MB gzip-estimated；音频已包含 |
| `npm.cmd run build:static:pages` | 36 路由；10.11 MB raw；6.22 MB gzip-estimated；音频已包含 |

升级 Vite 后暴露的 JSON 模块导入警告也已用标准 import attributes 消除，并由 `tests/static-build-profile.test.mjs` 防回归。

## 自动化门禁与静态产物

| 项目 | 结果 |
| --- | --- |
| `npm.cmd run verify` | ESLint 0 警告；TypeScript 通过；Node 测试 46/46 通过 |
| `npm.cmd run build:static` | 36 路由；4,976,262 bytes raw；1,183,292 bytes gzip-estimated |
| `npm.cmd run build:static:pages` | 36 路由；base path `/gongkao-teacher-website`；5,053,947 bytes raw；1,187,019 bytes gzip-estimated |
| 体积门禁 | Pages 产物低于 8,500,000 bytes gzip-estimated 预算 |
| `public/og.jpg` | 1200×630；140,139 bytes；低于 500,000 bytes |
| 本地启动器 | 测试确认打印桌面/局域网 URL、传播启动错误，且不调用防火墙修改命令 |

`site/size-report.json` 由最后一次 Pages 构建生成。构建产物与浏览器夹具均为本地、忽略文件，不进入提交。

## 五档浏览器矩阵

矩阵覆盖 360、390、430、768、1440 px，以及下列 15 个代表路由：

- `/`、`/questions/`、`/materials/`、`/tools/`
- `/shenlun/framework/`、`/shenlun/questions/`、`/shenlun/writing/`、`/shenlun/videos/`
- 一个热点分类、一个案例分类、`/shenlun/writing/metaphors/`
- 四个面试路由

每个单元检查横向溢出、导航可达性、当前页状态、键盘焦点与可见焦点框、40px 触控目标、失败请求、HTTP 4xx/5xx、页面异常和控制台错误。

### 迭代轨迹

| 轮次 | 通过 | 说明 |
| --- | ---: | --- |
| 首轮全矩阵 | 24/75 | 暴露响应式重复链接、关闭的原生 disclosure 和菜单触发器稳定性带来的夹具误报，同时保留真实触控失败 |
| 修正夹具后 | 64/75 | 使用稳定的移动菜单触发器，并以原生可见性/关闭状态排除不可交互节点；剩余失败均可映射到真实控件 |
| 受影响单元聚焦复测 | 8/12 | 第一轮尺寸修复后仍有 4 个单元未达 40px |
| 聚焦复测 | 12/12 | 所有已知触控失败关闭 |
| 最终全矩阵 | **75/75** | 0 overflow、0 nav、0 focus、0 touch、0 console/resource failure |

最终机器可读结果：`output/playwright/task12-browser-matrix.json`；完整输出：`output/playwright/task12-browser-matrix-output.txt`；截图：`output/playwright/task12-matrix/`。

### 真实失败与修复

| 路由/宽度 | 观察到的症状 | 修复文件 | 修复与回归证据 |
| --- | --- | --- | --- |
| 申论与面试学习页，360/390/430/768 | 移动品牌标记和首页入口为 30×30px | `app/learning-nav.css`、`app/mobile-refinement.css` | 两个入口提升到 40×40px；`tests/interaction-semantics.test.mjs` 锁定尺寸 |
| `/tools/`，移动与平板宽度 | 计时预设、操作和评分按钮约 37–38px 高 | `app/study-hub.css` | 统一增加 `min-height: 40px`；聚焦复测与全矩阵通过 |
| `/tools/`，移动与平板宽度 | 模拟训练模式按钮低于 40px | `app/advanced-tools.css` | `.mock-switch button` 增加 `min-height: 40px`；回归测试与矩阵通过 |
| `/shenlun/framework/`，移动与平板宽度 | 抽屉关闭按钮为 38×38px | `app/shenlun/framework/framework-manual.css` | 提升到 40×40px；聚焦复测与全矩阵通过 |

视觉改动只扩大交互面积，没有改变已批准的纸张/编辑视觉。最终视觉判定为 96/100，记录在 `.omx/state/task12/ralph-progress.json`。

## 音乐播放器验收

浏览器夹具只在请求层返回合成 WAV，用于验证状态机，不生成或替代项目 MP3。结果：

```json
{
  "initialRequestDeferred": true,
  "loaded": true,
  "paused": true,
  "seekTime": 16.5,
  "lyricAtSeekActive": true,
  "lyricAfterBackgroundActive": true,
  "ended": true,
  "endMode": "event",
  "failureDeferredUntilIntent": true,
  "failureSurfaced": true,
  "retryRequested": true,
  "retryPlayed": true
}
```

`app/home-song-player.tsx` 只在明确播放意图后设置同源音频 `src`，因此首页初始渲染和失败场景都不会提前请求音频资源。单元回归位于 `tests/home-song.test.mjs`，浏览器输出位于 `output/playwright/task12-audio-acceptance-output.txt`。

真实音频现已作为 `public/audio/xiang-an.mp3` 跟踪；`scripts/vendor-home-audio.mjs` 仅离线校验精确大小、ID3 签名和 SHA-256。构建不再依赖已返回 403 的外部 CDN，也没有使用占位或伪造音频。

## 写作积累验收

浏览器结果：

- 写作首页存在 8 个入口，顺序和目标正确。
- 代表热点页和案例页均有正确分类返回路径，且各显示 10 条内容。
- 比喻词库为 242 条平铺记录，没有嵌套 `<details>`。
- 搜索“改革”显示 12 条，清空后恢复 242 条。

证据：`output/playwright/task12-writing-acceptance-output.txt`。

## GitHub Pages 前缀验收

### 发现与修复

1. 首轮 Pages 浏览器检查发现 HTML 链接已加前缀，但 Vinext 的 CSS/JavaScript 与 RSC 提示仍逃逸到根路径 `/_next/...`。
2. `next.config.ts` 在构建时嵌入 `SITE_BASE_PATH`；`scripts/build-static-profile.mjs` 把前缀传给 Vinext；`scripts/build-github-pages.mjs` 从带前缀的生产路由导出并复制嵌套客户端资产；`scripts/static-site-utils.mjs` 同时重写并校验 RSC 中的框架资源提示。
3. 修复资产前缀后，两个写作分类页又暴露 Vinext `next/link` 的生产静态 RSC 预取异常。`writing-static-pages.tsx`、`writing-hotspot-static-category.tsx`、`writing-case-static-category.tsx` 改用可由静态导出器加前缀的原生锚点，`tests/route-scope.test.mjs` 防止回归。
4. 验收夹具最初点中了隐藏的桌面重复链接；固定 1440×900 后选择可访问的“方法框架”链接。这是夹具修正，不是产品修复。

前缀修复由 `tests/static-build-profile.test.mjs`、`tests/static-site-utils.test.mjs` 覆盖。

### 最终结果

检查 `/`、一个热点、一个案例和一个面试路由：

- 四个文档均为 200；每页加载到的 CSS/JavaScript 全部为 200。
- 没有逃逸出 `/gongkao-teacher-website/` 的站内链接。
- `favicon.svg` 为 200，`og.jpg` 为 200，OG URL 带正确前缀。
- 从首页点击“方法框架”后仍停留在 Pages 前缀内。
- 0 资源失败，0 控制台错误。
- 2026-08-29 的浏览器证据中，`audio/xiang-an.mp3` 为 404；`passExceptAudio: true`，`audioBlocked: true`。该历史结果促成了 2026-08-31 的仓库内音频修复。

证据：`output/playwright/task12-pages-acceptance-output.txt`。

## 发布边界与剩余风险

- 本次只提交代码、测试和文档；不推送、不部署。
- 没有生产凭据验收，也没有在真实 GitHub Pages/EdgeOne 域名上做端到端检查。
- 仓库内音频及两种静态产物的完整性由自动测试和离线构建验证；真实 GitHub Pages/EdgeOne 的托管结果仍需在未来部署后单独验收。
- 练习记录继续保存在浏览器本地；`app/data/*` 是未来数据库、后台和同步层的接入边界。
