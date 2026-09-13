# Asset Inventory — HABIBCORE Production Package v1.0

Every file in the package, with its role and source of truth.
Generated totals: **150+ files**, all under `habibcore-production/`.

## 01_logo/ — canonical mark & asset kit

| Path | Role |
|---|---|
| `svg/mark-black.svg` | Ink mark, transparent — primary digital |
| `svg/mark-white.svg` | Paper mark, transparent |
| `svg/mark-current.svg` | currentColor variant (inherits text colour) |
| `svg/mark-on-ink.svg` · `mark-on-paper.svg` | Plated presentations |
| `svg/mark-on-signal.svg` | State contexts only |
| `svg/mark-grey50.svg` | 50 % de-emphasis (watermarks, legal) |
| `svg/wordmark.svg` / `-white.svg` | HABIBCORE® outlined (Archivo 120/850) |
| `svg/wordmark-habib.svg` | Short form "Habib." (Archivo 750) |
| `svg/lockup-stacked.svg` / `-white.svg` | Primary lockup |
| `svg/lockup-horizontal.svg` / `-white.svg` / `-plain.svg` | Horizontal lockup (± descriptor) |
| `svg/favicon.svg` | Favicon source (ink plate, 76 % mark) |
| `svg/og-1200x630.svg` | Social preview source |
| `layered/mark-layers.svg` | Separate ring/planes/counters — motion source |
| `layered/mark-paths.json` | Path data for programmatic use |
| `layered/trace_qc.json` | Fidelity audit (IoU, ink %, angles) |
| `layered/trace_proof.png` | Source-vs-vector proof |
| `raster/mark-black/` · `mark-white/` | PNG 16–2048 px (10 sizes each) |
| `raster/mark-on-ink/` | Plated 512/1024/2048 + avatars 400/1000 |
| `raster/lockups/` | Stacked ±1024, horizontal ±2048, plain, OG PNG |
| `raster/min-size-strip.png` | 96→16 px legibility proof |
| `favicon/favicon.ico` · `-16/32/48.png` | Browser icons |
| `favicon/apple-touch-icon.png` | 180 px |
| `favicon/android-chrome-192/512.png` | Android icons |
| `favicon/maskable-192/512.png` | Safe-zone (60 % mark) |
| `favicon/favicon.svg` · `site.webmanifest` | PWA set |

## 02_figma/ — library package

| Path | Role |
|---|---|
| `reference-board.html` | Visual board mirroring the Figma file structure |
| `components/*.svg` | 26 artboards: header-nav, mobile-nav, section-number, instrument-rail, metadata-row, project-index-row, project-card (+hover), cta-pair, button-primary/-secondary/-destructive, link, status, form-input, loading-state, error-state, empty-state, media-frame, case-plate-01…05, product-endorsement, footer |
| `components/_registry.json` | Titles + spec notes (machine-readable) |
| `tokens.tokens.json` | Tokens Studio format (78 tokens) |
| `README.md` | Import procedure + library rules |

## 03_tokens/ — the system's control room

| Path | Role |
|---|---|
| `tokens.css` | Primitives → semantics → components; themes; reduced-motion; role classes |
| `tokens.json` | W3C DTCG mirror (canonical machine source) |
| `README.md` | Palette decision record + usage |

## 04_motion/ — three uncommitted tests

| Path | Role |
|---|---|
| `prototype-a-assemble/index.html` | Structural assembly (FIG. 19, 1.35 s, once/session + T_LOCK shorthand) |
| `prototype-b-plate-reveal/index.html` | Editorial 5-plate case reveal + width-fold headline |
| `prototype-c-system-state/index.html` | STATE→ACTION→RESOLUTION machine + error branch |
| `README.md` | Specs, verdict criteria, decision-gate table |

## 05_docs/ — governance

| Path | Role |
|---|---|
| `INTEGRATION_GUIDE.md` | Developer setup → ship (fonts, logo, type, motion, Signal audit, a11y) |
| `CONFORMANCE_QC.md` | Full QC report vs the PDF (39 automated checks + browser verification) |
| `qc_results.json` | Raw check results |
| `ASSET_INVENTORY.md` | This file |

## Root

| Path | Role |
|---|---|
| `README.md` | Package overview + governing decisions |
| `IMPLEMENTATION_CHECKLIST.md` | Completed / requires review / requires testing / rejected / future |

## Source scripts (project workspace, not shipped in the package)

`scripts/canonicalise_mark.py` · `build_wordmark.py` · `build_rasters.py` ·
`build_figma_components.py` · `build_reference_board.py` · `inject_motion.py` ·
`final_qc.py` — rerun to regenerate any deliverable from the masters.
