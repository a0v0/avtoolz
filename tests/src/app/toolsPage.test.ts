import { getToolsByCategory, ToolCategory } from "@/config/tools";
import { expect, Page, test } from "@playwright/test";

test.describe("Tools Page Tests", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/tools");
  });

  test("should load the tools page with correct title", async () => {
    await expect(page).toHaveTitle("Tools • aVToolz");
  });

  test.describe("Breadcrumbs Tests", () => {
    test("should display correct breadcrumb text", async () => {
      const element = page.locator(
        "#breadcrumb > ol > li:nth-child(2) > span > p"
      );
      await expect(element).toContainText("Tools");
    });
  });

  test.describe("PDF Tools Tests", () => {
    test("all the pdf tools are listed", async () => {
      const tools = await page.locator("#pdf-tools_tools > a").all();
      const expectedPdfToolsCount = getToolsByCategory(ToolCategory.PDF).length;

      expect(tools.length).toBe(expectedPdfToolsCount);
    });
  });

  test.afterAll(async () => {
    await page.close();
  });
});
