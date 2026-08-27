'use client';

import { useState } from 'react';
import { FrameworkExpressionStepper } from './framework-expression-stepper';
import { FrameworkTypeStepper, typeChapters } from './framework-type-stepper';

const layers = [
  { key: 'expression', no: '01', label: '表达规则' },
  { key: 'types', no: '02', label: '题型框架' },
  { key: 'abilities', no: '03', label: '核心能力' },
  { key: 'tips', no: '04', label: '实用技巧' },
] as const;

type LayerKey = (typeof layers)[number]['key'];

const expressionChapters = [
  { id: 'expression-know', no: '01', label: '认识申论' },
  { id: 'expression-sheet', no: '02', label: '认识答题卡' },
  { id: 'expression-audit', no: '03', label: '学会审题' },
  { id: 'expression-read', no: '04', label: '学会读材料' },
  { id: 'expression-transform', no: '05', label: '从材料到答案' },
  { id: 'expression-logic', no: '06', label: '组织答案' },
  { id: 'expression-finish', no: '07', label: '完成一道题' },
] as const;

const abilities = [
  ['01', '概括能力', '把复杂、冗长、口语化的材料压缩成可以直接进入答案的信息。'],
  ['02', '归纳能力', '从多个具体内容里找到共同点，提高一个层级，形成能罩住下位内容的归纳表达。'],
  ['03', '分析能力', '判断一段、一句话，对题目所问的主体和对象来说究竟在说什么。'],
  ['04', '综合能力', '把不同材料、不同要素重新组织，判断先后、并列、递进和整体答案结构。'],
  ['05', '表达能力', '把已经理解清楚的内容写得准确、简明、规范、有层次。'],
] as const;

const tips = [
  ['01', '先看对象，再判断要素', '同一句话放到不同对象、不同题目里，承担的作用可能完全不同。'],
  ['02', '案例先删故事，再留方法', '人物、地点和过程可以压缩，真正需要留下的是案例背后的工作方式和作用。'],
  ['03', '字数先算，再决定写多细', '一行25格的训练习惯，会直接影响你对答案层级和取舍的判断。'],
  ['04', '归纳词别贪大', '能直接回答题目、能覆盖下位内容，又不把其他要点一起吞进去，才是合适的归纳。'],
  ['05', '做完一定复盘', '检查漏点、错分、层级、表达和时间，比单纯再刷一道题更重要。'],
] as const;

function goTo(id: string) {
  window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 20);
}

export function FrameworkManual() {
  const [activeLayer, setActiveLayer] = useState<LayerKey>('expression');
  const [activeExpression, setActiveExpression] = useState(0);
  const [activeType, setActiveType] = useState('summary');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const chooseLayer = (key: LayerKey) => {
    setActiveLayer(key);
    setDrawerOpen(false);
    window.setTimeout(() => document.getElementById('framework-manual-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 20);
  };

  const chooseExpression = (index: number) => {
    if (activeLayer !== 'expression') setActiveLayer('expression');
    setActiveExpression(index);
    setDrawerOpen(false);
    goTo(expressionChapters[index].id);
  };

  const chooseType = (slug: string) => {
    if (activeLayer !== 'types') setActiveLayer('types');
    setActiveType(slug);
    setDrawerOpen(false);
    const chapter = typeChapters.find((item) => item.slug === slug);
    if (chapter) goTo(chapter.id);
  };

  const typeIndex = Math.max(0, typeChapters.findIndex((item) => item.slug === activeType));
  const mobileLabel = activeLayer === 'expression'
    ? `${String(activeExpression + 1).padStart(2, '0')} / 07`
    : activeLayer === 'types'
      ? `${String(typeIndex + 1).padStart(2, '0')} / 05`
      : layers.find((item) => item.key === activeLayer)?.label;
  const progressHeight = activeLayer === 'expression'
    ? `${((activeExpression + 1) / 7) * 100}%`
    : activeLayer === 'types'
      ? `${((typeIndex + 1) / 5) * 100}%`
      : '100%';

  return (
    <div className="framework-manual" id="framework-manual-top">
      <button className="framework-mobile-index" type="button" onClick={() => setDrawerOpen(true)}>
        <span>本页目录</span>
        <b>{mobileLabel}</b>
        <em>☰</em>
      </button>

      <aside className={`framework-manual-sidebar${drawerOpen ? ' open' : ''}`} aria-label="方法框架学习目录">
        <button className="framework-drawer-close" type="button" onClick={() => setDrawerOpen(false)}>×</button>
        <div className="framework-sidebar-kicker">申论方法 / METHOD</div>
        <nav className="framework-layer-nav">
          {layers.map((item) => (
            <button key={item.key} className={activeLayer === item.key ? 'active' : ''} type="button" onClick={() => chooseLayer(item.key)}>
              <span>{item.no}</span><b>{item.label}</b>
            </button>
          ))}
        </nav>

        {activeLayer === 'expression' && (
          <nav className="framework-sub-nav expression-sub-nav" aria-label="表达规则目录">
            {expressionChapters.map((item, index) => (
              <button key={item.id} className={activeExpression === index ? 'active' : ''} type="button" onClick={() => chooseExpression(index)}>
                <span>{item.no}</span><b>{item.label}</b>
              </button>
            ))}
          </nav>
        )}

        {activeLayer === 'types' && (
          <nav className="framework-sub-nav type-sub-nav" aria-label="题型框架目录">
            {typeChapters.map((item) => (
              <button key={item.slug} className={activeType === item.slug ? 'active' : ''} type="button" onClick={() => chooseType(item.slug)}>
                <span>{item.no}</span><b>{item.label}</b>
              </button>
            ))}
          </nav>
        )}

        {activeLayer === 'abilities' && (
          <nav className="framework-sub-nav" aria-label="核心能力目录">
            {abilities.map(([no, title]) => <button key={title} type="button" onClick={() => goTo(`ability-${no}`)}><span>{no}</span><b>{title}</b></button>)}
          </nav>
        )}

        {activeLayer === 'tips' && (
          <nav className="framework-sub-nav" aria-label="实用技巧目录">
            {tips.map(([no, title]) => <button key={title} type="button" onClick={() => goTo(`tip-${no}`)}><span>{no}</span><b>{title}</b></button>)}
          </nav>
        )}

        <div className="framework-sidebar-progress" aria-hidden="true"><i style={{ height: progressHeight }} /></div>
      </aside>
      {drawerOpen && <button className="framework-drawer-backdrop" aria-label="关闭目录" type="button" onClick={() => setDrawerOpen(false)} />}

      <article className="framework-manual-reading">
        {activeLayer === 'expression' && (
          <section className="framework-manual-article framework-expression-layer" id="framework-expression">
            <header className="framework-article-intro">
              <span>01 / EXPRESSION RULES</span>
              <h2>表达规则</h2>
              <p>这一部分我想先把申论从头讲明白。先认识考试和答题卡，再学审题、读材料、整理答案和组织逻辑。后面的五大题型，都是在这些基本规则上往前走。</p>
            </header>
            <FrameworkExpressionStepper onActiveChapterChange={setActiveExpression} />
          </section>
        )}

        {activeLayer === 'types' && (
          <section className="framework-manual-article framework-types-layer" id="framework-types">
            <header className="framework-article-intro">
              <span>02 / FIVE QUESTION TYPES</span>
              <h2>题型框架</h2>
              <p>题型框架不是为了让你背五套模板。它更像一张任务地图：同样是读材料，不同题目最后要完成的任务不同，所以答案的“长相”也会不同。先把五类题的本质和边界想清楚，再去做真题。</p>
            </header>
            <FrameworkTypeStepper onActiveTypeChange={setActiveType} />
          </section>
        )}

        {activeLayer === 'abilities' && (
          <section className="framework-manual-article" id="framework-abilities">
            <header className="framework-article-intro"><span>03 / CORE ABILITIES</span><h2>核心能力</h2><p>题型会变，能力反复出现。这里先把你真正需要长期练的几项基本功摆出来，后面再逐项补充课堂案例。</p></header>
            <div className="framework-manual-prose-list">
              {abilities.map(([no, title, text]) => <section id={`ability-${no}`} key={title}><span>{no}</span><h3>{title}</h3><p>{text}</p></section>)}
            </div>
          </section>
        )}

        {activeLayer === 'tips' && (
          <section className="framework-manual-article" id="framework-tips">
            <header className="framework-article-intro"><span>04 / PRACTICAL NOTES</span><h2>实用技巧</h2><p>这一栏以后更像我的教学心得和做题札记。每次遇到一个值得单独讲清楚的问题，就整理成一篇短文章放进来。</p></header>
            <div className="framework-manual-prose-list">
              {tips.map(([no, title, text]) => <section id={`tip-${no}`} key={title}><span>{no}</span><h3>{title}</h3><p>{text}</p></section>)}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
