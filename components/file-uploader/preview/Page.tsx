import {getFileType} from "@/libs/file";
import {UniqueIdentifier} from "@dnd-kit/core";
import {Card, CardBody, CardHeader, Chip} from "@nextui-org/react";
import classNames from "classnames";
import prettyBytes from "pretty-bytes";
import {HTMLAttributes, forwardRef} from "react";
import {useFileUploaderStore} from "../store";
import styles from "./Page.module.css";

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
  focusRingColor: string;
}

export const Page = forwardRef<HTMLLIElement, Props>(function Page(
  {
    id,
    index,
    file,
    active,
    clone,
    insertPosition,
    layout,
    onRemove,
    focusRingColor,
    style,
    ...props
  },
  ref,
) {
  const {previews} = useFileUploaderStore();

  const _getPreview = (file: File) => {
    const preview = previews.find((p) => p.file === file);
    return preview?.thumb;
  };

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
      <button
        className={` cursor-move hover:ring hover:ring-opacity-100 rounded-lg hover:ring-inherit hover:ring-[${focusRingColor}]`}
        {...props}
      >
        <Card radius="lg" className="w-[175px]  border-none hover:outline-dashed">
          <CardHeader className="justify-end m-0 pb-0 pt-1 px-1">
            <Card onPress={onRemove} isPressable>
              <Chip size="sm" variant="bordered" color="danger">
                <b>X</b>
              </Chip>
            </Card>
          </CardHeader>
          <CardBody className="pb-1 overflow-hidden">
            {file.type === "application/pdf" ? (
              // <PdfThumbnail pdfUrl={URL.createObjectURL(file)}></PdfThumbnail>

              <div
                className="h-40 center "
                style={{backgroundImage: `url(/icons/pdf.svg)`, backgroundSize: "cover"}}
              ></div>
            ) : (
              <div
                className="h-40 center "
                style={{backgroundImage: `url(${_getPreview(file)})`, backgroundSize: "cover"}}
              ></div>
            )}

            <div className="text-ellipsis py-2 text-small gap-1 justify-between">
              <p className=" max-h-[3.5rem] truncate font-bold  opacity-75">{file?.name}</p>

              <div className=" m-0  p-0  ">
                <Chip size="sm" color="success" variant="flat">
                  {file.type ? getFileType(file) : "invalid type"}
                </Chip>{" "}
                <Chip size="sm" color="success" variant="flat">
                  {prettyBytes(file?.size)}
                </Chip>
              </div>
            </div>
          </CardBody>
        </Card>
      </button>
    </li>
  );
});
