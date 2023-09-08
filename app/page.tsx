"use client";

import { GithubIcon, Logo } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/react";
import { button as buttonStyles } from "@nextui-org/theme";
import NextLink from "next/link";

export default function Home() {
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
        <Image
          removeWrapper
          alt="docs right background"
          src="/gradient/docs-right.svg"
        />
      </div>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Logo />
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Your Online&nbsp;</h1>
          <br />
          <h1 className={title({ color: "blue" })}>Utitlity Toolbox&nbsp;</h1>
          <h2
            className={subtitle({
              fullWidth: true,
              class: "text-center ",
            })}
          >
            Image conversion, file conversion, text transformation and many more
            tools completely free and{" "}
            {
              <Link
                href={siteConfig.links.github}
                rel="noreferer noopener"
                target="_blank"
                className="inline-flex"
                size="lg"
              >
                😎 open source 😎
              </Link>
            }
          </h2>
        </div>

        <div className="flex gap-3">
          <Button as={Link} href="/#all_tools" radius="lg" color="primary">
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
    </>
  );
}
