import { test, expect } from '@playwright/test';
import { LoginPage } from './../pages/login.page';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('.env_playwright') });
const user = process.env.USER_NAME;
const pass = process.env.USER_PASS;

test.describe('Dashboard', () => {

    test.beforeEach(async ({ page }) => {
        //Login con contraseña correcta, previo a cada test de esta suite
        const loginPage = new LoginPage(page);
         await page.goto(process.env.BASE_URL);
        await loginPage.submitLogin(user, pass);
        await page.waitForLoadState();
        await expect(page).toHaveURL("https://devmandante.rednegocios.cl/dashboard");
    });

    test('Valida Columnas Dashboard', { tag: ['@smoke', '@dashboard'] }, async ({ page }) => {
   
        

    });
});