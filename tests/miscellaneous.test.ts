import { expect, test } from "@playwright/test";

test.describe("theme toggle", () => {
  test("light mode working?", async ({ page }) => {
    await page.goto("/");
    // await page
    //   .locator("ul")
    //   .filter({ hasText: "RoadmapReport Bugs Quick" })
    //   .getByLabel("Switch to light mode")
    //   .getByRole("link")
    //   .click();
    // page.getByRole("link", { name: "Switch to light mode" }).click();

    await page
      .locator("ul")
      .filter({ hasText: "RoadmapReport Bugs Quick" })
      .locator("#theme-toggle")
      .click();
    await expect(page.locator("html")).toHaveClass("enableSystem light");
    await page.reload();
    await expect(page.locator("html")).toHaveClass("light");
  });

  test("dark mode working?", async ({ page }) => {
    await page.goto("/");
    await page
      .locator("ul")
      .filter({ hasText: "RoadmapReport Bugs Quick" })
      .locator("#theme-toggle")
      .click();
    await page
      .locator("ul")
      .filter({ hasText: "RoadmapReport Bugs Quick" })
      .locator("#theme-toggle")
      .click();
    await expect(page.locator("html")).toHaveClass("enableSystem dark");
    await page.reload();

    await expect(page.locator("html")).toHaveClass("dark");
  });
});

// TODO: add test for search spotlight
