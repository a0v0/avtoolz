import { useIsMounted } from "@/hooks/use-is-mounted";
import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

function ThemeSwitchPills() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations();
  const isMounted = useIsMounted();
  const isSelected = theme === "dark" && isMounted;

  return (
    <div className="flex gap-2">
      <Button
        startContent={
          <span className="icon-[solar--sun-bold-duotone] size-6"></span>
        }
        radius="full"
        color="success"
        variant={isSelected ? "ghost" : "solid"}
        onPress={() => setTheme("light")}
      >
        {t("theme.light")}
      </Button>
      <Button
        radius="full"
        onPress={() => setTheme("dark")}
        startContent={
          <span className="icon-[solar--cloudy-moon-bold-duotone] size-6"></span>
        }
        color="success"
        variant={isSelected ? "solid" : "ghost"}
      >
        {t("theme.dark")}
      </Button>
    </div>
  );
}

export default ThemeSwitchPills;
