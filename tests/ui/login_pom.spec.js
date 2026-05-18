// @ts-check
import { test, expect } from '@playwright/test';
import LoginPage from '../../page_objects/LoginPage.js';
import HomePage from '../../page_objects/HomePage.js';
import loginData from '../../Testdata/testlogin.json' ;

test('login and verify batch summary widget using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(loginData.username, loginData.password);

  // Wait for navigation to home screen
  await page.waitForURL('**/HomeScreen');

  const homePage = new HomePage(page);
  await homePage.expectBatchSummaryVisible();
});
