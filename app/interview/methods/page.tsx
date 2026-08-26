import type { Metadata } from 'next';
import { InterviewShell } from '../interview-shell';

export const metadata: Metadata = {
  title: '题型方法｜面试学习｜答卷之外',
  description: '结构化面试常见题型的方法框架与训练入口。',
};

const cards = [
  ['01', '综合分析', '先明确对象与矛盾，再形成价值判断，最后展开原因、影响和建议。'],
  ['02', '计划组织', '先确认目标、对象与场景，再安排流程、资源和风险控制。'],
  ['03', '应急应变', '先稳住现场和核心风险，再分轻重缓急处理，最后补救复盘。'],
  ['04', '人际沟通', '先识别关系与任务，再处理情绪、事实和协作边界。'],
  ['05', '情景模拟', '把身份、对象、目的和语气带入真实场景，避免背稿式表达。'],
  ['06', '岗位认知', '从岗位职责、公共价值和个人匹配度建立真实回答。'],
] as const;

export default function InterviewMethodsPage() {
  return (
    <InterviewShell tone="methods" eyebrow="METHOD / 先学方法，再练表达" title="题型方法" desc="把结构化面试常见题型拆成可迁移的任务模型。不是背六套模板，而是学会先看清题目让你完成什么，再决定答案怎么组织。">
      <section className="interview-content">
        <div className="interview-content-head"><span>QUESTION TYPES / 题型地图</span><h2>先认任务，<br />再组织答案。</h2></div>
        <div className="interview-card-grid">
          {cards.map(([no, title, desc]) => <article className="interview-card" key={title}><span>{no}</span><h3>{title}</h3><p>{desc}</p></article>)}
        </div>
        <p className="interview-note">后续每一种题型会继续拆成：审题抓手 → 思考结构 → 高频误区 → 真题示例 → 口头训练。</p>
      </section>
    </InterviewShell>
  );
}
