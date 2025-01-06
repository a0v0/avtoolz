import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { AppConfig } from "@/utils/app_config";

export const { usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
});
