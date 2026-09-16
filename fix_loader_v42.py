#!/usr/bin/env python3
"""v4.2 — welcome loader rebuilt as brand lockup: HABIBCORE dice mark ON TOP +
HABIBCORE wordmark beneath, liquid diagonal wave. Replaces the v4.1 wordmark-only loader."""
import re

LOCKUP = open('/tmp/lockup.txt', encoding='utf-8').read()

CSS = '''<style data-build="v4.2">
/* ===== welcome loader v4.2 — mark-on-top lockup, liquid wave ===== */
#ld { position:fixed; inset:0; z-index:400; background:var(--hc-surface-ink, #0b0b0c);
      display:flex; align-items:center; justify-content:center;
      opacity:1; transition:opacity .55s ease; }
#ld.ld-done { opacity:0; pointer-events:none; }
#ld[hidden] { display:none; }
.ld-stage { position:relative; width:min(58vw, 500px);
            transition:transform .9s cubic-bezier(.7,0,.84,0);
            transform:translateZ(0); }
#ld.ld-zoom .ld-stage { transform:scale(8); }
.ld-stage svg { display:block; width:100%; height:auto; overflow:visible; }
.ld-dim   { fill:var(--hc-grey-1, #232326); }
.ld-white { fill:var(--hc-paper, #f4f2ed); }
.ld-count { position:absolute; right:0; bottom:-26px;
            font-family:"IBM Plex Mono", monospace; font-size:11px;
            letter-spacing:.14em; color:var(--hc-paper, #f4f2ed); opacity:.92;
            font-variant-numeric:tabular-nums; }
@media (max-width: 700px) { .ld-stage { width:min(72vw, 340px); } }
@media (prefers-reduced-motion: reduce) {
  #ld { transition-duration:.25s; }
  .ld-stage { transition:none; }
}
</style>
'''

LOADER_HTML = '''<!-- ================= v4.2 welcome loader — mark-on-top lockup, once per session ================= -->
<div id="ld" aria-hidden="true" hidden>
  <div class="ld-stage">
    <svg viewBox="-8 -8 816 1104" role="img" aria-label="HABIBCORE">
      <defs>__LOCKUP__<clipPath id="ld-wave"><path id="ld-wave-path" d=""/></clipPath></defs>
      <use href="#ld-wm" class="ld-dim"/>
      <g clip-path="url(#ld-wave)"><use href="#ld-wm" class="ld-white"/></g>
    </svg>
    <div class="ld-count" id="ld-count">loading… 0%</div>
  </div>
</div>
<script data-build="v4.2">
(function () {
  "use strict";
  var KEY = "ld-seen";
  var ld = document.getElementById("ld");
  if (!ld) return;
  try { if (sessionStorage.getItem(KEY)) { ld.remove(); return; } } catch (e) { ld.remove(); return; }
  ld.hidden = false;
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var wave = document.getElementById("ld-wave-path"),
      count = document.getElementById("ld-count");
  var DUR = 3400, MIN = 1400, HOLD = 0.92, WASHES = 2.2, t0 = performance.now(),
      loaded = false, finished = false, last = t0, p = 0;
  var ease = function (t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  function paint() {
    var osc = (1 - Math.cos(2 * Math.PI * p * WASHES)) / 2;
    var top = -20 + 1084 * osc;
    if (p > .92) top = -20 + 1084 * (1 - ease((p - .92) / .08));
    var amp = 9, tilt = 30, d = "";
    for (var i = 0; i <= 32; i++) {
      var x = -6 + (812 / 32) * i;
      var y = top + tilt * (x - 400) / 400 + Math.sin(i * .58 + p * 24) * amp;
      d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1) + " ";
    }
    wave.setAttribute("d", d + "L806 1064L-6 1064Z");
    count.textContent = "loading\u2026 " + Math.floor(p * 100) + "%";
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
  if (reduced) { wave.setAttribute("d", "M-6 -20L806 -20L806 1064L-6 1064Z"); count.textContent = "loading\u2026 100%"; }
  window.addEventListener("load", function () { loaded = true; });
  setTimeout(function () { loaded = true; }, 6000);
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
'''.replace('__LOCKUP__', LOCKUP)

for path in ['index.html', 'loader_preview.html']:
    h = open(path, encoding='utf-8').read()
    # remove any previous injected loader blocks (v4.1)
    h2 = re.sub(r'<style data-build="v4\.1">.*?</style>\n?', '', h, flags=re.S)
    h2 = re.sub(r'<!-- =+ v4\.1 welcome loader.*?</script>\n?', '', h2, flags=re.S)
    assert 'data-build="v4.1"' not in h2, path + ': v4.1 blocks not fully removed'
    # remove a previous v4.2 run too (idempotent)
    h2 = re.sub(r'<style data-build="v4\.2">.*?</style>\n?', '', h2, flags=re.S)
    h2 = re.sub(r'<!-- =+ v4\.2 welcome loader.*?</script>\n?', '', h2, flags=re.S)
    h2 = h2.replace('</head>', CSS + '</head>', 1)
    if '<body>\n' in h2:
        h2 = h2.replace('<body>\n', '<body>\n' + LOADER_HTML + '\n', 1)
    else:  # preview has <body> on same line as attributes
        h2 = re.sub(r'(<body[^>]*>)', r'\1\n' + LOADER_HTML.replace('\\', '\\\\') + '\n', h2, count=1)
    h2 = h2.replace('BUILD v4.1 — WELCOME LOADER', 'BUILD v4.2 — WELCOME LOCKUP')
    open(path, 'w', encoding='utf-8').write(h2)
    print('patched', path)

# preview: give it matching tokens so it renders like production
pv = open('loader_preview.html', encoding='utf-8').read()
if '--hc-surface-ink' not in pv.split('</style>')[0]:
    pv = pv.replace('</style>', ':root{--hc-surface-ink:#0b0b0c;--hc-paper:#f4f2ed;--hc-grey-1:#232326;}</style>', 1)
    open('loader_preview.html', 'w', encoding='utf-8').write(pv)
    print('preview tokens synced')
print('v4.2 done')
