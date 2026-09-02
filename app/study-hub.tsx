'use client';

import { useEffect, useMemo, useState } from 'react';
import { contentCatalog } from './data/content-catalog';
import { createPracticeRecordStore, type PracticeRecord } from './data/practice-record-store';
import { type Question, type Subject } from './question-bank-data';
import { SubjectGateway } from './subject-gateway';

type StudyTab = '题库' | '资料' | '工具';

const materials = [
  {
    key: '申论入门',
    title: '申论从 0 到 1',
    desc: '先知道试卷到底在考什么，再开始刷题。',
    items: ['申论试卷结构', '材料阅读四步法', '审题关键词清单', '答案形成流程', '常见失分原因'],
  },
  {
    key: '小题方法',
    title: '小题方法库',
    desc: '每类题只保留能迁移的方法，不背固定答案。',
    items: ['归纳概括', '综合分析', '提出对策', '贯彻执行 / 公文写作', '题型混合与变式'],
  },
  {
    key: '文章写作',
    title: '文章写作训练',
    desc: '从立意到论证，拆掉“背模板作文”的依赖。',
    items: ['审题与立意', '标题训练', '分论点生成', '案例论证', '道理论证', '开头与结尾自检'],
  },
  {
    key: '面试方法',
    title: '结构化面试题型地图',
    desc: '题型只是入口，核心是判断、任务和沟通。',
    items: ['综合分析', '计划组织', '应急应变', '人际沟通', '情景模拟', '岗位认知'],
  },
  {
    key: '表达训练',
    title: '面试表达训练营',
    desc: '把“想到了”变成“说清楚了”。',
    items: ['30 秒观点训练', '2 分钟结构训练', '去模板化改写', '例子如何服务观点', '点评与回应', '口头复盘'],
  },
  {
    key: '热点素材',
    title: '申面共用热点素材',
    desc: '一套素材同时服务申论分析和面试表达。',
    items: ['基层治理', '乡村振兴', '营商环境', '青年发展', '人工智能', '新质生产力', '公共服务', '文化建设', '生态文明'],
  },
  {
    key: '规范表达',
    title: '规范词与表达库',
    desc: '不是背高级词，而是给常见材料信息找到准确概括。',
    items: ['问题类规范词', '原因类规范词', '措施类规范词', '成效类规范词', '政府工作高频动词'],
  },
  {
    key: '晨读积累',
    title: '每日晨读与政策阅读',
    desc: '训练阅读、概括和口头表达，一份材料三种用法。',
    items: ['政策原文摘读', '时政事件卡', '人物案例', '治理案例', '3 分钟口述题'],
  },
];

const selfChecks = [
  '我真正回答了题目任务，而不是只说了相关内容',
  '每一层之间有清楚的分类或逻辑关系',
  '例子、政策或材料信息都在为观点服务',
  '没有大段正确但无效的套话',
  '结尾给出了闭环，而不是突然停止',
];

const questionCatalog = contentCatalog.listQuestions();

function formatTime(total: number) {
  const mins = Math.floor(total / 60).toString().padStart(2, '0');
  const secs = (total % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

export function StudyHub({ initialTab = '题库', standalone = false }: { initialTab?: StudyTab; standalone?: boolean }) {
  const [activeTab, setActiveTab] = useState<StudyTab>(initialTab);
  const [subject, setSubject] = useState<'全部' | Subject>('全部');
  const [type, setType] = useState('全部题型');
  const [keyword, setKeyword] = useState('');
  const [randomQuestion, setRandomQuestion] = useState<Question | null>(null);
  const [draft, setDraft] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(180);
  const [timerStartSeconds, setTimerStartSeconds] = useState(180);
  const [timerRunning, setTimerRunning] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(selfChecks.map(() => false));
  const [records, setRecords] = useState<PracticeRecord[]>([]);
  const [rating, setRating] = useState('基本完成');
  const recordStore = useMemo(
    () =>
      createPracticeRecordStore({
        getItem: (key) => window.localStorage.getItem(key),
        setItem: (key, value) => window.localStorage.setItem(key, value),
        removeItem: (key) => window.localStorage.removeItem(key),
      }),
    [],
  );

  const typeOptions = useMemo(() => {
    const scoped = subject === '全部' ? questionCatalog : questionCatalog.filter((item) => item.subject === subject);
    return ['全部题型', ...Array.from(new Set(scoped.map((item) => item.type)))];
  }, [subject]);

  const filteredQuestions = useMemo(() => {
    const lower = keyword.trim().toLowerCase();
    return questionCatalog.filter((item) => {
      const subjectMatched = subject === '全部' || item.subject === subject;
      const typeMatched = type === '全部题型' || item.type === type;
      const keywordMatched = !lower || `${item.year}${item.exam}${item.type}${item.topic}${item.summary}${item.focus}`.toLowerCase().includes(lower);
      return subjectMatched && typeMatched && keywordMatched;
    });
  }, [subject, type, keyword]);

  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => {
      setTimerSeconds((value) => {
        if (value <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning]);

  useEffect(() => {
    let active = true;
    try {
      const saved = recordStore.load();
      queueMicrotask(() => {
        if (active) setRecords(saved);
      });
    } catch {
      // Local storage is optional. The tool still works without persistence.
    }
    return () => { active = false; };
  }, [recordStore]);

  const setPreset = (seconds: number) => {
    setTimerRunning(false);
    setTimerStartSeconds(seconds);
    setTimerSeconds(seconds);
  };

  const pickRandom = () => {
    const pool = filteredQuestions.length ? filteredQuestions : questionCatalog;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setRandomQuestion(picked);
    setPreset(picked.subject === '面试' ? 180 : picked.type === '文章写作' ? 3600 : 1200);
  };

  const saveRecord = () => {
    const target = randomQuestion ?? filteredQuestions[0];
    if (!target) return;
    const next: PracticeRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString('zh-CN'),
      subject: target.subject,
      title: `${target.year} ${target.exam}｜${target.type}`,
      seconds: Math.max(0, timerStartSeconds - timerSeconds),
      words: draft.trim().length,
      rating,
    };
    const updated = [next, ...records].slice(0, 8);
    setRecords(updated);
    try {
      recordStore.save(updated);
    } catch {
      // Keep the in-memory record if storage is unavailable.
    }
  };

  return (
    <section className={`study-hub${standalone ? ' study-hub-standalone' : ''}`} id="study">
      {!standalone && <SubjectGateway />}

      <header className="section-heading dark-text study-heading">
        <div>
          <p className="section-index">{standalone ? '学习台' : '通用训练工作台'}</p>
          <h2>{standalone ? (initialTab === '题库' ? '真题题库' : initialTab === '资料' ? '学习资料' : '训练工具') : '通用训练中心'}</h2>
        </div>
        <p>{standalone ? '题库、资料和工具放在同一套学习系统里。' : '选完申论或面试，再用这里的通用题库、资料和工具完成训练。'}<br />学完马上练，练完马上复盘。</p>
      </header>

      {!standalone && (
        <div className="study-shortcuts" aria-label="独立学习页面入口">
          <a href="/questions/">打开完整题库 ↗</a>
          <a href="/materials/">进入学习资料 ↗</a>
          <a href="/tools/">打开训练工具 ↗</a>
        </div>
      )}

      <div className="study-tabs" role="tablist" aria-label="学习中心栏目">
        {(['题库', '资料', '工具'] as const).map((tab) => (
          <button
            key={tab}
            className={`filter-control${activeTab === tab ? ' active is-selected' : ''}`}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
            type="button"
          >
            {tab === '题库' ? '真题 / 专项题库' : tab === '资料' ? '学习资料库' : '训练工具箱'}
          </button>
        ))}
      </div>

      {activeTab === '题库' && (
        <div className="question-bank">
          <div className="question-toolbar">
            <div className="toolbar-group">
              {(['全部', '申论', '面试'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`filter-control${subject === item ? ' active is-selected' : ''}`}
                  aria-pressed={subject === item}
                  onClick={() => { setSubject(item); setType('全部题型'); }}
                >
                  {item}
                </button>
              ))}
            </div>
            <select value={type} onChange={(event) => setType(event.target.value)} aria-label="选择题型">
              {typeOptions.map((item) => <option key={item}>{item}</option>)}
            </select>
            <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜年份、主题、题型…" aria-label="搜索题库" />
            <button type="button" className="random-button" onClick={pickRandom}>随机抽一题 ↗</button>
          </div>

          {randomQuestion && (
            <article className="random-question">
              <span>今日抽题</span>
              <strong>{randomQuestion.subject} · {randomQuestion.type} · {randomQuestion.topic}</strong>
              <h3>{randomQuestion.summary}</h3>
              <p>训练重点：{randomQuestion.focus}</p>
              <small>{randomQuestion.year} · {randomQuestion.exam} · {randomQuestion.source}</small>
            </article>
          )}

          <div className="question-count">当前 {filteredQuestions.length} 题 · 真题仅展示题意摘要，完整材料建议使用合法来源自行整理</div>
          <div className="question-list">
            {filteredQuestions.map((item) => (
              <article className="question-item content-card" key={item.id}>
                <div className="question-meta">
                  <span>{item.subject}</span><span>{item.year}</span><span>{item.exam}</span>
                </div>
                <div className="question-main">
                  <p>{item.type} / {item.topic}</p>
                  <h3>{item.summary}</h3>
                  <small>训练重点：{item.focus}</small>
                </div>
                <div className="question-source">{item.source}</div>
              </article>
            ))}
          </div>
        </div>
      )}

      {activeTab === '资料' && (
        <div className="material-library">
          <div className="material-intro">
            <strong>资料不是越多越好。</strong>
            <p>这里按“学完能不能马上练”来组织内容：方法 → 示例 → 练习 → 复盘。每个条目都配有相应的方法、示例与练习，复盘时可以按主题快速回查。</p>
          </div>
          <div className="material-grid">
            {materials.map((item, index) => (
              <article className="material-card content-card" key={item.key}>
                <span>0{index + 1}</span>
                <p>{item.key}</p>
                <h3>{item.title}</h3>
                <small>{item.desc}</small>
                <ul>{item.items.map((child) => <li key={child}>{child}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      )}

      {activeTab === '工具' && (
        <div className="toolbox-grid">
          <article className="tool-card timer-tool">
            <div className="tool-title"><span>01</span><h3>答题计时器</h3></div>
            <p className="timer-display">{formatTime(timerSeconds)}</p>
            <div className="timer-presets">
              <button type="button" onClick={() => setPreset(180)}>面试 3 分钟</button>
              <button type="button" onClick={() => setPreset(1200)}>申论小题 20 分钟</button>
              <button type="button" onClick={() => setPreset(3600)}>作文 60 分钟</button>
            </div>
            <div className="timer-actions">
              <button type="button" onClick={() => setTimerRunning((value) => !value)}>{timerRunning ? '暂停' : '开始'}</button>
              <button type="button" onClick={() => { setTimerRunning(false); setTimerSeconds(timerStartSeconds); }}>重置</button>
            </div>
          </article>

          <article className="tool-card writing-tool">
            <div className="tool-title"><span>02</span><h3>作答草稿 / 字数统计</h3></div>
            <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="把你的申论答案、面试提纲或复盘写在这里…" />
            <div className="writing-stats"><strong>{draft.trim().length}</strong><span>字 / 字符</span></div>
          </article>

          <article className="tool-card checklist-tool">
            <div className="tool-title"><span>03</span><h3>答后自检</h3></div>
            <div className="check-list">
              {selfChecks.map((item, index) => (
                <label key={item}>
                  <input type="checkbox" checked={checked[index]} onChange={() => setChecked((current) => current.map((value, i) => i === index ? !value : value))} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
            <p className="check-score">完成 {checked.filter(Boolean).length} / {selfChecks.length}</p>
          </article>

          <article className="tool-card record-tool">
            <div className="tool-title"><span>04</span><h3>练习记录</h3></div>
            <p>随机抽题后完成一次练习，可以把记录保存在当前浏览器。</p>
            <div className="record-rating">
              {['需要重做', '基本完成', '比较满意'].map((item) => (
                <button key={item} type="button" className={rating === item ? 'active' : ''} onClick={() => setRating(item)}>{item}</button>
              ))}
            </div>
            <button className="save-record" type="button" onClick={saveRecord}>保存本次练习</button>
            <div className="record-list">
              {records.length === 0 ? <small>还没有记录。先去题库随机抽一题吧。</small> : records.map((record) => (
                <div key={record.id}>
                  <span>{record.date} · {record.subject}</span>
                  <strong>{record.title}</strong>
                  <small>{formatTime(record.seconds)} · {record.words} 字 · {record.rating}</small>
                </div>
              ))}
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
