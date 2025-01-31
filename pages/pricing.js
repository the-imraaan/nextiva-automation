import BasePage from "./basepage";
import { URLS } from "../test_utils/urls";
import {
    ent_concurrent_pricing_units,
    ent_monthly_pricing_units,
    ent_user_based_pricing_units,
    ent_concurrent_tab,
    ent_user_based_tab,
    currency_dropdown,
    select_cad,
    select_eur,
    select_gbp,
    get_price_first_Cart,
    smb_pricing_unit,
    smb_annual_discount,
    smb_annual_toggle,
    legacy_pricing_table

} from '../page-object/pricing'

class Pricing extends BasePage {
    constructor(page) {
        super(page)
    }
    async gotoToPage(url) {
        await this.open(url)
        await this.waitForPageLoad();
    }
    async gotoEnterprisePage() {
        await this.open(URLS.homepage + URLS.ent_pricing);
        await this.waitForPageLoad();
    }
    async gotoSMBPage() {
        await this.open(URLS.homepage + URLS.smb_pricing);
        await this.waitForPageLoad();
    }
    async clickedOnUsagesBased() {
        await this.waitAndClick(ent_user_based_tab);
    }
    async clickedOnConcurrent() {
        await this.waitAndClick(ent_concurrent_tab);
    }

    async isFirstTabHasValidPricingUnit() {
        const elements = await this.page.$$(ent_monthly_pricing_units);
        return elements.length === 3;
    }

    async isSecondtabHasValidPricingUnit() {
        const elements = await this.page.$$(ent_user_based_pricing_units);
        return elements.length === 3;
    }

    async isthirdtabHasValidPricingUnit() {
        const elements = await this.page.$$(ent_concurrent_pricing_units);
        return elements.length === 3;
    }

    async clickOnCurrencyDropdown() {
        await this.waitAndClick(currency_dropdown)
    }

    async selectCad() {
        await this.waitAndClick(select_cad)
    }

    async selectEURO() {
        await this.waitAndClick(select_eur)
    }

    async selectGBP() {
        await this.waitAndClick(select_gbp)
    }

    async getPriceFromTheFirstCart() {
        const text = await this.page.locator(get_price_first_Cart).first().innerText();
        return text;
    }

    async getSMBPricingUnits() {
        const text = await this.page.locator(smb_pricing_unit).first().innerText();
        return text;
    }
    async isSavingVisible() {
        return await this.page.locator(smb_annual_discount).first().isVisible();
    }

    async switchMonthly() {
        await this.waitAndClick(smb_annual_toggle)
    }

    async getScreenShot() {
        return await this.returnScreenShot(legacy_pricing_table);
    }

} export default Pricing;