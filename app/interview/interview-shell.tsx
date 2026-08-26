import type { ReactNode } from 'react';
import { LearningTopNav } from '../learning-nav';

type InterviewTone = 'methods' | 'questions' | 'expression' | 'videos';

const toneToActive = {
  methods: 'interview-methods',
  questions: 'interview-questions',
  expression: 'interview-expression',
  videos: 'interview-videos',
} as const;

const toneToTraining = {
  methods: '题型专项',
  questions: '真题模拟',
  expression: '开口训练',
  videos: '课堂笔记',
} as const;

const routes = [
  { tone: 'methods', label: '题型方法', href: '/interview/methods/' },
  { tone: 'questions', label: '真题实战', href: '/interview/questions/' },
  { tone: 'expression', label: '表达训练', href: '/interview/expression/' },
  { tone: 'videos', label: '课程现场', href: '/interview/videos/' },
] as const;

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
  return (
    <main className={`interview-site interview-tone-${tone}`}>
      <LearningTopNav active={toneToActive[tone]} />

      <section className="interview-site-hero">
        <div className="interview-hero-topline">
          <span>面 / INTERVIEW</span>
          <span>答卷之外 · 结构化面试</span>
        </div>
        <span className="exam-review-stamp" aria-hidden="true">阅</span>
        <p className="interview-hero-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="exam-meta-strip" aria-label="面试训练信息">
          <span>科目 <b>结构化面试</b></span>
          <span>训练 <b>{toneToTraining[tone]}</b></span>
          <span>复盘 <b>审题 · 观点 · 结构 · 表达</b></span>
        </div>
        <div className="interview-hero-bottom">
          <p>{desc}</p>
          <nav className="interview-route-strip" aria-label="面试学习路径">
            {routes.map((item, index) => (
              <a
                className={`route-${item.tone}${tone === item.tone ? ' active' : ''}`}
                href={item.href}
                key={item.tone}
              >
                <span>0{index + 1}</span>
                <b>{item.label}</b>
              </a>
            ))}
          </nav>
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
