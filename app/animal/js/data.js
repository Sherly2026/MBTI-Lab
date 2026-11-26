/**
 * MBTI 动物塑：八维计分 + 每型多动物映射
 * 图片来源：Unsplash（可商用，结果页注明来源）
 */
window.ANIMAL_DATA = (function () {
  const FUNCTIONS = [
    { id: "Te", name: "外倾思维" },
    { id: "Ti", name: "内倾思维" },
    { id: "Fe", name: "外倾情感" },
    { id: "Fi", name: "内倾情感" },
    { id: "Se", name: "外倾感觉" },
    { id: "Si", name: "内倾感觉" },
    { id: "Ne", name: "外倾直觉" },
    { id: "Ni", name: "内倾直觉" },
  ];

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

  /** 每型 2–3 种动物塑；weights 决定同型内偏好 */
  const ANIMALS = {
    INTJ: [
      {
        id: "intj-owl",
        name: "夜鸮",
        epithet: "静夜的战略家",
        weights: { Ni: 1.3, Te: 1.1, Fi: 0.9, Se: 0.5 },
        image:
          "./img/intj-owl.jpg",
        credit: "Unsplash",
        analysis:
          "夜鸮象征 INTJ 的 Ni 主导：在暗处先看见轮廓与轨迹，再以 Te 精准出击。你习惯拉开距离观察全局，不急于表态，却常在关键节点给出清晰方案。独处充电、标准偏高，是你保护洞察力的方式。",
        traits: ["远视布局", "冷静决断", "标准严格", "神秘疏离"],
      },
      {
        id: "intj-panther",
        name: "黑豹",
        epithet: "暗线推进者",
        weights: { Ni: 1.1, Te: 1.2, Se: 0.9, Fi: 0.8 },
        image:
          "./img/intj-panther.jpg",
        credit: "Unsplash",
        analysis:
          "黑豹塑更强调 Te 执行与身体感：一旦方向确定，你行动干净利落，很少内耗于多余解释。Ni 负责锁定猎物（目标），Se 辅助你捕捉时机。别人眼中的「难接近」，往往是你在节省沟通成本。",
        traits: ["高效猎取", "气场强", "少话多做", "时机敏锐"],
      },
      {
        id: "intj-raven",
        name: "渡鸦",
        epithet: "象征解读者",
        weights: { Ni: 1.4, Fi: 1.1, Te: 0.9, Se: 0.4 },
        image:
          "./img/intj-raven.jpg",
        credit: "Unsplash",
        analysis:
          "渡鸦塑偏 Ni-Fi：你对意义、隐喻与「事情背后的故事」异常敏感，Te 仍在，但更像把洞见翻译成可执行原则。你可能比典型 INTJ 更内省、更在意价值一致性，也更需要审美与智识上的共鸣。",
        traits: ["意义导向", "象征思维", "独立价值", "智识共鸣"],
      },
    ],
    INTP: [
      {
        id: "intp-octopus",
        name: "章鱼",
        epithet: "多触手的概念匠",
        weights: { Ti: 1.4, Ne: 1.2, Si: 0.7, Fe: 0.4 },
        image:
          "./img/intp-octopus.jpg",
        credit: "Unsplash",
        analysis:
          "章鱼对应 INTP 的 Ti-Ne：一只触手抓住原理，其余触手同时试探可能性。你享受把系统拆开再重组，社交能耗高时会缩回「墨汁防御」。真正点燃你的，是一个值得深挖的谜题，而非热闹本身。",
        traits: ["系统拆解", "多重试探", "好奇驱动", "社交节制"],
      },
      {
        id: "intp-cat",
        name: "狸花猫",
        epithet: "随性的逻辑观察者",
        weights: { Ti: 1.2, Ne: 1.0, Si: 1.0, Fe: 0.6 },
        image:
          "./img/intp-cat.jpg",
        credit: "Unsplash",
        analysis:
          "狸花猫塑更生活化：你有自己的活动节律，被打扰会不悦，但对感兴趣的对象会突然黏上来追问到底。Si 让你记得「上次这个 bug 怎么修的」，Ne 又让你半夜开新坑。自由与精确，缺一不可。",
        traits: ["节奏自主", "选择性热情", "记经验", "讨厌被安排"],
      },
    ],
    ENTJ: [
      {
        id: "entj-lion",
        name: "雄狮",
        epithet: "领地指挥官",
        weights: { Te: 1.4, Ni: 1.1, Se: 0.9, Fi: 0.5 },
        image:
          "./img/entj-lion.jpg",
        credit: "Unsplash",
        analysis:
          "雄狮塑突出 ENTJ 的 Te 主导：组织、授权、推进是你的本能。Ni 帮你看见中长期版图，Se 让你在压力下仍能当场拍板。你重视胜负与效率，对含糊与拖延几乎零容忍；学会照顾 Fi，能让领导力更长久。",
        traits: ["统领推进", "目标清晰", "高压决断", "结果导向"],
      },
      {
        id: "entj-eagle",
        name: "金雕",
        epithet: "高空战略眼",
        weights: { Te: 1.2, Ni: 1.3, Se: 0.8, Fi: 0.6 },
        image:
          "./img/entj-eagle.jpg",
        credit: "Unsplash",
        analysis:
          "金雕塑更偏 Ni 战略视野：你喜欢站在高处审视战场，再俯冲执行。比起「吼着带队」，你更用远见说服人。Te 仍是翅膀，但你的魅力来自「比别人早看见一步」——也因此对短视决策格外不耐烦。",
        traits: ["全局视野", "精准俯冲", "标准极高", "不喜短视"],
      },
    ],
    ENTP: [
      {
        id: "entp-fox",
        name: "赤狐",
        epithet: "点子猎人",
        weights: { Ne: 1.4, Ti: 1.2, Fe: 0.8, Si: 0.4 },
        image:
          "./img/entp-fox.jpg",
        credit: "Unsplash",
        analysis:
          "赤狐是经典 ENTP 塑：Ne 四处打洞找可能性，Ti 负责检验哪些洞真能通向宝藏。你机敏、善辩、讨厌死规矩，却常在玩梗中抛出真洞察。挑战在于把「好玩」收敛成「做成」——Si 是你最该练的肌肉。",
        traits: ["机智善辩", "点子爆发", "灵活变通", "讨厌死板"],
      },
      {
        id: "entp-magpie",
        name: "喜鹊",
        epithet: "联结型捣蛋鬼",
        weights: { Ne: 1.3, Fe: 1.1, Ti: 1.0, Si: 0.5 },
        image:
          "./img/entp-magpie.jpg",
        credit: "Unsplash",
        analysis:
          "喜鹊塑更亮 Fe：你不仅脑洞大，还爱把人串起来一起玩梗、一起吵真问题。你的辩论常带表演性，但底层仍是 Ti 在追逻辑一致性。热闹过后你也会空虚——需要一个真正值得长期投入的主题。",
        traits: ["社交脑洞", "带动讨论", "表演感", "主题饥渴"],
      },
    ],
    INFJ: [
      {
        id: "infj-deer",
        name: "白鹿",
        epithet: "林间洞察者",
        weights: { Ni: 1.4, Fe: 1.2, Ti: 0.8, Se: 0.4 },
        image:
          "./img/infj-deer.jpg",
        credit: "Unsplash",
        analysis:
          "白鹿塑写 INFJ 的 Ni-Fe：你常在人群噪声里听见「没说出口的需要」，并被意义感牵引。外表柔和，内里有坚定方向。过度吸收他人情绪时会耗竭，需要定期隐入自己的密林恢复。",
        traits: ["深层共情", "意义驱动", "外表柔和", "需要隐退"],
      },
      {
        id: "infj-snow-leopard",
        name: "雪豹",
        epithet: "高海拔守护者",
        weights: { Ni: 1.3, Fe: 1.0, Ti: 1.0, Se: 0.6 },
        image:
          "./img/infj-snow-leopard.jpg",
        credit: "Unsplash",
        analysis:
          "雪豹塑更冷峻独立：你仍洞察人心，但不轻易交付全部自己。Ti 辅助你把直觉整理成清晰洞见。你保护边界，像守护稀薄空气里的领地——亲近的人很少，但一旦信任，会非常深。",
        traits: ["边界清晰", "稀少深交", "冷静洞察", "高标准关怀"],
      },
    ],
    INFP: [
      {
        id: "infp-butterfly",
        name: "凤蝶",
        epithet: "价值羽化者",
        weights: { Fi: 1.4, Ne: 1.3, Si: 0.7, Te: 0.4 },
        image:
          "./img/infp-butterfly.jpg",
        credit: "Unsplash",
        analysis:
          "凤蝶对应 Fi-Ne：内在价值一次次蜕皮，外在想象不断换翅。你对美与真诚过敏般敏感，虚伪会让你立刻飞离。世界对你来说是象征与故事的田野；把灵感落成作品或关系，是你的终身课题。",
        traits: ["价值真诚", "想象丰富", "厌恶虚伪", "缓慢坚定"],
      },
      {
        id: "infp-bunny",
        name: "野兔",
        epithet: "柔软的守望者",
        weights: { Fi: 1.3, Si: 1.1, Ne: 1.0, Te: 0.5 },
        image:
          "./img/infp-bunny.jpg",
        credit: "Unsplash",
        analysis:
          "野兔塑更贴地、更 Si：你珍视小而确定的安全感与熟悉角落，同时内心仍有大片想象草原。警觉得高，不是胆小，而是对氛围与意图过度读取。温和不代表好拿捏——底线被踩时会突然爆发。",
        traits: ["细腻警觉", "珍视小确幸", "外柔内坚", "需要安全感"],
      },
    ],
    ENFJ: [
      {
        id: "enfj-dolphin",
        name: "海豚",
        epithet: "群体引航员",
        weights: { Fe: 1.4, Ni: 1.2, Se: 0.8, Ti: 0.5 },
        image:
          "./img/enfj-dolphin.jpg",
        credit: "Unsplash",
        analysis:
          "海豚塑写 ENFJ 的 Fe-Ni：你天然感知群体情绪流向，并想带大家游向更好的水域。你擅长鼓励与组织，也容易过度负责。记住：你不是整片海的氧气泵；留下 Ti 的冷静，能让关怀更可持续。",
        traits: ["带动氛围", "成长导向", "表达有力", "易过度负责"],
      },
      {
        id: "enfj-elephant",
        name: "非洲象",
        epithet: "记忆型大家长",
        weights: { Fe: 1.3, Ni: 1.0, Se: 0.7, Ti: 0.6 },
        image:
          "./img/enfj-elephant.jpg",
        credit: "Unsplash",
        analysis:
          "非洲象塑强调稳重与长程关怀：你记得谁受过伤、谁需要被看见，并用行动撑起共同体。气场大但不喧哗，权威来自可靠与温厚。你讨厌背弃与冷漠；自己也要学会被照顾。",
        traits: ["稳重庇护", "记得他人", "共同体感", "憎恶背弃"],
      },
    ],
    ENFP: [
      {
        id: "enfp-otter",
        name: "水獭",
        epithet: "热情联结者",
        weights: { Ne: 1.4, Fi: 1.2, Te: 0.7, Si: 0.5 },
        image:
          "./img/enfp-otter.jpg",
        credit: "Unsplash",
        analysis:
          "水獭是 ENFP 的明亮塑：Ne 让你对新鲜人与事上瘾，Fi 决定你跟谁玩得真心。你把生活过成一场又一场小冒险，也怕被困在重复里。学会一点点 Te 收束，能让热情变成可持续的创造。",
        traits: ["热情好玩", "真心交友", "讨厌单调", "创意连发"],
      },
      {
        id: "enfp-parrot",
        name: "金刚鹦鹉",
        epithet: "色彩演说家",
        weights: { Ne: 1.3, Fi: 1.1, Te: 0.9, Si: 0.4 },
        image:
          "./img/enfp-parrot.jpg",
        credit: "Unsplash",
        analysis:
          "金刚鹦鹉塑更外放表达：你用色彩与声音点燃场面，想法来得快、说得也快。Fi 保证你不是空心热闹——你在找能共鸣的人。注意力容易被新刺激带走；选一个「值得反复说」的主题，你会更有力量。",
        traits: ["表达鲜活", "场面感染力", "寻求共鸣", "注意分散"],
      },
    ],
    ISTJ: [
      {
        id: "istj-beaver",
        name: "河狸",
        epithet: "稳健筑造者",
        weights: { Si: 1.4, Te: 1.3, Fi: 0.8, Ne: 0.4 },
        image:
          "./img/istj-beaver.jpg",
        credit: "Unsplash",
        analysis:
          "河狸塑写 ISTJ：用经验与流程一点点筑起可靠结构。Si 记得什么行得通，Te 把事情做成标准件。你不追求惊艳，追求「明年还能用」。改变可以接受，但请给理由、给步骤、给时间。",
        traits: ["可靠筑基", "流程清晰", "履约守信", "慢热稳"],
      },
      {
        id: "istj-albatross",
        name: "信天翁",
        epithet: "长航守则者",
        weights: { Si: 1.3, Te: 1.2, Fi: 0.9, Ne: 0.5 },
        image:
          "./img/istj-albatross.jpg",
        credit: "Unsplash",
        analysis:
          "信天翁塑强调耐力与航线：你一旦认定航道，就能长时间稳定前进。对细节与责任有近乎仪式感的尊重。风暴来时你靠预案，不靠即兴；别人眼中的固执，常是你对安全边际的坚持。",
        traits: ["耐力强", "航线明确", "预案意识", "责任仪式"],
      },
    ],
    ISFJ: [
      {
        id: "isfj-penguin",
        name: "企鹅",
        epithet: "温暖守群者",
        weights: { Si: 1.3, Fe: 1.4, Ti: 0.7, Ne: 0.5 },
        image:
          "./img/isfj-penguin.jpg",
        credit: "Unsplash",
        analysis:
          "企鹅塑贴合 ISFJ：在寒冷环境里仍维持群体温暖。你记得每个人的偏好与忌口，默默把细节补上。Fe 让你在意和谐，Si 让你成为「记得住」的那个人。请也把自己写进被照顾的名单里。",
        traits: ["细心照料", "群体归属", "记得细节", "默默付出"],
      },
      {
        id: "isfj-koala",
        name: "考拉",
        epithet: "安稳树栖者",
        weights: { Si: 1.4, Fe: 1.1, Ti: 0.8, Ne: 0.4 },
        image:
          "./img/isfj-koala.jpg",
        credit: "Unsplash",
        analysis:
          "考拉塑更内收：你需要熟悉的树干（节奏、环境、关系）才能安心付出。不是懒，是节能策略——把能量留给真正重要的人。突然的变故会让你僵住；给过渡期，你会重新找到节奏并可靠如初。",
        traits: ["需要安稳", "节能社交", "深情内敛", "怕骤变"],
      },
    ],
    ESTJ: [
      {
        id: "estj-shepherd",
        name: "牧羊犬",
        epithet: "秩序执行官",
        weights: { Te: 1.4, Si: 1.3, Ne: 0.6, Fi: 0.5 },
        image:
          "./img/estj-shepherd.jpg",
        credit: "Unsplash",
        analysis:
          "牧羊犬塑写 ESTJ：盯着目标、维护秩序、把羊群带到该去的地方。Te-Si 让你擅长建立规则并监督执行。你直接、负责任，有时显得强硬——若补上对个别差异的耐心，团队会跟得更紧。",
        traits: ["秩序维护", "执行力强", "责任清晰", "直言不讳"],
      },
      {
        id: "estj-bee",
        name: "蜜蜂",
        epithet: "高效蜂巢官",
        weights: { Te: 1.3, Si: 1.2, Ne: 0.7, Fi: 0.6 },
        image:
          "./img/estj-bee.jpg",
        credit: "Unsplash",
        analysis:
          "蜜蜂塑强调分工与产出：你相信清晰角色能让整体甜蜜最大化。讨厌闲聊式空转，欣赏可量化的贡献。你自己也常超负荷工作；记住蜂巢需要休息日，否则连最勤劳的工蜂也会折翼。",
        traits: ["分工明确", "产出导向", "勤勉", "厌空转"],
      },
    ],
    ESFJ: [
      {
        id: "esfj-retriever",
        name: "金毛寻回犬",
        epithet: "热情招待主",
        weights: { Fe: 1.4, Si: 1.2, Ne: 0.7, Ti: 0.5 },
        image:
          "./img/esfj-retriever.jpg",
        credit: "Unsplash",
        analysis:
          "金毛塑是 ESFJ 的高光：你让人感到被欢迎、被记得、被照顾。Fe-Si 组合擅长维护传统与人情往来。你在意评价，有时会过度迎合；保留一点自己的喜好，热情会更真实、也更轻松。",
        traits: ["热情接待", "人情练达", "在意评价", "乐于服务"],
      },
      {
        id: "esfj-sparrow",
        name: "麻雀",
        epithet: "街坊联络员",
        weights: { Fe: 1.3, Si: 1.3, Ne: 0.8, Ti: 0.5 },
        image:
          "./img/esfj-sparrow.jpg",
        credit: "Unsplash",
        analysis:
          "麻雀塑更生活化、更接地气：你活跃在日常网络里，传递消息、组织小聚、留意谁最近不对劲。你不是舞台中央的孔雀，却是社区能运转的关键节点。琐碎里藏着你的价值感。",
        traits: ["接地气", "消息灵通", "组织小聚", "日常关怀"],
      },
    ],
    ISTP: [
      {
        id: "istp-lynx",
        name: "猞猁",
        epithet: "冷静拆解者",
        weights: { Ti: 1.4, Se: 1.2, Ni: 0.8, Fe: 0.4 },
        image:
          "./img/istp-lynx.jpg",
        credit: "Unsplash",
        analysis:
          "猞猁塑写 ISTP：少言、敏锐、动手能力强。Ti 理解机制，Se 在现场即时校准。你讨厌被情绪绑架与无意义会议；给工具、给空间，你能把问题解决到漂亮。危机时反而最清醒。",
        traits: ["冷静拆解", "动手强", "讨厌束缚", "危机清醒"],
      },
      {
        id: "istp-shark",
        name: "礁鲨",
        epithet: "效率掠食者",
        weights: { Ti: 1.2, Se: 1.4, Ni: 0.7, Fe: 0.4 },
        image:
          "./img/istp-shark.jpg",
        credit: "Unsplash",
        analysis:
          "礁鲨塑更 Se：你在动态环境中如鱼得水，判断快、动作干净。Ti 保证你不是莽撞，而是算过角度的一击。独处不是孤僻，是保持锋利的方式；勉强社交会让你钝掉。",
        traits: ["动态适应", "一击高效", "独处充电", "拒绝拖泥"],
      },
    ],
    ISFP: [
      {
        id: "isfp-redpanda",
        name: "小熊猫",
        epithet: "温柔审美者",
        weights: { Fi: 1.4, Se: 1.2, Ni: 0.8, Te: 0.4 },
        image:
          "./img/isfp-redpanda.jpg",
        credit: "Unsplash",
        analysis:
          "小熊猫塑贴合 ISFP：外表可爱软萌，内在有清晰好恶。Fi 决定你靠近什么、离开什么；Se 让你沉浸在当下的味道、光线与触感里。你不爱冲突，但被逼违反本心时会坚决抽身。",
        traits: ["审美敏感", "活在当下", "外柔内定", "不喜冲突"],
      },
      {
        id: "isfp-swan",
        name: "天鹅",
        epithet: "静美的界限者",
        weights: { Fi: 1.3, Se: 1.0, Ni: 1.0, Te: 0.5 },
        image:
          "./img/isfp-swan.jpg",
        credit: "Unsplash",
        analysis:
          "天鹅塑更强调气质与界限：你用美感与距离保护内心。表面平静，情绪与价值在水下划动。Ni 让你偶尔看见关系的远期形状。你需要美的环境才能好好呼吸——这不是矫情，是功能需求。",
        traits: ["气质感", "边界优雅", "情绪深潜", "环境敏感"],
      },
    ],
    ESTP: [
      {
        id: "estp-cheetah",
        name: "猎豹",
        epithet: "瞬时行动派",
        weights: { Se: 1.5, Ti: 1.2, Fe: 0.7, Ni: 0.4 },
        image:
          "./img/estp-cheetah.jpg",
        credit: "Unsplash",
        analysis:
          "猎豹是 ESTP 的速度塑：Se 捕捉机会，Ti 快速算路，然后全力加速。你擅长临场、谈判、试错，厌烦长篇理论。爆发力强，也要注意「加速—恢复」循环，避免把人生开成只有短跑。",
        traits: ["抓机会", "临场强", "讨厌拖延", "爆发力"],
      },
      {
        id: "estp-wolf",
        name: "灰狼",
        epithet: "小队战术手",
        weights: { Se: 1.3, Ti: 1.1, Fe: 1.0, Ni: 0.5 },
        image:
          "./img/estp-wolf.jpg",
        credit: "Unsplash",
        analysis:
          "灰狼塑带一点 Fe：你行动派，但也懂小队协作与江湖义气。现场带动气氛、临场调配资源是你的强项。你要自由，也要可信的同伴；空洞的管束会让你叛逆，清晰的目标会让你卖力。",
        traits: ["小队协作", "义气", "现场带动", "要自由"],
      },
    ],
    ESFP: [
      {
        id: "esfp-peacock",
        name: "孔雀",
        epithet: "现场焦点",
        weights: { Se: 1.4, Fi: 1.2, Te: 0.7, Ni: 0.4 },
        image:
          "./img/esfp-peacock.jpg",
        credit: "Unsplash",
        analysis:
          "孔雀塑写 ESFP：你把当下过成可见的美与热度。Se-Fi 让表演不只是吵闹，而是带个人温度的表达。你怕被忽视，更怕被误解为肤浅——其实你很清楚什么体验值得、什么人假。",
        traits: ["感染力", "审美表达", "享受互动", "怕被看扁"],
      },
      {
        id: "esfp-meerkat",
        name: "狐獴",
        epithet: "机灵社交侦察兵",
        weights: { Se: 1.3, Fi: 1.1, Te: 0.8, Ni: 0.5 },
        image:
          "./img/esfp-meerkat.jpg",
        credit: "Unsplash",
        analysis:
          "狐獴塑更轻巧、更群体：你留意周围动态，随时能切换话题与玩法，让小队不冷场。你活得具体而热闹，对沉闷理论没耐心。深度可以有，但请用故事与体验包装，别用说教。",
        traits: ["机敏观察", "带动小队", "具体鲜活", "厌说教"],
      },
    ],
  };

  /** 24 题：每维 3 题，情境偏生活化，便于动物塑造型 */
  const QUESTIONS = [
    { id: "a01", function: "Te", text: "一群人讨论半天没结论时，我会出来定一个可执行的方案。" },
    { id: "a02", function: "Te", text: "我更喜欢用「有没有效果」来评价一件事，而不是感觉好不好。" },
    { id: "a03", function: "Te", text: "把目标和截止时间写清楚，我会安心很多。" },
    { id: "a04", function: "Ti", text: "我会花时间想通「为什么」，即使暂时不影响行动。" },
    { id: "a05", function: "Ti", text: "发现说法自相矛盾时，我会忍不住指出逻辑问题。" },
    { id: "a06", function: "Ti", text: "我宁可不说话，也不想说自己都没想清楚的话。" },
    { id: "a07", function: "Fe", text: "我很容易察觉别人心情变了，并想调节气氛。" },
    { id: "a08", function: "Fe", text: "决定前我会想：这会不会让在场的人难堪。" },
    { id: "a09", function: "Fe", text: "看到团队不合，我会比任务延误更着急。" },
    { id: "a10", function: "Fi", text: "就算吃亏，我也不想做违背自己原则的事。" },
    { id: "a11", function: "Fi", text: "我需要独处，才能分辨「我真正想要什么」。" },
    { id: "a12", function: "Fi", text: "对虚伪的客气，我会本能地想远离。" },
    { id: "a13", function: "Se", text: "新鲜刺激的现场体验，比坐着空想更让我兴奋。" },
    { id: "a14", function: "Se", text: "突发状况里，我常常比别人更快进入状态。" },
    { id: "a15", function: "Se", text: "我更信「先做起来看」，而不是先把计划写完美。" },
    { id: "a16", function: "Si", text: "熟悉的流程和环境，能给我很强的安全感。" },
    { id: "a17", function: "Si", text: "我会自然记住日期、步骤和别人提过的细节。" },
    { id: "a18", function: "Si", text: "做新事前，我习惯先回想以前类似经验。" },
    { id: "a19", function: "Ne", text: "一个话题能让我联想到好几个看似不相关的点子。" },
    { id: "a20", function: "Ne", text: "我喜欢保留多种可能，不急着只选一条路。" },
    { id: "a21", function: "Ne", text: "聊天跳题对我来说很正常，因为脑子转得快。" },
    { id: "a22", function: "Ni", text: "我常对未来走向有种说不清的预感，事后又对得上。" },
    { id: "a23", function: "Ni", text: "我倾向于把复杂信息收成一个核心判断。" },
    { id: "a24", function: "Ni", text: "比起当下热闹，我更常想这件事长远意味着什么。" },
  ];

  const SCALE_LABELS = ["非常不像我", "不太像我", "说不准", "比较像我", "非常像我"];
  const STACK_WEIGHTS = [4, 3, 2, 1];

  /** 每型视觉色板：结果页海报底色（不依赖外链也能好看） */
  const TYPE_TONES = {
    INTJ: [
      { from: "#1c2e2a", to: "#0a1210", accent: "#c9b28a" },
      { from: "#1a1f2e", to: "#090b12", accent: "#8fa3b8" },
      { from: "#241c22", to: "#0e090c", accent: "#b7a0c4" },
    ],
    INTP: [
      { from: "#163038", to: "#081116", accent: "#7eb8c9" },
      { from: "#2a241c", to: "#120e0a", accent: "#d2a679" },
    ],
    ENTJ: [
      { from: "#3a2a12", to: "#140e06", accent: "#e0b45c" },
      { from: "#1e2a38", to: "#0a1018", accent: "#9eb6d4" },
    ],
    ENTP: [
      { from: "#3a2414", to: "#160c06", accent: "#e0945a" },
      { from: "#1a3030", to: "#0a1414", accent: "#6ec4b8" },
    ],
    INFJ: [
      { from: "#24322c", to: "#0c1410", accent: "#d7d2c4" },
      { from: "#1c2838", to: "#0a1018", accent: "#a8b8cc" },
    ],
    INFP: [
      { from: "#2c2438", to: "#100c18", accent: "#d4a8c8" },
      { from: "#2a3020", to: "#10140c", accent: "#c4d49a" },
    ],
    ENFJ: [
      { from: "#123038", to: "#061218", accent: "#6ec0d4" },
      { from: "#2e2a1c", to: "#14120c", accent: "#d4c49a" },
    ],
    ENFP: [
      { from: "#14342e", to: "#081410", accent: "#7ed0b8" },
      { from: "#382818", to: "#160e08", accent: "#f0a868" },
    ],
    ISTJ: [
      { from: "#1c2c34", to: "#0a1216", accent: "#8ab0c0" },
      { from: "#203028", to: "#0c1410", accent: "#a8c4a0" },
    ],
    ISFJ: [
      { from: "#1c2e38", to: "#0a1218", accent: "#b0c8d4" },
      { from: "#2c2820", to: "#12100c", accent: "#d0c0a0" },
    ],
    ESTJ: [
      { from: "#2c2818", to: "#12100a", accent: "#d4b86a" },
      { from: "#303018", to: "#141408", accent: "#e0d060" },
    ],
    ESFJ: [
      { from: "#2e2418", to: "#141008", accent: "#e0b888" },
      { from: "#243028", to: "#0e1410", accent: "#a8c8b0" },
    ],
    ISTP: [
      { from: "#1c2830", to: "#0a1014", accent: "#90a8b8" },
      { from: "#102830", to: "#061014", accent: "#58a8c0" },
    ],
    ISFP: [
      { from: "#28301c", to: "#10140a", accent: "#d0b898" },
      { from: "#203038", to: "#0c1418", accent: "#d8d0c8" },
    ],
    ESTP: [
      { from: "#383018", to: "#161208", accent: "#f0c060" },
      { from: "#2c2c2c", to: "#101010", accent: "#c0c0c0" },
    ],
    ESFP: [
      { from: "#382828", to: "#160c0c", accent: "#e090a0" },
      { from: "#303020", to: "#14140c", accent: "#e0c878" },
    ],
  };

  Object.keys(ANIMALS).forEach(function (code) {
    ANIMALS[code].forEach(function (animal, i) {
      const tones = TYPE_TONES[code] || TYPE_TONES.INTJ;
      animal.tone = tones[i % tones.length];
    });
  });

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
      sums[f.id] = 0;
      counts[f.id] = 0;
    });
    questions.forEach(function (q) {
      const v = answers[q.id];
      if (typeof v !== "number") return;
      sums[q.function] += v;
      counts[q.function] += 1;
    });
    const scores = {};
    FUNCTIONS.forEach(function (f) {
      const n = counts[f.id] || 1;
      scores[f.id] = Math.round((((sums[f.id] / n) - 1) / 4) * 100);
    });
    return scores;
  }

  function matchType(functionScores) {
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
    const maxPossible = 100 * 10;
    return {
      code: best.code,
      title: TYPE_TITLES[best.code],
      stack: TYPE_STACKS[best.code],
      secondaryCode: second.code,
      secondaryTitle: TYPE_TITLES[second.code],
      confidence: Math.max(0, Math.min(100, Math.round((best.fit / maxPossible) * 100))),
    };
  }

  function pickAnimal(typeCode, functionScores) {
    const pool = ANIMALS[typeCode] || [];
    const scored = pool
      .map(function (animal) {
        let s = 0;
        Object.keys(animal.weights).forEach(function (fn) {
          s += (functionScores[fn] || 0) * animal.weights[fn];
        });
        return { animal: animal, score: s };
      })
      .sort(function (a, b) {
        return b.score - a.score;
      });

    const primary = scored[0].animal;
    const alts = scored.slice(1).map(function (x) {
      return x.animal;
    });
    return { primary: primary, alternatives: alts, pool: pool };
  }

  function computeResult(answers, questions) {
    const functionScores = scoreFunctions(answers, questions);
    const type = matchType(functionScores);
    const animalPick = pickAnimal(type.code, functionScores);
    return {
      functionScores: functionScores,
      type: type,
      animal: animalPick.primary,
      alternatives: animalPick.alternatives,
      pool: animalPick.pool,
    };
  }

  return {
    QUESTIONS: QUESTIONS,
    SCALE_LABELS: SCALE_LABELS,
    ANIMALS: ANIMALS,
    TYPE_TITLES: TYPE_TITLES,
    TYPE_STACKS: TYPE_STACKS,
    shuffle: shuffle,
    computeResult: computeResult,
  };
})();
