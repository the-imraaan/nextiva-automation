// Description: This file contains everything to interact with the Testimonial bottom form on the Nextiva website.
class TestimonialForm {
    
    constructor(page) {

        this.page = page;
        this.firstNameInput = 'input[name="firstname"]';
        this.lastNameInput = 'input[name="lastname"]';
        this.emailAddressInput = 'input[name="email"]';
        this.phoneInput = 'input[name="phone"]';
        this.companyInput = 'input[name="company"]';
        this.companySizeSelect = 'input[name="company_size"]'
        this.interestedProductSelect = 'select[name="what_are_you_most_interested_in_"]';
        this.submitButton = '//input[@value="Book my personalized demo"]';
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
} 

export default TestimonialForm;