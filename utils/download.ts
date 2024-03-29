export function downloadFile(blob: Blob, filename: string) {
  if (!blob || !filename) {
    throw new Error("Invalid data or filename provided");
  }

  // Create a new Blob object with the provided data (avoiding object URL)
  const newBlob = new Blob([blob], {type: blob.type});

  const url = window.URL.createObjectURL(newBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  // Revoke the object URL to avoid memory leaks
  setTimeout(() => window.URL.revokeObjectURL(url), 0);
}
