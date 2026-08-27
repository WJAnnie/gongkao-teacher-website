'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FrameworkExpressionArticle } from './framework-expression-article';

const chapters = [
  { id: 'expression-know', no: '01', label: '认识申论' },
  { id: 'expression-sheet', no: '02', label: '认识答题卡' },
  { id: 'expression-audit', no: '03', label: '学会审题' },
  { id: 'expression-read', no: '04', label: '学会读材料' },
  { id: 'expression-transform', no: '05', label: '从材料到答案' },
  { id: 'expression-logic', no: '06', label: '组织答案' },
  { id: 'expression-finish', no: '07', label: '完成一道题' },
] as const;

function ChapterHand({ number }: { number: number }) {
  const common = <path d="M35 42c-7 2-11 8-10 15 1 10 10 17 22 17 13 0 23-8 24-20 1-8-3-13-10-14" />;
  return (
    <span className={`expression-chapter-hand hand-${number}`} aria-label={`第${number}节`}>
      <svg viewBox="0 0 96 92" role="img">
        {common}
        {number === 2 && <><path d="M40 47V18c0-5 8-5 8 0v27" /><path d="M54 44V12c0-5 8-5 8 0v33" /><path d="M35 54c-9-9-16-8-17-3-1 6 8 12 18 15" /></>}
        {number === 3 && <><path d="M35 46V21c0-5 8-5 8 0v24" /><path d="M48 44V13c0-5 8-5 8 0v31" /><path d="M61 45V19c0-5 8-5 8 0v28" /><path d="M34 54c-8-7-15-7-16-2-1 6 7 11 17 14" /></>}
        {number === 4 && <><path d="M31 48V27c0-5 7-5 7 0v19" /><path d="M41 45V18c0-5 7-5 7 0v27" /><path d="M51 44V14c0-5 7-5 7 0v30" /><path d="M61 46V21c0-5 7-5 7 0v26" /><path d="M31 55c-9-7-15-6-16-1-1 6 8 11 18 14" /></>}
        {number === 5 && <><path d="M29 49V29c0-5 7-5 7 0v18" /><path d="M39 46V18c0-5 7-5 7 0v27" /><path d="M49 44V13c0-5 7-5 7 0v31" /><path d="M59 45V17c0-5 7-5 7 0v29" /><path d="M69 50V27c0-5 7-5 7 0v29" /><path d="M29 57c-10-8-17-7-18-1-1 7 9 13 20 15" /></>}
        {number === 6 && <><path d="M36 48V31c0-6 8-6 8 0v16" /><path d="M62 49V24c0-6 8-6 8 0v30" /><path d="M34 55c-8 1-18-4-20-10-2-5 4-9 9-5l13 9" /><path d="M69 54c8 0 14 5 13 10-1 5-8 7-16 5" /></>}
        {number === 7 && <><path d="M36 51c4-13 12-25 20-34 4-4 10 1 7 6L52 38" /><path d="M55 42c8-9 16-13 21-9 5 5 0 12-8 18" /><path d="M36 55c-8-2-16 1-17 7-1 6 7 10 18 9" /><circle cx="63" cy="41" r="7" /></>}
      </svg>
      <small>{String(number).padStart(2, '0')}</small>
    </span>
  );
}

export function FrameworkExpressionStepper({ onActiveChapterChange }: { onActiveChapterChange?: (index: number) => void }) {
  const [chapterTargets, setChapterTargets] = useState<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const targets = chapters.map((chapter) => document.getElementById(chapter.id));
    setChapterTargets(targets);

    const visibleTargets = targets.filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = chapters.findIndex((chapter) => chapter.id === visible.target.id);
      if (index >= 0) onActiveChapterChange?.(index);
    }, { rootMargin: '-18% 0px -58% 0px', threshold: [0, .08, .2, .4] });

    visibleTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [onActiveChapterChange]);

  const goToChapter = (index: number) => {
    const safeIndex = Math.max(0, Math.min(index, chapters.length - 1));
    document.getElementById(chapters[safeIndex].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="expression-stepper">
      <FrameworkExpressionArticle />
      {chapterTargets.map((target, index) => {
        if (!target || index >= chapters.length - 1) return null;
        const next = chapters[index + 1];
        return createPortal(
          <a href={`#${next.id}`} className="expression-next-link" onClick={(event) => { event.preventDefault(); goToChapter(index + 1); }}>
            <span>CONTINUE READING / 继续阅读</span>
            <ChapterHand number={index + 2} />
            <b>{next.label}</b>
            <em>↘</em>
          </a>,
          target,
        );
      })}
    </div>
  );
}
