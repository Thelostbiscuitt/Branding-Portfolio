# 03_tokens — HABIBCORE Design Tokens

Single centralised source for every design decision a frontend touches.
Change the system here; every surface follows.

## Files

| File | Format | Use |
|------|--------|-----|
| `tokens.css` | CSS custom properties + role classes | Drop into any modern frontend (`@import` or link). Semantic layer is the only layer components may reference. |
| `tokens.json` | W3C Design Tokens (DTCG, `$value/$type`) | Tooling: Tokens Studio, Style Dictionary, Figma Variables (via plugin). |

## Palette decision (read once)

The production brief listed `#111111 / #F5F3EE` + warm greys. The **authoritative
PDF** (Part 06, FIG. 16, *Decision Record — Colour System*) fixes the palette as:

| Token | Value | Role |
|-------|-------|------|
| `ink` | `#0A0A0A` | Ground, text, plates |
| `paper` | `#FFFFFF` | Default canvas |
| `grey-1` | `#F4F4F2` | Fields, stripes, quiet panels |
| `grey-2` | `#E6E6E3` | Hairlines, dividers, disabled |
| `grey-3` | `#6E6E6A` | Metadata, captions |
| `signal` | `#FF4B00` | **States only** — live · error · decision · annotation |

Per the governing instruction — *the PDF is the primary brand-system authority;
do not reinterpret the identity* — the PDF values are canonical. If the warm
palette is ever wanted, it is a one-place change in `tokens.css` §1 (and it
would require a new decision-ledger entry, Part 16).

## Non-negotiables encoded here

- **Angles:** the only diagonals anywhere are `42°` (fold) and `147°`
  (counter-fold). No 30/45/60.
- **Signal budget:** ≤1% of any surface; never body text, never backgrounds
  for text blocks, max one Signal element per view.
- **Type:** Archivo (width axis does the work) + IBM Plex Mono. One width per
  text block. Body is sentence case. Numbers are tabular.
- **Spacing rhythm:** 4 · 8 · 12 · 24 · 48 · 96 (×2 above 12). 16/32/64 exist
  as flagged 8px-logic extensions for component internals.
- **Motion:** durations/easings are the PDF 09.5 table verbatim. Nothing loops
  except state indicators. Reduced-motion equivalents are mandatory and named.

## Themes

Default `:root` = paper (light). Add `data-hc-theme="ink"` on `<html>`/`<body>`
for dark-surface defaults (site-native mode).

## Quick use

```css
@import "tokens.css";

.card {
  background: var(--hc-bg);
  border: var(--hc-plate-border);
  border-radius: var(--hc-radius-plane);
  padding: var(--hc-space-24);
}
.card:hover { transform: translateY(var(--hc-motion-hover-lift, -2px)); }

.status-live { color: var(--hc-state-live); }  /* Signal: state meaning only */
```

```js
// breakpoints are CSS-invisible; read them from the JSON for JS logic
import tokens from "./tokens.json";
const BP = tokens.breakpoint; // .mobile.value === "640px"
```
