import { test, expect } from '@playwright/test';
import { LoginPage } from './../pages/login.page';
import { NavBar_Mandante_BlackPage } from './../pages/navbar_mandante_black.page';
import { CargaDatosEvaluacionPage } from './../pages/carga_datos_evaluacion.page';
import dotenv from 'dotenv';
import ExcelJS from 'exceljs';
import path from 'path';

dotenv.config({ path: path.resolve('.env_playwright') });
const user = process.env.USER_NAME;
const pass = process.env.USER_PASS;
const url = process.env.VITE_APP_URL_EVALUACION;
const urlMandante = process.env.BASE_URL_MANDANTE;

test.describe('Evaluación de Desempeño', () => {

    test.beforeEach(async ({ page }) => {
        //Login con contraseña correcta, previo a cada test de esta suite
        const loginPage = new LoginPage(page);
        const navBar = new NavBar_Mandante_BlackPage(page)

        await page.goto(process.env.VITE_APP_URL_EVALUACION);
        await loginPage.submitLogin(user, pass);
        await page.waitForLoadState();
        await expect(page).toHaveURL(urlMandante);
        await navBar.goToCargarDatosEvaluacion()
        await expect(page).toHaveURL(`${url}CargarDatosEvaluacion`);
    });

    test.skip('Descarga plantilla contratos y la sube ', 
        {tag: ['@smoke','@cargaContratos' ]}, async ({ page }, testInfo) => {
        const carga = new CargaDatosEvaluacionPage(page);
        
        //descarga de archivo
        const download = await carga.descargarPlantillaContratosExcel();
        expect(download.suggestedFilename()).toBe('plantilla-contratos.xlsx');

        //Carga de archivo recién descargado. Se elimina después de la ejecución
        const ruta = testInfo.outputPath(download.suggestedFilename());
        await download.saveAs(ruta);
        await carga.cargarArchivo(ruta);
        //Valida que el archivo no tenga errores
        await expect(carga.planillaContratosOK).toBeVisible();
    });

        test('Descarga plantilla contratos y evaluadores. Sube ambas planillas', 
            {tag: ['@smoke','@cargaEvaluadores' ]}, async ({ page }, testInfo) => {
        const carga = new CargaDatosEvaluacionPage(page);

        //Descarga de archivo contratos
        const downloadCon = await carga.descargarPlantillaContratosExcel();
        expect(downloadCon.suggestedFilename()).toBe('plantilla-contratos.xlsx');

        //Carga de archivo recién descargado. Se elimina después de la ejecución
        const rutaCon = testInfo.outputPath(downloadCon.suggestedFilename());
        await downloadCon.saveAs(rutaCon);
        await carga.cargarArchivo(rutaCon);
        await expect(carga.planillaContratosOK).toBeVisible();

        await carga.botonContinuarEvaluadores.click();
        
        //Descarga de archivo evaluadores
        const downloadEvua = await carga.descargarPlantillaEvaluadoresExcel();
        expect(downloadEvua.suggestedFilename()).toBe('plantilla-evaluadores.xlsx');
        const rutaEva = testInfo.outputPath(downloadEvua.suggestedFilename());
        await downloadEvua.saveAs(rutaEva);
        await carga.cargarArchivo(rutaEva);
        //Valida que ambos documentos quedaron bien cargados
        await expect(carga.planillaEvaluadoresOK).toBeVisible();

        //El test no carga la data. Solo valida hasta antes de enviarla.
        await expect(carga.enviaCarga).toBeVisible();
    });

    test('Plantilla contratos sin 1 valor muestra error', 
        { tag: ['@cargaContratos'] }, async ({ page }, testInfo) => {
        const carga = new CargaDatosEvaluacionPage(page);

        const download = await carga.descargarPlantillaContratosExcel();
        const ruta = testInfo.outputPath(download.suggestedFilename());
        await download.saveAs(ruta);

        // edit: clear one cell
        const wb = new ExcelJS.Workbook();
        await wb.xlsx.readFile(ruta);
        //Lee la primera hoja
        const ws = wb.worksheets[0];
        //Borra el parametro en B2
        ws.getCell('B2').value = null;
        const rutaEditada = testInfo.outputPath('plantilla-contratos-editada.xlsx');
        await wb.xlsx.writeFile(rutaEditada);

        await carga.cargarArchivo(rutaEditada);
        await expect(carga.planillaBad).toBeVisible();
    });


    test('Plantilla evaluadores sin 1 valor muestra error', 
            {tag: ['@smoke','@cargaEvaluadores' ]}, async ({ page }, testInfo) => {
        const carga = new CargaDatosEvaluacionPage(page);

        //Descarga de archivo contratos
        const downloadCon = await carga.descargarPlantillaContratosExcel();
        expect(downloadCon.suggestedFilename()).toBe('plantilla-contratos.xlsx');

        //Carga de archivo recién descargado. Se elimina después de la ejecución
        const rutaCon = testInfo.outputPath(downloadCon.suggestedFilename());
        await downloadCon.saveAs(rutaCon);
        await carga.cargarArchivo(rutaCon);
        await expect(carga.planillaContratosOK).toBeVisible();

        await carga.botonContinuarEvaluadores.click();
        
        //Descarga de archivo evaluadores
        const downloadEvua = await carga.descargarPlantillaEvaluadoresExcel();
        expect(downloadEvua.suggestedFilename()).toBe('plantilla-evaluadores.xlsx');

        const rutaEva = testInfo.outputPath(downloadEvua.suggestedFilename());
        await downloadEvua.saveAs(rutaEva);

        // Editará una celda
        const wb = new ExcelJS.Workbook();
        await wb.xlsx.readFile(rutaEva);
        //Lee la primera hoja
        const ws = wb.worksheets[0];
        //Borra el parametro en B2
        ws.getCell('B2').value = null;
        const rutaEditada = testInfo.outputPath('plantilla-evaluadores-editada.xlsx');
        await wb.xlsx.writeFile(rutaEditada);

        await carga.cargarArchivo(rutaEditada);
        await expect(carga.planillaBad).toBeVisible();
    });



});
