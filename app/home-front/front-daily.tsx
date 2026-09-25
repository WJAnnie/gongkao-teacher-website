'use client';

import { useMemo } from 'react';
import { hashSeed, type FrontDate } from './front-date';
import type { FrontHotspot, FrontTerm } from './front-data';
import { FRONT_BASE_PATH, hotspotHref, hotspotIndexHref, termsHref } from './front-links';
import { pickDaily } from './front-picks';
import { useFrontToday } from './use-front-today';

const DAILY_COUNT = 3;

export function FrontHotspots({ initialDate, hotspots }: { initialDate: FrontDate; hotspots: readonly FrontHotspot[] }) {
  const today = useFrontToday(initialDate);
  const picks = useMemo(
    () => pickDaily(hotspots, hashSeed(`hotspots:${today.key}`), DAILY_COUNT),
    [hotspots, today.key],
  );

  return (
    <section className="front-col front-hot" aria-label="今日热点">
      <div className="front-kicker">
        <h2>今日热点</h2>
        <span>每天换三篇</span>
      </div>
      {picks.length === 0 ? (
        <p className="front-empty">热点时评整理中。</p>
      ) : (
        <ol className="front-hot-list">
          {picks.map((item) => (
            <li key={item.slug}>
              <a className="front-hot-link" href={hotspotHref(FRONT_BASE_PATH, item.categoryKey, item.slug)}>
                <span>{item.categoryLabel}</span>
                <b>{item.title}</b>
              </a>
            </li>
          ))}
        </ol>
      )}
      <a className="front-more" href={hotspotIndexHref(FRONT_BASE_PATH)}>全部热点时评 ↗</a>
    </section>
  );
}

export function FrontTerms({ initialDate, terms }: { initialDate: FrontDate; terms: readonly FrontTerm[] }) {
  const today = useFrontToday(initialDate);
  const picks = useMemo(
    () => pickDaily(terms, hashSeed(`terms:${today.key}`), DAILY_COUNT),
    [terms, today.key],
  );

  return (
    <section className="front-col front-terms" aria-label="规范用词">
      <div className="front-kicker">
        <h2><a href={termsHref(FRONT_BASE_PATH, picks[0]?.categoryKey)}>规范用词</a></h2>
        <span>今日三则 · 材料口语 → 规范表达</span>
      </div>
      {picks.length === 0 ? (
        <p className="front-empty">规范用词整理中。</p>
      ) : (
        <ul className="front-term-list">
          {picks.map((term) => (
            <li key={`${term.categoryKey}-${term.before}`}>
              <span className="front-term-before">{term.before}</span>
              <i className="front-term-arrow" aria-hidden="true">→</i>
              <b className="front-term-after">{term.after}</b>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
