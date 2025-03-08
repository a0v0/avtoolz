import { LocalePrefix } from "next-intl/routing";

export const AppConfig = {
  name: "aVToolz",
  locales: ["en", "fr"],
  defaultLocale: "en",
  localePrefix: "as-needed" as LocalePrefix,
};
