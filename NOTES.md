## To Do

- TODO: add seo

## Checkpoints for new tool

- [ ] Logic
- [ ] Breadcumbs

<!-- wasm notes -->

```
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
```