"use client";
import { siteConfig } from "@/config/site";
import { Button, Link } from "@nextui-org/react";
import { button as buttonStyles } from "@nextui-org/theme";
import NextLink from "next/link";

import { GithubIcon, Logo } from "./icons";
import { subtitle, title } from "./primitives";
function HeroX() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 m-40">
      <Logo />
      <div className="inline-block  text-center justify-center">
        <h1 className={title()}>Your Online&nbsp;</h1>
        <br />
        <h1 className={title({ color: "green" })}>Utitlity Toolbox&nbsp;</h1>
        <h2
          className={subtitle({
            fullWidth: true,
            class: "text-center",
          })}
        >
          Free and{" "}
          <Link
            isExternal
            className="text-xl text-default-500 font-light [&>svg]:ml-1"
            href={siteConfig.links.github}
            underline="always"
          >
            Open Source
          </Link>{" "}
          tools for your daily needs.
        </h2>
      </div>

      <div className="flex gap-3">
        <Button
          as={Link}
          variant="flat"
          href="/#all_tools"
          radius="lg"
          color="success"
        >
          Browse All
        </Button>
        <Link
          isExternal
          as={NextLink}
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      {/* <div className="mt-8">
  <Snippet hideSymbol hideCopyButton variant="flat">
    <span>
      Get started by editing <Code color="primary">app/page.tsx</Code>
    </span>
  </Snippet>
</div> */}
    </section>
  );
}

export default HeroX;
