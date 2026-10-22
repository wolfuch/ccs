import { type Download, type Locator, type Page } from '@playwright/test';

export class CargaDatosEvaluacionPage {
  private readonly page: Page;
  readonly descargarContratosExcel: Locator;
  readonly descargarContratosCsv: Locator;
  readonly descargarEvaluadoresExcel: Locator;
  readonly descargarEvaluadoresCsv: Locator;
  readonly botonSeleccionarArchivo: Locator;
  readonly planillaContratosOK: Locator;
  readonly planillaEvaluadoresOK: Locator;
  readonly planillaBad: Locator
  readonly botonContinuarEvaluadores: Locator;
  readonly enviaCarga: Locator;

  constructor(page: Page) {
    this.page = page;
    this.descargarContratosExcel = page.getByRole('button', { name: 'Descargar plantilla de Contratos en Excel' });
    this.descargarContratosCsv = page.getByRole('button', { name: 'Descargar plantilla de Contratos en CSV' });
    this.descargarEvaluadoresExcel = page.getByRole('button', { name: 'Descargar plantilla de Evaluadores en Excel' });
    this.descargarEvaluadoresCsv = page.getByRole('button', { name: 'Descargar plantilla de Evaluadores en CSV' });
    this.botonSeleccionarArchivo = page.getByRole('button', { name: 'Seleccionar archivo' });
    this.planillaContratosOK = page.getByRole('heading', { name: 'La plantilla de Contratos est' });
    this.planillaEvaluadoresOK = page.getByRole('heading', { name: 'Ambas plantillas están' });
    this.planillaBad = page.getByRole('heading', { name: 'Corrige 1 error para continuar' });
    this.botonContinuarEvaluadores = page.getByRole('button', { name: 'Continuar a Evaluadores' });
    this.enviaCarga = page.getByRole('button', { name: 'Enviar carga' });
  }

  async descargarPlantillaContratosExcel(): Promise<Download> {
    //Es necesario dejar la "promesa" de la descarga. Si no el método falla
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.descargarContratosExcel.click(),
    ]);
    return download;
  }

  async descargarPlantillaContratosCsv(): Promise<Download> {
    //Es necesario dejar la "promesa" de la descarga. Si no el método falla
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.descargarContratosCsv.click(),
    ]);
    return download;
  }

    async descargarPlantillaEvaluadoresExcel(): Promise<Download> {
    //Es necesario dejar la "promesa" de la descarga. Si no el método falla
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.descargarEvaluadoresExcel.click(),
    ]);
    return download;
  }

  async descargarPlantillaEvaluadoresCsv(): Promise<Download> {
    //Es necesario dejar la "promesa" de la descarga. Si no el método falla
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.descargarEvaluadoresCsv.click(),
    ]);
    return download;
  }

  async cargarArchivo(ruta: string) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.botonSeleccionarArchivo.click(),
    ]);
    await fileChooser.setFiles(ruta);
  }

  /*
  await page.getByRole('heading', { name: 'La plantilla de Contratos est' }).click();
  await page.getByRole('heading', { name: 'Corrige 1 error para continuar' }).click();
  await page.getByRole('heading', { name: 'Ambas plantillas están' }).click();
  
  */
}
