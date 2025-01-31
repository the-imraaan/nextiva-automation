const { request } = require('@playwright/test');

class API {
    constructor() {
        this.apiContext = null;
    }

    async init() {
        this.apiContext = await request.newContext({
            extraHTTPHeaders: {
                'Authorization': process.env.AUTH_HEADER,
                'Content-Type': 'application/json'
            }
        });
    }

    async getUserDetails(email) {
        if (!this.apiContext) {
            await this.init();
        }

        const url = `https://api.hubapi.com/contacts/v1/contact/email/${email}/profile`;
        const response = await this.apiContext.get(url);

        if (response.ok()) {
            const userData = await response.json();
            const filteredData = {
                firstname: userData.properties.firstname?.value,
                lastname: userData.properties.lastname?.value,
                email: userData.properties.email?.value,
                phone: userData.properties.phone?.value,
                company: userData.properties.company?.value,
                company_size: userData.properties.company_size?.value,
                what_are_you_most_interested_in: userData.properties.what_are_you_most_interested_in_?.value
            };

            return filteredData;
        } else {
            console.error(`Error: ${response.status()} - ${response.statusText()}`);
            return null;
        }
    }
}export default API;