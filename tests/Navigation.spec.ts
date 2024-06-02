import { expect, test } from "@playwright/test";

test("should navigate to homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Browse All")).toBeVisible();
});
