import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  readonly headerAlertasCategoría: Locator;
  readonly headerPanoramaCartera: Locator;
  readonly headerPEP_PEC_PER: Locator;
  readonly headerInconsistencias: Locator;
  readonly headerProveedores: Locator;
  readonly alertaFinanciero: Locator;
  readonly alertaSeguridad: Locator;
  readonly alertaComercial: Locator;
  readonly alertaLaboral: Locator;
  readonly alertaLegal: Locator;
  readonly alertaCumplimiento: Locator;
  readonly alertaOtros: Locator;
  readonly buscaProveedor: Locator;
  readonly proveedorVer360: Locator;


  constructor(page: Page) {
    this.page = page;
    this.headerAlertasCategoría = page.getByRole('heading', { name: 'Alertas por categoría' });
    this.headerPanoramaCartera = page.getByRole('heading', { name: 'Panorama de la cartera' });
    this.headerPEP_PEC_PER = page.getByRole('heading', { name: 'PEP, PEC y PER' });
    this.headerInconsistencias = page.getByRole('heading', { name: 'Inconsistencias y' });
    this.headerProveedores = page.getByRole('heading', { name: 'Proveedores de la cartera' });
    this.alertaFinanciero = page.getByTestId('cartera-categoria-financiero');
    this.alertaSeguridad = page.getByTestId('cartera-categoria-seguridad');
    this.alertaComercial = page.getByTestId('cartera-categoria-comercial');
    this.alertaLaboral = page.getByTestId('cartera-categoria-laboral');
    this.alertaLegal = page.getByTestId('cartera-categoria-legal');
    this.alertaCumplimiento = page.getByTestId('cartera-categoria-compliance');
    this.alertaOtros = page.getByTestId('cartera-categoria-otros');
    this.buscaProveedor = page.getByRole('searchbox', { name: 'Buscar por razón social o RUT' });
    this.proveedorVer360 = page.getByRole('button', { name: 'Ver el Centro de Alertas 360' });
    
    }

    async validaHeaders(){
        await expect(this.headerAlertasCategoría).toBeVisible();
        await expect(this.headerPanoramaCartera).toBeVisible();
        await expect(this.headerPEP_PEC_PER).toBeVisible();
        await expect(this.headerInconsistencias).toBeVisible();
        await expect(this.headerProveedores).toBeVisible();
    }

    async validaAlertas(){
        await expect(this.alertaFinanciero).toBeVisible();
        await expect(this.alertaSeguridad).toBeVisible();
        await expect(this.alertaComercial).toBeVisible();
        await expect(this.alertaLaboral).toBeVisible();
        await expect(this.alertaLegal).toBeVisible();
        await expect(this.alertaCumplimiento).toBeVisible();
        await expect(this.alertaOtros).toBeVisible();
    }

    async proveedor360(rut: string){
        //Acepta rut o razón social. Se deja la cariable como RUT para 
        // mantener nomenclatura con otros test. 
        await this.buscaProveedor.fill(rut);
        await this.page.waitForLoadState('networkidle');
        await this.proveedorVer360.click();
    }



}

/*
  
  await page.getByRole('searchbox', { name: 'Buscar por razón social o RUT' }).fill('70017');
  await page.getByRole('searchbox', { name: 'Buscar por razón social o RUT' }).press('Enter');
  await expect(page.getByRole('cell', { name: 'CAMARA DE COMERCIO DE SANTIAGO A G', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Ver el Centro de Alertas 360' }).click();
  await expect(page.getByTestId('alertas-header-proveedor').getByText('CAMARA DE COMERCIO DE')).toBeVisible();

https://devmetricas.rednegocios.cl/proveedores/953/alertas
*/