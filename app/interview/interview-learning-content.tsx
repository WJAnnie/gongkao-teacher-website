import { LearningContentFrame } from '../learning-chapter-navigation';

type InterviewItem = readonly [no: string, title: string, desc: string];
export type InterviewBoard = Readonly<{
  id: string;
  eyebrow: string;
  title: string;
  desc: string;
  items: readonly string[];
}>;

export function InterviewLearningContent({
  boards,
  cards,
  flow,
  flowId,
  label,
  mapId,
}: {
  boards: readonly [InterviewBoard, InterviewBoard];
  cards: readonly InterviewItem[];
  flow: readonly InterviewItem[];
  flowId: string;
  label: string;
  mapId: string;
}) {
  return <LearningContentFrame label={label}>
    <section id={mapId}>
      <div className="interview-card-grid">
        {cards.map(([no, title, desc]) => <article className="interview-card" key={title}><span>{no}</span><h3>{title}</h3><p>{desc}</p></article>)}
      </div>
    </section>
    <section className="interview-learning-flow" id={flowId}>
      {flow.map(([no, title, desc]) => <article className="interview-flow-step" key={no}><span>{no}</span><h3>{title}</h3><p>{desc}</p></article>)}
    </section>
    <div className="interview-practice-board">
      {boards.map((board) => <article id={board.id} key={board.id}>
        <span>{board.eyebrow}</span><h3>{board.title}</h3><p>{board.desc}</p>
        <ul>{board.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </article>)}
    </div>
  </LearningContentFrame>;
}
