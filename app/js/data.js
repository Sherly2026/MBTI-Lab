/**
 * 荣格八维题库与类型资料（非模块，可直接 file:// 打开）
 */
window.MBTI_DATA = (function () {
  const FUNCTIONS = [
    { id: "Te", name: "外倾思维", short: "Te", axis: "thinking", attitude: "E" },
    { id: "Ti", name: "内倾思维", short: "Ti", axis: "thinking", attitude: "I" },
    { id: "Fe", name: "外倾情感", short: "Fe", axis: "feeling", attitude: "E" },
    { id: "Fi", name: "内倾情感", short: "Fi", axis: "feeling", attitude: "I" },
    { id: "Se", name: "外倾感觉", short: "Se", axis: "sensing", attitude: "E" },
    { id: "Si", name: "内倾感觉", short: "Si", axis: "sensing", attitude: "I" },
    { id: "Ne", name: "外倾直觉", short: "Ne", axis: "intuition", attitude: "E" },
    { id: "Ni", name: "内倾直觉", short: "Ni", axis: "intuition", attitude: "I" },
  ];

  const QUESTIONS = [
    { id: "q01", function: "Te", text: "做决定时，我更看重「能不能尽快落地出结果」，而不是反复推敲想法本身。" },
    { id: "q02", function: "Te", text: "面对一团乱的任务，我会立刻理出步骤、分工和时间节点。" },
    { id: "q03", function: "Te", text: "讨论问题时，我习惯用明确标准来判断对错，并推动大家达成结论。" },
    { id: "q04", function: "Te", text: "比起「大家感觉如何」，我更在意「这件事有没有按计划推进」。" },
    { id: "q05", function: "Ti", text: "我喜欢把问题拆开，弄清楚里面每一环的逻辑是否自洽。" },
    { id: "q06", function: "Ti", text: "别人说「就是这样」，我会想：依据是什么？有没有例外？" },
    { id: "q07", function: "Ti", text: "比起马上行动，我更想先在脑子里把原理想明白。" },
    { id: "q08", function: "Ti", text: "我会花时间修正自己用词和定义，力求表达准确。" },
    { id: "q09", function: "Fe", text: "进一个房间，我很容易察觉气氛好不好，并想办法让大家更轻松。" },
    { id: "q10", function: "Fe", text: "做选择时，我会优先考虑这会不会让身边的人难堪或不舒服。" },
    { id: "q11", function: "Fe", text: "朋友难过时，我更想立刻安慰、陪伴，而不是先分析原因。" },
    { id: "q12", function: "Fe", text: "团队合作里，维护关系顺畅对我来说和完成任务一样重要。" },
    { id: "q13", function: "Fi", text: "即使没人反对，只要我觉得「不对」，我也很难违心去做。" },
    { id: "q14", function: "Fi", text: "我更在意这件事是否符合我的价值观，而不是多数人怎么看。" },
    { id: "q15", function: "Fi", text: "情绪上来时，我往往需要独处一会儿，才能弄清自己真正的感受。" },
    { id: "q16", function: "Fi", text: "我对「真诚」很敏感：假客气或套话会让我立刻疏远。" },
    { id: "q17", function: "Se", text: "我喜欢抓住眼前机会立刻行动，而不是先做很多预案。" },
    { id: "q18", function: "Se", text: "美食、音乐、运动、现场氛围这类即时体验，对我很有吸引力。" },
    { id: "q19", function: "Se", text: "突发状况时，我通常能很快进入状态，边做边调整。" },
    { id: "q20", function: "Se", text: "比起抽象讨论，我更愿意直接上手试一试、看实际效果。" },
    { id: "q21", function: "Si", text: "做新事前，我会回想以前类似经历，找出可复用的做法。" },
    { id: "q22", function: "Si", text: "我对熟悉的节奏和环境有安全感，突然大变会让我不舒服。" },
    { id: "q23", function: "Si", text: "我会留意并记住细节：日期、步骤、别人说过的具体话。" },
    { id: "q24", function: "Si", text: "比起「赶时髦」，我更信任经过验证、靠得住的方法。" },
    { id: "q25", function: "Ne", text: "听到一个点子，我脑子里会立刻冒出好几个相关的新想法。" },
    { id: "q26", function: "Ne", text: "聊天时我常跳题，因为会联想到另一件有趣的事。" },
    { id: "q27", function: "Ne", text: "面对不确定，我更兴奋于「还有哪些可能」，而不是尽快定死一种。" },
    { id: "q28", function: "Ne", text: "我喜欢同时探索多条路，哪怕有的最后用不上。" },
    { id: "q29", function: "Ni", text: "有时我会突然「看懂」一件事的走向，却一时说不清依据。" },
    { id: "q30", function: "Ni", text: "做规划时，我更关注长远图景，琐碎细节可以后补。" },
    { id: "q31", function: "Ni", text: "我倾向于把复杂信息收成一个核心判断，而不是罗列很多选项。" },
    { id: "q32", function: "Ni", text: "比起当下热闹，我更常在想：这件事往后会变成什么样。" },
  ];

  const TYPE_PROFILES = {
    INTJ: { code: "INTJ", title: "战略家", stack: ["Ni", "Te", "Fi", "Se"], blurb: "以内倾直觉看见长远方向，再以外倾思维把目标拆成可执行路径。", traits: ["独立规划", "结果导向", "洞察趋势", "标准严格"] },
    INTP: { code: "INTP", title: "思考者", stack: ["Ti", "Ne", "Si", "Fe"], blurb: "以内倾思维追求概念精确，以外倾直觉不断打开新的解释空间。", traits: ["逻辑清晰", "好奇探索", "独立思考", "讨厌含糊"] },
    ENTJ: { code: "ENTJ", title: "指挥官", stack: ["Te", "Ni", "Se", "Fi"], blurb: "以外倾思维组织资源与节奏，以内倾直觉锁定长期战略。", traits: ["推动落地", "目标明确", "决断迅速", "重视效率"] },
    ENTP: { code: "ENTP", title: "辩论家", stack: ["Ne", "Ti", "Fe", "Si"], blurb: "以外倾直觉发散可能性，以内倾思维检验想法是否站得住。", traits: ["点子多", "爱挑战成见", "灵活应变", "讨厌死板"] },
    INFJ: { code: "INFJ", title: "洞察者", stack: ["Ni", "Fe", "Ti", "Se"], blurb: "以内倾直觉把握深层含义，以外倾情感理解并回应他人需要。", traits: ["洞察人心", "理想驱动", "重视意义", "私密敏感"] },
    INFP: { code: "INFP", title: "调停者", stack: ["Fi", "Ne", "Si", "Te"], blurb: "以内倾情感守护核心价值，以外倾直觉想象更贴合内心的可能。", traits: ["真诚执着", "想象力强", "共情细腻", "抗拒强迫"] },
    ENFJ: { code: "ENFJ", title: "主人公", stack: ["Fe", "Ni", "Se", "Ti"], blurb: "以外倾情感凝聚群体，以内倾直觉看见他人成长的方向。", traits: ["带动氛围", "关心成长", "表达有力", "重视和谐"] },
    ENFP: { code: "ENFP", title: "竞选者", stack: ["Ne", "Fi", "Te", "Si"], blurb: "以外倾直觉捕捉新鲜可能，以内倾情感确认哪些真正打动自己。", traits: ["热情开放", "联结他人", "讨厌单调", "价值鲜明"] },
    ISTJ: { code: "ISTJ", title: "物流师", stack: ["Si", "Te", "Fi", "Ne"], blurb: "以内倾感觉沉淀可靠经验，以外倾思维按标准把事情做稳。", traits: ["可靠尽责", "注重细节", "守承诺", "偏好秩序"] },
    ISFJ: { code: "ISFJ", title: "守卫者", stack: ["Si", "Fe", "Ti", "Ne"], blurb: "以内倾感觉记住他人需要与惯例，以外倾情感细心照应关系。", traits: ["体贴周到", "记得细节", "默默支持", "重视稳定"] },
    ESTJ: { code: "ESTJ", title: "总经理", stack: ["Te", "Si", "Ne", "Fi"], blurb: "以外倾思维建立规则与流程，以内倾感觉沿用被验证的做法。", traits: ["组织力强", "务实直接", "强调责任", "执行有力"] },
    ESFJ: { code: "ESFJ", title: "执政官", stack: ["Fe", "Si", "Ne", "Ti"], blurb: "以外倾情感维护群体和谐，以内倾感觉照顾熟悉的人与惯例。", traits: ["热情待人", "重视传统", "乐于服务", "敏感于评价"] },
    ISTP: { code: "ISTP", title: "鉴赏家", stack: ["Ti", "Se", "Ni", "Fe"], blurb: "以内倾思维理解机制，以外倾感觉在现场灵活拆解与动手。", traits: ["冷静务实", "动手能力强", "危机应对", "讨厌束缚"] },
    ISFP: { code: "ISFP", title: "探险家", stack: ["Fi", "Se", "Ni", "Te"], blurb: "以内倾情感跟随真实感受，以外倾感觉沉浸于当下审美与体验。", traits: ["温和坚定", "感官敏锐", "活在当下", "不喜冲突"] },
    ESTP: { code: "ESTP", title: "企业家", stack: ["Se", "Ti", "Fe", "Ni"], blurb: "以外倾感觉抓住当下机会，以内倾思维快速判断利弊。", traits: ["行动派", "临场反应快", "务实大胆", "讨厌拖延"] },
    ESFP: { code: "ESFP", title: "表演者", stack: ["Se", "Fi", "Te", "Ni"], blurb: "以外倾感觉享受现场活力，以内倾情感让表达带有个人温度。", traits: ["感染力强", "享受互动", "灵活热情", "重视体验"] },
  };

  const FUNCTION_BLURBS = {
    Te: "用外部标准推动效率与结果",
    Ti: "用内部逻辑把概念想清楚",
    Fe: "感知并调节人际氛围",
    Fi: "对照个人价值判断对错",
    Se: "抓住当下现实与感官信息",
    Si: "依托经验细节与稳定惯例",
    Ne: "发散联想、看见多种可能",
    Ni: "收敛洞察、预见长远走向",
  };

  const SCALE_LABELS = ["非常不像我", "不太像我", "说不准", "比较像我", "非常像我"];

  function shuffleQuestions(list) {
    const arr = list.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  const STACK_WEIGHTS = [4, 3, 2, 1];

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
      const avg = sums[f.id] / n;
      scores[f.id] = Math.round(((avg - 1) / 4) * 100);
    });
    return scores;
  }

  function matchType(functionScores) {
    const ranked = Object.keys(TYPE_PROFILES)
      .map(function (code) {
        const profile = TYPE_PROFILES[code];
        let fit = 0;
        profile.stack.forEach(function (fn, i) {
          fit += (functionScores[fn] || 0) * STACK_WEIGHTS[i];
        });
        const inStack = {};
        profile.stack.forEach(function (fn) {
          inStack[fn] = true;
        });
        let off = 0;
        Object.keys(functionScores).forEach(function (fn) {
          if (!inStack[fn]) off += functionScores[fn] * 0.35;
        });
        return { code: code, fit: fit - off, profile: profile };
      })
      .sort(function (a, b) {
        return b.fit - a.fit;
      });

    const best = ranked[0];
    const second = ranked[1];
    const maxPossible = 100 * (4 + 3 + 2 + 1);
    const confidence = Math.round((best.fit / maxPossible) * 100);

    return {
      primary: best.profile,
      secondary: second.profile,
      confidence: Math.max(0, Math.min(100, confidence)),
      ranking: ranked.slice(0, 3).map(function (r) {
        return { code: r.code, title: r.profile.title, fit: Math.round(r.fit) };
      }),
    };
  }

  function rankFunctions(functionScores) {
    return Object.keys(functionScores)
      .map(function (id) {
        return {
          id: id,
          score: functionScores[id],
          meta: FUNCTIONS.find(function (f) {
            return f.id === id;
          }),
        };
      })
      .sort(function (a, b) {
        return b.score - a.score;
      });
  }

  function computeResult(answers, questions) {
    const functionScores = scoreFunctions(answers, questions);
    const match = matchType(functionScores);
    const functionRank = rankFunctions(functionScores);
    return { functionScores: functionScores, match: match, functionRank: functionRank };
  }

  return {
    FUNCTIONS: FUNCTIONS,
    QUESTIONS: QUESTIONS,
    TYPE_PROFILES: TYPE_PROFILES,
    FUNCTION_BLURBS: FUNCTION_BLURBS,
    SCALE_LABELS: SCALE_LABELS,
    shuffleQuestions: shuffleQuestions,
    computeResult: computeResult,
  };
})();
