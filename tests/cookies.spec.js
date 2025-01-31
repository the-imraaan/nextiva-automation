import { test, expect } from '@playwright/test';
import Homepage from '../pages/homepage';
import Cookies from '../pages/cookies';
import International from '../pages/international';
import { URLS } from '../test_utils/urls';

const testdata = require("../test-data/testdata.json");

test.describe('Cookies validation', () => {
    let page;
    let homepage;
    let cookies;
    let international;
    let MicroSiteCookies

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homepage = new Homepage(page);
        cookies = new Cookies(page);
        international = new International(page);
    });

    test('Validate Cookies are honored to the microsite if user visit from nextiva.com', async () => {
        await homepage.gotoHomepage();
        await cookies.acceptCookies();
        const context = await page.context();
        await international.goto(URLS.homepage_ca)
        expect(await cookies.isCookieBannerNotVisible()).toBe(true);
        MicroSiteCookies = (await context.cookies()).map(cookie => cookie.domain);
        expect(MicroSiteCookies).toContain('.nextiva.com');

        await international.goto(URLS.homepage_es)
        expect(await cookies.isCookieBannerNotVisible()).toBe(true);
        MicroSiteCookies = (await context.cookies()).map(cookie => cookie.domain);
        expect(MicroSiteCookies).toContain('.nextiva.com');

        await international.goto(URLS.homepage_uk)
        expect(await cookies.isCookieBannerNotVisible()).toBe(true);
        MicroSiteCookies = (await context.cookies()).map(cookie => cookie.domain);
        expect(MicroSiteCookies).toContain('.nextiva.com');
    })

    test.afterAll(async () => {
        await page.close();
    });

})