import useDocsRoute from "@hooks/use-docs-route";
import ToolsLayout from "@layouts/tools";
import { MetaProps } from "@lib/tools/meta";
import { fetchDocsManifest, findRouteByPath, Route } from "@lib/tools/page";
import { getSlug } from "@lib/tools/utils";
import {
  Button,
  Card,
  Grid,
  Radio,
  Spacer,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import html2pdf from "html2pdf.js";
import jsPDF from "jspdf";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFilePicker } from "use-file-picker";
interface Props {
  routes: Route[];
  currentRoute?: Route;
}

// original - original markdown flavor as in John Gruber's spec
// vanilla - showdown base flavor (as from v1.3.1)
// github - GFM (GitHub Flavored Markdown)
const ORIGINAL = "original",
  VANILLA = "vanilla",
  GITHUB = "github";

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

  const [props, setProps] = useState({
    flavor: GITHUB,
    markdown: "",
    html: "",
    pdf: "",
  });

  const convert = () => {
    var showdown = require("showdown");
    var converter = new showdown.Converter({
      tables: true,
      tasklists: true,
    });
    converter.setFlavor(props.flavor);
    var html = converter.makeHtml(props.markdown);

    var element = document.createElement("div");
    element.setAttribute("id", "useless");

    element.append(html);

    var opt = {
      margin: 1,
      filename: "myfile.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    console.log(html);
    html2pdf().set(opt).from(html).save();

    // setProps({ ...props, html: html, pdf: doc.output("dataurlstring") });
  };
  const download = () => {
    var doc = new jsPDF();

    doc.html(props.html);

    doc.save("avtoolz-generated.pdf");
  };
  const masterReset = () => {
    clear();
    setProps({ ...props, markdown: "", html: "", pdf: "" });
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
      <Grid.Container gap={1} justify="center">
        <Grid xs={12} md={6}>
          <Textarea
            bordered
            width="100%"
            minRows={15}
            maxRows={15}
            helperColor="success"
            color="success"
            value={props.markdown}
            onChange={(e) => setProps({ ...props, markdown: e.target.value })}
            label="Enter Markdown"
            placeholder="Enter some and see the pdf preview on the right side...."
          />

          <Spacer y={0.5} />
        </Grid>

        <Grid xs={12} md={6}>
          <Card variant="bordered">
            <iframe
              seamless={true}
              style={{ overflow: "hidden", height: "100%" }}
              src={props.html}
            />
          </Card>
        </Grid>
      </Grid.Container>
      <Spacer y={1} />

      <Radio.Group
        size="sm"
        orientation="horizontal"
        value={props.flavor}
        onChange={(value) => setProps({ ...props, flavor: value })}
        label="Select Markdown Flavor"
      >
        <Tooltip content="GFM (GitHub Flavored Markdown)" color="secondary">
          <Radio key={GITHUB} value={GITHUB}>
            Github
          </Radio>
        </Tooltip>
        <Spacer x={1} />
        <Tooltip
          content="original markdown flavor as in John Gruber's spec"
          color="secondary"
        >
          <Radio key={ORIGINAL} value={ORIGINAL}>
            Original
          </Radio>
        </Tooltip>
        <Spacer x={1} />
        <Tooltip content="showdown base flavor" color="secondary">
          <Radio key={VANILLA} value={VANILLA}>
            Vanilla
          </Radio>
        </Tooltip>
      </Radio.Group>

      <Spacer y={0.5} />
      <Grid.Container gap={0.5}>
        <Grid>
          <Button auto color="primary" onPress={() => convert()}>
            Convert
          </Button>
        </Grid>
        <Grid>
          <Button auto color={"success"} flat onClick={() => download()}>
            Download
          </Button>
        </Grid>
        <Grid>
          <Button auto color={"error"} flat onClick={() => masterReset()}>
            Reset
          </Button>
        </Grid>
      </Grid.Container>
      <Features description={meta.description} />
    </ToolsLayout>
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
