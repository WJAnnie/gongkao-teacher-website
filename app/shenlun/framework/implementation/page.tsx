import type { Metadata } from 'next';
import { ShenlunShell } from '../../../shenlun-shell';
import { QuestionTypePage } from '../question-type-page';
import { questionTypeKnowledge } from '../question-type-knowledge';

export const metadata: Metadata = {
  title: '贯彻执行｜题型框架｜答卷之外',
  description: '贯彻执行题的情境拆解、内容筛选、结构组织、语气适配与常见误区。',
};

export default function ImplementationKnowledgePage() {
  const data = questionTypeKnowledge.implementation;
  return (
    <ShenlunShell tone="framework" eyebrow="QUESTION TYPE 04 / 贯彻执行" title="贯彻执行" desc={data.tagline}>
      <QuestionTypePage data={data} />
    </ShenlunShell>
  );
}
