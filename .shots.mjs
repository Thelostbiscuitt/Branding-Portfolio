// .shots.mjs — screenshot proof for v3.8 (capability pages: industries posture)
import { chromium } from "playwright-core";

const BASE = "http://localhost:8123";
const browser = await chromium.launch();

// desktop
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.goto(BASE + "/#/capabilities/brand-identity");
await page.waitForTimeout(800);
await page.screenshot({ path: "/tmp/proof/10_cap_hero.png" });
for (const [i, label] of [["11", "numbers"], ["12", "statement"], ["13", "cards"], ["14", "shipped"], ["15", "close"]]) {
  await page.evaluate((lbl) => {
    const secs = document.querySelectorAll('.page[data-route="/capabilities/brand-identity"] .cap-sec, .page[data-route="/capabilities/brand-identity"] .cap-close');
    const map = { numbers: 0, statement: 1, cards: 2, shipped: 3, close: 4 };
    const el = lbl === "close" ? document.querySelector('.page[data-route="/capabilities/brand-identity"] .cap-close') : secs[map[lbl]];
    el.scrollIntoView({ block: "start", behavior: "instant" });
    window.scrollBy(0, -20);
  }, label);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `/tmp/proof/${i}_cap_${label}.png` });
}
await page.close();

// mobile
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(BASE + "/#/capabilities/brand-identity");
await m.waitForTimeout(800);
await m.screenshot({ path: "/tmp/proof/16_mobile_cap_hero.png" });
await m.evaluate(() => document.querySelector('.page[data-route="/capabilities/brand-identity"] .cap-cards').scrollIntoView({ block: "center", behavior: "instant" }));
await m.waitForTimeout(400);
await m.screenshot({ path: "/tmp/proof/17_mobile_cap_cards.png" });
await m.close();

console.log("v3.8 shots done");

// v3.9: approach page
const a = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await a.goto(BASE + "/#/approach");
await a.waitForTimeout(800);
await a.screenshot({ path: "/tmp/proof/18_approach_hero.png" });
const secs = await a.evaluate(() => [...document.querySelectorAll('.page[data-route="/approach"] .cap-sec')].length);
for (const [i, idx] of [["19", 2], ["20", 3], ["21", 4]]) {
  await a.evaluate((n) => document.querySelectorAll('.page[data-route="/approach"] .cap-sec')[n].scrollIntoView({ block: "start", behavior: "instant" }), idx);
  await a.waitForTimeout(400);
  await a.screenshot({ path: `/tmp/proof/${i}_approach_sec${idx}.png` });
}
await a.close();
const m2 = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m2.goto(BASE + "/#/approach");
await m2.waitForTimeout(800);
await m2.screenshot({ path: "/tmp/proof/22_mobile_approach.png" });
await m2.close();
console.log("v3.9 approach shots done, cap-secs:", secs);
await browser.close();
