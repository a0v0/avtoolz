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
  Grid,
  Loading,
  Spacer,
  Text,
} from "@nextui-org/react";
import { DownloadFile } from "@utils/download";
import { getFileSizeFromDataUri } from "@utils/size-calc";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import PDFMerger from "pdf-merger-js/browser";
import React, { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";
interface Props {
  routes: Route[];
  currentRoute?: Route;
}

const selectBorderColor = "deepskyblue";
const filename = "merged-avtoolz.pdf";

const DocsPage: React.FC<Props> = ({ routes, currentRoute }) => {
  const { route, prevRoute, nextRoute } = useDocsRoute(routes, currentRoute);
  const router = useRouter();
  const { tag } = getSlug(router.query);

  const [openFileSelector, { filesContent, plainFiles, clear, loading }] =
    useFilePicker({
      multiple: true,
      readAs: "DataURL",

      accept: [".pdf"],
      limitFilesConfig: { min: 1 },
    });

  const meta: MetaProps = {
    title: route.title.split(":")[1],
    description: route.description,
  };

  const [allFiles, setAllFiles] = useState(filesContent);

  const [props, setProps] = useState({
    busy: false,
  });

  const [isPdfGenerated, setIsPdfGenerated] = useState(false);

  useEffect(() => {
    setAllFiles([...allFiles, ...filesContent]);
  }, [filesContent]);

  const masterReset = () => {
    setIsPdfGenerated(false);
    setProps({ ...props, busy: false });
    setAllFiles([]);
    clear();
  };

  const convertToPDF = async () => {
    try {
      // busy
      setProps({ ...props, busy: true });
      const merger = new PDFMerger();

      for (const file of allFiles) {
        await merger.add(file.content);
      }

      const mergedPdf = await merger.saveAsBlob();
      const url = URL.createObjectURL(mergedPdf);
      setProps({ ...props, busy: false });
      setIsPdfGenerated(true);
      DownloadFile(url, filename);
    } catch (error) {
      setProps({ ...props, busy: false });
      alert(
        "Something went wrong. Please check if the pdf you uploaded are not corrupted"
      );
    }
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
                <Card.Body css={{ p: 0, overflow: "hidden", maxWidth: "none" }}>
                  <Card
                    css={{
                      cursor: "pointer",
                      h: 140,
                      p: 0,

                      verticalAlign: "middle",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <Text color="wheat">{item.name}</Text>
                  </Card>
                  <Card
                    css={{
                      position: "absolute",
                      backgroundColor: "transparent",

                      bottom: 1,
                      zIndex: 1,
                      alignItems: "center",
                      borderRadius: 0,
                    }}
                  >
                    <Grid.Container gap={1} justify="center">
                      <Badge color="success" variant="bordered">
                        PDF {index + 1}
                      </Badge>
                      <Spacer x={0.5} />
                      <Badge color="success" variant="bordered">
                        {getFileSizeFromDataUri(item.content)}
                      </Badge>
                    </Grid.Container>
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

        <Grid.Container gap={2}>
          <Grid>
            <Button
              onPress={() => convertToPDF()}
              color="warning"
              disabled={plainFiles.length < 1}
              auto
              ghost
              style={{ zIndex: 1 }}
            >
              {props.busy ? (
                <Loading type="points" color="currentColor" size="sm" />
              ) : (
                "Merge and Download PDF"
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
          {isPdfGenerated ? (
            <Grid>
              <Text color="#17c964">Pdf generated succesfully!!</Text>
            </Grid>
          ) : null}
        </Grid.Container>
        <Features description={meta.description} />
      </ToolsLayout>
    </>
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
