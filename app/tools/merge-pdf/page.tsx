"use client";

import FileUploader from "@/components/file-uploader/file-uploader";
import {subtitle, title} from "@/components/primitives";
import {getToolByHref} from "@/config/config";
import {Button, Spacer} from "@nextui-org/react";
import {usePathname} from "next/navigation";
import {useState} from "react";

export default function page() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFilesSelect = (files: File[]) => {
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
        <Spacer y={3} />
        <h1 className={title({color: "green"})}>{tool?.title}</h1>
        <h2
          className={subtitle({
            fullWidth: true,
          })}
        >
          {tool?.description}
        </h2>
        <Spacer y={6} />
        <FileUploader primaryColor="#18c964" onFilesSelect={handleFilesSelect} />
        {uploadedFiles.length > 0 ? (
          <>
            <Spacer y={6} />
            <Button onPress={_showLogs}>Merge PDF</Button>
          </>
        ) : null}
      </center>

      {/* <Dashboard uppy={uppy} /> */}
    </>
  );
}
