import { test, expect } from '@playwright/test';
import dotenv from 'dotenv'

dotenv.config();
//las credenciales están en un archivo raiz llamado ".env". No tengo información de cómo se están llamando en el ambiente de AzureDevops, por lo que no las puedo definir de esa forma.
test('Login Correct Credentials', async ({ page }) => {
//Login con contraseña correcta
await page.goto(process.env.BASE_URL);
await page.getByRole('textbox', { name: 'Ingrese su email' }).fill(process.env.USER_NAME);
await page.getByRole('textbox', { name: 'Ingrese su Contraseña' }).fill(process.env.USER_PASS);
await page.getByRole('button', { name: 'Ingresar' }).click();
await page.waitForLoadState();
await expect(page.getByRole('button', { name: 'Menú de perfil' })).toBeVisible();

});

test('Login Invalid User', async ({ page }) => {
//Login con usuario incorrect
await page.goto(process.env.BASE_URL);
await page.getByRole('textbox', { name: 'Ingrese su email' }).fill('badUser');
await expect(page.locator('form')).toContainText('Ingrese un email válido');

});

test('Login Incorrect Password', async ({ page }) => {
//Login con contraseña incorrecta
await page.goto(process.env.BASE_URL);
await page.getByRole('textbox', { name: 'Ingrese su email' }).fill(process.env.USER_NAME);
await page.getByRole('textbox', { name: 'Ingrese su Contraseña' }).fill('badPass');
await page.getByRole('button', { name: 'Ingresar' }).click();
await expect(page.locator('#pr_id_1_content')).toContainText('Parámetros no válidos');
await page.getByText('Entendido').click();

});