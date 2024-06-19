import { expect, test } from "@playwright/test";

test.describe("theme toggle", () => {
  test("light mode working?", async ({ page }) => {
    await page.goto("/");
    await page
      .locator("ul")
      .filter({ hasText: "RoadmapReport Bugs Quick" })
      .getByLabel("Switch to light mode")
      .getByRole("link")
      .click();
    await expect(page.locator("html")).toHaveAttribute("class", "light");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("class", "light");
  });

  test("dark mode working?", async ({ page }) => {
    await page.goto("/");
    // default theme is dark so first switch to light
    await page
      .locator("ul")
      .filter({ hasText: "RoadmapReport Bugs Quick" })
      .getByLabel("Switch to light mode")
      .getByRole("link")
      .click();
    await page
      .locator("ul")
      .filter({ hasText: "RoadmapReport Bugs Quick" })
      .getByLabel("Switch to dark mode")
      .getByRole("link")
      .click();
    await expect(page.locator("html")).toHaveAttribute("class", "dark");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("class", "dark");
  });
});

// TODO: add test for search spotlight
