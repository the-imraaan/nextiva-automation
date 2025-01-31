import { test, expect } from '@playwright/test';
import Homepage from '../pages/homepage';
const testdata = require("../test-data/testdata.json");

test.describe('Test Cases of the Homepage', () => {
    let page;
    let homepage;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homepage = new Homepage(page);

    });

    test('Test Banner is visible', async () => {
        await homepage.gotoHomepage();
        await homepage.isBannerVisible();

    })

    test('Test Mega Menu is visible', async () => {
        await homepage.gotoHomepage();
        await homepage.isMenuVisible();
    })

    test('Validate all of the learn more button has valid CTA link', async () => {
        await homepage.gotoHomepage();
        expect(await homepage.getAlllearnMoreLink()).toContain(testdata.LearMoreCTALinks.toString());
    })

    test('Validate footer', async () => {
        await homepage.gotoHomepage();
        await homepage.isFooterVisible();
    })

    test('Validated correct number for sales and support', async () => {
        await homepage.gotoHomepage();
        expect(await homepage.getSalesNumber()).toBe(testdata.sales.toString());
        expect(await homepage.getSupportNumber()).toBe(testdata.support.toString());

    })

    test.afterAll(async () => {
        await page.close();
    });

})
