(function () {
  const D = window.ENNEA_DATA;
  const TOTAL = D.QUESTIONS.length;
  const MBTI_CODES = Object.keys(D.TYPE_TITLES);

  const state = {
    screen: "home",
    order: [],
    index: 0,
    answers: {},
    ennea: null,
    confirmedMbti: null,
    personas: null,
  };

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function paras(text) {
    return String(text || "")
      .split(/\n+/)
      .filter(Boolean)
      .map(function (p) {
        return "<p>" + escapeHtml(p) + "</p>";
      })
      .join("");
  }

  function render() {
    const app = $("#app");
    app.classList.remove("is-ready");
    if (state.screen === "home") app.innerHTML = viewHome();
    else if (state.screen === "quiz") app.innerHTML = viewQuiz();
    else if (state.screen === "scores") app.innerHTML = viewScores();
    else if (state.screen === "confirm") app.innerHTML = viewConfirm();
    else if (state.screen === "personas") app.innerHTML = viewPersonas();
    bind();
    requestAnimationFrame(function () {
      app.classList.add("is-ready");
    });
  }

  function viewHome() {
    return (
      '<section class="screen home" aria-labelledby="brand">' +
      '<div class="home-atmosphere" aria-hidden="true"></div>' +
      '<header class="home-hero">' +
      '<p class="eyebrow">MBTI Lab · Enneagram</p>' +
      '<h1 id="brand" class="brand">九鉴</h1>' +
      '<p class="lede">以九型人格理论测动机策略：详析九型得分与翼型，列出最可能的 MBTI，确认后匹配灵塑、史鉴、寰鉴与漫鉴。</p>' +
      '<div class="cta-row">' +
      '<button type="button" class="btn primary" data-action="start">开始九鉴</button>' +
      '<a class="btn ghost" href="../">八维测</a>' +
      '<a class="btn ghost" href="../anime/">漫鉴</a>' +
      "</div>" +
      '<ul class="meta-line"><li>' +
      TOTAL +
      " 题</li><li>约 6–8 分钟</li><li>九型详析</li><li>跨库塑形</li></ul>" +
      "</header>" +
      '<aside class="about-panel">' +
      "<h2>流程说明</h2>" +
      "<p>① 作答九型题 → ② 查看九型得分条、主型/翼型详析与可能的 MBTI → ③ 确认你的 MBTI → ④ 结合两者给出动物塑、中国古代人物、外国历史人物与动漫人物对照及性格解析。</p>" +
      '<p class="note">九型与 MBTI 对照为类型学隐喻，用于自我探索，不构成临床诊断。</p>' +
      "</aside></section>"
    );
  }

  function viewQuiz() {
    const q = state.order[state.index];
    const progress = ((state.index + 1) / TOTAL) * 100;
    const current = state.answers[q.id];
    const scale = D.SCALE_LABELS.map(function (label, i) {
      const value = i + 1;
      const selected = current === value ? "is-selected" : "";
      return (
        '<button type="button" class="scale-btn ' +
        selected +
        '" data-answer="' +
        value +
        '"><span class="scale-dot"></span><span class="scale-label">' +
        escapeHtml(label) +
        "</span></button>"
      );
    }).join("");

    return (
      '<section class="screen quiz">' +
      '<header class="quiz-top">' +
      '<button type="button" class="btn text" data-action="prev"' +
      (state.index === 0 ? " disabled" : "") +
      ">上一题</button>" +
      '<div class="progress-wrap"><div class="progress-bar" style="--p:' +
      progress +
      '%"></div><span class="progress-text">' +
      (state.index + 1) +
      " / " +
      TOTAL +
      "</span></div></header>" +
      '<div class="quiz-body"><p class="q-kicker">九型取向 · Type ' +
      q.ennea +
      '</p><h2 class="q-text">' +
      escapeHtml(q.text) +
      '</h2><div class="scale">' +
      scale +
      "</div></div></section>"
    );
  }

  function scoreBars(ennea) {
    const max = Math.max.apply(
      null,
      Object.keys(ennea.scores).map(function (k) {
        return ennea.scores[k];
      })
    );
    return [1, 2, 3, 4, 5, 6, 7, 8, 9]
      .map(function (t) {
        const sc = ennea.scores[t];
        const pct = max > 0 ? Math.round((sc / max) * 100) : 0;
        const meta = D.ENNEA_PROFILES[t];
        const isPrimary = t === ennea.primary;
        const isWing = t === ennea.wing;
        let cls = "score-row";
        if (isPrimary) cls += " is-primary";
        else if (isWing) cls += " is-wing";
        return (
          '<li class="' +
          cls +
          '"><div class="score-label"><span class="type-num">' +
          t +
          "</span><span>" +
          escapeHtml(meta.name) +
          '</span></div><div class="score-track"><div class="score-fill" style="--w:' +
          pct +
          '%"></div></div><span class="score-val">' +
          sc +
          "</span></li>"
        );
      })
      .join("");
  }

  function likelyMbtiList(ennea) {
    return (ennea.likelyMbti || [])
      .map(function (item, i) {
        const title = D.TYPE_TITLES[item.code] || "";
        return (
          '<li class="mbti-card"><span class="rank">#' +
          (i + 1) +
          '</span><div><strong>' +
          escapeHtml(item.code) +
          "</strong><em>" +
          escapeHtml(title) +
          "</em><p>" +
          escapeHtml(item.why) +
          "</p></div></li>"
        );
      })
      .join("");
  }

  function viewScores() {
    const e = state.ennea;
    const p = e.profile;
    const strengths = (p.strengths || [])
      .map(function (t) {
        return "<li>" + escapeHtml(t) + "</li>";
      })
      .join("");

    return (
      '<section class="screen scores">' +
      '<header class="result-hero">' +
      '<p class="eyebrow">九型结果</p>' +
      '<h1 class="result-type">' +
      escapeHtml(e.label) +
      "</h1>" +
      '<p class="result-sub">' +
      e.primary +
      " 号 · " +
      escapeHtml(p.name) +
      " · 翼 " +
      e.wing +
      " · " +
      escapeHtml(e.center.name) +
      "</p>" +
      '<p class="lede tight">' +
      escapeHtml(p.blurb) +
      "</p></header>" +

      '<section class="panel">' +
      "<h2>九型得分</h2>" +
      '<p class="panel-lede">每型 3 题均值换算为 0–100；主型高亮，邻翼次高亮。次近型为 ' +
      e.secondary +
      " 号「" +
      escapeHtml(D.ENNEA_PROFILES[e.secondary].name) +
      "」。</p>" +
      '<ul class="score-list">' +
      scoreBars(e) +
      "</ul></section>" +

      '<section class="panel">' +
      "<h2>主型详析</h2>" +
      '<dl class="meta-grid">' +
      "<div><dt>基本欲望</dt><dd>" +
      escapeHtml(p.desire) +
      "</dd></div>" +
      "<div><dt>基本恐惧</dt><dd>" +
      escapeHtml(p.fear) +
      "</dd></div>" +
      "<div><dt>激情（失衡）</dt><dd>" +
      escapeHtml(p.passion) +
      "</dd></div>" +
      "<div><dt>德行（整合）</dt><dd>" +
      escapeHtml(p.virtue) +
      "</dd></div>" +
      "<div><dt>中心</dt><dd>" +
      escapeHtml(e.center.name) +
      "（" +
      escapeHtml(e.center.focus) +
      "）</dd></div>" +
      "<div><dt>翼型说明</dt><dd>" +
      escapeHtml(e.wingNote || "邻翼得分决定翼型偏向。") +
      "</dd></div></dl>" +
      '<div class="analysis">' +
      paras(p.analysis) +
      "</div>" +
      '<ul class="trait-list">' +
      strengths +
      "</ul>" +
      '<div class="growth-box"><h3>成长提示</h3><p>' +
      escapeHtml(p.growth) +
      "</p></div></section>" +

      '<section class="panel">' +
      "<h2>最可能的 MBTI</h2>" +
      '<p class="panel-lede">下列关联来自类型学社群中较常见的对照倾向，供参考；请以你已知的 MBTI 为准进行下一步确认。</p>' +
      '<ul class="mbti-list">' +
      likelyMbtiList(e) +
      "</ul></section>" +

      '<div class="cta-row">' +
      '<button type="button" class="btn primary" data-action="to-confirm">确认我的 MBTI</button>' +
      '<button type="button" class="btn ghost" data-action="restart">重新作答</button>' +
      "</div></section>"
    );
  }

  function viewConfirm() {
    const suggested = (state.ennea.likelyMbti || []).map(function (x) {
      return x.code;
    });
    const grid = MBTI_CODES.map(function (code) {
      const hint = suggested.indexOf(code) >= 0 ? " is-hint" : "";
      const sel = state.confirmedMbti === code ? " is-selected" : "";
      return (
        '<button type="button" class="mbti-pick' +
        hint +
        sel +
        '" data-mbti="' +
        code +
        '"><strong>' +
        code +
        "</strong><span>" +
        escapeHtml(D.TYPE_TITLES[code]) +
        "</span></button>"
      );
    }).join("");

    return (
      '<section class="screen confirm">' +
      '<header class="result-hero compact">' +
      '<p class="eyebrow">下一步</p>' +
      '<h1 class="result-type sm">你的 MBTI 是？</h1>' +
      '<p class="lede tight">九鉴结果为 ' +
      escapeHtml(state.ennea.label) +
      "。请选择你已知或自认的十六型；高亮边框为上文较可能的类型，可改选任意一型。</p></header>" +
      '<div class="mbti-grid">' +
      grid +
      "</div>" +
      '<div class="cta-row">' +
      '<button type="button" class="btn primary" data-action="lock-mbti"' +
      (state.confirmedMbti ? "" : " disabled") +
      ">确认并生成塑形</button>" +
      '<button type="button" class="btn text" data-action="back-scores">返回九型解析</button>' +
      "</div></section>"
    );
  }

  function personaCard(kind, label, link, item) {
    if (!item) {
      return (
        '<article class="persona-card"><h3>' +
        escapeHtml(label) +
        '</h3><p class="empty">暂无匹配（人物库未加载）</p></article>'
      );
    }
    const traits = (item.traits || [])
      .map(function (t) {
        return "<li>" + escapeHtml(t) + "</li>";
      })
      .join("");
    const tone = item.tone;
    const style = tone
      ? "--from:" + tone.from + ";--to:" + tone.to + ";--accent:" + tone.accent
      : "";
    return (
      '<article class="persona-card" data-kind="' +
      kind +
      '" style="' +
      style +
      '">' +
      '<div class="persona-visual">' +
      (item.image
        ? '<img src="' +
          escapeHtml(item.image) +
          '" alt="' +
          escapeHtml(item.name) +
          '" loading="lazy" onerror="this.style.display=\'none\'" />'
        : "") +
      '<span class="persona-mark">' +
      escapeHtml((item.name || "?").slice(0, 1)) +
      "</span></div>" +
      '<div class="persona-body">' +
      '<p class="persona-kind">' +
      escapeHtml(label) +
      (item.enneagram ? " · 九型 " + escapeHtml(item.enneagram) : "") +
      "</p>" +
      "<h3>" +
      escapeHtml(item.name) +
      "</h3>" +
      '<p class="persona-sub">' +
      escapeHtml(item.subtitle || item.title || "") +
      (item.title && item.subtitle && item.title !== item.subtitle
        ? " · " + escapeHtml(item.title)
        : "") +
      "</p>" +
      '<div class="analysis">' +
      paras(item.analysis) +
      "</div>" +
      (item.parallels
        ? '<div class="analysis parallels"><h4>与你的对应</h4>' + paras(item.parallels) + "</div>"
        : "") +
      '<ul class="trait-list">' +
      traits +
      '</ul>' +
      '<a class="btn text inline" href="' +
      link +
      '">打开' +
      escapeHtml(label) +
      "完整测试 →</a>" +
      "</div></article>"
    );
  }

  function viewPersonas() {
    const e = state.ennea;
    const p = state.personas;
    const stack = (p.stack || [])
      .map(function (fn, i) {
        return (
          "<li><span>" +
          ["主导", "辅助", "第三", "劣势"][i] +
          "</span><strong>" +
          fn +
          "</strong></li>"
        );
      })
      .join("");

    return (
      '<section class="screen personas">' +
      '<header class="result-hero">' +
      '<p class="eyebrow">综合塑形</p>' +
      '<h1 class="result-type sm">' +
      escapeHtml(p.mbtiCode) +
      " · " +
      escapeHtml(e.label) +
      "</h1>" +
      '<p class="result-sub">' +
      escapeHtml(p.mbtiTitle) +
      " × " +
      e.primary +
      " 号「" +
      escapeHtml(e.profile.name) +
      "」</p></header>" +

      '<section class="panel">' +
      "<h2>综合性格读解</h2>" +
      '<div class="analysis">' +
      paras(p.synthesis) +
      "</div>" +
      '<ol class="stack-list">' +
      stack +
      "</ol></section>" +

      personaCard("animal", "灵塑 · 动物", "../animal/", p.animal) +
      personaCard("history", "史鉴 · 中国古代", "../history/", p.history) +
      personaCard("world", "寰鉴 · 外国历史", "../world/", p.world) +
      personaCard("anime", "漫鉴 · 动漫", "../anime/", p.anime) +

      '<p class="disclaimer">塑形结果为类型学隐喻对照，不构成对历史人物、动物象征或作品角色的鉴定。九型得分来自本测；MBTI 由你确认。</p>' +
      '<div class="cta-row">' +
      '<button type="button" class="btn primary" data-action="restart">再测一次</button>' +
      '<button type="button" class="btn ghost" data-action="to-confirm">更换 MBTI</button>' +
      '<a class="btn ghost" href="../">八维测</a>' +
      "</div></section>"
    );
  }

  function bind() {
    const app = $("#app");
    app.onclick = function (ev) {
      const btn = ev.target.closest("[data-action], [data-answer], [data-mbti]");
      if (!btn) return;
      const action = btn.getAttribute("data-action");

      if (action === "start" || action === "restart") {
        startQuiz();
        return;
      }
      if (action === "prev" && state.index > 0) {
        state.index -= 1;
        render();
        return;
      }
      if (action === "to-confirm") {
        if (!state.confirmedMbti && state.ennea && state.ennea.likelyMbti[0]) {
          state.confirmedMbti = state.ennea.likelyMbti[0].code;
        }
        state.screen = "confirm";
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (action === "back-scores") {
        state.screen = "scores";
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (action === "lock-mbti") {
        if (!state.confirmedMbti) return;
        state.personas = D.matchPersonas(state.confirmedMbti, state.ennea);
        state.screen = "personas";
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (btn.hasAttribute("data-mbti")) {
        state.confirmedMbti = btn.getAttribute("data-mbti");
        render();
        return;
      }
      if (btn.hasAttribute("data-answer")) {
        state.answers[state.order[state.index].id] = Number(btn.getAttribute("data-answer"));
        if (state.index < TOTAL - 1) {
          state.index += 1;
          render();
        } else {
          state.ennea = D.scoreEnneagram(state.answers, state.order);
          state.confirmedMbti = (state.ennea.likelyMbti[0] && state.ennea.likelyMbti[0].code) || null;
          state.personas = null;
          state.screen = "scores";
          render();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };
  }

  function startQuiz() {
    state.order = D.shuffle(D.QUESTIONS);
    state.index = 0;
    state.answers = {};
    state.ennea = null;
    state.confirmedMbti = null;
    state.personas = null;
    state.screen = "quiz";
    render();
  }

  function maybeDemo() {
    const hash = (location.hash || "").replace(/^#/, "");
    if (hash.indexOf("demo") !== 0) return;
    const parts = hash.split("-");
    const enneaLabel = parts[1] || "5w6";
    const mbti = (parts[2] || "INTJ").toUpperCase();
    const m = String(enneaLabel).match(/(\d)w(\d)/);
    const primary = m ? Number(m[1]) : 5;
    const wing = m ? Number(m[2]) : 6;

    const answers = {};
    D.QUESTIONS.forEach(function (q) {
      if (q.ennea === primary) answers[q.id] = 5;
      else if (q.ennea === wing) answers[q.id] = 4;
      else answers[q.id] = 2;
    });
    state.order = D.QUESTIONS.slice();
    state.answers = answers;
    state.ennea = D.scoreEnneagram(answers, state.order);
    state.confirmedMbti = D.TYPE_TITLES[mbti] ? mbti : "INTJ";
    state.personas = D.matchPersonas(state.confirmedMbti, state.ennea);
    state.screen = "personas";
  }

  maybeDemo();
  render();
})();
