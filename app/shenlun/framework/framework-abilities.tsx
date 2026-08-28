'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { coreAbilityChapters } from './framework-abilities-voice';
import { AbilityDeepReviewed, FrameworkAbilitiesReviewed } from './framework-content-review';

export { coreAbilityChapters };

export function FrameworkAbilities() {
  const [targets, setTargets] = useState<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setTargets(coreAbilityChapters.map((item) => document.getElementById(item.id)));
  }, []);

  return (
    <>
      <FrameworkAbilitiesReviewed />
      {targets.map((target, index) => target ? createPortal(<AbilityDeepReviewed id={coreAbilityChapters[index].id} />, target) : null)}
    </>
  );
}
