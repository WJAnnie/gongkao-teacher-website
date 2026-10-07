import { getLearningReadingGuide } from './learning-reading-guide-data';

export function LearningReadingGuide({ activeId }: { activeId: string }) {
  const guide = getLearningReadingGuide(activeId);
  if (!guide) return null;

  return <aside className="learning-reading-guide" aria-labelledby="learning-reading-guide-title">
    <div className="learning-reading-guide__rule" aria-hidden="true" />
    <div className="learning-reading-guide__heading">
      <span>{guide.chapterNo}</span>
      <div>
        <p>{guide.chapterLabel}</p>
        <h2 id="learning-reading-guide-title">本节重点</h2>
      </div>
    </div>
    <ol className="learning-reading-guide__points">
      {guide.points.map((point) => <li key={point}>{point}</li>)}
    </ol>
    <section className="learning-reading-guide__exercise" aria-labelledby="learning-reading-guide-exercise">
      <h3 id="learning-reading-guide-exercise">本节练习</h3>
      <p>{guide.exercise}</p>
    </section>
  </aside>;
}
