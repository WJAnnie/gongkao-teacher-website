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
