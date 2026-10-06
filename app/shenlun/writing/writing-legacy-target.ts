import { hotspotArticleCategory, type HotspotCategoryKey } from './writing-hotspot-taxonomy.ts';
import { hotspotIndex } from './writing-library-index.ts';
import { hotspotCategoryKeys } from '../../site-routes.mjs';

export const legacyHotspotCategoryMap: Record<string, HotspotCategoryKey> = {
  development: 'economy',
  people: 'livelihood',
  government: 'service',
  law: 'enforcement',
  values: 'civility',
  era: 'innovation',
};

const currentCategoryKeys = new Set<string>(hotspotIndex.map((item) => item.key));

export function resolveHotspotCategory(category: string): HotspotCategoryKey {
  if (!category) return 'economy';
  if (Object.hasOwn(legacyHotspotCategoryMap, category)) {
    return legacyHotspotCategoryMap[category];
  }
  if (currentCategoryKeys.has(category)) {
    return category as HotspotCategoryKey;
  }
  return 'economy';
}

export function resolveLegacyWritingTarget(target: string, hash = ''): string {
  const [section, ...rest] = target.split('/').filter(Boolean);

  if (section === 'hotspots') {
    const rawCategory = rest[0] ?? '';
    const baseCategory = resolveHotspotCategory(rawCategory);
    const rawHash = decodeURIComponent(hash.replace(/^#\/?/, '')).trim();

    if (rawHash) {
      const hashSegments = rawHash.split('/').filter(Boolean);
      const leafCandidate = hashSegments[hashSegments.length - 1] ?? rawHash;

      // Avoid self-referencing category anchors like #development or #economy
      if (
        leafCandidate === rawCategory ||
        leafCandidate === baseCategory
      ) {
        return `hotspots/${baseCategory}`;
      }

      // Check if known article slug
      const knownCategory = Object.hasOwn(hotspotArticleCategory, leafCandidate)
        ? hotspotArticleCategory[leafCandidate]
        : undefined;
      if (knownCategory) {
        return `hotspots/${knownCategory}/${leafCandidate}`;
      }

      // Unknown article fragment: preserve under the resolved category
      return `hotspots/${baseCategory}/${leafCandidate}`;
    }

    // No hash: check if target had an article slug
    if (rest.length > 1) {
      const targetSlug = rest.slice(1).join('/');
      const knownCategory = Object.hasOwn(hotspotArticleCategory, targetSlug)
        ? hotspotArticleCategory[targetSlug]
        : undefined;
      const category = knownCategory ?? baseCategory;
      return `hotspots/${category}/${targetSlug}`;
    }

    return `hotspots/${baseCategory}`;
  }

  // Preserve case and metaphor behavior unchanged
  const previousLeaf = decodeURIComponent(hash.replace(/^#\/?/, '')).trim();
  if (previousLeaf && previousLeaf !== target && !target.endsWith(previousLeaf)) {
    return `${target}/${previousLeaf}`;
  }
  return target;
}

export function getHotspotCategoryStaticParams(): { category: string }[] {
  const keys = Array.from(
    new Set([
      ...hotspotIndex.map((item) => item.key),
      ...hotspotCategoryKeys,
    ])
  );
  return keys.map((category) => ({ category }));
}
