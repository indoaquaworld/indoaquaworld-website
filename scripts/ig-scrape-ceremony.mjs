import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const COOKIE_FILE = join(__dirname, 'ig-cookies.json');
const SCREENSHOT_DIR = join(__dirname, 'screenshots', 'ceremony');
mkdirSync(SCREENSHOT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

const cookies = JSON.parse(readFileSync(COOKIE_FILE, 'utf-8'));
await context.addCookies(cookies);

const page = await context.newPage();

// Load the event account and scroll to get more posts
console.log('Loading @dufiofficial.event...');
await page.goto('https://www.instagram.com/dufiofficial.event/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForSelector('a[href*="/p/"]', { timeout: 15000 }).catch(() => {});
await page.waitForTimeout(3000);

// Scroll down multiple times to load more posts
for (let i = 0; i < 15; i++) {
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(1500);
}

const postLinks = await page.$$eval('a[href*="/p/"]', links =>
  [...new Set(links.map(a => a.href))]
);
console.log(`Found ${postLinks.length} posts total`);

// Visit each post and screenshot it
for (const link of postLinks) {
  try {
    const postId = link.match(/\/p\/([^/]+)/)?.[1] || 'unknown';
    await page.goto(link, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: join(SCREENSHOT_DIR, `${postId}.png`), fullPage: false });
    console.log(`  Captured: ${postId}`);
  } catch (err) {
    console.error(`  Failed: ${link} - ${err.message}`);
  }
}

await browser.close();
console.log(`\nDone. Screenshots in ${SCREENSHOT_DIR}`);
process.exit(0);
