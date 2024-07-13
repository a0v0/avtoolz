import { expect, test } from "@playwright/test";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
import { exit } from "process";
import { rimraf } from "rimraf";
import { pdfToImages } from "tests/utils/pdf";

const imageFiles = [
  "./tests/fixtures/timg1.jpg",
  "./tests/fixtures/timg2.jpeg",
  "./tests/fixtures/timg3.jpeg",
  "./tests/fixtures/timg4.jpg",
];
test("should navigate to the page properly", async ({ page }) => {
  await page.goto("/tools/image-to-pdf");
  await expect(page).toHaveTitle("Image to PDF • aVToolz");
});

test.describe("image to pdf check if", () => {
  const tempTestDir = path.join("temp", randomUUID());
  var normalPDFPath = "";
  let rearrangedPDFPath = "";

  test.beforeAll("Setup", async ({ browser }) => {
    fs.mkdirSync(tempTestDir, { recursive: true });
    const page = await browser.newPage();
    await page.goto("/tools/image-to-pdf");
    await page.locator("#fileInput").setInputFiles(imageFiles);
    // sleep for 1 second to allow images to load
    await page.waitForTimeout(1000);
    let downloadPromise = page.waitForEvent("download");
    await page.locator("#btn-submit").click();
    let download = await downloadPromise;
    let filePath = path.join(__dirname, tempTestDir, "normal.pdf");
    await download.saveAs(filePath);
    normalPDFPath = filePath;

    // generate pdf with rearranged pdf pages
    fs.mkdirSync(tempTestDir, { recursive: true });
    await page.reload();
    await page.locator("#fileInput").setInputFiles(imageFiles);
    // sleep for 1 second to allow images to load
    await page.waitForTimeout(1000);
    // change order of images: 1st to 2nd place and 4th to 3rd place
    await page.locator('[id="shift-right-timg1.jpg"]').click();
    await page.locator('[id="shift-left-timg4.jpg"]').click();
    downloadPromise = page.waitForEvent("download");
    await page.locator("#btn-submit").click();
    download = await downloadPromise;
    filePath = path.join(__dirname, tempTestDir, "rearranged.pdf");
    await download.saveAs(filePath);
    rearrangedPDFPath = filePath;
  });

  test.afterAll("Teardown", async () => {
    await rimraf(path.join(__dirname, tempTestDir), {});
  });

  test("page count is same as that of no. of input images", async ({}) => {
    try {
      const doc = await PDFDocument.load(
        new Uint8Array(fs.readFileSync(normalPDFPath))
      );
      expect(doc.getPageCount()).toBe(imageFiles.length);
    } catch (reason) {
      console.log(reason);
      exit(1);
    }
  });

  // test("file size is not more than the sum of size of input images", async ({}) => {
  //   var totalSize = 0;
  //   var pdfSize = fs.statSync(normalPDFPath).size;

  //   // Get total size of input images
  //   imageFiles.forEach((imagePath) => {
  //     var stats = fs.statSync(imagePath);
  //     totalSize += stats.size;
  //   });

  //   // convert to MB
  //   totalSize /= 1024 * 1024;
  //   pdfSize /= 1024 * 1024;

  //   expect(pdfSize).not.toBe(0);
  //   expect(pdfSize).toBeCloseTo(totalSize);
  // });

  test("check if pages in pdf are in correct order after rearranging", async () => {
    // parse and check if images are in correct order
    let normalPDF = await pdfToImages(normalPDFPath);
    let rearrangedPDF = await pdfToImages(rearrangedPDFPath);
    expect(normalPDF).toHaveLength(4);
    expect(rearrangedPDF).toHaveLength(4);
    expect(normalPDF).toEqual([
      rearrangedPDF[1],
      rearrangedPDF[0],
      rearrangedPDF[3],
      rearrangedPDF[2],
    ]);
  });
});
