# 04_motion — HABIBCORE Motion Prototypes

**Status: three genuinely different tests — no direction committed yet.**
Each prototype is a self-contained HTML file (no build step, no dependencies;
Archivo + IBM Plex Mono load from Google Fonts with system fallbacks).
The canonical layered mark is inlined — geometry identical to `01_logo/`.

Open `prototype-a-assemble/index.html`, `prototype-b-plate-reveal/index.html`,
`prototype-c-system-state/index.html` in any modern browser.

---

## Prototype A — ASSEMBLE  (`prototype-a-assemble/`)

**Question the test answers:** does the identity *constructing itself* read as
structural truth rather than a generic logo reveal?

| Aspect | Implementation |
|---|---|
| Source | Layered vector master (ring / upper plane / floor plane / 3 counters as separate groups) — per FIG. 19 production note |
| Choreography | F1 0.00 frame in · F2 0.18 upper plane slides on **−42°** · F3 0.52 floor plane folds on **147°** · F4 0.88 body seats 3° past · F5 1.02 lock+settle · F6 1.16 counter pulse (Signal) |
| Total | 1350 ms (T_ASSEMBLE) — then stillness |
| Travel | Linear on the angle axes only (T_SPLINE); no arcs, no curves |
| Mass law | Seat = rotate(−3°) scale(.94) → 0° with ≤2 % overshoot (ease-lock) |
| Signal | Exactly one moment: the counter pulse = joint confirmation |
| Session rule | Full assembly once per session (sessionStorage); later appearances use the 320 ms T_LOCK shorthand — both buttons included |
| Reduced motion | Settled state with a single T_LOCK fade; no staged build |
| Verdict criteria | Restraint · timing · "can feel the assembly, hear it even when silent" · survives repetition |

**Measured result:** full timeline fires in order (verified headless); phase
readout reports every FIG. 19 beat; loop count = 0 after lock.

## Prototype B — PLATE REVEAL  (`prototype-b-plate-reveal/`)

**Question:** can motion choreograph *evidence arriving* — editorial, not decorative?

| Aspect | Implementation |
|---|---|
| Structure | The five-plate case anatomy (01 BRIEF / 02 SYSTEM / 03 BUILD / 04 PROOF / 05 OPERATE) revealing in reading order, 140 ms stagger |
| Plate sequence | Keyline frame in → content wipes **L→R on 0°** (T_UI 240) → threshold snap (steps) → metadata stamps (T_MICRO 120) |
| Headline | Width-fold 76→120 % (T_TEXTFOLD 360) — the single sanctioned text transition, display size only |
| Signal | One element: the 05 OPERATE chip (the differentiator plate is Signal-indexed, FIG. 25) |
| Diagonals | None used — one-diagonal-max rule kept in reserve; wipes run on 0° |
| Reduced motion | Everything settles immediately, no wipes |
| Verdict criteria | Feels like evidence, not decoration · sequencing aids comprehension · calm at rest |

**Honesty note:** plate imagery is labelled placeholder geometry (the imagery
pipeline, PDF 07, requires real captures before production use). The motion
grammar is what is under test here.

## Prototype C — SYSTEM STATE  (`prototype-c-system-state/`)

**Question:** does motion communicate system behaviour — STATE → ACTION → RESOLUTION?

| Aspect | Implementation |
|---|---|
| Machine | IDLE → LOADING → PROCESSING → RESOLVED, with an ERROR branch reachable from LOADING/PROCESSING |
| Loaders | The mark's capsule counters working as progress (Direction B, FIG. 20); fill staged 0/.3/.6 s while a mono readout reports BOOT → LOAD |
| Loop policy | Only state indicators loop, **only while the state holds** (live dot, dash fill); resolution prints like terminal output and stillness resumes |
| Output | "RECEIVED · hh:mm WAT · DEPLOYED" prints; the mark arrives as the routine's output at T_LOCK |
| Error | Ink plate + Signal ✕ message + single recovery action (RETRY →); rollback empties the capsules; no red floods, no glitch theatrics |
| Reduced motion | Instant state swap; loader holds a static 42 % fill; live dot steady |
| Verdict criteria | "Things move because something changed" · usability never delayed · Signal budget < 1 % at all times |

**Measured result:** deploy → resolved verified end-to-end headless (state map,
transition log, output line correct); error branch verified (rollback + recovery).

---

## Shared doctrine honoured by all three (PDF 09.1 / 09.6)

1. **Mass** — elements accelerate/decelerate like loaded objects.
2. **Fold logic** — travel on −42°/147° or true axes; curved arcs are foreign.
3. **Lock** — ends snap with ≤2 % overshoot and settle.
4. **Economy** — one idea moves at a time; echoes at 60 % distance.
5. **Silence** — everything resolves to stillness; loops only for live states.

Prohibitions respected: no idle rotation, no parallax, no text choreography
below display size, no motion without a nameable state, no 3-D rendering
(rejected Direction D stays rejected).

## Reduced-motion contract

Every prototype ships a `prefers-reduced-motion: reduce` block with the named
equivalents from PDF 09.6: assembly → single fade at T_LOCK; dash loaders →
static 42 % fill; plate reveals → settled; live dot → steady. **Recommended
pre-launch test:** run all three pages under OS reduced-motion to confirm.

## Decision gate (fill after review)

| Test | Distinctiveness | Brand fit | Production economy | Digital usefulness | Gimmick resistance | Verdict |
|---|---|---|---|---|---|---|
| A ASSEMBLE | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ commit ☐ revise |
| B PLATE REVEAL | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ commit ☐ revise |
| C SYSTEM STATE | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ commit ☐ revise |

Score against the FIG. 23 criteria. Nothing is committed until this table is
filled and argued through the twelve gates (PDF Part 16).
