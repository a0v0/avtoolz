"use client";

import FileUploader from "@/components/fileUploader";
import { useFileUploaderStore } from "@/components/fileUploader/store";
import { getToolByHref } from "@/config/tools";
import { MimeType } from "@/libs/mime";
import { subtitle, title } from "@/libs/primitives";
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
import { PDFWorker } from "../../../../../libs/workers/pdf";

const allowedFileTypes: MimeType[] = ["application/pdf"];

enum PAGE_ORIENTATION {
  Portrait = "Portrait",
  Landscape = "Landscape",
}

// const PAGE_SIZE = [
//   { key: "Fit", label: "Fit" },
//   { key: "A4", label: "A4" },
//   { key: "US", label: "US" },
// ];

// const PAGE_MARGIN = ["None", "Small", "Big"];

export default function Page() {
  const { files, reset, error } = useFileUploaderStore();
  const path = usePathname();
  const tool = getToolByHref(path);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // const [pageOrientation, setPageOrientation] = useState(
  //   PAGE_ORIENTATION.Portrait
  // );
  // const [pageSize, setPageSize] = useState(new Set(["Fit"]));
  // const [pageMargin, setPageMargin] = useState(PAGE_MARGIN[0]); // default to None

  async function _doWork() {
    setIsLoading(true);
    const worker = wrap<typeof PDFWorker>(
      new Worker(new URL("@/libs/workers/pdf.ts", import.meta.url))
    );
    const outputFile = await worker.mergePDFs(files);
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
              {/* <div>
                <h3 style={{ fontSize: "1.2rem" }}>Page Orientation</h3>
                <Spacer y={1} />
                <div className="border-0 flex justify-center flex-row">
                  <Button
                    color="success"
                    variant={
                      pageOrientation == PAGE_ORIENTATION.Portrait
                        ? "solid"
                        : "flat"
                    }
                    onPress={() =>
                      setPageOrientation(PAGE_ORIENTATION.Portrait)
                    }
                    className="w-24 h-24 p-2"
                    style={{ alignItems: "end" }}
                  >
                    <div>
                      <Card className="flex flex-row h-16 justify-center items-center">
                        <div className="rotate-90 ">|||</div>
                      </Card>
                      <div>Portrait</div>
                    </div>
                  </Button>
                  <Spacer x={2} />
                  <Button
                    color="success"
                    variant={
                      pageOrientation === PAGE_ORIENTATION.Landscape
                        ? "solid"
                        : "flat"
                    }
                    onPress={() =>
                      setPageOrientation(PAGE_ORIENTATION.Landscape)
                    }
                    className="w-24 h-24 p-2"
                    style={{ alignItems: "end" }}
                    // active={pageOrientation === PAGE_ORIENTATION.Landscape}
                  >
                    <div>
                      <Card className="flex flex-row h-9 justify-center items-center">
                        <div>|||</div>
                      </Card>
                      <div>Landscape</div>
                    </div>
                  </Button>
                </div>
              </div> */}
              {/* <Spacer y={2} />
              <div>
                <h2 style={{ fontSize: "1.2rem" }}>Page Size</h2>
                <Spacer y={1} />
                <Select
                  // label="Page Size"

                  defaultSelectedKeys={["Fit"]}
                  // onSelectionChange={setPageSize}
                  // className="max-w-[45%]"
                >
                  {PAGE_SIZE.map((size) => (
                    <SelectItem key={size.key}>{size.label}</SelectItem>
                  ))}
                </Select>
              </div>
              <Spacer y={2} />
              <div>
                <h2 style={{ fontSize: "1.2rem" }}>Margin</h2>
              </div> */}
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
                  Merge PDF
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

// @a0v0 Pickup from here
