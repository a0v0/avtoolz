import { getToolsByCategory, ToolCategory } from "@/config/tools";
import { expect, test } from "@playwright/test";

test("Hero section rendered properly?", async ({ page }) => {
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

test("PDF Tools section rendered properly?", async ({ page }) => {
  await page.goto("/");

  // pdf tools section
  expect(page.getByRole("heading", { name: "# PDF Tools" })).toBeVisible();

  // get expected total number of pdf tools
  const totalPdfTools = getToolsByCategory(ToolCategory.PDF).length;

  // get all pdf tools from the page
  const pdfTools = await page.locator("#pdf-tools_tools > a").all();

  expect(pdfTools.length).toBe(totalPdfTools);
});
