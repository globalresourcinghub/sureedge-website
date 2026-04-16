/**
 * Smoke: every page loads with no 500 and has a non-empty body.
 * Runs against Desktop + Mobile projects.
 */
import { test, expect } from '@playwright/test';
import { ALL_PAGES, waitForPageLoad } from './helpers';

test.describe('Smoke: every page loads', () => {
  for (const path of ALL_PAGES) {
    test(`${path} loads without 500`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status(), `status for ${path}`).toBeLessThan(500);
      await waitForPageLoad(page);
      const body = await page.locator('body').textContent();
      expect(body?.length, `empty body at ${path}`).toBeGreaterThan(50);
    });
  }
});

test.describe('Smoke: /banner.html (OG promo banner)', () => {
  test('renders with OG meta tags', async ({ page }) => {
    const res = await page.goto('/banner.html');
    expect(res?.status()).toBeLessThan(500);
    const og = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(og, 'banner should have og:image meta').toBeTruthy();
  });
});
