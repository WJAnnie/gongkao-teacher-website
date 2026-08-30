import type { ReactNode } from 'react';
import { LearningTopNav } from '../learning-nav';
import { LearningPageEffects, PageGuide, type GuideItem } from '../learning-page-effects';
import { interviewRoutes, shenlunRoutes } from '../learning-routes';
import './interview-learning.css';
import '../menu-hierarchy-refinement.css';

type InterviewTone = 'methods' | 'questions' | 'expression' | 'videos';

const toneToActive = {
  methods: 'interview-methods',
  questions: 'interview-questions',
  expression: 'interview-expression',
  videos: 'interview-videos',
} as const;

const toneToTraining = {
  methods: '题型专项',
  questions: '真题模拟',
  expression: '开口训练',
  videos: '课堂笔记',
} as const;

const guides: Record<InterviewTone, GuideItem[]> = {
  methods: [
    { no: '01', label: '综合分析', selector: '.interview-card:nth-child(1)' },
    { no: '02', label: '计划组织', selector: '.interview-card:nth-child(2)' },
    { no: '03', label: '应急应变', selector: '.interview-card:nth-child(3)' },
    { no: '04', label: '人际沟通', selector: '.interview-card:nth-child(4)' },
    { no: '05', label: '情景模拟', selector: '.interview-card:nth-child(5)' },
    { no: '06', label: '岗位认知', selector: '.interview-card:nth-child(6)' },
  ],
  questions: [
    { no: '01', label: '国考系统', selector: '.interview-card:nth-child(1)' },
    { no: '02', label: '省考地区', selector: '.interview-card:nth-child(2)' },
    { no: '03', label: '题型筛选', selector: '.interview-card:nth-child(3)' },
    { no: '04', label: '限时作答', selector: '.interview-card:nth-child(4)' },
    { no: '05', label: '答后复盘', selector: '.interview-card:nth-child(5)' },
    { no: '06', label: '讲评记录', selector: '.interview-card:nth-child(6)' },
  ],
  expression: [
    { no: '01', label: '观点建立', selector: '.interview-card:nth-child(1)' },
    { no: '02', label: '结构组织', selector: '.interview-card:nth-child(2)' },
    { no: '03', label: '例证使用', selector: '.interview-card:nth-child(3)' },
    { no: '04', label: '自然表达', selector: '.interview-card:nth-child(4)' },
    { no: '05', label: '情景沟通', selector: '.interview-card:nth-child(5)' },
    { no: '06', label: '口头复盘', selector: '.interview-card:nth-child(6)' },
  ],
  videos: [
    { no: '01', label: '课程精讲', selector: '.interview-card:nth-child(1)' },
    { no: '02', label: '课堂实录', selector: '.interview-card:nth-child(2)' },
    { no: '03', label: '真题讲评', selector: '.interview-card:nth-child(3)' },
    { no: '04', label: '工作日常', selector: '.interview-card:nth-child(4)' },
    { no: '05', label: '碎片分享', selector: '.interview-card:nth-child(5)' },
    { no: '06', label: '系列索引', selector: '.interview-card:nth-child(6)' },
  ],
};

export function InterviewShell({ tone, eyebrow, title, desc, children }: { tone: InterviewTone; eyebrow: string; title: string; desc: string; children: ReactNode }) {
  return (
    <main className={`interview-site interview-tone-${tone}`}>
      <LearningPageEffects />
      <LearningTopNav active={toneToActive[tone]} />

      <section className="interview-site-hero learning-hero-standard">
        <div className="interview-hero-topline"><span>面 / INTERVIEW</span><span>答卷之外 · 结构化面试</span></div>
        <span className="exam-review-stamp" aria-hidden="true">阅</span>
        <p className="interview-hero-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="exam-meta-strip" aria-label="面试训练信息">
          <span>科目 <b>结构化面试</b></span><span>训练 <b>{toneToTraining[tone]}</b></span><span>复盘 <b>审题 · 观点 · 结构 · 表达</b></span>
        </div>
        <div className="interview-hero-bottom">
          <p>{desc}</p>
          <nav className="interview-route-strip" aria-label="面试学习路径">
            {interviewRoutes.map((item, index) => (
              <a
                className={`route-${item.key.replace('interview-', '')}${toneToActive[tone] === item.key ? ' active' : ''}`}
                href={item.href}
                key={item.key}
                aria-current={toneToActive[tone] === item.key ? 'page' : undefined}
              >
                <span>0{index + 1}</span><b>{item.label}</b>
              </a>
            ))}
          </nav>
        </div>
        <PageGuide items={guides[tone]} embedded />
      </section>

      <div className="interview-color-line" aria-hidden="true" />
      {children}

      <footer className="interview-footer">
        <div><span>面试学习</span>{interviewRoutes.map((item) => <a href={item.href} key={item.key}>{item.label}</a>)}</div>
        <div><span>申论学习</span>{shenlunRoutes.map((item) => <a href={item.href} key={item.key}>{item.label}</a>)}</div>
        <p>答卷之外 · 申论 × 结构化面试</p>
      </footer>
    </main>
  );
}
