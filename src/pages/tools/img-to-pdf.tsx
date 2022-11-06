// FIXME: multiple images not working when converting to pdf

import useDocsRoute from "@hooks/use-docs-route";
import ToolsLayout from "@layouts/tools";
import { MetaProps } from "@lib/tools/meta";
import { fetchDocsManifest, Route } from "@lib/tools/page";
import { getSlug } from "@lib/tools/utils";
import { Button, Card, Grid, Loading, Spacer, Text } from "@nextui-org/react";
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
  title: "IMG to PDF",
  description: "Convert Images to PDF online for free.",
};

const DocsPage: React.FC<Props> = ({ routes, currentRoute }) => {
  const { route, prevRoute, nextRoute } = useDocsRoute(routes, currentRoute);
  const router = useRouter();
  const { tag } = getSlug(router.query);

  const [isLoading, setIsLoading] = useState(false);
  const [isPdfGenerated, setIsPdfGenerated] = useState(false);

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
        {filesContent.map((item, index) => (
          <Grid xs={4} sm={2} key={index}>
            <Card isPressable>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={item.content}
                  objectFit="cover"
                  width="100%"
                  height={140}
                />
              </Card.Body>
            </Card>
          </Grid>
        ))}
        {plainFiles.length === 0 ? (
          <Grid xs={4} sm={2}>
            <Card isPressable>
              <Card.Body
                css={{
                  h: 140,
                  p: 0,
                  display: "flex",
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
      Total images selected: {plainFiles.length}
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
        {/* <Grid>
          <Button
            onPress={() => downloadPdf()}
            color="success"
            disabled={isDownloadButtonDisabled}
            auto
            ghost
          >
            Download PDF
          </Button>
        </Grid> */}
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
      <About />
    </ToolsLayout>
  );
};

function About() {
  return (
    <>
      <Spacer y={3} />
      <h2>About the tool</h2>
      <p>
        Easily convert Images (jpg, png etc) to PDF online for free. Combine
        images to a single pdf.
      </p>
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
export default DocsPage;
