'use client';

import { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { writingHeroEntries, type WritingHeroKey } from './writing-hero-menu';

type ViewTransitionHandle = { finished: Promise<void> };
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => ViewTransitionHandle;
};

export function WritingHeroBridge() {
  useEffect(() => {
    let drawerTimer: number | null = null;

    const onHeroSelect = (event: Event) => {
      const key = (event as CustomEvent<{ key?: string }>).detail?.key;
      const index = writingHeroEntries.findIndex((item) => item.key === key);
      if (index < 0) return;

      const nextKey = key as WritingHeroKey;
      const manual = document.getElementById('writing-hotspot-manual');
      if (!manual) return;

      const source = document.querySelector<HTMLElement>(`[data-writing-hero="${nextKey}"]`);
      const groups = Array.from(manual.querySelectorAll<HTMLElement>('.writing-layer-group'));
      const targetGroup = groups[index];
      const target = targetGroup?.querySelector<HTMLButtonElement>('.writing-category-trigger');
      if (!target) return;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const mobile = window.innerWidth <= 820;
      const targetTop = manual.getBoundingClientRect().top + window.scrollY - (mobile ? 64 : 78);

      const applyDestination = () => {
        flushSync(() => target.click());
        window.scrollTo({ top: targetTop, behavior: 'auto' });

        const sidebar = manual.querySelector<HTMLElement>('.writing-hotspot-sidebar');
        if (sidebar && targetGroup) {
          const sidebarRect = sidebar.getBoundingClientRect();
          const targetRect = targetGroup.getBoundingClientRect();
          const desired = Math.max(0, sidebar.scrollTop + targetRect.top - sidebarRect.top - 18);
          sidebar.scrollTo({ top: desired, behavior: 'auto' });
        }
      };

      const transitionDocument = document as ViewTransitionDocument;
      if (!reducedMotion && !mobile && source && transitionDocument.startViewTransition) {
        let sharedTarget: HTMLElement | null = null;
        const root = document.documentElement;
        source.style.setProperty('view-transition-name', 'writing-chapter-shared');
        root.classList.add('writing-shared-transition-active');

        const cleanupTransition = () => {
          source.style.removeProperty('view-transition-name');
          sharedTarget?.style.removeProperty('view-transition-name');
          root.classList.remove('writing-shared-transition-active');
        };

        try {
          const transition = transitionDocument.startViewTransition(() => {
            source.style.removeProperty('view-transition-name');
            applyDestination();
            sharedTarget = target;
            sharedTarget.style.setProperty('view-transition-name', 'writing-chapter-shared');
          });

          // 某些浏览器会在页面变化较大、动画被打断或切换标签页时拒绝 finished Promise。
          // 这里同时处理成功与失败，避免未处理的 Promise rejection 被全局错误边界接管。
          void transition.finished.then(cleanupTransition, cleanupTransition);
        } catch {
          cleanupTransition();
          applyDestination();
        }
      } else {
        applyDestination();
      }

      if (mobile) {
        drawerTimer = window.setTimeout(() => {
          manual.querySelector<HTMLButtonElement>('.writing-mobile-index')?.click();
        }, reducedMotion ? 0 : 180);
      }
    };

    window.addEventListener('writing-hero-select', onHeroSelect);
    return () => {
      window.removeEventListener('writing-hero-select', onHeroSelect);
      if (drawerTimer) window.clearTimeout(drawerTimer);
      document.documentElement.classList.remove('writing-shared-transition-active');
    };
  }, []);

  return null;
}
