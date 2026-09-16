import { chromium } from "playwright-core";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 900 } });
const errs = [];
p.on("pageerror", e => errs.push(String(e)));
p.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
await p.goto("file:///home/thelostbiscuit/Desktop/Creations/Branding-Portfolio-master/loader_preview.html");
await p.waitForTimeout(600);
const info = await p.evaluate(() => {
  const wave = document.getElementById("wavePath");
  const stage = document.getElementById("stage");
  const r = stage.getBoundingClientRect();
  const wm = document.getElementById("wm");
  const uses = [...document.querySelectorAll("use")].map(u => u.getAttribute("href"));
  return { d: wave && wave.getAttribute("d"), stage: [r.x, r.y, r.width, r.height],
           wmExists: !!wm, uses, count: document.getElementById("count").textContent };
});
console.log(JSON.stringify({ errs, info }, null, 1));
await b.close();
