'use client';

import { useEffect, useRef, useState } from 'react';

export type PageGuideItem = {
  id: string;
  label: string;
  no?: string;
};

export function LearningPageInteractions({ items }: { items: PageGuideItem[] }) {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!glowRef.current || event.pointerType === 'touch') return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!glowRef.current) return;
        glowRef.current.style.transform = `translate3d(${event.clientX - 210}px, ${event.clientY - 210}px, 0)`;
      });
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.12, 0.35, 0.6] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  const jumpTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    setActiveId(id);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <>
      <div ref={glowRef} className="learning-theme-glow" aria-hidden="true" />

      <nav className="page-guide-inline" aria-label="本页内容导览">
        <div className="page-guide-heading">
          <span>PAGE INDEX</span>
          <b>本页内容导览</b>
        </div>
        <div className="page-guide-items">
          {items.map((item, index) => (
            <button
              className={activeId === item.id ? 'active' : ''}
              type="button"
              onClick={() => jumpTo(item.id)}
              key={item.id}
            >
              <span>{item.no ?? String(index + 1).padStart(2, '0')}</span>
              <b>{item.label}</b>
              <i>↘</i>
            </button>
          ))}
        </div>
      </nav>

      <nav className="page-guide-float" aria-label="浮动内容导览">
        <span>PAGE INDEX / 导览</span>
        {items.map((item, index) => (
          <button
            className={activeId === item.id ? 'active' : ''}
            type="button"
            onClick={() => jumpTo(item.id)}
            key={item.id}
          >
            <i>{item.no ?? String(index + 1).padStart(2, '0')}</i>
            <b>{item.label}</b>
          </button>
        ))}
      </nav>
    </>
  );
}
