import { URLS } from "../test_utils/urls";
import { test, expect } from '@playwright/test';
import TestimonialForm from "../forms/testimonial";
import RandomEmailGenerator from '../test_utils/RandomEmail';
import API from "../test_utils/api";

const testdata = require("../test-data/testdata.json");
const firstName = testdata.testUser.firstName;
const lastName = testdata.testUser.lastName;
const phone = testdata.testUser.phone;
const company = testdata.testUser.company;
const companySize = testdata.testUser.companySize;
const interestedProduct = testdata.testUser.interestedProduct;

test.describe('Testimonial Forms validation', () => {
    let page;
    let testimonialForm;
    const randomEmail = new RandomEmailGenerator();
    let api;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        testimonialForm = new TestimonialForm(page);
        api = new API();
    });

    test('Testimonial form submission', async ({ }) => {
        await testimonialForm.gotoFormPage(URLS.homepage);
        const email = randomEmail.generate();
        await testimonialForm.fillFormFields(firstName, lastName, email, phone, company, companySize, interestedProduct);
        await testimonialForm.submitForm();
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

