// 热点时评的分类表：11 个二级目录，顺序即公务员学习的先后顺序。
// 文章正文仍然保存在各自的数据文件里，这里只声明“哪篇文章属于哪一类”，
// 避免为了调整目录而搬运长文本，减少誊抄出错的风险。

export type HotspotCategoryKey =
  | 'economy'
  | 'innovation'
  | 'livelihood'
  | 'ecology'
  | 'culture'
  | 'civility'
  | 'cadre'
  | 'service'
  | 'grassroots'
  | 'enforcement'
  | 'rural';

export type HotspotTaxonomyItem = {
  key: HotspotCategoryKey;
  no: string;
  label: string;
  en: string;
  desc: string;
};

export const hotspotTaxonomy: HotspotTaxonomyItem[] = [
  { key: 'economy', no: '01', label: '经济发展', en: 'ECONOMY', desc: '高质量发展、新质生产力、现代化产业体系、扩大内需与统一大市场。' },
  { key: 'innovation', no: '02', label: '时代创新', en: 'INNOVATION', desc: '人工智能、数据要素、平台经济、新就业形态与算法治理。' },
  { key: 'livelihood', no: '03', label: '社会民生', en: 'LIVELIHOOD', desc: '就业、教育、医疗、养老、生育支持与社会保障。' },
  { key: 'ecology', no: '04', label: '生态环保', en: 'ECOLOGY', desc: '绿色转型、双碳目标、美丽中国、生态保护与环境治理。' },
  { key: 'culture', no: '05', label: '文化勃兴', en: 'CULTURE', desc: '文化自信、传统文化、非遗传承、文旅融合与文化产业。' },
  { key: 'civility', no: '06', label: '精神文明', en: 'CIVILITY', desc: '核心价值观、公民道德、诚信建设、移风易俗与志愿服务。' },
  { key: 'cadre', no: '07', label: '干部观念', en: 'CADRE', desc: '责任担当、政绩观、调查研究、群众路线与干部能力建设。' },
  { key: 'service', no: '08', label: '公共服务', en: 'SERVICE', desc: '政务服务、数字政府、简政放权、营商环境与政务公开。' },
  { key: 'grassroots', no: '09', label: '基层治理', en: 'GRASSROOTS', desc: '基层治理、社区治理、城市治理、矛盾化解与基层减负。' },
  { key: 'enforcement', no: '10', label: '行政执法', en: 'ENFORCEMENT', desc: '依法治国、严格执法、柔性执法、执法监督与执法队伍。' },
  { key: 'rural', no: '11', label: '乡村振兴', en: 'RURAL', desc: '乡村振兴、千万工程、粮食安全、和美乡村与农村人居环境。' },
];

// slug -> 分类。所有热点文章都必须在此登记，缺登记会在加载时报错。
export const hotspotArticleCategory: Record<string, HotspotCategoryKey> = {
  // 01 经济发展
  'high-quality-development': 'economy',
  'new-quality-productive-forces': 'economy',
  'science-and-technology-innovation': 'economy',
  'modern-industrial-system': 'economy',
  'low-altitude-economy': 'economy',
  'expand-domestic-demand': 'economy',
  'unified-national-market': 'economy',
  'regional-coordinated-development': 'economy',
  'private-economy-confidence': 'economy',
  'effective-market-proactive-government': 'economy',

  // 02 时代创新
  'artificial-intelligence': 'innovation',
  'generative-ai': 'innovation',
  'robots': 'innovation',
  'platform-economy': 'innovation',
  'new-employment': 'innovation',
  'new-media': 'innovation',
  'digital-culture': 'innovation',
  'smart-society': 'innovation',
  'data-elements': 'innovation',
  'algorithm-governance': 'innovation',

  // 03 社会民生
  'employment': 'livelihood',
  'talent': 'livelihood',
  'education': 'livelihood',
  'health': 'livelihood',
  'elderly-care': 'livelihood',
  'old-and-young': 'livelihood',
  'invest-in-people': 'livelihood',
  'birth-support-system': 'livelihood',
  'vocational-education': 'livelihood',
  'social-security-safety-net': 'livelihood',

  // 04 生态环保
  'green-low-carbon-transition': 'ecology',
  'sponge-city': 'ecology',
  'beautiful-china': 'ecology',

  // 05 文化勃兴
  'cultural-confidence': 'culture',
  'traditional-culture': 'culture',
  'cultural-innovation': 'culture',
  'culture-tourism': 'culture',
  'urban-culture': 'culture',
  'public-culture': 'culture',
  'cultural-industry': 'culture',
  'cultural-subjectivity': 'culture',
  'museum-fever': 'culture',
  'intangible-cultural-heritage': 'culture',

  // 06 精神文明
  'ideals-faith': 'civility',
  'dedication': 'civility',
  'integrity-innovation': 'civility',

  // 07 干部观念
  'responsibility': 'cadre',
  'rooted-grassroots': 'cadre',
  'struggle-pragmatism': 'cadre',
  'mass-line': 'cadre',
  'correct-performance-view': 'cadre',
  'learning-and-capability': 'cadre',
  'long-termism-nailing-spirit': 'cadre',
  'investigation-research': 'cadre',

  // 08 公共服务
  'streamline-government-services': 'service',
  'one-thing-efficiently': 'service',
  'digital-government': 'service',
  'tight-budget-government': 'service',
  'business-environment': 'service',
  'standardized-government-service': 'service',
  'open-government': 'service',
  'policy-implementation-closed-loop': 'service',

  // 09 基层治理
  'grassroots-governance': 'grassroots',
  'four-grassroots': 'grassroots',
  'fengqiao-experience': 'grassroots',
  'liuchixiang-method': 'grassroots',
  'four-governance': 'grassroots',
  'grassroots-burden-reduction': 'grassroots',
  'community-governance': 'grassroots',
  'urban-governance': 'grassroots',
  'smart-city': 'grassroots',
  'refined-city-management': 'grassroots',

  // 10 行政执法
  'rule-of-law': 'enforcement',
  'scientific-legislation': 'enforcement',
  'strict-enforcement': 'enforcement',
  'fair-justice': 'enforcement',
  'law-abiding-society': 'enforcement',
  'people-centered-enforcement': 'enforcement',
  'flexible-enforcement': 'enforcement',
  'service-oriented-enforcement': 'enforcement',
  'smart-enforcement': 'enforcement',
  'enforcement-supervision': 'enforcement',
  'enforcement-team': 'enforcement',

  // 11 乡村振兴
  'rural-revitalization': 'rural',
  'thousand-villages-project': 'rural',
};
