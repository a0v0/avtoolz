import { expect, test } from "@playwright/test";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { rimraf } from "rimraf";
const { pdf } = await import("pdf-to-img");

const testFiles = [
  "./tests/fixtures/test1.pdf",
  "./tests/fixtures/test2.pdf",
  "./tests/fixtures/test3.pdf",
];

test.describe("page count and file size check", () => {
  const tempTestDir = path.join("temp", randomUUID());
  let normalPDFPath = "";
  let rearrangedPDFPath = "";

  test.beforeAll("Setup", async ({ browser }) => {
    fs.mkdirSync(tempTestDir, { recursive: true });
    const page = await browser.newPage();
    await page.goto("/tools/merge-pdf");
    await page.locator("#fileInput").setInputFiles(testFiles);
    let downloadPromise = page.waitForEvent("download");
    await page.locator("#btn-submit").click();
    let download = await downloadPromise;
    let filePath = path.join(__dirname, tempTestDir, "normal.pdf");
    await download.saveAs(filePath);
    normalPDFPath = filePath;

    // generate pdf with rearranged pdf pages
    fs.mkdirSync(tempTestDir, { recursive: true });
    await page.reload();
    await page.locator("#fileInput").setInputFiles(testFiles);
    // change order of images: 1st pdf to last
    await page.locator('[id="shift-right-test1.pdf"]').click();
    await page.locator('[id="shift-right-test1.pdf"]').click();
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

  test("check page count of merged pdf", async ({}) => {
    // total pages in input pdf files
    let tpInPDFs = 0;
    testFiles.forEach(async (pdfFile) => {
      const ogPDF = await pdf(pdfFile, { scale: 1 });
      tpInPDFs += ogPDF.length;
    });

    // total pages in merged pdf
    const mergedPDF = await pdf(normalPDFPath, { scale: 1 });
    let tpInMergedPDF = mergedPDF.length;

    expect(tpInMergedPDF).not.toBe(0);
    expect(tpInMergedPDF).toEqual(tpInPDFs);
  });

  test("check file size of merged pdf", async ({}) => {
    var pdfSize = fs.statSync(normalPDFPath).size;

    // Get total size of input images
    var totalSize = 0;
    testFiles.forEach((pdf) => {
      var stats = fs.statSync(pdf);
      totalSize += stats.size;
    });

    // convert to MB
    totalSize /= 1024 * 1024;
    pdfSize /= 1024 * 1024;
    expect(pdfSize).not.toBe(0);
    console.log(pdfSize, totalSize);
    expect(pdfSize).toBeCloseTo(totalSize, 1);
  });
});
