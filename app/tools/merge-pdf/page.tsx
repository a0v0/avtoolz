"use client";

import FileUploader from "@/components/file-uploader/file-uploader";
import {useFileUploaderStore} from "@/components/file-uploader/store";
import {subtitle, title} from "@/components/primitives";
import {getToolByHref} from "@/config/config";
import {downloadFile} from "@/utils/download";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

export default function page() {
  const {files, reset, error} = useFileUploaderStore();
  const path = usePathname();
  const tool = getToolByHref(path);
  const [isLoading, setIsLoading] = useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  function _mergePDF() {
    setIsLoading(true);

    const plusWorker = new Worker(new URL("./worker.ts", import.meta.url));

    plusWorker.onmessage = (event) => {
      const result = event.data;
      setIsLoading(false);
      console.log("🍎 Result: ", result);
      downloadFile(result, files[0].name.split(".")[0] + "-merged.pdf");
    };

    plusWorker.postMessage(files);
  }

  useEffect(() => {
    if (error.length > 0) {
      onOpen();
      reset();
    }
  }, [error]);

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
            <Button color="danger" variant="bordered" onPress={reset}>
              Reset
            </Button>
            <Button color="success" variant="bordered" isLoading={isLoading} onPress={_mergePDF}>
              Merge PDF
            </Button>
          </div>
        ) : null}
      </center>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Invalid File</ModalHeader>
              <ModalBody>
                <p>
                  One or more of the files you have selected are not supported, invalid, or
                  corrupted.
                </p>
                <p>Please ensure that the file is valid and not corrupted.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

// TODO: add "Add more files" button
