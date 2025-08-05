import { Locator } from "@playwright/test";
import {test, expect} from "@playwright/test";
import BasePage from "./BasePage";

export default class BaseMethods extends BasePage {
    readonly authorizedUser: Locator = this.page.locator('[class="text"] [class="gt-ellipsis"]')
     readonly errorMessage: Locator = this.page.locator('[class*="flash-error"] p')
     
  async enterField(field: Locator, fieldData: string) {
    await field.fill(fieldData);
  }

  async clearField(field: Locator) {
    await field.clear();
  }

      async isAuthorizedUserShown(userName: string) {
          await expect(this.authorizedUser).toHaveText(userName)
          await expect(this.authorizedUser).toBeVisible()
      }

          async isErrorMessageShown(error: string) {
        await expect(this.errorMessage).toBeVisible()
        await expect(this.errorMessage).toHaveText(error)
    }
}
