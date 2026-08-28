import { writingCaseCategories as baseCaseCategories } from './writing-case-data';
import { caseCategoryAdditions, extraCaseCategories } from './writing-case-expansion';
import { caseLibraryTopups } from './writing-case-library-topups';
import type { WritingCase, WritingCaseCategory } from './writing-case-data';

function count(text: string) {
  return text.replace(/\s/g, '').length;
}

const categorySourceAliases: Record<string, string[]> = {
  technology: ['tech'],
  livelihood: ['welfare'],
};

function sourceKeys(categoryKey: string) {
  return [categoryKey, ...(categorySourceAliases[categoryKey] ?? [])];
}

function collect(source: Record<string, WritingCase[]>, categoryKey: string) {
  return sourceKeys(categoryKey).flatMap((key) => source[key] ?? []);
}

const sourceCategories: WritingCaseCategory[] = [
  ...baseCaseCategories.map((category) => ({
    ...category,
    cases: [...category.cases, ...collect(caseCategoryAdditions, category.key)],
  })),
  ...extraCaseCategories,
];

const mergedCaseCategories: WritingCaseCategory[] = sourceCategories.map((category) => ({
  ...category,
  cases: [...category.cases, ...collect(caseLibraryTopups, category.key)].map((item, index) => ({
    ...item,
    no: String(index + 1).padStart(2, '0'),
  })),
}));

const canonicalKeys = new Set(sourceCategories.map((category) => category.key));
const acceptedSourceKeys = new Set([
  ...canonicalKeys,
  ...Object.values(categorySourceAliases).flat(),
]);

for (const key of [...Object.keys(caseCategoryAdditions), ...Object.keys(caseLibraryTopups)]) {
  if (!acceptedSourceKeys.has(key)) {
    throw new Error(`Writing case library contains an unmapped category key: ${key}`);
  }
}

const seenSlugs = new Set<string>();

mergedCaseCategories.forEach((category) => {
  if (category.cases.length !== 10) {
    throw new Error(`Writing case category must contain exactly 10 cases: ${category.key} = ${category.cases.length}`);
  }

  category.cases.forEach((item) => {
    if (seenSlugs.has(item.slug)) {
      throw new Error(`Duplicate writing case slug: ${item.slug}`);
    }
    seenSlugs.add(item.slug);

    const summaryLength = count(item.summary);
    if (summaryLength < 150 || summaryLength > 300) {
      throw new Error(`Writing case summary length out of range: ${item.slug} = ${summaryLength}`);
    }
    if (item.usages.length < 2) {
      throw new Error(`Writing case needs at least two usages: ${item.slug}`);
    }
    item.usages.forEach((usage) => {
      usage.highlights.forEach((mark) => {
        if (!usage.text.includes(mark.text)) {
          throw new Error(`Writing case highlight missing from usage: ${item.slug} / ${mark.text}`);
        }
        if (mark.label === '案例' && count(mark.text) > 90) {
          throw new Error(`Writing case fact is too long: ${item.slug} = ${count(mark.text)}`);
        }
      });
    });
  });
});

export const writingCaseCategories = mergedCaseCategories;
export type { CaseHighlight, CaseUsage, WritingCase, WritingCaseCategory } from './writing-case-data';
