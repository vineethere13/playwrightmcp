// @ts-check
import { expect } from '@playwright/test';

export class ScaleTreePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Returns the frame for ScaleTree
   */
  async getScaleTreeFrame() {
    // Wait for the main frame
    await this.page.waitForSelector('iframe[name="MainLegacyIFrame"]', { state: 'attached', timeout: 10000 });
    const mainFrame = await this.page.frame({ name: 'MainLegacyIFrame' });
    if (!mainFrame) throw new Error('MainLegacyIFrame not found');

    // Wait for the tab scales frame inside main frame
    await mainFrame.waitForSelector('iframe[name="IFrameTabScales"]', { state: 'attached', timeout: 10000 });
    const tabScalesFrame = await mainFrame.frame({ name: 'IFrameTabScales' });
    if (!tabScalesFrame) throw new Error('IFrameTabScales not found');

    // Wait for the scale tree frame inside tab scales frame
    await tabScalesFrame.waitForSelector('iframe[name="ScaleTree"]', { state: 'attached', timeout: 10000 });
    const scaleTreeFrame = await tabScalesFrame.frame({ name: 'ScaleTree' });
    if (!scaleTreeFrame) throw new Error('ScaleTree frame not found');

    return scaleTreeFrame;
  }

  /**
   * Clicks Store 21 in the tree
   */
  async clickStore21() {
    const frame = await this.getScaleTreeFrame();
    // Wait for Store 21 element to be visible
    await frame.waitForSelector('#1_1_21', { state: 'visible', timeout: 10000 });
    await frame.locator('#1_1_21').click();
  }

  /**
   * Clicks Department 3 under Store 21
   */
  async clickDepartment3() {
    const frame = await this.getScaleTreeFrame();
    // Wait for Department 3 element to be visible
    await frame.waitForSelector('#1_1_21_3', { state: 'visible', timeout: 10000 });
    await frame.locator('#1_1_21_3').click();
  }
}
