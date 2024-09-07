"use client";

import type { Route } from "@/config/routes";
import { routes as manifest } from "@/config/routes";
import { siteConfig } from "@/config/site";
import {
  Button,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import { usePathname } from "next/navigation";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";

import { currentVersion } from "@/utils/version";
import { Logo } from "../icons/logo";
import { DocsSidebar } from "../sidebar";

import { useTranslations } from "next-intl";
import ProfileMenu from "./profile-menu";
import SearchButton from "./search-btn";

export interface HeaderProps {
  routes: Route[];
  tag?: string;
  slug?: string;
}
export const Navbar: FC<HeaderProps> = ({ routes, slug, tag }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false);
  const t = useTranslations();
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen, pathname]);

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
          <Chip
            variant="flat"
            color="success"
            as={Link}
            isExternal
            startContent={
              <span className="icon-[mingcute--tag-fill] size-4"></span>
            }
            href={siteConfig.links.githubLatestRelease}
            className="hidden sm:flex"
          >
            v{currentVersion}
          </Chip>
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
      <NavbarContent className="flex w-full gap-2 sm:hidden" justify="end">
        <NavbarItem className="flex h-full items-center">
          {/* <ThemeSwitch /> */}

          {/* <Link
            isBlock
            isExternal
            aria-label="Github"
            className="p-1 text-inherit"
            href={siteConfig.links.github}
            color="foreground"
          >
            <span className="icon-[mdi--github] size-6 text-default-600 dark:text-default-500" />
          </Link> */}
          <SearchButton isSearchFullWidth={false} />
          <ProfileMenu />
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
        <NavbarItem className="hidden sm:flex gap-2">
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

          {/* <ThemeSwitch /> */}

          <div className="hidden sm:flex lg:hidden">
            <SearchButton isSearchFullWidth={false} />
          </div>
          <ProfileMenu />
        </NavbarItem>

        <div className="hidden lg:flex ">
          <SearchButton isSearchFullWidth />
        </div>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="ml-4 hidden sm:flex lg:hidden"
        />
      </NavbarContent>

      {/* mobile navbar */}
      <NavbarMenu>
        <NavbarItem>
          <Link color="foreground" isBlock href="/tools">
            {t("common.all_tools")}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <DocsSidebar routes={[...routes]} slug={slug} tag={tag} />
        </NavbarItem>
        <div className=" h-full  content-end items-center text-center mb-5">
          <Divider />
          <Spacer y={2} />
          {/* <Chip
            variant="flat"
            color="success"
            as={Link}
            isExternal
            endContent={
              <span className="icon-[mingcute--tag-fill] size-4"></span>
            }
            href={siteConfig.links.githubLatestRelease}
          >
            v{currentVersion}
          </Chip> */}
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
