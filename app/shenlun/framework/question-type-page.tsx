import type { QuestionTypeKnowledge } from './question-type-knowledge';

export function QuestionTypePage({ data }: { data: QuestionTypeKnowledge }) {
  return (
    <section className="shenlun-content question-type-knowledge">
      <div className="shenlun-section-head">
        <span>{data.en} / 题型知识页</span>
        <h2>{data.title}<br />怎么学？</h2>
        <p>{data.task}</p>
      </div>

      <div className="question-type-hero-note">
        <span>{data.no}</span>
        <strong>{data.tagline}</strong>
        <p>先把任务看清，再把步骤练熟。遇到新题时，优先判断“我现在卡在审题、读材料、结构还是表达”。</p>
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
          <span>STRUCTURE / 答案结构</span>
          <h3>写的时候，先把骨架立住。</h3>
          <ol>{data.structure.map((item) => <li key={item}>{item}</li>)}</ol>
        </article>
        <article>
          <span>REMINDER / 高频提醒</span>
          <h3>这些地方最容易丢分。</h3>
          <ul>{data.review.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <span>MISTAKES / 常见误区</span>
          <h3>知道哪里错，比背答案更重要。</h3>
          <ul>{data.mistakes.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <span>PRACTICE / 练习方向</span>
          <h3>把方法变成稳定动作。</h3>
          <ul>{data.practice.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      </div>

      <a className="question-type-back" href="/shenlun/framework/">← 返回题型框架</a>
    </section>
  );
}
