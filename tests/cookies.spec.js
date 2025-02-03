import { test, expect } from '@playwright/test';
import Homepage from '../pages/homepage';
import Cookies from '../pages/cookies';
import International from '../pages/international';
import { URLS } from '../test_utils/urls';

test.describe('Cookies validation', () => {
    let page;
    let homepage;
    let cookies;
    let international;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homepage = new Homepage(page);
        international = new International(page);
        cookies = new Cookies(page);
    });

    test('Validate broken cookies are not set on the microsite', async () => {
        const context = page.context();
        let MicroSiteCookies = [];
        await context.clearCookies();
        MicroSiteCookies = (await context.cookies()).map(cookie => cookie.domain);
        console.log(MicroSiteCookies);
        await international.goto(URLS.homepage_ca)
         MicroSiteCookies = (await context.cookies()).map(cookie => cookie.domain);
        console.log(MicroSiteCookies);
        await cookies.rejectCookies();
        await page.waitForLoadState('domcontentloaded')
        await page.reload();
        await page.waitForLoadState('domcontentloaded')
         MicroSiteCookies = (await context.cookies()).map(cookie => cookie.domain);
        console.log(MicroSiteCookies);

        /* const receivedArray = ['aa.com', ' BB.com', 'CC.com ']; // Example input
        const allowedValues = ['aa.com', ' BB.com']; // Allowed values
        const unexpectedValues = receivedArray.filter(value => !allowedValues.includes(value));
        expect(unexpectedValues).toEqual([]); */
    })

    test('Validate Cookies are honored to the microsite if user visit from nextiva.com', async () => {
        const context = page.context();
        await homepage.gotoHomepage();
        await cookies.acceptCookies();
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