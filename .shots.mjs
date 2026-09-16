// .shots.mjs — screenshot proof for v3.7 (image-fit + mobile)
import { chromium } from "playwright-core";

const BASE = "http://localhost:8123";
const browser = await chromium.launch();

// desktop
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.goto(BASE + "/#/work");
await page.waitForTimeout(800);
await page.screenshot({ path: "/tmp/proof/10_work_grid_masonry.png" });
await page.goto(BASE + "/#/work/biscuit-ai");
await page.waitForTimeout(800);
await page.evaluate(() => document.querySelector('.page[data-route="/work/biscuit-ai"] .cp-media').scrollIntoView({ block: "center", behavior: "instant" }));
await page.waitForTimeout(500);
await page.screenshot({ path: "/tmp/proof/11_case_poster.png" });
await page.goto(BASE + "/#/work/skaame");
await page.waitForTimeout(800);
await page.evaluate(() => document.querySelector('.page[data-route="/work/skaame"] .cp-media').scrollIntoView({ block: "center", behavior: "instant" }));
await page.waitForTimeout(500);
await page.screenshot({ path: "/tmp/proof/12_skaame_poster.png" });
await page.close();

// mobile
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(BASE + "/#/work");
await m.waitForTimeout(800);
await m.screenshot({ path: "/tmp/proof/13_mobile_grid.png" });
await m.goto(BASE + "/#/work/biscuit-ai");
await m.waitForTimeout(800);
await m.screenshot({ path: "/tmp/proof/14_mobile_hero.png" });
await m.evaluate(() => document.querySelector('.page[data-route="/work/biscuit-ai"] .cp-sec[data-cs="challenge"]').scrollIntoView({ block: "center", behavior: "instant" }));
await m.waitForTimeout(600);
await m.screenshot({ path: "/tmp/proof/15_mobile_pill.png" });
await m.close();

await browser.close();
console.log("v3.7 shots done");
