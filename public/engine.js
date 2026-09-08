
/* ============================================================
   HABIBCORE — interaction engine (zero dependencies)
   lerped smooth scroll · cursor · magnetics · reveals ·
   velocity-reactive marquee · tilt preview · toasts
   ============================================================ */
(() => {
  "use strict";

  /* ————— helpers ————— */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = window.matchMedia("(pointer: fine)").matches;

  document.documentElement.classList.add("has-js");
  if (REDUCED) document.documentElement.classList.add("is-reduced");
  if (FINE && !REDUCED) document.documentElement.classList.add("has-fine-pointer");

  /* ————— lagos clock (WAT, UTC+1) ————— */
  const clocks = $$("[data-clock]");
  if (clocks.length) {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false, timeZone: "Africa/Lagos",
    });
    const tick = () => {
      const t = fmt.format(new Date());
      clocks.forEach((el) => (el.textContent = `${t} WAT`));
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ————— toasts ————— */
  const toastHost = $(".toasts");
  const toast = (title, desc) => {
    if (!toastHost) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.innerHTML = `<p class="t-title">${title}</p>${desc ? `<p class="t-desc">${desc}</p>` : ""}`;
    toastHost.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("show")));
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 500);
    }, 3400);
  };

  /* ————— smooth scroll engine (wheel only; native for touch/keyboard) ————— */
  const engine = {
    on: FINE && !REDUCED,
    target: window.scrollY,
    current: window.scrollY,
    max: 0,
    velocity: 0,
    raf: null,
    measure() {
      this.max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      this.target = clamp(this.target, 0, this.max);
      this.current = clamp(this.current, 0, this.max);
    },
    start() {
      if (!this.on || this.raf) return;
      this.measure();
      let last = performance.now();
      const loop = () => {
        try {
          /* time-normalized glide: identical feel on 60Hz and 144Hz screens,
             no rubber-band trail once the wheel stops (τ = 100ms) */
          const now = performance.now();
          const dt = Math.min(50, now - last);
          last = now;
          this.target = clamp(this.target, 0, this.max);
          const prev = this.current;
          const a = 1 - Math.exp(-dt / 100);
          this.current = lerp(this.current, this.target, a);
          if (Math.abs(this.current - this.target) < 0.4) this.current = this.target;
          this.velocity = this.current - prev;
          if (this.current !== prev) window.scrollTo(0, this.current);
          effects(this.velocity);
          this.raf = requestAnimationFrame(loop);
        } catch (err) {
          /* Fail open: never leave the page unscrollable. */
          this.failOpen();
        }
      };
      this.raf = requestAnimationFrame(loop);
      const onWheel = (e) => {
        if (e.ctrlKey) return; // let pinch-zoom through
        e.preventDefault();
        this.target = clamp(this.target + wheelScale(e), 0, this.max);
      };
      this.onWheel = onWheel;
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("resize", () => this.measure());
      // re-measure when images/layout settle
      window.addEventListener("load", () => this.measure());
    },
    failOpen() {
      if (this.raf) cancelAnimationFrame(this.raf);
      this.raf = null;
      if (this.onWheel) window.removeEventListener("wheel", this.onWheel);
      this.on = false;
      /* Restore native smooth scrolling */
      document.documentElement.classList.remove("has-js");
    },
    to(y, immediate = false) {
      this.measure();
      const dest = clamp(y, 0, this.max);
      if (!this.on || immediate) {
        window.scrollTo({ top: dest, behavior: REDUCED ? "auto" : "smooth" });
        this.target = this.current = dest;
        return;
      }
      this.target = dest;
    },
  };
  const wheelScale = (e) => {
    const d = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    return clamp(d, -240, 240); /* fast flicks shouldn't feel damped */
  };

  /* anchor links route through the engine */
  const anchorScroll = (hash) => {
    const el = $(hash);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 64;
    engine.to(y);
    history.replaceState(null, "", hash);
  };
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const hash = a.getAttribute("href");
      if (hash.length < 2) return;
      e.preventDefault();
      mobileMenu.close();
      anchorScroll(hash);
    });
  });

  /* ————— scroll-linked effects (progress, nav, parallax, skew, wordmark) ————— */
  const nav = $(".nav");
  const progressBar = $(".progress");
  const folio = $(".folio b");
  const parallaxEls = $$("[data-speed]").map((el) => ({ el, speed: parseFloat(el.dataset.speed) || 0.1 }));
  const skewEls = $$(".skewable");
  const wordmark = $(".wordmark p");
  const rangeSec = $(".range");
  const rangeWords = $$(".range-word");
  const rangeCount = $(".range-count");
  const rangeGraph = $(".range-graph");
  const pathWrap = $(".path-wrap");
  const pathLine = $(".path-line");
  let lastY = window.scrollY;
  let navTick = 0;
  let rangeIdx = -1;
  let rangeGraphW = 0;

  /* ————— range graph: the active discipline hub, real projects orbiting it ————— */
  const P_ROW = (n) => `.p-row[data-idx="${n}"]`;
  const RANGE_NODES = [
    /* Design */ [["Leadway Pensure", "BRAND · SYSTEMS", P_ROW("03")], ["Skaame EPK", "BRAND · 2024", ".epk-head"], ["Olumayowa", "CLIENT · WEB", P_ROW("04")]],
    /* Product */ [["Biscuit AI", "AI · PRODUCT", P_ROW("01")], ["Relay", "PRODUCT · SYSTEMS", P_ROW("06")], ["Leadway Pensure", "BRAND · SYSTEMS", P_ROW("03")]],
    /* Systems */ [["Relay", "AUDIT TRAILS", P_ROW("06")], ["AI in the Workplace", "CURRICULUM", P_ROW("05")], ["Leadway Pensure", "OPERATIONS", P_ROW("03")]],
    /* Automation */ [["Leadway Pensure", "18-STAGE PIPELINE", P_ROW("03")], ["Relay", "SLA CLOCKS", P_ROW("06")]],
    /* AI */ [["Biscuit AI", "TELEGRAM ASSISTANT", P_ROW("01")], ["Chef4me", "KITCHEN ASSISTANT", P_ROW("02")], ["AI in the Workplace", "11 MODULES", P_ROW("05")]],
    /* Software */ [["Biscuit AI", "SHIPPED", P_ROW("01")], ["Relay", "IN PRODUCTION", P_ROW("06")], ["Chef4me", "IN CONVERSATION", P_ROW("02")]],
    /* Habibcore — all of it */ [["Biscuit AI", "AI · PRODUCT", P_ROW("01")], ["Chef4me", "CONSUMER · AI", P_ROW("02")], ["Leadway Pensure", "BRAND · SYSTEMS", P_ROW("03")], ["Olumayowa", "CLIENT · WEB", P_ROW("04")], ["AI in the Workplace", "OPS · TRAINING", P_ROW("05")], ["Relay", "PRODUCT · SYSTEMS", P_ROW("06")]],
  ];
  /* orbit positions (percent of stage) so bubbles never sit on the word */
  const RANGE_POS = { 2: [[10, 48], [90, 52]], 3: [[14, 18], [86, 20], [50, 86]], 6: [[12, 16], [86, 18], [8, 60], [90, 58], [30, 86], [70, 86]] };

  /* ————— creative practice layer —————
     Home.tsx injects src/data/range.ts as a JSON island; the graph and the
     mobile index both read from it. Progressive disclosure: hub → discipline
     → project → artifact, one branch at a time, so the initial composition
     stays quiet. Desktop (pinned) only; mobile uses the .range-index list. */
  const R_BY_ID = new Map();
  try { JSON.parse($("#range-data")?.textContent || "[]").forEach((n) => R_BY_ID.set(n.id, n)); } catch (e) { /* island missing — graph simply stays as-is */ }
  const CREATIVE_HUB_POS = { 0: [26, 86], 6: [50, 10] };
  const rgState = { open: false, level: 0, disc: null, proj: null, hub: null, lastFocus: null };

  const rgDetail = (() => {
    if (!rangeGraph) return null;
    const d = document.createElement("aside");
    d.className = "rg-detail";
    d.setAttribute("role", "dialog");
    d.setAttribute("aria-label", "Work detail");
    d.hidden = true;
    /* live on the stage, not inside range-graph — the graph is wiped on
       every word change, the detail panel survives those rebuilds */
    rangeGraph.parentElement.appendChild(d);
    return d;
  })();

  const openRgDetail = (id, from) => {
    const n = R_BY_ID.get(id);
    if (!n || !rgDetail) return;
    const img = n.imageUrl ? `<img src="${n.imageUrl}" alt="" width="640" height="400" loading="lazy" />` : "";
    const chips = (n.related || [])
      .filter((r) => R_BY_ID.has(r))
      .map((r) => `<button type="button" class="rg-chip" data-go="${r}">${R_BY_ID.get(r).title}</button>`)
      .join("");
    rgDetail.innerHTML = `
      <button type="button" class="rg-x" aria-label="Close detail">&times;</button>
      <p class="rg-kind">${n.kind.toUpperCase()}</p>
      <h3 class="rg-title">${n.title}</h3>
      <p class="rg-meta">${n.meta}</p>
      ${img}
      <p class="rg-desc">${n.description}</p>
      ${chips ? `<div class="rg-chips">${chips}</div>` : ""}
      ${n.sourceUrl ? `<a class="rg-src" href="${n.sourceUrl}">${(n.source || "OPEN").toUpperCase()} &nearr;</a>` : ""}`;
    rgDetail.hidden = false;
    /* force reflow so the panel animates in */
    void rgDetail.offsetHeight;
    rgDetail.classList.add("on");
    rgState.lastFocus = from || rgState.lastFocus;
    const x = $(".rg-x", rgDetail);
    x.addEventListener("click", closeRgDetail);
    $$(".rg-chip", rgDetail).forEach((c) => c.addEventListener("click", () => openRgDetail(c.dataset.go, from)));
    x.focus({ preventScroll: true });
  };

  function closeRgDetail() {
    if (!rgDetail || rgDetail.hidden) return;
    rgDetail.classList.remove("on");
    rgDetail.hidden = true;
    if (rgState.lastFocus) { rgState.lastFocus.focus({ preventScroll: true }); rgState.lastFocus = null; }
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeRgDetail();
  });

  /* small bubble/line builder shared by the creative layers */
  const NS = "http://www.w3.org/2000/svg";
  const rgLayer = [];
  /* discipline ring — vertices rotated 30° so no node sits straight above
     or below the hub */
  const DISC_ANGLES = [-60, 0, 60, 120, 180, 240].map((d) => (d * Math.PI) / 180);
  /* child ring around a parent, rotated so no node points straight at the
     hub (they would land between parent and hub and eventually cover it) */
  const ringAround = (px, py, rx, ry, k) => {
    const toHub = Math.atan2(50 - py, 50 - px);
    const step = (2 * Math.PI) / Math.max(k, 3);
    return Array.from({ length: k }, (_, i) => {
      const a = k === 1 ? toHub + Math.PI : toHub + step * (i + 0.5);
      return [clamp(px + rx * Math.cos(a), 7, 93), clamp(py + ry * Math.sin(a), 10, 90)];
    });
  };
  /* collision resolution: nudge new nodes apart from each other and from
     every fixed bubble (hub, disciplines, projects, detail panel) until
     nothing overlaps — guaranteed clean layout regardless of viewport */
  const layoutLevel = (centers, hw, hh) => {
    const stage = rangeGraph.parentElement;
    const sr = stage.getBoundingClientRect();
    const W = sr.width, H = sr.height;
    if (!W || !H) return centers;
    const mov = centers.map((c) => ({ cx: (c[0] / 100) * W, cy: (c[1] / 100) * H, hw, hh }));
    const fix = rgLayer.filter((el) => el.tagName !== "LINE").map((el) => ({
      cx: el.offsetLeft + el.offsetWidth / 2, cy: el.offsetTop + el.offsetHeight / 2,
      hw: el.offsetWidth / 2 + 14, hh: el.offsetHeight / 2 + 14, fixed: true,
    }));
    /* the active display word is sacred ground — bubbles route around it */
    const wordEl = stage.querySelector(".range-word.is-on .rw");
    if (wordEl) {
      const wr = wordEl.getBoundingClientRect();
      fix.push({
        cx: wr.left - sr.left + wr.width / 2, cy: wr.top - sr.top + wr.height / 2,
        hw: wr.width / 2 + 6, hh: wr.height / 2 + 6, fixed: true,
      });
    }
    if (rgDetail && !rgDetail.hidden) {
      fix.push({ cx: rgDetail.offsetLeft + rgDetail.offsetWidth / 2, cy: rgDetail.offsetTop + rgDetail.offsetHeight / 2, hw: rgDetail.offsetWidth / 2 + 14, hh: rgDetail.offsetHeight / 2 + 14, fixed: true });
    }
    for (let iter = 0; iter < 120; iter++) {
      let moved = false;
      const all = fix.concat(mov);
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
        const a = all[i], b = all[j];
        if (a.fixed && b.fixed) continue;
        const dx = b.cx - a.cx, dy = b.cy - a.cy;
        const px = a.hw + b.hw - Math.abs(dx);
        const py = a.hh + b.hh - Math.abs(dy);
        if (px > 0 && py > 0) {
          const dir = dx >= 0 ? 1 : -1;
          if (px <= py) {
            if (a.fixed) b.cx += dir * (px + 2);
            else if (b.fixed) a.cx -= dir * (px + 2);
            else { a.cx -= (dir * (px + 2)) / 2; b.cx += (dir * (px + 2)) / 2; }
          } else {
            const dirY = dy >= 0 ? 1 : -1;
            if (a.fixed) b.cy += dirY * (py + 2);
            else if (b.fixed) a.cy -= dirY * (py + 2);
            else { a.cy -= (dirY * (py + 2)) / 2; b.cy += (dirY * (py + 2)) / 2; }
          }
          moved = true;
        }
      }
      mov.forEach((m) => {
        const nx = clamp(m.cx, m.hw + 6, W - m.hw - 6);
        const ny = clamp(m.cy, m.hh + 6, H - m.hh - 6);
        if (nx !== m.cx || ny !== m.cy) { m.cx = nx; m.cy = ny; moved = true; }
      });
      if (!moved) break;
    }
    return mov.map((m) => [(m.cx / W) * 100, (m.cy / H) * 100]);
  };
  const NODE_HALF = { "rg-md": [76, 60], "rg-sm": [68, 50], "rg-xs": [62, 38] };
  const neighborsOf = (id) => {
    const n = R_BY_ID.get(id);
    if (!n) return new Set();
    const s = new Set(n.related || []);
    R_BY_ID.forEach((o) => {
      if ((o.related || []).includes(id)) s.add(o.id);
      if (o.parent === id) s.add(o.id);
      if (n.parent === o.id) s.add(o.id);
    });
    return s;
  };

  const rgSpawn = (svg, n, fromPct, toPct, cls, lvl, onClick) => {
    const line = document.createElementNS(NS, "line");
    line.setAttribute("x1", `${fromPct[0]}%`); line.setAttribute("y1", `${fromPct[1]}%`);
    line.setAttribute("x2", `${toPct[0]}%`); line.setAttribute("y2", `${toPct[1]}%`);
    line.style.strokeDasharray = "1400";
    line.style.strokeDashoffset = "1400";
    line.dataset.a = ""; line.dataset.b = n.id;
    line.dataset.lvl = String(lvl);
    line.classList.add("rg-line");
    svg.appendChild(line);
    const b = document.createElement("button");
    b.type = "button";
    b.className = `rg-bubble ${cls || ""}`.trim();
    b.tabIndex = 0;
    b.dataset.id = n.id;
    b.dataset.lvl = String(lvl);
    if (n.kind !== "discipline") b.setAttribute("aria-haspopup", "dialog");
    b.style.left = `${toPct[0]}%`;
    b.style.top = `${toPct[1]}%`;
    b.style.setProperty("--rd", `${Math.min(120 + rgLayer.length * 70, 900)}ms`);
    b.innerHTML = `<b>${n.title}</b><i>${n.kind === "discipline" ? "PRACTICE" : n.meta.split("·").slice(-1)[0].trim()}</i>`;
    b.addEventListener("mouseenter", () => {
      rangeGraph.classList.add("dim");
      const near = neighborsOf(n.id);
      b.classList.add("is-rel");
      rgLayer.forEach((el) => {
        if (el.tagName === "line") {
          if ((near.has(el.dataset.b) && el.dataset.a === n.id) || (near.has(el.dataset.a) && el.dataset.b === n.id)) el.classList.add("is-rel");
        } else if (near.has(el.dataset.id)) el.classList.add("is-rel");
      });
    });
    b.addEventListener("mouseleave", () => {
      rangeGraph.classList.remove("dim");
      rgLayer.forEach((el) => el.classList.remove("is-rel"));
    });
    b.addEventListener("click", onClick);
    rangeGraph.appendChild(b);
    rgLayer.push(line, b);
    return b;
  };

  const rgCollapse = (fromLevel) => {
    /* remove nodes/lines deeper than fromLevel */
    for (let i = rgLayer.length - 1; i >= 0; i--) {
      const el = rgLayer[i];
      const lvl = Number(el.dataset.lvl || 0);
      if (lvl >= fromLevel) { el.remove(); rgLayer.splice(i, 1); }
    }
  };

  const rgOpenCreative = (idx) => {
    rgState.open = true;
    rgState.idx = idx;
    const stage = rangeGraph.parentElement;
    stage.classList.add("creative-open");
    if (rgState.hub) { rgState.hub.style.left = "50%"; rgState.hub.style.top = "50%"; rgState.hub.classList.add("is-hub"); }
    rgState.anchor = [50, 50];
    const disc = [...R_BY_ID.values()].filter((n) => n.kind === "discipline" && n.parent === "n-design");
    const ring = DISC_ANGLES.map((a) => [clamp(50 + 27 * Math.cos(a), 7, 93), clamp(50 + 34 * Math.sin(a), 10, 90)]);
    /* resolve the ring against the hub/flagship/word so nothing spawns on top */
    const placed = layoutLevel(ring, NODE_HALF["rg-md"][0], NODE_HALF["rg-md"][1]);
    disc.forEach((d, i) => {
      rgSpawn(rangeGraph.querySelector("svg"), d, [50, 50], placed[i], "rg-md", 1, () => rgOpenDiscipline(d.id));
    });
  };

  const rgOpenDiscipline = (id) => {
    const d = R_BY_ID.get(id);
    if (!d) return;
    closeRgDetail();
    if (rgState.disc === id) { /* same discipline — collapse its branch */
      rgCollapse(2);
      rgState.disc = null; rgState.proj = null;
      return;
    }
    rgCollapse(2);
    rgState.disc = id; rgState.proj = null;
    const el = rgLayer.find((x) => x.dataset && x.dataset.id === id);
    const from = el ? [parseFloat(el.style.left), parseFloat(el.style.top)] : [50, 50];
    const projIds = [...new Set((d.related || []).filter((r) => R_BY_ID.get(r)?.kind === "project"))].slice(0, 4);
    const ring = ringAround(from[0], from[1], 19, 22, projIds.length);
    const placed = layoutLevel(ring, NODE_HALF["rg-sm"][0], NODE_HALF["rg-sm"][1]);
    projIds.forEach((pid, i) => {
      const p = R_BY_ID.get(pid);
      rgSpawn(rangeGraph.querySelector("svg"), p, from, placed[i], "rg-sm", 2, () => rgOpenProject(pid));
    });
  };

  const rgOpenProject = (id) => {
    const p = R_BY_ID.get(id);
    if (!p) return;
    if (rgState.proj !== id) {
      rgCollapse(3);
      rgState.proj = id;
      const el = rgLayer.find((x) => x.dataset && x.dataset.id === id);
      if (el) {
        const from = [parseFloat(el.style.left), parseFloat(el.style.top)];
        const artIds = [...R_BY_ID.values()].filter((n) => n.parent === id).map((n) => n.id).slice(0, 6);
        const ring = ringAround(from[0], from[1], 15, 18, artIds.length);
        const placed = layoutLevel(ring, NODE_HALF["rg-xs"][0], NODE_HALF["rg-xs"][1]);
        artIds.forEach((aid, i) => {
          const a = R_BY_ID.get(aid);
          const b = rgSpawn(rangeGraph.querySelector("svg"), a, from, placed[i], "rg-xs", 3, () => openRgDetail(aid, b));
        });
      }
    }
    openRgDetail(id, rgLayer.find((x) => x.dataset && x.dataset.id === id));
  };

  const rgCloseCreative = () => {
    rgState.open = false;
    rgState.disc = null; rgState.proj = null;
    closeRgDetail();
    rgCollapse(1);
    const stage = rangeGraph.parentElement;
    stage.classList.remove("creative-open");
    if (rgState.hub && rgState.idx != null) {
      const [hx, hy] = CREATIVE_HUB_POS[rgState.idx];
      rgState.hub.style.left = `${hx}%`; rgState.hub.style.top = `${hy}%`;
      rgState.hub.classList.remove("is-hub");
    }
  };



  const buildRangeGraph = (idx) => {
    if (!rangeGraph) return;
    const nodes = RANGE_NODES[idx];
    if (!nodes) return;
    const stage = rangeGraph.parentElement;
    stage.classList.add("has-graph");
    const r = stage.getBoundingClientRect();
    rangeGraphW = r.width;
    rangeGraph.classList.remove("on");
    rangeGraph.innerHTML = "";
    rgLayer.length = 0;
    rgState.open = false; rgState.disc = null; rgState.proj = null; rgState.hub = null;
    stage.classList.remove("creative-open");
    closeRgDetail();
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    rangeGraph.appendChild(svg);
    const cx = r.width / 2, cy = r.height / 2;
    const pos = RANGE_POS[nodes.length] || RANGE_POS[3];
    nodes.forEach(([label, kind, sel], i) => {
      const [px, py] = pos[i];
      const x = (r.width * px) / 100, y = (r.height * py) / 100;
      const line = document.createElementNS(NS, "line");
      line.setAttribute("x1", cx); line.setAttribute("y1", cy);
      line.setAttribute("x2", x); line.setAttribute("y2", y);
      const len = Math.hypot(x - cx, y - cy);
      line.style.strokeDasharray = `${len}`;
      line.style.strokeDashoffset = `${len}`;
      svg.appendChild(line);
      const b = document.createElement("button");
      b.type = "button";
      b.className = "rg-bubble";
      b.tabIndex = -1; /* the keyboard route is the real work list below */
      b.style.left = `${px}%`;
      b.style.top = `${py}%`;
      b.style.setProperty("--rd", `${140 + i * 90}ms`);
      b.innerHTML = `<b>${label}</b><i>${kind}</i>`;
      b.addEventListener("click", () => {
        const target = $(sel);
        if (!target) return;
        if (target.classList.contains("p-row")) {
          const btn = $(".p-btn", target);
          if (btn && btn.getAttribute("aria-expanded") !== "true") btn.click();
        }
        engine.to(target.getBoundingClientRect().top + window.scrollY - 72);
      });
      rangeGraph.appendChild(b);
    });
    /* creative practice hub — quiet third participant on the Design and
       Habibcore chapters; everything else stays exactly as it was.
       The hub is tethered to the centre word by a line, and carries its
       flagship expression (1ETHFP) as a connected satellite, so the chain
       reads: centre word → Creative → 1ETHFP. */
    const hubPos = CREATIVE_HUB_POS[idx];
    if (hubPos && R_BY_ID.size) {
      const hubLine = document.createElementNS(NS, "line");
      hubLine.setAttribute("x1", cx); hubLine.setAttribute("y1", cy);
      hubLine.setAttribute("x2", (r.width * hubPos[0]) / 100);
      hubLine.setAttribute("y2", (r.height * hubPos[1]) / 100);
      const hl = Math.hypot(hubLine.getAttribute("x2") - cx, hubLine.getAttribute("y2") - cy);
      hubLine.style.strokeDasharray = `${hl}`;
      hubLine.style.strokeDashoffset = `${hl}`;
      hubLine.dataset.lvl = "0";
      svg.appendChild(hubLine);

      const hub = document.createElement("button");
      hub.type = "button";
      hub.className = "rg-bubble rg-hub";
      hub.tabIndex = 0;
      hub.style.left = `${hubPos[0]}%`;
      hub.style.top = `${hubPos[1]}%`;
      hub.style.setProperty("--rd", `${140 + nodes.length * 90}ms`);
      hub.innerHTML = `<b>Creative</b><i>PRACTICE · TAP TO EXPLORE</i>`;
      hub.setAttribute("aria-expanded", "false");
      hub.addEventListener("click", () => {
        if (rgState.open) rgCloseCreative();
        else rgOpenCreative(idx);
        hub.setAttribute("aria-expanded", String(rgState.open));
      });
      rangeGraph.appendChild(hub);
      rgLayer.push(hubLine, hub);

      /* flagship satellite — Creative → 1ETHFP */
      const flagship = R_BY_ID.get("p-oneethfp");
      let flagLine = null, flagBtn = null;
      if (flagship) {
        const fpos = [clamp(hubPos[0] + 15, 7, 93), clamp(hubPos[1] + 13, 10, 90)];
        flagLine = document.createElementNS(NS, "line");
        flagLine.setAttribute("x1", `${hubPos[0]}%`); flagLine.setAttribute("y1", `${hubPos[1]}%`);
        flagLine.setAttribute("x2", `${fpos[0]}%`); flagLine.setAttribute("y2", `${fpos[1]}%`);
        flagLine.style.strokeDasharray = "1400";
        flagLine.style.strokeDashoffset = "1400";
        flagLine.dataset.lvl = "0";
        svg.appendChild(flagLine);
        flagBtn = document.createElement("button");
        flagBtn.type = "button";
        flagBtn.className = "rg-bubble rg-sm rg-flag";
        flagBtn.tabIndex = 0;
        flagBtn.dataset.id = flagship.id;
        flagBtn.style.left = `${fpos[0]}%`;
        flagBtn.style.top = `${fpos[1]}%`;
        flagBtn.style.setProperty("--rd", `${200 + nodes.length * 90}ms`);
        flagBtn.innerHTML = `<b>${flagship.title}</b><i>${flagship.meta.split("·").slice(-1)[0].trim()}</i>`;
        flagBtn.addEventListener("click", () => openRgDetail(flagship.id, flagBtn));
        rangeGraph.appendChild(flagBtn);
        rgLayer.push(flagLine, flagBtn);
      }

      /* hovering any part of the chain lights the whole tether */
      const lightChain = (on) => {
        hubLine.classList.toggle("is-rel", on);
        if (flagLine) flagLine.classList.toggle("is-rel", on);
        if (flagBtn) flagBtn.classList.toggle("is-rel", on);
        rangeGraph.classList.toggle("dim", on);
      };
      hub.addEventListener("mouseenter", () => lightChain(true));
      hub.addEventListener("mouseleave", () => lightChain(false));
      if (flagBtn) {
        flagBtn.addEventListener("mouseenter", () => lightChain(true));
        flagBtn.addEventListener("mouseleave", () => lightChain(false));
      }

      rgState.hub = hub;
      rgState.idx = idx;
    }
    requestAnimationFrame(() => requestAnimationFrame(() => rangeGraph.classList.add("on")));
  };

  const effects = (velocity) => {
    const y = window.scrollY;
    /* progress hairline */
    if (progressBar) {
      const p = engine.max ? y / engine.max : 0;
      progressBar.style.transform = `scaleX(${p})`;
    }
    /* nav hide/show + scrolled state */
    const now = performance.now();
    if (now - navTick > 90) {
      navTick = now;
      const dy = y - lastY;
      if (y > 90 && dy > 2) nav.classList.add("hidden");
      else if (dy < -2 || y <= 90) nav.classList.remove("hidden");
      nav.classList.toggle("scrolled", y > 24);
      lastY = y;
    }
    /* lerped parallax */
    parallaxEls.forEach(({ el, speed }) => {
      const r = el.getBoundingClientRect();
      const mid = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-mid * speed).toFixed(1)}px, 0)`;
    });
    /* velocity skew on display headlines — kept whisper-quiet so type only
       leans while it is genuinely in motion */
    if (!REDUCED) {
      const sk = clamp(velocity * 0.01, -0.45, 0.45);
      skewEls.forEach((el) => (el.style.transform = `skewY(${sk.toFixed(3)}deg)`));
    }
    /* footer wordmark settles as footer approaches */
    if (wordmark) {
      const r = wordmark.parentElement.getBoundingClientRect();
      if (r.top < window.innerHeight) {
        const p = clamp(1 - r.top / window.innerHeight, 0, 1);
        wordmark.style.transform = `translateY(${(16 - p * 20).toFixed(2)}%)`;
      }
    }
    /* range: pinned chapter — swap the big word with scroll progress */
    if (rangeSec && rangeWords.length && window.matchMedia("(min-width: 1024px)").matches && !REDUCED) {
      const r = rangeSec.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? clamp(-r.top / total, 0, 1) : 1;
      const idx = Math.min(rangeWords.length - 1, Math.floor(p * rangeWords.length * 0.9999));
      rangeWords.forEach((w, i) => {
        w.classList.toggle("is-on", i === idx);
        w.classList.toggle("is-past", i < idx);
      });
      if (rangeCount) rangeCount.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(rangeWords.length).padStart(2, "0")}`;
      /* rebuild the project graph only when the word actually changes */
      if (idx !== rangeIdx) {
        rangeIdx = idx;
        buildRangeGraph(idx);
      } else if (rangeGraph && Math.abs(rangeGraph.parentElement.getBoundingClientRect().width - rangeGraphW) > 2) {
        buildRangeGraph(idx);
      }
    }
    /* path: the career line grows as the trajectory is read */
    if (pathLine && pathWrap && window.matchMedia("(min-width: 768px)").matches) {
      const r = pathWrap.getBoundingClientRect();
      const p = clamp((window.innerHeight * 0.78 - r.top) / r.height, 0, 1);
      pathLine.style.transform = `scaleY(${p.toFixed(3)})`;
    }
  };
  const effects2 = effects; // single implementation

  /* running folio: current section label */
  const folioMap = [];
  $$("section[data-folio]").forEach((s) => folioMap.push({ el: s, label: s.dataset.folio }));
  if (folio && folioMap.length) {
    const folioIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) folio.textContent = en.target.dataset.folio;
      });
    }, { rootMargin: "-40% 0px -50% 0px" });
    folioMap.forEach(({ el }) => folioIO.observe(el));
  }

  /* active nav link */
  const navLinks = $$(".nav-links a");
  if (navLinks.length) {
    const secIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const id = `#${en.target.id}`;
        navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    ["work", "about", "contact"].forEach((id) => { const s = $(`#${id}`); if (s) secIO.observe(s); });
  }

  /* ————— reveal engine ————— */
  /* NOTE: .img-reveal uses clip-path(inset 100%), which Chromium treats as
     zero intersection area — so we observe each clipped element's PARENT
     and propagate .in downward. */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      $$(".img-reveal", en.target).forEach((c) => c.classList.add("in"));
      io.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
  const observeReveals = () => {
    $$(".rv, .rv-line, .lm, .stamp-wrap, .wordmark, .path-line").forEach((el) => io.observe(el));
    const hosts = new WeakSet();
    $$(".img-reveal").forEach((el) => {
      const host = el.parentElement;
      if (!host || hosts.has(host)) return;
      hosts.add(host);
      io.observe(host);
    });
  };
  observeReveals();

  /* stagger helper: assign incremental --d inside [data-stagger] parents */
  $$("[data-stagger]").forEach((parent) => {
    const step = parseInt(parent.dataset.stagger, 10) || 80;
    $$(".rv, .img-reveal, .lm > span", parent).forEach((el, i) => {
      if (!el.style.getPropertyValue("--d")) el.style.setProperty("--d", `${i * step}ms`);
    });
  });

  /* ————— custom cursor + hover states ————— */
  const cursor = (() => {
    if (!FINE || REDUCED) return { setState: () => {} };
    const dot = $(".cursor-dot");
    const ring = $(".cursor-ring");
    if (!dot || !ring) return { setState: () => {} };
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    let seen = false;
    document.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      if (!seen) { seen = true; rx = mx; ry = my; document.documentElement.classList.add("has-cursor-fx"); }
    }, { passive: true });
    document.addEventListener("mousedown", () => ring.classList.add("is-down"));
    document.addEventListener("mouseup", () => ring.classList.remove("is-down"));
    const setState = (s) => {
      ring.classList.toggle("is-link", s === "link");
      ring.classList.toggle("is-view", s === "view");
      if (s === "view") ring.classList.remove("is-link");
    };
    /* hover targets */
    const linkSel = 'a, button, .chip, input, textarea, [role="button"]';
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest("[data-cursor='view']")) setState("view");
      else if (e.target.closest(linkSel)) setState("link");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest("[data-cursor='view']") || e.target.closest(linkSel)) setState("none");
    });
    (function follow() {
      rx = lerp(rx, mx, 0.16); ry = lerp(ry, my, 0.16);
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(follow);
    })();
    return { setState };
  })();

  /* ————— magnetic elements ————— */
  const magnetize = (el, strength = 0.32, inner = true) => {
    if (!FINE || REDUCED) return;
    const label = inner ? el.querySelector("span") : null;
    let hover = false;
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      hover = true;
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      if (label) label.style.transform = `translate(${dx * strength * 0.4}px, ${dy * strength * 0.4}px)`;
    });
    el.addEventListener("mouseleave", () => {
      hover = false;
      el.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
      if (label) label.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.transform = "";
      if (label) label.style.transform = "";
      setTimeout(() => {
        if (!hover) { el.style.transition = ""; if (label) label.style.transition = ""; }
      }, 500);
    });
  };
  $$(".btn, .f-submit, .menu-btn, .copy-btn").forEach((el) => {
    el.classList.add("magnetic");
    magnetize(el, el.classList.contains("f-submit") ? 0.12 : 0.3);
  });

  /* ————— preloader → hero entrance ————— */
  const heroEntrance = () => {
    /* line-masked h1 words */
    $$(".hero h1 .lm > span").forEach((sp, i) => {
      sp.style.setProperty("--d", `${140 + i * 110}ms`);
    });
    $(".hero")?.classList.add("in");
    $$(".hero .rv").forEach((el) => el.classList.add("in"));
    $(".stamp-wrap")?.classList.add("in");
    nav?.classList.add("in");
  };
  const preloader = (() => {
    const pl = $(".preloader");
    if (!pl) { heroEntrance(); return; }
    if (REDUCED) { pl.remove(); heroEntrance(); return; }
    document.body.classList.add("is-locked");
    /* Warm the graphics pipeline while the curtain is up: kick decode on
       every image so the scroll glide and cursor never stall on a decode
       spike after reveal. (The reference page ships its images inline;
       this is the network equivalent — all ~476KB is fetched and decoded
       during the greeting sequence.) */
    $$("img").forEach((img) => {
      img.setAttribute("loading", "eager");
      img.setAttribute("decoding", "async");
      if (typeof img.decode === "function") img.decode().catch(() => {});
    });
    const countEl = $(".pl-count b", pl);
    const barEl = $(".pl-bar", pl);
    const DUR = 1050;
    const t0 = performance.now();
    const step = (t) => {
      const p = clamp((t - t0) / DUR, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const n = Math.round(eased * 100);
      if (countEl) countEl.textContent = n;
      if (barEl) barEl.style.transform = `scaleX(${eased})`;
      if (p < 1) requestAnimationFrame(step);
      else {
        setTimeout(() => {
          pl.classList.add("done");
          document.body.classList.remove("is-locked");
          heroEntrance();
          engine.measure();
          setTimeout(() => pl.remove(), 1000);
        }, 160);
      }
    };
    requestAnimationFrame(step);
  })();

  /* ————— velocity-reactive marquee ————— */
  const marquee = (() => {
    const track = $(".marquee-track");
    if (!track) return null;
    let x = 0;
    let extra = 0;
    const base = REDUCED ? 0 : 0.62;
    (function loop() {
      const half = track.scrollWidth / 2;
      if (half > 0) {
        extra = lerp(extra, clamp(engine.velocity * 1.9, -5.2, 5.2), 0.08);
        x -= base + extra;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
      }
      requestAnimationFrame(loop);
    })();
    return true;
  })();

  /* ————— work accordion (exclusive) ————— */
  const rows = $$(".p-row");
  rows.forEach((row) => {
    const btn = $(".p-btn", row);
    btn.addEventListener("click", () => {
      const isOpen = row.classList.contains("open");
      rows.forEach((r) => {
        r.classList.remove("open");
        $(".p-btn", r).setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        row.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        /* keep opened panel in view if its header slipped above the fold */
        setTimeout(() => {
          const r = row.getBoundingClientRect();
          if (r.top < 0) engine.to(window.scrollY + r.top - 72);
        }, 560);
      }
    });
  });

  /* ————— cursor-following work preview (tilt + lerp) ————— */
  const preview = (() => {
    const host = $(".work-preview");
    if (!host || !FINE || REDUCED) return;
    const img = $("img", host);
    const cap = $(".wp-cap b", host);
    let mx = 0, my = 0, cx = 0, cy = 0, lastX = 0, lastY = 0;
    let rotX = 0, rotY = 0, active = false;
    document.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    (function loop() {
      cx = lerp(cx, mx, 0.11); cy = lerp(cy, my, 0.11);
      const vx = clamp((mx - lastX) * 0.45, -10, 10); lastX = mx;
      const vy = clamp((my - lastY) * 0.45, -8, 8); lastY = my;
      rotY = lerp(rotY, clamp(vx * 1.6, -9, 9), 0.12);
      rotX = lerp(rotX, clamp(-vy * 1.6, -7, 7), 0.12);
      const scale = active ? 1 : 0.88;
      host.style.transform = `translate(${cx + 30}px, ${cy - 150}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${scale})`;
      requestAnimationFrame(loop);
    })();
    rows.forEach((row) => {
      row.addEventListener("mouseenter", () => {
        const panelImg = row.querySelector(".p-fig img");
        if (row.classList.contains("open") || !panelImg) { host.classList.remove("show"); img.classList.remove("on"); active = false; return; }
        if (img.getAttribute("src") !== panelImg.getAttribute("src")) img.setAttribute("src", panelImg.getAttribute("src"));
        cap.textContent = row.dataset.cap || "";
        active = true;
        host.classList.add("show");
        /* The CSS fades the image in via .on — src alone leaves it at opacity 0 */
        img.classList.add("on");
      });
      row.addEventListener("mouseleave", () => { active = false; host.classList.remove("show"); img.classList.remove("on"); });
      row.addEventListener("click", () => { active = false; host.classList.remove("show"); img.classList.remove("on"); });
    });
  })();

  /* ————— mobile menu ————— */
  const mobileMenu = (() => {
    const btn = $(".menu-btn");
    const menu = $(".mobile-menu");
    if (!btn || !menu) return { close: () => {} };
    const close = () => {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("is-locked");
    };
    btn.addEventListener("click", () => {
      const open = !menu.classList.contains("open");
      menu.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("is-locked", open);
      if (open) engine.target = engine.current = window.scrollY;
    });
    return { close };
  })();

  /* ————— contact form ————— */
  (() => {
    const form = $(".c-form");
    if (!form) return;
    const chips = $$(".chip", form);
    const nameF = $("#f-name", form);
    const mailF = $("#f-email", form);
    const briefF = $("#f-brief", form);
    const submit = $(".f-submit", form);
    const EMAIL = "habib@habibcore.com";
    const selected = () => chips.filter((c) => c.getAttribute("aria-pressed") === "true").map((c) => c.dataset.v);

    chips.forEach((c) => c.addEventListener("click", () => {
      c.setAttribute("aria-pressed", c.getAttribute("aria-pressed") === "true" ? "false" : "true");
    }));

    const flagErr = (input) => {
      const field = input.closest(".f-field");
      field.classList.remove("err");
      void field.offsetWidth; // restart shake
      field.classList.add("err");
      setTimeout(() => field.classList.remove("err"), 700);
    };

    submit.addEventListener("click", (e) => {
      e.preventDefault();
      let ok = true;
      if (!nameF.value.trim()) { flagErr(nameF); ok = false; }
      if (!mailF.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mailF.value.trim())) { flagErr(mailF); ok = false; }
      if (!ok) { toast("ALMOST THERE", "Add your name and a valid email so I can reply."); return; }
      const types = selected();
      const subject = `Project enquiry${types.length ? ` — ${types.join(", ")}` : ""} — ${nameF.value.trim()}`;
      const body = [
        `Name: ${nameF.value.trim()}`,
        `Email: ${mailF.value.trim()}`,
        `Building: ${types.length ? types.join(", ") : "—"}`,
        "",
        briefF.value.trim() || "(no brief yet)",
      ].join("\n");
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      toast("OPENING YOUR MAIL APP", "Prefer to stay here? Copy the address instead.");
    });

    /* copy email */
    const copyBtn = $(".copy-btn");
    if (copyBtn) copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(EMAIL);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = EMAIL; document.body.appendChild(ta);
        ta.select(); document.execCommand("copy"); ta.remove();
      }
      copyBtn.textContent = "COPIED ✓";
      copyBtn.classList.add("ok");
      toast("COPIED", `${EMAIL} is on your clipboard.`);
      setTimeout(() => { copyBtn.textContent = "COPY"; copyBtn.classList.remove("ok"); }, 2000);
    });
  })();

  /* ————— boot ————— */
  engine.start();
  if (!engine.on) {
    /* native scroll: still run rAF loop for cursor/parallax via passive listener */
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { effects(0); ticking = false; });
    }, { passive: true });
    effects(0);
  }
  window.addEventListener("resize", () => engine.measure());
  effects(0);
})();

