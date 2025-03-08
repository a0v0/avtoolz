import { getToolsByCategory, ToolCategory } from "@/config/tools";
import { expect, test } from "@playwright/test";

test.describe("Tools Page Tests", () => {
  test("should load the tools page with correct title", async ({ page }) => {
    await page.goto("/tools");
    await expect(page).toHaveTitle("Tools • aVToolz");
  });

  test.describe("Breadcrumbs Tests", () => {
    test("should display correct breadcrumb text", async ({ page }) => {
      await page.goto("/tools");
      const element = page.locator(
        "#breadcrumb > ol > li:nth-child(2) > span > p"
      );
      await expect(element).toContainText("Tools");
    });
  });

  test.describe("PDF Tools Tests", () => {
    test("all the pdf tools are listed", async ({ page }) => {
      await page.goto("/tools");
      const tools = await page.locator("#pdf-tools_tools > a").all();
      const expectedPdfToolsCount = getToolsByCategory(ToolCategory.PDF).length;

      expect(tools.length).toBe(expectedPdfToolsCount);
    });
  });
});
