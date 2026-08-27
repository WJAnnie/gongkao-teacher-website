const shenlunLinks = [
  { no: '01', label: '方法框架', href: './shenlun/framework/', tone: 'blue' },
  { no: '02', label: '真题精练', href: './shenlun/questions/', tone: 'orange' },
  { no: '03', label: '写作积累', href: './shenlun/writing/', tone: 'green' },
  { no: '04', label: '课程现场', href: './shenlun/videos/', tone: 'red' },
];

const interviewLinks = [
  { no: '01', label: '题型方法', href: './interview/methods/', tone: 'blue' },
  { no: '02', label: '真题实战', href: './interview/questions/', tone: 'orange' },
  { no: '03', label: '表达训练', href: './interview/expression/', tone: 'green' },
  { no: '04', label: '课程现场', href: './interview/videos/', tone: 'red' },
];

function LearningRow({
  code,
  title,
  en,
  links,
}: {
  code: string;
  title: string;
  en: string;
  links: typeof shenlunLinks;
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
        {links.map((item) => (
          <a className={`repeat-learning-link ${item.tone}`} href={item.href} key={item.no}>
            <span>{item.no}</span>
            <b>{item.label}</b>
            <i aria-hidden="true">↗</i>
          </a>
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
          <span>LEARNING INDEX / 再次入口</span>
          <h2 id="repeat-learning-title">从这里继续往下学</h2>
        </div>
        <p>方法、真题、积累和课堂都可以直接进入。选一门，继续练。</p>
      </div>

      <div className="repeat-learning-directory">
        <LearningRow code="A" title="申论学习" en="SHENLUN" links={shenlunLinks} />
        <LearningRow code="B" title="面试学习" en="INTERVIEW" links={interviewLinks} />
      </div>
    </section>
  );
}
