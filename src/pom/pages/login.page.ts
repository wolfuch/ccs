import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly user: Locator;
  readonly pass: Locator;
  readonly loginButton: Locator;
  readonly cambiaContraseña: Locator;


  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.locator('a', { hasText: 'Get started' });
    this.user = page.getByTestId('form-login-email');
    this.pass = page.getByTestId('form-login-password-input');
    this.loginButton = page.getByTestId('form-login-submit');
    this.cambiaContraseña = page.getByTestId('form-login-change-password');
    
}


  async submitLogin(user: string, pass: string) {
    
    await this.user.fill(user);
    await this.pass.fill(pass);
    await this.loginButton.click();
  }


}