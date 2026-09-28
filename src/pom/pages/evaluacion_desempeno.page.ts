import { expect, type Locator, type Page } from '@playwright/test';

export class EvaluacionDesempenoPage{
    readonly page: Page;
    readonly getStartedLink: Locator;
    readonly rutProveedor: Locator;
    readonly buscadorProveedor: Locator;
    readonly contrato: Locator;
    readonly buscadorContrato: Locator;
    readonly administrador: Locator;
    readonly buscadorAdministrador: Locator;
    readonly botonBuscar: Locator;
    readonly filtroVence15Dias: Locator;
    readonly filtroVence5Dias: Locator;
    readonly filtroEvaluacionVencida: Locator;
    readonly filtroSinEvaluaciones: Locator;
    readonly verPrograma: Locator;
    readonly botonNextPage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.getStartedLink = page.locator('a', { hasText: 'Get started' });
        this.rutProveedor = page.getByRole('button', { name: 'RUT Proveedor' });
        this.buscadorProveedor = page.getByRole('textbox', { name: 'Ingrese el RUT del proveedor' });
        this.contrato = page.getByRole('button', { name: 'N° Contrato' });
        this.buscadorContrato = page.getByRole('textbox', { name: 'Ingrese el número de contrato' });
        this.administrador = page.getByRole('button', { name: 'RUT Administrador' });
        this.buscadorAdministrador = page.getByRole('textbox', { name: 'Ingrese el RUT del' });
        this.botonBuscar = page.getByRole('button', { name: 'Buscar' });
        this.filtroVence15Dias = page.getByRole('button', { name: 'Filtrar por Vence en los próximos 15 días' });
        this.filtroVence5Dias = page.getByRole('button', { name: 'Filtrar por Vence en los próximos 5 días' });
        this.filtroEvaluacionVencida = page.getByRole('button', { name: 'Filtrar por Evaluación Vencida' });
        this.filtroSinEvaluaciones = page.getByRole('button', { name: 'Filtrar por Sin evaluaciones' });
        this.verPrograma = page.getByRole('button', { name: 'Ver Programa' });
        this.botonNextPage = page.getByRole('button', { name: 'Next Page' });

    }

}
/*
  await page.getByRole('button', { name: 'RUT Proveedor' }).click();
  await page.getByRole('textbox', { name: 'Ingrese el RUT del proveedor' }).click();
  await page.getByRole('button', { name: 'N° Contrato' }).click();
  await page.getByRole('textbox', { name: 'Ingrese el número de contrato' }).click();
  await page.getByRole('button', { name: 'RUT Administrador' }).click();
  await page.getByRole('textbox', { name: 'Ingrese el RUT del' }).click();
  await page.getByRole('button', { name: 'Buscar' }).click();
  await page.getByRole('button', { name: 'Filtrar por Vence en los próximos 15 días' }).click();
  await page.getByRole('button', { name: 'Filtrar por Vence en los próximos 5 días' }).click();
  await page.getByRole('button', { name: 'Filtrar por Evaluación Vencida' }).click();
  await page.getByRole('button', { name: 'Filtrar por Sin evaluaciones' }).click();
  await page.getByRole('button', { name: 'Ver Programa' }).first().click();
  await page.getByRole('button', { name: 'Ver Programa' }).nth(1).click();
  await page.getByRole('button', { name: 'Next Page' }).click();
*/
