import { test, expect } from './../../fixtures/api.fixture';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('.env_playwright') });
const user = process.env.USER_NAME;
const pass = process.env.USER_PASS;

test.describe('API Autenticación', () => {

    test.skip(!process.env.API_BASE_URL, 'Falta API_BASE_URL en .env_playwright');

    test('Login con credenciales válidas responde OK',
        { tag: ['@smoke', '@api', '@authApi'] }, async ({ authApi }) => {
        const response = await authApi.login(user, pass);

        expect(response.ok()).toBeTruthy();
        //to do: validar el cuerpo (token presente) cuando esté el swagger
    });

});
