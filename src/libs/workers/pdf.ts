import { expose } from "comlink";
import jsPDF from "jspdf";
import { PDFDocument } from "pdf-lib";

/**
 * Utility functions for working with PDF files.
 */
export const PDFWorker = {
  /**
   * Converts an array of images to a PDF document.
   *
   * @param images - An array of image files.
   * @returns A URL representing the converted PDF document.
   */
  imagesToPDF: (images: File[]) => {
    const pdfDoc = new jsPDF();

    pdfDoc.deletePage(1);
    for (const file of images) {
      var img = URL.createObjectURL(file);
      var imgProps = pdfDoc.getImageProperties(img);
      var page = pdfDoc.addPage(
        [imgProps.height, imgProps.width],
        imgProps.height > imgProps.width ? "portrait" : "landscape"
      );
      page.addImage(
        img,
        imgProps.fileType,
        0,
        0,
        imgProps.width,
        imgProps.height
      );
      URL.revokeObjectURL(img);
    }
    return URL.createObjectURL(pdfDoc.output("blob"));
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
