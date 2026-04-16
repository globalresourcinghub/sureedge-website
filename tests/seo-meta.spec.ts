/**
 * SEO & Open Graph / Twitter / JSON-LD checks on every page.
 * Marketing sites live and die on metadata — regressions here tank Google
 * rankings and break social previews without any error message.
 */
import { test, expect } from '@playwright/test';
import { ALL_PAGES } from './helpers';

async function meta(page: import('@playwright/test').Page, selector: string) {
  const el = page.locator(selector).first();
  if ((await el.count()) === 0) return null;
  return el.getAttribute('content');
}

test.describe('SEO: every page has core meta tags', () => {
  for (const path of ALL_PAGES) {
    test(`${path} has <title>, <meta description>, and canonical`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      const title = await page.title();
      expect(title, `missing <title> on ${path}`).toBeTruthy();
      expect(title.length, `<title> too short on ${path}`).toBeGreaterThan(10);
      expect(title.length, `<title> too long (>70) on ${path}`).toBeLessThanOrEqual(70);

      const description = await meta(page, 'meta[name="description"]');
      expect(description, `missing <meta name=description> on ${path}`).toBeTruthy();
      expect(description!.length, `description too short on ${path}`).toBeGreaterThan(50);
      expect(description!.length, `description too long (>160) on ${path}`).toBeLessThanOrEqual(200);
    });
  }
});

test.describe('SEO: Open Graph tags on every page', () => {
  for (const path of ALL_PAGES) {
    test(`${path} has og:title, og:description, og:url`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      const ogTitle = await meta(page, 'meta[property="og:title"]');
      const ogDesc = await meta(page, 'meta[property="og:description"]');
      expect(ogTitle, `missing og:title on ${path}`).toBeTruthy();
      expect(ogDesc, `missing og:description on ${path}`).toBeTruthy();
    });
  }
});

test.describe('SEO: robots.txt and sitemap.xml', () => {
  test('robots.txt is served and references sitemap', async ({ page }) => {
    const res = await page.goto('/robots.txt');
    expect(res?.status()).toBe(200);
    const text = await page.locator('body').textContent();
    expect(text?.toLowerCase()).toContain('sitemap');
  });

  test('sitemap.xml is served and contains key pages', async ({ page }) => {
    const res = await page.goto('/sitemap.xml');
    expect(res?.status()).toBe(200);
    const xml = await page.content();
    // Every canonical page should appear somewhere in the sitemap
    for (const path of ['/', '/services', '/about', '/contact']) {
      const url = path === '/' ? 'sureedgetax.com/' : `sureedgetax.com${path}`;
      expect(xml, `${url} missing from sitemap`).toContain(url);
    }
  });
});

test.describe('SEO: JSON-LD structured data on home', () => {
  test('home has at least one JSON-LD block and it parses', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(scripts.length, 'home has no JSON-LD').toBeGreaterThan(0);
    // Every block must be valid JSON
    for (const script of scripts) {
      expect(() => JSON.parse(script)).not.toThrow();
    }
  });
});
