import { expose } from "comlink";
import jsPDF from "jspdf";

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
};

expose(PDFWorker);
