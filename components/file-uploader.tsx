import {Button, Card, CardBody, Link} from "@nextui-org/react";
import Uppy from "@uppy/core";
import DropTarget from "@uppy/drop-target";
import {ChangeEvent, useState} from "react";
import {subtitle} from "./primitives";

interface FileUploderProps {
  onFilesSelect: (files: FileList) => void;
  enableDragAndDropOnBody?: boolean;
}

const FileUploader: React.FC<FileUploderProps> = ({onFilesSelect, enableDragAndDropOnBody}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uppy] = useState(() =>
    new Uppy().use(DropTarget, {
      target: enableDragAndDropOnBody ? document.body : "",
    }),
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(files);
      onFilesSelect(files);
    }
  };

  return (
    <Card className="lg:max-w-[50rem] md:m-3">
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
        <Button color="success" variant="bordered">
          + Select Files
        </Button>
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
