# extend_build.py — v2 content merge: new graphic-design cases, videos,
# Behance archive link, and the file:// audio fix. Operates on index.html.
import pathlib, re, sys

F = "index.html"
html = pathlib.Path(F).read_text(encoding="utf-8")
log = []

def sub_once(old, new, label, count=1):
    global html
    n = html.count(old)
    if n < count:
        sys.exit(f"FAIL: expected >={count} of {label}, found {n}")
    html = html.replace(old, new, count)
    log.append(f"  {label}: {count}/{n}")

# --------------------------------------------- 0. sanity: new media present
for p in ["media/bedroom-recordings-ii.webp", "media/tracklist-br2.webp",
          "media/rotd-artwork.webp", "media/vpn-visa.webp", "media/show-me.webp",
          "media/epp-me.webp", "media/gen-sadiq.webp",
          "media/leadway-csw.mp4", "media/gen-sadiq-promo.mp4"]:
    if not pathlib.Path(p).exists():
        sys.exit(f"FAIL: missing {p} (run the ffmpeg conversions first)")

# --------------------------------------------- 1. AUDIO FIX (file:// silent stream)
# Chrome treats file:// pages as opaque origins: a MediaElementSource built there
# taints and outputs SILENCE (time advances, no sound). Only build the analyser
# graph over http(s); otherwise play the element natively + silent-mode mark.
OLD_GUARD = """  function ensureCtx() {
    if (ctx || !window.AudioContext) { return; }"""
NEW_GUARD = """  function ensureCtx() {
    /* file:// pages are opaque origins — a MediaElementSource there taints and
       outputs SILENCE. Build the analyser graph only over http(s); on file://
       play the element natively (silent mode keeps the mark affordance). */
    if (location.protocol !== "http:" && location.protocol !== "https:") { enterSilentMode(); return; }
    if (ctx || !window.AudioContext) { return; }"""
sub_once(OLD_GUARD, NEW_GUARD, "file:// audio guard in ensureCtx()")

# --------------------------------------------- 2. CSS: video figures + artwork strip
OLD_CSS = """.cp-media .fig { position: absolute; top: var(--hc-space-12); left: var(--hc-space-16); z-index: 2;"""
NEW_CSS = """.cp-media video { position: absolute; inset: 0; width: 100%; height: 100%;
                object-fit: contain; background: #000; }
.cp-strip { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: var(--hc-space-8); }
.cp-strip img { aspect-ratio: 1 / 1; width: 100%; object-fit: cover; display: block;
                border: var(--hc-keyline-w) solid var(--hc-keyline-color);
                background: var(--hc-surface); }
.cp-media .fig { position: absolute; top: var(--hc-space-12); left: var(--hc-space-16); z-index: 2;"""
sub_once(OLD_CSS, NEW_CSS, "CSS: .cp-media video + .cp-strip")

# --------------------------------------------- 3. ARCH_LIST: two new cases
OLD_TAIL = """Phase 2 roadmap material"]
    }];"""
NEW_TAIL = """Phase 2 roadmap material"]
    },
    {
      slug: "bedroom-recordings-ii", no: "11", name: "Bedroom Recordings II", sector: "Creative · Graphic Design", year: "2025", img: "media/bedroom-recordings-ii.webp", alt: "Bedroom Recordings II — cassette mixtape cover artwork", cats: ["CREATIVE"], claim: "A cassette world for the second Bedroom Recordings.", ctx: "Cassette mixtape cover artwork and tracklist design for Blvck Oreo's second Bedroom Recordings — a physical-world release system. One cover carries the mood, the tracklist carries the running order, and the album's tracks stream from this site's sound system.", did: ["Cassette mixtape cover artwork", "Tracklist design", "Release artwork system"]
    },
    {
      slug: "singles-cover-art", no: "12", name: "Singles & Cover Art", sector: "Creative · Graphic Design", year: "2023–25", img: "media/rotd-artwork.webp", alt: "Single cover artwork — Return of the Dead", cats: ["CREATIVE"], claim: "Every single gets a world, not just a cover.", ctx: "Cover artwork series for Blvck Oreo singles — Return of the Dead, Vpn Visa, Show Me, EPP ME!!! — plus Gen.Sadiq's Maradonna artwork with its beat-locked promo film. The wider graphic design archive lives on Behance.", did: ["Single cover artwork series (BLVCK OREO)", "Gen.Sadiq 'Maradonna' — artwork + promo film", "Graphic design archive on Behance"]
    }];"""
sub_once(OLD_TAIL, NEW_TAIL, "ARCH_LIST: cases 11 + 12")

# --------------------------------------------- 4. ROUTE_META: two new entries
OLD_META = '"/capabilities/brand-identity": {"t": "Brand Identity'
NEW_META = ('"/work/bedroom-recordings-ii": {"t": "Bedroom Recordings II — Work — HABIBCORE®", "d": "A cassette world for the second Bedroom Recordings — cover, tracklist, release."}, '
            '"/work/singles-cover-art": {"t": "Singles & Cover Art — Work — HABIBCORE®", "d": "Every single gets a world, not just a cover."}, '
            '"/capabilities/brand-identity": {"t": "Brand Identity')
sub_once(OLD_META, NEW_META, "ROUTE_META: cases 11 + 12")

# --------------------------------------------- 5. work grid: two archive cards
OLD_CARD = '<span class="wt">ARCHIVE</span></span><span class="wgo">DISCOVER CASE &rarr;</span></a></div>'
NEW_CARD = ('<span class="wt">ARCHIVE</span></span><span class="wgo">DISCOVER CASE &rarr;</span></a>'
            '<a class="wcard rv" href="#/work/bedroom-recordings-ii" data-cats="CREATIVE"><img src="media/bedroom-recordings-ii.webp" alt="Bedroom Recordings II — cassette mixtape cover artwork" loading="lazy"><span class="wchip"><span class="wn">Bedroom Recordings II</span><span class="wm"><span>2025</span><span>CREATIVE · GRAPHIC DESIGN</span></span><span class="wt">ARCHIVE</span></span><span class="wgo">DISCOVER CASE &rarr;</span></a>'
            '<a class="wcard rv" href="#/work/singles-cover-art" data-cats="CREATIVE"><img src="media/rotd-artwork.webp" alt="Singles &amp; Cover Art — Return of the Dead artwork" loading="lazy"><span class="wchip"><span class="wn">Singles &amp; Cover Art</span><span class="wm"><span>2023–25</span><span>CREATIVE · GRAPHIC DESIGN</span></span><span class="wt">ARCHIVE</span></span><span class="wgo">DISCOVER CASE &rarr;</span></a></div>')
sub_once(OLD_CARD, NEW_CARD, "work grid: archive cards 11 + 12")


# --------------------------------------------- 6. two new static case pages
PAGE_BR2 = '''<div class="page " data-route="/work/bedroom-recordings-ii" data-title="case-bedroom-recordings-ii"><div class="page-case">
      <div class="cp-hero"><div class="wrap">
        <nav class="cp-crumbs" aria-label="Breadcrumb"><a href="#/">HOME</a><span class="sep">/</span><a href="#/work">WORK</a><span class="sep">/</span><span>BEDROOM RECORDINGS II</span></nav>
        <h1>Bedroom Recordings II</h1>
        <p class="lede">A cassette world for the second Bedroom Recordings &mdash; cover artwork, tracklist, and a release that streams from the same site.</p>
        <div class="cp-meta-row"><div><div class="k">YEAR</div><div class="v">2025</div></div><div><div class="k">SECTOR</div><div class="v">Creative · Graphic Design</div></div><div><div class="k">ARCHIVE</div><div class="v">BEFORE THE SOFTWARE</div></div></div>
      </div></div>
      <div class="cp-body"><div class="wrap">
        <div class="cp-sec" style="border-top:0;padding-top:0"><span class="k">CONTEXT</span><p class="b">Cassette mixtape cover artwork and tracklist design for Blvck Oreo&rsquo;s second <strong>Bedroom Recordings</strong> &mdash; a physical-world release system. One cover carries the mood, the tracklist carries the running order, and the album&rsquo;s tracks stream from this site&rsquo;s sound system.</p></div>
        <figure class="cp-media"><img src="media/bedroom-recordings-ii.webp" alt="Bedroom Recordings II — cassette mixtape cover artwork" loading="lazy"><span class="fig">FIG. 09 — CREATIVE · GRAPHIC DESIGN</span></figure>
        <figure class="cp-media"><img src="media/tracklist-br2.webp" alt="Bedroom Recordings II — tracklist design" loading="lazy"><span class="fig">FIG. 09B — TRACKLIST</span></figure>
        <div class="cp-sec"><span class="k">WHAT I DID</span><ul class="cp-dels"><li>Cassette mixtape cover artwork</li><li>Tracklist design</li><li>Release artwork system</li></ul></div>
      </div></div>
      <a class="cp-next" href="#/work/singles-cover-art"><div class="wrap"><span class="k">NEXT CASE</span><span class="nm"><span>Singles &amp; Cover Art</span><span>&rarr;</span></span></div></a>
      <div class="cp-note"><div class="wrap">CASE COPY v0.1 &mdash; DRAFTED FROM SITE FACTS &middot; REVIEW BEFORE SHIP &middot; HABIBCORE&reg; IDENTITY SYSTEM</div></div>
    </div></div>'''


PAGE_SINGLES = '''<div class="page " data-route="/work/singles-cover-art" data-title="case-singles-cover-art"><div class="page-case">
      <div class="cp-hero"><div class="wrap">
        <nav class="cp-crumbs" aria-label="Breadcrumb"><a href="#/">HOME</a><span class="sep">/</span><a href="#/work">WORK</a><span class="sep">/</span><span>SINGLES &amp; COVER ART</span></nav>
        <h1>Singles &amp; Cover Art</h1>
        <p class="lede">Every single gets a world, not just a cover &mdash; artwork for Blvck Oreo&rsquo;s singles and Gen.Sadiq&rsquo;s Maradonna, with its promo film.</p>
        <div class="cp-meta-row"><div><div class="k">YEAR</div><div class="v">2023–25</div></div><div><div class="k">SECTOR</div><div class="v">Creative · Graphic Design</div></div><div><div class="k">ARCHIVE</div><div class="v">BEFORE THE SOFTWARE</div></div></div>
      </div></div>
      <div class="cp-body"><div class="wrap">
        <div class="cp-sec" style="border-top:0;padding-top:0"><span class="k">CONTEXT</span><p class="b">A cover artwork series built one single at a time: <strong>Return of the Dead</strong>, <strong>Vpn Visa</strong>, <strong>Show Me</strong> and <strong>EPP ME!!!</strong> for Blvck Oreo &mdash; plus Gen.Sadiq&rsquo;s <strong>Maradonna</strong> artwork and its beat-locked promo film. The rest of the graphic design archive lives on Behance.</p></div>
        <figure class="cp-media"><img src="media/rotd-artwork.webp" alt="Return of the Dead — single cover artwork" loading="lazy"><span class="fig">FIG. 10 — CREATIVE · GRAPHIC DESIGN</span></figure>
        <div class="cp-sec"><span class="k">THE SERIES</span><div class="cp-strip"><img src="media/vpn-visa.webp" alt="Vpn Visa — cover artwork" loading="lazy"><img src="media/show-me.webp" alt="Show Me — cover artwork" loading="lazy"><img src="media/epp-me.webp" alt="EPP ME!!! — cover artwork" loading="lazy"><img src="media/gen-sadiq.webp" alt="Gen.Sadiq — Maradonna artwork" loading="lazy"></div></div>
        <figure class="cp-media"><video controls preload="metadata" src="media/gen-sadiq-promo.mp4"></video><span class="fig">FIG. 10B — GEN.SADIQ &lsquo;MARADONNA&rsquo; · PROMO FILM</span></figure>
        <div class="cp-sec"><span class="k">WHAT I DID</span><ul class="cp-dels"><li>Single cover artwork series (BLVCK OREO)</li><li>Gen.Sadiq &lsquo;Maradonna&rsquo; — artwork + promo film</li><li>Graphic design archive on Behance</li></ul></div>
        <div class="cp-sec"><span class="k">FULL ARCHIVE</span><p class="b">The wider graphic design set &mdash; including pieces published on Behance &mdash; is collected at <a class="tlink" href="https://behance.net/BlvckOreo" rel="noopener">behance.net/BlvckOreo &nearr;</a>.</p></div>
      </div></div>
      <a class="cp-next" href="#/work/biscuit-ai"><div class="wrap"><span class="k">NEXT CASE</span><span class="nm"><span>Biscuit AI</span><span>&rarr;</span></span></div></a>
      <div class="cp-note"><div class="wrap">CASE COPY v0.1 &mdash; DRAFTED FROM SITE FACTS &middot; REVIEW BEFORE SHIP &middot; HABIBCORE&reg; IDENTITY SYSTEM</div></div>
    </div></div>'''


OLD_CAPS_OPEN = '</div></div><div class="page " data-route="/capabilities" data-title="caps">'
NEW_CAPS_OPEN = '</div></div>' + PAGE_BR2 + PAGE_SINGLES + '<div class="page " data-route="/capabilities" data-title="caps">'
sub_once(OLD_CAPS_OPEN, NEW_CAPS_OPEN, "static pages: bedroom-recordings-ii + singles-cover-art")

# --------------------------------------------- 7. NEXT CASE chain: 1ethfp -> BR2
OLD_NEXT = '<a class="cp-next" href="#/work/biscuit-ai"><div class="wrap"><span class="k">NEXT CASE</span><span class="nm"><span>Biscuit AI</span><span>&rarr;</span></span></div></a>'
NEW_NEXT = '<a class="cp-next" href="#/work/bedroom-recordings-ii"><div class="wrap"><span class="k">NEXT CASE</span><span class="nm"><span>Bedroom Recordings II</span><span>&rarr;</span></span></div></a>'
sub_once(OLD_NEXT, NEW_NEXT, "NEXT CASE: 1ethfp -> bedroom-recordings-ii")

# --------------------------------------------- 8. graphic-design capability: new rel-work rows
OLD_REL = '<a class="arrow-row" href="#/work/skaame"><span>Skaame — EPK composition</span><span>2024 &rarr;</span></a>'
NEW_REL = (OLD_REL +
           '<a class="arrow-row" href="#/work/bedroom-recordings-ii"><span>Bedroom Recordings II — cassette artwork</span><span>2025 &rarr;</span></a>'
           '<a class="arrow-row" href="#/work/singles-cover-art"><span>Singles &amp; Cover Art — cover series</span><span>2023–25 &rarr;</span></a>')
sub_once(OLD_REL, NEW_REL, "graphic-design capability: rel-work rows")

# --------------------------------------------- 9. leadway case: CSW film figure
i = html.find('data-route="/work/leadway-pensure"')
j = html.find('data-route="', i + 20)
seg = html[i:j]
k = seg.find('</figure>')
assert k != -1 and 'media/leadway-pensure.jpg' in seg[:k], "leadway hero figure not found"
VIDEO_FIG = '<figure class="cp-media"><video controls preload="metadata" src="media/leadway-csw.mp4"></video><span class="fig">FIG. 03B — CUSTOMER SERVICE WEEK 2024 · FILM</span></figure>'
html = html[:i] + seg[:k + len('</figure>')] + VIDEO_FIG + seg[k + len('</figure>'):] + html[j:]
log.append("  leadway case: CSW film figure inserted")

# --------------------------------------------- write + final assertions
pathlib.Path(F).write_text(html, encoding="utf-8")
assert "data:audio" not in html
routes = set(re.findall(r'data-route="([^"]+)"', html))
for r in ["/work/bedroom-recordings-ii", "/work/singles-cover-art"]:
    assert r in routes, f"route {r} missing"
print(f"wrote {F} ({len(html):,} chars)")
print("\n".join(log))

