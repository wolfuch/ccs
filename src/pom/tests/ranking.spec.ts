import { test, expect } from '@playwright/test';
import { LoginPage } from './../pages/login.page';
import { NavBar_Mandante_BlackPage } from './../pages/navbar_mandante_black.page';
import { RankingPage } from './../pages/ranking.page';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('.env_playwright') });
const user = process.env.USER_NAME;
const pass = process.env.USER_PASS;
const url = process.env.BASE_URL_MANDANTE; 

test.describe('Evaluación de Desempeño', () => {

    test.beforeEach(async ({ page }) => {
        //Login con contraseña correcta, previo a cada test de esta suite
        const loginPage = new LoginPage(page);
        const navBar = new NavBar_Mandante_BlackPage(page);

        await page.goto(process.env.VITE_APP_URL_EVALUACION);
        await loginPage.submitLogin(user, pass);
        await page.waitForLoadState();
        await expect(page).toHaveURL(`${url}dashboard`);
        await navBar.goToRankingProveedores();
        await expect(page).toHaveURL(`${url}Ranking`);
        await page.waitForLoadState('networkidle');
    });

    test('Selecciona periodo Marzo 2026', { tag: ['@smoke', '@ranking'] }, async ({ page }) => {
        const ranking = new RankingPage(page);
        await ranking.seleccionarPeriodoMarzo2026();
        await expect(page.getByText('FijoDinámicoENERO – MARZO')).toBeVisible();
    });

    test('Selecciona categoría M02', { tag: ['@smoke', '@ranking'] }, async ({ page }) => {
        const ranking = new RankingPage(page);
        await ranking.seleccionarCategoriaEquipo();
        await expect(page.getByTestId('ranking-filter-chip-categoria').getByText('M02.00.00 EQUIPOS')).toBeVisible();
    });
    
    test('Selecciona tamaño empresa Micro', { tag: ['@smoke', '@ranking'] }, async ({ page }) => {
        const ranking = new RankingPage(page);
        await ranking.seleccionaTamanoEmpresa("micro");
        await expect(page.getByTestId('ranking-filter-chip-tamano').getByText('MicroEmpresa')).toBeVisible();        
    });

    test('Busca EARLY BIRD SPA por rut y revisa la ficha', { tag: ['@ranking'] }, async ({ page }) => {
        const ranking = new RankingPage(page);
        await ranking.buscarProveedor("77982298-2");
        await ranking.verFichaEB();
        await expect(page.getByTestId('detalle-header')).toContainText('RANKING ACTUAL #48EARLY BIRD SPARUT: 77982298-2');
    });
    
    test('Utiliza los filtros y seleccionar EARLY BIRD SPA', { tag: ['@ranking'] }, async ({ page }) => {
        const ranking = new RankingPage(page);
        await ranking.seleccionarPeriodoMarzo2026();
        await ranking.seleccionaTamanoEmpresa("micro");

        //Valida que la empresa esté dentro de la lista del ranking
        await expect(page.getByTestId('ranking-sidepanel-card-45413').getByText('EARLY BIRD SPA')).toBeVisible();

        //Seleccionar empresa en el listado y valida que esté seleccionada
        await page.getByTestId('ranking-sidepanel-card-45413').getByText('EARLY BIRD SPA').click();
        await expect(page.getByTestId('ranking-selection-chip-45413').getByText('EARLY BIRD SPA')).toBeVisible();

        await ranking.verFichaEB();
        await expect(page).toHaveURL(`${url}Ranking/detalleRanking/45413/456/77982298-2/EARLY%20BIRD%20SPA/MicroEmpresa`);
    });

});


