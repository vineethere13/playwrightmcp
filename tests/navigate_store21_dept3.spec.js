// @ts-check
import { test } from '@playwright/test';
import { LoginPage } from '../page objects/LoginPage.js';
import { ScaleTreePage } from '../page objects/ScaleTreePage.js';
const loginData = require('../Testdata/testlogin.json');

test('navigate to Store 21 and Department 3 using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(loginData.username, loginData.password);

  // Wait for navigation to home screen
  await page.waitForURL('**/HomeScreen');

  const scaleTreePage = new ScaleTreePage(page);
  await scaleTreePage.clickStore21();
  await scaleTreePage.clickDepartment3();
});
