# 桌面可读性收尾验收（2026-09-28）

承接同目录 `2026-09-28-desktop-polish.md` 和工作区已落盘改动。本轮依据本地计划恢复进度；引用聊天的 `read_thread` 工具在本会话不可用，未将聊天标题当作任务内容。

## 改动范围

- `app/learning-page-guide-polish.css`：标题字号上限 100px，避免多行标题压住导语。
- `app/desktop-readability.css`：集中修正工具对比度，桌面标注/交互字号、620px 首屏、正文行宽及答题卡缩放。
- `app/layout.tsx`：在既有共享样式之后加载可读性修正。
- `tests/desktop-readability.test.mjs`：3 项颜色、几何和加载顺序契约测试。

本轮没有继续改动应用代码；上述改动在接续前已存在。完成实际浏览器验收并补充可复用检查产物，无新增依赖。

## 新运行的验证

| 检查 | 结果 |
| --- | --- |
| `npm run verify` | ESLint、TypeScript 通过；138 个测试全部通过 |
| `git diff --check` | 通过 |
| `npm run build:static` | 构建、导出、静态资源校验通过，36 条路由 |
| 浏览器布局矩阵 | 13 页 × 7 档宽度 = 91 组；页面横向溢出 0，学习页首屏直接子元素底部裁切 0 |
| 桌面可见文本字号 | 1024/1440/1920px 三档，没有直接文本节点字号小于 11px 的项 |
| 框架正文实测 | 1024px 视口：712.625px / 18px；1440/1920px 视口：756px / 18px，约 40–42 字宽 |
| 答题卡 SVG | 桌面最小实际字高约 11.87px，内部滚动未造成页面横向溢出 |
| 工具、目录交互 | 17 项断言通过，过程中页面脚本异常 0 |

布局视口：320、390、820、1023、1024、1440、1920px，高度 1000px。覆盖首页、申论入口、工具、方法框架、题库、资料、四个面试学习页及申论真题/视频/写作页。

在 1440px 与 390px 下实测评分按钮切换、保存练习及刷新后保留、面试三题、申论五个任务、五维自评更新；另验证桌面目录折叠/展开和手机目录打开/关闭。练习数据写在本轮独立 Playwright 浏览器中。

## 图片读取

全部图片交给 agy CLI 实际读取，主代理只接收 JSON 文本。首次读取四张既有截图成功，报告未指出阻断问题；正文、进阶工具和手机页使用本轮新截图再次检查，最终判定为 `pass`，未列出待修问题。两轮共读取 8 张截图。像素截图只用于视觉判断，字号与行宽以浏览器计算值为准。

Windows 调用时设置 `PYTHONUTF8=1`、`PYTHONIOENCODING=utf-8` 及 PowerShell UTF-8 输出编码，用标准输入传递提示词，并让 CLI 继承当前工作目录。未修改全局 CLI 文件。

## 证据路径

以下文件位于已忽略的 `output/playwright/`，保留在本地，不自动进入 Git：

- `desktop-followup-check.js` / `desktop-followup-results.json`：91 组布局检查与实测数据。
- `desktop-followup-interactions.js` / `desktop-followup-interactions.json`：17 项交互断言。
- `desktop-followup-build.log`：36 路由静态构建和校验日志。
- `agy-visual-review-initial.json` / `agy-visual-review-final.json`：两轮 agy 图片读取结果。
- `*-followup.png`：本轮桌面和手机截图。

## 验证边界

本轮浏览器验收使用本地 Chromium 和开发服务；静态产物已构建及校验，尚未部署。未验证 Safari、Firefox、真实手机设备或辅助技术的完整使用流程。保留既有导航与装饰设计；没有进行全站重设计，也没有提交或推送。

后续已补齐发布产物浏览器检查，并修复实际发现的导航与旧入口问题，详见 [静态发布版本验收](2026-09-28-static-release-verification.md)。
