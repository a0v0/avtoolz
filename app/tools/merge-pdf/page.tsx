"use client";

import FileUploader from "@/components/file-uploader/file-uploader";
import {useFileUploaderStore} from "@/components/file-uploader/store";
import {subtitle, title} from "@/components/primitives";
import {getToolByHref} from "@/config/config";
import {Button, Spacer} from "@nextui-org/react";
import {usePathname} from "next/navigation";

export default function page() {
  const {files, reset} = useFileUploaderStore();

  const path = usePathname();
  const tool = getToolByHref(path);

  function _mergePDF() {
    console.log(files);
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
        <FileUploader primaryColor="#18c964" acceptedFileTypes={["application/pdf"]} />
        {files.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            <Button color="success" variant="bordered" onPress={_mergePDF}>
              Merge PDF
            </Button>

            <Button color="danger" variant="bordered" onPress={reset}>
              Reset
            </Button>
          </div>
        ) : null}
      </center>
    </>
  );
}
