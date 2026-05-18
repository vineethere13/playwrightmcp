// @ts-check
import dotenv from 'dotenv';
import path from 'path';
import loginLocators from '../locators/loginPageLocators.js';

dotenv.config({ path: path.resolve(path.dirname(new URL(import.meta.url).pathname), '../.env') });

class LoginPage {
  constructor(private page : Page) {
    this.page = page;
    this.usernameField = page.getByRole(loginLocators.usernameField.role, { name: loginLocators.usernameField.name });
    this.passwordField = page.getByRole(loginLocators.passwordField.role, { name: loginLocators.passwordField.name });
    this.signInButton = page.getByRole(loginLocators.signInButton.role, { name: loginLocators.signInButton.name });
  }

  /**
   * Navigate to the login page using BASE_URL from .env
   */
  async goto() {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) throw new Error('BASE_URL is not defined in .env');
    await this.page.goto(baseUrl);
  }

  async login(username : string, password : string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.signInButton.click();
  }
}

export default LoginPage;