import { expect, type Locator, type Page } from '@playwright/test';

export class EvaluacionV2Page{
  private readonly page: Page;
  readonly rutProveedor: Locator;
  readonly buscadorProveedor: Locator;
  readonly contrato: Locator;
  readonly buscadorContrato: Locator;
  readonly botonBuscar: Locator;
  readonly filtroAtrasada: Locator;
  readonly filtroPorVencer: Locator;
  readonly filtroEnCurso: Locator;
  readonly filtroSinIniciar: Locator;
  readonly filtroAlDia: Locator;
  readonly filtroSinPeriodo: Locator;
  readonly verPrograma: Locator;
  readonly botonNextPage: Locator;
  readonly sinResultados: Locator;


  constructor(page: Page) {
    this.page = page;
    this.rutProveedor = page.getByRole('button', { name: 'RUT Proveedor' });
    this.buscadorProveedor = page.getByRole('textbox', { name: 'Ingrese el RUT del proveedor' });
    this.contrato = page.getByRole('button', { name: 'N° Contrato' });
    this.buscadorContrato = page.getByRole('textbox', { name: 'Ingrese el número de contrato' });
    this.botonBuscar = page.getByRole('button', { name: 'Buscar' });
    this.filtroAtrasada = page.getByRole('button', { name: 'Filtrar por Atrasada:' });
    this.filtroPorVencer = page.getByRole('button', { name: 'Filtrar por Por vencer:' });
    this.filtroEnCurso = page.getByRole('button', { name: 'Filtrar por En curso:' });
    this.filtroSinIniciar = page.getByRole('button', { name: 'Filtrar por Sin iniciar:' });
    this.filtroAlDia = page.getByRole('button', { name: 'Filtrar por Al día:' });
    this.filtroSinPeriodo = page.getByRole('button', { name: 'Filtrar por Sin período' });
    this.verPrograma = page.getByRole('button', { name: 'Ver Programa' });
    this.botonNextPage = page.getByRole('button', { name: 'Next Page' });
    this.sinResultados = page.getByRole('cell', { name: 'Ningún contrato coincide con el filtro.' });
  }

  async filtrarAtrasada(){
    await this.filtroAtrasada.click();
  }

  async filtrarPorVencer(){
     await this.filtroPorVencer.click();
  }

  async filtrarEnCurso(){
      await this.filtroEnCurso.click();
  }

  async filtrarSinIniciar(){
      await this.filtroSinIniciar.click();
  }

  async filtrarAlDia(){
      await this.filtroAlDia.click();
  }

  async filtrarSinPeriodo(){
      await this.filtroSinPeriodo.click();
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