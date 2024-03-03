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

  function _mergePDF() {
    // console.log(uppy.getFiles()[0]);
    console.log(uploadedFiles);
  }

  function _reset() {
    setUploadedFiles([]);
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
          <div className="grid grid-cols-2 gap-2">
            <Button color="success" variant="bordered" onPress={_mergePDF}>
              Merge PDF
            </Button>

            <Button color="danger" variant="bordered" onPress={_reset}>
              Reset
            </Button>
          </div>
        ) : null}
      </center>

      {/* <Dashboard uppy={uppy} /> */}
    </>
  );
}
