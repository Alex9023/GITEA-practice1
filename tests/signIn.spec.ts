import test from "@playwright/test";
import BaseMethods from "../pom/BaseMethods";
import SignIn from "../pom/SignIn";
import fs from "fs";
import path from "path";

const filePath = path.resolve(__dirname, "../testUser-data.json");
const testUser = JSON.parse(fs.readFileSync(filePath, "utf-8").trim());

test.describe("Sign In", async () => {
  let signIn: SignIn;
  let base: BaseMethods;

  test.beforeEach(async ({ page }) => {
    signIn = new SignIn(page);
    base = new BaseMethods(page);
  });

  test("Positive - Success Sign In", async ({ page }) => {
    await page.goto("/");
    await page.getByText("Sign In").click();
    await base.enterField(signIn.userName, testUser.userName);
    await base.enterField(signIn.password, testUser.password);
    await signIn.clickSignInButton();
    await base.isAuthorizedUserShown(testUser.userName);
  });

  test("Negative - Denied Sign In with invalid credentials", async ({
    page,
  }) => {
    await page.goto("/user/login");
    await base.enterField(signIn.userName, testUser.userName);
    await base.enterField(signIn.password, "notValidPassword");
    await signIn.clickSignInButton();
    await base.isErrorMessageShown(signIn.errorMessages.invalidCredentials);
  });
});
