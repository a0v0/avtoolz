import {DndContext} from "@dnd-kit/core";
import {SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {Card, CardBody, CardHeader, Link, Spacer} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";

import {SortableFilePreviewList} from "./sortable-file-preview/sortable";
import {Logo} from "./icons";
import {subtitle, title} from "./primitives";
// import { SortableItem } from "./sortable";

interface FileUploderProps {
  onFilesSelect: (files: File[]) => void;

  primaryColor: string;
}

function SortableItem(props: {item: File; id: any}) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: props.id});
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="max-h-64 max-w-56  py-4"
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{props.item.name}</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">Sample</CardBody>
    </Card>
  );
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
  const [isPreviewVsible, setIsPreviewVsible] = useState(false);

  useEffect(() => {
    if (acceptedFiles) {
      const files = selectedFiles.concat(acceptedFiles);
      setSelectedFiles(files);
      onFilesSelect(files);
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (selectedFiles.length > 0) {
      setIsPreviewVsible(true);
    } else {
      setIsPreviewVsible(false);
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

  // function handleDragEnd({active, over}: DragEndEvent) {
  //   if (!over) {
  //     return;
  //   }

  //   setSelectedFiles((items) => arrayMove(items, items.indexOf(active.id), items.indexOf(over.id)));
  // }

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
          now drop them <h1 className={title({color: "green", size: "xs"})}>Sire!</h1>
        </CardBody>
      </Card>
      <SortableFilePreviewList />
      {isPreviewVsible ? (
        <DndContext>
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={selectedFiles.map(({name}) => `${name}`)}
          >
            <div className="gap-1 grid grid-cols-2 sm:grid-cols-4">
              {selectedFiles.map((item, index) => (
                <SortableItem item={item} id={index} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
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
