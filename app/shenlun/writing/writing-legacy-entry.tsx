'use client';

import { useEffect, useMemo } from 'react';
import { resolveLegacyWritingTarget } from './writing-legacy-target';

export function WritingLegacyEntry({ target, title }: { target: string; title: string }) {
  const resolvedTarget = useMemo(() => resolveLegacyWritingTarget(target), [target]);
  const href = useMemo(() => `/shenlun/writing/#${resolvedTarget}`, [resolvedTarget]);

  useEffect(() => {
    const marker = '/shenlun/writing/';
    const markerIndex = window.location.pathname.indexOf(marker);
    const canonicalPath = markerIndex >= 0
      ? `${window.location.pathname.slice(0, markerIndex)}${marker}`
      : '/shenlun/writing/';
    const nextTarget = resolveLegacyWritingTarget(target, window.location.hash);
    window.location.replace(`${canonicalPath}#${nextTarget}`);
  }, [target]);

  return <main className="writing-legacy-entry">
    <span>写作积累</span>
    <h1>{title}</h1>
    <p>正在为你打开对应的学习位置。</p>
    <a href={href}>立即进入</a>
  </main>;
}
