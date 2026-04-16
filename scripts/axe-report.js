#!/usr/bin/env node
/**
 * Dump specific color-contrast failures per page so we can decide which
 * grays to darken without guessing.
 *
 * Run: node scripts/axe-report.js
 */
const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');

const PAGES = ['/', '/services', '/about', '/blog', '/booking', '/contact', '/tax-intake', '/business-tax-intake', '/privacy', '/quote'];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  for (const path of PAGES) {
    await page.goto(`https://www.sureedgetax.com${path}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);
    const results = await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze();
    const cc = results.violations.find((v) => v.id === 'color-contrast');
    if (!cc) { console.log(`${path}: ✓ no contrast issues`); continue; }
    console.log(`\n${path}: ${cc.nodes.length} contrast violations`);
    const fg = new Map();
    for (const node of cc.nodes) {
      const msg = node.failureSummary || '';
      // Extract foreground/background color pair if axe includes them
      const match = msg.match(/foreground color:\s*(#[0-9a-f]+).*?background color:\s*(#[0-9a-f]+).*?ratio:\s*([\d.]+):1/si);
      if (match) {
        const key = `${match[1]} on ${match[2]}`;
        fg.set(key, (fg.get(key) || 0) + 1);
      } else {
        fg.set('(unparseable)', (fg.get('(unparseable)') || 0) + 1);
      }
    }
    for (const [pair, count] of [...fg.entries()].sort((a, b) => b[1] - a[1])) {
      console.log(`  ${count}×  ${pair}`);
    }
    // Also dump first 2 actual element HTML snippets
    for (const node of cc.nodes.slice(0, 2)) {
      console.log(`  example: ${(node.html || '').slice(0, 120)}`);
    }
  }
  await browser.close();
})();
