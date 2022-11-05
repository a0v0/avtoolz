import useDocsRoute from "@hooks/use-docs-route";
import ToolsLayout from "@layouts/tools";
import { MetaProps } from "@lib/tools/meta";
import { fetchDocsManifest, Route } from "@lib/tools/page";
import { getSlug } from "@lib/tools/utils";
import { Button, Card, Grid, Spacer } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface Props {
  routes: Route[];
  currentRoute?: Route;
}

interface ImageProps {
  img: string;
}

const DocsPage: React.FC<Props> = ({ routes, currentRoute }) => {
  const { route, prevRoute, nextRoute } = useDocsRoute(routes, currentRoute);
  const router = useRouter();
  const { tag } = getSlug(router.query);
  const meta: MetaProps = {
    title: "IMG to PDF",
    description: "Convert Images to PDF online for free.",
  };

  const [imageList, setImageList] = useState<ImageProps[]>([
    {
      img: "/images/fruit-1.jpeg",
    },
  ]);

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
        {imageList.map((item, index) => (
          <Grid xs={4} sm={2} key={index}>
            <Card isPressable>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={"https://nextui.org" + item.img}
                  objectFit="cover"
                  width="100%"
                  height={140}
                />
              </Card.Body>
            </Card>
          </Grid>
        ))}
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
            >
              + Add Images
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
      <Spacer y={1} />

      <Grid.Container gap={2}>
        <Grid>
          <Button color="warning" auto ghost>
            Convert
          </Button>
        </Grid>
        <Grid>
          <Button color="success" disabled auto ghost>
            Download PDF
          </Button>
        </Grid>
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
