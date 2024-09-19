import { expose } from "comlink";
import { PageSizes, PDFDocument } from "pdf-lib";
import { getPDFPreview, OPreviewProps } from "../previews";

export const PAGE_ORIENTATION = ["Portrait", "Landscape"] as const;
export const PAGE_SIZE = [
  "Fit",
  "A0",
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
  "Letter",
  "Legal",
  "Tabloid",
] as const;

export const PAGE_MARGIN = ["None", "Small", "Big"] as const;

export interface ImagesToPDFProps {
  images: OPreviewProps[];
  orientation: (typeof PAGE_ORIENTATION)[number];
  size: (typeof PAGE_SIZE)[number];
  margin: (typeof PAGE_MARGIN)[number];
}

/**
 * Utility functions for working with PDF files.
 */
export const PDFWorker = {
  /**
   * Converts an array of images to a single PDF document.
   *
   * @param prop - An array of type `ImagesToPDFProps`.
   * @returns A PDF document.
   */
  imagesToPDF: async (prop: ImagesToPDFProps) => {
    const pdfDoc = await PDFDocument.create();
    console.log(prop);

    for (const file of prop.images) {
      const width = file.width;
      const height = file.height;
      const image = await fetch(file.preview).then((res) => res.arrayBuffer());
      const img = await pdfDoc.embedJpg(image);
      const page = pdfDoc.addPage([width, height]);

      switch (prop.size) {
        case "A0":
          prop.orientation === "Portrait"
            ? page.setSize(PageSizes.A0[0], PageSizes.A0[1])
            : page.setSize(PageSizes.A0[1], PageSizes.A0[0]);
          break;
        case "A1":
          prop.orientation === "Portrait"
            ? page.setSize(PageSizes.A1[0], PageSizes.A1[1])
            : page.setSize(PageSizes.A1[1], PageSizes.A1[0]);
          break;
        case "A2":
          prop.orientation === "Portrait"
            ? page.setSize(PageSizes.A2[0], PageSizes.A2[1])
            : page.setSize(PageSizes.A2[1], PageSizes.A2[0]);
          break;
        case "A3":
          prop.orientation === "Portrait"
            ? page.setSize(PageSizes.A3[0], PageSizes.A3[1])
            : page.setSize(PageSizes.A3[1], PageSizes.A3[0]);
          break;
        case "A4":
          prop.orientation === "Portrait"
            ? page.setSize(PageSizes.A4[0], PageSizes.A4[1])
            : page.setSize(PageSizes.A4[1], PageSizes.A4[0]);
          break;
        case "A5":
          prop.orientation === "Portrait"
            ? page.setSize(PageSizes.A5[0], PageSizes.A5[1])
            : page.setSize(PageSizes.A5[1], PageSizes.A5[0]);
          break;
        case "Letter":
          prop.orientation === "Portrait"
            ? page.setSize(PageSizes.Letter[0], PageSizes.Letter[1])
            : page.setSize(PageSizes.Letter[1], PageSizes.Letter[0]);
          break;
        case "Legal":
          prop.orientation === "Portrait"
            ? page.setSize(PageSizes.Legal[0], PageSizes.Legal[1])
            : page.setSize(PageSizes.Legal[1], PageSizes.Legal[0]);
          break;
        case "Tabloid":
          prop.orientation === "Portrait"
            ? page.setSize(PageSizes.Tabloid[0], PageSizes.Tabloid[1])
            : page.setSize(PageSizes.Tabloid[1], PageSizes.Tabloid[0]);
          break;
      }

      const pageWidth = page.getWidth();
      const pageHeight = page.getHeight();
      const widthRatio = pageWidth / width;
      const heightRatio = pageHeight / height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
      const canvasWidth = width * ratio;
      const canvasHeight = height * ratio;
      const marginX = (pageWidth - canvasWidth) / 2;
      const marginY = (pageHeight - canvasHeight) / 2;

      // page margin
      switch (prop.margin) {
        case "None":
          page.drawImage(img, {
            x: marginX,
            y: marginY,
            width: canvasWidth,
            height: canvasHeight,
          });
          break;
        case "Small":
          const smallMargin = 25;
          page.drawImage(img, {
            x: (marginX + smallMargin) / 2,
            y: (marginY + smallMargin) / 2,
            width: canvasWidth - smallMargin,
            height: canvasHeight - smallMargin,
          });
          break;
        case "Big":
          const bigMargin = 50;
          page.drawImage(img, {
            x: (marginX + bigMargin) / 2,
            y: (marginY + bigMargin) / 2,
            width: canvasWidth - bigMargin,
            height: canvasHeight - bigMargin,
          });
          break;
      }
    }
    return pdfDoc.saveAsBase64({ dataUri: true });
  },

  /**
   * Merges an array of PDF documents into a single PDF document.
   *
   * @param pdfs - An array of PDF files.
   * @returns A merged PDF document.
   */
  mergePDFs: async (pdfs: File[]) => {
    const mergedPdf = await PDFDocument.create();
    console.debug("Merging PDFs started...");
    const actions = pdfs.map(async (pdfBuffer) => {
      console.debug("Merging PDF: ", pdfBuffer);
      const pdf = await PDFDocument.load(await pdfBuffer.arrayBuffer());
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    });
    console.debug("Merging PDFs completed...");
    await Promise.all(actions);
    const mergedPdfFile = await mergedPdf.saveAsBase64({ dataUri: true });
    return mergedPdfFile;
  },

  /**
   * Compress a single PDF document.
   *
   * @param pdf - A PDF file.
   * @returns A compressed PDF document.
   *
   */
  compressPDF: async (
    pdf: File,
    quality: number,
    canvas: HTMLCanvasElement
  ) => {
    const result = await getPDFPreview(pdf, false, quality, canvas);
    const pdfDoc = await PDFDocument.create();

    for (const image of result) {
      const width = image.width;
      const height = image.height;
      const img = await pdfDoc.embedJpg(
        await fetch(image.preview).then((res) => res.arrayBuffer())
      );
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(img);
    }
    return pdfDoc.saveAsBase64({ dataUri: true });
  },
};

expose(PDFWorker);
