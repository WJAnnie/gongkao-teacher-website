# 桌面可读性修复计划 (2026-09-28)

承接用户批准的顺序：标题遮挡 → 工具对比度 → 小字号 → 首屏留白 → 正文行宽。

## 约束原则
- 保留现有标题 100px 上限 (`clamp(58px, 8vw, 100px) !important;`)。
- 不改导航设计，不动装饰圆环，不进行全站重设计，不修改未跟踪工具备份文件。
- 不新增任何外部依赖，桌面字号改动严格限制在 `@media (min-width: 1024px)` 桌面媒体查询，避免破坏手机现有修复。
- 测试使用现有 `node:test`，覆盖颜色对比度计算与 CSS 契约断言。

## 具体修复项与断言指标

1. **2. /tools 对比度修复（目标 WCAG AA >= 4.5）**：
   - 练习记录卡 (`.tool-card.record-tool`): 原白字配赤陶底对比度 2.29 -> 背景 `#d99a82` 搭配深墨字 `color: #25251f`，对比度达 6.23 >= 4.5。
   - 需要重做 / 比较满意按钮 (`.record-rating button`): 原对比度 1.98 -> 字色与边框加深至 `#25251f` / `rgba(37,37,31,.3)`，对比度 6.23 >= 4.5。
   - 生成本次模拟按钮 (`.build-mock`): 原对比度 2.73 -> 背景深赤陶色 `#98452f` 配米白字 `#fff9ef`，对比度 6.57 >= 4.5。
   - 评分说明 (`.score-dimensions small` 与 `.advanced-note`): 原在酸绿底上为 `rgba(37,37,31,.58)` 对比度 3.49 -> 统一使用 `#25251f`，对比度达 6.0+ >= 4.5。

2. **4. 桌面 (>=1024) 标注至少 11px、可点击文字至少 12px**：
   - 复盘印章 (`.exam-review-stamp::after`): 6px -> 11px。
   - 本页路径与编号 (`.shenlun-route-strip::before`, `.interview-route-strip::before`, `.subject-track-arrow`): 8px -> 11px。链接编号与文字 (`> a > span`, `> a > b`): 9px/10px -> 12px。
   - 真题时间与重点 (`.question-paper-time`, `.shenlun-question-row h3::after`): 8px -> 11px。
   - questions 标签 (`.question-meta span`, `.shenlun-question-toolbar span`): 9px/10px -> 11px。
   - materials 摘要 (`.note-summary-main > p`, `.material-card > p`): 9px/10px -> 11px。
   - 页脚目录章节 (`.shenlun-footer > div > span`, `.interview-footer > div > span`, `.shenlun-footer > p`): 9px -> 11px；可点击链接 (`.shenlun-footer a`, `.interview-footer a`): 10px -> 12px。
   - 答题卡 SVG (`.framework-voice-answer-sheet svg text`): 设置 `min-width: 910px` 避免桌面过度缩小，SVG 内部文本字号设为 12px（大字 18px），保证桌面缩放后实际渲染不小于 11px。

3. **3. 学习页首屏留白收紧**：
   - 学习页首屏原 `height: 740px`，实际内容总高约 602px，产生多余大块空白。
   - 在 `@media (min-width: 1024px)` 将 `.learning-page-frame .learning-page-hero` 高度收紧为 `620px`，完全保留原有各元素绝对定位与底部路径条，既消除空旷感又不遮挡内容。

4. **5. 框架正文行宽收紧至中文约 35-42 字**：
   - 框架页正文（18px 字号）原宽度达 843-900px（约 47-50 字），扫读过宽。
   - 将 `.framework-voice-prose`、`.expression-v2-prose` 段落 `max-width` 限制为 `42em`（18px × 42 ≈ 756px），使行宽保持在舒适的 35-42 个汉字区间，同时完整保留左侧目录与多列网格布局。

## 验证计划
- 运行 `node --experimental-strip-types --test tests/desktop-readability.test.mjs` 验证新契约
- 运行 `npm run typecheck`
- 运行 `npm test` 验证全站 138 个测试全绿
- 检查 `git status` 确保不含多余修改，不提交不推送。

## 收尾状态

2026-09-28 已完成接续验收：138 项测试、91 组浏览器布局检查、17 项交互断言及 36 路由静态构建均通过；8 张截图由 agy CLI 读取并通过视觉复查。本轮无额外应用代码修改，详见 [验收记录](2026-09-28-desktop-polish-verification.md)。
