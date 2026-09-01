import type { ReactNode } from 'react';
import { LearningPageFrame } from './learning-page-frame';
import { LearningTopNav } from './learning-nav';
import { LearningPageEffects } from './learning-page-effects';
import { interviewRoutes, learningPageChapters, shenlunRoutes } from './learning-routes';

type ShenlunTone = 'framework' | 'questions' | 'writing' | 'videos' | 'home';

const toneToActive = {
  framework: 'shenlun-framework',
  questions: 'shenlun-questions',
  writing: 'shenlun-writing',
  videos: 'shenlun-videos',
} as const;

export function ShenlunShell({ tone, eyebrow, title, desc, children }: { tone: ShenlunTone; eyebrow: string; title: string; desc: string; children: ReactNode }) {
  if (tone === 'home') return <ShenlunHomeShell desc={desc} eyebrow={eyebrow} title={title}>{children}</ShenlunHomeShell>;

  const active = toneToActive[tone];
  return <LearningPageFrame
    active={active}
    chapters={learningPageChapters[active]}
    desc={desc}
    eyebrow={eyebrow}
    legacyClassName={`shenlun-page ${tone} shenlun-tone-${tone}`}
    subject="shenlun"
    title={title}
  >{children}</LearningPageFrame>;
}

function ShenlunHomeShell({ eyebrow, title, desc, children }: { eyebrow: string; title: string; desc: string; children: ReactNode }) {
  const tone = 'home';
  const active: string | undefined = undefined;
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
        </div>
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
