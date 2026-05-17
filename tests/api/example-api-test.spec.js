// Example API test using Playwright
const { test, expect, request } = require('@playwright/test');

test('should get a successful response from API', async ({}) => {
  const apiContext = await request.newContext();
  const response = await apiContext.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data).toHaveProperty('id', 1);
});
