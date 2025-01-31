import { expect } from '@playwright/test'

class BasePage {
	constructor(page) {
		this.page = page
	}

	async open(url) {
		return await this.page.goto(url)
	}

	async getTitle() {
		return await this.page.title()
	}

	async getInnerText(selector) {
		return await this.page.locator(selector).innerText();
	}

	async getUrl() {
		return this.page.url()
	}

	async wait() {
		return this.page.waitForTimeout(10000)
	}

	async waitForPageLoad() {
		return await this.page.waitForLoadState('domcontentloaded')
	}

	async waitAndClick(selector) {
		await this.page.waitForSelector(selector);
		return await this.page.click(selector)
	}
	async waitAndDoubleClick(selector) {
		await this.page.waitForSelector(selector);
		return await this.page.dblclick(selector);
	}

	async waitAndHardClick(selector) {
		await this.page.waitForSelector(selector);
		return await this.page.$eval(selector, element => element.click({ force: true }))
	}

	async waitAndFill(selector, text) {
		await this.page.waitForSelector(selector);
		return await this.page.fill(selector, text)
	}

	async keyPress(key) {
		await this.page.keyboard.press(key);
	}

	async returnScreenShot(selector) {
		await this.page.waitForSelector(selector);
		await this.page.locator(selector).scrollIntoViewIfNeeded();
		return await this.page.locator(selector).screenshot();
	}

	async getLastElementFromTheList(selector) {
		await this.page.waitForSelector(selector);
		const rows = await this.page.locator(selector)
		const count = await rows.count()
		for (let i = 0; i < count; ++i) {
			const lastItem = await rows.nth(5).textContent()
			return lastItem
		}
	}

	async clickAllLinksInNewTabs(selector) {
		await this.page.waitForSelector(selector);
		const rows = this.page.locator(selector)
		const count = rows.count()
		for (i in range(count)) {
			await rows.nth(i).click((modifiers = ['Control', 'Shift']))
		}
	}

	async isElementClickable(selector) {
		await this.page.waitForSelector(selector);
		const element = await this.page.locator(selector);
		const isClickable = await element.isEnabled();
		expect(isClickable).toBeTruthy();
	}

	async isElementVisible(selector, errorMessage) {
		await this.page.waitForSelector(selector);
		const element = this.page.locator(selector)
		try {
			const isVisible = await element.isVisible()
			expect(isVisible).toBeTruthy()
		} catch (error) {
			throw new Error(`${errorMessage}`)
		}
	}

	async isElementNotVisible(selector) {
		try {
			await this.page.waitForSelector(selector, { state: 'hidden', timeout: 5000 });
			return true;
		} catch (error) {
			return false;
		}
	}

	async getAttribute(selector, attributeName) {
		await this.page.waitForSelector(selector);
		return await this.page.locator(selector).getAttribute(attributeName);
	}


	async isElementChecked(selector, errorMessage) {
		await this.page.waitForSelector(selector);
		const element = this.page.locator(selector)
		try {
			const isChecked = await element.isChecked()
			expect(isChecked).toBeTruthy()
		} catch (error) {
			throw new Error(`${errorMessage}`)
		}
	}
}
export default BasePage