/* import { test, expect } from '@playwright/test';
const testdata = require("../test-data/testdata.json");
import { URLS } from "../test_utils/urls";
import Pricing from '../pages/pricing';

test.describe('Checking some important pages by taking screenshot and comparing to the pretake Screenshot', () =>{
    let page;
    let pricing;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        pricing = new Pricing(page)
    });

    test('validate x20/dir-01 page pricing table is not broken', async () => {
        await pricing.gotoToPage(URLS.homepage + URLS.dir_01);
        expect(await pricing.getScreenShot()).toMatchSnapshot('dir_01.png', {
        maxDiffPixelRatio: 0.2
    });
    });

    test('validate e page pricing table is not broken', async () => {
        await pricing.gotoToPage(URLS.homepage + URLS.ellens);
        expect(await pricing.getScreenShot()).toMatchSnapshot('ellens.png', {
            maxDiffPixelRatio: 0.2
    });
    });
})**/