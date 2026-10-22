import { expect, type Locator, type Page } from '@playwright/test';

export class RankingPage{
  private readonly page: Page;
  readonly proveedor: Locator;
  readonly botonBuscar: Locator;
  readonly periodo: Locator;
  readonly categoria: Locator;
  readonly tamanoEmpresa: Locator;
  readonly verFichaEBS: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.proveedor = page.getByRole('textbox', { name: 'Buscar por nombre, RUT o Razó' });
    this.botonBuscar = page.getByRole('button', { name: 'Buscar' });
    this.periodo = page.getByRole('button', { name: 'Período' });
    this.categoria = page.locator('span').filter({ hasText: 'Categoría' });
    this.tamanoEmpresa = page.getByRole('button', { name: 'Tamaño Empresa' });
    
    //Esta es la ficha correspondiente a la empresa EARLY BIRD SPA
    this.verFichaEBS = page
                        .getByRole('row')
                        .filter({ hasText: 'EARLY BIRD SPA' })
                        .getByRole('button', { name: 'Ver ficha completa' })

    }

    // Para los campos Categoría y Tamaño de empresa, se requiere trabajar mejor el métodod e selección para 
    // que permita recibir un string para las alternativas. Se crea el método de todas maneras y se
    // deja uno para que funcione el happypath 
   
  async buscarProveedor(rut: string){
    //Acepta rut o razón social. Se deja la cariable como RUT para 
    // mantener nomenclatura con otros test. 
    await this.proveedor.fill(rut);
    await this.botonBuscar.click();
  }

  async seleccionarPeriodo(){
    await this.periodo.click();
  }
  
  async seleccionarPeriodoMarzo2026(){
    await this.periodo.click();
    //await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('option', { name: 'Marzo' }).getByText('Marzo').click();
  }

  async seleccionarCategoria(){
    await this.categoria.click();
  }

  async seleccionarCategoriaEquipo(){
    await this.categoria.click();
    await this.page.getByRole('option', { name: 'M02.00.00 EQUIPOS' }).click();
  }

  async seleccionaTamanoEmpresa(tamano: 'micro'|'pequena'|'mediana'|'grande' ) {
    await this.tamanoEmpresa.click();
    switch(tamano){
        case 'micro':
            await this.page.getByText('MicroEmpresa').click();
            break;
        case 'pequena':
            await this.page.getByText('Empresa Pequeña').click();
            break;
        case 'mediana':
            await this.page.getByText('Empresa Mediana').click();
            break;
        case 'grande':
            await this.page.getByText('Empresa Grande').click();
            break;
    }
  }

  async verFichaEB(){
    await this.verFichaEBS.click();
  }
}