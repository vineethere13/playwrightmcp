// @ts-check
import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.batchSummaryHeading = page.getByRole('heading', { name: 'Batch Summary' });
  }

  async expectBatchSummaryVisible() {
    await expect(this.batchSummaryHeading).toBeVisible();
  }
}