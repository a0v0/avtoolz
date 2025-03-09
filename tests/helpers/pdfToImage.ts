import { createCanvas } from "canvas";
import fs from "fs";
import { exit } from "process";
import { pdfjs } from "react-pdf";

// function that convert pdf to array containing base64 encoded images of each page
export async function pdfToImages(pdfFilePath: string): Promise<string[]> {
  const loadingTask = pdfjs.getDocument(
    new Uint8Array(fs.readFileSync(pdfFilePath))
  );
  const images: string[] = [];
  try {
    const pdfDocument = await loadingTask.promise;

    for (let i = 1; i <= pdfDocument.numPages; i++) {
      const page = await pdfDocument.getPage(i);
      const viewport = page.getViewport({ scale: 1.0 });

      const canvas = createCanvas(viewport.width, viewport.height);
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      if (context) {
        const renderContext = {
          canvasContext: context,
          viewport,
        };
        // @ts-ignore
        const renderTask = page.render(renderContext);
        await renderTask.promise;
        images.push(canvas.toDataURL("image/jpeg", 0.5));
      }
      page.cleanup();
    }
  } catch (reason) {
    console.log(reason);
    exit(1);
  }
  return images;
}
