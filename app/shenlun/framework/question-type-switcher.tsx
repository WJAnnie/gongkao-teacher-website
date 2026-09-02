'use client';

import { useState } from 'react';
import type { QuestionTypeKnowledge } from './question-type-knowledge';

export function QuestionTypeSwitcher({ items }: { items: QuestionTypeKnowledge[] }) {
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug ?? 'summary');
  const active = items.find((item) => item.slug === activeSlug) ?? items[0];

  if (!active) return null;

  return (
    <section id="framework-question-types" className="question-type-switcher">
      <div className="question-type-switcher-tabs" aria-label="五大题型切换">
        {items.map((item) => (
          <button className={active.slug === item.slug ? 'active' : ''} key={item.slug} onClick={() => setActiveSlug(item.slug)} type="button">
            <span>{item.no}</span><b>{item.title}</b>
          </button>
        ))}
      </div>

      <article className="question-type-inline">
        <div className="question-type-inline-head">
          <span>{active.no}</span>
          <h3>{active.title}</h3>
        </div>
        <p>{active.tagline} {active.task}</p>
        <div className="question-type-inline-grid">
          <article>
            <b>01 / 审题与步骤</b>
            <ul>{active.steps.map((step) => <li key={step.title}><strong>{step.title}</strong>：{step.desc}</li>)}</ul>
          </article>
          <article>
            <b>02 / 作答结构</b>
            <ul>{active.structure.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <b>03 / 复盘提醒</b>
            <ul>{active.review.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <b>04 / 常见失分</b>
            <ul>{active.mistakes.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <b>05 / 练习方向</b>
            <ul>{active.practice.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </article>
    </section>
  );
}
