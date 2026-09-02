'use client';

import { useMemo, useState } from 'react';
import { questions, type Question } from './question-bank-data';

const scoreDimensions = [
  ['任务完成', '是否真正回应题目要求，而不是只说相关内容'],
  ['内容质量', '申论看要点与材料依据，面试看观点与现实内容'],
  ['结构逻辑', '层次是否清楚，观点之间有没有真实关系'],
  ['表达准确', '语言是否具体、简洁、自然，是否存在大量套话'],
  ['时间控制', '是否在目标时间内完成，并留出检查或收束空间'],
] as const;

function seededIndex(seed: number, length: number) {
  if (!length) return 0;
  const x = Math.abs(Math.sin(seed * 12.9898) * 43758.5453);
  return Math.floor((x - Math.floor(x)) * length);
}

function todaySeed() {
  const now = new Date();
  return Number(`${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`);
}

export function AdvancedTools() {
  const seed = todaySeed();
  const daily = useMemo(() => questions[seededIndex(seed, questions.length)], [seed]);
  const [mockMode, setMockMode] = useState<'面试三题' | '申论整卷'>('面试三题');
  const [mockQuestions, setMockQuestions] = useState<Question[]>([]);
  const [scores, setScores] = useState([3, 3, 3, 3, 3]);

  const total = scores.reduce((sum, value) => sum + value, 0);
  const totalPercent = Math.round((total / 25) * 100);

  const buildMock = () => {
    if (mockMode === '面试三题') {
      const pool = questions.filter((item) => item.subject === '面试');
      const picked: Question[] = [];
      let cursor = Date.now();
      while (picked.length < Math.min(3, pool.length)) {
        const candidate = pool[seededIndex(cursor, pool.length)];
        if (!picked.some((item) => item.id === candidate.id)) picked.push(candidate);
        cursor += 17;
      }
      setMockQuestions(picked);
      return;
    }

    const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
    const year = years[seededIndex(Date.now(), years.length)];
    setMockQuestions(questions.filter((item) => item.subject === '申论' && item.year === year && item.exam === '国考·地市级'));
  };

  return (
    <section className="advanced-tools" aria-label="进阶训练工具">
      <header className="advanced-tools-heading">
        <div>
          <p className="section-index">每天真的练起来</p>
          <h2>进阶工具</h2>
        </div>
        <p>计时解决“时间感”，这些工具继续解决“今天练什么”和“练完怎么判断”。</p>
      </header>

      <div className="advanced-tool-grid">
        <article className="advanced-tool daily-tool">
          <div className="advanced-tool-label"><span>05</span><b>每日一题</b></div>
          <p>{new Date().toLocaleDateString('zh-CN')}</p>
          <small>{daily.subject} · {daily.type} · {daily.topic}</small>
          <h3>{daily.summary}</h3>
          <div className="daily-focus">今天只盯一个训练重点：<strong>{daily.focus}</strong></div>
          <p className="advanced-note">每天按日期稳定抽取一题，同一天刷新页面不会变化。适合建立低负担的日常练习节奏。</p>
        </article>

        <article className="advanced-tool mock-tool">
          <div className="advanced-tool-label"><span>06</span><b>模拟抽题</b></div>
          <div className="mock-switch">
            {(['面试三题', '申论整卷'] as const).map((item) => (
              <button type="button" key={item} className={mockMode === item ? 'active' : ''} onClick={() => { setMockMode(item); setMockQuestions([]); }}>{item}</button>
            ))}
          </div>
          <button type="button" className="build-mock" onClick={buildMock}>生成本次模拟 ↗</button>
          <div className="mock-list">
            {mockQuestions.length === 0 ? (
              <p>选择模式后生成一次模拟。面试随机抽 3 题；申论随机抽取 2020—2025 一套国考地市级 5 个作答任务。</p>
            ) : mockQuestions.map((item, index) => (
              <div key={item.id}>
                <span>{String(index + 1).padStart(2, '0')} · {item.type}</span>
                <strong>{item.summary}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="advanced-tool score-tool">
          <div className="advanced-tool-label"><span>07</span><b>五维自评</b></div>
          <div className="score-total">
            <strong>{totalPercent}</strong><span>/ 100</span>
          </div>
          <div className="score-dimensions">
            {scoreDimensions.map(([title, desc], index) => (
              <label key={title}>
                <span><b>{title}</b><small>{desc}</small></span>
                <select value={scores[index]} onChange={(event) => setScores((current) => current.map((value, i) => i === index ? Number(event.target.value) : value))}>
                  <option value="1">1 · 明显不足</option>
                  <option value="2">2 · 需要改</option>
                  <option value="3">3 · 基本完成</option>
                  <option value="4">4 · 比较稳定</option>
                  <option value="5">5 · 表现很好</option>
                </select>
              </label>
            ))}
          </div>
          <p className="advanced-note">分数不是为了制造精确幻觉，而是强迫自己把“感觉答得一般”拆成具体问题。</p>
        </article>
      </div>
    </section>
  );
}
