import type { ReactNode } from 'react';
import type { LearningTone } from './learning-routes';

export function LearningEntryLink({
  href,
  tone,
  className = '',
  children,
  current = false,
  dataAttributes = {},
}: {
  href: string;
  tone: LearningTone;
  className?: string;
  children: ReactNode;
  current?: boolean;
  dataAttributes?: Readonly<Record<`data-${string}`, string>>;
}) {
  return (
    <a
      {...dataAttributes}
      className={`learning-entry-link tone-${tone} ${className}`.trim()}
      href={href}
      aria-current={current ? 'page' : undefined}
    >
      <div className="learning-entry-link__content">{children}</div>
      <span className="learning-entry-link__arrow" aria-hidden="true">↗</span>
    </a>
  );
}
