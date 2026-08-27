import type { Metadata } from 'next';
import './globals.css';
import './content-enrichment.css';
import './study-hub.css';
import './material-reader.css';
import './advanced-tools.css';
import './subject-gateway.css';
import './learning-nav.css';
import './shenlun-learning.css';
import './question-type-knowledge.css';
import './interview/interview-learning.css';
import './learning-page-refinement.css';
import './learning-route-themes.css';
import './exam-review.css';
import './exam-question-details.css';
import './hero-review-orbit.css';
import './home-about.css';
import './mobile-refinement.css';
import './home-learning-repeat.css';
import './learning-page-upgrade.css';
import './home-refresh.css';
import './learning-page-guide-polish.css';
import './hero-content-index.css';
import './learning-hero-standard.css';
import './home-song-player.css';
import './home-song-placement.css';
import './shenlun/framework/framework-expression.css';
import './shenlun/framework/framework-expression-stepper.css';
import './shenlun/framework/framework-manual.css';
import './shenlun/framework/framework-expression-article.css';
import './shenlun/framework/framework-types-article.css';
import './shenlun/framework/framework-types-depth.css';
import './shenlun/framework/framework-types-v4.css';
import './shenlun/framework/framework-abilities.css';
import './shenlun/framework/framework-expression-polish.css';
import './shenlun/framework/framework-expression-reading-refine.css';
import './shenlun/framework/framework-layout-centering.css';
import './shenlun/framework/framework-voice-reading.css';
import './shenlun/framework/framework-deep-enrichment.css';
import './shenlun/framework/framework-tips-articles.css';
import './menu-hierarchy-refinement.css';
import './interaction-semantics.css';
import './clickable-menu-affordance.css';
import './framework-scene-transition.css';
import './entry-badge-unification.css';
import './mobile-home-learning-nav.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? 'http://localhost:3000'),
  title: '答卷之外｜申论与面试学习站',
  description: '专注申论与结构化面试：历年真题索引、专项练习、学习资料、素材积累、答题计时与复盘工具。',
  openGraph: {
    title: '答卷之外｜申论与面试学习站',
    description: '把公考题做懂，把话说清。这里有申论与面试真题、方法资料、素材积累和训练工具。',
    type: 'website',
    locale: 'zh_CN',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '答卷之外：申论与面试学习站' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '答卷之外｜申论与面试学习站',
    description: '把公考题做懂，把话说清。申论与面试真题、方法资料、素材积累和训练工具。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
