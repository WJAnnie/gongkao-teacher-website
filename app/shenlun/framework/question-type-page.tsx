import type { QuestionTypeKnowledge } from './question-type-knowledge';

export function QuestionTypePage({ data }: { data: QuestionTypeKnowledge }) {
  return (
    <section className="shenlun-content question-type-knowledge">
      <div className="shenlun-section-head">
        <span>题型知识页</span>
        <h2>{data.title}<br />怎么做</h2>
        <p>{data.task}</p>
      </div>

      <div className="question-type-hero-note">
        <span>{data.no}</span>
        <strong>{data.tagline}</strong>
        <p>做题时依次检查审题、材料、结构和表达。哪一步不稳，就回到对应部分单练。</p>
      </div>

      <div className="question-type-step-grid">
        {data.steps.map((step, index) => (
          <article className="question-type-step" key={step.title}>
            <span>0{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
            <ul>{step.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
          </article>
        ))}
      </div>

      <div className="question-type-detail-grid">
        <article>
          <span>答案结构</span>
          <h3>先把骨架立住</h3>
          <ol>{data.structure.map((item) => <li key={item}>{item}</li>)}</ol>
        </article>
        <article>
          <span>高频提醒</span>
          <h3>容易失分的地方</h3>
          <ul>{data.review.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <span>常见误区</span>
          <h3>做完重点检查</h3>
          <ul>{data.mistakes.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <span>练习方向</span>
          <h3>接着怎么练</h3>
          <ul>{data.practice.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      </div>

      <a className="question-type-back" href="/shenlun/framework/">← 题型框架总览</a>
    </section>
  );
}
