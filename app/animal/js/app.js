(function () {
  const D = window.ANIMAL_DATA;
  const TOTAL = D.QUESTIONS.length;

  const state = {
    screen: "home",
    order: [],
    index: 0,
    answers: {},
    result: null,
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

  function render() {
    const app = $("#app");
    app.classList.remove("is-ready");
    if (state.screen === "home") app.innerHTML = viewHome();
    else if (state.screen === "quiz") app.innerHTML = viewQuiz();
    else if (state.screen === "result") app.innerHTML = viewResult();
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
      '<p class="eyebrow">MBTI Lab · Animal Persona</p>' +
      '<h1 id="brand" class="brand">灵塑</h1>' +
      '<p class="lede">基于荣格八维与 MBTI 类型学的动物塑造型：同型可对应多种动物，结果含性格解说与视觉形象。</p>' +
      '<div class="cta-row">' +
      '<button type="button" class="btn primary" data-action="start">开始塑形</button>' +
      '<a class="btn ghost" href="../index.html">返回八维测</a>' +
      "</div>" +
      '<ul class="meta-line"><li>' +
      TOTAL +
      " 题</li><li>约 5–7 分钟</li><li>每型多动物</li></ul>" +
      "</header>" +
      '<aside class="about-panel">' +
      "<h2>如何得出动物塑</h2>" +
      "<p>先以八维得分匹配 MBTI 类型，再在该型的动物池中，按你的功能偏好加权选出最贴合的一种，并展示同型其他可能塑形。</p>" +
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
        '" aria-pressed="' +
        (current === value) +
        '"><span class="scale-dot" aria-hidden="true"></span><span class="scale-label">' +
        escapeHtml(label) +
        "</span></button>"
      );
    }).join("");

    return (
      '<section class="screen quiz" aria-labelledby="q-text">' +
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
      '<div class="quiz-body"><p class="q-kicker">选最贴近日常倾向的一项</p>' +
      '<h2 id="q-text" class="q-text">' +
      escapeHtml(q.text) +
      '</h2><div class="scale" role="group">' +
      scale +
      "</div></div></section>"
    );
  }

  function posterStyle(animal) {
    const tone = animal.tone || { from: "#1e3d36", to: "#0f1c1a", accent: "#c4a574" };
    return (
      "--from:" +
      tone.from +
      ";--to:" +
      tone.to +
      ";--accent:" +
      tone.accent
    );
  }

  function viewResult() {
    const r = state.result;
    const animal = r.animal;
    const type = r.type;
    const alts = r.alternatives || [];
    const traits = animal.traits
      .map(function (t) {
        return "<li>" + escapeHtml(t) + "</li>";
      })
      .join("");
    const stack = type.stack
      .map(function (fn, i) {
        return (
          "<li><span>" +
          ["主导", "辅助", "第三", "劣势"][i] +
          '</span><strong>' +
          fn +
          "</strong></li>"
        );
      })
      .join("");
    const altCards = alts
      .map(function (a) {
        const thumb = a.image
          ? '<img class="alt-photo" src="' +
            escapeHtml(a.image) +
            '" alt="' +
            escapeHtml(a.name) +
            '" loading="lazy" />'
          : "";
        return (
          '<li class="alt-card" style="' +
          posterStyle(a) +
          '">' +
          '<div class="alt-poster">' +
          thumb +
          '</div>' +
          '<div class="alt-meta"><strong>' +
          escapeHtml(a.name) +
          "</strong><span>" +
          escapeHtml(a.epithet) +
          "</span></div></li>"
        );
      })
      .join("");

    return (
      '<section class="screen result">' +
      '<figure class="hero-visual" style="' +
      posterStyle(animal) +
      '">' +
      '<div class="poster-layer" aria-hidden="true">' +
      '<span class="poster-mark">' +
      escapeHtml(animal.name.slice(0, 1)) +
      "</span></div>" +
      (animal.image
        ? '<img class="hero-photo" src="' +
          escapeHtml(animal.image) +
          '" alt="' +
          escapeHtml(animal.name) +
          '" loading="eager" />'
        : "") +
      '<figcaption class="hero-caption">' +
      '<p class="eyebrow">' +
      escapeHtml(type.code) +
      " · " +
      escapeHtml(type.title) +
      "</p>" +
      '<h1 class="animal-name">' +
      escapeHtml(animal.name) +
      "</h1>" +
      '<p class="animal-epithet">' +
      escapeHtml(animal.epithet) +
      "</p></figcaption></figure>" +

      '<section class="panel analysis">' +
      "<h2>性格塑说</h2>" +
      '<p class="analysis-text">' +
      escapeHtml(animal.analysis) +
      '</p><ul class="trait-list">' +
      traits +
      "</ul>" +
      '<p class="confidence">类型匹配 ' +
      type.confidence +
      " · 次近类型 " +
      escapeHtml(type.secondaryCode) +
      "（" +
      escapeHtml(type.secondaryTitle) +
      "）</p></section>" +

      '<section class="panel"><h2>功能栈</h2>' +
      '<p class="panel-lede">' +
      escapeHtml(type.code) +
      " 的经典四功能</p>" +
      '<ol class="stack-list">' +
      stack +
      "</ol></section>" +

      (altCards
        ? '<section class="panel"><h2>同型其他塑</h2>' +
          '<p class="panel-lede">同一 MBTI 不只有一种动物；以下同样符合 ' +
          escapeHtml(type.code) +
          '</p><ul class="alt-grid">' +
          altCards +
          "</ul></section>"
        : "") +

      '<p class="disclaimer">动物塑是类型学的隐喻表达，用于自我探索与审美想象，不构成科学鉴定。配图来自 Wikimedia Commons（本地缓存）及页面视觉海报。</p>' +
      '<div class="cta-row">' +
      '<button type="button" class="btn primary" data-action="restart">再测一次</button>' +
      '<a class="btn ghost" href="../index.html">八维测</a>' +
      "</div></section>"
    );
  }

  function bind() {
    const app = $("#app");
    app.onclick = function (e) {
      const btn = e.target.closest("[data-action], [data-answer]");
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
      if (btn.hasAttribute("data-answer")) {
        state.answers[state.order[state.index].id] = Number(btn.getAttribute("data-answer"));
        if (state.index < TOTAL - 1) {
          state.index += 1;
          render();
        } else {
          state.result = D.computeResult(state.answers, state.order);
          state.screen = "result";
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
    state.result = null;
    state.screen = "quiz";
    render();
  }

  /** 预览：#demo-ENTJ 可直接查看该型结果与配图 */
  function maybeDemo() {
    const hash = (location.hash || "").replace(/^#/, "");
    if (hash.indexOf("demo") !== 0) return false;
    const code = (hash.split("-")[1] || "").toUpperCase();
    const answers = {};
    D.QUESTIONS.forEach(function (q) {
      answers[q.id] = 3;
    });
    state.order = D.QUESTIONS.slice();
    state.answers = answers;
    state.result = D.computeResult(answers, state.order);
    if (code && D.ANIMALS[code]) {
      const pick = D.ANIMALS[code];
      state.result.type.code = code;
      state.result.type.title = D.TYPE_TITLES[code] || code;
      state.result.type.stack = D.TYPE_STACKS[code] || state.result.type.stack;
      state.result.animal = pick[0];
      state.result.alternatives = pick.slice(1);
      state.result.pool = pick;
    }
    state.screen = "result";
    return true;
  }

  maybeDemo();
  render();
})();
