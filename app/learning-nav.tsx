'use client';

import { useState } from 'react';

type LearningNavKey =
  | 'shenlun-framework'
  | 'shenlun-questions'
  | 'shenlun-writing'
  | 'shenlun-videos'
  | 'interview-methods'
  | 'interview-questions'
  | 'interview-expression'
  | 'interview-videos';

const groups = [
  {
    key: 'shenlun',
    label: '申论',
    items: [
      ['方法框架', '/shenlun/framework/', 'shenlun-framework'],
      ['真题精练', '/shenlun/questions/', 'shenlun-questions'],
      ['写作积累', '/shenlun/writing/', 'shenlun-writing'],
      ['课程现场', '/shenlun/videos/', 'shenlun-videos'],
    ],
  },
  {
    key: 'interview',
    label: '面试',
    items: [
      ['题型方法', '/interview/methods/', 'interview-methods'],
      ['真题实战', '/interview/questions/', 'interview-questions'],
      ['表达训练', '/interview/expression/', 'interview-expression'],
      ['课程现场', '/interview/videos/', 'interview-videos'],
    ],
  },
] as const;

export function LearningTopNav({ active }: { active?: LearningNavKey }) {
  const activeGroup = active?.startsWith('interview-') ? 'interview' : active?.startsWith('shenlun-') ? 'shenlun' : null;
  const [mobileOpen, setMobileOpen] = useState<string | null>(activeGroup);

  return (
    <header className="learning-topnav">
      <a className="learning-topnav-brand" href="/">
        <span>答</span>
        <b>答卷之外</b>
      </a>

      <nav className="learning-topnav-desktop" aria-label="学习页面导航">
        {groups.map((group) => (
          <div className={`learning-nav-cluster learning-nav-${group.key}${activeGroup === group.key ? ' current-group' : ''}`} key={group.key}>
            <span className="learning-nav-group-label">{group.label}</span>
            <div className="learning-nav-items">
              {group.items.map(([label, href, key]) => (
                <a className={active === key ? 'active' : ''} href={href} key={key} aria-current={active === key ? 'page' : undefined}>{label}</a>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="learning-topnav-mobile">
        {groups.map((group) => {
          const open = mobileOpen === group.key;
          return (
            <div className={`learning-mobile-group${open ? ' open' : ''}`} key={group.key}>
              <button
                type="button"
                className="learning-mobile-group-trigger"
                aria-expanded={open}
                onClick={() => setMobileOpen(open ? null : group.key)}
              >
                <span>{group.label}</span><i aria-hidden="true">⌄</i>
              </button>
              {open && (
                <div className="learning-mobile-group-items">
                  {group.items.map(([label, href, key]) => (
                    <a className={active === key ? 'active' : ''} href={href} key={key} aria-current={active === key ? 'page' : undefined}>{label}</a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <a className="learning-topnav-home" href="/" aria-label="返回答卷之外首页">⌂</a>
    </header>
  );
}
