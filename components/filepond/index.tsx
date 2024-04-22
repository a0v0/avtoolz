import {create, FilePond, FilePondOptions, FileStatus, registerPlugin, supported} from "filepond";
import React, {useEffect, useState} from "react";
import {subtitle} from "../primitives";
export {FileStatus, registerPlugin};

// plugins
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import {mimeToExtension} from "@/libs/mime";
import {getRandomId} from "@/utils/random";
import {Card, CardBody, Chip, Divider, Link, Spacer} from "@nextui-org/react";

// styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// import "filepond/dist/filepond.css";
import "@/styles/filepond.css";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateSize,
  FilePondPluginImagePreview,
);

//TODO: add your browser is not supported message here
const isSupported = supported();

interface FilePondProps extends FilePondOptions {}

export const FilePondUploader: React.FC<FilePondProps> = (props) => {
  const [pond, setPond] = useState<FilePond | null>(null);
  const [allowedFileTypes, setAllowedFileTypes] = useState([]);
  useEffect(() => {
    if (!isSupported) return;
    const inputElement = document.getElementById("filePondInput");

    if (inputElement) {
      const options: FilePondOptions = {
        labelFileLoadError: "The file could not be loaded.",

        allowReorder: true,
        maxFiles: 2,
        allowMultiple: true,
        credits: false,
        ...props,
        onerror: (error) => {
          console.error("FilePond error: ", error);
        },
      };

      if (options.onupdatefiles) {
        const cb = options.onupdatefiles;
        options.onupdatefiles = (items) => {
          cb(items);
        };
      }

      setPond(create(inputElement, options));
    }
  }, []);

  useEffect(() => {
    if (!pond) return;

    const options = {...props};
    delete options.onupdatefiles;

    pond.setOptions(options);
  }, [props, pond]);

  return (
    // <div className="filepond--wrapper">
    //   <input id="filePondInput" type="file" name="filepond" />
    // </div>

    <Card
      style={{
        backgroundColor: "transparent",

        // border: "2px dashed ".concat(primaryColor),
        border: "2px dashed #18c964",
      }}
      className=" border-dashed "
    >
      <CardBody className="items-center justify-center">
        <Card className="w-72">
          <CardBody>
            sf
            <input id="filePondInput" type="file" name="filepond" />
          </CardBody>
        </Card>
        <Card className="w-72" isPressable>
          {/* <Card onPress={open} className="w-72" isPressable> */}
          <CardBody className="text-center ">
            <h1 className={subtitle({fullWidth: true, size: "sm"})}>+ Select Files</h1>
          </CardBody>
        </Card>

        <Spacer y={2} />
        <Link underline="none">or</Link>
        <h2
          className={subtitle({
            fullWidth: true,
            class: "text-center",
            size: "xs",
          })}
        >
          drop your files here...
        </h2>
        <Divider className="my-2" />
        <div className="max-w-96 gap-2 text-center">
          {allowedFileTypes.map((fileType) => (
            <Chip key={getRandomId()} className="m-[2px]" color="success" variant="flat">
              {mimeToExtension(fileType) != undefined
                ? mimeToExtension(fileType)?.toUpperCase()
                : fileType}
            </Chip>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
