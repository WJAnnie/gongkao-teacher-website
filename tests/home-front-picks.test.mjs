import test from 'node:test';
import assert from 'node:assert/strict';
import { pickDaily } from '../app/home-front/front-picks.ts';
import { hashSeed } from '../app/home-front/front-date.ts';

const CATEGORY_KEYS = ['economy', 'innovation', 'livelihood', 'ecology', 'culture', 'civility', 'cadre', 'service', 'grassroots', 'enforcement', 'rural'];
const items = CATEGORY_KEYS.flatMap((categoryKey) => [1, 2, 3].map((n) => ({ id: `${categoryKey}-${n}`, categoryKey })));
const ids = (list) => list.map((item) => item.id);

test('same seed returns the same three items', () => {
  const first = pickDaily(items, 42, 3);
  assert.equal(first.length, 3);
  assert.deepEqual(ids(first), ids(pickDaily(items, 42, 3)));
});

test('consecutive days rotate the picks', () => {
  const combos = new Set();
  for (let day = 1; day <= 10; day += 1) {
    const seed = hashSeed(`2026-10-${String(day).padStart(2, '0')}`);
    combos.add(ids(pickDaily(items, seed, 3)).join('|'));
  }
  assert.ok(combos.size >= 8, `10 天只出现了 ${combos.size} 种组合`);
});

test('picks are distinct and come from distinct categories when possible', () => {
  for (let seed = 0; seed < 200; seed += 1) {
    const picked = pickDaily(items, seed, 3);
    assert.equal(new Set(ids(picked)).size, 3);
    assert.equal(new Set(picked.map((item) => item.categoryKey)).size, 3);
  }
});

test('falls back to repeated categories when fewer than three exist', () => {
  const twoCategories = items.filter((item) => item.categoryKey === 'economy' || item.categoryKey === 'rural');
  for (let seed = 0; seed < 50; seed += 1) {
    const picked = pickDaily(twoCategories, seed, 3);
    assert.equal(picked.length, 3);
    assert.equal(new Set(ids(picked)).size, 3);
    assert.equal(new Set(picked.map((item) => item.categoryKey)).size, 2);
  }
});

test('short or empty lists return what exists without throwing', () => {
  assert.deepEqual(pickDaily([], 7, 3), []);
  assert.deepEqual(ids(pickDaily(items.slice(0, 2), 7, 3)).sort(), ids(items.slice(0, 2)).sort());
});

test('does not mutate the input list', () => {
  const snapshot = items.map((item) => ({ ...item }));
  pickDaily(items, 99, 3);
  assert.deepEqual(items, snapshot);
});
