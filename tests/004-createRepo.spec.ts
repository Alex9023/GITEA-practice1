import test, { expect } from "@playwright/test";
import path from "path";
import fs from "fs";
import BaseMethods from "../pom/BaseMethods";
import Repo from "../pom/Repo";
import { faker } from "@faker-js/faker";

const filePath = path.resolve(__dirname, "../test-data.json");
const testUser = JSON.parse(fs.readFileSync(filePath, "utf-8").trim());
test.describe("Create a New Repo", () => {
  let base: BaseMethods;
  let repo: Repo;
  let repoName: string;

  test.beforeEach(async ({ page }) => {
    base = new BaseMethods(page);
    repo = new Repo(page);
    repoName = faker.string.uuid();
  });

  test("Create a New Repo only with required fields", async ({ page }) => {
    page.goto("/");
    repo.clickMenuCreateBtn();
    repo.clickNewRepoBtn();
    await expect(page).toHaveURL("/repo/create");
    base.enterField(repo.repoNameInput, repoName);
    repo.clickCreateRepoBtn();
    await expect(page).toHaveURL(`${testUser.userName}/${repoName}`);
  });
});
