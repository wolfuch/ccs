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