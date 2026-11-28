/**
 * 寰鉴：荣格八维 + 九型 → 外国历史人物
 * 人物塑形为教学隐喻，非对史实人格的科学鉴定。
 */
window.WORLD_DATA = (function () {
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
    INTJ: "战略家", INTP: "思考者", ENTJ: "指挥官", ENTP: "辩论家",
    INFJ: "洞察者", INFP: "调停者", ENFJ: "主人公", ENFP: "竞选者",
    ISTJ: "物流师", ISFJ: "守卫者", ESTJ: "总经理", ESFJ: "执政官",
    ISTP: "鉴赏家", ISFP: "探险家", ESTP: "企业家", ESFP: "表演者",
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

  const FIGURES = {
    INTJ: [
      {
        id: "newton",
        name: "艾萨克·牛顿",
        dynasty: "英格兰 · 17–18 世纪",
        enneagram: "5w6",
        title: "自然律的孤独立法者",
        weights: { Ni: 1.4, Te: 1.3, Fi: 0.8, Se: 0.3 },
        traits: ["体系建构", "专注极深", "标准严苛", "社交节制"],
        analysis: "牛顿常被理解为 Ni-Te：把纷乱现象收成可计算的定律，并以数学与实验把洞见制度化。九型 5w6 解释其以知识建立确定感，对干扰极度敏感。\n\n若你接近此塑，你能在长周期里死磕一个结构问题，讨厌无效社交与半吊子。你可能把自我价值绑在「是否想透」。史鉴提醒：体系需要被传播与协作；过度封闭会让洞见迟到于时代。",
        parallels: "适合基础研究、量化建模、长期架构。你是「给世界写方程」的人，也需要实验室之外的同盟。",
      },
      {
        id: "tesla",
        name: "尼古拉·特斯拉",
        dynasty: "塞尔维亚裔 / 美国 · 19–20 世纪",
        enneagram: "5w4",
        title: "未来图景的发明隐士",
        weights: { Ni: 1.5, Te: 1.0, Fi: 1.1, Se: 0.5 },
        traits: ["远见跳脱", "执念驱动", "商业疏离", "象征气质"],
        analysis: "特斯拉叙事强调 Ni 的未来闪现与对完美装置的执着，Fi 使其不屑纯粹利润逻辑，九型 5w4 带孤傲与独特性。\n\n若你接近此塑，你脑中画面往往比当下市场早一步，也因此难被短期考核理解。风险是理想装置缺少落地同盟。把洞见翻译成可融资、可量产的语言，是特斯拉故事里最昂贵的一课。",
        parallels: "适合前沿工程与概念验证。你需要「会算账的合伙人」。",
      },
      {
        id: "machiavelli",
        name: "尼科洛·马基雅维利",
        dynasty: "佛罗伦萨 · 文艺复兴",
        enneagram: "5w6",
        title: "权力现实的冷静分析者",
        weights: { Ni: 1.3, Te: 1.2, Ti: 1.0, Fe: 0.4 },
        traits: ["现实政治", "去魅分析", "策略写作", "道德争议"],
        analysis: "《君主论》传统读法突出 Ni/Te 对权力机制的去理想化描述，九型 5 使其以观察与著述保全智识位置。\n\n若你接近此塑，你讨厌空喊道德却不懂约束条件。你可能被指责「冷酷」。现代迁移：分析现实不等于认同残酷；把结构看清，是为了设计更少伤害的制度，而非只会冷笑。",
        parallels: "适合战略研究、组织政治分析。你让人看见规则背后的激励。",
      },
    ],
    INTP: [
      {
        id: "einstein",
        name: "阿尔伯特·爱因斯坦",
        dynasty: "德国 / 瑞士 / 美国 · 20 世纪",
        enneagram: "5w4",
        title: "思想实验的温和革命者",
        weights: { Ti: 1.4, Ne: 1.4, Si: 0.7, Fe: 0.7 },
        traits: ["概念重构", "好奇游戏", "和平立场", "公众符号"],
        analysis: "相对论故事常被读作 Ti-Ne：用思想实验改写时空直觉。九型 5w4 解释其沉浸与独特气质，亦有公共发声。\n\n若你接近此塑，你靠重新定义问题取胜，不靠堆工作量。你可能对行政事务不耐烦。史鉴：伟大概念仍需可检验的形式；把直觉写成别人能算的式子，才完成闭环。",
        parallels: "适合理论科学、跨域思想工作。你改变的是坐标系。",
      },
      {
        id: "descartes",
        name: "勒内·笛卡尔",
        dynasty: "法国 · 17 世纪",
        enneagram: "5w6",
        title: "我思故我在的方法建筑师",
        weights: { Ti: 1.5, Ne: 1.0, Si: 0.9, Fe: 0.4 },
        traits: ["方法怀疑", "清楚分明", "系统哲学", "数学化"],
        analysis: "笛卡尔以普遍怀疑清理地基，再建清楚分明的知识，是 Ti 方法论的经典形象，六号翼带来对确定性的饥渴。\n\n若你接近此塑，你开新项目前先问「什么是不可怀疑的前提」。你可能推倒重来过多。适度信任经验与他人，能让方法哲学变成可合作的工程。",
        parallels: "适合形式科学、方法论、基础软件架构。",
      },
      {
        id: "darwin",
        name: "查尔斯·达尔文",
        dynasty: "英格兰 · 19 世纪",
        enneagram: "5w6",
        title: "耐心收集证据的演化观察者",
        weights: { Ti: 1.3, Si: 1.3, Ne: 1.1, Fe: 0.5 },
        traits: ["长期田野", "证据堆积", "谨慎发表", "范式转移"],
        analysis: "达尔文形象是慢 Ti：环球航行与笔记最终逼出演化论，Si 支撑海量观察，九型 5 使其推迟公开直到证据够厚。\n\n若你接近此塑，你不怕慢，怕错。你可能错过「抢先发布」的窗口。现代启示：开放科学与预印本改变了节奏——在严谨与时效之间，需要新的平衡点。",
        parallels: "适合长期实证项目。你用时间换不可逆的说服力。",
      },
    ],
    ENTJ: [
      {
        id: "napoleon",
        name: "拿破仑·波拿巴",
        dynasty: "法国 · 18–19 世纪",
        enneagram: "8w7",
        title: "法典与战场的整合者",
        weights: { Te: 1.5, Ni: 1.2, Se: 1.1, Fi: 0.4 },
        traits: ["快速决断", "制度输出", "个人神话", "扩张代价"],
        analysis: "拿破仑叙事混合 Te 的组织力、Ni 的大业蓝图与 Se 的战场临场，九型 8 解释其掌控与强度。\n\n若你接近此塑，危机里你能把混乱编成命令链。风险是把反对者一律视为障碍。史鉴：法典比征途更耐久——你留下的规则，才是真正的帝国。",
        parallels: "适合转机型领导与大规模推行。你要有人专管「停下的时机」。",
      },
      {
        id: "caesar",
        name: "尤利乌斯·恺撒",
        dynasty: "古罗马",
        enneagram: "3w2",
        title: "跨越卢比孔的政治将领",
        weights: { Te: 1.4, Se: 1.2, Ni: 1.0, Fe: 1.0 },
        traits: ["叙事政治", "军事效率", "声望经营", "体制博弈"],
        analysis: "恺撒以战功与《高卢战记》经营合法性，Te-Se 突出，亦懂 Fe 式公众形象，九型 3 追求可见成就。\n\n若你接近此塑，你能把行动写成故事，让人跟随。风险是越过规范后的反噬。现代迁移：颠覆旧秩序前，先设计接班与制衡，否则卢比孔之后是三月十五日。",
        parallels: "适合创业并购、竞选型领导。你懂胜利，也要懂共和的边界。",
      },
      {
        id: "bismarck",
        name: "奥托·冯·俾斯麦",
        dynasty: "普鲁士 / 德意志 · 19 世纪",
        enneagram: "8w9",
        title: "现实政治的铁血架构师",
        weights: { Te: 1.4, Ni: 1.3, Si: 0.9, Fi: 0.5 },
        traits: ["均势外交", "国家建构", "手段灵活", "权威控制"],
        analysis: "俾斯麦以 Ni-Te 设计统一与均势，九型 8 带来强力，9 翼有时呈现冷静克制。\n\n若你接近此塑，你善于在多方张力中找可执行均衡。你可能对理想主义不耐烦。史鉴：你搭的体系若过度依赖个人手腕，继承人接不住时会崩——要把手腕写成制度。",
        parallels: "适合复杂利益相关方的协调与建国式改革。",
      },
    ],
    ENTP: [
      {
        id: "davinci",
        name: "列奥纳多·达·芬奇",
        dynasty: "意大利 · 文艺复兴",
        enneagram: "7w6",
        title: "手稿里的万物联想者",
        weights: { Ne: 1.5, Ti: 1.3, Se: 1.0, Si: 0.5 },
        traits: ["跨界好奇", "未完成性", "观察素描", "范式游牧"],
        analysis: "达·芬奇手稿是 Ne 的博物馆：解剖、飞行、绘画彼此点燃，Ti 追求机制，七号恐惧「只活一种可能」。\n\n若你接近此塑，你项目清单永远长过寿命。史鉴不是劝你收心灭趣，而是学会「可交付的切片」——让联想留下可被后人继续的接口。",
        parallels: "适合创新实验室、跨学科工作室。你需要截止日与策展人。",
      },
      {
        id: "franklin",
        name: "本杰明·富兰克林",
        dynasty: "北美 · 18 世纪",
        enneagram: "7w8",
        title: "实用机智的共和发明家",
        weights: { Ne: 1.3, Ti: 1.1, Te: 1.1, Fe: 1.0 },
        traits: ["格言传播", "实验实用", "外交斡旋", "自我经营"],
        analysis: "富兰克林把巧思落成避雷针、社团与外交，Ne-Te/Fe 兼备，七号热情配八翼行动。\n\n若你接近此塑，你讨厌无用的清谈，擅长把点子变成社群与器物。注意自我品牌过度时，深度会被稀释。保留一块「不表演的实验时间」。",
        parallels: "适合公共创新、创业与科普。你是「让聪明变得好用」的人。",
      },
      {
        id: "voltaire",
        name: "伏尔泰",
        dynasty: "法国 · 启蒙运动",
        enneagram: "7w6",
        title: "以笔为刃的论战启蒙者",
        weights: { Ne: 1.4, Ti: 1.2, Fe: 1.0, Fi: 0.8 },
        traits: ["讽刺力量", "观念传播", "不容忍不公", "流亡韧性"],
        analysis: "伏尔泰用机锋攻击迷信与专制，Ne-Ti 出论，亦有公共 Fe。九型 7 保持战斗中的轻快与产量。\n\n若你接近此塑，你靠表达撬动舆论，厌恶伪神圣。风险是论战成瘾。史鉴：启蒙需要制度落点，否则笔锋停在沙龙掌声里。",
        parallels: "适合评论、思想传播、公共辩论。",
      },
    ],
    INFJ: [
      {
        id: "plato",
        name: "柏拉图",
        dynasty: "古希腊",
        enneagram: "1w9",
        title: "理想国的洞穴隐喻者",
        weights: { Ni: 1.5, Fe: 1.1, Ti: 1.1, Se: 0.3 },
        traits: ["理念世界", "教育理想", "政治蓝图", "对话体"],
        analysis: "柏拉图以 Ni 看见「理型」，用对话教育城邦，一号追求应然秩序。\n\n若你接近此塑，你对现实的残缺格外敏感，想用教育与制度把它拉向理想。风险是鄙视现象界。洞穴寓言的另一面：哲人也要走回城邦，与影子里的人说话。",
        parallels: "适合教育哲学、价值驱动的组织设计。",
      },
      {
        id: "gandhi",
        name: "莫罕达斯·甘地",
        dynasty: "印度 · 20 世纪",
        enneagram: "1w2",
        title: "非暴力的战略圣徒",
        weights: { Ni: 1.3, Fe: 1.3, Fi: 1.2, Se: 0.6 },
        traits: ["象征行动", "道德动员", "克己修身", "大众叙事"],
        analysis: "甘地以 Ni-Fe/Fi 把个人修身变成政治技术，九型 1w2 纠正与助人交织。\n\n若你接近此塑，你相信手段即信息，不愿用脏工具换胜利。风险是道德压力压垮追随者。史鉴：非暴力需要组织后勤与退出机制，圣徒形象不能替代策略。",
        parallels: "适合社会运动、伦理领导。你要有人管粮草与法律。",
      },
      {
        id: "jung",
        name: "卡尔·荣格",
        dynasty: "瑞士 · 20 世纪",
        enneagram: "5w4",
        title: "集体无意识的勘探者",
        weights: { Ni: 1.5, Ti: 1.1, Fi: 1.0, Fe: 0.7 },
        traits: ["象征解读", "类型学", "内在旅程", "学术争议"],
        analysis: "荣格以 Ni 进入象征与原型，发展类型学与分析心理学，五号观察配四翼独特性。\n\n若你接近此塑，你对「表层解释」不满足，想挖结构。风险是过度神秘化。把洞见写成可讨论的模型——正如他留给后世的功能理论——比只做先知更有公共价值。",
        parallels: "适合心理、文化研究、深度辅导。",
      },
    ],
    INFP: [
      {
        id: "shakespeare",
        name: "威廉·莎士比亚",
        dynasty: "英格兰 · 16–17 世纪",
        enneagram: "4w5",
        title: "人性剧场的语言炼金师",
        weights: { Fi: 1.4, Ne: 1.4, Si: 0.8, Te: 0.5 },
        traits: ["人物深渊", "语言密度", "道德含混", "永恒回响"],
        analysis: "莎士比亚剧作以 Fi-Ne 容纳互相冲突的内心世界，四号追求独特表达。\n\n若你接近此塑，你通过故事理解人，难接受扁平道德。你可能拖延「把稿交出去」。舞台有开场铃：完成比完美的内心草稿更接近不朽。",
        parallels: "适合剧作、小说、角色写作。",
      },
      {
        id: "vangogh",
        name: "文森特·梵高",
        dynasty: "荷兰 · 19 世纪",
        enneagram: "4w5",
        title: "向日葵里的燃烧情感",
        weights: { Fi: 1.5, Se: 1.2, Ni: 1.0, Te: 0.3 },
        traits: ["强烈感受", "色彩表达", "不被理解", "创作耗竭"],
        analysis: "梵高书信与画作显示 Fi 的烈度与 Se 的感官投注，四号痛感与独特性拉满。\n\n若你接近此塑，创作是生存方式，市场冷淡会伤到存在本身。史鉴残酷而必要：保护身体与支持网络，让燃烧变成可持续的炉火，而非只留拍卖纪录。",
        parallels: "适合视觉艺术。你需要经纪人式的现实护栏。",
      },
      {
        id: "rousseau",
        name: "让-雅克·卢梭",
        dynasty: "日内瓦 / 法国 · 18 世纪",
        enneagram: "4w5",
        title: "自然情感的告白哲人",
        weights: { Fi: 1.5, Ne: 1.1, Si: 0.9, Te: 0.4 },
        traits: ["真挚自白", "教育理想", "文明批判", "关系风暴"],
        analysis: "卢梭强调自然情感与社会契约的张力，Fi 极强，九型 4 的自我叙事浓厚。\n\n若你接近此塑，你无法长期表演违心角色，写作即疗愈与宣战。风险是私人情绪吞噬公共论证。把告白炼成可讨论的命题，影响力会更稳。",
        parallels: "适合随笔、教育思想、社会批判。",
      },
    ],
    ENFJ: [
      {
        id: "mlk",
        name: "马丁·路德·金",
        dynasty: "美国 · 20 世纪",
        enneagram: "1w2",
        title: "梦与行进的演说领袖",
        weights: { Fe: 1.5, Ni: 1.3, Fi: 1.0, Se: 0.7 },
        traits: ["道德叙事", "群众动员", "非暴力策略", "牺牲象征"],
        analysis: "金博士以 Fe-Ni 把民权写成共享梦境，一号正义配二翼助人。\n\n若你接近此塑，你能把愤怒翻译成可跟随的希望。风险是成为运动的唯一象征而耗尽。分散领导力与制度成果，比个人殉道更接近他未竟的结构目标。",
        parallels: "适合公共领导、倡导、教育动员。",
      },
      {
        id: "pericles",
        name: "伯里克利",
        dynasty: "古雅典",
        enneagram: "3w2",
        title: "黄金时代的城邦演说家",
        weights: { Fe: 1.4, Ni: 1.1, Te: 1.0, Se: 0.8 },
        traits: ["民主魅力", "文化赞助", "战略眼光", "声望政治"],
        analysis: "伯里克利以演说与文化工程凝聚雅典，Fe 突出，亦有成就型三号色彩。\n\n若你接近此塑，你能让共同体感到自己伟大。风险是盛世叙事掩盖脆弱。葬礼演说之外，还要有人盯着瘟疫与战争的账本。",
        parallels: "适合城市品牌、文化政治、魅力型执政。",
      },
      {
        id: "joan",
        name: "圣女贞德",
        dynasty: "法国 · 15 世纪",
        enneagram: "1w2",
        title: "神谕驱动的战场少女",
        weights: { Ni: 1.3, Fe: 1.2, Se: 1.0, Fi: 1.1 },
        traits: ["使命感", "感召军心", "突破成规", "殉道结构"],
        analysis: "贞德叙事强调 Ni 神谕与 Fe 感召，一号应当感极强。\n\n若你接近此塑，一旦认定使命，年龄与资格都拦不住你。风险是缺乏制度保护。现代启示：异象需要参谋与法律，才能不只停在火刑柱的传奇里。",
        parallels: "适合使命型突击领导。你要有「世俗护卫队」。",
      },
    ],
    ENFP: [
      {
        id: "wilde",
        name: "奥斯卡·王尔德",
        dynasty: "爱尔兰 / 英国 · 19 世纪",
        enneagram: "4w3",
        title: "唯美与悖论的沙龙彗星",
        weights: { Ne: 1.4, Fi: 1.3, Fe: 1.1, Te: 0.5 },
        traits: ["机智格言", "自我戏剧", "审美主义", "社会代价"],
        analysis: "王尔德以 Ne-Fi 把生活过成风格，三翼要被看见。\n\n若你接近此塑，你用悖论拆穿伪善，也享受掌声。风险是风格吞噬生活。史鉴：才华需要伦理与法律边界，舞台灯熄后仍有真实的人要活。",
        parallels: "适合剧作、时尚文化评论、表演性写作。",
      },
      {
        id: "twain",
        name: "马克·吐温",
        dynasty: "美国 · 19–20 世纪",
        enneagram: "7w6",
        title: "河上过来的幽默启蒙者",
        weights: { Ne: 1.4, Fi: 1.2, Ti: 0.9, Se: 0.9 },
        traits: ["讽刺幽默", "民间视角", "旅行叙事", "反伪善"],
        analysis: "吐温用幽默运送尖锐观察，Ne 打开故事，Fi 站在弱者一边，七号保持讲述热情。\n\n若你接近此塑，你能让沉重变得可入口，却不只是开心果。注意幽默成为逃避时，要敢写「不幽默的章节」。",
        parallels: "适合小说、演讲、公共讽刺。",
      },
      {
        id: "mozart",
        name: "沃尔夫冈·莫扎特",
        dynasty: "奥地利 · 18 世纪",
        enneagram: "7w6",
        title: "乐谱上的即时天才",
        weights: { Ne: 1.3, Fi: 1.2, Se: 1.2, Te: 0.6 },
        traits: ["创作流速", "游戏精神", "情感透明", " patronage 张力"],
        analysis: "莫扎特形象是高速 Ne-Se/Fi：乐思如对话般涌出，七号厌恶停滞。\n\n若你接近此塑，你在玩中完成高难度。风险是财务与保护人结构。给天才配「萨列里式」的事务官（褒义），比互相仇视更现代。",
        parallels: "适合高产创作。你需要经纪人与作息。",
      },
    ],
    ISTJ: [
      {
        id: "washington",
        name: "乔治·华盛顿",
        dynasty: "美国 · 18 世纪",
        enneagram: "1w9",
        title: "交还权力的共和先例",
        weights: { Si: 1.3, Te: 1.3, Fi: 1.0, Ne: 0.5 },
        traits: ["职责伦理", "先例意识", "克制野心", "制度信任"],
        analysis: "华盛顿卸任总统成为 Si-Te 的制度神话：程序高于个人魅力，一号应当感明显。\n\n若你接近此塑，你在意「这件事以后别人怎么跟」。你可能显得无趣。史鉴：你留下的平静交接，比任何胜仗都难复制——保持对程序的敬畏。",
        parallels: "适合治理、合规、组织继任设计。",
      },
      {
        id: "kant",
        name: "伊曼努尔·康德",
        dynasty: "普鲁士 · 18 世纪",
        enneagram: "1w9",
        title: "定言令式的规律哲人",
        weights: { Si: 1.2, Te: 1.1, Ti: 1.3, Ne: 0.6 },
        traits: ["作息纪律", "普遍法则", "批判哲学", "义务伦理"],
        analysis: "康德以近乎钟表的生活支撑批判哲学，强调义务与普遍化，一号色彩浓。\n\n若你接近此塑，你用规则安放自由。风险是对例外缺乏体温。定言令式之外，还需要判断力——他也写了判断力批判。",
        parallels: "适合伦理、法理、学术纪律型工作。",
      },
      {
        id: "victoria",
        name: "维多利亚女王",
        dynasty: "英国 · 19 世纪",
        enneagram: "1w2",
        title: "时代命名的君主符号",
        weights: { Si: 1.4, Te: 1.1, Fe: 1.0, Fi: 0.9 },
        traits: ["礼仪秩序", "帝国象征", "家庭叙事", "长久在位"],
        analysis: "维多利亚时代象征以 Si 礼仪与道德形象统合帝国叙事，一号追求体面。\n\n若你接近此塑，你重视名分与持续性。风险是象征僵化。让传统更新接口，才能避免「体面」变成窒息。",
        parallels: "适合品牌传承、礼仪与长期机构形象。",
      },
    ],
    ISFJ: [
      {
        id: "nightingale",
        name: "弗洛伦斯·南丁格尔",
        dynasty: "英国 · 19 世纪",
        enneagram: "2w1",
        title: "提灯与统计的护理改革者",
        weights: { Si: 1.3, Fe: 1.4, Te: 1.1, Ne: 0.6 },
        traits: ["照护细节", "数据说服", "制度改革", "奉献形象"],
        analysis: "南丁格尔把 Fe 关怀与 Si 病房细节、Te 统计结合，二号助人配一翼改革。\n\n若你接近此塑，你用可验证的改善证明温柔不是软弱。注意耗竭。提灯也要交班制度。",
        parallels: "适合医疗管理、公共服务改革。",
      },
      {
        id: "austen",
        name: "简·奥斯汀",
        dynasty: "英格兰 · 18–19 世纪",
        enneagram: "6w5",
        title: "客厅里的社会显微镜",
        weights: { Si: 1.3, Fe: 1.2, Fi: 1.2, Ne: 0.9 },
        traits: ["人际观察", "反讽克制", "经济现实", "道德选择"],
        analysis: "奥斯汀小说精细刻画婚姻市场与性格，Si-Fe/Fi 突出，六号对安全与匹配敏感。\n\n若你接近此塑，你在琐事里看见结构。你可能被低估为「只写恋爱」。史鉴：小圈子的伦理，往往是大社会的缩影。",
        parallels: "适合小说、社会观察写作。",
      },
      {
        id: "teresa",
        name: "特蕾莎修女",
        dynasty: "阿尔巴尼亚 / 印度 · 20 世纪",
        enneagram: "2w1",
        title: "最贫穷者中的陪伴者",
        weights: { Fe: 1.5, Si: 1.2, Fi: 1.1, Te: 0.6 },
        traits: ["临在照护", "简朴生活", "信仰驱动", "争议与圣洁"],
        analysis: "特蕾莎传统形象强调对具体苦难的 Fe 临在，二号核心「被需要」。评价也有批评维度。\n\n若你接近此塑，你难以对眼前的苦视而不见。风险是系统性贫困被个人圣洁叙事简化。把关怀接上公共卫生与政策，才是更大的提灯。",
        parallels: "适合一线照护与慈善，同时要学系统思维。",
      },
    ],
    ESTJ: [
      {
        id: "ford",
        name: "亨利·福特",
        dynasty: "美国 · 20 世纪",
        enneagram: "3w2",
        title: "流水线的效率皇帝",
        weights: { Te: 1.5, Si: 1.2, Se: 0.9, Fi: 0.4 },
        traits: ["标准化", "规模生产", "家长式管理", "社会影响"],
        analysis: "福特用 Te-Si 把汽车变成标准件民主，三号成就驱动明显。\n\n若你接近此塑，你迷恋可复制的效率。风险是把人变成零件。现代迁移：流水线要配劳工尊严与灵活，否则效率会反噬品牌。",
        parallels: "适合制造业、运营规模化。",
      },
      {
        id: "elizabeth_i",
        name: "伊丽莎白一世",
        dynasty: "英格兰 · 16 世纪",
        enneagram: "3w2",
        title: "童贞女王的权术舞台",
        weights: { Te: 1.3, Fe: 1.2, Ni: 1.1, Si: 1.0 },
        traits: ["形象政治", "宗教平衡", "海权时代", "婚姻棋局"],
        analysis: "伊丽莎白以 Te/Fe 经营王权象征与均势，三号形象管理极强。\n\n若你接近此塑，你懂戏与国事可以同一舞台。风险是私密自我被角色吃掉。保留「不登场」的顾问团，避免只活在肖像里。",
        parallels: "适合高曝光领导与危机公关治国。",
      },
      {
        id: "frederick",
        name: "腓特烈大帝",
        dynasty: "普鲁士 · 18 世纪",
        enneagram: "3w4",
        title: "长笛与军纪的开明专制者",
        weights: { Te: 1.4, Ni: 1.1, Si: 1.0, Fi: 0.8 },
        traits: ["军事改革", "文化自居", "效率国家", "矛盾自我"],
        analysis: "腓特烈把军队与行政打磨成机器，又矜持艺术家身份，三号配四翼张力。\n\n若你接近此塑，你能同时要胜利与品位。注意开明修辞与专制手段的裂缝——臣民会记住鞭子，也会记住长笛。",
        parallels: "适合强执行的改革型长官。",
      },
    ],
    ESFJ: [
      {
        id: "cleopatra",
        name: "克利奥帕特拉七世",
        dynasty: "托勒密埃及",
        enneagram: "3w2",
        title: "多语王权的魅力外交家",
        weights: { Fe: 1.4, Se: 1.2, Te: 1.1, Ni: 1.0 },
        traits: ["联盟外交", "形象经营", "生存博弈", "传奇化"],
        analysis: "克利奥帕特拉在罗马叙事里常被简化，但也可读作 Fe-Te 的生存外交，三号要赢下舞台。\n\n若你接近此塑，你在不利结构里仍能结盟。风险是被写成「魅惑」而抹掉政治能力。夺回叙事权：把魅力定义为战略资源，而非污名。",
        parallels: "适合跨文化谈判与品牌政治。",
      },
      {
        id: "catherine",
        name: "叶卡捷琳娜二世",
        dynasty: "俄罗斯 · 18 世纪",
        enneagram: "3w2",
        title: "书信与扩张的女皇",
        weights: { Fe: 1.3, Te: 1.3, Ni: 1.1, Se: 0.8 },
        traits: ["开明通信", "领土扩张", "宫廷经营", "改革限度"],
        analysis: "叶卡捷琳娜以通信与文化赞助经营开明形象，同时用 Te 扩张，三号成就明显。\n\n若你接近此塑，你能把权力说成进步。注意词与物的落差。真正的开明要用可执行的法治衡量，而非只活在与伏尔泰的信件里。",
        parallels: "适合文化外交与大型改革话语。",
      },
      {
        id: "eleanor",
        name: "埃莉诺·罗斯福",
        dynasty: "美国 · 20 世纪",
        enneagram: "2w1",
        title: "人权现场的第一夫人",
        weights: { Fe: 1.5, Si: 1.0, Ni: 1.0, Te: 0.9 },
        traits: ["倾听边缘", "公共行程", "人权文书", "重新定义角色"],
        analysis: "埃莉诺把第一夫人做成社会政策与人权实践，二号助人配一翼正义。\n\n若你接近此塑，你把位置变成麦克风给弱者。风险是行程过满。授权与制度，让关怀不止于你的足迹。",
        parallels: "适合公益外交、社会政策倡导。",
      },
    ],
    ISTP: [
      {
        id: "musashi",
        name: "宫本武藏",
        dynasty: "日本 · 江户初期",
        enneagram: "5w6",
        title: "独行的兵法实践者",
        weights: { Ti: 1.4, Se: 1.4, Ni: 0.9, Fe: 0.3 },
        traits: ["实战验证", "孤独修炼", "兵法写作", "不羁门派"],
        analysis: "武藏以赛场验证刀法，Ti-Se 极强，五号独立。《五轮书》把身体智慧写成原理。\n\n若你接近此塑，你只信过招后的结论。你可能拒绝组织。现代启示：独行者也可以收徒与留书，否则技艺随人而亡。",
        parallels: "适合高技艺实战领域与技术写作。",
      },
      {
        id: "earhart",
        name: "阿梅莉亚·埃尔哈特",
        dynasty: "美国 · 20 世纪",
        enneagram: "8w7",
        title: "飞出地图的飞行员",
        weights: { Se: 1.5, Ti: 1.1, Fi: 1.0, Ni: 0.6 },
        traits: ["冒险实践", "打破成规", "公众象征", "风险边缘"],
        analysis: "埃尔哈特用飞行打破性别地图，Se 驱动，八号要自主。\n\n若你接近此塑，你用行动改写「谁可以」。风险是象征压过安全冗余。伟大航线需要地面团队与备用方案，勇气才可复制。",
        parallels: "适合探索型事业与打破门槛的示范。",
      },
      {
        id: "edison",
        name: "托马斯·爱迪生",
        dynasty: "美国 · 19–20 世纪",
        enneagram: "3w2",
        title: "试错工厂的发明经理",
        weights: { Te: 1.3, Se: 1.2, Si: 1.0, Ne: 0.9 },
        traits: ["迭代实验", "专利经营", "团队实验室", "商业眼光"],
        analysis: "爱迪生把发明做成可管理的试错流程，Te-Se 突出，三号要成果可见。争议在于团队署名。\n\n若你接近此塑，你相信数量与迭代。注意尊重合作者的知识产权——实验室文明比灯泡更重要。",
        parallels: "适合产品研发管理与应用发明。",
      },
    ],
    ISFP: [
      {
        id: "chopin",
        name: "弗雷德里克·肖邦",
        dynasty: "波兰 / 法国 · 19 世纪",
        enneagram: "4w5",
        title: "夜曲里的民族心绪",
        weights: { Fi: 1.5, Se: 1.2, Ni: 1.0, Te: 0.3 },
        traits: ["私密情感", "音色精微", "流亡认同", "舞台克制"],
        analysis: "肖邦音乐以 Fi-Se 传递细腻心绪与身体触键，四号独特性强。\n\n若你接近此塑，你无法用粗暴效率对待作品。你可能回避过度曝光。小形式里的完美，也是一种世界史。",
        parallels: "适合室内艺术与精微创作。",
      },
      {
        id: "kahlo",
        name: "弗里达·卡罗",
        dynasty: "墨西哥 · 20 世纪",
        enneagram: "4w5",
        title: "自画像中的疼痛与旗帜",
        weights: { Fi: 1.5, Se: 1.2, Ni: 1.1, Te: 0.4 },
        traits: ["身体叙事", "身份政治", "色彩象征", "坚韧自我"],
        analysis: "卡罗把个人疼痛与文化身份画进镜子，Fi-Ni/Se 强烈。\n\n若你接近此塑，你的作品即证词。风险是被消费成符号。保留创作主权，比成为海报更接近她的锋利。",
        parallels: "适合当代艺术与身体叙事。",
      },
      {
        id: "thoreau",
        name: "亨利·戴维·梭罗",
        dynasty: "美国 · 19 世纪",
        enneagram: "5w4",
        title: "湖畔的公民不服从者",
        weights: { Fi: 1.4, Si: 1.2, Ti: 1.0, Te: 0.5 },
        traits: ["简朴实验", "自然书写", "良心反抗", "独处伦理"],
        analysis: "梭罗以湖畔生活实验价值，Fi 核心，亦有五号抽离。《公民不服从》连接个人良心与公共。\n\n若你接近此塑，你用生活本身做论证。注意独处变成对社会的永久缺席。瓦尔登湖不是终点，而是校准器。",
        parallels: "适合自然写作、伦理实践、慢生活实验。",
      },
    ],
    ESTP: [
      {
        id: "roosevelt_t",
        name: "西奥多·罗斯福",
        dynasty: "美国 · 20 世纪",
        enneagram: "8w7",
        title: "莽骑兵的进步总统",
        weights: { Se: 1.5, Te: 1.2, Fe: 1.0, Ni: 0.7 },
        traits: ["行动政治", "打压托拉斯", "个人魅力", "冒险气质"],
        analysis: "西奥多·罗斯福以 Se 行动定义总统形象，八号强度明显。\n\n若你接近此塑，你把办公桌当成另一处荒野。风险是冲动立法。进步需要程序，莽劲要进得了听证室。",
        parallels: "适合行动派改革与危机领导。",
      },
      {
        id: "heingway",
        name: "欧内斯特·海明威",
        dynasty: "美国 · 20 世纪",
        enneagram: "8w7",
        title: "短句与战场的硬汉叙事",
        weights: { Se: 1.4, Fi: 1.1, Ti: 0.9, Ni: 0.6 },
        traits: ["经验写作", "简洁文风", "冒险神话", "脆弱掩藏"],
        analysis: "海明威冰山文风下是 Se 经验与八号硬壳，内里 Fi 更脆。\n\n若你接近此塑，你用经历换权威，讨厌滥情。注意硬汉人设的自我伤害。真正的勇气包括求助。",
        parallels: "适合纪实、战争/冒险叙事。",
      },
      {
        id: "alexander",
        name: "亚历山大大帝",
        dynasty: "马其顿 · 公元前 4 世纪",
        enneagram: "8w7",
        title: "远征尽头的少年征服者",
        weights: { Se: 1.5, Ni: 1.1, Te: 1.1, Fi: 0.5 },
        traits: ["迅疾征服", "文化融合实验", "个人神话", "继承真空"],
        analysis: "亚历山大以 Se-Ni 快速铺开世界版图，八号要无尽边界。\n\n若你接近此塑，你二十多岁就能重画地图。风险是没有「亚历山大之后」。征服的一半是继承设计——否则帝国在葬礼上碎裂。",
        parallels: "适合高速扩张期的创始人，必须配继任方案。",
      },
    ],
    ESFP: [
      {
        id: "byron",
        name: "拜伦勋爵",
        dynasty: "英格兰 · 19 世纪",
        enneagram: "4w3",
        title: "漂泊的浪漫巨星",
        weights: { Se: 1.3, Fi: 1.3, Ne: 1.1, Te: 0.4 },
        traits: ["魅力丑闻", "诗与行动", "自我神话", "流亡热情"],
        analysis: "拜伦把生活过成传奇，Se-Fi 外放，三翼要观众。\n\n若你接近此塑，你的出场即事件。风险是丑闻反噬作品。让行动服务诗，而非诗服务八卦。",
        parallels: "适合表演性创作与文化偶像工业——需经纪人刹车。",
      },
      {
        id: "marie_antoinette",
        name: "玛丽·安托瓦内特",
        dynasty: "法国 · 18 世纪",
        enneagram: "7w6",
        title: "凡尔赛的感官符号",
        weights: { Se: 1.4, Fe: 1.2, Fi: 1.0, Ni: 0.4 },
        traits: ["宫廷审美", "娱乐政治", "形象靶心", "命运转折"],
        analysis: "她在史书中常成奢靡符号，也可读作 Se-Fe 的宫廷生存，七号要体验。\n\n若你接近此塑，你敏感于氛围与服饰语言。风险是成为愤怒的靶心。政治崩溃前，感官繁荣最需要听力——听宫墙外的饿。",
        parallels: "适合审美与仪式设计，但要接社会现实传感器。",
      },
      {
        id: "chaplin",
        name: "查理·卓别林",
        dynasty: "英国 / 美国 · 20 世纪",
        enneagram: "4w3",
        title: "现代性里的喜剧人道主义者",
        weights: { Se: 1.2, Fi: 1.3, Fe: 1.2, Ne: 1.0 },
        traits: ["身体喜剧", "底层同情", "自我导演", "时代批判"],
        analysis: "卓别林用身体与幽默处理工业时代的人，Fi/Fe 有温度，表演属 Se。\n\n若你接近此塑，你能让观众笑着看见残酷。注意把控自己的公司与版权——喜剧也是工业。",
        parallels: "适合表演、导演、大众文化批评。",
      },
    ],
  };

  const SCALE_LABELS = ["非常不像我", "不太像我", "说不准", "比较像我", "非常像我"];
  const STACK_WEIGHTS = [4, 3, 2, 1];

  const QUESTIONS = [
    { id: "w01", kind: "fn", function: "Te", text: "面对混乱局面，我更想马上定目标、分工和截止时间。" },
    { id: "w02", kind: "fn", function: "Te", text: "我常用「有没有结果」来判断一件事值不值得继续。" },
    { id: "w03", kind: "fn", function: "Te", text: "规则清晰、赏罚分明的环境，让我更有安全感。" },
    { id: "w04", kind: "fn", function: "Ti", text: "我会花时间把概念定义清楚，哪怕别人觉得太较真。" },
    { id: "w05", kind: "fn", function: "Ti", text: "发现逻辑矛盾时，我很难假装没看见。" },
    { id: "w06", kind: "fn", function: "Ti", text: "比起立刻表态，我更想先在心里把道理想通。" },
    { id: "w07", kind: "fn", function: "Fe", text: "我很容易察觉场合气氛，并调整自己的表达。" },
    { id: "w08", kind: "fn", function: "Fe", text: "维护群体和谐，有时比坚持我的个人判断更优先。" },
    { id: "w09", kind: "fn", function: "Fe", text: "别人的认可与关系质量，会明显影响我的状态。" },
    { id: "w10", kind: "fn", function: "Fi", text: "即使吃亏，我也不愿做违背内心原则的事。" },
    { id: "w11", kind: "fn", function: "Fi", text: "我需要独处，才能分辨什么是「我真正在乎的」。" },
    { id: "w12", kind: "fn", function: "Fi", text: "我对虚伪与套话过敏，宁愿少说。" },
    { id: "w13", kind: "fn", function: "Se", text: "现场变化来时，我常常能迅速上手应对。" },
    { id: "w14", kind: "fn", function: "Se", text: "即时体验（声色、行动、现场）对我很有吸引力。" },
    { id: "w15", kind: "fn", function: "Se", text: "我更信「先做起来」，而不是把计划写到完美。" },
    { id: "w16", kind: "fn", function: "Si", text: "过往经验与惯例，是我做新决定时的重要参照。" },
    { id: "w17", kind: "fn", function: "Si", text: "我重视稳定节奏，突然大变会让我耗能。" },
    { id: "w18", kind: "fn", function: "Si", text: "细节（日期、步骤、旧例）我往往记得比别人清。" },
    { id: "w19", kind: "fn", function: "Ne", text: "一个话题能让我联想到许多看似不相关的可能。" },
    { id: "w20", kind: "fn", function: "Ne", text: "我喜欢保留多种选项，不急着只定一条路。" },
    { id: "w21", kind: "fn", function: "Ne", text: "头脑风暴时我常常最能打开僵局。" },
    { id: "w22", kind: "fn", function: "Ni", text: "我对长期走向常有说不清但事后对得上的预感。" },
    { id: "w23", kind: "fn", function: "Ni", text: "我倾向把复杂信息收成一个核心判断。" },
    { id: "w24", kind: "fn", function: "Ni", text: "比起当下热闹，我更常想这件事最终意味着什么。" },
    { id: "we01", kind: "ennea", ennea: 1, text: "看到不公正或敷衍，我会很难受，总想把它纠正到「应有的样子」。" },
    { id: "we02", kind: "ennea", ennea: 2, text: "我常主动照顾别人的需要，也害怕自己变得「不被需要」。" },
    { id: "we03", kind: "ennea", ennea: 3, text: "我很在意事情是否做出可见成果，以及别人是否承认我的能力。" },
    { id: "we04", kind: "ennea", ennea: 4, text: "我强烈需要感到自己是独特的，情绪与意义对我至关重要。" },
    { id: "we05", kind: "ennea", ennea: 5, text: "我倾向先观察、储备知识与精力，再决定是否投入。" },
    { id: "we06", kind: "ennea", ennea: 6, text: "做重要决定前，我会反复确认风险、同盟与「靠不靠得住」。" },
    { id: "we07", kind: "ennea", ennea: 7, text: "我害怕被痛苦或无聊困住，总想保持选项与新鲜感。" },
    { id: "we08", kind: "ennea", ennea: 8, text: "我难以忍受被控制，倾向自己掌握局面并保护在乎的人。" },
    { id: "we09", kind: "ennea", ennea: 9, text: "我本能地回避冲突，更想维持平和，有时会把自己的意愿放很后。" },
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
    return "./img/" + id + ".jpg?v=6";
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
    const c = TYPE_TONES[code] || TYPE_TONES.INTJ;
    FIGURES[code].forEach(function (f) {
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
