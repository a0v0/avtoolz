import { useColorMode } from "@docusaurus/theme-common";
import {
  Badge,
  Button,
  Card,
  Grid,
  Input,
  Loading,
  Radio,
  Spacer,
} from "@nextui-org/react";

import { toNumber } from "lodash";
import React, { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { useFilePicker } from "use-file-picker";
import {
  BACKGROUND_COLOR,
  IMAGE_FILENAME,
  SELECTED_BORDER_COLOR,
} from "../utils/constants";
import { DownloadFile } from "../utils/download";
import { getImageDimensions } from "../utils/image";
import { getFileSizeFromDataUri } from "../utils/size-calc";

const JPG = "jpeg",
  PNG = "png",
  WEBP = "webp";

const ORIGINAL = "Original",
  CUSTOM = "Custom";
const Tool: React.FC = () => {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === "dark";

  const [openFileSelector, { filesContent, plainFiles, clear, loading }] =
    useFilePicker({
      multiple: false,
      readAs: "DataURL", // availible formats: "Text" | "BinaryString" | "ArrayBuffer" | "DataURL"
      // accept: '.ics,.pdf',
      accept: [".svg"],
      limitFilesConfig: { min: 1, max: 1 },
      // minFileSize: 1, // in megabytes
      // maxFileSize: 1,
      // readFilesContent: false, // ignores file content
    });

  const [props, setProps] = useState({
    dimension: ORIGINAL,
    outputFormat: WEBP,
    width: 500,
    height: 500,
    originalWidth: 0,
    originalHeight: 0,
    busy: false,
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

  const masterReset = () => {
    setProps({ ...props, outputFormat: WEBP, dimension: ORIGINAL });
    setImagesrc("");
    clear();
  };

  async function convert() {
    setImagesrc("");
    var width = 0,
      height = 0;

    if (props.dimension === ORIGINAL) {
      const dimesions = await getImageDimensions(filesContent[0].content);
      setProps({
        ...props,
        width: dimesions.w,
        height: dimesions.h,
      });
      width = dimesions.w;
      height = dimesions.h;
    } else {
      width = props.width;
      height = props.height;
    }

    var s = await loadImageAsPNG(filesContent[0].content, width, height);

    setImagesrc(s.src);
    // DownloadFile(s.src, "converted-image-avtoolz." + props.outputFormat);
    setProps({ ...props, busy: false });
  }

  function loadImageAsPNG(url, height, width) {
    var imageContentType = "image/jpeg";

    if (props.outputFormat == JPG) {
      imageContentType = "image/jpeg";
    } else if (props.outputFormat == PNG) {
      imageContentType = "image/png";
    } else if (props.outputFormat == WEBP) {
      imageContentType = "image/webp";
    }

    return new Promise<HTMLImageElement>((resolve, reject) => {
      let sourceImage = new Image();

      sourceImage.onload = () => {
        let png = new Image();
        let cnv = document.createElement("canvas"); // doesn't actually create an element until it's appended to a parent,
        // so will be discarded once this function has done it's job
        cnv.height = height;
        cnv.width = width;

        let ctx = cnv.getContext("2d");

        ctx.drawImage(sourceImage, 0, 0, height, width);
        png.src = cnv.toDataURL(imageContentType); // defaults to image/png
        resolve(png);
      };
      sourceImage.onerror = reject;

      sourceImage.src = url;
    });
  }
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
                    src="/right-arrow.webp"
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
                      verticalAlign: "middle",
                      justifyContent: "center",
                      textAlign: "center",
                      background: isDarkTheme ? BACKGROUND_COLOR : null,
                      color: isDarkTheme ? "white" : null,
                    }}
                  >
                    Click convert button to see preview
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
      <p style={{ fontWeight: "bold" }}>Select Dimensions</p>
      <Spacer y={-0.8} />
      <Radio.Group
        size="sm"
        orientation="horizontal"
        value={props.dimension}
        onChange={(value) => setProps({ ...props, dimension: value })}
      >
        <Radio
          key={ORIGINAL}
          value={ORIGINAL}
          labelColor={isDarkTheme ? "success" : "default"}
          color={isDarkTheme ? "success" : "default"}
        >
          {ORIGINAL}
        </Radio>
        <Radio
          key={CUSTOM}
          value={CUSTOM}
          labelColor={isDarkTheme ? "success" : "default"}
          color={isDarkTheme ? "success" : "default"}
        >
          {CUSTOM}
        </Radio>
      </Radio.Group>
      <Spacer y={0.5} />
      {props.dimension === CUSTOM ? (
        <Grid.Container justify="flex-start">
          <Grid sm={0.2}></Grid>
          <Grid>
            <Input
              type={"number"}
              // width="100px"
              labelLeft="Width"
              value={props.width}
              onChange={(e) =>
                setProps({ ...props, width: toNumber(e.target.value) })
              }
            />
          </Grid>
          <Spacer x={0.5} />
          <Grid>
            <Input
              type={"number"}
              // width="100px"
              labelLeft="Height"
              value={props.height}
              onChange={(e) =>
                setProps({ ...props, height: toNumber(e.target.value) })
              }
            />
          </Grid>
        </Grid.Container>
      ) : null}
      <Spacer y={1} />
      <p style={{ fontWeight: "bold" }}>Select Output Format</p>
      <Spacer y={-0.8} />
      <Radio.Group
        size="sm"
        orientation="horizontal"
        value={props.outputFormat}
        onChange={(value) => setProps({ ...props, outputFormat: value })}
      >
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
              if (!(plainFiles.length < 1)) {
                convert();
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
              "Convert"
            )}
          </Button>
        </Grid>
        <Grid>
          <Button
            onPress={() => DownloadFile(imagesrc.toString(), IMAGE_FILENAME)}
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
