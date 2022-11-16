// @ts-nocheck
import useDocsRoute from "@hooks/use-docs-route";
import ToolsLayout from "@layouts/tools";
import { MetaProps } from "@lib/tools/meta";
import { fetchDocsManifest, findRouteByPath, Route } from "@lib/tools/page";
import { getSlug } from "@lib/tools/utils";

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
import { getFileSizeFromDataUri } from "@utils/size-calc";
import EXIF from "exif-js";
import { toNumber } from "lodash";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { degrees, PageSizes, PDFDocument } from "pdf-lib";
import React, { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";

interface Props {
  routes: Route[];
  currentRoute?: Route;
}

const A4 = "A4",
  Letter = "US Letter",
  Fit = "Same as Image",
  Portrait = "Portrait",
  Landscape = "Landscape",
  None = "0",
  Small = "20",
  Big = "50";

const selectBorderColor = "deepskyblue";

const DocsPage: React.FC<Props> = ({ routes, currentRoute }) => {
  const { route, prevRoute, nextRoute } = useDocsRoute(routes, currentRoute);
  const router = useRouter();
  const { tag } = getSlug(router.query);

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

  const meta: MetaProps = {
    title: route.title.split(":")[1],
    description: route.description,
  };

  const [allFiles, setAllFiles] = useState(filesContent);

  const [props, setProps] = useState({
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
      var fileName = "file.pdf";
      link.download = fileName;
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
    <ToolsLayout
      currentRoute={route}
      meta={meta}
      nextRoute={nextRoute}
      prevRoute={prevRoute}
      routes={routes}
      slug={router.route}
      tag={tag}
    >
      <h2>{meta.title}</h2>
      <Grid.Container gap={1} justify="flex-start">
        {allFiles.map((item, index) => (
          <Grid xs={4} sm={2} key={index}>
            <Card>
              <Card.Body css={{ p: 0, overflow: "hidden" }}>
                <Card.Image
                  src={item.content}
                  objectFit="cover"
                  width="100%"
                  height={140}
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
                  <Badge color="success" variant="bordered">
                    {getFileSizeFromDataUri(item.content)}
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
                  <Badge color="error" variant="bordered">
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
              borderColor: selectBorderColor,
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
                }}
                onClick={() => openFileSelector()}
              >
                + Add More
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
      <Radio.Group
        size="sm"
        orientation="horizontal"
        value={props.pageOrientation}
        onChange={(e) => setProps({ ...props, pageOrientation: e })}
        defaultValue={Portrait}
        label="Select Page Orientation"
      >
        <Radio key={Portrait} value={Portrait}>
          Portrait
        </Radio>
        <Radio key={Landscape} value={Landscape}>
          Landscape
        </Radio>
      </Radio.Group>
      <Spacer y={0.5} />
      <Radio.Group
        size="sm"
        orientation="horizontal"
        value={props.pageSize}
        onChange={(e) => setProps({ ...props, pageSize: e })}
        defaultValue={Fit}
        label="Select Page Size"
      >
        <Radio key={Fit} value={Fit}>
          {Fit}
        </Radio>
        <Radio key={A4} value={A4}>
          {A4}
        </Radio>
        <Radio key={Letter} value={Letter}>
          {Letter}
        </Radio>
      </Radio.Group>
      <Spacer y={0.5} />

      <Radio.Group
        size="sm"
        orientation="horizontal"
        value={props.pageMargin.toString()}
        onChange={(e) => setProps({ ...props, pageMargin: toNumber(e) })}
        defaultValue={None}
        label="Select Margin"
        isDisabled={props.pageSize === Fit}
      >
        <Radio key={None} value={None}>
          None
        </Radio>
        <Radio key={Small} value={Small}>
          Small
        </Radio>
        <Radio key={Big} value={Big}>
          Big
        </Radio>
      </Radio.Group>
      <Spacer y={0.5} />

      <Checkbox
        size="sm"
        isSelected={props.compressImages}
        color="success"
        onChange={(e) => setProps({ ...props, compressImages: e })}
      >
        Compress (80%)
      </Checkbox>
      <Grid.Container gap={2}>
        <Grid>
          <Button
            onPress={() => convertToPDF()}
            color="warning"
            disabled={plainFiles.length < 1}
            auto
            ghost
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
            disabled={plainFiles.length < 1}
            auto
            ghost
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
      <Features description={meta.description} />
    </ToolsLayout>
  );
};

function Features({ description }: string) {
  return (
    <>
      <Spacer y={3} />
      <h2>About this tool</h2>
      <p style={{ whiteSpace: "pre-line" }}>{description}</p>

      <Spacer y={1} />
      <h3 style={{ color: "#ff4ecd" }}>Easy to use</h3>
      <p>
        The tool is realy easy to use. Our clean and minimalistic ui design
        makes it realy easy to understand and use the tool.
      </p>
      <h3 style={{ color: "#f5a524" }}>No limits</h3>
      <p>
        We do not limit the size of file you upload. Upload and convert
        unlimited files with unlimited size write into your browser.
      </p>
      <h3 style={{ color: "#17c964" }}>Secure</h3>
      <p>
        All the conversion happens write into your browser. No image/images is
        sent to the server. So your data is secure.
      </p>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  resolvedUrl,
}) => {
  const manifest = await fetchDocsManifest();
  const route = manifest && findRouteByPath(resolvedUrl, manifest.routes);
  return {
    props: {
      routes: manifest.routes,
      currentRoute: route,
    },
  };
};

export default DocsPage;

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
  return new Promise((resolve, reject) => {
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
