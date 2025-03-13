import { expect, Page, test } from "@playwright/test";
test.describe("Search functionality tests", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/");
  });

  test("should navigate to the correct destination when a searched item is clicked", async () => {
    await page.getByLabel("Quick search").click();
    await page.getByPlaceholder("Search tools").click();
    await page.getByPlaceholder("Search tools").fill("Image to PDF");
    await page.getByRole("option", { name: "Image to PDF" }).click();

    await expect(
      page.getByRole("heading", { name: "Image to PDF" })
    ).toBeVisible({ timeout: 1 * 60 * 1000 });
  });

  test("should retain the searched item in search history", async () => {
    await page.getByLabel("Quick search").click();
    await page.getByPlaceholder("Search tools").click();
    await page.getByPlaceholder("Search tools").fill("Image to PDF");
    await page.getByRole("option", { name: "Image to PDF" }).click();

    await expect(
      page.getByRole("option", { name: "Image to PDF" })
    ).toBeVisible();
  });
});
