import { getFileTypeIcon } from "@/utils/helpers";
import * as PDFJSWorker from "pdfjs-dist/build/pdf.worker";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = PDFJSWorker;

// export pdfjs for use at other places
export { pdfjs };

/**
 * Generates a preview image of a PDF file.
 * If the file size is greater than 10MB, an empty string is returned.
 *
 * @param file - The PDF file to generate the preview for.
 * @returns The preview image as a base64-encoded data URL, or an empty string if the file size is too large.
 */
export async function getPDFPreview(file: File) {
  var preview = getFileTypeIcon(file);
  // skip generating thumbnail if file size is greater than 10MB
  if (file.size > 10 * 1024 * 1024) {
    return preview;
  }

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

// generate preview of png, jpg, webp
export async function getImagePreview(file: File) {
  var preview = getFileTypeIcon(file);
  // skip generating thumbnail if file size is greater than 10MB
  if (file.size > 10 * 1024 * 1024) {
    return preview;
  }

  // png, jpg, webp preview
  return URL.createObjectURL(file);
}
