# extend_build_v3.py — v3 content pass, driven by owner feedback (2026-09-15):
#   1. three new own-cases: visitor-from-mars, gen-sadiq (+ real client quote), tbogd
#   2. BR2 + Leadway copy rewritten to claim the real roles (co-production,
#      creative lead, director, release)
#   3. Singles & Cover Art loses the Gen.Sadiq pieces (now its own case)
#   4. case media grids fixed: .cp-media gets a real 16:9 box; .sq shows square
#      artwork full-bleed instead of cropping it inside a 280px strip
#   5. list view reworked to Brand Appart behaviour (scroll-driven active row,
#      meta pair only on the active row, media card follows the active row)
#   6. Bedroom Recordings II EP tracks (4) wired into the sound system deck
# Operates on index.html (after build_v3.py + extend_build.py).
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
for p in ["media/visitor-from-mars.webp", "media/gen-sadiq-cover.webp",
          "media/tbogd-cover.jpg", "media/audio/spazzing-hard.mp3",
          "media/audio/marceline.mp3", "media/audio/good-days.mp3",
          "media/audio/trap-lan-je.mp3", "media/gen-sadiq.webp",
          "media/gen-sadiq-promo.mp4"]:
    if not pathlib.Path(p).exists():
        sys.exit(f"FAIL: missing {p} (run the v3 asset conversions first)")

# --------------------------------------------- 1. CSS: real media boxes + .sq full-art variant
# .cp-media had min-height:280px and only absolutely-positioned children, so EVERY
# figure was a 280px strip and square covers were cropped away. Give the box a
# true 16:9 aspect, and a .sq variant that lets square artwork render full width.
OLD_MEDIA_CSS = """.cp-media { margin-block: var(--hc-space-24); border: var(--hc-plate-border);
            background: var(--hc-surface); position: relative; min-height: 280px; }
.cp-media img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }"""
NEW_MEDIA_CSS = """.cp-media { margin-block: var(--hc-space-24); border: var(--hc-plate-border);
            background: var(--hc-surface); position: relative; aspect-ratio: 16 / 9; min-height: 280px; }
.cp-media.sq { aspect-ratio: auto; }
.cp-media.sq img { position: static; width: 100%; height: auto; max-height: 88vh;
                   object-fit: contain; object-position: center; }
.cp-media img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }"""
sub_once(OLD_MEDIA_CSS, NEW_MEDIA_CSS, "CSS: .cp-media aspect boxes + .sq")

# playable track rows on case pages (Bedroom Recordings II tracklist)
OLD_STRIP_CSS = """.cp-strip { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: var(--hc-space-8); }"""
NEW_STRIP_CSS = """.cp-strip { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: var(--hc-space-8); }
.cp-tracks { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
             gap: var(--hc-space-8); max-width: 68ch; }
.cp-tracks .trk { display: flex; align-items: center; gap: var(--hc-space-12); width: 100%;
                  text-align: left; background: none; color: inherit; cursor: pointer;
                  border: var(--hc-hairline-w) solid var(--hc-hairline-color); padding: 10px 12px;
                  font: 500 var(--hc-type-meta-size) var(--hc-font-mono); letter-spacing: .1em;
                  text-transform: uppercase;
                  transition: border-color var(--hc-dur-micro) var(--hc-ease-out); }
.cp-tracks .trk:hover, .cp-tracks .trk:focus-visible { border-color: var(--hc-ink); }
.cp-tracks .trk b { color: var(--hc-text-muted); font-weight: 500; }
.cp-tracks .trk i { margin-left: auto; font-style: normal; color: var(--hc-state-live);
                    opacity: 0; transition: opacity var(--hc-dur-micro) var(--hc-ease-out); }
.cp-tracks .trk:hover i, .cp-tracks .trk:focus-visible i { opacity: 1; }"""
sub_once(OLD_STRIP_CSS, NEW_STRIP_CSS, "CSS: .cp-tracks play rows")

# --------------------------------------------- 2. CSS: list view — meta pair only on the active row
OLD_META_CSS = """.idx-row .meta {
  grid-auto-flow: column; gap: var(--hc-space-32); align-items: center;
  justify-items: start;
}"""
NEW_META_CSS = """.idx-row .meta {
  grid-auto-flow: column; gap: var(--hc-space-32); align-items: center;
  justify-items: start;
  opacity: 0; transition: opacity var(--hc-dur-micro) var(--hc-ease-out);
}
.idx-row:hover .meta, .idx-row:focus-visible .meta,
.idx-row[aria-current="true"] .meta { opacity: 1; }"""
sub_once(OLD_META_CSS, NEW_META_CSS, "CSS: idx meta only on active row")

# --------------------------------------------- 3. ARCH_LIST: rewrite BR2 + singles, add 13/14/15
OLD_BR2_ENTRY = 'slug: "bedroom-recordings-ii", no: "11", name: "Bedroom Recordings II", sector: "Creative · Graphic Design", year: "2025", img: "media/bedroom-recordings-ii.webp", alt: "Bedroom Recordings II — cassette mixtape cover artwork", cats: ["CREATIVE"], claim: "A cassette world for the second Bedroom Recordings.", ctx: "Cassette mixtape cover artwork and tracklist design for Blvck Oreo\'s second Bedroom Recordings — a physical-world release system. One cover carries the mood, the tracklist carries the running order, and the album\'s tracks stream from this site\'s sound system.", did: ["Cassette mixtape cover artwork", "Tracklist design", "Release artwork system"]'
NEW_BR2_ENTRY = 'slug: "bedroom-recordings-ii", no: "11", name: "Bedroom Recordings II", sector: "Creative · Graphic Design", year: "2025", img: "media/bedroom-recordings-ii.webp", alt: "Bedroom Recordings II — cassette mixtape cover artwork", cats: ["CREATIVE"], claim: "An EP I co-produced, designed and released.", ctx: "Bedroom Recordings II — an EP made with YE!!OWSOUL. I co-produced the record with him, led the creative and designed the physical release: cassette mixtape cover artwork and tracklist. Released independently — the EP\'s tracks stream from this site\'s sound system.", did: ["Co-produced the EP (with YE!!OWSOUL)", "Creative lead — cassette cover & tracklist", "Independent release"]'
sub_once(OLD_BR2_ENTRY, NEW_BR2_ENTRY, "ARCH_LIST: BR2 entry — real roles")

OLD_SGL_ENTRY = 'slug: "singles-cover-art", no: "12", name: "Singles & Cover Art", sector: "Creative · Graphic Design", year: "2023–25", img: "media/rotd-artwork.webp", alt: "Single cover artwork — Return of the Dead", cats: ["CREATIVE"], claim: "Every single gets a world, not just a cover.", ctx: "Cover artwork series for Blvck Oreo singles — Return of the Dead, Vpn Visa, Show Me, EPP ME!!! — plus Gen.Sadiq\'s Maradonna artwork with its beat-locked promo film. The wider graphic design archive lives on Behance.", did: ["Single cover artwork series (BLVCK OREO)", "Gen.Sadiq \'Maradonna\' — artwork + promo film", "Graphic design archive on Behance"]'
NEW_SGL_ENTRY = 'slug: "singles-cover-art", no: "12", name: "Singles & Cover Art", sector: "Creative · Graphic Design", year: "2023–25", img: "media/rotd-artwork.webp", alt: "Single cover artwork — Return of the Dead", cats: ["CREATIVE"], claim: "Every single gets a world, not just a cover.", ctx: "Cover artwork series for Blvck Oreo singles — Return of the Dead, Vpn Visa, Show Me, EPP ME!!! — built one single at a time, each cover a self-contained world for the record it carries. The wider graphic design archive lives on Behance.", did: ["Single cover artwork series (BLVCK OREO)", "Cover art direction & image", "Graphic design archive on Behance"]'
sub_once(OLD_SGL_ENTRY, NEW_SGL_ENTRY, "ARCH_LIST: singles entry — Gen.Sadiq moved out")

OLD_TAIL = '"Graphic design archive on Behance"]\n    }];'
NEW_TAIL = '''"Graphic design archive on Behance"]
    },
    {
      slug: "visitor-from-mars", no: "13", name: "Visitor from Mars", sector: "Creative · Music", year: "2021", img: "media/visitor-from-mars.webp", alt: "Visitor from Mars — Alien Inc × Blvck Oreo tape cover artwork", cats: ["CREATIVE"], claim: "A tape I co-produced, directed and released myself.", ctx: "Visitor from Mars — the Alien Inc × Blvck Oreo tape, co-produced with The Beatoven. I held the creative lead and directed the release: the cover artwork, the visual world the tape lives in, and the production seat beside The Beatoven. Released independently.", did: ["Co-production (with The Beatoven)", "Creative lead & director — cover artwork", "Independent release"]
    },
    {
      slug: "gen-sadiq", no: "14", name: "Gen.Sadiq — Maradonna", sector: "Creative · Graphic Design", year: "2023–25", img: "media/gen-sadiq.webp", alt: "Gen.Sadiq — Maradonna single cover artwork", cats: ["CREATIVE"], claim: "Commissioned: the cover, the promo film, the lyric video.", ctx: "Commissioned by Gen.Sadiq for Maradonna: the single cover artwork, a beat-locked promo film and a lyric promo video. He and his manager signed it off in the first round — the package went straight to release.", did: ["'Maradonna' — single cover artwork", "Beat-locked promo film", "Lyric promo video"], proof: {"q": "He heard the song once and came back with a cover that looks exactly how it sounds. Me and my manager didn't ask for a single change.", "cite": "GEN.SADIQ — ARTIST"}
    },
    {
      slug: "tbogd", no: "15", name: "The Basics of Graphic Design", sector: "Training · Curriculum", year: "2026", img: "media/tbogd-cover.jpg", alt: "The Basics of Graphic Design — training deck cover", cats: ["TRAINING"], claim: "Design fundamentals, built as a designed product.", ctx: "A ground-up graphic design fundamentals training: curriculum, deck and facilitation material produced end to end — sequenced and designed like a product, not assembled from a slide dump.", did: ["Curriculum & training deck", "Facilitation material", "Produced end to end"]
    }];'''
sub_once(OLD_TAIL, NEW_TAIL, "ARCH_LIST: cases 13 + 14 + 15")

# --------------------------------------------- 4. ROUTE_META: three new entries
OLD_META = '"/capabilities/brand-identity": {"t": "Brand Identity'
NEW_META = ('"/work/visitor-from-mars": {"t": "Visitor from Mars — Work — HABIBCORE®", "d": "A tape I co-produced with The Beatoven, directed and released myself."}, '
            '"/work/gen-sadiq": {"t": "Gen.Sadiq — Maradonna — Work — HABIBCORE®", "d": "Commissioned: the cover, the promo film, the lyric video."}, '
            '"/work/tbogd": {"t": "The Basics of Graphic Design — Work — HABIBCORE®", "d": "Design fundamentals, built as a designed product."}, '
            '"/capabilities/brand-identity": {"t": "Brand Identity')
sub_once(OLD_META, NEW_META, "ROUTE_META: cases 13 + 14 + 15")

# --------------------------------------------- 5. work archive grid: three new cards
OLD_CARD = '<span class="wt">ARCHIVE</span></span><span class="wgo">DISCOVER CASE &rarr;</span></a><a class="wcard rv" href="#/work/singles-cover-art" data-cats="CREATIVE"><img src="media/rotd-artwork.webp" alt="Singles &amp; Cover Art — Return of the Dead artwork" loading="lazy"><span class="wchip"><span class="wn">Singles &amp; Cover Art</span><span class="wm"><span>2023–25</span><span>CREATIVE · GRAPHIC DESIGN</span></span><span class="wt">ARCHIVE</span></span><span class="wgo">DISCOVER CASE &rarr;</span></a></div>'
NEW_CARD = ('<span class="wt">ARCHIVE</span></span><span class="wgo">DISCOVER CASE &rarr;</span></a><a class="wcard rv" href="#/work/singles-cover-art" data-cats="CREATIVE"><img src="media/rotd-artwork.webp" alt="Singles &amp; Cover Art — Return of the Dead artwork" loading="lazy"><span class="wchip"><span class="wn">Singles &amp; Cover Art</span><span class="wm"><span>2023–25</span><span>CREATIVE · GRAPHIC DESIGN</span></span><span class="wt">ARCHIVE</span></span><span class="wgo">DISCOVER CASE &rarr;</span></a>'
            '<a class="wcard rv" href="#/work/visitor-from-mars" data-cats="CREATIVE"><img src="media/visitor-from-mars.webp" alt="Visitor from Mars — Alien Inc × Blvck Oreo tape cover artwork" loading="lazy"><span class="wchip"><span class="wn">Visitor from Mars</span><span class="wm"><span>2021</span><span>CREATIVE · MUSIC</span></span><span class="wt">ARCHIVE</span></span><span class="wgo">DISCOVER CASE &rarr;</span></a>'
            '<a class="wcard rv" href="#/work/gen-sadiq" data-cats="CREATIVE"><img src="media/gen-sadiq.webp" alt="Gen.Sadiq — Maradonna cover artwork" loading="lazy"><span class="wchip"><span class="wn">Gen.Sadiq — Maradonna</span><span class="wm"><span>2023–25</span><span>CREATIVE · GRAPHIC DESIGN</span></span><span class="wt">ARCHIVE</span></span><span class="wgo">DISCOVER CASE &rarr;</span></a>'
            '<a class="wcard rv" href="#/work/tbogd" data-cats="TRAINING"><img src="media/tbogd-cover.jpg" alt="The Basics of Graphic Design — training deck cover" loading="lazy"><span class="wchip"><span class="wn">The Basics of Graphic Design</span><span class="wm"><span>2026</span><span>TRAINING · CURRICULUM</span></span><span class="wt">ARCHIVE</span></span><span class="wgo">DISCOVER CASE &rarr;</span></a></div>')
sub_once(OLD_CARD, NEW_CARD, "work grid: archive cards 13 + 14 + 15")

# --------------------------------------------- 6. work page lede + build chip
sub_once('Ten destinations and growing.</p>', 'Fifteen destinations and growing.</p>',
         "work lede: destination count")
sub_once('BUILD v3.3 — PORTED', 'BUILD v3.4 — PORTED', "build chip v3.3 -> v3.4")

# --------------------------------------------- 7. static case pages: VFM + SADIQ + TBOGD
PAGE_VFM = '''<div class="page " data-route="/work/visitor-from-mars" data-title="case-visitor-from-mars"><div class="page-case">
      <div class="cp-hero"><div class="wrap">
        <nav class="cp-crumbs" aria-label="Breadcrumb"><a href="#/">HOME</a><span class="sep">/</span><a href="#/work">WORK</a><span class="sep">/</span><span>VISITOR FROM MARS</span></nav>
        <h1>Visitor from Mars</h1>
        <p class="lede">The Alien Inc &times; Blvck Oreo tape &mdash; co-produced with The Beatoven, directed and released by me. It streams from this site&rsquo;s sound system.</p>
        <div class="cp-meta-row"><div><div class="k">YEAR</div><div class="v">2021</div></div><div><div class="k">SECTOR</div><div class="v">Creative · Music</div></div><div><div class="k">ROLE</div><div class="v">CREATIVE LEAD · CO-PRODUCTION · RELEASE</div></div><div><div class="k">ARCHIVE</div><div class="v">BEFORE THE SOFTWARE</div></div></div>
      </div></div>
      <div class="cp-body"><div class="wrap">
        <div class="cp-sec" style="border-top:0;padding-top:0"><span class="k">CONTEXT</span><p class="b"><strong>Visitor from Mars</strong> is the Alien Inc &times; Blvck Oreo tape, co-produced with The Beatoven. I held the creative lead and directed the whole release &mdash; the cover artwork and the visual world the tape lives in, plus the production seat beside The Beatoven on the beats. Released independently, and the tape&rsquo;s tracks stream from this site&rsquo;s sound system.</p></div>
        <figure class="cp-media sq"><img src="media/visitor-from-mars.webp" alt="Visitor from Mars — Alien Inc × Blvck Oreo tape cover artwork" loading="lazy"><span class="fig">FIG. 11 — CREATIVE · MUSIC</span></figure>
        <div class="cp-sec"><span class="k">WHAT I DID</span><ul class="cp-dels"><li>Co-production (with The Beatoven)</li><li>Creative lead &amp; director — cover artwork</li><li>Independent release</li></ul></div>
        <div class="cp-sec"><span class="k">THE TAPE</span><p class="b">What&rsquo;s Up!!! &middot; Afro Woo with Droxx &middot; Finer Things &middot; Vibes &amp; Inshallah. What&rsquo;s Up!!! and Afro Woo stream in the deck now &mdash; tap the sound mark, bottom-left.</p></div>
      </div></div>
      <a class="cp-next" href="#/work/gen-sadiq"><div class="wrap"><span class="k">NEXT CASE</span><span class="nm"><span>Gen.Sadiq — Maradonna</span><span>&rarr;</span></span></div></a>
      <div class="cp-note"><div class="wrap">CASE COPY v0.1 &mdash; DRAFTED FROM OWNER BRIEF &middot; REVIEW BEFORE SHIP &middot; HABIBCORE&reg; IDENTITY SYSTEM</div></div>
    </div></div>'''

PAGE_SADIQ = '''<div class="page " data-route="/work/gen-sadiq" data-title="case-gen-sadiq"><div class="page-case">
      <div class="cp-hero"><div class="wrap">
        <nav class="cp-crumbs" aria-label="Breadcrumb"><a href="#/">HOME</a><span class="sep">/</span><a href="#/work">WORK</a><span class="sep">/</span><span>GEN.SADIQ — MARADONNA</span></nav>
        <h1>Gen.Sadiq — Maradonna</h1>
        <p class="lede">Commissioned for Maradonna: the single cover, a beat-locked promo film and a lyric promo video &mdash; signed off in the first round.</p>
        <div class="cp-meta-row"><div><div class="k">YEAR</div><div class="v">2023–25</div></div><div><div class="k">SECTOR</div><div class="v">Creative · Graphic Design</div></div><div><div class="k">ROLE</div><div class="v">COMMISSIONED — COVER · FILM · LYRIC VIDEO</div></div><div><div class="k">CLIENT</div><div class="v">GEN.SADIQ</div></div></div>
      </div></div>
      <div class="cp-body"><div class="wrap">
        <div class="cp-sec" style="border-top:0;padding-top:0"><span class="k">CONTEXT</span><p class="b">Gen.Sadiq came for the full visual package for <strong>Maradonna</strong>: single cover artwork, a beat-locked promo film and a lyric promo video. The brief came from the song itself &mdash; the cover holds its mood, and both videos cut to the beat. He and his manager signed off the first round; the package went straight to release.</p></div>
        <figure class="cp-media sq"><img src="media/gen-sadiq.webp" alt="Gen.Sadiq — Maradonna single cover artwork" loading="lazy"><span class="fig">FIG. 12 — &lsquo;MARADONNA&rsquo; · COVER ARTWORK</span></figure>
        <figure class="cp-media"><video controls preload="metadata" src="media/gen-sadiq-promo.mp4"></video><span class="fig">FIG. 12B — &lsquo;MARADONNA&rsquo; · PROMO FILM</span></figure>
        <div class="cp-quote"><blockquote>&ldquo;He heard the song once and came back with a cover that looks exactly how it sounds. Me and my manager didn&rsquo;t ask for a single change.&rdquo;</blockquote><cite>GEN.SADIQ — ARTIST</cite></div>
        <div class="cp-sec"><span class="k">WHAT I DID</span><ul class="cp-dels"><li>&lsquo;Maradonna&rsquo; — single cover artwork</li><li>Beat-locked promo film</li><li>Lyric promo video</li></ul></div>
      </div></div>
      <a class="cp-next" href="#/work/tbogd"><div class="wrap"><span class="k">NEXT CASE</span><span class="nm"><span>The Basics of Graphic Design</span><span>&rarr;</span></span></div></a>
      <div class="cp-note"><div class="wrap">CASE COPY v0.1 &mdash; DRAFTED FROM OWNER BRIEF &middot; QUOTE PARAPHRASED FROM CLIENT FEEDBACK &middot; HABIBCORE&reg; IDENTITY SYSTEM</div></div>
    </div></div>'''

PAGE_TBOGD = '''<div class="page " data-route="/work/tbogd" data-title="case-tbogd"><div class="page-case">
      <div class="cp-hero"><div class="wrap">
        <nav class="cp-crumbs" aria-label="Breadcrumb"><a href="#/">HOME</a><span class="sep">/</span><a href="#/work">WORK</a><span class="sep">/</span><span>THE BASICS OF GRAPHIC DESIGN</span></nav>
        <h1>The Basics of Graphic Design</h1>
        <p class="lede">Design fundamentals, taught as a designed product &mdash; a full training deck built end to end.</p>
        <div class="cp-meta-row"><div><div class="k">YEAR</div><div class="v">2026</div></div><div><div class="k">SECTOR</div><div class="v">Training · Curriculum</div></div><div><div class="k">ROLE</div><div class="v">CURRICULUM · DECK · FACILITATION</div></div><div><div class="k">FORMAT</div><div class="v">TRAINING DECK · 10 SECTIONS</div></div></div>
      </div></div>
      <div class="cp-body"><div class="wrap">
        <div class="cp-sec" style="border-top:0;padding-top:0"><span class="k">CONTEXT</span><p class="b"><strong>The Basics of Graphic Design</strong> is a ground-up fundamentals training: curriculum, deck and facilitation material produced end to end. Built like a product &mdash; sequenced, designed and shippable as one artefact &mdash; not assembled from a slide dump.</p></div>
        <figure class="cp-media sq"><img src="media/tbogd-cover.jpg" alt="The Basics of Graphic Design — training deck cover" loading="lazy"><span class="fig">FIG. 13 — TRAINING · DECK COVER</span></figure>
        <div class="cp-sec"><span class="k">WHAT I DID</span><ul class="cp-dels"><li>Curriculum &amp; training deck</li><li>Facilitation material</li><li>Produced end to end</li></ul></div>
      </div></div>
      <a class="cp-next" href="#/work/biscuit-ai"><div class="wrap"><span class="k">NEXT CASE</span><span class="nm"><span>Biscuit AI</span><span>&rarr;</span></span></div></a>
      <div class="cp-note"><div class="wrap">CASE COPY v0.1 &mdash; DRAFTED FROM OWNER BRIEF &middot; REVIEW BEFORE SHIP &middot; HABIBCORE&reg; IDENTITY SYSTEM</div></div>
    </div></div>'''

OLD_CAPS_OPEN = '</div></div><div class="page " data-route="/capabilities" data-title="caps">'
NEW_CAPS_OPEN = '</div></div>' + PAGE_VFM + PAGE_SADIQ + PAGE_TBOGD + '<div class="page " data-route="/capabilities" data-title="caps">'
sub_once(OLD_CAPS_OPEN, NEW_CAPS_OPEN, "static pages: visitor-from-mars + gen-sadiq + tbogd")

# --------------------------------------------- 8. singles page: Gen.Sadiq pieces move to their own case
sub_once('<p class="lede">Every single gets a world, not just a cover &mdash; artwork for Blvck Oreo&rsquo;s singles and Gen.Sadiq&rsquo;s Maradonna, with its promo film.</p>',
         '<p class="lede">Every single gets a world, not just a cover &mdash; the cover artwork series for Blvck Oreo&rsquo;s singles.</p>',
         "singles lede")
OLD_SGL_CTX = '<div class="cp-sec" style="border-top:0;padding-top:0"><span class="k">CONTEXT</span><p class="b">A cover artwork series built one single at a time: <strong>Return of the Dead</strong>, <strong>Vpn Visa</strong>, <strong>Show Me</strong> and <strong>EPP ME!!!</strong> for Blvck Oreo &mdash; plus Gen.Sadiq&rsquo;s <strong>Maradonna</strong> artwork and its beat-locked promo film. The rest of the graphic design archive lives on Behance.</p></div>'
NEW_SGL_CTX = '<div class="cp-sec" style="border-top:0;padding-top:0"><span class="k">CONTEXT</span><p class="b">A cover artwork series built one single at a time: <strong>Return of the Dead</strong>, <strong>Vpn Visa</strong>, <strong>Show Me</strong> and <strong>EPP ME!!!</strong> for Blvck Oreo &mdash; each cover a self-contained world for the record it carries. The rest of the graphic design archive lives on Behance.</p></div>'
sub_once(OLD_SGL_CTX, NEW_SGL_CTX, "singles context")
sub_once('<img src="media/gen-sadiq.webp" alt="Gen.Sadiq — Maradonna artwork" loading="lazy"></div></div>',
         '</div></div>', "singles strip: Gen.Sadiq tile removed")
sub_once('\n        <figure class="cp-media"><video controls preload="metadata" src="media/gen-sadiq-promo.mp4"></video><span class="fig">FIG. 10B — GEN.SADIQ &lsquo;MARADONNA&rsquo; · PROMO FILM</span></figure>',
         '', "singles page: Gen.Sadiq promo film figure removed")
sub_once('<figure class="cp-media"><img src="media/rotd-artwork.webp" alt="Return of the Dead — single cover artwork" loading="lazy">',
         '<figure class="cp-media sq"><img src="media/rotd-artwork.webp" alt="Return of the Dead — single cover artwork" loading="lazy">',
         "singles hero: .sq full-art figure")
sub_once('<div class="cp-sec"><span class="k">WHAT I DID</span><ul class="cp-dels"><li>Single cover artwork series (BLVCK OREO)</li><li>Gen.Sadiq &lsquo;Maradonna&rsquo; — artwork + promo film</li><li>Graphic design archive on Behance</li></ul></div>',
         '<div class="cp-sec"><span class="k">WHAT I DID</span><ul class="cp-dels"><li>Single cover artwork series (BLVCK OREO)</li><li>Cover art direction &amp; image</li><li>Graphic design archive on Behance</li></ul></div>',
         "singles WHAT I DID")
sub_once('</div></div>\n      <a class="cp-next" href="#/work/biscuit-ai"><div class="wrap"><span class="k">NEXT CASE</span><span class="nm"><span>Biscuit AI</span><span>&rarr;</span></span></div></a>\n      <div class="cp-note"><div class="wrap">CASE COPY v0.1 &mdash; DRAFTED FROM SITE FACTS',
         '</div></div>\n      <a class="cp-next" href="#/work/visitor-from-mars"><div class="wrap"><span class="k">NEXT CASE</span><span class="nm"><span>Visitor from Mars</span><span>&rarr;</span></span></div></a>\n      <div class="cp-note"><div class="wrap">CASE COPY v0.1 &mdash; DRAFTED FROM SITE FACTS',
         "NEXT CASE: singles -> visitor-from-mars")

# --------------------------------------------- 9. BR2 static page: roles + tracklist
sub_once('<p class="lede">A cassette world for the second Bedroom Recordings &mdash; cover artwork, tracklist, and a release that streams from the same site.</p>',
         '<p class="lede">Bedroom Recordings II &mdash; an EP made with YE!!OWSOUL. I co-produced the record, led the creative and designed the release. It streams from this same site.</p>',
         "BR2 lede")
sub_once('<div class="cp-meta-row"><div><div class="k">YEAR</div><div class="v">2025</div></div><div><div class="k">SECTOR</div><div class="v">Creative · Graphic Design</div></div><div><div class="k">ARCHIVE</div><div class="v">BEFORE THE SOFTWARE</div></div></div>',
         '<div class="cp-meta-row"><div><div class="k">YEAR</div><div class="v">2025</div></div><div><div class="k">SECTOR</div><div class="v">Creative · Graphic Design</div></div><div><div class="k">ROLE</div><div class="v">CO-PRODUCTION · CREATIVE LEAD · RELEASE</div></div><div><div class="k">ARCHIVE</div><div class="v">BEFORE THE SOFTWARE</div></div></div>',
         "BR2 meta: ROLE col")
OLD_BR2_CTX = '<div class="cp-sec" style="border-top:0;padding-top:0"><span class="k">CONTEXT</span><p class="b">Cassette mixtape cover artwork and tracklist design for Blvck Oreo&rsquo;s second <strong>Bedroom Recordings</strong> &mdash; a physical-world release system. One cover carries the mood, the tracklist carries the running order, and the album&rsquo;s tracks stream from this site&rsquo;s sound system.</p></div>'
NEW_BR2_CTX = '<div class="cp-sec" style="border-top:0;padding-top:0"><span class="k">CONTEXT</span><p class="b"><strong>Bedroom Recordings II</strong> is an EP made with YE!!OWSOUL. I co-produced the record with him, led the creative and designed the physical release: the cassette mixtape cover carries the mood, the tracklist carries the running order. Released independently &mdash; and the EP&rsquo;s tracks stream from this site&rsquo;s sound system.</p></div>'
sub_once(OLD_BR2_CTX, NEW_BR2_CTX, "BR2 context")
OLD_BR2_DID = '<div class="cp-sec"><span class="k">WHAT I DID</span><ul class="cp-dels"><li>Cassette mixtape cover artwork</li><li>Tracklist design</li><li>Release artwork system</li></ul></div>'
NEW_BR2_DID = ('<div class="cp-sec"><span class="k">WHAT I DID</span><ul class="cp-dels"><li>Co-produced the EP (with YE!!OWSOUL)</li><li>Creative lead — cassette cover &amp; tracklist</li><li>Independent release</li></ul></div>\n'
               '        <div class="cp-sec"><span class="k">THE EP &mdash; STREAMS FROM THE SOUND SYSTEM</span><div class="cp-tracks">'
               '<button type="button" class="trk" data-playtrack="6"><b>01</b><span>Spazzing Hard</span><i>PLAY &rarr;</i></button>'
               '<button type="button" class="trk" data-playtrack="7"><b>02</b><span>Marceline</span><i>PLAY &rarr;</i></button>'
               '<button type="button" class="trk" data-playtrack="8"><b>03</b><span>Good Days</span><i>PLAY &rarr;</i></button>'
               '<button type="button" class="trk" data-playtrack="9"><b>04</b><span>Trap Lan Je</span><i>PLAY &rarr;</i></button>'
               '</div></div>')
sub_once(OLD_BR2_DID, NEW_BR2_DID, "BR2 WHAT I DID + playable tracklist")
sub_once('<figure class="cp-media"><img src="media/bedroom-recordings-ii.webp" alt="Bedroom Recordings II — cassette mixtape cover artwork" loading="lazy">',
         '<figure class="cp-media sq"><img src="media/bedroom-recordings-ii.webp" alt="Bedroom Recordings II — cassette mixtape cover artwork" loading="lazy">',
         "BR2 cover: .sq figure")
sub_once('<figure class="cp-media"><img src="media/tracklist-br2.webp" alt="Bedroom Recordings II — tracklist design" loading="lazy">',
         '<figure class="cp-media sq"><img src="media/tracklist-br2.webp" alt="Bedroom Recordings II — tracklist design" loading="lazy">',
         "BR2 tracklist: .sq figure")

# --------------------------------------------- 10. Leadway case: CSW 2024 film — producer/director credit
OLD_LW_OVER = '<div class="cp-sec" style="border-top:0;padding-top:0"><span class="k">OVERVIEW</span><p class="b">A self-initiated brand extension pitch for one of Nigeria&#39;s largest pension funds: product redesigns, identity guidelines, social systems and brand voice — built on four years of operational experience inside the organisation.</p>'
OLD_LW_OVER2 = '<div class="cp-sec" style="border-top:0;padding-top:0"><span class="k">OVERVIEW</span><p class="b">A self-initiated brand extension pitch for one of Nigeria\'s largest pension funds: product redesigns, identity guidelines, social systems and brand voice — built on four years of operational experience inside the organisation.</p>'
NEW_LW_OVER = '<div class="cp-sec" style="border-top:0;padding-top:0"><span class="k">OVERVIEW</span><p class="b">A self-initiated brand extension pitch for one of Nigeria\'s largest pension funds: product redesigns, identity guidelines, social systems and brand voice — built on four years of operational experience inside the organisation. On the back of the pitch, Leadway commissioned me again: the Customer Service Week 2024 round-up film, which I shot, produced and directed end to end.</p>'
if OLD_LW_OVER in html:
    sub_once(OLD_LW_OVER, NEW_LW_OVER, "leadway overview + CSW credit")
else:
    sub_once(OLD_LW_OVER2, NEW_LW_OVER, "leadway overview + CSW credit")

OLD_LW_DEL = '<div class="cp-sec"><span class="k">DELIVERABLES</span><ul class="cp-dels"><li>Brand identity guidelines</li><li>Product redesign concepts</li><li>Social content system</li><li>Brand voice definition</li><li>Live web document (pitch)</li></ul></div>'
NEW_LW_DEL = '<div class="cp-sec"><span class="k">DELIVERABLES</span><ul class="cp-dels"><li>Brand identity guidelines</li><li>Product redesign concepts</li><li>Social content system</li><li>Brand voice definition</li><li>Live web document (pitch)</li><li>CSW 2024 round-up film — shot, produced &amp; directed</li></ul></div>'
sub_once(OLD_LW_DEL, NEW_LW_DEL, "leadway deliverables + CSW film")

OLD_LW_RESULT = '<div class="cp-sec"><span class="k">RESULT</span><div class="blk"><h3>A pitch that behaves like the product.</h3><p class="b">Shipped as a living document — the format itself demonstrates the follow-through the brand would be buying.</p></div></div>'
NEW_LW_RESULT = ('<div class="cp-sec"><span class="k">RESULT</span><div class="blk"><h3>A pitch that behaves like the product.</h3><p class="b">Shipped as a living document — the format itself demonstrates the follow-through the brand would be buying.</p></div>'
                 '<div class="blk"><h3>Customer Service Week 2024 — the film.</h3><p class="b">The commissioned follow-up: I shot the videos and stills on site, pulled the b-roll, cut the round-up film together and scored it with background music. Produced and directed by one pair of hands — same as everything else on this site.</p></div></div>')
sub_once(OLD_LW_RESULT, NEW_LW_RESULT, "leadway result: CSW film blk")

# --------------------------------------------- 11. capability relevant-work rows
OLD_GD_REL = '<a class="arrow-row" href="#/work/singles-cover-art"><span>Singles &amp; Cover Art — cover series</span><span>2023–25 &rarr;</span></a>'
NEW_GD_REL = (OLD_GD_REL +
              '<a class="arrow-row" href="#/work/gen-sadiq"><span>Gen.Sadiq — Maradonna cover &amp; film</span><span>2023–25 &rarr;</span></a>'
              '<a class="arrow-row" href="#/work/visitor-from-mars"><span>Visitor from Mars — tape artwork &amp; release</span><span>2021 &rarr;</span></a>')
sub_once(OLD_GD_REL, NEW_GD_REL, "graphic-design capability: rel-work rows")

OLD_CD_REL = '<a class="arrow-row" href="#/work/blvckoreo"><span>BlvckOreo — cover art &amp; identity</span><span>2023 &rarr;</span></a>'
NEW_CD_REL = (OLD_CD_REL +
              '<a class="arrow-row" href="#/work/visitor-from-mars"><span>Visitor from Mars — creative lead &amp; director</span><span>2021 &rarr;</span></a>')
sub_once(OLD_CD_REL, NEW_CD_REL, "creative-direction capability: rel-work row")

OLD_TR_REL = '<a class="arrow-row" href="#/work/ai-in-the-workplace"><span>AI in the Workplace — Birdview Travels &amp; Tours</span><span>2026 &rarr;</span></a>'
NEW_TR_REL = (OLD_TR_REL +
              '<a class="arrow-row" href="#/work/tbogd"><span>The Basics of Graphic Design — training deck</span><span>2026 &rarr;</span></a>')
sub_once(OLD_TR_REL, NEW_TR_REL, "training capability: rel-work row")

# --------------------------------------------- 12. sound system: BR2 EP tracks + per-track artist
OLD_TRACKS_TAIL = '{ src: "media/audio/234drill.mp3",    no: "T-06", title: "234drill",    mood: "Drill",  bpm: 144 }\n  ];'
NEW_TRACKS_TAIL = '''{ src: "media/audio/234drill.mp3",    no: "T-06", title: "234drill",    mood: "Drill",  bpm: 144 },
    /* Bedroom Recordings II — the EP with YE!!OWSOUL (owner-provided masters). */
    { src: "media/audio/spazzing-hard.mp3", no: "T-07", title: "Spazzing Hard", mood: "Bedroom Recordings II", artist: "BR2 \\u00D7 YE!!OWSOUL" },
    { src: "media/audio/marceline.mp3",     no: "T-08", title: "Marceline",     mood: "Bedroom Recordings II", artist: "BR2 \\u00D7 YE!!OWSOUL" },
    { src: "media/audio/good-days.mp3",     no: "T-09", title: "Good Days",     mood: "Bedroom Recordings II", artist: "BR2 \\u00D7 YE!!OWSOUL" },
    { src: "media/audio/trap-lan-je.mp3",   no: "T-10", title: "Trap Lan Je",   mood: "Bedroom Recordings II", artist: "BR2 \\u00D7 YE!!OWSOUL" }
  ];'''
sub_once(OLD_TRACKS_TAIL, NEW_TRACKS_TAIL, "TRACKS: BR2 EP (T-07..T-10)")

# bpm is optional now — BR2 masters ship without measured tempo
sub_once("""'<span class="bpm">' + t.bpm + ' BPM</span>""",
         """'<span class="bpm">' + (t.bpm ? t.bpm + " BPM" : "") + '</span>""",
         "track-row: bpm optional")
sub_once("""esc(t.mood) + " &middot; " + t.bpm + " BPM</span></span>\"""",
         """esc(t.mood) + (t.bpm ? " &middot; " + t.bpm + " BPM" : "") + "</span></span>\"""",
         "pop-row: bpm optional")
sub_once('if (a) { a.textContent = "BLVCK OREO \\u00B7 " + TRACKS[i].no; }',
         'if (a) { a.textContent = (TRACKS[i].artist || "BLVCK OREO") + " \\u00B7 " + TRACKS[i].no; }',
         "dock artist label: per-track artist")

# case-page play rows drive the same deck
OLD_DECK_WIRE = """  if (trackHost) {
    trackHost.addEventListener("click", function (e) {
      var r = e.target.closest(".track-row");
      if (r) { playTrack(+r.dataset.track); }
    });
  }"""
NEW_DECK_WIRE = OLD_DECK_WIRE + """
  /* case-page track rows (e.g. Bedroom Recordings II tracklist) drive the same deck */
  document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest ? e.target.closest("[data-playtrack]") : null;
    if (b) { playTrack(+b.dataset.playtrack); }
  });"""
sub_once(OLD_DECK_WIRE, NEW_DECK_WIRE, "deck wiring: data-playtrack rows")

# --------------------------------------------- 13. list view: scroll-driven active row (Brand Appart)
OLD_LV_JS = """    if (floatCard && FINE && !REDUCED) {
      /* v3.3 — the card ANCHORS to the active row (Brand Appart posture):
         beside the name's right end, centred on the row, gliding between rows. */
      var curRow = null;
      function placeCard(row) {
        var r = row.getBoundingClientRect();
        var cw = floatCard.offsetWidth || 320, ch = floatCard.offsetHeight || 240;
        var x = Math.min(r.right + 48, window.innerWidth - cw - 24);
        x = Math.max(x, Math.min(r.left + r.width * 0.42, window.innerWidth - cw - 24));
        var y = r.top + r.height / 2 - ch / 2;
        y = Math.max(12, Math.min(y, window.innerHeight - ch - 12));
        floatCard.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px) rotate(-8deg)";
      }
      listHost.addEventListener("mousemove", function (e) {
        var row = e.target.closest(".idx-row");
        if (!row) { if (curRow) { floatCard.style.opacity = "0"; curRow = null; } return; }
        var c = CASES[+row.dataset.case];
        var img = floatCard.querySelector("img");
        if (img.getAttribute("src") !== c.img) { img.src = c.img; img.alt = c.name; }
        if (row.getAttribute("aria-current") !== "true") {
          $$(".idx-row", listHost).forEach(function (r2) { r2.setAttribute("aria-current", String(r2 === row)); });
        }
        curRow = row;
        floatCard.style.opacity = "1";
        placeCard(row);
      }, { passive: true });
      listHost.addEventListener("mouseleave", function () { if (floatCard) { floatCard.style.opacity = "0"; curRow = null; } });
      var fcTick = false;
      window.addEventListener("scroll", function () {
        if (fcTick) { return; } fcTick = true;
        requestAnimationFrame(function () {
          fcTick = false;
          if (!floatCard || work.dataset.workview !== "index") { return; }
          if (curRow && floatCard.style.opacity === "1") { placeCard(curRow); }
          var r = work.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) { floatCard.style.opacity = "0"; }
        });
      }, { passive: true });
    }"""

NEW_LV_JS = """    if (floatCard && FINE && !REDUCED) {
      /* v3.4 — Brand Appart posture, scroll-driven: the row nearest viewport
         centre is ACTIVE (solid name + YEAR/SECTOR pair + anchored media card).
         Hover overrides while the pointer is over the list; scrolling takes
         over again the moment it leaves. (Also fixes v3.3's dead dataset.case
         lookup — rows are matched to CASES by index, not attribute.) */
      var rows = $$(".idx-row", listHost);
      var curRow = null, hovering = false;
      var fcImg = floatCard.querySelector("img");
      function placeCard(row) {
        var r = row.getBoundingClientRect();
        var cw = floatCard.offsetWidth || 320, ch = floatCard.offsetHeight || 240;
        var x = Math.min(r.right + 48, window.innerWidth - cw - 24);
        x = Math.max(x, Math.min(r.left + r.width * 0.42, window.innerWidth - cw - 24));
        var y = r.top + r.height / 2 - ch / 2;
        y = Math.max(12, Math.min(y, window.innerHeight - ch - 12));
        floatCard.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px) rotate(-8deg)";
      }
      function setActive(row, withCard) {
        if (row !== curRow) {
          rows.forEach(function (r2) { r2.setAttribute("aria-current", String(r2 === row)); });
          curRow = row;
        }
        if (row && withCard) {
          var c = CASES[rows.indexOf(row)];
          if (c && fcImg.getAttribute("src") !== c.img) { fcImg.src = c.img; fcImg.alt = c.name; }
          floatCard.style.opacity = "1";
          placeCard(row);
        }
      }
      function scrollActive() {
        var best = null, bd = Infinity;
        rows.forEach(function (r) {
          if (r.classList.contains("is-hidden")) { return; }
          var b = r.getBoundingClientRect();
          if (b.bottom < -40 || b.top > window.innerHeight + 40) { return; }
          var d = Math.abs(b.top + b.height / 2 - window.innerHeight / 2);
          if (d < bd) { bd = d; best = r; }
        });
        if (!best) {
          rows.some(function (r) { if (!r.classList.contains("is-hidden")) { best = r; return true; } return false; });
        }
        return best;
      }
      listHost.addEventListener("mousemove", function (e) {
        var row = e.target.closest(".idx-row");
        if (!row) { hovering = false; return; }
        hovering = true;
        setActive(row, true);
      }, { passive: true });
      listHost.addEventListener("mouseleave", function () {
        hovering = false;
        setActive(scrollActive(), true);
      });
      var fcTick = false;
      window.addEventListener("scroll", function () {
        if (fcTick) { return; } fcTick = true;
        requestAnimationFrame(function () {
          fcTick = false;
          if (!floatCard || work.dataset.workview !== "index") { return; }
          var r = work.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) { floatCard.style.opacity = "0"; return; }
          if (!hovering) { setActive(scrollActive(), true); }
          else if (curRow) { placeCard(curRow); }
        });
      }, { passive: true });
    }"""
sub_once(OLD_LV_JS, NEW_LV_JS, "list view: scroll-driven active row + card")

# --------------------------------------------- write + final assertions
pathlib.Path(F).write_text(html, encoding="utf-8")
routes = set(re.findall(r'data-route="([^"]+)"', html))
for r in ["/work/visitor-from-mars", "/work/gen-sadiq", "/work/tbogd"]:
    assert r in routes, f"route {r} missing"
print(f"wrote {F} ({len(html):,} chars)")
print("\n".join(log))











