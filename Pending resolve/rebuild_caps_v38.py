# rebuild_caps_v38.py - v3.8: capability pages in the Brand Appart "industries" posture
# (statement hero -> numbers band -> argument -> build cards -> shipped proof -> close)
# Content is extracted from the existing pages; only the skeleton is rewritten.
import pathlib, re, sys

P = pathlib.Path("index.html")
html = P.read_text(encoding="utf-8")
orig = html
fails = []

SLUGS = ["brand-identity", "product-design", "software", "ai-systems",
         "automation", "creative-direction", "graphic-design", "training"]

PAGES = {
 "brand-identity": {
  "hero": ("An identity is a", "system, not a logo."),
  "sub": "Brand identity, editorial and graphic composition is the craft under every project &mdash; the part of the practice with the longest history. Identities are built to be used: drawn, specified and shipped with the product they belong to.",
  "state": ("A mark without specifications", "is a drawing."),
  "build": ("What I build", "when the brand has to work."),
  "close": "Bring the identity problem. Leave with the system.",
 },
 "product-design": {
  "hero": ("Designed to be", "shipped, not framed."),
  "sub": "Product design fails in the gap between the drawing and the build. Here there is no gap: the person who designs the interface writes the code that renders it, so every decision survives contact with production.",
  "state": ("Mockups that can&rsquo;t be built", "don&rsquo;t leave the sketchbook."),
  "build": ("What I build", "when the interface has to ship."),
  "close": "Bring the interface problem. Leave with a live URL.",
 },
 "software": {
  "hero": ("Designed, built and shipped", "by one pair of hands."),
  "sub": "Production software by the same pair of hands that designed it &mdash; from schema to interface to deploy. No handoffs where intent dies, and no version of the product that exists only in a mockup.",
  "state": ("The build", "is where design gets tested."),
  "build": ("What I build", "when it has to run."),
  "close": "Bring the spec &mdash; or just the problem.",
 },
 "ai-systems": {
  "hero": ("AI that earns", "its place in the workflow."),
  "sub": "Assistants with memory you can inspect and costs you can see &mdash; wired to real providers, in production, not in a pitch. Plus the literacy that makes them stick after the build is gone.",
  "state": ("Trust in an assistant", "you can&rsquo;t inspect is misplaced."),
  "build": ("What I build", "when AI has to earn trust."),
  "close": "Bring the workflow. The assistant earns the rest.",
 },
 "automation": {
  "hero": ("Built inside operations,", "not above them."),
  "sub": "Automation built from inside real operations &mdash; workflows, pipelines and SLAs that keep the work moving. Proven on 250+ live clients, run for four years, not just visited.",
  "state": ("Operations keep", "what they understand."),
  "build": ("What I build", "when ops can&rsquo;t stall."),
  "close": "Bring the pipeline that hurts most.",
 },
 "creative-direction": {
  "hero": ("Image is a brand asset,", "not decoration."),
  "sub": "Before the software there was music and image &mdash; the foundation everything else stands on. Creative direction trained where the image has to carry the sound.",
  "state": ("Direction decides", "what the work says before what it looks like."),
  "build": ("What I build", "when image carries sound."),
  "close": "Bring the sound. The image follows.",
 },
 "graphic-design": {
  "hero": ("Composition is", "the oldest craft in the room."),
  "sub": "The craft under every project &mdash; cover artwork, editorial layout, press photography and illustration as primary material. Every other capability on this site stands on this one.",
  "state": ("Clarity", "that carries feeling without losing it."),
  "build": ("What I build", "when print meets pixels."),
  "close": "Bring the message. The grid keeps it honest.",
 },
 "training": {
  "hero": ("Training that survives", "the trainer leaving."),
  "sub": "AI literacy that outlives the room &mdash; eleven modules, ninety minutes, one live link. Curricula with their own logic, hubs that carry the material after the session ends.",
  "state": ("Material built like a product:", "each module earns the next."),
  "build": ("What I build", "when teams have to remember."),
  "close": "Bring the team. The hub does the remembering.",
 },
}

SKIP = {"IN PRACTICE", "WHAT THAT INCLUDES", "START"}

def build_page(slug, d):
    start = html.find(f'data-route="/capabilities/{slug}"')
    if start < 0:
        fails.append(f"{slug}: route not found"); return None
    seg_end = html.find('data-route="', start + 10)
    if seg_end < 0:
        fails.append(f"{slug}: segment end not found"); return None
    seg = html[start:seg_end]
    cut = seg.rfind("</div></div>")
    if cut < 0:
        fails.append(f"{slug}: unexpected segment tail"); return None
    pad = seg[cut + len("</div></div>"):]   # e.g. '<div class="page " ' of the NEXT page
    seg = seg[:cut + len("</div></div>")]

    head, rest = seg.split('<div class="page-cap">', 1)
    if not rest.rstrip().endswith("</div></div>"):
        fails.append(f"{slug}: unexpected segment tail"); return None

    kick = re.findall(r'<span class="kicker">([^<]*)</span>', seg)
    if len(kick) != 2:
        fails.append(f"{slug}: kickers found {len(kick)}"); return None

    # split the body into labelled cap-detail blocks
    body = rest[rest.find('<div class="cap-detail"'):]
    body = body[:body.rfind("</div></div>")].rstrip()
    body = body[:body.rfind("</div>")].rstrip()  # drop the wrap close
    parts = body.split('<div class="cap-detail"')

    got = {}
    keep = []
    for part in parts[1:]:
        m = re.match(r'[^>]*>\s*<div class="side"><span class="k">([^<]+)</span>', part)
        if not m:
            fails.append(f"{slug}: unlabelled block"); return None
        lab = m.group(1)
        if lab in SKIP:
            continue
        if lab == "THE NUMBERS":
            s = re.search(r'<div class="cap-stats">((?:<div><b>.*?</span></div>)+)</div>', part, re.DOTALL)
            if not s: fails.append(f"{slug}: stats"); return None
            got["stats"] = s.group(1)
        elif lab == "WHY IT MATTERS":
            h = re.search(r"<h3>(.*?)</h3>", part, re.DOTALL)
            ps = re.findall(r'<p class="b">(.*?)</p>', part, re.DOTALL)
            if not h or len(ps) < 2: fails.append(f"{slug}: why"); return None
            got["why_h"], got["why_p1"], got["why_p2"] = h.group(1), ps[0], ps[1]
        elif lab == "WHAT I BUILD":
            a = part.find('<div class="main">')
            b = part.rfind("</div></div>")
            if a < 0 or b < 0: fails.append(f"{slug}: svc"); return None
            got["svc"] = part[a + len('<div class="main">'):b]
        elif lab == "RELEVANT WORK":
            a = part.find('<div class="main rel-work">')
            b = part.rfind("</div></div>")
            if a < 0 or b < 0: fails.append(f"{slug}: rel"); return None
            got["rel"] = part[a + len('<div class="main rel-work">'):b]
        elif lab == "QUESTIONS I ACTUALLY GET":
            a = part.find('<div class="cp-faq">')
            b = part.rfind("</div></div>")
            if a < 0 or b < 0: fails.append(f"{slug}: faq"); return None
            got["faq"] = part[a + len('<div class="cp-faq">'):b]
        else:  # PROOF, RELATED & anything else - preserved verbatim
            keep.append('<div class="cap-detail"' + part.rstrip() + "\n        ")

    for key in ("stats", "why_p1", "why_p2", "svc", "rel", "faq"):
        if key not in got:
            fails.append(f"{slug}: missing {key}"); return None
    if got["svc"].count('class="cap-svc"') != 4:
        fails.append(f"{slug}: expected 4 services"); return None
    if got["stats"].count("<div>") != 4:
        fails.append(f"{slug}: expected 4 stats"); return None

    num, meta = kick[0], kick[1]
    hl, hr = d["hero"]
    sl, sr = d["state"]
    bl, br = d["build"]

    inner = f'''<div class="wrap">
        <div class="cap-hero">
          <p class="crumbs-top"><a class="tlink" href="#/capabilities">&larr; All capabilities</a></p>
          <div class="idx"><span class="kicker">{num} &mdash; {meta}</span></div>
          <h1 class="cap-hero-h"><em>{hl}</em> {hr}</h1>
          <p class="cap-sub">{d["sub"]}</p>
          <a class="cap-cta" href="#/contact">BOOK A DISCOVERY CALL <span class="arr">&rarr;</span></a>
        </div>

        <section class="cap-sec" aria-label="The numbers">
          <span class="kicker">THE NUMBERS</span>
          <div class="cap-stats">{got["stats"]}</div>
        </section>

        <section class="cap-sec" aria-label="Why it matters">
          <span class="kicker">WHY IT MATTERS</span>
          <h2 class="cap-state-h"><em>{sl}</em> {sr}</h2>
          <div class="cap-cols">
            <p class="b">{got["why_p1"]}</p>
            <p class="b">{got["why_p2"]}</p>
          </div>
          <div class="cap-ctarow">
            <a class="cap-btn" href="#/contact">BOOK A DISCOVERY CALL</a>
            <a class="cap-cta" href="#/work">VIEW THE WORK <span class="arr">&rarr;</span></a>
          </div>
        </section>

        <section class="cap-sec" aria-label="What I build">
          <div class="cap-center">
            <span class="kicker">WHAT I BUILD</span>
            <h2 class="cap-state-h"><em>{bl}</em> {br}</h2>
          </div>
          <div class="cap-cards">{got["svc"]}</div>
        </section>

        <section class="cap-sec" aria-label="Relevant work">
          <div class="cap-center">
            <span class="kicker">RELEVANT WORK</span>
            <h2 class="cap-state-h"><em>Shipped</em> proof.</h2>
          </div>
          <div class="rel-work">{got["rel"]}</div>
        </section>

        ''' + "\n        ".join(keep) + f'''
        <section class="cap-sec" aria-label="Questions">
          <span class="kicker">QUESTIONS I ACTUALLY GET</span>
          <div class="cp-faq">{got["faq"]}</div>
        </section>

        <section class="cap-close" aria-label="Start">
          <p class="cap-close-h">{d["close"]}</p>
          <a class="cap-btn" href="#/contact">START A PROJECT &rarr;</a>
        </section>
      </div>'''

    return (head + '<div class="page-cap">' + inner + "</div></div>", pad)

new_pages = {}
for slug in SLUGS:
    out = build_page(slug, PAGES[slug])
    if out:
        new_pages[slug] = out

# ---------- CSS ----------
css_marker = "/* ---------- consent gate: float above the bottom chrome (dock chip, pill) ---------- */"
if html.count(css_marker) != 1:
    fails.append(f"css marker found {html.count(css_marker)}x")
css = '''/* ---------- v3.8: capability pages - industries posture ---------- */
.cap-hero { display: flex; flex-direction: column; justify-content: center; min-height: min(76svh, 760px); padding: clamp(56px,8vh,96px) 0 clamp(40px,6vh,72px); }
.cap-hero .idx { margin-bottom: 0; }
.cap-hero-h { font: 800 clamp(42px,6.6vw,100px)/1.02 var(--hc-font-sans); font-stretch: 110%; letter-spacing: -.02em; margin: var(--hc-space-24) 0 var(--hc-space-32); max-width: 16ch; }
.cap-hero-h em, .cap-state-h em, .cap-close-h em { font-style: normal; color: rgb(var(--hc-ink-rgb) / .35); }
.cap-sub { max-width: 56ch; font: 400 clamp(16px,1.25vw,19px)/1.6 var(--hc-font-sans); color: rgb(var(--hc-ink-rgb) / .78); margin: 0 0 var(--hc-space-32); }
.cap-cta { display: inline-flex; align-items: center; gap: 12px; font: 600 12px var(--hc-font-mono); letter-spacing: .16em; color: var(--hc-ink); text-decoration: none; align-self: flex-start; }
.cap-cta .arr { display: inline-grid; place-items: center; width: 34px; height: 34px; border: 1.5px solid var(--hc-ink); border-radius: 50%; transition: background var(--hc-dur-micro) var(--hc-ease-out), color var(--hc-dur-micro) var(--hc-ease-out); }
.cap-cta:hover .arr, .cap-cta:focus-visible .arr { background: var(--hc-ink); color: var(--hc-paper); }
.cap-sec { padding-block: clamp(56px,9vh,112px); border-top: 1px solid rgb(var(--hc-ink-rgb) / .1); }
.cap-sec > .kicker, .cap-center .kicker { display: block; margin-bottom: var(--hc-space-32); }
.cap-state-h { font: 800 clamp(32px,4.8vw,72px)/1.06 var(--hc-font-sans); font-stretch: 110%; letter-spacing: -.02em; margin: 0 0 var(--hc-space-40); max-width: 24ch; }
.cap-center { text-align: center; margin-bottom: var(--hc-space-48); }
.cap-center .cap-state-h { margin-inline: auto; }
.cap-cols { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hc-space-48); max-width: 1100px; }
.cap-cols .b { font: 400 clamp(16px,1.3vw,20px)/1.65 var(--hc-font-sans); margin: 0; }
.cap-ctarow { display: flex; align-items: center; gap: var(--hc-space-24); flex-wrap: wrap; margin-top: var(--hc-space-48); }
.cap-btn { display: inline-block; background: var(--hc-ink); color: var(--hc-paper); font: 600 12px var(--hc-font-mono); letter-spacing: .16em; padding: 16px 26px; border-radius: 999px; text-decoration: none; border: 1.5px solid var(--hc-ink); transition: background var(--hc-dur-micro) var(--hc-ease-out), color var(--hc-dur-micro) var(--hc-ease-out); }
.cap-btn:hover, .cap-btn:focus-visible { background: transparent; color: var(--hc-ink); }
.cap-sec .cap-stats { grid-template-columns: repeat(4, 1fr); }
.cap-sec .cap-stats b { font: 800 clamp(36px,4.6vw,68px)/1 var(--hc-font-sans); font-stretch: 110%; letter-spacing: -.02em; }
.cap-sec .cap-stats span { margin-top: var(--hc-space-8); }
.cap-cards { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hc-space-16); }
.cap-cards .cap-svc { border: 1.5px solid rgb(var(--hc-ink-rgb) / .16); border-radius: 20px; padding: var(--hc-space-24); grid-template-columns: 44px 1fr; transition: background var(--hc-dur-micro) var(--hc-ease-out), color var(--hc-dur-micro) var(--hc-ease-out), border-color var(--hc-dur-micro) var(--hc-ease-out); }
.cap-cards .cap-svc:first-child { border-top: 1.5px solid rgb(var(--hc-ink-rgb) / .16); padding-top: var(--hc-space-24); }
.cap-cards .cap-svc .no { font-size: 12px; }
.cap-cards .cap-svc b { font-size: clamp(18px,1.6vw,24px); }
.cap-cards .cap-svc:hover, .cap-cards .cap-svc:focus-within { background: var(--hc-ink); color: var(--hc-paper); border-color: var(--hc-ink); }
.cap-cards .cap-svc:hover .no, .cap-cards .cap-svc:focus-within .no { color: rgb(var(--hc-paper-rgb) / .6); }
.rel-work { margin-block: 0; }
.rel-work .arrow-row { display: flex; justify-content: space-between; align-items: center; gap: var(--hc-space-24); border: 1.5px solid rgb(var(--hc-ink-rgb) / .16); border-radius: 20px; padding: clamp(20px,2.4vw,32px); margin-top: var(--hc-space-12); transition: background var(--hc-dur-micro) var(--hc-ease-out), color var(--hc-dur-micro) var(--hc-ease-out), border-color var(--hc-dur-micro) var(--hc-ease-out); }
.rel-work .arrow-row span:first-child { font: 700 clamp(18px,2vw,28px)/1.2 var(--hc-font-sans); font-stretch: 110%; }
.rel-work .arrow-row span:last-child { font: 500 11px var(--hc-font-mono); letter-spacing: .14em; color: rgb(var(--hc-ink-rgb) / .55); white-space: nowrap; }
.rel-work .arrow-row:hover, .rel-work .arrow-row:focus-visible { background: var(--hc-ink); color: var(--hc-paper); border-color: var(--hc-ink); }
.rel-work .arrow-row:hover span:last-child, .rel-work .arrow-row:focus-visible span:last-child { color: rgb(var(--hc-paper-rgb) / .65); }
.cap-close { text-align: center; padding: clamp(88px,14vh,176px) 0; }
.cap-close-h { font: 800 clamp(30px,4.4vw,64px)/1.1 var(--hc-font-sans); font-stretch: 110%; letter-spacing: -.02em; max-width: 24ch; margin: 0 auto var(--hc-space-40); }
@media (max-width: 900px) { .cap-cols { grid-template-columns: 1fr; gap: var(--hc-space-24); } .cap-sec .cap-stats { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 720px) { .cap-cards { grid-template-columns: 1fr; } .rel-work .arrow-row { flex-direction: column; align-items: flex-start; gap: 8px; } .rel-work .arrow-row span:last-child { white-space: normal; } }

/* ---------- consent gate: float above the bottom chrome (dock chip, pill) ---------- */'''

if not fails:
    for slug in SLUGS:
        start = html.find(f'data-route="/capabilities/{slug}"')
        seg_end = html.find('data-route="', start + 10)
        new_seg, pad = new_pages[slug]
        html = html[:start] + new_seg + pad + html[seg_end:]
    html = html.replace(css_marker, css, 1)
    html = html.replace("BUILD v3.7 \u2014 PORTED", "BUILD v3.8 \u2014 PORTED", 1)

if fails:
    print("FAILED PATCHES:")
    print("\n".join(" - " + f for f in fails))
    sys.exit(1)

P.write_text(html, encoding="utf-8")
print(f"OK - index.html: {len(orig)} -> {len(html)} chars ({len(html)-len(orig):+d})")
