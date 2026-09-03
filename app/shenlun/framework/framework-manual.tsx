'use client';

import { useState } from 'react';
import { LearningContentFrame, LearningSecondaryDirectory, useLearningChapterNavigation } from '../../learning-chapter-navigation';
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
  const { activeId, activateChapter, closeDrawer } = useLearningChapterNavigation();
  const [activeExpression, setActiveExpression] = useState(0);
  const [activeType, setActiveType] = useState('summary');
  const [activeAbility, setActiveAbility] = useState<CoreAbilityId>(coreAbilityChapters[0].id);
  const [activeTip, setActiveTip] = useState<string | null>(null);
  const activeLayer = layers.some((item) => item.key === activeId.replace('framework-', ''))
    ? activeId.replace('framework-', '') as LayerKey
    : 'expression';

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

  const renderSubNav = (key: LayerKey) => {
    if (key === 'expression') {
      return <LearningSecondaryDirectory
        active={expressionChapters[activeExpression]?.id ?? ''}
        items={expressionChapters.map((item) => ({ key: item.id, no: item.no, label: item.label }))}
        label="表达规则细目"
        onSelect={(id) => chooseExpression(expressionChapters.findIndex((item) => item.id === id))}
      />;
    }
    if (key === 'types') {
      return <LearningSecondaryDirectory
        active={activeType}
        items={typeChapters.map((item) => ({ key: item.slug, no: item.no, label: item.label }))}
        label="题型框架细目"
        onSelect={chooseType}
      />;
    }
    if (key === 'abilities') {
      return <LearningSecondaryDirectory
        active={activeAbility}
        items={coreAbilityChapters.map((item) => ({ key: item.id, no: item.no, label: item.title }))}
        label="核心能力细目"
        onSelect={(id) => chooseAbility(id as CoreAbilityId)}
      />;
    }
    return <LearningSecondaryDirectory
      active={activeTip ?? ''}
      items={tipArticles.map((item) => ({ key: item.id, no: item.no, label: item.title }))}
      label="实用技巧细目"
      onSelect={chooseTip}
    />;
  };

  return (
    <div id="framework-manual-top">
      <LearningContentFrame
        details={Object.fromEntries(layers.map((item) => [`framework-${item.key}`, renderSubNav(item.key)]))}
        label="方法框架学习目录"
      >
        {activeLayer === 'expression' && (
          <section className="framework-manual-article framework-expression-layer" id="framework-expression">
            <header className="framework-article-intro">
              <span>01</span>
              <h2>表达规则</h2>
              <p>这一部分我想先把申论从头讲明白。先认识考试和答题卡，再学审题、读材料、整理答案和组织逻辑。后面的五大题型，都是在这些基本规则上往前走。</p>
            </header>
            <FrameworkExpressionStepper onActiveChapterChange={setActiveExpression} />
          </section>
        )}

        {activeLayer === 'types' && (
          <section className="framework-manual-article framework-types-layer" id="framework-types">
            <header className="framework-article-intro">
              <span>02</span>
              <h2>题型框架</h2>
              <p>先别急着给每一道题贴标签。更重要的是先判断：题目有没有明确告诉你“要找什么”。问题、原因、做法、成效这类任务，要素很清楚；看法、理解、公文等任务，则要先读懂题目和材料，再判断答案需要哪些部分。把这层关系想明白，再看五大题型，很多所谓的“模板”自然就失去神秘感了。</p>
            </header>
            <FrameworkTypeStepper onActiveTypeChange={setActiveType} />
          </section>
        )}

        {activeLayer === 'abilities' && (
          <section className="framework-manual-article framework-abilities-layer" id="framework-abilities">
            <header className="framework-article-intro">
              <span>03</span>
              <h2>核心能力</h2>
              <p>同一道题，真正拉开差距的往往不是记住了哪个题型模板，而是能不能把材料看懂、拆开、重新组织，再在有限字数里写成准确的答案。这里按实际做题过程，把分析、综合、概括、归纳和表达五项能力拆开讲。</p>
            </header>
            <FrameworkAbilities />
          </section>
        )}

        {activeLayer === 'tips' && (
          <section className="framework-manual-article framework-tips-layer" id="framework-tips">
            <header className="framework-article-intro">
              <span>04</span>
              <h2>实用技巧</h2>
              <p>这里不按教材顺序讲知识，而是把做题时最容易卡住、最值得单独说清楚的问题写成一篇篇短文章。先看标题，遇到自己正在犯的问题再点开读；切换文章时，上一篇会自动收起。</p>
            </header>
            <FrameworkTipsArticles activeId={activeTip} onChange={changeTip} />
          </section>
        )}
      </LearningContentFrame>
    </div>
  );
}
