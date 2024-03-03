// function to extract file type from file.type and return only extension with uppercase
export function getFileType(file: File): string {
  return file.type.split("/")[1].toUpperCase();
}
