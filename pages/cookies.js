import BasePage from "./basepage";
import {
    acceptCookies,
    rejectCookies
} from "../page-object/cookies";

class Cookies extends BasePage {
    constructor(page) {
        super(page)
    }

    async acceptCookies() {
        await this.waitAndClick(acceptCookies);
    }
    async isCookieBannerNotVisible() {
        return await this.isElementNotVisible(acceptCookies);
    }
    async rejectCookies() {
        await this.waitAndClick(rejectCookies);
    }
}
export default Cookies;