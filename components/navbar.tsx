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
  link,
} from "@nextui-org/react";
import {clsx} from "@nextui-org/shared-utils";
import {useFocusRing} from "@react-aria/focus";
import {usePress} from "@react-aria/interactions";
import {isAppleDevice} from "@react-aria/utils";
import {usePathname} from "next/navigation";
import {FC, ReactNode, useEffect, useRef, useState} from "react";

import {ThemeSwitch} from "@/components";
import {useCmdkStore} from "@/components/cmdk";
import {DocsSidebar} from "@/components/docs/sidebar";
import {GithubIcon, HeartFilledIcon, Logo, SearchLinearIcon} from "@/components/icons";
import {siteConfig} from "@/config/site";
import {Tools} from "@/config/tools";
import {useIsMounted} from "@/hooks/use-is-mounted";
import {Route} from "@/libs/docs/page";
import {ToolCategory} from "@/types/tool";
import {trackEvent} from "@/utils/va";
import {ChevronDown} from "@nextui-org/shared-icons";

export interface NavbarProps {
  routes: Route[];
  mobileRoutes?: Route[];
  tag?: string;
  slug?: string;
  children?: ReactNode;
}

export const Navbar: FC<NavbarProps> = ({children, routes, mobileRoutes = [], slug, tag}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false);
  const [commandKey, setCommandKey] = useState<"ctrl" | "command">("command");

  const ref = useRef<HTMLElement>(null);
  const isMounted = useIsMounted();

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
    trackEvent("Navbar - Search", {
      name: "navbar - search",
      action: "press",
      category: "cmdk",
    });
  };

  const {pressProps} = usePress({
    onPress: handleOpenCmdk,
  });
  const {focusProps, isFocusVisible} = useFocusRing();

  const docsPaths = [
    "/docs/guide/introduction",
    "/docs/guide/installation",
    "/docs/guide/upgrade-to-v2",
  ];

  const searchButton = (
    <Button
      aria-label="Quick search"
      className="text-sm font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20"
      endContent={
        <Kbd className="hidden py-0.5 px-2 lg:inline-block" keys={commandKey}>
          K
        </Kbd>
      }
      startContent={
        <SearchLinearIcon
          className="text-base text-default-400 pointer-events-none flex-shrink-0"
          size={18}
          strokeWidth={2}
        />
      }
      onPress={handleOpenCmdk}
    >
      Quick Search...
    </Button>
  );

  if (pathname.includes("/examples")) {
    return null;
  }

  const navLinkClasses = clsx(link({color: "foreground"}), "data-[active=true]:text-primary");

  const handlePressNavbarItem = (name: string, url: string) => {
    trackEvent("NavbarItem", {
      name,
      action: "press",
      category: "navbar",
      data: url,
    });
  };

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
            className="flex justify-start items-center tap-highlight-transparent transition-opacity active:opacity-50"
            href="/"
            style={{textDecoration: "none"}}
            color="foreground"
          >
            <Logo className="max-w-28" size={26} />
            <Spacer x={1} />
            <h1 className="font-bold text-inherit">aVToolz</h1>
            <Spacer x={2} />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      {/* Navbar Items */}
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                PDF Tools
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label={"PDF Tools"}
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {Tools.filter((tool) => tool.category.includes(ToolCategory.PDF)).map((tool) => (
              <DropdownItem
                key={tool.title}
                // description={tool.description}
                startContent={tool.icon}
                // onPress={() => {
                //   open(tool.href, "_self");
                // }}
              >
                {tool.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                Image Tools
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label={"Image Tools"}
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {Tools.filter((tool) => tool.category.includes(ToolCategory.IMAGE)).map((tool) => (
              <DropdownItem
                key={tool.title}
                // description={tool.description}
                startContent={tool.icon}
                // onPress={() => {
                //   open(tool.href, "_self");
                // }}
              >
                {tool.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent className="flex w-full gap-2 sm:hidden" justify="end">
        <NavbarItem className="flex h-full items-center">
          <Link
            isExternal
            aria-label="Github"
            className="p-1"
            href={siteConfig.links.github}
            onClick={() => handlePressNavbarItem("Github", siteConfig.links.github)}
          >
            <GithubIcon className="text-default-600 dark:text-default-500" />
          </Link>
        </NavbarItem>
        <NavbarItem className="flex h-full items-center">
          <ThemeSwitch />
        </NavbarItem>
        {/* <NavbarItem className="hidden h-full items-center">
          <button
            className={clsx(
              "transition-opacity p-1 hover:opacity-80 rounded-full cursor-pointer outline-none",
              // focus ring
              ...dataFocusVisibleClasses
            )}
            data-focus-visible={isFocusVisible}
            {...focusProps}
            {...pressProps}
          >
            <SearchLinearIcon
              className="mt-px text-default-600 dark:text-default-500"
              size={20}
            />
          </button>
        </NavbarItem> */}
        <NavbarItem className="w-10 h-full">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="w-full h-full pt-1"
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex">
          {/* <Link
            isExternal
            aria-label="Twitter"
            className="p-1"
            href={siteConfig.links.twitter}
            onPress={() =>
              handlePressNavbarItem("Twitter", siteConfig.links.twitter)
            }
          >
            <TwitterIcon className="text-default-600 dark:text-default-500" />
          </Link>
          <Link
            isExternal
            aria-label="Discord"
            className="p-1"
            href={siteConfig.links.discord}
            onPress={() =>
              handlePressNavbarItem("Discord", siteConfig.links.discord)
            }
          >
            <DiscordIcon className="text-default-600 dark:text-default-500" />
          </Link> */}
          <Link
            isExternal
            aria-label="Github"
            className="p-1"
            href={siteConfig.links.github}
            onPress={() => handlePressNavbarItem("Github", siteConfig.links.github)}
          >
            <GithubIcon className="text-default-600 dark:text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchButton}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="group text-sm font-normal text-default-600 bg-default-400/20 dark:bg-default-500/20"
            href={siteConfig.links.sponsor}
            startContent={
              <HeartFilledIcon className="text-danger group-data-[hover=true]:animate-heartbeat" />
            }
            variant="flat"
            onPress={() => handlePressNavbarItem("Sponsor", siteConfig.links.sponsor)}
          >
            Sponsor
          </Button>
        </NavbarItem>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="hidden sm:flex lg:hidden ml-4"
        />
      </NavbarContent>

      <NavbarMenu>
        <DocsSidebar className="mt-4" routes={[...mobileRoutes, ...routes]} slug={slug} tag={tag} />
        {children}
      </NavbarMenu>
    </NextUINavbar>
  );
};
