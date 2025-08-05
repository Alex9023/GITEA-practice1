import { Locator } from "@playwright/test";
import BasePage from "./BasePage";

export default class SignIn extends BasePage {
  readonly userName: Locator = this.page.locator("#user_name");
  readonly password: Locator = this.page.locator("#password");
  readonly signInButton: Locator = this.page.getByRole("button", {
    name: "Sign In",
  });
  
  readonly errorMessages = {
    invalidCredentials: 'Username or password is incorrect.'
  }

  async clickSignInButton() {
    await this.signInButton.click()
  }

}
