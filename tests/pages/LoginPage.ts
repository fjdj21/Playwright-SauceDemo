import {Page, Locator} from '@playwright/test'
import {BasePage} from './BasePage'

export class LoginPage extends BasePage {

    readonly logo: Locator
    readonly username: Locator
    readonly password: Locator
    readonly loginButton: Locator
    readonly username_errorIcon: Locator
    readonly password_errorIcon: Locator
    readonly errorMessage: Locator 
    readonly errorMessage_close: Locator

    readonly errors: {
        lockedOutError: string,
        invalidUserError: string,
    }

    constructor(page: Page){
        super(page);
        this.logo = page.locator('div.login_logo');
        this.username = page.getByRole('textbox', {name: 'Username'});
        this.password = page.getByRole('textbox', {name: 'Password'});
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.username_errorIcon = page.locator('input[name="user-name"] + svg.error_icon');
        this.password_errorIcon = page.locator('input[name="password"] + svg.error_icon');
        this.errorMessage = page.locator('h3[data-test="error"]');
        this.errorMessage_close = page.locator('svg.fa-w-11');

        this.errors = {
            lockedOutError: 'Epic sadface: Sorry, this user has been locked out.',
            invalidUserError: 'Epic sadface: Username and password do not match any user in this service'
        }
        
    }

    // get locators(){
    // return {
    //     logo : this.page.locator('div.login_logo'),
    //     username : this.page.getByRole('textbox', {name: 'Username'}),
    //     password : this.page.getByRole('textbox', {name: 'Password'}),
    //     loginButton : this.page.getByRole('button', {name: 'Login'}),
    //     username_errorIcon : this.page.locator('input[name="user-name"] + svg.error_icon'),
    //     password_errorIcon : this.page.locator('input[name="password"] + svg.error_icon'),
    //     errorMessage : this.page.locator('h3[data-test="error"]'),
    //     errorMessage_close : this.page.locator('svg.fa-w-11')
    //     }
    // }
    // get errors(){
    //         return {
    //             lockedOutError: 'Epic sadface: Sorry, this user has been locked out.',
    //             invalidUserError: 'Epic sadface: Username and password do not match any user in this service'
    //         }
    // }

    async login(username: string, password: string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        console.log(`Logging in with user: ${username}`);
    }

    async loginStandardUser(){
        await this.login(
            process.env.STANDARD_USER || '',
            process.env.VALID_PASSWORD || '')
    }

    async loginLockedOutUser(){
        await this.login(
            process.env.LOCKED_OUT_USER || '',
            process.env.VALID_PASSWORD || ''
        )
    }

    async loginProblemUser(){
        await this.login(
            process.env.PROBLEM_USER || '',
            process.env.VALID_PASSWORD || ''
        )
    }

    async loginPerformanceGlitchUser(){
        await this.login(
            process.env.PERFORMANCE_GLITCH_USER || '',
            process.env.VALID_PASSWORD || ''
        )
    }

    async loginErrorUser(){
        await this.login(
            process.env.ERROR_USER || '',
            process.env.VALID_PASSWORD || ''
        )
    }

    async loginVisualUser(){
        await this.login(
            process.env.VISUAL_USER || '',
            process.env.VALID_PASSWORD || ''
        )
    }


    async loginInvalidUser(){
        await this.login(
            process.env.INVALID_USER || '',
            process.env.INVALID_PASSWORD || ''
        )
    }
    

}