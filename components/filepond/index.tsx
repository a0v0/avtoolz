import {create, FilePond, FilePondOptions, FileStatus, registerPlugin, supported} from "filepond";
import React, {useEffect, useRef, useState} from "react";
export {FileStatus, registerPlugin};

// plugins
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";

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
  const element = useRef<HTMLDivElement>(null);
  const [pond, setPond] = useState<FilePond | null>(null);

  useEffect(() => {
    if (!isSupported) return;
    const inputElement = document.getElementById("#filePondInput");

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
    <div className="filepond--wrapper" ref={element}>
      <input id="filePondInput" type="file" name="filepond" />
    </div>
  );
};
