# Integration Guide — HABIBCORE for frontend developers

Everything a developer needs to ship a brand-conformant surface in one sitting.
All values live in `03_tokens/tokens.css`; never hardcode hexes, angles or
durations in components.

## 1 · Setup (5 minutes)

```html
<!-- fonts (self-host recommended; fallback stack is tokenised) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">

<link rel="stylesheet" href="/tokens/tokens.css">
<link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png">
<link rel="manifest" href="/favicon/site.webmanifest">
<meta name="theme-color" content="#0A0A0A">
```

Dark-surface pages (site-native mode): `<html data-hc-theme="ink">`.

Self-hosting Archivo: the variable TTF used by this package is at
`assets/fonts/Archivo-VF.ttf` in the project workspace (download from Google
Fonts for production). Serve with `font-stretch: 62% 125%` in `@font-face`:

```css
@font-face{
  font-family:"Archivo";
  src:url("/fonts/Archivo-VF.ttf") format("truetype-variations");
  font-weight:100 900; font-stretch:62% 125%; font-display:swap;
}
```

## 2 · Logo usage

```html
<!-- inherits text colour -->
<img src="/logo/mark-current.svg" alt="HABIBCORE" class="logo">

<!-- fixed colourway -->
<img src="/logo/mark-black.svg" alt="">

<!-- inline (best for motion; groups are targetable) -->
<!-- copy the <g> groups from layered/mark-layers.svg -->
```

Rules that survive code review: min 16 px; clear space 1x (capsule height =
8 % of mark height); never recolour outside the four sanctioned colourways;
never rotate/stretch/shadow/container it. For the site masthead prefer **live
text** (`HABIBCORE®`, `font-stretch:120%; font-weight:850; letter-spacing:-0.01em`)
— the wordmark is typeset by design.

## 3 · Typography

Use the role classes; they encode the seven roles and the one-width-per-block law:

```html
<h1 class="hc-display-xl">HABIBCORE®</h1>
<h2 class="hc-display">Selected Work</h2>
<h3 class="hc-subhead">Start a project</h3>
<p class="hc-body">Brands, digital products and AI systems — drawn, coded and
shipped by the same hands.</p>
<span class="hc-meta">6°27′N, 3°24′E — Lagos · 13:42 WAT</span>
<code class="hc-data">TABULAR: 0123456789</code>
<p class="hc-legal">© 2026 HABIBCORE®</p>
```

Width via `font-stretch` (maps to the `wdth` axis): display 120, sub 106,
text 100, cond 76. Mixing widths inside a block is a violation.

## 4 · Surfaces, plates, keylines

```css
.plate   { border: var(--hc-plate-border); background: var(--hc-plate-bg); }
.ink     { background: var(--hc-surface-ink); color: var(--hc-on-ink); }
.field   { background: var(--hc-surface); }
```

Layout: 12 columns, gutter `var(--hc-grid-gutter)`, page margin
`var(--hc-page-margin)`, max width `var(--hc-container-max)`, prose measure
`max-width: var(--hc-reading-measure)`. Metadata rail = rightmost column.

## 5 · Motion

```css
.card:hover { transform: translateY(-2px); transition: var(--hc-motion-hover); }
.arrive     { animation: arrive var(--hc-dur-lock) var(--hc-ease-lock) both; }
```

Durations: micro 120 · ui 240 · lock 320 · page 420 · textfold 360 ·
assemble 1350 (once/session). Easings: `--hc-ease-out/ui/lock`; travel is
linear on 42°/147° paths only. **Nothing loops except state indicators, and
only while the state holds.** Reduced-motion blocks are already in tokens.css —
extend them, don't delete them.

Dash loader (three-beat, the mark's counters as progress):

```html
<div class="loader" aria-label="Loading">
  <i style="width:var(--hc-dash-w-long)"></i>
  <i style="width:var(--hc-dash-w-short)"></i>
  <i style="width:var(--hc-dash-w-med)"></i>
</div>
```

Working examples for all of the above are inside `04_motion/*/index.html` —
copy from there.

## 6 · Signal discipline (code-review checklist)

Signal `#FF4B00` may appear ONLY as: live/availability dot · error text or
marker · the OPEN ↗ chip · the 05 OPERATE plate index · the one decision
series in a chart · destructive-action label. If a PR adds a sixth use, it
needs a decision-gate review. Budget: < 1 % of any view.

## 7 · Accessibility pairings (PDF 06.3)

| Pair | Ratio | Cleared for |
|---|---|---|
| Ink on Paper | 19.4:1 | everything |
| Paper on Ink | 19.4:1 | everything |
| G3 on Paper | 5.2:1 | body-size text |
| Signal on Paper | 3.6:1 | graphics + ≥18 px bold ONLY — never body text |

Touch targets ≥ `var(--hc-touch-min)` (44 px). System cursor stays; custom
cursor never hides or delays it.

## 8 · Favicon / PWA

`favicon/` ships complete: `favicon.ico`, 16/32/48 PNGs, `apple-touch-icon.png`
(180), `android-chrome-192/512`, maskable 192/512, `site.webmanifest`
(theme colour already `#0A0A0A`). Drop the folder at site root and link as in §1.
