import { useIsMobile } from "@/hooks/use-media-query";
import { usePathname, useRouter } from "@/libs/i18nNavigation";
import { supportedLocales } from "@/locales/locale";
import {
  Card,
  CardBody,
  Divider,
  Select,
  SelectItem,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import ThemeSwitchPills from "./theme-switch-pills";

function Settings() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations();
  const handleLocaleChange = (value: any) => {
    router.push(pathname, { locale: value });
    router.refresh();
  };

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
                    handleLocaleChange(v);
                  })
                }
                selectionMode="single"
                disallowEmptySelection
              >
                {supportedLocales.map((locale) => (
                  <SelectItem key={locale.shortLabel}>
                    {locale.longLabel}
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
