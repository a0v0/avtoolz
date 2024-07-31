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
import { useLocale } from "next-intl";
import ThemeSwitchPills from "./theme-switch-pills";

function Settings() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLocaleChange = (value: any) => {
    router.push(pathname, { locale: value });
    router.refresh();
  };

  return (
    <Tabs aria-label="Options" isVertical={!isMobile}>
      <Tab
        key="appearence"
        className="w-full"
        title={
          <div className="flex items-center space-x-2">
            <span className="icon-[solar--paint-roller-bold-duotone] size-6"></span>

            <span>Appearence</span>
          </div>
        }
      >
        <Card shadow="none">
          <CardBody className="gap-4">
            <h1 className="text-2xl font-semibold">Appearence</h1>
            <Divider />

            <div className="flex justify-between flex-wrap gap-2">
              <h1 className="font-medium text-lg">Theme Mode</h1>

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

            <span>Language</span>
          </div>
        }
      >
        <Card shadow="none">
          <CardBody className="gap-4">
            <h1 className="text-2xl font-semibold">Language</h1>
            <Divider />

            <div className="flex justify-between flex-wrap gap-2">
              <h1 className="font-medium text-lg">Choose your language</h1>
              <Select
                variant={"flat"}
                // label="Select an animal"
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
              {/* <select
                defaultValue={locale}
                onChange={handleChange}
                className="border border-gray-300 font-medium focus:outline-none focus-visible:ring"
              >
                {AppConfig.locales.map((elt) => (
                  <option key={elt} value={elt}>
                    {getLocaleInWords(elt)}
                  </option>
                ))}
              </select> */}
            </div>
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}

export default Settings;
