
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
      const loop = () => {
        this.target = clamp(this.target, 0, this.max);
        const prev = this.current;
        this.current = lerp(this.current, this.target, 0.095);
        if (Math.abs(this.current - this.target) < 0.4) this.current = this.target;
        this.velocity = this.current - prev;
        if (this.current !== prev) window.scrollTo(0, this.current);
        effects(this.velocity);
        this.raf = requestAnimationFrame(loop);
      };
      this.raf = requestAnimationFrame(loop);
      window.addEventListener("wheel", (e) => {
        if (e.ctrlKey) return; // let pinch-zoom through
        e.preventDefault();
        this.target = clamp(this.target + e.deltaY * wheelScale(e), 0, this.max);
      }, { passive: false });
      window.addEventListener("resize", () => this.measure());
      // re-measure when images/layout settle
      window.addEventListener("load", () => this.measure());
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
    return clamp(d, -160, 160);
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
  let lastY = window.scrollY;
  let navTick = 0;

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
    /* velocity skew on display headlines */
    if (!REDUCED) {
      const sk = clamp(velocity * 0.016, -0.7, 0.7);
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
    const countEl = $(".pl-count b");
    const barEl = $(".pl-bar");
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
        if (row.classList.contains("open") || !panelImg) { host.classList.remove("show"); active = false; return; }
        if (img.getAttribute("src") !== panelImg.getAttribute("src")) img.setAttribute("src", panelImg.getAttribute("src"));
        cap.textContent = row.dataset.cap || "";
        active = true;
        host.classList.add("show");
      });
      row.addEventListener("mouseleave", () => { active = false; host.classList.remove("show"); });
      row.addEventListener("click", () => { active = false; host.classList.remove("show"); });
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

