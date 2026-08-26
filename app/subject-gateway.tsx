'use client';

import { useState } from 'react';

type Track = '申论' | '面试';

const shenlunModules = [
  {
    no: '01',
    title: '方法框架',
    en: 'METHOD',
    desc: '先搭骨架，再做题。题型、能力、规则与实用技巧一次看清。',
    href: '/shenlun/framework/',
    tone: 'framework',
    meta: '题型框架 · 核心能力 · 表达规则 · 实用技巧',
  },
  {
    no: '02',
    title: '真题精练',
    en: 'PRACTICE',
    desc: '按国考、省考与地区进入历年真题，把方法放回真实材料。',
    href: '/shenlun/questions/',
    tone: 'questions',
    meta: '国考真题 · 省考联考 · 地方真题',
  },
  {
    no: '03',
    title: '写作积累',
    en: 'WRITING',
    desc: '先理解内容、储备论据，再打磨表达，最后组织成文。',
    href: '/shenlun/writing/',
    tone: 'writing',
    meta: '热点时评 · 案例素材 · 规范用词 · 作文框架',
  },
  {
    no: '04',
    title: '课程现场',
    en: 'VIDEO',
    desc: '课程精讲、课堂实录与日常工作，让方法看得见、听得见。',
    href: '/shenlun/videos/',
    tone: 'videos',
    meta: '课程精讲 · 课堂实录 · 工作日常 · 碎片分享',
  },
] as const;

const interviewModules = [
  ['题型方法', '综合分析 · 计划组织 · 应急应变'],
  ['真题实战', '国考系统 · 省考地区 · 回忆真题'],
  ['表达训练', '观点 · 结构 · 例证 · 情景模拟'],
  ['课程现场', '课程精讲 · 课堂实录 · 日常分享'],
] as const;

export function SubjectGateway() {
  const [active, setActive] = useState<Track>('申论');

  return (
    <div className="subject-gateway" aria-label="申论与面试学习入口">
      <div className="subject-gateway-heading">
        <div>
          <p className="section-index">04 — CHOOSE YOUR TRACK</p>
          <h2>先选一门，<br />再往深处学。</h2>
        </div>
        <p>申论与面试不再混在一个资料列表里。<br />每一科都有自己的方法、真题、积累和课堂。</p>
      </div>

      <div className="subject-major-grid">
        <button
          type="button"
          className={`subject-major subject-major-shenlun${active === '申论' ? ' active' : ''}`}
          onClick={() => setActive('申论')}
          aria-expanded={active === '申论'}
        >
          <span className="subject-major-no">A / 申论</span>
          <strong>申论学习</strong>
          <p>读懂材料，形成判断，准确表达。</p>
          <span className="subject-major-action">{active === '申论' ? '正在展开 ↓' : '展开学习路径 ↘'}</span>
        </button>

        <button
          type="button"
          className={`subject-major subject-major-interview${active === '面试' ? ' active' : ''}`}
          onClick={() => setActive('面试')}
          aria-expanded={active === '面试'}
        >
          <span className="subject-major-no">B / 面试</span>
          <strong>面试学习</strong>
          <p>看清任务，建立观点，自然表达。</p>
          <span className="subject-major-action">{active === '面试' ? '正在展开 ↓' : '展开学习路径 ↘'}</span>
        </button>
      </div>

      {active === '申论' ? (
        <div className="subject-module-panel shenlun-module-panel">
          <div className="subject-panel-intro">
            <span>SHENLUN / 申论学习地图</span>
            <p>四个入口不是四个资料夹，而是一条训练顺序：<b>先懂方法 → 再做真题 → 持续积累 → 回到课堂。</b></p>
          </div>
          <div className="subject-module-grid">
            {shenlunModules.map((item) => (
              <a className={`subject-module-card ${item.tone}`} href={item.href} key={item.no}>
                <div className="subject-module-top"><span>{item.no}</span><i>{item.en}</i></div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <small>{item.meta}</small>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className="subject-module-panel interview-module-panel">
          <div className="subject-panel-intro">
            <span>INTERVIEW / 面试学习地图</span>
            <p>这轮先把申论做完整，面试学习将在同一套设计逻辑下继续展开。先把栏目骨架放在这里，方便你判断整体层级。</p>
          </div>
          <div className="interview-preview-grid">
            {interviewModules.map(([title, meta], index) => (
              <div className="interview-preview-card" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{meta}</p>
                <small>NEXT / 下一轮完善</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
