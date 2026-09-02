'use client';

import { useEffect, useMemo } from 'react';

export function WritingLegacyEntry({ target, title }: { target: string; title: string }) {
  const href = useMemo(() => `/shenlun/writing/#${target}`, [target]);

  useEffect(() => {
    const marker = '/shenlun/writing/';
    const markerIndex = window.location.pathname.indexOf(marker);
    const canonicalPath = markerIndex >= 0
      ? `${window.location.pathname.slice(0, markerIndex)}${marker}`
      : '/shenlun/writing/';
    const previousLeaf = decodeURIComponent(window.location.hash.replace(/^#\/?/, '')).trim();
    const nextTarget = previousLeaf && previousLeaf !== target && !target.endsWith(previousLeaf)
      ? `${target}/${previousLeaf}`
      : target;
    window.location.replace(`${canonicalPath}#${nextTarget}`);
  }, [target]);

  return <main className="writing-legacy-entry">
    <span>写作积累</span>
    <h1>{title}</h1>
    <p>正在为你打开对应的学习位置。</p>
    <a href={href}>立即进入</a>
  </main>;
}
