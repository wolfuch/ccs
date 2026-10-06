import { type Download, type Locator, type Page } from '@playwright/test';

export class CargaDatosEvaluacionPage {
  private readonly page: Page;
  readonly descargarContratosExcel: Locator;
  readonly descargarContratosCsv: Locator;
  readonly descargarEvaluadoresExcel: Locator;
  readonly descargarEvaluadoresCsv: Locator;
  readonly botonSeleccionarArchivo: Locator;
  // readonly inputArchivo: Locator;
  readonly tituloValidacion: Locator;
  readonly botonContinuarEvaluadores: Locator;

  constructor(page: Page) {
    this.page = page;
    this.descargarContratosExcel = page.getByRole('button', { name: 'Descargar plantilla de Contratos en Excel' });
    this.descargarContratosCsv = page.getByRole('button', { name: 'Descargar plantilla de Contratos en CSV' });
    this.descargarEvaluadoresExcel = page.getByRole('button', { name: 'Descargar plantilla de Evaluadores en Excel' });
    this.descargarEvaluadoresCsv = page.getByRole('button', { name: 'Descargar plantilla de Evaluadores en CSV' });
    this.botonSeleccionarArchivo = page.getByRole('button', { name: 'Seleccionar archivo' });
   // this.inputArchivo = page.locator('input[type="file"]');
    this.tituloValidacion = page.getByRole('heading', { name: 'Validación documental' });
    this.botonContinuarEvaluadores = page.getByRole('button', { name: 'Continuar a Evaluadores' });
  }

  async descargarPlantillaContratos(): Promise<Download> {
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

  async cargarArchivo(ruta: string) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.botonSeleccionarArchivo.click(),
    ]);
    await fileChooser.setFiles(ruta);
  }
}
