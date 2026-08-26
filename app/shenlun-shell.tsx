import type { ReactNode } from 'react';
import { LearningTopNav } from './learning-nav';

type ShenlunTone = 'framework' | 'questions' | 'writing' | 'videos' | 'home';

const toneToActive = {
  framework: 'shenlun-framework',
  questions: 'shenlun-questions',
  writing: 'shenlun-writing',
  videos: 'shenlun-videos',
} as const;

const routeLabels = ['方法框架', '真题精练', '写作积累', '课程现场'];

export function ShenlunShell({ tone, eyebrow, title, desc, children }: { tone: ShenlunTone; eyebrow: string; title: string; desc: string; children: ReactNode }) {
  const active = tone === 'home' ? undefined : toneToActive[tone];
  return (
    <main className={`shenlun-page ${tone} shenlun-tone-${tone}`}>
      <LearningTopNav active={active} />

      <header className="shenlun-hero">
        <div className="shenlun-hero-topline">
          <span>申 / SHENLUN</span>
          <span>答卷之外 · 申论学习</span>
        </div>
        <p className="shenlun-hero-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="shenlun-hero-bottom">
          <p>{desc}</p>
          <div className="shenlun-route-strip" aria-label="申论学习路径">
            {routeLabels.map((label, index) => (
              <span className={tone !== 'home' && index === Object.keys(toneToActive).indexOf(tone) ? 'active' : ''} key={label}>
                0{index + 1} {label}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="shenlun-color-line" aria-hidden="true" />
      {children}

      <footer className="shenlun-footer">
        <div>
          <span>申论学习</span>
          <a href="/shenlun/framework/">方法框架</a>
          <a href="/shenlun/questions/">真题精练</a>
          <a href="/shenlun/writing/">写作积累</a>
          <a href="/shenlun/videos/">课程现场</a>
        </div>
        <div>
          <span>面试学习</span>
          <a href="/interview/methods/">题型方法</a>
          <a href="/interview/questions/">真题实战</a>
          <a href="/interview/expression/">表达训练</a>
          <a href="/interview/videos/">课程现场</a>
        </div>
        <p>答卷之外 · 申论 × 结构化面试</p>
      </footer>
    </main>
  );
}
