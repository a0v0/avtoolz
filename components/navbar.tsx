"use client";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spacer,
} from "@nextui-org/react";
import { ChevronDown } from "@nextui-org/shared-icons";
import React from "react";
import AuthButton from "./auth-button";
import { GithubIcon } from "./icons";
import ThemeToggle from "./theme-toggle";

export const XNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["All Tools", "PDF Tools", "Image Tools"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <h1 className="font-bold text-inherit">aVToolz</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {tools.map((element) => (
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={<ChevronDown fill="currentColor" size={16} />}
                  radius="sm"
                  variant="light"
                >
                  {element.heading}
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label={element.heading}
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              {element.tools.map((tool) => (
                <DropdownItem
                  key={tool.title}
                  description={tool.description}
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
        ))}
      </NavbarContent>

      <NavbarContent className="sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          {/* <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
						<TwitterIcon className="text-default-500" />
					</Link> */}
          {/* <Link isExternal href={siteConfig.links.discord} aria-label="Discord">
						<DiscordIcon className="text-default-500" />
					</Link> */}
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeToggle />
          <AuthButton />
        </NavbarItem>
        <NavbarContent className="sm:hidden" justify="end">
          <NavbarItem>
            <AuthButton />
          </NavbarItem>
        </NavbarContent>

        {/* <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              // color={
              //   index === 2
              //     ? "primary"
              //     : index === menuItems.length - 1
              //     ? "danger"
              //     : "foreground"
              // }
              color="primary"
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link
            isExternal
            showAnchorIcon
            href={siteConfig.links.github}
            color="success"
          >
            GitHub
          </Link>
          <Spacer />
          <ThemeToggle />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
