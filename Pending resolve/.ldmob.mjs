import { chromium } from "playwright-core";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto("http://localhost:8123/#/");
await p.waitForTimeout(1000);
await p.screenshot({ path: "/tmp/proof/45_mobile_loader.png" });
await b.close();
console.log("done");
