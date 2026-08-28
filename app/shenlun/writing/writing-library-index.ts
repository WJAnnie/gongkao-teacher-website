export type HotspotIndexItem = {
  key: 'development' | 'culture' | 'people' | 'government' | 'grassroots' | 'law' | 'values' | 'era';
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
  { key: 'development', no: '01', label: '发展与现代化', en: 'DEVELOPMENT', desc: '高质量发展、科技创新、新质生产力、现代化产业体系与新赛道。', count: 10 },
  { key: 'culture', no: '02', label: '文化与文明', en: 'CULTURE', desc: '文化自信、传统文化、守正创新、文旅融合与公共文化。', count: 10 },
  { key: 'people', no: '03', label: '民生与人的发展', en: 'PEOPLE', desc: '就业、人才、教育、养老、社会保障与投资于人。', count: 10 },
  { key: 'government', no: '04', label: '政府治理与公共服务', en: 'GOVERNMENT', desc: '政务改革、公共服务、数字政府、调查研究与营商环境。', count: 10 },
  { key: 'grassroots', no: '05', label: '基层与城乡治理', en: 'GRASSROOTS', desc: '乡村振兴、基层治理、社区治理、城市治理与基层工作方法。', count: 13 },
  { key: 'law', no: '06', label: '法治与行政执法', en: 'LAW', desc: '全面依法治国、执法理念、执法方式、执法监督与执法队伍。', count: 11 },
  { key: 'values', no: '07', label: '价值观念与干部作风', en: 'VALUES', desc: '理想信念、责任担当、奋斗实干、政绩观与干部作风。', count: 10 },
  { key: 'era', no: '08', label: '时代新议题', en: 'ERA', desc: '人工智能、新业态、新职业、新媒体、数据与平台治理等时代议题。', count: 10 },
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
