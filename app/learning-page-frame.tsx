import type { ReactNode } from 'react';
import { LearningPageEffects } from './learning-page-effects';
import { LearningTopNav } from './learning-nav';
import {
  LearningChapterProvider,
  LearningHeroChapterStrip,
} from './learning-chapter-navigation';
import {
  interviewRoutes,
  shenlunRoutes,
  type LearningMacroChapter,
  type LearningRouteKey,
} from './learning-routes';

export type LearningSubject = 'shenlun' | 'interview';

export function LearningPageFrame({
  active,
  chapters,
  children,
  desc,
  eyebrow,
  legacyClassName,
  subject,
  title,
}: {
  active: LearningRouteKey;
  chapters: readonly LearningMacroChapter[];
  children: ReactNode;
  desc: string;
  eyebrow: string;
  legacyClassName: string;
  subject: LearningSubject;
  title: string;
}) {
  const primary = subject === 'shenlun' ? shenlunRoutes : interviewRoutes;
  const secondary = subject === 'shenlun' ? interviewRoutes : shenlunRoutes;
  const subjectLabel = subject === 'shenlun' ? '申论' : '结构化面试';
  const subjectName = subject === 'shenlun' ? '申论学习' : '结构化面试';
  const secondaryName = subject === 'shenlun' ? '面试学习' : '申论学习';

  return <LearningChapterProvider chapters={chapters}>
    <main className={`${legacyClassName} learning-page-frame`} data-learning-subject={subject}>
      <LearningPageEffects />
      <LearningTopNav active={active} />
      <header className="learning-page-hero">
        <div className="learning-hero-topline"><span>{subjectLabel}</span><span>答卷之外 · {subjectName}</span></div>
        <span className="exam-review-stamp" aria-hidden="true">阅</span>
        <p className="learning-hero-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="learning-hero-bottom">
          <p>{desc}</p>
          <LearningHeroChapterStrip />
        </div>
      </header>
      <div className="learning-page-color-line" aria-hidden="true" />
      {children}
      <footer className="learning-page-footer">
        <div><span>{subjectName}</span>{primary.map((item) => <a href={item.href} key={item.key}>{item.label}</a>)}</div>
        <div><span>{secondaryName}</span>{secondary.map((item) => <a href={item.href} key={item.key}>{item.label}</a>)}</div>
        <p>答卷之外 · 申论 × 结构化面试</p>
      </footer>
    </main>
  </LearningChapterProvider>;
}
