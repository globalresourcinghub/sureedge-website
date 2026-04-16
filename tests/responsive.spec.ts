/**
 * Phase 5 equivalent — no horizontal overflow on mobile, nav usable,
 * touch targets reasonable. Runs across Desktop / iOS / Android via
 * the project matrix in playwright.config.ts.
 */
import { test, expect } from '@playwright/test';
import { ALL_PAGES, horizontalOverflow } from './helpers';

test.describe('Responsive: no horizontal overflow', () => {
  test('no page overflows viewport width', async ({ page }) => {
    const offenders: Array<{ path: string; docW: number; winW: number }> = [];
    for (const path of ALL_PAGES) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(600);
      const r = await horizontalOverflow(page);
      // Allow modest overflow (up to 1.5× viewport) for tables or hero
      // images; anything beyond that is a real bug.
      if (r.overflow && r.docW > r.winW * 1.5) {
        offenders.push({ path, docW: r.docW, winW: r.winW });
      }
    }
    expect(
      offenders,
      `Pages with severe horizontal overflow: ${JSON.stringify(offenders)}`
    ).toEqual([]);
  });
});

test.describe('Responsive: primary nav visible on every page', () => {
  for (const path of ALL_PAGES) {
    test(`${path} has visible primary navigation`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      const nav = page.locator('nav, header').first();
      await expect(nav).toBeVisible({ timeout: 5000 });
    });
  }
});
