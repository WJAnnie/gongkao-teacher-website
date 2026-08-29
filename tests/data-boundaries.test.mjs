import test from 'node:test';
import assert from 'node:assert/strict';
import { createPracticeRecordStore } from '../app/data/practice-record-store.ts';
import { assertUniqueContentIds } from '../app/data/content-catalog.ts';

test('backs up corrupt local records and returns an empty state', () => {
  const data = new Map([['gongkao-practice-records', '{bad']]);
  const storage = {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
    removeItem: (key) => data.delete(key),
  };
  assert.deepEqual(createPracticeRecordStore(storage, () => 1234).load(), []);
  assert.equal(data.get('gongkao-practice-records-corrupt-1234'), '{bad');
  assert.equal(data.has('gongkao-practice-records'), false);
});

test('rejects duplicate content IDs', () => {
  assert.throws(() => assertUniqueContentIds([{ id: 'x' }, { id: 'x' }], '题库'), /重复 ID：x/);
});
