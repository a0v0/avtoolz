// TODO: write test to cehk if the page lists all the tools

import { expect, test } from "@playwright/test";

test("test breadcrumb loaded properly", async ({ page }) => {
  await page.goto("/tools");

  expect(
    page.locator("#app-container > main > nav > ol > li:nth-child(2)")
  ).toContainText("Tools");
});
