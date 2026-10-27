import { expect, type Locator, type Page } from '@playwright/test';

export class NavBar_Mandante_BlackPage{
    private readonly page: Page;
    readonly buscaProveedores: Locator;
    readonly proveedores: Locator;
    readonly cartera: Locator;
    readonly metricas: Locator;
    readonly evaluacion: Locator;
    readonly evaluacionDesempeno: Locator;
    readonly evaluacionV2: Locator;
    readonly cargarDatosEvaluacion: Locator;
    readonly configuracionEscala: Locator;
    readonly configurarEvaluacion: Locator;
    readonly ranking: Locator;
    readonly rankingProveedores: Locator;
    readonly dashboard360: Locator


    constructor(page: Page) {
        this.page = page;
        this.buscaProveedores= page.getByRole('menuitem', { name: 'Buscar proveedores' }).locator('a');
        this.proveedores = page.locator('a').filter({ hasText: /^Proveedores$/ });
        this.cartera = page.getByRole('menuitem', { name: 'Mi Cartera' }).locator('a');
        this.metricas = page.getByRole('menuitem', { name: 'Métricas' }).locator('a');
        this.evaluacion = page.locator('a').filter({ hasText: /^Evaluación$/ });
        this.evaluacionV2 = page.locator('a').filter({ hasText: 'Evaluación v2' });
        this.evaluacionDesempeno = page.locator('a').filter({ hasText: 'Evaluación de desempeño' });
        this.cargarDatosEvaluacion = page.locator('a').filter({ hasText: 'Cargar datos evaluación' });
        this.configuracionEscala = page.locator('a').filter({ hasText: 'Configuración escala' });
        this.configurarEvaluacion = page.locator('a').filter({ hasText: 'Configurar evaluación' });
        this.ranking = page.locator('a').filter({ hasText: /^Ranking$/ });
        this.rankingProveedores = page.locator('a').filter({ hasText: 'Ranking proveedores' });
        this.dashboard360 = page.getByRole('button', { name: 'Dashboard 360 Visualiza mé' })

    }

    async goToBuscaProveedores(){
        await this.buscaProveedores.click();
    }

    async goToCartera(){
        await this.proveedores.click();
        await this.cartera.click();

    }

    async goToMetricas(){
        await this.proveedores.click();
        await this.metricas.click();

    }

    async goToEvaluacionDesempeno(){
        await this.evaluacion.click();
        await this.evaluacionDesempeno.click();
    }

    async goToCargarDatosEvaluacion(){
        await this.evaluacion.click();
        await this.cargarDatosEvaluacion.click();
    }

    async goToConfiguracionEscala(){
        await this.evaluacion.click();
        await this.configuracionEscala.click();
    }

    async goToConfigurarEvaluacion(){
        await this.evaluacion.click();
        await this.configurarEvaluacion.click();
    }

    async goToConfigurarEvaluacionV2(){
        await this.evaluacion.click();
        await this.evaluacionV2.click();
    }

    async goToRankingProveedores(){
        await this.ranking.click();
        await this.rankingProveedores.click();
    }

    async goToDashboard(){
        const page1 = await page1Promise;
        this.dashboard360.click();
    }


}
