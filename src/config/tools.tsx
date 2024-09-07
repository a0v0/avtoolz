import Image from "next/image";
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
    icon: (
      <Image
        alt="Thumbnail for the Image to PDF tool"
        src="/icons/image-to-pdf.webp"
        width={35}
        height={35}
      />
    ),
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
    icon: (
      <Image
        alt="Thumbnail for the Merge PDF tool"
        src="/icons/merge-pdf.webp"
        width={35}
        height={35}
      />
    ),
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
    // TODO: Change the icon
    icon: (
      <Image
        alt="Thumbnail for the Compress PDF tool"
        src="/icons/compress-pdf.webp"
        width={35}
        height={35}
      />
    ),
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
