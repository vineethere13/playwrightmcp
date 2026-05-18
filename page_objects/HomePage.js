// @ts-check


import { expect } from '@playwright/test';
import homeLocators from '../locators/homePageLocators.js';

class HomePage {
  constructor(page) {
    this.page = page;
    this.batchSummaryHeading = page.getByRole(homeLocators.batchSummaryHeading.role, { name: homeLocators.batchSummaryHeading.name });
  }

  async expectBatchSummaryVisible() {
    await expect(this.batchSummaryHeading).toBeVisible();
  }
}

export default HomePage;