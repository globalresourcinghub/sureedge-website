/**
 * Visual Audit — full-page screenshots of every page on Desktop, iOS, and
 * Android. Each spec captures 10 pages × 3 device profiles = 30 screenshots
 * per run. Output goes to visual-audit-results/ (gitignored).
 *
 * After running:
 *   node scripts/build-visual-report.js
 * to generate an HTML gallery.
 */
import { test, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { ALL_PAGES } from './helpers';

// Separate output folder so Playwright's test-results/ cleanup doesn't wipe it
const OUT = path.join(__dirname, '..', 'visual-audit-results');

test.beforeAll(() => {
  fs.mkdirSync(OUT, { recursive: true });
});

async function capture(page: Page, pageName: string, suffix: string) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(OUT, `${suffix}-${pageName}.png`),
    fullPage: true,
  });
}

test('capture all pages', async ({ page }, testInfo) => {
  const viewport =
    testInfo.project.name === 'chromium'
      ? 'desktop'
      : testInfo.project.name === 'mobile-ios'
      ? 'mobile'
      : testInfo.project.name === 'mobile-android'
      ? 'mobile-android'
      : testInfo.project.name;

  for (const p of ALL_PAGES) {
    const name = p === '/' ? 'home' : p.slice(1).replace(/\//g, '-');
    try {
      await page.goto(p, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await capture(page, name, viewport);
    } catch (err) {
      console.log(`skipped ${p}: ${(err as Error).message}`);
    }
  }
});
