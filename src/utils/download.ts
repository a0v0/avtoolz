import { FileOpener } from "@capacitor-community/file-opener";
import { Directory } from "@capacitor/filesystem";
import { Toast } from "@capacitor/toast";
import write_blob from "capacitor-blob-writer";
import { saveAs } from "file-saver";
export function DownloadFile(url: string, filename: string) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      downloadNative(blob, filename, blob.type);
      saveAs(blob, filename);
    })
    .catch(console.error);
}

function downloadNative(blob: Blob, fileName: string, mimeType: string) {
  const file = "Download/" + fileName;

  Toast.show({
    text: "Processing file. Please wait...",
  });

  write_blob({
    // The 'path' option should be a string describing where to write the file. It
    // may be specified as an absolute URL (beginning with "file://") or a relative
    // path, in which case it is assumed to be relative to the 'directory' option.

    path: file,

    // The 'directory' option is used to resolve 'path' to a location on the disk.
    // It is ignored if the 'path' option begins with "file://".

    directory: Directory.ExternalStorage,

    // The 'blob' option must be a Blob, which will be written to the file. The file
    // on disk is overwritten, not appended to.

    blob: blob,

    // Fast mode vastly improves read and write speeds on the web platform. For
    // files written with 'fast_mode' set to true, Filesystem.readFile will produce
    // a Blob rather than a Base64-encoded string. The 'fast_mode' option is
    // ignored on iOS and Android. For backwards compatibility, it defaults to
    // false.

    fast_mode: true,

    // If the 'recursive' option is 'true', intermediate directories will be created
    // as required. It defaults to 'false' if not specified.

    recursive: true,

    // If 'write_blob' falls back to its alternative strategy on failure, the
    // 'on_fallback' function will be called with the underlying error. This can be
    // useful to diagnose slow writes. It is optional.

    // See the "Fallback mode" section below for a detailed explanation.

    on_fallback(error) {
      Toast.show({
        text: "Error. Please try again or check permissions",
      });
    },
  }).then(function () {
    Toast.show({
      text: fileName + " saved to Downloads folder",
    });
  });

  FileOpener.open({
    filePath: file,
    contentType: mimeType,
    openWithDefault: true,
  });
}
