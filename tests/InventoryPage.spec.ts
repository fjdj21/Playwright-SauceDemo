import {test, expect} from '@playwright/test'
import {LoginPage} from './pages/LoginPage'
import {InventoryPage} from './pages/InventoryPage'
import { filterOptions, inventoryItems } from '../data/InventoryPage/data'
import { assertVisibleElements } from '../helpers/assertElements'

let loginPage: LoginPage  
let inventoryPage: InventoryPage

test.describe('Default View', () => {
    test.beforeEach('Login - Standard User', async ({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page)
        await loginPage.navigateToSauceDemo();
        await expect(page).toHaveURL('/');
        console.log(`Navigated to: URL - ${page.url()}`);
        await loginPage.loginStandardUser();
        await expect(page).toHaveURL(inventoryPage.URL);
        console.log(`Logged in successfully. Current URL: ${page.url()}`);
        console.log(`URL - ${inventoryPage.URL}`);
    })

    test('Inventory Page - Default View', async ({page}) => {
        const elements = [
            inventoryPage.burgerMenu.menu.Locator,
            inventoryPage.cart.icon.Locator,
            inventoryPage.productTitle,
            inventoryPage.filter.Locator,
            inventoryPage.inventory.list.Locator
        ]

        await assertVisibleElements(elements, 'Inventory Page - Element');
    })
});

test.describe('Filter', () => {
    test.beforeEach('Login - Standard User', async ({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page)
        await loginPage.navigateToSauceDemo();
        await expect(page).toHaveURL('/');
        console.log(`Navigated to: URL - ${page.url()}`);
        await loginPage.loginStandardUser();
        await expect(page).toHaveURL(inventoryPage.URL);
        console.log(`Logged in successfully. Current URL: ${page.url()}`);
        console.log(`URL - ${inventoryPage.URL}`);
    })

    test('Inventory Page - Filter Name (A to Z)', async ({page}) => {
        const items = await inventoryPage.selectFilter(filterOptions.nameAZ.label);

        const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));
        expect(items).toEqual(sorted);
    })

    test('Inventory Page - Filter Name (Z to A)', async ({page}) => {
        const items = await inventoryPage.selectFilter(filterOptions.nameZA.label);

        const sorted = [...items].sort((a, b) => b.name.localeCompare(a.name));
        await expect(items).toEqual(sorted);

    })

    test('Inventory Page - Filter Price (Low to High)', async ({page}) => {
        const items = await inventoryPage.selectFilter(filterOptions.priceLH.label);

        const sorted = [...items].sort((a, b) => a.price - b.price);
        expect(items).toEqual(sorted);
    })

    test('Inventory Page - Filter Price (High to Low)', async ({page}) => {
        const items = await inventoryPage.selectFilter(filterOptions.priceHL.label);
        const sorted = [...items].sort((a, b) => b.price - a.price);
        expect(items).toEqual(sorted);
    })

    // test('Inventory Page - Invalid Filter', async ({page}) => {
    //     // Test should fail if the error is NOT thrown
    //     try {
    //         await inventoryPage.selectFilter('test');  // invalid filter option
    //     } catch (error) {
    //         // Assert the error message if thrown
    //         expect(error.message).toContain('Invalid filter option');
    //         return;  // Exit early, as this test is meant to pass if error occurs
    //     }

    //     // If no error is thrown, the test will fail
    //     throw new Error('Expected error for invalid filter option, but none was thrown');
    // })
}); 

test.describe('Add Items to Cart', () => {
    test.beforeEach('Login - Standard User', async ({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page)
        await loginPage.navigateToSauceDemo();
        await expect(page).toHaveURL('/');
        console.log(`Navigated to: URL - ${page.url()}`);
        await loginPage.loginStandardUser();
        await expect(page).toHaveURL(inventoryPage.URL);
        console.log(`Logged in successfully. Current URL: ${page.url()}`);
        console.log(`URL - ${inventoryPage.URL}`);
    })

    test('Add Single Item to Cart', async ({page}) => {
        const itemsAdded = await inventoryPage.addToCart(inventoryItems.item1.name);

        // Do assertion for number of items added
        await expect(inventoryPage.cart.badge.Locator).toBeVisible();
        const badgeText = await inventoryPage.cart.badge.Locator.textContent();
        expect(Number(badgeText)).toBe(itemsAdded);
    })

    test('Add Multiple Items to Cart', async ({page}) => {
        const itemsAdded = await inventoryPage.addToCart(
            inventoryItems.item1.name,
            inventoryItems.item2.name,
            inventoryItems.item3.name,
            inventoryItems.item4.name,
            inventoryItems.item5.name,
            inventoryItems.item6.name
        );

        const itemCount = 6; // Number of items added
        expect(itemsAdded).toBe(itemCount);
        
        // Do assertion for number of items added
        await expect(inventoryPage.cart.badge.Locator).toBeVisible();
        const badgeText = await inventoryPage.cart.badge.Locator.textContent();
        expect(Number(badgeText)).toBe(itemsAdded);
    })
})

test.describe('Remove Items from Cart', () => {
    test.beforeEach('Login - Standard User', async ({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page)
        await loginPage.navigateToSauceDemo();
        await expect(page).toHaveURL('/');
        console.log(`Navigated to: URL - ${page.url()}`);
        await loginPage.loginStandardUser();
        await expect(page).toHaveURL(inventoryPage.URL);
        console.log(`Logged in successfully. Current URL: ${page.url()}`);
        console.log(`URL - ${inventoryPage.URL}`);
    })
    test('Remove Single Item from Cart', async ({page}) => {
        const itemsAdded = await inventoryPage.addToCart(inventoryItems.item1.name);
        expect(itemsAdded).toBe(1);

        const itemsRemoved = await inventoryPage.removeFromCart(inventoryItems.item1.name);
        expect(itemsRemoved).toBe(1);

        // Assert that the cart badge is not visible after removing the item
        await expect(inventoryPage.cart.badge.Locator).not.toBeVisible();
    })
    test('Remove Multiple Items from Cart', async ({page}) => {
        const itemsAdded = await inventoryPage.addToCart(
            inventoryItems.item1.name,
            inventoryItems.item2.name,
            inventoryItems.item3.name
        );
        expect(itemsAdded).toBe(3);

        const itemsRemoved = await inventoryPage.removeFromCart(
        
            inventoryItems.item1.name,
            inventoryItems.item2.name,
            inventoryItems.item3.name
        );
        expect(itemsRemoved).toBe(3);

        // Assert that the cart badge is not visible after removing all items
        await expect(inventoryPage.cart.badge.Locator).not.toBeVisible();
    })
    test('Remove some Items from Cart', async ({page}) => {
        const itemsAdded = await inventoryPage.addToCart(
            inventoryItems.item1.name,
            inventoryItems.item2.name,
            inventoryItems.item3.name,
            inventoryItems.item4.name
        );
        expect(itemsAdded).toBe(4);

        const itemsRemoved = await inventoryPage.removeFromCart(
            inventoryItems.item1.name,
            inventoryItems.item2.name
        );
        expect(itemsRemoved).toBe(2);

        // Assert that the cart badge is visible and shows the correct number of items left
        await expect(inventoryPage.cart.badge.Locator).toBeVisible();
        const badgeText = await inventoryPage.cart.badge.Locator.textContent();
        expect(Number(badgeText)).toBe(2);
    })
})

test.describe('Access an Item Details Page', () => {
    test.beforeEach('Login - Standard User', async ({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page)
        await loginPage.navigateToSauceDemo();
        await expect(page).toHaveURL('/');
        console.log(`Navigated to: URL - ${page.url()}`);
        await loginPage.loginStandardUser();
        await expect(page).toHaveURL(inventoryPage.URL);
        console.log(`Logged in successfully. Current URL: ${page.url()}`);
        console.log(`URL - ${inventoryPage.URL}`);
    })

    test('Access Item Details Page', async ({page}) => {
        const itemName = inventoryItems.item3.name;
        const targetItem = await inventoryPage.accessItemDetails(itemName);
        const productURL = await inventoryPage.getProductURL();
    
        // const productName = inventoryPage.product.name.Locator.textContent();

        // console.log(`Name: ${productName}`);
        const productName = await inventoryPage.product.name.Locator.textContent();
        await expect(productName).toBe(targetItem)


        // await expect(targetItem).toBe(productName);
        console.log(inventoryPage.productURL + productURL)
        await expect(page).toHaveURL(inventoryPage.productURL + productURL)

        await page.waitForTimeout(5000); // Wait for the page to load
    })
})