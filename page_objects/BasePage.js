// BasePage.js
// A reusable base class for Playwright page objects with Winston logging

const logger = require('../logger');

class BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright Page object
   */
  constructor(page) {
    this.page = page;
    this.logger = logger;
  }
  /**
   * Log a message using Winston logger
   * @param {string} message
   * @param {'info'|'warn'|'error'|'debug'} [level='info']
   */
  log(message, level = 'info') {
    this.logger.log({ level, message });
  }

  /**
   * Navigate to a given URL
   * @param {string} url
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Click an element by selector
   * @param {string} selector
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Type text into an element by selector
   * @param {string} selector
   * @param {string} text
   */
  async type(selector, text) {
    await this.page.fill(selector, text);
  }

  /**
   * Get text content of an element
   * @param {string} selector
   * @returns {Promise<string>}
   */
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Wait for an element to be visible
   * @param {string} selector
   */
  async waitForVisible(selector) {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  /**
   * Check if an element is visible
   * @param {string} selector
   * @returns {Promise<boolean>}
   */
  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }
}

module.exports = BasePage;
