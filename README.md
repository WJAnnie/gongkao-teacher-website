# 答卷之外｜申论 × 结构化面试学习站

> 公考不是背标准答案。这里是一套专注申论与结构化面试的长期学习系统：学方法、做真题、练表达、做复盘。

## 在线访问

**正式网站：** https://wjannie.github.io/gongkao-teacher-website/

**GitHub 仓库：** https://github.com/WJAnnie/gongkao-teacher-website

当前正式站已经从个人内容主页升级为“申论 × 面试学习平台”，同时保留原有的纸张感、宋体大标题、酸绿 / 橙 / 蓝配色、细线分隔和滚动叙事。

## 当前版本重点

### 首页双科入口

首页现在先让用户选择科目：

- **申论学习**：当前重点完善
- **面试学习**：已建立栏目骨架，后续继续扩展

申论学习进一步拆成四个清晰入口：

1. **方法框架**：题型框架、核心能力、表达规则、实用技巧
   - 原“提分技巧”不再单独设栏目，而是并入各题型的关键提醒
   - 五大题型均已建立独立知识页
2. **真题精练**：国考真题、省考联考、地方真题
   - 题目、训练重点、参考作答方向和后续完整答案放在同一条真题记录中，不另设答案栏目
3. **写作积累**：按“理解内容 → 储备论据 → 打磨表达 → 组织成文”的学习顺序排列
4. **课程现场**：课程精讲、课堂实录、工作日常、碎片分享

四个入口使用不同主题色：蓝 / 橙 / 酸绿 / 紫灰，并在独立页面延续相同视觉记忆。

## 36 个静态路由

```text
通用（4）
/                                      首页
/questions/                            通用真题题库
/materials/                            通用学习资料
/tools/                                通用训练工具

申论主干（8）
/shenlun/                              申论学习地图
/shenlun/framework/                    方法框架
/shenlun/questions/                    真题精练
/shenlun/writing/                      写作积累
/shenlun/writing/hotspots/             热点时评目录
/shenlun/writing/cases/                案例素材目录
/shenlun/writing/metaphors/            比喻词库
/shenlun/videos/                       课程现场

热点分类（8）
/shenlun/writing/hotspots/development/ 发展与现代化
/shenlun/writing/hotspots/culture/     文化
/shenlun/writing/hotspots/people/      人民
/shenlun/writing/hotspots/government/  政府治理
/shenlun/writing/hotspots/grassroots/  基层治理
/shenlun/writing/hotspots/law/         法治
/shenlun/writing/hotspots/values/      价值观
/shenlun/writing/hotspots/era/         时代主题

案例分类（12）
/shenlun/writing/cases/people/         人物案例
/shenlun/writing/cases/practice/       实践案例
/shenlun/writing/cases/city/           城市治理
/shenlun/writing/cases/reform/         改革创新
/shenlun/writing/cases/technology/     科技创新
/shenlun/writing/cases/livelihood/     民生保障
/shenlun/writing/cases/law/            法治建设
/shenlun/writing/cases/negative/       反面案例
/shenlun/writing/cases/culture/        文化传承
/shenlun/writing/cases/rural/          乡村振兴
/shenlun/writing/cases/ecology/        生态文明
/shenlun/writing/cases/enterprise/     企业发展

面试（4）
/interview/methods/                    题型方法
/interview/questions/                  真题实战
/interview/expression/                 表达训练
/interview/videos/                     课程现场
```

静态路由清单的唯一数据源是 `app/site-routes.mjs`。两种静态构建都会导出并校验上述 36 个路由。

## 方法框架

当前结构：

- **题型框架**：归纳概括、综合分析、提出对策、贯彻执行、文章写作；每种题型内直接附关键提醒，并可进入独立知识页
- **核心能力**：阅读理解、归纳概括、综合分析、解决问题、文字表达
- **表达规则**：强调准确、简洁、有层次，先完成题目任务，再追求语言质量
- **实用技巧**：题干定位、主体识别、逻辑抓取、案例转译、材料分层、同类合并与限时复盘

五大题型独立知识页统一包含：

- 题型任务
- 审题抓手
- 材料处理
- 答案结构
- 高频提醒
- 常见误区
- 练习方向

后续可以继续在每页加入对应真题、采分点、教师批注和视频讲解。

## 题库现状

首批题库数据共 48 条：

- 申论：2020—2025 国考地市级主要作答任务 30 条
- 面试：2024—2026 税务系统公开考生回忆题索引 14 条
- 本站原创申论 / 面试专项仿真题 4 条

申论“真题精练”页面已经建立国考、省考联考和地方卷的长期档案结构。当前国考部分已经上线题意摘要、训练重点与参考作答方向；完整答案和地方卷会优先用本站原创整理、公开合法或获得授权的材料逐套补齐。

## 写作积累

八类内容按照学习理解顺序排列：

1. **热点时评**：先理解时代议题
2. **案例素材**：再储备真实论据
3. **规范用词**：先把话说准确
4. **比喻词库**：增加形象表达
5. **对仗句库**：训练句式与逻辑节奏
6. **主题佳句**：建立主题语言储备
7. **名人箴言**：作为辅助论据使用
8. **作文框架**：最后把已有内容组织成完整文章

案例素材统一按“背景—做法—成效—启示”整理；规范用词则帮助把材料中的口语化描述转成更准确的申论表达。

## 学习资料与工具

当前已有：

- 24 篇原创方法笔记
- 8 个长期资料目录
- 题库筛选 / 搜索 / 随机抽题
- 答题计时器
- 草稿与字数统计
- 答后自检
- 浏览器本地练习记录
- 每日一题 / 模拟抽题 / 五维自评工具

## 设计原则

- 不复制其他公考网站 UI，只参考内容组织和学习闭环
- 保留“答卷之外”的个人编辑设计感
- 不把首页做成资料超市，先建立清晰的科目与学习路径
- 真题不未经许可复制第三方整套材料或机构答案
- 原创题、考生回忆题、公开真题索引分别标注来源性质
- 所有方法尽量能迁移到下一道题，而不是只解释当前题

## 技术栈

- React 19
- Next.js 16
- TypeScript
- Vinext / Vite
- Tailwind CSS 4
- GitHub Actions
- GitHub Pages
- Tencent EdgeOne Pages

## 本地开发

需要 Node.js 22.13 或更高版本。Windows 下推荐直接双击根目录的 `start-local.cmd`，或在终端执行：

```powershell
.\start-local.cmd
```

启动器会校验 Node.js，在需要时执行 `npm ci`，准备本地音频，自动选择从 3000 开始的可用端口，并同时打印电脑和同一局域网手机的访问地址。脚本**不会修改 Windows 防火墙**。

手动开发流程：

```powershell
git clone https://github.com/WJAnnie/gongkao-teacher-website.git
cd gongkao-teacher-website
npm.cmd ci
npm.cmd run dev
```

提交前自动门禁：

```powershell
npm.cmd run verify
```

`verify` 会依次运行 ESLint、TypeScript 类型检查和 Node 测试。

### 两种静态构建配置

```powershell
# 根路径版：用于本地静态服务或 EdgeOne
npm.cmd run build:static

# GitHub Pages 版：默认使用 /gongkao-teacher-website/ 前缀
npm.cmd run build:static:pages
```

两个命令都会重建 `site/`，校验 36 个路由、基础路径和静态资产，并生成 `site/size-report.json`。GitHub Pages 的仓库名可由 `GITHUB_REPOSITORY`推导，也可用 `SITE_BASE_PATH` 显式覆盖。

### 内容与本地数据

- 本阶段的练习记录保存在当前浏览器 `localStorage` 中，不会自动上传或跨设备同步。
- `app/data/content-catalog.ts` 和 `app/data/practice-record-store.ts` 是未来接入数据库、管理后台或同步层的明确边界；现阶段不引入后端依赖。
- `public/audio/xiang-an.mp3` 是由 `node scripts/vendor-home-audio.mjs` 下载和验证的生成资产，已被 Git 忽略，不应提交占位或伪造的 MP3。`start-local.cmd` 和部署工作流会在启动/构建前准备它；上游音频 CDN 不可用时应明确报错。

## 内容继续扩展

下一阶段优先：

- 给五大题型知识页加入对应例题、采分点和完整作答示范
- 为国考真题逐套加入个人答案、批注与视频讲解
- 补省考联考、广东、江苏、浙江、山东、四川等地方申论真题
- 扩充热点、案例、规范用词、比喻、句式、佳句和名言数据库
- 接入真实课程视频、课堂录像、工作日常和短视频分享
- 继续完善“面试学习”对应的四个独立模块

---

**答卷之外**

愿你不只上岸，也拥有看清问题、形成判断并准确表达的能力。
