// @ts-check
const { test } = require('@playwright/test');
const LoginPage = require('../../page_objects/LoginPage');
const ScaleTreePage = require('../../page_objects/ScaleTreePage');
const loginData = require('../../Testdata/testlogin.json');

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
