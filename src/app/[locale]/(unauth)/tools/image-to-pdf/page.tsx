"use client";

import FileUploader from "@/components/fileUploader";
import { useFileUploaderStore } from "@/components/fileUploader/store";
import { getToolByHref } from "@/config/tools";
import { MimeType } from "@/libs/mime";
import { subtitle, title } from "@/libs/primitives";
import {
  PAGE_MARGIN,
  PAGE_ORIENTATION,
  PAGE_SIZE,
  PDFWorker,
} from "@/libs/workers/pdf";
import ToolTemplate from "@/templates/tool_template";
import { downloadURL, getWatermarkedFilename } from "@/utils/helpers";
import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import { wrap } from "comlink";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

export default function Page() {
  const { files, reset, error, metadata } = useFileUploaderStore();
  const path = usePathname();
  const tool = getToolByHref(path);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [pageOrientation, setPageOrientation] =
    useState<(typeof PAGE_ORIENTATION)[number]>("Portrait");
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE)[number]>("Fit"); // default to Fit
  const [pageMargin, setPageMargin] =
    useState<(typeof PAGE_MARGIN)[number]>("None"); // default to None

  async function _doWork() {
    setIsLoading(true);
    const worker = wrap<typeof PDFWorker>(
      new Worker(new URL("@/libs/workers/pdf.ts", import.meta.url))
    );
    const outputPDF = await worker.imagesToPDF({
      // filter only those elements from metadata whose file is in files, keep the order intact
      images: metadata
        .filter((m) => files.includes(m.file))
        .sort((a, b) => files.indexOf(a.file) - files.indexOf(b.file)),
      margin: pageMargin,
      orientation: pageOrientation,
      size: pageSize,
    });

    downloadURL(
      outputPDF,
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
              <Spacer y={2} />
              <div>
                <h3 style={{ fontSize: "1.2rem" }}>Page Orientation</h3>
                <Spacer y={1} />
                <div className="border-0 flex justify-center flex-row">
                  <Button
                    color="success"
                    variant={pageOrientation === "Portrait" ? "solid" : "flat"}
                    onPress={() => setPageOrientation("Portrait")}
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
                    variant={pageOrientation === "Landscape" ? "solid" : "flat"}
                    onPress={() => setPageOrientation("Landscape")}
                    className="w-24 h-24 p-2"
                    style={{ alignItems: "end" }}
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
              <Spacer y={2} />
              <div>
                <h2 style={{ fontSize: "1.2rem" }}>Page Size</h2>
                <Spacer y={1} />
                <Select
                  label="Page Size"
                  defaultSelectedKeys={[pageSize]}
                  onSelectionChange={(key) =>
                    new Set(key).forEach((v) => {
                      setPageSize(v);
                    })
                  }
                  selectionMode="single"
                  disallowEmptySelection
                >
                  {PAGE_SIZE.map((size) => (
                    <SelectItem key={size}>{size}</SelectItem>
                  ))}
                </Select>
              </div>
              <Spacer y={2} />
              <div>
                <h2 style={{ fontSize: "1.2rem" }}>Page Margin</h2>
                <Spacer y={1} />
                <Select
                  onSelectionChange={(key) =>
                    new Set(key).forEach((v) => {
                      setPageMargin(v);
                    })
                  }
                  defaultSelectedKeys={[pageMargin]}
                  label="Page Margin"
                  selectionMode="single"
                  disallowEmptySelection
                >
                  {PAGE_MARGIN.map((margin) => (
                    <SelectItem key={margin}>{margin}</SelectItem>
                  ))}
                </Select>
              </div>
              <Spacer y={2} />
              <div className="flex justify-center items-end">
                <Button color="danger" variant="bordered" onPress={reset}>
                  Reset
                </Button>
                <Spacer x={2} />
                <Button
                  id="btn-submit"
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
