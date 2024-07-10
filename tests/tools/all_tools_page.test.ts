import { getToolsByCategory, ToolCategory } from "@/config/tools";
import { expect, test } from "@playwright/test";

test("should navigate to tools page", async ({ page }) => {
  await page.goto("/tools");
  await expect(page).toHaveTitle("Tools • aVToolz");
});

test("test breadcrumb loaded properly", async ({ page }) => {
  await page.goto("/tools");
  const element = await page.locator(
    "#breadcrumb > ol > li:nth-child(2) > span > p"
  );
  await expect(element).toContainText("Tools");
});

test.describe("test whether tools are listed properly", () => {
  test("make sure all the pdf tools are listed", async ({ page }) => {
    await page.goto("/tools");
    const tools = await page.locator("#pdf-tools_tools > a").all();
    const totalPdfTools = getToolsByCategory(ToolCategory.PDF).length;

    await expect(tools.length).toBe(totalPdfTools);
  });
});
