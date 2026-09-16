# extend_build_v4.py — v3.5: work wheel (Brand Appart posture), capability/approach/about depth.
import pathlib, re, sys

P = pathlib.Path("index.html")
html = P.read_text(encoding="utf-8")
orig = html
fails = []

def rep(old, new, label, expect=1):
    global html
    n = html.count(old)
    if n != expect:
        fails.append(f"{label}: anchor found {n}x (expected {expect})")
        return
    html = html.replace(old, new, expect)

# ---------- 1. strip the work intro block + filter chips ----------
rep('''    <div class="page-head" >
      <div class="idx"><span class="kicker">02 / WORK &mdash; COMPLETE INDEX</span><span class="kicker">2023 &mdash; 2026</span></div>
      <h1>Work</h1>
      <p class="lede">The homepage shows the selection. This is the depth behind it &mdash; the full index, creative archive included. Fifteen destinations and growing.</p>
      <p class="count" id="workCount" style="margin-top:16px">SHOWING 10 OF 10</p>
    </div>
''', '', "work intro block")

filters = re.search(r'    <div class="filter-row" role="group" aria-label="Filter work">.*?</div>\n', html, re.DOTALL)
if filters and 'data-cat="ALL"' in filters.group(0):
    html = html.replace(filters.group(0), '', 1)
else:
    fails.append("work filter-row: anchor not found")

# ---------- 2. logo picker lockup + new hint ----------
rep('''    <div class="index-view">
      <div class="idx-list" id="idxList"></div>''',
'''    <div class="index-view">
      <button type="button" class="pick-lockup" id="pickLogo" aria-label="Open the selected project" title="PICK &mdash; OPEN THE SELECTED PROJECT"><span class="pl-mark">h.</span><span class="pl-x">&times;</span></button>
      <div class="idx-list" id="idxList"></div>''', "pick lockup html")

rep('<p class="idx-hint">SELECT A ROW TO OPEN THE FULL CASE &mdash; YEAR &amp; SECTOR ON THE RIGHT</p>',
    '<p class="idx-hint">SCROLL TO MOVE THE PROJECTS &mdash; THE MARK PICKS &mdash; CLICK A NAME TO OPEN ITS CASE</p>',
    "idx hint")

# ---------- 3. pill floats permanently (all widths, not just desktop) ----------
rep('''/* ---------- view pill floats bottom-centre while /work is active (desktop) ---------- */
@media (min-width: 1000px) {
  body[data-route="/work"] .view-toggle { height: 0; margin: 0; }
  body[data-route="/work"] .view-toggle .pill {
    position: fixed; left: 50%; bottom: 18px; transform: translateX(-50%);
    z-index: 80; margin: 0;
  }
}''',
'''/* ---------- v3.5: view pill floats bottom-centre permanently while /work is active ---------- */
body[data-route="/work"] .view-toggle { height: 0; margin: 0; }
body[data-route="/work"] .view-toggle .pill {
  position: fixed; left: 50%; bottom: 18px; transform: translateX(-50%);
  z-index: 80; margin: 0;
}
@media (max-width: 900px) {
  body[data-route="/work"] .view-toggle .pill { bottom: 12px; }
}''', "pill float css")

# ---------- 4. no hover highlighting on the wheel ----------
rep('.idx-row:hover .meta .go, .idx-row[aria-current="true"] .meta .go { opacity: 1; }',
    '.idx-row[aria-current="true"] .meta .go { opacity: 1; }', "hover css 1")
rep('''.idx-row:hover .ghost, .idx-row:focus-visible .ghost,
.idx-row[aria-current="true"] .ghost { display: none; }
.idx-row:hover .solid, .idx-row:focus-visible .solid,
.idx-row[aria-current="true"] .solid { display: block; }''',
'''.idx-row:focus-visible .ghost,
.idx-row[aria-current="true"] .ghost { display: none; }
.idx-row:focus-visible .solid,
.idx-row[aria-current="true"] .solid { display: block; }''', "hover css 2")
rep('''.idx-row:hover .meta, .idx-row:focus-visible .meta,
.idx-row[aria-current="true"] .meta { opacity: 1; }''',
'''.idx-row:focus-visible .meta,
.idx-row[aria-current="true"] .meta { opacity: 1; }''', "hover css 3")
rep('.idx-row:hover .meta .go, .idx-row[aria-current="true"] .meta .go { opacity: 1; transform: none; }',
    '.idx-row[aria-current="true"] .meta .go { opacity: 1; transform: none; }', "hover css 4")

# ---------- 5. JS: kill hover machinery, add the picker ----------
rep('''      var curRow = null, hovering = false;''',
    '''      var curRow = null;''', "js hovering var")
rep('''      listHost.addEventListener("mousemove", function (e) {
        var row = e.target.closest(".idx-row");
        if (!row) { hovering = false; return; }
        hovering = true;
        setActive(row, true);
      }, { passive: true });
      listHost.addEventListener("mouseleave", function () {
        hovering = false;
        setActive(scrollActive(), true);
      });
''', '', "js hover listeners")
rep('''          if (!hovering) { setActive(scrollActive(), true); }
          else if (curRow) { placeCard(curRow); }''',
'''          setActive(scrollActive(), true);''', "js scroll handler")

rep('''  /* work index filters — only real taxonomy, nothing invented */
  var workPage = document.getElementById("page-work");
  if (workPage) {
    var chips = $$(".fchip", workPage);
    var applyFilter = function (cat) {
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c.getAttribute("data-cat") === cat)); });
      var n = 0;
      $$("[data-cats]", workPage).forEach(function (el) {
        var cats = (el.getAttribute("data-cats") || "").split(",");
        var show = cat === "ALL" || cats.indexOf(cat) > -1;
        el.classList.toggle("is-hidden", !show);
        if (show) { n++; }
      });
      var visRows = $$(".idx-row", workPage).filter(function (r) { return !r.classList.contains("is-hidden"); });
      visRows.forEach(function (r, i2) { r.setAttribute("aria-current", String(i2 === 0)); });
      var cnt = document.getElementById("workCount");
      if (cnt) {
        var els = $$(".wcard", workPage);
        var shown = els.filter(function (el) { return !el.classList.contains("is-hidden"); }).length;
        cnt.textContent = "SHOWING " + shown + " OF " + els.length + " PROJECTS";
      }
    };
    chips.forEach(function (c) { c.addEventListener("click", function () { applyFilter(c.getAttribute("data-cat")); }); });
    applyFilter("ALL");
  }''',
'''  /* v3.5 — filters retired: the wheel is the index. The mark (logo picker)
     selects the project the wheel has parked on. */
  if (document.getElementById("page-work")) {
    var pickLogo = document.getElementById("pickLogo");
    if (pickLogo) {
      pickLogo.addEventListener("click", function () {
        var act = document.querySelector('#idxList .idx-row[aria-current="true"]') ||
                  document.querySelector("#idxList .idx-row");
        if (act) { location.hash = (act.getAttribute("href") || "#/work").slice(1); }
      });
    }
  }''', "js filter block -> picker")

# ---------- 6. capabilities depth (Brand Appart industries posture) ----------
CAPS = {
 "brand-identity": {
  "stats": [("15+", "identity systems &amp; mark sets shipped"), ("2020", "the year the first one went out"),
            ("4 yrs", "inside the brand's own operations"), ("1", "enterprise pitch, unprompted")],
  "why_h": "An identity is a system, not a logo.",
  "why_p1": "A mark without specifications is a drawing. The identities built here are systems: mark, type, colour and voice specified tightly enough that the next person executes without guessing. That standard exists because it was tested where identity failure is expensive &mdash; inside an enterprise operation, where every inconsistent touchpoint becomes a support ticket or a compliance query.",
  "why_p2": "The strongest proof is an unprompted one: a full brand-extension pitch for Leadway Pensure, one of Nigeria&rsquo;s largest pension funds &mdash; identity guidelines, product redesigns, a social system and a brand voice &mdash; built on four years of operational experience inside the organisation and delivered as a live web document rather than a static deck.",
  "svc": [("Identity guidelines", "Mark, type, colour and usage specified for real teams &mdash; not a brand book that dies in a drive."),
          ("Brand voice", "Voice definitions and copy frameworks that keep the brand coherent across product, social and correspondence."),
          ("Social content systems", "Templates and rhythm that survive contact with a busy week &mdash; built, used and proved on live channels."),
          ("Editorial &amp; art direction", "Cover art, image systems and the composition rules that make a body of work read as one hand.")],
  "faq": [("Do you do logo-only work?", "Rarely. A logo without the system around it can&rsquo;t hold up in use &mdash; and use is the whole point. Small scope, yes; shallow scope, no."),
          ("Can you work inside an existing identity?", "Yes. Several engagements extend or repair an existing system &mdash; auditing what&rsquo;s there, standardising what drifted, specifying what&rsquo;s missing."),
          ("What does &ldquo;shipped with the product&rdquo; mean?", "The identity is delivered in the medium it lives in &mdash; live web documents, working templates, production files &mdash; not a PDF that dies in a drawer.")]
 },
 "product-design": {
  "stats": [("3", "products designed &amp; shipped solo"), ("1", "site a patient scans in seconds"), ("40+", "cuisines in a suggestion UI"), ("18", "stages of pipeline made navigable")],
  "why_h": "Interfaces designed to be shipped, not framed.",
  "why_p1": "Product design fails in the gap between the drawing and the build. Here there is no gap: the person who designs the interface writes the code that renders it, so every decision survives contact with production. Mockups that can&rsquo;t be built don&rsquo;t leave the sketchbook.",
  "why_p2": "The proof runs live: a Telegram assistant whose layered memory you can inspect and erase, an AI kitchen companion that inventories your kitchen through plain chat, a healthcare site six services deep that a patient can scan in seconds. Each one was designed, built and shipped by the same pair of hands &mdash; and each one behaves in production exactly as drawn.",
  "svc": [("Product interface design", "Dashboards, tools and app UI &mdash; designed for the decision the user has to make in under thirty seconds."),
          ("Marketing &amp; client sites", "Single-purpose sites built to carry one message cleanly &mdash; then deployed, not just delivered."),
          ("Conversational UX", "Telegram-first products where the chat is the interface: no forms, no dashboards, just conversation."),
          ("Design systems &amp; specs", "Tokens, components and states documented tightly enough that even a future you can&rsquo;t get it wrong.")],
  "faq": [("Do you hand off to engineers?", "Usually there&rsquo;s nobody to hand off to &mdash; I build what I draw. When a client has their own developers, I ship specs and systems they can execute without me in the room."),
          ("Figma only, or code?", "Both, in sequence. The design exists to be built, and the build is how the design gets tested."),
          ("How do you validate a design?", "By shipping it to real users. A live product with real behaviour beats a hallway test with a clickable prototype.")]
 },
 "software": {
  "stats": [("2", "production assistants in daily use"), ("0", "handoffs between design and deploy"), ("2am", "the hour support still gets answered"), ("100%", "of this site, hand-built")],
  "why_h": "The build is where design gets tested.",
  "why_p1": "Software that ships behaves differently from software that demos. Building the product yourself means the design decisions are made with production in view &mdash; state handling, error paths, the boring code that keeps a thing running on a bad day.",
  "why_p2": "The practice runs on the tools it sells: Biscuit AI (a Telegram assistant on OpenRouter with inspectable, erasable memory), Chef4Me (a Gemini-powered kitchen assistant), Relay (an operations portal whose audit trail the database itself enforces) &mdash; and this site, hash-routed, zero-dependency and served from the edge. All designed, built and operated by one pair of hands.",
  "svc": [("Production web apps", "Full-stack builds that go from schema to deployment &mdash; not prototypes that die at the demo."),
          ("Telegram &amp; chat products", "Assistants that live where the user already is, wired to real model providers and real cost visibility."),
          ("Internal tools &amp; portals", "The unglamorous software an operation actually runs on &mdash; pipelines, trackers, audit trails."),
          ("Deployment &amp; operations", "DNS, hosting, logs and the 2am answer. The product is finished when it runs, not when the repo looks done.")],
  "faq": [("What&rsquo;s the stack?", "Python for AI and automation, JavaScript for the web, whatever the deployment target demands. The stack is chosen per product, not per fashion."),
          ("Who maintains it after launch?", "I do &mdash; or your team does, with documentation written for humans. Maintenance is scoped at the start, not discovered in a crisis."),
          ("Can you take over an existing codebase?", "Yes. Relay was inherited mid-build. The audit-then-improve pattern is the same whether the mess is mine or not.")]
 },
 "ai-systems": {
  "stats": [("2", "production assistants, daily use"), ("3", "model providers wired in production"), ("11", "modules in the literacy programme"), ("1", "memory you can inspect and erase")],
  "why_h": "AI that earns its place in the workflow.",
  "why_p1": "Most AI features are demos wearing a lanyard. The test is harder: does the assistant survive month two, when the novelty is gone and only usefulness remains? That demands boring discipline &mdash; memory that behaves, costs that are visible, and answers you can check.",
  "why_p2": "Biscuit AI&rsquo;s memory is structured in layers that can be opened, read and wiped from inside the chat itself &mdash; because trust in an assistant you can&rsquo;t inspect is misplaced. Chef4Me suggests meals from the live inventory through plain commands, because the interface cost of telling the truth about your kitchen has to be zero. Both are wired to real providers (OpenRouter, Google Gemini, Tavily) with costs surfaced, not hidden.",
  "svc": [("Assistant development", "Telegram-native assistants with layered memory, web search and cost visibility &mdash; in production, not in a pitch."),
          ("AI integration", "Model wiring (OpenRouter, Gemini, Tavily) tuned per task: the right model at the right price for the right job."),
          ("AI literacy programmes", "The eleven-module, company-wide programme delivered at Birdview &mdash; from first prompt to evaluation rubrics."),
          ("AI evaluation", "Rubrics and monitoring that make model output a measurable thing, so quality is argued with data, not vibes.")],
  "faq": [("Which models do you use?", "Whichever the task demands: OpenRouter for multi-model routing, Google Gemini for the kitchen, Tavily for search. Provider choice is an engineering decision, not a sponsorship."),
          ("How do you handle running costs?", "Costs are surfaced inside the product itself. Usage should be a decision, never a surprise on an invoice."),
          ("Can you train our team on it?", "Yes &mdash; an eleven-module literacy programme has already run company-wide. Training is a capability, not an afterthought.")]
 },
 "automation": {
  "stats": [("18", "stages in one live client pipeline"), ("250+", "clients managed on the system"), ("10,000+", "end-clients moved to self-service"), ("4 yrs", "running the ops, not just visiting")],
  "why_h": "Automation that operations actually keeps.",
  "why_p1": "Automation built by visitors gets deleted by operators. The builds that last are designed by people who have run the process themselves &mdash; who know which step the team skips on a Friday and which exception the spreadsheet was quietly absorbing for years.",
  "why_p2": "Four years inside the operations of one of Nigeria&rsquo;s largest pension funds built the reflex: before automating a process, run it. The results are still live &mdash; 10,000+ end-clients moved to self-service channels, and at Birdview an AI-assisted CRM spanning an 18-stage client pipeline carrying 250+ clients, with the process documentation and audit trails an operation needs to trust it.",
  "svc": [("Workflow automation", "The repetitive paths an operation walks daily &mdash; automated with the team&rsquo;s habits in view, not against them."),
          ("CRM &amp; pipeline systems", "Stage-driven client pipelines with the data model doing the enforcement, not the discipline of the staff."),
          ("Process documentation", "The written system behind the built system &mdash; so the operation survives any single person&rsquo;s absence."),
          ("Audit trails &amp; data hygiene", "Records the database itself enforces, so the question &ldquo;who changed this, and when?&rdquo; always has an answer.")],
  "faq": [("Do you automate broken processes?", "No &mdash; automating a broken process just breaks faster. The process gets repaired first, then the software carries it."),
          ("What tools do you build on?", "Whatever the operation already runs, extended where needed. The tool is chosen for the team, not the résumé."),
          ("Who owns the system after you leave?", "You do, with the documentation to prove it. Dependency is a design failure, not a business model.")]
 },
 "creative-direction": {
  "stats": [("2", "EP releases, creative-lead to release"), ("6+", "cover artworks in the archive"), ("2", "films shot, cut and scored"), ("10", "tracks streaming from this site")],
  "why_h": "Image is a brand asset, not decoration.",
  "why_p1": "Creative direction is deciding what a body of work says before anyone decides what it looks like. The practice was trained in music &mdash; where the image has to carry the sound and release is a deadline, not a suggestion &mdash; and that discipline carries into every brand project.",
  "why_p2": "The archive proves the range: two EPs creative-lead, co-produced and released (Bedroom Recordings II with YE!!OWSOUL; Visitor from Mars with The Beatoven), a four-single cover-art series where each cover is a world for its record, and a commissioned round-up film for Leadway&rsquo;s Customer Service Week 2024 &mdash; shot, directed, cut and scored by one pair of hands.",
  "svc": [("Art direction", "The through-line for a body of work &mdash; the one idea every asset obeys."),
          ("Film", "Shot, produced, directed, cut and scored end to end &mdash; promo films and round-ups that carry a brand&rsquo;s voice in motion."),
          ("Music release packages", "Cover art, tracklists and rollout rhythm for records &mdash; from cassette sleeve to streaming."),
          ("Campaign visuals", "Key art and image systems that hold a campaign together across formats.")],
  "faq": [("Do you shoot the footage yourself?", "Yes &mdash; the CSW 2024 film was shot on site, b-roll included, then cut and scored in-house. One pair of hands, start to finish."),
          ("Music production too?", "Yes &mdash; co-production credits on two released EPs. The sound system on this site streams the real masters."),
          ("One-off or series?", "Series thinking, wherever possible &mdash; four singles became a cover-art series because a world per record is stronger than a picture per track.")]
 },
 "graphic-design": {
  "stats": [("4", "singles, four worlds, one series"), ("2", "physical release packages designed"), ("1", "training deck from scratch"), ("&infin;", "the grid that keeps it honest")],
  "why_h": "Composition is the oldest craft in the room.",
  "why_p1": "Every capability on this site stands on this one. Cover art, editorial layout, deck design &mdash; the discipline of making information carry feeling without losing clarity. It was the first skill, and it never left.",
  "why_p2": "Recent proof: the Bedroom Recordings II cassette and tracklist package, the four-single cover series for Blvck Oreo (each cover a self-contained world for its record), the lyric and promo videos for Gen.Sadiq&rsquo;s Maradonna &mdash; signed off by the artist and his manager in the first round &mdash; and The Basics of Graphic Design, a training deck that teaches the craft itself.",
  "svc": [("Cover art &amp; packaging", "Single covers, cassette sleeves and tracklists &mdash; the artwork a record deserves, print-ready."),
          ("Editorial &amp; decks", "Pitch decks and training material composed to be followed, not admired &mdash; the Leadway pitch is the flagship."),
          ("Promo &amp; lyric visuals", "Beat-locked promo films and lyric videos built for release day, not just the archive."),
          ("Archive &amp; systems", "Cover series designed to compound &mdash; each new release extending the world, not restarting it.")],
  "faq": [("Print as well as digital?", "Yes &mdash; the BR2 cassette package was designed for physical release first. Print discipline makes digital work look expensive."),
          ("What&rsquo;s the turnaround on a single cover?", "Fast &mdash; the Maradonna package (cover, promo film, lyric video) was commissioned and signed off in the first round."),
          ("Where&rsquo;s the wider archive?", "The graphic-design archive beyond the site lives on Behance &mdash; linked from the Singles &amp; Cover Art case.")]
 },
 "training": {
  "stats": [("11", "modules in the AI programme"), ("2", "training builds, shipped live"), ("1", "web hub carrying a full curriculum"), ("90 min", "one session, one working skill")],
  "why_h": "Training that survives the trainer leaving.",
  "why_p1": "Training fails when it depends on the trainer staying in the room. The programmes built here are designed for the opposite: curricula with their own logic, hubs that carry the material after the session ends, and skills employees can rehearse without supervision.",
  "why_p2": "Two builds prove the pattern. The Basics of Graphic Design: a from-scratch curriculum teaching composition itself &mdash; grid, type, hierarchy &mdash; as a deck that teaches. AI in the Workplace: an eleven-module, company-wide AI literacy programme (delivered at Birdview) with its own web hub &mdash; curriculum, flashcards, slides and a live assessment path. The client&rsquo;s operations signed off the result.",
  "svc": [("AI literacy programmes", "Company-wide training from first prompt to evaluation &mdash; eleven modules, built and delivered."),
          ("Curriculum design", "Course structure, pacing and assessment built like a product: each module earns the next."),
          ("Facilitation", "Live sessions taught by the person who wrote the material &mdash; no relay of someone else&rsquo;s slides."),
          ("Web hubs", "The training lives on after the session: a hub carrying curriculum, flashcards and slides on one link.")],
  "faq": [("Who is the training for?", "Non-technical teams who have to live with AI systems, and operators who have to run them. Both programmes were built for real workplaces, not conference audiences."),
          ("Can it be branded for our company?", "Yes &mdash; the Birdview programme was delivered inside the client&rsquo;s operation, on their material, with their examples."),
          ("Is the material available after the sessions?", "Always. AI in the Workplace runs on a live web hub &mdash; one link carries the whole curriculum.")]
 }
}

def enrich_cap(slug, d):
    global html
    start = html.find(f'data-route="/capabilities/{slug}"')
    if start < 0:
        fails.append(f"cap {slug}: route not found"); return
    end = html.find('data-route="', start + 10)
    seg = html[start:end]
    stats_html = "".join(f"<div><b>{b}</b><span>{s}</span></div>" for b, s in d["stats"])
    svc_html = "".join(f'<div class="cap-svc"><span class="no">0{i+1}</span><div><b>{n}</b><p class="b">{desc}</p></div></div>'
                       for i, (n, desc) in enumerate(d["svc"]))
    faq_html = "".join(f"<details><summary>{q}</summary><p class=\"b\">{a}</p></details>" for q, a in d["faq"])
    enrich = ('<div class="cap-detail"><div class="side"><span class="k">THE NUMBERS</span></div>'
              f'<div class="main"><div class="cap-stats">{stats_html}</div></div></div>'
              '<div class="cap-detail"><div class="side"><span class="k">WHY IT MATTERS</span></div>'
              f'<div class="main"><div class="blk"><h3>{d["why_h"]}</h3><p class="b">{d["why_p1"]}</p></div>'
              f'<div class="blk"><p class="b">{d["why_p2"]}</p></div></div></div>'
              '<div class="cap-detail"><div class="side"><span class="k">WHAT I BUILD</span></div>'
              f'<div class="main">{svc_html}</div></div>')
    faq_block = ('<div class="cap-detail"><div class="side"><span class="k">QUESTIONS I ACTUALLY GET</span></div>'
                 f'<div class="main"><div class="cp-faq">{faq_html}</div></div></div>')
    a1 = '<div class="cap-detail"><div class="side"><span class="k">RELEVANT WORK</span></div>'
    a2 = '<div class="cap-detail"><div class="side"><span class="k">START</span></div>'
    if a1 not in seg or a2 not in seg:
        fails.append(f"cap {slug}: insertion anchors missing"); return
    seg = seg.replace(a1, enrich + a1, 1).replace(a2, faq_block + a2, 1)
    html = html[:start] + seg + html[end:]

for slug, data in CAPS.items():
    enrich_cap(slug, data)

# ---------- 7. approach depth (Brand Appart expertise posture) ----------
rep('''      <div class="pos-grid" style="margin-top:48px">''',
'''      <div class="sec-head" style="margin-top:64px"><div class="idx"><span class="kicker">THE ARGUMENT</span><span class="kicker">WHY ONE PAIR OF HANDS</span></div></div>
      <div class="measure"><p class="hc-body claim">The handoff is the bug.</p></div>
      <div class="cap-detail" style="border-top:0;margin-top:24px"><div class="side"><span class="k">THE CASE</span></div><div class="main"><div class="blk"><p class="b">Most projects don&rsquo;t fail at the idea stage &mdash; they fail in translation. Designer to engineer. Strategy to build. Vision to production. Every handoff is a game of whispers, and the details that make the work good are the first things dropped, because the person dropping them never knew they mattered.</p></div><div class="blk"><p class="b">HABIBCORE is structured so there is nothing to translate. The person who draws the interface writes the code that renders it. The person who defines the voice writes the copy that carries it. When something breaks at 2am, the same person who made it fixes it &mdash; no intermediary, no ticket queue, no &ldquo;let me check with the team.&rdquo;</p></div><div class="blk"><p class="b">That isn&rsquo;t a hustle flex; it&rsquo;s quality control. Fewer hands means fewer places for intent to leak out of the work &mdash; and it is why the case studies on this site read as shipped products, not proposals.</p></div></div></div>
      <div class="pos-grid" style="margin-top:48px">''', "approach argument")

rep('''      <div class="sec-head" style="margin-top:64px"><div class="idx"><span class="kicker">OWNERSHIP</span><span class="kicker">FOLLOW-THROUGH</span></div></div>''',
'''      <div class="sec-head" style="margin-top:64px"><div class="idx"><span class="kicker">OPERATING PRINCIPLES</span><span class="kicker">WHAT THE WORK OBEYS</span></div></div>
      <div class="range-index">
        <div class="index-row"><span class="no">I</span><span class="name">ONE BRIEF, ONE HEAD.</span><span class="meta">THE IDEA AND THE BUILD SHARE A SKULL. NOTHING GETS SIMPLIFIED ON ITS WAY FROM SKETCH TO CODE, BECAUSE NOTHING TRAVELS.</span></div>
        <div class="index-row"><span class="no">II</span><span class="name">SYSTEMS BEFORE SURFACES.</span><span class="meta">STRUCTURE FIRST: IDENTITY, ARCHITECTURE, DATA MODEL. SURFACE IS THE LAST DECISION, NOT THE FIRST.</span></div>
        <div class="index-row"><span class="no">III</span><span class="name">EVIDENCE OVER ADJECTIVES.</span><span class="meta">EVERY CLAIM ON THIS SITE LINKS TO A SHIPPED THING. IF THE WORK CAN&rsquo;T CARRY THE SENTENCE, THE SENTENCE GOES.</span></div>
        <div class="index-row"><span class="no">IV</span><span class="name">OWNERSHIP DOESN&rsquo;T END AT LAUNCH.</span><span class="meta">SHIP IS A MILESTONE. THE PRODUCT IS ANSWERABLE AFTER IT &mdash; AND SO IS THE PERSON WHO MADE IT.</span></div>
      </div>
      <div class="sec-head" style="margin-top:64px"><div class="idx"><span class="kicker">OWNERSHIP</span><span class="kicker">FOLLOW-THROUGH</span></div></div>''', "approach principles")

rep('''      <p style="margin-top:24px"><a class="tlink" href="#/work">See the approach applied &mdash; the work &rarr;</a></p>''',
'''      <div class="sec-head" style="margin-top:64px"><div class="idx"><span class="kicker">QUESTIONS I ACTUALLY GET</span><span class="kicker">PROCESS</span></div></div>
      <div class="cp-faq" style="margin-top:24px">
        <details><summary>Do you ever hand off to developers?</summary><p class="b">Only by request. The default is that the person who designed it builds it &mdash; that&rsquo;s the whole quality argument. When a client has their own team, I ship specs and systems they can execute without me in the room.</p></details>
        <details><summary>What do you need from me to start?</summary><p class="b">The problem, in plain language &mdash; what&rsquo;s broken, what &ldquo;done&rdquo; looks like, and what it currently costs you. The brief gets sharpened together; the process below takes over from there.</p></details>
        <details><summary>Can you work with our existing brand or product?</summary><p class="b">Yes. Several engagements were extensions or repairs of existing systems &mdash; audit first, then standardise what drifted and specify what&rsquo;s missing. Relay was inherited mid-build.</p></details>
      </div>
      <p style="margin-top:24px"><a class="tlink" href="#/work">See the approach applied &mdash; the work &rarr;</a></p>''', "approach faq")

# ---------- 8. about depth (Brand Appart about posture) ----------
rep('''      <div class="sec-head" style="margin-top:64px"><div class="idx"><span class="kicker">06 / PATH</span><span class="kicker">2020 &mdash; NOW</span></div></div>''',
'''      <div class="sec-head" style="margin-top:64px"><div class="idx"><span class="kicker">WHY THIS EXISTS</span><span class="kicker">THE OPERATOR&rsquo;S CASE</span></div></div>
      <div class="measure" style="margin-top:24px">
        <p class="hc-body claim-soft">Most work loses something between the drawing and the shipping. I removed the distance. The person who designs the interface is the person who writes the code, deploys it, and answers the email when something breaks at 2am &mdash; the same pair of hands from first sketch to production logs.</p>
        <p class="hc-body claim-soft">The path here isn&rsquo;t a straight agency line: graphic design and creative direction first, then four years inside the operations of one of Nigeria&rsquo;s largest pension funds building the automation that keeps real work moving, then products designed and shipped solo, end to end. Each step made the next one possible &mdash; and each one left proof.</p>
        <p class="hc-body claim-soft">Clients don&rsquo;t buy deliverables here. They buy the absence of translation loss: one brief, one conversation, one person answerable for all of it. That is the whole pitch &mdash; every case on this site is the evidence.</p>
      </div>
      <div class="sec-head" style="margin-top:64px"><div class="idx"><span class="kicker">HOW I EMBED</span><span class="kicker">WORKING WITH HABIBCORE</span></div>
      <p class="hc-body claim-soft measure">I slot into your operation, not beside it &mdash; the way the Birdview engagement ran for years: plug-and-play, in your context, on your material.</p></div>
      <div class="meta-grid">
        <div><div class="k">YOUR TOOLS</div><div class="v">Figma, Telegram, Google Workspace, the stack you already run &mdash; I come to you.</div></div>
        <div><div class="k">YOUR RITUALS</div><div class="v">Weekly reviews, async updates, no surprise handoffs.</div></div>
        <div><div class="k">YOUR ROADMAP</div><div class="v">Design and build shipped in step with your sprints and your raise.</div></div>
        <div><div class="k">ONE PAIR OF HANDS</div><div class="v">A single voice start to finish &mdash; the person you brief is the person who ships.</div></div>
      </div>
      <div class="sec-head" style="margin-top:64px"><div class="idx"><span class="kicker">06 / PATH</span><span class="kicker">2020 &mdash; NOW</span></div></div>''', "about letter + embed")

rep('''      <p class="bd hc-body">CRM builds, process automation, AI training &mdash; and products designed and shipped solo, end to end.</p>
    </div>
  </section>''',
'''      <p class="bd hc-body">CRM builds, process automation, AI training &mdash; and products designed and shipped solo, end to end.</p>
    </div>
    <div class="sec-head" style="margin-top:64px"><div class="idx"><span class="kicker">THE MANIFESTO</span><span class="kicker">WHAT THE PRACTICE BELIEVES</span></div></div>
    <div class="range-index">
      <div class="index-row"><span class="no">I</span><span class="name">DESIGN IS THE PRIMARY WORK.</span><span class="meta">THE ABILITY TO BUILD IT IS WHAT MAKES IT REAL. A DESIGN THAT CAN&rsquo;T SURVIVE PRODUCTION WASN&rsquo;T FINISHED.</span></div>
      <div class="index-row"><span class="no">II</span><span class="name">THE HANDOFF IS WHERE PROJECTS DIE.</span><span class="meta">SO THE HANDOFF WAS REMOVED. STRATEGY, IDENTITY, BUILD AND SHIP RUN IN ONE CONVERSATION, DOWN TO THE LAST SCREEN.</span></div>
      <div class="index-row"><span class="no">III</span><span class="name">SYSTEMS OVER ONE-OFFS.</span><span class="meta">AN IDENTITY SPECIFIED TIGHTLY ENOUGH THAT THE NEXT PERSON EXECUTES WITHOUT GUESSING. A PRODUCT DOCUMENTED SO THE NEXT MAINTAINER ISN&rsquo;T ME.</span></div>
      <div class="index-row"><span class="no">IV</span><span class="name">EVIDENCE OVER ADJECTIVES.</span><span class="meta">PORTFOLIO LANGUAGE IS CHEAP. LIVE URLS, PLAYABLE MASTERS AND RUNNING OPERATIONS ARE THE ONLY PROOF THAT COUNTS.</span></div>
      <div class="index-row"><span class="no">V</span><span class="name">BUILT FOR HUMANS, ANSWERABLE IN PRODUCTION.</span><span class="meta">THE WORK ISN&rsquo;T DONE WHEN IT LOOKS RIGHT. IT&rsquo;S DONE WHEN IT RUNS RIGHT &mdash; AND KEEPS RUNNING.</span></div>
    </div>
    <div class="sec-head" style="margin-top:64px"><div class="idx"><span class="kicker">WORD OF MOUTH</span><span class="kicker">UNSOLICITED</span></div></div>
    <div class="cap-detail" style="border-top:0;margin-top:24px"><div class="side"><span class="k">GEN.SADIQ — ARTIST</span></div><div class="main"><div class="blk"><p class="b">&ldquo;He heard the song once and came back with a cover that looks exactly how it sounds. Me and my manager didn&rsquo;t ask for a single change.&rdquo;</p></div><p class="b" style="margin-top:12px"><a class="tlink" href="#/work/gen-sadiq">The Maradonna package &rarr;</a></p></div></div>
    <div class="cap-detail"><div class="side"><span class="k">TRUSTED INSIDE</span></div><div class="main"><ul class="tags"><li>Leadway Pensure — 4 years in operations</li><li>Birdview — 250+ clients on built systems</li><li>Olumayowa Nursing Home — live site</li><li>YE!!OWSOUL &amp; The Beatoven — released records</li></ul></div></div>
  </section>''', "about manifesto + word of mouth")

# ---------- 9. CSS for the new pieces ----------
rep('''/* ---------- consent gate: float above the bottom chrome (dock chip, pill) ---------- */''',
'''/* ---------- v3.5: capability depth + logo picker ---------- */
.cap-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--hc-space-24) var(--hc-space-16); }
.cap-stats b { display: block; font: 600 clamp(22px, 2.4vw, 34px)/1.05 var(--hc-font-sans); color: var(--hc-ink); }
.cap-stats span { display: block; margin-top: 8px; font: 500 9px var(--hc-font-mono); letter-spacing: .18em; color: rgb(var(--hc-ink-rgb) / .55); text-transform: uppercase; }
.cap-svc { display: grid; grid-template-columns: 44px 1fr; gap: var(--hc-space-12); padding: var(--hc-space-16) 0; border-top: 1px solid rgb(var(--hc-ink-rgb) / .12); }
.cap-svc:first-child { border-top: 0; padding-top: 0; }
.cap-svc .no { font: 500 11px var(--hc-font-mono); color: rgb(var(--hc-ink-rgb) / .45); padding-top: 3px; }
.cap-svc b { display: block; margin-bottom: 6px; }
.pick-lockup { position: fixed; left: clamp(40px, 7vw, 150px); top: 50%; transform: translateY(-50%); z-index: 70; display: none; align-items: center; gap: 16px; background: none; border: 0; padding: 8px; cursor: pointer; }
#work[data-workview="index"] .pick-lockup { display: inline-flex; }
.pl-mark { display: inline-grid; place-items: center; width: 58px; height: 40px; border: 2px solid var(--hc-ink); border-radius: 999px; font: 700 17px/1 var(--hc-font-sans); color: var(--hc-ink); transition: background var(--hc-dur-micro) var(--hc-ease-out), color var(--hc-dur-micro) var(--hc-ease-out); }
.pl-x { font: 400 15px var(--hc-font-mono); color: rgb(var(--hc-ink-rgb) / .6); }
.pick-lockup:hover .pl-mark, .pick-lockup:focus-visible .pl-mark { background: var(--hc-ink); color: var(--hc-paper); }
@media (max-width: 999px) { .pick-lockup { display: none !important; } }

/* ---------- consent gate: float above the bottom chrome (dock chip, pill) ---------- */''', "v35 css")

# ---------- 10. build chip bump ----------
rep('BUILD v3.4 — PORTED', 'BUILD v3.5 — PORTED', "build chip")

if fails:
    print("FAILED PATCHES:")
    print("\n".join(" - " + f for f in fails))
    sys.exit(1)

P.write_text(html, encoding="utf-8")
print(f"OK — index.html: {len(orig)} -> {len(html)} chars ({len(html)-len(orig):+d})")
