import { test, expect } from '@playwright/test';
import Homepage from '../pages/homepage';
import { URLS } from '../test_utils/urls';
import RandomEmailGenerator from '../test_utils/RandomEmail';
const testdata = require("../test-data/testdata.json");

test.describe('Test Cases of the Homepage', () => {
    let page;
    let homepage;
    const randomEmail = new RandomEmailGenerator();

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homepage = new Homepage(page);

    });

    test('Test bottom form', async () => {
        await homepage.gotoHomepage();
        await homepage.fillFormData(testdata.testUser.firstName,
            testdata.testUser.lastName,
            randomEmail.generate(),
            testdata.testUser.phone,
            testdata.testUser.company,
            testdata.testUser.companySize
        )
        expect(await homepage.getPageURL()).toBe(URLS.homepage + URLS.thank_you);
    });

    test('Test Banner is visible', async () => {
        await homepage.gotoHomepage();
        await homepage.isBannerVisible();

    })

    test('Test Mega Menu is visible', async () => {
        await homepage.gotoHomepage();
        await homepage.isMenuVisible();
    })

    test('Test Get started form is visible and working', async () => {
        await homepage.gotoHomepage();
        await homepage.clickedOnGetStarted();
        await homepage.fillFormData(testdata.testUser.firstName,
            testdata.testUser.lastName,
            randomEmail.generate(),
            testdata.testUser.phone,
            testdata.testUser.company,
            testdata.testUser.companySize
        )
        expect(await homepage.getPageURL()).toBe(URLS.homepage + URLS.thank_you);
    })

    test('Validate all of the learn more button has valid CTA link', async () => {
        await homepage.gotoHomepage();
        expect(await homepage.getAlllearnMoreLink()).toBe(testdata.LearMoreCTALinks.toString());

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