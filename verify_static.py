# verify_static.py — structural integrity checks for the ported v3 build.
import pathlib, re, sys

html = pathlib.Path("index.html").read_text(encoding="utf-8")
errors, notes = [], []

# 1. no stray data URIs (favicon only)
stray = re.findall(r'data:(?!image/svg\+xml)(?:image|audio|font)/[a-z+]+;base64', html)
if stray:
    errors.append(f"stray inline data URIs: {stray[:3]}")
if html.count("data:image/svg+xml;base64") != 1:
    errors.append("favicon is not the single inline image")

# 2. every referenced media file exists
for m in sorted(set(re.findall(r'(?:src|href)="(media/[^"]+)"', html))):
    if not pathlib.Path(m).exists():
        errors.append(f"missing media file: {m}")
media_refs = sorted(set(re.findall(r'(?:src|href)="(media/[^"]+)"', html)))
img_refs = re.findall(r'src="(media/[^"]+)"', html)
notes.append(f"media references: {len(media_refs)} unique — {len(img_refs)} total <img> uses")

# 3. images referenced once under one canonical path each
img_refs = re.findall(r'src="(media/[^"]+)"', html)
dupes = {p for p in img_refs if img_refs.count(p) > 1}
if dupes:
    notes.append(f"multi-use media paths (expected: cards reuse case imgs): {sorted(dupes)}")

# 4. route integrity: data-route pages vs all internal hash links vs ROUTE_META
routes = set(re.findall(r'data-route="([^"]+)"', html))
links = set(re.findall(r'href="#([^"]*)"', html))
norm = {("#/" + l.strip("/")) if l and not l.startswith("/") else ("/" if not l else l)
        for l in links if (l == "" or l.startswith("/")) and "' +" not in l and "+ '" not in l}
bad_links = sorted(l for l in norm if l != "/" and l not in routes)
if bad_links:
    errors.append(f"hash links to unknown routes: {bad_links}")

meta_keys = set(re.findall(r'"(/[^"]*)":\s*\{"t":', html))
orphans = sorted(meta_keys - routes)
if orphans:
    errors.append(f"ROUTE_META entries with no page: {orphans}")

# 5. case anatomy: featured cases carry the five-act structure; the ARCHIVE
#    (CREATIVE band) cases carry the reference's lighter anatomy
ARCH = {"/work/skaame", "/work/layo-isaac", "/work/blvckoreo", "/work/1ethfp",
        "/work/bedroom-recordings-ii", "/work/singles-cover-art",
        "/work/visitor-from-mars", "/work/gen-sadiq", "/work/tbogd"}
case_routes = sorted(r for r in routes if r.startswith("/work/"))
for r in case_routes:
    start = html.find(f'data-route="{r}"')
    end = html.find('data-route="', start + 1)
    seg = html[start:end]
    secs = (("CONTEXT", "WHAT I DID", "NEXT CASE") if r in ARCH else
            ("OVERVIEW", "THE CHALLENGE", "APPROACH", "DELIVERABLES", "RESULT",
             "QUESTIONS WORTH ANSWERING", "NEXT CASE"))
    for sec in secs:
        if sec not in seg:
            errors.append(f"case {r}: missing section {sec}")
    if 'cp-media' not in seg or 'src="media/' not in seg:
        errors.append(f"case {r}: missing media figure")
notes.append(f"case routes with full anatomy: {len(case_routes)} ({len(case_routes)-len(ARCH)} featured + {len(ARCH)} archive)")

# 6. filters counter truthfulness: cats on cards vs CASES cats
cards = re.findall(r'data-cats="([^"]+)"', html)
notes.append(f"work cards with data-cats: {len(cards)}")

# 7. capabilities: RELEVANT WORK links resolve
for m in re.findall(r'href="#(/capabilities/[^"]+)"', html):
    if m not in routes:
        errors.append(f"capability link to unknown route: {m}")

# 8. SEO head
for needle in ('rel="canonical" href="https://habibcore.com/"', 'property="og:image" content="https://habibcore.com/media/og-plate.png"',
               'name="twitter:card" content="summary"', 'name="theme-color" content="#0A0A0A"', 'lang="en"'):
    if needle not in html:
        errors.append(f"head missing: {needle}")

# 9. build chip
if "BUILD v4.0 — COPY SYSTEM 2026" not in html:
    errors.append("BUILD v4.0 — COPY SYSTEM 2026 chip missing")

# 9b-v3.8. capability pages in the industries posture
for marker, expected, label in [('class="cap-hero"', 9, "statement heroes (8 caps + approach)"),
                                ('class="cap-cards"', 10, "build-card grids (8 caps + approach steps/principles)"),
                                ('class="cap-close"', 9, "closing statements (8 caps + approach)"),
                                ('class="cap-state-h"', 29, "two-tone statements (24 caps + 5 approach)")]:
    n = html.count(marker)
    if n != expected:
        errors.append(f"{label}: found {n}x, expected {expected}")

# 9b-v3.9. approach page: every step/plate/principle wired to shipped proof
for marker, expected, label in [('class="ev-row"', 5, "approach plate evidence rows"),
                                ('class="ev"', 9, "approach evidence links (5 steps + 4 principles)"),
                                ('The handoff is the bug', 0, "approach argument (retired headline)"),
                                ('I do not have</em> a 23-step process', 1, "approach hero (v4.0 copy)")]:
    n = html.count(marker)
    if n != expected:
        errors.append(f"{label}: found {n}x, expected {expected}")

# 9b. v3.5 work wheel + depth
if ".idx-row:hover" in html:
    errors.append("wheel hover rule survived (mouse must highlight nothing)")
if 'id="pickLogo"' not in html or html.count("pickLogo") < 3:
    errors.append("logo picker (pickLogo) missing")
if 'id="workCount"' in html or 'data-cat="ALL"' in html or "SHOWING 10 OF 10" in html:
    errors.append("work intro/counter/filters still present")
if "position: fixed; left: 50%; bottom: 18px;" not in html:
    errors.append("view pill float css missing")
for marker, expected, label in [("THE NUMBERS", 8, "capability stats"), ("WHAT I ACTUALLY DO", 8, "capability service areas"),
                                ("QUESTIONS WORTH ANSWERING", 15, "faq blocks (9 cap/approach + 6 cases)"),
                                ("OPERATING PRINCIPLES", 1, "approach principles"), ("THE MANIFESTO", 1, "about manifesto"),
                                ("HOW I EMBED", 1, "about embed"), ("WORD OF MOUTH", 1, "about word of mouth")]:
    n = html.count(marker)
    if n != expected:
        errors.append(f"{label}: found {n}x, expected {expected}")

# 9c. v3.6 — real mark picker, infinite wheel, JAWS-grade case pages + section pill
if 'id="pickLogo"' in html and 'src="logo-mark.png"' not in html:
    errors.append("pick lockup does not use the real logo mark")
if "rowHtml + rowHtml + rowHtml" not in html:
    errors.append("infinite wheel (3-copy list) missing")
if "shift = -span" not in html or "shift = span" not in html:
    errors.append("wheel copy-boundary normalizer missing")
if 'id="casePill"' not in html:
    errors.append("case section pill host missing")
for marker, expected, label in [('class="case-hero"', 15, "full-viewport case heroes"),
                                ('data-cs="challenge"', 6, "challenge data-cs hooks"),
                                ('data-cs="approach"', 6, "approach data-cs hooks"),
                                ('data-cs="result"', 6, "result data-cs hooks"),
                                ('data-cs="faq"', 6, "faq data-cs hooks"),
                                ('data-cs="overview"', 15, "overview data-cs hooks"),
                                ('data-cs="deliverables"', 15, "deliverables data-cs hooks")]:
    n = html.count(marker)
    if n != expected:
        errors.append(f"{label}: found {n}x, expected {expected}")
if not pathlib.Path("logo-mark.png").exists():
    errors.append("logo-mark.png missing from site root (picker asset)")

# 10. audio deck: 6 BLVCK OREO masters (mood+bpm) + 4 Bedroom Recordings II cuts (artist)
tracks = re.findall(r'\{\s*src:\s*"(media/audio/[^"]+)",\s*no:\s*"(T-\d+)",\s*title:\s*"([^"]+)",\s*mood:\s*"([^"]+)"(?:,\s*artist:\s*"([^"]+)")?(?:,\s*bpm:\s*(\d+))?', html)
if len(tracks) != 10:
    errors.append(f"expected 10 TRACKS (6 BO + 4 BR2), found {len(tracks)}")
for src, no, title, mood, artist, bpm in tracks:
    if not pathlib.Path(src).exists():
        errors.append(f"missing deck audio: {src}")
br2 = [t for t in tracks if t[4]]
if len(br2) != 4 or any("YE!!OWSOUL" not in t[4] for t in br2):
    errors.append("BR2 deck tracks missing YE!!OWSOUL artist credit")
notes.append("deck tracks: " + ", ".join(f"{no} {title} ({mood}{', ' + bpm + 'BPM' if bpm else ''})" for _, no, title, mood, _, bpm in tracks))

print("ROUTES (%d): %s" % (len(routes), sorted(routes)))
print("\n".join(notes))
if errors:
    print("\nFAILURES:")
    print("\n".join(" - " + e for e in errors))
    sys.exit(1)
print("\nSTATIC CHECKS: ALL PASS")
