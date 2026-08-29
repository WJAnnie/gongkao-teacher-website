import type { HotspotArticle, HotspotCategory, HotspotHighlight } from './writing-hotspot-schema';

type Mark = HotspotHighlight['label'];
type Slot = 'intro' | 'conclusion' | 0 | 1 | 2;

type Addition = {
  slot: Slot;
  text: string;
  marks?: HotspotHighlight[];
};

type VoicePack = {
  analysis: string[];
  metaphor: string[];
  parallel: string[];
  quote: string[];
};

const voices: Record<string, VoicePack> = {
  development: {
    analysis: [
      '越是处在转型升级的关键阶段，越不能只算眼前账。{topic}既要看当下形成了多少增量，更要看有没有沉淀技术、人才、品牌和产业生态，能不能把一时优势变成长期能力。',
      '发展质量从来不是单项指标的胜负。评价{topic}，既要看效率有没有提高，也要看结构有没有优化、风险有没有降低、群众有没有受益，最终要经得住市场和时间的双重检验。',
      '真正有生命力的发展，不靠追逐一阵风，而靠形成一套可持续的能力。{topic}只有同实体经济、真实需求和区域禀赋结合起来，才可能从政策热词变成稳定的发展动能。',
    ],
    metaphor: [
      '如果把发展比作一棵树，创新是不断向下扎的根，产业是向上伸展的枝干，市场需求和民生改善则是最终结出的果实。根不深、干不强，果实就难以长久。',
      '{topic}不是在旧跑道上简单加速，而是在换挡爬坡中重塑发动机。换挡需要勇气，爬坡更需要耐力，真正决定能走多远的，是基础能力而不是一时声量。',
      '产业生态好比一片森林，既需要能够遮风挡雨的“大树”，也需要充满活力的“幼苗”和彼此依存的上下游。只有大中小企业协同生长，{topic}才有更厚实的土壤。',
    ],
    parallel: [
      '既要看项目落得快不快，也要看产业链扎得深不深；既要看眼前增量，也要看长期后劲；既要争取发展的“速度”，更要提升发展的“成色”。',
      '让技术有出处、成果有去处、企业有用处、人才有舞台，创新链与产业链才能真正咬合，{topic}才能从概念走向能力、从试点走向规模。',
      '该补的短板要补牢，该锻的长板要锻强，该闯的新路要敢闯，该守的底线要守住，在进与稳、立与破、新与旧之间找到平衡。',
    ],
    quote: [
      '《礼记·大学》有言：“苟日新，日日新，又日新。”创新的意义不在于追逐新奇，而在于持续更新解决问题的能力。',
      '古人讲“不谋万世者，不足谋一时；不谋全局者，不足谋一域”。发展{topic}尤其需要把眼前项目放到长期竞争力和整体产业生态中审视。',
      '“根深则叶茂，本固则枝荣。”越是新赛道、新产业，越要重视基础研究、人才培养和制度供给这些不显眼却决定后劲的工作。',
    ],
  },
  culture: {
    analysis: [
      '文化的价值不只在“被看见”，更在“被理解、被认同、被使用”。谈{topic}，如果只停留在符号包装和流量传播，热度来得快也去得快；只有进入日常生活，才能形成稳定而持久的文化认同。',
      '保护与发展并不是非此即彼。{topic}真正需要处理的是传统内容与当代表达、公共价值与市场价值、文化本体与传播形式之间的关系，守住内核才能放开手脚创新。',
      '一座城市、一个地方真正打动人的文化，往往不只在宏大的地标中，也藏在街巷肌理、生活习俗和普通人的共同记忆里。{topic}越贴近生活，越容易形成可持续的生命力。',
    ],
    metaphor: [
      '文化不是陈列柜里的标本，而是一条不断流动的河。守住源头是为了不忘来处，引入活水是为了奔向更远的地方，{topic}也应在传承与创新之间保持这样的流动。',
      '城市文化既有“面子”，更有“里子”。建筑景观是面子，公共文化、生活气质和精神认同是里子；面子让人看见一座城，里子才让人真正记住一座城。',
      '优秀传统文化如同一棵老树，根须扎在历史深处，枝叶却要面向今天的阳光。只护住树干而不让它继续生长，同样不是最好的传承。',
    ],
    parallel: [
      '保护要见物，传承要见人，创新要见生活，传播要见时代。把这四个环节接起来，{topic}才能既守得住根脉，也跟得上时代。',
      '既不能把传统“供起来”而远离生活，也不能为了流量“改得面目全非”；既要让文化可亲可感，也要让价值底色清晰稳定。',
      '让古老技艺有新传人，让传统符号有新表达，让文化空间有新场景，让年轻群体有新共鸣，文化传承才会从“保存下来”走向“活起来”。',
    ],
    quote: [
      '古人说：“求木之长者，必固其根本；欲流之远者，必浚其泉源。”文化创新走得越远，越需要知道自己的根在哪里。',
      '“观乎人文，以化成天下。”文化真正的力量，不在于装点门面，而在于润物无声地塑造价值、涵养气质、凝聚人心。',
      '“周虽旧邦，其命维新。”守正从来不是守旧，真正的传承是在守住精神内核的同时不断找到与时代对话的新方式。',
    ],
  },
  people: {
    analysis: [
      '民生问题看似琐碎，却最能检验发展成色。{topic}不能只看服务供给“有没有”，更要追问距离远不远、价格承不承受、质量稳不稳定、不同群体能不能公平获得。',
      '人的需求具有鲜明的生命周期特征。{topic}既要解决眼前困难，也要通过教育、培训、健康和保障提升人的长期发展能力，把“兜底线”与“促发展”结合起来。',
      '公共投入投向人，看似见效不如项目建设快，却能通过提升能力、稳定预期、释放消费和增强社会活力形成更长久的回报。理解{topic}，要把人的发展本身放在更重要的位置。',
    ],
    metaphor: [
      '民生是社会运行的“温度计”。数字增长再亮眼，如果群众在就业、教育、医疗、养老等方面仍感到焦虑，发展的温度就还没有真正升起来。',
      '人才不是装进“蓄水池”就万事大吉的资源，更像需要持续流动的活水。引得来只是起点，用得好、留得住、成长快，才能让{topic}形成良性循环。',
      '公共服务好比一张安全网，网眼不能太大、节点不能太松。越是普通家庭遇到人生关键节点时，越能感受到这张网是否结实。',
    ],
    parallel: [
      '幼有所育、学有所教、劳有所得、病有所医、老有所养，民生保障连接的是一个人从成长到老年的完整生命周期。',
      '既要解决“有没有”的覆盖问题，也要解决“好不好”的质量问题；既要照顾多数人的普遍需求，也要看见特殊群体的具体困难。',
      '政策多一些精度，服务多一些温度，保障多一些力度，群众就会多一分安心、多一分底气、多一分对未来的稳定预期。',
    ],
    quote: [
      '《尚书》有言：“民惟邦本，本固邦宁。”民生保障不是发展的附属项，而是社会稳定、经济活力和长期发展的基础工程。',
      '“治国有常，而利民为本。”衡量{topic}做得好不好，最终要落到群众是否真正得到便利、能力和保障上。',
      '“为政之道，以顺民心为本。”公共政策越贴近真实需求，越能把有限资源用在群众最急、最难、最盼的地方。',
    ],
  },
  government: {
    analysis: [
      '改革是否有效，不能只看文件减了多少、系统建了多少，更要看企业群众办一件事到底是不是更省心。{topic}要从部门视角转向用户视角，用办事体验倒逼流程再造。',
      '政府治理的难点往往不在“没有制度”，而在制度之间不衔接、部门之间有壁垒、线上线下不同步。推进{topic}，关键是把分散的权责、数据和流程真正组织起来。',
      '数字化可以提高效率，却不能把所有人都默认成“熟练用户”。{topic}既要向智能化迈进，也要保留必要的人工服务和兜底渠道，让效率提升不以制造新的不便为代价。',
    ],
    metaphor: [
      '政务窗口看似只有方寸之地，却是观察政府作风的一面镜子。材料多一张、环节多一层、解释少一句，群众都能从中感受到治理是否真正以人为本。',
      '数据共享好比打通政务服务的“经脉”。数据各自沉睡在部门系统里，再多平台也只是信息孤岛；经脉打通，服务才能真正顺畅运行。',
      '规则既要做市场运行的“红绿灯”，也要做企业发展的“护栏”。该管的管住、该放的放活，才能让{topic}既有秩序又有活力。',
    ],
    parallel: [
      '能共享的数据不重复提交，能联办的事项不来回跑，能线上办理的不强制到场，能一次说清的不让群众反复问。',
      '减材料不是简单“做减法”，数据共享要做“加法”；减环节不是降低标准，流程再造要做“乘法”。',
      '把群众的“来回跑”变成部门的“协同办”，把企业的“多头找”变成政府的“一次应”，服务方式一变，治理理念也随之改变。',
    ],
    quote: [
      '《管子》有言：“政之所兴在顺民心，政之所废在逆民心。”{topic}最终不是技术命题，而是能否回应真实需求的治理命题。',
      '古人讲“利民之事，丝发必兴；厉民之事，毫末必去”。优化服务往往就体现在减少一个证明、压缩一个环节、解决一个具体难题上。',
      '“知政失者在草野。”评价{topic}不能只听部门汇报，更要到办事窗口、企业车间和群众身边听真实反馈。',
    ],
  },
  grassroots: {
    analysis: [
      '基层工作千头万绪，最忌用一把尺子量到底。{topic}面对的是具体的人、具体的村社和具体的矛盾，只有把政策要求同本地实际结合起来，办法才不会悬在半空。',
      '基层治理不是政府一家“包办”，也不是把责任简单下放。{topic}需要党组织统筹、群众参与、社会协同和资源下沉，让治理力量在离问题最近的地方形成合力。',
      '许多基层难题表面上是“小事”，背后却连接利益协调、公共服务和群众信任。做好{topic}，既要解决眼前问题，也要从一次处置中找到能够长期运行的机制。',
    ],
    metaphor: [
      '基层是国家治理的“神经末梢”。末梢是否灵敏，决定政策能不能及时感知群众冷暖，也决定治理资源能不能准确抵达问题现场。',
      '为基层减负，不是简单把任务“砍掉一截”，而是给基层干部卸下不必要的包袱，让他们把脚从表格里抽出来、把时间还给群众。',
      '治理共同体就像一张网，组织是经线，群众是纬线，制度和技术把彼此连接起来。网织得密，矛盾才更容易在基层被发现、被化解。',
    ],
    parallel: [
      '问题在一线发现、矛盾在一线化解、办法在一线形成、成效在一线检验，{topic}才不会停留在会议和材料里。',
      '既要把群众请进议事厅，也要让干部走进百姓家；既要依靠制度定规则，也要通过协商聚共识。',
      '自治激活内生动力，法治明确行为边界，德治涵养文明风尚，智治提升治理效率，多种方式不是彼此替代，而要相互补位。',
    ],
    quote: [
      '古人说：“知屋漏者在宇下，知政失者在草野。”{topic}越是复杂，越要沉到一线听真话、察实情、找办法。',
      '“些小吾曹州县吏，一枝一叶总关情。”基层治理面对的常常是一件件小事，而群众正是从这些小事中感受治理温度。',
      '“天下大事，必作于细。”{topic}没有太多惊天动地的捷径，靠的是把一件件具体事情办细、办实、办到群众心里。',
    ],
  },
  law: {
    analysis: [
      '执法的公信力既来自结果公正，也来自程序规范。{topic}不能只追求“处理了多少”，更要看事实是否查清、尺度是否统一、程序是否完整、权利是否得到保障。',
      '严格与柔性并不矛盾。对严重违法必须依法惩处，对轻微过错可以通过提醒纠正、说服教育等方式实现执法目的。{topic}真正考验的是能否做到宽严相济、过罚相当。',
      '规则只有稳定、透明、可预期，市场主体和群众才知道什么可以做、什么不能做。推进{topic}，既要规范执法行为，也要通过公开标准和监督机制减少任性空间。',
    ],
    metaphor: [
      '法治既是社会运行的“轨道”，也是改革创新的“护栏”。轨道让权力按规则运行，护栏让创新在明确边界内大胆探索。',
      '执法尺度好比一把尺子，尺子本身要清楚，量不同对象时也要保持稳定。标准模糊、尺度摇摆，再好的执法初衷也可能损害公信力。',
      '监督不是执法工作的“刹车”，而是保证车辆不偏离道路的方向校正。监督越及时，权力运行越规范，{topic}越能获得社会信任。',
    ],
    parallel: [
      '事实认定要有依据，程序运行要有规范，裁量尺度要有边界，权利救济要有渠道，执法全过程才能经得起检验。',
      '既要有惩治违法的力度，也要有教育引导的温度；既要维护规则的刚性，也要体现治理的善意。',
      '让执法事项可查询、执法过程可回溯、裁量标准可对照、执法结果可监督，权力才能真正运行在阳光下。',
    ],
    quote: [
      '《荀子》有言：“法者，治之端也。”推进{topic}，首先要让权力有边界、行为有尺度、程序有规范。',
      '古人说：“天下之事，不难于立法，而难于法之必行。”制度写在纸上只是第一步，公平规范地落实到每一次执法中才是真正的考验。',
      '“奉法者强则国强，奉法者弱则国弱。”法治权威来自全社会共同尊崇规则，也来自执法机关自身严格依法办事。',
    ],
  },
  values: {
    analysis: [
      '精神品质如果只停留在口号中，就很难形成真正力量。{topic}最终要落在面对选择时怎么判断、遇到困难时怎么坚持、承担任务时怎么行动。',
      '价值观念不是抽象的“高大上”，而是一套稳定的选择标准。谈{topic}，既要看到个人品格，也要看到制度环境、岗位责任和时代需要如何共同塑造行动。',
      '真正可贵的品质，往往在无人喝彩、短期看不到回报的时候更能显现。{topic}需要的不是一时激情，而是把正确的事长期做下去的定力。',
    ],
    metaphor: [
      '理想信念像人生的“压舱石”。风平浪静时未必显眼，越到风高浪急、选择复杂的时候，越能让人稳住方向、不随波逐流。',
      '实干不是舞台上的聚光灯，更像地基里的钢筋。它不一定最醒目，却决定事业能不能经得住时间和困难的检验。',
      '正确政绩观是一把“标尺”。尺子量的是群众得失、长远发展和实际成效，而不是材料厚度、场面大小和短期声量。',
    ],
    parallel: [
      '面对困难不退缩，面对责任不推诿，面对诱惑不动摇，面对成绩不自满，{topic}就在一次次具体选择中得到检验。',
      '把该做的事做实，把难做的事做成，把长期的事做久，把群众的小事做好，价值追求才能真正落到行动上。',
      '既要有“功成不必在我”的境界，也要有“功成必定有我”的担当；既肯做显绩，也愿做打基础、利长远的潜绩。',
    ],
    quote: [
      '古人说：“一语不能践，万卷徒空虚。”{topic}不能靠漂亮表达证明，最终要靠一件件实事、一项项成效来检验。',
      '“纸上得来终觉浅，绝知此事要躬行。”认知只有进入实践，理想只有化为行动，才会真正成为一个人的能力和品格。',
      '“功崇惟志，业广惟勤。”志向决定方向，勤勉决定距离，{topic}正是在长期坚持中一步步积累起来的。',
    ],
  },
  era: {
    analysis: [
      '面对新事物，最容易犯两种错误：一种是只看机会、忽视风险，另一种是只看问题、拒绝变化。理解{topic}，更成熟的态度是先看它解决了什么需求，再看它带来什么新问题，最后用发展和治理同步回应。',
      '新技术、新业态真正改变社会时，往往不是单点技术更炫，而是生产流程、就业方式、传播结构和生活习惯同时发生变化。{topic}因此既是技术议题，也是治理议题和社会议题。',
      '规则总会面对新情况，但治理不能永远追在技术后面跑。对{topic}既要允许试错和创新，也要通过标准、伦理和责任机制提前划出基本边界。',
    ],
    metaphor: [
      '技术像一艘越来越快的船，规则不是拖住船速的锚，而是保证方向的舵。没有创新，船走不远；没有规则，船也可能驶向风险水域。',
      '{topic}像一扇快速打开的新窗口，窗口带来新的风景，也可能带来新的风雨。真正成熟的治理不是把窗关上，而是装好护栏、学会使用。',
      '数据、算法和平台正在成为数字社会的新“基础设施”。基础设施越深入日常生活，越需要稳定、可信、普惠，不能只追求技术上的可实现。',
    ],
    parallel: [
      '鼓励创新要有空间，保护权益要有底线，风险处置要有工具，规则调整要有弹性，{topic}才能在规范中成长、在成长中完善规范。',
      '技术向前一步，规则要及时跟一步；应用拓展一层，责任边界要清晰一层；效率提升一分，人的权益也要多一分保障。',
      '看见新机会而不盲目追风，看见新风险而不因噎废食，看见新变化而及时学习，才是面对{topic}更理性的姿态。',
    ],
    quote: [
      '古人说：“工欲善其事，必先利其器。”新工具能够放大人的能力，但工具越强，越需要使用者具备判断、责任和边界意识。',
      '《礼记》有言：“苟日新，日日新，又日新。”面对{topic}，保持学习和更新能力，本身就是适应时代变化的重要素养。',
      '“明者因时而变，知者随事而制。”新事物不断出现，治理方式也应及时更新，但变化始终要服务于人的发展和公共利益。',
    ],
  },
};

const caseRules: Array<{ match: RegExp; text: string; reason: string }> = [
  { match: /低空/, text: '深圳等地已把无人机应用到物流配送、城市巡检等真实场景。', reason: '这说明新赛道能不能形成产业，不在概念有多热，而在是否有稳定需求、基础设施和安全规则共同托底。' },
  { match: /科技创新|成果转化/, text: '北斗导航从关键技术攻关走向交通、农业、应急等规模化应用，是科技成果进入产业和生活的典型路径。', reason: '从“技术突破”到“场景应用”之间还有转化、标准、人才和市场等多道关口，创新链必须与产业链衔接。' },
  { match: /传统文化|文化传承/, text: '敦煌研究院持续推进壁画数字化保护，并通过数字展览让更多人接触敦煌艺术。', reason: '保护文化遗产不等于把它封存起来，技术可以降低接触门槛，但真正要传递的仍是文化本身的价值与精神。' },
  { match: /文化产业|文旅融合|陶瓷/, text: '景德镇把陶瓷老厂房、手工技艺、青年创客和旅游消费连接起来，老工业空间由此形成新的文化场景。', reason: '文化资源只有转化为可参与、可体验、可持续的业态，才更容易把文化价值与产业价值连接起来。' },
  { match: /公共文化|城市书房/, text: '不少城市把公共图书馆延伸到社区、商圈和公园，以“小而近”的城市书房补充大型场馆服务。', reason: '公共文化的关键不只在建了多少馆，更在服务是否嵌入日常生活、是否真正方便群众使用。' },
  { match: /养老|适老/, text: '一些社区把助餐、日间照料、健康管理等服务嵌入居民生活圈，让老人不离开熟悉社区也能获得基本照护。', reason: '养老服务越靠近生活场景，越能降低家庭照护压力，也更能回应老年人对便利、熟悉和尊严的需要。' },
  { match: /最多跑一次|放管服|一件事/, text: '浙江“最多跑一次”改革从群众办事体验出发，推动事项、流程和数据跨部门协同。', reason: '改革真正改变的不是窗口名称，而是政府内部运行方式：让部门多协同，才能让群众少跑腿。' },
  { match: /热线|接诉/, text: '不少地方把12345热线从“接电话”升级为问题归集、派单办理、跟踪反馈的治理闭环。', reason: '一通电话背后可能连接多个部门，只有把个案办理进一步转化为共性问题治理，热线才不只是“传声筒”。' },
  { match: /营商/, text: '一些地方把企业开办、用工、纳税等高频事项整合为企业全生命周期服务。', reason: '营商环境好不好，企业最有感受；把企业视角嵌入流程设计，才能真正降低制度性交易成本。' },
  { match: /千万工程/, text: '浙江“千万工程”从农村环境整治起步，二十多年持续推进，逐步延伸到产业发展、公共服务和乡村治理。', reason: '它最值得学习的不是某一项具体做法，而是长期坚持、因地制宜、循序渐进，把阶段性任务做成系统工程。' },
  { match: /四下基层/, text: '“四下基层”发端于福建宁德，把宣传政策、调查研究、信访接待、现场办公延伸到基层一线。', reason: '它强调的不是简单“下去一次”，而是把群众路线嵌入发现问题、研究问题和解决问题的全过程。' },
  { match: /枫桥/, text: '浙江诸暨枫桥长期探索依靠基层力量就地化解矛盾，形成了不断发展丰富的“枫桥经验”。', reason: '矛盾化解越靠前，治理成本越低；真正有效的基层治理，要有发现问题的触角，也要有协商解决的机制。' },
  { match: /六尺巷/, text: '安徽桐城把“六尺巷”礼让文化融入基层调解，用熟人社会能够理解的文化语言促进矛盾协商。', reason: '文化资源只有转化为群众愿意接受的治理方式，才能从历史故事变成今天解决问题的现实工具。' },
  { match: /基层减负|形式主义/, text: '现实中曾出现同一数据反复填报、多个平台重复打卡、材料层层留痕等现象。', reason: '减负不是降低工作标准，而是减少无效消耗，把干部有限的时间和精力重新投向解决问题和服务群众。' },
  { match: /柔性执法|服务型执法|首违/, text: '不少地方对危害较轻、及时改正的轻微违法探索提醒纠正、首违不罚等方式。', reason: '柔性方式不是放松监管，而是在法律框架内根据行为危害、主观过错和整改情况选择更适当的治理手段。' },
  { match: /智慧执法|非现场/, text: '交通、生态环境等领域 increasingly use video, sensing and online data for non-on-site supervision。', reason: '技术能够减少重复检查、提高发现问题效率，但算法识别之后仍需要规范复核和程序保障，不能把技术判断直接等同于执法结论。' },
  { match: /执法监督/, text: '行政执法公示、全过程记录、重大执法决定法制审核等制度，把执法权运行过程进一步置于可追溯监督之下。', reason: '监督越嵌入日常流程，越能减少事后纠错成本，也越有利于形成稳定统一的执法尺度。' },
  { match: /理想信念/, text: '焦裕禄在兰考工作时间并不长，却把治理风沙、改善群众生活当作自己的责任，留下跨越时间的精神坐标。', reason: '理想信念不是抽象口号，它最终表现为面对困难时选择做什么、为谁做、能坚持多久。' },
  { match: /无私奉献|教育家|教师/, text: '张桂梅多年扎根云南山区教育，把帮助更多女孩接受教育作为长期事业。', reason: '真正有力量的奉献往往不是一次性的壮举，而是在平凡岗位上持续投入，把个人选择转化为他人发展的机会。' },
  { match: /扎根基层/, text: '黄文秀从城市回到百色基层驻村，把脱贫工作落到一户一户走访和一件一件具体事情上。', reason: '基层经验不是“待出来”的，而是在同群众打交道、解决实际问题的过程中一点点长出来的。' },
  { match: /新媒体|短视频/, text: '“村BA”“村超”等群众性活动借助短视频和直播传播走出当地，让乡土文化获得更广泛关注。', reason: '新媒体能够放大真实内容的传播势能，但真正留住受众的仍是鲜明特色、真实情感和持续内容供给。' },
  { match: /新就业|骑手|灵活就业/, text: '一些城市建设“暖新驿站”、骑手友好社区，为外卖骑手、快递员提供休息、充电和办事便利。', reason: '新职业带来就业弹性，也提出新的权益保障需求；公共服务需要跟着就业形态变化及时调整。' },
  { match: /机器人|具身智能/, text: '在汽车制造、仓储分拣等场景，机器人已经从展示型设备转向承担重复、高强度和高风险任务。', reason: '真正的产业价值不在“会不会炫技”，而在能否稳定完成任务、降低成本并与现有生产流程协同。' },
  { match: /人工智能/, text: '制造企业用人工智能辅助质检和排产，医疗机构探索影像辅助，政务窗口也开始尝试智能问答。', reason: '同一种技术进入不同场景会产生不同价值和风险，因此既要鼓励应用，也要根据场景建立差异化边界。' },
];

function interpolate(text: string, topic: string) {
  return text.replaceAll('{topic}', topic);
}

function hash(input: string) {
  let value = 0;
  for (let i = 0; i < input.length; i += 1) value = (value * 31 + input.charCodeAt(i)) >>> 0;
  return value;
}

function articleLength(article: HotspotArticle) {
  return [
    article.intro,
    article.thesis,
    ...article.sections.flatMap((section) => [section.title, section.body]),
    article.conclusion,
  ].join('').replace(/\s/g, '').length;
}

function uniqueHighlights(items: HotspotHighlight[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.label}:${item.text}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function pickCase(article: HotspotArticle) {
  const haystack = `${article.title} ${article.tags.join(' ')}`;
  return caseRules.find((item) => item.match.test(haystack));
}

function makeCandidate(text: string, label?: Mark, markedText?: string): { text: string; marks: HotspotHighlight[] } {
  return {
    text,
    marks: label && markedText ? [{ text: markedText, label }] : [],
  };
}

function createCandidates(article: HotspotArticle, category: HotspotCategory, index: number) {
  const pack = voices[category.key] ?? voices.era;
  const topic = article.tags[0] ?? article.title;
  const seed = hash(article.slug);
  const a = seed % pack.analysis.length;
  const b = (seed + 1) % pack.metaphor.length;
  const c = (seed + 2) % pack.parallel.length;
  const d = (seed + index) % pack.quote.length;

  const analysis = interpolate(pack.analysis[a], topic);
  const metaphor = interpolate(pack.metaphor[b], topic);
  const parallel = interpolate(pack.parallel[c], topic);
  const quote = interpolate(pack.quote[d], topic);
  const caseItem = pickCase(article);

  const dialecticText = `需要特别辨明的是，${topic}不是越多越好、越快越好，也不是一遇到问题就收紧甚至停下，而要在目标、条件和边界之间找到恰当尺度。真正成熟的治理和发展，往往体现在能把看似冲突的要求转化为可以协同推进的关系。`;
  const highEndText = `归根到底，${topic}的成色不写在概念里，而写在解决了多少真实问题、形成了多少长期能力、留下了多少可持续价值之中。`;
  const sceneText = `把视线落到具体场景，会更容易理解${topic}：一项政策进入窗口、社区、企业或家庭之后，群众是否更方便、组织是否更高效、风险是否更可控，往往比宏观口号更能说明问题。`;

  const candidates = [
    makeCandidate(analysis),
    makeCandidate(metaphor, '比喻', metaphor.split('。')[0] + '。'),
    makeCandidate(parallel, '排比', parallel),
    makeCandidate(quote, '名言', quote.includes('：“') ? quote.slice(quote.indexOf('“'), quote.indexOf('”') + 1) : quote.split('。')[0]),
    makeCandidate(dialecticText, '对仗', '不是越多越好、越快越好，也不是一遇到问题就收紧甚至停下'),
    makeCandidate(highEndText, '高端句', highEndText),
    makeCandidate(sceneText),
  ];

  if (caseItem) {
    candidates.splice(1, 0, makeCandidate(`${caseItem.text}${caseItem.reason}`, '案例', caseItem.text));
  }

  return candidates;
}

const slotOrders: Slot[][] = [
  [0, 1, 'intro', 2, 'conclusion', 0, 2, 1],
  ['intro', 0, 2, 1, 'conclusion', 2, 0, 1],
  [1, 0, 'conclusion', 2, 'intro', 1, 2, 0],
  [0, 2, 1, 'intro', 'conclusion', 2, 1, 0],
  [2, 0, 1, 'conclusion', 'intro', 0, 1, 2],
  ['conclusion', 1, 0, 2, 'intro', 1, 0, 2],
  [1, 2, 0, 'intro', 'conclusion', 0, 2, 1],
  ['intro', 2, 0, 1, 'conclusion', 1, 0, 2],
];

function append(article: HotspotArticle, addition: Addition) {
  const separator = addition.slot === 'intro' || addition.slot === 'conclusion' ? '' : '';
  if (addition.slot === 'intro') article.intro += separator + addition.text;
  else if (addition.slot === 'conclusion') article.conclusion += separator + addition.text;
  else article.sections[addition.slot].body += separator + addition.text;
  article.highlights.push(...(addition.marks ?? []));
}

function sentenceTrim(text: string, target: number) {
  if (text.length <= target) return text;
  const cut = text.slice(0, target);
  const stop = Math.max(cut.lastIndexOf('。'), cut.lastIndexOf('！'), cut.lastIndexOf('？'), cut.lastIndexOf('；'));
  return stop >= Math.max(80, target - 100) ? cut.slice(0, stop + 1) : `${cut.slice(0, Math.max(0, target - 1))}。`;
}

function shrink(article: HotspotArticle) {
  let total = articleLength(article);
  while (total > 1288) {
    const ranked = article.sections
      .map((section, index) => ({ index, length: section.body.length }))
      .sort((x, y) => y.length - x.length);
    const target = ranked.find((item) => article.sections[item.index].body.length > 190);
    if (target) {
      article.sections[target.index].body = sentenceTrim(article.sections[target.index].body, article.sections[target.index].body.length - Math.min(90, total - 1260));
    } else if (article.conclusion.length > 150) {
      article.conclusion = sentenceTrim(article.conclusion, article.conclusion.length - Math.min(80, total - 1260));
    } else {
      break;
    }
    total = articleLength(article);
  }
}

function refineArticle(source: HotspotArticle, category: HotspotCategory, index: number): HotspotArticle {
  const article: HotspotArticle = {
    ...source,
    sections: source.sections.map((section) => ({ ...section })),
    highlights: [...source.highlights],
    references: [...source.references],
    tags: [...source.tags],
  };

  const seed = hash(article.slug);
  const style = seed % slotOrders.length;
  const target = 1060 + (seed % 121);
  const candidates = createCandidates(article, category, index);
  const order = slotOrders[style];

  let cursor = 0;
  while (articleLength(article) < target && cursor < candidates.length) {
    const candidate = candidates[(cursor + style) % candidates.length];
    const slot = order[cursor % order.length];
    const predicted = articleLength(article) + candidate.text.replace(/\s/g, '').length;
    if (predicted <= 1288 || articleLength(article) < 1000) {
      append(article, { slot, text: candidate.text, marks: candidate.marks });
    }
    cursor += 1;
  }

  while (articleLength(article) < 1000) {
    const topic = article.tags[0] ?? article.title;
    const fallback = `进一步说，${topic}不能靠一次行动、一项工程或一个平台完成。短期要解决最突出的现实问题，中期要形成稳定运行的制度机制，长期还要依靠人才、规则和社会共识持续迭代。只有把当下之“治”与长远之“制”连接起来，成效才不会随着热度消退。`;
    const slot: Slot = (cursor % 3) as 0 | 1 | 2;
    append(article, { slot, text: fallback, marks: [{ text: '把当下之“治”与长远之“制”连接起来', label: '对仗' }] });
    cursor += 1;
    if (cursor > 12) break;
  }

  shrink(article);
  article.highlights = uniqueHighlights(article.highlights);

  const count = articleLength(article);
  article.length = `${count}字`;
  if (count < 1000 || count > 1300) {
    throw new Error(`Hotspot article length out of range: ${article.slug} = ${count}`);
  }
  return article;
}

export function refineCategory(category: HotspotCategory): HotspotCategory {
  const base: HotspotCategory = {
    ...category,
    articles: category.articles.map((article, index) => refineArticle(article, category, index)),
  };
  return base;
}
