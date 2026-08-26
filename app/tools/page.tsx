import type { Metadata } from 'next';
import { LearningShell } from '../learning-shell';
import { StudyHub } from '../study-hub';
import { AdvancedTools } from '../advanced-tools';

export const metadata: Metadata = {
  title: '训练工具｜答卷之外',
  description: '申论与面试答题计时、草稿字数统计、答后自检、练习记录、每日一题、模拟抽题与五维自评。',
};

export default function ToolsPage() {
  return (
    <LearningShell
      eyebrow="PRACTICE TOOLS / 把训练做实"
      title="工具不替你思考，只负责让训练更接近考场。"
      desc="计时、草稿、字数、自检和练习记录都围绕一个目标：让一次练习留下可以复盘的数据，而不是做完就算。"
    >
      <StudyHub initialTab="工具" standalone />
      <AdvancedTools />
    </LearningShell>
  );
}
