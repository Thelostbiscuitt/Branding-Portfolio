# HABIBCORE® — Production Identity Package

**v1.0 · Edition 2026 · derived from `HABIBCORE_Identity_System.pdf` (primary authority)**

This package turns the brand system into production assets: a canonical vector
logo, a Figma-ready library, frontend design tokens, and three motion
prototypes. Nothing here reinterprets the identity — the mark's geometry is
traced 1:1 from the approved artwork, the palette/type/motion values are the
PDF's decision records verbatim, and every deviation is documented.

```
habibcore-production/
├── 01_logo/            canonical B mark + wordmark + lockups + raster + favicons
├── 02_figma/           import-ready Figma library (components + tokens + board)
├── 03_tokens/          tokens.css + tokens.json (W3C DTCG) — change the system here
├── 04_motion/          three motion prototypes (A assemble · B plate reveal · C system state)
├── 05_docs/            integration guide · asset inventory · conformance QC
└── IMPLEMENTATION_CHECKLIST.md
```

## Start here

| You are… | Read |
|---|---|
| A frontend dev | `03_tokens/README.md` → `05_docs/INTEGRATION_GUIDE.md` |
| A designer (Figma) | `02_figma/README.md` → open `02_figma/reference-board.html` |
| Reviewing the logo | `01_logo/README.md` → `layered/trace_proof.png` |
| Deciding on motion | `04_motion/README.md` → open the three prototypes → fill the verdict table |
| Auditing conformance | `05_docs/CONFORMANCE_QC.md` |

## Governing decisions baked in

1. **The mark was not redesigned.** Geometry traced from the approved master
   (IoU 0.95 hard / visual match exact; audit in `01_logo/layered/trace_qc.json`).
2. **PDF palette is canonical** — Ink `#0A0A0A` / Paper `#FFFFFF` / G1–G3 /
   Signal `#FF4B00`. The brief's warm list (#111111/#F5F3EE…) is superseded by
   the PDF's colour decision record; the change is centralised in tokens if ever
   wanted.
3. **Only 42°/147° diagonals exist.** Encoded in tokens, components and motion.
4. **Signal is states-only**, ≤1 % surface budget, enforced in every deliverable.
5. **Master brand architecture** — disciplines are metadata; products
   (Biscuit AI, Relay) are endorsed guests; no sub-brands, no product logos.
6. **Motion is uncommitted** — three prototypes ship as tests with a verdict
   table; nothing is canonical until argued through the gates.
