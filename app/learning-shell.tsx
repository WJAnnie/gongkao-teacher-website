import type { ReactNode } from 'react';

export function LearningShell({ eyebrow, title, desc, children }: { eyebrow: string; title: string; desc: string; children: ReactNode }) {
  return (
    <main className="learning-page-shell">
      <nav className="nav-shell" aria-label="学习站导航">
        <a className="brand" href="/" aria-label="答卷之外首页">
          <span className="brand-mark">答</span>
          <span>答卷之外</span>
        </a>
        <div className="nav-links">
          <a href="/questions/">真题题库</a>
          <a href="/materials/">学习资料</a>
          <a href="/tools/">训练工具</a>
          <a href="/#about">关于我</a>
        </div>
        <a className="nav-cta" href="/">返回首页 <span>↗</span></a>
      </nav>

      <header className="learning-page-hero">
        <p className="eyebrow"><span>答</span>{eyebrow}</p>
        <h1>{title}</h1>
        <p>{desc}</p>
        <div className="learning-page-links">
          <a href="/questions/">真题题库</a>
          <a href="/materials/">学习资料</a>
          <a href="/tools/">训练工具</a>
        </div>
      </header>

      {children}

      <footer>
        <a className="brand footer-brand" href="/"><span className="brand-mark">答</span><span>答卷之外</span></a>
        <p>申论 × 结构化面试 · 学方法，做真题，限时练，及时复盘。</p>
        <a href="/">返回首页 ↑</a>
      </footer>
    </main>
  );
}
