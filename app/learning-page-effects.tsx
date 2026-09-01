'use client';

import { useEffect, useRef } from 'react';

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
