import { writingCaseCategories as baseCaseCategories } from './writing-case-data';
import { caseCategoryAdditions, extraCaseCategories } from './writing-case-expansion';
import { caseLibraryTopups } from './writing-case-library-topups';
import type { WritingCaseCategory } from './writing-case-data';

function count(text: string) {
  return text.replace(/\s/g, '').length;
}

const mergedCaseCategories: WritingCaseCategory[] = [
  ...baseCaseCategories.map((category) => ({
    ...category,
    cases: [...category.cases, ...(caseCategoryAdditions[category.key] ?? [])],
  })),
  ...extraCaseCategories,
].map((category) => ({
  ...category,
  cases: [...category.cases, ...(caseLibraryTopups[category.key] ?? [])].map((item, index) => ({
    ...item,
    no: String(index + 1).padStart(2, '0'),
  })),
}));

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
