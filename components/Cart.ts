import {Page, Locator} from '@playwright/test'

export class CartComponent {
    readonly icon: {Locator: Locator; selector: string};
    readonly badge: {Locator: Locator; selector: string};

    constructor(page: Page){
        const selector = {
            icon: '.shopping_cart_link',
            badge: '.shopping_cart_badge',
        }

        this.icon = {
            Locator: page.locator(selector.icon),
            selector: selector.icon
        }

        this.badge = {
            Locator: page.locator(selector.badge),
            selector: selector.badge,
        }
    }
}