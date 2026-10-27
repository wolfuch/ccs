import { test, expect } from '@playwright/test';
import { LoginPage } from './../pages/login.page';
import { NavBar_Mandante_BlackPage } from './../pages/navbar_mandante_black.page';
import { Dashboard360 } from './../pages/dashboard360.page';
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

});



/*
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Dashboard 360 Visualiza mé' }).click();
  const page2 = await page2Promise;
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Dashboard 360 Visualiza mé' }).click();
  const page1 = await page1Promise;
  await page1.getByTestId('shell-main').click();
*/