import type { Metadata } from 'next';
import { ShenlunShell } from '../../../shenlun-shell';
import { QuestionTypePage } from '../question-type-page';
import { questionTypeKnowledge } from '../question-type-knowledge';

export const metadata: Metadata = {
  title: '综合分析｜题型框架｜答卷之外',
  description: '综合分析题的题眼解释、材料分析、逻辑组织、结论形成与常见误区。',
};

export default function AnalysisKnowledgePage() {
  const data = questionTypeKnowledge.analysis;
  return (
    <ShenlunShell tone="framework" eyebrow="QUESTION TYPE 02 / 综合分析" title="综合分析" desc={data.tagline}>
      <QuestionTypePage data={data} />
    </ShenlunShell>
  );
}
