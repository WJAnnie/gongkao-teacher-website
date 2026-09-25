// 每日挑选：同一种子、同一份列表，结果永远相同；优先让挑出的条目来自不同分类。
export type Categorized = Readonly<{ categoryKey: string }>;

// mulberry32：足够均匀、可复现的小型伪随机数生成器。
export function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffledIndexes(length: number, random: () => number): number[] {
  const order = Array.from({ length }, (_, index) => index);
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [order[index], order[swap]] = [order[swap], order[index]];
  }
  return order;
}

export function pickDaily<T extends Categorized>(items: readonly T[], seed: number, count: number): T[] {
  const order = shuffledIndexes(items.length, createRandom(seed));
  const picked: number[] = [];
  const categories = new Set<string>();

  for (const index of order) {
    if (picked.length === count) break;
    const { categoryKey } = items[index];
    if (categories.has(categoryKey)) continue;
    categories.add(categoryKey);
    picked.push(index);
  }
  // 分类不够时，再按同一顺序补足，允许分类重复。
  for (const index of order) {
    if (picked.length === count) break;
    if (!picked.includes(index)) picked.push(index);
  }
  return picked.map((index) => items[index]);
}
