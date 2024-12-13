import { test, expect } from '@playwright/test';
import Pricing from '../pages/pricing';
const testdata = require("../test-data/testdata.json");

test.describe('Test cases of the pricing table', () => {

    let page;
    let pricing;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        pricing = new Pricing(page);
    });

    test('Validate Enterprise pricing table has valid pricing unit', async () => {
        await pricing.gotoEnterprisePage()
        
        expect(await pricing.isFirstTabHasValidPricingUnit()).toBeTruthy();

        await pricing.clickedOnUsagesBased();
        expect(await pricing.isSecondtabHasValidPricingUnit()).toBeTruthy();

        await pricing.clickedOnConcurrent();
        expect(await pricing.isthirdtabHasValidPricingUnit()).toBeTruthy();

    })

    test('Validate currency dropdown on the enterprise table', async () => {
        await pricing.gotoEnterprisePage();
        expect(await pricing.getPriceFromTheFirstCart()).toContain(testdata.Currency.USD);

        await pricing.clickOnCurrencyDropdown();
        await pricing.selectCad();
        expect(await pricing.getPriceFromTheFirstCart()).toContain(testdata.Currency.CAD);

        await pricing.clickOnCurrencyDropdown();
        await pricing.selectEURO();
        expect(await pricing.getPriceFromTheFirstCart()).toContain(testdata.Currency.EUR);

        await pricing.clickOnCurrencyDropdown();
        await pricing.selectGBP();
        expect(await pricing.getPriceFromTheFirstCart()).toContain(testdata.Currency.GBP);
    })

    test('Validate SMB page pricing unit for both annual and monthly', async () => {
        await pricing.gotoSMBPage();
        expect(await pricing.getSMBPricingUnits()).toBe("/user/mo");

        await pricing.switchMonthly();
        expect(await pricing.isSavingVisible()).toBeFalsy();
    })
    
    test.afterAll(async () => {
        await page.close();
    });

})