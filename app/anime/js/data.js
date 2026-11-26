/**
 * 漫鉴：荣格八维 + 九型 → 动漫人物
 * 角色塑形为教学隐喻，非对作品角色的官方设定鉴定。
 */
window.ANIME_DATA = (function () {
  const FUNCTIONS = ["Te", "Ti", "Fe", "Fi", "Se", "Si", "Ne", "Ni"];

  const TYPE_STACKS = {
    INTJ: ["Ni", "Te", "Fi", "Se"], INTP: ["Ti", "Ne", "Si", "Fe"],
    ENTJ: ["Te", "Ni", "Se", "Fi"], ENTP: ["Ne", "Ti", "Fe", "Si"],
    INFJ: ["Ni", "Fe", "Ti", "Se"], INFP: ["Fi", "Ne", "Si", "Te"],
    ENFJ: ["Fe", "Ni", "Se", "Ti"], ENFP: ["Ne", "Fi", "Te", "Si"],
    ISTJ: ["Si", "Te", "Fi", "Ne"], ISFJ: ["Si", "Fe", "Ti", "Ne"],
    ESTJ: ["Te", "Si", "Ne", "Fi"], ESFJ: ["Fe", "Si", "Ne", "Ti"],
    ISTP: ["Ti", "Se", "Ni", "Fe"], ISFP: ["Fi", "Se", "Ni", "Te"],
    ESTP: ["Se", "Ti", "Fe", "Ni"], ESFP: ["Se", "Fi", "Te", "Ni"],
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
        id: "l_lawliet",
        name: "L（Death Note）",
        dynasty: "《死亡笔记》",
        enneagram: "5w6",
        title: "用推理给世界称重的侦探",
        weights: { Ni: 1.4, Te: 1.2, Ti: 1.2, Se: 0.4 },
        traits: ["信息优势", "非常规习惯", "冷感外壳", "正义算法"],
        analysis: "L 常被读作 Ni-Ti/Te：先形成「谁是 Kira」的收敛判断，再用非常规实验与数据压力逼出真相。九型 5w6 以智力优势降低不确定，社交节能到蹲糖的程度。\n\n若你接近此塑，你对「表面正义」不买账，更信可检验的链条。你可能用怪癖保护深度工作。风险是把人完全变量化。漫鉴提醒：推理若失去对人的温度，胜利也会变成另一种独断。",
        parallels: "适合调查、风控、复杂问题拆解。你需要能顶住你沉默的搭档。",
      },
      {
        id: "erwin",
        name: "艾尔文·史密斯",
        dynasty: "《进击的巨人》",
        enneagram: "1w9",
        title: "愿赌命的调查兵团长",
        weights: { Ni: 1.4, Te: 1.3, Fe: 0.9, Fi: 0.8 },
        traits: ["远景动员", "牺牲计算", "信念演说", "战略冷酷"],
        analysis: "艾尔文以 Ni 看见「墙外真相」的必要性，Te 组织敢死队，一号应当感支撑其把士兵当成抵达真理的阶梯——也因此背负道德重量。\n\n若你接近此塑，你能为远景做残酷取舍，并公开承认自己在赌。风险是理想吞噬具体的人。把「为人类」落实为可审计的指挥伦理，比只留下名场面更难。",
        parallels: "适合高风险战略领导。你要有人专管「不能赌的底线」。",
      },
      {
        id: "kurisu",
        name: "牧濑红莉栖",
        dynasty: "《命运石之门》",
        enneagram: "5w6",
        title: "实验室里的傲娇理论家",
        weights: { Ni: 1.2, Te: 1.2, Ti: 1.3, Fi: 0.9 },
        traits: ["科学严谨", "嘴硬心软", "时间线焦虑", "协作成长"],
        analysis: "红莉栖以 Ti/Te 坚持可重复验证，又在时间跳跃中被迫面对 Ni 式命运感，五号用专业身份自保。\n\n若你接近此塑，你先质疑再相信，讨厌「中二妄想」却往往被卷进其中。优势是把疯狂点子钉成论文；代价是情感表达迟滞。学会在实验日志之外写一句人话，团队会跟你更紧。",
        parallels: "适合科研协作与硬核设定讨论。你是「给妄想上脚注」的人。",
      },
    ],
    INTP: [
      {
        id: "senku",
        name: "石神千空",
        dynasty: "《Dr.STONE》",
        enneagram: "5w6",
        title: "用科学重启文明的少年",
        weights: { Ti: 1.5, Ne: 1.2, Te: 1.1, Fe: 0.6 },
        traits: ["原理优先", "十亿百分百", "工具理性", "盟友运营"],
        analysis: "千空是 Ti 放大镜：一切先问原理，再用 Te 把文明流水线搭起来，五号享受知识本身。\n\n若你接近此塑，你相信科学能回答大多数问题，也愿为「有趣」熬夜。风险是低估情感政治。漫画后半他学会靠同盟——纯脑力也要会分活。",
        parallels: "适合硬核科普、技术创业。你需要「司」一样的执行官。",
      },
      {
        id: "near",
        name: "Near（Nate River）",
        dynasty: "《死亡笔记》",
        enneagram: "5w4",
        title: "拼图桌上的继承者",
        weights: { Ti: 1.4, Ni: 1.2, Ne: 0.9, Fe: 0.3 },
        traits: ["冷静拆解", "玩具思维", "继承焦虑", "道德灰度"],
        analysis: "Near 以 Ti 拼出真相结构，姿态比 L 更「白房间」，四翼带来疏离自我感。\n\n若你接近此塑，你能在继承他人遗产时仍走出自己的解法。你可能显得无温度。正义若只剩胜负，玩具积木也会变成冷兵器——保留一点对「为何而赢」的追问。",
        parallels: "适合分析、继承型课题攻坚。",
      },
      {
        id: "okabe",
        name: "冈部伦太郎",
        dynasty: "《命运石之门》",
        enneagram: "5w6",
        title: "中二壳下的选择焦虑者",
        weights: { Ne: 1.3, Ti: 1.2, Fi: 1.1, Ni: 1.0 },
        traits: ["假设爆炸", "责任觉醒", "表演自保", "时间线创伤"],
        analysis: "冈部前期用 Ne 中二戏伪装，后期被选择压出 Fi/Ni 的重量，五号用角色扮演省力。\n\n若你接近此塑，你怕认真后无可挽回，于是先装疯。真正的成长是承认「狂气」是壳，选择才是核。给自己可逆的小实验，再面对不可逆的大决定。",
        parallels: "适合叙事驱动的创作与团队里的「假设发动机」。",
      },
    ],
    ENTJ: [
      {
        id: "light",
        name: "夜神月",
        dynasty: "《死亡笔记》",
        enneagram: "3w4",
        title: "新世界的独断神裁",
        weights: { Te: 1.5, Ni: 1.3, Fi: 0.7, Se: 0.6 },
        traits: ["目标极化", "演技控制", "效率审判", "孤独神性"],
        analysis: "月以 Te-Ni 推进「完美世界」，三号要成为被看见的神，四翼强化特殊使命感。\n\n若你接近此塑，你对不公易生清理冲动，且执行力惊人。漫鉴必须尖锐：把人简化成可删除条目时，你已离开正义。用制度与程序约束你的效率，而不是笔记。",
        parallels: "适合战略推进，但需强伦理刹车。",
      },
      {
        id: "lelouch",
        name: "鲁路修·兰佩路基",
        dynasty: "《反叛的鲁路修》",
        enneagram: "8w9",
        title: "假面下的零式革命",
        weights: { Te: 1.4, Ni: 1.4, Fe: 0.9, Fi: 1.0 },
        traits: ["棋手叙事", "面具领导", "为亲情赌国", "结局自裁"],
        analysis: "鲁路修用 Ni-Te 下棋，八号要夺回掌控，同时为妹妹留下温柔可能。\n\n若你接近此塑，你擅长当「必要之恶」的黑锅英雄。风险是计划绑架所有关系。零之镇魂曲的启示是：胜利方案里要写下自己的退场，而不是永远霸零。",
        parallels: "适合变革型领导与复杂剧情策划。",
      },
      {
        id: "roy",
        name: "罗伊·马斯坦古",
        dynasty: "《钢之炼金术师》",
        enneagram: "8w7",
        title: "焰之炼金术师的晋升之路",
        weights: { Te: 1.4, Ni: 1.1, Se: 1.0, Fi: 0.9 },
        traits: ["野心改革", "团队护短", "战争创伤", "火与责任"],
        analysis: "罗伊要当大总统以改军部，Te 明确，八号要掌控以保护下属，伊休瓦尔成为其阴影。\n\n若你接近此塑，你有野心但并非空谈，肯为队里人两肋插刀。注意野心与忏悔的平衡：升上去是为了少制造伊休瓦尔，而不是更会点火。",
        parallels: "适合组织改革与小队领导。",
      },
    ],
    ENTP: [
      {
        id: "howl",
        name: "哈尔",
        dynasty: "《哈尔的移动城堡》",
        enneagram: "7w6",
        title: "移动城堡里的美丽逃兵",
        weights: { Ne: 1.4, Fi: 1.2, Fe: 1.0, Si: 0.5 },
        traits: ["多身份", "怕承诺", "浪漫勇气", "心脏隐喻"],
        analysis: "哈尔用 Ne 换心换脸逃避命运，七号怕痛，最终仍选择留下。\n\n若你接近此塑，你才华横溢却恐惧被定义。苏菲式的人会逼你落地。把「逃跑能量」改成「重建城堡」，比永远漂泊更像成年魔法。",
        parallels: "适合奇幻创作与多栖发展，需稳定锚点。",
      },
      {
        id: "hisoka",
        name: "西索",
        dynasty: "《全职猎人》",
        enneagram: "7w8",
        title: "以战斗为艺术的戏谑猎手",
        weights: { Ne: 1.3, Se: 1.3, Ti: 1.0, Fi: 0.6 },
        traits: ["审美杀戮", "即兴乐趣", "强者崇拜", "边界全无"],
        analysis: "西索把对手当艺术品，Ne-Se 追逐刺激，七号享乐配八翼危险。\n\n若你接近此塑（趣味层面），你追求高难度游戏与临场漂亮。现实里必须把「猎奇」关在虚构里：把同样的即兴用在竞技、表演与创意，而不是伤害。",
        parallels: "适合高刺激表演/竞技创意（守法前提）。",
      },
      {
        id: "kazuma",
        name: "佐藤和真",
        dynasty: "《为美好的世界献上祝福！》",
        enneagram: "6w7",
        title: "吐槽救世的咸鱼冒险者",
        weights: { Ne: 1.2, Ti: 1.1, Se: 1.0, Fe: 0.8 },
        traits: ["现实吐槽", "苟活智慧", "关键坑队友", "意外靠谱"],
        analysis: "和真用吐槽拆解异世界套路，六号式谨慎混七翼乐子，关键时刻又能赌一把。\n\n若你接近此塑，你不信热血空喊，却常被卷成主力。承认自己「想躺平也有底线」，比假装勇者更可持续。",
        parallels: "适合团队里的现实校正器与喜剧担当。",
      },
    ],
    INFJ: [
      {
        id: "armin",
        name: "阿尔敏·阿诺德",
        dynasty: "《进击的巨人》",
        enneagram: "6w5",
        title: "用叙事说服世界的策略少年",
        weights: { Ni: 1.4, Fe: 1.3, Ti: 1.0, Se: 0.5 },
        traits: ["推演演说", "自我怀疑", "道德负担", "以智代力"],
        analysis: "阿尔敏以 Ni-Fe 看见可能性并用语言动员，六号常自我质疑。\n\n若你接近此塑，你怕自己无用，却常在关键谈判里救人。把怀疑变成检查清单，而不是自我否定，你的智就能稳定输出。",
        parallels: "适合策略、外交、叙事说服。",
      },
      {
        id: "violet",
        name: "薇尔莉特·伊芙加登",
        dynasty: "《紫罗兰永恒花园》",
        enneagram: "1w2",
        title: "把「爱」练成文字的自动人偶",
        weights: { Ni: 1.2, Fe: 1.3, Si: 1.1, Fi: 1.2 },
        traits: ["使命转译", "情感学习", "信件修行", "战争阴影"],
        analysis: "薇尔莉特从兵器变成代笔，Ni/Fe/Fi 学习人类情感，一号要把事情做对。\n\n若你接近此塑，你通过服务他人学会感受自己。风险是只活在他人的信里。也写一封给自己的信：你配被理解。",
        parallels: "适合咨询、写作、精细服务。",
      },
      {
        id: "homura",
        name: "晓美焰",
        dynasty: "《魔法少女小圆》",
        enneagram: "6w5",
        title: "时间回廊里的守护偏执",
        weights: { Ni: 1.5, Fi: 1.3, Te: 0.9, Se: 0.5 },
        traits: ["循环执念", "孤独作战", "改写命运", "爱的极端"],
        analysis: "焰以 Ni 看见悲剧结构，用时间魔法反复改写，六号焦虑驱动极端保护。\n\n若你接近此塑，你愿为一人对抗世界规则。风险是守护变成控制。允许小圆自己选择，才是跳出轮回的关键——也适用于现实关系。",
        parallels: "适合长期单点突破项目；关系上需学习放手。",
      },
    ],
    INFP: [
      {
        id: "nezuko",
        name: "灶门祢豆子",
        dynasty: "《鬼灭之刃》",
        enneagram: "9w1",
        title: "血鬼术下的温柔坚持",
        weights: { Fi: 1.4, Si: 1.2, Se: 0.9, Fe: 1.0 },
        traits: ["非暴力约束", "亲情核心", "沉睡与爆发", "人性守护"],
        analysis: "祢豆子以 Fi 守住「不伤人」的誓，九号求和谐却能在关键时刻爆开。\n\n若你接近此塑，你外表安分，原则处极硬。用竹筒（规则）保护自己的善良，比只靠意志更可靠。",
        parallels: "适合需要底线感的照护与创作。",
      },
      {
        id: "hinata",
        name: "日向雏田",
        dynasty: "《火影忍者》",
        enneagram: "9w1",
        title: "从胆怯走向告白的忍者",
        weights: { Fi: 1.4, Fe: 1.1, Si: 1.0, Se: 0.8 },
        traits: ["低自尊起步", "默默修炼", "温柔坚定", "支持型英雄"],
        analysis: "雏田 Fi 内向、九号回避冲突，却在修罗场学会为在乎的人站前排。\n\n若你接近此塑，你成长曲线慢而真。别等「配得上」才开始；柔拳的力量来自持续出拳。",
        parallels: "适合辅助核心与后期发力的角色。",
      },
      {
        id: "chihiro",
        name: "荻野千寻",
        dynasty: "《千与千寻》",
        enneagram: "9w1",
        title: "名字被夺后仍劳动的女孩",
        weights: { Fi: 1.3, Si: 1.2, Se: 1.0, Fe: 1.1 },
        traits: ["适应异界", "诚实劳动", "记住名字", "勇气渐长"],
        analysis: "千寻用具体劳动（Si/Se）在神灵世界站稳，Fi 保持自己，九号从被动变主动。\n\n若你接近此塑，巨大变迁里你靠做事找回名字。记住：帮忙不是讨好，是主体性。",
        parallels: "适合过渡期成长叙事与服务学习。",
      },
    ],
    ENFJ: [
      {
        id: "allmight",
        name: "欧尔麦特",
        dynasty: "《我的英雄学院》",
        enneagram: "2w3",
        title: "「我来啦」的象征英雄",
        weights: { Fe: 1.5, Se: 1.1, Ni: 1.0, Te: 0.8 },
        traits: ["象征担当", "笑容义务", "传承压力", "身体透支"],
        analysis: "欧尔麦特以 Fe 成为社会安心感本身，二号被需要，三翼要维持最强形象。\n\n若你接近此塑，你习惯把安全感借给所有人。风险是微笑到崩溃。真正的「我来啦」包括培养下一个我来啦。",
        parallels: "适合精神领袖与公开担当，需交接计划。",
      },
      {
        id: "kakashi",
        name: "旗木卡卡西",
        dynasty: "《火影忍者》",
        enneagram: "9w1",
        title: "看透一切的慵懒教官",
        weights: { Fe: 1.2, Ti: 1.1, Ni: 1.1, Si: 1.0 },
        traits: ["带队艺术", "过去创伤", "表面摆烂", "关键靠谱"],
        analysis: "卡卡西用半死不活的 Fe/Ti 带队，九号淡然下是任务必达。\n\n若你接近此塑，你不抢戏却能校正小队。允许自己被学生看见软弱，教学会更完整。",
        parallels: "适合导师、教练、中层带队。",
      },
      {
        id: "makoto",
        name: "橘真琴",
        dynasty: "《Free!》",
        enneagram: "2w1",
        title: "把同伴拉回泳池的主将",
        weights: { Fe: 1.4, Si: 1.1, Se: 1.0, Fi: 1.0 },
        traits: ["团队粘合", "情绪劳动", "游泳纪律", "重逢驱动"],
        analysis: "真琴常做关系枢纽，二号担心大家散掉。\n\n若你接近此塑，你是队里的水线。也要游自己的道：关怀若失去边界，会变成焦虑。",
        parallels: "适合社团领导与协调。",
      },
    ],
    ENFP: [
      {
        id: "naruto",
        name: "漩涡鸣人",
        dynasty: "《火影忍者》",
        enneagram: "7w8",
        title: "要成为火影的吵闹旋涡",
        weights: { Ne: 1.4, Fi: 1.3, Se: 1.0, Fe: 1.1 },
        traits: ["认可渴求", "嘴遁感召", "永不放弃", "羁绊核心"],
        analysis: "鸣人以 Ne-Fi 把孤独炼成羁绊叙事，七号要逃离被忽视的痛，八翼敢硬刚。\n\n若你接近此塑，你用大声对抗空缺。成熟是：被承认后仍听得进别人的痛，而不是只推销自己的梦。",
        parallels: "适合鼓舞型领导与热血叙事。",
      },
      {
        id: "luffy",
        name: "蒙奇·D·路飞",
        dynasty: "《海贼王》",
        enneagram: "7w8",
        title: "要成为海贼王的自由橡皮",
        weights: { Se: 1.3, Ne: 1.3, Fi: 1.3, Te: 0.5 },
        traits: ["直觉招人", "乐天刚毅", "船员中心", "不走心机"],
        analysis: "路飞 Se/Ne/Fi：当下、可能、意气，七号乐天配八翼保护同伴。\n\n若你接近此塑，你靠磁场组队而非 KPI。风险是航行无图。伙伴里要有航海士——你负责喊方向，别人负责海图。",
        parallels: "适合创始人魅力与探险型项目。",
      },
      {
        id: "gon",
        name: "小杰",
        dynasty: "《全职猎人》",
        enneagram: "7w8",
        title: "黑暗旅途中的纯白好奇心",
        weights: { Se: 1.3, Fi: 1.3, Ne: 1.1, Ti: 0.7 },
        traits: ["直觉行动", "友情绝对", "愤怒失控", "成长撕裂"],
        analysis: "小杰的纯粹 Se-Fi 在猎人世界既是光也是刃，七号好奇遇八翼暴怒。\n\n若你接近此塑，你的真诚能融化人，也能灼伤自己。给纯粹配上「停损线」，才是真正的变强。",
        parallels: "适合先驱探索；需情绪教练。",
      },
    ],
    ISTJ: [
      {
        id: "mikasa",
        name: "三笠·阿克曼",
        dynasty: "《进击的巨人》",
        enneagram: "6w5",
        title: "刀尖上的守护机器",
        weights: { Si: 1.2, Se: 1.3, Fi: 1.2, Te: 1.0 },
        traits: ["保护执念", "战斗本能", "情感收敛", "归属焦虑"],
        analysis: "三笠以战斗效率守护重要之人，六号恐惧失去。\n\n若你接近此塑，你把爱表现成「我挡住」。学会在没有敌人的日子里也建立自我，守护才不会变成唯一身份。",
        parallels: "适合高可靠执行与护卫型岗位。",
      },
      {
        id: "shikamaru_istj",
        name: "奈良鹿丸",
        dynasty: "《火影忍者》",
        enneagram: "9w1",
        title: "嫌麻烦却布好全局的军师",
        weights: { Ti: 1.2, Te: 1.2, Ni: 1.1, Si: 1.0 },
        traits: ["嫌麻烦", "阴影之术", "关键靠谱", "中年感"],
        analysis: "鹿丸口头九号躺平，实则 Te/Ti 把战局算完。\n\n若你接近此塑，你节能但关键时刻最清醒。接受「被需要」不等于失去自由，反而证明你的棋盘有价值。",
        parallels: "适合策略参谋与项目管理。",
      },
      {
        id: "sebastian",
        name: "塞巴斯蒂安",
        dynasty: "《黑执事》",
        enneagram: "3w2",
        title: "完美到恶魔的执事协议",
        weights: { Te: 1.3, Si: 1.3, Fe: 1.0, Ni: 0.8 },
        traits: ["完美服务", "契约精神", "优雅高效", "危险底色"],
        analysis: "塞巴斯蒂安用 Si-Te 把服务做到恐怖的精确，三号要完美履约。\n\n若你接近此塑，你以专业自尊活着。注意契约对象是否值得你的完美——否则优雅只是华丽的枷锁。",
        parallels: "适合高端服务与执行美学。",
      },
    ],
    ISFJ: [
      {
        id: "tanjiro",
        name: "灶门炭治郎",
        dynasty: "《鬼灭之刃》",
        enneagram: "2w1",
        title: "嗅觉导向的温柔剑士",
        weights: { Fe: 1.4, Si: 1.2, Fi: 1.2, Se: 1.0 },
        traits: ["共情敌人", "家庭责任", "勤奋修炼", "鼻息感知"],
        analysis: "炭治郎 Fe/Fi 共情极强，二号要救，一翼守正。\n\n若你接近此塑，你连敌人的苦都想理解。保护好边界，否则鼻子闻到的全是别人的伤。",
        parallels: "适合照护型领导与热血中的温柔核心。",
      },
      {
        id: "sakura_haruno",
        name: "春野樱",
        dynasty: "《火影忍者》",
        enneagram: "2w3",
        title: "从爱慕到医疗忍者的成长",
        weights: { Fe: 1.3, Te: 1.1, Si: 1.0, Fi: 1.0 },
        traits: ["情绪外放", "智力实力", "医疗担当", "自我证明"],
        analysis: "小樱从早期焦躁到医疗中坚，二号助人配三翼要强。\n\n若你接近此塑，你怕自己「只是花瓶」。用可验证的技能（医疗、分析）安放焦虑，比追逐认可更稳。",
        parallels: "适合专业成长型角色。",
      },
      {
        id: "tohru",
        name: "本田透",
        dynasty: "《水果篮子》",
        enneagram: "2w1",
        title: "帐篷里的共感吸尘器",
        weights: { Fe: 1.5, Si: 1.1, Fi: 1.2, Ne: 0.7 },
        traits: ["过度体贴", "创伤微笑", "治愈场域", "自我抹除风险"],
        analysis: "透的 Fe 能打开生肖们的壳，二号害怕不被需要。\n\n若你接近此塑，你的温柔是天赋也是伤口。允许被照顾，治愈才可循环。",
        parallels: "适合咨询氛围与家庭叙事。",
      },
    ],
    ESTJ: [
      {
        id: "bakugo",
        name: "爆豪胜己",
        dynasty: "《我的英雄学院》",
        enneagram: "8w7",
        title: "爆炸声里的第一名偏执",
        weights: { Te: 1.4, Se: 1.3, Fi: 1.0, Ni: 0.7 },
        traits: ["竞争驱动", "毒舌高压", "实力至上", "隐藏认可"],
        analysis: "爆豪 Te-Se 要赢，八号不接受屈居。\n\n若你接近此塑，你用愤怒当燃料。学会把「赢」定义成「带队也赢」，你才会从炸弹变成队长。",
        parallels: "适合竞技型突破与高标准小队。",
      },
      {
        id: "yamamoto",
        name: "山本元柳斋",
        dynasty: "《死神》",
        enneagram: "1w2",
        title: "火焰将军的秩序与温情",
        weights: { Te: 1.3, Si: 1.2, Fe: 1.1, Fi: 0.9 },
        traits: ["队长权威", "护短", "传统责任", "决断力"],
        analysis: "山本以绝对实力维持尸魂界秩序，一号责任沉重。\n\n若你接近此塑，你是最后防火墙。注意传统是否压住年轻人的路——真正的队长会留出继承的火种。",
        parallels: "适合老将型管理。",
      },
      {
        id: "erza",
        name: "艾尔莎·斯卡雷特",
        dynasty: "《妖精的尾巴》",
        enneagram: "1w2",
        title: "换装剑士的铁律温柔",
        weights: { Te: 1.3, Se: 1.2, Fi: 1.1, Fe: 1.0 },
        traits: ["纪律严明", "换装战术", "公会忠诚", "过去创伤"],
        analysis: "艾尔莎用纪律与换装战斗守护公会，一号要正确，二翼要护人。\n\n若你接近此塑，你外表铠甲、内心柔软。铠甲可以卸在信任的人面前，否则永远只是 S 级任务机器。",
        parallels: "适合纪律型核心输出。",
      },
    ],
    ESFJ: [
      {
        id: "usagi",
        name: "月野兔",
        dynasty: "《美少女战士》",
        enneagram: "2w3",
        title: "哭着也要爱的月之公主",
        weights: { Fe: 1.5, Se: 1.1, Fi: 1.2, Ne: 0.9 },
        traits: ["共感爆棚", "迟到迷糊", "爱的感召", "领袖成长"],
        analysis: "兔兔以 Fe 凝聚战士，二号要爱与被爱。\n\n若你接近此塑，你的眼泪是连接器。成长是哭完仍举起权杖，而不是假装不脆弱。",
        parallels: "适合魅力型团队核心。",
      },
      {
        id: "ochaco",
        name: "丽日御茶子",
        dynasty: "《我的英雄学院》",
        enneagram: "2w3",
        title: "想让家人微笑的英雄",
        weights: { Fe: 1.3, Fi: 1.2, Se: 1.0, Te: 0.8 },
        traits: ["务实动机", "为他人加油", "重力英雄", "情感真挚"],
        analysis: "御茶子的英雄梦连着家庭与同伴，二/三号混合。\n\n若你接近此塑，你的动机很具体。具体不可耻；把零用钱梦想写进更大的正义里，你会更稳。",
        parallels: "适合务实理想主义角色。",
      },
      {
        id: "nami",
        name: "娜美",
        dynasty: "《海贼王》",
        enneagram: "6w7",
        title: "气象与航海的理性舵手",
        weights: { Te: 1.2, Si: 1.1, Se: 1.1, Fi: 1.1 },
        traits: ["地图理性", "金钱现实", "信任难题", "关键导航"],
        analysis: "娜美用航海术与现实算计保护自己与同伴，六号要确定。\n\n若你接近此塑，你先求生存再谈梦想。当船变成家，你的地图就从逃跑变成出航。",
        parallels: "适合运营、导航、资源管理。",
      },
    ],
    ISTP: [
      {
        id: "levi",
        name: "利威尔·阿克曼",
        dynasty: "《进击的巨人》",
        enneagram: "5w6",
        title: "人类最强的清洁杀手",
        weights: { Ti: 1.3, Se: 1.5, Ni: 0.8, Fe: 0.4 },
        traits: ["极致效率", "洁癖", "寡言守护", "战场直觉"],
        analysis: "利威尔 Se-Ti 把战斗变成最短路径，五号节能社交。\n\n若你接近此塑，你用结果说话，嫌恶无效会议。关心可以是丢出清扫工具：行动即温柔。",
        parallels: "适合特种执行与效率专家。",
      },
      {
        id: "zoro",
        name: "罗罗诺亚·索隆",
        dynasty: "《海贼王》",
        enneagram: "8w9",
        title: "迷路的三刀流剑士",
        weights: { Se: 1.4, Ti: 1.1, Fi: 1.0, Ni: 0.7 },
        traits: ["方向差", "武人誓言", "睡眠储备", "为主公砍路"],
        analysis: "索隆 Se 武人，八号要强到能兑现承诺。\n\n若你接近此塑，你方向可以歪，承诺不能歪。找个航海士，你的剑会更有意义。",
        parallels: "适合专精型高手。",
      },
      {
        id: "spike",
        name: "斯派克·斯皮格尔",
        dynasty: "《星际牛仔》",
        enneagram: "9w8",
        title: "贝博普上的倦怠枪手",
        weights: { Se: 1.4, Ti: 1.2, Ni: 1.0, Fi: 0.9 },
        traits: ["即兴枪战", "过去纠缠", "酷感疏离", "存在主义"],
        analysis: "斯派克用 Se 打斗，九号倦怠下藏着未了的过去。\n\n若你接近此塑，你看起来随性，其实在等一个不得不面对的圆环。别把活着过成反复重播的爵士——有时要结束曲子。",
        parallels: "适合风格化行动角色。",
      },
    ],
    ISFP: [
      {
        id: "giyu",
        name: "富冈义勇",
        dynasty: "《鬼灭之刃》",
        enneagram: "4w5",
        title: "话很少的水柱",
        weights: { Fi: 1.4, Se: 1.2, Ni: 1.0, Te: 0.6 },
        traits: ["不善言辞", "内在准则", "孤独责任", "水面下的情"],
        analysis: "义勇 Fi 深、表达少，四号疏离。\n\n若你接近此塑，你的关心常被误会成冷漠。找一个能翻译你沉默的人，柱也会不那么冷。",
        parallels: "适合沉默可靠的专业者。",
      },
      {
        id: "asuna",
        name: "亚丝娜",
        dynasty: "《刀剑神域》",
        enneagram: "1w2",
        title: "闪烁之光的副团长",
        weights: { Fi: 1.2, Se: 1.2, Te: 1.1, Fe: 1.0 },
        traits: ["强者自尊", "生活感", "伴侣羁绊", "战斗优雅"],
        analysis: "亚丝娜在游戏里既是剑士也是「日常」的坚持者。\n\n若你接近此塑，你要强也要生活。副本之外的面包香气，是你战斗的意义。",
        parallels: "适合攻略型伙伴核心。",
      },
      {
        id: "shoto",
        name: "轰焦冻",
        dynasty: "《我的英雄学院》",
        enneagram: "1w9",
        title: "半边冰火的自我和解",
        weights: { Fi: 1.3, Te: 1.1, Se: 1.1, Si: 1.0 },
        traits: ["家庭创伤", "力量认同", "冷静外表", "逐渐开口"],
        analysis: "轰的故事是 Fi 从拒绝血缘到整合自己。\n\n若你接近此塑，你可能用「只用一半」抗议不公。完整的你比正确的恨更强大。",
        parallels: "适合从创伤走向整合的叙事。",
      },
    ],
    ESTP: [
      {
        id: "goku",
        name: "孙悟空",
        dynasty: "《龙珠》",
        enneagram: "7w8",
        title: "为变强而活的战斗乐天派",
        weights: { Se: 1.5, Ti: 0.9, Fi: 1.0, Ne: 0.8 },
        traits: ["战斗愉悦", "极限突破", "单纯动机", "地球守护者"],
        analysis: "悟空 Se 享乐式战斗，七号要下一场更强的对手。\n\n若你接近此塑，过程比奖杯重要。记得回家吃顿饭——地球不是只有精神时光屋。",
        parallels: "适合竞技与突破型人生。",
      },
      {
        id: "edward",
        name: "爱德华·艾尔里克",
        dynasty: "《钢之炼金术师》",
        enneagram: "8w7",
        title: "等价交换的矮个子炼金术师",
        weights: { Se: 1.2, Te: 1.2, Fi: 1.2, Ti: 1.1 },
        traits: ["行动力", "怒点低", "科学伦理", "兄弟羁绊"],
        analysis: "艾德用行动赎罪与求索，八号要掌控结果。\n\n若你接近此塑，你踩身高雷却有真本事。等价交换提醒：快捷径的账会连本带利回来。",
        parallels: "适合行动派研究与伦理冒险。",
      },
      {
        id: "killua",
        name: "奇犽·邹迪克",
        dynasty: "《全职猎人》",
        enneagram: "6w7",
        title: "刺客家的自由电击少年",
        weights: { Ti: 1.2, Se: 1.3, Fi: 1.1, Ne: 0.9 },
        traits: ["冷静技术", "友情救赎", "家庭阴影", "自我选择"],
        analysis: "奇犽从杀手训练里长出 Freestyle 的自我，六号恐惧与七翼玩心并存。\n\n若你接近此塑，友情是你的脱壳剂。选择和谁组队，比血统技能树更重要。",
        parallels: "适合技术型伙伴角色。",
      },
    ],
    ESFP: [
      {
        id: "marin",
        name: "喜多川海梦",
        dynasty: "《更衣人偶坠入爱河》",
        enneagram: "7w6",
        title: "Cos 快乐的传播者",
        weights: { Se: 1.4, Fe: 1.3, Fi: 1.1, Ne: 1.0 },
        traits: ["趣味感召", "尊重手艺", "社交大胆", "真诚夸赞"],
        analysis: "海梦用 Se-Fe 把热爱变成一起玩的邀请，七号快乐可传染。\n\n若你接近此塑，你能让社恐也想上妆。记住夸赞要具体——你已经很会了。",
        parallels: "适合社群氛围与同好文化。",
      },
      {
        id: "power",
        name: "帕瓦",
        dynasty: "《电锯人》",
        enneagram: "7w8",
        title: "血之魔的自我中心活物",
        weights: { Se: 1.5, Fi: 1.2, Ne: 0.9, Fe: 0.5 },
        traits: ["即时欲望", "混乱可爱", "扭曲成长", "同伴意外"],
        analysis: "帕瓦是夸张的 Se/Fi 欲望体，七号要爽。\n\n若你接近此塑（喜剧层面），你的直接有时是氧气。学一点「别人也有血」的共情，魔也可以有点人味。",
        parallels: "适合喜剧混乱输出（需现实边界）。",
      },
      {
        id: "shinobu_esfp",
        name: "胡蝶忍",
        dynasty: "《鬼灭之刃》",
        enneagram: "3w2",
        title: "笑颜下的毒杀剑士",
        weights: { Fe: 1.3, Ti: 1.2, Se: 1.0, Fi: 1.1 },
        traits: ["微笑面具", "智力战斗", "复仇与温柔", "虫柱职责"],
        analysis: "忍以笑容承载 Fe 社交与剧毒 Ti，三号维持形象。\n\n若你接近此塑，你善于用得体掩盖锋刃。允许信任的人看见不笑的你，毒也会少侵蚀自己。",
        parallels: "适合外柔内劲的专业角色。",
      },
    ],
  };

  const SCALE_LABELS = ["非常不像我", "不太像我", "说不准", "比较像我", "非常像我"];
  const STACK_WEIGHTS = [4, 3, 2, 1];

  const QUESTIONS = [
    { id: "a01", kind: "fn", function: "Te", text: "面对混乱局面，我更想马上定目标、分工和截止时间。" },
    { id: "a02", kind: "fn", function: "Te", text: "我常用「有没有结果」来判断一件事值不值得继续。" },
    { id: "a03", kind: "fn", function: "Te", text: "规则清晰、赏罚分明的环境，让我更有安全感。" },
    { id: "a04", kind: "fn", function: "Ti", text: "我会花时间把概念定义清楚，哪怕别人觉得太较真。" },
    { id: "a05", kind: "fn", function: "Ti", text: "发现逻辑矛盾时，我很难假装没看见。" },
    { id: "a06", kind: "fn", function: "Ti", text: "比起立刻表态，我更想先在心里把道理想通。" },
    { id: "a07", kind: "fn", function: "Fe", text: "我很容易察觉场合气氛，并调整自己的表达。" },
    { id: "a08", kind: "fn", function: "Fe", text: "维护群体和谐，有时比坚持我的个人判断更优先。" },
    { id: "a09", kind: "fn", function: "Fe", text: "别人的认可与关系质量，会明显影响我的状态。" },
    { id: "a10", kind: "fn", function: "Fi", text: "即使吃亏，我也不愿做违背内心原则的事。" },
    { id: "a11", kind: "fn", function: "Fi", text: "我需要独处，才能分辨什么是「我真正在乎的」。" },
    { id: "a12", kind: "fn", function: "Fi", text: "我对虚伪与套话过敏，宁愿少说。" },
    { id: "a13", kind: "fn", function: "Se", text: "现场变化来时，我常常能迅速上手应对。" },
    { id: "a14", kind: "fn", function: "Se", text: "即时体验（声色、行动、现场）对我很有吸引力。" },
    { id: "a15", kind: "fn", function: "Se", text: "我更信「先做起来」，而不是把计划写到完美。" },
    { id: "a16", kind: "fn", function: "Si", text: "过往经验与惯例，是我做新决定时的重要参照。" },
    { id: "a17", kind: "fn", function: "Si", text: "我重视稳定节奏，突然大变会让我耗能。" },
    { id: "a18", kind: "fn", function: "Si", text: "细节（日期、步骤、旧例）我往往记得比别人清。" },
    { id: "a19", kind: "fn", function: "Ne", text: "一个话题能让我联想到许多看似不相关的可能。" },
    { id: "a20", kind: "fn", function: "Ne", text: "我喜欢保留多种选项，不急着只定一条路。" },
    { id: "a21", kind: "fn", function: "Ne", text: "头脑风暴时我常常最能打开僵局。" },
    { id: "a22", kind: "fn", function: "Ni", text: "我对长期走向常有说不清但事后对得上的预感。" },
    { id: "a23", kind: "fn", function: "Ni", text: "我倾向把复杂信息收成一个核心判断。" },
    { id: "a24", kind: "fn", function: "Ni", text: "比起当下热闹，我更常想这件事最终意味着什么。" },
    { id: "ae01", kind: "ennea", ennea: 1, text: "看到不公正或敷衍，我会很难受，总想把它纠正到「应有的样子」。" },
    { id: "ae02", kind: "ennea", ennea: 2, text: "我常主动照顾别人的需要，也害怕自己变得「不被需要」。" },
    { id: "ae03", kind: "ennea", ennea: 3, text: "我很在意事情是否做出可见成果，以及别人是否承认我的能力。" },
    { id: "ae04", kind: "ennea", ennea: 4, text: "我强烈需要感到自己是独特的，情绪与意义对我至关重要。" },
    { id: "ae05", kind: "ennea", ennea: 5, text: "我倾向先观察、储备知识与精力，再决定是否投入。" },
    { id: "ae06", kind: "ennea", ennea: 6, text: "做重要决定前，我会反复确认风险、同盟与「靠不靠得住」。" },
    { id: "ae07", kind: "ennea", ennea: 7, text: "我害怕被痛苦或无聊困住，总想保持选项与新鲜感。" },
    { id: "ae08", kind: "ennea", ennea: 8, text: "我难以忍受被控制，倾向自己掌握局面并保护在乎的人。" },
    { id: "ae09", kind: "ennea", ennea: 9, text: "我本能地回避冲突，更想维持平和，有时会把自己的意愿放很后。" },
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
    return "./img/" + id + ".svg";
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
