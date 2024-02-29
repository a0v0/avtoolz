import type {DraggableSyntheticListeners} from "@dnd-kit/core";
import type {Transform} from "@dnd-kit/utilities";
import classNames from "classnames";
import React, {useEffect} from "react";

import {Card, CardBody, CardHeader} from "@nextui-org/react";
import styles from "./Item.module.css";

export interface Props {
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  handleProps?: any;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: React.ReactNode;
  onRemove?(): void;
  file: File;

  renderItem?(args: {
    dragOverlay: boolean;
    dragging: boolean;
    sorting: boolean;
    index: number | undefined;
    fadeIn: boolean;
    listeners: DraggableSyntheticListeners;
    ref: React.Ref<HTMLElement>;
    style: React.CSSProperties | undefined;
    transform: Props["transform"];
    transition: Props["transition"];
    value: Props["value"];
  }): React.ReactElement;
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        height,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        file,
        ...props
      },
      ref,
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value,
        })
      ) : (
        <li
          className={classNames(
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay,
          )}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition].filter(Boolean).join(", "),
              "--translate-x": transform ? `${Math.round(transform.x)}px` : undefined,
              "--translate-y": transform ? `${Math.round(transform.y)}px` : undefined,
              "--scale-x": transform?.scaleX ? `${transform.scaleX}` : undefined,
              "--scale-y": transform?.scaleY ? `${transform.scaleY}` : undefined,
              "--index": index,
              "--color": color,
            } as React.CSSProperties
          }
          ref={ref}
        >
          <div
            className="gap-1 grid"
            {...(!handle ? listeners : undefined)}
            {...props}
            // tabIndex={!handle ? 0 : undefined}
          >
            <Card style={style} className=" ">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{value}</p>
                <small className="text-default-500">{file.name}</small>
                <h4 className="font-bold text-large">{file.type}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <p className="text-tiny uppercase font-bold">{value}</p>
              </CardBody>
            </Card>
            {/* <span className={styles.Actions}>
              {onRemove ? <Remove className={styles.Remove} onClick={onRemove} /> : null}
              {handle ? <Handle {...handleProps} {...listeners} /> : null}
            </span> */}
          </div>
        </li>
      );
    },
  ),
);