import type { WritingCase, WritingCaseCategory } from './writing-case-data';
import type { CaseIndexItem } from './writing-library-index';

function count(text: string) {
  return text.replace(/\s/g, '').length;
}

const aliases: Partial<Record<CaseIndexItem['key'], string[]>> = {
  technology: ['tech'],
  livelihood: ['welfare'],
};

function collect(source: Record<string, WritingCase[]>, key: CaseIndexItem['key']) {
  return [key, ...(aliases[key] ?? [])].flatMap((sourceKey) => source[sourceKey] ?? []);
}

function validate(category: WritingCaseCategory) {
  if (category.cases.length !== 10) {
    throw new Error(`Writing case category must contain exactly 10 cases: ${category.key} = ${category.cases.length}`);
  }
  const seen = new Set<string>();
  category.cases.forEach((item) => {
    if (seen.has(item.slug)) throw new Error(`Duplicate writing case slug: ${item.slug}`);
    seen.add(item.slug);
    const summaryLength = count(item.summary);
    if (summaryLength < 150 || summaryLength > 300) {
      throw new Error(`Writing case summary length out of range: ${item.slug} = ${summaryLength}`);
    }
    if (item.usages.length < 2) throw new Error(`Writing case needs at least two usages: ${item.slug}`);
    item.usages.forEach((usage) => usage.highlights.forEach((mark) => {
      if (!usage.text.includes(mark.text)) throw new Error(`Writing case highlight missing from usage: ${item.slug} / ${mark.text}`);
      if (mark.label === '案例' && count(mark.text) > 90) throw new Error(`Writing case fact is too long: ${item.slug} = ${count(mark.text)}`);
    }));
  });
}

export async function loadCaseCategory(key: CaseIndexItem['key']): Promise<WritingCaseCategory> {
  // 案例正文不进入写作积累首屏。只有学生选择某一案例类型时才加载案例数据模块。
  // 后续案例量继续扩大时，可以在不改页面组件的情况下，把这三个数据模块进一步拆成按类别文件。
  const [baseModule, expansionModule, topupModule] = await Promise.all([
    import('./writing-case-data.ts'),
    import('./writing-case-expansion.ts'),
    import('./writing-case-library-topups.ts'),
  ]);

  const base = baseModule.writingCaseCategories.find((category) => category.key === key);
  const extra = expansionModule.extraCaseCategories.find((category) => category.key === key);
  const source = base ?? extra;
  if (!source) throw new Error(`Unknown writing case category: ${key}`);

  const cases = [
    ...source.cases,
    ...(base ? collect(expansionModule.caseCategoryAdditions, key) : []),
    ...collect(topupModule.caseLibraryTopups, key),
  ].map((item, index) => ({ ...item, no: String(index + 1).padStart(2, '0') }));

  const category: WritingCaseCategory = { ...source, cases };
  validate(category);
  return category;
}
