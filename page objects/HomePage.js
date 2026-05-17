// @ts-check
const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.batchSummaryHeading = page.getByRole('heading', { name: 'Batch Summary' });
  }

  async expectBatchSummaryVisible() {
    await expect(this.batchSummaryHeading).toBeVisible();
  }
}

module.exports = HomePage;