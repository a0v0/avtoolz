import { expose } from "comlink";
import { PageSizes, PDFDocument } from "pdf-lib";
import { OPreviewProps } from "../previews";

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
  compressPDF: async (pdf: File): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const arrayBuffer = await pdf.arrayBuffer();

        // set up EMScripten environment
        const Module = {
          preRun: [
            function () {
              self.Module.FS.writeFile(
                "input.pdf",
                new Uint8Array(arrayBuffer)
              );
            },
          ],
          postRun: [
            function () {
              try {
                const uarray = self.Module.FS.readFile("output.pdf", {
                  encoding: "binary",
                });
                const blob = new Blob([uarray], {
                  type: "application/octet-stream",
                });
                const pdfDataURL = self.URL.createObjectURL(blob);
                resolve(pdfDataURL);
              } catch (error) {
                reject(error);
              }
            },
          ],
          arguments: [
            "-sDEVICE=pdfwrite",
            "-dCompatibilityLevel=1.4",
            "-dPDFSETTINGS=/ebook",
            "-DNOPAUSE",
            "-dQUIET",
            "-dBATCH",
            "-sOutputFile=output.pdf",
            "input.pdf",
          ],
          print: function () {},
          printErr: function () {},
          totalDependencies: 0,
          noExitRuntime: 1,
        };
        // Module.setStatus("Loading Ghostscript...");
        if (!self.Module) {
          self.Module = Module;
          import("../ghostscript/gs-worker.js");
        } else {
          self.Module["calledRun"] = false;
          self.Module["postRun"] = Module.postRun;
          self.Module["preRun"] = Module.preRun;
          self.Module.callMain();
        }
      } catch (error) {
        reject(error);
      }
    });
  },
};

expose(PDFWorker);
