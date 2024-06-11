import { expect, test } from "@playwright/test";

test("should navigate to homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(
    "aVToolz • Fast, beautiful and modern tools for everyone."
  );
});

test("should navigate to tools page", async ({ page }) => {
  await page.goto("/tools");
  await expect(page).toHaveTitle("Tools • aVToolz");
});

// TODO: breadcrumbs navigation check
