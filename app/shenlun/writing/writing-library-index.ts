import type { HotspotCategoryKey } from './writing-hotspot-taxonomy.ts';

export type HotspotIndexItem = {
  key: HotspotCategoryKey;
  no: string;
  label: string;
  en: string;
  desc: string;
  count: number;
};

export type CaseIndexItem = {
  key: 'people' | 'practice' | 'city' | 'reform' | 'technology' | 'livelihood' | 'law' | 'negative' | 'culture' | 'rural' | 'ecology' | 'enterprise';
  no: string;
  label: string;
  desc: string;
  count: number;
};

// 这里只放“目录级元数据”，不导入任何长文章或案例正文。
// 写作积累首页因此可以保持很轻；正文在学生真正进入某一类后再加载。
export const hotspotIndex: HotspotIndexItem[] = [
  { key: 'economy', no: '01', label: '经济发展', en: 'ECONOMY', desc: '高质量发展、新质生产力、现代化产业体系、扩大内需与统一大市场。', count: 10 },
  { key: 'innovation', no: '02', label: '时代创新', en: 'INNOVATION', desc: '人工智能、数据要素、平台经济、新就业形态与算法治理。', count: 10 },
  { key: 'livelihood', no: '03', label: '社会民生', en: 'LIVELIHOOD', desc: '就业、教育、医疗、养老、生育支持与社会保障。', count: 10 },
  { key: 'ecology', no: '04', label: '生态环保', en: 'ECOLOGY', desc: '绿色转型、双碳目标、美丽中国、生态保护与环境治理。', count: 10 },
  { key: 'culture', no: '05', label: '文化勃兴', en: 'CULTURE', desc: '文化自信、传统文化、非遗传承、文旅融合与文化产业。', count: 10 },
  { key: 'civility', no: '06', label: '精神文明', en: 'CIVILITY', desc: '核心价值观、公民道德、诚信建设、移风易俗与志愿服务。', count: 10 },
  { key: 'cadre', no: '07', label: '干部观念', en: 'CADRE', desc: '责任担当、政绩观、调查研究、群众路线与干部能力建设。', count: 10 },
  { key: 'service', no: '08', label: '公共服务', en: 'SERVICE', desc: '政务服务、数字政府、简政放权、营商环境与政务公开。', count: 10 },
  { key: 'grassroots', no: '09', label: '基层治理', en: 'GRASSROOTS', desc: '基层治理、社区治理、城市治理、矛盾化解与基层减负。', count: 10 },
  { key: 'enforcement', no: '10', label: '行政执法', en: 'ENFORCEMENT', desc: '依法治国、严格执法、柔性执法、执法监督与执法队伍。', count: 11 },
  { key: 'rural', no: '11', label: '乡村振兴', en: 'RURAL', desc: '乡村振兴、千万工程、粮食安全、和美乡村与农村人居环境。', count: 10 },
];

export const caseIndex: CaseIndexItem[] = [
  { key: 'people', no: '01', label: '人物案例', desc: '人物只保留最能说明品质、选择与方法的关键行动。', count: 10 },
  { key: 'practice', no: '02', label: '地方做法', desc: '重点积累一个地方“怎么做”，再把治理经验提炼成可迁移的方法。', count: 10 },
  { key: 'city', no: '03', label: '城市案例', desc: '用城市空间、文化、规划和治理实践说明城市发展理念。', count: 10 },
  { key: 'reform', no: '04', label: '政务改革', desc: '从办事体验、流程再造和部门协同中提炼政府改革方法。', count: 10 },
  { key: 'technology', no: '05', label: '科技产业', desc: '看技术怎样进入真实场景，再分析产业价值、创新机制与治理边界。', count: 10 },
  { key: 'livelihood', no: '06', label: '民生小事', desc: '从群众身边的小切口写公共服务，让文章更具体、更有烟火气。', count: 10 },
  { key: 'law', no: '07', label: '执法法治', desc: '从力度与温度、效率与程序、技术与权利等关系中积累执法论据。', count: 10 },
  { key: 'negative', no: '08', label: '反面案例', desc: '不追求猎奇，重点从问题表现反推治理理念和制度短板。', count: 10 },
  { key: 'culture', no: '09', label: '文化案例', desc: '积累传统文化、非遗、文博、城市文脉和文化创新的鲜活例子。', count: 10 },
  { key: 'rural', no: '10', label: '乡村案例', desc: '覆盖产业、人才、文化、生态、组织和治理等乡村振兴场景。', count: 10 },
  { key: 'ecology', no: '11', label: '生态案例', desc: '从生态保护、绿色转型和系统治理中提炼发展与保护的关系。', count: 10 },
  { key: 'enterprise', no: '12', label: '企业创新', desc: '用企业转型、技术攻关和组织创新说明产业升级与创新能力。', count: 10 },
];
