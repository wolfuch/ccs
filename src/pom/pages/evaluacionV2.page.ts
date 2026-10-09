import { expect, type Locator, type Page } from '@playwright/test';

export class EvaluacionDesempenoPage{
    private readonly page: Page;
    readonly rutProveedor: Locator;
    readonly contrato: Locator;
    readonly buscadorContrato: Locator;
    readonly botonBuscar: Locator;
    readonly filtroAtrasada: Locator;
    readonly filtroPorVencer: Locator;
    readonly filtroEnCurso: Locator;
    readonly filtroSinIniciar: Locator;
    readonly filtroSinPeriodo: Locator;
    readonly verPrograma: Locator;
    readonly botonNextPage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.rutProveedor = page.getByRole('button', { name: 'RUT Proveedor' });
        this.contrato = page.getByRole('button', { name: 'N° Contrato' });
        this.buscadorContrato = page.getByRole('textbox', { name: 'Ingrese el número de contrato' });
        this.botonBuscar = page.getByRole('button', { name: 'Buscar' });
        this.filtroAtrasada = page.getByRole('button', { name: 'Filtrar por Atrasada:' });
        this.filtroPorVencer = page.getByRole('button', { name: 'Filtrar por Por vencer:' });
        this.filtroEnCurso = page.getByRole('button', { name: 'Filtrar por En curso:' });
        this.filtroSinIniciar = page.getByRole('button', { name: 'Filtrar por Sin iniciar:' });
        this.filtroSinPeriodo = page.getByRole('button', { name: 'Filtrar por Sin período' });
        this.verPrograma = page.getByRole('button', { name: 'Ver Programa' });
        this.botonNextPage = page.getByRole('button', { name: 'Next Page' });

    }

    
}

/*
  await page.goto('https://devev.rednegocios.cl/');
  await page.goto('https://devlogin.rednegocios.cl/');
  await page.locator('a').filter({ hasText: /^Evaluación$/ }).click();
  await page.locator('a').filter({ hasText: 'Evaluación v2' }).click();
  await page.getByRole('button', { name: 'RUT Proveedor' }).click(); Listo
  await page.getByRole('button', { name: 'N° Contrato' }).click(); Listo
  await page.getByRole('button', { name: 'Buscar' }).click(); Listo
  await page.getByRole('button', { name: 'Filtrar por Atrasada:' }).click(); Listo
  await page.getByRole('button', { name: 'Filtrar por Por vencer:' }).click(); Listo
  await page.getByRole('button', { name: 'Filtrar por En curso:' }).click(); Listo
  await page.getByRole('button', { name: 'Filtrar por Sin iniciar:' }).click(); Listo
  await page.getByRole('button', { name: 'Filtrar por Sin período' }).click(); Listo
  await page.locator('div').filter({ hasText: /^Rut Proveedor$/ }).click();
  await page.getByText('Proveedor', { exact: true }).click();
  await page.getByText('N° de contrato').click();
  await page.getByText('Dimensión').click();
  await page.getByText('Periodicidad').click();
  await page.getByText('Última evaluación').click();
  await page.getByText('Fecha evaluación').click();
  await page.getByText('Estado').click();
  await page.getByRole('columnheader', { name: 'Acción' }).click();

*/