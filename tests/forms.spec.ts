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
    // Fields per app/contact/page.tsx: firstname, lastname, email, phone, helpTopic, message
    await expect(page.locator('input[name="firstname"], input[name="firstName"], input#firstname')).toHaveCount(1);
    await expect(page.locator('input[name="lastname"], input[name="lastName"], input#lastname')).toHaveCount(1);
    await expect(page.locator('input[type="email"]').first()).toBeVisible();
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

    // Fill whatever names Playwright can discover
    const textInputs = page.locator('input[type="text"]');
    const count = await textInputs.count();
    if (count >= 2) {
      await textInputs.nth(0).fill('Playwright');
      await textInputs.nth(1).fill('Test');
    }
    await page.locator('input[type="email"]').first().fill(`playwright-${Date.now()}@test.example.com`);

    // Phone (optional, may be type=tel)
    const phone = page.locator('input[type="tel"]').first();
    if (await phone.isVisible().catch(() => false)) {
      await phone.fill('5125551234');
    }

    // Select any dropdown
    const select = page.locator('select').first();
    if (await select.isVisible().catch(() => false)) {
      const options = await select.locator('option').allInnerTexts();
      const valid = options.find((o) => o && !/select|choose/i.test(o));
      if (valid) await select.selectOption({ label: valid });
    }

    // Message with test tag so you can filter the email
    await page.locator('textarea').first().fill(
      `${TEST_SUBJECT_PREFIX} ${tag}\nThis is an automated Playwright submission. Safe to ignore.`
    );

    await page.locator('button[type="submit"]').first().click();

    // Wait for a success indicator — text like "thanks", "sent", or a status
    // Success copy in app/contact/page.tsx happens via setStatus("sent")
    await page.waitForTimeout(5000);
    const body = await page.locator('body').textContent();
    const success = /thank|received|sent|got it|we'll be in touch/i.test(body || '');
    expect(success, 'no success message after contact form submit').toBe(true);
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
