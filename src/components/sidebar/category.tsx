import { Badge } from "@components";
import { Route } from "@lib/tools/page";
import { useTheme } from "@nextui-org/react";
import withDefaults from "@utils/with-defaults";
import cn from "classnames";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

import ArrowRight from "../icons/arrow-right";

export interface Props {
  level: number;
  title: string;
  routes: Route[];
  iconUrl?: string;
  isMobile: boolean;
  selected: boolean;
  opened: boolean;
  updated?: boolean;
}

const defaultProps = {
  level: 1,
  isMobile: false,
  selected: false,
  opened: false,
};

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;

export type CategoryProps = Props & typeof defaultProps & NativeAttrs;

const Category: React.FC<React.PropsWithChildren<CategoryProps>> = ({
  isMobile,
  level = 1,
  title,
  selected,
  routes,
  iconUrl,
  updated,
  opened,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const {theme, isDark} = useTheme();
  const [toggle, setToggle] = useState<boolean>(selected || opened);
  const [shouldScroll, setShouldScroll] = useState<boolean>(false);

  const toggleCategory = () => {
    setToggle(!toggle);
    setShouldScroll(true);
  };

  const levelClass = `level-${level}`;
  const margin = 18;

  const postsHeight = useMemo(
    () => routes.length * (isMobile ? 32 : 26) + margin * (routes.length - 1),
    [routes, isMobile],
  );

  // If a category is selected indirectly, open it. This can happen when using the search input
  useEffect(() => {
    if (selected) {
      setToggle(true);
    }
  }, [selected]);

  // Navigate to the start of the category when manually opened
  useEffect(() => {
    if (toggle && shouldScroll) {
      const content = document.querySelector(
        isMobile ? ".docs-dropdown" : ".sidebar-content",
      ) as HTMLDivElement;
      let height = 0;

      // 10 is added for better margin
      if (ref.current && content) {
        height = ref.current?.offsetTop - (isMobile ? 10 : content?.offsetTop);
        content.scrollTop = height;
      }
      setToggle(toggle);
    }
  }, [toggle, shouldScroll, isMobile]);

  return (
    <div ref={ref} className={cn("category", levelClass, {open: toggle, selected})}>
      <div className="label-container" role="button" onClick={toggleCategory}>
        {iconUrl && (
          <Image
            alt={`${title} icon`}
            className="category-image"
            height={24}
            src={iconUrl.replace(".svg", isDark ? "-dark.svg" : "-light.svg")}
            width={24}
          />
        )}
        <span className="label noselect">{title}</span>
        <ArrowRight
          className="arrow-right"
          fill={theme?.colors?.accents8?.value}
          height={14}
          width={14}
        />
        {updated && (
          <Badge className="category__update-badge" css={{ml: "$6"}} type="secondary">
            Updated
          </Badge>
        )}
      </div>
      <div className="posts">{children}</div>
      <style jsx>{`
        .category {
          margin: ${margin}px 0;
          cursor: pointer;
        }
        .category:last-child {
          margin-bottom: 0;
        }
        :global(.category-image) {
          opacity: 0;
          animation: appear 200ms 100ms ease forwards;
        }
        .label-container {
          display: flex;
          align-items: center;
        }
        .label {
          font-size: 1rem;
          line-height: 1.5rem;
          font-weight: 400;
          margin-left: 10px;
          cursor: pointer;
          color: ${theme?.colors?.accents7?.value};
          transition: all 200ms ease 0ms;
        }
        .label-container :global(svg) {
          margin-top: 1px;
          margin-left: 14px;
          transition: transform 0.15s ease;
        }
        .selected .label {
          font-weight: 600;
          color: ${theme?.colors?.accents8?.value};
        }
        .open .label {
          color: ${theme?.colors?.accents9?.value};
        }
        .open .label-container :global(svg) {
          margin-right: 1px;
          margin-left: 13px;
          transform: rotate(90deg);
        }
        .level-2 .label-container {
          text-transform: none;
          letter-spacing: 0;
        }
        .label:hover {
          opacity: 0.8;
        }
        .separated {
          margin-bottom: 32px;
        }
        .posts {
          margin-top: ${margin}px;
          height: 0;
          overflow: hidden;
          padding-left: 19px;
          margin-left: 3px;
          transition: height 200ms ease;
        }
        .open .posts {
          height: ${postsHeight}px;
        }

        @keyframes appear {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @media screen and (max-width: ${theme?.breakpoints?.md}) {
          .category {
            margin: 24px 0;
          }
        }
      `}</style>
    </div>
  );
};

const MemoCategory = React.memo(Category);

export default withDefaults(MemoCategory, defaultProps);
