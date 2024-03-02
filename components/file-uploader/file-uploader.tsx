import {Card, CardBody, Link, Spacer} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {Logo} from "../icons";
import {subtitle, title} from "../primitives";
import {Layout} from "./preview/Page";
import {FilePreview} from "./preview/Pages";

interface FileUploderProps {
  onFilesSelect: (files: File[]) => void;
  primaryColor: string;
}

const FileUploader: React.FC<FileUploderProps> = ({onFilesSelect, primaryColor}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const {acceptedFiles, isDragAccept, isDragActive, getRootProps, getInputProps, open} =
    useDropzone({
      //  keydown behavior
      noKeyboard: true,
    });
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  useEffect(() => {
    if (acceptedFiles) {
      const files = selectedFiles.concat(acceptedFiles);
      setSelectedFiles(files);
      onFilesSelect(files);
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (selectedFiles.length > 0) {
      setIsPreviewVisible(true);
    } else {
      setIsPreviewVisible(false);
    }
  }, [selectedFiles]);

  useEffect(() => {
    setIsOverlayVisible(isDragging);
  }, [isDragging]);

  useEffect(() => {
    setIsOverlayVisible(isDragActive);
  }, [isDragActive]);

  document.addEventListener("dragover", (e) => {
    setIsDragging(true);
  });
  document.addEventListener("dragend", (e) => {
    setIsDragging(false);
  });
  document.addEventListener("dragleave", (e) => {
    setIsDragging(false);
  });

  return (
    <>
      <Card
        style={{display: isOverlayVisible ? "block" : "none"}}
        {...getRootProps({
          className: "dropzone fixed inset-0 bg-black bg-opacity-70 z-50",
        })}
      >
        <CardBody
          style={{color: "white"}}
          // style={{color: theme === "light" ? "white" : "null"}}
          className="justify-center items-center h-screen "
          onClick={() => setIsOverlayVisible(false)}
        >
          <Logo size={50} />
          drop them all <h1 className={title({color: "green", size: "xs"})}>Sire!</h1>
        </CardBody>
      </Card>

      {/* file preview here */}

      {isPreviewVisible ? (
        <FilePreview focusRingColor={primaryColor} files={selectedFiles} layout={Layout.Grid} />
      ) : (
        <Card
          style={{
            backgroundColor: "transparent",
            borderStyle: "dashed",
            border: "2px dashed ".concat(primaryColor),
          }}
        >
          <CardBody className="items-center justify-center">
            <input {...getInputProps()} />

            <Card onPress={open} className="w-72 " isPressable>
              <CardBody className="text-center ">
                <h1 className={subtitle({fullWidth: true, size: "sm"})}>+ Select Files</h1>
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
              drop your files here...
            </h2>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default FileUploader;

// TODO: file preview
// TODO: file reorder capability
// TODO: error dialog on incompatible files
