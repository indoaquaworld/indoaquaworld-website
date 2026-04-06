import { chromium } from 'playwright';

const COOKIE_FILE = new URL('./ig-cookies.json', import.meta.url).pathname;

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext();
const page = await context.newPage();

await page.goto('https://www.instagram.com/accounts/login/');
console.log('Log in to Instagram, then press Enter in this terminal...');

// Wait for user to authenticate
process.stdin.resume();
await new Promise(resolve => process.stdin.once('data', resolve));

// Save cookies
const cookies = await context.cookies();
const fs = await import('fs');
fs.writeFileSync(COOKIE_FILE, JSON.stringify(cookies, null, 2));
console.log(`Cookies saved to ${COOKIE_FILE}`);

await browser.close();
process.exit(0);
