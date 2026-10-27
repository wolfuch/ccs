import { test, expect } from '@playwright/test';
import { LoginPage } from './../pages/login.page';
import { NavBar_Mandante_BlackPage } from './../pages/navbar_mandante_black.page';
import { EvaluacionDesempenoPage } from './../pages/evaluacion_desempeno.page';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('.env_playwright') });
const user = process.env.USER_NAME;
const pass = process.env.USER_PASS;
const url = process.env.VITE_APP_URL_EVALUACION;

test.describe('Evaluación de Desempeño', () => {

    test.beforeEach(async ({ page }) => {
        //Login con contraseña correcta, previo a cada test de esta suite
        const loginPage = new LoginPage(page);
        const navBar = new NavBar_Mandante_BlackPage(page);

        await page.goto(process.env.VITE_APP_URL_EVALUACION);
        await loginPage.submitLogin(user, pass);
        await page.waitForLoadState();
        await expect(page).toHaveURL("https://devmandante.rednegocios.cl/dashboard");
        await navBar.goToEvaluacionDesempeno()
        await expect(page).toHaveURL(`${url}EvaluacionDesempeno`);
    });

    test('Valida encabezados de la tabla', { tag: ['@smoke', '@evaluacion'] }, async ({ page }) => {
            const evaPage = new EvaluacionDesempenoPage(page);
            await evaPage.validaEncabezadosTabla();
    });

    test('Selecciona primer contrato por Rut Proveedor', { tag: ['@smoke', '@evaluacion'] }, async ({ page }) => {
        const evaPage = new EvaluacionDesempenoPage(page);
        await evaPage.buscarPorRut("0987");
        await evaPage.seleccionarContrato("1");
        await expect(page).toHaveURL("https://devev.rednegocios.cl/EvaluacionDesempeno/contrato/11432");
        

    });

    test('Valida Botón "Vence en próximos 15 días"', { tag: ['@evaluacion', '@botonesEvaluador'] }, async ({ page }) => {
        const evaPage = new EvaluacionDesempenoPage(page);
        await evaPage.buscarPorRut("0987");
        await expect(evaPage.verPrograma.first()).toBeVisible();
        await evaPage.filtroVenceEn15();
        await expect(page.getByRole('cell')).toContainText('No se encontraron contratos');

    });
        
    test('Valida Botón "Vence en próximos 5 días"', { tag: ['@evaluacion', '@botonesEvaluador'] }, async ({ page }) => {
        const evaPage = new EvaluacionDesempenoPage(page);
        await evaPage.buscarPorRut("0987");
        await expect(evaPage.verPrograma.first()).toBeVisible();
        await evaPage.filtroVenceEn5();
        await expect(page.getByRole('cell')).toContainText('No se encontraron contratos');

    });

    test('Valida Botón "Sin evaluaciones Pendientes"', { tag: ['@evaluacion', '@botonesEvaluador'] }, async ({ page }) => {
        const evaPage = new EvaluacionDesempenoPage(page);
        await evaPage.buscarPorRut("0987");
        await expect(evaPage.verPrograma.first()).toBeVisible();
        await evaPage.filtroSinEvaluar();
        await expect(page.getByRole('cell')).toContainText('No se encontraron contratos');

    });

    test('Selecciona primer por N° comntrato', { tag: ['@smoke', '@evaluacion'] }, async ({ page }) => {
        const evaPage = new EvaluacionDesempenoPage(page);
        await evaPage.buscarPorContrato("4501925266");
        await evaPage.seleccionarContrato("1");
        await expect(page).toHaveURL("https://devev.rednegocios.cl/EvaluacionDesempeno/contrato/3796");
    });

    test('No hay resultados en tabla', { tag: ['@evaluacion'] }, async ({ page }) => {
        const evaPage = new EvaluacionDesempenoPage(page);
        await evaPage.buscarPorRut("09876");
        await expect(page.getByRole('cell')).toContainText('No se encontraron contratos');
    });

});
