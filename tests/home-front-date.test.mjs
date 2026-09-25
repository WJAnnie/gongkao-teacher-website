import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatChineseDay,
  formatMonthIssue,
  getBeijingDate,
  hashSeed,
  toChineseNumber,
} from '../app/home-front/front-date.ts';

test('beijing date turns over at 16:00 UTC, not at UTC midnight', () => {
  assert.equal(getBeijingDate(new Date('2026-09-24T15:59:59Z')).key, '2026-09-24');
  assert.equal(getBeijingDate(new Date('2026-09-24T16:00:00Z')).key, '2026-09-25');
  assert.equal(getBeijingDate(new Date('2026-09-25T02:00:00Z')).key, '2026-09-25');
});

test('beijing date crosses month and year boundaries', () => {
  assert.deepEqual(getBeijingDate(new Date('2026-12-31T16:30:00Z')), { key: '2027-01-01', month: 1, day: 1 });
  assert.deepEqual(getBeijingDate(new Date('2026-09-30T16:00:00Z')), { key: '2026-10-01', month: 10, day: 1 });
});

test('month and day render as chinese numerals', () => {
  assert.deepEqual(
    [1, 9, 10, 11, 12, 20, 25, 30, 31].map((value) => toChineseNumber(value)),
    ['一', '九', '十', '十一', '十二', '二十', '二十五', '三十', '三十一'],
  );
  assert.throws(() => toChineseNumber(0), RangeError);
  assert.throws(() => toChineseNumber(32), RangeError);
  const date = { key: '2026-09-25', month: 9, day: 25 };
  assert.equal(formatMonthIssue(date), '九月号');
  assert.equal(formatChineseDay(date), '九月二十五日');
  assert.equal(formatMonthIssue({ key: '2026-12-01', month: 12, day: 1 }), '十二月号');
});

test('seed is a stable unsigned 32-bit integer per date key', () => {
  const seed = hashSeed('2026-09-25');
  assert.equal(seed, hashSeed('2026-09-25'));
  assert.notEqual(seed, hashSeed('2026-09-26'));
  assert.ok(Number.isInteger(seed) && seed >= 0 && seed <= 0xffffffff);
});
