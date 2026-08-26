import type { Metadata } from 'next';
import { ShenlunShell } from '../../../shenlun-shell';
import { QuestionTypePage } from '../question-type-page';
import { questionTypeKnowledge } from '../question-type-knowledge';

export const metadata: Metadata = {
  title: '归纳概括｜题型框架｜答卷之外',
  description: '归纳概括题的审题、材料提取、分类合并、答案结构与高频提醒。',
};

export default function SummaryKnowledgePage() {
  const data = questionTypeKnowledge.summary;
  return (
    <ShenlunShell tone="framework" eyebrow="QUESTION TYPE 01 / 归纳概括" title="归纳概括" desc={data.tagline}>
      <QuestionTypePage data={data} />
    </ShenlunShell>
  );
}
