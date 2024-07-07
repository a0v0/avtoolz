// Use type safe message keys with `next-intl`
type Messages = typeof import("../locales/en.json");
declare interface IntlMessages extends Messages {}

declare module "pdfjs-dist/build/pdf";
declare module "pdfjs-dist/build/pdf.worker";
