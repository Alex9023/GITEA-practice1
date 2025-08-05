import test, { expect } from "@playwright/test";

test('Install Gitea with basic settings', async({page}) => {
    await page.goto('')
    await page.getByRole('button', {name: 'Install Gitea'}).click()
    await expect(page.locator('div[aria-label="Sign In"]')).toBeVisible({timeout: 30000})
})