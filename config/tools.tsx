import { OpenCollective } from "@/components/icons";
import { Image } from "@nextui-org/react";

export const tools = [
  {
    heading: "PDF Tools",
    color: "blue",
    tools: [
      {
        title: "Merge PDF",
        description: "Combine multiple PDFs into one unified document.",
        showFullDescription: false,
        icon: <Image src="/icons/merge-pdf.webp" width={35} />,
        href: "/merge-pdf",
        isExternal: false,
        tags: ["merge pdf online"],
      },
      // Split PDF
      {
        title: "Split PDF",
        description: "Split PDF into multiple documents.",
        showFullDescription: false,
        // icon: <Image src="/icons/split-pdf.webp" width={35} />,
        href: "/split-pdf",
        isExternal: false,
        tags: ["split pdf online"],
      },

      // Compress PDF
      // PDF to Word
      // PDF to Powerpoint
      // PDF to Excel
      // Word to PDF
    ],
  },
  {
    heading: "Image Tools",
    color: "pink",
    tools: [
      {
        title: "JPG to PNG",
        description: "Convert JPG images to PNG format.",
        showFullDescription: false,
        icon: <OpenCollective fill="#FF4ECD" />,
        href: "/jpg-to-png",
        isExternal: false,
      },
    ],
  },
];
