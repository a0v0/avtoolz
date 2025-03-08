"use client";
import { useIsMobile } from "@/hooks/use-media-query";
import { useRouter } from "@/i18n/routing";
import { AppConfig } from "@/utils/app_config";
import { getLocaleName } from "@/utils/getLocaleName";
import {
  Card,
  CardBody,
  Divider,
  Select,
  SelectItem,
  Tab,
  Tabs,
} from "@heroui/react";
import { setCookie } from "cookies-next";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ThemeSwitchPills from "./theme-switch-pills";

function Settings() {
  const isMobile = useIsMobile();
  const router = useRouter();
  // const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations();
  const [lang, setLang] = useState(locale);

  useEffect(() => {
    setCookie("i18n", lang);
    router.refresh();
  }, [lang]);

  return (
    <Tabs aria-label="Options" isVertical={!isMobile}>
      <Tab
        key="appearance"
        className="w-full"
        title={
          <div className="flex items-center space-x-2">
            <span className="icon-[solar--paint-roller-bold-duotone] size-6"></span>

            <span>{t("settings.appearance")}</span>
          </div>
        }
      >
        <Card shadow="none">
          <CardBody className="gap-4">
            <h1 className="text-2xl font-semibold">
              {t("settings.appearance")}
            </h1>
            <Divider />

            <div className="flex justify-between flex-wrap gap-2">
              <h1 className="font-medium text-lg">{t("settings.themMode")}</h1>

              <ThemeSwitchPills />
            </div>
          </CardBody>
        </Card>
      </Tab>
      <Tab
        key="language"
        className="w-full"
        title={
          <div className="flex items-center space-x-2">
            <span className="icon-[fa6-solid--language] size-6"></span>

            <span>{t("settings.language")}</span>
          </div>
        }
      >
        <Card shadow="none">
          <CardBody className="gap-4">
            <h1 className="text-2xl font-semibold">{t("settings.language")}</h1>
            <Divider />

            <div className="flex justify-between flex-wrap gap-2">
              <h1 className="font-medium text-lg">
                {t("settings.chooseLanguage")}
              </h1>
              <Select
                variant={"flat"}
                className="max-w-xs"
                defaultSelectedKeys={[locale]}
                onSelectionChange={(key) =>
                  new Set(key).forEach((v) => {
                    setLang(v.toString());
                  })
                }
                selectionMode="single"
                disallowEmptySelection
              >
                {AppConfig.locales.map((locale) => (
                  <SelectItem key={locale}>
                    {getLocaleName(locale, locale)}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}

export default Settings;
