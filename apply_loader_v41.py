#!/usr/bin/env python3
"""v4.1 — welcome loader (NeoLeaf-style liquid-wave wordmark wash).
Session-scoped: plays once per browser session, then skipped.
Structure-preserving: injects one <style>, one <div>, one <script>; touches nothing else."""
import re, sys

SRC = "index.html"
html = open(SRC, encoding="utf-8").read()
assert 'id="ld"' not in html, "loader already present"
assert "BUILD v4.0" in html, "expected v4.0 baseline"

# ---- extract canonical brand glyph group from header chip ----
m = re.search(r'<a class="chip brand-chip"[^>]*>(<svg viewBox="0 0 331 84\.6".*?</svg>)</a>', html, re.S)
assert m, "brand svg not found"
inner = re.search(r'(<g transform="[^"]+">.*</g>)', m.group(1), re.S).group(1)
glyphs = '<g id="ld-wm">' + inner + '</g>'

CSS = """<style data-build="v4.1">
/* ===== welcome loader — liquid-wave wordmark wash, session-scoped ===== */
#ld { position:fixed; inset:0; z-index:400; background:var(--hc-surface-ink, #0b0b0c);
      display:flex; align-items:center; justify-content:center;
      opacity:1; transition:opacity .55s ease; }
#ld.ld-done { opacity:0; pointer-events:none; }
#ld[hidden] { display:none; }
.ld-stage { position:relative; width:min(76vw,880px);
            transition:transform .9s cubic-bezier(.7,0,.84,0);
            transform:translateZ(0); }
#ld.ld-zoom .ld-stage { transform:scale(9); }
.ld-stage svg { display:block; width:100%; height:auto; overflow:visible; }
.ld-dim   { color:var(--hc-grey-1, #26262a); }
.ld-white { color:var(--hc-paper); }
.ld-count { position:absolute; right:0; bottom:-20px;
            font-family:"IBM Plex Mono", monospace; font-size:11px;
            letter-spacing:.14em; color:var(--hc-paper); opacity:.92;
            font-variant-numeric:tabular-nums; }
@media (prefers-reduced-motion: reduce) {
  #ld { transition-duration:.25s; }
  .ld-stage { transition:none; }
}
</style>
"""

LOADER_HTML = """<!-- ================= v4.1 welcome loader — plays once per session ================= -->
<div id="ld" aria-hidden="true" hidden>
  <svg width="0" height="0" style="position:absolute"><defs>%GLYPHS%<clipPath id="ld-wave"><path id="ld-wave-path" d=""/></clipPath></defs></svg>
  <div class="ld-stage">
    <svg viewBox="-6 -2 343 88" role="img" aria-label="Habib.">
      <use href="#ld-wm" class="ld-dim"/>
      <g clip-path="url(#ld-wave)"><use href="#ld-wm" class="ld-white"/></g>
    </svg>
    <div class="ld-count" id="ld-count">loading… 0%</div>
  </div>
</div>
<script data-build="v4.1">
(function () {
  "use strict";
  var KEY = "ld-seen";
  var ld = document.getElementById("ld");
  if (!ld) return;
  try { if (sessionStorage.getItem(KEY)) { ld.remove(); return; } } catch (e) { ld.remove(); return; }
  ld.hidden = false;
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var wave = document.getElementById("ld-wave-path"),
      count = document.getElementById("ld-count"),
      stage = ld.querySelector(".ld-stage");
  var DUR = 3400, MIN = 1400, HOLD = 0.92, WASHES = 2.6, t0 = performance.now(),
      loaded = false, finished = false, last = t0, p = 0;
  var ease = function (t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  function paint() {
    var osc = (1 - Math.cos(2 * Math.PI * p * WASHES)) / 2;
    var top = -4 + 86 * osc;
    if (p > .92) top = -4 + 86 * (1 - ease((p - .92) / .08));
    var amp = 3.2, d = "";
    for (var i = 0; i <= 28; i++) {
      var x = -6 + (343 / 28) * i;
      d += (i ? "L" : "M") + x.toFixed(1) + " " + (top + Math.sin(i * .62 + p * 26) * amp).toFixed(1) + " ";
    }
    wave.setAttribute("d", d + "L337 82L-6 82Z");
    count.textContent = "loading… " + Math.floor(p * 100) + "%";
  }
  function exit() {
    if (finished) return;
    finished = true;
    try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
    if (reduced) { ld.classList.add("ld-done"); setTimeout(function () { ld.remove(); }, 300); return; }
    ld.classList.add("ld-zoom");
    setTimeout(function () {
      ld.classList.add("ld-done");
      setTimeout(function () { ld.remove(); }, 600);
    }, 620);
  }
  if (reduced) { wave.setAttribute("d", "M-6 -4L337 -4L337 82L-6 82Z"); count.textContent = "loading… 100%"; }
  window.addEventListener("load", function () { loaded = true; });
  setTimeout(function () { loaded = true; }, 6000); /* hard fallback */
  function tick(now) {
    if (finished) return;
    var dt = now - last; last = now;
    var target = loaded ? 1 : HOLD;
    if (p < target) p = Math.min(target, p + dt / (p < HOLD ? DUR : DUR * .45));
    if (!reduced) paint();
    if (p >= 1 && now - t0 >= (reduced ? 500 : MIN)) return exit();
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
</script>
""".replace("%GLYPHS%", glyphs)

html = html.replace("</head>", CSS + "</head>", 1)
html = html.replace("<body>\n", "<body>\n" + LOADER_HTML + "\n", 1)
html = html.replace("BUILD v4.0 — COPY SYSTEM 2026", "BUILD v4.1 — WELCOME LOADER", 1)
assert 'id="ld"' in html and "BUILD v4.1" in html
open(SRC, "w", encoding="utf-8").write(html)
print("v4.1 loader injected:", len(html), "bytes")
