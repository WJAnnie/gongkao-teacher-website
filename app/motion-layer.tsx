'use client';

import { useEffect } from 'react';

export function MotionLayer() {
  useEffect(() => {
    const root = document.documentElement;
    const pointerGlows = [...document.querySelectorAll<HTMLElement>('.pointer-glow')];
    const heroScroll = document.querySelector<HTMLElement>('.hero-scroll');
    const manifesto = document.querySelector<HTMLElement>('.manifesto');
    const libraryScroll = document.querySelector<HTMLElement>('.library-scroll');
    const librarySticky = document.querySelector<HTMLElement>('.library-sticky');
    const libraryTrack = document.querySelector<HTMLElement>('.library-track');
    const methodStory = document.querySelector<HTMLElement>('.method-story');
    const clips = document.querySelector<HTMLElement>('.clips');
    const about = document.querySelector<HTMLElement>('.about');
    const leadMagnet = document.querySelector<HTMLElement>('.lead-magnet');
    const contact = document.querySelector<HTMLElement>('.contact');
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const sectionProgress = (element: HTMLElement | null) => {
      if (!element) return 0;
      const rect = element.getBoundingClientRect();
      const distance = Math.max(1, element.offsetHeight - window.innerHeight);
      return clamp(-rect.top / distance);
    };
    const viewportProgress = (element: HTMLElement | null) => {
      if (!element) return 0;
      const rect = element.getBoundingClientRect();
      return clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
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
      root.style.setProperty('--manifesto-progress', `${viewportProgress(manifesto)}`);
      root.style.setProperty('--clips-progress', `${viewportProgress(clips)}`);
      root.style.setProperty('--about-progress', `${viewportProgress(about)}`);
      root.style.setProperty('--lead-progress', `${viewportProgress(leadMagnet)}`);
      root.style.setProperty('--contact-progress', `${viewportProgress(contact)}`);
      methodStory?.setAttribute('data-active', `${Math.min(3, Math.floor(methodProgress * 4))}`);
    };
    const updateLibraryShift = () => {
      if (!librarySticky || !libraryTrack) return;
      const styles = window.getComputedStyle(librarySticky);
      const contentWidth = librarySticky.clientWidth
        - Number.parseFloat(styles.paddingLeft)
        - Number.parseFloat(styles.paddingRight);
      const shift = Math.max(0, libraryTrack.scrollWidth - contentWidth);
      root.style.setProperty('--library-shift', `${-shift}px`);
    };
    let pointerFrame = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    const renderPointer = () => {
      pointerGlows.forEach((glow) => {
        const host = glow.parentElement?.getBoundingClientRect();
        if (!host) return;
        glow.style.transform = `translate3d(${pointerX - host.left}px, ${pointerY - host.top}px, 0)`;
      });
      pointerFrame = 0;
    };
    const updatePointer = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderPointer);
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
    let scrollFrame = 0;
    const requestScrollUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        updateScroll();
        renderPointer();
        scrollFrame = 0;
      });
    };

    updateLibraryShift();
    updateScroll();
    renderPointer();
    observeReveals();
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    const resizeObserver = new ResizeObserver(() => {
      updateLibraryShift();
      updateScroll();
    });
    if (librarySticky) resizeObserver.observe(librarySticky);
    if (libraryTrack) resizeObserver.observe(libraryTrack);
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', updateLibraryShift, { passive: true });
    window.addEventListener('pointermove', updatePointer, { passive: true });
    return () => {
      window.removeEventListener('scroll', requestScrollUpdate);
      window.removeEventListener('resize', updateLibraryShift);
      window.removeEventListener('pointermove', updatePointer);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      resizeObserver.disconnect();
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
