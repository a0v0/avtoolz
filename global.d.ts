export {};

// Use type safe message keys with `next-intl`
type Messages = typeof import("./src/i18n/messages/en.json");
declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}

declare module "pdfjs-dist/build/pdf";
declare module "pdfjs-dist/build/pdf.worker";
