# build_v3.py — transform the self-contained v3.3 reference into the production
# clean folder build: de-inline media, merge workspace facts, real audio, SEO head.
# The reference's HTML/CSS/JS behaviour is copied verbatim — this script only
# swaps data URIs for relative paths and updates content facts (workspace wins).
import pathlib, re, sys

SRC = "HABIBCORE_v3_architecture (2).html"
OUT = "index.html"
html = pathlib.Path(SRC).read_text(encoding="utf-8")
log = []

def sub_once(text, old, new, label, count=1):
    n = text.count(old)
    if n < count:
        sys.exit(f"FAIL: expected >= {count} occurrence(s) of {label}, found {n}")
    log.append(f"  {label}: replaced {count}/{n}")
    return text.replace(old, new, count)

# ------------------------------------------------ 1. de-inline images
# Unique data URIs in order of first appearance. #1 is the inline SVG favicon
# (stays inline). The rest are the 10 case renditions + the portrait, anchored
# by the href of the element each first appears in.
uris, seen = [], set()
for m in re.finditer(r"data:(image/webp|image/svg\+xml|audio/mpeg);base64,([A-Za-z0-9+/=]+)", html):
    if m.group(2) not in seen:
        seen.add(m.group(2))
        uris.append((m.group(1), m.group(2), m.start()))

imgs = [u for u in uris if u[0].startswith("image")]
assert len(imgs) == 12, f"expected 12 unique images (favicon + 10 cases + portrait), got {len(imgs)}"

favicon = imgs[0]
log.append(f"  favicon SVG kept inline ({len(favicon[1])} b64 chars)")

ANCHORS = [
    ("#/work/biscuit-ai",             "media/biscuit-ai.jpg"),
    ("#/work/leadway-pensure",        "media/leadway-pensure.jpg"),
    ("#/about",                       "media/portrait.jpg"),
    ("#/work/chef4me",                "media/chef4me.jpg"),
    ("#/work/olumayowa-nursing-home", "media/olumayowa-nursing-home.jpg"),
    ("#/work/ai-in-the-workplace",    "media/ai-in-the-workplace.jpg"),
    ("#/work/relay",                  "media/relay.svg"),
    ("#/work/skaame",                 "media/skaame.jpg"),
    ("#/work/layo-isaac",             "media/layo-isaac.jpg"),
    ("#/work/blvckoreo",              "media/blvckoreo.jpg"),
    ("#/work/1ethfp",                 "media/1ethfp.jpg"),
]

for mime, b64, _pos in imgs[1:]:
    token = f"data:{mime};base64,{b64}"
    pos = html.find(token)
    assert pos != -1, "image URI vanished"
    before = html[max(0, pos - 400):pos]
    hit = [(before.rfind(a), path) for a, path in ANCHORS if a in before]
    if not hit:
        sys.exit(f"FAIL: no anchor for image URI at {pos}; context: {before[-120:]!r}")
    hit.sort()
    path = hit[-1][1]
    n = html.count(token)
    html = html.replace(token, path)
    log.append(f"  {path}: {n} reference(s) de-inlined ({len(b64)} b64 chars)")

assert "data:image/webp" not in html and "data:image/svg+xml;base64" in html, "stray image data URIs remain"
assert html.count('data:image/svg+xml;base64') == 1, "favicon must remain the only inline image"


# ------------------------------------------------ 2. real audio masters
old_tracks = re.search(r"var TRACKS = \[.*?\];", html, re.S)
assert old_tracks, "TRACKS block not found"
new_tracks = """var TRACKS = [
    /* Real masters — BLVCK OREO, 2021–2023 (public/Music in the repo).
       Titles/bpm/mood measured in the legacy player's data (src/data/tracks.ts). */
    { src: "media/audio/whats-up.mp3",    no: "T-01", title: "What's Up!!!", mood: "Drill",  bpm: 140 },
    { src: "media/audio/ends.mp3",        no: "T-02", title: "Ends",        mood: "Groove", bpm: 92 },
    { src: "media/audio/lagos-party.mp3", no: "T-03", title: "Lagos Party", mood: "Party",  bpm: 126 },
    { src: "media/audio/vice-city.mp3",   no: "T-04", title: "Vice City",   mood: "Night",  bpm: 86 },
    { src: "media/audio/afro-woo.mp3",    no: "T-05", title: "Afro Woo",    mood: "Drill",  bpm: 144 },
    { src: "media/audio/234drill.mp3",    no: "T-06", title: "234drill",    mood: "Drill",  bpm: 144 }
  ];"""
html = html.replace(old_tracks.group(0), new_tracks)
log.append("  TRACKS: 6 test signals -> 6 real masters (whats-up, ends, lagos-party, vice-city, afro-woo, 234drill)")

# ------------------------------------------------ 3. test-signal copy -> real masters
pairs = [
    ('a.textContent = "BLVCK OREO \\u00B7 " + TRACKS[i].no + " \\u00B7 TEST SIGNAL";',
     'a.textContent = "BLVCK OREO \\u00B7 " + TRACKS[i].no;'),
    ('<div class="a" id="dockArtist">BLVCK OREO &middot; TEST SIGNAL</div>',
     '<div class="a" id="dockArtist">BLVCK OREO &middot; SOUND SYSTEM</div>'),
    ('aria-label="Playlist — test signals"', 'aria-label="Playlist — Blvck Oreo"'),
    ('<span class="k">UP NEXT &mdash; TEST SIGNALS</span>',
     '<span class="k">UP NEXT &mdash; BLVCK OREO</span>'),
    ('This site contains sound &mdash; test signals are wired into the deck.',
     'This site contains sound &mdash; the Blvck Oreo set is wired into the deck.'),
    ('Audio below is <strong>generated test signals</strong> standing in for the real masters &mdash; swap the files and the system is live.',
     'The deck plays the <strong>real masters</strong> &mdash; production, writing and release work, 2021&ndash;2023.'),
    ('AUDIO: GENERATED TEST SIGNALS &mdash; NOT MASTERS &middot; SWAP FILES IN <b>MEDIA/AUDIO/</b>',
     'AUDIO: REAL MASTERS &mdash; BLVCK OREO &middot; FILES IN <b>MEDIA/AUDIO/</b>'),
    ('DATA — 09 SOUND test signals', 'DATA — 09 SOUND — real masters'),
    ('approach/result blocks are v0.1 drafts for review. TEST AUDIO = generated signals.',
     'approach/result blocks are v0.1 drafts for review. AUDIO = real Blvck Oreo masters.'),
]
for old, new in pairs:
    html = sub_once(html, old, new, old[:48] + "…")


# ------------------------------------------------ 4. workspace facts: years
CASE_YEARS = {
    "biscuit-ai": "2026", "chef4me": "2026", "leadway-pensure": "2024–26",
    "olumayowa-nursing-home": "2026", "ai-in-the-workplace": "2026",
    "relay": "2026", "skaame": "2024", "layo-isaac": "2024",
    "blvckoreo": "2023", "1ethfp": "2024",
}
# 4a. CASES array year fields (segment-scoped by slug)
slugs = list(CASE_YEARS.keys())
for i, slug in enumerate(slugs):
    start = html.find(f'slug: "{slug}"')
    assert start != -1, f"CASES slug {slug} not found"
    ends = [e for e in (html.find('slug: "', start + 1),
                        html.find('__SENTINEL__', start + 1),
                        html.find('var ARCH_LIST', start + 1),
                        html.find('}];', start + 1)) if e != -1]
    end = min(ends)
    seg = html[start:end]
    m = re.search(r'year: "([^"]+)"', seg)
    assert m, f"no year field in CASES segment {slug}"
    seg2 = seg.replace(m.group(0), f'year: "{CASE_YEARS[slug]}"', 1)
    html = html[:start] + seg2 + html[end:]
    log.append(f"  CASES {slug}: year {m.group(1)} -> {CASE_YEARS[slug]}")

# 4b. static case-page YEAR meta cells (block-scoped by data-route)
for slug, yr in CASE_YEARS.items():
    start = html.find(f'data-route="/work/{slug}"')
    assert start != -1, f"case page {slug} not found"
    end = html.find('data-route="', start + 1)
    seg = html[start:end]
    m = re.search(r'YEAR</div><div class="v">([^<]+)</div>', seg)
    assert m, f"no YEAR cell on case page {slug}"
    seg2 = seg.replace(m.group(0), f'YEAR</div><div class="v">{yr}</div>', 1)
    html = html[:start] + seg2 + html[end:]
    log.append(f"  case page {slug}: YEAR cell -> {yr}")

# 4c. flyout evidence-card labels + work-grid card chips
CHIP_OLD = ["2025", "2023–24", "2024"]
for name, yr in [("Biscuit AI", "2026"), ("Chef4Me", "2026"),
                 ("Olumayowa Nursing Home", "2026"), ("AI in the Workplace", "2026"),
                 ("Relay", "2026"), ("1ETHFP", "2024")]:
    n_done = 0
    for y in CHIP_OLD:
        o = f'<span class="wn">{name}</span><span class="wm"><span>{y}</span>'
        c = html.count(o)
        if c:
            html = html.replace(o, f'<span class="wn">{name}</span><span class="wm"><span>{yr}</span>')
            n_done += c
    assert n_done, f"no chip year found for {name}"
    log.append(f"  card chip {name} -> {yr} ({n_done} card(s))")
html = sub_once(html, 'BISCUIT AI &mdash; 2025', 'BISCUIT AI &mdash; 2026', 'flyout biscuit label')
# 4d. capability-page rel-work year spans (case rows: name span then year span)
html = sub_once(html, '>2023–24 &rarr;</span>', '>2024 &rarr;</span>', 'cap 1ethfp year spans',
                count=html.count('>2023–24 &rarr;</span>'))
# 4e. capability-page rel-work year spans for the 2026 cases
cap_pat = re.compile(r'(href="#/work/(?:biscuit-ai|chef4me|olumayowa-nursing-home|ai-in-the-workplace)"><span>[^<]*</span><span>)2025( &rarr;)')
html, n_caps = cap_pat.subn(r'\g<1>2026\g<2>', html)
assert n_caps, "no capability rel-work 2025 spans found"
log.append(f"  cap rel-work year spans -> 2026 ({n_caps} row(s))")

leftover = [m.start() for m in re.finditer(r'2025', html)]
assert not leftover, f"unexpected '2025' remnants at {leftover[:5]}"

# ------------------------------------------------ 5. case LINK cells (real links from workspace data)
LINKS = {
    "biscuit-ai": ("GITHUB", "https://github.com/Thelostbiscuitt/BiscuitBot"),
    "olumayowa-nursing-home": ("LIVE SITE", "https://olumayowanursinghome.com"),
    "leadway-pensure": ("PITCH", "leadway-pitch.html"),
    "ai-in-the-workplace": ("HUB", "ai-training-hub.html"),
}
ROLE_CELL = '<div><div class="k">ROLE</div><div class="v">DESIGN &rarr; BUILD &rarr; SHIP</div></div>'
for slug, (label, href) in LINKS.items():
    start = html.find(f'data-route="/work/{slug}"')
    assert start != -1, f"case page {slug} not found"
    end = html.find('data-route="', start + 1)
    seg = html[start:end]
    assert seg.count(ROLE_CELL) == 1, f"ROLE cell not unique on {slug}"
    rel = ' rel="noopener"' if href.startswith("http") else ""
    cell = (ROLE_CELL + f'<div><div class="k">LINK</div><div class="v">'
            f'<a class="tlink" href="{href}"{rel}>{label} &nearr;</a></div></div>')
    html = html[:start] + seg.replace(ROLE_CELL, cell, 1) + html[end:]
    log.append(f"  case page {slug}: LINK cell -> {label} ({href})")

# ------------------------------------------------ 6. SEO head + OG/Twitter
HEAD_ADD = """<link rel="canonical" href="https://habibcore.com/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="HABIBCORE®">
<meta property="og:title" content="HABIBCORE® — Habib, Designer &amp; Builder, Lagos">
<meta property="og:description" content="Brands, digital products and AI tools — drawn, coded and shipped by the same pair of hands in Lagos.">
<meta property="og:url" content="https://habibcore.com/">
<meta property="og:image" content="https://habibcore.com/media/og-plate.png">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="HABIBCORE® — Habib, Designer &amp; Builder, Lagos">
<meta name="twitter:description" content="Brands, digital products and AI tools — drawn, coded and shipped by the same pair of hands in Lagos.">
<meta name="twitter:image" content="https://habibcore.com/media/og-plate.png">"""
html = sub_once(html, '<meta name="theme-color" content="#0A0A0A">',
                '<meta name="theme-color" content="#0A0A0A">\n' + HEAD_ADD,
                'head OG/Twitter/canonical')

# per-route og/twitter swap in the router
OLD_META = """      var md = document.querySelector('meta[name="description"]');
      if (md && m.d) { md.setAttribute("content", m.d); }"""
NEW_META = """      var md = document.querySelector('meta[name="description"]');
      if (md && m.d) { md.setAttribute("content", m.d); }
      [["og:title", "t"], ["og:description", "d"], ["twitter:title", "t"], ["twitter:description", "d"]].forEach(function (p) {
        var el = document.querySelector('meta[property="' + p[0] + '"], meta[name="' + p[0] + '"]');
        if (el && m[p[1]]) { el.setAttribute("content", m[p[1]]); }
      });"""
html = sub_once(html, OLD_META, NEW_META, 'router per-route OG swap')

# ------------------------------------------------ 7. build chip
html = sub_once(html, '<span class="menu-build">BUILD v3.3</span>',
                '<span class="menu-build">BUILD v3.3 — PORTED</span>', 'BUILD chip relabel')

pathlib.Path(OUT).write_text(html, encoding="utf-8")
print(f"wrote {OUT} ({len(html):,} chars)")
print("\n".join(log))

