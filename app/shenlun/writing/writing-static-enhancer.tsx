'use client';

import { useEffect } from 'react';

export function WritingStaticEnhancer() {
  useEffect(() => {
    const details = Array.from(document.querySelectorAll<HTMLDetailsElement>('details[data-writing-autoscroll]'));
    const onToggle = (event: Event) => {
      const detail = event.currentTarget as HTMLDetailsElement;
      if (!detail.open) return;
      window.setTimeout(() => detail.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
    };
    details.forEach((detail) => detail.addEventListener('toggle', onToggle));

    const search = document.querySelector<HTMLInputElement>('[data-writing-metaphor-search]');
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-writing-metaphor-item]'));
    const count = document.querySelector<HTMLElement>('[data-writing-metaphor-count]');
    const onInput = () => {
      if (!search) return;
      const keyword = search.value.trim().toLowerCase();
      let visible = 0;
      items.forEach((item) => {
        const haystack = (item.dataset.search ?? '').toLowerCase();
        const show = !keyword || haystack.includes(keyword);
        item.hidden = !show;
        if (show) visible += 1;
      });
      if (count) count.textContent = `找到 ${visible} 条`;
    };
    search?.addEventListener('input', onInput);

    return () => {
      details.forEach((detail) => detail.removeEventListener('toggle', onToggle));
      search?.removeEventListener('input', onInput);
    };
  }, []);

  return null;
}
