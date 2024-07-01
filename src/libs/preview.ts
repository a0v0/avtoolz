import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

/**
 * Retrieves a preview image of the first page of a PDF file.
 *
 * @param file - The PDF file to generate the preview from.
 * @returns A data URL representing the preview image.
 */
export async function getPDFPreview(file: File) {
  var preview = "";

  const loadingTask = pdfjs.getDocument(await file.arrayBuffer());
  try {
    const pdfDocument = await loadingTask.promise;
    const page = await pdfDocument.getPage(1);
    const viewport = page.getViewport({ scale: 1.0 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    if (context) {
      const renderContext = {
        canvasContext: context,
        viewport,
      };
      const renderTask = page.render(renderContext);
      await renderTask.promise;
      preview = canvas.toDataURL("image/jpeg", 0.5);
    }
    page.cleanup();
  } catch (reason) {
    console.log(reason);
  }
  return preview;
}
