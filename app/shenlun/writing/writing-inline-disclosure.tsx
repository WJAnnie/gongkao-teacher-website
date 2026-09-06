import { Fragment, type ReactNode } from 'react';

export type WritingDisclosureItem = {
  id: string;
  no: string;
  title: string;
  meta?: string;
  group?: string;
};

export function WritingInlineDisclosure({
  activeId,
  children,
  items,
  label,
  onToggle,
  unit = '项',
}: {
  activeId: string;
  children: ReactNode;
  items: readonly WritingDisclosureItem[];
  label: string;
  onToggle: (id: string) => void;
  unit?: string;
}) {
  const groupCounts = new Map<string, number>();
  for (const item of items) {
    if (item.group) groupCounts.set(item.group, (groupCounts.get(item.group) ?? 0) + 1);
  }
  return <section className="writing-inline-disclosure" aria-label={label}>
    <header><h2>{label}</h2><span>共 {items.length} {unit} · 点击标题展开</span></header>
    {items.map((item, index) => {
      const open = item.id === activeId;
      const bodyId = `writing-leaf-${item.id.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
      const showGroup = item.group !== undefined && item.group !== items[index - 1]?.group;
      return <Fragment key={item.id}>
        {showGroup && item.group ? <h3 className="writing-inline-group">{item.group}<span>{groupCounts.get(item.group)} 句</span></h3> : null}
        <section className={`writing-inline-disclosure-item${showGroup ? ' group-first' : ''}${open ? ' open' : ''}`}>
          <button aria-controls={bodyId} aria-expanded={open} onClick={() => onToggle(item.id)} type="button">
            <strong>{item.no}</strong><span><b>{item.title}</b>{item.meta ? <small>{item.meta}</small> : null}</span><i aria-hidden="true">{open ? '收起 ↑' : '展开 ↓'}</i>
          </button>
          {open ? <div className="writing-inline-disclosure-body" id={bodyId}>{children}</div> : null}
        </section>
      </Fragment>;
    })}
  </section>;
}
