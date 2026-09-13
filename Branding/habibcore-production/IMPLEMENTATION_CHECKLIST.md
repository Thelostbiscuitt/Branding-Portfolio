# IMPLEMENTATION CHECKLIST — HABIBCORE Production Package v1.0

Status legend: ✅ completed · 👁 requires visual review · 🧪 requires live-site
testing · ⛔ rejected (stays dead) · 🔮 future work

---

## A · Completed

- ✅ **01 — Canonical B mark**: master vector traced from the approved artwork
  (`01_logo/svg/mark-*.svg`), viewBox 800×900 (8:9 exact), IoU 0.95 vs source,
  ink 20.3 %, waist notch + 3 capsules + keyline intact. **Not redesigned.**
- ✅ Layered motion master (`layered/mark-layers.svg` — ring/planes/counters
  as separate groups) + path JSON + fidelity proof sheet.
- ✅ Four sanctioned colourways + currentColor master + 50 % grey variant.
- ✅ Wordmark outlined to paths (Archivo 120/850, −1 %, ® at 34 % cap) + short
  form "Habib." + reverse versions.
- ✅ Lockups per FIG. 03 construction rules: stacked (0.72× symbol, 0.163× gap),
  horizontal (1.34× cap, 0.6× gap, optional mono descriptor +20 %).
- ✅ Raster set 16→2048 px, both polarities; avatars 400/1000 (58 % mark);
  OG 1200×630; min-size strip proof.
- ✅ Favicon/PWA set: ICO 16/32/48, SVG favicon, apple-touch 180, android-chrome
  192/512, maskable 192/512, webmanifest, theme-color ink.
- ✅ **03 — tokens.css + tokens.json (DTCG)**: colour (PDF-canonical), spacing
  rhythm (4/8/12/24/48/96 + flagged extensions), grid, 7 typographic roles,
  geometry (2 px plane · 6 px capsule · 10 % large), keylines (1.5 px), icon
  strokes (2 / 2.5 px), dash system, patterns, angles (42/147), motion tokens
  (PDF 09.5 verbatim), breakpoints, 1440 container, 68 ch measure, 44 px touch,
  responsive gutters, ink/paper themes, reduced-motion contract, role classes.
- ✅ **02 — Figma library package**: 26 import-ready component artboards
  (live text; palette-exact fills), Tokens Studio JSON (78 tokens), reference
  board mirroring the file structure, import procedure, library rules.
- ✅ Case-study five-plate components (01 BRIEF … 05 OPERATE, OPERATE
  Signal-indexed) + project card rest/hover with 42° fold + OPEN chip.
- ✅ Product endorsement component (guest-name architecture; no product logos).
- ✅ **05 — Motion prototypes** (all three run clean in headless Chromium, zero
  console errors): A assemble (FIG. 19 timing verbatim, once-per-session +
  shorthand), B plate reveal (5-plate editorial sequence + width-fold headline),
  C system state (IDLE→LOADING→PROCESSING→RESOLVED + ERROR/rollback; loops only
  on live indicators).
- ✅ Reduced-motion equivalents implemented and named in every deliverable.
- ✅ Documentation set: logo README (clear space, min size, colourways, lockups,
  usage, prohibitions, naming), integration guide, inventory, conformance QC.
- ✅ **Final QC: 39/39 automated checks pass** (logo fidelity, palette purity,
  typography, geometry, motion laws, architecture, case anatomy, usability).

## B · Requires visual review 👁

- 👁 **Motion verdicts** — fill the decision-gate table in `04_motion/README.md`
  for A / B / C (distinctiveness · fit · economy · usefulness · gimmick
  resistance). Nothing is committed until argued through the twelve gates.
- 👁 T_LOCK easing approximation `cubic-bezier(0.3,1.18,0.38,1)` (~2 % overshoot)
  — confirm by eye; adjust one token if the seat feels hot or dead.
- 👁 Stacked-lockup symbol ratio (0.72 × wordmark) and horizontal descriptor
  scale (0.354 ×) — calibrated to FIG. 03; sanity-check at real sizes
  (favicon → signage).
- 👁 Biscuit AI / Relay endorsement plate wording with the live product names.
- 👁 Case-plate placeholder geometry — replace with real captures via the PDF
  Part 07 pipeline before any client-facing use.
- 👁 Reference board pass in a real browser (`02_figma/reference-board.html`)
  to bless component proportions before Figma assembly.

## C · Requires live-site testing 🧪

- 🧪 Reduced-motion pass under OS-level settings on real devices (headless
  harness could not emulate `prefers-reduced-motion`).
- 🧪 Favicon set on real tabs/bookmark bars (16 px legibility, dark-mode tab
  strips, iOS home-screen rounding of the touch icon).
- 🧪 Archivo variable-font rendering across browsers (font-stretch ↔ wdth axis
  mapping, especially Safari + Firefox) — or self-hosted WOFF2 axis registration.
- 🧪 OG image render in social crawlers (some platforms ignore SVG-sourced PNGs'
  colour profiles — verify the 1200×630 PNG).
- 🧪 Dash-field pattern performance on low-end mobile (repeating gradients) —
  swap to pre-rendered SVG tile if jank appears.
- 🧪 Assembly-once-per-session rule against real navigation patterns (does the
  sessionStorage guard match how the site is actually traversed?).

## D · Rejected — stays dead ⛔

Per the PDF ledger (Part 16.2), these remain rejected and are **not** in the
package: spatial 3-D treatments (Direction D) · custom logotype redraw ·
decorative accent colours / gradients · parallax & scroll-jacking · idle logo
animation / endless loops · glassmorphism, grain, glitch aesthetics ·
sub-brands or product logos for Biscuit AI / Relay · warm palette substitution
(#111111/#F5F3EE — superseded by the PDF colour decision record).

## E · Future work 🔮

- 🔐 Figma variables wired end-to-end (import tokens, build components, publish
  library) — package provides everything; needs a Figma seat (~30 min).
- 🎞 Produce the final motion endframe film from Prototype A once its verdict
  is committed (Roadmap P3).
- 📄 Proposal / invoice / one-pager templates from the token system (Roadmap P2).
- 🗂 Rewrite top 3 case studies into the five-plate anatomy (Roadmap P2).
- 🧾 Email signature HTML per FIG. 26 (plain-table build for mail clients).
- 🌐 Site implementation pass applying Part 10 (dash loaders, fold transitions,
  unified 404, Signal audit) using this package (Roadmap P1).
- 🔁 Quarterly governance audit: Signal budget share, distinctiveness
  checklist, decision-ledger review (Roadmap P4).
