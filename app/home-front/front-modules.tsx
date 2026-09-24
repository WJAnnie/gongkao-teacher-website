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
        {routes.map((route, index) => (
          <li key={route.key}>
            <a className="front-module" href={route.href}>
              <i>{String(index + 1).padStart(2, '0')}</i>
              <span className="front-module-name">
                <b>{route.label}</b>
                <small>{learningRouteNotes[route.key]}</small>
              </span>
              <span className="front-module-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
