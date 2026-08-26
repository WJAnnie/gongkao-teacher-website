'use client';

import { useState } from 'react';

type Track = '申论' | '面试';

type ModuleItem = {
  no: string;
  title: string;
  en: string;
  desc: string;
  href: string;
  tone: 'framework' | 'questions' | 'writing' | 'videos';
  meta: string;
};

const shenlunModules: ModuleItem[] = [
  {
    no: '01',
    title: '方法框架',
    en: 'METHOD',
    desc: '五大题型、核心能力、表达规则与实用技巧。',
    href: '/shenlun/framework/',
    tone: 'framework',
    meta: '题型框架 · 核心能力 · 表达规则 · 实用技巧',
  },
  {
    no: '02',
    title: '真题精练',
    en: 'PRACTICE',
    desc: '按国考、省考联考与地区进入历年真题。',
    href: '/shenlun/questions/',
    tone: 'questions',
    meta: '国考真题 · 省考联考 · 地方真题',
  },
  {
    no: '03',
    title: '写作积累',
    en: 'WRITING',
    desc: '热点、案例、规范用词、句式与作文框架。',
    href: '/shenlun/writing/',
    tone: 'writing',
    meta: '热点时评 · 案例素材 · 规范用词 · 作文框架',
  },
  {
    no: '04',
    title: '课程现场',
    en: 'CLASS',
    desc: '课程精讲、课堂实录、工作日常与碎片分享。',
    href: '/shenlun/videos/',
    tone: 'videos',
    meta: '课程精讲 · 课堂实录 · 工作日常 · 碎片分享',
  },
];

const interviewModules: ModuleItem[] = [
  {
    no: '01',
    title: '题型方法',
    en: 'METHOD',
    desc: '把常见结构化面试题型拆成可迁移的方法。',
    href: '/interview/methods/',
    tone: 'framework',
    meta: '综合分析 · 计划组织 · 应急应变 · 情景模拟',
  },
  {
    no: '02',
    title: '真题实战',
    en: 'PRACTICE',
    desc: '按系统、地区和年份整理公开回忆真题。',
    href: '/interview/questions/',
    tone: 'questions',
    meta: '国考系统 · 省考地区 · 回忆真题',
  },
  {
    no: '03',
    title: '表达训练',
    en: 'SPEAK',
    desc: '从观点到结构，再到自然、具体的口头表达。',
    href: '/interview/expression/',
    tone: 'writing',
    meta: '观点建立 · 结构组织 · 例证 · 情景表达',
  },
  {
    no: '04',
    title: '课程现场',
    en: 'CLASS',
    desc: '课程精讲、课堂实录和日常教学片段。',
    href: '/interview/videos/',
    tone: 'videos',
    meta: '课程精讲 · 课堂实录 · 工作日常 · 碎片分享',
  },
];

export function SubjectGateway() {
  const [active, setActive] = useState<Track | null>(null);
  const modules = active === '申论' ? shenlunModules : active === '面试' ? interviewModules : [];

  return (
    <section className="subject-gateway" aria-label="申论与面试学习目录">
      <div className="subject-gateway-label">
        <span>01 / 一级目录</span>
        <p>点击科目，展开二级目录。</p>
      </div>

      <div className="subject-major-grid">
        <button
          type="button"
          className={`subject-major subject-major-shenlun${active === '申论' ? ' active' : ''}`}
          onClick={() => setActive(active === '申论' ? null : '申论')}
          aria-expanded={active === '申论'}
        >
          <span className="subject-major-no">A / SHENLUN</span>
          <strong>申论学习</strong>
          <span className="subject-major-action">{active === '申论' ? '收起目录 ↑' : '点击展开 ↓'}</span>
        </button>

        <button
          type="button"
          className={`subject-major subject-major-interview${active === '面试' ? ' active' : ''}`}
          onClick={() => setActive(active === '面试' ? null : '面试')}
          aria-expanded={active === '面试'}
        >
          <span className="subject-major-no">B / INTERVIEW</span>
          <strong>面试学习</strong>
          <span className="subject-major-action">{active === '面试' ? '收起目录 ↑' : '点击展开 ↓'}</span>
        </button>
      </div>

      {active && (
        <div className="subject-module-panel">
          <div className="subject-module-panel-head">
            <span>02 / 二级目录</span>
            <strong>{active}学习</strong>
            <p>点击任一模块，进入独立学习网站 ↗</p>
          </div>
          <div className="subject-module-grid">
            {modules.map((item) => (
              <a className={`subject-module-card ${item.tone}`} href={item.href} key={item.no}>
                <div className="subject-module-top">
                  <span>{item.no}</span>
                  <i>{item.en}</i>
                </div>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
                <small>{item.meta}</small>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
