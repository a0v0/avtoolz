import { OpenCollective } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { ToolCategory, ToolType } from "@/types/tool";
import { Image } from "@nextui-org/react";

export const Tools: ToolType[] = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDFs into one unified document.",
    showFullDescription: true,
    icon: <Image src="/icons/merge-pdf.webp" width={35} />,
    href: "/tools/merge-pdf",
    isExternal: false,
    tags: siteConfig.keywords,
    category: [ToolCategory.PDF],
  },
  {
    title: "Compress JPG",
    description: "Compress JPG images without losing quality.",
    showFullDescription: true,
    icon: <OpenCollective fill="#FF4ECD" />,
    href: "/tools/compress-jpg",
    isExternal: false,
    tags: siteConfig.keywords,
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
