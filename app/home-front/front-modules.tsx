import { learningRouteNotes } from '../learning-route-notes';
import type { LearningRoute, LearningRouteKey } from '../learning-routes';

type ModuleRoute = LearningRoute & { key: LearningRouteKey };

export function FrontModuleColumn({ title, note, routes }: { title: string; note: string; routes: readonly ModuleRoute[] }) {
  return (
    <section className="front-col front-modules" aria-label={title}>
      <div className="front-kicker">
        <h2>{title}</h2>
        <span>{note}</span>
      </div>
      <ol className="front-module-list">
        {routes.map((route, index) => {
          const isLead = index === 0;
          return (
            <li key={route.key} className={isLead ? 'front-module-item-lead' : 'front-module-item-sub'}>
              <a
                className={`front-module ${isLead ? 'front-module-lead' : 'front-module-sub'}`}
                href={route.href}
              >
                <i className="front-module-num">{String(index + 1).padStart(2, '0')}</i>
                <span className="front-module-name">
                  <span className="front-module-headline">
                    <b>{route.label}</b>
                    {isLead && <span className="front-module-tag">从这里开始</span>}
                  </span>
                  <small>{learningRouteNotes[route.key]}</small>
                </span>
                <span className="front-module-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
