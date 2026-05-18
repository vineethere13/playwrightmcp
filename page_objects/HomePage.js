// @ts-check

const { expect } = require('@playwright/test');
const homeLocators = require('../locators/homePageLocators');

class HomePage {
  constructor(page) {
    this.page = page;
    this.batchSummaryHeading = page.getByRole(homeLocators.batchSummaryHeading.role, { name: homeLocators.batchSummaryHeading.name });
  }

  async expectBatchSummaryVisible() {
    await expect(this.batchSummaryHeading).toBeVisible();
  }
}

module.exports = HomePage;