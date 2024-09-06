"use client";

import FileUploader from "@/components/fileUploader";
import { useFileUploaderStore } from "@/components/fileUploader/store";
import { getToolByHref } from "@/config/tools";
import { MimeType } from "@/libs/mime";
import { subtitle, title } from "@/libs/primitives";
import { PDFWorker } from "@/libs/workers/pdf";
import ToolTemplate from "@/templates/tool_template";
import { downloadURL, getWatermarkedFilename } from "@/utils/helpers";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import { wrap } from "comlink";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const allowedFileTypes: MimeType[] = ["application/pdf"];

export default function Page() {
  const { files, reset, error } = useFileUploaderStore();
  const path = usePathname();
  const tool = getToolByHref(path);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function _doWork() {
    setIsLoading(true);
    const worker = wrap<typeof PDFWorker>(
      new Worker(new URL("@/libs/workers/pdf.ts", import.meta.url))
    );
    const outputFile = await worker.compressPDF(files[0]!);

    downloadURL(
      outputFile,
      getWatermarkedFilename(files[0]!.name, "application/pdf")
    );
    setIsLoading(false);
  }

  useEffect(() => {
    if (error.length > 0) {
      onOpen();
      reset();
      setIsLoading(false);
    }
  }, [error]);

  return (
    <>
      <ToolTemplate
        leftChildren={
          <center>
            {files.length > 0 ? null : (
              <>
                <h1 className={title({ color: "green" })}>{tool?.title}</h1>
                <h2
                  className={subtitle({
                    fullWidth: true,
                  })}
                >
                  {tool?.description}
                </h2>
                <Spacer y={6} />
              </>
            )}

            <FileUploader
              primaryColor="#18c964"
              acceptedFileTypes={allowedFileTypes}
            />

            <Spacer y={6} />
          </center>
        }
        rightChildren={
          files.length > 0 ? (
            <>
              <h2
                className="self-center"
                style={{ fontSize: "2rem", fontWeight: "bold" }}
              >
                {tool?.title}
              </h2>
              <Divider />
              <Spacer y={2} />

              <Spacer y={2} />
              <div className="flex justify-center items-end">
                <Button color="danger" variant="bordered" onPress={reset}>
                  Reset
                </Button>
                <Spacer x={2} />
                <Button
                  color="success"
                  variant="solid"
                  size="lg"
                  isLoading={isLoading}
                  onPress={_doWork}
                  id="btn-submit"
                >
                  Compress PDF
                </Button>
              </div>
            </>
          ) : null
        }
      />
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Invalid File
              </ModalHeader>
              <ModalBody>
                <p>
                  One or more of the files you have selected are not supported,
                  invalid, or corrupted.
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
