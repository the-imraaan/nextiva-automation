import BasePage from "./basepage";
import{
    pricing_table,
    getStartedButton

} from "../page-object/legacyPage"

class LegacyPage extends BasePage{
    constructor(page){
        super(page)
    }

    async goto(url){
        await this.open(url)
    }

    async clickedOnGetStarted(){
            await this.isElementClickable(getStartedButton);
            await this.waitAndClick(getStartedButton)
        }

    async isPricingTableVisible(){
        return await this.isElementVisible(pricing_table);
    }

} export default LegacyPage