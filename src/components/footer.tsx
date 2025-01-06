import { Link } from "@nextui-org/react";

import { title } from "@/lib/primitives";

import { siteConfig } from "@/config/site";
import FluentUIEmoji, { EmpojiType } from "./icons/fluentui-emoji";

export const Footer = () => {
  return (
    <footer className="flex items-center justify-center lg:justify-between w-full md:px-10 px-3 py-3 text-current">
      <div>
        Crafted with{" "}
        <FluentUIEmoji
          emojiType={EmpojiType.SMILING_FACE_WITH_HEARTS}
          className="inline"
          size={20}
        />{" "}
        on{" "}
        <Link isExternal href="https://en.wikipedia.org/wiki/Earth">
          <h1 className={title({ color: "green", size: "xs" })}>Earth</h1>
        </Link>{" "}
        by{" "}
        <Link
          isExternal
          href="https://github.com/a0v0/avtoolz/graphs/contributors"
        >
          <h1 className={title({ color: "yellow", size: "xs" })}>Humans</h1>
        </Link>
      </div>
      <div className="hidden lg:flex">
        {" "}
        <Link
          isBlock
          isExternal
          aria-label="Github"
          className="p-1 text-inherit"
          color="foreground"
          href={siteConfig.links.github}
        >
          <span className="icon-[mdi--github] size-6 text-default-600 dark:text-default-500" />
        </Link>
      </div>
    </footer>
  );
};
