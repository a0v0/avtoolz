import {Card, CardBody, CardFooter, CardHeader, Image} from "@nextui-org/react";
import classNames from "classnames";
import {HTMLAttributes, forwardRef} from "react";

import styles from "./Page.module.css";

import {UniqueIdentifier} from "@dnd-kit/core";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
export enum Position {
  Before = -1,
  After = 1,
}

export enum Layout {
  Horizontal = "horizontal",
  Vertical = "vertical",
  Grid = "grid",
}
export interface Props extends Omit<HTMLAttributes<HTMLButtonElement>, "id"> {
  active?: boolean;
  clone?: boolean;
  insertPosition?: Position;
  id: UniqueIdentifier;
  index?: number;
  layout: Layout;
  onRemove?(): void;
  file: File;
}

export const Page = forwardRef<HTMLLIElement, Props>(function Page(
  {id, index, active, clone, insertPosition, layout, onRemove, style, ...props},
  ref,
) {
  return (
    <li
      className={classNames(
        styles.Wrapper,
        active && styles.active,
        clone && styles.clone,
        insertPosition === Position.Before && styles.insertBefore,
        insertPosition === Position.After && styles.insertAfter,
      )}
      style={style}
      ref={ref}
    >
      <Card className="w-150" shadow="sm" key={index}>
        {/* align cardheader items to end */}

        <CardHeader className="p-1 flex justify-end">
          <Card onPress={onRemove} isPressable>
            <CancelRoundedIcon />
          </Card>
        </CardHeader>

        <CardBody className="overflow-visible p-0">
          <button {...props}>
            <Image
              shadow="sm"
              radius="sm"
              width="100%"
              className="w-full object-cover h-[140px] cursor-pointer"
              src={"https://nextui.org/images/fruit-1.jpeg"}
            />
          </button>
        </CardBody>
        <CardFooter className="text-small justify-between">
          <b>{props.file?.name}</b>
          <p className="text-default-500">file type</p>
        </CardFooter>
      </Card>

      {index != null ? <span className={styles.PageNumber}>{index}</span> : null}
    </li>
  );
});
