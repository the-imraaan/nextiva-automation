import BasePage from "./basepage";
import { URLS } from "../test_utils/urls";
import {
    firstName,
    lastName,
    emailAddress,
    phone,
    company,
    companySize,
    interestedProduct,
    productName,
    submit,
    banner,
    menu,
    getStartedButton,
    footer,
    support,
    sales
    
} from "../page-object/homepage";
class Homepage extends BasePage{
    constructor(page){
        super(page)
    }
    async gotoHomepage(){
        await this.open(URLS.homepage)
        await this.waitForPageLoad();
    }

    async fillFormData(first_name, last_name, email_addess, phone_number, company_name, company_size ){
        await this.waitAndFill(firstName , first_name);
        await this.waitAndFill(lastName, last_name);
        await this.waitAndFill(emailAddress, email_addess);
        await this.waitAndFill(phone, phone_number);
        await this.waitAndFill(company, company_name);
        await this.waitAndFill(companySize, company_size);
        await this.waitAndClick(interestedProduct);
        await this.waitAndClick(productName)
        await this.waitAndClick(submit);
    }

    async getPageURL(){
        return await this.getUrl();
    }

    async isBannerVisible(){
        await this.isElementVisible(banner);
    }

    async isMenuVisible(){
        await this.isElementVisible(menu); 
    }

    async isFooterVisible(){
        await this.isElementVisible(footer)
    }

    async clickedOnGetStarted(){
        await this.isElementClickable(getStartedButton);
    }

    async getAlllearnMoreLink(){
        const learnMoreButtons = await this.page.locator('a:has-text("Learn more")');
        const urls = await learnMoreButtons.evaluateAll(buttons => buttons.map(button => button.href));
        return urls.toString();
    }

    async getSalesNumber(){
       return await this.getInnerText(sales)
    }

    async getSupportNumber(){
        return await this.getInnerText(support)
     }


}export default Homepage;