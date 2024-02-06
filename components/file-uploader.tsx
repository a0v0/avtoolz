import {Card, CardBody, Link, Spacer} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {subtitle} from "./primitives";

interface FileUploderProps {
  onFilesSelect: (files: File[]) => void;
  enableDragAndDropOnBody?: boolean;
  primaryColor: string;
}

const FileUploader: React.FC<FileUploderProps> = ({
  onFilesSelect,
  enableDragAndDropOnBody,
  primaryColor,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const {acceptedFiles, isDragAccept, isDragActive, getRootProps, getInputProps, open} =
    useDropzone({
      //  keydown behavior
      noKeyboard: true,
      onDragEnter: () => {
        setIsOverlayActive(true);
      },
      onDragLeave: () => {
        setIsOverlayActive(false);
      },
    });

  useEffect(() => {
    if (acceptedFiles) {
      const files = selectedFiles.concat(acceptedFiles);
      setSelectedFiles(files);
      onFilesSelect(files);
    }
  }, [acceptedFiles]);

  return (
    // TODO: add fullscreen overlay when isDragActive
    <>
      <Card
        style={{
          backgroundColor: "transparent",
          borderStyle: "dashed",
          // border: "2px dashed #a1a1aa",
          border: "2px dashed ".concat(primaryColor),

          // borderColor:
        }}
        {...getRootProps({className: "dropzone"})}
      >
        <CardBody className="items-center justify-center">
          <input {...getInputProps()} />
          <Card onPress={open} isPressable className="w-72 ">
            <CardBody className="text-center">
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
            Drag and Drop your files here...
          </h2>
        </CardBody>
      </Card>
      {isDragActive ? <div> j</div> : null}
    </>
  );
};

export default FileUploader;
