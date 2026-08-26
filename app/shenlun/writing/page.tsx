import type { Metadata } from 'next';
import { ShenlunShell } from '../../shenlun-shell';

export const metadata: Metadata = {
  title: '写作积累｜申论学习｜答卷之外',
  description: '热点时评、案例素材、规范用词、比喻词库、对仗句库、主题佳句、名人箴言与作文框架。',
};

const categories = [
  {
    no: '01', title: '热点时评', desc: '先理解时代议题。把时政热点整理成“现象—问题—原因—价值—做法”的可调用素材，而不是只记事件。',
    items: ['基层治理', '新质生产力', '人工智能', '青年发展', '公共服务'],
  },
  {
    no: '02', title: '案例素材', desc: '再积累真实论据。把案例拆成“背景—做法—成效—启示”，需要论证时可以快速调用。',
    items: ['基层治理案例', '乡村振兴案例', '科技创新案例', '公共服务案例', '文化传承案例'],
  },
  {
    no: '03', title: '规范用词', desc: '先把话说准确。把材料中的口语、现象描述转成更精准的申论用词，建立自己的规范词索引。',
    items: ['问题类用词', '原因类用词', '措施类用词', '成效类用词', '政府工作高频动词'],
  },
  {
    no: '04', title: '比喻词库', desc: '在准确基础上增加形象表达。高频比喻按功能分类，避免“高级词”到处乱用。',
    items: ['定盘星：方向 / 原则', '压舱石：稳定 / 基础', '助推器：动力 / 促进', '连心桥：沟通 / 联系', '安全阀：风险 / 底线'],
  },
  {
    no: '05', title: '对仗句库', desc: '继续训练句式结构。重点积累逻辑成对、节奏清楚的表达方式，不死背整句。',
    items: ['既要……也要……', '一头连着……一头连着……', '从“有没有”转向“好不好”', '既做加法，也做减法'],
  },
  {
    no: '06', title: '主题佳句', desc: '按治理、民生、文化、生态、发展等主题积累可迁移表达，为不同主题快速建立语言储备。',
    items: ['基层治理', '民生服务', '文化传承', '生态文明', '改革发展'],
  },
  {
    no: '07', title: '名人箴言', desc: '把名言作为辅助论据，而不是装饰。只保留真正能支撑观点、能说明出处与含义的内容。',
    items: ['实干与担当', '学习与成长', '人民立场', '创新与改革', '文化与传承'],
  },
  {
    no: '08', title: '作文框架', desc: '最后解决“怎么成文”。不背万能模板，只保留审题、立意、分论点、论证和收束的通用骨架。',
    items: ['标题怎么定', '总论点怎么立', '分论点怎么拆', '例证怎么服务观点', '结尾怎么闭环'],
  },
] as const;

export default function ShenlunWritingPage() {
  return (
    <ShenlunShell tone="writing" eyebrow="WRITING LIBRARY / 让素材真正服务观点" title="写作积累" desc="积累按照“理解内容 → 储备论据 → 打磨表达 → 组织成文”的顺序进行。先有东西可写，再把话说准、说好，最后才谈整篇文章怎么搭。">
      <section className="shenlun-content">
        <div className="shenlun-section-head">
          <span>WRITING SYSTEM / 写作系统</span>
          <h2>八类积累，<br />按理解顺序来。</h2>
          <p>01—02 解决“写什么”，03—07 解决“怎么表达和论证”，08 解决“如何把已有内容组织成完整文章”。这条顺序更适合作为长期积累路线。</p>
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
