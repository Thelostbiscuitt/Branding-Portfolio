// .audit.mjs — v3.7 image-fit + mobile audit
import { chromium } from "playwright-core";

const BASE = "http://localhost:8123";
const ROUTES = ["/", "/work", "/work/biscuit-ai", "/work/chef4me", "/work/leadway-pensure",
  "/work/olumayowa-nursing-home", "/work/ai-in-the-workplace", "/work/relay",
  "/work/skaame", "/work/layo-isaac", "/work/blvckoreo", "/work/1ethfp",
  "/work/bedroom-recordings-ii", "/work/singles-cover-art",
  "/work/visitor-from-mars", "/work/gen-sadiq", "/work/tbogd",
  "/capabilities", "/capabilities/brand-identity", "/capabilities/training", "/approach", "/about", "/contact"];

const browser = await chromium.launch();
const report = { crops: [], stretched: [], overflow: [], tinytext: [], targets: [] };

async function auditViewport(vp, label) {
  const page = await browser.newPage({ viewport: vp });
  for (const r of ROUTES) {
    await page.goto(BASE + "/#" + r);
    await page.waitForTimeout(450);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(350);
    const data = await page.evaluate((isMobile) => {
      const out = { overflowX: 0, wide: [], imgs: [], small: [], smallTargets: [] };
      out.overflowX = Math.max(document.documentElement.scrollWidth - window.innerWidth, 0);
      for (const el of document.querySelectorAll("body *")) {
        const b = el.getBoundingClientRect();
        if (b.width > 0 && b.right > window.innerWidth + 2 && getComputedStyle(el).position !== "fixed") {
          out.wide.push(el.tagName + "." + String(el.className).split(" ")[0] + " right=" + Math.round(b.right));
        }
      }
      for (const img of document.querySelectorAll("img")) {
        if (!img.naturalWidth || !img.naturalHeight) continue;
        const b = img.getBoundingClientRect();
        if (b.width < 8 || b.height < 8) continue;
        const cs = getComputedStyle(img);
        out.imgs.push({
          src: img.src.split("/").pop(), fit: cs.objectFit, pos: cs.objectPosition,
          box: +(b.width / b.height).toFixed(2), nat: +(img.naturalWidth / img.naturalHeight).toFixed(2),
          h: Math.round(b.height)
        });
      }
      for (const el of document.querySelectorAll("body *")) {
        if (!el.textContent.trim() || el.children.length) continue;
        const fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs < 10) out.small.push(el.tagName + "." + String(el.className).split(" ")[0] + " " + fs + "px");
      }
      for (const el of document.querySelectorAll("a, button")) {
        const b = el.getBoundingClientRect();
        if (b.width > 0 && b.height > 0 && (b.width < 32 || b.height < 32) && isMobile) {
          out.smallTargets.push((el.tagName + "." + String(el.className).split(" ")[0]).slice(0, 40) + " " + Math.round(b.width) + "x" + Math.round(b.height));
        }
      }
      return out;
    }, vp.width < 500);
    if (data.overflowX > 0) report.overflow.push(`${label} ${r} overflowX=${data.overflowX}px wide=${data.wide.slice(0, 3).join(" | ")}`);
    if (data.small.length > 3) report.tinytext.push(`${label} ${r}: ${[...new Set(data.small)].slice(0, 4).join(", ")}`);
    if (vp.width < 500 && data.smallTargets.length) report.targets.push(`${label} ${r}: ${[...new Set(data.smallTargets)].slice(0, 5).join(", ")}`);
    for (const im of data.imgs) {
      const diff = Math.abs(im.box - im.nat);
      if (im.fit === "cover" && diff > 0.08) report.crops.push(`${label} ${r} ${im.src} box=${im.box} nat=${im.nat} fit=cover crop=${Math.round((1 - Math.min(im.box / im.nat, im.nat / im.box)) * 100)}% h=${im.h}px`);
      if ((im.fit === "fill" || !im.fit) && diff > 0.08) report.stretched.push(`${label} ${r} ${im.src} box=${im.box} nat=${im.nat}`);
    }
  }
  await page.close();
}

await auditViewport({ width: 1600, height: 900 }, "D");
await auditViewport({ width: 390, height: 844 }, "M");

console.log("=== CROPPED (cover, ratio mismatch > 8%) ===");
console.log(report.crops.length ? [...new Set(report.crops)].join("\n") : "none");
console.log("\n=== STRETCHED ===");
console.log(report.stretched.length ? [...new Set(report.stretched)].join("\n") : "none");
console.log("\n=== MOBILE OVERFLOW ===");
console.log(report.overflow.length ? [...new Set(report.overflow)].join("\n") : "none");
console.log("\n=== TINY TEXT (<10px) ===");
console.log(report.tinytext.length ? [...new Set(report.tinytext)].join("\n") : "none");
console.log("\n=== SMALL TAP TARGETS (mobile) ===");
console.log(report.targets.length ? [...new Set(report.targets)].join("\n") : "none");
await browser.close();
