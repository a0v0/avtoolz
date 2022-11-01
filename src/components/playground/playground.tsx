import React from "react";
import dynamic from "next/dynamic";
import {Loading} from "@nextui-org/react";
import withDefaults from "@utils/with-defaults";
import {SandpackFiles, SandpackPredefinedTemplate, SandpackHighlightedLines} from "@components";
import {Box} from "@primitives";
import {isEmpty} from "lodash";

import Title from "./title";
import LiveCode, {scope} from "./dynamic-live";
import {transformCode, joinCode, getFileName} from "./utils";
import {FileCode} from "./types";

const DynamicLive = dynamic(() => import("./dynamic-live"), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => (
    <div style={{padding: "20pt 0"}}>
      <Loading type="spinner" />
    </div>
  ),
});

const DynamicSandpack = dynamic(() => import("../sandpack"), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => (
    <div style={{padding: "20pt 0"}}>
      <Loading type="spinner" />
    </div>
  ),
});

interface Props {
  title?: React.ReactNode | string;
  desc?: React.ReactNode | string;
  showEditor?: boolean;
  showSandpackPreview?: boolean;
  initialEditorOpen?: boolean;
  enableResize?: boolean;
  showWindowActions?: boolean;
  iframeSrc?: string;
  asIframe?: boolean;
  iframeInitialWidth?: number;
  removeEntryContainer?: boolean;
  previewHeight?: string | number;
  overflow?: "auto" | "visible" | "hidden";
  files?: SandpackFiles;
  template?: SandpackPredefinedTemplate;
  highlightedLines?: SandpackHighlightedLines;
  code?: string;
}

const defaultProps = {
  desc: "",
  title: "",
  code: "",
  files: {},
  showEditor: true,
  asIframe: false,
  showSandpackPreview: false,
  initialEditorOpen: false,
  showWindowActions: false,
  removeEntryContainer: false,
  enableResize: false,
  previewHeight: "auto",
  overflow: "visible",
  bindings: {},
};

export type PlaygroundProps = Props & typeof defaultProps;

const Playground: React.FC<PlaygroundProps> = ({
  title: inputTitle,
  code: inputCode,
  initialEditorOpen,
  showEditor,
  highlightedLines,
  showSandpackPreview,
  showWindowActions,
  iframeInitialWidth,
  removeEntryContainer,
  enableResize,
  files,
  iframeSrc,
  asIframe,
  overflow,
  previewHeight,
  desc,
}) => {
  const isSanpackEditor = !isEmpty(files);

  const title = inputTitle;
  let code = inputCode.trim();
  let noInline = false;
  let filesCode: FileCode[] = [];

  if (isSanpackEditor) {
    //transform scope to key text vlaue
    const scopeKeys = Object.keys(scope);
    // convert scopeKeys to string values
    const scopeValues = scopeKeys.map((key) => {
      return {[key]: `${key}`};
    });

    // add 'React' to scopeValues
    scopeValues.push({React: "React"});
    // convert scopeValues to object
    const imports = Object.assign({}, ...scopeValues);

    // if single file
    if (Object.keys(files).length === 1) {
      // get first item from files
      const file = Object.values(files)[0] as string;

      code = transformCode(file, imports);
    }
    // else if multiple files
    else {
      // get files with its code
      Object.entries(files).forEach(([fileName, fileCode]) => {
        //only files with .js can processes by react-live
        if (!fileName.includes(".js")) {
          return;
        }

        const componentName = getFileName(fileName);
        const transformedCode = transformCode(fileCode as string, imports, componentName);

        // add to filesCode
        filesCode.push({
          fileName,
          code: transformedCode,
        });
      });

      // sort code by dependency
      filesCode = filesCode.sort((a, b) => {
        if (a.code.includes(getFileName(b.fileName))) {
          return 1;
        }
        if (b.code.includes(getFileName(a.fileName))) {
          return -1;
        }

        return 0;
      });

      code = joinCode(filesCode);
    }
  }

  noInline = code.includes("render");

  return (
    <>
      {(title || desc) && <Title desc={desc} title={title} />}
      <Box
        className="playground"
        css={{
          w: "100%",
          mb: "$xl",
          ov: "auto",
        }}
      >
        {isSanpackEditor ? (
          <DynamicSandpack
            files={files}
            highlightedLines={highlightedLines}
            removeEntryContainer={removeEntryContainer}
            showPreview={showSandpackPreview}
          >
            <LiveCode
              code={code}
              enableResize={enableResize || asIframe}
              height={previewHeight}
              iframeInitialWidth={iframeInitialWidth}
              iframeSrc={iframeSrc}
              iframeTitle={title}
              noInline={noInline}
              overflow={overflow}
              showEditor={false}
              showWindowActions={showWindowActions || asIframe}
            />
          </DynamicSandpack>
        ) : (
          <DynamicLive
            code={code}
            initialEditorOpen={initialEditorOpen}
            overflow={overflow}
            showEditor={showEditor}
          />
        )}
      </Box>
    </>
  );
};

const MemoPlayground = React.memo(Playground);

export default withDefaults(MemoPlayground, defaultProps);
