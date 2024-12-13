import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 3,
  reporter: 'html',
  expect: {
    timeout: 20000,
  },
  retries: 2,  
  use: {
    headless: true,
    viewport: { width: 1728, height: 1020 },
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    bypassCSP: true,
    launchOptions: {
      args: ['--disable-cache'],
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
