export function CopyTextToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}
