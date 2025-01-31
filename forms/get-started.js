// Description: This file contains everything to interact with the Get Started form on the Nextiva website.
class GetStartedForm {
    constructor(page) {
        this.page = page;
        this.firstNameInput = '.get-started-popup input[name="firstname"]';
        this.lastNameInput = '.get-started-popup input[name="lastname"]';
        this.emailAddressInput = '.get-started-popup input[name="email"]';
        this.phoneInput = '.get-started-popup input[name="phone"]';
        this.companyInput = '.get-started-popup input[name="company"]';
        this.companySizeSelect = '.get-started-popup input[name="company_size"]'
        this.interestedProductSelect = '.get-started-popup select[name="what_are_you_most_interested_in_"]';
        this.submitButton = '.get-started-popup input[type="submit"]';
        this.getStartedButton = "//a[normalize-space()='Get started']";
        this.getStartedFormTitle = "//h2[@id='h-get-started-with-nextiva']"
    }

    async gotoFormPage(url) {
        await this.page.goto(url);
    }

    async fillFormFields(firstName, lastName, emailAddress, phone, company, companySize, interestedProduct) {
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.emailAddressInput, emailAddress);
        await this.page.fill(this.phoneInput, phone);
        await this.page.fill(this.companyInput, company);
        await this.page.fill(this.companySizeSelect, companySize);
        await this.page.selectOption(this.interestedProductSelect, interestedProduct);
    }

    async submitForm() {
        await this.page.click(this.submitButton);
    }

    async clickOnGetStartedButton() {
        await this.page.click(this.getStartedButton);
    }

    async isGetStartedFormVisible() {
        await this.page.waitForSelector(this.getStartedFormTitle);
        return await this.page.isVisible(this.getStartedFormTitle);
    }

} 

export default GetStartedForm;