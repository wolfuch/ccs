import { test, expect } from '@playwright/test';
import {LoginPage} from './../pages/login.page';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('.env_playwright') });
const user = process.env.USER_NAME;
const pass = process.env.USER_PASS;

test('Login Correct Credentials', {tag: ['@smoke','@login' ]}, async ({ page }) => {
//Login con contraseña correcta

    const loginPage = new LoginPage(page);
    await page.goto(process.env.VITE_APP_URL_EVALUACION);
    await loginPage.submitLogin(user, pass);
    await page.waitForLoadState();
    await expect(page).toHaveURL("https://devmandante.rednegocios.cl/dashboard");

});

test('Login Invalid User', {tag: ['@smoke','@login' ]}, async ({ page }) => {
//Login con usuario incorrect
const loginPage = new LoginPage(page);

    await page.goto(process.env.VITE_APP_URL_EVALUACION);
    await loginPage.submitLogin("UserTest", "badPass");
    await expect(page.locator('form')).toContainText('Ingrese un email válido');

});

test('Login Incorrect Password', {tag: ['@smoke','@login' ]}, async ({ page }) => {
//Login con contraseña incorrecta
    const loginPage = new LoginPage(page);

    await page.goto(process.env.VITE_APP_URL_EVALUACION);
    await loginPage.submitLogin(user, "badPass");
    await expect(page.locator('#pr_id_1_content')).toContainText('Parámetros no válidos');
    await page.getByText('Entendido').click();

});

test.skip('Fail Test', {tag: ['@smoke','@login' ]}, async ({ page }) => {
//Test que falla para ver reportería
    const loginPage = new LoginPage(page);

    await page.goto(process.env.VITE_APP_URL_EVALUACION);
    await loginPage.submitLogin(user, "badPass");
    await page.waitForLoadState();
    await expect(page.getByRole('button', { name: 'Menú de perfil' })).toBeVisible();

});