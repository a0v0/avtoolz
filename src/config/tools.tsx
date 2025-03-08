import { CompressPDFIcon } from "@/components/icons/CompressPDFIcon";
import { ImageToPDFIcon } from "@/components/icons/ImageToPDFIcon";
import { MergePDFIcon } from "@/components/icons/MergePDFIcon";
import React from "react";

export interface ToolType {
  key: string;
  title: string;
  description: string;
  icon: JSX.Element;
  showFullDescription: boolean;
  href: string;
  isExternal: boolean;
  category: ToolCategory[];
  keywords: string; // comma separated
  updated: boolean;
  newPost: boolean;
}

export enum ToolCategory {
  IMAGE = "image",
  PDF = "pdf",
}

export const Tools: ToolType[] = [
  {
    key: "image-to-pdf",
    title: "Image to PDF",
    icon: <ImageToPDFIcon />,
    description: "Convert images to PDF files quickly and easily.",
    showFullDescription: true,
    href: "/tools/image-to-pdf",
    isExternal: false,
    keywords:
      "image to pdf, convert image to pdf, image converter, pdf converter",
    category: [ToolCategory.PDF],
    updated: false,
    newPost: false,
  },

  {
    key: "merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDFs into one unified document.",
    showFullDescription: true,
    icon: <MergePDFIcon />,
    href: "/tools/merge-pdf",
    isExternal: false,
    keywords:
      "merge pdf, combine pdf, pdf merger, merge pdf documents, pdf merge online, merge pdf files, pdf merge tool",
    category: [ToolCategory.PDF],
    updated: false,
    newPost: false,
  },
  {
    key: "compress-pdf",
    title: "Compress PDF",
    description: "Reduce the file size of your PDF documents.",
    showFullDescription: true,

    icon: <CompressPDFIcon />,
    href: "/tools/compress-pdf",
    isExternal: false,
    keywords: "compress pdf, reduce pdf size, pdf compressor, pdf size reducer",
    category: [ToolCategory.PDF],
    updated: false,
    newPost: true,
  },
];

// function to get tools by category
export const getToolsByCategory = (category: ToolCategory): ToolType[] => {
  return Tools.filter((tool) => tool.category.includes(category));
};

export const getToolByHref = (href: string): ToolType | undefined => {
  return Tools.find((tool) => tool.href === href);
};

React;
