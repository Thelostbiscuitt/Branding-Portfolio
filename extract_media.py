# extract_media.py — media pipeline for the HABIBCORE v3 port.
#
# 1. QC: extracts every inline base64 rendition from the self-contained
#    v3 reference into a temp dir and reports counts/sizes (12 images =
#    favicon + 10 case renditions + 1 portrait; 6 test-signal audio).
# 2. Production media comes from the owner's ORIGINALS in the repo
#    (public/projects/*, public/photo.jpg, public/Music/*.mp3) — same
#    crops/aspect as the renditions, original filenames preserved —
#    copied into /media with slug-based names. Renditions are only a
#    fallback for gaps (none occurred: see MIGRATION_NOTES.md).
import base64, pathlib, re, shutil, sys

SRC = "HABIBCORE_v3_architecture (2).html"
TMP = pathlib.Path("/tmp/habibcore-extract")

html = pathlib.Path(SRC).read_text(encoding="utf-8")
uris = re.findall(r"data:(image/webp|image/svg\+xml|audio/mpeg);base64,([A-Za-z0-9+/=]+)", html)
seen, ordered = set(), []
for mime, b64 in uris:
    if b64 not in seen:
        seen.add(b64)
        ordered.append((mime, b64))

EXT = {"image/webp": "webp", "image/svg+xml": "svg", "audio/mpeg": "mp3"}
imgs = [u for u in ordered if u[0].startswith("image")]
auds = [u for u in ordered if u[0].startswith("audio")]
print(f"reference holds {len(imgs)} unique images (1st = inline favicon) "
      f"and {len(auds)} unique audio test signals")

if TMP.exists():
    shutil.rmtree(TMP)
TMP.mkdir(parents=True)
report = []

# image order of first appearance in the reference: favicon, CASES 01-06
# (via flyout/grid), portrait flyout card, archive 07-10 — slugs for QC only
IMG_QC = ["favicon", "biscuit-ai", "leadway-pensure", "portrait", "chef4me",
          "olumayowa-nursing-home", "ai-in-the-workplace", "relay", "skaame",
          "layo-isaac", "blvckoreo", "1ethfp"]
AUD_QC = ["T-01_whats_up", "T-02_system_state", "T-03_plate_reveal",
          "T-04_counter_fold", "T-05_signal", "T-06_t_lock"]

for (mime, b64), slug in zip(imgs, IMG_QC):
    p = TMP / f"QC-{slug}.{EXT[mime]}"
    p.write_bytes(base64.b64decode(b64))
    report.append(f"{p}  {p.stat().st_size:,} bytes (extraction QC only)")
for (mime, b64), slug in zip(auds, AUD_QC):
    p = TMP / f"QC-{slug}.{EXT[mime]}"
    p.write_bytes(base64.b64decode(b64))
    report.append(f"{p}  {p.stat().st_size:,} bytes (test signal — not shipped)")

# ---- production media: owner's originals -> /media (slug-named) ----
ORIG = [
    ("public/projects/biscuit-ai/hero.jpg",              "media/biscuit-ai.jpg"),
    ("public/projects/chef4me/hero.jpg",                 "media/chef4me.jpg"),
    ("public/projects/leadway/hero.jpg",                 "media/leadway-pensure.jpg"),
    ("public/projects/olumayowa-nursing-home/hero.jpg",  "media/olumayowa-nursing-home.jpg"),
    ("public/projects/ai-workplace-training/hero.jpg",   "media/ai-in-the-workplace.jpg"),
    ("public/projects/relay/cover.svg",                  "media/relay.svg"),
    ("public/projects/skaame/hero.jpg",                  "media/skaame.jpg"),
    ("public/projects/layo-isaac/hero.jpg",              "media/layo-isaac.jpg"),
    ("public/projects/blvckoreo/hero.jpg",               "media/blvckoreo.jpg"),
    ("public/projects/1ethfp/roadmap.jpg",               "media/1ethfp.jpg"),
    ("public/photo.jpg",                                 "media/portrait.jpg"),
    ("Branding/habibcore-production/01_logo/favicon/habibcore-mark-512.png", "media/og-plate.png"),
    ("public/Music/whats-up.mp3",    "media/audio/whats-up.mp3"),
    ("public/Music/ends.mp3",        "media/audio/ends.mp3"),
    ("public/Music/lagos-party.mp3", "media/audio/lagos-party.mp3"),
    ("public/Music/vice-city.mp3",   "media/audio/vice-city.mp3"),
    ("public/Music/afro-woo.mp3",    "media/audio/afro-woo.mp3"),
    ("public/Music/234drill.mp3",    "media/audio/234drill.mp3"),
]
for src, dst in ORIG:
    s, d = pathlib.Path(src), pathlib.Path(dst)
    d.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(s, d)
    report.append(f"{d}  {d.stat().st_size:,} bytes  <- {src} (owner's original)")

pathlib.Path("MEDIA_EXTRACTION_REPORT.txt").write_text("\n".join(report) + "\n", encoding="utf-8")
print("\n".join(report))
print(f"\nQC renditions in {TMP}; production report in MEDIA_EXTRACTION_REPORT.txt")
