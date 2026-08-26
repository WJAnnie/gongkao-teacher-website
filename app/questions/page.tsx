import type { Metadata } from 'next';
import { LearningShell } from '../learning-shell';
import { StudyHub } from '../study-hub';

export const metadata: Metadata = {
  title: '真题题库｜答卷之外',
  description: '申论与结构化面试真题索引、专项练习、题型筛选与随机抽题。',
};

export default function QuestionsPage() {
  return (
    <LearningShell
      eyebrow="QUESTION BANK / 真题与专项练习"
      title="不是刷得多，是每一题都知道在练什么。"
      desc="按申论 / 面试、年份、题型和主题定位题目。真题以题意摘要和训练重点建立索引，原创仿真题补足新热点与新场景。"
    >
      <StudyHub initialTab="题库" standalone />
    </LearningShell>
  );
}
