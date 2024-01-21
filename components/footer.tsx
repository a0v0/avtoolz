"use client";

import {usePathname} from "next/navigation";

import {Link} from "@nextui-org/react";
import {SmilingFaceWithHeartsEmoji} from "./icons/fluentui-emoji";
import {title} from "./primitives";

export const Footer = () => {
  const pathname = usePathname();

  if (pathname.includes("/examples")) {
    return null;
  }

  return (
    <footer className="w-full flex items-center justify-center py-3">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://en.wikipedia.org/wiki/Earth"
        title="Crafted with 🥰 on Earth"
      >
        <p className="font-normal">
          Crafted with <SmilingFaceWithHeartsEmoji className="inline" size={20} /> on{" "}
          <h1 className={title({color: "green", size: "xs"})}>Earth</h1>
        </p>
      </Link>
    </footer>
  );
};
