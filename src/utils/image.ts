export function getImageDimensions(imageURI: string): number[] {
  let img = new Image();
  img.src = imageURI;

  var w: number = 0;
  var h: number = 0;
  img.decode().then(() => {
    w = img.naturalWidth;
    h = img.naturalHeight;
  });
  return [w, h];
}

//**dataURL to blob**
export function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

//**blob to dataURL**
export function blobToDataURL(blob: Blob, callback) {
  var a = new FileReader();
  a.onload = function (e) {
    callback(e.target.result);
  };
  a.readAsDataURL(blob);
}
