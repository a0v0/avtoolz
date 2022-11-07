import { filesize } from "filesize";
export function getTotalSize(files: File[]) {
  return filesize(files.reduce((total, file) => total + file.size, 0));
}

export function getFileSizeFromDataUri(dataUri: string) {
  const base64 = dataUri.split(",")[1];
  const padding = base64.endsWith("=") ? (base64.endsWith("==") ? 2 : 1) : 0;
  return filesize(base64.length * 0.75 - padding);
}
