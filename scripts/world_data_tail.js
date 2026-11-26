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
