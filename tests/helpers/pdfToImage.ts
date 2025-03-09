import { fromPath } from "pdf2pic";

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
