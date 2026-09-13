# 02_figma — HABIBCORE Figma Library (import-ready)

Native Figma API access was not part of this environment, so the library ships
as an **import-ready package**: every artboard is a clean SVG with live text,
plus token files in both DTCG and Tokens Studio formats. Import time ≈ 30 minutes.

## What's here

| Path | What it is |
|------|-----------|
| `reference-board.html` | Visual board mirroring the intended Figma file, page by page — open in any browser |
| `components/*.svg` | 26 component artboards (Figma-import-ready; text stays editable) |
| `tokens.tokens.json` | Tokens Studio format (78 tokens) |
| `../03_tokens/tokens.json` | W3C DTCG format (canonical machine source) |
| `components/_registry.json` | Component titles + spec notes (machine-readable) |

## Import procedure (Figma desktop or web)

### 1 · Tokens → Variables (5 min)
1. Install the **Tokens Studio for Figma** plugin.
2. Create a new local token set → *Import* → `tokens.tokens.json`.
3. Push to Figma Variables: map types —
   `color → Color`, `sizing/dimension → Number`, `fontFamilies/fontWeights →` styles,
   `typography → Text styles`. Modes: create a second mode `ink` and bind the
   `ink` theme values (`#0A0A0A` surface, `#FFFFFF` foreground) for dark surfaces.

### 2 · Base styles (5 min)
- **Text styles** — the seven roles from PDF 05.3 (they exist in the token file):
  `display-xl / display / subhead / body / meta / data / legal` + `button / nav / project-index`.
  Archivo and IBM Plex Mono are native Google Fonts inside Figma — no uploads.
- **Effect styles:** none. Shadows are banned (cards separate by keyline, not elevation).
- **Grid styles:** 12 columns, gutter 16 (24 @desktop), margin `6vmin clamp 16–96`,
  8px baseline.

### 3 · Components (20 min)
Drag each `components/*.svg` onto the matching page, then rebuild as native
components using variables. Suggested assembly order:

1. `metadata-row` → `project-index-row` → `project-card` (+hover variant via component
   properties: `state = rest | hover`).
2. Buttons (`primary / secondary / destructive` as one component with `variant` property).
3. `form-input` (properties: `state = rest | focus | error | success`).
4. `case-plate-01…05` → one component `case-plate` with property `plate = 01…05`
   (05 OPERATE is always Signal-indexed).
5. Header/footer/status/loading/error/empty.
6. Logo lockups: import from `../01_logo/svg/` (`lockup-stacked`, `lockup-horizontal`,
   `mark-*`). Keep them as nested instances — never redraw.

### 4 · Publish
Publish as **HABIBCORE Core Library**. Products (Biscuit AI, Relay) consume the
library plus the `product-endorsement` component — they never get their own
library, logos, or colours (brand architecture, PDF Part 13).

## Rules the library enforces

- Only 42°/147° diagonals exist — the hover fold polygon is provided; do not invent others.
- Signal `#FF4B00` appears only in: OPEN chip, live dot, destructive label, OPERATE plate,
  error text. If a new usage needs Signal, it needs a decision-gate review first.
- No shadows, no gradients, no glassmorphism, no extra radii (2px plane · 6px capsule · 10% large).
- Text styles map 1:1 to the seven roles — no ad-hoc sizes.

## Component inventory

header-nav · mobile-nav · section-number · instrument-rail · metadata-row ·
project-index-row · project-card · project-card-hover · cta-pair · button-primary ·
button-secondary · button-destructive · link · status · form-input · loading-state ·
error-state · empty-state · media-frame · case-plate-01…05 · product-endorsement · footer
