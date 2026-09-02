'use client';

/* eslint-disable @next/next/no-html-link-for-pages -- Vinext's Next Link shim emits RSC prefetch errors in static production builds. */

import { useState } from 'react';
import { interviewRoutes, shenlunRoutes, type LearningRouteKey } from './learning-routes';

const groups = [
  {
    key: 'shenlun',
    label: '申论',
    items: shenlunRoutes,
  },
  {
    key: 'interview',
    label: '面试',
    items: interviewRoutes,
  },
] as const;

export function LearningTopNav({ active }: { active?: LearningRouteKey }) {
  const activeGroup = active?.startsWith('interview-') ? 'interview' : active?.startsWith('shenlun-') ? 'shenlun' : null;
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);

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
              {group.items.map((item) => (
                <a className={active === item.key ? 'active' : ''} href={item.href} key={item.key} aria-current={active === item.key ? 'page' : undefined}>{item.label}</a>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div
        className="learning-topnav-mobile"
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            const trigger = event.currentTarget.querySelector<HTMLButtonElement>('[aria-expanded="true"]');
            setMobileOpen(null);
            trigger?.focus();
          }
        }}
      >
        {groups.map((group) => {
          const open = mobileOpen === group.key;
          return (
            <div className={`learning-mobile-group${open ? ' open' : ''}`} key={group.key}>
              <button
                type="button"
                className="learning-mobile-group-trigger learning-disclosure-trigger"
                aria-controls={`learning-menu-${group.key}`}
                aria-expanded={open}
                onClick={() => setMobileOpen(open ? null : group.key)}
              >
                <span>{group.label}</span><i aria-hidden="true">⌄</i>
              </button>
              {open && (
                <div className="learning-mobile-group-items" id={`learning-menu-${group.key}`}>
                  {group.items.map((item) => (
                    <a
                      className={active === item.key ? 'active' : ''}
                      href={item.href}
                      key={item.key}
                      aria-current={active === item.key ? 'page' : undefined}
                      onClick={() => setMobileOpen(null)}
                    >
                      {item.label}
                    </a>
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
