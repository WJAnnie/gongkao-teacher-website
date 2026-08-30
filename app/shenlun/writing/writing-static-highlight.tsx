import type { ReactNode } from 'react';
import type { CaseHighlight } from './writing-case-data';
import type { HotspotHighlight } from './writing-hotspot-schema';

type LearningHighlight = HotspotHighlight | CaseHighlight;

export function annotateWritingHighlight(text: string, highlights: LearningHighlight[]): ReactNode[] {
  const matches = highlights
    .map((item) => ({ ...item, index: text.indexOf(item.text) }))
    .filter((item) => item.index >= 0)
    .sort((a, b) => a.index - b.index);
  if (!matches.length) return [text];

  const nodes: ReactNode[] = [];
  let cursor = 0;
  matches.forEach((item, index) => {
    if (item.index < cursor) return;
    if (item.index > cursor) nodes.push(text.slice(cursor, item.index));
    nodes.push(<span className={`writing-learning-mark mark-${item.label}`} key={`${item.text}-${index}`}>{item.text}<small>{item.label}</small></span>);
    cursor = item.index + item.text.length;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}
