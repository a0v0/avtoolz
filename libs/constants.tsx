import { OpenCollective } from "@/components/icons";
import { Image } from "@nextui-org/react";

export const TWITTER_USER_NAME = "getnextui";
export const SITE_URL = "https://nextui.org";

export const pdfTools = [
  // {
  //   title: "Twitter",
  //   description: "For announcements, tips and general information.",
  //   icon: <TwitterIcon className="text-[#00ACEE]" size={32} />,
  //   href: "https://twitter.com/getnextui",
  //   isExternal: true,
  // },
  // {
  //   title: "Discord",
  //   description:
  //     "To get involved in the community, ask questions and share tips.",
  //   icon: <DiscordIcon className="text-[#7289DA]" size={32} />,
  //   href: "https://discord.gg/9b6yyZKmH4",
  //   isExternal: true,
  // },
  // {
  //   title: "Github",
  //   description:
  //     "To report bugs, request features and contribute to the project.",
  //   icon: <GithubIcon className="text-[#333] dark:text-[#E7E7E7]" size={32} />,
  //   href: "https://github.com/nextui-org/nextui",
  //   isExternal: true,
  // },

  {
    title: "Merge PDF",
    description: "Combine multiple PDFs into one unified document.",
    showFullDescription: false,
    icon: <Image src="/icons/merge-pdf.webp" width={35} />,
    href: "/tools/merge-pdf",
    isExternal: false,
    tags: ["merge pdf online"],
  },
  // Split PDF
  {
    title: "Split PDF",
    description: "Split PDF into multiple documents.",
    showFullDescription: true,
    icon: <Image src="/icons/split-pdf.webp" width={35} />,
    href: "/tools/split-pdf",
    isExternal: false,
    tags: ["split pdf online"],
  },

  // Compress PDF
  // PDF to Word
  // PDF to Powerpoint
  // PDF to Excel
  // Word to PDF
];

export const imageTools = [
  {
    title: "JPG to PNG",
    description: "Convert JPG images to PNG format.",
    showFullDescription: false,
    icon: <OpenCollective fill="#FF4ECD" />,
    href: "/tools/jpg-to-png",
    isExternal: false,
  },
];
