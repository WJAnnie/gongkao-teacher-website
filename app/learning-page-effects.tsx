'use client';

import { useEffect, useRef, useState } from 'react';

export type GuideItem = { label: string; selector: string; no?: string; key?: string };

export function LearningPageEffects() {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${event.clientX - 210}px, ${event.clientY - 210}px, 0)`;
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div ref={glowRef} className="learning-theme-glow" aria-hidden="true" />;
}

export function PageGuide({ items, embedded = false }: { items: GuideItem[]; embedded?: boolean }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const targets = items
      .map((item, index) => ({ node: document.querySelector(item.selector), index }))
      .filter((item): item is { node: Element; index: number } => Boolean(item.node));

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const match = targets.find((item) => item.node === visible.target);
        if (match) setActive(match.index);
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.12, 0.35, 0.6] },
    );

    targets.forEach((item) => observer.observe(item.node));
    return () => observer.disconnect();
  }, [items]);

  const go = (item: GuideItem, index: number) => {
    setActive(index);
    if (item.key) window.dispatchEvent(new CustomEvent('page-guide-select', { detail: item.key }));
    window.setTimeout(() => document.querySelector(item.selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
  };

  return (
    <>
      <nav className={`page-guide-inline${embedded ? ' hero-page-guide' : ''}`} aria-label="本页三级内容导览">
        <div className="page-guide-heading"><span>CONTENT INDEX</span><b>本页内容导览</b></div>
        <div className="page-guide-items">
          {items.map((item, index) => (
            <button className={active === index ? 'active' : ''} key={`${item.label}-${index}`} onClick={() => go(item, index)} type="button">
              <span>{item.no ?? String(index + 1).padStart(2, '0')}</span><b>{item.label}</b><i>↘</i>
            </button>
          ))}
        </div>
      </nav>

      <nav className="page-guide-float" aria-label="快速三级内容导览">
        <span>CONTENT / 本页导览</span>
        {items.map((item, index) => (
          <button className={active === index ? 'active' : ''} key={`${item.label}-float-${index}`} onClick={() => go(item, index)} type="button">
            <i>{item.no ?? String(index + 1).padStart(2, '0')}</i><b>{item.label}</b>
          </button>
        ))}
      </nav>
    </>
  );
}
