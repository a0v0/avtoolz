import { expect, test } from "@playwright/test";

test("should navigate to homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(
    "aVToolz • Fast, beautiful and modern tools for everyone."
  );
});

test("Verify that the Hero section is rendered correctly and is interactive", async ({
  page,
}) => {
  await page.goto("/");

  // hero logo
  expect(
    page.getByRole("main").getByRole("img", { name: "avtoolz logo" })
  ).toBeVisible();
  await page.getByRole("heading", { name: "Your Online" }).click();
  expect(page.getByRole("heading", { name: "Your Online" })).toBeVisible();

  expect(page.getByRole("heading", { name: "Utitlity Toolbox" })).toBeVisible();
  await page
    .getByRole("heading", { name: "Fast, beautiful and modern" })
    .click();
  expect(
    page.getByRole("heading", {
      name: "Fast, beautiful and modern tools for everyone.",
    })
  ).toBeVisible();
  await page.getByRole("button", { name: "Browse All" }).click();
  await page.waitForURL("/tools");
});
