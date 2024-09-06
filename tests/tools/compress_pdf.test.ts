import { expect, test } from "@playwright/test";
import { randomUUID } from "crypto";
import fs, { statSync } from "fs";
import path from "path";
import { rimraf } from "rimraf";

const testFile = "./tests/fixtures/test1.pdf";

test("navigation check", async ({ page }) => {
  await page.goto("/tools/compress-pdf");
  await expect(page).toHaveTitle("Compress PDF • aVToolz");
});

test.describe("test if", () => {
  const tempTestDir = path.join("temp", randomUUID());
  var compressedPDF = "";

  test.beforeAll("Setup", async ({ browser }) => {
    fs.mkdirSync(tempTestDir, { recursive: true });
    const page = await browser.newPage();
    await page.goto("/tools/compress-pdf");
    await page.locator("#fileInput").setInputFiles(testFile);
    // cooldown to allow pdf to load
    await page.waitForTimeout(1000);
    let downloadPromise = page.waitForEvent("download");
    await page.locator("#btn-submit").click();
    let download = await downloadPromise;
    let filePath = path.join(__dirname, tempTestDir, "compressed.pdf");
    await download.saveAs(filePath);
    compressedPDF = filePath;
  });

  test.afterAll("Teardown", async () => {
    await rimraf(path.join(__dirname, tempTestDir), {});
  });

  test("size is less than original pdf", async () => {
    const compressedPDFSize = statSync(compressedPDF).size;
    const originalPDFSize = statSync(testFile).size;

    expect(compressedPDFSize).toBeLessThan(originalPDFSize);
  });
});
