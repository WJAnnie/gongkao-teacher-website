import type { Metadata } from 'next';
import { WritingLegacyEntry } from '../writing-legacy-entry';

export const metadata: Metadata = {
  title: '热点时评｜写作积累｜答卷之外',
  description: '按八大知识领域选择申论热点时评文章。',
};

export default function HotspotWritingIndexPage() {
  return <WritingLegacyEntry target="hotspots/development" title="热点时评" />;
}
