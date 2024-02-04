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
    });

  useEffect(() => {
    if (acceptedFiles) {
      const files = selectedFiles.concat(acceptedFiles);
      setSelectedFiles(files);
      onFilesSelect(files);
    }
  }, [acceptedFiles]);

  useEffect(() => {
    console.log("dragactive");
    setIsOverlayActive(isDragAccept);
  }, [isDragAccept]);

  return (
    // TODO: add fullscreen overlay when isDragActive
    <Card {...getRootProps({className: "dropzone lg:max-w-[50rem] m-3"})}>
      {/* <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">NextUI</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardHeader> */}
      {/* <Divider /> */}
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
        {isDragActive ? "true" : "false"}
      </CardBody>
      {/* <Divider />
      <CardFooter>
        <Link isExternal showAnchorIcon href="https://github.com/nextui-org/nextui">
          Visit source code on GitHub.
        </Link>
      </CardFooter> */}
    </Card>

    // <div>
    //   <input type="file" onChange={handleFileChange} multiple />
    //   {/* You can add additional UI elements or styles here */}
    // </div>
  );
};

export default FileUploader;
