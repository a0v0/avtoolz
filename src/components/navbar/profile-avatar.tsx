import { Avatar } from "@nextui-org/react";

export const ProfileAvatar = (
  <Avatar
    size="sm"
    // isBordered
    as="button"
    // className="transition-transform"
    classNames={{
      base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
      icon: "text-black/80",
    }}
    // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
  />
);
