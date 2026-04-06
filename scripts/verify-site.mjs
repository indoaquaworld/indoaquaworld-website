import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = join(__dirname, 'screenshots');
mkdirSync(SCREENSHOT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const pages = [
  { name: 'home', url: 'https://indoaquaworld.com' },
  { name: 'platform', url: 'https://indoaquaworld.com/platform' },
  { name: 'dufi', url: 'https://indoaquaworld.com/dufi' },
  { name: 'about', url: 'https://indoaquaworld.com/about' },
];

// Desktop
const desktop = await browser.newContext({ viewport: { width: 1280, height: 900 } });
for (const pg of pages) {
  const page = await desktop.newPage();
  await page.goto(pg.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: join(SCREENSHOT_DIR, `${pg.name}-desktop.png`), fullPage: true });

  // Check broken images
  const imgs = await page.$$eval('img', imgs => imgs.map(i => ({
    src: i.src, ok: i.naturalWidth > 0, alt: i.alt
  })));
  const broken = imgs.filter(i => !i.ok);
  if (broken.length) {
    console.log(`[${pg.name}] BROKEN IMAGES: ${broken.map(i => i.src).join(', ')}`);
  } else {
    console.log(`[${pg.name}] ${imgs.length} images, all OK`);
  }
  await page.close();
}

// Mobile - home only
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mPage = await mobile.newPage();
await mPage.goto('https://indoaquaworld.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
await mPage.waitForTimeout(3000);
await mPage.screenshot({ path: join(SCREENSHOT_DIR, 'home-mobile.png'), fullPage: true });

console.log('\nScreenshots saved.');
await browser.close();
process.exit(0);
