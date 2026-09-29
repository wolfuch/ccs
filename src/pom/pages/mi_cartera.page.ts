import { expect, type Locator, type Page } from '@playwright/test';


export class MiCarteraPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly tabEnProceso: Locator;
  readonly tabRechazados: Locator;
  readonly tabPendiente: Locator;
  readonly tabCreadosSap: Locator;
  readonly buscador: Locator;
  readonly botonBuscador: Locator;
  //readonly verDetalle: Locator;



  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.locator('a', { hasText: 'Get started' });

    
}


  async submitLogin() {
    
  }


}
/*


  await page.getByText('En Proceso', { exact: true }).click();
  await page.getByText('Rechazados').click();
  await page.getByText('Pendiente1').click();
  await page.getByText('Creados SAP').click();
  await page.getByRole('textbox', { name: 'Rut o Razón social' }).click();
  await page.getByRole('button', { name: 'Crear proveedor' }).click();
});
*/