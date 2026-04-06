import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = join(__dirname, 'screenshots');
import { mkdirSync } from 'fs';
mkdirSync(SCREENSHOT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });

// Desktop viewport
const desktop = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const dPage = await desktop.newPage();
await dPage.goto('https://indoaquaworld.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
await dPage.waitForTimeout(3000);
await dPage.screenshot({ path: join(SCREENSHOT_DIR, 'desktop-full.png'), fullPage: true });
await dPage.screenshot({ path: join(SCREENSHOT_DIR, 'desktop-hero.png') });

// Scroll to each section and screenshot
for (const section of ['features', 'dufi', 'about', 'contact']) {
  const el = await dPage.$(`#${section}`);
  if (el) {
    await el.scrollIntoViewIfNeeded();
    await dPage.waitForTimeout(500);
    await dPage.screenshot({ path: join(SCREENSHOT_DIR, `desktop-${section}.png`) });
  }
}

// Check all images
const images = await dPage.$$eval('img', imgs => imgs.map(img => ({
  src: img.src,
  alt: img.alt,
  naturalWidth: img.naturalWidth,
  naturalHeight: img.naturalHeight,
  displayed: img.offsetWidth > 0 && img.offsetHeight > 0,
})));
console.log('\n=== Images ===');
for (const img of images) {
  const status = img.naturalWidth > 0 ? 'OK' : 'BROKEN';
  console.log(`  [${status}] ${img.src} (${img.naturalWidth}x${img.naturalHeight}, displayed: ${img.displayed}, alt: "${img.alt}")`);
}

// Check text content
const textContent = await dPage.evaluate(() => {
  const sections = {};
  for (const id of ['features', 'dufi', 'about', 'contact']) {
    const el = document.getElementById(id);
    if (el) sections[id] = el.textContent.replace(/\s+/g, ' ').trim().slice(0, 300);
  }
  // Hero
  const hero = document.querySelector('.hero');
  if (hero) sections['hero'] = hero.textContent.replace(/\s+/g, ' ').trim();
  return sections;
});
console.log('\n=== Text Content ===');
for (const [section, text] of Object.entries(textContent)) {
  console.log(`\n[${section}]`);
  console.log(`  ${text}`);
}

// Check links
const links = await dPage.$$eval('a', anchors => anchors.map(a => ({
  href: a.href,
  text: a.textContent.trim().slice(0, 50),
})));
console.log('\n=== Links ===');
for (const link of links) {
  console.log(`  ${link.text} -> ${link.href}`);
}

// Mobile viewport
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mPage = await mobile.newPage();
await mPage.goto('https://indoaquaworld.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
await mPage.waitForTimeout(3000);
await mPage.screenshot({ path: join(SCREENSHOT_DIR, 'mobile-full.png'), fullPage: true });
await mPage.screenshot({ path: join(SCREENSHOT_DIR, 'mobile-hero.png') });

console.log('\nScreenshots saved to scripts/screenshots/');

await browser.close();
process.exit(0);
