import { getFileTypeIcon } from "@/utils/helpers";
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
export async function getPDFPreview(
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

  const loadingTask = pdfjs.getDocument(await props.file.arrayBuffer());
  try {
    const pdfDocument = await loadingTask.promise;
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

export async function pdfToImg(file: File, quality: number) {
  var images: pdfToImgProps[] = [];

  try {
    const loadingTask = pdfjs.getDocument(await file.arrayBuffer());
    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;
    console.log(numPages);
    console.log("entering pdfToImg");
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      console.log(pageNum);
      const page = await pdfDocument.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1 });
      const width = viewport.width;
      const height = viewport.height;

      const canvas = new OffscreenCanvas(width, height);
      const context = canvas.getContext("2d");
      console.log("canvas created");
      if (context) {
        const renderContext = {
          canvasContext: context,
          viewport,
        };
        // @ts-ignore
        const renderTask = page.render(renderContext);
        await renderTask.promise;

        const fullPreview = await canvas
          .convertToBlob({
            type: "image/jpeg",
            quality: quality,
          })
          .then((blob) => URL.createObjectURL(blob));
        console.log(fullPreview);
        images.push({ blob: fullPreview, width: width, height: height });
      }

      page.cleanup();
      console.log("page cleanup");
    }

    return images;
  } catch (reason) {
    console.log(reason);
    return [];
  }
}
