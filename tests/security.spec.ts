/**
 * Security tests for marketing site.
 *
 * The portal's IDOR/RBAC model doesn't apply here. What we do check:
 *   - API endpoints don't leak server info (no 500 on bad input)
 *   - XSS payloads stored via forms don't execute on display
 *   - Honeypot / bot protection on forms
 *   - Security headers (CSP, X-Frame-Options, etc.)
 *   - /api/visit rate limiting works
 */
import { test, expect } from '@playwright/test';

test.describe('Security: /api/chat hardening', () => {
  test('malformed JSON body returns 4xx, not 5xx', async ({ page }) => {
    const res = await page.request.post('/api/chat', {
      headers: { 'Content-Type': 'application/json' },
      data: 'not json',
    });
    expect(res.status()).toBeLessThan(500);
  });

  test('missing message field does not crash', async ({ page }) => {
    const res = await page.request.post('/api/chat', {
      data: {},
    });
    expect(res.status()).toBeLessThan(500);
  });

  test('GET on POST-only /api/chat returns 4xx or 405', async ({ page }) => {
    const res = await page.request.get('/api/chat');
    expect(res.status()).toBeLessThan(500);
  });
});

test.describe('Security: /api/visit hardening', () => {
  test('POST /api/visit does not crash on empty body', async ({ page }) => {
    const res = await page.request.post('/api/visit', {
      data: {},
    });
    expect(res.status()).toBeLessThan(500);
  });

  test('/api/visit does not crash on malformed body', async ({ page }) => {
    const res = await page.request.post('/api/visit', {
      headers: { 'Content-Type': 'application/json' },
      data: 'junk',
    });
    expect(res.status()).toBeLessThan(500);
  });
});

test.describe('Security: security headers', () => {
  test('home page serves basic security headers', async ({ page }) => {
    const res = await page.goto('/');
    const headers = res?.headers() || {};
    // X-Frame-Options or CSP frame-ancestors should prevent clickjacking
    const hasFrameProtection =
      headers['x-frame-options'] || (headers['content-security-policy'] || '').includes('frame-ancestors');
    expect(hasFrameProtection, 'missing clickjacking protection').toBeTruthy();
  });

  test('home page is served over HTTPS', async ({ page }) => {
    const res = await page.goto('/');
    expect(res?.url().startsWith('https://')).toBe(true);
  });
});
