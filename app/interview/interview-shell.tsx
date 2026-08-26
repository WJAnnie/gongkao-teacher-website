import type { ReactNode } from 'react';

type InterviewTone = 'methods' | 'questions' | 'expression' | 'videos';

const nav = [
  ['题型方法', '/interview/methods/'],
  ['真题实战', '/interview/questions/'],
  ['表达训练', '/interview/expression/'],
  ['课程现场', '/interview/videos/'],
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
      <header className="interview-site-nav">
        <a className="interview-site-brand" href="/">
          <span>答</span>
          <b>答卷之外</b>
        </a>
        <nav aria-label="面试学习导航">
          {nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <a className="interview-home-link" href="/">返回首页 ↖</a>
      </header>

      <section className="interview-site-hero">
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <div>
          <span>INTERVIEW / 结构化面试</span>
          <p>{desc}</p>
        </div>
      </section>

      {children}
    </main>
  );
}
