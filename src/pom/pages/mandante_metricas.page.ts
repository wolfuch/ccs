import { expect, type Locator, type Page } from '@playwright/test';
//to do


export class MandanteMetricasPage{
    private readonly page: Page;
    private readonly getStartedLink: Locator;


    constructor(page: Page) {
        this.page = page;
        this.getStartedLink = page.locator('a', { hasText: 'Get started' });
        
    }

}