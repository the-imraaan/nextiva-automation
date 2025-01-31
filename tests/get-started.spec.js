import { URLS } from "../test_utils/urls";
import { test, expect } from '@playwright/test';
import GetStartedForm from "../forms/get-started";
import RandomEmailGenerator from '../test_utils/RandomEmail';
import API from "../test_utils/api";

const testdata = require("../test-data/testdata.json");
const firstName = testdata.testUser.firstName;
const lastName = testdata.testUser.lastName;
const phone = testdata.testUser.phone;
const company = testdata.testUser.company;
const companySize = testdata.testUser.companySize;
const interestedProduct = testdata.testUser.interestedProduct;

test.describe('Forms validation', () => {
    let page;
    let getStartedForm;
    const randomEmail = new RandomEmailGenerator();
    let api;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        getStartedForm = new GetStartedForm(page);
        api = new API();
    });

    test('Testimonial form submission', async ({ }) => {
        await getStartedForm.gotoFormPage('http://staging-wpvip.nextiva.xyz/hubspot-form-demo?force-login-bypass');
        await getStartedForm.clickOnGetStartedButton();
        await getStartedForm.isGetStartedFormVisible();
        
        const email = randomEmail.generate();
        await getStartedForm.fillFormFields(firstName, lastName, email, phone, company, companySize, interestedProduct);
        await getStartedForm.submitForm();
        await page.waitForNavigation();
        expect(page.url()).toContain(URLS.thank_you);

        const userDetails = await api.getUserDetails(email);
        expect.soft(userDetails.firstname).toBe(firstName);
        expect.soft(userDetails.lastname).toBe(lastName);
        expect.soft(userDetails.email).toBe(email);
        expect.soft(userDetails.phone).toBe(phone);
        expect.soft(userDetails.company).toBe(company);
        expect.soft(userDetails.company_size).toBe(companySize);
        expect.soft(userDetails.what_are_you_most_interested_in).toBe(interestedProduct);
        expect(test.info().errors).toHaveLength(0);
    });

    test.afterAll(async () => {
        await page.close();
    });
});

