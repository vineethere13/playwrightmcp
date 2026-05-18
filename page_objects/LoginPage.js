// @ts-check
const loginLocators = require('../locators/loginPageLocators');
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.getByRole(loginLocators.usernameField.role, { name: loginLocators.usernameField.name });
    this.passwordField = page.getByRole(loginLocators.passwordField.role, { name: loginLocators.passwordField.name });
    this.signInButton = page.getByRole(loginLocators.signInButton.role, { name: loginLocators.signInButton.name });
  }

  async goto() {
    await this.page.goto('http://desktop-41/esm/esm/index.html#/');
  }

  async login(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.signInButton.click();
  }
}

module.exports = LoginPage;