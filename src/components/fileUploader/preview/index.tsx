import { getImagePreview, getPDFPreview } from "@/libs/preview";
import { getFileType } from "@/utils/helpers";
import { Card, CardBody, CardHeader, Chip, Image } from "@nextui-org/react";
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
  const { previews, setPreview, removeFiles } = useFileUploaderStore();

  useEffect(() => {
    (async () => {
      if (file.type === "application/pdf") {
        setPreview(file, await getPDFPreview(file));
      } else if (
        [
          "image/jpg",
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/svg+xml",
        ].includes(file.type)
      ) {
        setPreview(file, await getImagePreview(file));
      } else {
        setPreview(file, "/svgrepo/unkown-file.svg");
      }
    })();
  }, [file, setPreview]);
  const _handleRemove = (file: File) => () => {
    removeFiles([file]);
  };

  return (
    <Card radius="lg" className="w-[175px]  border-none hover:outline-dashed">
      <CardHeader className="justify-end m-0 pb-0 pt-1 px-1">
        <Card onPress={_handleRemove(file)} isPressable>
          <Chip size="sm" variant="bordered" color="danger">
            <b>X</b>
          </Chip>{" "}
        </Card>{" "}
        <Card>
          <Chip
            className="file-drag-handle"
            size="sm"
            variant="bordered"
            color="danger"
          >
            <b>Drag</b>
          </Chip>
        </Card>
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
            src={previews.find((preview) => preview.file === file)?.thumb}
          />
        </div>

        <div className="text-ellipsis py-2 text-small gap-1 justify-between">
          <p className=" max-h-[3.5rem] truncate font-bold  opacity-75">
            {file?.name}
          </p>

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
