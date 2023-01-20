import { useColorMode } from "@docusaurus/theme-common";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Grid,
  Loading,
  Radio,
  Spacer,
  Text,
} from "@nextui-org/react";
import EXIF from "exif-js";
import { toNumber } from "lodash";
import { degrees, PageSizes, PDFDocument } from "pdf-lib";
import React, { useCallback, useEffect, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { useFilePicker } from "use-file-picker";
import {
  BACKGROUND_COLOR,
  PDF_FILENAME,
  SELECTED_BORDER_COLOR,
} from "../utils/constants";
import { getFileSizeFromDataUri } from "../utils/size-calc";

const A4 = "A4",
  Letter = "US Letter",
  Fit = "Same as Image",
  Portrait = "Portrait",
  Landscape = "Landscape",
  None = "0",
  Small = "20",
  Big = "50";

const Tools: React.FC = () => {
  const { isDarkTheme } = useColorMode();

  const [openFileSelector, { filesContent, plainFiles, clear, loading }] =
    useFilePicker({
      multiple: true,
      readAs: "DataURL", // availible formats: "Text" | "BinaryString" | "ArrayBuffer" | "DataURL"
      // accept: '.ics,.pdf',
      accept: [".jpg", ".jpeg"],
      limitFilesConfig: { min: 1 },
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
    pageOrientation: Portrait,
    pageSize: Fit,
    pageMargin: 0,
    lastError: undefined,
    lastMime: null,
    forceShowOption: false,
    compressImages: true,
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
    setProps({
      ...props,
      pageOrientation: Portrait,
      pageSize: Fit,
      pageMargin: 0,
    });
    clear();
  };

  function canvasToBlob(canvas: any, quality: any) {
    return new Promise((resolve, reject) => {
      try {
        canvas.toBlob(resolve, "image/jpeg", quality);
      } catch (err) {
        reject(err);
      }
    });
  }

  const loadImage = (objUrl: any) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      let img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.onerror = (e) => {
        reject(e);
      };
      img.src = objUrl;
    });
  };

  const getPageSize = () => {
    switch (props.pageSize) {
      case A4:
        if (props.pageOrientation === Portrait) {
          return PageSizes.A4;
        } else {
          let pageSize = [...PageSizes.A4];
          pageSize.reverse();
          return pageSize;
        }
      case Letter:
        if (props.pageOrientation === Portrait) {
          return PageSizes.Letter;
        } else {
          let pageSize = [...PageSizes.Letter];
          pageSize.reverse();
          return pageSize;
        }
      default:
        return undefined;
    }
  };

  const fetchImage = async (dataURL: any, quality: any) => {
    if (!quality) {
      let res = await fetch(dataURL);
      let raw = await res.arrayBuffer();
      return {
        arrayBuffer: raw,
        mime: res.headers.get("content-type"),
      };
    } else {
      let img = await loadImage(dataURL);
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      let blob = await canvasToBlob(canvas, quality);
      //@ts-ignore
      let raw = await blob.arrayBuffer();
      return {
        arrayBuffer: raw,
        mime: "image/jpeg",
      };
    }
  };

  const convertToPDF = async () => {
    let mime: string | null = "";

    try {
      setProps({ ...props, busy: true });
      const pdfDoc = await PDFDocument.create();
      for (let i = 0; i < allFiles.length; i++) {
        let pageSize = getPageSize();

        let res = await fetchImage(
          allFiles[i].content,
          props.compressImages ? props.imageQuality / 10 : undefined
        );
        let raw = await res.arrayBuffer;

        mime = res.mime;
        // console.log(mime);

        let jpegOrientation = 1;

        if (mime === "image/jpeg") {
          try {
            let jpegExif = EXIF.readFromBinaryFile(raw);
            if (jpegExif["Orientation"]) {
              jpegOrientation = jpegExif["Orientation"];
              // console.log("jpegOrientation: " + jpegOrientation);
            }
          } catch (ex) {
            console.error(ex);
          }
        }
        //console.log(raw);
        const img = await (mime === "image/jpeg"
          ? pdfDoc.embedJpg(raw)
          : pdfDoc.embedPng(raw));

        // console.log("width: " + img.width + " height: " + img.height);

        if (props.pageSize === Fit) {
          pageSize = [img.width, img.height];
        } else {
          switch (jpegOrientation) {
            case 6:
            case 8:
              pageSize = [pageSize[1], pageSize[0]];
              break;
          }
        }
        // @ts-ignore
        const page = pdfDoc.addPage(pageSize);
        if (props.pageSize === Fit) {
          page.drawImage(img, {
            x: 0,
            y: 0,
            width: img.width,
            height: img.height,
          });
        } else {
          //page.setSize(pageSize[0], pageSize[1]);
          let scaleFactor = Math.min(
            (page.getWidth() - props.pageMargin) / img.width,
            (page.getHeight() - props.pageMargin) / img.height
          );
          let w = img.width * scaleFactor;
          let h = img.height * scaleFactor;

          //page.setSize(img.width,img.height);
          // console.log(img.width + " " + img.height);
          // console.log(page.getWidth() + " " + page.getHeight());

          let dim = img.scale(scaleFactor);

          page.drawImage(img, {
            x: page.getWidth() / 2 - dim.width / 2,
            y: page.getHeight() / 2 - dim.height / 2,
            width: dim.width,
            height: dim.height,
          });
        }

        switch (jpegOrientation) {
          case 6:
            page.setRotation(degrees(90));
            break;
          case 3:
            page.setRotation(degrees(180));
            break;
          case 8:
            page.setRotation(degrees(270));
            break;
        }
      }
      const pdfBytes = await pdfDoc.save();
      let blob = new Blob([pdfBytes], { type: "application/pdf" });
      // let url = window.URL.createObjectURL(blob);
      // window.open(url);
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);

      link.download = PDF_FILENAME + ".pdf";
      link.click();
      setProps({ ...props, busy: false });
    } catch (err) {
      console.error(err);
      setProps({ ...props, lastError: err, lastMime: mime, busy: false });
    }

    setIsPdfGenerated(true);
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
                + Select File
              </Card.Body>
            </Card>
          </Grid>
        ) : (
          <Grid xs={4} sm={2}>
            <Card isPressable>
              <Card.Body
                css={{
                  cursor: "pointer",
                  h: 140,
                  p: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  background: isDarkTheme ? BACKGROUND_COLOR : null,
                  color: isDarkTheme ? "white" : null,
                }}
                onClick={() => openFileSelector()}
              >
                <Grid>
                  <span>+</span> <span>Add More</span>
                </Grid>
              </Card.Body>
            </Card>
          </Grid>
        )}
      </Grid.Container>
      <Spacer y={1} />
      <p style={{ fontWeight: "bold" }}>Select Page Orientation</p>
      <Spacer y={-0.8} />
      <Radio.Group
        size="sm"
        orientation="horizontal"
        value={props.pageOrientation}
        onChange={(e) => setProps({ ...props, pageOrientation: e })}
        defaultValue={Portrait}
      >
        <Radio
          key={Portrait}
          value={Portrait}
          labelColor={isDarkTheme ? "success" : "default"}
          color={isDarkTheme ? "success" : "default"}
        >
          Portrait
        </Radio>
        <Radio
          key={Landscape}
          value={Landscape}
          labelColor={isDarkTheme ? "success" : "default"}
          color={isDarkTheme ? "success" : "default"}
        >
          Landscape
        </Radio>
      </Radio.Group>
      <Spacer y={1} />
      <p style={{ fontWeight: "bold" }}>Select Page Size</p>
      <Spacer y={-0.8} />
      <Radio.Group
        size="sm"
        orientation="horizontal"
        value={props.pageSize}
        onChange={(e) => setProps({ ...props, pageSize: e })}
        defaultValue={Fit}
      >
        <Radio
          key={Fit}
          value={Fit}
          labelColor={isDarkTheme ? "success" : "default"}
          color={isDarkTheme ? "success" : "default"}
        >
          {Fit}
        </Radio>
        <Radio
          key={A4}
          value={A4}
          labelColor={isDarkTheme ? "success" : "default"}
          color={isDarkTheme ? "success" : "default"}
        >
          {A4}
        </Radio>
        <Radio
          key={Letter}
          value={Letter}
          labelColor={isDarkTheme ? "success" : "default"}
          color={isDarkTheme ? "success" : "default"}
        >
          {Letter}
        </Radio>
      </Radio.Group>
      <Spacer y={1} />
      <p style={{ fontWeight: "bold" }}>Select Margin</p>
      <Spacer y={-0.8} />

      <Radio.Group
        size="sm"
        orientation="horizontal"
        value={props.pageMargin.toString()}
        onChange={(e) => setProps({ ...props, pageMargin: toNumber(e) })}
        defaultValue={None}
        isDisabled={props.pageSize === Fit}
      >
        <Radio
          key={None}
          value={None}
          labelColor={
            isDarkTheme || props.pageSize === Fit ? "success" : "default"
          }
          color={isDarkTheme || props.pageSize === Fit ? "success" : "default"}
        >
          None
        </Radio>
        <Radio
          key={Small}
          value={Small}
          labelColor={
            isDarkTheme || props.pageSize === Fit ? "success" : "default"
          }
          color={isDarkTheme || props.pageSize === Fit ? "success" : "default"}
        >
          Small
        </Radio>
        <Radio
          key={Big}
          value={Big}
          labelColor={
            isDarkTheme || props.pageSize === Fit ? "success" : "default"
          }
          color={isDarkTheme || props.pageSize === Fit ? "success" : "default"}
        >
          Big
        </Radio>
      </Radio.Group>
      <Spacer y={0.5} />

      <Checkbox
        size="sm"
        isSelected={props.compressImages}
        defaultChecked={true}
        onChange={(e) => setProps({ ...props, compressImages: e })}
        style={{ zIndex: 1 }}
        labelColor={isDarkTheme ? "success" : "default"}
        color={isDarkTheme ? "success" : "default"}
      >
        Compress (80%)
      </Checkbox>

      <Grid.Container gap={2}>
        <Grid>
          <Button
            onPress={() => {
              if (!(plainFiles.length < 1)) {
                convertToPDF();
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
              "Convert and Download PDF"
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
        {isPdfGenerated ? (
          <Grid>
            <Text color="#17c964">Pdf generated succesfully!!</Text>
          </Grid>
        ) : null}
      </Grid.Container>
    </>
  );
};

export default Tools;
