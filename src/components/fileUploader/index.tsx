"use client";
import { XErrors } from "@/config/errors";
import { MimeType, mimeToExtension } from "@/libs/mime";
import { subtitle } from "@/libs/primitives";
import { getNanoID } from "@/utils/id";
import { swap } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { Preview } from "./preview";
import { useFileUploaderStore } from "./store";

interface FileUploaderProps extends DropzoneOptions {
  primaryColor: string;
  acceptedFileTypes: MimeType[];
}
export const FileUploader = (props: FileUploaderProps) => {
  const router = useRouter();
  const { files, addFiles, reset, updateFiles, setLoading, error, setError } =
    useFileUploaderStore((state) => state);
  const t = useTranslations();

  const [parent, filesHolder, _setValues] = useDragAndDrop<
    HTMLDivElement,
    File
  >(files, {
    group: "files",
    dragHandle: ".file-drag-handle",
    plugins: [swap()],
    draggable: (el) => {
      return el.id !== "no-drag";
    },
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { acceptedFiles, getInputProps, open } = useDropzone({
    accept: props.acceptedFileTypes.reduce((acc, fileType) => {
      return { ...acc, [fileType]: [] };
    }, {}),
    noKeyboard: true,
    noClick: true,
    onDropRejected: () => {
      setError(XErrors.invalidFile);
      onOpen();
    },
    ...props,
  });

  // add files to store
  useEffect(() => {
    if (acceptedFiles) {
      addFiles(acceptedFiles);
    }
  }, [acceptedFiles, addFiles]);

  useEffect(() => {
    _setValues(files);
  }, [_setValues, files]);

  useEffect(() => {
    updateFiles(filesHolder);
  }, [filesHolder, updateFiles]);

  // reset state when route changes
  useEffect(() => {
    reset();
  }, [reset, router]);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error, setLoading]);

  return (
    <div>
      {files.length > 0 ? (
        <div
          ref={parent}
          className="lg:md:w-[780px] m-4 flex flex-wrap gap-5 pt-2 justify-items-center"
        >
          {filesHolder.map((file, index) => (
            <Preview key={index} file={file} />
          ))}

          {filesHolder.length > 0 && props.maxFiles ? (
            props.maxFiles > 1
          ) : 1 ? (
            <div id="no-drag" className="m-auto h-44 content-center">
              <Card
                onPress={open}
                isPressable
                radius="lg"
                className="h-32 w-32 rounded-full   align-middle   border-dashed border-4 border-gray-300 hover:border-gray-500"
              >
                <input {...getInputProps()} />
                <CardBody
                  style={{ fontSize: "25px" }}
                  className="font-bold text-center justify-center"
                >
                  +
                </CardBody>
              </Card>
            </div>
          ) : null}
        </div>
      ) : (
        <Card
          style={{
            backgroundColor: "transparent",
            borderStyle: "dashed",
            border: "2px dashed ".concat(props.primaryColor),
          }}
          className="mx-3 lg:md:w-[780px]"
        >
          <CardBody className=" items-center justify-center">
            <input id="fileInput" {...getInputProps()} />

            <Card onPress={open} className="w-72" isPressable>
              <CardBody className="text-center ">
                <h1 className={subtitle({ fullWidth: true, size: "sm" })}>
                  {t("file_uploader.select_files")}
                </h1>
              </CardBody>
            </Card>

            <Spacer y={2} />
            <Link underline="none">or</Link>
            <h2
              className={subtitle({
                fullWidth: true,
                class: "text-center",
                size: "xs",
              })}
            >
              {t("file_uploader.drop_files")}
            </h2>
            <Divider className="my-2" />
            <div className="max-w-96 gap-2 text-center">
              {props.acceptedFileTypes.map((fileType) => (
                <Chip
                  key={getNanoID()}
                  className="m-[2px]"
                  color="success"
                  variant="flat"
                >
                  {mimeToExtension(fileType) != undefined
                    ? mimeToExtension(fileType)?.toUpperCase()
                    : fileType}
                </Chip>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
      {error ? (
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {error.title}
                </ModalHeader>
                <ModalBody>{error.message}</ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    OK
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      ) : null}
    </div>
  );
};

export default FileUploader;
