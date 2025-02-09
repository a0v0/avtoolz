import { getToolsByCategory, ToolCategory } from "@/config/tools";
import { expect, test } from "@playwright/test";

test.describe("check if", () => {
  test("page properly loaded", async ({ page }) => {
    await page.goto("/tools");
    await expect(page).toHaveTitle("Tools • aVToolz");
  });

  test("breadcrumbs loaded properly", async ({ page }) => {
    await page.goto("/tools");
    const element = page.locator(
      "#breadcrumb > ol > li:nth-child(2) > span > p"
    );
    await expect(element).toContainText("Tools");
  });

  test("all the pdf tools are listed", async ({ page }) => {
    await page.goto("/tools");
    const tools = await page.locator("#pdf-tools_tools > a").all();
    const totalPdfTools = getToolsByCategory(ToolCategory.PDF).length;

    expect(tools.length).toBe(totalPdfTools);
  });
});
