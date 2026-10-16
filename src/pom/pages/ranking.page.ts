import { expect, type Locator, type Page } from '@playwright/test';

export class RankingPage{
  private readonly page: Page;
  readonly rutProveedor: Locator;
  readonly buscadorProveedor: Locator;
  readonly botonBuscar: Locator;
  readonly periodo: Locator;
  readonly categoria: Locator;
  readonly tamanoEmpresa: Locator;
  readonly verFicha: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.rutProveedor = page.getByRole('textbox', { name: 'Buscar por nombre, RUT o Razó' });
    this.buscadorProveedor = page.getByRole('button', { name: 'Buscar' });
    this.botonBuscar = page.getByRole('button', { name: 'Buscar' });
    this.periodo = page.getByRole('button', { name: 'Período' });
    this.categoria = page.locator('span').filter({ hasText: 'Categoría' });
    this.tamanoEmpresa = page.getByRole('button', { name: 'Tamaño Empresa' });
    this.verFicha = page.getByRole('button', { name: 'Ver ficha completa' });

    }

}

/*
  await page.getByText('2026 Febrero').click();
  await page.getByText('PeríodoPeríodo').click();
  await page.getByText('2026 Marzo').click();
  await page.locator('span').filter({ hasText: 'Categoría' }).click();
  await page.getByRole('option', { name: 'M01.00.00 CONSTRUCCION' }).click();
  await page.getByRole('button', { name: 'Categoría' }).click();
  await page.getByRole('option', { name: 'M02.00.00 EQUIPOS' }).click();
  await page.getByRole('button', { name: 'Tamaño Empresa' }).click();
  await page.getByText('MicroEmpresa').click();
  await expect(page.getByRole('listbox', { name: 'Resultados de búsqueda' }).getByRole('listitem')).toContainText('Ningún resultado para "9487"');
  await page.getByRole('listbox', { name: 'Resultados de búsqueda' }).click();
  await expect(page.getByRole('option', { name: 'INVERSIONES PSI SPA' })).toBeVisible();
  await expect(page.getByText('INVERSIONES PSI SPA×')).toBeVisible();
  await expect(page.getByRole('cell', { name: 'INVERSIONES PSI SPA' })).toBeVisible();
  await expect(page.getByText('Tabla de Posiciones completa(16 resultados)↓ Excel↓ CSVPOSICIÓ')).toBeVisible();
  await page.getByRole('button', { name: 'Ver ficha completa' }).click();
  await expect(page.getByRole('article').getByRole('heading', { name: 'INVERSIONES PSI SPA' })).toBeVisible();
  await page.getByRole('button', { name: 'Cerrar' }).click();
  await page.getByText('Tamaño EmpresaTamaño Empresa').click();
  await page.getByText('Empresa Pequeña').click();
  await expect(page.getByRole('option', { name: 'INGENIERIA Y MONTAJES' })).toBeVisible();
});
*/