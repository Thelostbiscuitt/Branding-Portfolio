// .shots.mjs — screenshot proof for v3.6
import { chromium } from "playwright-core";

const BASE = "http://localhost:8123";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });

// 1. work grid — top spacing
await page.goto(BASE + "/#/work");
await page.waitForTimeout(700);
await page.screenshot({ path: "/tmp/proof/1_work_grid_top.png" });

// 2. list view — real logo picker + wheel
await page.click('button[data-view="index"]');
await page.waitForTimeout(900);
await page.screenshot({ path: "/tmp/proof/2_wheel_logo.png" });

// 3. wheel moved + looped (scroll far past seam)
await page.evaluate(() => { document.querySelectorAll(".idx-row")[23].scrollIntoView({ block: "center", behavior: "instant" }); window.dispatchEvent(new Event("scroll")); });
await page.waitForTimeout(900);
await page.screenshot({ path: "/tmp/proof/3_wheel_moved.png" });

// 4. case hero
await page.goto(BASE + "/#/work/biscuit-ai");
await page.waitForTimeout(800);
await page.screenshot({ path: "/tmp/proof/4_case_hero.png" });

// 5. case scrolled — intro, challenge cards, pill
await page.evaluate(() => { document.querySelector('.page[data-route="/work/biscuit-ai"] .cp-sec[data-cs="challenge"]').scrollIntoView({ block: "center", behavior: "instant" }); });
await page.waitForTimeout(700);
await page.screenshot({ path: "/tmp/proof/5_case_challenge_pill.png" });

// 6. pill click -> result
await page.click('#casePill button[data-cs="result"]');
await page.waitForTimeout(900);
await page.screenshot({ path: "/tmp/proof/6_case_result.png" });

// 7. archive case with strip (singles)
await page.goto(BASE + "/#/work/singles-cover-art");
await page.waitForTimeout(700);
await page.evaluate(() => { document.querySelector('.page[data-route="/work/singles-cover-art"] .cp-strip')?.scrollIntoView({ block: "center", behavior: "instant" }); });
await page.waitForTimeout(600);
await page.screenshot({ path: "/tmp/proof/7_singles_strip.png" });

await browser.close();
console.log("shots done");
