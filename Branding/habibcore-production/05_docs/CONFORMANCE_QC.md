# Conformance QC Report — HABIBCORE Production Package v1.0

**Method:** 39 automated checks (`scripts/final_qc.py` → `qc_results.json`) plus
manual browser verification of all three motion prototypes (headless Chromium:
full interaction runs, screenshots, console error watch).

**Result: 39 / 39 automated checks pass · 0 console errors across prototypes.**

## 1 · Logo not redesigned — PASS

| Check | Result |
|---|---|
| Vector master traced from approved master artwork (no redraw) | IoU **0.9501** vs source mask at native 953×1071 (residual = keyline anti-aliasing) |
| Frame | viewBox `0 0 800 900` — the documented 8:9 (0.8898) exact |
| Anatomy | ring + upper plane + floor plane + 3 capsule counters + waist notch all present and separate (layered master) |
| Ink coverage | 20.3 % source → 20.33 % vector |
| Angle families (vector render) | 135.5° (147 family) · 45.5° (42 family) · verticals · keyline horizontals — matches measured source families (41.8° / 147.0°) |
| Proof sheet | `01_logo/layered/trace_proof.png` |

## 2 · Colours — PASS

| Check | Result |
|---|---|
| tokens.css / tokens.json carry the exact PDF palette | Ink `#0A0A0A` · Paper `#FFFFFF` · G1 `#F4F4F2` · G2 `#E6E6E3` · G3 `#6E6E6A` · Signal `#FF4B00` |
| All logo SVG fills ∈ palette | PASS (four sanctioned colourways + plates) |
| All 26 Figma component fills ∈ palette | PASS (soft body copy = ink @ 76 % opacity — `--hc-text-soft`) |
| Superseded warm palette (#111111/#F5F3EE + 5 greys) absent from live token values | PASS — appears only in documentation notes explaining the decision |

**Documented deviation:** the task brief listed `#111111 / #F5F3EE` + warm greys.
The PDF (Part 06, FIG. 16, *Decision Record — Colour System*) is the declared
primary authority and specifies the achromatic palette above; the brief values
were therefore **not** used. Centralised in `03_tokens` — a one-place change if
ever re-argued through the gates.

## 3 · Typography — PASS

Archivo (sole sans; width axis 120/850 · 114/820 · 106/750 · 100/400 · 76/500
documented as tokens) + IBM Plex Mono (instrument voice). Banned faces
(Space Grotesk, JetBrains Mono, Inter, Poppins, Montserrat) appear in no
font-family declaration. Wordmark outlined to Archivo 120/850, tracking −1 %,
® at 34 % cap height — exactly per 02.2.

## 4 · Geometry — PASS

Plane radius 2 px · capsule radius 6 px · keyline 1.5 px · hairline 1 px ·
icon stroke 2 px (2.5 px @≤16 px) · touch target 44 px · angles 42°/147° only ·
container 1440 px · reading measure 68 ch · spacing rhythm 4/8/12/24/48/96
(16/32/64 flagged as 8-px-logic extensions) · gutters responsive 16→24 px ·
page margin = 6 % short edge, clamped.

## 5 · Motion principles — PASS (headless-verified)

| Prototype | Timeline verified | Loops | Reduced motion | Signal |
|---|---|---|---|---|
| A ASSEMBLE | FIG. 19 beats 0/180/520/880/1020/1160 ms fire in order; locks to still | none after lock | settled state + single fade | one counter pulse |
| B PLATE REVEAL | staggered keyline→wipe→snap→stamp sequence; width-fold headline 76→120 | none | instant settle | 05 OPERATE chip only |
| C SYSTEM STATE | IDLE→LOADING→PROCESSING→RESOLVED driven end-to-end; ERROR branch + rollback verified | live-dot & dash fill **only while state holds** | instant swap, static 42 % fill | busy dot + error msg only |

No perspective/3-D properties, no parallax, no backdrop-filter/grain/glitch.
Durations + easings match the PDF 09.5 table verbatim (T_MICRO 120 · T_UI 240
cubic-bezier(.2,.7,.2,1) · T_LOCK 320 ≈2 % overshoot · T_ASSEMBLE 1350 ·
T_PAGE 420 · T_TEXTFOLD 360 · linear travel on the axes).

**Deliberate status: nothing is committed.** Per the brief, the three
prototypes are tests; the verdict table in `04_motion/README.md` is unfilled
pending review. (The PDF had selected A+direction-B-functional — these
prototypes test exactly those hypotheses plus the sanctioned editorial layer.)

## 6 · Brand architecture — PASS

Products appear as endorsed guests (`product-endorsement` component: own name,
keyline plate, "a HABIBCORE system", master footer link). No product logos
exist anywhere in the package. Disciplines appear only as mono metadata
(`014 · AI · PRODUCT — 2025`, filter-chip grammar).

## 7 · Case-study structure — PASS

Five-plate anatomy present as components (01 BRIEF / 02 SYSTEM / 03 BUILD /
04 PROOF / 05 OPERATE), with OPERATE Signal-indexed; Prototype B exercises the
same anatomy end-to-end.

## 8 · Reduced-motion handling — PASS (static verification)

`prefers-reduced-motion: reduce` blocks present in tokens.css and all three
prototypes with the named equivalents from PDF 09.6. **Flagged for live QA:**
OS-level reduced-motion emulation was not available in the headless harness —
one manual pass on a real device is required before launch (see checklist).

## 9 · Frontend usability — PASS

tokens.css parses as plain CSS custom properties (no preprocessor required);
tokens.json is valid DTCG; Tokens Studio JSON valid; semantic + primitive
layers separated; theme scope `[data-hc-theme="ink"]`; role classes shipped
(`hc-display-xl … hc-legal`). Integration guide + working examples
(`04_motion` pages double as reference implementations).

## Known deviations & notes

1. **Palette** — see §2 (PDF wins over the brief list; documented everywhere).
2. **Placeholder imagery** — Prototype B plates + media-frame component use
   labelled placeholder geometry; real captures must replace them before
   production (imagery pipeline, PDF Part 07).
3. **T_LOCK easing** — the PDF specifies "overshoot 1.02 → settle" without a
   bezier; `cubic-bezier(0.3, 1.18, 0.38, 1)` is the shipped approximation
   (~2 % overshoot). Confirm by eye at review; single-token change if adjusted.
4. **Wordmark live text** — web usage should use live Archivo text
   (per PDF 02.2); the outlined SVGs are for print vendors/signage.
5. **Archivo VF self-host file** — `assets/fonts/Archivo-VF.ttf` was fetched for
   path generation; production sites should self-host the official Google Fonts
   WOFF2 (licence: SIL OFL — already satisfied).
