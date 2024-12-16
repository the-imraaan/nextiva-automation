import { test, expect } from '@playwright/test';
import { URLS } from '../test_utils/urls';
import RandomEmailGenerator from '../test_utils/RandomEmail';
const testdata = require("../test-data/testdata.json");
import International from '../pages/international';

test.describe('Validating international sites', () => {
    let international;
    let page;
    const randomEmail = new RandomEmailGenerator();

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        international = new International(page);

    });

    test('Validate buttom form CA site', async() => {
        await international.goto(URLS.homepage_ca)
        await international.fillFormData(testdata.testUser.firstName,
            testdata.testUser.lastName,
            randomEmail.generate(),
            testdata.testUser.phone,
            testdata.testUser.company,
            testdata.testUser.companySize
        )
        expect(await international.getPageURL()).toBe(URLS.homepage + URLS.thank_you);

    });

    test('Validate buttom form ES site', async() => {
        await international.goto(URLS.homepage_es)
        await international.fillFormData(testdata.testUser.firstName,
            testdata.testUser.lastName,
            randomEmail.generate(),
            testdata.testUser.phone,
            testdata.testUser.company,
            testdata.testUser.companySize
        )
        expect(await international.getPageURL()).toBe(URLS.homepage + URLS.thank_you);

    });

    test('Validate buttom form UK site', async() => {
        await international.goto(URLS.homepage_uk)
        await international.fillFormData(testdata.testUser.firstName,
            testdata.testUser.lastName,
            randomEmail.generate(),
            testdata.testUser.phone,
            testdata.testUser.company,
            testdata.testUser.companySize
        )
        expect(await international.getPageURL()).toBe(URLS.homepage + URLS.thank_you);
    });

    test('Validate header is visible on all site', async() => {
        await international.goto(URLS.homepage_ca)
        await international.isHeaderLogoVisible()
        expect(await international.getHeaderLogoLink()).toBe(URLS.homepage_ca)

    });

})