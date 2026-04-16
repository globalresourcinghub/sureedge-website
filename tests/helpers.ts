/**
 * Shared helpers for marketing-site tests.
 */
import { Page } from '@playwright/test';

export const ALL_PAGES = [
  '/',
  '/services',
  '/about',
  '/blog',
  '/booking',
  '/contact',
  '/tax-intake',
  '/business-tax-intake',
  '/privacy',
  '/quote',
];

/**
 * Clean text used in form submissions so you can filter test emails out of
 * your inbox. Anything with "[PLAYWRIGHT-TEST]" is automation traffic.
 */
export const TEST_SUBJECT_PREFIX = '[PLAYWRIGHT-TEST]';

/**
 * Unique string per test run — put into form submissions so you can
 * grep your inbox for a specific run.
 */
export function testRunTag() {
  return `run-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(800);
}

/**
 * Detect horizontal overflow on the current page. Returns docW vs winW
 * so assertions can report which element was over-wide.
 */
export async function horizontalOverflow(page: Page): Promise<{ overflow: boolean; docW: number; winW: number }> {
  return page.evaluate(() => {
    const docW = Math.max(
      document.documentElement.scrollWidth,
      document.body.scrollWidth
    );
    const winW = window.innerWidth;
    return { overflow: docW > winW + 1, docW, winW };
  });
}
