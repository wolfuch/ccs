import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from './../pages/login.page';
import { MandanteMetricasPage } from './../pages/mandante_metricas.page';
import { Dashboard360 } from './../pages/dashboard360.page';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('.env_playwright') });
const user = process.env.USER_NAME;
const pass = process.env.USER_PASS;

test.describe('Dashboard 360', () => {
    // Se asignan en el beforeEach: cada test parte con su propia pestaña nueva
    let popup: Page;
    let dashboard: Dashboard360;

    test.beforeEach(async ({ page }) => {
        //Login con contraseña correcta, previo a cada test de esta suite
        const loginPage = new LoginPage(page);
        const metricas = new MandanteMetricasPage(page);

        await page.goto(process.env.VITE_APP_URL_EVALUACION);
        await loginPage.submitLogin(user, pass);
        await expect(page).toHaveURL("https://devmandante.rednegocios.cl/dashboard", { timeout: 15000 });

        //El dashboard se abre en otra pestaña, tras una redirección de login entre dominios
        popup = await metricas.irDashboard360();
        dashboard = new Dashboard360(popup);   // el POM se construye con la pestaña nueva, no con `page`
        await expect(popup).toHaveURL(/\/dashboard-360$/, { timeout: 20000 });
        await expect(popup.getByTestId('shell-main')).toBeVisible();
    });

    test('Abre Dashboard 360 en una pestaña nueva', { tag: ['@smoke', '@dashboard360'] }, async ({ page }) => {
        //La pestaña original sigue en el dashboard de Mandante
        expect(popup).not.toBe(page);
        await expect(page).toHaveURL(/\/dashboard$/);
    });

    test('Valida encabezados de Dashboard 360', { tag: ['@dashboard360'] }, async () => {
        await dashboard.validaHeaders();
    });

    test('Valida alertas por categoría de Dashboard 360', { tag: ['@dashboard360'] }, async () => {
        await dashboard.validaAlertas();
    });

});
