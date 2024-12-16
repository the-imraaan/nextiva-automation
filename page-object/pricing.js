export const ent_monthly_pricing_units = "//span[@class='text-12 text-light' and contains(text(), '/agent/mo')]"
export const ent_user_based_pricing_units = "//span[@class='text-12 text-light' and contains(text(), '/agent/min')]"
export const ent_concurrent_pricing_units = "//span[@class='text-12 text-light' and contains(text(), 'concurrent')]"
export const ent_user_based_tab = "//div[@class='tabs']//p[@class='tab__text text-16' and text()='Usage-based pricing']"
export const ent_concurrent_tab = "//div[@class='tabs']//p[@class='tab__text text-16' and text()='Concurrent pricing']"
export const select_eur = '//div[@class="currency-dropdown__items active"]/div[@class="currency-dropdown__item" and @data-currency="EUR"]'
export const select_cad = '//div[@class="currency-dropdown__items active"]/div[@class="currency-dropdown__item" and @data-currency="CAD"]'
export const select_gbp = '//div[@class="currency-dropdown__items active"]/div[@class="currency-dropdown__item" and @data-currency="GBP"]'
export const currency_dropdown = '//div[@class="currency-dropdown"]'
export const get_price_first_Cart = '//div[@class="enterprise-card__pricing-cta__price selected" and @data-tab-id="user-mo"]'
export const smb_pricing_unit = "//span[@class='font-size-0x' and text()='/user/mo']"
export const smb_annual_discount = "//span[@class='pricing__discount-value font-size-0x']"
export const smb_annual_toggle = "//div[@class='pricing__payment-toggle']"