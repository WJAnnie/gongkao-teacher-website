import type { Metadata } from 'next';
import { WritingLegacyEntry } from '../writing-legacy-entry';

export const metadata: Metadata = {
  title: '案例素材｜写作积累｜答卷之外',
  description: '按人物、城市、科技、政务、基层等类型选择申论案例素材。',
};

export default function CaseWritingIndexPage() {
  return <WritingLegacyEntry target="cases/people" title="案例素材" />;
}
