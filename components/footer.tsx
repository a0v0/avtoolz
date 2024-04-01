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
    <footer className="w-full flex gap-1 items-center justify-center py-3 text-current">
      Crafted with <SmilingFaceWithHeartsEmoji className="inline" size={20} /> on{" "}
      <Link isExternal href="https://en.wikipedia.org/wiki/Earth">
        <h1 className={title({color: "green", size: "xs"})}>Earth</h1>
      </Link>{" "}
      by{" "}
      <Link isExternal href="https://github.com/a0v0/avtoolz/graphs/contributors">
        <h1 className={title({color: "yellow", size: "xs"})}>Humans</h1>
      </Link>
    </footer>
  );
};
