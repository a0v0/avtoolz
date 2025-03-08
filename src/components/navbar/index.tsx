"use client";

import type { Route } from "@/config/routes";
import { routes as manifest } from "@/config/routes";
import { siteConfig } from "@/config/site";
import {
  Button,
  Divider,
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
} from "@heroui/react";
import { clsx } from "@heroui/shared-utils";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";

import { Logo } from "../icons/Logo";
import { DocsSidebar } from "../sidebar";

import { isAppleDevice } from "@react-aria/utils";

import { useCmdkStore } from "@/components/cmdk";

import { useTranslations } from "next-intl";
import ProfileMenu from "./profile-menu";

export interface HeaderProps {
  routes: Route[];
  tag?: string;
  slug?: string;
}
export const Navbar: FC<HeaderProps> = ({ routes, slug, tag }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false);
  const [commandKey, setCommandKey] = useState<"ctrl" | "command">("command");

  const t = useTranslations();

  const ref = useRef<HTMLElement>(null);

  const pathname = usePathname();

  const cmdkStore = useCmdkStore();

  useEffect(() => {
    setCommandKey(isAppleDevice() ? "command" : "ctrl");
  }, []);

  const handleOpenCmdk = () => {
    cmdkStore.onOpen();
  };

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

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
      {t("search.quick_search")}
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
            <Logo width={64} className="w-7 lg:w-9" />
            <Spacer x={1} />
            <h1 className="font-bold text-inherit lg:text-2xl">aVToolz</h1>
            <Spacer x={2} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="start">
        <NavbarItem>
          <Link isBlock color="foreground" href="/tools">
            {t("common.all_tools")}
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
                    href={tool.href}
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

      <NavbarContent className="flex w-full sm:hidden gap-1" justify="end">
        <NavbarItem className="flex h-full items-center">
          <Button
            isIconOnly
            startContent={
              <span className="icon-[mingcute--search-3-line] size-6 text-default-600 dark:text-default-500" />
            }
            variant="light"
            onPress={handleOpenCmdk}
          ></Button>
        </NavbarItem>
        <NavbarItem className="flex h-full items-center">
          <ProfileMenu />
        </NavbarItem>
        <NavbarItem className="w-10 h-full">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="size-full pt-1"
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="sm:flex items-center gap-2">
          <Link
            isExternal
            isBlock
            showAnchorIcon
            href={siteConfig.links.githubRoadmap}
            color="success"
          >
            {t("common.roadmap")}
          </Link>

          <Link
            isExternal
            isBlock
            showAnchorIcon
            href={siteConfig.links.githubNewIssuesURL}
            color="danger"
          >
            {t("common.report_bugs")}
          </Link>

          {searchButton}
          <ProfileMenu />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <Link color="foreground" isBlock href="/tools">
          {t("common.all_tools")}
        </Link>
        <DocsSidebar routes={[...routes]} slug={slug} tag={tag} />

        <div className=" h-full  content-end items-center text-center mb-5">
          <Divider />
          <Spacer y={2} />

          <Link
            isBlock
            color="warning"
            isExternal
            href={siteConfig.links.github}
            showAnchorIcon
          >
            {t("common.source_code")}
          </Link>

          <Link
            isBlock
            color="success"
            isExternal
            href={siteConfig.links.githubRoadmap}
            showAnchorIcon
          >
            {t("common.roadmap")}
          </Link>
          <Link
            isExternal
            isBlock
            showAnchorIcon
            href={siteConfig.links.githubNewIssuesURL}
            color="danger"
          >
            {t("common.report_bugs")}
          </Link>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
