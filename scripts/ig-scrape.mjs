import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const COOKIE_FILE = join(__dirname, 'ig-cookies.json');
const OUTPUT_FILE = join(__dirname, 'ig-events.json');
const SCREENSHOT_DIR = join(__dirname, 'screenshots');

mkdirSync(SCREENSHOT_DIR, { recursive: true });

const accounts = ['dufi_official', 'dufiofficial.event'];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

// Load saved cookies
const cookies = JSON.parse(readFileSync(COOKIE_FILE, 'utf-8'));
await context.addCookies(cookies);

const allPosts = [];

for (const account of accounts) {
  console.log(`Scraping @${account}...`);
  const page = await context.newPage();
  await page.goto(`https://www.instagram.com/${account}/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('a[href*="/p/"]', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(5000);

  // Get all post links
  const postLinks = await page.$$eval('a[href*="/p/"]', links =>
    [...new Set(links.map(a => a.href))]
  );
  console.log(`  Found ${postLinks.length} posts`);

  for (const link of postLinks) {
    try {
      await page.goto(link, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(5000);

      // Take screenshot
      const postId = link.match(/\/p\/([^/]+)/)?.[1] || 'unknown';
      const screenshotPath = join(SCREENSHOT_DIR, `${account}_${postId}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });

      const data = await page.evaluate(() => {
        // Try multiple selectors for caption — IG renders these dynamically
        const selectors = [
          'h1',
          'article span[dir="auto"]',
          'div[role="dialog"] span[dir="auto"]',
          'span[class*="x193iq5w"] span',
          'ul li span[dir="auto"]',
        ];
        let caption = '';
        for (const sel of selectors) {
          const els = document.querySelectorAll(sel);
          for (const el of els) {
            const text = el.textContent?.trim();
            if (text && text.length > 10) {
              caption = text;
              break;
            }
          }
          if (caption) break;
        }

        // Get date
        const timeEl = document.querySelector('time');
        const date = timeEl ? timeEl.getAttribute('datetime') : '';

        // Get all images in the post
        const images = [];
        document.querySelectorAll('img[src*="instagram"], img[src*="cdninstagram"], img[src*="fbcdn"]').forEach(img => {
          const src = img.src;
          if (src && !src.includes('profile') && !src.includes('44x44') && !src.includes('150x150')) {
            images.push(src);
          }
        });

        return { caption, date, images };
      });

      allPosts.push({
        account: `@${account}`,
        url: link,
        postId,
        screenshot: screenshotPath,
        ...data,
      });
      console.log(`  Scraped: ${postId} (${data.date?.slice(0, 10) || 'no date'}) caption: ${data.caption?.slice(0, 80) || '(empty)'}...`);
    } catch (err) {
      console.error(`  Failed: ${link} - ${err.message}`);
    }
  }

  await page.close();
}

await browser.close();

writeFileSync(OUTPUT_FILE, JSON.stringify(allPosts, null, 2));
console.log(`\nDone. ${allPosts.length} posts saved to ${OUTPUT_FILE}`);
console.log(`Screenshots saved to ${SCREENSHOT_DIR}`);
process.exit(0);
