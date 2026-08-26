import type { Metadata } from 'next';
import { ShenlunShell } from '../../../shenlun-shell';
import { QuestionTypePage } from '../question-type-page';
import { questionTypeKnowledge } from '../question-type-knowledge';

export const metadata: Metadata = {
  title: '文章写作｜题型框架｜答卷之外',
  description: '文章写作的审题立意、分论点拆分、论证组织、全文控制与高频提醒。',
};

export default function EssayKnowledgePage() {
  const data = questionTypeKnowledge.essay;
  return (
    <ShenlunShell tone="framework" eyebrow="QUESTION TYPE 05 / 文章写作" title="文章写作" desc={data.tagline}>
      <QuestionTypePage data={data} />
    </ShenlunShell>
  );
}
