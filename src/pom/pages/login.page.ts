import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly user: Locator;
  readonly pass: Locator;
  readonly loginButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.locator('a', { hasText: 'Get started' });
    this.user = page.getByRole('textbox', { name: 'Ingrese su email' });
    this.pass = page.getByRole('textbox', { name: 'Ingrese su Contraseña' });
    this.loginButton = page.getByRole('button', { name: 'Ingresar' });
    
}


  async submitLogin(user: string, pass: string) {
    
    await this.user.fill(user);
    await this.pass.fill(pass);
    await this.loginButton.click();
  }


}