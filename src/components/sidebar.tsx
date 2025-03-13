"use client";

import type { Route } from "@/config/routes";
import { getRoutePaths } from "@/utils/helpers";
import { TreeKeyboardDelegate } from "@/utils/treeKeyboardDelegate";
import { BaseItem } from "@heroui/aria-utils";
import type { SpacerProps } from "@heroui/react";
import {
  Chip,
  dataFocusVisibleClasses,
  Link,
  Link as NextUILink,
  Spacer,
} from "@heroui/react";
import { ChevronIcon } from "@heroui/shared-icons";
import { clsx, dataAttr } from "@heroui/shared-utils";
import { useFocusRing } from "@react-aria/focus";
import { usePress } from "@react-aria/interactions";
import { useSelectableCollection } from "@react-aria/selection";
import type { TreeState } from "@react-stately/tree";
import { useTreeState } from "@react-stately/tree";
import type {
  CollectionBase,
  Expandable,
  ItemProps,
  MultipleSelection,
  Node,
} from "@react-types/shared";
import { isEmpty } from "lodash";
import { usePathname, useRouter } from "next/navigation";
import type { FC } from "react";
import { useMemo, useRef } from "react";
import { ScrollArea } from "./scroll-area";

export interface Props<T> extends Omit<ItemProps<T>, "title">, Route {
  slug?: string;
  tag?: string;
}
export type BaseItemProps<T extends object> = Props<T>;
const Item = BaseItem as <T extends object>(
  props: BaseItemProps<T>
) => JSX.Element;

/**
 * @internal
 */
interface TreeItemProps<T> {
  item: Node<T>;
  state: TreeState<T>;
  level?: number;
  spaceLeft?: SpacerProps["x"];
}

const spacesByLevel: Record<number, SpacerProps["x"]> = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
};

function TreeItem<T>(props: TreeItemProps<T>) {
  const { item, state, level = 1, spaceLeft = 0 } = props;
  const { key, rendered, childNodes } = item;

  const router = useRouter();
  const pathname = usePathname();

  const paths = item.props.path
    ? getRoutePaths(item.props.path, item.props?.tag)
    : {
        pagePath: "",
        pathname: "",
      };

  const isNew = item.props?.newPost;
  const isUpdated = item.props?.updated;

  const isExpanded = state.expandedKeys.has(key);
  const isSelected =
    state.selectionManager.isSelected(key) ||
    paths.pathname === item.props.slug ||
    paths.pathname === pathname ||
    paths.pagePath === pathname;

  const ref = useRef<any>(null);

  const hasChildNodes = !isEmpty([...childNodes]);

  const Component = hasChildNodes ? "ul" : "li";

  const { pressProps } = usePress({
    onPress: () => {
      if (hasChildNodes) {
        state.toggleKey(item.key);
      } else {
        router.push(paths.pathname);
      }
    },
  });

  const { focusProps, isFocused, isFocusVisible } = useFocusRing();

  return (
    <Component
      {...focusProps}
      ref={ref}
      aria-expanded={dataAttr(hasChildNodes ? isExpanded : undefined)}
      aria-selected={dataAttr(isSelected)}
      className={clsx(
        "gap-3outline-none flex w-full flex-col tap-highlight-transparent",

        hasChildNodes ? "mb-4" : "first:mt-4",
        // focus ring
        ...dataFocusVisibleClasses
      )}
      data-focus-visible={isFocusVisible}
      data-focused={isFocused}
      role="treeitem"
    >
      <div className="flex cursor-pointer items-center gap-3" {...pressProps}>
        <Spacer x={spaceLeft} />
        {hasChildNodes ? (
          <span className="flex items-center gap-3">
            <span>{rendered}</span>
            <ChevronIcon
              className={clsx("transition-transform", {
                "-rotate-90": isExpanded,
              })}
            />
          </span>
        ) : (
          <NextUILink
            as={Link}
            className={clsx(
              "w-full",
              "font-normal",
              "before:mr-4",
              "before:content-['']",
              "before:block",
              "before:bg-default-300",
              "before:w-1",
              "before:h-1",
              "before:rounded-full"
            )}
            color="foreground"
            href={paths.pathname}
          >
            <span
              className={clsx(
                isSelected
                  ? "font-medium text-primary dark:text-foreground"
                  : "opacity-80 dark:opacity-60",
                {
                  "pointer-events-none": item.props?.comingSoon,
                }
              )}
            >
              {rendered}
            </span>
            {isUpdated && (
              <Chip
                className="ml-1 bg-default-100/50 py-1 text-tiny text-default-400"
                color="default"
                size="sm"
                variant="flat"
              >
                Updated
              </Chip>
            )}
            {isNew && (
              <Chip
                className="ml-1 py-1 text-tiny"
                color="primary"
                size="sm"
                variant="flat"
              >
                New
              </Chip>
            )}
            {item.props?.comingSoon && (
              <Chip
                className="ml-1 py-1 text-tiny"
                color="default"
                size="sm"
                variant="flat"
              >
                Coming soon
              </Chip>
            )}
          </NextUILink>
        )}
        {/* Workaround to avoid scrollbar overlapping */}
        <Spacer x={4} />
      </div>
      {isExpanded && hasChildNodes && (
        <div className="flex flex-col items-start gap-3" role="group">
          {[...childNodes].map((item) => {
            return (
              <TreeItem
                key={item.key}
                item={item}
                level={level + 1}
                spaceLeft={spacesByLevel[level] ?? 0}
                state={state}
                {...item.props}
              />
            );
          })}
        </div>
      )}
    </Component>
  );
}

function TreeHeading({ item }: { item: any }) {
  return <div>{item.rendered}</div>;
}

function Tree<T extends object>(
  props: CollectionBase<T> & Expandable & MultipleSelection
) {
  const state = useTreeState(props);

  const ref = useRef<HTMLDivElement>(null);

  const keyboardDelegate = useMemo(
    () => new TreeKeyboardDelegate(state.collection, state.disabledKeys),
    [state.collection, state.disabledKeys]
  );

  const { collectionProps } = useSelectableCollection({
    ref,
    selectionManager: state.selectionManager,
    keyboardDelegate,
  });

  return (
    <ScrollArea
      ref={ref}
      className="h-full lg:max-h-[calc(100vh_-_64px)]"
      role="tree"
      {...collectionProps}
    >
      {[...state.collection].map((item) => {
        if (item.type === "section") {
          return <TreeHeading key={item.key} item={item} />;
        }

        return <TreeItem key={item.key} item={item} state={state} />;
      })}
    </ScrollArea>
  );
}

export interface DocsSidebarProps {
  routes?: Route[];
  tag?: string;
  slug?: string;
  className?: string;
}

export const DocsSidebar: FC<DocsSidebarProps> = ({
  routes,
  slug,
  tag,
  className,
}) => {
  const expandedKeys = routes?.reduce((keys, route) => {
    if (route.defaultOpen) {
      keys.push(route.key as string);
    }

    return keys;
  }, [] as string[]);

  return (
    <div
      className={clsx(
        "z-0 mt-2 lg:fixed lg:top-20 lg:h-[calc(100vh-121px)]",
        className
      )}
    >
      <Tree defaultExpandedKeys={expandedKeys} items={routes || []}>
        {(route) => (
          <Item
            childItems={route.routes}
            slug={slug}
            tag={tag}
            {...route}
            key={route.key || route.title}
          >
            {route.title}
          </Item>
        )}
      </Tree>
    </div>
  );
};
