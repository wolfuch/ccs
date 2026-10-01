import { expect, type Locator, type Page } from '@playwright/test';


export class MiCarteraPage {
  private readonly page: Page;
  private readonly getStartedLink: Locator;
  readonly tabEnProcesos: Locator;
  readonly tabRechazados: Locator;
  readonly tabPendientes: Locator;
  readonly tabCreadosSap: Locator;
  readonly buscador: Locator;
  readonly botonBuscador: Locator;
  readonly creaProveedor: Locator;
  //readonly verDetalle: Locator;



  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.locator('a', { hasText: 'Get started' });
    this.tabEnProcesos = page.getByText('En Proceso', { exact: true });
    this.tabRechazados = page.getByText('Rechazados');
    this.tabPendientes = page.getByText('Pendiente1');
    this.tabCreadosSap = page.getByText('Creados SAP');
    this.buscador = page.getByRole('textbox', { name: 'Rut o Razón social' });
    this.botonBuscador = page.getByRole('button').filter({ hasText: /^$/ });
    this.creaProveedor = page.getByRole('button', { name: 'Crear proveedor' });


}


  async buscaProveedor(proveedor: string) {
    this.buscador.fill(proveedor);
    this.botonBuscador.click();
    
  }
  async tabEnProceso(){
    this.tabEnProcesos.click();

  }

  async tabRechazado(){
    this.tabRechazados.click();

  }
  
  async tabPendiente(){
    this.tabPendientes.click();

  }

  async tabCreadoSAP(){
    this.tabCreadosSap.click();

  }
  async crearProveedor(){
    this.creaProveedor.click();
  }

}