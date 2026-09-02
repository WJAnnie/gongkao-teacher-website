import type { ReactNode } from 'react';

export type WritingDisclosureItem = {
  id: string;
  no: string;
  title: string;
  meta?: string;
};

export function WritingInlineDisclosure({
  activeId,
  children,
  items,
  label,
  onToggle,
}: {
  activeId: string;
  children: ReactNode;
  items: readonly WritingDisclosureItem[];
  label: string;
  onToggle: (id: string) => void;
}) {
  return <section className="writing-inline-disclosure" aria-label={label}>
    <header><h2>{label}</h2><span>共 {items.length} 项 · 点击标题展开</span></header>
    {items.map((item) => {
      const open = item.id === activeId;
      const bodyId = `writing-leaf-${item.id.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
      return <section className={`writing-inline-disclosure-item${open ? ' open' : ''}`} key={item.id}>
        <button aria-controls={bodyId} aria-expanded={open} onClick={() => onToggle(item.id)} type="button">
          <strong>{item.no}</strong><span><b>{item.title}</b>{item.meta ? <small>{item.meta}</small> : null}</span><i aria-hidden="true">{open ? '收起 ↑' : '展开 ↓'}</i>
        </button>
        {open ? <div className="writing-inline-disclosure-body" id={bodyId}>{children}</div> : null}
      </section>;
    })}
  </section>;
}
