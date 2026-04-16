/**
 * Internal link crawl — every <a href> that points to an internal path
 * should return 2xx/3xx when fetched directly.
 *
 * External links are NOT fetched (slow, flaky, third-party). If a specific
 * external link matters, add it to the explicit list below.
 */
import { test, expect } from '@playwright/test';
import { ALL_PAGES } from './helpers';

test.describe('Internal link integrity', () => {
  test('all internal hrefs resolve without 4xx/5xx', async ({ page }) => {
    const seen = new Set<string>();
    const broken: Array<{ path: string; href: string; status: number }> = [];

    for (const path of ALL_PAGES) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      const hrefs = await page.evaluate(() =>
        Array.from(document.querySelectorAll('a[href]'))
          .map((a) => a.getAttribute('href'))
          .filter(Boolean) as string[]
      );

      for (const href of hrefs) {
        // Skip anchors, mailto, tel, external
        if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
        if (/^https?:\/\//.test(href) && !href.includes('sureedgetax.com')) continue;
        // Normalize to a URL path
        const url = new URL(href, 'https://sureedgetax.com');
        const key = url.pathname;
        if (seen.has(key)) continue;
        seen.add(key);

        const res = await page.request.get(url.toString(), { maxRedirects: 5 });
        if (res.status() >= 400) {
          broken.push({ path, href: key, status: res.status() });
        }
      }
    }

    expect(broken, `broken internal links: ${JSON.stringify(broken, null, 2)}`).toEqual([]);
  });
});
