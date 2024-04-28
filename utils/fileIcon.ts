export function getFileIcon(file: File): string {
  switch (file.type) {
    case "application/pdf":
      return "/svgrepo/pdf.svg";
    default:
      return "/svgrepo/unkown-file.svg";
  }
}
