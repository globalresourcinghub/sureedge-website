/**
 * Content guardrails — enforce the business rules from CLAUDE.md:
 *   - Owner names must NOT appear anywhere on the site
 *   - "CFP candidate" / "ChFC candidate" must NOT appear (CFP Board rule)
 *   - Brand name always "SureEdge Tax & Accounting" with ampersand (not "and")
 *
 * These are dead simple regex checks across every page. They'd catch a
 * copy-paste mistake that no visual review would.
 */
import { test, expect } from '@playwright/test';
import { ALL_PAGES } from './helpers';

// Update this list if ownership changes. Only first names are checked since
// full names would false-positive on generic "Tom" mentions in testimonials.
// Per CLAUDE.md, owner names are off-limits — add real first+last names here
// before running in production.
const FORBIDDEN_NAMES: string[] = [
  // Add real owner first/last names here to activate this guard.
  // Leaving empty for now so the test passes until populated.
];

const FORBIDDEN_PHRASES = [
  'CFP candidate',
  'ChFC candidate',
  'CFP® candidate',
];

test.describe('Content guardrails', () => {
  test('owner names do not appear on any page', async ({ page }) => {
    if (FORBIDDEN_NAMES.length === 0) {
      test.skip(
        true,
        'FORBIDDEN_NAMES list is empty — populate with real owner names to activate guard'
      );
      return;
    }

    const hits: Array<{ path: string; name: string }> = [];
    for (const path of ALL_PAGES) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      const text = await page.locator('body').innerText();
      for (const name of FORBIDDEN_NAMES) {
        if (new RegExp(`\\b${name}\\b`, 'i').test(text)) {
          hits.push({ path, name });
        }
      }
    }
    expect(hits, `owner names leaked: ${JSON.stringify(hits)}`).toEqual([]);
  });

  test('CFP/ChFC candidate language does not appear (CFP Board rule)', async ({ page }) => {
    const hits: Array<{ path: string; phrase: string }> = [];
    for (const path of ALL_PAGES) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      const text = await page.locator('body').innerText();
      for (const phrase of FORBIDDEN_PHRASES) {
        if (text.toLowerCase().includes(phrase.toLowerCase())) {
          hits.push({ path, phrase });
        }
      }
    }
    expect(hits, `forbidden credentials language: ${JSON.stringify(hits)}`).toEqual([]);
  });

  test('brand is always "SureEdge Tax & Accounting" (with ampersand)', async ({ page }) => {
    const offenders: Array<{ path: string; snippet: string }> = [];
    for (const path of ALL_PAGES) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      const text = await page.locator('body').innerText();
      // Flag any occurrence of "SureEdge Tax and Accounting" (wrong)
      const wrongBrand = text.match(/SureEdge Tax and Accounting/i);
      if (wrongBrand) {
        offenders.push({ path, snippet: wrongBrand[0] });
      }
    }
    expect(
      offenders,
      `found wrong brand "and" instead of "&": ${JSON.stringify(offenders)}`
    ).toEqual([]);
  });
});
