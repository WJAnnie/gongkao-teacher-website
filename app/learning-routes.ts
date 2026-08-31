export type LearningTone = 'blue' | 'orange' | 'acid' | 'red';

export type LearningRoute = Readonly<{
  key: string;
  group: 'shenlun' | 'interview';
  label: string;
  href: string;
  tone: LearningTone;
}>;

export const shenlunRoutes = [
  { key: 'shenlun-framework', group: 'shenlun', label: '方法框架', href: '/shenlun/framework/', tone: 'blue' },
  { key: 'shenlun-questions', group: 'shenlun', label: '真题精练', href: '/shenlun/questions/', tone: 'orange' },
  { key: 'shenlun-writing', group: 'shenlun', label: '写作积累', href: '/shenlun/writing/', tone: 'acid' },
  { key: 'shenlun-videos', group: 'shenlun', label: '课程现场', href: '/shenlun/videos/', tone: 'red' },
] as const satisfies readonly LearningRoute[];

export const interviewRoutes = [
  { key: 'interview-methods', group: 'interview', label: '题型方法', href: '/interview/methods/', tone: 'blue' },
  { key: 'interview-questions', group: 'interview', label: '真题实战', href: '/interview/questions/', tone: 'orange' },
  { key: 'interview-expression', group: 'interview', label: '表达训练', href: '/interview/expression/', tone: 'acid' },
  { key: 'interview-videos', group: 'interview', label: '课程现场', href: '/interview/videos/', tone: 'red' },
] as const satisfies readonly LearningRoute[];

export type LearningRouteKey =
  | (typeof shenlunRoutes)[number]['key']
  | (typeof interviewRoutes)[number]['key'];

export type LearningMacroChapter = Readonly<{
  id: string;
  no: string;
  label: string;
  targetId: string;
  ariaLabel?: string;
}>;

type FourLearningChapters = readonly [
  LearningMacroChapter,
  LearningMacroChapter,
  LearningMacroChapter,
  LearningMacroChapter,
];

export const learningPageChapters = {
  'shenlun-framework': [
    { id: 'framework-expression', no: '01', label: '表达规则', targetId: 'framework-expression' },
    { id: 'framework-types', no: '02', label: '题型框架', targetId: 'framework-types' },
    { id: 'framework-abilities', no: '03', label: '核心能力', targetId: 'framework-abilities' },
    { id: 'framework-tips', no: '04', label: '实用技巧', targetId: 'framework-tips' },
  ],
  'shenlun-questions': [
    { id: 'questions-years', no: '01', label: '按年份看', targetId: 'questions-years' },
    { id: 'questions-types', no: '02', label: '按题型练', targetId: 'questions-types' },
    { id: 'questions-themes', no: '03', label: '按主题复盘', targetId: 'questions-themes' },
    { id: 'questions-index', no: '04', label: '真题索引', targetId: 'questions-index' },
  ],
  'shenlun-writing': [
    { id: 'writing-viewpoints', no: '01', label: '观点与热点', targetId: 'writing-viewpoints' },
    { id: 'writing-evidence', no: '02', label: '案例与论据', targetId: 'writing-evidence' },
    { id: 'writing-language', no: '03', label: '词语与修辞', targetId: 'writing-language' },
    { id: 'writing-essay', no: '04', label: '作文与结构', targetId: 'writing-essay' },
  ],
  'shenlun-videos': [
    { id: 'shenlun-video-course', no: '01', label: '课程精讲', targetId: 'shenlun-video-course' },
    { id: 'shenlun-video-classroom', no: '02', label: '课堂实录', targetId: 'shenlun-video-classroom' },
    { id: 'shenlun-video-worklog', no: '03', label: '工作日常', targetId: 'shenlun-video-worklog' },
    { id: 'shenlun-video-notes', no: '04', label: '碎片分享', targetId: 'shenlun-video-notes' },
  ],
  'interview-methods': [
    { id: 'interview-methods-map', no: '01', label: '题型地图', targetId: 'interview-methods-map' },
    { id: 'interview-methods-flow', no: '02', label: '训练流程', targetId: 'interview-methods-flow' },
    { id: 'interview-methods-practice', no: '03', label: '一题三遍', targetId: 'interview-methods-practice' },
    { id: 'interview-methods-check', no: '04', label: '答后检查', targetId: 'interview-methods-check' },
  ],
  'interview-questions': [
    { id: 'interview-questions-map', no: '01', label: '真题地图', targetId: 'interview-questions-map' },
    { id: 'interview-questions-flow', no: '02', label: '训练流程', targetId: 'interview-questions-flow' },
    { id: 'interview-questions-index', no: '03', label: '当前索引', targetId: 'interview-questions-index' },
    { id: 'interview-questions-review', no: '04', label: '复盘清单', targetId: 'interview-questions-review' },
  ],
  'interview-expression': [
    { id: 'interview-expression-map', no: '01', label: '表达地图', targetId: 'interview-expression-map' },
    { id: 'interview-expression-flow', no: '02', label: '四段训练', targetId: 'interview-expression-flow' },
    { id: 'interview-expression-daily', no: '03', label: '每日小练', targetId: 'interview-expression-daily' },
    { id: 'interview-expression-review', no: '04', label: '回听重点', targetId: 'interview-expression-review' },
  ],
  'interview-videos': [
    { id: 'interview-videos-map', no: '01', label: '影像档案', targetId: 'interview-videos-map' },
    { id: 'interview-videos-flow', no: '02', label: '观看流程', targetId: 'interview-videos-flow' },
    { id: 'interview-videos-class', no: '03', label: '看课堂', targetId: 'interview-videos-class' },
    { id: 'interview-videos-notes', no: '04', label: '课后笔记', targetId: 'interview-videos-notes' },
  ],
} as const satisfies Record<LearningRouteKey, FourLearningChapters>;
