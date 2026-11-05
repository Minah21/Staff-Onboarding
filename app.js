(function () {
  "use strict";
  const L = window.LESSONS;
  const PASS = window.PASS_MARK || 75;
  const app = document.getElementById("app");
  const KEY = "aw-onboarding-v1";

  /* ---------- storage (per browser) ---------- */
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  let state = load();
  state.results = state.results || {};
  state.ack = state.ack || {};

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byId = (id) => L.find((l) => l.id === id);
  const passed = (id) => state.results[id] && state.results[id].passed;
  const passedCount = () => L.filter((l) => passed(l.id)).length;

  function toast(msg) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ---------- Supabase ---------- */
  async function sendResult(row) {
    if (!window.SUPABASE_URL || !window.SUPABASE_KEY) return false;
    try {
      const r = await fetch(window.SUPABASE_URL + "/rest/v1/onboarding_results", {
        method: "POST",
        headers: {
          apikey: window.SUPABASE_KEY,
          Authorization: "Bearer " + window.SUPABASE_KEY,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify(row)
      });
      return r.ok;
    } catch (e) { return false; }
  }
  async function flushQueue() {
    const q = state.queue || [];
    if (!q.length) return;
    const left = [];
    for (const row of q) { if (!(await sendResult(row))) left.push(row); }
    state.queue = left; save(state);
  }

  /* ---------- header ---------- */
  document.getElementById("leaveLink").href = window.LEAVE_APPROVER_URL;
  function renderWho() {
    const w = document.getElementById("who");
    if (!state.user) { w.innerHTML = ""; return; }
    w.innerHTML = esc(state.user.name) + ' · <button type="button" id="switchUser">Not you?</button>';
    document.getElementById("switchUser").onclick = () => {
      if (confirmSwitch()) { state = { results: {}, ack: {}, queue: state.queue || [] }; save(state); location.hash = "#/"; render(); }
    };
  }
  function confirmSwitch() { return window.confirm("Sign out and clear progress saved on this computer?"); }

  /* ---------- views ---------- */
  function signIn() {
    app.innerHTML = `
    <form class="signin" id="signin" novalidate>
      <img src="assets/logo.png" alt="A.W. Law LLC">
      <div class="eyebrow" style="text-align:center">Staff onboarding</div>
      <h2 style="text-align:center">Welcome to the firm</h2>
      <p class="small" style="text-align:center">Enter your details so your test results are recorded against your name.</p>
      <label for="nm">Full name</label>
      <input id="nm" autocomplete="name" required placeholder="e.g. Nur Aisyah binte Rahman">
      <label for="em">Work email</label>
      <input id="em" type="email" autocomplete="email" required placeholder="name@awlaw.com.sg">
      <div class="err" id="err"></div>
      <button class="btn" style="width:100%;margin-top:10px">Start onboarding</button>
    </form>`;
    document.getElementById("signin").onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById("nm").value.trim();
      const email = document.getElementById("em").value.trim().toLowerCase();
      const err = document.getElementById("err");
      if (name.length < 2) { err.textContent = "Please enter your full name."; return; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { err.textContent = "Please enter a valid email address."; return; }
      state.user = { name, email }; save(state); renderWho(); render();
    };
  }

  function home() {
    const done = passedCount();
    const pct = Math.round((done / L.length) * 100);
    const first = state.user.name.split(" ")[0];
    const cards = L.map((l) => {
      const r = state.results[l.id];
      const badge = !r ? '<span class="badge todo">Not started</span>'
        : r.passed ? `<span class="badge pass">Passed · ${r.best}%</span>`
        : `<span class="badge fail">Retake · ${r.best}%</span>`;
      return `<button class="lcard" data-go="#/lesson/${l.id}">
        <span class="num">${l.num}</span>
        <h4>${esc(l.title)}</h4>
        <p>${esc(l.blurb)}</p>
        <span class="meta"><span>${l.minutes} min read · ${l.quiz.length}-question test</span>${badge}</span>
      </button>`;
    }).join("");

    app.innerHTML = `
    <section class="hero">
      <div>
        <div class="eyebrow">New staff induction</div>
        <h1>Welcome, ${esc(first)}.</h1>
        <p>Work through the six lessons below. Each ends with a short test, and you need <b>more than ${PASS}%</b> to pass. You can retake a test as many times as you need.</p>
      </div>
      <div class="progress-card">
        <div class="small">Your progress</div>
        <div class="big">${done}<span style="font-size:24px;color:var(--muted)"> / ${L.length} passed</span></div>
        <div class="bar"><i style="width:${pct}%"></i></div>
        <div class="small">${done === L.length ? "All lessons complete. Well done." : "Next up: " + esc((L.find((l) => !passed(l.id)) || L[0]).title)}</div>
      </div>
    </section>
    <div class="grid">
      ${cards}
      <a class="lcard leave" href="${window.LEAVE_APPROVER_URL}" target="_blank" rel="noopener">
        <span class="num">↗</span>
        <h4>Leave Approver</h4>
        <p>Apply for annual, medical and other leave, and track approvals. All leave goes through here.</p>
        <span class="meta"><span>Opens in a new tab</span></span>
      </a>
    </div>
    ${done === L.length ? certificate() : ""}`;
    app.querySelectorAll("[data-go]").forEach((b) => (b.onclick = () => (location.hash = b.dataset.go)));
  }

  function certificate() {
    const d = new Date().toLocaleDateString("en-SG", { day: "numeric", month: "long", year: "numeric" });
    return `<section class="cert">
      <img src="assets/logo.png" alt="A.W. Law LLC">
      <div class="eyebrow" style="margin-top:14px">Certificate of completion</div>
      <div class="name">${esc(state.user.name)}</div>
      <p>has completed the A.W. Law LLC staff onboarding programme and passed all six assessments.</p>
      <p class="small">${d}</p>
      <button class="btn btn-ghost btn-sm" onclick="window.print()">Print certificate</button>
    </section>`;
  }

  function crumbs(active) {
    return `<nav class="crumbs" aria-label="Lessons">${L.map((l) =>
      `<a href="#/lesson/${l.id}" class="${l.id === active ? "on" : ""}">${l.num} ${esc(l.short)}${passed(l.id) ? " ✓" : ""}</a>`).join("")}</nav>`;
  }

  function lesson(id) {
    const l = byId(id); if (!l) return home();
    const idx = L.indexOf(l);
    const prev = L[idx - 1];
    app.innerHTML = `${crumbs(id)}
    <article class="lesson">
      <div class="eyebrow">Lesson ${l.num} · ${l.minutes} min read</div>
      <h2>${esc(l.title)}</h2>
      ${l.html}
      ${l.ack ? `<label class="ack"><input type="checkbox" id="ack" ${state.ack[id] ? "checked" : ""}><span><b>Acknowledgment.</b> ${esc(l.ack)}</span></label>` : ""}
      <div class="lesson-foot">
        ${prev ? `<a class="btn btn-ghost" href="#/lesson/${prev.id}">← ${esc(prev.short)}</a>` : `<a class="btn btn-ghost" href="#/">← All lessons</a>`}
        <button class="btn" id="toTest">Take the ${esc(l.short)} test →</button>
      </div>
    </article>`;

    // wrap wide tables for small screens
    app.querySelectorAll("table.fees").forEach((t) => { const w = document.createElement("div"); w.className = "table-wrap"; t.parentNode.insertBefore(w, t); w.appendChild(t); });
    // copy buttons on precedents
    app.querySelectorAll(".prec").forEach((p) => {
      const b = document.createElement("button");
      b.className = "btn btn-ghost btn-sm copy"; b.type = "button"; b.textContent = "Copy template";
      b.onclick = async () => {
        const text = p.querySelector("pre").innerText;
        try { await navigator.clipboard.writeText(text); toast(p.dataset.title + " copied"); }
        catch (e) { toast("Select the text and copy it manually"); }
      };
      p.appendChild(b);
    });
    const ack = document.getElementById("ack");
    const btn = document.getElementById("toTest");
    const sync = () => { if (ack) btn.disabled = !ack.checked; };
    if (ack) ack.onchange = () => { state.ack[id] = ack.checked; save(state); sync(); };
    sync();
    btn.onclick = () => (location.hash = "#/test/" + id);
  }

  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  function test(id) {
    const l = byId(id); if (!l) return home();
    if (l.ack && !state.ack[id]) { location.hash = "#/lesson/" + id; return; }
    // shuffle question and option order on every attempt
    const qs = shuffle(l.quiz.map((q, qi) => ({ ...q, qi, opts: shuffle(q.o.map((text, oi) => ({ text, oi }))) })));
    app.innerHTML = `${crumbs(id)}
    <div class="test-head">
      <div><div class="eyebrow">Test · Lesson ${l.num}</div><h2>${esc(l.title)}</h2>
      <p class="small">${qs.length} questions · pass mark: more than ${PASS}% (at least ${Math.floor(qs.length * PASS / 100) + 1} correct)</p></div>
      <a class="btn btn-ghost btn-sm" href="#/lesson/${id}">← Review lesson</a>
    </div>
    <div id="res"></div>
    <form id="quiz">
      ${qs.map((q, n) => `<div class="q" data-q="${n}"><fieldset>
        <legend><span class="n">${n + 1}.</span><span>${esc(q.q)}</span></legend>
        ${q.opts.map((o) => `<label class="opt"><input type="radio" name="q${n}" value="${o.oi}"><span>${esc(o.text)}</span></label>`).join("")}
        <div class="verdict"></div></fieldset></div>`).join("")}
      <div class="sticky-submit"><span class="small" id="count">0 of ${qs.length} answered</span><button class="btn" id="submit">Submit test</button></div>
    </form>`;

    const form = document.getElementById("quiz");
    const countEl = document.getElementById("count");
    form.addEventListener("change", (e) => {
      if (e.target.type !== "radio") return;
      e.target.closest("fieldset").querySelectorAll(".opt").forEach((o) => o.classList.toggle("sel", o.querySelector("input").checked));
      const n = qs.filter((_, i) => form.querySelector(`input[name=q${i}]:checked`)).length;
      countEl.textContent = `${n} of ${qs.length} answered`;
    });

    form.onsubmit = async (e) => {
      e.preventDefault();
      const unanswered = qs.findIndex((_, i) => !form.querySelector(`input[name=q${i}]:checked`));
      if (unanswered >= 0) {
        toast("Please answer every question");
        form.querySelector(`[data-q="${unanswered}"]`).scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      let score = 0;
      qs.forEach((q, i) => { if (+form.querySelector(`input[name=q${i}]:checked`).value === q.a) score++; });
      const percent = Math.round((score / qs.length) * 10000) / 100;
      const ok = percent > PASS;

      // mark answers: on a pass show the right answers; on a fail only flag wrong ones
      qs.forEach((q, i) => {
        const box = form.querySelector(`[data-q="${i}"]`);
        const chosen = +form.querySelector(`input[name=q${i}]:checked`).value;
        const right = chosen === q.a;
        box.classList.toggle("miss", !right);
        box.querySelectorAll(".opt").forEach((o) => {
          const v = +o.querySelector("input").value;
          o.classList.remove("sel");
          if (v === chosen) o.classList.add(right ? "right" : "wrong");
          if (ok && v === q.a) o.classList.add("right");
          o.querySelector("input").disabled = true;
        });
        const vd = box.querySelector(".verdict");
        vd.textContent = right ? "Correct" : ok ? "Incorrect — the correct answer is highlighted." : "Incorrect";
        vd.style.color = right ? "var(--ok)" : "var(--bad)";
      });
      form.querySelector(".sticky-submit").remove();

      const prev = state.results[id];
      state.results[id] = { passed: (prev && prev.passed) || ok, best: Math.max(percent, prev ? prev.best : 0), last: percent, attempts: (prev ? prev.attempts : 0) + 1 };
      save(state);

      const idx = L.indexOf(l), next = L[idx + 1];
      const allDone = passedCount() === L.length;
      const res = document.getElementById("res");
      res.innerHTML = `<div class="result ${ok ? "pass" : "fail"}">
        <div class="score">${percent}%</div>
        <h3 style="margin:8px 0 4px;color:inherit">${ok ? "Passed" : "Not yet — you need more than " + PASS + "%"}</h3>
        <p class="small">${score} of ${qs.length} correct${ok ? "" : ". Questions you got wrong are marked in red. Review the lesson and try again."}</p>
        <p class="small" id="saveMsg">Saving your result…</p>
        <div class="actions">
          ${ok ? (next ? `<a class="btn" href="#/lesson/${next.id}">Next: ${esc(next.title)} →</a>` : `<a class="btn" href="#/">${allDone ? "View certificate" : "Back to lessons"}</a>`)
               : `<a class="btn" href="#/test/${id}" id="retry">Retake test</a><a class="btn btn-ghost" href="#/lesson/${id}">Review lesson</a>`}
          ${ok ? `<a class="btn btn-ghost" href="#/">All lessons</a>` : ""}
        </div></div>`;
      res.scrollIntoView({ behavior: "smooth", block: "start" });
      const retry = document.getElementById("retry");
      if (retry) retry.onclick = (ev) => { ev.preventDefault(); test(id); window.scrollTo(0, 0); };

      const row = { staff_name: state.user.name, staff_email: state.user.email, lesson: id, score, total: qs.length, percent, passed: ok, acknowledged: !!state.ack[id] };
      const sent = await sendResult(row);
      if (!sent) { state.queue = (state.queue || []).concat([row]); save(state); }
      const m = document.getElementById("saveMsg");
      if (m) m.textContent = sent ? "Your result has been recorded." : "Saved on this computer; it will be sent to the firm when the connection is available.";
    };
  }

  /* ---------- router ---------- */
  function render() {
    renderWho();
    if (!state.user) return signIn();
    const [, view, id] = (location.hash || "#/").split("/");
    if (view === "lesson") lesson(id);
    else if (view === "test") test(id);
    else home();
    app.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", render);
  render();
  flushQueue();
})();
