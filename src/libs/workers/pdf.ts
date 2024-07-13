import { expose } from "comlink";
import { PDFDocument } from "pdf-lib";
import { OPreviewProps } from "../previews";

export interface ImagesToPDFProps {
  images: OPreviewProps[];
  // orientation: "portrait" | "landscape";
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

    for (const file of prop.images) {
      const width = file.width;
      const height = file.height;
      const image = await fetch(file.fullPreview).then((res) =>
        res.arrayBuffer()
      );
      const img = await pdfDoc.embedJpg(image);
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(img, {
        // x: page.getWidth() / 2 - jpgDims.width / 2,
        // y: page.getHeight() / 2 - jpgDims.height / 2 + 250,
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
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
        // console.log('page', page.getWidth(), page.getHeight());
        // page.setWidth(210);
        mergedPdf.addPage(page);
      });
    });
    console.debug("Merging PDFs completed...");
    await Promise.all(actions);
    const mergedPdfFile = await mergedPdf.saveAsBase64({ dataUri: true });
    return mergedPdfFile;
  },
};

expose(PDFWorker);
