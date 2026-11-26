/**
 * 九鉴：九型人格主测 + MBTI 确认后跨库塑形匹配
 */
window.ENNEA_DATA = (function () {
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

  const CENTERS = {
    gut: { name: "本能中心", focus: "身体边界、愤怒与控制" },
    heart: { name: "情感中心", focus: "形象、羞愧与被看见" },
    head: { name: "头脑中心", focus: "焦虑、预期与安全感" },
  };

  /** 九型详析 + 常见 MBTI 关联（类型学对照，非临床结论） */
  const ENNEA_PROFILES = {
    1: {
      name: "改革者",
      center: "gut",
      desire: "正直、完善、成为正确的人",
      fear: "犯错、腐化、被指责为有缺陷",
      passion: "愤怒（常转化为内在批判）",
      virtue: "宁静 / 接纳不完美中的善",
      blurb: "以原则与标准校准世界，追求「应然」的秩序。",
      analysis:
        "一号的核心动力，是把现实推近心中的「正确版本」。你对敷衍、混乱与双重标准高度敏感，常在别人尚未开口前，就已经在心里排好改进清单。愤怒未必外显：更多时候它化作自我批评、完美主义与「我本可以做得更好」的持续压力。\n\n健康时，你是可靠的标杆与建设者——能把理想落成可检查的流程；失衡时，标准会变成鞭子，既抽别人也抽自己。翼型会改变表达：1w9 更内敛克制，1w2 更主动介入人际关系中的「该不该」。",
      strengths: ["原则清晰", "责任心强", "细节与质量敏感", "推动改进"],
      growth:
        "练习区分「更好」与「唯一正确」；允许阶段性交付；把愤怒翻译成具体、可协商的诉求，而不是道德宣判。",
      likelyMbti: [
        { code: "ISTJ", why: "Si-Te 习惯用既有标准把事情做稳、做对。" },
        { code: "ESTJ", why: "Te 外推规则，公开推动流程与问责。" },
        { code: "INFJ", why: "Ni 理想图景 + Fe/Fi 道德感，易呈现「改革愿景」。" },
        { code: "INTJ", why: "Ni-Te 以系统优化追求正确结构。" },
      ],
    },
    2: {
      name: "助人者",
      center: "heart",
      desire: "被爱、被需要、成为不可或缺的人",
      fear: "不被需要、被抛弃、自己的付出无人回应",
      passion: "骄傲（「我比你更懂你需要什么」）",
      virtue: "谦卑 / 无偿的爱与清晰边界",
      blurb: "通过感知与满足他人需要来确认自我价值。",
      analysis:
        "二号以关系为能量场：你擅长读气氛、补位、把别人的不适变成自己的行动清单。关怀本身是真实能力，但核心恐惧是「若我不付出，还有人要我吗」。于是帮助有时会夹带期待回报，或难以拒绝，边界模糊。\n\n健康时，你是温暖的连接者与支持系统；失衡时，可能操控情感、委屈积压，或用「为你好」掩盖自己的需要。2w1 更讲原则与「该帮的义」，2w3 更在意被看见、被感谢的成就感。",
      strengths: ["共情敏锐", "主动支持", "关系经营", "气氛调节"],
      growth:
        "先问自己「我现在需要什么」再行动；练习说「不」而不解释成罪；让帮助可选择、可撤回，而不是身份本身。",
      likelyMbti: [
        { code: "ESFJ", why: "Fe-Si 照顾具体的人与惯例中的关系义务。" },
        { code: "ENFJ", why: "Fe-Ni 看见他人成长需要并主动介入。" },
        { code: "ISFJ", why: "Si-Fe 默默记得细节并提供稳定照护。" },
        { code: "ESFP", why: "Se-Fi/Fe 以现场温暖与陪伴建立连接。" },
      ],
    },
    3: {
      name: "成就者",
      center: "heart",
      desire: "有价值、成功、被认可为能干的人",
      fear: "无价值、失败、形象崩塌",
      passion: "虚妄（角色扮演式的自我）",
      virtue: "诚实 / 放下表演后的真实自我",
      blurb: "以可见成果与效能证明「我值得」。",
      analysis:
        "三号把自我价值与表现、目标、效率紧密绑定。你善于读懂「什么算成功」，并能快速切换角色以适配场景。驱动力强、执行力高，但也容易把「我是谁」外包给简历、头衔与他人评价。\n\n健康时，你是能成事的引擎，激励团队冲刺；失衡时，可能过度包装、回避真实情绪，或一旦停下就感到虚无。3w2 更人际魅力与讨喜，3w4 更追求独特成就与深度自我叙事。",
      strengths: ["目标导向", "适应力强", "执行高效", "形象管理"],
      growth:
        "定期问「若无人看见，这件事对我还有没有意义」；允许失败叙事进入自我故事；把情绪当作数据而非干扰。",
      likelyMbti: [
        { code: "ENTJ", why: "Te-Ni 以战略与结果定义成功。" },
        { code: "ESTJ", why: "Te-Si 在既有赛道上堆叠可验证业绩。" },
        { code: "ENFJ", why: "Fe 动员他人，同时追求被认可的影响力。" },
        { code: "ENTP", why: "Ne-Ti 用点子与展示赢取机会与声誉。" },
      ],
    },
    4: {
      name: "个人主义者",
      center: "heart",
      desire: "独特、真实、被深层理解",
      fear: "平凡、空洞、没有独特身份",
      passion: "嫉妒（感觉别人拥有自己缺失的本质）",
      virtue: "平静 / 与当下自我和解",
      blurb: "以情感深度与差异感建构自我认同。",
      analysis:
        "四号对「真实自我」极度敏感：你需要感觉自己不是流水线产品，情绪、审美与意义是身份的材料。你能把细微感受写成语言或作品，也容易沉浸在「缺少什么」的叙事里——羡慕他人看似完整的人生。\n\n健康时，你是深刻的创作者与共鸣者；失衡时，可能戏剧化痛苦、自我孤立，或拒绝「平凡但有效」的日常。4w3 更想被看见独特成就，4w5 更抽离、智性化情感。",
      strengths: ["情感深度", "审美敏感", "真诚表达", "意义追寻"],
      growth:
        "把「独特」从身份焦虑改成创作燃料；练习普通日子的稳定节奏；嫉妒出现时，具体化「我真正想要的是哪一块」。",
      likelyMbti: [
        { code: "INFP", why: "Fi-Ne 以内在价值与想象守护独特性。" },
        { code: "INFJ", why: "Ni-Fe 追求意义叙事与被理解的深度。" },
        { code: "ISFP", why: "Fi-Se 以感官审美与当下真实自我表达。" },
        { code: "ENFP", why: "Ne-Fi 向外探索身份可能，仍锚定真我。" },
      ],
    },
    5: {
      name: "观察者",
      center: "head",
      desire: "胜任、理解、保有能力与边界",
      fear: "无能、被耗尽、入侵",
      passion: "贪婪（囤积知识与精力）",
      virtue: "超然 / 慷慨地分享理解与在场",
      blurb: "先理解、再投入；用知识与距离管理不确定。",
      analysis:
        "五号以观察与储备降低世界的威胁感。你需要独处、时间与心理空间，讨厌突然的情感索取或信息不足就被迫表态。理解本身是安全感：弄懂机制，才愿意进入。\n\n健康时，你是深挖问题的专家与冷静顾问；失衡时，可能过度抽离、生活技能空洞化，或把「还没准备好」当成永久推迟。5w4 更内省审美，5w6 更警觉同盟与系统风险。",
      strengths: ["分析深入", "专注力强", "独立思考", "边界清晰"],
      growth:
        "小剂量练习「未完全理解也行动」；把身体与关系当作与大脑同等的资源；分享知识时允许情绪同场出现。",
      likelyMbti: [
        { code: "INTP", why: "Ti-Ne 以概念模型理解世界后再投入。" },
        { code: "INTJ", why: "Ni-Te 远距观察与战略储备。" },
        { code: "ISTP", why: "Ti-Se 拆解机制，保持行动上的抽离效率。" },
        { code: "ISTJ", why: "Si-Te 用可靠知识与程序降低不确定。" },
      ],
    },
    6: {
      name: "忠诚者",
      center: "head",
      desire: "安全、支持、可靠的归属",
      fear: "被抛弃、没有指引、危险未知",
      passion: "恐惧（疑虑与过度警觉）",
      virtue: "勇气 / 信任自己的判断",
      blurb: "通过同盟、预案与质疑来寻找确定性。",
      analysis:
        "六号的心智常在「最坏情况」与「谁可以信任」之间扫描。你可能表现为忠诚守规，也可能表现为挑战权威——共同点是对不确定高度敏感。你需要可验证的同盟、程序或信念来稳住焦虑。\n\n健康时，你是可靠的队友与风险雷达；失衡时，可能反复确认、投射怀疑，或把责任完全外包给权威/团体。6w5 更智性抽离分析风险，6w7 更外向寻求热闹以冲淡焦虑。",
      strengths: ["风险意识", "忠诚可靠", "质疑漏洞", "团队意识"],
      growth:
        "区分真实威胁与焦虑剧本；练习在信息不完整时做小决定；把勇气定义为「带着怕仍行动」，而非「不再害怕」。",
      likelyMbti: [
        { code: "ISTJ", why: "Si-Te 依赖已验证程序与责任链条。" },
        { code: "ISFJ", why: "Si-Fe 在关系与惯例中寻求安全。" },
        { code: "INFJ", why: "Ni 预感风险 + Fe 同盟敏感。" },
        { code: "ESTJ", why: "Te 建立可问责结构以对抗不确定。" },
      ],
    },
    7: {
      name: "热情者",
      center: "head",
      desire: "满足、自由、丰富体验",
      fear: "被剥夺、痛苦、困在限制里",
      passion: "贪食（不断填充刺激与计划）",
      virtue: "清醒 / 与当下完整相处",
      blurb: "用可能性与愉悦回避痛苦与限制。",
      analysis:
        "七号把头脑变成可能性工厂：新计划、新连接、新刺激能迅速抬升能量。你害怕被无聊、悲伤或义务锁死，因此常提前跳到下一站。乐观是天赋，也可能是防御——用未来冲淡此刻的不适。\n\n健康时，你是灵感与士气的催化剂；失衡时，可能承诺过多、逃避深度承诺，或把严肃情绪重新包装成玩笑。7w6 更寻求同伴安全感，7w8 更强势开拓、不容被挡。",
      strengths: ["乐观发散", "快速学习", "社交点燃", "抗压弹性"],
      growth:
        "练习停留：完成比开启更稀缺；允许无聊与悲伤短暂停留而不立刻转移；把「自由」定义为选择后的投入，而非永不选择。",
      likelyMbti: [
        { code: "ENFP", why: "Ne-Fi 追逐新鲜可能与情感兴奋。" },
        { code: "ENTP", why: "Ne-Ti 用点子与辩论保持刺激。" },
        { code: "ESFP", why: "Se-Fi 沉浸现场体验与愉悦。" },
        { code: "ESTP", why: "Se-Ti 行动冒险、即时反馈。" },
      ],
    },
    8: {
      name: "挑战者",
      center: "gut",
      desire: "自主、力量、保护在乎的人",
      fear: "被控制、软弱、伤害",
      passion: "欲望（强度与扩张）",
      virtue: "纯真 / 柔软而不失力量",
      blurb: "以强度与掌控对抗脆弱感。",
      analysis:
        "八号对权力动态极度清醒：谁在主导、谁在试探边界。你倾向直接、高强度表达，宁可冲突也不愿受制。保护弱者与「绝不示弱」可以并存——柔软常被藏在最信任的关系里。\n\n健康时，你是有担当的保护者与破局者；失衡时，可能过度支配、把协商当成软弱，或用愤怒掩盖伤痛。8w7 更奔放扩张，8w9 更沉稳、爆发前更长潜伏。",
      strengths: ["决断力", "保护欲", "抗压强度", "直面冲突"],
      growth:
        "练习区分「影响」与「控制」；允许脆弱作为信任的货币；把强度用在建设而非仅用于防守。",
      likelyMbti: [
        { code: "ENTJ", why: "Te 主导局面，Ni 锁定长期掌控。" },
        { code: "ESTP", why: "Se 临场强势，Ti 快速判断利弊。" },
        { code: "ESTJ", why: "Te-Si 以规则与权威维持秩序。" },
        { code: "ENTP", why: "Ne 挑战成见，强度外放于辩论与开拓。" },
      ],
    },
    9: {
      name: "和平者",
      center: "gut",
      desire: "内在安定、和谐、合一",
      fear: "分裂、冲突、失去连接",
      passion: "惰性（麻木自己的优先事项）",
      virtue: "行动 / 醒觉地主张自我",
      blurb: "融合环境、淡化自我优先级以维持和平。",
      analysis:
        "九号本能地调节张力：你能看见多方立场，常成为缓冲带。代价是自己的意愿被推后，甚至麻木——用习惯、琐事或他人日程填满注意力，以免直面「我想要什么」。愤怒被压下去，可能以被动抗拒或突然爆发出现。\n\n健康时，你是稳定的整合者与倾听者；失衡时，可能自我消音、拖延关键决定。9w8 在被逼时更有底气反击，9w1 更带理想与「应该」的安静坚持。",
      strengths: ["包容调和", "稳定在场", "多方视角", "耐心"],
      growth:
        "每天练习说出一个小偏好；把冲突重构为「澄清」而非「战争」；行动优先于完美共识。",
      likelyMbti: [
        { code: "ISFP", why: "Fi-Se 温和坚持价值，回避硬冲突。" },
        { code: "INFP", why: "Fi-Ne 内在和谐优先，外在少对抗。" },
        { code: "ISFJ", why: "Si-Fe 维系熟悉关系与氛围稳定。" },
        { code: "INFJ", why: "Ni-Fe 寻求深层和谐与意义一致。" },
      ],
    },
  };

  const WING_NOTES = {
    "1w9": "改革中带克制与疏离，更少正面冲突，标准内化更深。",
    "1w2": "原则落地到人际：更主动纠正、教导、介入关系中的对错。",
    "2w1": "助人带道德责任色彩，付出更讲「该不该」。",
    "2w3": "助人与形象/成就交织，更在意被看见的贡献。",
    "3w2": "成就驱动叠加讨喜与人际魅力。",
    "3w4": "成就追求更个人化、叙事化，拒绝纯流水线成功。",
    "4w3": "独特感需要被看见与认可，表达更外向戏剧。",
    "4w5": "独特感更内收智性，情感经概念与审美过滤。",
    "5w4": "观察叠加身份与审美深度，更易沉浸孤独创作。",
    "5w6": "观察叠加同盟与风险扫描，更系统、更谨慎。",
    "6w5": "忠诚经分析与抽离表达，疑虑更智性化。",
    "6w7": "忠诚寻求热闹与选项缓冲焦虑，更外向活跃。",
    "7w6": "热情中保留对同盟与安全的需要。",
    "7w8": "热情带掌控与开拓强度，不容轻易被限制。",
    "8w7": "挑战者更奔放、享乐与扩张。",
    "8w9": "挑战者更沉稳含蓄，爆发前有更长的平静层。",
    "9w8": "和平中藏有底线强度，被逼时能硬起来。",
    "9w1": "和平叠加理想与正确感，安静地坚持原则。",
  };

  const SCALE_LABELS = ["非常不像我", "不太像我", "说不准", "比较像我", "非常像我"];

  /** 每型 3 题，共 27 题 */
  const QUESTIONS = [
    { id: "e1a", ennea: 1, text: "看到敷衍、混乱或不公正，我会很难受，总想把它纠正到「应有的样子」。" },
    { id: "e1b", ennea: 1, text: "我对自己和他人常有一份「还能更好」的清单，很难彻底放下标准。" },
    { id: "e1c", ennea: 1, text: "犯错或被指出缺陷时，我会比事情本身更久地耿耿于怀。" },
    { id: "e2a", ennea: 2, text: "我常主动照顾别人的需要，也害怕自己变得「不被需要」。" },
    { id: "e2b", ennea: 2, text: "别人忽略我的付出时，我容易委屈，却不一定直接说出来。" },
    { id: "e2c", ennea: 2, text: "我很难拒绝求助，即使当时自己其实已经很累。" },
    { id: "e3a", ennea: 3, text: "我很在意事情是否做出可见成果，以及别人是否承认我的能力。" },
    { id: "e3b", ennea: 3, text: "面对不同场合，我能迅速切换「该有的样子」来推进目标。" },
    { id: "e3c", ennea: 3, text: "一旦长时间没有进展或反馈，我会明显焦虑或自我怀疑。" },
    { id: "e4a", ennea: 4, text: "我强烈需要感到自己是独特的，情绪与意义对我至关重要。" },
    { id: "e4b", ennea: 4, text: "我常觉得别人拥有某种「完整感」，而我似乎缺了一块。" },
    { id: "e4c", ennea: 4, text: "平凡、套路化的生活或评价，会让我本能地抗拒。" },
    { id: "e5a", ennea: 5, text: "我倾向先观察、储备知识与精力，再决定是否投入。" },
    { id: "e5b", ennea: 5, text: "突然的社交或情感索取，会让我感到被侵入、想立刻退回独处。" },
    { id: "e5c", ennea: 5, text: "在搞懂机制之前，我很难安心表态或行动。" },
    { id: "e6a", ennea: 6, text: "做重要决定前，我会反复确认风险、同盟与「靠不靠得住」。" },
    { id: "e6b", ennea: 6, text: "我既可能忠诚守规，也可能特别爱挑战权威——核心是怕踩空。" },
    { id: "e6c", ennea: 6, text: "不确定的局面会让我脑子里自动播放各种最坏剧本。" },
    { id: "e7a", ennea: 7, text: "我害怕被痛苦或无聊困住，总想保持选项与新鲜感。" },
    { id: "e7b", ennea: 7, text: "不开心时，我常立刻转移注意力：计划下一趟、下一场、下一个点子。" },
    { id: "e7c", ennea: 7, text: "同时开很多可能性，比把一件事做到底更让我兴奋。" },
    { id: "e8a", ennea: 8, text: "我难以忍受被控制，倾向自己掌握局面并保护在乎的人。" },
    { id: "e8b", ennea: 8, text: "冲突来时，我宁可正面硬刚，也不愿示弱或绕弯。" },
    { id: "e8c", ennea: 8, text: "软弱、被动的气氛会让我烦躁，想立刻把强度拉起来。" },
    { id: "e9a", ennea: 9, text: "我本能地回避冲突，更想维持平和，有时会把自己的意愿放很后。" },
    { id: "e9b", ennea: 9, text: "我容易「顺着大家」，事后才发觉自己真正想要的被淹没了。" },
    { id: "e9c", ennea: 9, text: "面对大事，我有时用琐事、习惯或拖延来麻木自己的优先事项。" },
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

  function scoreEnneagram(answers, questions) {
    const sums = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
    questions.forEach(function (q) {
      const v = answers[q.id];
      if (typeof v !== "number") return;
      sums[q.ennea] += v;
      counts[q.ennea] += 1;
    });
    const scores = {};
    for (let t = 1; t <= 9; t += 1) {
      const n = counts[t] || 1;
      scores[t] = Math.round((((sums[t] / n) - 1) / 4) * 100);
    }
    const ranked = Object.keys(scores)
      .map(function (k) {
        return { type: Number(k), score: scores[k] };
      })
      .sort(function (a, b) {
        return b.score - a.score || a.type - b.type;
      });
    const primary = ranked[0].type;
    const secondary = ranked[1].type;
    const left = primary === 1 ? 9 : primary - 1;
    const right = primary === 9 ? 1 : primary + 1;
    const wing = scores[left] >= scores[right] ? left : right;
    const label = primary + "w" + wing;
    const profile = ENNEA_PROFILES[primary];
    return {
      scores: scores,
      primary: primary,
      wing: wing,
      label: label,
      secondary: secondary,
      ranking: ranked,
      profile: profile,
      center: CENTERS[profile.center],
      wingNote: WING_NOTES[label] || "",
      likelyMbti: profile.likelyMbti,
    };
  }

  function scoresFromMbti(code) {
    const stack = TYPE_STACKS[code] || TYPE_STACKS.INTJ;
    const scores = { Te: 22, Ti: 22, Fe: 22, Fi: 22, Se: 22, Si: 22, Ne: 22, Ni: 22 };
    const vals = [92, 76, 52, 34];
    stack.forEach(function (fn, i) {
      scores[fn] = vals[i];
    });
    return scores;
  }

  function parseEnnea(label) {
    const m = String(label).match(/(\d)w(\d)/);
    if (!m) return { core: Number(label) || 0, wing: 0 };
    return { core: Number(m[1]), wing: Number(m[2]) };
  }

  function rewriteImage(path, basePrefix) {
    if (!path) return "";
    return String(path).replace(/^\.\//, basePrefix);
  }

  function pickFigureFrom(figuresMap, mbtiCode, functionScores, ennea, imgBase) {
    const pool = (figuresMap && figuresMap[mbtiCode]) || [];
    if (!pool.length) return null;
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
    const best = scored[0].fig;
    return {
      id: best.id,
      name: best.name,
      subtitle: best.dynasty || best.title || "",
      title: best.title,
      enneagram: best.enneagram,
      traits: best.traits || [],
      analysis: best.analysis || "",
      parallels: best.parallels || "",
      image: rewriteImage(best.image, imgBase),
      tone: best.tone || null,
      score: scored[0].score,
    };
  }

  function pickAnimalFrom(animalsMap, mbtiCode, functionScores, imgBase) {
    const pool = (animalsMap && animalsMap[mbtiCode]) || [];
    if (!pool.length) return null;
    const scored = pool
      .map(function (animal) {
        let s = 0;
        Object.keys(animal.weights || {}).forEach(function (fn) {
          s += (functionScores[fn] || 0) * animal.weights[fn];
        });
        return { animal: animal, score: s };
      })
      .sort(function (a, b) {
        return b.score - a.score;
      });
    const best = scored[0].animal;
    return {
      id: best.id,
      name: best.name,
      subtitle: best.epithet || "",
      title: best.epithet || "",
      enneagram: "",
      traits: best.traits || [],
      analysis: best.analysis || "",
      parallels: "",
      image: rewriteImage(best.image, imgBase),
      tone: null,
      score: scored[0].score,
    };
  }

  function buildSynthesis(mbtiCode, ennea) {
    const title = TYPE_TITLES[mbtiCode] || mbtiCode;
    const p = ennea.profile;
    return (
      "你确认的 MBTI 为 " +
      mbtiCode +
      "（" +
      title +
      "），九型主型为 " +
      ennea.primary +
      " 号「" +
      p.name +
      "」（" +
      ennea.label +
      "）。前者描述认知信息处理的偏好栈，后者描述动机策略——你如何追求安全感、价值感与自主感。\n\n" +
      "在「" +
      p.name +
      "」的动力下，" +
      mbtiCode +
      " 的功能栈会呈现出特定姿态：" +
      p.blurb +
      " 同时以 " +
      (TYPE_STACKS[mbtiCode] || []).slice(0, 2).join("-") +
      " 等方式落实。下列动物塑、史鉴、寰鉴与漫鉴人选，均在你确认的 MBTI 人物池中，按功能权重与九型契合度选出，用作隐喻对照，而非鉴定。"
    );
  }

  function matchPersonas(mbtiCode, ennea) {
    const functionScores = scoresFromMbti(mbtiCode);
    const animalSrc = window.ANIMAL_DATA && window.ANIMAL_DATA.ANIMALS;
    const historySrc = window.HISTORY_DATA && window.HISTORY_DATA.FIGURES;
    const worldSrc = window.WORLD_DATA && window.WORLD_DATA.FIGURES;
    const animeSrc = window.ANIME_DATA && window.ANIME_DATA.FIGURES;

    const animal = pickAnimalFrom(animalSrc, mbtiCode, functionScores, "../animal/");
    const history = pickFigureFrom(historySrc, mbtiCode, functionScores, ennea, "../history/");
    const world = pickFigureFrom(worldSrc, mbtiCode, functionScores, ennea, "../world/");
    const anime = pickFigureFrom(animeSrc, mbtiCode, functionScores, ennea, "../anime/");

    return {
      mbtiCode: mbtiCode,
      mbtiTitle: TYPE_TITLES[mbtiCode],
      stack: TYPE_STACKS[mbtiCode],
      functionScores: functionScores,
      synthesis: buildSynthesis(mbtiCode, ennea),
      animal: animal,
      history: history,
      world: world,
      anime: anime,
    };
  }

  return {
    QUESTIONS: QUESTIONS,
    SCALE_LABELS: SCALE_LABELS,
    ENNEA_PROFILES: ENNEA_PROFILES,
    TYPE_TITLES: TYPE_TITLES,
    TYPE_STACKS: TYPE_STACKS,
    CENTERS: CENTERS,
    WING_NOTES: WING_NOTES,
    shuffle: shuffle,
    scoreEnneagram: scoreEnneagram,
    matchPersonas: matchPersonas,
    scoresFromMbti: scoresFromMbti,
  };
})();
