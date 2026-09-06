import { patternLibrary } from './writing-pattern-library.ts';
import { quoteLibrary } from './writing-quote-library.ts';
import { sentenceLibrary } from './writing-sentence-library.ts';
export type TermEntry = {
  before: string;
  after: string;
  note: string;
};

export type TermCategory = {
  key: string;
  label: string;
  desc: string;
  entries: TermEntry[];
};

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

export const termCategories: TermCategory[] = [
  {
    key: 'problems',
    label: '问题类用词',
    desc: '先把材料里的抱怨和现象压缩成可以直接作答的问题表述。',
    entries: [
      { before: '办个事要绕好几道弯', after: '办事流程较为繁琐', note: '适合概括审批环节多、手续重复，不等同于审批违法。' },
      { before: '群众来来回回跑', after: '群众多头奔波问题突出', note: '材料出现多窗口、多部门反复提交时使用。' },
      { before: '出了问题没人管', after: '责任落实存在空档', note: '强调职责未落到具体单位或岗位。' },
      { before: '几个部门各干各的', after: '部门协同联动不足', note: '适合跨部门事项衔接不顺的材料。' },
      { before: '不管什么情况都一个办法', after: '治理方式存在简单化倾向', note: '能判断为同一标准机械套用时再写，避免泛化。' },
      { before: '只顾眼前，不想以后', after: '缺乏长远谋划', note: '用于短期行为挤压长期发展的情形。' },
      { before: '东西建好了却没人维护', after: '重建设、轻管护问题较为突出', note: '适合公共设施建成后闲置、损坏的材料。' },
      { before: '嘴上说得多，真正做得少', after: '政策执行落实不够有力', note: '材料明确存在部署与行动脱节时使用。' },
      { before: '小问题一直拖，最后闹大了', after: '风险隐患处置不及时', note: '突出发现、报告或处置环节的迟滞。' },
      { before: '场地设备一直闲着', after: '资源配置使用效能不高', note: '用于资源已投入但利用率偏低的情形。' },
      { before: '不同部门的信息对不上', after: '数据壁垒尚未有效打通', note: '适合系统不互通、口径不一致、重复录入。' },
      { before: '政策出了，很多群众还不知道', after: '政策宣传覆盖面不足', note: '关注信息触达，不要直接推断群众不支持政策。' },
      { before: '好办法只在一个地方管用', after: '成熟经验转化推广不畅', note: '已有有效试点却缺少总结复制时使用。' },
      { before: '服务点太远，办事不方便', after: '公共服务可及性不足', note: '适合距离、时间或数字门槛造成的不便。' },
      { before: '同一件事各地说法不一样', after: '政策执行尺度不够统一', note: '用于同类事项标准、口径存在明显差异。' },
    ],
  },
  {
    key: 'causes',
    label: '原因类用词',
    desc: '把“为什么没做好”分清楚，避免所有原因都写成重视不够。',
    entries: [
      { before: '想办事，可手里的钱不够', after: '资金保障存在缺口', note: '材料明确提到预算、投入或融资困难时使用。' },
      { before: '事情多，人手又少', after: '基层工作力量配备不足', note: '适合任务量与人员数量明显不匹配。' },
      { before: '新工作来了，大家不会做', after: '专业能力与工作要求不相适应', note: '比“能力不足”更能说明能力与任务之间的落差。' },
      { before: '坐在办公室里想当然', after: '调查研究不够深入', note: '材料显示决策脱离一线情况时使用。' },
      { before: '怕出错，所以什么都不敢干', after: '担当意识不足', note: '针对畏难避责，不宜把依法审慎决策写成不担当。' },
      { before: '部门之间平时不通气', after: '信息共享机制不健全', note: '侧重机制原因，与结果层面的协同不足相区分。' },
      { before: '定方案前没问过群众', after: '公众参与渠道不够畅通', note: '适合意见征集流于形式或覆盖对象有限。' },
      { before: '老规矩管不了新问题', after: '制度供给相对滞后', note: '用于新业态、新场景缺少适配规则。' },
      { before: '平时没人查，出了事才来管', after: '常态化监督存在薄弱环节', note: '强调日常监管不足，不只写事后问责。' },
      { before: '考核只盯着几个数字', after: '考核评价导向较为单一', note: '适合数量指标挤压质量和实际效果的材料。' },
      { before: '城里有的，乡下还没有', after: '城乡公共资源配置不均衡', note: '材料涉及教育、医疗、养老等资源差异时使用。' },
      { before: '底子薄，一时跟不上', after: '基础条件较为薄弱', note: '可概括设施、产业或人才基础，但要接材料细节。' },
      { before: '谁都不愿动自己的那块利益', after: '利益协调难度较大', note: '用于改革触及多方利益、协商成本较高的情形。' },
      { before: '情况没摸全就作了决定', after: '决策信息支撑不充分', note: '强调样本、数据或反馈不足。' },
      { before: '平时没准备，事情来了手忙脚乱', after: '应急准备不够充分', note: '适合预案、物资、演练或队伍准备不足。' },
    ],
  },
  {
    key: 'measures',
    label: '措施类用词',
    desc: '措施要写清动作和对象，不能只喊“加强、提高、完善”。',
    entries: [
      { before: '先把真实情况摸清楚', after: '深入开展调查研究', note: '后面最好补充走访对象、调查方式或重点问题。' },
      { before: '把每件事分到具体的人', after: '细化责任分工', note: '可接责任单位、完成时限和工作标准。' },
      { before: '几个部门坐下来一起办', after: '健全跨部门协同机制', note: '适合跨领域治理，别忘了明确牵头主体。' },
      { before: '先找个地方试一试', after: '稳妥开展试点探索', note: '用于新政策风险和条件尚需验证的场景。' },
      { before: '不同情况用不同办法', after: '实施分类施策', note: '分类标准应来自材料，不能随意给群体贴标签。' },
      { before: '让群众一起商量、一起监督', after: '拓宽群众参与渠道', note: '可具体写议事协商、意见反馈和监督评价。' },
      { before: '把服务送到家门口', after: '推动公共服务下沉', note: '适合基层服务站点、流动服务和上门服务。' },
      { before: '教工作人员把新业务做明白', after: '加强专业化教育培训', note: '培训内容要对准岗位短板，避免为培训而培训。' },
      { before: '让各部门共用一套信息', after: '推进数据互联共享', note: '同时注意数据安全、授权边界和口径统一。' },
      { before: '过一段时间再回来看看效果', after: '建立跟踪评估机制', note: '适合政策实施后的效果评估和动态调整。' },
      { before: '把有限的钱花在最需要的地方', after: '提高财政资金使用精准度', note: '可与重点群体、重点项目和绩效管理连接。' },
      { before: '把长期做法定成规矩', after: '推动成熟经验制度化', note: '适合把临时举措转化为稳定机制。' },
      { before: '进展怎么样，及时告诉大家', after: '强化信息公开', note: '适用于公共事项的过程、结果和依据公开。' },
      { before: '发现不对就马上改', after: '健全问题发现整改闭环', note: '“闭环”应包含发现、交办、整改和反馈。' },
      { before: '把试出来的好办法推广开', after: '复制推广成熟经验', note: '推广前要说明经验适用条件，避免机械照搬。' },
    ],
  },
  {
    key: 'outcomes',
    label: '成效类用词',
    desc: '成效既可以写效率，也可以写公平、秩序、活力和长远能力。',
    entries: [
      { before: '办事比以前快多了', after: '行政服务效能明显提升', note: '最好有时限缩短、环节减少等材料依据。' },
      { before: '群众不用反复跑了', after: '群众办事成本有效降低', note: '成本可包括时间、交通和材料准备。' },
      { before: '同样的钱办了更多实事', after: '资金使用效益进一步提高', note: '不能只凭投入增加判断效益提高。' },
      { before: '村里的环境干净多了', after: '人居环境持续改善', note: '适合垃圾、污水、绿化和公共空间治理。' },
      { before: '大家都愿意来商量村里的事', after: '群众参与治理的积极性不断增强', note: '可由参与人数、议事频率和自治行动支撑。' },
      { before: '邻里争吵和投诉少了', after: '基层矛盾纠纷得到有效化解', note: '区分暂时压下矛盾与真正解决问题。' },
      { before: '产业不再一年好一年差', after: '产业发展韧性不断增强', note: '适合市场波动下仍能稳定经营、就业或增收。' },
      { before: '困难群众也能享受到服务', after: '基本公共服务兜底保障更加有力', note: '侧重困难群体的基本需求，不宜夸大为完全均等。' },
      { before: '城乡看病上学的差距小了', after: '城乡公共服务差距逐步缩小', note: '“逐步”比“彻底消除”更符合审慎表达。' },
      { before: '干部愿意上门听意见了', after: '基层干部工作作风明显转变', note: '由具体服务行为支撑，避免空泛评价。' },
      { before: '问题刚冒头就被发现了', after: '风险预警处置能力有效提升', note: '适合监测、研判和早期干预产生效果。' },
      { before: '老手艺又有人学、有人用了', after: '优秀传统文化焕发新的活力', note: '应有传承人、产品、活动或生活应用等事实。' },
      { before: '实验室里的成果真正用起来了', after: '科技成果转化效率不断提高', note: '适合科研成果进入生产或公共服务场景。' },
      { before: '政策更能照顾到真正需要的人', after: '政策供给的精准性进一步增强', note: '强调对象识别、需求匹配和动态调整。' },
      { before: '眼下有收获，往后也有奔头', after: '高质量发展后劲持续增强', note: '用于人才、创新、产业基础等长期能力的改善。' },
    ],
  },
  {
    key: 'government-verbs',
    label: '政府工作高频动词',
    desc: '动词要带着对象使用，写清政府究竟做了什么。',
    entries: [
      { before: '把各方面的事情统起来', after: '统筹各方资源', note: '适合多目标、多主体之间的整体安排。' },
      { before: '先保证困难群众的基本生活', after: '兜牢民生底线', note: '多用于就业、医疗、养老、救助等基本保障。' },
      { before: '把中间卡住的环节接起来', after: '打通堵点环节', note: '后面应点明具体堵点，避免把“打通”当口号。' },
      { before: '让闲着的资产重新用起来', after: '盘活存量资源', note: '适合闲置土地、房屋、设备和数据等资源。' },
      { before: '哪里最弱就先补哪里', after: '补齐短板弱项', note: '要接教育、设施、人才等明确对象。' },
      { before: '让责任真正落到人头上', after: '压紧压实责任', note: '常与主体责任、属地责任、监管责任搭配。' },
      { before: '带着社会力量一起参与', after: '引导社会力量有序参与', note: '强调规则和秩序，不等同于把政府责任外包。' },
      { before: '给市场立清楚规矩', after: '规范市场秩序', note: '适合纠治违规经营、不正当竞争等问题。' },
      { before: '把缺的制度和流程补起来', after: '健全工作机制', note: '最好写明决策、执行、监督或反馈中的哪一环。' },
      { before: '让群众办事更顺手', after: '优化政务服务', note: '可接减材料、减环节、减时限等具体做法。' },
      { before: '一项一项往前推', after: '有序推进重点任务', note: '适合需要分阶段实施的复杂工作。' },
      { before: '把文件上的要求做到位', after: '推动政策落地见效', note: '要有执行动作和效果，避免只写转发文件。' },
      { before: '平时多检查、多提醒', after: '强化全过程监管', note: '可覆盖事前准入、事中检查和事后处置。' },
      { before: '不让守规矩的人吃亏', after: '依法保障合法权益', note: '应明确保障对象，并以法律政策为依据。' },
      { before: '先做出样子给大家看', after: '发挥示范引领作用', note: '适合典型主体带动同类主体，不替代普遍制度建设。' },
    ],
  },
];

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


