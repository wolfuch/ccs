import { expect, type Locator, type Page } from '@playwright/test';


export class MiCarteraPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly cerrarAyuda: Locator;
  readonly licitacion: Locator;
  readonly  organizacionCompra: Locator;
  readonly vistaPago: Locator;
  readonly  retencionFiscal: Locator;



  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.locator('a', { hasText: 'Get started' });

    
}


  async submitLogin() {
    
  }


}

/*
await page.getByRole('button', { name: 'Cerrar ayuda' }).click();
  await page.getByRole('radio', { name: 'Licitaciones' }).check();
  await expect(page.locator('form')).toContainText('Propósito del requerimiento');
  await expect(page.locator('form')).toContainText('Organización de compras');
  await expect(page.locator('form')).toContainText('Vía de pago');
  await expect(page.locator('form')).toContainText('¿Aplica retención fiscal?');
  await page.getByRole('radio', { name: 'Misceláneo' }).check();
  await expect(page.locator('form')).toContainText('Propósito del requerimiento');
  await expect(page.locator('form')).toContainText('Vía de pago');
  await expect(page.locator('form')).toContainText('¿Aplica retención fiscal?');

*/