import { SmilingFaceWithHearts } from "@/components/icons/SmilingFaceWithHeartsIcon";
import { siteConfig } from "@/config/site";
import { title } from "@/lib/primitives";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex items-center justify-center lg:justify-between w-full md:px-10  px-3  text-current">
      <div className="flex gap-1">
        Crafted with
        <SmilingFaceWithHearts />
        on
        <Link target="_blank" href="https://en.wikipedia.org/wiki/Earth">
          <h1 className={title({ color: "green", size: "xs" })}>Earth</h1>
        </Link>
        by
        <Link
          target="_blank"
          href="https://github.com/a0v0/avtoolz/graphs/contributors"
        >
          <h1 className={title({ color: "yellow", size: "xs" })}>Humans</h1>
        </Link>
      </div>
      <div className="hidden lg:flex">
        {" "}
        <Link
          target="_blank"
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
