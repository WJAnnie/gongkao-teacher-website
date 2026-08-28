export const writingHeroEntries = [
  { key: 'hotspots', no: '01', label: '热点时评', href: '/shenlun/writing/hotspots/' },
  { key: 'cases', no: '02', label: '案例素材', href: '/shenlun/writing/cases/' },
  { key: 'terms', no: '03', label: '规范用词', href: '/shenlun/writing/#terms' },
  { key: 'metaphors', no: '04', label: '比喻词库', href: '/shenlun/writing/metaphors/' },
  { key: 'parallel', no: '05', label: '对仗句库', href: '/shenlun/writing/#parallel' },
  { key: 'sentences', no: '06', label: '主题佳句', href: '/shenlun/writing/#sentences' },
  { key: 'quotes', no: '07', label: '名人箴言', href: '/shenlun/writing/#quotes' },
  { key: 'essay', no: '08', label: '作文框架', href: '/shenlun/writing/#essay' },
] as const;

export type WritingHeroKey = (typeof writingHeroEntries)[number]['key'];

export function WritingHeroMenu() {
  return (
    <nav className="shenlun-route-strip framework-hero-entry-strip writing-hero-entry-strip" aria-label="写作积累二级目录">
      {writingHeroEntries.map((item) => <a data-writing-hero={item.key} key={item.key} href={item.href}>
        <span style={{ padding: 0, border: 0 }}>{item.no}</span><b>{item.label}</b><i aria-hidden="true">进入</i>
      </a>)}
    </nav>
  );
}
