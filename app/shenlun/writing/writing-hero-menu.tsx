'use client';

import { useEffect, useState } from 'react';

export const writingHeroEntries = [
  { key: 'hotspots', no: '01', label: '热点时评' },
  { key: 'cases', no: '02', label: '案例素材' },
  { key: 'terms', no: '03', label: '规范用词' },
  { key: 'metaphors', no: '04', label: '比喻词库' },
  { key: 'parallel', no: '05', label: '对仗句库' },
  { key: 'sentences', no: '06', label: '主题佳句' },
  { key: 'quotes', no: '07', label: '名人箴言' },
  { key: 'essay', no: '08', label: '作文框架' },
] as const;

export type WritingHeroKey = (typeof writingHeroEntries)[number]['key'];

export function WritingHeroMenu() {
  const [launching, setLaunching] = useState<WritingHeroKey | null>(null);
  const [selected, setSelected] = useState<WritingHeroKey>('hotspots');

  useEffect(() => {
    const syncFromSidebar = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement | null)?.closest<HTMLButtonElement>('.writing-category-trigger');
      if (!trigger) return;
      const groups = Array.from(document.querySelectorAll<HTMLElement>('.writing-layer-group'));
      const group = trigger.closest<HTMLElement>('.writing-layer-group');
      const index = group ? groups.indexOf(group) : -1;
      const entry = writingHeroEntries[index];
      if (entry) setSelected(entry.key);
    };

    document.addEventListener('click', syncFromSidebar);
    return () => document.removeEventListener('click', syncFromSidebar);
  }, []);

  const enter = (key: WritingHeroKey) => {
    setLaunching(key);
    setSelected(key);
    window.dispatchEvent(new CustomEvent('writing-hero-select', { detail: { key } }));
    window.setTimeout(() => setLaunching(null), 950);
  };

  return (
    <nav className="shenlun-route-strip writing-hero-entry-strip" aria-label="写作积累二级目录">
      {writingHeroEntries.map((item) => {
        const current = selected === item.key;
        const busy = launching === item.key;
        return (
          <button
            className={`${current ? 'active' : ''}${busy ? ' launching' : ''}`}
            data-writing-hero={item.key}
            key={item.key}
            type="button"
            onClick={() => enter(item.key)}
          >
            <span>{item.no}</span>
            <b>{item.label}</b>
            <i aria-hidden="true">{busy ? '进入中' : current ? '当前' : '进入'}</i>
          </button>
        );
      })}
    </nav>
  );
}
