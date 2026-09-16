import { chromium } from "playwright-core";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 900 } });
await p.goto("file:///home/thelostbiscuit/Desktop/Creations/Branding-Portfolio-master/loader_preview.html");
await p.waitForTimeout(400);
await p.evaluate(() => { document.getElementById("loader").classList.add("paused"); });
// freeze autoplay: override rAF-driven updates by re-setting progress after each wait
for (const [name, prog] of [["40a_start", .06], ["40b_wave_in", .3], ["40c_mid", .45], ["40d_full", .62], ["40e_second", .8], ["40f_100", .97]]) {
  await p.evaluate((x) => window.__setProgress(x), prog);
  await p.waitForTimeout(120);
  await p.evaluate((x) => window.__setProgress(x), prog);
  await p.screenshot({ path: `/tmp/proof/${name}.png` });
}
// mobile
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto("file:///home/thelostbiscuit/Desktop/Creations/Branding-Portfolio-master/loader_preview.html");
await m.waitForTimeout(400);
await m.evaluate(() => window.__setProgress(.45));
await m.waitForTimeout(120);
await m.evaluate(() => window.__setProgress(.45));
await m.screenshot({ path: "/tmp/proof/40g_mobile.png" });
await b.close();
console.log("loader shots done");
