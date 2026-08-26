import type { ReactNode } from 'react';
import { LearningTopNav } from '../learning-nav';

type InterviewTone = 'methods' | 'questions' | 'expression' | 'videos';

const toneToActive = {
  methods: 'interview-methods',
  questions: 'interview-questions',
  expression: 'interview-expression',
  videos: 'interview-videos',
} as const;

const routeLabels = ['题型方法', '真题实战', '表达训练', '课程现场'];

export function InterviewShell({
  tone,
  eyebrow,
  title,
  desc,
  children,
}: {
  tone: InterviewTone;
  eyebrow: string;
  title: string;
  desc: string;
  children: ReactNode;
}) {
  const activeIndex = Object.keys(toneToActive).indexOf(tone);
  return (
    <main className={`interview-site interview-tone-${tone}`}>
      <LearningTopNav active={toneToActive[tone]} />

      <section className="interview-site-hero">
        <div className="interview-hero-topline">
          <span>面 / INTERVIEW</span>
          <span>答卷之外 · 结构化面试</span>
        </div>
        <p className="interview-hero-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="interview-hero-bottom">
          <p>{desc}</p>
          <div className="interview-route-strip" aria-label="面试学习路径">
            {routeLabels.map((label, index) => (
              <span className={activeIndex === index ? 'active' : ''} key={label}>0{index + 1} {label}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="interview-color-line" aria-hidden="true" />
      {children}

      <footer className="interview-footer">
        <div>
          <span>面试学习</span>
          <a href="/interview/methods/">题型方法</a>
          <a href="/interview/questions/">真题实战</a>
          <a href="/interview/expression/">表达训练</a>
          <a href="/interview/videos/">课程现场</a>
        </div>
        <div>
          <span>申论学习</span>
          <a href="/shenlun/framework/">方法框架</a>
          <a href="/shenlun/questions/">真题精练</a>
          <a href="/shenlun/writing/">写作积累</a>
          <a href="/shenlun/videos/">课程现场</a>
        </div>
        <p>答卷之外 · 申论 × 结构化面试</p>
      </footer>
    </main>
  );
}
