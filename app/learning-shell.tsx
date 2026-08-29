import Link from 'next/link';
import type { ReactNode } from 'react';

export function LearningShell({ eyebrow, title, desc, children }: { eyebrow: string; title: string; desc: string; children: ReactNode }) {
  return (
    <main className="learning-page-shell">
      <nav className="nav-shell" aria-label="学习站导航">
        <Link className="brand" href="/" aria-label="答卷之外首页">
          <span className="brand-mark">答</span>
          <span>答卷之外</span>
        </Link>
        <div className="nav-links">
          <Link href="/questions/">真题题库</Link>
          <Link href="/materials/">学习资料</Link>
          <Link href="/tools/">训练工具</Link>
          <Link href="/#about">关于我</Link>
        </div>
        <Link className="nav-cta" href="/">返回首页 <span>↗</span></Link>
      </nav>

      <header className="learning-page-hero">
        <p className="eyebrow"><span>答</span>{eyebrow}</p>
        <h1>{title}</h1>
        <p>{desc}</p>
        <div className="learning-page-links">
          <Link href="/questions/">真题题库</Link>
          <Link href="/materials/">学习资料</Link>
          <Link href="/tools/">训练工具</Link>
        </div>
      </header>

      {children}

      <footer>
        <Link className="brand footer-brand" href="/"><span className="brand-mark">答</span><span>答卷之外</span></Link>
        <p>申论 × 结构化面试 · 学方法，做真题，限时练，及时复盘。</p>
        <Link href="/">返回首页 ↑</Link>
      </footer>
    </main>
  );
}
