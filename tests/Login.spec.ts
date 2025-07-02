import {test, expect} from '@playwright/test'
import {LoginPage} from './pages/LoginPage'
import {InventoryPage} from './pages/InventoryPage'
import { assertVisibleElements } from '../helpers/assertElements'
import { filterOptions, inventoryItems } from '../data/InventoryPage/data'

let loginPage: LoginPage
let inventoryPage: InventoryPage

test.describe('Valid Credentials' , () => {
    
    test.beforeEach('Navigate to Login Page', async ({page}) => {
        
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page)
        await loginPage.navigateToSauceDemo();
        await expect(page).toHaveURL('/');
 
    })
    test('User Login - Standard', async ({page}) =>{
        await loginPage.loginStandardUser();
        await expect(page).toHaveURL(inventoryPage.URL);
        console.log(`URL - ${inventoryPage.URL}`);
        await expect(inventoryPage.productTitle).toBeVisible();
        const list = inventoryPage.inventory.list
        await expect(list.Locator).toBeVisible();

        // test for adding and removing an item again
        const numberAdded = await inventoryPage.addToCart(inventoryItems.item1.name, inventoryItems.item2.name);

        // Do assertion for number of items added
        const badgeText = await inventoryPage.cart.badge.Locator.textContent();
        expect(Number(badgeText)).toBe(numberAdded);

        const numberRemoved = await inventoryPage.removeFromCart(inventoryItems.item1.name, inventoryItems.item2.name);
        console.log(`Number of items removed from cart: ${numberRemoved}`);
        console.log(`Cart badge text: ${badgeText}`);
        await expect(inventoryPage.cart.badge.Locator).not.toBeVisible();
    })

    test('User Login - Locked Out User', async ({page}) => {
        await loginPage.loginLockedOutUser();
        await expect(page).toHaveURL('/')
        const elements = {
            usernameIcon: loginPage.username_errorIcon,
            passwordIcon: loginPage.password_errorIcon,
            errorMessage: loginPage.errorMessage,
            errorClose: loginPage.errorMessage_close
        }

        for (const [name, element] of Object.entries(elements)) {
            await expect(element).toBeVisible();
            if (name === 'errorMessage'){
                await expect(element).toHaveText(loginPage.errors.lockedOutError)
                console.log(`${name} Text Value: ${loginPage.errors.lockedOutError}`)
            }
        }
    }) 

    test.fail('User Login - Problem User', async ({page}) => {
        await loginPage.loginProblemUser();
        await expect(page).toHaveURL(inventoryPage.URL)
        const elements = {
            productTitle: inventoryPage.productTitle,
            list: inventoryPage.inventory.list.Locator,
            cartIcon: inventoryPage.cart.icon.Locator,
            cartBadge: inventoryPage.cart.badge.Locator
        };

        for (const [name, element] of Object.entries(elements)) {
        if (name === 'cartBadge') {
            await expect(element).not.toBeVisible();
            console.log(`${name} is NOT visible`);
        } else {
            await expect(element).toBeVisible();
            console.log(`${name} is visible`);
        }
        }

        const imgLocators = inventoryPage.inventory.image.Locator;
        const imageCount = await imgLocators.count();

        const imageSrcs: string[] = [];

        for (let i = 0; i < imageCount; i++) {
            const src = await imgLocators.nth(i).getAttribute('src');
            if (src) {
            imageSrcs.push(src);
            }
        }

        const uniqueSrcs = new Set(imageSrcs);

        // Log output for debugging
        console.log('All image srcs:', imageSrcs);
        console.log('Unique image srcs:', [...uniqueSrcs]);

        // Assertion: the number of unique image URLs should equal the total count
        expect(uniqueSrcs.size).toBe(imageCount);
    })

    test('User Login - Performance Glitch User', async ({page}) => {
        const start = Date.now();
        console.log(`Start: ${start}`);
        await loginPage.loginPerformanceGlitchUser();
        await expect(page).toHaveURL(inventoryPage.URL);
        const end = Date.now();
        console.log(`End: ${end}`);
        const loadTime = end - start;

        console.log(`Login load time: ${loadTime} ms`);

        // Fail the test if it loads too slowly (adjust threshold as needed)
        expect(loadTime).toBeGreaterThan(1000); // Should be slower than 1 second
    })

    test('User Login - Error User [@ErrorUser]', async ({page}) => {
        await loginPage.loginErrorUser();
        await expect(page).toHaveURL(inventoryPage.URL);

        // Register dialog handler BEFORE the action that triggers it
        page.once('dialog', async (dialog) => {
            expect(dialog.message()).toContain('Sorting is broken');
            console.log('Popup text:', dialog.message());
            await dialog.accept(); // Click OK
        });

        // Perform the action that causes the alert
        await inventoryPage.selectFilter(filterOptions.nameAZ.value);
        console.log(`Selected filter: ${filterOptions.nameAZ.value}`);

        await expect(inventoryPage.filter.Locator).toHaveValue(filterOptions.nameAZ.value);

        const numberAdded = await inventoryPage.addToCart(inventoryItems.item1.name, inventoryItems.item2.name);

        // Do assertion for number of items added
        const badgeText = await inventoryPage.cart.badge.Locator.textContent();
        expect(Number(badgeText)).toBe(numberAdded);

        const numberRemoved = await inventoryPage.removeFromCart(inventoryItems.item1.name, inventoryItems.item2.name);
        const badgeTextAfterRemove = await inventoryPage.cart.badge.Locator.textContent();
        console.log(`Number of items removed from cart: ${numberRemoved}`);
        console.log(`Cart badge text: ${badgeTextAfterRemove}`);
    })

    test('User Login - Visual User ', async ({page}) => {
        await loginPage.loginVisualUser();
    })

    })


test.describe('Invalid Credentials', () => {
    test.beforeEach('Navigate to Login Page', async ({page}) => {
        
        loginPage = new LoginPage(page);
        await loginPage.navigateToSauceDemo();
        await expect(page).toHaveURL('/');
    })

    test('User Login - Invalid', async ({page}) =>{
        await loginPage.loginInvalidUser();
    })
})

test.describe('Validate elements', () => {
    test.beforeEach('Navigate to Login Page', async ({page}) => {
        
        loginPage = new LoginPage(page);
        await loginPage.navigateToSauceDemo();
        await expect(page).toHaveURL('/');
    })
})