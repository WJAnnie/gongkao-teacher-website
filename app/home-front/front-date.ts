// 首页日期一律按北京时间（UTC+8，无夏令时）计算，保证所有访客同一天看到同一期。
const BEIJING_OFFSET_MS = 8 * 60 * 60 * 1000;
const CHINESE_DIGITS = '〇一二三四五六七八九';

export type FrontDate = Readonly<{ key: string; month: number; day: number }>;

export function getBeijingDate(now: Date): FrontDate {
  const shifted = new Date(now.getTime() + BEIJING_OFFSET_MS);
  const year = shifted.getUTCFullYear();
  const month = shifted.getUTCMonth() + 1;
  const day = shifted.getUTCDate();
  const key = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return { key, month, day };
}

export function toChineseNumber(value: number): string {
  if (!Number.isInteger(value) || value < 1 || value > 31) {
    throw new RangeError(`不支持的月日数字：${value}`);
  }
  if (value < 10) return CHINESE_DIGITS.charAt(value);
  const tens = Math.floor(value / 10);
  const ones = value % 10;
  const head = tens === 1 ? '十' : `${CHINESE_DIGITS.charAt(tens)}十`;
  return ones === 0 ? head : `${head}${CHINESE_DIGITS.charAt(ones)}`;
}

export function formatMonthIssue(date: FrontDate): string {
  return `${toChineseNumber(date.month)}月号`;
}

export function formatChineseDay(date: FrontDate): string {
  return `${toChineseNumber(date.month)}月${toChineseNumber(date.day)}日`;
}

// FNV-1a 32 位哈希：把日期字符串变成稳定的整数种子。
export function hashSeed(text: string): number {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}
