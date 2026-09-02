import type { Metadata } from 'next';
import { InterviewLearningContent, type InterviewBoard } from '../interview-learning-content';
import { InterviewShell } from '../interview-shell';

export const metadata: Metadata = {
  title: '真题实战｜面试学习｜答卷之外',
  description: '按系统、地区和年份整理结构化面试公开回忆真题。',
};

const cards = [
  ['01', '国考系统', '税务、海关、铁路公安等系统按年份归档，方便对比命题习惯。'],
  ['02', '省考地区', '按地区整理公开回忆题，观察题型组合、场景和表达偏好。'],
  ['03', '题型筛选', '综合分析、计划组织、应急应变、情景模拟等题型可以单独练。'],
  ['04', '限时作答', '按考场时间列提纲、开口作答，重点练节奏和取舍。'],
  ['05', '答后复盘', '检查任务、结构、例证、语言和时间，保留一条最需要改的问题。'],
  ['06', '讲评记录', '同一道题把提纲、作答、修改和课堂讲评放在一起，方便回看。'],
] as const;

const flow = [
  ['01', '读题', '先判断题型和任务，圈身份、对象、场景。'],
  ['02', '列提纲', '只写关键词，先把顺序排清楚。'],
  ['03', '计时答', '按真实时长说完整，不在中途反复推翻。'],
  ['04', '复盘', '记录一处内容问题、一处表达问题，再重答一次。'],
] as const;

const boards = [
  { id: 'interview-questions-index', eyebrow: '当前索引', title: '先从国考税务练起。', desc: '这里收录了 2024—2026 年税务系统公开考生回忆题，可用来练综合分析、组织协调、应急和情景模拟。', items: ['同一天题目连做，感受整套节奏', '同一题型跨年份做，观察命题变化', '保留第一次提纲，方便对比'] },
  { id: 'interview-questions-review', eyebrow: '复盘清单', title: '每次只记五项。', desc: '记录越简单，越容易坚持。', items: ['题目任务有没有答全', '最有效的一个观点是什么', '最空的一段在哪里', '有没有明显卡顿或重复', '下一次只改哪一件事'] },
] as const satisfies readonly [InterviewBoard, InterviewBoard];

export default function InterviewQuestionsPage() {
  return (
    <InterviewShell tone="questions" eyebrow="真题实战" title="真题实战" desc="真题按系统、地区、年份和题型整理。做题时把提纲、作答、修改放在同一条记录里，更容易看见自己的变化。">
      <section className="interview-content"><InterviewLearningContent boards={boards} cards={cards} flow={flow} flowId="interview-questions-flow" label="真题实战学习目录" mapId="interview-questions-map" /></section>
    </InterviewShell>
  );
}
