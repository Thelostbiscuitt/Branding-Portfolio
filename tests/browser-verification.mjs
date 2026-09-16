import assert from 'node:assert/strict'
import { chromium } from 'playwright-core'

const base = process.env.HABIBCORE_TEST_URL || 'http://127.0.0.1:4173'
const browser = await chromium.launch({ headless: true })
const issues = []
let checks = 0

function observe(page) {
  page.on('pageerror', (error) => issues.push(`page: ${error.message}`))
  page.on('console', (message) => {
    // Local R2 is empty during this static-site test; response checks below
    // retain every other 4xx/5xx asset failure with its URL.
    if (message.type() === 'error' && !message.text().includes('Failed to load resource: the server responded with a status of 404')) {
      issues.push(`console: ${message.text()}`)
    }
  })
  page.on('response', (response) => {
    if (response.status() >= 400 && response.url().startsWith(base) && !response.url().includes('/Music/')) {
      issues.push(`HTTP ${response.status()}: ${response.url()}`)
    }
  })
}

function check(name, condition) {
  assert.ok(condition, name)
  checks++
  console.log(`PASS ${name}`)
}

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  observe(page)
  const homeResponse = await page.goto(`${base}/`, { waitUntil: 'domcontentloaded' })
  check('production CSP disallows eval', !homeResponse.headers()['content-security-policy']?.includes('unsafe-eval'))
  const first = await page.evaluate(() => {
    const loader = document.querySelector('#hc-loader')
    const word = loader.querySelector('.hc-base .hc-word')
    const mark = loader.querySelector('.hc-mark')
    const wordRect = word.getBoundingClientRect()
    const markRect = mark.getBoundingClientRect()
    return {
      visible: getComputedStyle(loader).display !== 'none',
      word: word.textContent,
      percent: Number(loader.querySelector('.hc-percent').textContent.replace('%', '')),
      clip: getComputedStyle(loader.querySelector('.hc-fill')).clipPath,
      zoom: loader.querySelector('.hc-zoom-mark').getAnimations().length,
      aligned: Math.abs(wordRect.x + wordRect.width / 2 - markRect.x - markRect.width / 2) < 2,
      logoLoaded: mark.complete && mark.naturalWidth === 820,
    }
  })
  check('brand lockup is visible on the initial document', first.visible && first.word === 'HABIBCORE' && first.aligned)
  check('initial fill begins dark without an opening zoom', first.percent < 30 && first.zoom === 0 && /inset\((?:[7-9]\d|100)%/.test(first.clip))
  check('transparent production logo asset loads', first.logoLoaded)

  await page.evaluate(() => {
    window.__hcTrace = []
    const sample = () => {
      const loader = document.querySelector('#hc-loader')
      if (!loader) return
      window.__hcTrace.push({
        percent: Number(loader.querySelector('.hc-percent').textContent.replace('%', '')),
        clip: parseFloat(getComputedStyle(loader.querySelector('.hc-fill')).clipPath.slice(6)),
        zoom: loader.querySelector('.hc-zoom-mark').getAnimations().length > 0,
      })
      requestAnimationFrame(sample)
    }
    requestAnimationFrame(sample)
  })
  await page.waitForTimeout(300)
  const middle = await page.evaluate(() => window.__hcTrace.at(-1))
  check('percentage and physical fill share one progress value', middle.percent > 0 && middle.percent < 100 && Math.abs(middle.percent + middle.clip - 100) <= 2)
  await page.locator('#hc-loader').waitFor({ state: 'detached', timeout: 6000 })
  const trace = await page.evaluate(() => window.__hcTrace)
  const zoomStart = trace.find((item) => item.zoom)
  check('logo zoom starts only after full fill', zoomStart?.percent === 100 && zoomStart?.clip === 0)
  check('portfolio is usable immediately after reveal', await page.evaluate(() => !document.body.classList.contains('is-locked') && !document.querySelector('main').inert && document.querySelector('.hero')?.classList.contains('in')))
  check('focus returns to the page', await page.evaluate(() => document.activeElement?.classList.contains('skip-link')))

  await page.reload({ waitUntil: 'domcontentloaded' })
  check('same-session refresh skips the full intro', await page.evaluate(() => document.documentElement.classList.contains('hc-intro-seen') && getComputedStyle(document.querySelector('#hc-loader')).display === 'none'))
  await context.close()

  const sizes = [
    [320, 568], [430, 932], [768, 1024], [1024, 768], [1366, 768], [2560, 1440], [3440, 1440],
  ]
  for (const [width, height] of sizes) {
    const viewportContext = await browser.newContext({ viewport: { width, height } })
    const viewportPage = await viewportContext.newPage()
    observe(viewportPage)
    await viewportPage.goto(`${base}/`, { waitUntil: 'domcontentloaded' })
    const layout = await viewportPage.evaluate(() => {
      const word = document.querySelector('.hc-base .hc-word').getBoundingClientRect()
      const mark = document.querySelector('.hc-base .hc-mark').getBoundingClientRect()
      return {
        inside: word.left >= -1 && word.right <= innerWidth + 1,
        centered: Math.abs(word.left + word.width / 2 - innerWidth / 2) < 3,
        markInside: mark.top >= 0 && mark.bottom < innerHeight,
        noOverflow: document.documentElement.scrollWidth <= innerWidth + 2,
      }
    })
    check(`loader layout ${width}×${height}`, Object.values(layout).every(Boolean))
    await viewportPage.locator('#hc-loader').waitFor({ state: 'detached', timeout: 6000 })
    await viewportContext.close()
  }

  const reduced = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } })
  const reducedPage = await reduced.newPage()
  observe(reducedPage)
  const reducedStart = Date.now()
  await reducedPage.goto(`${base}/`, { waitUntil: 'domcontentloaded' })
  await reducedPage.locator('#hc-loader').waitFor({ state: 'detached', timeout: 1500 })
  check('reduced motion reveals promptly without logo zoom', Date.now() - reducedStart < 1500 && await reducedPage.evaluate(() => !document.body.classList.contains('is-locked')))
  await reduced.close()

  const noJs = await browser.newContext({ javaScriptEnabled: false })
  const noJsPage = await noJs.newPage()
  await noJsPage.goto(`${base}/`, { waitUntil: 'domcontentloaded' })
  check('no-JS portfolio remains visible', await noJsPage.evaluate(() =>
    getComputedStyle(document.querySelector('#hc-loader')).display === 'none' &&
    getComputedStyle(document.querySelector('.hero h1 .lm > span')).transform === 'none' &&
    getComputedStyle(document.querySelector('.hero .rv')).opacity === '1'))
  await noJs.close()

  const routes = ['1ethfp', 'ai-workplace-training', 'biscuit-ai', 'blvckoreo-epk', 'chef4me', 'layo-isaac-epk', 'leadway-pensure', 'olumayowa-nursing-home', 'relay', 'skaame-epk']
  const routeContext = await browser.newContext()
  const routePage = await routeContext.newPage()
  observe(routePage)
  for (const slug of routes) {
    const response = await routePage.goto(`${base}/projects/${slug}`, { waitUntil: 'domcontentloaded' })
    check(`direct project route ${slug}`, response.status() === 200 && await routePage.locator('h1').count() === 1)
    await routePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2))
    await routePage.waitForTimeout(100)
  }
  await routePage.goto(`${base}/projects/biscuit-ai`, { waitUntil: 'domcontentloaded' })
  await routePage.locator('a[href="/projects/chef4me"]').last().click()
  await routePage.waitForURL('**/projects/chef4me')
  check('client-side project navigation works without a loader', await routePage.locator('h1').textContent().then((title) => title.includes('Chef4Me')) && await routePage.locator('#hc-loader').count() === 0)
  await routePage.goto(`${base}/projects/biscuit-ai`, { waitUntil: 'domcontentloaded' })
  await routePage.locator('nav a[href="/#work"]').first().click()
  await routePage.waitForURL('**/#work')
  await routePage.locator('.hero.in').waitFor({ state: 'attached', timeout: 4000 })
  check('project-to-home navigation initializes homepage without replay', await routePage.evaluate(() => {
    const loader = document.querySelector('#hc-loader')
    return document.documentElement.classList.contains('hc-intro-seen') && !!document.querySelector('.hero.in') && (!loader || getComputedStyle(loader).display === 'none')
  }))
  await routePage.locator('.p-btn').nth(1).click()
  check('homepage accordion still works after project navigation', await routePage.locator('.p-btn').nth(1).getAttribute('aria-expanded') === 'true')
  check('music controls remain initialized', await routePage.evaluate(() => typeof window.__SOUND?.toggle === 'function'))
  await routeContext.close()

  check('no browser console or local asset failures', issues.length === 0)
  console.log(`${checks} browser checks passed`)
} finally {
  if (issues.length) console.error('Browser issues:', issues)
  await browser.close()
}
