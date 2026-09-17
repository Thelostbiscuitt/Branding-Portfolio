#!/usr/bin/env node
/**
 * Loader verification — approved v6 fill-to-logo integration.
 *
 * Serves ./out statically (pass a URL to skip serving), then verifies:
 *  - initial state: lockup centered, no opening animation, transparent logo
 *  - fill/percent synchronization, monotonic rise, no jitter
 *  - no invented effects (slices / scanline stripes) or extra HUD text
 *  - zoom reveal timing, interactivity restoration, no dead page
 *  - repeat-visit skip, reduced-motion skip
 *  - geometry across 7 viewports (375 → 3440)
 *
 * Usage: node tests/loader-verify.mjs [baseURL]
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const SHOTS = '/tmp/hc-verify';
fs.rmSync(SHOTS, { recursive: true, force: true });
fs.mkdirSync(SHOTS, { recursive: true });

const results = [];
const ok = (name, pass, extra = '') => {
  results.push({ name, pass: !!pass, extra: String(extra) });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${extra ? '  — ' + extra : ''}`);
};

/* ——— optional static server for ./out ——— */
let server;
let base = process.argv[2];
if (!base) {
  server = spawn('python3', ['-m', 'http.server', '4173', '--bind', '127.0.0.1'], {
    cwd: path.resolve('out'),
    stdio: 'ignore',
  });
  base = 'http://127.0.0.1:4173';
  await new Promise((r) => setTimeout(r, 900));
}

const browser = await chromium.launch({ headless: true });

const VIEWPORTS = [
  ['small-mobile', 375, 667, 2],
  ['large-mobile', 430, 932, 3],
  ['tablet-portrait', 820, 1180, 2],
  ['tablet-landscape', 1180, 820, 2],
  ['laptop', 1440, 900, 1],
  ['desktop-1440p', 2560, 1440, 1],
  ['wide-desktop', 3440, 1440, 1],
];

/* ——— 1. full sequence + geometry per viewport ——— */
for (const [label, width, height, dsf] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: dsf });
  const page = await ctx.newPage();
  const t0 = Date.now();
  await page.goto(base + '/', { waitUntil: 'commit', timeout: 30000 }).catch(() => {});

  let loaderAtArrival = true;
  try { await page.waitForSelector('.hc-loader', { timeout: 4000, state: 'attached' }); }
  catch { loaderAtArrival = false; }
  ok(`${label}: loader present on first paint`, loaderAtArrival);

  if (loaderAtArrival) {
    const state = await page.evaluate(() => {
      const loader = document.querySelector('.hc-loader');
      const word = document.querySelector('.hc-loader .base .word');
      const mark = document.querySelector('.hc-loader .base .mark');
      const fill = document.querySelector('.hc-loader .visual.fill');
      const cs = loader ? getComputedStyle(loader) : null;
      const wc = word ? word.getBoundingClientRect() : null;
      const mc = mark ? mark.getBoundingClientRect() : null;
      const csFill = fill ? getComputedStyle(fill).clipPath : 'n/a';
      const inlineFill = fill ? fill.style.clipPath : '';
      return {
        bg: cs ? cs.backgroundColor : '',
        wordText: word ? word.textContent : '',
        markSrc: mark ? mark.currentSrc || mark.src : '',
        fillClip: inlineFill || csFill,
        fillStarted: !!inlineFill && !/^inset\(100(\.00)?%/.test(inlineFill),
        wordCX: wc ? wc.left + wc.width / 2 : -1,
        markCX: mc ? mc.left + mc.width / 2 : -1,
        markBottom: mc ? mc.bottom : -1,
        wordTop: wc ? wc.top : -1,
        markAboveWord: mc && wc ? mc.bottom <= wc.top + 1 : false,
        overflowX: document.documentElement.scrollWidth > window.innerWidth,
      };
    });
    ok(`${label}: dark #101010 stage`, state.bg === 'rgb(16, 16, 16)', state.bg);
    ok(`${label}: wordmark reads HABIBCORE`, state.wordText === 'HABIBCORE', state.wordText);
    ok(`${label}: transparent production logo asset`, /habibcore-logo-transparent\.png$/.test(state.markSrc), state.markSrc.split('/').pop());
    ok(`${label}: fill starts hidden or at 0%`, !state.fillStarted, state.fillClip);
    ok(`${label}: logo sits above the wordmark`, state.markAboveWord, `markBottom=${Math.round(state.markBottom)} wordTop=${Math.round(state.wordTop)}`);
    ok(`${label}: composition horizontally centered`, Math.abs(state.markCX - state.wordCX) < 2, `Δ=${(state.markCX - state.wordCX).toFixed(2)}px`);
    ok(`${label}: no unexpected horizontal overflow`, !state.overflowX);
    await page.screenshot({ path: `${SHOTS}/${label}-01-initial.png` });
  }

  let done = false;
  try { await page.waitForSelector('.hc-loader', { state: 'detached', timeout: 15000 }); done = true; } catch {}
  const total = Date.now() - t0;
  ok(`${label}: sequence completes and detaches`, done, `${total}ms`);
  if (done) {
    ok(`${label}: completes within 12s`, total < 12000, `${total}ms`);
    const post = await page.evaluate(() => ({
      bodyOverflow: getComputedStyle(document.body).overflow,
      heroH1: !!document.querySelector('.hero h1'),
      navVisible: (() => { const n = document.querySelector('.nav'); if (!n) return false; const r = n.getBoundingClientRect(); return r.height > 0; })(),
      docHasHeight: document.documentElement.scrollHeight > window.innerHeight * 0.5,
      playerPresent: !!document.querySelector('.player'),
    }));
    ok(`${label}: page interactive after reveal`, post.bodyOverflow !== 'hidden', post.bodyOverflow);
    ok(`${label}: homepage rendered underneath (hero h1)`, post.heroH1);
    ok(`${label}: nav present`, post.navVisible);
    ok(`${label}: page has real height`, post.docHasHeight);
    ok(`${label}: audio player preserved`, post.playerPresent);
    await page.screenshot({ path: `${SHOTS}/${label}-02-revealed.png` });
  }
  await ctx.close();
}
/* ——— 2. throttled run: monotonic fill, sync'd percent, no jitter ——— */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.route('**/*', async (route) => {
    await new Promise((r) => setTimeout(r, 120)); // slow everything: network-bound progress
    route.continue();
  });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'commit' }).catch(() => {});
  await page.waitForSelector('.hc-loader', { timeout: 8000, state: 'attached' }).catch(() => {});
  const samples = [];
  for (let i = 0; i < 24; i++) {
    await page.waitForTimeout(120).catch(() => {});
    const s = await page.evaluate(() => {
      const fill = document.querySelector('.hc-loader .visual.fill');
      const pct = document.querySelector('.hc-loader .readout b');
      const m = fill ? /inset\(([\d.]+)%/.exec(fill.style.clipPath || '') : null;
      return { fill: m ? 100 - parseFloat(m[1]) : null, pct: pct ? pct.textContent : null };
    }).catch(() => ({ fill: null, pct: null }));
    if (s.fill !== null) samples.push(s);
  }
  const detached = await page.waitForSelector('.hc-loader', { state: 'detached', timeout: 25000 }).then(() => true, () => false);
  ok('throttled: loader eventually completes', detached);
  const fills = samples.map((s) => s.fill);
  let monotonic = true, jitter = false;
  for (let i = 1; i < fills.length; i++) {
    if (fills[i] < fills[i - 1] - 0.01) monotonic = false;
    if (Math.abs(fills[i] - fills[i - 1]) > 14) jitter = true;
  }
  ok('throttled: fill rises monotonically (no regressions)', monotonic, fills.slice(0, 6).map((v) => v.toFixed(0)).join('→'));
  ok('throttled: no jitter (no jumps > 14%/sample)', !jitter);
  const synced = samples.every((s) => {
    if (!s.pct) return true;
    return Math.abs(parseInt(s.pct, 10) - s.fill) <= 2;
  });
  ok('throttled: percentage matches visible fill (±2%)', synced,
    samples.length ? `fill=${fills[0].toFixed(0)}% pct=${samples[0].pct}` : 'no samples');
  await ctx.close();
}

/* ——— 3. repeat visit in the same session skips the loader ——— */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'load' }).catch(() => {});
  await page.waitForSelector('.hc-loader', { state: 'detached', timeout: 20000 }).catch(() => {});
  const seen = await page.evaluate(() => sessionStorage.getItem('hc-loader-seen'));
  ok('repeat: session flag set after first run', seen === '1', String(seen));
  await page.reload({ waitUntil: 'domcontentloaded' }).catch(() => {});
  await page.waitForTimeout(1200);
  const gone = await page.evaluate(() => !document.querySelector('.hc-loader'));
  ok('repeat: loader skipped on same-session reload', gone);
  const hero = await page.evaluate(() => !!document.querySelector('.hero h1'));
  ok('repeat: homepage fully usable after skip', hero);
  await page.screenshot({ path: `${SHOTS}/repeat-visit.png` });
  await ctx.close();
}
/* ——— 4. reduced motion: no loader, instant usable site ——— */
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  const t0 = Date.now();
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' }).catch(() => {});
  await page.waitForTimeout(900);
  const s = await page.evaluate(() => ({
    loader: !!document.querySelector('.hc-loader'),
    htmlOff: document.documentElement.classList.contains('hc-loader-off'),
    hero: !!document.querySelector('.hero h1'),
    focusable: (() => { const a = document.querySelector('a[href="#work"]'); if (!a) return false; a.focus(); return document.activeElement === a; })(),
  }));
  ok('reduced-motion: loader absent', !s.loader);
  ok('reduced-motion: skip flag applied before paint', s.htmlOff);
  ok('reduced-motion: site visible immediately', s.hero, `${Date.now() - t0}ms`);
  ok('reduced-motion: links focusable right away', s.focusable);
  await page.screenshot({ path: `${SHOTS}/reduced-motion.png` });
  await ctx.close();
}

/* ——— 5. invented-effect / extra-HUD audit on the loader subtree ——— */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'commit' }).catch(() => {});
  await page.waitForSelector('.hc-loader', { timeout: 5000, state: 'attached' }).catch(() => {});
  const audit = await page.evaluate(() => {
    const loader = document.querySelector('.hc-loader');
    if (!loader) return { present: false };
    const texts = Array.from(loader.querySelectorAll('*'))
      .map((el) => (Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim()) ? el.textContent.trim() : ''))
      .filter(Boolean);
    return {
      present: true,
      textBits: texts,
      imgCount: loader.querySelectorAll('img').length,
      stageChildren: loader.querySelectorAll('.stage > *').length,
      readsPercent: texts.some((t) => /%/.test(t)),
      otherLabels: texts.filter((t) => !/LOADING|HABIBCORE|%/.test(t)),
    };
  }).catch(() => ({ present: false }));
  ok('audit: loader subtree present for inspection', audit.present);
  if (audit.present) {
    ok('audit: only the LOADING — N% readout as text', audit.readsPercent && audit.otherLabels.length === 0, audit.textBits.join(' | '));
    ok('audit: exactly three logo images (base, fill, zoom)', audit.imgCount === 3, String(audit.imgCount));
    ok('audit: stage holds only lockup + zoom mark', audit.stageChildren === 2, String(audit.stageChildren));
  }
  await ctx.close();
}

await browser.close();
if (server) server.kill();

const fails = results.filter((r) => !r.pass).length;
console.log(`\n===== LOADER VERIFY: ${results.length - fails}/${results.length} PASS =====`);
console.log(`screenshots → ${SHOTS}`);
process.exit(fails ? 1 : 0);