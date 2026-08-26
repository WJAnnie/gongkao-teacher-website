import type { Metadata } from 'next';
import { ShenlunShell } from '../../../shenlun-shell';
import { QuestionTypePage } from '../question-type-page';
import { questionTypeKnowledge } from '../question-type-knowledge';

export const metadata: Metadata = {
  title: '提出对策｜题型框架｜答卷之外',
  description: '提出对策题的问题识别、主体判断、措施生成、答案结构与高频提醒。',
};

export default function SolutionKnowledgePage() {
  const data = questionTypeKnowledge.solution;
  return (
    <ShenlunShell tone="framework" eyebrow="QUESTION TYPE 03 / 提出对策" title="提出对策" desc={data.tagline}>
      <QuestionTypePage data={data} />
    </ShenlunShell>
  );
}
