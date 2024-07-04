"use client";

import FileUploader from "@/components/fileUploader";
import { useFileUploaderStore } from "@/components/fileUploader/store";
import { getToolByHref } from "@/config/tools";
import { MimeType } from "@/libs/mime";
import { subtitle, title } from "@/libs/primitives";
import ToolTemplate from "@/templates/tool_template";
import { downloadObjectURL } from "@/utils/helpers";
import { Button, Card, Spacer, useDisclosure } from "@nextui-org/react";
import { wrap } from "comlink";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PDFWorker } from "../../../../../libs/workers/pdf";
const allowedFileTypes: MimeType[] = [
  "image/jpeg",
  "image/webp",
  "image/png",
  // TODO: add support for these too
  // "image/svg+xml",
  // "image/bmp",
  // "image/tiff",
  // "image/gif",
  // "image/heif",
  // "image/heic",
];

enum PAGE_ORIENTATION {
  Portrait = "Portrait",
  Landscape = "Landscape",
}

enum PAGE_SIZE {
  Fit = "Fit",
  A4 = "A4",
  US = "US",
}

enum PAGE_MARGIN {
  None = "None",
  Small = "Small",
  Big = "Big",
}

export default function Page() {
  const { files, reset, error } = useFileUploaderStore();
  const path = usePathname();
  const tool = getToolByHref(path);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [pageOrientation, setPageOrientation] = useState(
    PAGE_ORIENTATION.Portrait
  );
  const [pageSize, setPageSize] = useState(PAGE_SIZE.Fit);
  const [pageMargin, setPageMargin] = useState(PAGE_MARGIN.None);

  // _doWork function is used to trigger the worker to start processing the data
  async function _doWork() {
    setIsLoading(true);

    const worker = wrap<typeof PDFWorker>(
      new Worker(new URL("@/libs/workers/pdf.ts", import.meta.url))
    );
    const outputPDF = await worker.imagesToPDF(files);

    downloadObjectURL(outputPDF, files[0].name.split(".")[0] + "-merged.pdf");
    // worker.onmessage = (event: MessageEvent<WorkerOutput>) => {
    //   setIsLoading(false);
    //   const { blob, error } = event.data;
    //   if (error?.length == 0) {
    //     downloadFile(blob, files[0].name.split(".")[0] + "-merged.pdf");
    //   } else {
    //     onOpen();
    //     reset();
    //   }
    // };

    // const workerInput: WorkerInput = {
    //   files: files,
    // };
    // worker.postMessage(workerInput);
    setIsLoading(false);
  }

  useEffect(() => {
    if (error.length > 0) {
      onOpen();
      reset();
    }
  }, [error]);

  return (
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
            <center>
              <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>Options</h2>
            </center>
            <Spacer y={2} />
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                Page Orientation
              </h2>
              <div className="border-0 flex justify-center flex-row">
                <Button
                  color="success"
                  variant={
                    pageOrientation == PAGE_ORIENTATION.Portrait
                      ? "solid"
                      : "flat"
                  }
                  onPress={() => setPageOrientation(PAGE_ORIENTATION.Portrait)}
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
                  onPress={() => setPageOrientation(PAGE_ORIENTATION.Landscape)}
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
            </div>
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                Page Size
              </h2>
            </div>
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Margin</h2>
            </div>
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
              >
                Convert to PDF
              </Button>
            </div>
          </>
        ) : null
      }
    />
  );
}

// @a0v0 Pickup from here
