import { test } from "@playwright/test";

test.describe("theme toggle check", () => {
  test("dark mode should be set properly", async ({ page }) => {
    // TODO: Add dark mode test
    await page.goto("/");
    // find theme toggle button
    // click theme toggle button
    await page.locator("#app-container > main > section > main > a").click();
    // await expect(page).toHaveAttribute("data-theme", "dark");
    // check if dark mode is set
    // refresh page
    // check if dark mode persists
  });

  test("light mode should be set properly", async ({ page }) => {
    // TODO: Add light mode tests
  });
});
