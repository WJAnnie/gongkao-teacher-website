'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { coreAbilityChapters } from './framework-abilities-voice';
import { AbilityDeepReviewedV2, FrameworkAbilitiesReviewedV2 } from './framework-content-review-v2';

export { coreAbilityChapters };

export function FrameworkAbilities() {
  const [targets, setTargets] = useState<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setTargets(coreAbilityChapters.map((item) => document.getElementById(item.id)));
  }, []);

  return (
    <>
      <FrameworkAbilitiesReviewedV2 />
      {targets.map((target, index) => target ? createPortal(<AbilityDeepReviewedV2 id={coreAbilityChapters[index].id} />, target) : null)}
    </>
  );
}
