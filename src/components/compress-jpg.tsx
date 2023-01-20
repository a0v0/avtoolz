import { useColorMode } from "@docusaurus/theme-common";
import { Slider } from "@mui/material";
import {
  Badge,
  Button,
  Card,
  Grid,
  Loading,
  Radio,
  Spacer,
} from "@nextui-org/react";
import { compress, compressAccurately } from "image-conversion";
import { toNumber } from "lodash";
import React, { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { useFilePicker } from "use-file-picker";

import { DownloadFile } from "../utils/download";
import { blobToDataURL, dataURLtoBlob } from "../utils/image";

import {
  BACKGROUND_COLOR,
  IMAGE_FILENAME,
  SELECTED_BORDER_COLOR,
} from "../utils/constants";
import { getStaticAssetPath } from "../utils/paths";
import { getFileSizeFromDataUri } from "../utils/size-calc";

const JPG = ".jpg",
  PNG = ".png",
  WEBP = ".webp";
enum CompressType {
  Quality,
  Size,
}

const Tool: React.FC = () => {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === "dark";
  const [openFileSelector, { filesContent, plainFiles, clear, loading }] =
    useFilePicker({
      multiple: false,
      readAs: "DataURL", // availible formats: "Text" | "BinaryString" | "ArrayBuffer" | "DataURL"
      // accept: '.ics,.pdf',
      accept: [".jpg", ".jpeg"],
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

  const [imagesrc, setImagesrc] = useState<
    string | File | Blob | ProgressEvent<FileReader>
  >("");

  const [props, setProps] = useState({
    quality: 80,
    compressSize: 0,
    format: JPG,
    busy: false,
    compressType: CompressType.Quality,
  });

  const masterReset = () => {
    setProps({
      quality: 80,
      compressSize: 0,
      compressType: CompressType.Quality,
      format: JPG,
      busy: false,
    });
    setImagesrc("");
    clear();
  };

  const compressFile = () => {
    setImagesrc("");
    setProps({ ...props, busy: true });
    if (props.compressType == CompressType.Size) {
      compressAccurately(
        dataURLtoBlob(filesContent[0].content),
        props.compressSize //The compressed image size is 100k
      ).then((res) => {
        //The res in the promise is a compressed Blob type (which can be treated as a File type) file;
        blobToDataURL(res, function (dataurl) {
          setImagesrc(dataurl);
        });
        setProps({ ...props, busy: false });
      });
    } else {
      compress(
        dataURLtoBlob(filesContent[0].content),
        props.quality / 100
      ).then((res) => {
        //The res in the promise is a compressed Blob type (which can be treated as a File type) file;
        blobToDataURL(res, function (dataurl) {
          setImagesrc(dataurl);
        });
        setProps({ ...props, busy: false });
      });
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
        {filesContent.map((item, index) => (
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
              </Card.Body>
            </Card>
          </Grid>
        ))}

        {!loading && plainFiles.length === 0 ? (
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
                + Choose File
              </Card.Body>
            </Card>
          </Grid>
        ) : (
          <>
            <Grid xs={4} sm={1}>
              <Card css={{ backgroundColor: "transparent" }}>
                <Card.Body
                  css={{
                    h: 140,
                    p: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Card.Image
                    src={getStaticAssetPath("/right-arrow.webp")}
                    objectFit="contain"
                    width="100%"
                    height={140}
                  />
                </Card.Body>
              </Card>
            </Grid>

            {imagesrc.toString().length === 0 ? (
              <Grid xs={4} sm={2} key="3">
                <Card>
                  <Card.Body
                    css={{
                      h: 140,
                      p: 0,
                      background: isDarkTheme ? BACKGROUND_COLOR : null,
                      color: isDarkTheme ? "white" : null,
                      verticalAlign: "middle",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    Click compress button to see preview
                  </Card.Body>
                </Card>
              </Grid>
            ) : (
              <Grid xs={4} sm={2}>
                <Card isPressable>
                  <Card.Body css={{ p: 0, overflow: "hidden" }}>
                    <Card.Image
                      src={imagesrc.toString()}
                      objectFit="cover"
                      width="100%"
                      height={140}
                      onClick={() => openImageViewer(imagesrc.toString())}
                    />
                    <Card
                      css={{
                        position: "absolute",
                        backgroundColor: "#00000000",
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
                        {getFileSizeFromDataUri(imagesrc.toString()).toString()}
                      </Badge>
                    </Card>
                  </Card.Body>
                </Card>
              </Grid>
            )}
          </>
        )}
      </Grid.Container>

      <Spacer y={1} />
      <p style={{ fontWeight: "bold" }}>Select Quality</p>
      <Spacer y={-0.8} />
      <Grid.Container justify="flex-start">
        <Grid style={{ width: "20em" }}>
          <Slider
            defaultValue={props.quality}
            value={props.quality}
            step={1}
            valueLabelDisplay="on"
            marks
            min={1}
            max={100}
            onChange={(e, value) =>
              setProps({ ...props, quality: toNumber(value) })
            }
          />
        </Grid>
      </Grid.Container>
      <p style={{ fontWeight: "bold" }}>Select Output format:</p>
      <Spacer y={-1} />
      <Radio.Group
        size="sm"
        orientation="horizontal"
        value={props.format}
        onChange={(value) => setProps({ ...props, format: value })}
      >
        <Radio
          key={JPG}
          value={JPG}
          labelColor={isDarkTheme ? "success" : "default"}
          color={isDarkTheme ? "success" : "default"}
        >
          JPG
        </Radio>
        <Radio
          key={PNG}
          value={PNG}
          labelColor={isDarkTheme ? "success" : "default"}
          color={isDarkTheme ? "success" : "default"}
        >
          PNG
        </Radio>
        <Radio
          key={WEBP}
          value={WEBP}
          labelColor={isDarkTheme ? "success" : "default"}
          color={isDarkTheme ? "success" : "default"}
        >
          WEBP
        </Radio>
      </Radio.Group>
      <Grid.Container gap={2}>
        <Grid>
          <Button
            onPress={() => {
              if (plainFiles.length > 0) {
                compressFile();
              }
            }}
            color="warning"
            // disabled={plainFiles.length < 1}
            auto
            ghost
            style={{ zIndex: 1 }}
          >
            {props.busy ? (
              <Loading type="points" color="currentColor" size="sm" />
            ) : (
              "Compress"
            )}
          </Button>
        </Grid>
        <Grid>
          <Button
            onPress={() =>
              DownloadFile(imagesrc.toString(), IMAGE_FILENAME + props.format)
            }
            color="success"
            disabled={imagesrc.toString().length === 0}
            auto
            ghost
            style={{ zIndex: 1 }}
          >
            Save
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
      </Grid.Container>
      {isViewerOpen && (
        <div style={{ zIndex: "9999" }}>
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
    </>
  );
};

export default Tool;
