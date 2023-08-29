"use client";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { MoonFilledIcon, SunFilledIcon } from "@nextui-org/shared-icons";
import { Switch } from "@nextui-org/switch";
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isMounted = useIsMounted();
  const isSelected = theme === "dark" && isMounted;

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <Switch
      // classNames={{
      //   base: "absolute -top-[220px] -right-[40px] animate-[levitate_13s_ease_infinite_1s_reverse]",
      //   wrapper: "shadow-sm",
      //   startContent: "text-white",
      // }}
      endContent={<MoonFilledIcon />}
      isSelected={isSelected}
      size="lg"
      startContent={<SunFilledIcon />}
      onChange={onChange}
    />
  );
}

export default ThemeToggle;
