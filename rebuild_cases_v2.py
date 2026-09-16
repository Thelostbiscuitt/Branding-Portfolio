#!/usr/bin/env python3
"""rebuild_cases_v2.py — rebuild all 15 static case pages into the JAWS-grade
anatomy: full-viewport ink hero (crumbs, giant title, YEAR/INDUSTRY, tagline,
scroll-down), intro + services column, THE CHALLENGE as cards, approach /
deliverables / result / FAQ sections with data-cs hooks for the sticky section
pill. All copy is preserved verbatim from the existing blocks."""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).parent
p = ROOT / "index.html"
html = p.read_text(encoding="utf-8")

# parse from the pre-rebuild backup so the rebuild is idempotent
src = pathlib.Path("/tmp/index.html.pre-cases").read_text(encoding="utf-8")

START = '<div class="page " data-route="/work/biscuit-ai"'
END = '<div class="page " data-route="/capabilities"'
i0, i1 = html.find(START), html.find(END)
s0, s1 = src.find(START), src.find(END)
assert i0 != -1 and i1 != -1 and i0 < i1, "case region not found in target"
assert s0 != -1 and s1 != -1 and s0 < s1, "case region not found in source"
region = src[s0:s1]

chunks = re.split(r'(?=<div class="page ")', region)
chunks = [c for c in chunks if c.strip()]

def grab(pat, s, default="", flags=re.S):
    m = re.search(pat, s, flags)
    return m.group(1) if m else default

def findall(pat, s, flags=re.S):
    return re.findall(pat, s, flags)

out = []
for chunk in chunks:
    route = grab(r'data-route="(/work/[^"]+)"', chunk)
    title = grab(r'data-title="([^"]+)"', chunk)
    name = grab(r"<h1>(.*?)</h1>", chunk).strip()
    lede = grab(r'<p class="lede">(.*?)</p>', chunk).strip()
    crumbs = grab(r'(<nav class="cp-crumbs".*?</nav>)', chunk).strip()
    # meta items live only in cp-meta-row and carry a distinctive shape — grab
    # them straight from the chunk (a meta-row tail regex would eat the last
    # item's closing tags and silently drop ROLE/LINK/FORMAT)
    metas = findall(r'<div><div class="k">(.*?)</div><div class="v">(.*?)</div></div>', chunk)
    metas = [("INDUSTRY", v) if k == "SECTOR" else (k, v) for k, v in metas]

    # intro section: OVERVIEW / CONTEXT + optional tags
    ov_label = grab(r'<div class="cp-sec" style="border-top:0;padding-top:0"><span class="k">(.*?)</span>', chunk, "OVERVIEW").strip()
    ov_text = grab(r'<div class="cp-sec" style="border-top:0;padding-top:0"><span class="k">.*?</span><p class="b">(.*?)</p>', chunk).strip()
    tags = findall(r"<li>(.*?)</li>", grab(r'<ul class="tags"[^>]*>(.*?)</ul>', chunk))

    def blks_of(inner):
        return findall(r'<div class="blk"><h3>(.*?)</h3><p class="b">(.*?)</p></div>', inner)

    def blks_and_rest(inner):
        """blks plus whatever else lives in the section (quotes etc.)"""
        blks = blks_of(inner)
        rest = re.sub(r'<div class="blk">.*?</div>', "", inner, flags=re.S).strip()
        return blks, rest

    cp_next = grab(r'(<a class="cp-next".*?</a>)', chunk)

    # ---- walk cp-body IN ORDER: figures, labelled sections, raw blocks (quotes,
    # strips, tracklists). Depth-balanced so nested divs can't truncate anything.
    bm = re.search(r'<div class="cp-body"><div class="wrap">(.*?)</div></div>\s*(?=<a class="cp-next"|\Z)', chunk, re.S)
    body_inner = bm.group(1) if bm else ""
    body_inner = re.sub(r'<div class="cp-sec" style="border-top:0;padding-top:0">.*?</div>', "", body_inner, count=1, flags=re.S)
    DIV = re.compile(r'<div\b|</div>')
    OPEN = re.compile(r'<figure class="cp-media[^"]*">|<div class="cp-sec[^"]*">')
    items = []
    pos = 0
    while True:
        m = OPEN.search(body_inner, pos)
        if not m:
            if body_inner[pos:].strip():
                items.append(("raw", body_inner[pos:]))
            break
        if m.start() > pos and body_inner[pos:m.start()].strip():
            items.append(("raw", body_inner[pos:m.start()]))
        if m.group(0).startswith("<figure"):
            e = body_inner.find("</figure>", m.end())
            items.append(("figure", body_inner[m.start():e + 9])); pos = e + 9
        else:
            depth, j = 1, m.end()
            while depth:
                t = DIV.search(body_inner, j)
                depth += 1 if t.group(0)[:4] == "<div" else -1
                j = t.end()
            items.append(("sec", body_inner[m.start():j])); pos = j

    meta_html = "".join(
        f'<div><div class="k">{k}</div><div class="v">{v}</div></div>' for k, v in metas)

    side = ""
    if tags:
        side = ('<div class="svc-k">SERVICES</div><ul class="tags">'
                + "".join(f"<li>{t}</li>" for t in tags) + "</ul>")
    elif metas:
        ind = next((v for k, v in metas if k == "INDUSTRY"), "")
        side = f'<div class="svc-k">SERVICES</div><div class="svc-v">{ind}</div>'

    parts = []
    parts.append(f'<div class="page " data-route="{route}" data-title="{title}"><div class="page-case">')
    # ---- full-viewport hero
    parts.append('<div class="case-hero"><div class="ch-in">')
    parts.append(crumbs)
    parts.append(f'<h1 class="ch-title">{name}</h1>')
    parts.append(f'<div class="ch-meta">{meta_html}</div>')
    parts.append(f'<p class="ch-tag">{lede}</p>')
    parts.append('<div class="ch-scroll">( SCROLL DOWN )</div>')
    parts.append("</div></div>")
    # ---- intro + services column (data-cs: overview)
    parts.append(f'<div class="ch-intro" data-cs="overview"><div><span class="svc-k">{ov_label}</span><p>{ov_text}</p></div><aside>{side}</aside></div>')
    parts.append('<div class="cp-body"><div class="wrap">')
    for kind, payload in items:
        if kind in ("figure", "raw"):
            parts.append(payload)
            continue
        cut = payload.find("</span>")
        label = grab(r'<span class="k">([^<]*)</span>', payload)
        inner = payload[cut + 7:payload.rfind("</div>")] if cut != -1 else ""
        if label == "THE CHALLENGE":
            cards, rest = blks_and_rest(inner)
            if cards:
                card_html = "".join(f'<article class="ch-card"><h3>{h}</h3><p class="b">{b}</p></article>' for h, b in cards)
                parts.append(f'<div class="cp-sec" data-cs="challenge"><span class="k">{label}</span><div class="ch-cards">{card_html}</div>{rest}</div>')
            elif inner.strip():
                parts.append(payload)
        elif label in ("APPROACH", "RESULT"):
            blks, rest = blks_and_rest(inner)
            cs = "approach" if label == "APPROACH" else "result"
            if blks:
                blk_html = "".join(f'<div class="blk"><h3>{h}</h3><p class="b">{b}</p></div>' for h, b in blks)
                parts.append(f'<div class="cp-sec" data-cs="{cs}"><span class="k">{label}</span>{blk_html}{rest}</div>')
            elif inner.strip():
                parts.append(f'<div class="cp-sec" data-cs="{cs}"><span class="k">{label}</span>{inner}</div>')
        elif label in ("DELIVERABLES", "WHAT I DID"):
            lis = "".join(f"<li>{x}</li>" for x in findall(r"<li>(.*?)</li>", inner))
            um = re.search(r'<ul class="cp-dels">.*?</ul>', inner, re.S)
            rest = (inner[:um.start()] + inner[um.end():]).strip() if um else ""
            parts.append(f'<div class="cp-sec" data-cs="deliverables"><span class="k">{label}</span><ul class="cp-dels">{lis}</ul>{rest}</div>')
        elif label in ("PROOF", "QUESTIONS WE ACTUALLY GET"):
            cs = "proof" if label == "PROOF" else "faq"
            parts.append(f'<div class="cp-sec" data-cs="{cs}"><span class="k">{label}</span>{inner}</div>')
        else:
            parts.append(payload)  # THE SERIES / FULL ARCHIVE / THE EP … verbatim
    parts.append("</div></div>")
    if cp_next:
        parts.append(cp_next)
    parts.append("</div></div>")
    out.append("".join(parts))

new_region = "".join(out)
html = html[:i0] + new_region + html[i1:]
p.write_text(html, encoding="utf-8")

n = len(out)
print(f"rebuilt {n} case pages")
for r in re.findall(r'data-route="(/work/[^"]+)"', new_region):
    print("  ", r)
sys.exit(0 if n == 15 else 1)
