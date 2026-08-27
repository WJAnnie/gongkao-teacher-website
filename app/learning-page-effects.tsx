'use client';

import { useEffect, useRef } from 'react';

export type GuideItem = { label: string; selector: string; no?: string; key?: string };

export function LearningPageEffects() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const onMove = (event: PointerEvent) => {
      glow.style.transform = `translate3d(${event.clientX - 210}px, ${event.clientY - 210}px, 0)`;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return <div ref={glowRef} className="learning-theme-glow" aria-hidden="true" />;
}

export function PageGuide({ items }: { items: GuideItem[] }) {
  const go = (item: GuideItem) => {
    if (item.key) window.dispatchEvent(new CustomEvent('page-guide-select', { detail: item.key }));
    window.setTimeout(() => document.querySelector(item.selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
  };

  return (
    <>
      <nav className="page-guide-inline" aria-label="本页内容导览">
        <div className="page-guide-heading"><span>CONTENT INDEX</span><b>本页导览</b></div>
        <div className="page-guide-items">
          {items.map((item, index) => (
            <button key={`${item.label}-${index}`} onClick={() => go(item)} type="button">
              <span>{item.no ?? String(index + 1).padStart(2, '0')}</span><b>{item.label}</b><i>↓</i>
            </button>
          ))}
        </div>
      </nav>

      <nav className="page-guide-float" aria-label="快速内容导览">
        <span>本页导览</span>
        {items.map((item, index) => (
          <button key={`${item.label}-float-${index}`} onClick={() => go(item)} type="button">
            <i>{item.no ?? String(index + 1).padStart(2, '0')}</i>{item.label}
          </button>
        ))}
      </nav>
    </>
  );
}
