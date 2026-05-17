// @ts-check
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.getByRole('textbox', { name: 'User Name' });
    this.passwordField = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
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