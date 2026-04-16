import { defineConfig, devices } from '@playwright/test';

/**
 * SureEdge marketing website — Playwright E2E test configuration.
 * Runs against production (https://sureedgetax.com) by default.
 * Override with TEST_URL env var if needed.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // some tests share state (rate limits etc.)
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [['html', { open: 'never' }], ['list']],
  timeout: 60000,
  expect: { timeout: 10000 },

  use: {
    // Apex redirects to www — test against the canonical URL
    baseURL: process.env.TEST_URL || 'https://www.sureedgetax.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'mobile-ios',     use: { ...devices['iPhone 14'] } },
    { name: 'mobile-android', use: { ...devices['Pixel 7'] } },
  ],
});
