import type { Metadata } from 'next';
import { LearningShell } from '../learning-shell';
import { StudyHub } from '../study-hub';

export const metadata: Metadata = {
  title: '学习资料｜答卷之外',
  description: '申论方法、文章写作、面试题型、表达训练、热点素材、规范表达与晨读积累。',
};

export default function MaterialsPage() {
  return (
    <LearningShell
      eyebrow="MATERIAL LIBRARY / 方法与素材"
      title="资料不是收藏夹，是拿来解决具体问题的。"
      desc="按申论入门、小题方法、文章写作、面试方法、表达训练、热点素材、规范表达和晨读积累建立长期资料树。"
    >
      <StudyHub initialTab="资料" standalone />
    </LearningShell>
  );
}
