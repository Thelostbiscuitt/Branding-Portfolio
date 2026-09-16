# rebuild_approach_v39.py - v3.9: approach page in the industries posture (v3.8 grammar),
# with every step / plate / principle wired to the shipped project that proves it.
import pathlib, re, sys

P = pathlib.Path("index.html")
html = P.read_text(encoding="utf-8")
orig = html
fails = []

start = html.find('data-route="/approach"')
if start < 0:
    fails.append("approach route not found")
else:
    seg_end = html.find('data-route="', start + 10)
    seg = html[start:seg_end]
    cut = seg.rfind("</section></div>")
    if cut < 0:
        fails.append("approach segment tail not found"); seg = None
    else:
        pad = seg[cut + len("</section></div>"):]  # next page's '<div class="page " '
        seg = seg[:cut]

if not fails:
    lede = re.search(r'<p class="lede">(.*?)</p>', seg, re.DOTALL)
    case_i = seg.find('THE CASE')
    case_j = seg.find('THE STEPS', case_i)
    case_paras = re.findall(r'<p class="b">(.*?)</p>', seg[case_i:case_j], re.DOTALL)
    steps = re.findall(r'<div class="step rv"><span class="no">(\d+)</span><span class="nm">([^<]+)</span><p class="d hc-body">(.*?)</p></div>', seg)
    plates = re.findall(r'<div class="index-row" id="plate-\d"><span class="no">(\d+)</span><span class="name">([^<]+)</span><span class="meta">(.*?)</span></div>', seg)
    pr_i = seg.find('OPERATING PRINCIPLES')
    pr_j = seg.find('<span class="kicker">OWNERSHIP</span>', pr_i)
    principles = re.findall(r'<div class="index-row"><span class="no">([^<]+)</span><span class="name">([^<]+)</span><span class="meta">(.*?)</span></div>', seg[pr_i:pr_j])
    faq_a = seg.find('<div class="cp-faq')
    faq_a = seg.find('>', faq_a) + 1
    faq_b = seg.find('</div>', faq_a)
    faq = seg[faq_a:faq_b]
    pos_rows = re.findall(r'<a class="arrow-row" href="#/capabilities"><span>([^<]+)</span><span>&rarr;</span></a>', seg)

    if not lede or len(case_paras) != 3: fails.append(f"argument copy: lede={bool(lede)} paras={len(case_paras)}")
    if len(steps) != 5: fails.append(f"steps: {len(steps)}")
    if len(plates) != 5: fails.append(f"plates: {len(plates)}")
    if len(principles) != 4: fails.append(f"principles: {len(principles)}")
    if len(pos_rows) != 6: fails.append(f"pos rows: {len(pos_rows)}")
    if faq.count('<details>') != 3: fails.append(f"faq details: {faq.count('<details>')}")

if not fails:
    # evidence wiring: which shipped project proves which category (deep-dive mapping)
    step_ev = {
        "01": ("#/work/leadway-pensure", "PROOF: LEADWAY PENSURE"),
        "02": ("#/work/skaame", "PROOF: SKAAME"),
        "03": ("#/work/relay", "PROOF: RELAY"),
        "04": ("#/work/biscuit-ai", "PROOF: BISCUIT AI"),
        "05": ("#/work/olumayowa-nursing-home", "PROOF: OLUMAYOWA"),
    }
    plate_ev = {
        "01": ("#/work/leadway-pensure", "LEADWAY PENSURE"),
        "02": ("#/work/relay", "RELAY"),
        "03": ("#/work/biscuit-ai", "BISCUIT AI"),
        "04": ("#/work/olumayowa-nursing-home", "OLUMAYOWA"),
        "05": ("#/work/ai-in-the-workplace", "AI IN THE WORKPLACE"),
    }
    principle_ev = {
        "I": ("#/work/biscuit-ai", "PROOF: BISCUIT AI"),
        "II": ("#/work/relay", "PROOF: RELAY"),
        "III": ("#/work", "PROOF: THE FULL INDEX"),
        "IV": ("#/work/ai-in-the-workplace", "PROOF: AI IN THE WORKPLACE"),
    }
    # I DESIGN / I BUILD rows retargeted from the generic #/capabilities to the exact page
    pos_targets = ["#/capabilities/brand-identity", "#/capabilities/product-design",
                   "#/capabilities/creative-direction", "#/capabilities/software",
                   "#/capabilities/ai-systems", "#/capabilities/automation"]

    step_cards = "".join(
        f'<div class="cap-svc"><span class="no">{no}</span><div><b>{nm}</b><p class="b">{d}</p>'
        f'<a class="ev" href="{step_ev[no][0]}">{step_ev[no][1]} &rarr;</a></div></div>'
        for no, nm, d in steps)
    plate_rows = "".join(
        f'<a class="ev-row" href="{plate_ev[no][0]}"><span class="ev-no">{no}</span>'
        f'<span class="ev-main"><b class="ev-name">{nm}</b><span class="ev-desc">{meta}</span></span>'
        f'<span class="ev-link">{plate_ev[no][1]} &rarr;</span></a>'
        for no, nm, meta in plates)
    principle_cards = "".join(
        f'<div class="cap-svc"><span class="no">{no}</span><div><b>{nm}</b><p class="b">{meta}</p>'
        f'<a class="ev" href="{principle_ev[no][0]}">{principle_ev[no][1]} &rarr;</a></div></div>'
        for no, nm, meta in principles)
    pos_html = "".join(
        f'<a class="arrow-row" href="{pos_targets[i]}"><span>{lbl}</span><span>&rarr;</span></a>'
        for i, lbl in enumerate(pos_rows))

    pos_html = "".join(
        f'<a class="arrow-row" href="{pos_targets[i]}"><span>{lbl}</span><span>&rarr;</span></a>'
        for i, lbl in enumerate(pos_rows))
    pos_design = "".join(
        f'<a class="arrow-row" href="{pos_targets[i]}"><span>{pos_rows[i]}</span><span>&rarr;</span></a>'
        for i in range(3))
    pos_build = "".join(
        f'<a class="arrow-row" href="{pos_targets[i]}"><span>{pos_rows[i]}</span><span>&rarr;</span></a>'
        for i in range(3, 6))

    inner = f'''<section class="section wrap" aria-label="Approach">
        <div class="cap-hero">
          <div class="idx"><span class="kicker">04 / HOW I WORK</span><span class="kicker">IDEA &rarr; SHIP</span></div>
          <h1 class="cap-hero-h"><em>The handoff</em> is the bug.</h1>
          <p class="cap-sub">{lede.group(1)}</p>
          <a class="cap-cta" href="#/contact">BOOK A DISCOVERY CALL <span class="arr">&rarr;</span></a>
        </div>

        <section class="cap-sec" aria-label="The argument">
          <span class="kicker">THE ARGUMENT</span>
          <h2 class="cap-state-h"><em>Most projects fail</em> in translation, not in the idea.</h2>
          <div class="cap-cols cap-cols-3">
            <p class="b">{case_paras[0]}</p>
            <p class="b">{case_paras[1]}</p>
            <p class="b">{case_paras[2]}</p>
          </div>
          <div class="cap-ctarow">
            <a class="cap-btn" href="#/contact">BOOK A DISCOVERY CALL</a>
            <a class="cap-cta" href="#/work">VIEW THE WORK <span class="arr">&rarr;</span></a>
          </div>
        </section>

        <section class="cap-sec" aria-label="I design, I build">
          <span class="kicker">ONE PAIR OF HANDS</span>
          <h2 class="cap-state-h"><em>Two modes:</em> design and build.</h2>
          <div class="pos-grid">
            <div><div class="col-label">I DESIGN</div>{pos_design}</div>
            <div><div class="col-label">I BUILD</div>{pos_build}</div>
          </div>
        </section>

        <section class="cap-sec" aria-label="The steps">
          <div class="cap-center">
            <span class="kicker">THE STEPS</span>
            <h2 class="cap-state-h"><em>Five steps,</em> every project.</h2>
          </div>
          <div class="cap-cards">{step_cards}</div>
        </section>

        <section class="cap-sec" aria-label="The five plates">
          <div class="cap-center">
            <span class="kicker">THE FIVE PLATES</span>
            <h2 class="cap-state-h"><em>Every case study,</em> one spine.</h2>
          </div>
          <p class="cap-sub cap-sub-center">Substantial projects are documented on the same spine the identity system uses &mdash; so every case study reads the same way, at whatever depth the evidence supports. Each plate, seen in a shipped thing:</p>
          <div class="ev-stack">{plate_rows}</div>
        </section>

        <section class="cap-sec" aria-label="Operating principles">
          <div class="cap-center">
            <span class="kicker">OPERATING PRINCIPLES</span>
            <h2 class="cap-state-h"><em>What the work</em> obeys.</h2>
          </div>
          <div class="cap-cards">{principle_cards}</div>
        </section>

        <section class="cap-sec" aria-label="Questions">
          <span class="kicker">QUESTIONS I ACTUALLY GET</span>
          <div class="cp-faq">{faq}</div>
        </section>

        <section class="cap-close" aria-label="Ownership">
          <p class="cap-close-h"><em>One person answerable,</em> 2am included.</p>
          <a class="cap-btn" href="#/contact">START A PROJECT &rarr;</a>
          <a class="cap-cta cap-cta-center" href="#/work">SEE IT APPLIED &mdash; THE WORK <span class="arr">&rarr;</span></a>
        </section>
      </section></div>'''

    new_seg = 'data-route="/approach" data-title="approach">\n    ' + inner
    html = html[:start] + new_seg + pad + html[seg_end:]

if fails:
    print("FAILED PATCHES:")
    print("\n".join(" - " + f for f in fails))
    sys.exit(1)

P.write_text(html, encoding="utf-8")
print(f"OK - index.html: {len(orig)} -> {len(html)} chars ({len(html)-len(orig):+d})")
