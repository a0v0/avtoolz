"use client";
import {Link} from "@nextui-org/link";
import {Card, CardBody, CardHeader, LinkProps, SlotsToClasses} from "@nextui-org/react";
import {LinkIcon} from "@nextui-org/shared-icons";
import React, {ReactNode} from "react";
import {tv} from "tailwind-variants";

const styles = tv({
  slots: {
    base: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
    card: "border-transparent bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]",
    header: "gap-2 pb-0",
    body: "",
    iconWrapper:
      "flex justify-center p-2 rounded-full items-center bg-secondary-100/80 text-pink-500",
    title: "text-base font-semibold",
    description: "font-normal text-base text-default-500",
  },
});

export type FeaturesGridSlots = keyof ReturnType<typeof styles>;

export interface Tool extends LinkProps {
  title: string;
  icon: ReactNode;
  description?: string | ReactNode;
}

interface ToolsGridProps {
  features: Tool[];
  classNames?: SlotsToClasses<FeaturesGridSlots>;
}

export const ToolsGrid: React.FC<ToolsGridProps> = ({features, classNames, ...props}) => {
  const slots = styles();

  return (
    <div className={slots.base({class: classNames?.base})} {...props}>
      {features.map((tool: Tool) => (
        <Card
          key={tool.title}
          isBlurred
          className={slots.card({class: classNames?.card})}
          isPressable={!!tool.href}
          as={Link}
          href={tool.href}
        >
          <CardHeader className={slots.header({class: classNames?.header})}>
            <div className={slots.iconWrapper({class: classNames?.iconWrapper})}>{tool.icon}</div>
            <p className={slots.title({class: classNames?.title})}>{tool.title}</p>
            {tool.isExternal && <LinkIcon className="text-white" height={18} width={18} />}
          </CardHeader>
          {tool.description ? (
            <CardBody className={slots.body({class: classNames?.body})}>
              <p
                className={slots.description({
                  class: classNames?.description,
                })}
              >
                {tool.description}
              </p>
            </CardBody>
          ) : null}
        </Card>
      ))}
    </div>
  );
};
