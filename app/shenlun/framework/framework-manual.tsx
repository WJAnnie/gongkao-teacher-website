'use client';

import { useState } from 'react';
import { useLearningChapterNavigation } from '../../learning-chapter-navigation';
import { FrameworkExpressionStepper } from './framework-expression-stepper';
import { FrameworkTypeStepper, typeChapters } from './framework-type-stepper';
import { FrameworkAbilities, coreAbilityChapters } from './framework-abilities';
import { FrameworkTipsArticles, tipArticles } from './framework-tips-articles';

const layers = [
  { key: 'expression', no: '01', label: '表达规则' },
  { key: 'types', no: '02', label: '题型框架' },
  { key: 'abilities', no: '03', label: '核心能力' },
  { key: 'tips', no: '04', label: '实用技巧' },
] as const;

type LayerKey = (typeof layers)[number]['key'];
type CoreAbilityId = (typeof coreAbilityChapters)[number]['id'];

const expressionChapters = [
  { id: 'expression-know', no: '01', label: '认识申论' },
  { id: 'expression-sheet', no: '02', label: '认识答题卡' },
  { id: 'expression-audit', no: '03', label: '学会审题' },
  { id: 'expression-read', no: '04', label: '学会读材料' },
  { id: 'expression-transform', no: '05', label: '从材料到答案' },
  { id: 'expression-logic', no: '06', label: '组织答案' },
  { id: 'expression-finish', no: '07', label: '完成一道题' },
] as const;

function goTo(id: string) {
  window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
}

function focusExpandedTip(id: string) {
  window.setTimeout(() => {
    const section = document.getElementById(id);
    const body = section?.querySelector<HTMLElement>('.tips-article-body');
    (body ?? section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

export function FrameworkManual() {
  const {
    activeId,
    activateChapter,
    arrivingId,
    closeDrawer,
    drawerOpen,
    openDrawer,
  } = useLearningChapterNavigation();
  const [activeExpression, setActiveExpression] = useState(0);
  const [activeType, setActiveType] = useState('summary');
  const [activeAbility, setActiveAbility] = useState<CoreAbilityId>(coreAbilityChapters[0].id);
  const [activeTip, setActiveTip] = useState<string | null>(null);
  const activeLayer = layers.some((item) => item.key === activeId.replace('framework-', ''))
    ? activeId.replace('framework-', '') as LayerKey
    : 'expression';

  const chooseLayer = (key: LayerKey, source: HTMLElement | null = null) => {
    activateChapter(`framework-${key}`, source, 'directory');
  };

  const chooseExpression = (index: number) => {
    if (activeLayer !== 'expression') activateChapter('framework-expression', null, 'directory');
    setActiveExpression(index);
    closeDrawer();
    goTo(expressionChapters[index].id);
  };

  const chooseType = (slug: string) => {
    if (activeLayer !== 'types') activateChapter('framework-types', null, 'directory');
    setActiveType(slug);
    closeDrawer();
    const chapter = typeChapters.find((item) => item.slug === slug);
    if (chapter) goTo(chapter.id);
  };

  const chooseAbility = (id: CoreAbilityId) => {
    if (activeLayer !== 'abilities') activateChapter('framework-abilities', null, 'directory');
    setActiveAbility(id);
    closeDrawer();
    goTo(id);
  };

  const changeTip = (id: string | null) => {
    setActiveTip(id);
    if (id) focusExpandedTip(id);
  };

  const chooseTip = (id: string) => {
    if (activeLayer !== 'tips') activateChapter('framework-tips', null, 'directory');
    closeDrawer();
    changeTip(id);
  };

  const typeIndex = Math.max(0, typeChapters.findIndex((item) => item.slug === activeType));
  const abilityIndex = Math.max(0, coreAbilityChapters.findIndex((item) => item.id === activeAbility));
  const tipIndex = activeTip ? Math.max(0, tipArticles.findIndex((item) => item.id === activeTip)) : 0;
  const mobileLabel = activeLayer === 'expression'
    ? `${String(activeExpression + 1).padStart(2, '0')} / ${String(expressionChapters.length).padStart(2, '0')}`
    : activeLayer === 'types'
      ? `${String(typeIndex + 1).padStart(2, '0')} / ${String(typeChapters.length).padStart(2, '0')}`
      : activeLayer === 'abilities'
        ? `${String(abilityIndex + 1).padStart(2, '0')} / ${String(coreAbilityChapters.length).padStart(2, '0')}`
        : activeLayer === 'tips' && activeTip
          ? `${String(tipIndex + 1).padStart(2, '0')} / ${String(tipArticles.length).padStart(2, '0')}`
          : layers.find((item) => item.key === activeLayer)?.label;
  const progressHeight = activeLayer === 'expression'
    ? `${((activeExpression + 1) / expressionChapters.length) * 100}%`
    : activeLayer === 'types'
      ? `${((typeIndex + 1) / typeChapters.length) * 100}%`
      : activeLayer === 'abilities'
        ? `${((abilityIndex + 1) / Math.max(1, coreAbilityChapters.length)) * 100}%`
        : activeLayer === 'tips' && activeTip
          ? `${((tipIndex + 1) / tipArticles.length) * 100}%`
          : '100%';

  const renderSubNav = (key: LayerKey) => {
    if (key === 'expression') {
      return (
        <nav className="framework-sub-nav expression-sub-nav" aria-label="表达规则目录">
          {expressionChapters.map((item, index) => (
            <button key={item.id} className={activeExpression === index ? 'active' : ''} type="button" onClick={() => chooseExpression(index)}>
              <span>{item.no}</span><b>{item.label}</b>
            </button>
          ))}
        </nav>
      );
    }
    if (key === 'types') {
      return (
        <nav className="framework-sub-nav type-sub-nav" aria-label="题型框架目录">
          {typeChapters.map((item) => (
            <button key={item.slug} className={activeType === item.slug ? 'active' : ''} type="button" onClick={() => chooseType(item.slug)}>
              <span>{item.no}</span><b>{item.label}</b>
            </button>
          ))}
        </nav>
      );
    }
    if (key === 'abilities') {
      return (
        <nav className="framework-sub-nav ability-sub-nav" aria-label="核心能力目录">
          {coreAbilityChapters.map((item) => (
            <button key={item.id} className={activeAbility === item.id ? 'active' : ''} type="button" onClick={() => chooseAbility(item.id)}>
              <span>{item.no}</span><b>{item.title}</b>
            </button>
          ))}
        </nav>
      );
    }
    return (
      <nav className="framework-sub-nav tips-sub-nav" aria-label="实用技巧目录">
        {tipArticles.map((item) => (
          <button key={item.id} className={activeTip === item.id ? 'active' : ''} type="button" onClick={() => chooseTip(item.id)}>
            <span>{item.no}</span><b>{item.title}</b>
          </button>
        ))}
      </nav>
    );
  };

  return (
    <div className="framework-manual learning-content-frame" id="framework-manual-top" data-learning-content-frame>
      <button className="framework-mobile-index" type="button" onClick={(event) => openDrawer(event.currentTarget)}>
        <span>本页目录</span>
        <b>{mobileLabel}</b>
        <em>☰</em>
      </button>

      <aside className={`framework-manual-sidebar learning-directory-column${drawerOpen ? ' open' : ''}`} aria-label="方法框架学习目录">
        <button className="framework-drawer-close" data-learning-directory-initial-focus type="button" onClick={closeDrawer}>×</button>
        <div className="framework-sidebar-kicker">申论方法 / METHOD</div>
        <nav className="framework-layer-nav" aria-label="方法框架章节">
          {layers.map((item) => {
            const open = activeLayer === item.key;
            const arriving = arrivingId === `framework-${item.key}`;
            return (
              <div className={`framework-layer-group learning-directory-group${open ? ' open active' : ''}${arriving ? ' arriving' : ''}`} key={item.key}>
                <button
                  className={`framework-layer-trigger${open ? ' active' : ''}`}
                  data-framework-layer={item.key}
                  data-learning-directory-id={`framework-${item.key}`}
                  type="button"
                  aria-expanded={open}
                  onClick={(event) => chooseLayer(item.key, event.currentTarget)}
                >
                  <span>{item.no}</span><b>{item.label}</b><i aria-hidden="true">⌄</i>
                </button>
                {open && <div className="framework-layer-children">{renderSubNav(item.key)}</div>}
              </div>
            );
          })}
        </nav>

        <div className="framework-sidebar-progress" aria-hidden="true"><i style={{ height: progressHeight }} /></div>
      </aside>
      {drawerOpen && <button className="framework-drawer-backdrop" aria-label="关闭目录" type="button" onClick={closeDrawer} />}

      <main className="framework-manual-reading learning-reading-surface">
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
              <p>先别急着给每一道题贴标签。更重要的是先判断：题目有没有明确告诉你“要找什么”。问题、原因、做法、成效这类任务，要素很清楚；看法、理解、公文等任务，则要先读懂题目和材料，再判断答案需要哪些部分。把这层关系想明白，再看五大题型，很多所谓的“模板”自然就失去神秘感了。</p>
            </header>
            <FrameworkTypeStepper onActiveTypeChange={setActiveType} />
          </section>
        )}

        {activeLayer === 'abilities' && (
          <section className="framework-manual-article framework-abilities-layer" id="framework-abilities">
            <header className="framework-article-intro">
              <span>03 / CORE ABILITIES</span>
              <h2>核心能力</h2>
              <p>同一道题，真正拉开差距的往往不是记住了哪个题型模板，而是能不能把材料看懂、拆开、重新组织，再在有限字数里写成准确的答案。这里按实际做题过程，把分析、综合、概括、归纳和表达五项能力拆开讲。</p>
            </header>
            <FrameworkAbilities />
          </section>
        )}

        {activeLayer === 'tips' && (
          <section className="framework-manual-article framework-tips-layer" id="framework-tips">
            <header className="framework-article-intro">
              <span>04 / PRACTICAL NOTES</span>
              <h2>实用技巧</h2>
              <p>这里不按教材顺序讲知识，而是把做题时最容易卡住、最值得单独说清楚的问题写成一篇篇短文章。先看标题，遇到自己正在犯的问题再点开读；切换文章时，上一篇会自动收起。</p>
            </header>
            <FrameworkTipsArticles activeId={activeTip} onChange={changeTip} />
          </section>
        )}
      </main>
    </div>
  );
}
