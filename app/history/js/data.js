/**
 * 史鉴：荣格八维 + 九型人格 → 中国古代历史人物
 * 人物塑形为教学隐喻，非对史实人格的科学鉴定。
 */
window.HISTORY_DATA = (function () {
  const FUNCTIONS = ["Te", "Ti", "Fe", "Fi", "Se", "Si", "Ne", "Ni"];

  const TYPE_STACKS = {
    INTJ: ["Ni", "Te", "Fi", "Se"],
    INTP: ["Ti", "Ne", "Si", "Fe"],
    ENTJ: ["Te", "Ni", "Se", "Fi"],
    ENTP: ["Ne", "Ti", "Fe", "Si"],
    INFJ: ["Ni", "Fe", "Ti", "Se"],
    INFP: ["Fi", "Ne", "Si", "Te"],
    ENFJ: ["Fe", "Ni", "Se", "Ti"],
    ENFP: ["Ne", "Fi", "Te", "Si"],
    ISTJ: ["Si", "Te", "Fi", "Ne"],
    ISFJ: ["Si", "Fe", "Ti", "Ne"],
    ESTJ: ["Te", "Si", "Ne", "Fi"],
    ESFJ: ["Fe", "Si", "Ne", "Ti"],
    ISTP: ["Ti", "Se", "Ni", "Fe"],
    ISFP: ["Fi", "Se", "Ni", "Te"],
    ESTP: ["Se", "Ti", "Fe", "Ni"],
    ESFP: ["Se", "Fi", "Te", "Ni"],
  };

  const TYPE_TITLES = {
    INTJ: "战略家",
    INTP: "思考者",
    ENTJ: "指挥官",
    ENTP: "辩论家",
    INFJ: "洞察者",
    INFP: "调停者",
    ENFJ: "主人公",
    ENFP: "竞选者",
    ISTJ: "物流师",
    ISFJ: "守卫者",
    ESTJ: "总经理",
    ESFJ: "执政官",
    ISTP: "鉴赏家",
    ISFP: "探险家",
    ESTP: "企业家",
    ESFP: "表演者",
  };

  const ENNEA_META = {
    1: { name: "改革者", core: "追求正确与完善" },
    2: { name: "助人者", core: "被需要、付出关怀" },
    3: { name: "成就者", core: "以成果证明价值" },
    4: { name: "个人主义者", core: "独特情感与意义" },
    5: { name: "观察者", core: "理解世界、保存精力" },
    6: { name: "忠诚者", core: "寻求确定与同盟" },
    7: { name: "热情者", core: "体验可能、回避痛苦" },
    8: { name: "挑战者", core: "掌控、保护与强度" },
    9: { name: "和平者", core: "和谐、融合与安定" },
  };

  /**
   * 每型至少 3 人；enneagram 主型决定同型内分流
   * image 先占位，抓取脚本会写成 ./img/{id}.jpg
   */
  const FIGURES = {
    INTJ: [
      {
        id: "zhugeliang",
        name: "诸葛亮",
        dynasty: "三国 · 蜀汉",
        enneagram: "5w6",
        title: "鞠躬尽瘁的战略观察者",
        weights: { Ni: 1.4, Te: 1.2, Fi: 0.9, Se: 0.4 },
        traits: ["深谋远虑", "制度建设", "克己奉公", "信息优势"],
        analysis:
          "在八维上，诸葛亮常被理解为 Ni-Te 突出：先在心中形成长远局势图景，再用文书、法制与后勤把蓝图落地。《出师表》里的谨慎与自我要求，也贴近九型 5 号「以理解与准备降低不确定」的核心策略，6 翼则强化对盟约、继位与国本安全的忧思。\n\n你若与此塑接近，往往习惯在发声前把变量想全，讨厌临时起意的空喊。对外可以是军师式冷静，对内却有明确的价值底线（Fi）。需要留意的是：过度预演会消耗身心；「万事俱备」很少真正到来，适时交付比完美方案更接近他晚年的实践智慧。",
        parallels:
          "适合需要长期规划、跨部门统筹、在信息不全时仍能给出可执行路径的人。你可能更愿意当「定战略的人」，而不是场面上最亮的那一个。",
      },
      {
        id: "zhangliang",
        name: "张良",
        dynasty: "秦汉之际",
        enneagram: "5w4",
        title: "运筹帷幄的隐身棋手",
        weights: { Ni: 1.3, Te: 1.0, Fi: 1.1, Se: 0.5 },
        traits: ["借力打力", "功成身退", "审美节制", "洞察人性"],
        analysis:
          "张良的形象更偏 Ni 与节制的 Te：在楚汉变局中提供关键节点的谋断，却不长期占据权力舞台。九型 5w4 的色彩体现在他既求智识优势，又保有一种疏离的自我边界——能进能退，不把自我绑死在功名上。\n\n若你接近此塑，你擅长在复杂人际与时势中找到「四两拨千斤」的支点，不喜欢被日常事务淹没。你可能对「被看透」敏感，因此交际有选择性。风险在于抽离过度，错失需要亲自站台的时刻；张良的启示是：退隐是策略，不是逃避责任的借口。",
        parallels:
          "适合咨询、策划、研究转化为行动的角色。你更看重一招定势，而非天天露面管人。",
      },
      {
        id: "wanganshi",
        name: "王安石",
        dynasty: "北宋",
        enneagram: "1w9",
        title: "以理改制的理想建筑师",
        weights: { Ni: 1.2, Te: 1.3, Fi: 1.0, Se: 0.5 },
        traits: ["原则强硬", "制度改革", "长期主义", "不惧非议"],
        analysis:
          "王安石新法体现 Ni（看见结构性问题）与 Te（用制度工具强推）的结合，九型 1 号的「应当如此」则让他在朝野反对中仍坚持完善秩序。9 翼缓和了一部分攻击性，却也使他有时显得孤高难同盟。\n\n若你接近此塑，你对低效、伪饰与旧例不合理处格外敏锐，容易把个人标准上升为公共方案。优势是能推动真改变；代价是人际关系与落地节奏。史鉴提醒：正确感需要换成可协商的步骤，否则理想会卡在「众人未准备好」的现实里。",
        parallels:
          "适合政策、产品架构、组织变革类工作。你需要同盟者翻译你的原则，而不是独自扛下所有批评。",
      },
    ],
    INTP: [
      {
        id: "zhuangzi",
        name: "庄子",
        dynasty: "战国",
        enneagram: "5w4",
        title: "解缚概念的逍遥思者",
        weights: { Ti: 1.4, Ne: 1.3, Si: 0.6, Fe: 0.4 },
        traits: ["概念颠覆", "相对视角", "精神自由", "戏谑深刻"],
        analysis:
          "庄子文本充满 Ti 的概念拆解与 Ne 的意象跳跃：同一命题可从多重寓言切入。九型 5w4 使他既退居观察，又带着强烈的个体气质，拒绝被世俗名位定义。\n\n若你接近此塑，你厌恶被固定角色绑架，享受把「理所当然」拆开看。你可能在社交场合节能，却在思想对话里极投入。需留意：逍遥若变成对现实责任的永久延期，自由会空洞化。庄子也谈「养生主」——保全自己，是为了更好地游于世，而非与世隔绝。",
        parallels:
          "适合哲学、写作、基础研究、需要打破框架的创意工作。你怕被机构化，却仍可选择「在结构里留白」。",
      },
      {
        id: "shenkuo",
        name: "沈括",
        dynasty: "北宋",
        enneagram: "5w6",
        title: "博物致知的系统记录者",
        weights: { Ti: 1.3, Ne: 1.1, Si: 1.2, Fe: 0.5 },
        traits: ["实证兴趣", "跨域杂学", "精确记录", "冷静观察"],
        analysis:
          "《梦溪笔谈》体现 Ti-Ne 的好奇与 Si 的细节存档：天文、地质、工艺皆可进入同一认知网络。九型 5w6 强调以知识建立安全感，并对可靠性有要求。\n\n若你接近此塑，你学习往往是「为了把世界模型补全」，而不是为了表演博学。你可能同时开很多坑，又对证据质量挑剔。史鉴提醒：杂学需要一条主线串起，否则观察停留在笔记，难以形成可传的贡献。",
        parallels:
          "适合科研、技术写作、博物学式产品研究。你适合做「把现象写清楚」的人。",
      },
      {
        id: "mozi",
        name: "墨子",
        dynasty: "战国",
        enneagram: "1w9",
        title: "逻辑与兼爱的工程师",
        weights: { Ti: 1.3, Te: 1.1, Ne: 0.8, Fi: 0.9 },
        traits: ["名辩严密", "实用主义", "节用尚贤", "利他原则"],
        analysis:
          "墨家既有 Ti 式名辩，也有对「义」「兼爱」的价值坚持，并落到守城器械等 Te/Se 实务。九型 1 号使其带有道德工程色彩：世界应被修正得更公正、更少浪费。\n\n若你接近此塑，你会追问定义是否清楚、做法是否可检验，同时心里有一把「对人是否公平」的尺。你可能对空谈礼乐不耐烦。平衡点在于：原则需要组织与传播，单靠正确不足以自动流行。",
        parallels:
          "适合工程伦理、公益技术、论辩与制度设计交叉地带。你是「把道理做成工具」的人。",
      },
    ],
    ENTJ: [
      {
        id: "caocao",
        name: "曹操",
        dynasty: "东汉末 / 曹魏",
        enneagram: "8w7",
        title: "乱世整合的铁腕经营者",
        weights: { Te: 1.5, Ni: 1.2, Se: 1.0, Fi: 0.6 },
        traits: ["决断迅速", "唯才是举", "压力耐受", "诗酒豪情"],
        analysis:
          "曹操形象高度 Te：屯田、制法、用人皆围绕效率与结果；Ni 助他看见长期霸业，Se 支撑战场与机会窗口。九型 8 号解释其掌控欲与强度，7 翼带来诗赋与权变的灵动。\n\n若你接近此塑，危机中你反而清楚，厌恶拖泥带水的会议体。你能把一盘散沙拧成组织，但也可能因手段争议付出信任成本。史鉴不美化权谋：可持续的领导需要在 Te 之外安放 Fi——何为不可越过的底线。",
        parallels:
          "适合创业一号位、转机改革负责人。你需要能直言的副手，防止自己只听见胜负。",
      },
      {
        id: "kangxi",
        name: "康熙帝",
        dynasty: "清",
        enneagram: "3w2",
        title: "长程治国的成就型君主",
        weights: { Te: 1.4, Ni: 1.3, Se: 0.8, Fi: 0.7 },
        traits: ["勤政学习", "多线治理", "权威形象", "收心统一"],
        analysis:
          "康熙的公开形象强调勤学与综理：Te-Ni 用于疆域、河务、学术工程，九型 3 号则凸显「以可验证政绩确立合法性」，2 翼使其亦重视笼络与示范。\n\n若你接近此塑，你习惯同时推进多条战线，在意成果是否可见、是否可载入叙事。你可能对懈怠零容忍。风险是把自我价值完全绑在绩效上；长期执政者更需要节奏与授权，而非亲自做完一切。",
        parallels:
          "适合大型组织一把手、长期项目操盘。你要学会「看起来不忙，但系统在转」。",
      },
      {
        id: "shangyang",
        name: "商鞅",
        dynasty: "战国 · 秦",
        enneagram: "1w9",
        title: "以法强国的制度推手",
        weights: { Te: 1.5, Ni: 1.1, Si: 0.9, Fi: 0.4 },
        traits: ["法令必信", "赏罚分明", "变法不惜身", "标准统一"],
        analysis:
          "商鞅变法是极端 Te：用可执行的标准重塑行为。Ni 看见富国强兵的远期结构，对人情例外几乎不开放，接近九型 1 的绝对应当。\n\n若你接近此塑，你相信规则一松，系统就塌。你能在短时间建立秩序，也可能树敌过多。史鉴尖锐处在于：制度成功与个人命运可以分裂——推动变革者要给自己留「退出与同盟」的设计，而不仅是正确。",
        parallels:
          "适合合规重建、流程再造、从0到1立规矩。你需要政治敏感度配套，单靠法条不够。",
      },
    ],
    ENTP: [
      {
        id: "sudongpo",
        name: "苏轼",
        dynasty: "北宋",
        enneagram: "7w6",
        title: "穷通皆戏的通人辩士",
        weights: { Ne: 1.5, Ti: 1.1, Fe: 1.0, Si: 0.5 },
        traits: ["才思跳脱", "幽默自救", "跨界通达", "逆境弹性"],
        analysis:
          "苏轼的诗文与处世充满 Ne：同一境遇能生出多层解释；Ti 保证议论有骨，Fe 使他可与各色人交游。九型 7 号解释其在贬谪中仍寻找体验与意义，6 翼则偶现对人情与时局的警觉。\n\n若你接近此塑，你害怕精神上的窄囚，擅长把痛苦翻译成叙事与笑谈。你点子多，落地需要搭档。史鉴提醒：通达不是没有原则，而是原则活在更大的生命感里——可卷可舒，仍有所守。",
        parallels:
          "适合内容、教育、跨界创新。你适合「把沉重变轻盈，但不变浅薄」的表达。",
      },
      {
        id: "dongfangshuo",
        name: "东方朔",
        dynasty: "西汉",
        enneagram: "7w8",
        title: "以谐寓谏的宫廷思想家",
        weights: { Ne: 1.4, Ti: 1.2, Fe: 1.1, Si: 0.4 },
        traits: ["机锋讽谏", "表演智慧", "自我保护", "语言游戏"],
        analysis:
          "东方朔用谐隐靠近权力核心：Ne-Ti 出点子与逻辑翻转，Fe 读取场合。九型 7w8 使其既要有趣，也要有力，避免成为纯弄臣。\n\n若你接近此塑，你常靠机智化解紧张，讨厌正襟危坐的无效真诚。你可能被误认为不够严肃。真正的挑战是：玩笑说完之后，你是否仍有一张可兑现的牌——东方朔的价值在谏，不只在笑。",
        parallels:
          "适合需要在体制内说难听话的角色：顾问、沟通、品牌话术。你要平衡娱乐性与立场。",
      },
      {
        id: "wangchong",
        name: "王充",
        dynasty: "东汉",
        enneagram: "5w6",
        title: "疾虚妄的怀疑论辩手",
        weights: { Ne: 1.2, Ti: 1.5, Fe: 0.5, Si: 0.9 },
        traits: ["怀疑权威", "实证倾向", "论战锋利", "独立著述"],
        analysis:
          "《论衡》以 Ti 攻「虚妄」，Ne 打开非常规解释空间。九型 5 使其宁可孤立也要说清楚。比苏轼少了圆融，多了刺。\n\n若你接近此塑，你对流行说法本能追问证据，容易在群体里扮演扫兴的人。价值在于防止集体幻觉；成本是社交摩擦。史鉴建议：把怀疑做成可传播的论证结构，而非仅止于否定。",
        parallels:
          "适合评论、审计思维、科学传播中的证伪角色。你是「给热潮降温」的人。",
      },
    ],
    INFJ: [
      {
        id: "quyuan",
        name: "屈原",
        dynasty: "战国 · 楚",
        enneagram: "4w5",
        title: "忠贞理想的象征诗人",
        weights: { Ni: 1.4, Fe: 1.1, Fi: 1.2, Se: 0.4 },
        traits: ["家国情怀", "象征语言", "道德纯度", "孤独感"],
        analysis:
          "屈原传统形象交织 Ni 的远见忧思与 Fe/Fi 的伦理情感，香草美人的象征系统近乎 Ni-Fi 的内心神话。九型 4w5 解释其自我与理想的深度纠缠，以及不被理解的痛。\n\n若你接近此塑，你对「意义是否配得上牺牲」极其认真，难做违心的事。你可能把集体命运个人化地扛在身上。史鉴的复杂处在于：纯正可以照亮时代，也可能燃尽自身——需要给理想找到可续的共同体，而不只是独行的悲壮。",
        parallels:
          "适合价值驱动的写作、公共表达、文化工作。你要防止把所有拒绝都上升为「世界背叛理想」。",
      },
      {
        id: "wangyangming",
        name: "王守仁（阳明）",
        dynasty: "明",
        enneagram: "1w2",
        title: "知行合一的心学导师",
        weights: { Ni: 1.3, Fe: 1.2, Ti: 1.0, Se: 0.7 },
        traits: ["内省转化", "事上磨炼", "教导气质", "危机担当"],
        analysis:
          "阳明学强调在事上炼心：Ni 洞察心体，Fe 面向他人教化，又有行动中的 Se。九型 1w2 使其既要正，也要助人成正。\n\n若你接近此塑，你不满足于概念正确，而要看人在处境里是否真有成长。你可能对虚伪与空谈过敏。注意「助人」边界：导师心态若变成道德压力，他人会退缩。知行合一也包括知止。",
        parallels:
          "适合教育、咨询、带团队做文化的人。你是「把觉察变成行动」的催化剂。",
      },
      {
        id: "jianzhen",
        name: "鉴真",
        dynasty: "唐",
        enneagram: "1w9",
        title: "六次东渡的信念践行者",
        weights: { Ni: 1.2, Fe: 1.3, Si: 1.0, Se: 0.8 },
        traits: ["志向坚定", "渡人导向", "忍耐挫折", "文化传播"],
        analysis:
          "鉴真东渡故事突出 Ni-Fe：看见佛法东传的意义，并以长期行动回应。九型 1 的应当感支撑其多次失败仍再出发，9 翼带来沉静耐力。\n\n若你接近此塑，你一旦认定「这件事对人有益」，就能忍受超常损耗。风险是忽视身体与支持系统。史鉴是双面的：伟大愿力需要补给线——同行者、休整、可迭代的计划。",
        parallels:
          "适合长期公益、跨文化事业、使命型项目。你需要「后勤型」伙伴配你的愿力。",
      },
    ],
    INFP: [
      {
        id: "libai",
        name: "李白",
        dynasty: "唐",
        enneagram: "4w3",
        title: "酒入豪肠的诗意游魂",
        weights: { Fi: 1.4, Ne: 1.4, Se: 0.9, Te: 0.4 },
        traits: ["自我抒情", "想象飞扬", "不羁名场", "瞬间燃烧"],
        analysis:
          "李白诗的 Fi-Ne 极强：价值与自我感通过奇崛想象喷出；Se 捕捉酒、月、山水的即时刺激。九型 4w3 解释其既要独特，也要被看见的张力。\n\n若你接近此塑，平庸的日常会让你窒息，你用表达确认自己还活着。你可能在体制里反复撞墙。史鉴并不要求人人「天子呼来不上船」，而是提醒：保留一块不被考评污染的内在庭院，同时给才华找容器，以免只余传说。",
        parallels:
          "适合艺术、文案、需要强烈风格的创作。你要有人帮你处理「人间的粮票」。",
      },
      {
        id: "taoyuanming",
        name: "陶渊明",
        dynasty: "东晋",
        enneagram: "9w1",
        title: "归去来兮的田园守真者",
        weights: { Fi: 1.5, Si: 1.2, Ne: 0.9, Te: 0.4 },
        traits: ["辞官守志", "淡泊节奏", "自然审美", "内在安定"],
        analysis:
          "陶渊明以 Fi 守真，Si 安于稼穑与节令，九型 9 号追求心境不扰，1 翼使其辞令仍有道德清晰：「不为五斗米折腰」。\n\n若你接近此塑，你对异化劳动极敏感，宁可物质降级也要内在整齐。你可能被批评「消极」。积极面是你能示范另一种成功定义；消极面是冲突回避让不公延续。归园之后，仍可有温柔的坚持。",
        parallels:
          "适合慢生活创作、教育、需要长期心性的工作。你是「降低噪音」的人。",
      },
      {
        id: "liqinqzhao",
        name: "李清照",
        dynasty: "两宋之交",
        enneagram: "4w5",
        title: "词心如水的记忆与哀歌",
        weights: { Fi: 1.5, Si: 1.2, Ne: 1.0, Te: 0.5 },
        traits: ["情感精确", "家国之痛", "才名自觉", "晚景坚韧"],
        analysis:
          "易安词以 Fi 刻画微澜情感，Si 留住物件与时光的触感，乱离后又有家国之思。九型 4w5 深化其独特性与内省。\n\n若你接近此塑，你对氛围、措辞、关系质地异常敏感，难用空话安慰自己。你的表达可以成为他人的镜子。注意沉浸哀伤的时间长度——词可以哭，人也要继续做饭；清照晚期的整理与自持，是另一课。",
        parallels:
          "适合文学、编辑、情感叙事类创作。你把私人感觉炼成公共语言。",
      },
    ],
    ENFJ: [
      {
        id: "liubei",
        name: "刘备",
        dynasty: "三国 · 蜀汉",
        enneagram: "2w3",
        title: "以义聚人的仁德领袖",
        weights: { Fe: 1.5, Ni: 1.1, Se: 0.8, Ti: 0.5 },
        traits: ["人心凝聚", "叙事感召", "忍辱图存", "情义政治"],
        analysis:
          "刘备传统形象强调 Fe：读懂人心、结义、以情感合法性整合力量；Ni 指向兴复叙事。九型 2w3 解释其「被需要」与成就形象的双重驱动。\n\n若你接近此塑，你天然想把人留在同一张桌上，善于给他人角色与面子。风险是过度承诺、界限模糊，以及为维护形象回避必要的硬决定。史鉴要求：仁德需配制度，否则情义联盟在资源紧张时会撕裂。",
        parallels:
          "适合社团、团队文化、需要号召力的岗位。你要有人帮你唱黑脸。",
      },
      {
        id: "mencius",
        name: "孟子",
        dynasty: "战国",
        enneagram: "1w2",
        title: "以气养志的王道演说家",
        weights: { Fe: 1.3, Ni: 1.2, Ti: 0.9, Se: 0.6 },
        traits: ["道德感召", "辩论热情", "教育志向", "浩然之气"],
        analysis:
          "孟子游说诸侯，Fe-Ni 突出：把政治拉回人心与理想秩序，又有论辩锋芒。九型 1w2 使其既正且助。\n\n若你接近此塑，你相信语言能唤醒人，讨厌把人当纯工具。你可能对「算计成功」不屑，因而在现实政治中受挫。史鉴是：王道要进入制度设计，才能不只停留在答辩场上的胜利。",
        parallels:
          "适合演讲、教育领袖、公共知识分子气质的工作。你点燃人，也要给人路径。",
      },
      {
        id: "zengguofan",
        name: "曾国藩",
        dynasty: "清",
        enneagram: "1w9",
        title: "克己练兵的儒将导师",
        weights: { Fe: 1.1, Ni: 1.2, Si: 1.2, Te: 1.1 },
        traits: ["日记自省", "组织练兵", "中庸坚韧", "门生网络"],
        analysis:
          "曾国藩把 Fe 的教化、Si 的日课、Te 的营务与 Ni 的时局判断捏合，九型 1w9 呈现为持续自我修正而非外放攻击。\n\n若你接近此塑，你用纪律与人格带动人，宁可慢也要稳。你可能对门生后进有强烈责任感。注意：克己若成苛责文化，团队会僵。他的启示是「结硬寨、打呆仗」——可迁移到现代长期项目。",
        parallels:
          "适合带队伍做难而正确的事。你是「把人练出来」的那类领导。",
      },
    ],
    ENFP: [
      {
        id: "simaqian",
        name: "司马迁",
        dynasty: "西汉",
        enneagram: "4w5",
        title: "发愤著书的叙事燃烧者",
        weights: { Ne: 1.3, Fi: 1.4, Te: 0.8, Si: 1.0 },
        traits: ["人物刻画", "价值呐喊", "跨文体能量", "创伤转化"],
        analysis:
          "《史记》展现 Ne 的人物与结构想象，Fi 的爱憎与「究天人之际」的志向，亦有史官 Si 的材料功夫。九型 4 号解释其通过独特著述安放屈辱与意义。\n\n若你接近此塑，你要把经历炼成故事与公论，不甘沉默。你可能情绪起伏大，却因此能看见他人命运。史鉴：发愤是燃料，体例与证据是炉灶——热情需要工艺。",
        parallels:
          "适合非虚构写作、纪录片叙事、人物报道。你让个体命运被看见。",
      },
      {
        id: "tangyin",
        name: "唐寅（伯虎）",
        dynasty: "明",
        enneagram: "7w6",
        title: "风流才子的落拓创意人",
        weights: { Ne: 1.4, Fi: 1.2, Se: 1.0, Te: 0.5 },
        traits: ["才情外放", "玩世背后", "审美游戏", "身份落差"],
        analysis:
          "唐伯虎传奇强调 Ne-Fi-Se：才情、真诚好恶与声色趣味；科举挫败后的玩世，近九型 7 的转化策略。\n\n若你接近此塑，你怕被单一成功剧本困住，擅长把自己过成作品。你可能用轻佻保护受伤的自尊。更稳的版本是：把才华做成可持续手艺，而非只靠人设消费自己。",
        parallels:
          "适合设计、表演性创作、文化品牌。你需要经纪人式的现实伙伴。",
      },
      {
        id: "baijuyi",
        name: "白居易",
        dynasty: "唐",
        enneagram: "2w3",
        title: "为生民请命的通俗诗杰",
        weights: { Ne: 1.2, Fi: 1.2, Fe: 1.2, Te: 0.8 },
        traits: ["语言通俗", "社会关怀", "官场与诗心", "传播力"],
        analysis:
          "白居易新乐府强调可懂与关怀，Ne-Fi/Fe 让他连接大众情感，又有谏官实践。九型 2w3 体现助人与事功。\n\n若你接近此塑，你希望表达「对人有用」，讨厌只在小圈子炫技。你可能在体制与良心间拉扯。史鉴提醒：关怀要有制度落点，诗歌请命之外，还要问政策能否接住眼泪。",
        parallels:
          "适合公共传播、教育内容、社会议题表达。你是「把话说明白还给人」的人。",
      },
    ],
    ISTJ: [
      {
        id: "baozheng",
        name: "包拯",
        dynasty: "北宋",
        enneagram: "1w9",
        title: "铁面无私的程序守护者",
        weights: { Si: 1.3, Te: 1.4, Fi: 1.0, Ne: 0.4 },
        traits: ["依法断案", "拒绝请托", "清名压力", "细则落实"],
        analysis:
          "包拯传说强调 Si-Te：先例、条文与可重复的公正；九型 1 号使其对例外开后门零容忍。\n\n若你接近此塑，你相信程序本身就是保护弱者的方式，讨厌「打声招呼就行」。你可能显得不近人情。史鉴复杂处在于：清名会成为另一种枷锁；真正的制度公正，还要防止清官神话替代系统建设。",
        parallels:
          "适合审计、法务、质控。你是「把后门焊死」的人。",
      },
      {
        id: "hairui",
        name: "海瑞",
        dynasty: "明",
        enneagram: "1w2",
        title: "清苦强项的谏诤官吏",
        weights: { Si: 1.2, Te: 1.2, Fi: 1.3, Ne: 0.5 },
        traits: ["生活清俭", "直言犯上", "道德勇气", "不妥协"],
        analysis:
          "海瑞以近乎苦行的 Si/Fi 坚持与 Te 执行，九型 1w2 使其谏诤带「为天下人」的意味。\n\n若你接近此塑，你对腐败与奢靡生理厌恶，敢于付个人代价。风险是孤立与耗竭。现代迁移：把勇气做成可复制的举报与透明机制，而不仅依赖一个海瑞。",
        parallels:
          "适合监察、公益监督、需要硬骨头的岗位。你要有保护自己的法律与同盟。",
      },
      {
        id: "simaguang",
        name: "司马光",
        dynasty: "北宋",
        enneagram: "6w5",
        title: "通鉴守成的史学宰相",
        weights: { Si: 1.5, Te: 1.2, Fi: 0.9, Ne: 0.5 },
        traits: ["以史为鉴", "稳健守成", "文献工程", "忧患意识"],
        analysis:
          "《资治通鉴》是巨型 Si-Te 工程：编排过往以指导决策。九型 6w5 凸显忧患与对可靠知识的依赖，政治上偏稳健。\n\n若你接近此塑，你不信任狂飙突进，要求看先例与代价。你可能与改革派冲突。价值是防止健忘；代价是有时低估必须创新的窗口。史鉴本身应是工具，不是冻结时间的冰。",
        parallels:
          "适合政策研究、知识管理、风险管理。你让组织记住自己做过的蠢事与好事。",
      },
    ],
    ISFJ: [
      {
        id: "dufu",
        name: "杜甫",
        dynasty: "唐",
        enneagram: "2w1",
        title: "忧黎元的诗史记录者",
        weights: { Si: 1.3, Fe: 1.4, Fi: 1.1, Ne: 0.6 },
        traits: ["细节体恤", "家国情深", "沉郁顿挫", "记录苦难"],
        analysis:
          "杜甫诗以 Si 留存战乱日常，Fe/Fi 承担对他者的疼惜，有「诗史」之称。九型 2w1 解释其关怀与道德沉痛。\n\n若你接近此塑，你很难对身边人的具体困境视而不见，表达可以很重。你可能自我消耗。史鉴：见证是一种责任，也要给自己留「非值班」时间，否则笔会断。",
        parallels:
          "适合纪实、社工气质创作、细致服务型角色。你记住别人忘记的痛。",
      },
      {
        id: "xuanzang",
        name: "玄奘",
        dynasty: "唐",
        enneagram: "6w5",
        title: "西行求法的忠诚行者",
        weights: { Si: 1.2, Fe: 1.0, Ti: 1.1, Ni: 1.1 },
        traits: ["信仰承诺", "艰苦行程", "译经工程", "精确传承"],
        analysis:
          "玄奘西行是 Si/Ni 与信念的结合：为求可靠文本跋涉，再以译场 Fe/Te 组织知识回传。九型 6w5 体现对真经权威与安全的寻求。\n\n若你接近此塑，你一旦承诺一件「对的事」，就能走很远。你重视来源可靠。注意过度焦虑「是否正统」；求法最终也要开出自己的理解。",
        parallels:
          "适合学术翻译、长期留学/田野、知识引进项目。你是「把真经搬回来」的人。",
      },
      {
        id: "huangdaopo",
        name: "黄道婆",
        dynasty: "宋末元初",
        enneagram: "2w9",
        title: "纺织传技的民生改善者",
        weights: { Si: 1.4, Fe: 1.3, Te: 1.0, Ne: 0.6 },
        traits: ["技艺传承", "改善民生", "默默贡献", "地方实践"],
        analysis:
          "黄道婆形象强调把先进纺织技艺带回并传播，Si 精于工艺细节，Fe 面向共同体福祉，属「无名而有功」的 ISFJ 叙事，九型 2w9 温和助人。\n\n若你接近此塑，你喜欢具体地让人生活变好一点，不追求高调。你可能低估自己的贡献。史鉴肯定这种劳动：文明经常靠他们往前挪一寸。",
        parallels:
          "适合职业教育、社区技术、手艺复兴。你改变的是日常，不是宣言。",
      },
    ],
    ESTJ: [
      {
        id: "qinshihuang",
        name: "秦始皇",
        dynasty: "秦",
        enneagram: "8w9",
        title: "书同文车同轨的统一强推者",
        weights: { Te: 1.5, Si: 1.2, Ni: 1.0, Fi: 0.3 },
        traits: ["标准统一", "中央集权", "工程导向", "刚猛寡恩"],
        analysis:
          "秦始皇工程是 Te-Si 极致：度量衡、文字、驰道——用标准降低交易成本。九型 8 解释其强控制。历史评价分裂正因：效率与人的代价同在。\n\n若你接近此塑，你看见碎片化就想统一接口，执行力惊人。风险是把人当零件。现代迁移：标准化要留兼容与申诉通道，否则系统脆断。",
        parallels:
          "适合基础设施、平台规范、大规模推行。你需要伦理审查官配你。",
      },
      {
        id: "yongzheng",
        name: "雍正帝",
        dynasty: "清",
        enneagram: "1w9",
        title: "朱批勤政的细则皇帝",
        weights: { Te: 1.4, Si: 1.4, Ne: 0.6, Fi: 0.6 },
        traits: ["文书治国", "反腐整顿", "日夜批阅", "制度补漏"],
        analysis:
          "雍正形象是 Te-Si 的勤政细节控，九型 1 号改革吏治。他不像康熙那样「宽大叙事」，更像修管道的人。\n\n若你接近此塑，你能在表格与流程里找到权力的真实位置，讨厌空洞场面。你可能让下属窒息。启示：勤政要制度化轮替，防止一切依赖你的睡眠。",
        parallels:
          "适合运营中台、监察审计、细则治理。你让系统不漏水。",
      },
      {
        id: "zhuyuanzhang",
        name: "朱元璋",
        dynasty: "明",
        enneagram: "6w5",
        title: "布衣开国的忧疑建筑师",
        weights: { Te: 1.4, Si: 1.3, Ni: 1.0, Fi: 0.6 },
        traits: ["出身隐痛", "重整纲纪", "猜忌防变", "严刑峻法"],
        analysis:
          "朱元璋以 Te 重建秩序，Si 记着底层与背叛的经验，六号式忧疑强化特务与胡蓝之狱的阴暗面。\n\n若你接近此塑，你能从零搭系统，也对失控极度敏感。创业打天下与坐天下是两种心理学。史鉴残酷：防变若吞噬功臣与信任，帝国的地基也会空。",
        parallels:
          "适合从乱到治的整顿者。你要有意识地区分「安全」与「恐惧」。",
      },
    ],
    ESFJ: [
      {
        id: "wuzetian",
        name: "武则天",
        dynasty: "唐 / 武周",
        enneagram: "3w2",
        title: "破局称制的关系政治家",
        weights: { Fe: 1.4, Te: 1.2, Si: 1.0, Ni: 1.0 },
        traits: ["符号经营", "用人网络", "突破成规", "形象政治"],
        analysis:
          "武则天在礼法极不利的结构里，用 Fe 经营人心与象征，Te 推进人事与制度，九型 3w2 强调成就与被认可。评价历来两极。\n\n若你接近此塑，你懂场合与名分，也能在关键时刻打破名分。你可能高度在意评价。史鉴：突破结构需要盟友与叙事，也要承受被标签化的代价。",
        parallels:
          "适合需要在保守环境里开路的领导者。你既办酒局也办人事。",
      },
      {
        id: "fangxuanling",
        name: "房玄龄",
        dynasty: "唐",
        enneagram: "2w1",
        title: "贞观贤相的协调枢纽",
        weights: { Fe: 1.4, Si: 1.3, Te: 1.0, Ne: 0.7 },
        traits: ["调和群臣", "制度守成", "默默成事", "忠诚辅佐"],
        analysis:
          "房玄龄式宰相是 Fe-Si：让能人共处一堂，把贞观叙事落到行政。九型 2w1 助人而有原则。\n\n若你接近此塑，你不抢戏，却让戏能演下去。你记得谁适合什么位置。注意自我消失：协调者若从不被看见，也易积怨。好的枢纽会声明自己的边界与功劳归属规则。",
        parallels:
          "适合首席 of staff、HRBP、政务协调。你是「让天才不互撕」的人。",
      },
      {
        id: "di_renjie",
        name: "狄仁杰",
        dynasty: "唐",
        enneagram: "1w2",
        title: "智断人伦的能吏青天",
        weights: { Fe: 1.3, Si: 1.2, Te: 1.2, Ne: 0.8 },
        traits: ["断案知人", "敢谏又能全", "保护人才", "务实智慧"],
        analysis:
          "狄仁杰传说混合 Fe 的知人、Te 的断事与 Si 的经验。九型 1w2 使其清正而助人（包括向武则天举荐）。\n\n若你接近此塑，你既能维护规则，也能在规则里救人。你讨厌酷吏式表演。现代启示：执法者的温度不是徇私，而是看见系统对人的真实影响。",
        parallels:
          "适合管理岗中的「好人能吏」。你让公正可亲近。",
      },
    ],
    ISTP: [
      {
        id: "hanxin",
        name: "韩信",
        dynasty: "秦汉之际",
        enneagram: "3w4",
        title: "兵仙式的临场计算者",
        weights: { Ti: 1.4, Se: 1.4, Ni: 0.9, Fe: 0.4 },
        traits: ["战阵直觉", "耻感驱动", "略人一等", "政治疏离"],
        analysis:
          "韩信用兵体现 Ti-Se：现场计算与非常规路径，九型 3 追求以功名洗雪早年耻。政治情商相对弱，是其悲剧结构。\n\n若你接近此塑，专业场上你降维打击，官场上可能踩雷。史鉴极明确：技术天才需要政治翻译器，否则功高与孤高一起致命。",
        parallels:
          "适合战术、竞赛、极客型突破。你要找「会做人」的搭档。",
      },
      {
        id: "luban",
        name: "鲁班",
        dynasty: "春秋（传说工匠）",
        enneagram: "5w6",
        title: "名工具的原型工程师",
        weights: { Ti: 1.3, Se: 1.3, Si: 1.1, Fe: 0.5 },
        traits: ["造物解题", "手脑合一", "标准工艺", "实用创新"],
        analysis:
          "鲁班作为工匠祖师，象征 Ti-Se 的造物智能：问题出现在材料与结构里，不在口号里。九型 5 保持钻研。\n\n若你接近此塑，你用原型说话，讨厌纯 PPT。你可能忽视展示与专利叙事。把作品说清楚，也是工程的一部分。",
        parallels:
          "适合硬件、工艺、制造创新。你是「给文明加零件」的人。",
      },
      {
        id: "huatuo",
        name: "华佗",
        dynasty: "东汉末",
        enneagram: "5w4",
        title: "外科传奇的独立医者",
        weights: { Ti: 1.4, Se: 1.2, Ni: 0.9, Fe: 0.5 },
        traits: ["技术自信", "不事权贵", "观察精准", "命运冲突"],
        analysis:
          "华佗叙事强调精湛技艺与不愿当侍医的独立，Ti-Se 突出，九型 5w4 带孤傲。与权力冲突成为母题。\n\n若你接近此塑，你以本事安身，难做软骨头。现代场景里，专业自主仍要懂机构逻辑，否则「刮骨」未成，「下狱」先到——比喻是：保留技艺尊严的同时学习边界谈判。",
        parallels:
          "适合临床技术、特种专业。你靠手艺说话，也要有执照与同盟。",
      },
    ],
    ISFP: [
      {
        id: "wangxizhi",
        name: "王羲之",
        dynasty: "东晋",
        enneagram: "4w5",
        title: "兰亭风流的审美身体",
        weights: { Fi: 1.4, Se: 1.3, Ni: 0.9, Te: 0.4 },
        traits: ["书法当下", "雅集气质", "个性风神", "感官精微"],
        analysis:
          "书法是 Fi-Se 的典型通道：内在节律通过手与纸瞬间定影。九型 4 强调风神独特。\n\n若你接近此塑，环境与身体状态直接影响你的输出质量，你无法在脏乱里假装灵感。你可能对考核制过敏。给自己「兰亭式」的条件，不是矫情，是生产力。",
        parallels:
          "适合书法、设计、表演艺术。你把感觉做成可传的形。",
      },
      {
        id: "bada",
        name: "朱耷（八大山人）",
        dynasty: "明末清初",
        enneagram: "4w5",
        title: "墨点无多的遗民画家",
        weights: { Fi: 1.5, Se: 1.1, Ni: 1.2, Te: 0.3 },
        traits: ["简笔痛感", "象征鱼鸟", "遗民身份", "沉默力度"],
        analysis:
          "八大山人的画面以极少笔墨压极重情感，Fi-Ni 深，九型 4 的疏离与独特拉满。\n\n若你接近此塑，你不爱解释自己，作品比嘴巴诚实。你可能在群体里「在场但缺席」。史鉴：沉默是语言，但完全切断会失去对话可能；找一个懂你笔墨的人，就够了。",
        parallels:
          "适合当代艺术、极简表达。你用留白说话。",
      },
      {
        id: "zhengbanqiao",
        name: "郑燮（板桥）",
        dynasty: "清",
        enneagram: "4w5",
        title: "难得糊涂的风骨画家",
        weights: { Fi: 1.4, Se: 1.2, Ne: 0.9, Te: 0.6 },
        traits: ["个性书风", "悯农情怀", "拒伪名教", "生活美学"],
        analysis:
          "郑板桥以竹兰书法与「难得糊涂」传世，Fi 守住对弱者与真性情的偏向，Se 落在笔墨生活里。九型 4 号强调不可被官场格式化的自我。\n\n若你接近此塑，你能在体制边缘保留人味与趣味，用作品说话。你可能对假清高过敏。史鉴：糊涂是智慧，不是放弃判断；风骨要配养活自己的手艺。",
        parallels:
          "适合艺术教育、地方文化、有立场的创作。你让雅俗之间仍有骨头。",
      },
    ],
    ESTP: [
      {
        id: "xiangyu",
        name: "项羽",
        dynasty: "秦末",
        enneagram: "8w7",
        title: "力拔山兮的瞬间英雄",
        weights: { Se: 1.5, Fi: 1.0, Fe: 0.9, Ni: 0.4 },
        traits: ["临场神勇", "耻感刚烈", "情感冲动", "不喜算计"],
        analysis:
          "项羽形象是 Se 的极致临场：巨鹿、破釜沉舟；同时情感烈、耻感强，战略 Ni/Te 相对不足，九型 8w7 解释其强度与悲情收场。\n\n若你接近此塑，战场（或竞赛、谈判现场）上你能点燃自己与同伴，却可能输在「第二天的棋」。史鉴不是劝你变阴柔，而是补一张地图：勇气之外，要有人帮你算粮道与人心长期账。",
        parallels:
          "适合需要爆发力与现场领导的角色。你要防的是「一战成名后无谋」。",
      },
      {
        id: "zhaoyun",
        name: "赵云",
        dynasty: "三国 · 蜀汉",
        enneagram: "6w7",
        title: "一身是胆的可靠战将",
        weights: { Se: 1.4, Ti: 1.1, Fe: 1.0, Ni: 0.6 },
        traits: ["救主果决", "纪律勇气", "忠诚可靠", "少争功"],
        analysis:
          "赵云叙事强调 Se 行动与可靠：长坂坡式的现场解决能力，又比纯莽夫多一层对主公与纪律的忠诚（六号色彩）。\n\n若你接近此塑，你在危局里让人安心，不抢戏却能收场。你可能不善政治自我营销。现代启示：可靠也是品牌，适当被看见，才不会被当成永远的工具人。",
        parallels:
          "适合一线攻坚、安全应急、关键执行。你是「把人带回来」的人。",
      },
      {
        id: "weixing",
        name: "卫青",
        dynasty: "西汉",
        enneagram: "3w2",
        title: "从奴到帅的功业实干家",
        weights: { Se: 1.3, Te: 1.2, Fe: 1.0, Ni: 0.8 },
        traits: ["边战务实", "出身翻盘", "低调事功", "协调军政"],
        analysis:
          "卫青从低微到大将军，Se-Te 务实打匈奴，亦能在宫廷网络中存活，九型 3 的成就驱动明显。\n\n若你接近此塑，你用战果改写出身叙事，不爱空谈血统。你可能对「名分歧视」极敏感。史鉴：功业要配自我保护，避免成为权力斗争的棋子——实干者更需要政治雷达。",
        parallels:
          "适合从执行打到管理的跃迁者。你用结果打开门。",
      },
    ],
    ESFP: [
      {
        id: "tangxuanzong",
        name: "唐玄宗（早年）",
        dynasty: "唐",
        enneagram: "7w8",
        title: "开元气象的声色执政者",
        weights: { Se: 1.4, Fi: 1.1, Fe: 1.1, Ni: 0.5 },
        traits: ["盛世体验", "艺术赞助", "人物魅力", "晚节风险"],
        analysis:
          "开元时期的玄宗常被塑为 Se-Fe：声色、礼乐、人物与盛世体验；九型 7 追求丰盛，8 翼有掌控。晚期则成另一故事。\n\n若你接近此塑，你能把场面做成时代记忆，吸引人才与观众。风险是沉溺体验、听不进逆耳。史鉴尖锐：早年的魅力若无制度刹车，快乐会变成危机的前奏。",
        parallels:
          "适合文化盛事、品牌活动、需要魅力动员的岗位。你要有人专管「扫兴的风险」。",
      },
      {
        id: "liuyong",
        name: "柳永",
        dynasty: "北宋",
        enneagram: "4w3",
        title: "市井歌筵的词人浪子",
        weights: { Se: 1.3, Fi: 1.4, Ne: 1.0, Te: 0.4 },
        traits: ["感官词笔", "市民共鸣", "名场落拓", "深情不羁"],
        analysis:
          "柳永词贴近市井与感官，Fi-Se 浓，又要被听见（4w3）。科举受挫与民间传唱构成张力。\n\n若你接近此塑，你在正式评价系统里可能失意，却在真实人群中有磁场。你怕被定义成「不成器」。史鉴：民间的承认也是承认；把体感写成手艺，浪子可以是职业。",
        parallels:
          "适合流行文化、词曲、贴近受众的内容。你懂「人夜里到底在听什么」。",
      },
      {
        id: "yangyuhuan",
        name: "杨玉环",
        dynasty: "唐",
        enneagram: "2w3",
        title: "倾国叙事中的魅力与代价",
        weights: { Se: 1.3, Fe: 1.3, Fi: 1.1, Ni: 0.5 },
        traits: ["感官风华", "关系中心", "象征化身", "命运被动"],
        analysis:
          "杨贵妃在史与文学中常被写成 Se-Fe 的魅力极点，也是政治符号的牺牲者；九型 2w3 的「被爱与被需要」被放大到国策级别。\n\n若你接近此塑，你的在场本身就能改变气氛，你重视被珍视。风险是自我消失在关系与目光里。史鉴提醒：魅力是资本，也要有退出与主体叙事，避免只成为别人故事里的道具。",
        parallels:
          "适合舞台、礼仪、需要气场的公共角色。你要保护「不属于观众的那一部分」。",
      },
    ],
  };

  const SCALE_LABELS = ["非常不像我", "不太像我", "说不准", "比较像我", "非常像我"];
  const STACK_WEIGHTS = [4, 3, 2, 1];

  /** 24 道八维 + 9 道九型 = 33 题 */
  const QUESTIONS = [
    { id: "h01", kind: "fn", function: "Te", text: "面对混乱局面，我更想马上定目标、分工和截止时间。" },
    { id: "h02", kind: "fn", function: "Te", text: "我常用「有没有结果」来判断一件事值不值得继续。" },
    { id: "h03", kind: "fn", function: "Te", text: "规则清晰、赏罚分明的环境，让我更有安全感。" },
    { id: "h04", kind: "fn", function: "Ti", text: "我会花时间把概念定义清楚，哪怕别人觉得太较真。" },
    { id: "h05", kind: "fn", function: "Ti", text: "发现逻辑矛盾时，我很难假装没看见。" },
    { id: "h06", kind: "fn", function: "Ti", text: "比起立刻表态，我更想先在心里把道理想通。" },
    { id: "h07", kind: "fn", function: "Fe", text: "我很容易察觉场合气氛，并调整自己的表达。" },
    { id: "h08", kind: "fn", function: "Fe", text: "维护群体和谐，有时比坚持我的个人判断更优先。" },
    { id: "h09", kind: "fn", function: "Fe", text: "别人的认可与关系质量，会明显影响我的状态。" },
    { id: "h10", kind: "fn", function: "Fi", text: "即使吃亏，我也不愿做违背内心原则的事。" },
    { id: "h11", kind: "fn", function: "Fi", text: "我需要独处，才能分辨什么是「我真正在乎的」。" },
    { id: "h12", kind: "fn", function: "Fi", text: "我对虚伪与套话过敏，宁愿少说。" },
    { id: "h13", kind: "fn", function: "Se", text: "现场变化来时，我常常能迅速上手应对。" },
    { id: "h14", kind: "fn", function: "Se", text: "即时体验（声色、行动、现场）对我很有吸引力。" },
    { id: "h15", kind: "fn", function: "Se", text: "我更信「先做起来」，而不是把计划写到完美。" },
    { id: "h16", kind: "fn", function: "Si", text: "过往经验与惯例，是我做新决定时的重要参照。" },
    { id: "h17", kind: "fn", function: "Si", text: "我重视稳定节奏，突然大变会让我耗能。" },
    { id: "h18", kind: "fn", function: "Si", text: "细节（日期、步骤、旧例）我往往记得比别人清。" },
    { id: "h19", kind: "fn", function: "Ne", text: "一个话题能让我联想到许多看似不相关的可能。" },
    { id: "h20", kind: "fn", function: "Ne", text: "我喜欢保留多种选项，不急着只定一条路。" },
    { id: "h21", kind: "fn", function: "Ne", text: "头脑风暴时我常常最能打开僵局。" },
    { id: "h22", kind: "fn", function: "Ni", text: "我对长期走向常有说不清但事后对得上的预感。" },
    { id: "h23", kind: "fn", function: "Ni", text: "我倾向把复杂信息收成一个核心判断。" },
    { id: "h24", kind: "fn", function: "Ni", text: "比起当下热闹，我更常想这件事最终意味着什么。" },
    { id: "e01", kind: "ennea", ennea: 1, text: "看到不公正或敷衍，我会很难受，总想把它纠正到「应有的样子」。" },
    { id: "e02", kind: "ennea", ennea: 2, text: "我常主动照顾别人的需要，也害怕自己变得「不被需要」。" },
    { id: "e03", kind: "ennea", ennea: 3, text: "我很在意事情是否做出可见成果，以及别人是否承认我的能力。" },
    { id: "e04", kind: "ennea", ennea: 4, text: "我强烈需要感到自己是独特的，情绪与意义对我至关重要。" },
    { id: "e05", kind: "ennea", ennea: 5, text: "我倾向先观察、储备知识与精力，再决定是否投入。" },
    { id: "e06", kind: "ennea", ennea: 6, text: "做重要决定前，我会反复确认风险、同盟与「靠不靠得住」。" },
    { id: "e07", kind: "ennea", ennea: 7, text: "我害怕被痛苦或无聊困住，总想保持选项与新鲜感。" },
    { id: "e08", kind: "ennea", ennea: 8, text: "我难以忍受被控制，倾向自己掌握局面并保护在乎的人。" },
    { id: "e09", kind: "ennea", ennea: 9, text: "我本能地回避冲突，更想维持平和，有时会把自己的意愿放很后。" },
  ];

  function shuffle(list) {
    const arr = list.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }

  function scoreFunctions(answers, questions) {
    const sums = {};
    const counts = {};
    FUNCTIONS.forEach(function (f) {
      sums[f] = 0;
      counts[f] = 0;
    });
    questions.forEach(function (q) {
      if (q.kind !== "fn") return;
      const v = answers[q.id];
      if (typeof v !== "number") return;
      sums[q.function] += v;
      counts[q.function] += 1;
    });
    const scores = {};
    FUNCTIONS.forEach(function (f) {
      const n = counts[f] || 1;
      scores[f] = Math.round((((sums[f] / n) - 1) / 4) * 100);
    });
    return scores;
  }

  function scoreEnneagram(answers, questions) {
    const scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
    questions.forEach(function (q) {
      if (q.kind !== "ennea") return;
      const v = answers[q.id];
      if (typeof v !== "number") return;
      scores[q.ennea] = Math.round(((v - 1) / 4) * 100);
    });
    const ranked = Object.keys(scores)
      .map(function (k) {
        return { type: Number(k), score: scores[k] };
      })
      .sort(function (a, b) {
        return b.score - a.score;
      });
    const primary = ranked[0].type;
    const secondary = ranked[1].type;
    // wing: neighbor with higher score
    const left = primary === 1 ? 9 : primary - 1;
    const right = primary === 9 ? 1 : primary + 1;
    const wing = scores[left] >= scores[right] ? left : right;
    return {
      scores: scores,
      primary: primary,
      wing: wing,
      label: primary + "w" + wing,
      secondary: secondary,
      meta: ENNEA_META[primary],
      ranking: ranked.slice(0, 3),
    };
  }

  function matchMbti(functionScores) {
    const ranked = Object.keys(TYPE_STACKS)
      .map(function (code) {
        const stack = TYPE_STACKS[code];
        let fit = 0;
        stack.forEach(function (fn, i) {
          fit += (functionScores[fn] || 0) * STACK_WEIGHTS[i];
        });
        const inStack = {};
        stack.forEach(function (fn) {
          inStack[fn] = true;
        });
        let off = 0;
        Object.keys(functionScores).forEach(function (fn) {
          if (!inStack[fn]) off += functionScores[fn] * 0.35;
        });
        return { code: code, fit: fit - off };
      })
      .sort(function (a, b) {
        return b.fit - a.fit;
      });
    const best = ranked[0];
    const second = ranked[1];
    return {
      code: best.code,
      title: TYPE_TITLES[best.code],
      stack: TYPE_STACKS[best.code],
      secondaryCode: second.code,
      secondaryTitle: TYPE_TITLES[second.code],
      confidence: Math.max(0, Math.min(100, Math.round((best.fit / 1000) * 100))),
    };
  }

  function parseEnnea(label) {
    const m = String(label).match(/(\d)w(\d)/);
    if (!m) return { core: Number(label) || 0, wing: 0 };
    return { core: Number(m[1]), wing: Number(m[2]) };
  }

  function pickFigure(mbtiCode, functionScores, ennea) {
    const pool = FIGURES[mbtiCode] || [];
    const scored = pool
      .map(function (fig) {
        let s = 0;
        Object.keys(fig.weights || {}).forEach(function (fn) {
          s += (functionScores[fn] || 0) * fig.weights[fn];
        });
        const pe = parseEnnea(fig.enneagram);
        if (pe.core === ennea.primary) s += 120;
        else if (pe.core === ennea.secondary) s += 40;
        if (pe.wing === ennea.wing || pe.wing === ennea.primary) s += 35;
        if (fig.enneagram === ennea.label) s += 50;
        return { fig: fig, score: s };
      })
      .sort(function (a, b) {
        return b.score - a.score;
      });
    return {
      primary: scored[0].fig,
      alternatives: scored.slice(1).map(function (x) {
        return x.fig;
      }),
      pool: pool,
    };
  }


  function resolveImage(id) {
    // runtime cannot stat files; default svg posters always exist
    return "./img/" + id + ".svg?v=3";
  }
  function ensureImages(figuresMap) {
    Object.keys(figuresMap).forEach(function (code) {
      figuresMap[code].forEach(function (f) {
        f.image = resolveImage(f.id);
        f.tone = f.tone || null;
      });
    });
  }

  ensureImages(FIGURES);
  const IMAGE_OVERRIDES = {
    "zhugeliang": "./img/zhugeliang.svg",
    "zhangliang": "./img/zhangliang.svg",
    "wanganshi": "./img/wanganshi.svg",
    "zhuangzi": "./img/zhuangzi.svg",
    "caocao": "./img/caocao.svg",
    "kangxi": "./img/kangxi.svg",
    "sudongpo": "./img/sudongpo.svg",
    "dongfangshuo": "./img/dongfangshuo.svg",
    "jianzhen": "./img/jianzhen.svg",
    "libai": "./img/libai.svg",
    "zengguofan": "./img/zengguofan.svg",
    "simaqian": "./img/simaqian.svg",
    "baijuyi": "./img/baijuyi.svg",
    "baozheng": "./img/baozheng.svg",
    "hairui": "./img/hairui.svg",
    "simaguang": "./img/simaguang.svg",
    "dufu": "./img/dufu.svg",
    "huangdaopo": "./img/huangdaopo.svg",
    "yongzheng": "./img/yongzheng.svg",
    "zhuyuanzhang": "./img/zhuyuanzhang.svg",
    "fangxuanling": "./img/fangxuanling.svg",
    "di_renjie": "./img/di_renjie.svg",
    "hanxin": "./img/hanxin.svg",
    "huatuo": "./img/huatuo.svg",
    "bada": "./img/bada.svg",
    "zhengbanqiao": "./img/zhengbanqiao.svg",
    "zhaoyun": "./img/zhaoyun.svg",
    "tangxuanzong": "./img/tangxuanzong.svg",
    "yangyuhuan": "./img/yangyuhuan.svg",
  };
  Object.keys(FIGURES).forEach(function (code) {
    FIGURES[code].forEach(function (f) {
      if (IMAGE_OVERRIDES[f.id]) f.image = IMAGE_OVERRIDES[f.id] + "?v=3";
    });
  });


  const TYPE_TONES = {
    INTJ: ["#1c2a33", "#0a1218", "#c9b28a"],
    INTP: ["#1a3038", "#081418", "#7eb8c9"],
    ENTJ: ["#3a2a14", "#140e06", "#e0b45c"],
    ENTP: ["#3a2418", "#160c08", "#e0945a"],
    INFJ: ["#24322c", "#0c1410", "#d7d2c4"],
    INFP: ["#2c2438", "#100c18", "#d4a8c8"],
    ENFJ: ["#123038", "#061218", "#6ec0d4"],
    ENFP: ["#14342e", "#081410", "#7ed0b8"],
    ISTJ: ["#1c2c34", "#0a1216", "#8ab0c0"],
    ISFJ: ["#1c2e38", "#0a1218", "#b0c8d4"],
    ESTJ: ["#2c2818", "#12100a", "#d4b86a"],
    ESFJ: ["#2e2418", "#141008", "#e0b888"],
    ISTP: ["#1c2830", "#0a1014", "#90a8b8"],
    ISFP: ["#28301c", "#10140a", "#d0b898"],
    ESTP: ["#383018", "#161208", "#f0c060"],
    ESFP: ["#382828", "#160c0c", "#e090a0"],
  };

  Object.keys(FIGURES).forEach(function (code) {
    const t = TYPE_TONES[code] || TYPE_TONES.INTJ;
    FIGURES[code].forEach(function (f, i) {
      const c = t;
      f.tone = { from: c[0], to: c[1], accent: c[2] };
    });
  });

  function computeResult(answers, questions) {
    const functionScores = scoreFunctions(answers, questions);
    const ennea = scoreEnneagram(answers, questions);
    const mbti = matchMbti(functionScores);
    const pick = pickFigure(mbti.code, functionScores, ennea);
    return {
      functionScores: functionScores,
      ennea: ennea,
      mbti: mbti,
      figure: pick.primary,
      alternatives: pick.alternatives,
      pool: pick.pool,
    };
  }

  return {
    QUESTIONS: QUESTIONS,
    SCALE_LABELS: SCALE_LABELS,
    FIGURES: FIGURES,
    TYPE_TITLES: TYPE_TITLES,
    TYPE_STACKS: TYPE_STACKS,
    ENNEA_META: ENNEA_META,
    shuffle: shuffle,
    computeResult: computeResult,
  };
})();
