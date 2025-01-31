import BasePage from "./basepage";
import { URLS } from "../test_utils/urls";
import {
    acceptCookies
} from "../page-object/cookies";

class Cookies extends BasePage{
    constructor(page){
        super(page)
    }
    
    async acceptCookies(){
        await this.waitAndClick(acceptCookies);
    }
    async isCookieBannerNotVisible(){
        return await this.isElementNotVisible(acceptCookies);
    }




}export default Cookies;