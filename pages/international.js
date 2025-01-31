import BasePage from "./basepage";
import {
    firstName,
    lastName,
    emailAddress,
    phone,
    company,
    companySize,
    submit
} from "../page-object/homepage";
import {
    header_logo
} from "../page-object/international"

class International extends BasePage {
    constructor(page) {
        super(page)
    }

    async goto(url) {
        await this.open(url)
    }
    async getPageURL() {
        return await this.getUrl();
    }

    async isHeaderLogoVisible() {
        await this.isElementVisible(header_logo);
    }

    async getHeaderLogoLink() {
        return await this.getAttribute(header_logo, "href")

    }

    async fillFormData(first_name, last_name, email_addess, phone_number, company_name, company_size) {
        await this.waitAndFill(firstName, first_name);
        await this.waitAndFill(lastName, last_name);
        await this.waitAndFill(emailAddress, email_addess);
        await this.waitAndFill(phone, phone_number);
        await this.waitAndFill(company, company_name);
        await this.waitAndFill(companySize, company_size);
        await this.waitAndClick(submit);
    }
} export default International