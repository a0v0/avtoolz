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
import PDFMerger from "pdf-merger-js/browser";
import React, { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";
import {
  BACKGROUND_COLOR,
  PDF_FILENAME,
  SELECTED_BORDER_COLOR,
} from "../utils/constants";
import { DownloadFile } from "../utils/download";
// import { permissionCheck } from "../utils/permission";
import { getFileSizeFromDataUri } from "../utils/size-calc";

const Tool: React.FC = () => {
  // permissionCheck();

  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === "dark";

  const [openFileSelector, { filesContent, plainFiles, clear, loading }] =
    useFilePicker({
      multiple: true,
      readAs: "DataURL",
      accept: [".pdf"],
      limitFilesConfig: { min: 1 },
    });

  const [allFiles, setAllFiles] = useState(filesContent);

  const [props, setProps] = useState({
    pdfSaveUrl: "",
    busy: false,
  });

  const [isPdfGenerated, setIsPdfGenerated] = useState(false);

  useEffect(() => {
    setAllFiles([...allFiles, ...filesContent]);
  }, [filesContent]);

  const masterReset = () => {
    setIsPdfGenerated(false);
    setProps({ ...props, busy: false, pdfSaveUrl: "" });
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
      setProps({ ...props, busy: false, pdfSaveUrl: url });
      setIsPdfGenerated(true);
    } catch (error) {
      setProps({ ...props, busy: false });
      alert(
        "Something went wrong. Please check if the pdf you uploaded are not corrupted"
      );
    }
  };

  const savePDF = () => {
    DownloadFile(props.pdfSaveUrl, PDF_FILENAME + ".pdf");
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
                    background: isDarkTheme ? BACKGROUND_COLOR : null,
                    color: isDarkTheme ? "white" : null,
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
                    <Badge
                      color="success"
                      variant="bordered"
                      style={{
                        background: isDarkTheme ? BACKGROUND_COLOR : null,
                      }}
                    >
                      PDF {index + 1}
                    </Badge>
                    <Spacer x={0.5} />
                    <Badge
                      color="success"
                      variant="bordered"
                      style={{
                        background: isDarkTheme ? BACKGROUND_COLOR : null,
                      }}
                    >
                      {getFileSizeFromDataUri(item.content).toString()}
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
              "Merge"
            )}
          </Button>
        </Grid>
        <Grid>
          <Button
            onPress={() => {
              if (!(plainFiles.length < 1)) {
                savePDF();
              }
            }}
            color="success"
            disabled={props.pdfSaveUrl.length < 1}
            auto
            ghost
            style={{ zIndex: 1 }}
          >
            {props.busy ? (
              <Loading type="points" color="currentColor" size="sm" />
            ) : (
              "Save PDF"
            )}
          </Button>
        </Grid>
        <Grid>
          <Button
            onPress={() => {
              masterReset();
            }}
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
            <Text color="#17c964">
              PDF merged. Click "Save PDF" button to save the pdf file.
            </Text>
          </Grid>
        ) : null}
      </Grid.Container>
    </>
  );
};

export default Tool;
