import useDocsRoute from "@hooks/use-docs-route";
import ToolsLayout from "@layouts/tools";
import { MetaProps } from "@lib/tools/meta";
import { fetchDocsManifest, findRouteByPath, Route } from "@lib/tools/page";
import { getSlug } from "@lib/tools/utils";

import {
  Badge,
  Button,
  Card,
  Grid,
  Loading,
  Spacer,
  Text,
} from "@nextui-org/react";
import { CopyTextToClipboard } from "@utils/copy";
import { getFileSizeFromDataUri } from "@utils/size-calc";
import { Sleep } from "@utils/sleep";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
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
      accept: [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".svg",
        ".webp",
        ".bmp",
        ".ico",
      ],
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
  const meta: MetaProps = {
    title: route.title.split(":")[1],
    description: route.description,
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
              onPress={() => copy()}
              color="success"
              disabled={plainFiles.length < 1}
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
              disabled={plainFiles.length < 1}
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
        <Features description={meta.description} />
      </ToolsLayout>
    </>
  );
};

function Features({ description }) {
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
