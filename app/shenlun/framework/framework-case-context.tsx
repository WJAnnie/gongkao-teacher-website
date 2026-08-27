'use client';

import { useEffect } from 'react';

type CaseMeta = {
  match: string[];
  source: string;
  task: string;
  material: string;
};

const CASES: CaseMeta[] = [
  {
    match: ['累进式执法'],
    source: '江苏省考 · 综合分析例题',
    task: '题干要求对执法方式的变化作出评价。重点不在复述两种做法，而在判断这种变化是否合理，并说明依据。',
    material: '材料对比“教育—警告—处罚”的累进式执法与现场直接处罚，涉及差异化教育、法律警示、交通安全和群众接受度等信息。',
  },
  {
    match: ['香樟树处罚争议', '香樟树'],
    source: '江苏省考 · 原因/争议分析例题',
    task: '题目围绕一次香樟树处罚事件引发热议的原因展开，需要从不同争议点中归纳“为什么会引发讨论”。',
    material: '材料同时出现当事人说法、部门处理、处罚尺度、树木权属认知和处置程序等信息，不能只概括成“双方有分歧”。',
  },
  {
    match: ['种戏'],
    source: '国考 · 词句理解例题',
    task: '题干要求理解“种戏”的含义。先解释这个材料特有说法，再用材料中的具体做法说明它如何实现。',
    material: '材料从文化惠民、结合民俗、根据需求创新、培养观众、培养人才等方面讲戏曲如何在基层长期扎根。',
  },
  {
    match: ['眼中的柜台', '柜台理解题', '柜台'],
    source: '国考 · 词句理解例题',
    task: '题目要求理解“眼中的柜台”和“心中的柜台”。需要分别解释两个概念，并结合材料分析二者之间从形式到理念的关系。',
    material: '“眼中的柜台”偏向前台设置、办理方式和沟通距离；“心中的柜台”进一步指向服务理念、部门协同和体制机制。',
  },
  {
    match: ['有形与无形'],
    source: '国考 · 理解分析例题',
    task: '题干要求理解材料中的“有形”和“无形”。作答要先解释两类概念，再把材料中的建设与变化分别归入对应层次。',
    material: '有形内容主要是道路、住房、饮水、宽带等硬件；无形内容涉及干部思想、教育观念、勤劳致富风气等变化。',
  },
  {
    match: ['绣花功夫', '两种绣花'],
    source: '江苏省考 · 对比分析例题',
    task: '题目要求比较两种“绣花功夫”。要用同一组维度比较目的、做法和效果，并形成价值判断。',
    material: '一组材料强调精细创新、真实解决基层难题；另一组材料表现为应付检查、展示政绩和形式主义。',
  },
  {
    match: ['老人再就业'],
    source: '国考 · 提出对策例题',
    task: '题目围绕老年人再就业中的现实困难提出解决建议。作答要先锁定问题，再让措施逐一对应。',
    material: '材料涉及岗位机会、社会偏见、家庭态度、技能培训、劳动合同和保险保障等多个方面。',
  },
  {
    match: ['同心小院'],
    source: '江苏省考 · 启示类例题',
    task: '题目要求从“同心小院”的治理实践中总结可借鉴经验。重点是把地方特色做法提高为可迁移的方法。',
    material: '材料包含召集人设置、共商共议、课堂和剧场等活动平台、积分评比等具体治理做法。',
  },
  {
    match: ['退藕还稻'],
    source: '江苏省考 · 公开信例题',
    task: '题目要求以特定身份给村民写公开信，既解释政策和耕地要求，也要回应群众对收益、种植方式和保障的现实关切。',
    material: '材料涉及耕地红线、“水稻+”增收、科学轮作、补贴和技术支持等内容，必须按写信对象重新组织。',
  },
  {
    match: ['生猪养殖', '养殖经验'],
    source: '课堂材料 · 经验交流讲话稿',
    task: '任务是向其他养殖村介绍本村的治理经验。讲话稿要先说明原有问题和为什么采用这套办法，再展开具体经验。',
    material: '材料围绕传统养殖的污染、统计和管理困难，以及信息系统、三级人员网络、污染治理和动态追溯等做法展开。',
  },
  {
    match: ['鹤溪缸窑', '小陶题'],
    source: '课堂材料 · 提纲写作例题',
    task: '任务是根据材料整理介绍鹤溪缸窑的提纲。格式可以简，但开头、发展主线和结尾都要完整。',
    material: '材料最明显的逻辑是起源、兴盛、生产方式演进、传播繁荣、衰落和现实传承困境，适合按发展历程组织。',
  },
  {
    match: ['工会宣传单'],
    source: '江苏省考 · 宣传类公文例题',
    task: '题目要求面向新业态从业者进行宣传。需要说明为什么值得加入、能够获得哪些服务，以及希望读者采取什么行动。',
    material: '材料涉及生活援助、体检、服务驿站、心理和法律咨询、线上入会等服务内容。',
  },
  {
    match: ['特派员与领航员'],
    source: '江苏省考 · 人才/基层工作材料',
    task: '这组材料用于训练案例转化：人物故事最终要根据题干，转化成科技服务、成果转化、基础设施、产业发展或组织建设等工作要素。',
    material: '材料通过不同人物在农业一线、学院基地、村庄建设和产业发展中的行动呈现工作成效。',
  },
  {
    match: ['古为今用'],
    source: '江苏省考 · 归纳概括例题',
    task: '题目需要从多组传统文化实践中归纳其现实运用。不能只写“借鉴传统文化”，还要看每个案例具体解决什么。',
    material: '材料把传统文化分别用于基层治理、制度建设、生态保护、文明实践、公共卫生等现实领域。',
  },
  {
    match: ['城市治理案例', '城市治理'],
    source: '江苏省考 · 特点/评价类材料',
    task: '题目要求从多个城市治理案例中总结特点或价值。客观案例需要进一步转换成“治理方式怎么样”的评价。',
    material: '材料出现直播式执法、柔性监管、信用修复等做法，可据此提炼创新、精细、人性化等属性，但评价必须有事实依据。',
  },
  {
    match: ['行政行为码', '数字技术提升执法效能', 'A市利用数字技术'],
    source: '江苏省考 · 数字执法成效材料',
    task: '题目关注数字技术给执法带来的实际成效，学生需要区分“用了什么工具”和“产生了什么变化”。',
    material: '材料涉及行政行为码、智慧交通管理系统、AI辅助等工具，以及预警监督、节约时间、提高记录规范性等效果。',
  },
  {
    match: ['人才题', '引才、育才、留才、用才', '人才归纳'],
    source: '课堂真题整理 · 人才工作例题',
    task: '题目围绕人才工作做法或经验展开，需要把多个人物故事转成同层级的人才工作要素。',
    material: '材料中的返乡、拜师帮带、岗位安排、政策和技术保障等具体行为，可以进一步归纳为引才、育才、留才、用才。',
  },
  {
    match: ['农贸市场', '市场问题', '市场材料', '层级判断', '同一则材料，两种字数'],
    source: '课堂材料 · 农贸市场练习',
    task: '这组材料主要用于训练“背景与问题”“概括层级”“字数与简写”的区别。根据不同题干，保留的细节层级会不同。',
    material: '材料出现居民增加、过道狭窄、排水不畅、消防设施不足、水沟异味、通风差，以及后续消防、排水、通风改造等信息。',
  },
  {
    match: ['部分老人不会使用智能手机', '主体意识'],
    source: '课堂示例 · 主体判断',
    task: '这是用来训练“同一句材料要放回题干主体判断”的教学情境，不对应一套完整真题。',
    material: '“老人不会用智能手机”可以是服务对象特征；只有题干问治理问题且材料出现取消线下渠道等治理行为时，才可能成为治理方式的问题。',
  },
  {
    match: ['群众多次反映问题', '从“知道”到“理解”'],
    source: '课堂示例 · 认知训练',
    task: '这是说明“题干对象改变，要素身份也会改变”的教学示例，不对应完整真题。',
    material: '同一句“群众多次反映、部门相互转办”，在群众体验、部门问题和形成原因三种问法下，会得到不同答案身份。',
  },
  {
    match: ['热线、意见箱', '材料怎么变答案'],
    source: '课堂示例 · 材料转答案',
    task: '用于演示概括、归纳和评价三种转换，不对应一套完整真题。',
    material: '同类渠道可以归纳为“畅通反馈渠道”；口语可以概括为规范问题表达；客观事实在特点题中还可能进一步形成评价。',
  },
  {
    match: ['青年成长', '基层治理', '传统文化', '行政执法'],
    source: '作文写作示例 · 非完整真题答案',
    task: '这里展示的是开头、分论点、论证段或结尾的写法，用于说明结构和表达，不对应某一道完整真题的标准答案。',
    material: '示例只保留当前知识点所需的写作语境，学生应重点看“观点—论证—回扣”的形成过程，而不是背原句。',
  },
];

function findMeta(text: string) {
  return CASES.find((item) => item.match.some((key) => text.includes(key)));
}

export function FrameworkCaseContext({ activeLayer }: { activeLayer: string }) {
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const root = document.getElementById('framework-manual-top');
      if (!root) return;
      const cases = root.querySelectorAll<HTMLElement>('.framework-deep-case, .framework-voice-example, .type-v3-critique');
      cases.forEach((card) => {
        if (card.querySelector('.framework-case-context')) return;
        const copy = card.querySelector<HTMLElement>('.framework-deep-case-copy, .critique-copy') ?? card.querySelector<HTMLElement>(':scope > div');
        if (!copy) return;
        const text = card.textContent ?? '';
        const meta = findMeta(text);
        if (!meta) return;
        const title = copy.querySelector('h5');
        if (!title) return;

        const context = document.createElement('div');
        context.className = 'framework-case-context';

        const source = document.createElement('p');
        source.className = 'framework-case-source';
        source.textContent = `例题来源 / ${meta.source}`;

        const task = document.createElement('p');
        task.className = 'framework-case-task';
        const taskLabel = document.createElement('b');
        taskLabel.textContent = '题干任务：';
        task.append(taskLabel, document.createTextNode(meta.task));

        const material = document.createElement('p');
        material.className = 'framework-case-material';
        const materialLabel = document.createElement('b');
        materialLabel.textContent = '材料情境：';
        material.append(materialLabel, document.createTextNode(meta.material));

        context.append(source, task, material);
        title.insertAdjacentElement('afterend', context);
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeLayer]);

  return null;
}
