import {base64toBlob} from "@/utils/file";
import {PDFDocument, PDFPage} from "pdf-lib";

export interface WorkerInput {
  files: File[];
  canvas: OffscreenCanvas;
}

export interface WorkerOutput {
  blob: Blob;
  error: string[];
}

const onmessage = (input: MessageEvent<WorkerInput>) => {
  const {files, canvas} = input.data;

  async function _start() {
    try {
      const pdfDoc = await PDFDocument.create();
      for (const file of files) {
        // TODO: use wasm to convert images to jpg
        // see https://stackoverflow.com/questions/1864756/web-workers-and-canvas
        var page: PDFPage;

        var img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = async function () {
          canvas.width = img.width;
          canvas.height = img.height;

          var ctx = canvas.getContext("2d");

          // @ts-ignore
          ctx.drawImage(img, 0, 0);
          const imgData = await canvas.convertToBlob({type: "image/jpeg"});

          const imagedat = await pdfDoc.embedJpg(await imgData.arrayBuffer());

          page = pdfDoc.addPage([imagedat.width, imagedat.height]);

          page.drawImage(imagedat);
        };
      }

      var workerOutput: WorkerOutput = {
        blob: base64toBlob(await pdfDoc.saveAsBase64(), "application/pdf"),
        error: [],
      };
      postMessage(workerOutput);
    } catch (error) {
      var workerOutput: WorkerOutput = {
        blob: new Blob(),
        error: ["An error occurred while processing the images. Please try again."],
      };
      postMessage(workerOutput);
      console.error("🍎 Error: ", error);
    }
  }

  _start();
};

addEventListener("message", onmessage);
