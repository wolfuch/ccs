import { expect, type Locator, type Page } from '@playwright/test';

export class MandanteMetricasPage{
    private readonly page: Page;
    readonly resumenRiesgo: Locator;
    //readonly segmentacionPiramide: Locator;
    readonly dashboard360 : Locator;
    readonly columnaRiesgo: Locator;
    readonly columnaPorcentaje: Locator;
    readonly columnaCantidad: Locator;


    constructor(page: Page) {
        this.page = page;
        this.resumenRiesgo = page.getByText('Resumen Riesgo GeneralRiesgo');
        //this.segmentacionPiramide = ;
        this.dashboard360 = page.getByRole('button', { name: 'Dashboard 360 Visualiza mé' });
        this.columnaRiesgo = page.getByRole('cell', { name: 'Riesgo Bajo' });
        this.columnaPorcentaje = page.getByRole('columnheader', { name: '%' });
        this.columnaCantidad = page.getByRole('columnheader', { name: 'Cantidad' });
        
    }
  async validaCamposRiesgo() {
    await expect(this.columnaRiesgo).toBeVisible();
    await expect(this.columnaPorcentaje).toBeVisible();
    await expect(this.columnaCantidad).toBeVisible();
  }
  async irDashboard360(){
    await this.dashboard360.click();
  }


}
/*
await page.getByRole('img', { name: 'Distribución de proveedores' }).click();
  await page.getByText('Resumen Riesgo GeneralRiesgo').click();
  await page.getByText('Segmentación3.480 proveedores segmentadosS1S2S3S4PCHCVCOCSMEE').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Dashboard 360 Visualiza mé' }).click();
  const page1 = await page1Promise;
  await page.getByRole('cell', { name: 'Riesgo Bajo' }).click();
  await page.getByRole('columnheader', { name: 'Riesgo' }).click();
  await page.getByRole('columnheader', { name: '%' }).click();
  await page.getByRole('columnheader', { name: 'Cantidad' }).click();
});
*/