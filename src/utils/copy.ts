import { Clipboard } from "@capacitor/clipboard";

export function CopyTextToClipboard(text: string) {
  navigator.clipboard.writeText(text);

  // for Capacitor apps
  writeToClipboard(text);
}

const writeToClipboard = async (text: string) => {
  await Clipboard.write({
    string: text,
  });
};
