'use client';

import { useEffect, useRef } from 'react';

export function FrontMotion() {
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.front-page');
    if (!root) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sections = Array.from(root.querySelectorAll<HTMLElement>('.front-cols, .front-daily-reading, .front-bottom, .front-editorial'));
    let observer: IntersectionObserver | undefined;
    let frame = 0;

    const reset = () => {
      observer?.disconnect();
      sections.forEach((section) => section.classList.remove('front-awaiting', 'front-entered'));
    };
    const reveal = () => {
      reset();
      if (motion.matches || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove('front-awaiting');
          entry.target.classList.add('front-entered');
          observer?.unobserve(entry.target);
        }
      }, { threshold: .08, rootMargin: '0px 0px -32px 0px' });
      for (const section of sections) {
        if (section.getBoundingClientRect().top < window.innerHeight * .9) continue;
        section.classList.add('front-awaiting');
        observer.observe(section);
      }
    };
    const updateProgress = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      progress.current?.style.setProperty('--front-read-progress', String(ratio));
    };
    const scheduleProgress = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    reveal();
    updateProgress();
    motion.addEventListener('change', reveal);
    window.addEventListener('scroll', scheduleProgress, { passive: true });
    window.addEventListener('resize', scheduleProgress);
    return () => {
      reset();
      window.cancelAnimationFrame(frame);
      motion.removeEventListener('change', reveal);
      window.removeEventListener('scroll', scheduleProgress);
      window.removeEventListener('resize', scheduleProgress);
    };
  }, []);

  return <div className="front-reading-line" aria-hidden="true"><span ref={progress} /></div>;
}
