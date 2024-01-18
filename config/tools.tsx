import {OpenCollectiveIcon} from "@/components/icons";
import {ToolCategory, ToolType} from "@/types/tool";
import {Image} from "@nextui-org/react";

export const Tools: ToolType[] = [
  {
    key: "image-to-pdf",
    title: "Image to PDF",
    icon: <Image src="/icons/image-to-pdf.webp" width={35} />,
    description: "Convert your images to PDF format effortlessly using our intuitive online tool.",
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
    icon: <Image src="/icons/merge-pdf.webp" width={35} />,
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
    title: "Compress JPG",
    description: "Compress JPG images without losing quality.",
    showFullDescription: true,
    icon: <OpenCollectiveIcon fill="#FF4ECD" />,
    href: "/tools/compress-jpg",
    isExternal: false,
    keywords:
      "compress jpg, jpg compression, image compression, reduce jpg size, compress image, jpg optimizer, jpg compressor",
    category: [ToolCategory.IMAGE],
    updated: false,
    newPost: false,
  },
];
