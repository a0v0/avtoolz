import { expect, test } from "@playwright/test";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
import { rimraf } from "rimraf";

const pdfFiles = [
  "./tests/fixtures/timg1.jpg",
  "./tests/fixtures/timg2.jpeg",
  "./tests/fixtures/timg3.jpeg",
  "./tests/fixtures/timg4.jpg",
];

test.describe("image to pdf tools working check", () => {
  const tempTestDir = path.join("temp", randomUUID());
  var PDF_FILE_PATH = "";

  test.beforeAll("Setup", async ({ browser }) => {
    fs.mkdirSync(tempTestDir, { recursive: true });
    const page = await browser.newPage();
    await page.goto("/tools/image-to-pdf");
    await page.locator("#fileInput").setInputFiles(pdfFiles);
    // Convert and download file to temp dir
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Convert to PDF" }).click();
    const download = await downloadPromise;
    const filePath = path.join(
      __dirname,
      tempTestDir,
      download.suggestedFilename()
    );
    await download.saveAs(filePath);
    PDF_FILE_PATH = filePath;
  });

  test.afterAll("Teardown", async () => {
    await rimraf(path.join(__dirname, tempTestDir), {});
  });

  test("check if page count is same as that of no. of input images", async ({}) => {
    const uint8Array = fs.readFileSync(PDF_FILE_PATH);
    const pdfDoc = await PDFDocument.load(uint8Array);
    const totalPages = pdfDoc.getPageCount();
    expect(totalPages).toBe(pdfFiles.length);
    console.log("teardown");
  });

  test("check file size is not more than the sum of size of input images", async ({}) => {
    var totalSize = 0;
    var pdfSize = fs.statSync(PDF_FILE_PATH).size;

    // Get total size of input images
    pdfFiles.forEach((imagePath) => {
      var stats = fs.statSync(imagePath);
      totalSize += stats.size;
    });

    // convert to MB
    totalSize /= 1024 * 1024;
    pdfSize /= 1024 * 1024;

    expect(pdfSize).not.toBe(0);
    expect(pdfSize).toBeCloseTo(totalSize);
  });
});
