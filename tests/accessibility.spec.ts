/**
 * WCAG 2.1 AA accessibility scan on every marketing page.
 *
 * For marketing we re-enable color-contrast (unlike the portal where brand
 * colors got a pass). Marketing visibility to screen readers and color-
 * blind users is critical.
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { ALL_PAGES } from './helpers';

test.describe('A11y: axe-core WCAG 2.1 AA scan', () => {
  for (const path of ALL_PAGES) {
    test(`${path} has no serious/critical a11y violations`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(700);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const critical = results.violations
        .filter((v) => v.impact === 'serious' || v.impact === 'critical')
        .map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length }));

      expect(
        critical,
        `critical a11y issues on ${path}: ${JSON.stringify(critical, null, 2)}`
      ).toEqual([]);
    });
  }
});

test.describe('A11y: document structure basics', () => {
  test('html has lang', async ({ page }) => {
    await page.goto('/');
    expect(await page.locator('html').getAttribute('lang')).toBeTruthy();
  });

  test('every page has a non-empty <title>', async ({ page }) => {
    const missing: string[] = [];
    for (const path of ALL_PAGES) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      const t = await page.title();
      if (!t || t.length < 5) missing.push(path);
    }
    expect(missing).toEqual([]);
  });

  test('every <img> on home has alt attribute', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const noAlt = await page.evaluate(() =>
      Array.from(document.querySelectorAll('img'))
        .filter((i) => i.getAttribute('alt') === null)
        .map((i) => i.getAttribute('src') || '(no src)')
    );
    expect(noAlt).toEqual([]);
  });
});
