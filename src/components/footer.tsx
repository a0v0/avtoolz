import { siteConfig } from "@/config/site";
import { title } from "@/lib/primitives";

import { Link } from "@heroui/react";
import { ThemeSwitch } from "./theme-switch";

export const Footer = () => {
  return (
    <footer className="flex items-center justify-center lg:justify-between w-full md:px-10  px-3  text-current">
      <div className="flex gap-1">
        Crafted with
        <span className="icon-[fluent-emoji-flat--smiling-face-with-hearts] dark:text-default-500 size-6" />
        on
        <Link isExternal href="https://en.wikipedia.org/wiki/Earth">
          <h1 className={title({ color: "green", size: "xs" })}>Earth</h1>
        </Link>
        by
        <Link
          isExternal
          href="https://github.com/a0v0/avtoolz/graphs/contributors"
        >
          <h1 className={title({ color: "yellow", size: "xs" })}>Humans</h1>
        </Link>
      </div>
      <div className="hidden items-center lg:flex gap-1">
        <Link
          isExternal
          isBlock
          aria-label="Github"
          className="p-1 text-inherit"
          color="foreground"
          href={siteConfig.links.github}
        >
          <span className="icon-[ri--github-fill] dark:text-default-500 size-6" />
        </Link>
        <ThemeSwitch displayAsIcon />
      </div>
    </footer>
  );
};
