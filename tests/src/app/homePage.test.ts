import { expect, Page, test } from "@playwright/test";

test.describe("Hero section tests", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/");
  });

  test("Verify that the Hero section is rendered correctly and is interactive", async () => {
    await expect(page).toHaveTitle(
      "aVToolz • Fast, beautiful and modern tools for everyone."
    );

    await expect(page.getByRole("main").getByRole("img")).toBeVisible();

    await page.getByRole("heading", { name: "Your Online" }).click();
    await expect(
      page.getByRole("heading", { name: "Your Online" })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Utitlity Toolbox" })
    ).toBeVisible();
    await page
      .getByRole("heading", { name: "Fast, beautiful and modern" })
      .click();
    await expect(
      page.getByRole("heading", {
        name: "Fast, beautiful and modern tools for everyone.",
      })
    ).toBeVisible();

    await page.getByRole("button", { name: "Browse All" }).click();
    await page.waitForURL("/tools");
  });
});
