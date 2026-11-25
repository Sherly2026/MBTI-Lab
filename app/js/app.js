(function () {
  const D = window.MBTI_DATA;
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
    const blurbs = Object.keys(D.FUNCTION_BLURBS)
      .map(function (id) {
        return (
          '<li><span class="fn-tag">' +
          id +
          "</span><span>" +
          D.FUNCTION_BLURBS[id] +
          "</span></li>"
        );
      })
      .join("");

    return (
      '<section class="screen home" aria-labelledby="brand">' +
      '<div class="home-atmosphere" aria-hidden="true"></div>' +
      '<header class="home-hero">' +
      '<p class="eyebrow">MBTI Lab · Jungian 8</p>' +
      '<h1 id="brand" class="brand">八维测</h1>' +
      '<p class="lede">用荣格八维看清你的认知偏好：题量适中，情境清晰，结果给出类型与功能栈。</p>' +
      '<div class="cta-row">' +
      '<button type="button" class="btn primary" data-action="start">开始测试</button>' +
      '<button type="button" class="btn ghost" data-action="about">了解八维</button>' +
      "</div>" +
      '<ul class="meta-line"><li>' +
      TOTAL +
      " 题</li><li>约 6–8 分钟</li><li>八维计分</li></ul>" +
      "</header>" +
      '<aside class="about-panel" id="about" hidden>' +
      "<h2>八种认知功能</h2>" +
      "<p>荣格提出感知（感觉 / 直觉）与判断（思维 / 情感）两轴，并区分内倾与外倾，形成八维。MBTI 十六型可理解为不同功能栈的组合。</p>" +
      '<ul class="fn-grid">' +
      blurbs +
      "</ul>" +
      '<button type="button" class="btn text" data-action="close-about">收起</button>' +
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
        '">' +
        '<span class="scale-dot" aria-hidden="true"></span>' +
        '<span class="scale-label">' +
        label +
        "</span></button>"
      );
    }).join("");

    return (
      '<section class="screen quiz" aria-labelledby="q-text">' +
      '<header class="quiz-top">' +
      '<button type="button" class="btn text back" data-action="prev"' +
      (state.index === 0 ? " disabled" : "") +
      ">上一题</button>" +
      '<div class="progress-wrap" aria-label="进度">' +
      '<div class="progress-bar" style="--p:' +
      progress +
      '%"></div>' +
      '<span class="progress-text">' +
      (state.index + 1) +
      " / " +
      TOTAL +
      "</span></div></header>" +
      '<div class="quiz-body">' +
      '<p class="q-kicker">请选择最贴近你平时倾向的一项</p>' +
      '<h2 id="q-text" class="q-text">' +
      q.text +
      "</h2>" +
      '<div class="scale" role="group" aria-label="符合程度">' +
      scale +
      "</div></div></section>"
    );
  }

  function viewResult() {
    const match = state.result.match;
    const functionRank = state.result.functionRank;
    const functionScores = state.result.functionScores;
    const primary = match.primary;
    const secondary = match.secondary;
    const pos = ["主导", "辅助", "第三", "劣势"];

    const stack = primary.stack
      .map(function (fn, i) {
        return (
          '<li class="stack-item">' +
          '<span class="stack-pos">' +
          pos[i] +
          '</span><span class="stack-fn">' +
          fn +
          '</span><span class="stack-score">' +
          functionScores[fn] +
          "</span></li>"
        );
      })
      .join("");

    const bars = functionRank
      .map(function (row) {
        const inStack = primary.stack.indexOf(row.id) !== -1;
        return (
          '<li class="bar-row' +
          (inStack ? " in-stack" : "") +
          '"><div class="bar-label"><span class="fn-tag">' +
          row.id +
          '</span><span class="bar-name">' +
          row.meta.name +
          '</span></div><div class="bar-track"><span class="bar-fill" style="--w:' +
          row.score +
          '%"></span></div><span class="bar-val">' +
          row.score +
          "</span></li>"
        );
      })
      .join("");

    const traits = primary.traits
      .map(function (t) {
        return "<li>" + t + "</li>";
      })
      .join("");

    const ranking = match.ranking
      .map(function (r, i) {
        return (
          "<li><span>" +
          (i + 1) +
          ". " +
          r.code +
          "</span><span>" +
          r.title +
          "</span></li>"
        );
      })
      .join("");

    return (
      '<section class="screen result" aria-labelledby="type-code">' +
      '<div class="result-hero">' +
      '<p class="eyebrow">你的倾向类型</p>' +
      '<h1 id="type-code" class="type-code">' +
      primary.code +
      '</h1><p class="type-title">' +
      primary.title +
      '</p><p class="type-blurb">' +
      primary.blurb +
      '</p><ul class="trait-list">' +
      traits +
      '</ul><p class="confidence">匹配指数 ' +
      match.confidence +
      " · 次近类型 " +
      secondary.code +
      "（" +
      secondary.title +
      "）</p></div>" +
      '<section class="panel"><h2>功能栈</h2><p class="panel-lede">' +
      primary.code +
      ' 的经典四功能顺序</p><ol class="stack-list">' +
      stack +
      "</ol></section>" +
      '<section class="panel"><h2>八维得分</h2><p class="panel-lede">百分制；加粗行为你类型栈内功能</p><ul class="bar-list">' +
      bars +
      "</ul></section>" +
      '<section class="panel compact"><h2>相近类型</h2><ol class="rank-list">' +
      ranking +
      "</ol></section>" +
      '<p class="disclaimer">本测试用于自我探索与学习荣格八维，不构成临床或职业鉴定。结果反映作答时的自我报告偏好。</p>' +
      '<div class="cta-row">' +
      '<button type="button" class="btn primary" data-action="restart">再测一次</button>' +
      '<button type="button" class="btn ghost" data-action="home">返回首页</button>' +
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
      if (action === "home") {
        state.screen = "home";
        state.result = null;
        render();
        return;
      }
      if (action === "about") {
        const panel = $("#about");
        if (panel) panel.hidden = false;
        return;
      }
      if (action === "close-about") {
        const panel = $("#about");
        if (panel) panel.hidden = true;
        return;
      }
      if (action === "prev") {
        if (state.index > 0) {
          state.index -= 1;
          render();
        }
        return;
      }
      if (btn.hasAttribute("data-answer")) {
        const value = Number(btn.getAttribute("data-answer"));
        const q = state.order[state.index];
        state.answers[q.id] = value;
        if (state.index < TOTAL - 1) {
          state.index += 1;
          render();
        } else {
          finish();
        }
      }
    };
  }

  function startQuiz() {
    state.order = D.shuffleQuestions(D.QUESTIONS);
    state.index = 0;
    state.answers = {};
    state.result = null;
    state.screen = "quiz";
    render();
  }

  function finish() {
    state.result = D.computeResult(state.answers, state.order);
    state.screen = "result";
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  render();
})();
