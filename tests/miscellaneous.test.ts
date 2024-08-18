import { expect, test } from "@playwright/test";

test.describe("theme toggle", () => {
  test("light mode working?", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "avatar" }).click();
    await page.getByLabel("Settings").click();
    await page.getByRole("tab", { name: "Appearance" }).click();

    // default theme mode is light so first switch to dark then back to light
    await page.getByRole("button", { name: "Dark" }).click();
    await page.getByRole("button", { name: "Light" }).click();

    await expect(page.locator("html")).toHaveClass("enableSystem light");
    await page.reload();
    await expect(page.locator("html")).toHaveClass("light");
  });

  test("dark mode working?", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "avatar" }).click();
    await page.getByLabel("Settings").click();
    await page.getByRole("tab", { name: "Appearance" }).click();

    await page.getByRole("button", { name: "Dark" }).click();

    await expect(page.locator("html")).toHaveClass("enableSystem dark");
    await page.reload();

    await expect(page.locator("html")).toHaveClass("dark");
  });
});
