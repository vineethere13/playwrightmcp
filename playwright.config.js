// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['html'],
    ['allure-playwright'],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8080',

    trace: 'on-first-retry',

    headless: true,

    video: 'retain-on-failure',

    screenshot: {
      mode: 'only-on-failure'
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ],

  grep: process.env.SMOKE_ONLY
    ? /@smoke/
    : undefined,

  timeout: 60000,

  expect: {
    timeout: 10000
  }
});