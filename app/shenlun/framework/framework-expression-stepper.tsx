'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FrameworkExpressionArticle } from './framework-expression-article';
import { ExpressionDeep } from './framework-deep-enrichment';

const chapters = [
  { id: 'expression-know', no: '01', label: '认识申论' },
  { id: 'expression-sheet', no: '02', label: '认识答题卡' },
  { id: 'expression-audit', no: '03', label: '学会审题' },
  { id: 'expression-read', no: '04', label: '学会读材料' },
  { id: 'expression-transform', no: '05', label: '从材料到答案' },
  { id: 'expression-logic', no: '06', label: '组织答案' },
  { id: 'expression-finish', no: '07', label: '完成一道题' },
] as const;

function ChapterMark({ number }: { number: number }) {
  return (
    <span className="expression-chapter-mark" aria-label={`第${number}节`}>
      <svg viewBox="0 0 96 96" role="img" aria-hidden="true">
        <circle className="mark-orbit" cx="48" cy="48" r="31" />
        <path className="mark-arc" d="M21 53c9-18 25-29 47-31" />
        <path className="mark-arc mark-arc-secondary" d="M29 70c15-10 30-13 48-8" />
        <circle className="mark-dot" cx="72" cy="25" r="4.5" />
        <path className="mark-axis" d="M48 11v12M48 73v12M11 48h12M73 48h12" />
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
      {chapterTargets.map((target, index) => target ? createPortal(<ExpressionDeep id={chapters[index].id} />, target) : null)}
      {chapterTargets.map((target, index) => {
        if (!target || index >= chapters.length - 1) return null;
        const next = chapters[index + 1];
        return createPortal(
          <a href={`#${next.id}`} className="expression-next-link" onClick={(event) => { event.preventDefault(); goToChapter(index + 1); }}>
            <span>CONTINUE READING / 继续阅读</span>
            <ChapterMark number={index + 2} />
            <b>{next.label}</b>
            <em>↘</em>
          </a>,
          target,
        );
      })}
    </div>
  );
}
