import { patternLibrary } from './writing-pattern-library.ts';
import { quoteLibrary } from './writing-quote-library.ts';
import { sentenceLibrary } from './writing-sentence-library.ts';
export type PatternEntry = {
  frame: string;
  usage: string;
  examples: string[];
};

export type PatternCategory = {
  key: string;
  label: string;
  desc: string;
  entries: PatternEntry[];
};

export type SentenceEntry = {
  text: string;
  purpose: string;
  group?: string;
};

export type SentenceCategory = {
  key: string;
  label: string;
  desc: string;
  entries: SentenceEntry[];
};

export type QuoteEntry = {
  text: string;
  author: string;
  source: string;
  context: string;
  boundary: string;
  group?: string;
};

export type QuoteCategory = {
  key: string;
  label: string;
  desc: string;
  entries: QuoteEntry[];
};

export type EssayStageSlug = 'title' | 'opening' | 'thesis' | 'subpoints' | 'evidence' | 'conclusion';

export type EssayStage = {
  key: EssayStageSlug;
  no: string;
  label: string;
  method: string;
  counterexample: string;
  example: string;
};

export const patternCategories: PatternCategory[] = patternLibrary;

export const sentenceCategories: SentenceCategory[] = sentenceLibrary;

export const quoteCategories: QuoteCategory[] = quoteLibrary;

export const essayStages: EssayStage[] = [
  {
    key: 'title',
    no: '01',
    label: '标题',
    method: '从中心论点中提取“主题对象＋核心判断”，优先写成准确、简洁的判断式标题；需要文采时，只在判断清楚的基础上增加一处比喻或对举。',
    counterexample: '把“基层治理”写成《让幸福之花绚丽绽放》，词语好听却看不出文章讨论什么、主张什么。',
    example: '主题是公共服务下沉，中心判断是“服务越靠近基层越能回应需求”，可拟为《让公共服务更贴近群众》。',
  },
  {
    key: 'opening',
    no: '02',
    label: '开头',
    method: '用“材料现象或现实变化—提炼矛盾—亮明中心论点”三步起笔，控制背景篇幅，让阅卷者尽快看见文章要解决的问题。',
    counterexample: '开头连续罗列时代伟大、意义重大等套话，写了大半页仍未说明材料中的具体矛盾。',
    example: '写数字治理时，可先写线上服务带来的便利，再点出老年人使用困难，最后提出“效率提升必须与服务包容同步”。',
  },
  {
    key: 'thesis',
    no: '03',
    label: '总论点',
    method: '把题目要求和材料主线合成一句可论证的判断，至少回答“围绕什么问题、坚持什么方向、达到什么目标”，避免只有主题词没有态度。',
    counterexample: '“基层治理十分重要，我们要加强基层治理。”前后同义，既没有判断标准，也没有展开方向。',
    example: '针对社区治理，可写：“提升社区治理效能，要以群众需求为起点，以协商共治为路径，以解决实际问题为落点。”',
  },
  {
    key: 'subpoints',
    no: '04',
    label: '分论点',
    method: '选择同一层级拆分：可以按问题链写“发现—协商—解决”，按主体写“政府—社会—群众”，或按价值写“效率—公平—温度”；三点之间不重复、不交叉，共同支撑总论点。',
    counterexample: '第一点写“加强人才培养”，第二点写“提升干部能力”，第三点写“完善服务机制”，前两点重复，第三点又突然换了层级。',
    example: '写乡村文化振兴，可拆为“保护乡土文化资源、培育乡村文化人才、拓展文化生活场景”，三点分别对应资源、主体和载体。',
  },
  {
    key: 'evidence',
    no: '05',
    label: '论据',
    method: '每段遵循“分论点—解释原因—压缩案例或材料事实—分析事实如何证明观点—回扣分论点”，案例只保留与观点直接相关的行动和结果。',
    counterexample: '用整段篇幅复述人物经历，结尾只说“他的精神值得学习”，没有解释案例与当前分论点的关系。',
    example: '论证“基层工作要深入群众”时，只写干部走访发现用水难题、协调改造管网的关键事实，再分析一线走访如何弥补报表信息不足。',
  },
  {
    key: 'conclusion',
    no: '06',
    label: '结尾',
    method: '回扣题目和中心论点，概括前文最关键的行动方向，再落到可期待的现实变化；篇幅宜短，不在最后突然增加新分论点。',
    counterexample: '全文讨论公共文化服务，结尾突然加入科技创新、生态保护等新任务，并用空泛口号草草结束。',
    example: '写社区治理，可收束为：“把议事平台建在身边，把问题解决在一线，把服务做到日常，社区才能成为有秩序也有温度的共同家园。”',
  },
];


