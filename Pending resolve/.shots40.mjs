import { chromium } from "playwright-core";
const BASE = "http://localhost:8123";
const browser = await chromium.launch();
const shots = [
  ["30_home", "/"], ["31_work", "/work"], ["32_caps", "/capabilities"],
  ["33_cap_brand", "/capabilities/brand-identity"], ["34_cap_ai", "/capabilities/ai-systems"],
  ["35_approach", "/approach"], ["36_about", "/about"], ["37_contact", "/contact"],
  ["38_case_biscuit", "/work/biscuit-ai"], ["39_case_skaame", "/work/skaame"],
];
const p = await browser.newPage({ viewport: { width: 1600, height: 900 } });
for (const [name, route] of shots) {
  await p.goto(BASE + "/#" + route);
  await p.waitForTimeout(700);
  await p.screenshot({ path: `/tmp/proof/${name}.png` });
}
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(BASE + "/#/");
await m.waitForTimeout(700);
await m.screenshot({ path: "/tmp/proof/40_mobile_home.png" });
await browser.close();
console.log("v4.0 shots done");
