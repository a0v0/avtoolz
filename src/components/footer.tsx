import { Link } from "@nextui-org/react";

import { title } from "@/libs/primitives";

import FluentUIEmoji, { EmpojiType } from "./icons/fluentui-emoji";

export const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-center gap-1 py-3 text-current">
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
    </footer>
  );
};
