import {Page, Locator} from '@playwright/test'
import {BasePage} from './BasePage'
import { filterOptions } from '../../data/InventoryPage/data'
import { error } from 'console'
import { CartComponent } from '../../components/Cart'

export class InventoryPage extends BasePage{
    
    readonly URL: string
    readonly productURL: string
    readonly productTitle: Locator

    readonly inventory: {
        list: {Locator: Locator, selector: string},
        item: {Locator: Locator, selector: string},
        image: {Locator: Locator, selector: string},
        itemName: {Locator: Locator, selector: string},
        itemDescription: {Locator: Locator, selector: string},
        itemPrice: {Locator: Locator, selector: string},
        button: {Locator: Locator, selector: string},
    }

    readonly filter: {Locator: Locator, selector: string}

    readonly cart: CartComponent;
    // readonly cart: {
    //     icon: {Locator: Locator, selector: string},
    //     badge: {Locator: Locator, selector: string}
    // }

    readonly burgerMenu: {
        menu: {Locator: Locator, selector: string},
        allItems: {Locator: Locator, selector: string},
        aboutItems: {Locator: Locator, selector: string},
        logout: {Locator: Locator, selector: string},
        resetAppState: {Locator: Locator, selector: string},
    }

    readonly product: {
        backButton: {Locator: Locator, selector: string},
        img: {Locator: Locator, selector: string},
        name: {Locator: Locator, selector: string},
        desc: {Locator: Locator, selector: string},
        price: {Locator: Locator, selector: string},
    }

    constructor(page: Page){
        super(page)
    
        this.URL = `${process.env.SAUCE_DEMO_URL || 'https://www.saucedemo.com/'}${process.env.INVENTORY_URL || 'inventory.html'}`
        this.productURL = `${process.env.SAUCE_DEMO_URL || 'https://www.saucedemo.com/'}${process.env.PRODUCT_URL || 'inventory-item.html?id='}`
    
        
        const productTitleSelector = 'Products';

        this.productTitle = page.getByText(productTitleSelector, {exact: true});

        const inventorySelector = {
            list: '.inventory_list',
            item: '.inventory_item',
            image: '.inventory_item_img',
            itemName: '.inventory_item_name',
            itemDescription: '.inventory_item_desc',
            itemPrice: '.inventory_item_price',
            button: 'button.btn_inventory',
        }

        this.inventory = {
            list: {Locator: page.locator(inventorySelector.list), selector: inventorySelector.list},
            item: {Locator: page.locator(inventorySelector.item), selector: inventorySelector.item},
            image: {Locator: page.locator(inventorySelector.image), selector: inventorySelector.image},
            itemName: {Locator: page.locator(inventorySelector.itemName), selector: inventorySelector.itemName},
            itemDescription: {Locator: page.locator(inventorySelector.itemDescription), selector: inventorySelector.itemDescription},
            itemPrice: {Locator: page.locator(inventorySelector.itemPrice), selector: inventorySelector.itemPrice},
            button: {Locator: page.locator(inventorySelector.button), selector: inventorySelector.button},
        }

        const filterSelector = '.product_sort_container';

        this.filter = {Locator: page.locator(filterSelector), selector: filterSelector}

        // const cartSelector = {
        //     icon: '.shopping_cart_link',
        //     badge: '.shopping_cart_badge'
        // }

        // this.cart = {
        //     icon: {Locator: page.locator(cartSelector.icon), selector: cartSelector.icon},
        //     badge: {Locator: page.locator(cartSelector.badge), selector: cartSelector.badge},
        // }
        this.cart = new CartComponent(page);

        const burgerMenuSelector = {
            menu: 'button#react-burger-menu-btn',
            allItems: '#inventory_sidebar_link',
            aboutItems: '#about_sidebar_link',
            logout: '#logout_sidebar_link',
            resetAppState: '#reset_sidebar_link'
        }

        this.burgerMenu = {
            menu: {Locator: page.getByRole('button', {name: 'Open Menu', exact: true}), selector: burgerMenuSelector.menu},
            allItems: {Locator: page.locator(burgerMenuSelector.allItems), selector: burgerMenuSelector.allItems},
            aboutItems: {Locator: page.locator(burgerMenuSelector.aboutItems), selector: burgerMenuSelector.aboutItems},
            logout: {Locator: page.locator(burgerMenuSelector.logout), selector: burgerMenuSelector.logout},
            resetAppState: {Locator: page.locator(burgerMenuSelector.resetAppState, {hasText: 'Reset App State'}), selector: burgerMenuSelector.resetAppState},
        }

        const productSelector = {
            backButton: '.inventory_details_back_button',
            img: '.inventory_details_img',
            name: '.inventory_details_name',
            desc: '.inventory_details_desc',
            price: '.inventory_details_price',
        }

        this.product = {
            backButton: {Locator: page.getByRole('button', {name: 'Back to products'}), selector: productSelector.backButton},
            img: {Locator: page.locator(productSelector.img), selector: productSelector.img},
            name: {Locator: page.locator(productSelector.name), selector: productSelector.name},
            desc: {Locator: page.locator(productSelector.desc), selector: productSelector.desc},
            price: {Locator: page.locator(productSelector.price), selector: productSelector.price},
        }
    }

    // get URL(){
    //     return `${process.env.SAUCE_DEMO_URL || 'https://www.saucedemo.com/'}${process.env.INVENTORY_URL || 'inventory.html'}`
    // }

    // get productTitle() {
    //     return this.page.getByText('Products', {exact: true});
    // }

    // get inventory(){
    //     return {
    //         list: this.page.locator('.inventory_list'),
    //         item: this.page.locator('.inventory_item'),
    //         image: this.page.locator('.inventory_item_img'),
    //         itemName: this.page.locator('.inventory_item_name '),
    //         itemDescription: this.page.locator('.inventory_item_desc'),
    //         itemPrice: this.page.locator('.inventory_item_price'),
    //         addToCart: this.page.getByRole('button', {name: 'Add to cart', exact: true}),
    //     }
    // }

    // get filter(){
    //     return this.page.locator('.product_sort_container')
    // }

    // get cart(){
    //     return {
    //         icon: this.page.locator('.shopping_cart_link'),
    //         badge: this.page.locator('.shopping_cart_badge'),
    //     }
    // }

    // get burgerMenu(){
    //     return {
    //         menu: this.page.getByRole('button', {name: 'Open Menu', exact: true}),
    //         allItems: this.page.locator('#inventory_sidebar_link'),
    //         aboutItems: this.page.locator('#about_sidebar_link'),
    //         logout: this.page.locator('#logout_sidebar_link'),
    //         resetAppState: this.page.locator('#reset_sidebar_link', {hasText: 'Reset App State'}),
    //     }
    // }

    async selectFilter(option: string){
        
        const filter = this.filter.Locator;

        let selectedLabel = ''
        let selectedValue = ''

        for (const key in filterOptions) {
            console.log(`Checking filter option: ${key}`);
            const {label, value} = filterOptions[key];
            if (option === label || option === value) {
                selectedLabel = label;
                selectedValue = value;
                console.log(`Matched filter option: ${selectedLabel} (${selectedValue})`);
                break;
            }
        }

        if (!selectedValue) {
            throw new Error(`Invalid filter option: ${option}. 
            Available options are: ${Object.keys(filterOptions).map(key => filterOptions[key].label).join(', ')}`);
        } 


        await filter.waitFor({state: 'visible'});
        await filter.click();
        await filter.selectOption(option);

         

        console.log(`Filter selected: ${selectedLabel} (${selectedValue})`);

        // get the number of items in the inventory after filtering
        const count = await this.inventory.item.Locator.count();
        console.log(`Total items in inventory after filtering: ${count}`);

        const filteredItems: { name: string, price: number }[] = [];

        // loop through each item and build an array of item names
        for (let i = 0; i < count; i++) {
            const itemLocator = this.inventory.item.Locator.nth(i);
            const itemName = await itemLocator.locator(this.inventory.itemName.selector).textContent();
            const itemPrice = await itemLocator.locator(this.inventory.itemPrice.selector).textContent();
            console.log(`Item ${i + 1}: ${itemName} - Price: ${itemPrice}`);

            const name = itemName?.trim() || '';
            const price = parseFloat(itemPrice?.replace(/[$,]/g, '') || '0');

            if (name && !isNaN(price)) {
                filteredItems.push({ name, price });
            }
        }

        console.log(`Filtered items: ${JSON.stringify(filteredItems)}`);

        const sortedItems = [...filteredItems];

        if (selectedValue === 'az') {
            sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        } else if (selectedValue === 'za') {
            sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        } else if (selectedValue === 'lohi') {
            sortedItems.sort((a, b) => a.price - b.price);
        } else if (selectedValue === 'hilo') {  
            sortedItems.sort((a, b) => b.price - a.price);
        }

        const isSortedCorrectly = filteredItems.every((item, index) =>
        item.name === sortedItems[index].name && item.price === sortedItems[index].price
    );

        if (isSortedCorrectly) {
            console.log(`Items are sorted correctly by "${selectedLabel}"`);
        } else {
            console.warn(`⚠️ Items are NOT sorted correctly by "${selectedLabel}"`);
            console.table({expected: sortedItems, actual: filteredItems});
        }

        return filteredItems;
    }

    async addToCart(...names: string[]): Promise<number>{
        // count first the number of items in the inventory
        console.log(`addToCart called with names: ${names} - ${names.length} items to add`);
        const count = await this.inventory.item.Locator.count();
        console.log(`Total items in inventory: ${count}`);
        
        // initialize the number of items in the cart
        let cartBadgeCount = 0;

         // Create a Set for better lookup and to track remaining items
        const namesToAdd = new Set(names.map(name => name.trim()));

        // loop through the count and validate each name from parameter
        for (let i = 0; i < count; i++) {
            const itemLocator = this.inventory.item.Locator.nth(i);
            const itemName = await itemLocator.locator(this.inventory.itemName.selector).textContent();
            const trimmedName = itemName?.trim();
            
            console.log(`Item ${i + 1}: ${trimmedName}`);

            const button = itemLocator.locator(this.inventory.button.selector);

            if (trimmedName && namesToAdd.has(trimmedName)) {
                await button.click();
                await this.cart.badge.Locator.waitFor(); // wait for the cart badge to be updated
                console.log(`Added to cart: ${trimmedName}`);

                cartBadgeCount++; // increment the cart badge count if an item is added
                namesToAdd.delete(trimmedName); // remove the item from the set
                
                // If all items have been added, we can break early
                if (namesToAdd.size === 0) {
                    console.log(`All specified items have been added to the cart.`);
                    break;
                }
            } else {
                console.log(`Item not found or not in the list: ${trimmedName}`);
            }
        }
        const badgeText = await this.cart.badge.Locator.textContent();
        console.log(`Cart badge shows: ${badgeText}`);
        // return the number of items added to the cart
        return cartBadgeCount;
    }

    async removeFromCart(...names: string[]): Promise<number> {
        // count first the number of items in the inventory
        console.log(`removeFromCart called with names: ${names} - ${names.length} items to remove`);
        const count = await this.inventory.item.Locator.count();
        console.log(`Total items in inventory: ${count}`);

        // initialize the number of items removed from the cart
        let removedCount = 0;

        // Create a Set for better lookup and to track remaining items
        const namesToRemove = new Set(names.map(name => name.trim()));

        // loop through the count and validate each name from parameter
        for (let i = 0; i < count; i++) {
            const itemLocator = this.inventory.item.Locator.nth(i);
            const itemName = await itemLocator.locator(this.inventory.itemName.selector).textContent();
            const trimmedName = itemName?.trim();

            console.log(`Item ${i + 1}: ${trimmedName}`);

            const button = itemLocator.locator(this.inventory.button.selector);
            const buttonText = await button.textContent();


            if (trimmedName && namesToRemove.has(trimmedName)) {
                
                    console.log(`buttonText: ${buttonText}`);
                    await button.click({delay: 100, force: true});
                    await this.page.waitForTimeout(200); // small delay to let UI update
                    console.log(`buttonText: ${buttonText} - clicked`);
                    
                    const updatedText = await button.textContent();

                    if (updatedText && updatedText.includes('Add')) {
                        console.log(`Removed from cart: ${trimmedName}`);
                        removedCount++;
                        namesToRemove.delete(trimmedName);
                    }
                    else {
                        console.warn(`⚠️ Button for "${trimmedName}" did not update to 'Add'. Possibly due to broken user.`);
                        // optionally add to an error log array if you want to report this later
                        namesToRemove.delete(trimmedName); // skip it to avoid infinite loop
                    }
                    
                    // If all items have been removed, we can break early
                    if (namesToRemove.size === 0) {
                        console.log(`All specified items have been removed from the cart.`);
                        break;
                    }
            } else {
                console.log(`Item not found or not in the list: ${trimmedName}`);
            }
        }

        console.log(`Total items removed from cart: ${removedCount}`);
        // return the number of items removed from the cart
        return removedCount;
    }

    async accessItemDetails(targetName: string): Promise<string> {
        console.log(`Accessing details for item: ${targetName}`);
        const itemLocator = this.inventory.itemName.Locator.filter({ hasText: new RegExp(targetName, 'i')});
        if (await itemLocator.count() === 0) {
            throw new Error(`Item with name "${targetName}" not found in inventory.`);
        }

        await itemLocator.first().waitFor({ state: 'visible' });
        const itemName = await itemLocator.first().textContent();
        await itemLocator.first().click();
        console.log(`Clicked on item: ${targetName}`);

        console.log(`Item details accessed for: ${itemName}`);
        return itemName?.trim() || '';
    }

    async getProductURL(): Promise<number | null> {
        const currentURL = this.page.url(); //get full URL
        const match = currentURL.match(/id=(\d+)/); //extract the number after id

        if (match && match[1]) {
            return parseInt(match[1], 10); // convert to number and return
        }

        console.warn('❌ No product ID found in URL:', currentURL);
        return null;
    }
}