// Example UI test using fixtures
const test = require('../../fixtures');

test('should display dashboard after login', async ({ dashboard }) => {
  await dashboard.log('Verifying dashboard is visible');
  await dashboard.waitForVisible('#dashboard-main');
  const isVisible = await dashboard.isVisible('#dashboard-main');
  expect(isVisible).toBeTruthy();
});
