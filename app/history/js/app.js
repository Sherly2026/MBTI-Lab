(function () {
  const D = window.HISTORY_DATA;
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
      '<p class="eyebrow">MBTI Lab · History Persona</p>' +
      '<h1 id="brand" class="brand">史鉴</h1>' +
      '<p class="lede">以荣格八维与九型人格为轴，在中国古代人物中寻找相近的生命姿态：每型多位人选，解析尽量具体。</p>' +
      '<div class="cta-row">' +
      '<button type="button" class="btn primary" data-action="start">开始对照</button>' +
      '<a class="btn ghost" href="../anime/">漫鉴</a>' +
      '<a class="btn ghost" href="../world/">寰鉴</a>' +
      "</div>" +
      '<ul class="meta-line"><li>' +
      TOTAL +
      " 题</li><li>约 7–9 分钟</li><li>每型 ≥3 人</li><li>八维 + 九型</li></ul>" +
      "</header>" +
      '<aside class="about-panel">' +
      "<h2>如何得出人物</h2>" +
      "<p>先由八维匹配 MBTI，再由九型题得到主型与翼型；在该 MBTI 的人物池中，按功能权重与九型契合度选出主结果，并展示同型其他人物。</p>" +
      "<p class=\"note\">人物塑形是教学隐喻，不是对历史人物的心理鉴定。</p>" +
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
    const tag = q.kind === "ennea" ? "九型取向" : "认知偏好";

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
      '<div class="quiz-body"><p class="q-kicker">' +
      tag +
      '</p><h2 class="q-text">' +
      escapeHtml(q.text) +
      '</h2><div class="scale">' +
      scale +
      "</div></div></section>"
    );
  }

  function posterStyle(fig) {
    const tone = fig.tone || { from: "#1c2a33", to: "#0a1218", accent: "#c9b28a" };
    return "--from:" + tone.from + ";--to:" + tone.to + ";--accent:" + tone.accent;
  }

  function viewResult() {
    const r = state.result;
    const fig = r.figure;
    const mbti = r.mbti;
    const ennea = r.ennea;
    const traits = (fig.traits || [])
      .map(function (t) {
        return "<li>" + escapeHtml(t) + "</li>";
      })
      .join("");
    const stack = (mbti.stack || [])
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
    const alts = (r.alternatives || [])
      .map(function (a) {
        return (
          '<li class="alt-card" style="' +
          posterStyle(a) +
          '"><div class="alt-poster">' +
          (a.image
            ? '<img src="' + escapeHtml(a.image) + '" alt="' + escapeHtml(a.name) + '" loading="lazy" />'
            : "") +
          '</div><div class="alt-meta"><strong>' +
          escapeHtml(a.name) +
          "</strong><span>" +
          escapeHtml(a.dynasty) +
          " · " +
          escapeHtml(a.enneagram) +
          "</span><em>" +
          escapeHtml(a.title) +
          "</em></div></li>"
        );
      })
      .join("");

    return (
      '<section class="screen result">' +
      '<figure class="hero-visual" style="' +
      posterStyle(fig) +
      '">' +
      '<div class="poster-layer"><span class="poster-mark">' +
      escapeHtml(fig.name.slice(0, 1)) +
      "</span></div>" +
      (fig.image
        ? '<img class="hero-photo" src="' +
          escapeHtml(fig.image) +
          '" alt="' +
          escapeHtml(fig.name) +
          '" onerror="if(!this.dataset.fb){this.dataset.fb=1;var s=this.src;this.src=s.indexOf(\'.svg\')>-1?s.replace(\'.svg\',\'.jpg\'):s.replace(\'.jpg\',\'.svg\');}" />'
        : "") +
      '<figcaption class="hero-caption">' +
      '<p class="eyebrow">' +
      escapeHtml(mbti.code) +
      " · " +
      escapeHtml(mbti.title) +
      " · 九型 " +
      escapeHtml(ennea.label) +
      "</p>" +
      '<h1 class="figure-name">' +
      escapeHtml(fig.name) +
      "</h1>" +
      '<p class="figure-sub">' +
      escapeHtml(fig.dynasty) +
      " · " +
      escapeHtml(fig.title) +
      "</p></figcaption></figure>" +

      '<section class="panel">' +
      "<h2>性格对照解析</h2>" +
      '<div class="analysis">' +
      paras(fig.analysis) +
      "</div>" +
      '<ul class="trait-list">' +
      traits +
      "</ul></section>" +

      '<section class="panel">' +
      "<h2>与你的对应</h2>" +
      '<div class="analysis">' +
      paras(fig.parallels) +
      "</div>" +
      '<p class="meta-line-inline">九型 ' +
      escapeHtml(String(ennea.primary)) +
      "（" +
      escapeHtml(ennea.meta.name) +
      "）· " +
      escapeHtml(ennea.meta.core) +
      " · 翼 " +
      escapeHtml(String(ennea.wing)) +
      "</p>" +
      '<p class="meta-line-inline">次近 MBTI ' +
      escapeHtml(mbti.secondaryCode) +
      "（" +
      escapeHtml(mbti.secondaryTitle) +
      "）</p></section>" +

      '<section class="panel"><h2>功能栈</h2><ol class="stack-list">' +
      stack +
      "</ol></section>" +

      '<section class="panel"><h2>同型其他人物</h2>' +
      '<p class="panel-lede">同一 MBTI 可对应多种历史姿态；下列同属 ' +
      escapeHtml(mbti.code) +
      "，九型或功能侧重不同。</p>" +
      '<ul class="alt-grid">' +
      alts +
      "</ul></section>" +

      '<p class="disclaimer">本结果用于自我探索与历史文化趣味对照，不构成对历史人物的临床或史实鉴定。配图来自 Wikimedia Commons 本地缓存或海报底图。</p>' +
      '<div class="cta-row">' +
      '<button type="button" class="btn primary" data-action="restart">再测一次</button>' +
      '<a class="btn ghost" href="../animal/">灵塑</a>' +
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

  function maybeDemo() {
    const hash = (location.hash || "").replace(/^#/, "");
    if (hash.indexOf("demo") !== 0) return;
    const code = (hash.split("-")[1] || "INTJ").toUpperCase();
    const answers = {};
    D.QUESTIONS.forEach(function (q) {
      answers[q.id] = 3;
    });
    state.order = D.QUESTIONS.slice();
    state.answers = answers;
    state.result = D.computeResult(answers, state.order);
    if (D.FIGURES[code]) {
      state.result.mbti.code = code;
      state.result.mbti.title = D.TYPE_TITLES[code];
      state.result.mbti.stack = D.TYPE_STACKS[code];
      state.result.figure = D.FIGURES[code][0];
      state.result.alternatives = D.FIGURES[code].slice(1);
      state.result.pool = D.FIGURES[code];
    }
    state.screen = "result";
  }

  maybeDemo();
  render();
})();
