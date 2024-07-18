/* eslint-disable jsx-a11y/anchor-is-valid */

"use client";

import type { SwitchProps } from "@nextui-org/react";
import { Link, useSwitch } from "@nextui-org/react";
import { clsx } from "@nextui-org/shared-utils";
import { useIsSSR } from "@react-aria/ssr";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useTheme } from "next-themes";
import type { FC } from "react";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const {
    Component,

    isSelected,
    getBaseProps,
    getInputProps,
  } = useSwitch({
    isSelected: theme === "light",
    "aria-label": `Switch to ${theme === "light" ? "dark" : "light"} mode`,
    onChange,
  });

  return (
    <div id="theme-toggle">
      <Component
        {...getBaseProps({
          className: clsx(
            "size-8 cursor-pointer p-1 transition-opacity hover:opacity-80",
            className,
            classNames?.base
          ),
        })}
      >
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>

        {!isSelected || isSSR ? (
          <Link
            anchorIcon={
              <span className="icon-[mage--sun-fill] size-6 text-default-600 dark:text-default-500" />
            }
            showAnchorIcon
            isExternal
            isBlock
            className="border-transparent p-1 text-inherit focus:border-transparent focus:outline-none focus:ring-0"
            color="foreground"
          />
        ) : (
          <Link
            anchorIcon={
              <span className="icon-[mage--moon-fill] size-6 text-default-600 dark:text-default-500" />
            }
            showAnchorIcon
            isExternal
            isBlock
            className="border-transparent p-1 text-inherit focus:border-transparent focus:outline-none focus:ring-0"
            color="foreground"
          />
        )}
      </Component>{" "}
    </div>
  );
};
