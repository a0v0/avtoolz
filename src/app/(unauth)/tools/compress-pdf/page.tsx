"use client";

import FileUploader from "@/components/fileUploader";
import { useFileUploaderStore } from "@/components/fileUploader/store";
import { getToolByHref } from "@/config/tools";
import { MimeType } from "@/lib/mime.js";
import { subtitle, title } from "@/lib/primitives";
import { PDFWorker } from "@/lib/workers/pdf.js";
import ToolTemplate from "@/templates/tool_template";
import { downloadURL, getWatermarkedFilename } from "@/utils/helpers";
import { Button, Divider, Spacer } from "@heroui/react";
import { wrap } from "comlink";
import { usePathname } from "next/navigation";

const allowedFileTypes: MimeType[] = ["application/pdf"];

// TODO preload wasm module or inform user about the delay
export default function Page() {
  const { files, reset, loading, setLoading } = useFileUploaderStore();
  const path = usePathname();
  const tool = getToolByHref(path);

  async function _doWork() {
    if (files.length === 0) return;

    setLoading(true);
    try {
      const worker = wrap<typeof PDFWorker>(
        new Worker(new URL("@/lib/workers/pdf.ts", import.meta.url))
      );
      const output = await worker.compressPDF(files[0]!);
      downloadURL(
        output,
        getWatermarkedFilename(files[0]!.name, "application/pdf")
      );
    } catch (error) {
      console.error("PDF compression failed:", error);
      // Display error to user
    } finally {
      setLoading(false);
    }
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
              maxFiles={1}
              // multiple={false}
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
                  isLoading={loading}
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
    </>
  );
}
