import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';

export const metadata: Metadata = {
  title: '写作积累｜申论学习｜答卷之外',
  description: '时代热点、对仗句式、比喻词库、作文框架、主题佳句、名人箴言与规范表达。',
};

const categories = [
  {
    no: '01', title: '热点时评', desc: '把时政热点整理成“现象—问题—原因—价值—做法”的可调用素材，而不是只记事件。',
    items: ['基层治理', '新质生产力', '人工智能', '青年发展', '公共服务'],
  },
  {
    no: '02', title: '对仗句库', desc: '积累结构工整、逻辑成对的表达方式，重点学句式关系，不死背整句。',
    items: ['既要……也要……', '一头连着……一头连着……', '从“有没有”转向“好不好”', '既做加法，也做减法'],
  },
  {
    no: '03', title: '比喻词库', desc: '把高频比喻按功能分类：定方向、稳基础、强动力、守底线，避免到处乱用。',
    items: ['定盘星：方向 / 原则', '压舱石：稳定 / 基础', '助推器：动力 / 促进', '连心桥：沟通 / 联系', '安全阀：风险 / 底线'],
  },
  {
    no: '04', title: '作文框架', desc: '不背一篇万能模板，只保留审题、立意、分论点、论证和收束的通用骨架。',
    items: ['标题怎么定', '总论点怎么立', '分论点怎么拆', '例证怎么服务观点', '结尾怎么闭环'],
  },
  {
    no: '05', title: '主题佳句', desc: '按治理、民生、文化、生态、发展等主题积累可迁移表达，方便写作时快速调用。',
    items: ['基层治理', '民生服务', '文化传承', '生态文明', '改革发展'],
  },
  {
    no: '06', title: '名人箴言', desc: '名言不是装饰。只保留真正能支撑观点、能够解释清楚出处和含义的内容。',
    items: ['实干与担当', '学习与成长', '人民立场', '创新与改革', '文化与传承'],
  },
  {
    no: '07', title: '规范表达', desc: '把材料中的口语、现象描述转成更准确的申论表达，建立自己的规范词索引。',
    items: ['问题类词汇', '原因类词汇', '措施类词汇', '成效类词汇', '政府工作高频动词'],
  },
] as const;

export default function ShenlunWritingPage() {
  return (
    <ShenlunShell tone="writing" eyebrow="WRITING LIBRARY / 让素材真正服务观点" title="写作积累" desc="积累不是为了把作文写得华丽，而是让你在需要论证时有内容、有语言、有结构。所有素材都尽量按“能不能迁移到下一道题”来整理。">
      <section className="shenlun-content">
        <div className="shenlun-section-head">
          <span>WRITING SYSTEM / 写作系统</span>
          <h2>七类积累，<br />从内容到表达。</h2>
          <p>建议把“热点时评 + 规范表达”作为日常主线，把句式、比喻、佳句和名言作为辅助。作文框架单独解决“有内容但写不成文章”的问题。</p>
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
