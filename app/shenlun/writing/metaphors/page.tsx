import type { Metadata } from 'next';
import { WritingLegacyEntry } from '../writing-legacy-entry';

export const metadata: Metadata = {
  title: '比喻词库｜写作积累｜答卷之外',
  description: '申论写作常用比喻词及其含义、常见写法与使用提醒。',
};

export default function MetaphorWritingPage() {
  return <WritingLegacyEntry target="metaphors/library" title="比喻词库" />;
}
