import type { Metadata } from 'next';
import { InterviewLearningContent, type InterviewBoard } from '../interview-learning-content';
import { InterviewShell } from '../interview-shell';

export const metadata: Metadata = {
  title: '题型方法｜面试学习｜答卷之外',
  description: '结构化面试常见题型的方法框架与训练入口。',
};

const cards = [
  ['01', '综合分析', '先确认讨论对象和核心矛盾，再给出判断。原因、影响、做法按题目需要展开。'],
  ['02', '计划组织', '从目标、对象、场景入手，把人员、流程、资源和风险安排清楚。'],
  ['03', '应急应变', '先抓最紧急的风险和现场秩序，再处理核心问题，最后补救和复盘。'],
  ['04', '人际沟通', '分清工作任务、关系边界和情绪状态。先解决事，再处理沟通。'],
  ['05', '情景模拟', '带着身份和对象说话。语气、措辞、顺序都要符合真实场景。'],
  ['06', '岗位认知', '从岗位职责、公共价值和个人经历里找连接点，让回答有具体内容。'],
] as const;

const flow = [
  ['01', '看题干', '圈出身份、对象、任务和限制条件。'],
  ['02', '定重点', '先写两三个关键词，确认这道题最需要回应什么。'],
  ['03', '搭顺序', '把观点按因果、递进或流程排好，再开口。'],
  ['04', '做复盘', '回听内容、结构、语言和时间，第二遍只改最关键的问题。'],
] as const;

const boards = [
  { id: 'interview-methods-practice', eyebrow: '一题三遍', title: '同一道题，练三次。', desc: '第一遍只列提纲，第二遍完整作答，第三遍根据录音重答。三遍之间只改最明显的问题。', items: ['提纲控制在 30—60 秒', '完整作答记录时间', '重答时删掉空话和重复'] },
  { id: 'interview-methods-check', eyebrow: '答后检查', title: '四个问题就够了。', desc: '答完先别急着找参考答案，回听自己的内容。', items: ['题目交代的任务完成了吗', '前后顺序听得懂吗', '例子真的在证明观点吗', '有没有明显的模板词和重复句'] },
] as const satisfies readonly [InterviewBoard, InterviewBoard];

export default function InterviewMethodsPage() {
  return (
    <InterviewShell tone="methods" eyebrow="题型方法" title="题型方法" desc="结构化面试常见题型都有稳定的思考抓手。先看任务，再搭结构，最后把内容说顺。">
      <section className="interview-content"><InterviewLearningContent boards={boards} cards={cards} flow={flow} flowId="interview-methods-flow" label="题型方法学习目录" mapId="interview-methods-map" /></section>
    </InterviewShell>
  );
}
