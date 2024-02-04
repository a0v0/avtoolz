"use client";

import {subtitle, title} from "@/components/primitives";

import FileUploader from "@/components/file-uploader";
import {Button, Spacer} from "@nextui-org/react";

import {usePathname} from "next/navigation";
import {useState} from "react";
import {getToolByHref} from "../config";

export default function page() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFilesSelect = (files: FileList) => {
    // You can perform additional actions with the selected files if needed
    const fileList = Array.from(files);
    setUploadedFiles(fileList);
  };

  const path = usePathname();
  const tool = getToolByHref(path);

  function _showLogs() {
    // console.log(uppy.getFiles()[0]);
    console.log(uploadedFiles);
  }

  return (
    <>
      <center>
        <h1 className={title({color: "green"})}>{tool?.title}</h1>
        <h2
          className={subtitle({
            fullWidth: true,
            class: "text-center",
          })}
        >
          {tool?.description}
        </h2>
        <FileUploader onFilesSelect={handleFilesSelect} enableDragAndDropOnBody />
        <Spacer y={3} />
        <Button onPress={_showLogs}>Merge PDF</Button>
      </center>

      {/* <Dashboard uppy={uppy} /> */}
    </>
  );
}
