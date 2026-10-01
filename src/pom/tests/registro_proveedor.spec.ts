import { test, expect } from '@playwright/test';
import { LoginPage } from './../pages/login.page';
import { NavBar_Mandante_BlackPage } from './../pages/navbar_mandante_black.page';
import { RegistroPage } from './../pages/registro.page';
import { MiCarteraPage } from './../pages/mi_cartera.page';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve('.env_playwright') });
const user = process.env.USER_NAME;
const pass = process.env.USER_PASS;

test.describe('Evaluación de Desempeño', () => {

    test.beforeEach(async ({ page }) => {
        //Login con contraseña correcta, previo a cada test de esta suite
        const loginPage = new LoginPage(page);
        const navBar = new NavBar_Mandante_BlackPage(page)

        await page.goto(process.env.BASE_URL);
        await loginPage.submitLogin(user, pass);
        await page.waitForLoadState();
        await expect(page).toHaveURL("https://devmandante.rednegocios.cl/dashboard");
        await navBar.goToCartera()
        await expect(page).toHaveURL("https://devregistrocodelco.rednegocios.cl/MisProveedores");
    });


    test('Crear Nuevo Proveedor Parte 1', { tag: ['@proveedores'] }, async ({ page }) => {
        //Este test corre hasta habilitar el botón "Siguiente". Completa los datos y valida que el botón
        //es clickleable
        const cartera = new MiCarteraPage(page);
        await cartera.crearProveedor();
        await expect(page).toHaveURL("https://devregistrocodelco.rednegocios.cl/registro");
        const registro = new RegistroPage(page);
        await registro.creaLicitacion();
        await registro.seleccionarProposito("Compras Spot / Spot Purchases");
        await registro.seleccionarOrganizacion("P001: Materiales VAB - Vicepresidencia Abastecimiento");
        await registro.seleccionPago("Transferencia");
        await expect(registro.botonSiguiente).toBeEnabled();

    });

        test('Valida Elementos Licitación', { tag: ['@smoke', '@proveedor', '@licitacion'] }, async ({ page }) => {
            //Test valida que las opciones en licitaciones estén desplegadas correctamente
            const cartera = new MiCarteraPage(page);
            await cartera.crearProveedor();
            await expect(page).toHaveURL("https://devregistrocodelco.rednegocios.cl/registro");
            const registro = new RegistroPage(page);
            await registro.creaLicitacion();
            await registro.validaCamposLicitacion();    
            
        });
    
        test('Valida Elementos Misceláneos', { tag: ['@smoke', '@proveedor', '@micelaneo'] }, async ({ page }) => {
            //Test valida que las opciones en miceláneos estén desplegadas correctamente
            const cartera = new MiCarteraPage(page);
            await cartera.crearProveedor();
            await expect(page).toHaveURL("https://devregistrocodelco.rednegocios.cl/registro");
            const registro = new RegistroPage(page);
            await registro.creaMiscelaneo();
            await registro.validaCamposMiscelaneo();

        });
    


});