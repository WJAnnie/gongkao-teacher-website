'use client';

import { WritingHotspotManual } from './writing-hotspot-manual';
import { hotspotCategories } from './writing-hotspot-all';
import { writingCaseCategories } from './writing-case-all';

const hotspotCount = hotspotCategories.reduce((total, category) => total + category.articles.length, 0);
const caseCount = writingCaseCategories.reduce((total, category) => total + category.cases.length, 0);

export function WritingHotspotManualRelease() {
  return (
    <>
      <div
        aria-label="写作积累内容库版本"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          margin: '0 0 18px',
          padding: '10px 14px',
          border: '1px solid rgba(134, 151, 67, 0.28)',
          background: 'rgba(214, 220, 167, 0.12)',
          color: '#68713c',
          fontSize: '12px',
          letterSpacing: '0.08em',
        }}
      >
        <span>CONTENT LIBRARY · 2026.08.28-R2</span>
        <b style={{ fontWeight: 500 }}>热点时评 {hotspotCount} 篇 · 案例素材 {caseCount} 个</b>
      </div>
      <WritingHotspotManual />
    </>
  );
}
