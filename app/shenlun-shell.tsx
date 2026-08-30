import type { ReactNode } from 'react';
import { LearningTopNav } from './learning-nav';
import { LearningPageEffects, PageGuide, type GuideItem } from './learning-page-effects';
import { interviewRoutes, shenlunRoutes } from './learning-routes';
import { FrameworkHeroMenu } from './shenlun/framework/framework-hero-menu';
import { WritingHeroMenu } from './shenlun/writing/writing-hero-menu';

type ShenlunTone = 'framework' | 'questions' | 'writing' | 'videos' | 'home';

const toneToActive = {
  framework: 'shenlun-framework',
  questions: 'shenlun-questions',
  writing: 'shenlun-writing',
  videos: 'shenlun-videos',
} as const;

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
  writing: [],
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
        <div className="shenlun-hero-bottom">
          <p>{desc}</p>
          {tone === 'framework' ? (
            <FrameworkHeroMenu />
          ) : tone === 'writing' ? (
            <WritingHeroMenu />
          ) : (
            <nav className="shenlun-route-strip" aria-label="申论学习路径">
              {shenlunRoutes.map((item, index) => (
                <a
                  className={`route-${item.key.replace('shenlun-', '')}${active === item.key ? ' active' : ''}`}
                  href={item.href}
                  key={item.key}
                  aria-current={active === item.key ? 'page' : undefined}
                >
                  <span>0{index + 1}</span><b>{item.label}</b>
                </a>
              ))}
            </nav>
          )}
        </div>
        {guide.length > 0 && tone !== 'framework' && <PageGuide items={guide} embedded />}
      </header>
      <div className="shenlun-color-line" aria-hidden="true" />
      {children}
      <footer className="shenlun-footer">
        <div><span>申论学习</span>{shenlunRoutes.map((item) => <a href={item.href} key={item.key}>{item.label}</a>)}</div>
        <div><span>面试学习</span>{interviewRoutes.map((item) => <a href={item.href} key={item.key}>{item.label}</a>)}</div>
        <p>答卷之外 · 申论 × 结构化面试</p>
      </footer>
    </main>
  );
}
