export function getFileType(file: File): string {
  switch (file.type) {
    case "image/svg+xml":
      return "svg";

    default:
      return file.type.split("/")[1].toLowerCase();
  }
}
