import { test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://avtoolz.com/");
  await page.getByRole("link", { name: "All Tools" }).click();
});
