import { test, expect } from '@playwright/test';
const testdata = require("../test-data/testdata.json");
import { URLS } from "../test_utils/urls";
import Homepage from '../pages/homepage';
import LegacyPage from '../pages/legacyPage';
import RandomEmailGenerator from '../test_utils/RandomEmail';

test.describe('Checking some important pages by taking screenshot and comparing to the pretake Screenshot', () => {
    let page;
    let legacyPage;
    let homepage;
    const randomEmail = new RandomEmailGenerator();
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        legacyPage = new LegacyPage(page)
        homepage = new Homepage(page);

    });

    test('validate x20/dir-01 page working as expected', async () => {

        await legacyPage.goto(URLS.homepage + URLS.dir_01)
        expect(await legacyPage.isPricingTableVisible).toBeTruthy();

    });

    test('validate ellens page working as expected', async () => {
        await legacyPage.goto(URLS.homepage + URLS.ellens)
        expect(await legacyPage.isPricingTableVisible).toBeTruthy();
    });

    test('validate cloud_pbx page working as expected', async () => {
        await legacyPage.goto(URLS.homepage + URLS.cloud_pbx)
        expect(await legacyPage.isPricingTableVisible).toBeTruthy();
    });

    /*test('validate get started form working on legacy page', async () => {
        await legacyPage.goto(URLS.homepage + URLS.cloud_pbx)
        await legacyPage.clickedOnGetStarted();
        await homepage.fillFormData(testdata.testUser.firstName,
            testdata.testUser.lastName,
            randomEmail.generate(),
            testdata.testUser.phone,
            testdata.testUser.company,
            testdata.testUser.companySize
        )
        expect(await homepage.getPageURL()).toBe(URLS.homepage + URLS.thank_you);

    });the page is rebuild to wp*/

    test.afterAll(async () => {
        await page.close();
    });
})
