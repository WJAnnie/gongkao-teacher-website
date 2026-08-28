import { writingCaseCategories as rawCaseCategories } from './writing-case-data';

function count(text: string) {
  return text.replace(/\s/g, '').length;
}

rawCaseCategories.forEach((category) => {
  category.cases.forEach((item) => {
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

export const writingCaseCategories = rawCaseCategories;
export type { CaseHighlight, CaseUsage, WritingCase, WritingCaseCategory } from './writing-case-data';
