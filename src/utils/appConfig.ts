import type { LocalePrefix } from "node_modules/next-intl/dist/types/src/shared/types";

const localePrefix: LocalePrefix = "as-needed";

export const AppConfig = {
  name: "aVToolz",
  locales: ["en", "fr"],
  defaultLocale: "en",
  localePrefix,
};
