// fixtures.js
// Playwright reusable fixtures for login and dashboard setup

const { test as base } = require('@playwright/test');
const LoginPage = require('./page_objects/LoginPage');
const HomePage = require('./page_objects/HomePage');

// Extend base test with login and dashboard fixtures
const test = base.extend({
  /**
   * Logs in using the LoginPage and returns the HomePage instance
   * @param {import('@playwright/test').Page} page
   */
  login: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    // Replace with your actual login logic and credentials
    await loginPage.goto('https://your-app-url/login');
    await loginPage.login('your-username', 'your-password');
    await use(loginPage);
  },

  /**
   * Navigates to the dashboard after login and returns the HomePage instance
   * @param {import('@playwright/test').Page} page
   */
  dashboard: async ({ page, login }, use) => {
    const homePage = new HomePage(page);
    // Replace with your actual dashboard navigation logic if needed
    await homePage.goto('https://your-app-url/dashboard');
    await use(homePage);
  }
});

module.exports = test;
