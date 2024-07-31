import { useIsMobile } from "@/hooks/use-media-query";
import { Card, CardBody, Divider, Tab, Tabs } from "@nextui-org/react";
import ThemeSwitchPills from "./theme-switch-pills";

function Settings() {
  const isMobile = useIsMobile();

  return (
    // FIXME: fix the appearance tab not taking full width

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
        <Card>
          <CardBody className="gap-4">
            <h1 className="text-2xl font-semibold">Appearence</h1>
            <Divider />

            <div className="flex justify-between">
              <h1 className="font-medium text-lg">Theme</h1>
              <ThemeSwitchPills />
            </div>
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}

export default Settings;
