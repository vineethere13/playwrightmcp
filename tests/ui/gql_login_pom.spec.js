// @ts-check
const { test, expect, request } = require('@playwright/test');
const loginData = require('../../Testdata/testlogin.json');

// This test uses GraphQL to perform login and then verifies the batch summary widget is visible

test('login via GraphQL and verify batch summary widget', async ({ page, baseURL }) => {
	// GraphQL login mutation
	const loginMutation = `
		mutation Login($username: String!, $password: String!) {
			login(username: $username, password: $password) {
				token
			}
		}
	`;

	// Send GraphQL request to login endpoint
	const apiRequestContext = await request.newContext();
	const response = await apiRequestContext.post(baseURL + '/graphql', {
		data: {
			query: loginMutation,
			variables: {
				username: loginData.username,
				password: loginData.password
			}
		}
	});
	const result = await response.json();
	expect(result.data.login.token).toBeTruthy();

	// Set auth token as cookie or localStorage if required by app
	// Example: await page.addInitScript(token => localStorage.setItem('authToken', token), result.data.login.token);

	// Go to home page
	await page.goto(baseURL + '/HomeScreen');

	// Verify the batch summary widget is visible
	await expect(page.locator('text=Batch Summary')).toBeVisible();
});
