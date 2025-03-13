"use client";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { useTranslations } from "next-intl";
import Settings from "./settings-model";

function ProfileMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const t = useTranslations();

  const avatar = (
    <Avatar
      size="sm"
      // isBordered

      // className="transition-transform"
      classNames={{
        base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
        icon: "text-black/80",
      }}
      // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
    />
  );

  return (
    <>
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button
            aria-label="avatar"
            isIconOnly
            startContent={avatar}
            variant="light"
          ></Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with description"
        >
          <DropdownItem key="profile" className="h-14 gap-2">
            <div className="flex gap-5 items-center">
              <div className="">{avatar}</div>
              <div className="">
                <p className="font-semibold text-default-500">
                  {t("settings.auth.signed_in_as")}
                </p>
                <p className="font-semibold">Guest</p>
              </div>
            </div>
          </DropdownItem>
          <DropdownSection>
            {/* <DropdownItem
              key={"profile"}
              // shortcut="⌘⇧P"
              description="View and edit your profile"
              startContent={
                <span className="icon-[solar--face-scan-circle-bold-duotone] size-8"></span>
              }
              onPress={onOpen}
            >
              Profile
            </DropdownItem> */}

            <DropdownItem
              key="settings"
              // shortcut="⌘⇧E"
              description="Manage theme, account settings and more"
              startContent={
                <span className="icon-[mage--settings-fill] dark:text-default-500 size-6" />
              }
              onPress={onOpen}

              // endContent={<ThemeSwitch />}
            >
              Settings
            </DropdownItem>

            {/* <DropdownItem
              key={"settings"}
              // shortcut="⌘⇧S"
              description="Manage your settings"
              startContent={
                <span className="icon-[solar--settings-bold-duotone] size-8"></span>
              }
              onPress={onOpen}
            >
              Settings
            </DropdownItem> */}
          </DropdownSection>
          {/* <DropdownSection title="Danger zone"> */}
          {/* <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          // shortcut="⌘⇧D"
          description="Logout from your account"
          startContent={
            <span className="icon-[solar--logout-bold-duotone] size-8"></span>
          }
        >
          Logout
        </DropdownItem> */}
          {/* </DropdownSection> */}
        </DropdownMenu>
      </Dropdown>
      <Modal size="4xl" backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>{t("settings.settings")}</h1>
                <p className="text-small text-default-400">
                  {t("settings.manage_settings")}
                </p>
              </ModalHeader>
              <ModalBody>
                {/* <div className="flex w-full flex-col"> */}
                <Settings />
                {/* </div> */}
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileMenu;
