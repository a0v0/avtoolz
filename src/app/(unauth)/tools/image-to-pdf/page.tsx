"use client";

import FileUploader from "@/components/fileUploader";
import { useFileUploaderStore } from "@/components/fileUploader/store";
import { getToolByHref } from "@/config/tools";
import { MimeType } from "@/lib/mime";
import { subtitle, title } from "@/lib/primitives";
import {
  PAGE_MARGIN,
  PAGE_ORIENTATION,
  PAGE_SIZE,
  PDFWorker,
} from "@/lib/workers/pdf";
import ToolTemplate from "@/templates/tool_template";
import { downloadURL, getWatermarkedFilename } from "@/utils/helpers";
import { Button, Card, Select, SelectItem, Spacer } from "@heroui/react";
import { wrap } from "comlink";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";

const allowedFileTypes: MimeType[] = [
  "image/jpeg",
  "image/webp",
  "image/png",
  // TODO add support for more image types
  // "image/svg+xml",
  // "image/bmp",
  // "image/tiff",
  // "image/gif",
  // "image/heif",
  // "image/heic",
];

export default function Page() {
  const { files, reset, metadata, loading, setLoading } =
    useFileUploaderStore();
  const path = usePathname();
  const tool = getToolByHref(path);
  const t = useTranslations();

  const [pageOrientation, setPageOrientation] =
    useState<(typeof PAGE_ORIENTATION)[number]>("Portrait");
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE)[number]>("Fit"); // default to Fit
  const [pageMargin, setPageMargin] =
    useState<(typeof PAGE_MARGIN)[number]>("None"); // default to None

  async function _doWork() {
    setLoading(true);
    const worker = wrap<typeof PDFWorker>(
      new Worker(new URL("@/lib/workers/pdf.ts", import.meta.url))
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

    setLoading(false);
  }

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
                      // @ts-ignore
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
                      // @ts-ignore
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
                  {t("common.reset")}
                </Button>
                <Spacer x={2} />
                <Button
                  id="btn-submit"
                  color="success"
                  variant="solid"
                  size="lg"
                  isLoading={loading}
                  onPress={_doWork}
                >
                  {t("image_to_pdf.convert_to_pdf")}
                </Button>
              </div>
            </>
          ) : null
        }
      />
    </>
  );
}
