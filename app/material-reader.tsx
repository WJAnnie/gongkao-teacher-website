'use client';

import { useMemo, useState } from 'react';
import { materialCategories, materialNotes } from './material-library-data';

export function MaterialReader() {
  const [category, setCategory] = useState('全部');
  const [subject, setSubject] = useState('全部');
  const [keyword, setKeyword] = useState('');

  const notes = useMemo(() => {
    const lower = keyword.trim().toLowerCase();
    return materialNotes.filter((note) => {
      const categoryMatch = category === '全部' || note.category === category;
      const subjectMatch = subject === '全部' || note.subject === subject;
      const keywordMatch = !lower || `${note.title}${note.summary}${note.label}${note.keyPoints.join('')}`.toLowerCase().includes(lower);
      return categoryMatch && subjectMatch && keywordMatch;
    });
  }, [category, subject, keyword]);

  return (
    <section className="note-library" aria-label="学习笔记库">
      <header className="note-library-heading">
        <div>
          <p className="section-index">READ / 直接开始学</p>
          <h2>学习笔记</h2>
        </div>
        <p>不是只给目录。每篇都包含核心方法、检查要点和一个可以马上做的小练习。</p>
      </header>

      <div className="note-toolbar">
        <div className="note-subjects">
          {['全部', '申论', '面试', '申面共用'].map((item) => (
            <button type="button" key={item} className={subject === item ? 'active' : ''} onClick={() => setSubject(item)}>{item}</button>
          ))}
        </div>
        <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="学习资料分类">
          <option>全部</option>
          {materialCategories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜题型、方法、热点…" aria-label="搜索学习资料" />
      </div>

      <p className="note-count">当前 {notes.length} 篇原创学习笔记 · 点击标题展开</p>
      <div className="note-list">
        {notes.map((note, index) => (
          <details className="note-item" key={note.id} open={index === 0 && notes.length < 8}>
            <summary>
              <div className="note-index">{String(materialNotes.indexOf(note) + 1).padStart(2, '0')}</div>
              <div className="note-summary-main">
                <p>{note.subject} · {note.category} · {note.label}</p>
                <h3>{note.title}</h3>
                <span>{note.summary}</span>
              </div>
              <b aria-hidden="true">＋</b>
            </summary>
            <div className="note-detail">
              <div>
                <strong>这篇先记住</strong>
                <ul>{note.keyPoints.map((point) => <li key={point}>{point}</li>)}</ul>
              </div>
              <div className="note-practice">
                <strong>马上练</strong>
                <p>{note.practice}</p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
