import {ToolCategory, ToolType} from "@/types/tool";
import Image from "next/image";

import React from "react";

export const Tools: ToolType[] = [
  {
    key: "image-to-pdf",
    title: "Image to PDF",
    icon: <Image alt="image-to-pdf" src="/icons/image-to-pdf.webp" width={35} height={35} />,
    description: "Convert images to PDF files quickly and easily.",
    showFullDescription: true,
    href: "/tools/image-to-pdf",
    isExternal: false,
    keywords: "image to pdf, convert image to pdf, image converter, pdf converter",
    category: [ToolCategory.PDF],
    updated: false,
    newPost: false,
  },

  {
    key: "merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDFs into one unified document.",
    showFullDescription: true,
    icon: <Image alt="merge-pdf" src="/icons/merge-pdf.webp" width={35} height={35} />,
    href: "/tools/merge-pdf",
    isExternal: false,
    keywords:
      "merge pdf, combine pdf, pdf merger, merge pdf documents, pdf merge online, merge pdf files, pdf merge tool",
    category: [ToolCategory.PDF],
    updated: false,
    newPost: false,
  },
];

export const getToolByHref = (href: string): ToolType | undefined => {
  return Tools.find((tool) => tool.href === href);
};

// needed otherwise the server fails to start
React;
