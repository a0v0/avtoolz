"use client";
import {Button, Link} from "@nextui-org/react";
import {ArrowRightIcon} from "@nextui-org/shared-icons";
import {Logo} from "./icons";
import {subtitle, title} from "./primitives";

function HeroX() {
  return (
    <section className="flex flex-col gap-4 overflow-hidden lg:overflow-visible w-full flex-nowrap justify-between items-center h-[calc(100vh_-_64px)] 2xl:h-[calc(84vh_-_64px)]">
      <div></div>
      <div className="inline-block  text-center justify-center">
        <center>
          <Logo />
        </center>
        <h1 className={title()}>Your Online&nbsp;</h1>
        <br />
        <h1 className={title({color: "green"})}>Utitlity Toolbox&nbsp;</h1>
        <h2
          className={subtitle({
            fullWidth: true,
            class: "text-center",
          })}
        >
          Fast, beautiful and modern tools for everyone.
        </h2>{" "}
        <Button
          as={Link}
          endContent={<ArrowRightIcon />}
          color="success"
          href="/#all_tools"
          variant="ghost"
        >
          Browse All
        </Button>
      </div>

      <div></div>
    </section>
  );
}

export default HeroX;
