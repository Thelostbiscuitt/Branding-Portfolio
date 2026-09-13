/* ============================================================
   HABIBCORE - preview review toolbar (PREVIEW ONLY, never shipped)
   Boots after Next hydration (mutating before it trips React #418 and
   the recovery re-render wipes the layer) and re-asserts after recovery.
   ============================================================ */
(function(){
  'use strict';
  var root = document.documentElement;
  var on = true;
  if (sessionStorage.getItem('hc-refine-on') === '0') on = false;

  /* swap the legacy square-crop rasters for the canonical 8:9 mark */
  function swapLogos(){
    document.querySelectorAll('img').forEach(function(img){
      var src = img.getAttribute('src') || '';
      var isRefined = src.indexOf('/brand/habibcore-mark') === 0;
      var isCanon   = /\/logo(-mark)?\.png$/.test(src);
      if (on && isCanon) {
        img.dataset.origSrc = src;
        img.setAttribute('src','/brand/habibcore-mark-black.svg');
        if(!img.classList.contains('range-mark')){ img.style.aspectRatio='8/9'; img.style.height='auto'; }
      } else if (!on && isRefined && img.dataset.origSrc) {
        img.setAttribute('src', img.dataset.origSrc);
        img.style.aspectRatio=''; img.style.height='';
      }
    });
  }

  /* quiet canonical placements: nav + footer only (same seats as v1) */
  function injectMarks(){
    var mk = function(src, cls){
      var i = document.createElement('img');
      i.src = src; i.alt = ''; i.className = cls; i.setAttribute('aria-hidden','true');
      return i;
    };
    var brand = document.querySelector('.nav .brand');
    if (brand && !brand.querySelector('.hc-nav-mark'))
      brand.insertBefore(mk('/brand/habibcore-mark-black.svg','hc-nav-mark'), brand.firstChild);
    var foot = document.querySelector('.foot-row p');
    if (foot && !foot.querySelector('.hc-foot-mark'))
      foot.insertBefore(mk('/brand/habibcore-mark-white.svg','hc-foot-mark'), foot.firstChild);
  }

  var bar = null;
  function ensureToolbar(){
    if (bar && document.contains(bar)) return;
    bar = document.createElement('div');
    bar.setAttribute('aria-label','Preview review controls');
    bar.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:9999;display:flex;gap:6px;align-items:center;' +
      'background:#fff;border:1.5px solid #111;padding:6px;font:500 9px/1 "IBM Plex Mono",monospace;' +
      'letter-spacing:.1em;text-transform:uppercase;color:#111';
    var mkBtn = function(label, fn){
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = label;
      b.style.cssText = 'min-height:34px;padding:6px 11px;border:1px solid #111;background:#fff;color:#111;cursor:pointer;font:inherit';
      b.addEventListener('click', fn);
      bar.appendChild(b); return b;
    };
    mkBtn('BEFORE', function(){ on = false; sessionStorage.setItem('hc-refine-on','0'); apply(); });
    mkBtn('AFTER',  function(){ on = true;  sessionStorage.setItem('hc-refine-on','1'); apply(); });
    mkBtn('SIGNAL +', function(){ root.classList.toggle('signal-plus'); });
    document.body.appendChild(bar);
  }

  function apply(){
    root.classList.toggle('refine-on', on);
    injectMarks();
    swapLogos();
    ensureToolbar();
  }

  /* boot after hydration; re-assert while React recovery may re-render */
  function boot(){
    root.classList.toggle('refine-on', on);
    apply();
    [400, 1200, 2600].forEach(function(t){ setTimeout(function(){
      injectMarks(); swapLogos(); ensureToolbar();
      root.classList.toggle('refine-on', on);
    }, t); });
  }
  if (document.readyState === 'complete') setTimeout(boot, 250);
  else window.addEventListener('load', function(){ setTimeout(boot, 250); });

  new MutationObserver(function(){
    if (!bar || !document.contains(bar)) ensureToolbar();
    if (on) {
      var brand = document.querySelector('.nav .brand');
      if (brand && !brand.querySelector('.hc-nav-mark')) injectMarks();
      root.classList.toggle('refine-on', on);
    }
  }).observe(document.body, { childList: true });
})();
