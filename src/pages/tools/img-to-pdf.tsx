// FIXME: multiple images not working when converting to pdf

import useDocsRoute from "@hooks/use-docs-route";
import ToolsLayout from "@layouts/tools";
import { MetaProps } from "@lib/tools/meta";
import { fetchDocsManifest, Route } from "@lib/tools/page";
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
  Table,
  Text,
} from "@nextui-org/react";
import { getFileSizeFromDataUri, getTotalSize } from "@utils/size-calc";
import { jsPDF } from "jspdf";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFilePicker } from "use-file-picker";
interface Props {
  routes: Route[];
  currentRoute?: Route;
}

const meta: MetaProps = {
  title: "IMG to PDF Converter",
  description: "",
};

const DocsPage: React.FC<Props> = ({ routes, currentRoute }) => {
  const { route, prevRoute, nextRoute } = useDocsRoute(routes, currentRoute);
  const router = useRouter();
  const { tag } = getSlug(router.query);
  const [openFileSelector, { filesContent, plainFiles, clear }] = useFilePicker(
    {
      multiple: true,
      readAs: "DataURL", // availible formats: "Text" | "BinaryString" | "ArrayBuffer" | "DataURL"
      // accept: '.ics,.pdf',
      accept: [".png", ".jpg", ".jpeg"],
      limitFilesConfig: { min: 1 },
      // minFileSize: 1, // in megabytes
      // maxFileSize: 1,
      // readFilesContent: false, // ignores file content
    }
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isPdfGenerated, setIsPdfGenerated] = useState(false);
  const [selectedPageOrientation, setSelectedPageOrientation] =
    useState("portrait");
  const pageOrientation = ["portrait", "horizontal"];
  const [selectedPageSize, setSelectedPageSize] = useState("a4");

  const convertToPDF = async () => {
    setIsLoading(true);

    const pdf = new jsPDF();
    filesContent.map((file) => {
      pdf.addImage(file.content, 0, 0, 0, 0);
    });
    pdf.save("pdf-" + Math.floor(Math.random() * 9852593) + ".pdf");
    setIsLoading(false);
    setIsPdfGenerated(true);
  };

  const masterReset = () => {
    clear();
  };

  console.log(plainFiles);

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
      <h2 style={{ color: "#0072f5" }}>{meta.title}</h2>
      <Grid.Container gap={1} justify="flex-start">
        {filesContent.map((item, index) => (
          <Grid xs={4} sm={2} key={index}>
            <Card>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={item.content}
                  objectFit="cover"
                  width="100%"
                  height={140}
                />
                <Card
                  isPressable
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
              </Card.Body>
            </Card>
          </Grid>
        ))}
        {plainFiles.length === 0 ? (
          <Grid
            css={{
              width: "100%",
              border: "dashed",
              borderColor: "blue",
              borderRadius: "$2xl",
            }}
          >
            <Card isPressable>
              <Card.Body
                css={{
                  h: 140,
                  p: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => openFileSelector()}
              >
                + Add Images
              </Card.Body>
            </Card>
          </Grid>
        ) : null}
      </Grid.Container>
      <Spacer y={1} />

      {/* <p>Total size of image(s): {getTotalSize(plainFiles)}</p>
      <p>Total images selected: {plainFiles.length}</p> */}
      {}
      <Radio.Group
        size="sm"
        orientation="horizontal"
        value={selectedPageOrientation}
        onChange={setSelectedPageOrientation}
        defaultValue="portrait"
        label="Select Page Orientation"
      >
        {pageOrientation.map((orientationText) => (
          <Radio key={orientationText} value={orientationText}>
            {capitalize(orientationText)}
          </Radio>
        ))}
      </Radio.Group>
      <Grid.Container gap={2}>
        <Grid>
          <Button
            onPress={() => convertToPDF()}
            color="warning"
            disabled={plainFiles.length < 1}
            auto
            ghost
          >
            {isLoading ? (
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
      <Features />
    </ToolsLayout>
  );
};

function Features() {
  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "description",
      label: "DESCRIPTION",
    },
  ];
  const rows = [
    {
      key: "1",
      name: "Name",
      description: "Img to PDF Converter",
    },

    {
      key: "3",
      name: "Tags",
      description: "img-to-pdf, image-to-pdf, image-to-pdf-converter",
    },
    {
      key: "4",
      name: "Supported Formats",
      description: "png, jpg, jpeg",
    },
  ];

  return (
    <>
      <Spacer y={3} />
      <h2 style={{ color: "#0072f5" }}>About this tool</h2>
      Img to PDF Converter is a free online tool to convert images to PDF. You
      can convert multiple images at once and save the PDF file.
      <Spacer y={1} />
      <h3 style={{ color: "#ff4ecd" }}>Easy to use</h3>
      <p>
        Convert JPG images to PDF in seconds. Easily adjust orientation and
        margins.
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
      <Table
        aria-label="Description table for img to pdf converter"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="multiple"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.key}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={rows}>
          {(item) => (
            <Table.Row key={item.key}>
              {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const manifest = await fetchDocsManifest();
  return {
    props: {
      routes: manifest.routes,
    },
  };
};

const capitalize = (str: string) => {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
};
export default DocsPage;
