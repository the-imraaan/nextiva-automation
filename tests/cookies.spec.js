import { test, expect } from '@playwright/test';
import Cookies from '../pages/cookies';
import Homepage from '../pages/homepage';
import International from '../pages/international';
import { URLS } from '../test_utils/urls';

const allowedValues = ['.nextiva.com', 'www.nextiva.com', '.adnxs.com', '.www.nextiva.com'];

test.describe('Cookies validation', () => {
    let page;
    let homepage;
    let cookies;
    let international;
    let microSiteCookies = [];

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test('Validate that cookies are honored on the microsite if the user visits from nextiva.com', async () => {
        homepage = new Homepage(page);
        international = new International(page);
        cookies = new Cookies(page);
        const context = page.context();
        await homepage.gotoHomepage();
        await cookies.acceptCookies();

        await international.goto(URLS.homepage_ca)
        expect(await cookies.isCookieBannerNotVisible()).toBe(true, 'Cookie banner should not be visible on the microsite');
        microSiteCookies = (await context.cookies()).map(cookie => cookie.domain);
        expect(microSiteCookies, 'Expected .nextiva.com cookie on homepage_ca').toContain('.nextiva.com');

        await international.goto(URLS.homepage_es)
        expect(await cookies.isCookieBannerNotVisible()).toBe(true, 'Cookie banner should not be visible on the microsite');
        microSiteCookies = (await context.cookies()).map(cookie => cookie.domain);
        expect(microSiteCookies, 'Expected .nextiva.com cookie on homepage_es').toContain('.nextiva.com');

        await international.goto(URLS.homepage_uk)
        expect(await cookies.isCookieBannerNotVisible()).toBe(true);
        expect(microSiteCookies, 'Expected .nextiva.com cookie on homepage_uk').toContain('.nextiva.com');
    })

    test('Validate that broken cookies are not set on the microsite', async () => {
        cookies = new Cookies(page);
        const context = page.context();
        await context.clearCookies();
        await context.storageState({ path: 'state.json' });
        await page.goto(URLS.homepage_ca)
        await cookies.rejectCookies();
        await page.waitForLoadState('domcontentloaded')
        await page.reload();
        await page.waitForLoadState('domcontentloaded')
        microSiteCookies = (await context.cookies()).map(cookie => cookie.domain);

	    const unexpectedValues = microSiteCookies.filter(value => !allowedValues.includes(value));
        expect(unexpectedValues, 'Unexpected cookies found on the microsite').toEqual([]);
    })

    test.afterAll(async () => {
        await page.close();
    });

})