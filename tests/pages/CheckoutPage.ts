import {Page, Locator} from '@playwright/test'
import {BasePage} from './BasePage'
import { CartComponent } from '../../components/Cart'

export class CheckoutPage extends BasePage{
    
    readonly URL: string
    readonly checkOutURLs: {
        information: string,
        overview: string,
        complete: string
    }

    readonly titleCart: {Locator: Locator, selector: string}

    readonly cart: {
        list: {Locator: Locator, selector: string},
        columnQty: {Locator: Locator, selector: string},
        columnDsc: {Locator: Locator, selector: string},
        card: {
            item: {Locator: Locator, selector: string},
            qty: {Locator: Locator, selector: string},
            itemName: {Locator: Locator, selector: string},
            itemDesc: {Locator: Locator, selector: string},
            itemPrice: {Locator: Locator, selector: string},
            removeBtn: {Locator: Locator, selector: string}
        }
    }

    readonly cartActions: {
    continueBtn: {Locator: Locator, selector: string},
    checkoutBtn: {Locator: Locator, selector: string}
    }

    // readonly shoppingCart: {
    //     icon: {Locator: Locator, selector: string},
    //     badge: {Locator: Locator, selector: string}
    // }

    readonly shoppingCart: CartComponent;

    readonly checkOut: {
        Fields: {
            firstName: {Locator: Locator, selector: string},
            lastName: {Locator: Locator, selector: string},
            postalCode: {Locator: Locator, selector: string},
        },
        Button: {
            continue: {Locator: Locator, selector: string},
            cancel: {Locator: Locator, selector: string},
            finish: {Locator: Locator, selector: string},
            backHome: {Locator: Locator, selector: string},
        },
        Error: {
            Icon: {
            firstName: {Locator: Locator, selector: string},
            lastName: {Locator: Locator, selector: string},
            postalCode: {Locator: Locator, selector: string},
            },
            Message: {
                banner: {Locator: Locator, selector: string},
                closeBtn: {Locator: Locator, selector: string},
                firstName: string,
                lastName: string,
                postalCode: string,
            }
        }
    }
    
    readonly summary: {
        paymentInfo: {
            label: {Locator: Locator, selector: string},
            value: {Locator: Locator, selector: string},
        },
        shippingInfo: {
            label: {Locator: Locator, selector: string},
            value: {Locator: Locator, selector: string},
        },
        priceTotal: {
            label: {Locator: Locator, selector: string},
            itemTotal: {Locator: Locator, selector: string},
            taxValue: {Locator: Locator, selector: string},
            totalValue: {Locator: Locator, selector: string},
        },
        cartList: {
            list: {Locator: Locator, selector: string},
            qtyLabel: {Locator: Locator, selector: string},
            dscLabel: {Locator: Locator, selector: string},
            cartItem: {Locator: Locator, selector: string},
            cartQty: {Locator: Locator, selector: string},
            cartItemTitle: {Locator: Locator, selector: string},
            cartItemDsc: {Locator: Locator, selector: string},
            cartItemPrice: {Locator: Locator, selector: string},
        }
    }

    readonly checkoutComplete: {
        title: {Locator: Locator, selector: string},
        completeIcon: {Locator: Locator, selector: string},
        header: {
            element: {Locator: Locator, selector: string},
            text: string,
        }
        orderText: {
            element: {Locator: Locator, selector: string},
            text: string
        }
    }


    constructor(page:Page) {
        super(page)
        
        this.URL = `${process.env.BASE_URL || 'https://www.saucedemo.com/'}${process.env.CART_URL || 'cart.html'}`

        this.checkOutURLs = {
            information: `${process.env.base_URL || 'https://www.saucedemo.com/'}${process.env.CHECKOUT_URL1 || 'checkout-step-one.html'}`,
            overview: `${process.env.base_URL || 'https://www.saucedemo.com/'}${process.env.CHECKOUT_URL2 || 'checkout-step-two.html'}`,
            complete: `${process.env.base_URL || 'https://www.saucedemo.com/'}${process.env.CHECKOUT_URL3 || 'checkout-complete.html'}`
        }

        const cartSelector = {
            list: '.cart_list',
            columnQty: '.cart_quantity_label',
            columnDsc: '.cart_desc_label',
            card: {
                item: '.cart_item',
                qty: '.cart_quantity',
                itemName: '.inventory_item_name',
                itemDesc: '.inventory_item_desc',
                itemPrice: '.inventory_item_price',
                removeBtn: 'button[name="Remove"]'
            }
        }

        this.cart = {
            list: {Locator: page.locator(cartSelector.list), selector: cartSelector.list},
            columnQty: {Locator: page.locator(cartSelector.columnQty), selector: cartSelector.columnQty},
            columnDsc: {Locator: page.locator(cartSelector.columnDsc), selector: cartSelector.columnDsc},
            card: {
                item: {Locator: page.locator(cartSelector.card.item), selector: cartSelector.card.item},
                qty: {Locator: page.locator(cartSelector.card.qty), selector: cartSelector.card.qty},
                itemName: {Locator: page.locator(cartSelector.card.itemName), selector: cartSelector.card.itemName},
                itemDesc: {Locator: page.locator(cartSelector.card.itemDesc), selector: cartSelector.card.itemDesc},
                itemPrice: {Locator: page.locator(cartSelector.card.itemPrice), selector: cartSelector.card.itemPrice},
                removeBtn: {Locator: page.getByRole('button', {name: 'Remove', exact: true}), selector: cartSelector.card.removeBtn},
            }
        }

        const cartActionsSelector = {
            continueBtn: 'button[name="continue-shopping"]',
            checkoutBtn: 'button[name="checkout"]'
        }

        this.cartActions = {
            continueBtn: {Locator: page.locator(cartActionsSelector.continueBtn), selector: cartActionsSelector.continueBtn},
            checkoutBtn: {Locator: page.locator(cartActionsSelector.checkoutBtn), selector: cartActionsSelector.checkoutBtn},
        }

        this.shoppingCart = new CartComponent(page);

        const checkOutSelector = {
            Fields: {
                firstName: 'input#first-name',
                lastName: 'input#last-name',
                postalCode: 'input#postal-code',
            },
            Button: {
                continue: 'input#continue',
                cancel: 'button#cancel',
                finish: 'button#finish',
                backHome: 'button#back-to-products'
            },
            Error: {
                Icon: {
                    firstName: 'input#first-name + svg.error_icon',
                    lastName: 'input#last-name + svg.error_icon',
                    postalCode: 'input#postal-code + svg.error_icon',
                },
                Message: {
                    banner: 'div.error-message-container',
                    closeBtn: 'button.error-button',
                    firstName: 'Error: First Name is required',
                    lastName: 'Error: Last Name is required',
                    postalCode: 'Error: Postal Code is required',
                }
            }
        }

        this.checkOut = {
            Fields: {
                firstName: {Locator: page.locator(checkOutSelector.Fields.firstName), selector: checkOutSelector.Fields.firstName},
                lastName: {Locator: page.locator(checkOutSelector.Fields.lastName), selector: checkOutSelector.Fields.lastName},
                postalCode: {Locator: page.locator(checkOutSelector.Fields.postalCode), selector: checkOutSelector.Fields.postalCode},
            },
            Button: {
                continue: {Locator: page.locator(checkOutSelector.Button.continue), selector: checkOutSelector.Button.continue},
                cancel: {Locator: page.locator(checkOutSelector.Button.cancel), selector: checkOutSelector.Button.cancel},
                finish: {Locator: page.locator(checkOutSelector.Button.finish), selector: checkOutSelector.Button.finish},
                backHome: {Locator: page.locator(checkOutSelector.Button.backHome), selector: checkOutSelector.Button.backHome},
            },
            Error: {
                Icon: {
                    firstName: {Locator: page.locator(checkOutSelector.Error.Icon.firstName), selector: checkOutSelector.Error.Icon.firstName},
                    lastName: {Locator: page.locator(checkOutSelector.Error.Icon.lastName), selector: checkOutSelector.Error.Icon.lastName},
                    postalCode: {Locator: page.locator(checkOutSelector.Error.Icon.postalCode), selector: checkOutSelector.Error.Icon.postalCode},
                },
                Message: {
                    banner: {Locator: page.locator(checkOutSelector.Error.Message.banner), selector: checkOutSelector.Error.Message.banner},
                    closeBtn: {Locator: page.locator(checkOutSelector.Error.Message.closeBtn), selector: checkOutSelector.Error.Message.closeBtn},
                    firstName: checkOutSelector.Error.Message.firstName,
                    lastName: checkOutSelector.Error.Message.lastName,
                    postalCode: checkOutSelector.Error.Message.postalCode
                }
                
            }
        }

        const summarySelector = {
            paymentInfo: {
                label: 'div[data-test="payment-info-label"]',
                value: 'div[data-test="payment-info-value"]',
            },
            shippingInfo: {
                label: 'div[data-test="shipping-info-label"]',
                value: 'div[data-test="shipping-info-value"]',
            },
            priceTotal: {
                label: 'div[data-test="total-info-label"]',
                subTotal: 'div[data-test="subtotal-label"]',
                taxValue: 'div[data-test="tax-label"]',
                totalValue: 'div[data-test="total-label"]',
            },
            cartList: {
                list: 'div.cart_list',
                qtyLabel: 'div.cart_quantity_label',
                dscLabel: 'div.cart_desc_label',
                cartItem: 'div.cart_item',
                cartQty: 'div.cart_quantity',
                cartItemTitle: 'div.inventory_item_name',
                cartItemDsc: 'div.inventory_item_desc',
                cartItemPrice: 'div.inventory_item_price',
            }
        }

        this.summary = {
            paymentInfo: {
                label: {Locator: page.locator(summarySelector.paymentInfo.label), selector: summarySelector.paymentInfo.label},
                value: {Locator: page.locator(summarySelector.paymentInfo.value), selector: summarySelector.paymentInfo.value}, 
            },
            shippingInfo: {
                label: {Locator: page.locator(summarySelector.shippingInfo.label), selector: summarySelector.shippingInfo.label},
                value: {Locator: page.locator(summarySelector.shippingInfo.value), selector: summarySelector.shippingInfo.value},
            },
            priceTotal: {
                label: {Locator: page.locator(summarySelector.priceTotal.label), selector: summarySelector.priceTotal.label},
                itemTotal: {Locator: page.locator(summarySelector.priceTotal.subTotal), selector: summarySelector.priceTotal.subTotal},
                taxValue: {Locator: page.locator(summarySelector.priceTotal.taxValue), selector: summarySelector.priceTotal.taxValue},
                totalValue: {Locator: page.locator(summarySelector.priceTotal.totalValue), selector: summarySelector.priceTotal.totalValue},
            },
            cartList: {
                list: {Locator: page.locator(summarySelector.cartList.list), selector: summarySelector.cartList.list},
                qtyLabel: {Locator: page.locator(summarySelector.cartList.qtyLabel), selector: summarySelector.cartList.qtyLabel},
                dscLabel: {Locator: page.locator(summarySelector.cartList.dscLabel), selector: summarySelector.cartList.dscLabel},
                cartItem: {Locator: page.locator(summarySelector.cartList.cartItem), selector: summarySelector.cartList.cartItem},
                cartQty: {Locator: page.locator(summarySelector.cartList.cartQty), selector: summarySelector.cartList.cartQty},
                cartItemTitle: {Locator: page.locator(summarySelector.cartList.cartItemTitle), selector: summarySelector.cartList.cartItemTitle},
                cartItemDsc: {Locator: page.locator(summarySelector.cartList.cartItemDsc), selector: summarySelector.cartList.cartItemDsc},
                cartItemPrice: {Locator: page.locator(summarySelector.cartList.cartItemPrice), selector: summarySelector.cartList.cartItemPrice},
            }

        }

        const completeSelector = {
            title: 'span.title',
            completeIcon: 'img.pony_express',
            header: 'h2.complete-header',
            orderText: 'div.complete-text'
        }

        this.checkoutComplete = {
            title: {Locator: page.locator(completeSelector.title), selector: completeSelector.title},
            completeIcon: {Locator: page.locator(completeSelector.completeIcon), selector: completeSelector.completeIcon},
            header: {
                element: {Locator: page.locator(completeSelector.header), selector: completeSelector.header},
                text: 'Thank you for your order!',
            },
            orderText: {
                element: {Locator: page.locator(completeSelector.orderText), selector: completeSelector.orderText},
                text: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
            }
        }


    }


    // get URL(){
    //     return `${process.env.BASE_URL || 'https://www.saucedemo.com/'}${process.env.CART_URL || 'cart.html'}`
    // }

    // get titleCart(){
    //     return this.page.getByText('Your Cart', {exact: true})
    // }

    // get cart(){
    //     return{
    //         list: this.page.locator('.cart_list'),
    //         columnQty: this.page.locator('.cart_quantity_label'),
    //         columnDsc: this.page.locator('.cart_desc_label'),
    //         card: {
    //             item: this.page.locator('.cart_item'),
    //             qty: this.page.locator('.cart_quantity'),
    //             itemName: this.page.locator('.inventory_item_name'),
    //             itemDesc: this.page.locator('.inventory_item_desc'),
    //             itemPrice: this.page.locator('.inventory_item_price'),
    //             removeBtn: this.page.getByRole('button', {name: 'Remove', exact: true}),
    //         }
    //     }
    // }

    // get cartActions(){
    //     return{
    //         continueBtn: this.page.getByRole('button', {name: 'Continue Shopping', exact: true}),
    //         checkoutBtn: this.page.getByRole('button', {name: 'Checkout', exact: true}),
    //     }
    // }

    async navigateToCartPage() {
        await this.shoppingCart.icon.Locator.click();
    }

    async validateAddedItems() {
    console.info('Getting number of items...');
    const totalCount = await this.cart.card.item.Locator.count();
    console.info(`Number of items found: ${totalCount}`);

    const itemsInCart: { name: string, price: number, qty: number }[] = [];

    for (let i = 0; i < totalCount; i++) {
        const itemLocator = this.cart.card.item.Locator.nth(i);

        const nameText = await itemLocator.locator(this.cart.card.itemName.selector).textContent();
        const priceText = await itemLocator.locator(this.cart.card.itemPrice.selector).textContent();
        const qtyText = await itemLocator.locator(this.cart.card.qty.selector).textContent();

        const name = nameText?.trim() || '';
        const price = parseFloat(priceText?.replace(/[$,]/g, '') || '0');
        const qty = parseInt(qtyText?.trim() || '0');

        if (name) {
            itemsInCart.push({ name, price, qty });
            console.info(`Item ${i + 1}: ${name} | Price: $${price.toFixed(2)} | Qty: ${qty}`);
        }
    }

    console.log('🛒 Final cart contents:', itemsInCart);
    return itemsInCart;
    }

    async clickContinueShopping() {
        await this.cartActions.continueBtn.Locator.isVisible();
        await this.cartActions.continueBtn.Locator.click();
        await this.page.waitForURL('**/inventory.html'); // optional but safer for navigation
    }

    async clickCheckOut() {
        await this.cartActions.continueBtn.Locator.isVisible();
        await this.cartActions.checkoutBtn.Locator.click();
        await this.page.waitForURL('**/checkout-step-one.html')
    }

    async fillCheckOutInformation(
        firstName: string | null, 
        lastName: string | null, 
        postalCode: number | null) {
        if (firstName !== null) {
            await this.checkOut.Fields.firstName.Locator.fill(firstName);
        }
        if (lastName !== null) {
            await this.checkOut.Fields.lastName.Locator.fill(lastName);
        }
        if (postalCode !== null) {
            await this.checkOut.Fields.postalCode.Locator.fill(postalCode.toString());
        }      
    }

    async clickCheckOutButton(button: 'cancel' | 'continue' | 'finish' | 'back-home'){
        if (button === 'cancel') {
            await this.checkOut.Button.cancel.Locator.isVisible();
            await this.checkOut.Button.cancel.Locator.click();
        }
        else if (button === 'continue') {
            await this.checkOut.Button.continue.Locator.isVisible();
            await this.checkOut.Button.continue.Locator.click();
        }
        else if (button ==='finish') {
            await this.checkOut.Button.finish.Locator.isVisible();
            await this.checkOut.Button.finish.Locator.click();
        } else {
            await this.checkOut.Button.backHome.Locator.isVisible();
            await this.checkOut.Button.backHome.Locator.click();
        }
    }

    async getOverviewItems(): Promise<{name: string, price: number, qty: number}[]> {
        console.info('🔍 Getting overview items...');
        const totalCount = await this.summary.cartList.cartItem.Locator.count();
        console.info(`Found ${totalCount} item(s) in overview page.`)

        const items: {name: string, price: number, qty: number} [] = []

        for (let i = 0; i < totalCount; i++){
            const itemLocator = this.summary.cartList.cartItem.Locator.nth(i);

            const nameText = await itemLocator.locator(this.summary.cartList.cartItemTitle.Locator).textContent();
            const priceText = await itemLocator.locator(this.summary.cartList.cartItemPrice.Locator).textContent();
            const qtyText = await itemLocator.locator(this.summary.cartList.cartQty.Locator).textContent();

            const name = nameText?.trim() || '';
            const price = parseFloat(priceText?.replace(/[$,]/g, '') || '0');
            const qty = parseInt(qtyText?.trim() || '0');

            if (name) {
                items.push({name, price, qty});
                console.info(`item ${i + 1}: ${name} | Price: $${price.toFixed(2)} | Qty: ${qty}`)
            }
        }
        return items
    }

    async getSummaryDetails() {
        const paymentInfo = (await this.summary.paymentInfo.value.Locator.textContent())?.trim() || '';
        const shippingInfo = (await this.summary.shippingInfo.value.Locator.textContent())?.trim() || '';

        const itemTotalText = await this.summary.priceTotal.itemTotal.Locator.textContent();
        const taxText = await this.summary.priceTotal.taxValue.Locator.textContent();
        const totalText = await this.summary.priceTotal.totalValue.Locator.textContent();

        const itemTotal = parseFloat(itemTotalText?.replace(/[^\d.]/g, '') || '0');
        const tax = parseFloat(taxText?.replace(/[^\d.]/g,'') || '0')
        const total = parseFloat(totalText?.replace(/[^\d.]/g, '') || '0')

        return {
            paymentInfo,
            shippingInfo,
            itemTotal,
            tax,
            total
        };
    }

    async getErrorInformation(){
        return await this.checkOut.Error.Message.banner.Locator.textContent();
    }
}