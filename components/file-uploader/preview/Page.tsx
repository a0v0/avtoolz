import {getFileType} from "@/libs/file";
import {UniqueIdentifier} from "@dnd-kit/core";
import {Card, CardBody, CardHeader, Chip, Image} from "@nextui-org/react";
import classNames from "classnames";
import prettyBytes from "pretty-bytes";
import {HTMLAttributes, forwardRef, useEffect, useState} from "react";
import {pdfjs} from "react-pdf";
import {useFileUploaderStore} from "../store";
import styles from "./Page.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();
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
  const {previews, setPreview} = useFileUploaderStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function genPDFThumb() {
      const blob = new Blob([file], {type: "application/pdf"});
      const url = URL.createObjectURL(blob);
      const loadingTask = pdfjs.getDocument(url);
      try {
        const pdfDocument = await loadingTask.promise;

        // Get the first page.
        const page = await pdfDocument.getPage(1);
        // Render the page on a Node canvas with 100% scale.
        const viewport = page.getViewport({scale: 1.0});
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        if (context) {
          const renderContext = {
            canvasContext: context,
            viewport,
          };
          const renderTask = page.render(renderContext);
          await renderTask.promise;
          const image = canvas.toDataURL();
          setPreview(file, image);
        }

        page.cleanup();
      } catch (reason) {
        console.log(reason);
      }
    }
    if (file.type === "application/pdf") {
      // check if the thumbnail already exists
      const existingPreview = previews.find((preview) => preview.file === file);
      if (existingPreview) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
        genPDFThumb();
        setIsLoading(false);
      }
    } else {
      const existingPreview = previews.find((preview) => preview.file === file);
      if (existingPreview) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
        setPreview(file, URL.createObjectURL(file));
        setIsLoading(false);
      }
    }
  }, [file]);

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
            <div
              className="h-40 center"
              style={
                {
                  // backgroundImage: `url(${previews.find((preview) => preview.file === file)?.thumb})`,
                  // backgroundSize: "cover",
                }
              }
            >
              <Image
                className="h-40 object-cover w-full"
                width={"auto"}
                style={{objectFit: "cover"}}
                src={previews.find((preview) => preview.file === file)?.thumb}
              />
            </div>

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
