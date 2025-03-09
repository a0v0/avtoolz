// import { pdfjs } from "@/lib/previews";
// import { createCanvas } from "canvas";
// import fs from "fs";

// // function that convert pdf to array containing base64 encoded images of each page
// export async function pdfToImages(pdfFilePath: string): Promise<string[]> {
//   const loadingTask = pdfjs.getDocument(
//     new Uint8Array(fs.readFileSync(pdfFilePath))
//   );
//   const images: string[] = [];
//   try {
//     const pdfDocument = await loadingTask.promise;

//     for (let i = 1; i <= pdfDocument.numPages; i++) {
//       const page = await pdfDocument.getPage(i);
//       const viewport = page.getViewport({ scale: 1.0 });
//       const canvas = createCanvas(viewport.width, viewport.height);
//       const context = canvas.getContext("2d");
//       canvas.width = viewport.width;
//       canvas.height = viewport.height;
//       if (context) {
//         const renderContext = {
//           canvasContext: context,
//           viewport,
//         };
//         // @ts-ignore
//         const renderTask = page.render(renderContext);
//         await renderTask.promise;
//         images.push(canvas.toDataURL("image/jpeg", 0.5));
//       }
//       page.cleanup();
//     }
//   } catch (reason) {
//     console.log(reason);
//   }
//   return images;
// }

import { fromPath } from "pdf2pic";

interface ConvertResult {
  page: number;
  name: string;
  size: number;
  time: number;
  base64?: string;
}

/**
 * Converts a PDF file to an array of base64-encoded PNG images.
 * @param pdfPath - The file path to the PDF.
 * @returns A Promise that resolves with an array of image strings.
 */
export async function getImagesFromPDF(pdfPath: string): Promise<string[]> {
  // Configure conversion options.
  const options = {
    density: 100, // controls the quality/density of the output images
    format: "png", // output image format
    width: 600, // desired width of the output image
    height: 600, // desired height of the output image
    outputType: "base64", // return the image as a base64 string
    // Note: Omitting savePath prevents writing images to disk.
  };

  // Create a converter instance for the given PDF file.
  const converter = fromPath(pdfPath, options);

  // Convert all pages in the document (-1 converts every page)
  const results = await converter.bulk(-1, { responseType: "base64" });

  // Map the conversion results to an array of base64 strings.
  return results.map((result) => {
    if (!result.base64) {
      throw new Error(`Conversion failed for page ${result.page}`);
    }
    return result.base64;
  });
}

// Example usage (uncomment to run in your server-side code):
// convertPdfToImages("path/to/your.pdf")
//   .then((images) => {
//     images.forEach((imgBase64, index) => {
//       console.log(`Page ${index + 1} image (base64):`, imgBase64);
//     });
//   })
//   .catch((error) => console.error("Error converting PDF:", error));
