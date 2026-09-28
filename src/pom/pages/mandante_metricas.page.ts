import { expect, type Locator, type Page } from '@playwright/test';
//to do


export class MandanteMetricasPage{
    readonly page: Page;
    readonly getStartedLink: Locator;


    constructor(page: Page) {
        this.page = page;
        this.getStartedLink = page.locator('a', { hasText: 'Get started' });
        
    }

}