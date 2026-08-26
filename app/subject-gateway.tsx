'use client';

import { useState } from 'react';

type Track = '申论' | '面试';

type ModuleItem = {
  no: string;
  title: string;
  en: string;
  desc: string;
  href: string;
  tone: 'framework' | 'questions' | 'writing' | 'videos';
};

const shenlunModules: ModuleItem[] = [
  { no: '01', title: '方法框架', en: 'METHOD', desc: '题型 · 能力 · 规则 · 技巧', href: './shenlun/framework/', tone: 'framework' },
  { no: '02', title: '真题精练', en: 'PRACTICE', desc: '国考 · 联考 · 地方真题', href: './shenlun/questions/', tone: 'questions' },
  { no: '03', title: '写作积累', en: 'WRITING', desc: '热点 · 案例 · 用词 · 作文', href: './shenlun/writing/', tone: 'writing' },
  { no: '04', title: '课程现场', en: 'CLASS', desc: '精讲 · 实录 · 日常 · 分享', href: './shenlun/videos/', tone: 'videos' },
];

const interviewModules: ModuleItem[] = [
  { no: '01', title: '题型方法', en: 'METHOD', desc: '分析 · 组织 · 应急 · 模拟', href: './interview/methods/', tone: 'framework' },
  { no: '02', title: '真题实战', en: 'PRACTICE', desc: '国考 · 省考 · 回忆真题', href: './interview/questions/', tone: 'questions' },
  { no: '03', title: '表达训练', en: 'SPEAK', desc: '观点 · 结构 · 例证 · 表达', href: './interview/expression/', tone: 'writing' },
  { no: '04', title: '课程现场', en: 'CLASS', desc: '精讲 · 实录 · 日常 · 分享', href: './interview/videos/', tone: 'videos' },
];

const tracks = [
  { key: '申论' as const, code: 'A / SHENLUN', note: '从材料到表达', modules: shenlunModules },
  { key: '面试' as const, code: 'B / INTERVIEW', note: '从判断到开口', modules: interviewModules },
];

export function SubjectGateway() {
  const [active, setActive] = useState<Track | null>(null);

  return (
    <section
      className="subject-gateway"
      id="learn"
      aria-label="申论与面试学习目录"
      onMouseLeave={() => setActive(null)}
    >
      <div className="subject-gateway-label">
        <span>LEARNING DIRECTORY / 学习入口</span>
        <p>移入科目，展开二级目录</p>
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
                className="subject-track-button"
                type="button"
                onFocus={() => setActive(track.key)}
                onClick={() => setActive(isActive ? null : track.key)}
                aria-expanded={isActive}
              >
                <span className="subject-track-code">{track.code}</span>
                <strong>{track.key}学习</strong>
                <em>{track.note}</em>
                <span className="subject-track-arrow" aria-hidden="true">{isActive ? '↘' : '→'}</span>
              </button>

              {isActive && (
                <div className="subject-module-panel">
                  <div className="subject-module-grid">
                    {track.modules.map((item) => (
                      <a className={`subject-module-card ${item.tone}`} href={item.href} key={item.no}>
                        <div className="subject-module-top">
                          <span>{item.no}</span>
                          <i>{item.en}</i>
                        </div>
                        <h2>{item.title}</h2>
                        <p>{item.desc}</p>
                        <b aria-hidden="true">↗</b>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="subject-gateway-hint">DESKTOP / 悬停展开　·　MOBILE / 点击展开</p>
    </section>
  );
}
