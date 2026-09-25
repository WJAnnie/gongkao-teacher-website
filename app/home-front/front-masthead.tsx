'use client';

import { formatChineseDay, formatMonthIssue, type FrontDate } from './front-date';
import { useFrontToday } from './use-front-today';

export function FrontMasthead({ initialDate }: { initialDate: FrontDate }) {
  const today = useFrontToday(initialDate);

  return (
    <header className="front-masthead">
      <div className="front-mast-top">
        <span>申论 × 结构化面试 · 长期学习站</span>
        <span>云帆老师 主编</span>
      </div>
      <div className="front-mast-title">
        <h1>答卷之外</h1>
        <span className="front-seal" aria-hidden="true">云帆<br />之印</span>
      </div>
      <div className="front-rule-double" aria-hidden="true" />
      <div className="front-dateline">
        <p>
          <b>{formatMonthIssue(today)}</b> · 今日 <time dateTime={today.key}>{formatChineseDay(today)}</time>
        </p>
        <p className="front-dateline-motto">方法 · 真题 · 积累 · 课堂</p>
        <nav aria-label="首页栏目">
          <a href="#study">学习入口</a>
          <span aria-hidden="true">｜</span>
          <a href="#about">编者按</a>
          <span aria-hidden="true">｜</span>
          <a href="#contact">获取资料</a>
        </nav>
      </div>
    </header>
  );
}
