/**
 * Content guardrails — enforce the business rules from CLAUDE.md:
 *   - Owner names must NOT appear anywhere on the site
 *   - "CFP candidate" / "ChFC candidate" must NOT appear (CFP Board rule)
 *   - Brand name always "SureEdge Tax & Advisory" with ampersand (not "and")
 *   - TSBPA-regulated terms must NOT appear (notice 26-06-42N, Tex. Occ. Code
 *     §§901.451–.453): "accounting", "accountant", "CPA", "certified public
 *     accountant", "auditor"/"auditing", and the bare abbreviation "EA".
 *     Spell out "Enrolled Agent". A client's "IRS audit" is permitted.
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

// TSBPA notice 26-06-42N: a non-CPA firm may not use these regulated terms.
// Each entry is a regex tested against full page text.
const TSBPA_FORBIDDEN: Array<{ label: string; re: RegExp }> = [
  { label: 'accounting/accountant', re: /account(ing|ant)/i },
  { label: 'CPA', re: /\bCPA\b/ },
  { label: 'certified public accountant', re: /certified\s+public/i },
  { label: 'bare "EA" abbreviation (spell out Enrolled Agent)', re: /\bEA\b/ },
  { label: 'auditor/auditing', re: /audit(or|ing)\b/i },
];

// "audit" alone is allowed ONLY in an IRS context ("IRS audit", "IRS Notice
// or Audit"). Strip those phrases, then any remaining "audit" is a violation.
const IRS_AUDIT_CONTEXT = /IRS[\s-]*(notice or )?audit\w*/gi;
const BARE_AUDIT = /\baudit\w*\b/i;

// Pages where a term is knowingly allowed (currently none — keep tight).
const TSBPA_ALLOWLIST: Array<{ path: string; label: string; reason: string }> = [];

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

  test('brand is always "SureEdge Tax & Advisory" (with ampersand)', async ({ page }) => {
    const offenders: Array<{ path: string; snippet: string }> = [];
    for (const path of ALL_PAGES) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      const text = await page.locator('body').innerText();
      // Flag "Tax and Advisory" (wrong connector) or any old-brand remnant
      const wrongBrand = text.match(/SureEdge Tax and Advisory|SureEdge Tax (&|and|&amp;) Accounting/i);
      if (wrongBrand) {
        offenders.push({ path, snippet: wrongBrand[0] });
      }
    }
    expect(
      offenders,
      `found wrong brand connector or old brand name: ${JSON.stringify(offenders)}`
    ).toEqual([]);
  });

  test('TSBPA-regulated terms do not appear on any page (notice 26-06-42N)', async ({ page }) => {
    const hits: Array<{ path: string; label: string; snippet: string }> = [];
    for (const path of ALL_PAGES) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      const text = await page.locator('body').innerText();
      const checks = [
        ...TSBPA_FORBIDDEN,
        // bare "audit" outside IRS context — checked on IRS-phrase-stripped text
        { label: 'audit without IRS context', re: BARE_AUDIT, stripped: true },
      ] as Array<{ label: string; re: RegExp; stripped?: boolean }>;
      const strippedText = text.replace(IRS_AUDIT_CONTEXT, '');
      for (const { label, re, stripped } of checks) {
        const haystack = stripped ? strippedText : text;
        const m = haystack.match(re);
        if (!m) continue;
        const allowed = TSBPA_ALLOWLIST.some(a => a.path === path && a.label === label);
        if (allowed) continue;
        const idx = m.index ?? 0;
        hits.push({
          path,
          label,
          snippet: haystack.slice(Math.max(0, idx - 40), idx + 40).replace(/\s+/g, ' '),
        });
      }
    }
    expect(
      hits,
      `TSBPA-regulated terms found (Tex. Occ. Code §§901.451–.453 — up to $25,000 penalty): ${JSON.stringify(hits, null, 2)}`
    ).toEqual([]);
  });
});
