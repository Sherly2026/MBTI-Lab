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
        id: "erwin",
        name: "艾尔文·史密斯",
        dynasty: "《进击的巨人》",
        enneagram: "1w9",
        title: "愿赌命的调查兵团长",
        weights: { Ni: 1.4, Te: 1.3, Fe: 0.9, Fi: 0.8 },
        traits: ["远景动员", "牺牲计算", "信念演说", "战略冷酷"],
        analysis: "艾尔文以 Ni 看见「墙外真相」的必要性，Te 组织敢死队；一号应当感支撑他把士兵当成抵达真理的阶梯，也因此背负道德重量。\n\n若你接近此塑，你能为远景做残酷取舍。风险是理想吞噬具体的人——把「为人类」落实为可审计的指挥伦理。",
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
        analysis: "红莉栖以 Ti/Te 坚持可重复验证，又在时间跳跃中被迫面对 Ni 式命运感，五号用专业身份自保。\n\n若你接近此塑，你先质疑再相信。学会在实验日志之外写一句人话，团队会跟你更紧。",
        parallels: "适合科研协作与硬核设定讨论。",
      },
      {
        id: "itachi",
        name: "宇智波鼬",
        dynasty: "《火影忍者》",
        enneagram: "6w5",
        title: "背负灭族的沉默棋手",
        weights: { Ni: 1.5, Te: 1.1, Fi: 1.2, Fe: 0.7 },
        traits: ["长远牺牲", "情报优势", "情感压抑", "村之安稳"],
        analysis: "鼬以 Ni 预演最坏结局，六号为「村子」与弟弟的安全选择自我污名。\n\n若你接近此塑，你常默默扛别人看不见的账。漫鉴提醒：牺牲若无法被理解，也要留给信任你的人一条解释的路。",
        parallels: "适合需要隐忍布局的幕后角色。",
      },
      {
        id: "frieren",
        name: "芙莉莲",
        dynasty: "《葬送的芙莉莲》",
        enneagram: "5w4",
        title: "漫长岁月里的魔法观察者",
        weights: { Ni: 1.3, Ti: 1.2, Fi: 1.1, Se: 0.6 },
        traits: ["时间尺度", "情感迟滞", "魔法求知", "悼亡觉醒"],
        analysis: "芙莉莲以五号抽离度过千年，四翼在同伴逝后唤醒「意义迟到」的痛。\n\n若你接近此塑，你的成长曲线很长。现在开始认真对待身边人，不算晚。",
        parallels: "适合长期主义学习与创作。",
      },
      {
        id: "ciel",
        name: "夏尔·凡多姆海恩",
        dynasty: "《黑执事》",
        enneagram: "3w4",
        title: "契约驱动的少年当家",
        weights: { Ni: 1.2, Te: 1.4, Fi: 1.0, Se: 0.7 },
        traits: ["目标复仇", "贵族演技", "控制欲", "契约代价"],
        analysis: "夏尔用 Te 经营名利场，三号要赢回被夺走的一切，四翼强调「唯我独有的复仇」。\n\n若你接近此塑，你能把屈辱炼成燃料。注意：契约式成功可能买空童年。",
        parallels: "适合早慧的经营者与策划者。",
      },
      {
        id: "kaiba",
        name: "海马濑人",
        dynasty: "《游戏王》",
        enneagram: "8w7",
        title: "决斗王国的霸权建筑师",
        weights: { Te: 1.4, Ni: 1.2, Se: 1.0, Fi: 0.8 },
        traits: ["胜负偏执", "科技帝国", "手足阴影", "高傲保护"],
        analysis: "海马以八号强度与 Te 把游戏变成帝国语言。\n\n若你接近此塑，你用胜利证明存在。留下一个不是对手的软着陆点，帝国才不会只剩回声。",
        parallels: "适合竞争型创业与高标准团队。",
      }
    ],
    INTP: [
      {
        id: "l_lawliet",
        name: "L（Death Note）",
        dynasty: "《死亡笔记》",
        enneagram: "5w6",
        title: "用推理给世界称重的侦探",
        weights: { Ti: 1.5, Ne: 1.2, Ni: 1.1, Fe: 0.4 },
        traits: ["信息优势", "非常规习惯", "冷感外壳", "正义算法"],
        analysis: "L 在社群中常被归为 INTP：Ti 主导的推理链 + Ne 非常规假设，五号以智力优势降低不确定，社交节能到蹲糖的程度。\n\n若你接近此塑，你对「表面正义」不买账，更信可检验的链条。风险是把人完全变量化。",
        parallels: "适合调查、风控、复杂问题拆解。",
      },
      {
        id: "killua",
        name: "奇犽·邹迪克",
        dynasty: "《全职猎人》",
        enneagram: "6w5",
        title: "刺客家的理性觉醒者",
        weights: { Ti: 1.4, Ne: 1.1, Se: 1.1, Fi: 1.0 },
        traits: ["冷静分析", "友情脱壳", "家庭阴影", "自我选择"],
        analysis: "奇犽常被读作 INTP：杀手训练下的 Ti 拆解战斗，Ne 寻找非家族脚本的人生；六号对同盟（小杰）与威胁高度敏感，五翼用观察与技术自保。\n\n若你接近此塑，友情是你的脱壳剂。选择和谁组队，比血统技能树更重要。",
        parallels: "适合技术型伙伴与自我重构者。",
      },
      {
        id: "senku",
        name: "石神千空",
        dynasty: "《Dr.STONE》",
        enneagram: "5w6",
        title: "用科学重启文明的少年",
        weights: { Ti: 1.5, Ne: 1.2, Te: 1.1, Fe: 0.6 },
        traits: ["原理优先", "十亿百分百", "工具理性", "盟友运营"],
        analysis: "千空是 Ti 放大镜：一切先问原理，再用工程把文明搭起来，五号享受知识本身。\n\n若你接近此塑，你相信科学能回答大多数问题。风险是低估情感政治——纯脑力也要会分活。",
        parallels: "适合硬核科普、技术创业。",
      },
      {
        id: "near",
        name: "Near（Nate River）",
        dynasty: "《死亡笔记》",
        enneagram: "5w4",
        title: "拼图桌上的继承者",
        weights: { Ti: 1.4, Ni: 1.2, Ne: 0.9, Fe: 0.3 },
        traits: ["冷静拆解", "玩具思维", "继承焦虑", "道德灰度"],
        analysis: "Near 以 Ti 拼出真相结构，四翼带来疏离自我感。\n\n若你接近此塑，你能在继承他人遗产时仍走出自己的解法。保留对「为何而赢」的追问。",
        parallels: "适合分析、继承型课题攻坚。",
      },
      {
        id: "shikamaru",
        name: "奈良鹿丸",
        dynasty: "《火影忍者》",
        enneagram: "9w8",
        title: "懒洋洋的天才军师",
        weights: { Ti: 1.3, Ne: 1.2, Ni: 1.1, Fe: 0.7 },
        traits: ["麻烦厌恶", "局势推演", "关键决断", "同伴责任"],
        analysis: "鹿丸常被归为 INTP：嫌麻烦的外壳下是 Ti-Ne 推演；九号回避无谓冲突，八翼在守护同伴时忽然硬起来。\n\n若你接近此塑，你不是真懒，只是拒绝低质量消耗。真正的课题来临时，你会比谁都清醒。",
        parallels: "适合战略参谋与节能型高手。",
      },
      {
        id: "shinichi",
        name: "工藤新一",
        dynasty: "《名侦探柯南》",
        enneagram: "5w6",
        title: "真相至上的高中侦探",
        weights: { Ti: 1.4, Ne: 1.2, Si: 0.9, Fe: 0.7 },
        traits: ["推理狂热", "正义执着", "身体限制", "双线身份"],
        analysis: "新一以 Ti-Ne 拆案，五号囤积线索与体能受限下的观察优势。\n\n若你接近此塑，真相对你几乎有道德重量。记得：推理之外，也要让在乎你的人看见你还活着。",
        parallels: "适合侦探式学习与问题解决。",
      }
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
        analysis: "月以 Te-Ni 推进「完美世界」，三号要成为被看见的神。\n\n若你接近此塑，你对不公易生清理冲动。漫鉴尖锐：把人简化成可删除条目时，你已离开正义。",
        parallels: "适合战略推进，但需强伦理刹车。",
      },
      {
        id: "lelouch",
        name: "鲁路修·兰佩路基",
        dynasty: "《反叛的鲁路修》",
        enneagram: "8w9",
        title: "假面下的革命棋手",
        weights: { Te: 1.4, Ni: 1.4, Fi: 1.0, Se: 0.7 },
        traits: ["棋局思维", "双面人生", "为妹而战", "结局豪赌"],
        analysis: "鲁路修用 Ni-Te 布局整盘棋，八号要夺回被夺走的主动权，九翼在面具后维持表面和平。\n\n若你接近此塑，你能为所爱掀桌。问自己：胜利后的世界谁来住。",
        parallels: "适合变革型领导与叙事策划。",
      },
      {
        id: "roy",
        name: "罗伊·马斯坦古",
        dynasty: "《钢之炼金术师》",
        enneagram: "8w7",
        title: "火焰驱动的进阶军官",
        weights: { Te: 1.4, Ni: 1.2, Se: 1.1, Fi: 0.9 },
        traits: ["晋升野心", "团队护短", "战争悔罪", "魅力统御"],
        analysis: "罗伊以 Te 追求改体制的位置，八号保护部下，七翼带火与幽默。\n\n若你接近此塑，你的野心最好绑在「少死人」上。",
        parallels: "适合有理想的组织攀登者。",
      },
      {
        id: "askeladd",
        name: "阿斯兰德",
        dynasty: "《冰海战记》",
        enneagram: "8w9",
        title: "实用主义的佣兵王",
        weights: { Te: 1.3, Ni: 1.3, Se: 1.0, Fi: 0.8 },
        traits: ["冷酷算计", "故事操控", "父子镜像", "秩序野心"],
        analysis: "阿斯兰德用故事与暴力同时下棋，八号掌控，九翼可伪装成随和。\n\n若你接近此塑，你擅长看穿人们需要听什么。别只留下可恨的聪明。",
        parallels: "适合复杂局面的务实操盘。",
      },
      {
        id: "azula",
        name: "阿祖拉",
        dynasty: "《降世神通》",
        enneagram: "3w4",
        title: "完美恐惧的火焰公主",
        weights: { Te: 1.4, Ni: 1.2, Se: 1.1, Fi: 0.5 },
        traits: ["完美表演", "恐惧统治", "认同渴求", "失控崩溃"],
        analysis: "阿祖拉以三号维持「完美女儿」形象，Te 执行恐怖效率。\n\n若你接近此塑，你怕被看见裂缝。真正的力量是允许不完美仍被选择。",
        parallels: "适合高标准执行者（需情感支持）。",
      },
      {
        id: "satsuki",
        name: "鬼龙院里",
        dynasty: "《斩服少女》",
        enneagram: "8w7",
        title: "制服秩序的学生会帝王",
        weights: { Te: 1.5, Ni: 1.2, Se: 1.0, Fi: 0.8 },
        traits: ["绝对统御", "审美暴力", "父权反抗", "姐妹张力"],
        analysis: "里以 Te 把校园建成帝国，八号不接受被定义。\n\n若你接近此塑，你能把意志做成制度。制度也要给人出口。",
        parallels: "适合强势组织建设。",
      }
    ],
    ENTP: [
      {
        id: "howl",
        name: "哈尔",
        dynasty: "《哈尔的移动城堡》",
        enneagram: "7w6",
        title: "逃避心脏的魔法浪子",
        weights: { Ne: 1.4, Ti: 1.1, Fe: 1.0, Si: 0.5 },
        traits: ["魅力逃兵", "多种面具", "责任迟到", "爱情锚定"],
        analysis: "哈尔用 Ne 换皮囊与住所，七号躲开承诺的重量。\n\n若你接近此塑，你怕被定死在一种身份。留下愿意等你回来的人，比再换一扇门重要。",
        parallels: "适合创意游牧与关系成长课题。",
      },
      {
        id: "hisoka",
        name: "西索",
        dynasty: "《全职猎人》",
        enneagram: "7w8",
        title: "以战斗为艺术的戏谑猎人",
        weights: { Ne: 1.3, Ti: 1.2, Se: 1.2, Fi: 0.7 },
        traits: ["趣味狩猎", "规则戏弄", "强度追求", "危险魅力"],
        analysis: "西索把人与战斗当成 Ne 玩具，七号要刺激，八翼要压倒。\n\n若你接近此塑（趣味层面），你讨厌无聊规则。别把人的痛当成门票。",
        parallels: "适合破格创意（需伦理边界）。",
      },
      {
        id: "kazuma",
        name: "佐藤和真",
        dynasty: "《为美好的世界献上祝福！》",
        enneagram: "6w7",
        title: "吐槽驱动的现实主义者",
        weights: { Ne: 1.2, Ti: 1.3, Si: 0.9, Fe: 0.8 },
        traits: ["风险计算", "吐槽生存", "团队粘合", "小确幸"],
        analysis: "和真用 Ti 算命，六号怕死但七翼仍往前作死。\n\n若你接近此塑，你的吐槽是防御，也是团队润滑。",
        parallels: "适合务实冒险小队的大脑。",
      },
      {
        id: "hange",
        name: "韩吉·佐耶",
        dynasty: "《进击的巨人》",
        enneagram: "7w6",
        title: "对巨人狂热的研究指挥官",
        weights: { Ne: 1.5, Ti: 1.2, Fe: 1.0, Si: 0.6 },
        traits: ["求知狂热", "实验勇气", "情绪感染", "真相执着"],
        analysis: "韩吉以 Ne 把恐惧变成研究问题，七号兴奋压过禁忌。\n\n若你接近此塑，你的好奇能带动整支队。给实验留安全阀。",
        parallels: "适合探索型研究领导。",
      },
      {
        id: "joseph",
        name: "约瑟夫·乔斯达",
        dynasty: "《JOJO的奇妙冒险》",
        enneagram: "7w8",
        title: "诡计多端的战斗乐天派",
        weights: { Ne: 1.4, Ti: 1.2, Se: 1.1, Fe: 0.9 },
        traits: ["临场诡计", "嘴炮干扰", "运气与算计", "成长弧光"],
        analysis: "约瑟夫用 Ne-Ti 把战斗变成骗局秀，七号玩，八翼硬。\n\n若你接近此塑，你擅长把绝境说成「正如计划」。记得补真本事。",
        parallels: "适合临场应变与创意对抗。",
      },
      {
        id: "izaya",
        name: "折原临也",
        dynasty: "《无头骑士异闻录》",
        enneagram: "7w8",
        title: "煽动都市的情报玩家",
        weights: { Ne: 1.5, Ti: 1.3, Fe: 0.8, Fi: 0.6 },
        traits: ["人性实验", "言语煽动", "距离感", "混乱美学"],
        analysis: "临也把城市当 Ne 棋盘，七号要有趣的人类反应。\n\n若你接近此塑，你洞察力强。别把别人的崩溃当成消遣。",
        parallels: "适合叙事反派式自我警惕。",
      }
    ],
    INFJ: [
      {
        id: "armin",
        name: "阿尔敏·阿诺德",
        dynasty: "《进击的巨人》",
        enneagram: "6w5",
        title: "以叙说打开未来的参谋",
        weights: { Ni: 1.4, Fe: 1.2, Ti: 1.1, Se: 0.5 },
        traits: ["愿景叙述", "战术头脑", "自我怀疑", "友人羁绊"],
        analysis: "阿尔敏用 Ni-Fe 把恐惧翻译成可执行希望，六号需要同盟确认。\n\n若你接近此塑，你的话能让人敢冲。先相信自己的判断一次。",
        parallels: "适合战略沟通与叙事领导。",
      },
      {
        id: "violet",
        name: "薇尔莉特·伊芙加登",
        dynasty: "《紫罗兰永恒花园》",
        enneagram: "1w2",
        title: "学习「爱」的自动人偶",
        weights: { Ni: 1.2, Fe: 1.3, Si: 1.0, Ti: 0.8 },
        traits: ["情感学习", "信件共情", "完美执行", "意义追寻"],
        analysis: "薇尔莉特以一号把「成为更好的人」做成功课，二翼在信件里付出。\n\n若你接近此塑，你的成长是缓慢而真的。允许自己不是工具。",
        parallels: "适合助人与表达类工作。",
      },
      {
        id: "shinobu",
        name: "胡蝶忍",
        dynasty: "《鬼灭之刃》",
        enneagram: "1w2",
        title: "笑颜下的毒杀剑士",
        weights: { Ni: 1.2, Fe: 1.3, Ti: 1.2, Fi: 1.0 },
        traits: ["微笑面具", "智力战斗", "复仇与温柔", "虫柱职责"],
        analysis: "忍常被归为 INFJ：Ni 洞察鬼的本质，Fe 维持可亲形象，一号把愤怒炼成精密毒药。\n\n若你接近此塑，你善于用得体掩盖锋刃。允许信任的人看见不笑的你。",
        parallels: "适合外柔内劲的专业角色。",
      },
      {
        id: "sebastian",
        name: "塞巴斯蒂安",
        dynasty: "《黑执事》",
        enneagram: "3w2",
        title: "完美执事的欲望观察者",
        weights: { Ni: 1.2, Fe: 1.2, Te: 1.1, Se: 0.9 },
        traits: ["完美服务", "优雅猎食", "契约审美", "人性玩味"],
        analysis: "塞巴斯蒂安以完美服务维持形象（三号），同时用 Ni 观察主人的灵魂走向。\n\n若你接近此塑，你能把角色演到滴水不漏。问自己戏外还剩什么。",
        parallels: "适合高标准服务与形象管理。",
      },
      {
        id: "yukino",
        name: "雪之下雪乃",
        dynasty: "《我的青春恋爱物语果然有问题》",
        enneagram: "1w9",
        title: "正直到刺人的侍奉部副部长",
        weights: { Ni: 1.2, Te: 1.1, Fi: 1.2, Fe: 0.8 },
        traits: ["原则锋利", "孤高面具", "怕被误解", "缓慢交心"],
        analysis: "雪乃以一号标准拒绝虚伪社交，九翼回避无谓纠缠却显得冷。\n\n若你接近此塑，你的毒舌常是自我保护。遇上肯翻译你的人，值得多留一步。",
        parallels: "适合原则型协作与慢热关系。",
      },
      {
        id: "kaworu",
        name: "渚薰",
        dynasty: "《新世纪福音战士》",
        enneagram: "4w5",
        title: "温柔降临的镜中人",
        weights: { Ni: 1.3, Fe: 1.2, Fi: 1.2, Ti: 0.9 },
        traits: ["命运自觉", "无条件注视", "孤独共鸣", "牺牲脚本"],
        analysis: "薰以四号独特感与五翼抽离，同时用 Fe 给予碇真嗣罕见的被看见。\n\n若你接近此塑，你能成为别人的镜子。也要有人看见镜子本身。",
        parallels: "适合深度陪伴与象征叙事。",
      }
    ],
    INFP: [
      {
        id: "deku",
        name: "绿谷出久",
        dynasty: "《我的英雄学院》",
        enneagram: "1w2",
        title: "笔记里的英雄心",
        weights: { Fi: 1.4, Ne: 1.2, Si: 1.0, Te: 0.7 },
        traits: ["分析笔记", "拯救执念", "自我怀疑", "成长痛"],
        analysis: "出久以 Fi 坚持「英雄要救人所不能」，一号把理想写成可训练清单。\n\n若你接近此塑，你的善良需要身体与策略一起变强。",
        parallels: "适合理想驱动的学习者。",
      },
      {
        id: "hinata",
        name: "日向雏田",
        dynasty: "《火影忍者》",
        enneagram: "9w1",
        title: "内向坚定的白眼少女",
        weights: { Fi: 1.3, Si: 1.1, Ne: 0.9, Fe: 1.0 },
        traits: ["默默喜欢", "勇气迟到", "家族压力", "温柔坚持"],
        analysis: "雏田九号回避冲突，一翼在关键时刻挺身。\n\n若你接近此塑，你的小声不等于无力。练习把喜欢与边界说清楚。",
        parallels: "适合慢热成长型角色。",
      },
      {
        id: "chihiro",
        name: "荻野千寻",
        dynasty: "《千与千寻》",
        enneagram: "9w1",
        title: "异世界里的名字守护者",
        weights: { Fi: 1.3, Si: 1.2, Ne: 1.0, Se: 0.9 },
        traits: ["适应成长", "记得名字", "劳动诚实", "恐惧穿越"],
        analysis: "千寻从九号顺从长成敢于说「不」与「要」的人。\n\n若你接近此塑，记住自己的名字（价值），比适应规则更重要。",
        parallels: "适合过渡期自我命名。",
      },
      {
        id: "kaneki",
        name: "金木研",
        dynasty: "《东京喰种》",
        enneagram: "4w5",
        title: "半途身份的苦痛求道者",
        weights: { Fi: 1.4, Ni: 1.2, Ti: 1.0, Se: 0.7 },
        traits: ["身份撕裂", "阅读逃避", "暴力觉醒", "被爱渴望"],
        analysis: "金木以四号感受「非人非己」的独特痛，五翼曾用书本隔开世界。\n\n若你接近此塑，痛苦可以是材料，但不要把自我只建立在伤口上。",
        parallels: "适合身份整合课题。",
      },
      {
        id: "rem",
        name: "雷姆",
        dynasty: "《Re:Zero》",
        enneagram: "2w1",
        title: "全力托付的女仆之心",
        weights: { Fi: 1.3, Fe: 1.2, Si: 1.1, Ne: 0.8 },
        traits: ["献身支持", "自我贬低", "行动赎罪", "绝对信任"],
        analysis: "雷姆二号付出到几乎取消自我，一翼带来「我应当有用」。\n\n若你接近此塑，爱不是证明自己有罪。你值得在被需要之外被看见。",
        parallels: "适合支持型伙伴（需边界）。",
      },
      {
        id: "nezuko",
        name: "灶门祢豆子",
        dynasty: "《鬼灭之刃》",
        enneagram: "9w1",
        title: "人性未灭的鬼之妹",
        weights: { Fi: 1.4, Si: 1.1, Se: 0.9, Fe: 1.0 },
        traits: ["血缘守护", "非暴力坚持", "沉睡成长", "界限温柔"],
        analysis: "祢豆子以九号和平与一翼原则，在鬼的本能里守住「不伤人」。\n\n若你接近此塑，你的安静是选择。保护你的人也需要你的信号。",
        parallels: "适合价值坚守型人格。",
      }
    ],
    ENFJ: [
      {
        id: "allmight",
        name: "欧尔麦特",
        dynasty: "《我的英雄学院》",
        enneagram: "2w3",
        title: "象征和平的巨人",
        weights: { Fe: 1.5, Ni: 1.1, Se: 1.0, Ti: 0.6 },
        traits: ["象征鼓舞", "牺牲形象", "继承焦虑", "笑容责任"],
        analysis: "欧尔麦特用 Fe 把勇气做成公共产品，二号被需要，三翼维持「象征」。\n\n若你接近此塑，你习惯扛全场。继承计划比硬撑笑容更重要。",
        parallels: "适合公共激励与导师角色。",
      },
      {
        id: "tanjiro",
        name: "灶门炭治郎",
        dynasty: "《鬼灭之刃》",
        enneagram: "2w1",
        title: "鼻尖向善的剑士",
        weights: { Fe: 1.4, Si: 1.1, Fi: 1.2, Se: 1.0 },
        traits: ["共情鬼与人", "家庭责任", "勤奋苦练", "怒为守护"],
        analysis: "炭治郎二号看见「鬼也曾是人」，一翼坚持正确之怒。\n\n若你接近此塑，你的善良有骨头。别耗尽自己去闻遍所有悲伤。",
        parallels: "适合照护型领导与一线陪伴。",
      },
      {
        id: "makoto",
        name: "橘真琴",
        dynasty: "《Free!》",
        enneagram: "2w1",
        title: "把泳池变成家的队长",
        weights: { Fe: 1.4, Si: 1.2, Fi: 1.0, Ni: 0.8 },
        traits: ["照顾队友", "害怕冲突", "水中自由", "责任过重"],
        analysis: "真琴二号把团队情绪抗在肩上，一翼觉得「我应当稳住」。\n\n若你接近此塑，你也可以被游慢一点。",
        parallels: "适合团队粘合剂。",
      },
      {
        id: "emma_pn",
        name: "艾玛",
        dynasty: "《约定的梦幻岛》",
        enneagram: "2w1",
        title: "带所有人逃走的策略少女",
        weights: { Fe: 1.4, Ne: 1.2, Ti: 1.1, Ni: 1.0 },
        traits: ["全员信念", "计划韧性", "乐观感染", "拒绝放弃"],
        analysis: "艾玛坚持「一个都不能少」，二号扩展到整个「家」。\n\n若你接近此塑，你的乐观是战略资源。搭配会算冷酷账的同伴。",
        parallels: "适合动员型危机领导。",
      },
      {
        id: "jonathan",
        name: "乔纳森·乔斯达",
        dynasty: "《JOJO的奇妙冒险》",
        enneagram: "2w1",
        title: "高贵到笨拙的绅士",
        weights: { Fe: 1.4, Si: 1.1, Fi: 1.2, Se: 1.0 },
        traits: ["正直慈悲", "对手尊重", "成长痛苦", "传承起点"],
        analysis: "乔纳森用二号善良与一翼荣誉感对抗恶意。\n\n若你接近此塑，你的正派不是傻。配上边界，正派能赢。",
        parallels: "适合价值领导与长期信任。",
      },
      {
        id: "mista",
        name: "盖多·米斯达",
        dynasty: "《JOJO的奇妙冒险》",
        enneagram: "6w7",
        title: "迷信却忠诚的枪手",
        weights: { Fe: 1.2, Se: 1.2, Si: 1.1, Ti: 0.8 },
        traits: ["数字恐惧", "团队忠诚", "战斗直觉", "情绪外放"],
        analysis: "米斯达六号寻求同盟确定，七翼用玩笑冲淡怕。\n\n若你接近此塑，你的「迷信」可能是焦虑管理。队友比数字可靠。",
        parallels: "适合忠诚执行与气氛组。",
      }
    ],
    ENFP: [
      {
        id: "naruto",
        name: "漩涡鸣人",
        dynasty: "《火影忍者》",
        enneagram: "7w8",
        title: "要成为火影的吵闹太阳",
        weights: { Ne: 1.4, Fi: 1.3, Fe: 1.1, Te: 0.8 },
        traits: ["羁绊执念", "抗孤独", "嘴遁感化", "行动派"],
        analysis: "鸣人七号向外要承认与联结，八翼硬刚命运。\n\n若你接近此塑，你的吵闹常是怕被丢掉。把感化配上策略。",
        parallels: "适合感召型创业与社群。",
      },
      {
        id: "luffy",
        name: "蒙奇·D·路飞",
        dynasty: "《海贼王》",
        enneagram: "7w8",
        title: "自由海贼的直线王",
        weights: { Ne: 1.3, Se: 1.3, Fi: 1.2, Ti: 0.7 },
        traits: ["自由至上", "伙伴绝对", "直觉决策", "乐天强度"],
        analysis: "路飞七号要自由与有趣，八翼为伙伴开战。\n\n若你接近此塑，你的简单是锋利的。配一个会画海图的人。",
        parallels: "适合探索型领导。",
      },
      {
        id: "gon",
        name: "小杰·富力士",
        dynasty: "《全职猎人》",
        enneagram: "7w8",
        title: "本能向光的少年猎人",
        weights: { Ne: 1.2, Se: 1.3, Fi: 1.3, Ti: 0.7 },
        traits: ["直觉行动", "友情纯粹", "暗面爆发", "自然之子"],
        analysis: "小杰七号追体验与发现，八翼在失去时极端化。\n\n若你接近此塑，你的光很真。也要学认自己的影。",
        parallels: "适合体验驱动成长。",
      },
      {
        id: "usagi",
        name: "月野兔",
        dynasty: "《美少女战士》",
        enneagram: "7w6",
        title: "哭哭啼啼的爱与正义",
        weights: { Ne: 1.3, Fe: 1.3, Fi: 1.2, Si: 0.8 },
        traits: ["情感外放", "友情羁绊", "怕孤独", "最终觉醒"],
        analysis: "兔子七号怕痛怕孤单，六翼黏同伴，却总能在关键处打开心。\n\n若你接近此塑，哭不是弱。你的爱能重组队伍。",
        parallels: "适合情感动员型英雄。",
      },
      {
        id: "asta",
        name: "阿斯塔",
        dynasty: "《黑色五叶草》",
        enneagram: "7w8",
        title: "无魔法的喊叫努力者",
        weights: { Ne: 1.2, Se: 1.3, Fi: 1.2, Te: 0.9 },
        traits: ["努力信仰", "大声宣告", "反魔力", "同伴拉动"],
        analysis: "阿斯塔用音量与汗水对抗「没有」的叙事，七号要可能性。\n\n若你接近此塑，你的喊叫是契约：先说出来，再练到配得上。",
        parallels: "适合逆风成长叙事。",
      },
      {
        id: "anya",
        name: "阿尼亚",
        dynasty: "《间谍过家家》",
        enneagram: "7w6",
        title: "读心却只想看卡通的小孩",
        weights: { Ne: 1.4, Fi: 1.2, Fe: 1.1, Si: 0.8 },
        traits: ["好奇爆炸", "家庭实验", "恐惧隐藏", "喜怒可见"],
        analysis: "阿尼亚七号要有趣，六翼确认「这个家还在」。\n\n若你接近此塑，你的直觉常对。也允许自己只是想玩。",
        parallels: "适合保持玩心的洞察者。",
      }
    ],
    ISTJ: [
      {
        id: "mikasa",
        name: "三笠·阿克曼",
        dynasty: "《进击的巨人》",
        enneagram: "6w5",
        title: "以力量守护羁绊的士兵",
        weights: { Si: 1.2, Te: 1.2, Fi: 1.3, Se: 1.1 },
        traits: ["保护执念", "战斗高效", "情感收敛", "世界缩小"],
        analysis: "三笠以可靠执行守护「重要的人」，六号恐惧失去。\n\n若你接近此塑，你的世界可以比一个人更大，而不背叛那个人。",
        parallels: "适合关键守护与精锐执行。",
      },
      {
        id: "byakuya",
        name: "朽木白哉",
        dynasty: "《死神》",
        enneagram: "1w9",
        title: "矜持守法的贵族队长",
        weights: { Si: 1.3, Te: 1.3, Fi: 1.0, Ni: 0.9 },
        traits: ["律法优先", "情感延迟", "家族责任", "缓慢松动"],
        analysis: "白哉一号守律，九翼维持表面平静。\n\n若你接近此塑，规则曾保护你，也会困住你。更新家训需要勇气。",
        parallels: "适合制度守护者。",
      },
      {
        id: "aizawa",
        name: "相泽消太",
        dynasty: "《我的英雄学院》",
        enneagram: "1w9",
        title: "逻辑严厉的地下英雄",
        weights: { Si: 1.2, Te: 1.3, Fi: 1.0, Ni: 1.0 },
        traits: ["理性淘汰", "学生保护", "精力管理", "表面厌世"],
        analysis: "相泽用一号标准筛选英雄候选人，九翼厌恶无效热闹。\n\n若你接近此塑，你的严是爱的一种方言。适当翻译给学生听。",
        parallels: "适合严师与质量管理。",
      },
      {
        id: "kyoya",
        name: "凰小路圭吾",
        dynasty: "《樱兰高校男公关部》",
        enneagram: "3w2",
        title: "眼镜里的秩序管理者",
        weights: { Te: 1.4, Si: 1.2, Fi: 0.8, Ne: 0.7 },
        traits: ["数据掌控", "吐槽治理", "隐藏温柔", "效率美学"],
        analysis: "圭吾以 Te-Si 把混乱社团做成可运营系统，三号要成果。\n\n若你接近此塑，你的表格背后可以有温度。",
        parallels: "适合运营与治理型角色。",
      },
      {
        id: "hei",
        name: "黑（何家齐）",
        dynasty: "《黑之契约者》",
        enneagram: "5w6",
        title: "沉默执行的契约者",
        weights: { Si: 1.2, Ti: 1.2, Te: 1.1, Fi: 1.0 },
        traits: ["任务冷静", "情感冻结", "妹妹牵挂", "生存优先"],
        analysis: "黑以五号节能与程序化行动活过残酷规则。\n\n若你接近此塑，效率之外，允许自己为谁破例。",
        parallels: "适合高压执行与自我解冻课题。",
      },
      {
        id: "scar",
        name: "疤（史卡）",
        dynasty: "《钢之炼金术师》",
        enneagram: "1w2",
        title: "复仇与信仰之间的僧兵",
        weights: { Si: 1.1, Fi: 1.3, Te: 1.1, Ni: 1.0 },
        traits: ["正义复仇", "信仰撕裂", "破坏重构", "民族记忆"],
        analysis: "疤一号要清算错误，二翼在后期转向守护。\n\n若你接近此塑，复仇可以是起点，重建才是终点。",
        parallels: "适合价值转向型故事。",
      }
    ],
    ISFJ: [
      {
        id: "tohru",
        name: "本田透",
        dynasty: "《水果篮子》",
        enneagram: "2w1",
        title: "温柔拆咒的女孩",
        weights: { Fe: 1.4, Si: 1.3, Fi: 1.2, Ne: 0.8 },
        traits: ["照顾他人", "创伤共鸣", "自我后置", "家庭重建"],
        analysis: "透以二号照顾驱动，Si 记得每个人的忌口与伤口。\n\n若你接近此塑，你值得被同样仔细地对待。",
        parallels: "适合疗愈型关系工作。",
      },
      {
        id: "sakura_haruno",
        name: "春野樱",
        dynasty: "《火影忍者》",
        enneagram: "2w3",
        title: "从少女到医疗忍的成长",
        weights: { Fe: 1.3, Te: 1.1, Si: 1.1, Fi: 1.0 },
        traits: ["治愈责任", "力量渴求", "团队核心", "情感坦白"],
        analysis: "小樱二号要有用，三翼追求配得上队伍的实力。\n\n若你接近此塑，你的成长曲线允许从「喜欢」走到「专业」。",
        parallels: "适合技能型照护者。",
      },
      {
        id: "asuna_isfj",
        name: "结城明日奈",
        dynasty: "《刀剑神域》",
        enneagram: "2w1",
        title: "前线的副团长与家",
        weights: { Fe: 1.3, Si: 1.2, Te: 1.0, Fi: 1.1 },
        traits: ["保护同伴", "生活锚点", "剑技勤奋", "情感稳定"],
        analysis: "亚丝娜在战斗与厨房之间建立「可回去的地方」。\n\n若你接近此塑，你让虚拟与现实都有人味。",
        parallels: "适合团队中的生活官。",
      },
      {
        id: "annie",
        name: "阿尼·利昂纳德",
        dynasty: "《进击的巨人》",
        enneagram: "6w5",
        title: "孤独的女巨人",
        weights: { Si: 1.2, Ti: 1.2, Fi: 1.1, Se: 1.0 },
        traits: ["自我保全", "父亲承诺", "战斗精准", "情感冻结"],
        analysis: "阿尼六号寻求「活下去」的确定，五翼抽离情感。\n\n若你接近此塑，你的壳有理由。壳外若有人，值得试一次。",
        parallels: "适合自我保护过强的觉醒。",
      },
      {
        id: "komi",
        name: "古见硝子",
        dynasty: "《古见同学有交流障碍症》",
        enneagram: "9w1",
        title: "想交一百个朋友的沉默女神",
        weights: { Si: 1.2, Fe: 1.2, Fi: 1.3, Ne: 0.8 },
        traits: ["交流恐惧", "善意满载", "慢热突破", "朋友清单"],
        analysis: "古见九号回避社交压力，一翼认真对待「成为朋友」的课题。\n\n若你接近此塑，小步交流也是勇气。",
        parallels: "适合社交焦虑的温柔对照。",
      },
      {
        id: "winry",
        name: "温莉·洛克贝尔",
        dynasty: "《钢之炼金术师》",
        enneagram: "2w1",
        title: "扳手与泪水的机械师",
        weights: { Fe: 1.3, Si: 1.3, Te: 1.1, Fi: 1.1 },
        traits: ["修复他人", "怒中有爱", "家庭技艺", "等待归来"],
        analysis: "温莉用二号把「修好」当成爱的语言。\n\n若你接近此塑，你有权要求被平安带回，而不只是当补给站。",
        parallels: "适合工匠型支持者。",
      }
    ],
    ESTJ: [
      {
        id: "bakugo",
        name: "爆豪胜己",
        dynasty: "《我的英雄学院》",
        enneagram: "8w7",
        title: "爆炸声里的第一名",
        weights: { Te: 1.5, Se: 1.3, Fi: 1.0, Ni: 0.8 },
        traits: ["竞争偏执", "实力主义", "别扭关心", "成长改口"],
        analysis: "爆豪八号要强，Te 用结果说话，七翼急性子。\n\n若你接近此塑，你的骂可能是关心的坏翻译。学一种不伤人的高标准。",
        parallels: "适合竞技型领导者。",
      },
      {
        id: "erza",
        name: "艾尔莎·斯卡雷特",
        dynasty: "《妖精的尾巴》",
        enneagram: "1w2",
        title: "换装的纪律与温柔",
        weights: { Te: 1.3, Si: 1.2, Fe: 1.1, Fi: 1.0 },
        traits: ["公会秩序", "严于律己", "护短爆发", "创伤坚韧"],
        analysis: "艾尔莎一号维持公会正确，二翼深藏照顾。\n\n若你接近此塑，你的严是家规。偶尔允许公会闹一点。",
        parallels: "适合纪律与温情并存的管理。",
      },
      {
        id: "yamamoto",
        name: "山本元柳斋",
        dynasty: "《死神》",
        enneagram: "1w2",
        title: "燃尽的老队长",
        weights: { Te: 1.3, Si: 1.4, Fi: 1.0, Ni: 0.9 },
        traits: ["千年责任", "火焰克制", "部下如子", "传统守护"],
        analysis: "山本一号守尸魂界秩序，二翼把队当作家庭。\n\n若你接近此塑，你燃得太久也要留灰给后来人接。",
        parallels: "适合元老级责任者。",
      },
      {
        id: "endeavor",
        name: "轰炎司",
        dynasty: "《我的英雄学院》",
        enneagram: "3w4",
        title: "用后悔追赶第一的火焰",
        weights: { Te: 1.4, Si: 1.1, Fi: 0.9, Se: 1.1 },
        traits: ["成就执念", "家庭伤害", "补救行动", "名声重造"],
        analysis: "炎司三号要第一，伤害家人后以行动赎罪。\n\n若你接近此塑，补救必须听受害者节奏，而不是你的业绩表。",
        parallels: "适合悔改型强者叙事。",
      },
      {
        id: "maki",
        name: "禅院真希",
        dynasty: "《咒术回战》",
        enneagram: "8w9",
        title: "无咒力的反叛器械使",
        weights: { Te: 1.3, Se: 1.3, Fi: 1.1, Si: 0.9 },
        traits: ["实力证明", "家族反抗", "器械专精", "沉稳狠劲"],
        analysis: "真希八号要打破血统歧视，九翼平时冷静。\n\n若你接近此塑，你的武器是练习次数。别一个人扛完整个家族的耻。",
        parallels: "适合体制反抗的实干者。",
      },
      {
        id: "satsuki_estj",
        name: "鬼龙院里（制度面）",
        dynasty: "《斩服少女》",
        enneagram: "1w9",
        title: "制服即法律的执行者",
        weights: { Te: 1.5, Si: 1.2, Ni: 1.0, Fi: 0.8 },
        traits: ["校规绝对", "审美统一", "效率镇压", "理想秩序"],
        analysis: "当里更偏制度一号时：正确必须可见、可执行。\n\n若你接近此塑，秩序若无人情，会先压垮自己人。",
        parallels: "适合制度设计者的自我警惕。",
      }
    ],
    ESFJ: [
      {
        id: "nami",
        name: "娜美",
        dynasty: "《海贼王》",
        enneagram: "2w3",
        title: "航海士的账本与温柔",
        weights: { Fe: 1.3, Si: 1.2, Te: 1.1, Ne: 0.9 },
        traits: ["测绘责任", "金钱精明", "伙伴保护", "过去阴影"],
        analysis: "娜美二号为村与伙伴算计航线，三翼要漂亮的成果（藏宝与地图）。\n\n若你接近此塑，你的精明是爱的预算。",
        parallels: "适合资源统筹与照顾型军师。",
      },
      {
        id: "orihime",
        name: "井上织姬",
        dynasty: "《死神》",
        enneagram: "2w1",
        title: "拒绝放弃的盾与拒",
        weights: { Fe: 1.4, Fi: 1.2, Si: 1.1, Ne: 0.8 },
        traits: ["治愈守护", "自我价值疑", "勇敢迟到", "情感真挚"],
        analysis: "织姬二号要保护重要的人，一翼在软弱后选择站上前线。\n\n若你接近此塑，你的「拒」与「盾」可以先为自己举起一次。",
        parallels: "适合照护者赋权。",
      },
      {
        id: "mami",
        name: "巴麻美",
        dynasty: "《魔法少女小圆》",
        enneagram: "2w1",
        title: "优雅孤军的前辈",
        weights: { Fe: 1.3, Si: 1.2, Te: 1.0, Ni: 0.9 },
        traits: ["独战习惯", "礼仪盔甲", "渴望同伴", "牺牲姿态"],
        analysis: "麻美二号渴望被需要，又用一翼优雅独自撑场。\n\n若你接近此塑，前辈也可以求救。",
        parallels: "适合独担过重者的提醒。",
      },
      {
        id: "rukia",
        name: "朽木露琪亚",
        dynasty: "《死神》",
        enneagram: "6w7",
        title: "纠正错误的死神少女",
        weights: { Fe: 1.2, Si: 1.2, Ti: 1.0, Fi: 1.1 },
        traits: ["责任纠错", "嘴硬心软", "家族阴影", "友情点燃"],
        analysis: "露琪亚六号对职责敏感，七翼在一护影响下学会活。\n\n若你接近此塑，你的严厉常指向自己。允许被救赎。",
        parallels: "适合责任觉醒叙事。",
      },
      {
        id: "ochaco",
        name: "丽日御茶子",
        dynasty: "《我的英雄学院》",
        enneagram: "2w3",
        title: "零重力的温柔动机",
        weights: { Fe: 1.4, Si: 1.1, Fi: 1.2, Ne: 0.9 },
        traits: ["金钱孝心", "支持同伴", "战斗成长", "坦白喜欢"],
        analysis: "御茶子二号要让家人安心，三翼认真对待英雄业绩。\n\n若你接近此塑，你的动机很俗也很高尚——俗世的爱最稳。",
        parallels: "适合务实理想主义者。",
      },
      {
        id: "soft_usagi",
        name: "月野兔（日常面）",
        dynasty: "《美少女战士》",
        enneagram: "2w3",
        title: "用哭声召集同伴的队长",
        weights: { Fe: 1.5, Ne: 1.2, Fi: 1.1, Si: 0.9 },
        traits: ["情感召集", "吃货减负", "友情优先", "爱之终极"],
        analysis: "日常兔子更偏 ESFJ：Fe 粘合队伍，二号需要大家在一起。\n\n若你接近此塑，你的「软弱」是团队的集合号。",
        parallels: "适合情感中枢。",
      }
    ],
    ISTP: [
      {
        id: "levi",
        name: "利威尔·阿克曼",
        dynasty: "《进击的巨人》",
        enneagram: "5w6",
        title: "人类最强的清洁与斩击",
        weights: { Ti: 1.4, Se: 1.4, Ni: 0.9, Fe: 0.6 },
        traits: ["效率杀敌", "清洁强迫", "寡言护短", "现实判断"],
        analysis: "利威尔 Ti-Se 把战斗做成精准工艺，五号保存体力与情绪。\n\n若你接近此塑，你用结果说话。偶尔用一句话让部下安心。",
        parallels: "适合精锐执行与危机清场。",
      },
      {
        id: "zoro",
        name: "罗罗诺亚·索隆",
        dynasty: "《海贼王》",
        enneagram: "8w9",
        title: "方向感差的世界上之剑",
        weights: { Ti: 1.2, Se: 1.3, Fi: 1.1, Ni: 0.8 },
        traits: ["剑道偏执", "沉睡储能", "护短沉默", "承诺绝对"],
        analysis: "索隆八号要强，九翼大睡；Ti 打磨剑理。\n\n若你接近此塑，你的承诺比地图准。找个会带路的伙伴。",
        parallels: "适合专精型修行者。",
      },
      {
        id: "spike",
        name: "斯派克·斯皮格尔",
        dynasty: "《星际牛仔》",
        enneagram: "9w8",
        title: "像狼一样活的赏金猎人",
        weights: { Ti: 1.2, Se: 1.4, Ni: 1.0, Fi: 1.0 },
        traits: ["随性外表", "过去纠缠", "战斗流畅", "存在主义"],
        analysis: "斯派克九号看似随性，八翼在必要时致命；Se 活在当下。\n\n若你接近此塑，漂泊是美学也是逃避。有些门值得再进一次。",
        parallels: "适合浪人式自由职业。",
      },
      {
        id: "sasuke",
        name: "宇智波佐助",
        dynasty: "《火影忍者》",
        enneagram: "6w5",
        title: "复仇路上的孤独技者",
        weights: { Ti: 1.3, Se: 1.1, Ni: 1.2, Fi: 1.1 },
        traits: ["力量渴求", "情感切断", "血族阴影", "回归可能"],
        analysis: "佐助六号在恐惧与背叛间摆荡，五翼抽离修炼。\n\n若你接近此塑，力量若只为证明痛苦，会走失回家的路。",
        parallels: "适合创伤驱动的技能者。",
      },
      {
        id: "revy",
        name: "莱薇",
        dynasty: "《黑礁》",
        enneagram: "8w7",
        title: "双枪的暴力现实主义者",
        weights: { Se: 1.5, Ti: 1.2, Fi: 0.9, Fe: 0.4 },
        traits: ["即时火力", "信任稀缺", "黑道生存", "粗暴忠诚"],
        analysis: "莱薇八号用火力换安全，七翼不爱谈明天。\n\n若你接近此塑，你的狠是童年收据。值得你的人不必用枪指着。",
        parallels: "适合极端环境生存者。",
      },
      {
        id: "guts",
        name: "格斯",
        dynasty: "《剑风传奇》",
        enneagram: "8w9",
        title: "背负龙斩的挣扎者",
        weights: { Se: 1.4, Ti: 1.1, Fi: 1.2, Ni: 1.0 },
        traits: ["生存意志", "创伤愤怒", "同伴重新", "与命运撕咬"],
        analysis: "格斯八号对抗被献祭的命运，九翼在同伴旁才能安眠。\n\n若你接近此塑，挣扎本身可以是意义。让人进入你的营火。",
        parallels: "适合创伤英雄叙事。",
      }
    ],
    ISFP: [
      {
        id: "giyu",
        name: "富冈义勇",
        dynasty: "《鬼灭之刃》",
        enneagram: "4w5",
        title: "不善言辞的水柱",
        weights: { Fi: 1.4, Se: 1.2, Ni: 1.0, Te: 0.7 },
        traits: ["内在原则", "表达笨拙", "孤独职责", "迟来关心"],
        analysis: "义勇四号感到与人不一，五翼少话；Fi 守「为何而斩」。\n\n若你接近此塑，你的沉默不是冷。找一个能翻译你的队友。",
        parallels: "适合寡言行动派。",
      },
      {
        id: "asuna",
        name: "结城明日奈（剑士面）",
        dynasty: "《刀剑神域》",
        enneagram: "9w1",
        title: "闪光的细剑与日常",
        weights: { Fi: 1.2, Se: 1.2, Fe: 1.1, Si: 1.0 },
        traits: ["战斗美感", "生活气息", "忠诚伴侣", "压力释放"],
        analysis: "亚丝娜在剑技里活出 Se-Fi 的当下。\n\n若你接近此塑，强也可以很会做饭——完整比人设重要。",
        parallels: "适合生活与技艺平衡者。",
      },
      {
        id: "shoto",
        name: "轰焦冻",
        dynasty: "《我的英雄学院》",
        enneagram: "1w9",
        title: "冰火之间的自我定义",
        weights: { Fi: 1.3, Ni: 1.1, Se: 1.1, Te: 0.9 },
        traits: ["拒绝遗传", "冷静外表", "价值重建", "同盟学习"],
        analysis: "焦冻一号要正确使用力量，九翼回避无谓冲突，Fi 拒绝成为父亲的作品。\n\n若你接近此塑，你的半边可以是自己选的。",
        parallels: "适合出身重构者。",
      },
      {
        id: "sanji",
        name: "山治",
        dynasty: "《海贼王》",
        enneagram: "2w3",
        title: "厨与踢的温柔暴躁",
        weights: { Fi: 1.2, Se: 1.3, Fe: 1.2, Ne: 0.8 },
        traits: ["不踢女人", "美食待人", "家族阴影", "浪漫夸张"],
        analysis: "山治二号用料理爱人，三翼在意被看见的风度。\n\n若你接近此塑，你的菜单是情书。也给自己留一盘。",
        parallels: "适合服务型艺术家。",
      },
      {
        id: "yor",
        name: "约尔·福杰",
        dynasty: "《间谍过家家》",
        enneagram: "9w8",
        title: "杀手与母亲的切换者",
        weights: { Fi: 1.2, Se: 1.4, Si: 1.0, Fe: 1.1 },
        traits: ["笨拙日常", "战斗本能", "家人优先", "身份保密"],
        analysis: "约尔九号想维持家庭和平，八翼在威胁出现时瞬间切换。\n\n若你接近此塑，你的「普通」练习本身就很勇敢。",
        parallels: "适合双重生活的整合。",
      },
      {
        id: "vash",
        name: "瓦修·斯坦雷德",
        dynasty: "《枪神》",
        enneagram: "9w1",
        title: "不杀人的人形台风",
        weights: { Fi: 1.4, Se: 1.2, Ne: 1.0, Fe: 1.1 },
        traits: ["和平执念", "玩笑掩饰", "巨额悬赏", "痛苦慈悲"],
        analysis: "瓦修九号回避杀戮，一翼坚持「不杀」的正确。\n\n若你接近此塑，你的原则昂贵。寻找能分担代价的同伴。",
        parallels: "适合和平主义行动者。",
      }
    ],
    ESTP: [
      {
        id: "goku",
        name: "孙悟空",
        dynasty: "《龙珠》",
        enneagram: "7w8",
        title: "为变强而活的战斗乐天派",
        weights: { Se: 1.5, Ti: 0.9, Fi: 1.0, Ne: 0.8 },
        traits: ["战斗愉悦", "极限突破", "单纯动机", "地球守护"],
        analysis: "悟空 Se 享乐式战斗，七号要下一场更强的对手。\n\n若你接近此塑，过程比奖杯重要。记得回家吃顿饭。",
        parallels: "适合竞技与突破型人生。",
      },
      {
        id: "edward",
        name: "爱德华·艾尔里克",
        dynasty: "《钢之炼金术师》",
        enneagram: "8w7",
        title: "等价交换的行动炼金术师",
        weights: { Se: 1.2, Te: 1.2, Fi: 1.2, Ti: 1.1 },
        traits: ["行动力", "怒点低", "科学伦理", "兄弟羁绊"],
        analysis: "艾德用行动赎罪与求索，八号要掌控结果。\n\n若你接近此塑，等价交换提醒：快捷径的账会连本带利回来。",
        parallels: "适合行动派研究与伦理冒险。",
      },
      {
        id: "denji",
        name: "电次",
        dynasty: "《电锯人》",
        enneagram: "7w8",
        title: "简单欲望的链锯使者",
        weights: { Se: 1.5, Fi: 1.2, Ti: 0.8, Fe: 0.7 },
        traits: ["即时欲望", "创伤麻木", "朴素幸福", "失控成长"],
        analysis: "电次七号要吐司与触感，八翼在被逼时血拼。\n\n若你接近此塑，简单幸福不是浅薄。守住它比当英雄难。",
        parallels: "适合欲望诚实的生存者。",
      },
      {
        id: "inosuke",
        name: "嘴平伊之助",
        dynasty: "《鬼灭之刃》",
        enneagram: "8w7",
        title: "山中长大的猪猪头",
        weights: { Se: 1.5, Ti: 1.0, Fi: 1.1, Fe: 0.6 },
        traits: ["野性直觉", "好胜喊叫", "隐藏柔软", "学习做人"],
        analysis: "伊之助八号用强度占位，七翼乱撞世界。\n\n若你接近此塑，野性可以学礼，而不必被驯没。",
        parallels: "适合野路子天才。",
      },
      {
        id: "yami",
        name: "夜见",
        dynasty: "《黑色五叶草》",
        enneagram: "8w7",
        title: "砍开命运的黑牛队长",
        weights: { Se: 1.4, Te: 1.1, Fi: 1.0, Ni: 0.8 },
        traits: ["魄力统御", "信任直觉", "骂中培养", "异乡强度"],
        analysis: "夜见八号用魄力带队，七翼不按帝国剧本出牌。\n\n若你接近此塑，你的骂若指向成长，队员会跟。",
        parallels: "适合野性领导。",
      },
      {
        id: "todo",
        name: "东堂葵",
        dynasty: "《咒术回战》",
        enneagram: "7w8",
        title: "友谊一击的怪力哲人",
        weights: { Se: 1.4, Fi: 1.2, Ne: 1.1, Ti: 0.9 },
        traits: ["即时同盟", "审美问题", "战斗狂欢", "奇怪信念"],
        analysis: "东堂七号要热烈共鸣，八翼在战场压倒。\n\n若你接近此塑，你的「兄弟」标准古怪但真。",
        parallels: "适合瞬间结盟的行动派。",
      }
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
        analysis: "海梦用 Se-Fe 把热爱变成一起玩的邀请。\n\n若你接近此塑，你能让社恐也想上妆。夸赞要具体——你已经很会了。",
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
        analysis: "帕瓦是夸张的 Se/Fi 欲望体，七号要爽。\n\n若你接近此塑（喜剧层面），你的直接有时是氧气。学一点「别人也有血」的共情。",
        parallels: "适合喜剧混乱输出（需现实边界）。",
      },
      {
        id: "jiraiya",
        name: "自来也",
        dynasty: "《火影忍者》",
        enneagram: "7w8",
        title: "色诱之术外的预言浪人",
        weights: { Se: 1.3, Ne: 1.2, Fi: 1.1, Fe: 1.0 },
        traits: ["浪荡外表", "弟子真心", "写作欲望", "关键牺牲"],
        analysis: "自来也七号游历取乐，八翼在村里危机时硬刚。\n\n若你接近此塑，风流可以是壳，留下来的文字与徒弟才是核。",
        parallels: "适合游历导师。",
      },
      {
        id: "ace",
        name: "波特卡斯·D·艾斯",
        dynasty: "《海贼王》",
        enneagram: "7w8",
        title: "火拳的自由与认命",
        weights: { Se: 1.4, Fi: 1.3, Fe: 1.0, Ni: 0.7 },
        traits: ["义兄弟", "自我价值疑", "乐天火热", "命运对撞"],
        analysis: "艾斯七号要自由活，却被「出生」的叙事困住。\n\n若你接近此塑，你值得活着，不必用死证明。",
        parallels: "适合自由意志课题。",
      },
      {
        id: "felix",
        name: "菲利克斯",
        dynasty: "《Re:Zero》",
        enneagram: "2w3",
        title: "猫语疗愈的骑士",
        weights: { Fe: 1.4, Se: 1.2, Fi: 1.1, Ne: 0.9 },
        traits: ["情绪安抚", "外表反差", "忠诚服务", "战场奶妈"],
        analysis: "菲利克斯二号以治愈被需要，三翼维持可爱战力人设。\n\n若你接近此塑，你的软是专业。软之外也要有拒绝的爪。",
        parallels: "适合疗愈型场控。",
      },
      {
        id: "mugen",
        name: "无幻",
        dynasty: "《狼雨》旁系风格·《武士陈情》",
        enneagram: "8w7",
        title: "浪人式的即时享乐刀客",
        weights: { Se: 1.5, Ti: 1.1, Fi: 1.0, Fe: 0.6 },
        traits: ["随性刀法", "嘲讽权威", "欲望直接", "意外义气"],
        analysis: "无幻八号不接受被安排，七翼及时行乐。\n\n若你接近此塑，你的刀可以护人，而不只是破闷。",
        parallels: "适合浪人美学行动派。",
      }
    ]
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
    const ranked = scored.map(function (x) {
      const fig = x.fig;
      fig._matchScore = x.score;
      return fig;
    });
    return {
      primary: ranked[0],
      alternatives: ranked.slice(1),
      pool: pool,
      ranked: ranked,
    };
  }

  function resolveImage(id) {
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
      ranked: pick.ranked,
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
