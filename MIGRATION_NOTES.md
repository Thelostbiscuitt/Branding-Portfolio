# MIGRATION_NOTES.md — HABIBCORE v3.3 PORT
**Date:** 15 Sep 2026 · **Source of truth:** `HABIBCORE_v3_architecture (2).html` (BUILD v3.3, 5.1 MB self-contained sample) · **Content source:** the workspace's legacy portfolio (Next.js app in `src/`, self-contained legacy homepage at root `index.html`, media in `public/`).

**Outcome:** production-clean static folder — `index.html` (376 KB, zero inline media except the SVG favicon) + `media/` tree + `404.html`. All 24 hash routes live, all workspace content routed through the v3 data layer, sound deck playing **real BlvckOreo masters** from `/media/audio/`.

---

## 1 · PHASE 0 — WORKSPACE INVENTORY

### What the workspace contained
| Layer | Location | Notes |
|---|---|---|
| Legacy homepage (self-contained build, 964 KB) | `index.html` (root) | Warm-paper theme, embedded fonts, old nav + old sound player. **Replaced** by the v3 build (recoverable in git history @ `80a0ef8`). |
| Next.js portfolio (deployed on Vercel) | `src/` | 10 project pages (`src/app/projects/*`), data layer (`src/data/projects.ts`, `tracks.ts`, `range.ts`), components (Work, Nav, Player, About, Contact, Archive, Testimonial, Range…), contact form via Resend. **Retired from the deliverable; retained in the repo as the content source.** |
| Media originals | `public/projects/*` | hero images per project + screenshot sets |
| Music masters | `public/Music/*.mp3` | 26 BlvckOreo tracks (2021–2023), bpm/mood measured in `src/data/tracks.ts` |
| Live artifacts | `public/leadway-pitch.html`, `public/ai-training-hub.html` | the "live web document" (Leadway) and "web hub" (AI training) — copied to folder root so case links resolve |
| Brand production kit | `Branding/habibcore-production/` | logo masters, favicon set (og-plate source), tokens, motion prototypes, docs |
| Static export copy | `Branding/preview/site/` | prior Next.js export — legacy, not part of deliverable |

### Content manifest → v3 mapping
| Workspace item | v3 destination | Status |
|---|---|---|
| Biscuit AI (biscuit-ai, 2026, GitHub BiscuitBot) | `/work/biscuit-ai` · CASES 01 · grid card ×2 · flyout evidence | ✅ facts merged |
| Chef4Me (chef4me, 2026) | `/work/chef4me` · CASES 02 | ✅ |
| Leadway Pensure (leadway-pensure, 2024–2026, live pitch doc) | `/work/leadway-pensure` · CASES 03 + PITCH link | ✅ |
| Olumayowa Nursing Home (olumayowa-nursing-home, 2026, live site) | `/work/olumayowa-nursing-home` · CASES 04 + LIVE SITE link | ✅ |
| AI in the Workplace (ai-workplace-training → `ai-in-the-workplace`, 2026, hub) | `/work/ai-in-the-workplace` · CASES 05 + HUB link | ✅ slug note below |
| Relay (relay, 2026) | `/work/relay` · CASES 06 | ✅ |
| Skaame EPK (skaame, 2024, testimonial quote) | `/work/skaame` · ARCH 07 + PROOF quote | ✅ |
| Layo Isaac EPK (layo-isaac, 2024) | `/work/layo-isaac` · ARCH 08 | ✅ |
| BlvckOreo EPK (blvckoreo, 2023) | `/work/blvckoreo` · ARCH 09 | ✅ |
| 1ETHFP collaboration (1ethfp, 2024) | `/work/1ethfp` · ARCH 10 | ✅ |
| 8 capability disciplines | `/capabilities` + 8 detail routes | ✅ RELEVANT WORK regenerated from merged CASES — all links verified resolving |
| Approach / About / Contact pages | `/approach` · `/about` · `/contact` | ✅ |
| Path timeline (2020 Habibcore → 2022 Leadway → 2026 Birdview → Now) | `/about` path rows ×4 | ✅ |
| Testimonial — ABIDEMI AMODU (MD, Birdview) | training case page | ✅ |
| Testimonial — SKAAME ("These designs were exactly what I needed…") | skaame case PROOF block | ✅ |
| Contact channels: habib@habibcore.com · wa.me/2347013573240 · github.com/Thelostbiscuitt · behance.net/BlvckOreo · linkedin.com/in/michael-oguntimehin | `/contact` channel rows + Copy button + form chips + system-state readout | ✅ all verified against legacy source |
| Old sound player — 26 BlvckOreo tracks (measured bpm/mood) | v3 09 SOUND deck | ✅ 6-slot deck (reference design) filled with 6 real masters; see decision D3 |
| Project media originals (`public/projects/*`) | `media/<slug>.<ext>` | ✅ owner's originals used throughout |
| Portrait (`public/photo.jpg`) | `media/portrait.jpg` → `/about` + about flyout card | ✅ |
| og image plate | `media/og-plate.png` (from `Branding/.../habibcore-mark-512.png`) | ✅ |

## 2 · MERGE DECISION LOG
- **D1 — Workspace wins on facts.** Years corrected from the reference's drafts: biscuit-ai 2025→**2026**, chef4me 2025→**2026**, olumayowa 2025→**2026**, ai-in-the-workplace 2025→**2026**, relay 2024→**2026**, 1ethfp 2023–24→**2024**. Updated in CASES array, static case-page YEAR cells, work-grid card chips, flyout evidence labels, and capability-page RELEVANT WORK rows (10 rows). Copy the reference drafted verbatim from the workspace (claims = `positioning` lines, overviews = `description` fields) matched the workspace exactly and was kept.
- **D2 — Slug `ai-in-the-workplace` kept.** The workspace Next.js slug is `ai-workplace-training`; the reference routes it as `ai-in-the-workplace`. Reference wins for structure (hash routes carry no external-link debt; nothing in the workspace links to the old path).
- **D3 — Deck = 6 real masters, not test signals.** The reference's 6-slot deck (T-01…T-06) is its designed surface; the workspace's 26-track player was a legacy band. All 6 slots now play **real masters** from `public/Music` with measured bpm/mood from `src/data/tracks.ts`: What's Up!!! (Drill 140), Ends (Groove 92), Lagos Party (Party 126), Vice City (Night 86), Afro Woo (Drill 144), 234drill (Drill 144) — mood spread mirrors the reference's Drill/Groove/Party/Night test set. "TEST SIGNAL" labels dropped everywhere (dock artist, gate copy, playlist aria-label, UP NEXT, sound-section lede, deck-note). The other 20 tracks remain in the repo (`public/Music/`) for the owner to rotate in.
- **D4 — Case LINK cells added** (fourth meta cell, same k/v grammar): biscuit-ai → GITHUB (github.com/Thelostbiscuitt/BiscuitBot), olumayowa → LIVE SITE (olumayowanursinghome.com), leadway → PITCH (`leadway-pitch.html`), ai-in-the-workplace → HUB (`ai-training-hub.html`). The two artifact HTML files ship at folder root so the links are same-origin.
- **D5 — Owner's originals preferred over reference renditions.** All image containers in the v3 design use `object-fit: cover` (and `.portrait img` matches photo.jpg's 3:4), so every original fits the reference layout exactly. `media/relay.svg` is byte-identical to the reference rendition — the reference itself used the workspace original.
- **D6 — Per-route OG/Twitter swap added.** The router's meta-sync now also updates `og:title`, `og:description`, `twitter:title`, `twitter:description` per route (same mechanism as the existing title/description swap). Static head gains canonical `https://habibcore.com/`, OG/Twitter tags, `og:image = https://habibcore.com/media/og-plate.png`.
- **D7 — BUILD chip relabeled** `BUILD v3.3 — PORTED` (stale-cache detection kept).
- **D8 — Legacy retirement.** Root `index.html` (old self-contained homepage, old nav, old sound player) **replaced** by the v3 build; a minimal ink `404.html` now redirects to `/#/`. The Next.js app tree (`src/`, `public/`, configs) is **retained in the repo** as the content source/archive — it is not part of the shipped static folder; deleting it was considered destructive without owner sign-off (recorded here rather than acted on).
- **D9 — No media invented.** Every image in the build is a workspace original; no slot uses generated filler; the ink-plate fallback pattern was never needed.

## 3 · MEDIA EXTRACTION REPORT
Reference holds 12 unique images (1 inline SVG favicon kept in `<head>` + 10 case renditions + 1 portrait) and 6 generated audio test signals (not shipped). Production media = owner's originals, slug-named:

| File | Size | Origin |
|---|---|---|
| media/biscuit-ai.jpg | 283,846 B | public/projects/biscuit-ai/hero.jpg |
| media/chef4me.jpg | 46,774 B | public/projects/chef4me/hero.jpg |
| media/leadway-pensure.jpg | 140,677 B | public/projects/leadway/hero.jpg |
| media/olumayowa-nursing-home.jpg | 126,582 B | public/projects/olumayowa-nursing-home/hero.jpg |
| media/ai-in-the-workplace.jpg | 143,222 B | public/projects/ai-workplace-training/hero.jpg |
| media/relay.svg | 679 B | public/projects/relay/cover.svg |
| media/skaame.jpg | 42,724 B | public/projects/skaame/hero.jpg |
| media/layo-isaac.jpg | 282,205 B | public/projects/layo-isaac/hero.jpg |
| media/blvckoreo.jpg | 113,966 B | public/projects/blvckoreo/hero.jpg |
| media/1ethfp.jpg | 319,282 B | public/projects/1ethfp/roadmap.jpg |
| media/portrait.jpg | 1,029,613 B | public/photo.jpg |
| media/og-plate.png | 37,909 B | Branding/.../favicon/habibcore-mark-512.png |
| media/audio/whats-up.mp3 | 3,859,761 B | public/Music/whats-up.mp3 |
| media/audio/ends.mp3 | 6,927,743 B | public/Music/ends.mp3 |
| media/audio/lagos-party.mp3 | 2,990,497 B | public/Music/lagos-party.mp3 |
| media/audio/vice-city.mp3 | 11,351,824 B | public/Music/vice-city.mp3 |
| media/audio/afro-woo.mp3 | 3,731,696 B | public/Music/afro-woo.mp3 |
| media/audio/234drill.mp3 | 6,739,512 B | public/Music/234drill.mp3 |

11 images referenced under exactly 11 canonical paths (32 `<img>` uses — cards/figures reuse case images by design). `extract_media.py` reproduces this pipeline (QC extraction to `/tmp` + originals copy); full report in `MEDIA_EXTRACTION_REPORT.txt`.

## 4 · PARITY TABLE
All 10 projects · 24 routes · 8 capabilities · 2 testimonials · 5 contact channels · path timeline · 6 deck tracks · 11 media assets — **every manifest item is reachable and verified in the browser tour** (75/75 automated checks, desktop 1600×900 + mobile 390×844 + reduced-motion, zero console errors/warnings, zero failed requests). Machine-readable results: `BROWSER_VERIFY_REPORT.txt`.

## 5 · UNMIGRATED
**Empty.** Nothing in the workspace lacked a route, page, or data object. Completeness notes (all intentional, logged above):
- 20 of 26 music tracks are not in the 6-slot deck (reference deck design) — retained in `public/Music/`, swappable in `media/audio/` with matching `TRACKS` entries.
- Workspace screenshot sets (`sc-*.png/jpg`) remain per-project in `public/projects/` — the v3 case template carries one hero figure per case by design; extendable with the existing `.cp-media` pattern.
- `range.ts` graph nodes (Gen.Sadiq artwork, cover-art artifacts, merch film) are represented through their parent cases (blvckoreo / 1ethfp / graphic-design capability); they were raw materials inside those projects, not standalone pages.
- Contact form ships in the reference's demo state (system-state readout, no endpoint) — endpoint wiring left to the owner (see §6).

## 6 · REMAINING FOR THE OWNER
1. **Contact form endpoint** — wire `#briefForm` to a real handler (the demo state prints to the system-state readout, exactly as the reference ships it).
2. **Deck rotation** — swap/extend `media/audio/*` + `TRACKS` entries from `public/Music/` (titles/bpm/mood already measured in `src/data/tracks.ts`).
3. **OG plate** — `media/og-plate.png` is the 512px mark; a dedicated lockup plate at 1200×630 would sharpen social cards.
4. **Deploy** — upload the folder as-is (relative paths only): `index.html`, `404.html`, `leadway-pitch.html`, `ai-training-hub.html`, `media/`. Hash routing needs zero server config.

---

# v2 UPDATE — 15 Sep 2026 (new content + audio fix + deploy package)

## Re-inventory findings (what changed in the workspace)
- `public/projects/Bedroom Recordings II/` — NEW: cassette mixtape cover artwork (1400² PNG), tracklist, 4 album mp3s.
- `public/projects/leadway/` — reorganised: all hero/sc images moved into `Brand pitch design deck/` (byte-identical — `media/leadway-pensure.jpg` unaffected); NEW `Customer service week round up 2024/LEADWAY V1.mp4` (77 MB, 68 s).
- `public/projects/Gen.Sadiq - Maradonna/` — promo video updated (21 MB).
- `public/projects/Graphic Design/` — 5 cover artworks (Return of the Dead, Vpn Visa, Show Me, EPP ME!!!, Gen.Sadiq). Behance-published pieces are linked out (no invented media).
- No changes to `src/data/*.ts` datasets (thumb path fixed, see D14).

## What was built (v2)
| Item | Decision | Where |
|---|---|---|
| D10 — New case 11 `Bedroom Recordings II` | ARCH band, year 2025 (artwork file stamp 20250420), cassette + tracklist figures | `/work/bedroom-recordings-ii` |
| D11 — New case 12 `Singles & Cover Art` | ARCH band, 2023–25 (BLVCK OREO singles era → Gen.Sadiq), hero + 4-artwork strip + promo film + FULL ARCHIVE → Behance link | `/work/singles-cover-art` |
| D12 — Videos embedded | `.cp-media video` grammar added (contain, black plate, controls, metadata preload): Leadway CSW film FIG. 03B; Gen.Sadiq promo FIG. 10B. Compressed with ffmpeg H.264/AAC + faststart: 77 MB → **7.7 MB**, 21 MB → **1.4 MB** — no external hosting needed; Google Drive explicitly rejected (CORS/same-origin would mute the analyser-fed deck + 3D mark) | leadway + singles cases |
| D13 — AUDIO FIX (file://) | Root cause: opening `index.html` by double-click makes Chrome treat the page as an opaque origin; `createMediaElementSource` then taints and outputs **silence** (time advances, no sound). Fix: the analyser graph is only built over http(s); on `file://` the element plays natively and the silent-mode mark affordance engages. Verified in Chromium via file:// (audio plays, pulse on). Over http the full analyser path is unchanged (browser tour: deck plays, wheel-picker, auto-advance all PASS) | deck JS (`ensureCtx`) |
| D14 — Next.js data hygiene | `src/data/projects.ts` leadway thumb re-pointed to `/projects/leadway/Brand pitch design deck/hero.jpg` after the folder reorganise | local codebase |
| D15 — Deploy package | `deploy/site/` (exact upload set, 48 MB) + `deploy/nginx-habibcore-static.conf` + `deploy/DEPLOY-STATIC.md` (VPS swap / cPanel / Vercel) + `habibcore-static-deploy.zip` | repo root |

## v2 verification
- 26 routes (12 cases = 6 featured + 6 archive), all static + browser checks: **88/88 PASS, zero console errors/warnings, zero failed requests** (`BROWSER_VERIFY_REPORT.txt`).
- NEXT CASE chain now loops: …1ethfp → bedroom-recordings-ii → singles-cover-art → biscuit-ai…
- Work counter truthful: "SHOWING 2 OF 12 PROJECTS" on the AI filter; CREATIVE filter surfaces 6 archive cases.
- Both videos load metadata and are playable in Chromium (68.2 s CSW film verified).
- media tree now 11 case/portrait images + 7 artwork webps + 2 films + 6 audio masters + og plate.

## External hosting verdict (owner question)
Google Drive as a media host is rejected: no CORS headers → the Web Audio analyser mutes cross-origin media (the deck would go silent again), no CDN edge, hotlink throttling. If external hosting is ever needed: **Cloudflare R2 on `media.habibcore.com`** (free egress, CORS-controlled, CDN latency). After compression the VPS serves everything comfortably.
