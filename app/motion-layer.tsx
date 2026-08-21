'use client';

import { useEffect, useRef } from 'react';

export function MotionLayer() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const cursor = cursorRef.current;
    const heroScroll = document.querySelector<HTMLElement>('.hero-scroll');
    const libraryScroll = document.querySelector<HTMLElement>('.library-scroll');
    const methodStory = document.querySelector<HTMLElement>('.method-story');
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const sectionProgress = (element: HTMLElement | null) => {
      if (!element) return 0;
      const rect = element.getBoundingClientRect();
      const distance = Math.max(1, element.offsetHeight - window.innerHeight);
      return clamp(-rect.top / distance);
    };
    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty('--scroll-progress', `${max > 0 ? window.scrollY / max : 0}`);
      const heroProgress = sectionProgress(heroScroll);
      const libraryProgress = sectionProgress(libraryScroll);
      const methodProgress = sectionProgress(methodStory);
      root.style.setProperty('--hero-progress', `${heroProgress}`);
      root.style.setProperty('--library-progress', `${libraryProgress}`);
      root.style.setProperty('--method-progress', `${methodProgress}`);
      methodStory?.setAttribute('data-active', `${Math.min(3, Math.floor(methodProgress * 4))}`);
    };
    const updatePointer = (event: PointerEvent) => {
      root.style.setProperty('--pointer-x', `${event.clientX}px`);
      root.style.setProperty('--pointer-y', `${event.clientY}px`);
      if (cursor) cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    const observeReveals = () => document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((item) => revealObserver.observe(item));
    const mutationObserver = new MutationObserver(observeReveals);

    updateScroll();
    observeReveals();
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('pointermove', updatePointer, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('pointermove', updatePointer);
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return <>
    <div className="scroll-progress" aria-hidden="true" />
    <div ref={cursorRef} className="cursor-orb" aria-hidden="true" />
  </>;
}
