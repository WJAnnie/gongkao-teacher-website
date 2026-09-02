import { LearningEntryLink } from './learning-entry-link';
import { interviewRoutes, shenlunRoutes, type LearningRoute } from './learning-routes';

function LearningRow({
  code,
  title,
  en,
  links,
}: {
  code: string;
  title: string;
  en: string;
  links: readonly LearningRoute[];
}) {
  return (
    <div className="repeat-learning-row">
      <div className="repeat-learning-subject">
        <span>{code}</span>
        <div>
          <strong>{title}</strong>
          <i>{en}</i>
        </div>
      </div>

      <div className="repeat-learning-links">
        {links.map((item, index) => (
          <LearningEntryLink
            className={`repeat-learning-link ${item.tone === 'acid' ? 'green' : item.tone}`}
            href={item.href}
            key={item.key}
            tone={item.tone}
          >
            <span>0{index + 1}</span>
            <b>{item.label}</b>
          </LearningEntryLink>
        ))}
      </div>
    </div>
  );
}

export function HomeLearningRepeat() {
  return (
    <section className="repeat-learning" aria-labelledby="repeat-learning-title">
      <div className="repeat-learning-head">
        <div>
          <span>再次入口</span>
          <h2 id="repeat-learning-title">从这里继续往下学</h2>
        </div>
        <p>方法、真题、积累和课堂都可以直接进入。选一门，继续练。</p>
      </div>

      <div className="repeat-learning-directory">
        <LearningRow code="A" title="申论学习" en="申论路径" links={shenlunRoutes} />
        <LearningRow code="B" title="面试学习" en="面试路径" links={interviewRoutes} />
      </div>
    </section>
  );
}
