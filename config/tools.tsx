import { OpenCollectiveIcon } from "@/components/icons";
import { ToolCategory, ToolType } from "@/types/tool";
import { Image } from "@nextui-org/react";

export const Tools: ToolType[] = [
  // Image to PDF
  {
    title: "Image to PDF",
    description:
      "Convert your images to PDF format effortlessly using our intuitive online tool.",
    showFullDescription: true,
    icon: <Image src="/icons/image-to-pdf.webp" width={35} />,
    href: "/tools/image-to-pdf",
    isExternal: false,
    tags: [
      "image to pdf",
      "convert image to pdf",
      "image converter",
      "pdf converter",
    ],
    category: [ToolCategory.PDF],
  },

  {
    title: "Merge PDF",
    description: "Combine multiple PDFs into one unified document.",
    showFullDescription: true,
    icon: <Image src="/icons/merge-pdf.webp" width={35} />,
    href: "/tools/merge-pdf",
    isExternal: false,
    tags: [
      "merge pdf",
      "combine pdf",
      "pdf merger",
      "merge pdf documents",
      "pdf merge online",
      "merge pdf files",
      "pdf merge tool",
    ],
    category: [ToolCategory.PDF],
  },

  {
    title: "Compress JPG",
    description: "Compress JPG images without losing quality.",
    showFullDescription: true,
    icon: <OpenCollectiveIcon fill="#FF4ECD" />,
    href: "/tools/compress-jpg",
    isExternal: false,
    tags: [
      "compress jpg",
      "jpg compression",
      "image compression",
      "reduce jpg size",
      "compress image",
      "jpg optimizer",
      "jpg compressor",
    ],
    category: [ToolCategory.IMAGE],
  },

  // {
  //   title: "JPG to PDF",
  //   description: "Convert JPG images to PDF format.",
  //   showFullDescription: true,
  //   icon: <Image src="/icons/split-pdf.webp" width={35} />,
  //   href: "/tools/jpg-to-pdf",
  //   isExternal: false,
  //   tags: siteConfig.keywords,
  // },
  // Compress PDF
  // PDF to Word
  // PDF to Powerpoint
  // PDF to Excel
  // Word to PDF
  // Split PDF
  // {
  //   title: "Split PDF",
  //   description: "Split PDF into multiple documents.",
  //   showFullDescription: true,
  //   icon: <Image src="/icons/split-pdf.webp" width={35} />,
  //   href: "/tools/split-pdf",
  //   isExternal: false,
  //   tags: siteConfig.keywords,
  // },
];
