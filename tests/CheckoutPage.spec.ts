import {test, expect, Page} from '@playwright/test'
import {InventoryPage} from './pages/InventoryPage'
import {LoginPage} from './pages/LoginPage'
import { CheckoutPage } from './pages/CheckoutPage'
import {inventoryItems} from '../data/InventoryPage/data'
import { assertVisibleElements } from '../helpers/assertElements'
import { validData } from '../data/CheckoutPage/data'

let loginPage: LoginPage
let inventoryPage: InventoryPage
let checkoutPage: CheckoutPage

async function loginAndAddItems(page: Page) {
  loginPage = new LoginPage(page)
  inventoryPage = new InventoryPage(page)
  checkoutPage = new CheckoutPage(page)

  await loginPage.navigateToSauceDemo();
  await loginPage.loginStandardUser();
  await expect(page).toHaveURL(inventoryPage.URL);

  const itemsAdded = await inventoryPage.addToCart(
    inventoryItems.item1.name,
    inventoryItems.item2.name,
    inventoryItems.item3.name
  );

  expect(itemsAdded).toBe(3);

  await expect(inventoryPage.cart.badge.Locator).toBeVisible();
  const badgeText = await inventoryPage.cart.badge.Locator.textContent();
  expect(Number(badgeText)).toBe(itemsAdded);

  await checkoutPage.navigateToCartPage();
  await expect(page).toHaveURL(checkoutPage.URL);
}

test.describe('Validate Items', ()=> {
    test.beforeEach('Login + Add Item to Cart', async ({page}) => {

        await loginAndAddItems(page);

    })
    test('validateItems', async ({page}) => {
        const itemsInCart = await checkoutPage.validateAddedItems();
        console.table(itemsInCart);

        const expectedItems = [
            { name: inventoryItems.item1.name, price: parseFloat(inventoryItems.item1.price.replace(/[$,]/g, '')), qty: 1 },
            { name: inventoryItems.item2.name, price: parseFloat(inventoryItems.item2.price.replace(/[$,]/g, '')), qty: 1 },
            { name: inventoryItems.item3.name, price: parseFloat(inventoryItems.item3.price.replace(/[$,]/g, '')), qty: 1 }
        ];

        expect(itemsInCart.length).toBe(expectedItems.length);
        console.log(`Items in Cart: ${itemsInCart.length} | Expected Items: ${expectedItems.length}`);

        for (const expected of expectedItems) {
            const match = itemsInCart.find(item => 
                item.name === expected.name && 
                item.price === expected.price &&
                item.qty === expected.qty
            );
            expect(match, `Item not found or mismatched: ${expected.name}`).toBeTruthy();
        }

        console.log('✅ All expected items are present and correct in the cart.');
    })
})

test.describe('Go back to Inventory Page',async () => {
    test.beforeEach('Login + Add Item to Cart', async ({page}) => {
        await loginAndAddItems(page);
    })

    test('Click Continue Shopping', async ({page}) => {
        await checkoutPage.clickContinueShopping();
        const URL = page.url();
        console.log(`Navigated back to: ${URL}`)
        await expect(page).toBe(URL)
    })

    test('Click Checkout button', async ({page}) => {
        await checkoutPage.clickCheckOut();
        const URL = page.url();
        console.log(`Navigated to: ${URL}`)
        expect(URL).toBe(checkoutPage.checkOutURLs.information);
    })

})

test.describe('Checkout Flow - Happy Path', () => {
    test.beforeEach('Login + Add Item to Cart', async ({page}) => {
        await loginAndAddItems(page);
    })
    test('Complete Checkout', async ({page}) => {

        // click checkout button
        await checkoutPage.clickCheckOut();
        await expect(page).toHaveURL(checkoutPage.checkOutURLs.information);
        console.log(`User redirected to: ${page.url()}`);

        console.log(`Filling out customer information`);
        await checkoutPage.fillCheckOutInformation('Francois', 'Janoras', 1920);
        await checkoutPage.clickCheckOutButton('continue');
        await expect(page).toHaveURL(checkoutPage.checkOutURLs.overview);
        console.log(`User redirected to: ${page.url()}`);

        const items = await checkoutPage.getOverviewItems();
        const summary = await checkoutPage.getSummaryDetails();

        // Calculate for total price of overview items
        const calculatedTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
        
        // Compare it with itemTotal from summary
        expect(summary.total).toBeCloseTo(calculatedTotal + summary.tax, 2)

        console.log(`Calculated item total: $${calculatedTotal.toFixed(2)}`);
        console.log(`Summary item total: $${summary.itemTotal.toFixed(2)}`);
        console.log(`Summary tax: $${summary.tax.toFixed(2)}`);
        console.log(`Summary total: $${summary.total.toFixed(2)}`);

        // Click Finish
        await checkoutPage.clickCheckOutButton("finish");
        await expect(page).toHaveURL(checkoutPage.checkOutURLs.complete)
        
        const elements = [
            checkoutPage.checkoutComplete.title.Locator,
            checkoutPage.checkoutComplete.completeIcon.Locator,
            checkoutPage.checkoutComplete.header.element.Locator,
            checkoutPage.checkoutComplete.orderText.element.Locator,
            checkoutPage.checkOut.Button.backHome.Locator
        ];

        await assertVisibleElements(elements, 'Checkout: Complete! (Elements)');
        
    })
    
})

test.describe('Checkout Form Field Validations', () => {
    test.beforeEach('Login + Add Item to Cart + click Checkout', async ({page}) => {
        
        await loginAndAddItems(page);

        // click Checkout butotn
        await checkoutPage.clickCheckOut();
        await expect(page).toHaveURL(checkoutPage.checkOutURLs.information);
    })
    test('Happy Path - Valid Submission', async ({page}) => {
        await checkoutPage.fillCheckOutInformation(
            validData.data1.firstName, 
            validData.data1.lastName, 
            validData.data1.postalCode)
        await checkoutPage.clickCheckOutButton('continue');
        await expect(page).toHaveURL(checkoutPage.checkOutURLs.overview);
    })
    test('Missing firstName', async ({page}) => {
        await checkoutPage.fillCheckOutInformation(
            null, 
            validData.data2.lastName, 
            validData.data2.postalCode)
        await checkoutPage.clickCheckOutButton('continue');
        const errors = [
            checkoutPage.checkOut.Error.Icon.firstName.Locator,
            checkoutPage.checkOut.Error.Icon.lastName.Locator,
            checkoutPage.checkOut.Error.Icon.postalCode.Locator,
            checkoutPage.checkOut.Error.Message.banner.Locator,
            checkoutPage.checkOut.Error.Message.closeBtn.Locator,
        ]

        await assertVisibleElements(errors, 'Error elements');
        // get banner text content
        const errorMessage = await checkoutPage.checkOut.Error.Message.banner.Locator.textContent();
        await expect(errorMessage).toBe(checkoutPage.checkOut.Error.Message.firstName);
        console.log(`Error: ${errorMessage}`)
    })
    test('Missing lastName', async ({page}) => {
        await checkoutPage.fillCheckOutInformation(
            validData.data1.firstName, 
            null, 
            validData.data1.postalCode)
        await checkoutPage.clickCheckOutButton('continue');
        const errors = [
            checkoutPage.checkOut.Error.Icon.firstName.Locator,
            checkoutPage.checkOut.Error.Icon.lastName.Locator,
            checkoutPage.checkOut.Error.Icon.postalCode.Locator,
            checkoutPage.checkOut.Error.Message.banner.Locator,
            checkoutPage.checkOut.Error.Message.closeBtn.Locator,
        ]

        await assertVisibleElements(errors, 'Error elements');
        // get banner text content
        const errorMessage = await checkoutPage.checkOut.Error.Message.banner.Locator.textContent();
        await expect(errorMessage).toBe(checkoutPage.checkOut.Error.Message.lastName);
        console.log(`Error: ${errorMessage}`)
    })
    test('Missing postalCode', async ({page}) => {
        await checkoutPage.fillCheckOutInformation(
            validData.data1.firstName, 
            validData.data1.lastName, 
            null)
        await checkoutPage.clickCheckOutButton('continue');
        const errors = [
            checkoutPage.checkOut.Error.Icon.firstName.Locator,
            checkoutPage.checkOut.Error.Icon.lastName.Locator,
            checkoutPage.checkOut.Error.Icon.postalCode.Locator,
            checkoutPage.checkOut.Error.Message.banner.Locator,
            checkoutPage.checkOut.Error.Message.closeBtn.Locator,
        ]

        await assertVisibleElements(errors, 'Error elements');
        // get banner text content
        const errorMessage = await checkoutPage.checkOut.Error.Message.banner.Locator.textContent();
        await expect(errorMessage).toBe(checkoutPage.checkOut.Error.Message.postalCode);
        console.log(`Error: ${errorMessage}`)
    })
    test('Missing First Name, Last Name', async ({page}) => {
        await checkoutPage.fillCheckOutInformation(
            null, 
            null, 
            validData.data1.postalCode)
        await checkoutPage.clickCheckOutButton('continue');
        const errors = [
            checkoutPage.checkOut.Error.Icon.firstName.Locator,
            checkoutPage.checkOut.Error.Icon.lastName.Locator,
            checkoutPage.checkOut.Error.Icon.postalCode.Locator,
            checkoutPage.checkOut.Error.Message.banner.Locator,
            checkoutPage.checkOut.Error.Message.closeBtn.Locator,
        ]

        await assertVisibleElements(errors, 'Error elements');
        // get banner text content
        const errorMessage = await checkoutPage.checkOut.Error.Message.banner.Locator.textContent();
        await expect(errorMessage).toBe(checkoutPage.checkOut.Error.Message.firstName);
        console.log(`Error: ${errorMessage}`)
    })
     test('Missing First Name, Postal Code', async ({page}) => {
        await checkoutPage.fillCheckOutInformation(
            null, 
            validData.data1.lastName, 
            null)
        await checkoutPage.clickCheckOutButton('continue');
        const errors = [
            checkoutPage.checkOut.Error.Icon.firstName.Locator,
            checkoutPage.checkOut.Error.Icon.lastName.Locator,
            checkoutPage.checkOut.Error.Icon.postalCode.Locator,
            checkoutPage.checkOut.Error.Message.banner.Locator,
            checkoutPage.checkOut.Error.Message.closeBtn.Locator,
        ]

        await assertVisibleElements(errors, 'Error elements');
        // get banner text content
        const errorMessage = await checkoutPage.checkOut.Error.Message.banner.Locator.textContent();
        await expect(errorMessage).toBe(checkoutPage.checkOut.Error.Message.firstName);
        console.log(`Error: ${errorMessage}`)
    })
    test('Missing Last Name, Postal Code', async ({page}) => {
        await checkoutPage.fillCheckOutInformation(
            validData.data1.firstName, 
            null, 
            null)
        await checkoutPage.clickCheckOutButton('continue');
        const errors = [
            checkoutPage.checkOut.Error.Icon.firstName.Locator,
            checkoutPage.checkOut.Error.Icon.lastName.Locator,
            checkoutPage.checkOut.Error.Icon.postalCode.Locator,
            checkoutPage.checkOut.Error.Message.banner.Locator,
            checkoutPage.checkOut.Error.Message.closeBtn.Locator,
        ]

        await assertVisibleElements(errors, 'Error elements');
        // get banner text content
        const errorMessage = await checkoutPage.checkOut.Error.Message.banner.Locator.textContent();
        await expect(errorMessage).toBe(checkoutPage.checkOut.Error.Message.lastName);
        console.log(`Error: ${errorMessage}`)
    })
    test('All fields empty', async ({page}) => {
         await checkoutPage.fillCheckOutInformation(
            null, 
            null, 
            null)
        await checkoutPage.clickCheckOutButton('continue');
        const errors = [
            checkoutPage.checkOut.Error.Icon.firstName.Locator,
            checkoutPage.checkOut.Error.Icon.lastName.Locator,
            checkoutPage.checkOut.Error.Icon.postalCode.Locator,
            checkoutPage.checkOut.Error.Message.banner.Locator,
            checkoutPage.checkOut.Error.Message.closeBtn.Locator,
        ]

        await assertVisibleElements(errors, 'Error elements');
        // get banner text content
        const errorMessage = await checkoutPage.checkOut.Error.Message.banner.Locator.textContent();
        await expect(errorMessage).toBe(checkoutPage.checkOut.Error.Message.firstName);
        console.log(`Error: ${errorMessage}`)
    })
})
