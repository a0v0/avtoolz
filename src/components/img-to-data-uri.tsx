import { useColorMode } from "@docusaurus/theme-common";
import {
  Badge,
  Button,
  Card,
  Grid,
  Loading,
  Spacer,
  Text,
} from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { useFilePicker } from "use-file-picker";
import {
  BACKGROUND_COLOR,
  IMAGE_EXTENSION,
  SELECTED_BORDER_COLOR,
} from "../utils/constants";
import { CopyTextToClipboard } from "../utils/copy";
import { getFileSizeFromDataUri } from "../utils/size-calc";
import { Sleep } from "../utils/sleep";

const Fit = "Same as Image",
  Portrait = "Portrait";

const Tool: React.FC = () => {
  const { isDarkTheme } = useColorMode();

  const [openFileSelector, { filesContent, plainFiles, clear, loading }] =
    useFilePicker({
      multiple: true,
      readAs: "DataURL", // availible formats: "Text" | "BinaryString" | "ArrayBuffer" | "DataURL"
      // accept: '.ics,.pdf',
      accept: IMAGE_EXTENSION,
      limitFilesConfig: { min: 1, max: 1 },
      // minFileSize: 1, // in megabytes
      // maxFileSize: 1,
      // readFilesContent: false, // ignores file content
    });
  const [currentImage, setCurrentImage] = useState("");
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((src) => {
    setCurrentImage(src);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage("");
    setIsViewerOpen(false);
  };

  const [allFiles, setAllFiles] = useState(filesContent);

  const [props, setProps] = useState({
    datauri: "",
    successText: "",
    pageOrientation: Portrait,
    pageSize: Fit,
    pageMargin: 0,
    lastError: undefined,
    lastMime: null,
    forceShowOption: false,
    compressImages: false,
    imageQuality: 8,
    busy: false,
  });

  const [isPdfGenerated, setIsPdfGenerated] = useState(false);
  useEffect(() => {
    setAllFiles([...allFiles, ...filesContent]);
  }, [filesContent]);

  const masterReset = () => {
    setIsPdfGenerated(false);
    setAllFiles([]);
    clear();
    setProps({ ...props, datauri: "", successText: "" });
  };

  const copy = () => {
    setProps({
      ...props,
      busy: true,
      successText: "🤚 Please wait converting...",
    });

    Sleep(1000).then(() => {
      if (allFiles.length > 0) {
        CopyTextToClipboard(allFiles[0].content);
      }
    });

    setProps({
      ...props,
      busy: false,
      successText: "😀 DataURI Copied to clipboard",
    });
  };

  const deleteImage = (index: number) => {
    let temp = [...allFiles];
    temp.splice(index, 1);
    setAllFiles(temp);

    if (temp.length === 0) {
      masterReset();
    }
  };

  return (
    <>
      {isViewerOpen && (
        <div style={{ position: "absolute", zIndex: "99999" }}>
          <ImageViewer
            src={[currentImage]}
            currentIndex={0}
            onClose={closeImageViewer}
            disableScroll={false}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
            }}
            closeOnClickOutside={true}
          />
        </div>
      )}

      <Grid.Container gap={1} justify="flex-start">
        {allFiles.map((item, index) => (
          <Grid xs={4} sm={2} key={index}>
            <Card isPressable>
              <Card.Body css={{ p: 0, overflow: "hidden" }}>
                <Card.Image
                  src={item.content}
                  objectFit="cover"
                  width="100%"
                  height={140}
                  onClick={() => openImageViewer(item.content)}
                />
                <Card
                  css={{
                    position: "absolute",
                    backgroundColor: "#00000000",
                    // bgBlur: "#ffffff66",
                    bottom: 1,
                    zIndex: 1,
                    alignItems: "center",
                    borderRadius: 0,
                  }}
                >
                  <Badge
                    color="success"
                    variant="bordered"
                    style={{
                      background: isDarkTheme ? BACKGROUND_COLOR : null,
                    }}
                  >
                    {getFileSizeFromDataUri(item.content).toString()}
                  </Badge>
                </Card>
                <Card
                  isPressable
                  onPress={() => deleteImage(index)}
                  css={{
                    position: "absolute",
                    backgroundColor: "#00000000",
                    top: 1,
                    right: 5,
                    zIndex: 1,
                    alignItems: "end",

                    borderRadius: 0,
                    border: "2px",
                  }}
                >
                  <Badge
                    color="error"
                    variant="bordered"
                    style={{
                      background: isDarkTheme ? BACKGROUND_COLOR : null,
                    }}
                  >
                    X
                  </Badge>
                </Card>
              </Card.Body>
            </Card>
          </Grid>
        ))}

        {!loading && allFiles.length === 0 ? (
          <Grid
            css={{
              width: "100%",
              border: "dashed 6px",
              borderColor: SELECTED_BORDER_COLOR,
              borderRadius: "$2xl",
            }}
          >
            <Card isPressable>
              <Card.Body
                css={{
                  cursor: "pointer",
                  h: 140,
                  p: 0,
                  verticalAlign: "middle",
                  justifyContent: "center",
                  textAlign: "center",
                  background: isDarkTheme ? BACKGROUND_COLOR : null,
                  color: isDarkTheme ? "white" : null,
                }}
                onClick={() => openFileSelector()}
              >
                + Select Image
              </Card.Body>
            </Card>
          </Grid>
        ) : null}
      </Grid.Container>
      <Spacer y={1} />

      <Grid.Container gap={2}>
        <Grid>
          <Button
            onPress={() => {
              if (!(plainFiles.length < 1)) {
                copy();
              }
            }}
            color="success"
            auto
            ghost
            style={{ zIndex: 1 }}
          >
            {props.busy ? (
              <Loading type="points" color="currentColor" size="sm" />
            ) : (
              "Copy"
            )}
          </Button>
        </Grid>
        <Grid>
          <Button
            onPress={() => masterReset()}
            color="error"
            // disabled={plainFiles.length < 1}
            auto
            ghost
            style={{ zIndex: 1 }}
          >
            Reset
          </Button>
        </Grid>
        {props.successText.length != 0 ? (
          <Grid>
            <Text color="#17c964">{props.successText}</Text>
          </Grid>
        ) : null}
      </Grid.Container>
    </>
  );
};

export default Tool;
