import { XErrors } from "@/config/errors";
import { getImagePreview, getPDFPreview } from "@/libs/previews";
import { getFileType, getFileTypeIcon } from "@/utils/helpers";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
  Link,
  Tooltip,
} from "@nextui-org/react";
import prettyBytes from "pretty-bytes";
import { HTMLAttributes, useEffect } from "react";
import { useFileUploaderStore } from "../store";

export interface Props extends Omit<HTMLAttributes<HTMLButtonElement>, "id"> {
  active?: boolean;
  clone?: boolean;
  index?: number;
  file: File;
}

export const Preview = (props: Props) => {
  const { file } = props;
  const {
    metadata,
    setPreview,
    removeFiles,
    shiftFileToLeft,
    shiftFileToRight,
    setError,
  } = useFileUploaderStore();

  useEffect(() => {
    (async () => {
      if (file.type === "application/pdf") {
        const p = await getPDFPreview(file, true, 0.5);
        p[0] ? setPreview(p[0]) : setError(XErrors.invalidFile);
      } else if (
        [
          "image/jpg",
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/svg+xml",
        ].includes(file.type)
      ) {
        setPreview(await getImagePreview(file, 0.5));
      }
    })();
  }, [file, setError, setPreview]);

  return (
    <Card radius="lg" className="w-[175px]  border-none hover:outline-dashed">
      <CardHeader className="justify-between  pb-0 pt-1 px-1">
        <Tooltip offset={10} content="Move this file">
          <span className="cursor-move file-drag-handle relative">
            <div className="fixed z-20 inline w-8 h-8"></div>
            <Link
              isExternal
              isBlock
              className="border-transparent p-1 text-inherit focus:border-transparent focus:outline-none focus:ring-0"
              color="foreground"
            >
              <span className="file-drag-handle cursor-move size-5 icon-[fluent--drag-24-filled]  text-default-600 dark:text-default-500"></span>
            </Link>
          </span>
        </Tooltip>
        <Tooltip offset={10} content="shift to left">
          <span className="cursor-pointer ">
            <Link
              id={"shift-left-" + encodeURIComponent(file.name)}
              anchorIcon={
                <span className=" size-5 icon-[mingcute--arrow-to-left-fill] text-default-600 dark:text-default-500"></span>
              }
              showAnchorIcon
              isExternal
              isBlock
              onPress={() => shiftFileToLeft(file)}
              className="border-transparent p-1 text-inherit focus:border-transparent focus:outline-none focus:ring-0"
              color="foreground"
            />
          </span>
        </Tooltip>
        <Tooltip offset={10} content="shift file to right">
          <span className="cursor-pointer">
            <Link
              id={"shift-right-" + encodeURIComponent(file.name)}
              anchorIcon={
                <span className="cursor-pointer size-5 icon-[mingcute--arrow-to-right-fill] text-default-600 dark:text-default-500"></span>
              }
              showAnchorIcon
              isExternal
              isBlock
              onPress={() => shiftFileToRight(file)}
              className="border-transparent p-1 text-inherit focus:border-transparent focus:outline-none focus:ring-0"
              color="foreground"
            />
          </span>
        </Tooltip>

        <Tooltip offset={10} content="remove file this file">
          <span className="cursor-pointer ">
            <Link
              anchorIcon={
                <span className="cursor-pointer size-5 icon-[rivet-icons--close-circle-solid] text-default-600 dark:text-default-500"></span>
              }
              showAnchorIcon
              isExternal
              isBlock
              onPress={() => removeFiles([file])}
              className="border-transparent p-1 text-inherit focus:border-transparent focus:outline-none focus:ring-0"
              color="foreground"
            />
          </span>
        </Tooltip>
      </CardHeader>
      <CardBody className="pb-1 overflow-hidden">
        <div className="h-40 center">
          <Image
            draggable={false}
            id={file.name}
            alt="file preview"
            className="h-40 object-cover w-full"
            width={"auto"}
            style={{ objectFit: "cover" }}
            src={
              metadata.find((m) => m.file === file)?.preview ??
              getFileTypeIcon(file)
            }
          />
        </div>

        <div className="text-ellipsis py-2 text-small gap-1 justify-between">
          <Tooltip content={file.name}>
            <p className=" max-h-[3.5rem] truncate font-bold  opacity-75">
              {file.name}
            </p>
          </Tooltip>
          <div className="m-0  p-0">
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
  );
};
