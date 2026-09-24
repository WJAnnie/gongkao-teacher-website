// 八个学习模块的一句话说明：首页头版与 SubjectGateway 共用，只在这里维护。
import type { LearningRouteKey } from './learning-routes';

export const learningRouteNotes = {
  'shenlun-framework': '题型 · 能力 · 规则 · 技巧',
  'shenlun-questions': '国考 · 联考 · 地方真题',
  'shenlun-writing': '热点 · 案例 · 用词 · 作文',
  'shenlun-videos': '精讲 · 实录 · 日常 · 分享',
  'interview-methods': '分析 · 组织 · 应急 · 模拟',
  'interview-questions': '国考 · 省考 · 回忆真题',
  'interview-expression': '观点 · 结构 · 例证 · 表达',
  'interview-videos': '精讲 · 实录 · 日常 · 分享',
} as const satisfies Record<LearningRouteKey, string>;
