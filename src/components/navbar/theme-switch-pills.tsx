import { useIsMounted } from "@/hooks/use-is-mounted";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";

function ThemeSwitchPills() {
  const { theme, setTheme } = useTheme();

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
        Light
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
        Dark
      </Button>
    </div>
  );
}

export default ThemeSwitchPills;
