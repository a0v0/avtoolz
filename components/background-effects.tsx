"use client";
import { Avatar, Image } from "@nextui-org/react";

function BackgroundEffects() {
  return (
    <>
      <div
        aria-hidden="true"
        className="fixed hidden dark:md:block dark:opacity-70 -bottom-[40%] -left-[20%] z-[0]"
      >
        <Image
          removeWrapper
          alt="docs left background"
          src="/gradient/docs-left.svg"
        />
      </div>
      <div
        aria-hidden="true"
        className="fixed hidden dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-[0] rotate-12"
      >
        <Avatar
          isBordered
          radius="lg"
          color="default"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
        <Image
          removeWrapper
          alt="docs right background"
          src="/gradient/docs-right.svg"
        />
      </div>
    </>
  );
}

export default BackgroundEffects;
