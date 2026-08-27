'use client';

import { useState } from 'react';

const entries = [
  { key: 'expression', no: '01', label: '表达规则' },
  { key: 'types', no: '02', label: '题型框架' },
  { key: 'abilities', no: '03', label: '核心能力' },
  { key: 'tips', no: '04', label: '实用技巧' },
] as const;

type EntryKey = (typeof entries)[number]['key'];

export function FrameworkHeroMenu() {
  const [launching, setLaunching] = useState<EntryKey | null>(null);

  const enter = (key: EntryKey) => {
    setLaunching(key);
    window.dispatchEvent(new CustomEvent('framework-hero-select', { detail: { key } }));
    window.setTimeout(() => setLaunching(null), 950);
  };

  return (
    <nav className="shenlun-route-strip framework-hero-entry-strip" aria-label="方法框架章节入口">
      {entries.map((item) => (
        <button
          className={launching === item.key ? 'launching' : ''}
          data-framework-hero={item.key}
          key={item.key}
          type="button"
          onClick={() => enter(item.key)}
        >
          <span style={{ padding: 0, border: 0 }}>{item.no}</span>
          <b>{item.label}</b>
          <i aria-hidden="true">{launching === item.key ? '进入中' : '进入'}</i>
        </button>
      ))}
    </nav>
  );
}
