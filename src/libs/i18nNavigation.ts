import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { AppConfig } from "@/utils/appConfig";

export const { usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
});
