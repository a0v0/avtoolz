"use client";

import {subtitle, title} from "@/components/primitives";

import {Dashboard} from "@/packages/@avtoolz/uppy-react/types";
import {Button} from "@nextui-org/react";
import Uppy from "@uppy/core";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {getToolByHref} from "../config";

export default function page() {
  const path = usePathname();
  const tool = getToolByHref(path);

  const [uppy] = useState(() => new Uppy());

  function _showLogs() {
    console.log(uppy.getFiles()[0]);
  }

  return (
    <>
      <div>
        <center>
          <h1 className={title({color: "green"})}>{tool?.title}</h1>
          <h2
            className={subtitle({
              fullWidth: true,
              class: "text-center",
            })}
          >
            {tool?.description}
          </h2>
        </center>
      </div>
      <Dashboard uppy={uppy} />
      <Button onPress={_showLogs}>Merge PDF</Button>
    </>
  );
}
