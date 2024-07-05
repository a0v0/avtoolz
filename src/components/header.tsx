"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Kbd,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
  Spacer,
} from "@nextui-org/react";
import { clsx } from "@nextui-org/shared-utils";
import { isAppleDevice } from "@react-aria/utils";
import { usePathname, useRouter } from "next/navigation";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";

// ThemeSwitch
// import { ThemeSwitch } from '@/components';
// import { DocsSidebar } from '@/components/docs/sidebar';
import type { Route } from "@/config/routes";
import { routes as manifest } from "@/config/routes";
import { siteConfig } from "@/config/site";

import { useCmdkStore } from "./cmdk";
import { Logo } from "./icons/logo";
import { DocsSidebar } from "./sidebar";
import { ThemeSwitch } from "./theme-switch";

export interface HeaderProps {
  routes: Route[];
  tag?: string;
  slug?: string;
}
export const Header: FC<HeaderProps> = ({ routes, slug, tag }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false);
  const [commandKey, setCommandKey] = useState<"ctrl" | "command">("ctrl");
  const router = useRouter();
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const cmdkStore = useCmdkStore();

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    setCommandKey(isAppleDevice() ? "command" : "ctrl");
  }, []);

  const handleOpenCmdk = () => {
    cmdkStore.onOpen();
  };

  const searchButton = (
    <Button
      aria-label="Quick search"
      className="bg-default-400/20 text-sm font-normal text-default-500 dark:bg-default-500/20"
      endContent={
        <Kbd className="hidden px-2 py-0.5 lg:inline-block" keys={commandKey}>
          K
        </Kbd>
      }
      startContent={
        <span className="icon-[mingcute--search-3-line] pointer-events-none size-6 shrink-0 text-base text-default-400" />
      }
      onPress={handleOpenCmdk}
    >
      Quick Search...
    </Button>
  );

  return (
    <NextUINavbar
      ref={ref}
      className={clsx({
        "z-[100001]": isMenuOpen,
      })}
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="" justify="start">
        <NavbarBrand>
          <Link
            aria-label="Home"
            className="flex items-center justify-start transition-opacity tap-highlight-transparent active:opacity-50"
            href="/"
            style={{ textDecoration: "none" }}
            color="foreground"
          >
            <Logo className="max-w-28" size={26} />
            <Spacer x={1} />
            <h1 className="font-bold text-inherit">aVToolz</h1>
            <Spacer x={2} />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="start">
        <NavbarItem>
          <Link isBlock color="foreground" href="/tools">
            All Tools
          </Link>
        </NavbarItem>
        {manifest.items.map((category, index) =>
          category.routes.length > 0 ? (
            <Dropdown key={index}>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    className="bg-transparent data-[hover=true]:bg-transparent"
                    endContent={
                      <span className="icon-[iconamoon--arrow-down-2-bold] pointer-events-none size-6 shrink-0 text-base text-default-400" />
                    }
                    radius="sm"
                    variant="light"
                  >
                    {category.title}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                key={index}
                aria-label={category.title}
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                {category.routes.map((tool, index) => (
                  <DropdownItem
                    onPress={() => router.push(tool.href)}
                    key={index}
                    startContent={tool.icon}
                  >
                    {tool.title}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ) : null
        )}
      </NavbarContent>
      <NavbarContent className="flex w-full gap-2 sm:hidden" justify="end">
        <NavbarItem className="flex h-full items-center">
          <ThemeSwitch />

          <Link
            isBlock
            isExternal
            aria-label="Github"
            className="p-1 text-inherit"
            href={siteConfig.links.github}
            color="foreground"
          >
            <span className="icon-[mdi--github] size-6 text-default-600 dark:text-default-500" />
          </Link>
          <Link
            color="success"
            // isBlock
            aria-label="Search"
            className="p-1 text-inherit "
            onClick={handleOpenCmdk}
          >
            <span className="icon-[mingcute--search-3-line] size-6 text-default-600 dark:text-default-500" />
          </Link>
        </NavbarItem>

        <NavbarItem className="h-full w-10">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="size-full pt-1"
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex">
          <Link
            isExternal
            isBlock
            showAnchorIcon
            href={siteConfig.links.githubRoadmap}
            color="success"
          >
            Roadmap
          </Link>

          <Link
            isExternal
            isBlock
            showAnchorIcon
            href={siteConfig.links.githubIssues}
            color="danger"
          >
            Report Bugs
          </Link>

          <ThemeSwitch />

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
        </NavbarItem>

        <NavbarItem className="hidden lg:flex">{searchButton}</NavbarItem>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="ml-4 hidden sm:flex lg:hidden"
        />
      </NavbarContent>

      <NavbarMenu>
        <NavbarItem>
          <Link color="success" isBlock href="/tools">
            All Tools
          </Link>
          <Spacer y={2} />
          <Link
            isBlock
            color="success"
            isExternal
            href={siteConfig.links.githubRoadmap}
            showAnchorIcon
          >
            Roadmap
          </Link>
          <Spacer y={2} />
          <Link
            isExternal
            isBlock
            showAnchorIcon
            href={siteConfig.links.githubIssues}
            color="danger"
          >
            Report Bugs
          </Link>
        </NavbarItem>

        <DocsSidebar
          className="mt-t"
          routes={[...routes]}
          slug={slug}
          tag={tag}
        />
      </NavbarMenu>
    </NextUINavbar>
  );
};
