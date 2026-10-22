import { expect, type Locator, type Page } from '@playwright/test';

export class EvaluacionDesempenoPage{
    private readonly page: Page;
    private readonly getStartedLink: Locator;
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

    async filtroVenceEn15(){
        await this.filtroVence15Dias.click();
    }
    async filtroVenceEn5(){
        await this.filtroVence5Dias.click();
    }
    async filtroVencido(){
        await this.filtroEvaluacionVencida.click();
    }
    async filtroSinEvaluar(){
        await this.filtroSinEvaluaciones.click();
    }

    async buscarPorRut(rut: string){
        await this.rutProveedor.click();
        await this.buscadorProveedor.fill(rut);
        await this.botonBuscar.click();
    }

    async buscarPorContrato(contrato: string){
        await this.contrato.click();
        await this.buscadorContrato.fill(contrato);
        await this.botonBuscar.click();
    }

    async buscarPorAdmin(admin: string){
        await this.administrador.click();
        await this.buscadorAdministrador.fill(admin);
        await this.botonBuscar.click();
    }

    async nextPage(){
       await this.botonNextPage.click();
    }

    async seleccionarContrato(num: string){
        //El método eligirá el programa en relación al número correspondiente. Si pone cualquier número negativo, eligirá el primero.
        //Para todos los otros casos, los considera como un arreglo, desde el 0 en adelante, permitiendo que si quiere el primero,
        //puede poner 1, 0 o cualquier número menor que esos.
        const number = parseInt(num, 10);
        //Se ocupa parseInt para asegurar el valor entero del parámetro
        if(number>1){
            await this.verPrograma.nth(number-1).click();
        }

        else{
            await this.verPrograma.first().click();
        }
    }

    // Valida el encabezado de las tablas
  async validaEncabezadosTabla(){
      const encabezados = [
          'Rut Proveedor', 'Proveedor', 'N° de contrato', 'Dimensión', 'Periodicidad',
          'Última evaluación', 'Fecha evaluación', 'Estado', 'Acción',
      ];
      for (const nombre of encabezados) {
          await expect(this.page.getByRole('columnheader', { name: nombre, exact: true })).toBeVisible();
      }
  }
}

