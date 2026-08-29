import { materialNotes } from '../material-library-data.ts';
import { questions } from '../question-bank-data.ts';

export function assertUniqueContentIds<T extends { id: string }>(items: readonly T[], label: string): void {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) throw new Error(`${label}存在重复 ID：${item.id}`);
    seen.add(item.id);
  }
}

assertUniqueContentIds(questions, '题库');
assertUniqueContentIds(materialNotes, '资料库');

export const contentCatalog = Object.freeze({
  listQuestions: () => questions,
  listMaterials: () => materialNotes,
});
