import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';

export const metadata: Metadata = {
  title: '写作积累｜申论学习｜答卷之外',
  description: '热点时评、案例素材、规范用词、比喻词库、对仗句库、主题佳句、名人箴言与作文框架。',
};

const categories = [
  {
    no: '01', title: '热点时评', desc: '先看清时代议题。把一个热点拆成现象、问题、原因、价值和做法，留下以后还能调用的观点。',
    items: ['基层治理', '新质生产力', '人工智能', '青年发展', '公共服务'],
  },
  {
    no: '02', title: '案例素材', desc: '案例按“背景—做法—成效—启示”整理。写作时找得到、用得上，也方便替换成不同主题的论据。',
    items: ['基层治理案例', '乡村振兴案例', '科技创新案例', '公共服务案例', '文化传承案例'],
  },
  {
    no: '03', title: '规范用词', desc: '把材料里的现象描述压缩成更准确的词。积累时按问题、原因、措施、成效分类，查找会更快。',
    items: ['问题类用词', '原因类用词', '措施类用词', '成效类用词', '政府工作高频动词'],
  },
  {
    no: '04', title: '比喻词库', desc: '比喻词按功能记。先知道它适合什么语境，再决定要不要用。',
    items: ['定盘星：方向 / 原则', '压舱石：稳定 / 基础', '助推器：动力 / 促进', '连心桥：沟通 / 联系', '安全阀：风险 / 底线'],
  },
  {
    no: '05', title: '对仗句库', desc: '积累句式结构和节奏。把常见的并列、转折和递进写法练熟，换主题时也能自然调整。',
    items: ['既要……也要……', '一头连着……一头连着……', '从“有没有”转向“好不好”', '既做加法，也做减法'],
  },
  {
    no: '06', title: '主题佳句', desc: '治理、民生、文化、生态、发展等主题各留一批能直接迁移的表达。',
    items: ['基层治理', '民生服务', '文化传承', '生态文明', '改革发展'],
  },
  {
    no: '07', title: '名人箴言', desc: '名言主要用来支撑观点。记出处、记含义，也记它最适合放在哪类主题里。',
    items: ['实干与担当', '学习与成长', '人民立场', '创新与改革', '文化与传承'],
  },
  {
    no: '08', title: '作文框架', desc: '最后把已有内容组织成文章。标题、立意、分论点、论证和结尾逐项检查。',
    items: ['标题怎么定', '总论点怎么立', '分论点怎么拆', '例证怎么服务观点', '结尾怎么闭环'],
  },
] as const;

export default function ShenlunWritingPage() {
  return (
    <ShenlunShell tone="writing" eyebrow="WRITING LIBRARY / 写作积累" title="写作积累" desc="先理解议题，再攒案例和表达，最后把这些内容组织成一篇完整文章。积累越有分类，写的时候越容易调用。">
      <section className="shenlun-content">
        <div className="shenlun-section-head">
          <span>WRITING SYSTEM / 写作系统</span>
          <h2>八类积累，<br />按顺序慢慢攒。</h2>
          <p>前两类解决内容和论据，中间几类处理用词与句式，最后回到文章结构。</p>
        </div>
        <div className="writing-category-grid">
          {categories.map((item) => (
            <article className="writing-category" key={item.no}>
              <span>{item.no}</span><h3>{item.title}</h3><p>{item.desc}</p>
              <ul>{item.items.map((child) => <li key={child}>{child}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
    </ShenlunShell>
  );
}
