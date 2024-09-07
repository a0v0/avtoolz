import { getFileTypeIcon } from "@/utils/helpers";
import { PDFDocumentProxy } from "pdfjs-dist";
import * as PDFJSWorker from "pdfjs-dist/build/pdf.worker";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = PDFJSWorker;

// export pdfjs for use at other places
export { pdfjs };

export interface IPreviewProps {
  file: File;
}

export interface OPreviewProps {
  file: File;
  smallPreview: string;
  fullPreview: string;
  width: number;
  height: number;
}
export interface pdfToImgProps {
  blob: string;
  width: number;
  height: number;
}

/**
 * Generates a preview image of a PDF file.
 * If the file size is greater than 10MB, an empty string is returned.
 *
 * @param file - The PDF file to generate the preview for.
 * @returns The preview image as a base64-encoded data URL, or an empty string if the file size is too large.
 */
export async function getPDFPreview(props: IPreviewProps) {
  var preview = getFileTypeIcon(props.file);
  var fullPreview = preview;
  var width = 0,
    height = 0;

  // skip generating thumbnail if file size is greater than 10MB
  if (props.file.size > 10 * 1024 * 1024) {
    return {
      file: props.file,
      smallPreview: preview,
      fullPreview: preview,
      width: width,
      height: height,
    };
  }

  try {
    const loadingTask = pdfjs.getDocument(await props.file.arrayBuffer());
    const pdfDocument = await loadingTask.promise;
    console.log(await pdfDocument.getMetadata());
    const page = await pdfDocument.getPage(1);
    const viewport = page.getViewport({ scale: 1.0 });
    width = viewport.width;
    height = viewport.height;
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext("2d");
    if (context) {
      const renderContext = {
        canvasContext: context,
        viewport,
      };
      // @ts-ignore
      const renderTask = page.render(renderContext);
      await renderTask.promise;
      preview = URL.createObjectURL(
        await canvas.convertToBlob({ type: "image/jpeg", quality: 0.5 })
      );
      fullPreview = URL.createObjectURL(
        await canvas.convertToBlob({ type: "image/jpeg", quality: 1 })
      );
    }
    page.cleanup();
  } catch (reason) {
    console.log("Failed to generate PDF preview:", reason);
  }
  return {
    file: props.file,
    smallPreview: preview,
    fullPreview: fullPreview,
    width: width,
    height: height,
  };
}

// generate preview of png, jpg, webp
export async function getImagePreview(
  props: IPreviewProps
): Promise<OPreviewProps> {
  var preview = getFileTypeIcon(props.file);
  var fullPreview = preview;
  var width = 0,
    height = 0;

  // skip generating thumbnail if file size is greater than 10MB
  if (props.file.size > 10 * 1024 * 1024) {
    return {
      file: props.file,
      smallPreview: preview,
      fullPreview: preview,
      width: width,
      height: height,
    };
  }

  // png, jpg, webp preview
  try {
    const img = new Image();
    img.src = URL.createObjectURL(props.file);
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
        await canvas.convertToBlob({ type: "image/jpeg", quality: 0.5 })
      );
      fullPreview = URL.createObjectURL(
        await canvas.convertToBlob({ type: "image/jpeg", quality: 1 })
      );
    }
  } catch (reason) {
    console.log(reason);
  }

  return {
    file: props.file,
    smallPreview: preview,
    fullPreview: fullPreview,
    width: width,
    height: height,
  };
}

/**
 * Converts a PDF file to an array of image previews.
 *
 * @param file - The PDF file to convert.
 * @param quality - The quality of the image previews.
 * @returns An array of image previews.
 */
export async function pdfToImg(file: File, quality: number) {
  var images: pdfToImgProps[] = [];

  try {
    const loadingTask = pdfjs.getDocument(await file.arrayBuffer());
    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const image = await getPDFPagePreview(pdfDocument, pageNum, quality);
      if (image.width === 0 || image.height === 0) {
        throw new Error("Failed to convert PDF pages to images.");
      }
      images.push(image);
    }
    return images;
  } catch (reason) {
    return images;
  }
}

// generate preview of pdf page
//
// @param pdf - PDF file to generate the preview for.
// @param pageNum - The page number to generate the preview for.
// @param quality - The quality of the preview image.
//
// @returns The preview image as a base64-encoded data URL.
export async function getPDFPagePreview(
  pdfDocumentProxy: PDFDocumentProxy,
  pageNum: number,
  quality: number
): Promise<pdfToImgProps> {
  let preview: pdfToImgProps = { blob: "", width: 0, height: 0 };

  try {
    const page = await pdfDocumentProxy.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.0 });
    const width = viewport.width;
    const height = viewport.height;
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext("2d");
    if (context) {
      const renderContext = {
        canvasContext: context,
        viewport,
      };
      // @ts-ignore
      const renderTask = page.render(renderContext);
      await renderTask.promise;

      preview = {
        blob: URL.createObjectURL(
          await canvas.convertToBlob({ type: "image/jpeg", quality: quality })
        ),
        width: width,
        height: height,
      };

      page.cleanup();
    }
    return preview;
  } catch (reason) {
    console.log(reason);
    return preview;
  }
}
