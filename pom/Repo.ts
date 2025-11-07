import { Locator } from "@playwright/test";
import BasePage from "./BasePage";

export default class Repo extends BasePage {
  readonly menuCreateBtn: Locator = this.page.getByRole("menu", {
    name: "Create",
  });
  readonly newRepoBtn: Locator = this.page.getByRole("menuitem", {
    name: "New Repository",
  });
  readonly newMigrationBtn: Locator = this.page.getByRole("menuitem", {
    name: "New Migration",
  });
  readonly newOrganizationBtn: Locator = this.page.getByRole("menuitem", {
    name: "New Organization",
  });
  readonly repoNameInput: Locator = this.page.locator("#repo_name");
  readonly createRepoBtn: Locator = this.page.getByText("Create Repository");

  async clickMenuCreateBtn() {
    await this.menuCreateBtn.click();
  }

  async clickNewRepoBtn() {
    await this.newRepoBtn.click();
  }
  async clickNewMigrationBtn() {
    await this.newMigrationBtn.click();
  }
  async clickNewOrganizationBtn() {
    await this.newOrganizationBtn.click();
  }

  async clickCreateRepoBtn() {
    await this.createRepoBtn.click()
  } 
}
