import PDFMerger from "pdf-merger-js/browser";

export type TWorkerMess = File[];

const onmessage = (event: MessageEvent<TWorkerMess>) => {
  const files = event.data;

  async function _startMerge() {
    try {
      const merger = new PDFMerger();
      for (const file of files) {
        await merger.add(file);
      }

      postMessage(await merger.saveAsBlob());
    } catch (error) {
      console.error("🍎 Error: ", error);
    }
  }

  _startMerge();
};

addEventListener("message", onmessage);
