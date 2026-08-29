'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { coreAbilityChapters } from './framework-abilities-voice';
import { AbilityDeepReviewedV2, FrameworkAbilitiesReviewedV2 } from './framework-content-review-v2';

export { coreAbilityChapters };

export function FrameworkAbilities() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (active) setMounted(true);
    });
    return () => { active = false; };
  }, []);

  const targets = mounted && typeof document !== 'undefined'
    ? coreAbilityChapters.map((item) => document.getElementById(item.id))
    : [];

  return (
    <>
      <FrameworkAbilitiesReviewedV2 />
      {targets.map((target, index) => target ? createPortal(<AbilityDeepReviewedV2 id={coreAbilityChapters[index].id} />, target) : null)}
    </>
  );
}
