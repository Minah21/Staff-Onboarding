/* A Day at A.W. Law — onboarding game.
   Six rooms, six mini-games, one working day (9:00 AM → 6:00 PM). */
(function () {
  "use strict";
  const stage = document.getElementById("stage");
  const hud = document.getElementById("hud");
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const store = {
    get(k, d) { try { const v = localStorage.getItem("awgame-" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("awgame-" + k, JSON.stringify(v)); } catch (e) {} }
  };
  const playerName = (() => { try { const s = JSON.parse(localStorage.getItem("aw-onboarding-v1")); return s && s.user ? s.user.name.split(" ")[0] : ""; } catch (e) { return ""; } })();

  /* ---------- sound ---------- */
  let muted = store.get("muted", false), actx;
  const muteBtn = $("#mute");
  function paintMute() { muteBtn.textContent = muted ? "🔇 Sound off" : "🔊 Sound on"; muteBtn.setAttribute("aria-pressed", String(muted)); }
  muteBtn.onclick = () => { muted = !muted; store.set("muted", muted); paintMute(); };
  paintMute();
  function tone(freqs, dur, type) {
    if (muted) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      freqs.forEach((f, i) => {
        const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + i * dur * 0.9;
        o.type = type || "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g).connect(actx.destination); o.start(t); o.stop(t + dur + 0.02);
      });
    } catch (e) {}
  }
  const sfx = {
    good: () => tone([660, 880], 0.09),
    bad: () => tone([220, 170], 0.14, "square"),
    level: () => tone([523, 659, 784, 1047], 0.12),
    tick: () => tone([1200], 0.03, "triangle")
  };

  /* ---------- game state ---------- */
  const G = { score: 0, streak: 0, level: 0, results: [], right: 0, total: 0 };
  function setClock(label, h, m) {
    $("#clock").textContent = label;
    const f = $("#clockFace");
    f.style.setProperty("--h", ((h % 12) * 30 + m * 0.5) + "deg");
    f.style.setProperty("--m", (m * 6) + "deg");
  }
  function paintScore() {
    const s = $("#score"); s.textContent = G.score; s.classList.remove("pop"); void s.offsetWidth; s.classList.add("pop");
    $("#streak").textContent = G.streak >= 3 ? `🔥 ${G.streak} in a row` : "";
  }
  function good(bonus) {
    G.streak++; G.right++; G.total++;
    G.score += 100 + (G.streak >= 3 ? 50 : 0) + (bonus || 0);
    sfx.good(); paintScore();
  }
  function bad() {
    G.streak = 0; G.total++;
    G.score = Math.max(0, G.score - 25);
    sfx.bad(); paintScore();
  }
  function shake(el) { el.classList.remove("shake"); void el.offsetWidth; el.classList.add("shake"); }

  /* timer helper: calls onTick(fraction) and onEnd() */
  function countdown(seconds, el, onEnd) {
    const start = performance.now(); let raf, done = false;
    const bar = el.querySelector("i");
    function frame(now) {
      const left = Math.max(0, 1 - (now - start) / (seconds * 1000));
      bar.style.width = left * 100 + "%";
      el.classList.toggle("low", left < 0.25);
      if (left <= 0) { done = true; onEnd(); return; }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return { stop() { cancelAnimationFrame(raf); }, left() { return done ? 0 : Math.max(0, 1 - (performance.now() - start) / (seconds * 1000)); } };
  }

  /* ---------- levels ---------- */
  const LEVELS = [
    {
      id: "reception", icon: "🛎️", room: "Reception", time: "9:00 AM", h: 9, m: 0,
      title: "Life of a Matter",
      brief: "A walk-in client, Eugene Tan, needs help. Get his matter from the front door to an open file in the right order.",
      rules: ["Tap the steps in the order they happen", "Wrong order costs points"],
      boss: "Every matter follows the same path. Get the order right and nothing falls through the cracks.",
      play: playOrder
    },
    {
      id: "files", icon: "🗂️", room: "File Room", time: "10:30 AM", h: 10, m: 30,
      title: "Folder Frenzy",
      brief: "Eugene's documents are piling up. File each one into the right OneDrive sub-folder before the clock runs out.",
      rules: ["10 documents, 45 seconds", "Tap the folder each document belongs in", "Faster filing earns bonus points"],
      boss: "Admin, Cause, Corres, Documents, Research. Every client folder has the same five.",
      play: playSort
    },
    {
      id: "drafting", icon: "✍️", room: "Drafting Desk", time: "12:00 PM", h: 12, m: 0,
      title: "Red Pen Review",
      brief: "A trainee left this letter on your desk. It has 6 mistakes. Find them all before it goes out.",
      rules: ["Tap anything that breaks the house style", "Tapping something that's correct costs points"],
      boss: "Every letter is evidence. A judge might read it one day.",
      play: playSpot
    },
    {
      id: "mailroom", icon: "📮", room: "Mailroom", time: "2:00 PM", h: 14, m: 0,
      title: "Name It Right",
      brief: "Files and emails are flying out the door. Pick the version that follows the firm's naming rules.",
      rules: ["8 rounds, 8 seconds each", "Pick the correct one of two", "Quick answers earn bonus points"],
      boss: "Good file names mean anyone can find anything, even years later.",
      play: playDuel
    },
    {
      id: "ethics", icon: "⚖️", room: "Ethics Corner", time: "3:30 PM", h: 15, m: 30,
      title: "What Would You Do?",
      brief: "Real situations, real choices. Handle each one the A.W. Law way.",
      rules: ["6 situations", "Choose how you'd respond", "See what happens next"],
      boss: "Integrity isn't a rule we follow. It's who we are.",
      play: playDilemmas
    },
    {
      id: "billing", icon: "💼", room: "Billing Office", time: "5:00 PM", h: 17, m: 0,
      title: "Price Check",
      brief: "End-of-day rush at Billing. Answer fast. Clients are waiting on quotes.",
      rules: ["8 questions, 10 seconds each", "Pick one of three", "Speed earns bonus points"],
      boss: "No client should ever be surprised by a bill.",
      play: playBilling
    }
  ];

  /* ---------- screens ---------- */
  function titleScreen() {
    hud.hidden = true;
    const best = store.get("best", null);
    stage.innerHTML = `
    <section class="title">
      <img class="logo" src="assets/logo.png" alt="A.W. Law LLC">
      <div class="eyebrow" style="margin-top:14px">Staff onboarding game</div>
      <h1>A Day at A.W. Law</h1>
      <p class="tag">${playerName ? esc(playerName) + ", it's" : "It's"} your first full day. Six rooms, six challenges, one clock ticking from 9 to 6. Can you make it to the end of the day as <b>Associate Director material</b>?</p>
      <button class="btn btn-xl" id="go">Start your day →</button>
      ${best ? `<div class="best">Your best: <b>${best.score.toLocaleString()}</b> points · ${"★".repeat(best.stars)} ${esc(best.rank)}</div>` : ""}
    </section>
    <div class="map">
      ${LEVELS.map((l) => `<div class="room"><span class="time">${l.time}</span><div class="ico">${l.icon}</div><h4>${l.room}</h4><p>${esc(l.title)}</p></div>`).join("")}
    </div>
    <p class="small" style="text-align:center">Tip: take the six lessons first. Everything in this game comes from them.</p>`;
    $("#go").onclick = () => { Object.assign(G, { score: 0, streak: 0, level: 0, results: [] }); hud.hidden = false; paintScore(); intro(); };
  }

  function intro() {
    const l = LEVELS[G.level];
    setClock(l.time, l.h, l.m);
    $("#hudRoom").textContent = `${l.icon} ${l.room}`;
    stage.innerHTML = `
    <section class="intro">
      <div class="ico">${l.icon}</div>
      <div class="eyebrow">Room ${G.level + 1} of 6 · ${l.time}</div>
      <h2>${esc(l.title)}</h2>
      <p class="brief">${esc(l.brief)}</p>
      <ul class="rules">${l.rules.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
      <div><button class="btn btn-xl" id="play">Let's go</button></div>
      <div class="speech"><b>AW says:</b> “${esc(l.boss)}”</div>
    </section>`;
    $("#play").onclick = () => { G.right = 0; G.total = 0; G.levelStart = G.score; stage.focus({ preventScroll: true }); window.scrollTo(0, 0); l.play(finishLevel); };
  }

  function finishLevel(tip) {
    const l = LEVELS[G.level];
    const acc = G.total ? G.right / G.total : 0;
    const stars = acc >= 0.9 ? 3 : acc >= 0.7 ? 2 : 1;
    const pts = G.score - G.levelStart;
    G.results.push({ id: l.id, stars, pts, acc });
    sfx.level();
    if (stars === 3) confetti(60);
    const last = G.level === LEVELS.length - 1;
    stage.innerHTML = `
    <section class="result-card">
      <div class="eyebrow">${l.icon} ${l.room} cleared</div>
      <div class="bigstars">${[1, 2, 3].map((i) => `<span data-i="${i}">★</span>`).join("")}</div>
      <div class="pts">+${pts.toLocaleString()}</div>
      <p class="small">${G.right} of ${G.total} correct · ${Math.round(acc * 100)}% accuracy</p>
      ${tip ? `<p class="tip">💡 ${tip}</p>` : ""}
      <button class="btn btn-xl" id="next">${last ? "Clock out at 6:00 PM →" : "Next room →"}</button>
    </section>`;
    $$(".bigstars span").forEach((s) => setTimeout(() => { if (+s.dataset.i <= stars) { s.classList.add("lit"); sfx.tick(); } }, 250 * +s.dataset.i));
    $("#next").onclick = () => { if (last) return finale(); G.level++; intro(); };
  }
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];

  function finale() {
    setClock("6:00 PM", 18, 0);
    $("#hudRoom").textContent = "🌇 Clocking out";
    const stars = G.results.reduce((a, r) => a + r.stars, 0);
    const ranks = [
      { min: 16, name: "Associate Director Material", icon: "🏛️", line: "Outstanding. You know this firm inside out." },
      { min: 12, name: "PIC Pro", icon: "⚖️", line: "Excellent work. Clients are in safe hands with you." },
      { min: 8, name: "Reliable Paralegal", icon: "📁", line: "Solid day. A quick look back at the lessons will make you unstoppable." },
      { min: 0, name: "Promising Trainee", icon: "🌱", line: "Good start. Revisit the lessons and play again tomorrow." }
    ];
    const rank = ranks.find((r) => stars >= r.min);
    const best = store.get("best", null);
    const isBest = !best || G.score > best.score;
    if (isBest) store.set("best", { score: G.score, stars, rank: rank.name });
    confetti(160);
    stage.innerHTML = `
    <section class="result-card">
      <div class="eyebrow">End of day report${playerName ? " · " + esc(playerName) : ""}</div>
      <div class="badge-ring" style="--p:${Math.round((stars / 18) * 100)}%"><span>${rank.icon}</span></div>
      <div class="rank">${rank.name}</div>
      <p class="small">${rank.line}</p>
      <div class="pts">${G.score.toLocaleString()} pts</div>
      <p class="small">${stars} of 18 stars${isBest ? " · 🏆 New personal best!" : ` · Best: ${best.score.toLocaleString()}`}</p>
      <div class="summary">${G.results.map((r, i) => `<div><b>${LEVELS[i].icon} ${LEVELS[i].room}</b><span class="st">${"★".repeat(r.stars)}${"☆".repeat(3 - r.stars)}</span></div>`).join("")}</div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button class="btn" id="again">Play again</button>
        <a class="btn btn-ghost" href="./">Back to lessons</a>
      </div>
    </section>`;
    $("#again").onclick = titleScreen;
  }

  /* ---------- 1. Reception: put the steps in order ---------- */
  function playOrder(done) {
    const steps = [
      "Collect the $218 consultation fee ($200 + GST)",
      "Client meets a lawyer for the consultation",
      "Client engages us and signs the Warrant to Act",
      "Client pays the deposit",
      "Open the physical file and OneDrive folder the same day",
      "Billing Department tracks the instalment dates"
    ];
    let next = 0;
    stage.innerHTML = `
      <div class="prompt"><h3>Eugene Tan's matter: what happens next?</h3><p>Tap the steps in order, from walk-in to open file.</p></div>
      <div class="order-slots">${steps.map((_, i) => `<div class="slot" data-i="${i}"><span class="n">${i + 1}</span><span>…</span></div>`).join("")}</div>
      <div class="feedback" id="fb"></div>
      <div class="chips">${shuffle(steps.map((s, i) => ({ s, i }))).map((o) => `<button class="chip" data-i="${o.i}">${esc(o.s)}</button>`).join("")}</div>`;
    const fb = $("#fb");
    $$(".chip").forEach((c) => (c.onclick = () => {
      const i = +c.dataset.i;
      if (i === next) {
        good(); c.disabled = true;
        const slot = $(`.slot[data-i="${i}"]`); slot.classList.add("filled", "flash-good"); slot.lastElementChild.textContent = steps[i];
        fb.className = "feedback good"; fb.textContent = ["Right. A lawyer must be present at every consultation.", "Correct. No advice without a lawyer.", "Yes. The WTA can be e-signed via SignNow within 3 days.", "Correct. The PIC who opens the file collects it.", "Exactly. Same day the deposit is paid.", "Perfect. The PIC tells Billing the instalment dates."][i];
        next++;
        if (next === steps.length) setTimeout(() => done("The PIC who opens the file collects the deposit and tells Billing the instalment dates."), 900);
      } else {
        bad(); shake(c);
        fb.className = "feedback bad"; fb.textContent = "Not yet. What has to happen before that?";
      }
    }));
  }

  /* ---------- 2. File room: sort documents ---------- */
  function playSort(done) {
    const F = [
      { k: "Admin", d: "NRIC, WTA, payments, invoices" },
      { k: "Cause", d: "Court papers" },
      { k: "Corres", d: "Letters & emails" },
      { k: "Documents", d: "Notes, minutes, instructions" },
      { k: "Research", d: "Case law" }
    ];
    const docs = shuffle([
      { n: "Client's NRIC (front & back)", i: "🪪", f: "Admin" },
      { n: "Signed Warrant to Act", i: "📝", f: "Admin" },
      { n: "Proof of deposit payment", i: "🧾", f: "Admin" },
      { n: "Statement of Claim", i: "⚖️", f: "Cause" },
      { n: "Court order from the hearing", i: "🏛️", f: "Cause" },
      { n: "Letter from XYZ Law Firm", i: "✉️", f: "Corres" },
      { n: "Our email to opposing counsel", i: "📧", f: "Corres" },
      { n: "Attendance note of client meeting", i: "🗒️", f: "Documents" },
      { n: "Client's written instructions", i: "📋", f: "Documents" },
      { n: "Court of Appeal judgment we may rely on", i: "📚", f: "Research" }
    ]);
    let idx = 0, over = false;
    stage.innerHTML = `
      <div class="prompt"><h3>File it in EUGENE TAN – 202504200</h3><p>Which sub-folder does this go in?</p></div>
      <div class="timer" id="tm"><i></i></div>
      <div class="progress-dots">${docs.map(() => "<i></i>").join("")}</div>
      <div id="doc"></div>
      <div class="feedback" id="fb"></div>
      <div class="folders">${F.map((f) => `<button class="folder" data-k="${f.k}"><span class="tab"></span><span class="body"><b>${f.k}</b><small>${f.d}</small></span></button>`).join("")}</div>`;
    const fb = $("#fb"), dots = $$(".progress-dots i");
    function show() {
      const d = docs[idx];
      $("#doc").innerHTML = `<div class="sort-doc"><div class="ico">${d.i}</div><b>${esc(d.n)}</b><small>Document ${idx + 1} of ${docs.length}</small></div>`;
    }
    const t = countdown(45, $("#tm"), () => { over = true; finish(true); });
    function finish(timeout) {
      t.stop();
      $$(".folder").forEach((b) => (b.disabled = true));
      for (let j = idx; j < docs.length && timeout; j++) { G.total++; dots[j].classList.add("no"); }
      if (timeout) { fb.className = "feedback bad"; fb.textContent = "Time's up!"; }
      setTimeout(() => done("Client's NRIC, WTA, proof of payment and invoices all live in Admin."), timeout ? 1100 : 600);
    }
    $$(".folder").forEach((b) => (b.onclick = () => {
      if (over) return;
      const d = docs[idx];
      if (b.dataset.k === d.f) {
        good(Math.round(t.left() * 40)); dots[idx].classList.add("ok");
        fb.className = "feedback good"; fb.textContent = `✓ ${d.n} → ${d.f}`;
      } else {
        bad(); dots[idx].classList.add("no"); shake(b);
        fb.className = "feedback bad"; fb.textContent = `✗ ${d.n} goes in ${d.f}`;
      }
      const el = $(".sort-doc"); el.classList.add("fly");
      idx++;
      if (idx >= docs.length) { over = true; finish(false); } else setTimeout(show, 260);
    }));
    show();
  }

  /* ---------- 3. Drafting desk: spot the errors ---------- */
  function playSpot(done) {
    const ERR = {
      date: "The date is written in full, day first: 5 November 2026.",
      subject: "The subject heading needs the case number and parties, in bold capitals.",
      wp: "A settlement offer must be marked WITHOUT PREJUDICE, and the lawyer decides that.",
      tone: "Keep it formal. No abbreviations or emojis in firm correspondence.",
      close: "\"Dear Sirs\" closes with \"Yours faithfully\", not \"Yours sincerely\".",
      sign: "Letters are signed in the firm's name: A.W. LAW LLC."
    };
    const seg = (t, e) => `<span class="seg" ${e ? `data-e="${e}"` : ""}>${t}</span>`;
    stage.innerHTML = `
      <div class="prompt"><h3>Find the 6 mistakes</h3><p>Tap anything that breaks the firm's house style.</p></div>
      <div class="counter" id="ct">${Object.keys(ERR).map(() => "<i>🖍️</i>").join("")}</div>
      <div class="feedback" id="fb"></div>
      <div class="paper">
        <div class="lhrow"><img src="assets/logo.png" alt=""><span>133 New Bridge Road #20-03<br>Chinatown Point Singapore 059413<br>Tel 6733 0021</span></div>
        <p>${seg("Our Ref: AW/202504200")}</p>
        <p>${seg("5th Nov 2026", "date")}</p>
        <p>${seg("<b>BY EMAIL (litigation@xyzlaw.com.sg)</b>")}</p>
        <p>${seg("XYZ Law Corporation<br>1 Raffles Place #30-01<br>Singapore 048616")}</p>
        <p>${seg("Dear Sirs,")}</p>
        <p>${seg("<b>Update</b>", "subject")}</p>
        <p>${seg("1.&nbsp;&nbsp;We act for Mr John Tan in the above matter.")}</p>
        <p>${seg("2.&nbsp;&nbsp;We refer to your letter dated 3 November 2026.")}</p>
        <p>3.&nbsp;&nbsp;${seg("Our client is prepared to settle this matter for $5,000 if your client pays within 14 days.", "wp")}</p>
        <p>4.&nbsp;&nbsp;${seg("Pls revert asap thx 😊", "tone")}</p>
        <p>${seg("Yours sincerely,", "close")}</p>
        <p>${seg("Jane (Paralegal)", "sign")}</p>
        <p>${seg("cc: Client")}</p>
      </div>
      <div class="found-list" id="found"></div>`;
    let found = 0; const fb = $("#fb");
    $$(".seg").forEach((s) => (s.onclick = () => {
      if (s.classList.contains("found")) return;
      const e = s.dataset.e;
      if (e) {
        good(); s.classList.add("found"); found++;
        $$("#ct i")[found - 1].classList.add("on");
        fb.className = "feedback good"; fb.textContent = `Found ${found} of 6`;
        $("#found").insertAdjacentHTML("afterbegin", `<div>✓ ${esc(ERR[e])}</div>`);
        if (found === 6) setTimeout(() => done("Before anything goes out: the lawyer checks it, and the client approves it in writing."), 900);
      } else {
        bad(); s.classList.remove("miss"); void s.offsetWidth; s.classList.add("miss");
        fb.className = "feedback bad"; fb.textContent = "That part is fine. Look again.";
      }
    }));
  }

  /* ---------- 4. Mailroom: pick the right name ---------- */
  function playDuel(done) {
    const rounds = shuffle([
      { q: "Saving a letter we sent on 25 May 2025", r: "Letter to XYZ Law Firm 25 05 2025.pdf", w: "xyz letter FINAL v2.pdf", why: "Format: Document Name DD MM YYYY." },
      { q: "Saving a letter we received on 23 May 2025", r: "Letter from XYZ Law Firm 23 05 2025.pdf", w: "Letter to XYZ Law Firm 23 05 2025.pdf", why: "Received letters are \"Letter from…\"." },
      { q: "Email subject after a court attendance", r: "John Tan: Update of court attendance on 26 05 2025", w: "Update re court today!!", why: "The client's name always goes first in the subject." },
      { q: "New client folder on OneDrive", r: "EUGENE TAN – 202504200", w: "eugene t (new)", why: "Client's names plus the file number." },
      { q: "Saving the client in your phone", r: "Eugene Tan AW Client", w: "Eugene lawyer case", why: "NAME NAME AW Client, and add him to the Appointments group." },
      { q: "Date on a firm letter", r: "5 November 2026", w: "05/11/26", why: "Written in full, day first." },
      { q: "How a letter to the Registrar is sent", r: "BY eLITIGATION", w: "BY WHATSAPP", why: "Court letters are filed through eLitigation." },
      { q: "Citing a case in Research", r: "NRAM Ltd v Evans [2017] SGCA 1013", w: "NRAM v Evans (2017 case)", why: "Research is saved following OSCOLA." }
    ]);
    let i = 0, t;
    stage.innerHTML = `
      <div class="prompt"><h3 id="q"></h3><p id="sub"></p></div>
      <div class="timer" id="tm"><i></i></div>
      <div class="duel" id="duel"></div>
      <div class="why" id="why"></div>`;
    function round() {
      const r = rounds[i];
      $("#q").textContent = r.q; $("#sub").textContent = `Round ${i + 1} of ${rounds.length}`; $("#why").textContent = "";
      const opts = shuffle([{ t: r.r, ok: true }, { t: r.w, ok: false }]);
      $("#duel").innerHTML = opts.map((o) => `<button class="pick" data-ok="${o.ok}"><code>${esc(o.t)}</code></button>`).join("");
      t = countdown(8, $("#tm"), () => resolve(null));
      $$(".pick").forEach((b) => (b.onclick = () => resolve(b)));
    }
    function resolve(b) {
      t.stop();
      $$(".pick").forEach((p) => { p.disabled = true; if (p.dataset.ok === "true") p.classList.add("right"); });
      if (b && b.dataset.ok === "true") good(Math.round(t.left() * 50));
      else { bad(); if (b) b.classList.add("wrong"); }
      $("#why").textContent = (b ? "" : "⏰ Too slow! ") + rounds[i].why;
      i++;
      setTimeout(() => (i < rounds.length ? round() : done("Name it so anyone in the firm could find it in five years' time.")), 1500);
    }
    round();
  }

  /* ---------- 5. Ethics corner: dilemmas ---------- */
  function playDilemmas(done) {
    const cards = shuffle([
      { a: "🚗", who: "After a hearing", s: "Your client offers you a lift back to the office. It's pouring with rain.", c: [
        ["Politely decline and take a cab or the MRT", true, "Right. Staff must never accept a ride in a client's vehicle, even if offered."],
        ["Accept, since it's raining", false, "Not allowed. The SOP says never accept transport in a client's vehicle."],
        ["Accept if the lawyer comes too", false, "Still no. The rule applies to everyone, every time."]] },
      { a: "🍜", who: "Dinner with friends", s: "A friend says, \"I saw your firm's case in the news! What really happened?\"", c: [
        ["Share a few harmless details", false, "There are no harmless details. Client information is strictly confidential."],
        ["Say you can't discuss client matters, and change the subject", true, "Exactly. Confidentiality and privilege come first, always."],
        ["Show them the public court documents on your phone", false, "Don't. Never use your position to discuss a client's matter."]] },
      { a: "👀", who: "Reading a new file", s: "You realise the opposing party is your cousin.", c: [
        ["Keep quiet, it won't affect your work", false, "A conflict must be disclosed, even if you think you can stay neutral."],
        ["Tell the lawyer on the file immediately", true, "Correct. Disclose any potential or actual conflict right away."],
        ["Warn your cousin to get a good lawyer", false, "Never. That breaches confidentiality and loyalty to our client."]] },
      { a: "📄", who: "Preparing the bundle", s: "You find an email in the file that seriously hurts our client's case.", c: [
        ["Quietly leave it out of the folder", false, "Concealing evidence is serious misconduct."],
        ["Delete it. Nobody will know", false, "Never destroy, alter or conceal documents or evidence."],
        ["Keep it intact and flag it to the lawyer", true, "Right. The lawyer decides how to handle it. Integrity first."]] },
      { a: "🎓", who: "The intern asks", s: "\"I've drafted the client's update. Can I just send it?\"", c: [
        ["Yes, it looks fine to you", false, "Interns may not update clients, and the lawyer must check all correspondence."],
        ["Pass it to the lawyer on the file to check first", true, "Correct. The lawyer checks it and takes full responsibility."],
        ["Send it from your own email instead", false, "Same problem. The lawyer has to check it first."]] },
      { a: "💬", who: "On WhatsApp", s: "The client replies \"ok go ahead\" to the draft letter you sent.", c: [
        ["Screenshot it and save it in the client's OneDrive folder", true, "Yes. Client approval must be in black and white, and saved."],
        ["Nothing to do, it's on WhatsApp", false, "Save it. It's the written record of the client's approval."],
        ["Call to double-check, then delete the chat", false, "Keep the written approval. That's the record."]] }
    ]);
    let i = 0;
    function deal() {
      const c = cards[i];
      stage.innerHTML = `
        <div class="prompt"><p>Situation ${i + 1} of ${cards.length}</p></div>
        <div class="card-deal"><div class="dilemma">
          <div class="who-says"><span class="avatar">${c.a}</span><h3>${esc(c.who)}</h3></div>
          <p class="scene">${esc(c.s)}</p>
          <div class="choices">${shuffle(c.c.map((x, k) => ({ x, k }))).map((o) => `<button class="choice" data-k="${o.k}">${esc(o.x[0])}</button>`).join("")}</div>
          <div id="out"></div>
        </div></div>`;
      $$(".choice").forEach((b) => (b.onclick = () => {
        const pick = c.c[+b.dataset.k];
        $$(".choice").forEach((x) => { x.disabled = true; if (c.c[+x.dataset.k][1]) x.classList.add("right"); });
        if (pick[1]) good(); else { bad(); b.classList.add("wrong"); }
        $("#out").innerHTML = `<div class="outcome ${pick[1] ? "good" : "bad"}">${pick[1] ? "✓ " : "✗ "}${esc(pick[2])}</div>
          <div style="text-align:right;margin-top:12px"><button class="btn btn-sm" id="nx">${i + 1 < cards.length ? "Next situation →" : "Finish"}</button></div>`;
        $("#nx").onclick = () => { i++; i < cards.length ? deal() : done("When in doubt, ask the lawyer on the file. Speaking up is always protected."); };
      }));
    }
    deal();
  }

  /* ---------- 6. Billing office: rapid quotes ---------- */
  function playBilling(done) {
    const qs = shuffle([
      { q: "Deposit for a Magistrate's Court suit?", o: ["$1,000 – $2,000 + GST", "$3,000 – $5,000 + GST", "$10,000 – $20,000 + GST"], a: 0 },
      { q: "Deposit for a District Court suit?", o: ["$1,000 – $2,000 + GST", "$3,000 – $5,000 + GST", "$10,000 – $20,000 + GST"], a: 1 },
      { q: "Deposit for a High Court suit?", o: ["$3,000 – $5,000 + GST", "$1,000 – $2,000 + GST", "$10,000 – $20,000 + GST"], a: 2 },
      { q: "Fee for a letter of demand?", o: ["$150 – $1,000 + GST", "$8,000 – $15,000 + GST", "Always free"], a: 0 },
      { q: "Each criminal or civil trial day is charged at…", o: ["$500 per day", "$2,500 – $4,500 + GST per day", "$10,000 per day"], a: 1 },
      { q: "Work goes beyond the WTA. Before billing, the client gets…", o: ["No notice", "A phone call the same day", "At least one week's notice by email"], a: 2 },
      { q: "Who collects a new client's deposit?", o: ["The PIC who opens the file", "The receptionist", "The opposing party"], a: 0 },
      { q: "A new client hasn't engaged us yet. After checking with the lawyer, when do you follow up?", o: ["In a month", "The next day, between 9am and 1pm", "Only if they call"], a: 1 }
    ]);
    let i = 0, t;
    stage.innerHTML = `
      <div class="prompt"><h3 id="q"></h3><p id="sub"></p></div>
      <div class="timer" id="tm"><i></i></div>
      <div class="duel three" id="duel"></div>
      <div class="why" id="why"></div>`;
    function round() {
      const r = qs[i];
      $("#q").textContent = r.q; $("#sub").textContent = `Quote ${i + 1} of ${qs.length}`; $("#why").textContent = "";
      $("#duel").innerHTML = r.o.map((o, k) => `<button class="pick" data-k="${k}">${esc(o)}</button>`).join("");
      t = countdown(10, $("#tm"), () => resolve(null));
      $$(".pick").forEach((b) => (b.onclick = () => resolve(b)));
    }
    function resolve(b) {
      t.stop();
      const r = qs[i];
      $$(".pick").forEach((p) => { p.disabled = true; if (+p.dataset.k === r.a) p.classList.add("right"); });
      if (b && +b.dataset.k === r.a) good(Math.round(t.left() * 50));
      else { bad(); if (b) b.classList.add("wrong"); }
      $("#why").textContent = b ? (+b.dataset.k === r.a ? "✓ Correct" : "✗ " + r.o[r.a]) : "⏰ Too slow! " + r.o[r.a];
      i++;
      setTimeout(() => (i < qs.length ? round() : done("All fees exclude GST and disbursements. Billing always checks the bill against the WTA.")), 1400);
    }
    round();
  }

  /* ---------- confetti ---------- */
  function confetti(n) {
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = document.createElement("canvas"); c.className = "confetti"; document.body.appendChild(c);
    const x = c.getContext("2d"), W = (c.width = innerWidth), H = (c.height = innerHeight);
    const cols = ["#800000", "#e3ac22", "#1e6b45", "#c0392b", "#f2c76e", "#5a0b0b"];
    const ps = Array.from({ length: n }, () => ({ x: W / 2 + (Math.random() - 0.5) * 200, y: H * 0.35, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 14 - 4, r: Math.random() * 6 + 4, c: cols[(Math.random() * cols.length) | 0], a: Math.random() * 6, s: (Math.random() - 0.5) * 0.3 }));
    let f = 0;
    (function draw() {
      x.clearRect(0, 0, W, H);
      ps.forEach((p) => { p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += p.s; x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; x.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); x.restore(); });
      if (++f < 150) requestAnimationFrame(draw); else c.remove();
    })();
  }

  titleScreen();
})();
