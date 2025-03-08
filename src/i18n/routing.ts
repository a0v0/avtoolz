import { AppConfig } from "@/utils/app_config";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: AppConfig.locales,
  defaultLocale: AppConfig.defaultLocale,
  localePrefix: AppConfig.localePrefix,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
