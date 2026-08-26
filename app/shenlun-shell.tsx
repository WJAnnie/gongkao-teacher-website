import type { ReactNode } from 'react';

type ShenlunTone = 'framework' | 'questions' | 'writing' | 'videos' | 'home';

export function ShenlunShell({ tone, eyebrow, title, desc, children }: { tone: ShenlunTone; eyebrow: string; title: string; desc: string; children: ReactNode }) {
  return (
    <main className={`shenlun-page shenlun-tone-${tone}`}>
      <nav className="shenlun-nav" aria-label="申论学习导航">
        <a className="shenlun-brand" href="/"><span>答</span><b>答卷之外</b></a>
        <div>
          <a href="/shenlun/framework/">方法框架</a>
          <a href="/shenlun/questions/">真题精练</a>
          <a href="/shenlun/writing/">写作积累</a>
          <a href="/shenlun/videos/">课程现场</a>
        </div>
        <a className="shenlun-back" href="/">返回首页 ↗</a>
      </nav>

      <header className="shenlun-hero">
        <span className="shenlun-hero-index">申 / SHENLUN</span>
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <div className="shenlun-hero-bottom">
          <p>{desc}</p>
          <span aria-hidden="true">↓</span>
        </div>
      </header>

      {children}

      <footer className="shenlun-footer">
        <a href="/shenlun/">申论学习地图</a>
        <p>方法框架 → 真题精练 → 写作积累 → 课程现场</p>
        <a href="/">答卷之外 ↑</a>
      </footer>
    </main>
  );
}
