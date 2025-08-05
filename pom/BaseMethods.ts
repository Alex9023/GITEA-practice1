import { Locator } from "@playwright/test";
import {test, expect} from "@playwright/test";
import BasePage from "./BasePage";

export default class BaseMethods extends BasePage {
    readonly authorizedUser: Locator = this.page.locator('[class="text"] [class="gt-ellipsis"]')
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
}
