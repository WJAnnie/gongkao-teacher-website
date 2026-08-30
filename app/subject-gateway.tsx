'use client';

import { useState } from 'react';
import { LearningEntryLink } from './learning-entry-link';
import { interviewRoutes, shenlunRoutes, type LearningRouteKey } from './learning-routes';

type Track = '申论' | '面试';

type ModulePresentation = {
  no: string;
  en: string;
  desc: string;
  classTone: 'framework' | 'questions' | 'writing' | 'videos';
};

const modulePresentation = {
  'shenlun-framework': { no: '01', en: 'METHOD', desc: '题型 · 能力 · 规则 · 技巧', classTone: 'framework' },
  'shenlun-questions': { no: '02', en: 'PRACTICE', desc: '国考 · 联考 · 地方真题', classTone: 'questions' },
  'shenlun-writing': { no: '03', en: 'WRITING', desc: '热点 · 案例 · 用词 · 作文', classTone: 'writing' },
  'shenlun-videos': { no: '04', en: 'CLASS', desc: '精讲 · 实录 · 日常 · 分享', classTone: 'videos' },
  'interview-methods': { no: '01', en: 'METHOD', desc: '分析 · 组织 · 应急 · 模拟', classTone: 'framework' },
  'interview-questions': { no: '02', en: 'PRACTICE', desc: '国考 · 省考 · 回忆真题', classTone: 'questions' },
  'interview-expression': { no: '03', en: 'SPEAK', desc: '观点 · 结构 · 例证 · 表达', classTone: 'writing' },
  'interview-videos': { no: '04', en: 'CLASS', desc: '精讲 · 实录 · 日常 · 分享', classTone: 'videos' },
} as const satisfies Record<LearningRouteKey, ModulePresentation>;

const shenlunModules = shenlunRoutes.map((route) => ({ route, ...modulePresentation[route.key] }));
const interviewModules = interviewRoutes.map((route) => ({ route, ...modulePresentation[route.key] }));

const tracks = [
  { key: '申论' as const, code: 'A', en: 'SHENLUN', note: '材料 · 题型 · 写作', modules: shenlunModules },
  { key: '面试' as const, code: 'B', en: 'INTERVIEW', note: '审题 · 观点 · 表达', modules: interviewModules },
];

export function SubjectGateway() {
  const [active, setActive] = useState<Track | null>(null);

  return (
    <div className="subject-gateway" aria-label="申论与面试学习目录" onMouseLeave={() => setActive(null)}>
      <div className="subject-gateway-kicker">
        <span>LEARNING INDEX</span>
        <b>学习目录</b>
      </div>

      <div className="subject-track-list">
        {tracks.map((track) => {
          const isActive = active === track.key;
          return (
            <div
              className={`subject-track-group subject-track-${track.key === '申论' ? 'shenlun' : 'interview'}${isActive ? ' active' : ''}`}
              key={track.key}
              onMouseEnter={() => setActive(track.key)}
            >
              <button
                className="subject-track-button learning-disclosure-trigger"
                type="button"
                onFocus={() => setActive(track.key)}
                onClick={() => setActive(isActive ? null : track.key)}
                aria-expanded={isActive}
              >
                <span className="subject-track-code">{track.code}</span>
                <span className="subject-track-title">
                  <strong>{track.key}学习</strong>
                  <i>{track.en}</i>
                </span>
                <em>{track.note}</em>
                <span className="subject-track-arrow" aria-hidden="true">{isActive ? '收起' : '展开'}</span>
              </button>

              {isActive && (
                <div className="subject-module-panel">
                  <div className="subject-module-grid">
                    {track.modules.map((item) => (
                      <LearningEntryLink
                        className={`subject-module-card ${item.classTone}`}
                        href={item.route.href}
                        key={item.route.key}
                        tone={item.route.tone}
                      >
                        <div className="subject-module-top">
                          <span>{item.no}</span>
                          <i>{item.en}</i>
                        </div>
                        <h2>{item.route.label}</h2>
                        <p>{item.desc}</p>
                      </LearningEntryLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
