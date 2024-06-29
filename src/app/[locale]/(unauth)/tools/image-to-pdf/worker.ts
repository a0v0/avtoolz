import { jsPDF } from "jspdf";

export interface WorkerInput {
  files: File[];
}

export interface WorkerOutput {
  blob: Blob;
  error: string[];
}

const onmessage = (input: MessageEvent<WorkerInput>) => {
  const { files } = input.data;

  async function _start() {
    try {
      const pdfDoc = new jsPDF();
      pdfDoc.deletePage(1);
      for (const file of files) {
        var img = URL.createObjectURL(file);
        var imgProps = pdfDoc.getImageProperties(img);
        var page = pdfDoc.addPage(
          [imgProps.height, imgProps.width],
          imgProps.height > imgProps.width ? "portrait" : "landscape"
        );
        page.addImage(
          img,
          imgProps.fileType,
          0,
          0,
          imgProps.width,
          imgProps.height
        );
        URL.revokeObjectURL(img);
      }

      var workerOutput: WorkerOutput = {
        blob: pdfDoc.output("blob"),
        error: [],
      };
      postMessage(workerOutput);
    } catch (error) {
      var workerOutput: WorkerOutput = {
        blob: new Blob(),
        error: [
          "An error occurred while processing the images. Please try again.",
        ],
      };
      postMessage(workerOutput);
      console.error("🍎 Error: ", error);
    }
  }

  _start();
};

addEventListener("message", onmessage);
