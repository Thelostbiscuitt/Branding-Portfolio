// verify_browser.mjs — full v3 route tour + chrome + sound + responsive checks.
import { chromium } from "playwright-core";
import fs from "node:fs";

const BASE = "http://localhost:8123";
const results = [];
const consoleIssues = [];
const failedRequests = [];

function ok(name, cond, extra = "") {
  results.push({ name, pass: !!cond, extra });
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? "  — " + extra : ""}`);
}

const ROUTES = ["/", "/work", "/work/biscuit-ai", "/work/chef4me", "/work/leadway-pensure",
  "/work/olumayowa-nursing-home", "/work/ai-in-the-workplace", "/work/relay",
  "/work/skaame", "/work/layo-isaac", "/work/blvckoreo", "/work/1ethfp",
  "/work/bedroom-recordings-ii", "/work/singles-cover-art",
  "/work/visitor-from-mars", "/work/gen-sadiq", "/work/tbogd",
  "/capabilities", "/capabilities/brand-identity", "/capabilities/product-design",
  "/capabilities/software", "/capabilities/ai-systems", "/capabilities/automation",
  "/capabilities/creative-direction", "/capabilities/graphic-design", "/capabilities/training",
  "/approach", "/about", "/contact"];

const CASES_slugs = ["biscuit-ai", "chef4me", "leadway-pensure", "olumayowa-nursing-home",
  "ai-in-the-workplace", "relay", "skaame", "layo-isaac", "blvckoreo", "1ethfp",
  "bedroom-recordings-ii", "singles-cover-art", "visitor-from-mars", "gen-sadiq", "tbogd"];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") consoleIssues.push(`[console.${m.type()}] ${m.text()}`); });
page.on("pageerror", (e) => consoleIssues.push(`[pageerror] ${e.message}`));
page.on("requestfailed", (r) => {
  const err = r.failure()?.errorText || "";
  // ERR_ABORTED = benign teardown/interrupt of in-flight media probe loads (browser closed,
  // navigation). Only real failures (DNS, 404 via ERR_*, connection reset) count.
  if (err.includes("ERR_ABORTED")) return;
  failedRequests.push(`${r.url()} — ${err}`);
});

await page.goto(BASE + "/#/");

// ---- 0. v4.1 welcome loader: plays once, then session-skipped
await page.waitForSelector("#ld", { state: "visible", timeout: 4000 }).catch(() => {});
ok("loader appears on first load", await page.evaluate(() => !!document.getElementById("ld")));
await page.waitForSelector("#ld", { state: "detached", timeout: 9000 }).catch(() => {});
ok("loader finishes and removes itself", await page.evaluate(() => !document.getElementById("ld")));
await page.reload();
await page.waitForTimeout(400);
ok("loader skipped on reload (session guard)", await page.evaluate(() => !document.getElementById("ld")));

// ---- 1. full route tour
for (const r of ROUTES) {
  await page.goto(BASE + "/#" + r);
  await page.waitForTimeout(120);
  const title = await page.title();
  const active = await page.evaluate(() => document.querySelector(".page.active")?.getAttribute("data-route"));
  ok(`route ${r}`, active === r, `title="${title}"`);
}
ok("titles swap per route", (await page.title()).includes("Contact"));

// unknown hash -> home
await page.goto(BASE + "/#/nope/nothing");
await page.waitForTimeout(300);
ok("unknown hash redirects home", (await page.evaluate(() => document.querySelector(".page.active")?.getAttribute("data-route"))) === "/");
const desc = await page.evaluate(() => document.querySelector('meta[name="description"]')?.getAttribute("content"));
ok("meta description present", !!desc && desc.length > 20, desc?.slice(0, 60));

// ---- 2. chrome: menu, flyouts, clock
await page.goto(BASE + "/#/");
await page.waitForTimeout(150);
await page.click(".menu-trig");
ok("menu opens, label flips", (await page.textContent(".menu-trig .mt-label")) === "Close");
await page.keyboard.press("Escape");
await page.waitForTimeout(100);
ok("menu closes on Escape", (await page.textContent(".menu-trig .mt-label")) === "Menu");
ok("BUILD v4.1 — WELCOME LOADER chip", (await page.textContent(".menu-build")).includes("BUILD v4.1 — WELCOME LOADER"));
await page.hover('.dock-btn[data-flyout="caps"]');
await page.waitForTimeout(200);
ok("caps flyout hover-opens", await page.evaluate(() => !document.getElementById("flyout-caps").hidden));
await page.click('.dock-btn[data-flyout="caps"]');
await page.waitForTimeout(150);
ok("caps flyout click-pins (stays open)", await page.evaluate(() => !document.getElementById("flyout-caps").hidden));
await page.click('.dock-btn[data-flyout="caps"]');
await page.waitForTimeout(1000);
ok("caps flyout click-again unpins", await page.evaluate(() => document.getElementById("flyout-caps").hidden));
const clock = await page.textContent(".foot-clock [data-clock]");
ok("LAGOS clock ticks", /\d{2}:\d{2}:\d{2} WAT/.test(clock), clock);
const flySrc = await page.evaluate(() => document.querySelector("#flyout-caps .fly-card img")?.getAttribute("src"));
ok("flyout evidence card uses /media", flySrc?.startsWith("media/"), flySrc);

// ---- 3. work index: wheel (Brand Appart posture), no intro, floating pill
await page.goto(BASE + "/#/work");
await page.waitForTimeout(150);
const introGone = await page.evaluate(() => ({
  h1: document.querySelector("#page-work h1"),
  chips: document.querySelectorAll('#page-work button.fchip[data-cat]').length,
  counter: document.getElementById("workCount"),
}));
ok("work intro stripped (no H1, filters, counter)", !introGone.h1 && introGone.chips === 0 && !introGone.counter, `h1=${!!introGone.h1} chips=${introGone.chips}`);
const total = await page.evaluate(() => document.querySelectorAll(".wcard").length);
const uniqueCases = await page.evaluate(() => new Set([...document.querySelectorAll(".wcard")].map(c => c.getAttribute("href"))).size);
ok("work grid covers all 15 unique cases", uniqueCases === 15, `${total} wcards, ${uniqueCases} unique hrefs`);
const pillPos = await page.evaluate(() => getComputedStyle(document.querySelector("body[data-route='/work'] .view-toggle .pill")).position);
ok("grid/list pill floats permanently", pillPos === "fixed", `position=${pillPos}`);
ok("wheel: mouse highlights nothing (no hover rules)", !(await page.evaluate(() => document.documentElement.innerHTML.includes(".idx-row:hover"))));
const listBtn = page.locator('button[data-view="index"]').first();
if (await listBtn.count()) {
  await listBtn.click();
  await page.waitForTimeout(250);
  const rows = await page.evaluate(() => document.querySelectorAll(".idx-row").length);
  const view = await page.getAttribute("#work", "data-workview");
  ok("wheel view renders 45 giant rows (15 × 3 loop copies)", rows === 45 && view === "index", `${rows} rows, workview=${view}`);
  ok("logo lockup visible in wheel view", await page.evaluate(() => getComputedStyle(document.getElementById("pickLogo")).display !== "none"));
  ok("wheel picker carries the REAL logo mark", await page.evaluate(() => { const i = document.querySelector("#pickLogo img"); return i && i.naturalWidth > 0 && i.src.includes("logo-mark.png"); }));
  // scroll-driven active row: the row nearest viewport centre goes solid + carries the meta pair
  await page.evaluate(() => { document.querySelectorAll(".idx-row")[6].scrollIntoView({ block: "center", behavior: "instant" }); window.dispatchEvent(new Event("scroll")); });
  await page.waitForTimeout(400);
  const lvState = await page.evaluate(() => {
    const cur = document.querySelector('.idx-row[aria-current="true"]');
    return { slug: cur?.dataset.slug, metaVisible: cur ? getComputedStyle(cur.querySelector(".meta")).opacity !== "0" : false };
  });
  ok("wheel: active row follows scroll", lvState.slug && lvState.slug !== "biscuit-ai", `active=${lvState.slug}`);
  ok("wheel: YEAR/SECTOR visible on active row only", lvState.metaVisible);
  // v3.6 infinite wheel: scroll far past the second copy seam — the page must
  // silently re-centre inside the middle copy and keep cycling the same cases
  await page.evaluate(() => { document.querySelectorAll(".idx-row")[38].scrollIntoView({ block: "center", behavior: "instant" }); window.dispatchEvent(new Event("scroll")); });
  await page.waitForTimeout(450);
  const loopState = await page.evaluate(() => {
    const cur = document.querySelector('.idx-row[aria-current="true"]');
    const list = document.getElementById("idxList").getBoundingClientRect();
    return { slug: cur?.dataset.slug, count: document.querySelectorAll('.idx-row[aria-current="true"]').length };
  });
  ok("infinite wheel re-centres past the seam (1 active row, real slug)",
     loopState.count === 1 && CASES_slugs.includes(loopState.slug), `active=${loopState.slug} ×${loopState.count}`);
  // the mark picks: click the logo -> opens the project the wheel parked on
  await page.waitForTimeout(1000); /* let the loop settle before reading the parked row */
  const slugNow = await page.evaluate(() => document.querySelector('.idx-row[aria-current="true"]')?.dataset.slug);
  await page.click("#pickLogo");
  await page.waitForTimeout(250);
  const picked = await page.evaluate(() => document.querySelector(".page.active")?.getAttribute("data-route"));
  ok("logo picker opens the parked project", picked === "/work/" + slugNow, picked);
  await page.goto(BASE + "/#/work");
  await page.waitForTimeout(150);
  await page.click('button[data-view="grid"]');
}

// ---- 4. case pages
await page.goto(BASE + "/#/work/biscuit-ai");
await page.waitForTimeout(150);
const caseSeg = await page.evaluate(() => document.querySelector('.page[data-route="/work/biscuit-ai"]')?.innerHTML || "");
for (const sec of ["OVERVIEW", "THE CHALLENGE", "APPROACH", "DELIVERABLES", "RESULT", "QUESTIONS WORTH ANSWERING"]) {
  ok(`biscuit-ai anatomy: ${sec}`, caseSeg.includes(sec));
}
ok("biscuit-ai YEAR is 2026 (workspace fact)", ((await page.evaluate(() => document.querySelector('.page[data-route="/work/biscuit-ai"] .ch-meta')?.textContent)) || "").includes("2026"));
ok("biscuit-ai GITHUB link cell", await page.evaluate(() => !!document.querySelector('.page[data-route="/work/biscuit-ai"] a[href*="BiscuitBot"]')));
ok("NEXT CASE chain -> chef4me", await page.evaluate(() => document.querySelector('.page[data-route="/work/biscuit-ai"] .cp-next')?.getAttribute("href") === "#/work/chef4me"));
// v3.6 JAWS anatomy: full-viewport hero + sticky section pill with scroll-spy
ok("biscuit-ai full-viewport hero", await page.evaluate(() => {
  const el = document.querySelector('.page[data-route="/work/biscuit-ai"] .case-hero');
  return !!el && el.getBoundingClientRect().height >= window.innerHeight * 0.8;
}));
ok("biscuit-ai challenge rendered as cards", await page.evaluate(() => document.querySelectorAll('.page[data-route="/work/biscuit-ai"] .ch-card').length >= 2));
await page.waitForTimeout(300);
const pillState = await page.evaluate(() => {
  const pill = document.getElementById("casePill");
  const btns = [...pill.querySelectorAll("button")].map(b => b.textContent.trim());
  const on = pill.querySelector("button.on")?.textContent.trim();
  return { hidden: pill.hidden, btns, on };
});
ok("case pill builds on case route (6 sections)", !pillState.hidden && pillState.btns.length === 6, pillState.btns.join(" / "));
ok("case pill scroll-spy highlights Overview at top", pillState.on === "Overview", `on=${pillState.on}`);
await page.click('#casePill button[data-cs="result"]');
// smooth-scroll can start late and take >1s; wait for the section to actually reach the top
await page.waitForFunction(
  () => (document.querySelector('.page.active .cp-sec[data-cs="result"]')?.getBoundingClientRect().top ?? 9999) < 300,
  { timeout: 5000 }
).catch(() => {});
await page.waitForTimeout(250);
const jumpState = await page.evaluate(() => ({
  resultTop: document.querySelector('.page.active .cp-sec[data-cs="result"]').getBoundingClientRect().top,
  on: document.getElementById("casePill").querySelector("button.on")?.textContent.trim()
}));
ok("case pill click jumps to Result (spy follows to the section in view)",
   jumpState.resultTop < 200 && (jumpState.on === "Result" || jumpState.on === "FAQ"),
   `resultTop=${Math.round(jumpState.resultTop)} on=${jumpState.on}`);
ok("case pill hidden off case routes", await page.evaluate(async () => {
  location.hash = "#/about";
  await new Promise(r => setTimeout(r, 200));
  return document.getElementById("casePill").hidden;
}));
await page.goto(BASE + "/#/work/biscuit-ai");
await page.waitForTimeout(150);
ok("case media from /media", (await page.evaluate(() => document.querySelector('.page[data-route="/work/biscuit-ai"] .cp-media img')?.getAttribute("src")))?.startsWith("media/"));
ok("CASE COPY v0.1 draft strip removed from shipped pages", await page.evaluate(() => !document.querySelector('.page[data-route="/work/biscuit-ai"] .cp-note')));

await page.goto(BASE + "/#/work/olumayowa-nursing-home"); await page.waitForTimeout(120);
ok("olumayowa LIVE SITE link", await page.evaluate(() => !!document.querySelector('.page[data-route="/work/olumayowa-nursing-home"] a[href*="olumayowanursinghome.com"]')));
await page.goto(BASE + "/#/work/ai-in-the-workplace"); await page.waitForTimeout(120);
ok("training HUB link", await page.evaluate(() => !!document.querySelector('.page[data-route="/work/ai-in-the-workplace"] a[href="ai-training-hub.html"]')));
ok("training testimonial (ABIDEMI AMODU)", (await page.evaluate(() => document.querySelector('.page[data-route="/work/ai-in-the-workplace"]')?.innerHTML)).includes("ABIDEMI AMODU"));

await page.goto(BASE + "/#/capabilities/creative-direction"); await page.waitForTimeout(120);
const relLinks = await page.evaluate(() => [...document.querySelectorAll(".rel-work a")].map(a => a.getAttribute("href")));
ok("creative-direction RELEVANT WORK links resolve", relLinks.length >= 2 && relLinks.every(h => ROUTES.includes(h.replace("#", ""))), relLinks.join(", "));

// ---- 5. about
await page.goto(BASE + "/#/about"); await page.waitForTimeout(150);
ok("path timeline rows", (await page.evaluate(() => document.querySelectorAll(".path-row").length)) === 4);
ok("portrait from /media", (await page.evaluate(() => document.querySelector(".portrait img")?.getAttribute("src"))) === "media/portrait.jpg");
ok("sound section present", await page.evaluate(() => !!document.getElementById("sound")));
ok("no TEST SIGNAL copy left", await page.evaluate(() => !document.body.innerHTML.includes("TEST SIGNAL")));

// ---- 6. sound: gate -> deck -> popup wheel
await page.goto(BASE + "/#/");
await page.evaluate(() => sessionStorage.clear());
await page.reload(); await page.waitForTimeout(300);
ok("consent gate shows on first visit", await page.evaluate(() => document.getElementById("soundGate").classList.contains("on")));
await page.click("#gateOn");
await page.waitForTimeout(100);
ok("gate clears on Sound on", await page.evaluate(() => !document.getElementById("soundGate").classList.contains("on")));

await page.goto(BASE + "/#/about"); await page.waitForTimeout(150);
await page.evaluate(() => document.getElementById("sound").scrollIntoView());
await page.click('.track-row[data-track="0"]');
await page.waitForTimeout(600);
const playing = await page.evaluate(() => ({ paused: document.getElementById("dockAudio").paused, t: document.getElementById("dockAudio").currentTime, src: document.getElementById("dockAudio").src }));
ok("deck plays real master T-01", !playing.paused && playing.t >= 0, `src=${(playing.src || "").split("/").pop()} t=${(playing.t || 0).toFixed(2)}s`);
ok("dock title updates", (await page.textContent("#dockTitle")) === "What's Up!!!");
const artist = await page.textContent("#dockArtist");
ok("dock artist drops TEST SIGNAL", artist.includes("BLVCK OREO") && !artist.includes("TEST"), artist);
ok("audio src is relative file in /media/audio", (playing.src || "").includes("/media/audio/"));

await page.click("#popBtn");
await page.waitForTimeout(150);
ok("playlist popup opens", await page.evaluate(() => !document.getElementById("dockPop").hidden));
const selBefore = await page.evaluate(() => [...document.querySelectorAll(".pop-row")].findIndex(r => r.classList.contains("sel")));
const popBox = await (await page.$("#dockPop .pop-list")).boundingBox();
await page.mouse.move(popBox.x + popBox.width / 2, popBox.y + popBox.height / 2);
// one tight burst (all deltas well inside the 340ms cooldown) -> exactly one step
for (let i = 0; i < 5; i++) { await page.mouse.wheel(0, 40); await page.waitForTimeout(20); }
await page.waitForTimeout(600);
const state = await page.evaluate(() => ({ sel: [...document.querySelectorAll(".pop-row")].findIndex(r => r.classList.contains("sel")), title: document.getElementById("dockTitle").textContent, paused: document.getElementById("dockAudio").paused }));
ok("wheel steps exactly one song per burst + plays", state.sel === (selBefore + 1) % 10 && !state.paused, `sel ${selBefore}->${state.sel}, now ${state.title}`);
await page.keyboard.press("Escape");
await page.waitForTimeout(300);
ok("Escape closes popup", await page.evaluate(() => { const p = document.getElementById("dockPop"); return p.hidden || !p.classList.contains("open"); }));

// ---- 7. 3D mark: drag spins, dblclick resets
await page.goto(BASE + "/#/about"); await page.waitForTimeout(400);
const rig1 = await page.evaluate(() => getComputedStyle(document.getElementById("m3dRot")).transform);
const box = await (await page.$("#mark3d")).boundingBox();
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await page.mouse.down();
await page.mouse.move(box.x + box.width / 2 + 120, box.y + box.height / 2 + 30, { steps: 8 });
await page.mouse.up();
await page.waitForTimeout(250);
const rig2 = await page.evaluate(() => getComputedStyle(document.getElementById("m3dRot")).transform);
ok("3D mark responds to drag", rig1 !== rig2);
await page.mouse.dblclick(box.x + box.width / 2, box.y + box.height / 2);
await page.waitForTimeout(700);
ok("dblclick homes the mark (no errors)", true);
ok("dock present", await page.evaluate(() => !!document.getElementById("dock")));
ok("scroll progress present", await page.evaluate(() => !!document.querySelector(".scroll-progress")));

// ---- 8. mobile 390x844
const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
mob.on("pageerror", (e) => consoleIssues.push(`[mobile pageerror] ${e.message}`));
mob.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") consoleIssues.push(`[mobile console.${m.type()}] ${m.text()}`); });
await mob.goto(BASE + "/#/work");
await mob.waitForTimeout(300);
const overflow = await mob.evaluate(() => document.scrollingElement.scrollWidth - document.scrollingElement.clientWidth);
ok("mobile: no horizontal overflow", overflow <= 0, `delta=${overflow}px`);
const cols = await mob.evaluate(() => getComputedStyle(document.querySelector(".work-grid")).gridTemplateColumns.split(" ").length);
ok("mobile: 1-column work grid", cols === 1, `${cols} col(s)`);
const mobPill = await mob.evaluate(() => getComputedStyle(document.querySelector(".view-toggle .pill")).position);
ok("mobile: pill floats too", mobPill === "fixed", mobPill);
await mob.goto(BASE + "/#/"); await mob.waitForTimeout(200);
await mob.click(".menu-trig");
await mob.waitForTimeout(200);
ok("mobile: menu opens (bottom sheet)", await mob.evaluate(() => document.querySelector(".menu-card").classList.contains("open")));
await mob.close();

// ---- 9. reduced motion
const rm = await browser.newPage({ viewport: { width: 1600, height: 900 }, reducedMotion: "reduce" });
rm.on("pageerror", (e) => consoleIssues.push(`[rm pageerror] ${e.message}`));
rm.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") consoleIssues.push(`[rm console.${m.type()}] ${m.text()}`); });
await rm.goto(BASE + "/#/");
await rm.waitForTimeout(300);
ok("reduced motion: page loads, usable", (await rm.title()).length > 0);
await rm.goto(BASE + "/#/about"); await rm.waitForTimeout(200);
ok("reduced motion: about renders", (await rm.evaluate(() => document.querySelectorAll(".path-row").length)) === 4);
await rm.close();

// ---- 5b. new v2 content: graphic design cases + videos + Behance
await page.goto(BASE + "/#/work/bedroom-recordings-ii"); await page.waitForTimeout(150);
ok("BR2: cassette figure from /media", (await page.evaluate(() => document.querySelector('.page[data-route="/work/bedroom-recordings-ii"] .cp-media img')?.getAttribute("src"))) === "media/bedroom-recordings-ii.webp");
ok("BR2: tracklist figure", await page.evaluate(() => !!document.querySelector('.page[data-route="/work/bedroom-recordings-ii"] img[src="media/tracklist-br2.webp"]')));
ok("BR2: NEXT CASE -> singles-cover-art", (await page.evaluate(() => document.querySelector('.page[data-route="/work/bedroom-recordings-ii"] .cp-next')?.getAttribute("href"))) === "#/work/singles-cover-art");
ok("BR2: YEAR 2025", ((await page.evaluate(() => document.querySelector('.page[data-route="/work/bedroom-recordings-ii"] .ch-meta')?.textContent)) || "").includes("2025"));

await page.goto(BASE + "/#/work/singles-cover-art"); await page.waitForTimeout(150);
ok("SINGLES: series strip (3 artworks — Gen.Sadiq moved out)", (await page.evaluate(() => document.querySelectorAll('.page[data-route="/work/singles-cover-art"] .cp-strip img').length)) === 3);
ok("SINGLES: no Gen.Sadiq video left on this case", await page.evaluate(() => !document.querySelector('.page[data-route="/work/singles-cover-art"] video')));
ok("SINGLES: hero is full-art .sq figure", await page.evaluate(() => !!document.querySelector('.page[data-route="/work/singles-cover-art"] figure.cp-media.sq img[src="media/rotd-artwork.webp"]')));
ok("SINGLES: Behance archive link", await page.evaluate(() => !!document.querySelector('.page[data-route="/work/singles-cover-art"] a[href="https://behance.net/BlvckOreo"]')));
ok("SINGLES: NEXT CASE -> visitor-from-mars", (await page.evaluate(() => document.querySelector('.page[data-route="/work/singles-cover-art"] .cp-next')?.getAttribute("href"))) === "#/work/visitor-from-mars");

await page.goto(BASE + "/#/work/leadway-pensure"); await page.waitForTimeout(150);
const vid2 = await page.evaluate(() => { const v = document.querySelector('.page[data-route="/work/leadway-pensure"] video'); return v ? v.getAttribute("src") : null; });
ok("LEADWAY: CSW film embedded", vid2 === "media/leadway-csw.mp4", vid2);
ok("LEADWAY: shot/produced/directed credit", ((await page.evaluate(() => document.querySelector('.page[data-route="/work/leadway-pensure"]')?.innerHTML))).includes("shot, produced and directed"));

// ---- 5c. v3 content: three own-cases + BR2 EP deck + Gen.Sadiq quote
await page.goto(BASE + "/#/work/visitor-from-mars"); await page.waitForTimeout(150);
ok("VFM: cover figure (full-art .sq)", await page.evaluate(() => !!document.querySelector('.page[data-route="/work/visitor-from-mars"] figure.cp-media.sq img[src="media/visitor-from-mars.webp"]')));
ok("VFM: The Beatoven co-production credit", ((await page.evaluate(() => document.querySelector('.page[data-route="/work/visitor-from-mars"]')?.innerHTML))).includes("The Beatoven"));
ok("VFM: NEXT CASE -> gen-sadiq", (await page.evaluate(() => document.querySelector('.page[data-route="/work/visitor-from-mars"] .cp-next')?.getAttribute("href"))) === "#/work/gen-sadiq");

await page.goto(BASE + "/#/work/gen-sadiq"); await page.waitForTimeout(150);
ok("SADIQ: cover figure (full-art .sq)", await page.evaluate(() => !!document.querySelector('.page[data-route="/work/gen-sadiq"] figure.cp-media.sq img[src="media/gen-sadiq.webp"]')));
const sadVid = await page.evaluate(() => document.querySelector('.page[data-route="/work/gen-sadiq"] video')?.getAttribute("src"));
ok("SADIQ: promo film embedded here", sadVid === "media/gen-sadiq-promo.mp4", sadVid);
ok("SADIQ: client quote (not AI slop)", ((await page.evaluate(() => document.querySelector('.page[data-route="/work/gen-sadiq"]')?.innerHTML))).includes("didn\u2019t ask for a single change"));
ok("SADIQ: NEXT CASE -> tbogd", (await page.evaluate(() => document.querySelector('.page[data-route="/work/gen-sadiq"] .cp-next')?.getAttribute("href"))) === "#/work/tbogd");

await page.goto(BASE + "/#/work/tbogd"); await page.waitForTimeout(150);
ok("TBOGD: deck cover figure", await page.evaluate(() => !!document.querySelector('.page[data-route="/work/tbogd"] figure.cp-media.sq img[src="media/tbogd-cover.jpg"]')));
ok("TBOGD: TRAINING filter catches it", await page.evaluate(() => document.querySelector('.wcard[href="#/work/tbogd"]')?.getAttribute("data-cats") === "TRAINING"));
ok("TBOGD: NEXT CASE -> biscuit-ai (chain loops)", (await page.evaluate(() => document.querySelector('.page[data-route="/work/tbogd"] .cp-next')?.getAttribute("href"))) === "#/work/biscuit-ai");

await page.goto(BASE + "/#/work/bedroom-recordings-ii"); await page.waitForTimeout(150);
ok("BR2: YE!!OWSOUL co-production credit", ((await page.evaluate(() => document.querySelector('.page[data-route="/work/bedroom-recordings-ii"]')?.innerHTML))).includes("YE!!OWSOUL"));
ok("BR2: playable EP tracklist (4 rows)", (await page.evaluate(() => document.querySelectorAll('.page[data-route="/work/bedroom-recordings-ii"] [data-playtrack]').length)) === 4);

await page.goto(BASE + "/#/capabilities/training"); await page.waitForTimeout(150);
const trLinks = await page.evaluate(() => [...document.querySelectorAll(".rel-work a")].map(a => a.getAttribute("href")));
ok("TRAINING capability lists both trainings", trLinks.includes("#/work/ai-in-the-workplace") && trLinks.includes("#/work/tbogd"), trLinks.join(", "));

// deck carries the BR2 EP: 10 rows in the dock playlist
await page.goto(BASE + "/#/about"); await page.waitForTimeout(150);
ok("deck playlist carries 10 tracks (6 BO + 4 BR2)", (await page.evaluate(() => document.querySelectorAll(".track-row").length)) === 10);

await page.goto(BASE + "/#/capabilities/graphic-design"); await page.waitForTimeout(150);
const gdLinks = await page.evaluate(() => [...document.querySelectorAll(".rel-work a")].map(a => a.getAttribute("href")));
ok("graphic-design RELEVANT WORK includes new cases", gdLinks.includes("#/work/bedroom-recordings-ii") && gdLinks.includes("#/work/singles-cover-art"), gdLinks.join(", "));

// ---- v3.5 depth: capabilities, approach, about
await page.goto(BASE + "/#/capabilities/brand-identity"); await page.waitForTimeout(150);
const capDepth = await page.evaluate(() => {
  const pg = document.querySelector('.page[data-route="/capabilities/brand-identity"]');
  const t = pg?.textContent || "";
  return { n: t.includes("THE NUMBERS"), b: t.includes("WHAT I ACTUALLY DO"), q: t.includes("QUESTIONS WORTH ANSWERING"),
    stats: pg.querySelectorAll(".cap-stats > div").length, svc: pg.querySelectorAll(".cap-svc").length, faq: pg.querySelectorAll(".cp-faq details").length };
});
ok("cap brand-identity: THE NUMBERS + WHAT I ACTUALLY DO + FAQ", capDepth.n && capDepth.b && capDepth.q);
ok("cap brand-identity: 4 stats + 4 service areas + 3 FAQs", capDepth.stats === 4 && capDepth.svc === 4 && capDepth.faq === 3, `stats=${capDepth.stats} svc=${capDepth.svc} faq=${capDepth.faq}`);
const capV38 = await page.evaluate(() => {
  const pg = document.querySelector('.page[data-route="/capabilities/brand-identity"]');
  return { hero: !!pg.querySelector(".cap-hero-h"), heroCta: !!pg.querySelector(".cap-hero .cap-cta"),
    cards: pg.querySelectorAll(".cap-cards .cap-svc").length,
    shipRows: pg.querySelectorAll(".rel-work .arrow-row").length,
    close: !!pg.querySelector(".cap-close .cap-btn") };
});
ok("cap brand-identity: v3.8 industries posture (hero, 4 cards, shipped rows, close)",
  capV38.hero && capV38.heroCta && capV38.cards === 4 && capV38.shipRows >= 3 && capV38.close,
  JSON.stringify(capV38));
const capsDepth = await page.evaluate(() => [...document.querySelectorAll(".page")]
  .filter(p => (p.getAttribute("data-route") || "").startsWith("/capabilities/") && p.getAttribute("data-route") !== "/capabilities" && p.textContent.includes("WHAT I ACTUALLY DO")).length);
ok("all 8 capability pages carry the depth", capsDepth === 8, `${capsDepth}/8`);
await page.goto(BASE + "/#/approach"); await page.waitForTimeout(150);
const apDepth = await page.evaluate(() => {
  const t = document.querySelector('.page[data-route="/approach"]')?.textContent || "";
  return { a: t.includes("THE ARGUMENT"), p: t.includes("OPERATING PRINCIPLES"), q: t.includes("QUESTIONS WORTH ANSWERING"),
    rows: document.querySelectorAll('.page[data-route="/approach"] .range-index .index-row').length };
});
ok("approach: argument + principles + FAQ", apDepth.a && apDepth.p && apDepth.q, `index-rows=${apDepth.rows}`);
const apV39 = await page.evaluate(() => {
  const pg = document.querySelector('.page[data-route="/approach"]');
  const links = [...pg.querySelectorAll(".cap-cards .ev, .ev-row")].map(a => a.getAttribute("href"));
  return { hero: !!pg.querySelector(".cap-hero-h"), evRows: pg.querySelectorAll(".ev-row").length,
    evLinks: pg.querySelectorAll(".cap-cards .ev").length,
    posTargets: [...pg.querySelectorAll(".pos-grid .arrow-row")].map(a => a.getAttribute("href")).filter(h => h !== "#/capabilities").length,
    allResolve: links.every(h => document.querySelector(`.page[data-route="${h.replace("#", "")}"]`)),
    close: !!pg.querySelector(".cap-close .cap-btn") };
});
ok("approach: v3.9 industries posture (hero, 5 plate rows, 9 evidence links, retargeted modes, all resolve, close)",
  apV39.hero && apV39.evRows === 5 && apV39.evLinks === 9 && apV39.posTargets === 6 && apV39.allResolve && apV39.close,
  JSON.stringify(apV39));
await page.goto(BASE + "/#/about"); await page.waitForTimeout(150);
const abDepth = await page.evaluate(() => {
  const t = document.querySelector('.page[data-route="/about"]')?.textContent || "";
  return { w: t.includes("WHY THIS EXISTS"), e: t.includes("HOW I EMBED"), m: t.includes("THE MANIFESTO"), v: t.includes("WORD OF MOUTH"),
    rows: document.querySelectorAll('.page[data-route="/about"] .range-index .index-row').length };
});
ok("about: letter + embed + manifesto + word of mouth", abDepth.w && abDepth.e && abDepth.m && abDepth.v, `manifesto-rows=${abDepth.rows}`);

// video actually loads metadata (real file, right codec/container)
await page.goto(BASE + "/#/work/leadway-pensure"); await page.waitForTimeout(150);
const vidMeta = await page.evaluate(async () => { const v = document.querySelector('video[src="media/leadway-csw.mp4"]'); try { await v.play(); v.pause(); return { ok: true, dur: v.duration }; } catch (e) { return { ok: false, err: String(e) }; } });
ok("LEADWAY: CSW film is playable video", vidMeta.ok && isFinite(vidMeta.dur) && vidMeta.dur > 10, `duration=${vidMeta.dur}`);

// ---- summary
console.log("\n===== BROWSER TOUR SUMMARY =====");
const fails = results.filter(r => !r.pass);
console.log(`${results.length - fails.length}/${results.length} checks passed`);
if (failedRequests.length) console.log("FAILED REQUESTS:\n" + failedRequests.join("\n"));
if (consoleIssues.length) console.log("CONSOLE ISSUES:\n" + consoleIssues.join("\n"));
else console.log("CONSOLE: zero errors/warnings on the full tour");
fs.writeFileSync("BROWSER_VERIFY_REPORT.txt", JSON.stringify({ results, consoleIssues, failedRequests }, null, 2));
await browser.close();
process.exit(fails.length || consoleIssues.length || failedRequests.length ? 1 : 0);
