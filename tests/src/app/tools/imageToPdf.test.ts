import { expect, test } from "@playwright/test";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";

import { rimraf } from "rimraf";
import { getImagesFromPDF } from "../../../helpers/pdfToImage";
const testFiles = [
  "./tests/fixtures/timg1.jpg",
  "./tests/fixtures/timg2.jpeg",
  "./tests/fixtures/timg3.jpeg",
  "./tests/fixtures/timg4.jpg",
];

test.describe("test if", () => {
  const tempTestDir = path.join("temp", randomUUID());
  var normalPDFPath = "";
  let rearrangedPDFPath = "";

  test.beforeAll("Setup", async ({ browser }) => {
    fs.mkdirSync(tempTestDir, { recursive: true });
    const page = await browser.newPage();
    await page.goto("/tools/image-to-pdf");
    await page.locator("#fileInput").setInputFiles(testFiles);
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
    await page.locator("#fileInput").setInputFiles(testFiles);
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
    console.log(rearrangedPDFPath);
  });

  test.afterAll("Teardown", async () => {
    await rimraf(path.join(__dirname, tempTestDir), {});
  });

  test("page count is same as that of no. of input images", async () => {
    const doc = await PDFDocument.load(
      new Uint8Array(fs.readFileSync(normalPDFPath))
    );
    expect(doc.getPageCount()).toBe(testFiles.length);
  });

  test("pages in pdf are in correct order after rearranging", async () => {
    let normalPDF = await getImagesFromPDF(normalPDFPath);
    let rearrangedPDF = await getImagesFromPDF(rearrangedPDFPath);
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
