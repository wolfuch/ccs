import { expect, type Locator, type Page } from '@playwright/test';


export class RegistroPage {
  private readonly page: Page;
  readonly cerrarAyuda: Locator;
  readonly licitacion: Locator;
  readonly miscelaneo: Locator;
  readonly proposito: Locator;
  readonly seleccionProposito: (valor: string) => Locator;
  readonly organizacionCompra: Locator;
  readonly selectOrganizacion: Locator;
  readonly seleccionOrganizacion: (valor: string) => Locator;
  readonly vistaPago: Locator;
  readonly opcionPago: (valor: string) => Locator;
  readonly retencionFiscal: Locator;
  readonly labelProposito: Locator;
  readonly botonSiguiente: Locator;



  constructor(page: Page) {
    this.page = page;
    this.cerrarAyuda = page.getByTestId('datos-proveedor-coachmark-boton-cerrar');
    this.licitacion = page.getByRole('radio', { name: 'Licitaciones' });
    this.miscelaneo = page.getByRole('radio', { name: 'Misceláneo' });
    this.proposito = page.getByRole('button', { name: 'Seleccione propósito' });
    this.seleccionProposito = (valor: string) => 
      page.getByRole('option', { name: valor});
    this.organizacionCompra = page.getByText('Organización de compras', { exact: true });
    this.selectOrganizacion = page.getByTestId('datos-proveedor-select-organizacion-compras');
    this.seleccionOrganizacion = (valor: string) => 
      page.getByRole('option', { name: valor});
    this.vistaPago = page.locator('span').filter({ hasText: 'Seleccione vía de pago' });
    this.opcionPago = (valor: string) => 
      page.getByRole('option', { name: valor});
    this.retencionFiscal = page.getByText('¿Aplica retención fiscal?');
    this.labelProposito = page.getByText('Propósito del requerimiento');
    this.botonSiguiente = page.getByTestId('datos-proveedor-boton-siguiente');


}
  async validaCamposLicitacion() {
    await expect(this.labelProposito).toBeVisible();
    await expect(this.organizacionCompra).toBeVisible();
    await expect(this.vistaPago).toBeVisible();
    await expect(this.retencionFiscal).toBeVisible();
  }

  async validaCamposMiscelaneo() {
    await expect(this.labelProposito).toBeVisible();
    await expect(this.vistaPago).toBeVisible();
    await expect(this.retencionFiscal).toBeVisible();
  }

  async creaLicitacion() {
    await this.cerrarAyuda.click();
    await this.licitacion.click();
    
  }

  async creaMiscelaneo(){
    await this.cerrarAyuda.click();
    await this.miscelaneo.click();

  }
  async seleccionarProposito(valor: string){
    await this.proposito.click();
    await this.seleccionProposito(valor).click();
   
  }

    async seleccionarOrganizacion(valor: string){
    await this.selectOrganizacion.click();
    await this.seleccionOrganizacion(valor).getByRole('checkbox').click();
    await this.page.locator('.p-multiselect-close').click();
    await expect(this.page.locator('.p-multiselect-panel')).toBeHidden();

  }

  async seleccionPago(valor: string){
    await this.vistaPago.click();
    await this.opcionPago(valor).click();

  }

}