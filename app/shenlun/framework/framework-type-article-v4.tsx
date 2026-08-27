'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FrameworkTypeArticleV3 } from './framework-type-article-v3';

function AnalysisExamples() {
  return (
    <div className="type-v4-analysis-examples">
      <div className="expression-v2-subtitle strong">
        <span>例题拆解</span>
        <h4>综合分析别只记结构，先看题目到底让你处理什么关系</h4>
      </div>
      <p className="type-v4-analysis-lead">下面几个例子不要求背答案。重点看同样叫“综合分析”，题目不同，答案的长相为什么也不同。</p>

      <article className="type-v4-analysis-case">
        <div className="case-copy">
          <span>01 / 现象分析</span>
          <h5>“电脑进入学生日常学习，你怎么看？”</h5>
          <p><b>先判断：</b>题目问“怎么看”，没有直接指定找原因、问题还是对策。先回材料判断总体态度。</p>
          <p><b>如果材料同时写到：</b>查资料方便、提高效率，也写到沉迷娱乐、依赖工具等问题，那么答案可以先作“有积极作用，但使用不当也会产生问题”的总体判断。</p>
          <p><b>再组织：</b>积极作用 → 存在问题 → 材料若给出规范使用、加强引导等内容，再作为最后一层。</p>
        </div>
        <aside><b>阅 / 看什么</b><p>“辩证”来自材料本身存在两面，不是见到“怎么看”就机械写正反两面。</p></aside>
      </article>

      <article className="type-v4-analysis-case">
        <div className="case-copy">
          <span>02 / 理解分析</span>
          <h5>“撤销眼中的柜台”与“撤销心中的柜台”怎么理解？</h5>
          <p><b>第一步先解释词：</b>“眼中的柜台”偏向看得见的服务形式、办理距离和流程障碍；“心中的柜台”偏向服务意识、部门壁垒和理念上的隔阂。</p>
          <p><b>第二步回材料找表现：</b>前者可以对应窗口整合、线上办理、流程优化等外在变化；后者要看主动服务、协同意识、便民导向等内在变化。</p>
          <p><b>第三步处理关系：</b>形式优化解决“办事难不难”，理念改变决定“服务好不好”。二者如果材料呈现递进关系，答案也要把这种递进写出来。</p>
        </div>
        <aside><b>阅 / 看什么</b><p>理解题先把抽象词翻译成人话，再去找材料如何证明它。直接抄材料，往往看不出你真正理解了什么。</p></aside>
      </article>

      <article className="type-v4-analysis-case">
        <div className="case-copy">
          <span>03 / 原因分析</span>
          <h5>“为什么一场行政执法争议会持续引发讨论？”</h5>
          <p><b>题目已经明确问原因：</b>所以它虽然常放在综合分析中训练，要素本身并不模糊。</p>
          <p><b>读材料时可以分别发现：</b>事实认定存在争议、相关部门回应不充分、处罚尺度引发质疑、不同主体对权利边界认识不一、问题处理不够及时等。</p>
          <p><b>写答案时：</b>先按性质或主体合并同义内容，再用“认定依据、沟通回应、执法尺度、认知差异、处置效率”等中观表达统领细节。</p>
        </div>
        <aside><b>阅 / 看什么</b><p>原因题别只找“因为、由于”。真正的判断标准是：这句话能不能回答“为什么会发生、为什么会形成、为什么会引起争议”。</p></aside>
      </article>

      <article className="type-v4-analysis-case">
        <div className="case-copy">
          <span>04 / 对比分析</span>
          <h5>比较两种“绣花功夫”，不能把 A 写一段、B 写一段就结束</h5>
          <p><b>先找同一把尺子：</b>两者都在谈基层工作方式，可以从目的、具体做法、实际效果三个维度比较。</p>
          <p><b>再逐项比较：</b>一种以解决细碎治理难题为目的，强调精细服务、信息协同；另一种偏向展示和应付，容易产生形式主义和资源浪费。</p>
          <p><b>最后形成判断：</b>比较的意义不在于把两个案例重新介绍一次，而在于看清“同样的形式为什么会走向不同结果”。</p>
        </div>
        <aside><b>阅 / 看什么</b><p>对比分析最怕维度错位：A 写做法、B 写效果。只有同一维度对照，比较才真正成立。</p></aside>
      </article>
    </div>
  );
}

function PotteryOutlineExample() {
  return (
    <div className="type-v4-outline-wrap">
      <div className="expression-v2-subtitle strong">
        <span>小陶题 · 提纲示例</span>
        <h4>提纲的“简”，简在格式；材料的脉络和开头、主体、收束都要看得见</h4>
      </div>
      <article className="type-v4-outline-example">
        <div className="outline-copy">
          <span>OUTLINE / 提纲示意</span>
          <h5>弘扬鹤溪缸窑　促进恢复发展</h5>
          <p><b>开头：</b>鹤溪缸窑历史悠久，是传统民间手工艺和浙南陶瓷发展史的重要缩影，具有文化传承和史料研究价值。</p>
          <p><b>一、历史起源与兴盛：</b>起源可追溯至商周时期，明万历年间逐渐兴盛。</p>
          <p><b>二、生产方式演进：</b>经历私人办厂、合作生产等阶段；新中国成立后逐步组建生产合作组织、合作社并发展为国营工厂，生产走向机器化。</p>
          <p><b>三、全盛与对外传播：</b>产品销售范围扩大，并承担相关生产任务；六七十年代向周边传授技艺、帮助建厂烧窑，八十年代达到繁荣阶段。</p>
          <p><b>四、衰落与现实困境：</b>后期受设备简陋、技术落后等因素影响，逐步回到私人作坊方式并走向衰落。</p>
          <p><b>结尾：</b>当地陶土资源和烧陶条件仍有基础，但传统技艺面临传承危机，应重视保护传承与恢复发展。</p>
        </div>
        <aside>
          <b>阅 / 为什么这是提纲</b>
          <p>它不是要求把每一段写成完整文章，而是先把“开头—发展历程—现实处境—收束”整理成可以直接拿去发言、汇报或继续扩写的内容骨架。</p>
          <p>时间线是这道题最清楚的材料逻辑，所以主体按阶段推进，比把材料拆成若干互不相干的特点更自然。</p>
          <p>开头依然存在，只是比正式文章更简洁；结尾也保留现实困境和发展方向，让整份提纲有始有终。</p>
        </aside>
      </article>
    </div>
  );
}

export function FrameworkTypeArticleV4() {
  const [analysisAnchor, setAnalysisAnchor] = useState<HTMLElement | null>(null);
  const [outlineAnchor, setOutlineAnchor] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const solution = document.getElementById('type-solution');
    if (solution) {
      const subtitles = Array.from(solution.querySelectorAll<HTMLElement>('.expression-v2-subtitle'));
      const concrete = subtitles.find((item) => item.querySelector('h4')?.textContent?.includes('从“加强宣传”逐层走到'));
      if (concrete) {
        const heading = concrete.querySelector('h4');
        if (heading) heading.textContent = '写具体，关键是补足题目需要的信息，不是把一句话机械扩成三层';
        const caseBlock = concrete.nextElementSibling as HTMLElement | null;
        if (caseBlock?.classList.contains('type-v2-case')) {
          caseBlock.innerHTML = `
            <span>判断顺序</span>
            <p><b>先看材料给到哪：</b>材料已经给出动作、对象和方式，就先把这些有效信息整理清楚。</p>
            <p><b>再看缺什么：</b>如果措施仍然只有一个方向词，再根据题目身份和材料补必要的主体、对象、方式、流程或保障；缺哪项补哪项。</p>
            <p><b>最后检查能不能落地：</b>写具体的标准是能够解决当前问题、符合身份权限、信息有材料或合理依据。材料没有给出的部门、专家、平台、活动形式，不需要为了显得“可操作”硬编进去。</p>`;
        }
      }
    }

    const analysis = document.getElementById('type-analysis');
    let createdAnalysis: HTMLElement | null = null;
    if (analysis && !analysis.querySelector('.type-v4-analysis-examples-anchor')) {
      createdAnalysis = document.createElement('div');
      createdAnalysis.className = 'type-v4-analysis-examples-anchor';
      analysis.appendChild(createdAnalysis);
      setAnalysisAnchor(createdAnalysis);
    }

    const implementation = document.getElementById('type-implementation');
    let createdOutline: HTMLElement | null = null;
    if (implementation) {
      implementation.querySelectorAll<HTMLElement>('.type-v3-format-sheet, .type-v3-critique').forEach((item) => {
        const text = item.textContent ?? '';
        if (text.includes('文明实践品牌活动') || text.includes('小巷总理')) item.remove();
      });

      const subtitles = Array.from(implementation.querySelectorAll<HTMLElement>('.expression-v2-subtitle'));
      const articleSubtitle = subtitles.find((item) => item.querySelector('h4')?.textContent?.includes('像一篇短文章'));
      if (articleSubtitle && !implementation.querySelector('.type-v4-outline-anchor')) {
        createdOutline = document.createElement('div');
        createdOutline.className = 'type-v4-outline-anchor';
        articleSubtitle.parentElement?.insertBefore(createdOutline, articleSubtitle);
        setOutlineAnchor(createdOutline);
      }
    }

    return () => {
      createdAnalysis?.remove();
      createdOutline?.remove();
    };
  }, []);

  return (
    <>
      <FrameworkTypeArticleV3 />
      {analysisAnchor && createPortal(<AnalysisExamples />, analysisAnchor)}
      {outlineAnchor && createPortal(<PotteryOutlineExample />, outlineAnchor)}
    </>
  );
}
