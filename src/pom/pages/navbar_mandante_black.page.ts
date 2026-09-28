import { expect, type Locator, type Page } from '@playwright/test';
//Nota importante: Ranking se agregara más adelante. Se dejan los locator para descomentar en su momento.


export class NavBar_Mandante_BlackPage{
    readonly page: Page;
    readonly getStartedLink: Locator;
    readonly buscaProveedores: Locator;
    readonly proveedores: Locator;
    readonly cartera: Locator;
    readonly metricas: Locator;
    readonly evaluacion: Locator;
    readonly evaluacionDesempeno: Locator;
    readonly cargarDatosEvaluacion: Locator;
    readonly configuracionEscala: Locator;
    readonly configurarEvaluacion: Locator;
    // readonly ranking: Locator;
    // readonly rankingProveedores: Locator;


    constructor(page: Page) {
        this.page = page;
        this.getStartedLink = page.locator('a', { hasText: 'Get started' });
        this.buscaProveedores= page.getByRole('menuitem', { name: 'Buscar proveedores' }).locator('a');
        this.proveedores = page.locator('a').filter({ hasText: /^Proveedores$/ });
        this.cartera = page.getByRole('menuitem', { name: 'Mi Cartera' }).locator('a');
        this.metricas = page.getByRole('menuitem', { name: 'Métricas' }).locator('a');
        this.evaluacion = page.locator('a').filter({ hasText: /^Evaluación$/ });
        this.evaluacionDesempeno = page.locator('a').filter({ hasText: 'Evaluación de desempeño' });
        this.cargarDatosEvaluacion = page.locator('a').filter({ hasText: 'Cargar datos evaluación' });
        this.configuracionEscala = page.locator('a').filter({ hasText: 'Configuración escala' });
        this.configurarEvaluacion = page.locator('a').filter({ hasText: 'Configurar evaluación' });
        // this.ranking = page.locator('a').filter({ hasText: /^Ranking$/ });
        // this.rankingProveedores = page.locator('a').filter({ hasText: 'Ranking proveedores' });

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

    //Se agregará más adelante
    // async goToRankingProveedores(){
    //     await this.ranking.click();
    //     await this.rankingProveedores.click();
    // }

}
