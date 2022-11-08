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
function getPngDimensions(base64: string): number[] {
  const header = atob(base64.slice(0, 50)).slice(16, 24);
  const uint8 = Uint8Array.from(header, (c) => c.charCodeAt(0));
  const dataView = new DataView(uint8.buffer);

  return [dataView.getInt32(0), dataView.getInt32(4)];
}
