"use client";

import {Link, SwitchProps, useSwitch} from "@nextui-org/react";
import {clsx} from "@nextui-org/shared-utils";
import {useIsSSR} from "@react-aria/ssr";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {useTheme} from "next-themes";
import {FC} from "react";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({className, classNames}) => {
  const {theme, setTheme} = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const {Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps} = useSwitch({
    isSelected: theme === "light",
    "aria-label": `Switch to ${theme === "light" ? "dark" : "light"} mode`,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "p-1 w-8 h-8 transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base,
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-600 dark:!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper,
          ),
        })}
      >
        {!isSelected || isSSR ? (
          <Link
            anchorIcon={<span className="icon-[mage--sun-fill] size-6"></span>}
            showAnchorIcon={true}
            isExternal
            isBlock
            className="p-1 text-inherit focus:outline-none border-transparent focus:border-transparent focus:ring-0"
            color="foreground"
          ></Link>
        ) : (
          <Link
            isBlock
            className="p-1 text-inherit focus:outline-none border-transparent focus:border-transparent focus:ring-0"
            color="foreground"
          >
            <span className="icon-[mage--moon-fill] size-6"></span>
          </Link>
        )}
      </div>
    </Component>
  );
};
