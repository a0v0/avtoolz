"use client";

import FileUploader from "@/components/fileUploader";
import { useFileUploaderStore } from "@/components/fileUploader/store";
import { getToolByHref } from "@/config/tools";
import { MimeType } from "@/libs/mime";
import { subtitle, title } from "@/libs/primitives";
import { PDFWorker } from "@/libs/workers/pdf";
import ToolTemplate from "@/templates/tool_template";
import { downloadURL, getWatermarkedFilename } from "@/utils/helpers";
import { Button, Divider, Spacer } from "@nextui-org/react";
import { usePathname } from "next/navigation";
const allowedFileTypes: MimeType[] = ["application/pdf"];

// BUG: PDF that contain only text is replace with small boxed
export default function Page() {
  const { files, reset, loading, setLoading } = useFileUploaderStore();
  const path = usePathname();
  const tool = getToolByHref(path);

  async function _doWork() {
    setLoading(true);

    const htmlCanvas = document.createElement("canvas");
    // TODO: dynamically set  via slider
    const outputFile = await PDFWorker.compressPDF(files[0]!, 0.9, htmlCanvas);

    downloadURL(
      outputFile,
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
