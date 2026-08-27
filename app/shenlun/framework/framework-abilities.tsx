'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FrameworkAbilities as FrameworkAbilitiesBase, coreAbilityChapters } from './framework-abilities-voice';
import { AbilityDeep } from './framework-deep-enrichment';

export { coreAbilityChapters };

export function FrameworkAbilities() {
  const [targets, setTargets] = useState<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setTargets(coreAbilityChapters.map((item) => document.getElementById(item.id)));
  }, []);

  return (
    <>
      <FrameworkAbilitiesBase />
      {targets.map((target, index) => target ? createPortal(<AbilityDeep id={coreAbilityChapters[index].id} />, target) : null)}
    </>
  );
}
