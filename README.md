# 答卷之外｜公考教师个人内容站

> 公考不是背标准答案。这里是一位申论与面试老师的长期内容站：记录素材、拆解真题、复盘课堂，也练习如何把自己的判断说清楚。

## 在线访问

**网站地址：** https://wjannie.github.io/gongkao-teacher-website/

仓库地址：https://github.com/WJAnnie/gongkao-teacher-website

项目目前配置了 **GitHub Pages + Tencent EdgeOne Pages** 两套自动部署流程。`master` 分支更新后，可由 GitHub Actions 自动构建并发布。

---

## 项目定位

「答卷之外」不是一个标准答案仓库，也不想做成纯资料堆积站。

它更像一间持续生长的公考思考练习室，希望围绕三个问题长期积累内容：

- 如何从材料里真正看见问题；
- 如何把零散信息组织成自己的判断；
- 如何在申论和面试中自然、准确、有结构地表达出来。

网站主要面向正在准备公务员考试、事业单位考试及相关结构化面试的学习者，同时也作为教师个人内容、课堂方法和长期教学思考的展示空间。

## 网站内容

### 从哪开始

根据不同备考阶段和常见卡点提供阅读入口，例如：

- 刚开始备考：先建立考试与科目地图；
- 申论进入瓶颈：从材料阅读、采分点和结构入手；
- 面试表达模板化：训练判断、论证和自然表达；
- 想系统积累素材：按主题建立自己的素材索引。

### 内容档案

长期整理并持续更新：

- 申论素材
- 真题拆解
- 阅读方法
- 归纳概括
- 对策题方法
- 面试表达
- 结构化面试
- 课堂复盘
- 表达训练

### 素材地图

素材不按“万能金句”堆积，而是按可以迁移到真实题目的主题组织，包括：

- 政策理论
- 基层治理
- 经济发展
- 文化建设
- 社会民生
- 生态文明

每个主题更关注“现象—问题—原因—影响—做法—案例”之间的联系，让素材最终能够服务观点，而不是只停留在背诵层面。

### 课堂切片

保留课堂中那些真正让人“突然想明白”的瞬间，包括：

- 对策题中的主体意识；
- 例证如何服务观点；
- 如何摆脱模板化表达；
- 如何从一道题复盘出可迁移的方法。

后续可以持续替换为真实课堂视频或音频片段。

### 方法路径

网站把申论与面试训练归纳为一条连续的思考路径：

1. **看见问题 SEE**：识别主体、关系与矛盾；
2. **形成判断 THINK**：把信息组织成自己的观点；
3. **清楚表达 SPEAK**：让结构服务内容；
4. **复盘迁移 GROW**：从一道题找到下一道题也能使用的方法。

## 设计原则

这个项目有意保留个人内容站而非传统知识库的视觉表达。

当前设计语言包括：

- 纸张质感的浅色背景；
- 宋体大标题与现代无衬线正文组合；
- 酸绿色、橙色、蓝色作为强调色；
- 细线、编号、档案卡片等编辑设计元素；
- 滚动驱动的 Hero、内容档案和方法路径动效；
- 桌面端与移动端响应式布局。

内容扩充时的原则是：**可以参考优秀公考网站的内容组织方式，但不复制其视觉设计。**

## 技术栈

- React 19
- Next.js 16
- TypeScript
- Vinext / Vite
- Tailwind CSS 4
- GitHub Actions
- GitHub Pages
- Tencent EdgeOne Pages

## 项目结构

```text
.
├── app/
│   ├── page.tsx                 # 首页主要内容结构
│   ├── layout.tsx               # 页面布局与 Metadata
│   ├── globals.css              # 全站主视觉与响应式样式
│   ├── content-enrichment.css   # 内容扩展模块样式
│   └── motion-layer.tsx         # 滚动、视差与 Reveal 动效
├── public/
│   └── og.png                   # 社交分享图片
├── scripts/
│   └── build-github-pages.mjs   # 静态站点构建脚本
├── .github/workflows/
│   ├── deploy-pages.yml         # GitHub Pages 自动部署
│   └── deploy-edgeone.yml       # EdgeOne 自动部署
├── package.json
└── README.md
```

## 本地开发

建议使用 Node.js 22 或更高版本。

```bash
git clone https://github.com/WJAnnie/gongkao-teacher-website.git
cd gongkao-teacher-website
npm install
npm run dev
```

启动后按照终端输出的本地地址访问项目。

## 构建

普通构建：

```bash
npm run build
```

生成用于静态部署的站点文件：

```bash
npm run build:static
```

静态产物会由项目脚本整理到 `site/` 目录，用于 GitHub Pages / EdgeOne Pages 发布。

## 自动部署

### GitHub Pages

`.github/workflows/deploy-pages.yml` 会在 `master` 分支发生 push 后自动：

1. 安装依赖；
2. 构建应用；
3. 生成静态站点；
4. 上传 GitHub Pages artifact；
5. 发布到 GitHub Pages。

线上访问：

**https://wjannie.github.io/gongkao-teacher-website/**

### EdgeOne Pages

`.github/workflows/deploy-edgeone.yml` 同样监听 `master` 分支，并使用 EdgeOne CLI 发布 production 环境。

EdgeOne 的自动部署结果可能返回带临时访问参数的 URL，因此 README 不固化一次性 token 链接；具体部署地址和状态可在仓库的 GitHub Actions 运行记录中查看。

## 后续内容计划

这个网站更适合持续更新，而不是一次性“做完”。后续可以逐步补入：

- [ ] 真实教师姓名与个人介绍
- [ ] 教学经历与课程方向
- [ ] 真实学员反馈或学习案例
- [ ] 申论文章详情页
- [ ] 面试题目与答题复盘
- [ ] 高频主题素材专题页
- [ ] 真实课堂视频 / 音频
- [ ] 微信二维码与联系方式
- [ ] 免费资料下载入口
- [ ] 内容搜索与标签筛选

## 内容原则

这个站点希望长期坚持几件事：

- 不押万能模板；
- 不为了显得专业而虚构履历与成果；
- 素材必须能够服务观点；
- 方法应该能够迁移到下一道题；
- 比起“教你怎么答”，更在意你是否真的想清楚。

---

**答卷之外**

愿你不只上岸，也拥有看清问题的能力。
