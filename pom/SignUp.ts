import { expect, Locator } from "@playwright/test";
import BasePage from "./BasePage";

export default class SignUp extends BasePage {
    readonly userName: Locator = this.page.locator('#user_name')
    readonly email: Locator = this.page.locator('#email')
    readonly password: Locator = this.page.locator('#password')
    readonly retypePassword: Locator = this.page.locator('#retype')
    readonly registerAccount: Locator = this.page.getByRole('button', {name: 'Register Account'})
    readonly successSignUpMessage: Locator = this.page.locator('[class*="flash-succes"] p')
    readonly errorMessage: Locator = this.page.locator('[class*="flash-error"] p')
    readonly authorizedUser: Locator = this.page.locator('[class="text"] [class="gt-ellipsis"]')
    readonly successMessages = {
        successSignUp: 'Account was successfully created. Welcome!'
    }
    readonly errorMessages = {
        notMatchedPasswords: 'The passwords do not match.',
        emptyField: 'Please fill out this field.'
    }

    
    async openPage () {
        await this.page.goto('/user/sign_up')
    }

    async enterField(field: Locator, fieldData: string) {
        await field.fill(fieldData)
    }

    async clearField(field: Locator) {
        await field.clear()
    }

    async isFieldErrorExist(field: Locator, error: string) {
        await expect(field).toHaveJSProperty('validity.valid', false)
        await expect(field).toHaveJSProperty('validationMessage', error)
    }

    async clickRegisterAccount() {
        await this.registerAccount.click()
    }

    async isSuccessSignUpMessageShown() {
        await expect(this.successSignUpMessage).toBeVisible()
        await expect(this.successSignUpMessage).toHaveText(this.successMessages.successSignUp)
    }

    // async isErrorMessageShown(error: string) {
    //     await expect(this.errorMessage).toBeVisible()
    //     await expect(this.errorMessage).toHaveText(error)
    // }

    async isAuthorizedUserShown(userName: string) {
        await expect(this.authorizedUser).toHaveText(userName)
        await expect(this.authorizedUser).toBeVisible()
    }
}