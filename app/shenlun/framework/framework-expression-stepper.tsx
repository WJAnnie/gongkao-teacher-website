'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FrameworkExpression } from './framework-expression';

const chapters = [
  { id: 'expression-know', no: '01', label: '认识申论' },
  { id: 'expression-sheet', no: '02', label: '认识答题卡' },
  { id: 'expression-audit', no: '03', label: '学会审题' },
  { id: 'expression-read', no: '04', label: '学会读材料' },
  { id: 'expression-transform', no: '05', label: '从材料到答案' },
  { id: 'expression-logic', no: '06', label: '组织答案' },
  { id: 'expression-finish', no: '07', label: '完成一道题' },
] as const;

function SheetGrid({ rows }: { rows: number }) {
  return <div className="expression-answer-grid expression-answer-grid-extra" aria-hidden="true">{Array.from({ length: rows * 25 }).map((_, index) => <i key={index} />)}</div>;
}

export function FrameworkExpressionStepper({ onActiveChapterChange }: { onActiveChapterChange?: (index: number) => void }) {
  const [chapterTargets, setChapterTargets] = useState<(HTMLElement | null)[]>([]);
  const [sheetTarget, setSheetTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const targets = chapters.map((chapter) => document.getElementById(chapter.id));
    setChapterTargets(targets);
    setSheetTarget(document.querySelector<HTMLElement>('.expression-sheet-paper'));

    const lineCounts = ['8 行', '12 行', '16 行'];
    document.querySelectorAll<HTMLElement>('.expression-grid-math > div > b').forEach((node, index) => {
      if (lineCounts[index]) node.textContent = lineCounts[index];
    });

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
      <FrameworkExpression />

      {chapterTargets.map((target, index) => {
        if (!target || index >= chapters.length - 1) return null;
        const next = chapters[index + 1];
        return createPortal(
          <a href={`#${next.id}`} className="expression-next-link" onClick={(event) => { event.preventDefault(); goToChapter(index + 1); }}>
            <span>CONTINUE READING</span><b>{next.no}　{next.label}</b><em>↘</em>
          </a>,
          target,
        );
      })}

      {sheetTarget && createPortal(
        <div className="expression-sheet-extra" aria-label="答题卡后续作答区域示意">
          <div className="sheet-question-label">第（三）题</div><SheetGrid rows={3} />
          <div className="sheet-question-label">第（四）题</div><SheetGrid rows={3} />
          <div className="sheet-question-label sheet-essay-label">文章写作区</div><SheetGrid rows={6} />
          <p className="sheet-extra-note">整张答题卡通常由考生信息区、若干小题作答区和文章写作区组成。这里用完整结构帮助你建立空间意识，具体版式以当年实际答题卡为准。</p>
        </div>,
        sheetTarget,
      )}
    </div>
  );
}
