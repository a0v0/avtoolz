interface WorkerData {
  file: File;
}
self.onmessage = async function (event: MessageEvent<WorkerData>) {
  const {data} = event;
  const {file} = data;

  try {
    self.postMessage("");

    // Load the PDF document
    //  convert the file to a data URL
    // const blob = new Blob([file], {type: "application/pdf"});
    // Go is defined in wasm_exec.js
    // const useMyWasm = createAsBindHook("/wasm/pdf-preview.wasm", {
    //   imports: {
    //     consoleLog: (message) => {
    //       console.log(message);
    //     },
    //   },
    // });
    // const {loaded, instance, error} = useMyWasm();
    // console.log(loaded && instance.exports.addString("hello", "wasm"));
    // console.log(error && error.message);
    // const go = new Go();
    // WebAssembly.instantiateStreaming(
    //   // Fetch the file and stream into the WebAssembly runtime
    //   fetch("/wasm/pdf-preview.wasm"),
    //   // importObject is where `gojs` is defined
    //   go.importObject,
    // ).then(() => {
    //   // Since we used `js.Global().Set` in Go, we can access the function globally
    //   const result = window.add(1, 2);
    //   console.log(result);
    //   self.postMessage(result);
    // });
    // const mupdf = await createMuPdf();
    // const buf = await file.arrayBuffer();
    // const arrayBuf = new Uint8Array(buf);
    // const doc = mupdf.load(arrayBuf);
    // // Each of these returns a string:
    // const png = mupdf.drawPageAsPNG(doc, 1, 300);
    // self.postMessage({png});
    // const viewport = page.getViewport({scale: 1});
    // const canvas = document.createElement("canvas");
    // const context = canvas.getContext("2d");
    // canvas.width = viewport.width;
    // canvas.height = viewport.height;
    // // Render the page onto the canvas
    // if (context) {
    //   await page.render({canvasContext: context, viewport}).promise;
    //   // Convert canvas to data URL
    //   const previewUrl = canvas.toDataURL();
    //   console.log(previewUrl);
    //   // Send the preview URL back to the main thread
    //   self.postMessage(previewUrl);
    // }
  } catch (error) {
    console.error("Error generating PDF preview:", error);
    self.postMessage(null); // Send null on error
  }
};
