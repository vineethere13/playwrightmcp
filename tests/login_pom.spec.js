// @ts-check
import { test } from '@playwright/test';
import { LoginPage } from '../page objects/LoginPage.js';
import { HomePage } from '../page objects/HomePage.js';
const loginData = require('../Testdata/testlogin.json');

test('login and verify batch summary widget using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(loginData.username, loginData.password);

  // Wait for navigation to home screen
  await page.waitForURL('**/HomeScreen');

  const homePage = new HomePage(page);
  await homePage.expectBatchSummaryVisible();
});