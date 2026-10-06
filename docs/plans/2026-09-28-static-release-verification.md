# 静态发布版本修复与验收（2026-09-28）

桌面可读性验收后，继续检查 GitHub Pages 子路径版的真实浏览器行为。修复了开发服务和静态文件校验未覆盖的导航、旧分类入口问题。

## 问题与改动

1. 通用题库、资料、工具页使用 Next Link，产生重复站点前缀的 RSC 预取请求并返回 404。`app/learning-shell.tsx` 改用现有学习导航采用的原生链接，保留所有标签、样式类和无障碍名称，由静态导出统一处理前缀。
2. 20 个旧分类页的流式元数据带有 Flight 文本字节长度；导出时改写网址改变了文本长度，引发浏览器 `Connection closed`。`scripts/build-github-pages.mjs` 通过 HTML-limited User-Agent 请求完整元数据；`scripts/static-site-utils.mjs` 在仍收到流式元数据时拒绝改写，避免生成损坏页面。
3. 旧八类热点入口与现有十一类目录不一致。`app/shenlun/writing/writing-legacy-target.ts` 复用现有路由清单和文章分类索引，映射旧分类并保留文章书签；`writing-legacy-entry.tsx` 与 `hotspots/[category]/page.tsx` 接入该解析逻辑。案例、比喻入口沿用原有行为。

没有新增依赖，也没有修改视觉样式。既有桌面可读性修改继续保留。

## 验证结果

| 检查 | 结果 |
| --- | --- |
| `npm run verify` | ESLint、TypeScript 与 153 个测试全部通过 |
| `npm run build:static` | 根路径构建、导出及 36 条路由校验通过 |
| `npm run build:static:pages` | `/gongkao-teacher-website` 前缀构建、导出及 36 条路由校验通过 |
| 导出页面浏览器矩阵 | 36 个桌面入口 + 4 个手机入口，共 40 组；错误状态、页面溢出和错误前缀均为 0 |
| 页面脚本异常 | 修复前 20，修复后 0 |
| 资源请求失败 | 修复前 16，修复后 0 |
| 工具与目录交互 | 17 项断言通过，含保存记录后刷新、抽题、自评与目录开关 |
| 旧书签与导航 | 3 个跨分类文章书签、工具到题库导航及浏览器返回，共 5 项通过 |
| 视觉复查 | agy CLI 实际读取 3 张最终导出截图，判定 `pass` |

旧书签已实测打开实际文章正文：`development/#employment` → 社会民生的就业文章，`people/#high-quality-development` → 经济发展的高质量发展文章，`era/#artificial-intelligence` → 时代创新的人工智能文章。

新增/更新回归测试：`tests/learning-shell-static.test.mjs`、`tests/writing-legacy-target.test.mjs`、`tests/static-site-utils.test.mjs`、`tests/static-build-profile.test.mjs`。导航、流式元数据拒绝逻辑及兼容映射均先观察到回归测试失败，再修复；复核时还补测并修复了对象原型键误匹配和重复文章片段丢失。

## 预览与证据

- 本地发布预览：http://127.0.0.1:4176/gongkao-teacher-website/
- 当前 `site/` 为 GitHub Pages 前缀版静态产物。
- 预览副本：`output/playwright/pages-preview-fixed/gongkao-teacher-website/`。
- 构建日志：`output/playwright/root-release-build-fixed.log`、`pages-release-build-fixed.log`。
- 全量检查：`output/playwright/pages-release-verify.log`。
- 浏览器矩阵：`output/playwright/pages-release-results-fixed.json`。
- 交互与书签：`output/playwright/pages-release-interactions-fixed.json`、`pages-release-bookmarks.json`。
- 图片读取报告：`output/playwright/agy-pages-release-visual.json`。

这些生成产物保存在已忽略的 `output/playwright/` 下。预览服务停止后，可在项目根目录运行 `python -m http.server 4176 --bind 127.0.0.1 --directory output/playwright/pages-preview-fixed` 重新打开。

## 边界

浏览器验收使用本地 Chromium，未覆盖真实手机或其他浏览器。仅完成本地修复与验证，没有提交、推送或上线；后续依赖升级若改变 Vinext 元数据策略，导出保护会明确报错，需要重新核对渲染模式。
