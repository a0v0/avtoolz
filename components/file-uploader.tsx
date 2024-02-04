import {Button, Card, CardBody, Link, Spacer} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {subtitle} from "./primitives";

interface FileUploderProps {
  onFilesSelect: (files: File[]) => void;
  enableDragAndDropOnBody?: boolean;
}

const FileUploader: React.FC<FileUploderProps> = ({onFilesSelect, enableDragAndDropOnBody}) => {
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
      <Card {...getRootProps({className: "dropzone lg:max-w-[50rem] m-3"})}>
        <CardBody className="items-center justify-center">
          <input {...getInputProps()} />
          <Button size="lg" onPress={open} color="success" variant="bordered">
            + Select Files
          </Button>
          <Spacer y={2} />
          <Link href="#" underline="none">
            or
          </Link>
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
