'use client';

import { useEffect, useState } from 'react';
import { getBeijingDate, type FrontDate } from './front-date';

// 静态页按构建当天渲染；浏览器加载后改用访客当天日期，只在日期不同时替换，避免水合不一致。
export function useFrontToday(initial: FrontDate): FrontDate {
  const [today, setToday] = useState(initial);

  useEffect(() => {
    let active = true;
    const current = getBeijingDate(new Date());
    queueMicrotask(() => {
      if (active && current.key !== initial.key) setToday(current);
    });
    return () => { active = false; };
  }, [initial.key]);

  return today;
}
