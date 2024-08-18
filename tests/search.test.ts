import { expect, test } from "@playwright/test";

test("when clicked on spotlight icon, should open search panel", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Quick search").click();

  await expect(page.getByLabel("Quick search Modal")).toBeVisible();
});

test("a searched item when clicked, should navigate to proper destination", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Quick search").click();

  await page.getByPlaceholder("Search tools").click();
  await page.getByPlaceholder("Search tools").fill("Image to PDF");
  await page.getByRole("option", { name: "Image to PDF" }).click();

  await page.waitForURL("tools/image-to-pdf");
  expect(page.url()).toContain("tools/image-to-pdf");

  await expect(
    page.getByRole("heading", { name: "Image to PDF" })
  ).toBeVisible();
});

test("after searching an item, the item should remain in search history", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByLabel("Quick search").click();
  await page.getByPlaceholder("Search tools").click();
  await page.getByPlaceholder("Search tools").fill("Image to PDF");
  await page.getByRole("option", { name: "Image to PDF" }).click();

  await expect(
    page.getByRole("option", { name: "Image to PDF" })
  ).toBeVisible();
});
