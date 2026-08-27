import type { ReactNode } from 'react';
import { LearningTopNav } from './learning-nav';
import { LearningPageEffects, PageGuide, type GuideItem } from './learning-page-effects';
import { FrameworkHeroMenu } from './shenlun/framework/framework-hero-menu';

type ShenlunTone = 'framework' | 'questions' | 'writing' | 'videos' | 'home';

const toneToActive = {
  framework: 'shenlun-framework',
  questions: 'shenlun-questions',
  writing: 'shenlun-writing',
  videos: 'shenlun-videos',
} as const;

const toneToTraining = {
  framework: '专项方法',
  questions: '真题训练',
  writing: '写作积累',
  videos: '课程笔记',
  home: '学习总览',
} as const;

const routes = [
  { tone: 'framework', label: '方法框架', href: '/shenlun/framework/' },
  { tone: 'questions', label: '真题精练', href: '/shenlun/questions/' },
  { tone: 'writing', label: '写作积累', href: '/shenlun/writing/' },
  { tone: 'videos', label: '课程现场', href: '/shenlun/videos/' },
] as const;

const guides: Record<Exclude<ShenlunTone, 'home'>, GuideItem[]> = {
  framework: [
    { no: '01', label: '表达规则', selector: '#framework-expression' },
    { no: '02', label: '题型框架', selector: '#framework-types' },
    { no: '03', label: '核心能力', selector: '#framework-abilities' },
    { no: '04', label: '实用技巧', selector: '#framework-tips' },
  ],
  questions: [
    { no: '01', label: '按年份看', selector: '.shenlun-map-card:nth-child(1)' },
    { no: '02', label: '按题型练', selector: '.shenlun-map-card:nth-child(2)' },
    { no: '03', label: '按主题复盘', selector: '.shenlun-map-card:nth-child(3)' },
    { no: '04', label: '真题索引', selector: '.shenlun-question-list' },
  ],
  writing: [
    { no: '01', label: '热点时评', selector: '.writing-category:nth-child(1)' },
    { no: '02', label: '案例素材', selector: '.writing-category:nth-child(2)' },
    { no: '03', label: '规范用词', selector: '.writing-category:nth-child(3)' },
    { no: '04', label: '比喻词库', selector: '.writing-category:nth-child(4)' },
    { no: '05', label: '对仗句库', selector: '.writing-category:nth-child(5)' },
    { no: '06', label: '主题佳句', selector: '.writing-category:nth-child(6)' },
    { no: '07', label: '名人箴言', selector: '.writing-category:nth-child(7)' },
    { no: '08', label: '作文框架', selector: '.writing-category:nth-child(8)' },
  ],
  videos: [
    { no: '01', label: '课程精讲', selector: '.video-card:nth-child(1)' },
    { no: '02', label: '课堂实录', selector: '.video-card:nth-child(2)' },
    { no: '03', label: '工作日常', selector: '.video-card:nth-child(3)' },
    { no: '04', label: '碎片分享', selector: '.video-card:nth-child(4)' },
  ],
};

export function ShenlunShell({ tone, eyebrow, title, desc, children }: { tone: ShenlunTone; eyebrow: string; title: string; desc: string; children: ReactNode }) {
  const active = tone === 'home' ? undefined : toneToActive[tone];
  const guide = tone === 'home' ? [] : guides[tone];
  return (
    <main className={`shenlun-page ${tone} shenlun-tone-${tone}`}>
      <LearningPageEffects />
      <LearningTopNav active={active} />
      <header className={`shenlun-hero${tone === 'home' ? '' : ' learning-hero-standard'}`}>
        <div className="shenlun-hero-topline"><span>申 / SHENLUN</span><span>答卷之外 · 申论学习</span></div>
        <span className="exam-review-stamp" aria-hidden="true">阅</span>
        <p className="shenlun-hero-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="exam-meta-strip" aria-label="申论训练信息"><span>科目 <b>申论</b></span><span>训练 <b>{toneToTraining[tone]}</b></span><span>复盘 <b>审题 · 要点 · 结构 · 表达</b></span></div>
        <div className="shenlun-hero-bottom">
          <p>{desc}</p>
          {tone === 'framework' ? (
            <FrameworkHeroMenu />
          ) : (
            <nav className="shenlun-route-strip" aria-label="申论学习路径">
              {routes.map((item, index) => <a className={`route-${item.tone}${tone === item.tone ? ' active' : ''}`} href={item.href} key={item.tone}><span>0{index + 1}</span><b>{item.label}</b></a>)}
            </nav>
          )}
        </div>
        {guide.length > 0 && tone !== 'framework' && <PageGuide items={guide} embedded />}
      </header>
      <div className="shenlun-color-line" aria-hidden="true" />
      {children}
      <footer className="shenlun-footer">
        <div><span>申论学习</span><a href="/shenlun/framework/">方法框架</a><a href="/shenlun/questions/">真题精练</a><a href="/shenlun/writing/">写作积累</a><a href="/shenlun/videos/">课程现场</a></div>
        <div><span>面试学习</span><a href="/interview/methods/">题型方法</a><a href="/interview/questions/">真题实战</a><a href="/interview/expression/">表达训练</a><a href="/interview/videos/">课程现场</a></div>
        <p>答卷之外 · 申论 × 结构化面试</p>
      </footer>
    </main>
  );
}
