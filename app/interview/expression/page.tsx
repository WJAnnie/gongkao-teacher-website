import type { Metadata } from 'next';
import { InterviewLearningContent, type InterviewBoard } from '../interview-learning-content';
import { InterviewShell } from '../interview-shell';

export const metadata: Metadata = {
  title: '表达训练｜面试学习｜答卷之外',
  description: '结构化面试观点、结构、例证与自然表达训练。',
};

const cards = [
  ['01', '观点建立', '第一句话先把判断说清楚，让听者知道你准备从哪里展开。'],
  ['02', '结构组织', '并列、递进、因果三种关系用熟，答案就会更容易听懂。'],
  ['03', '例证使用', '例子要短，作用要明确。说完案例，补一句它说明了什么。'],
  ['04', '自然表达', '把长句拆短，把书面词换成能顺口说出来的句子。'],
  ['05', '情景沟通', '看对象、身份和情绪调整语气，尤其注意开头和收尾。'],
  ['06', '口头复盘', '录音回听卡顿、重复和逻辑断点，第二遍只改最明显的一处。'],
] as const;

const flow = [
  ['01', '30 秒', '只说一个观点和一个理由，练开头。'],
  ['02', '60 秒', '补充一个例子或一个现实场景。'],
  ['03', '120 秒', '完整说一遍，控制节奏和层次。'],
  ['04', '再来一次', '删掉重复句，把最弱的一段重说。'],
] as const;

const boards = [
  { id: 'interview-expression-daily', eyebrow: '每日小练', title: '十分钟就能做完。', desc: '找一道题，只练开头、结构和一个例子。短练习更适合每天保持口感。', items: ['30 秒说观点', '1 分钟说结构', '补一个具体例子', '回听一次'] },
  { id: 'interview-expression-review', eyebrow: '回听重点', title: '听自己，比看稿有用。', desc: '录音里最容易听出重复、句子太长和观点不清。', items: ['第一句话有没有观点', '一句话是不是太长', '有没有连续重复同一个词', '结尾有没有突然收住'] },
] as const satisfies readonly [InterviewBoard, InterviewBoard];

export default function InterviewExpressionPage() {
  return (
    <InterviewShell tone="expression" eyebrow="表达训练" title="表达训练" desc="面试表达靠长期练习。观点、结构、例子和语气分开练，最后再合到一遍完整作答里。">
      <section className="interview-content"><InterviewLearningContent boards={boards} cards={cards} flow={flow} flowId="interview-expression-flow" label="表达训练学习目录" mapId="interview-expression-map" /></section>
    </InterviewShell>
  );
}
