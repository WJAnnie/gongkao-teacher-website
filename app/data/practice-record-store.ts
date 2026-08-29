import type { Subject } from '../question-bank-data';

export interface PracticeRecord {
  id: number;
  date: string;
  subject: Subject;
  title: string;
  seconds: number;
  words: number;
  rating: string;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const KEY = 'gongkao-practice-records';

export function createPracticeRecordStore(storage: StorageLike, now: () => number = Date.now) {
  return {
    load(): PracticeRecord[] {
      const raw = storage.getItem(KEY);
      if (!raw) return [];
      try {
        const parsed: unknown = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as PracticeRecord[]) : [];
      } catch {
        storage.setItem(`${KEY}-corrupt-${now()}`, raw);
        storage.removeItem(KEY);
        return [];
      }
    },
    save(records: readonly PracticeRecord[]) {
      storage.setItem(KEY, JSON.stringify(records));
    },
  };
}
