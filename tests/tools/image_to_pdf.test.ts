// @ts-nocheck
import { expect, test } from "@playwright/test";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
import { rimraf } from "rimraf";
import { pdfToImages } from "tests/utils/pdf";

const pdfFiles = [
  "./tests/fixtures/timg1.jpg",
  "./tests/fixtures/timg2.jpeg",
  "./tests/fixtures/timg3.jpeg",
  "./tests/fixtures/timg4.jpg",
];

test.describe("image to pdf check if", () => {
  const tempTestDir = path.join("temp", randomUUID());
  var PDF_FILE_PATH = "";

  test.beforeAll("Setup", async ({ browser }) => {
    fs.mkdirSync(tempTestDir, { recursive: true });
    const page = await browser.newPage();
    await page.goto("/tools/image-to-pdf");
    await page.locator("#fileInput").setInputFiles(pdfFiles);

    // Change order of images: 1st to 2nd place and 4th to 3rd place
    await page.locator('[id="shift-right-timg1.jpg"]').click();
    await page.locator('[id="shift-left-timg4.jpg"]').click();

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

  test("page count is same as that of no. of input images", async ({}) => {
    const uint8Array = fs.readFileSync(PDF_FILE_PATH);
    const pdfDoc = await PDFDocument.load(uint8Array);
    const totalPages = pdfDoc.getPageCount();
    expect(totalPages).toBe(pdfFiles.length);
  });

  test("file size is not more than the sum of size of input images", async ({}) => {
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

test.describe("image to pdf check rearrange order", () => {
  const tempTestDir = path.join("temp", randomUUID());
  let intactPDFPath = "";
  let rearrangedPDFPath = "";

  test.afterAll("Teardown", async () => {
    await rimraf(path.join(__dirname, tempTestDir), {});
  });

  test("make sure all the pdf tools are listed", async ({ page }) => {
    // generate pdf with order intact
    fs.mkdirSync(tempTestDir, { recursive: true });
    await page.goto("/tools/image-to-pdf");
    await page.locator("#fileInput").setInputFiles(pdfFiles);
    let downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Convert to PDF" }).click();
    let download = await downloadPromise;
    let filePath = path.join(__dirname, tempTestDir, "intact.pdf");
    await download.saveAs(filePath);
    intactPDFPath = filePath;

    // generate pdf with rearranged pdf pages
    fs.mkdirSync(tempTestDir, { recursive: true });
    await page.reload();
    await page.locator("#fileInput").setInputFiles(pdfFiles);
    // change order of images: 1st to 2nd place and 4th to 3rd place
    await page.locator('[id="shift-right-timg1.jpg"]').click();
    await page.locator('[id="shift-left-timg4.jpg"]').click();
    downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Convert to PDF" }).click();
    download = await downloadPromise;
    filePath = path.join(__dirname, tempTestDir, "rearranged.pdf");
    await download.saveAs(filePath);
    rearrangedPDFPath = filePath;

    // parse and check if images are in correct order
    let intactPDFData = await pdfToImages(intactPDFPath);
    let rearrangedPDFData = await pdfToImages(rearrangedPDFPath);
    expect(intactPDFData).toHaveLength(4);
    expect(rearrangedPDFData).toHaveLength(4);
    expect(intactPDFData).toEqual([
      rearrangedPDFData[1],
      rearrangedPDFData[0],
      rearrangedPDFData[3],
      rearrangedPDFData[2],
    ]);
  });
});

// TODO: add test to check if images if rearranged are in correct order in pdf as well
