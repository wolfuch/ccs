import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { NavBar_Mandante_BlackPage } from '../pages/navbar_mandante_black.page';
import { EvaluacionV2Page } from '../pages/evaluacionV2.page';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('.env_playwright') });
const user = process.env.USER_NAME;
const pass = process.env.USER_PASS;
const url = process.env.VITE_APP_URL_EVALUACION;

const RUT_CON_DATOS = '91489000';
const RUT_SIN_DATOS = '09876';
const CONTRATO_CON_DATOS = 'TestEva2';

test.describe('Evaluación de Desempeño V2', () => {

    test.beforeEach(async ({ page }) => {
        //Login con contraseña correcta, previo a cada test de esta suite
        const loginPage = new LoginPage(page);
        const navBar = new NavBar_Mandante_BlackPage(page);

        await page.goto(process.env.VITE_APP_URL_EVALUACION);
        await loginPage.submitLogin(user, pass);
        await page.waitForLoadState();
        await expect(page).toHaveURL("https://devmandante.rednegocios.cl/dashboard");
        await navBar.goToConfigurarEvaluacionV2()
        await expect(page).toHaveURL(`${url}EvaluacionV2`);
    });

    test('Selecciona primer contrato por Rut Proveedor', { tag: ['@smoke', '@evaluacionV2'] }, async ({ page }) => {
        const evaPage = new EvaluacionV2Page(page);
        await evaPage.buscarPorRut(RUT_CON_DATOS);
        await evaPage.seleccionarContrato("1");
        await expect(page).toHaveURL(/EvaluacionV2\/contrato\/\d+$/);
    });

    test('Selecciona primer contrato por N° contrato', { tag: ['@smoke', '@evaluacionV2'] }, async ({ page }) => {
        const evaPage = new EvaluacionV2Page(page);
        await evaPage.buscarPorContrato(CONTRATO_CON_DATOS);
        await expect(evaPage.verPrograma).toHaveCount(1);
        await evaPage.seleccionarContrato(1);
        await expect(page).toHaveURL(/EvaluacionV2\/contrato\/\d+$/);
    });

    test('Valida encabezados de la tabla', { tag: ['@smoke', '@evaluacionV2'] }, async ({ page }) => {
        const evaPage = new EvaluacionV2Page(page);
        await evaPage.validaEncabezadosTabla();
    });

    test('Valida Botón "Por vencer" muestra contratos', { tag: ['@evaluacionV2', '@botonesEvaluador'] }, async ({ page }) => {
        const evaPage = new EvaluacionV2Page(page);
        await evaPage.filtrarPorVencer();
        await expect(evaPage.verPrograma.first()).toBeVisible();
    });

    // Prueba de filtros como pruebas independientes.
    const filtrosSinContratos = [
        { nombre: 'Atrasada', filtrar: (p: EvaluacionV2Page) => p.filtrarAtrasada() },
        { nombre: 'En curso', filtrar: (p: EvaluacionV2Page) => p.filtrarEnCurso() },
        { nombre: 'Sin iniciar', filtrar: (p: EvaluacionV2Page) => p.filtrarSinIniciar() },
        { nombre: 'Al día', filtrar: (p: EvaluacionV2Page) => p.filtrarAlDia() },
    ];

    for (const { nombre, filtrar } of filtrosSinContratos) {
        test(`Valida Botón "${nombre}" sin contratos`, { tag: ['@evaluacionV2', '@botonesEvaluador'] }, async ({ page }) => {
            const evaPage = new EvaluacionV2Page(page);
            await filtrar(evaPage);
            await expect(evaPage.sinResultados).toBeVisible();
        });
    }

    test('No hay resultados en tabla', { tag: ['@evaluacionV2'] }, async ({ page }) => {
        const evaPage = new EvaluacionV2Page(page);
        await evaPage.buscarPorRut(RUT_SIN_DATOS);
        await expect(evaPage.sinResultados).toBeVisible();
    });

});
