import { getFileTypeIcon } from "@/utils/helpers";
import * as PDFJSWorker from "pdfjs-dist/build/pdf.worker";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = PDFJSWorker;

// export pdfjs for use at other places
export { pdfjs };

export interface OPreviewProps {
  file: File;
  preview: string;
  width: number;
  height: number;
}
export interface pdfToImgProps {
  blob: string;
  width: number;
  height: number;
}

export async function getPDFPreview(
  file: File,
  firstPageOnly: Boolean = true,
  quality: number,
  canvas: HTMLCanvasElement
): Promise<OPreviewProps[]> {
  const result: OPreviewProps[] = [];

  // var preview = getFileTypeIcon(file);
  // var fullPreview = preview;
  // var width = 0,
  //   height = 0;

  // TODO: skip generating thumbnail if file size is greater than 10MB
  // if (file.size > 10 * 1024 * 1024) {
  //   return {
  //     file: file,
  //     smallPreview: preview,
  //     fullPreview: preview,
  //     width: width,
  //     height: height,
  //   };
  // }

  try {
    const loadingTask = pdfjs.getDocument(await file.arrayBuffer());
    const pdfDocument = await loadingTask.promise;

    for (let pageNum = 1; pageNum < pdfDocument.numPages + 1; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.0 });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext("2d");
      if (context) {
        const renderContext = {
          canvasContext: context,
          viewport,
        };
        const renderTask = page.render(renderContext);
        await renderTask.promise;
        const preview = canvas.toDataURL("image/jpeg", quality);

        result.push({
          file: file,
          width: viewport.width,
          height: viewport.height,
          preview: preview,
        });
      }
      page.cleanup();

      if (firstPageOnly) {
        break;
      }
    }
  } catch (reason) {
    console.log("Failed to generate PDF preview:", reason);
  }

  return result;
}

// generate preview of png, jpg, webp
export async function getImagePreview(
  file: File,
  quality: number
): Promise<OPreviewProps> {
  var preview = getFileTypeIcon(file);
  var width = 0,
    height = 0;

  // skip generating thumbnail if file size is greater than 10MB
  if (file.size > 10 * 1024 * 1024) {
    return {
      file: file,
      preview: preview,
      width: width,
      height: height,
    };
  }

  // png, jpg, webp preview
  try {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise((resolve) => {
      img.onload = resolve;
    });
    width = img.width;
    height = img.height;

    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext("2d");

    if (context) {
      context.drawImage(img, 0, 0, width, height);

      preview = URL.createObjectURL(
        await canvas.convertToBlob({ type: "image/jpeg", quality: quality })
      );
    }
  } catch (reason) {
    console.log(reason);
  }

  return {
    file: file,
    preview: preview,
    width: width,
    height: height,
  };
}
