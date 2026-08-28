'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FrameworkTypeArticleReviewed, TypeDeepReviewed } from './framework-content-review-v2';

export const typeChapters = [
  { id: 'type-summary', slug: 'summary', no: '01', label: '归纳概括' },
  { id: 'type-analysis', slug: 'analysis', no: '02', label: '综合分析' },
  { id: 'type-solution', slug: 'solution', no: '03', label: '提出对策' },
  { id: 'type-implementation', slug: 'implementation', no: '04', label: '公文写作' },
  { id: 'type-essay', slug: 'essay', no: '05', label: '文章写作' },
] as const;

function ChapterMark({ number }: { number: number }) {
  return (
    <span className="expression-chapter-mark type-chapter-mark" aria-label={`第${number}题型`}>
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

export function FrameworkTypeStepper({ onActiveTypeChange }: { onActiveTypeChange?: (slug: string) => void }) {
  const [chapterTargets, setChapterTargets] = useState<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const targets = typeChapters.map((chapter) => document.getElementById(chapter.id));
    setChapterTargets(targets);
    const visibleTargets = targets.filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const chapter = typeChapters.find((item) => item.id === visible.target.id);
      if (chapter) onActiveTypeChange?.(chapter.slug);
    }, { rootMargin: '-18% 0px -58% 0px', threshold: [0, .08, .2, .4] });

    visibleTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [onActiveTypeChange]);

  const goToChapter = (index: number) => {
    const safeIndex = Math.max(0, Math.min(index, typeChapters.length - 1));
    document.getElementById(typeChapters[safeIndex].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="expression-stepper type-stepper">
      <FrameworkTypeArticleReviewed />
      {chapterTargets.map((target, index) => target ? createPortal(<TypeDeepReviewed id={typeChapters[index].id} />, target) : null)}
      {chapterTargets.map((target, index) => {
        if (!target || index >= typeChapters.length - 1) return null;
        const next = typeChapters[index + 1];
        return createPortal(
          <a href={`#${next.id}`} className="expression-next-link type-next-link" onClick={(event) => { event.preventDefault(); goToChapter(index + 1); }}>
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
