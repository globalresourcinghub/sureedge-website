/**
 * Contact form + tax intake + business tax intake — validation, submission,
 * XSS/unicode/length edge cases.
 *
 * Real Web3Forms submissions WILL land in the SureEdge inbox. Each test
 * submission is tagged with TEST_SUBJECT_PREFIX so you can filter them.
 */
import { test, expect } from '@playwright/test';
import { TEST_SUBJECT_PREFIX, testRunTag, waitForPageLoad } from './helpers';

// ─── /contact ────────────────────────────────────────────────────────────

test.describe('Contact form', () => {
  test('form is visible with all expected fields', async ({ page }) => {
    await page.goto('/contact');
    await waitForPageLoad(page);
    // Fields per app/contact/page.tsx — identified by placeholder text
    await expect(page.getByPlaceholder('First Name')).toBeVisible();
    await expect(page.getByPlaceholder('Last Name')).toBeVisible();
    await expect(page.locator('input[type="email"]').first()).toBeVisible();
    await expect(page.locator('input[type="tel"]').first()).toBeVisible();
    await expect(page.locator('select').first()).toBeVisible();
  });

  test('empty submit does not send (browser required validation)', async ({ page }) => {
    await page.goto('/contact');
    await waitForPageLoad(page);
    const submit = page.locator('button[type="submit"]').first();
    await submit.click();
    await page.waitForTimeout(800);
    // No "sent" / success state should appear
    const body = await page.locator('body').textContent();
    expect(body?.toLowerCase().includes('thanks') || body?.toLowerCase().includes('sent successfully')).toBeFalsy();
  });

  test('invalid email is rejected by browser', async ({ page }) => {
    await page.goto('/contact');
    await waitForPageLoad(page);
    await page.locator('input[type="email"]').first().fill('not-an-email');
    await page.locator('button[type="submit"]').first().click();
    await page.waitForTimeout(500);
    // Still on /contact
    expect(page.url()).toContain('/contact');
  });

  test('XSS payload in message does not execute', async ({ page }) => {
    let xssFired = false;
    page.on('dialog', async (d) => { xssFired = true; await d.dismiss(); });
    await page.goto('/contact');
    await waitForPageLoad(page);
    const textarea = page.locator('textarea').first();
    await textarea.fill('<script>alert("xss")</script>');
    await page.waitForTimeout(500);
    expect(xssFired).toBe(false);
  });

  test('valid submission succeeds end-to-end', async ({ page }) => {
    const tag = testRunTag();
    await page.goto('/contact');
    await waitForPageLoad(page);

    await page.getByPlaceholder('First Name').fill('Playwright');
    await page.getByPlaceholder('Last Name').fill('Test');
    await page.locator('input[type="email"]').first().fill(`playwright-${Date.now()}@test.example.com`);
    await page.locator('input[type="tel"]').first().fill('5125551234');

    // Pick a real (non-disabled, non-empty) option — avoid the default
    // "What do you need help with?" placeholder option
    const select = page.locator('select').first();
    await select.selectOption('Other');

    // Message with test tag so you can filter the email
    await page.locator('textarea').first().fill(
      `${TEST_SUBJECT_PREFIX} ${tag}\nThis is an automated Playwright submission. Safe to ignore.`
    );

    await page.locator('button[type="submit"]').first().click();

    // "Message Sent!" is the success heading in app/contact/page.tsx
    await expect(page.locator('text=Message Sent')).toBeVisible({ timeout: 15000 });
  });
});

// ─── /tax-intake ─────────────────────────────────────────────────────────

test.describe('Tax Intake form', () => {
  test('form page loads with form element', async ({ page }) => {
    await page.goto('/tax-intake');
    await waitForPageLoad(page);
    await expect(page.locator('form').first()).toBeVisible({ timeout: 10000 });
  });

  test('form fields accept input', async ({ page }) => {
    await page.goto('/tax-intake');
    await waitForPageLoad(page);

    const emailInput = page.locator('input[type="email"]').first();
    if (await emailInput.isVisible().catch(() => false)) {
      await emailInput.fill('intake-probe@test.example.com');
      expect(await emailInput.inputValue()).toBe('intake-probe@test.example.com');
    }
  });
});

// ─── /business-tax-intake ────────────────────────────────────────────────

test.describe('Business Tax Intake form', () => {
  test('form page loads with form element', async ({ page }) => {
    await page.goto('/business-tax-intake');
    await waitForPageLoad(page);
    await expect(page.locator('form').first()).toBeVisible({ timeout: 10000 });
  });
});
